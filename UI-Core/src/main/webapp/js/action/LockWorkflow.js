/*! LockWorkflow */
(function () {

	AMA.namespace("workflow");
	
	var LockWorkflow = AMA.workflow.LockWorkflow = AMA.workflow.BaseWorkflow.extend();
	
	LockWorkflow.STATE = AMA.enums(
			"CONNECTING"
	);
	
	LockWorkflow.URL = "/actions";
	
	// Countdown duration while connecting to the server
	LockWorkflow.CONNECT_COUNTDOWN = 180;
	
	// Aliases
	var BaseWorkflow = AMA.workflow.BaseWorkflow;
	
	_.extend(LockWorkflow.prototype, {

		_onStateChange: function (state) {
			switch (state) {
				case BaseWorkflow.STATE.INITIALIZING:
					AMA.debug("'" + this._action + "' is initializing");
					this._doInitializing();
					break;
				
				case LockWorkflow.STATE.CONNECTING:
					AMA.debug("'" + this._action + "' is connecting");
					this._doConnecting();
					break;
					
				case BaseWorkflow.STATE.FINALIZING:
					AMA.debug("'" + this._action + "' is finalizing");
					break;
				
				default:
			}
		},
		
		
		_doInitializing: function () {
			// failed by default
			this._result = BaseWorkflow.RESULT.FAILED;
			
			// manually do this for "try again"
			this.trigger(BaseWorkflow.EVENT.COUNTDOWN_TICK, { remaining: "03:00" });
			
			this._startCountdown(LockWorkflow.CONNECT_COUNTDOWN);
			
			this.toState(LockWorkflow.STATE.CONNECTING);
		},	
		
		_doConnecting: function () {
			var options = {
					data: {
						actionType: "lock"
					},
					callback: _.bind(this._afterSendRequest, this)
				};
			
			this._sendRequest(options);
		},
		
		
		_sendRequest: function (options) {
		    var url = AMA.config.apiHostUrl + LockWorkflow.URL,
				params = {};
			
			var data = options && options.data && JSON.stringify(options.data) || null;
			
			AMA.debug("Sending a 'NEW action' request to server for '" + options.data.actionType + "'");
			this._ajax(url, params, data, options && options.callback);
		},
		
		_ajax: function (url, params, data, callback) {
							
			var urlOption =  url + "?devId=" + AMA.config.devId + "&endpointId=" + AMA.config.endpointId + "&authToken=" + AMA.config.authToken;			
			AMA.debug("Sending AJAX request: " + urlOption);

			var request = AMA.Util.createCORSRequest.call(this,
					"POST",
					urlOption
				);
			
			if (request) {
				request.onload = function () {
					var resp = typeof request.response === "undefined" ? request.responseText : request.response;
					callback(resp);
				};
				request.onerror = function (jqXHR, error, errorThrown) {
					AMA.ActionManager._onAjaxError(jqXHR, error, errorThrown);
				};
				
				request.send(data);
			}
		},
		
		
		_afterSendRequest: function (response) {
			AMA.debug("received connecting response: " + response);
			response = JSON.parse(response);
			if(typeof response.actionId != "undefined") {
				AMA.debug("connecting actionid:"+response.actionId);

                this._actionId = response.actionId;

                AMA.ReportingManager.reportMRAttempt("lock", this._actionId);

                this._startPolling(this._actionId);
			}
			else {
				AMA.debug("connection was not successful");
			}
		
		},
		
		_startPolling: function(actionId) {
            // If a countdown has timed out, bypass polling
            if (this._timedOut) {
				// logging
				AMA.ReportingManager.remoteLog("Lock Failed.[Status Detail:-LOCKED=OFF][accountID:-" + AMA.config.accountDetails.accountId + "]" +
					"[MDN:-" + AMA.config.accountDetails.accountId + "]" ,
					AMA.config.JsonConstants.LOGLEVEL_STATES.AUDIT);
							
				return;
			}

			var o = this;
			var url = AMA.config.apiHostUrl + "/deviceEvents/" + actionId;
			
			var afterAjax = function (response) {
				response = JSON.parse(response);
				
				var list = response.list;
				if(response.total === 0) {
					o._pollingTimer = setTimeout(function() { pollScanResult(); }, 3000);
					return;
				}
				
				if(list[0].status === "success") {
					var status = list[0].statusDetails.split("=")[1];
					
					if(status === "on") {						
						o._result = BaseWorkflow.RESULT.SUCCESSFUL;
						
						// logging
						AMA.ReportingManager.remoteLog("Lock Sucessful.[Status Detail:-"+ list[0].statusDetails + "][accountID:-" + AMA.config.accountDetails.accountId + "]" +
							"[MDN:-" + AMA.config.accountDetails.accountId + "]" ,
							AMA.config.JsonConstants.LOGLEVEL_STATES.AUDIT);	
					
						o._afterRetrieveStatus(list[0].actionType);
					}
					else {
						o._pollingTimer = setTimeout(function() { pollScanResult(); }, 3000);
					}
				}
				else
				{
					o._pollingTimer = setTimeout(function() { pollScanResult(); }, 3000);
				}
					
			};
			
			var urlOption =  url + "?devId=" + AMA.config.devId + "&endpointId=" + AMA.config.endpointId + "&authToken=" + AMA.config.authToken;
			
			var pollScanResult = function () {
				// for browsers that caches AJAX requests
				// var breakCacheUrl = urlOption + "&nocache=" + new Date().getTime();
				
				var request = AMA.Util.createCORSRequest.call(this,
						"GET",
						urlOption
					);
				
				if (request) {
					request.onload = function () {
						var resp = typeof request.response === "undefined" ? request.responseText : request.response;
						afterAjax(resp);
					};
					request.onerror = function (jqXHR, error, errorThrown) {
						AMA.ActionManager._onAjaxError(jqXHR, error, errorThrown);
					};
					
					request.send();
				}
			};
			
			
			pollScanResult();
		},
		
		_afterRetrieveStatus: function (action) {
			AMA.debug("_afterRetrieveStatus");
			
			this._stopCountdown();
			
			AMA.debug("Received ACK for '" + action + "'");
			
			this.toState(BaseWorkflow.STATE.FINALIZING);
		},


        _afterFinish: function (status) {
            var details = {};
            if (status === BaseWorkflow.RESULT.SUCCESSFUL) {
                details = {
                    SuccessFailureFlag: "S",
                    FailureCode: "N/A"
                }
            } else {
                details = {
                    SuccessFailureFlag: "F",
                    FailureCode: "N/A"
                }
            }

            AMA.ReportingManager.reportMRResult("lock", this._actionId, details);
        }


    });
	
})();
