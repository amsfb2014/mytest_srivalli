/*! WipeWorkflow */
(function () {

    AMA.namespace("workflow");
    
    
    var WipeWorkflow = AMA.workflow.WipeWorkflow = AMA.workflow.BaseWorkflow.extend();
    
    WipeWorkflow.URL = "/actions";
    
    WipeWorkflow.STATE = AMA.enums(
        "CONNECTING",
        "SYNCING",
        "ERASING"
    );
    
    // Amount of time in seconds to be spent in connecting to device and performing the operation
    WipeWorkflow.CONNECT_COUNTDOWN = 300;
    
    // Amount of time in seconds in between connect retries
    WipeWorkflow.CONNECT_INTERVAL = 15;
    
    // WipeWorkflow outcomes
    WipeWorkflow.RESULT = AMA.enums(
        "FACTORY_RESET_SUCCESSFUL"
    );
    
    
    // Aliases
    var BaseWorkflow = AMA.workflow.BaseWorkflow;
    
    _.extend(WipeWorkflow.prototype, {
        _onStateChange: function (state) {
            switch (state) {
                case BaseWorkflow.STATE.INITIALIZING:
                    AMA.debug("'" + this._action + "' is initializing");
                    this._doInitializing();
                    break;
                
                case WipeWorkflow.STATE.CONNECTING:
                    AMA.debug("'" + this._action + "' is connecting");
                    this._doConnecting(this._action);
                    break;
                    
                case WipeWorkflow.STATE.SYNCING:
                    AMA.debug("'" + this._action + "' is syncing");
                    break;
                
                case WipeWorkflow.STATE.ERASING:
                    AMA.debug("'" + this._action + "' is erasing");
                    break;
                    
                case WipeWorkflow.STATE.FINALIZING:
                    AMA.debug("'" + this._action + "' is finalizing");
                    break;
                
                default:
            }
        },

        stop: function (status) {
            this.toState(BaseWorkflow.STATE.INACTIVE);
            
            status = status || BaseWorkflow.RESULT.SUCCESSFUL;
            
            if (status !== BaseWorkflow.RESULT.SUCCESSFUL) {
            	this._stopCountdown();
            }
            
            AMA.debug("'" + this._action + "' has finished with result '" + this.getResultName(status) + "'");
			
			this._afterFinish(status);
			
            this.trigger(BaseWorkflow.EVENT.FINISHED, {
                result: status,
                // Wipe summary is sent as content of the event, which will be used as the button tooltip
                data: this._resultData
            });
        },

        toState: function (state) {
            this._state = state;
            
            this.trigger(BaseWorkflow.EVENT.STATE_CHANGED, {
                state: state,
                // Wipe summary is sent as content of the event, which will be used as the button tooltip
                data: this._resultData
            });
            AMA.debug("'" + this._action + "' changed state to '" + this.getStateName(state) + "'");
            
            this._onStateChange(state);
            
            if (state === BaseWorkflow.STATE.FINALIZING) {
                if (this._action.indexOf("wipefactoryonly") > -1) {
                    var result = WipeWorkflow.RESULT.FACTORY_RESET_SUCCESSFUL || this._result;
                }
                else {
                    var result = this._result || BaseWorkflow.RESULT.SUCCESSFUL;
                }
                
                this.stop(result);
            }
        },
        
        _doInitializing: function () {
            // Start the countdown timer
            this._startCountdown(WipeWorkflow.CONNECT_COUNTDOWN);
            this.toState(WipeWorkflow.STATE.CONNECTING);
            // this._doConnecting();
        },
        
        _doConnecting: function () {
            var options = {
					data: {
						actionType: this._action
					},
					callback: _.bind(this._afterSendRequest, this)
				};
            
            // Send the command to the server
            this.sendRequest(options);
        },
        
        sendRequest: function (options) {
        	var url = AMA.config.apiHostUrl + WipeWorkflow.URL,
				params = {};
			
			var data = options && options.data && JSON.stringify(options.data) || null;
			
			this._ajax(url, params, data, options && options.callback);
        },
        
        _ajax: function (url, params, data, callback) {
            if (AMA.models.capabilities.canCreate("actions")) {
                var afterAjax = function (response) {
                    if (callback) callback(response);
                };

                var options = {
                    type: "POST",
                    cache: false,
                    url: url + "?devId=" + AMA.config.devId + "&endpointId=" + AMA.config.endpointId + "&authToken=" + AMA.config.authToken,
                    data: data,
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    global: false,
                    error: _.bind(this._onAjaxError, this),
                    success: _.bind(afterAjax, this)
                };

                AMA.debug("Sending AJAX request: " + options.url);
                
                if (AMA.Util.useXdr()) {
                    var request = AMA.Util.createCORSRequest(options.type, options.url);

                    if (request) {
                        request.onload = function () {
                            try {
                                var response = JSON.parse(this.responseText);
                            }
                            catch (e) {
                                AMA.error(options.type + " " + url  + " - Wipe Workflow - response not JSON: " + this.responseText);
                            };

                            if (response) {
                                afterAjax(response);
                            }
                        };

                        request.onerror = function () {
                            AMA.error("Request failed: " + options.type + " " + url);
                        };

                        request.send(data);
                    }
                }
                else {
                    $.ajax(options);
                }
            }
        },
        
		_onAjaxError: function (jqXHR, error, errorThrown) {
			AMA.ActionManager._onAjaxError(jqXHR, error, errorThrown);
		},
        
        _afterSendRequest: function (response) {
            var self = this;

            AMA.debug("Received connecting response: " + JSON.stringify(response));
			if(response && typeof response.actionId != "undefined") {

                this._actionId = response.actionId;

                AMA.ReportingManager.reportMRAttempt("wipe", this._actionId);

				this._doPolling(this._actionId);
			}
			else {
				// Attempt the connection again
				AMA.debug("Connection failed. Attempting to connect again in " + WipeWorkflow.CONNECT_INTERVAL + " seconds");
				
				this._connectRetry = setTimeout(_.bind(this._doConnecting, this), WipeWorkflow.CONNECT_INTERVAL * 1000);
			}
        },
        
        _doPolling: function (actionId) {
            // If a countdown has timed out, bypass polling
            if (this._timedOut) return;

            var self = this,
                request = null,
                url = AMA.config.apiHostUrl + "/deviceEvents/" + actionId;

            if (AMA.models.capabilities.canRead("deviceEvents_actionId")) {
                var url = AMA.config.apiHostUrl + "/deviceEvents/" + actionId;
                var afterAjax = function (response) {
                    if (!response.id) {
                        // It appears wipe event has not yet been created, check again in five seconds 
                        self._pollingTimer = setTimeout(function() { pollScanResult(); }, 5000);
                    }
                    else {
                        self._afterRetrieveStatus(response);
                    }
                };

                var options = {
                    cache: false,
                    url: url + "?devId=" + AMA.config.devId + "&endpointId=" + AMA.config.endpointId + "&authToken=" + AMA.config.authToken,
                    data: {
                        actionType: (this._action === "wipe") ? "wipeData" : "factoryReset"
                    },
                    error: _.bind(this._onAjaxError, this),
                    success: _.bind(afterAjax, this)
                };

                var pollScanResult = function () {
                    if (AMA.Util.useXdr()) {
                        var request = AMA.Util.createCORSRequest("GET", options.url);

                        if (request) {
                            request.onload = function () {
                                try {
                                    var response = JSON.parse(this.responseText);
                                }
                                catch (e) {
                                    AMA.error("GET " + url  + " - Wipe Workflow - response not JSON: " + this.responseText);
                                }

                                if (response) {
                                    afterAjax(response);
                                }
                            };

                            request.onerror = function () {
								AMA.error("Request failed: GET " + url);
                            };
                            
                            // Wrapping the send() function in a timeout declaration as part of solution to address aborted requests in IE
                            // http://cypressnorth.com/programming/internet-explorer-aborting-ajax-requests-fixed/
                            setTimeout(function () { 
                            	request.send(JSON.stringify(options.data));
                            	}, 0);                            
                        }
                    }
                    else {
                        $.ajax(options);
                    }
                };

                this._pollingTimer = setTimeout(pollScanResult, 2000);
            }
        },
        
        _afterRetrieveStatus: function (response) {
            var self = this;
            
            if (response.total == 0) {
            	// Action created but no progress update on the sync yet, so poll again
            	this._doPolling(this._actionId);
            }
            else {
            	var actionType = response.list[0].actionType,
            		wipeStatus = response.list[0].status,
            		wipeStatusDetail = response.list[0].statusDetails;
            		
            	if ((actionType === "wipe" && wipeStatus === "success") ||
                    (actionType === "wipefactoryonly" && wipeStatus === "success" && wipeStatusDetail === "wipefactory=on")) {
            		// Wipe successful, end the workflow
            		this._result = BaseWorkflow.RESULT.SUCCESSFUL;
            		this._resultData = response.list[0].statusDetails;
            		
					// logging
					AMA.ReportingManager.remoteLog("Wipe Successful.[Status Detail:-" + wipeStatusDetail + "][accountID:-" + AMA.config.accountDetails.accountId + "]" +
						"[MDN:-" + AMA.config.accountDetails.accountMdn + "]" ,
						AMA.config.JsonConstants.LOGLEVEL_STATES.AUDIT);
					
            		if (actionType === "wipefactoryonly") {
            			AMA.ActionManager.stopRoutinePolling();
						AMA.ActionManager.clearAutoInvalidateData();
            		}
            		
            		this.toState(BaseWorkflow.STATE.FINALIZING);
            	}
            	else if (actionType === "wipe" && (wipeStatus.indexOf("fail") > -1)) {
            		// Wipe failed, end the workflow
            		this._result = BaseWorkflow.RESULT.FAILED;
					
					AMA.ReportingManager.remoteLog("Wipe Failed.[Status Detail:-" + wipeStatusDetail + "[accountID:-" + AMA.config.accountDetails.accountId + "]" +
						"[MDN:-" + AMA.config.accountDetails.accountMdn + "]" ,
						AMA.config.JsonConstants.LOGLEVEL_STATES.AUDIT);
					
            		this.toState(BaseWorkflow.STATE.FINALIZING);
            	}
            	else if (actionType === "wipe" && wipeStatus === "ongoing") {
            		if (!wipeStatusDetail) {
                        // Wipe will first do a sync and throw this status while doing so
                        // Next status will already be sync success so change button state here
                        if (this.state != WipeWorkflow.STATE.SYNCING) {
                            this.toState(WipeWorkflow.STATE.SYNCING);
                            this._stopCountdown();
                        }
                    }
                    else {
                        if (this.state != WipeWorkflow.STATE.ERASING) {
                            this.toState(WipeWorkflow.STATE.ERASING);
                        }
                        this._resultData = response.list[0].statusDetails;
                        this.trigger(WipeWorkflow.STATE.ERASING, {
                            data: this._resultData
                        });
                    }

                    this._doPolling(this._actionId);
            	}
            	else {
					this._doPolling(this._actionId);
            	}
            }
        },
		
		_stopCountdown: function () {
			AMA.debug("'" + this._action + "' has stopped the countdown");
			
			clearInterval(this._countdownTimer);
			clearTimeout(this._connectRetry);
		},

        _afterFinish: function (status) {
            var details = {};
            if (status === BaseWorkflow.RESULT.SUCCESSFUL) {
                details = {
                    SuccessFailureFlag: "S",
                    FailureCode: "N/A"
                }
                // AMA.ReportingManager.remoteLog("Wipe Successful [type:-" + this._action + "][accountID:-" + AMA.config.accountDetails.accountId + "]" +
					// "[MDN:-" + AMA.config.accountDetails.accountMdn + "][time remaining:-" + this._timeRemaining + "]",
					// AMA.config.JsonConstants.LOGLEVEL_STATES.AUDIT);
            } 
            else if (status === WipeWorkflow.RESULT.FACTORY_RESET_SUCCESSFUL) {
                details = {
                    SuccessFailureFlag: "S",
                    FailureCode: "N/A"
                }
            }
            else {
                details = {
                    SuccessFailureFlag: "F",
                    FailureCode: "N/A"
                }
                // AMA.ReportingManager.remoteLog("Wipe Failed [type:-" + this._action + "][accountID:-" + AMA.config.accountDetails.accountId + "]" +
					// "[MDN:-" + AMA.config.accountDetails.accountMdn + "][time remaining:-" + this._timeRemaining + "][details:-Failed]",
					// AMA.config.JsonConstants.LOGLEVEL_STATES.AUDIT);
            }

            if (this._action !== "wipefactoryonly") {
                AMA.ReportingManager.reportMRResult("lock", this._actionId, details);
            }

            AMA.ReportingManager.reportMRResult("wipe", this._actionId, details);
        }

    });
})();