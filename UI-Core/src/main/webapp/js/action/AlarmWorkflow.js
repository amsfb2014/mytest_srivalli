/*! AlarmWorkflow */
(function () {
	AMA.namespace("workflow");
	
	var AlarmWorkflow = AMA.workflow.AlarmWorkflow = AMA.workflow.BaseWorkflow.extend();
	
	AlarmWorkflow.STATE = AMA.enums(
			"CONNECTING",
			"SOUNDING"
	);
	
	AlarmWorkflow.URL = "/actions";
	
	// Countdown duration while connecting to the server
	AlarmWorkflow.CONNECT_COUNTDOWN = 180;
	
	// Aliases
	var BaseWorkflow = AMA.workflow.BaseWorkflow;
	
	_.extend(AlarmWorkflow.prototype, {
	
		_onStateChange: function (state) {
			
			switch (state) {
				case BaseWorkflow.STATE.INITIALIZING:
					AMA.debug("'" + this._action + "' is initializing");
					this._doInitializing();
					break;
				
				case AlarmWorkflow.STATE.CONNECTING:
					AMA.debug("'" + this._action + "' is connecting");
					this._doConnecting();
					break;
					
				case AlarmWorkflow.STATE.SOUNDING:
					AMA.debug("'" + this._action + "' is sounding");
					break;
					
				case BaseWorkflow.STATE.FINALIZING:
					AMA.debug("'" + this._action + "' is finalizing");
					break;
				
				default:
			}
		},
		
		_doInitializing: function () {
			// manually do this for "sound again"
			this.trigger(BaseWorkflow.EVENT.COUNTDOWN_TICK, { remaining: "03:00" });
			
			this._startCountdown(AlarmWorkflow.CONNECT_COUNTDOWN - 1);
			
			this.toState(AlarmWorkflow.STATE.CONNECTING);
			
		},		
		
		_doConnecting: function () {			
			var options = {
					data: {
						actionType: "soundalert"
					},
					callback: _.bind(this._afterSendRequest, this)
				};
			
			this._sendRequest(options);
		},
		
		_sendRequest: function (options) {
		    var url = AMA.config.apiHostUrl + AlarmWorkflow.URL,
				params = {};
			
			var data = options && options.data && JSON.stringify(options.data) || null;

			AMA.debug("Sending a create action request to server for '" + options.data.actionType + "'");
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

                AMA.ReportingManager.reportMRAttempt("alarm", this._actionId);

				this._startPolling();
				
			}
			else {
				AMA.debug("connection was not successful");
			}
		},
		
		_startPolling: function() {
            // If a countdown has timed out, bypass polling
            if (this._timedOut) {
				AMA.ReportingManager.remoteLog("Alarm Failed.[Status Detail:-alarm=on][accountID:-" + AMA.config.accountDetails.accountId + "]" +
							"[MDN:-" + AMA.config.accountDetails.accountMdn + "]" ,
							AMA.config.JsonConstants.LOGLEVEL_STATES.AUDIT);
							
				return;
			}

			var o = this;
			var url = AMA.config.apiHostUrl + "/deviceEvents/" + this._actionId;
			var afterAjax = function (response) {
				response = JSON.parse(response);
				
				var list = response.list;
				if(response.total === 0) {
					o._pollingTimer = setTimeout(function() { pollScanResult(); }, 3000);
					return;
				}
				
				if(list[0].status === "success") {
					var status = list[0].statusDetails.split("=")[1];
					
					if(o.getState() === AlarmWorkflow.STATE.CONNECTING) {
						o._stopCountdown();
						
						// manually display time back to 3 minutes 
						o.trigger(BaseWorkflow.EVENT.COUNTDOWN_TICK, { remaining: "03:00" });
						
						// restart timer for sounding state
						o._startCountdown(AlarmWorkflow.CONNECT_COUNTDOWN - 1);
						o.toState(AlarmWorkflow.STATE.SOUNDING);
					}
					
					o.result = BaseWorkflow.RESULT.SUCCESSFUL;
					
					if(status === "on") {
						o._pollingTimer = setTimeout(function() { pollScanResult(); }, 3000);
					}
					else {
						AMA.ReportingManager.remoteLog("Alarm Successful.[Status Detail:-"+ list[0].statusDetails +"][accountID:-" + AMA.config.accountDetails.accountId + "]" +
							"[MDN:-" + AMA.config.accountDetails.accountMdn + "]" ,
							AMA.config.JsonConstants.LOGLEVEL_STATES.AUDIT);
				
						o._afterRetrieveStatus();
					}
				}
				else {
					o._pollingTimer = setTimeout(function() { pollScanResult(); }, 3000);
					AMA.debug(response.errorMessage);
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
		
		_afterRetrieveStatus: function () {
			AMA.debug("_afterRetrieveStatus");
			
			this._stopCountdown();
			
			AMA.debug("Received ACK for '" + this._action + "'");
			
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

            AMA.ReportingManager.reportMRResult("alarm", this._actionId, details);
        },
		
		_startCountdown: function (time) {
			AMA.debug("'" + this._action + "' has started a countdown for " + time + " seconds");
			
			this._countdownTimer = setInterval(_.bind(function () {
				var sec = time % 60,
					min = Math.floor(time / 60),
					timeRemaining;
				
				if (time === 0) {
					if(this.getState() === AlarmWorkflow.STATE.SOUNDING) {
						this._afterRetrieveStatus();
					}	
					else {
						AMA.debug("'" + this._action + "' countdown timer has expired");
						
						this.trigger(BaseWorkflow.EVENT.TIMEOUT);
						
						this._timedOut = true;
						
						this.stop(BaseWorkflow.RESULT.TIMEDOUT);
					}
					
					clearInterval(this._countdownTimer);
					return;
				}
				
				timeRemaining = (min < 10 ? "0" : "") + min + ":" + (sec < 10 ? "0" : "") + sec;
				this.trigger(BaseWorkflow.EVENT.COUNTDOWN_TICK, { remaining: timeRemaining });
				
				time--;
			}, this), 1000);
		}
	
	});
	
})();
