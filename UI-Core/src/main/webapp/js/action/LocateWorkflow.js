/*! LocateWorkflow */
(function () {

	AMA.namespace("workflow");

	/**
	 * Implementation of the whole Locate Workflow.
	 *
	 * There Are 4 states for this workflow:
	 * 1. Initializing
	 * 2. Connecting
	 * 3. Refining
	 * 4. Finalizing
	 *
	 * @class LocateWorkflow
	 * @namespace workflow
	 * @extends AMA.workflow.BaseWorkflow
	 * @constructor
	 */
	var LocateWorkflow = AMA.workflow.LocateWorkflow = AMA.workflow.BaseWorkflow.extend();


	/**
	 * Additional States needed for this workflow
	 *
	 * @property STATE
	 * @type enum
	 * @static
	 * @final
	 */
	LocateWorkflow.STATE = AMA.enums(
			"CONNECTING",
			"REFINING",
			"CANCELLED"
	);
    LocateWorkflow.URL = "/actions";
	//
	/**
	 * Countdown duration while connecting to the server
	 *
	 * @property CONNECT_COUNTDOWN
	 * @type numric
	 * @static
	 * @final
	 */
	LocateWorkflow.CONNECT_COUNTDOWN = 180;

	// Aliases
	var BaseWorkflow = AMA.workflow.BaseWorkflow;

	_.extend(LocateWorkflow.prototype, {

		_onStateChange: function (state) {

			// This abstract implementation simply jumps from
			// 'initializing' (the standard initial state) to
			// 'finalizing' (the standard final state)

			switch (state) {
				case BaseWorkflow.STATE.INITIALIZING:
					AMA.debug("'" + this._action + "' is initializing");
					this._doInitializing();
					break;

				case LocateWorkflow.STATE.CONNECTING:
					AMA.debug("'" + this._action + "' is connecting");
					this._doConnecting();
					break;

				case LocateWorkflow.STATE.REFINING:
					AMA.debug("'" + this._action + "' is refining");
					break;

				case BaseWorkflow.STATE.FINALIZING:
					AMA.debug("'" + this._action + "' is finalizing");
					this._doFinalizing();
					break;
					
				default:
			}
		},


		// TODO: Maybe this should be standardized in BaseWorkflow ?
		_doInitializing: function () {
			this._result = BaseWorkflow.RESULT.FAILED;
			var o = this,
                options = {
                    data: {
                        actionType: "gpsrefresh"
                    },
                    callback: _.bind(this._afterRESTRequest, this)
                };

			this.reportExecuted=false;
			this.on(BaseWorkflow.EVENT.TIMEOUT, function(evt) {
				var actionStatus = "failed";
				if (this._result === BaseWorkflow.RESULT.SUCCESSFUL) {
					actionStatus = "success";
				}
				//AMA.ActionManager.addToHistory(this._action, {serverAction: "gpsrefresh", actionStatus: actionStatus});
				o.toState(BaseWorkflow.STATE.FINALIZING);
			});

			// Start the countdown timer
			this._startCountdown(LocateWorkflow.CONNECT_COUNTDOWN);

            this.sendRequest(options);

		},


		_doConnecting: function () {
            // If a countdown has timed out, bypass polling
            if (this._timedOut) {
				// logging
				AMA.ReportingManager.remoteLog("Locate Failed.[Status Detail:-failure]" + 
					"[accountID:-" + AMA.config.accountDetails.accountId + "]" + 
					"[MDN:-" + AMA.config.accountDetails.accountId + "]" ,
					AMA.config.JsonConstants.LOGLEVEL_STATES.AUDIT);
					
				return;
			}
            this.breadCrumbShown=false;
            if (AMA.models.locations.models.length >= 1) {

        		this.breadCrumbShown=true;
        	}
            var actionId = this.actionId,
                    url = AMA.config.apiHostUrl + "/locateDeviceEvents/" + actionId,
                    o = this,
                    afterAjax = function (response) {
                        if (!o.isPolling) return;
                        if (response.list.length) {
                            o._result = BaseWorkflow.RESULT.SUCCESSFUL;
                            if (o.getState() !== LocateWorkflow.STATE.REFINING && o.getState() !== BaseWorkflow.STATE.INACTIVE) {
                                o._doRefining();
                            } else if (o.getState() === LocateWorkflow.STATE.REFINING) {
                            	var lastAccuracy = parseFloat(AMA.models.locations.models[0].get("accuracy"));
                            	var newAccuracy = parseFloat(response.list[0].precision);
                            	if (lastAccuracy > newAccuracy) {
                            		o._doRefining();
                            	}
                            }
                            if (response.list[0].status === "success" && !AMA.Util.isIPhone()) {
								// logging
								AMA.ReportingManager.remoteLog("Locate Sucessful.[Status Detail:-"+ response.list[0].statusDetails || response.list[0].status  + "]" + 
									"[accountID:-" + AMA.config.accountDetails.accountId + "]" + 
									"[MDN:-" + AMA.config.accountDetails.accountId + "]" ,
									AMA.config.JsonConstants.LOGLEVEL_STATES.AUDIT);	
								
                                o.toState(BaseWorkflow.STATE.FINALIZING);
                                o._stopCountdown();
                            } else if (response.list[0].status === "failure" && AMA.Util.isIPhone()) {
								// logging
								AMA.ReportingManager.remoteLog("Locate Failed.[Status Detail:-"+ response.list[0].statusDetails || response.list[0].status  + "]" + 
									"[accountID:-" + AMA.config.accountDetails.accountId + "]" + 
									"[MDN:-" + AMA.config.accountDetails.accountId + "]" ,
									AMA.config.JsonConstants.LOGLEVEL_STATES.AUDIT);
								
                                o._result = BaseWorkflow.RESULT.FAILED;
                                o.toState(BaseWorkflow.STATE.FINALIZING);
                                o._stopCountdown();
                            }
                        }
                        if (o.getState() === LocateWorkflow.STATE.CONNECTING || o.getState() === LocateWorkflow.STATE.REFINING) {
                            o._pollingTimer = setTimeout(function() {
                                pollScanResult();
                            }, 4000);
                        }
                    },
                    options = {
                        cache: false,
                        url: url + "?devId=" + AMA.config.devId + "&endpointId=" + AMA.config.endpointId + "&authToken=" + AMA.config.authToken,
                        // error: _.bind(this._onAjaxError, this),
                        success: _.bind(afterAjax, this)
                    },
                    pollScanResult = function () {
                        if (AMA.Util.useXdr()){
                        	var request = AMA.Util.createCORSRequest("GET", options.url);
                        	
                        	if (request){
                        		request.onload = function () {
                        			try {
                        				var response = JSON.parse(this.responseText);
                        			}
                        			catch (e) {
                        				AMA.error("GET /locateDeviceEvents - Locate Workflow - response not JSON: " + this.responseText);
                        			};
                        			
                        			if (response){
                        				afterAjax(response);
                        			}
                        		};
                        		
                        		request.onerror = function () {
                        			AMA.error("Request failed: GET /locateDeviceEvents");
                        		};
                        		
                        		request.send();
                        	}
                        }
                        else {
                        	$.ajax(options);
                        }
                    };
            this.isPolling = true;
            pollScanResult();
		},

        sendRequest: function(options) {
            var url = AMA.config.apiHostUrl + LocateWorkflow.URL,
                    params = {};

            var data = options && options.data && JSON.stringify(options.data) || null;

            this._ajax(url, params, data, options && options.callback);

        },
        
		cancelLocate: function() {
			this.stop(BaseWorkflow.RESULT.CANCELLED);
		},        

        _afterRESTRequest: function(resp) {
            AMA.debug("received connecting response: " + JSON.stringify(resp));
            if(typeof resp.actionId != "undefined") {
                this.actionId = resp.actionId;

                AMA.ReportingManager.reportMRAttempt("locate", this.actionId);

                this.toState(LocateWorkflow.STATE.CONNECTING);
            }
            else {
                AMA.debug("connection was not successful");
            }
        },

        _ajax: function (url, params, data, callback) {
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
                //error: _.bind(this._onAjaxError, this),
                success: _.bind(afterAjax, this)
            };

            AMA.debug("Sending AJAX request: " + options.url);

			if (AMA.Util.useXdr()){
				var request = AMA.Util.createCORSRequest(options.type, options.url);
				
				if (request) {
					request.onload = function (){
						try {
							var response = JSON.parse(this.responseText);
						}
						catch (e) {
							AMA.error(options.type + " " + url  + " - Locate Workflow - response not JSON: " + this.responseText);
						}
						
						if (response){
							afterAjax(response);
						}
					};
					
					request.onerror = function (){
						AMA.error("Request failed: " + options.type + " " + url);
					};
					
					request.send(data);
				}
			}
			else {
				$.ajax(options);
			}
        },

		_startPolling: function () {

		},

		_afterRetrieveStatus: function (response) {
			/*
			//commented out for now, we won't check again status record.
    		var statusFields = AMA.config.legacyRecordTypes.STATUS.fields,
    		status = _.find(response, function (item) {
    			// Find the latest 'gpsrefresh' status record
    			return item.dt[statusFields.type] === "gpsrefresh";
    		}),
    		statusTime = status.dt[statusFields.time];

    		// Check if the latest 'gpsrefresh' status is newer than the action trigger time.
    		// For newer device App, since they are now sending status every time a new location is available
    		if (statusTime > this._triggerTime) {
    			AMA.debug("Received a status update for '" + this._action + "'");

    			// Save the finish time for this action
    			this._finishTime = statusTime;

    			// Save result flag
    			this._result = (status.dt[statusFields.subject] === "success") ?
    					BaseWorkflow.RESULT.SUCCESSFUL : BaseWorkflow.RESULT.FAILED;
    		} else {
    			AMA.debug(this._action + "' must have new location ready, try reseting the location collection");

    			this._result = BaseWorkflow.RESULT.SUCCESSFUL;
    		}
			*/
		},


		_doRefining: function () {
            var lastLocationTime = 0,
                o = this;
            if (AMA.models.locations.models && AMA.models.locations.models.length > 0) {
                var location = AMA.models.locations.models[0];
                // remember the last location's timestamp
                lastLocationTime = location.get("time");
                AMA.debug("AMA.workflow.LocationWorkflow - About to retrieve new locations, save the current latest one first.")
            }

            AMA.models.locations.fetch({
                reset:true,
                silent: true,
                success: function(collection, resp) {
                        collection.trigger("reset");
                    if(o.getState() == LocateWorkflow.STATE.CONNECTING) {
                        o.toState(LocateWorkflow.STATE.REFINING);
                    }
                },
                error: function() {
                AMA.debug("AMA.workflow.LocationWorkflow - Location f");
                }
            });
		},
        _doFinalizing: function() {
            if(this._result === BaseWorkflow.RESULT.SUCCESSFUL) {
                AMA.models.locations.fetch();
            }
        },


        _afterFinish: function (status) {
            var details = {};
            if (this.breadCrumbShown) {
            	details.WasBreadCrumbShown="1";
        	}
            else {
            	details.WasBreadCrumbShown="0";
            }
            
//            if (status === BaseWorkflow.RESULT.SUCCESSFUL) {
//                if(AMA.models.locations.isFetching) {
//                    AMA.models.locations.once("reset", function() {
//                    	details.SuccessFailureFlag="S";
//                    	details.FailureCode="N/A";
//                    	details.AccuracyofFixShown=AMA.models.locations.at(0).get("accuracy");
//                        AMA.ReportingManager.reportMRResult("locate", this.actionId, details);
//                    })
//                }
//            } else {
//            	if (this.reportExecuted==false) {
//                	details.SuccessFailureFlag= "F";
//                	details.FailureCode="N/A";
//                	details.BreadcrumbAccuracy="N/A";
//                	details.BreadcrumbTimestamp="N/A";
//                	AMA.ReportingManager.reportMRResult("locate", this.actionId, details);
//                }
//            	this.reportExecuted=true;
//            }
            
            switch (status) {
				case BaseWorkflow.RESULT.SUCCESSFUL:
				    if(AMA.models.locations.isFetching) {
				        AMA.models.locations.once("reset", function() {
				            details.SuccessFailureFlag="S";
				            details.FailureCode="N/A";
				            details.AccuracyofFixShown=AMA.models.locations.at(0).get("accuracy");
				            AMA.ReportingManager.reportMRResult("locate", this.actionId, details);
				        })
				    }
				    break;
				case BaseWorkflow.RESULT.CANCELLED:
				    // cancel flow here
				    this._stopCountdown();
				    // AMA.ActionManager.addToHistory("locate", {serverAction: "gpsrefresh", actionStatus: "cancelled"});
				    // AMA.ActionManager.stopPolling("locate");
				    // should i still trigger toState? if Yes, what state?				    
				    Backbone.globalEvent.trigger("onLocate",{status:"cancelled"});
				    this.toState(BaseWorkflow.STATE.FINALIZING);
				    break;
				default:
				    if(this.reportExecuted==false){
				        details.SuccessFailureFlag= "F";
				        details.FailureCode="N/A";
				        details.BreadcrumbAccuracy="N/A";
				        details.BreadcrumbTimestamp="N/A";
				        AMA.ReportingManager.reportMRResult("locate", this.actionId, details);
				    }
					this.reportExecuted=true;
					break;
            }
        }

        // _stopLocationConsolidation: function() {
            // var url = AMA.config.legacyApiBaseUrl + "/account.poo",
            // params = {
                // method : "stopLocationConsolidation",
                // endpointid: AMA.currentEndpoint
            // };

            // AMA.ActionManager._ajax(url, params, null, null);
        // }

	});

})();
