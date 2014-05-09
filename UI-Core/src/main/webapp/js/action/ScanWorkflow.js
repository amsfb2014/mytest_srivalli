/*! ScanWorkflow */
(function () {

	AMA.namespace("workflow");
	
	var ScanWorkflow = AMA.workflow.ScanWorkflow = AMA.workflow.BaseWorkflow.extend();
	
	ScanWorkflow.STATE = AMA.enums(
			"CONNECTING",
			"SCANNING"
	);
	
	ScanWorkflow.URL = "/actions";

	ScanWorkflow.CONNECT_COUNTDOWN = 180;
	
	var BaseWorkflow = AMA.workflow.BaseWorkflow;
	
	_.extend(ScanWorkflow.prototype, {
		_onStateChange: function (state) {			
			switch (state) {
				case BaseWorkflow.STATE.INITIALIZING:
					AMA.debug("'" + this._action + "' is initializing");
					this._doInitializing();
					break;
				
				case ScanWorkflow.STATE.CONNECTING:
					AMA.debug("'" + this._action + "' is connecting");
					this._doConnecting();
					break;
					
				case ScanWorkflow.STATE.SCANNING:
					AMA.debug("'" + this._action + "' is scanning");
					//this._doScanning();
					break;
					
				case BaseWorkflow.STATE.FINALIZING:
					AMA.debug("'" + this._action + "' is finalizing");
					break;
				
				default:
			}
		},
		
		_doInitializing: function () {
			this._startCountdown(ScanWorkflow.CONNECT_COUNTDOWN);
			
			this.toState(ScanWorkflow.STATE.CONNECTING);
		},
		
		_doConnecting: function () {
			var options = {
					data: {
						actionType: "startScan"
					},
					callback: _.bind(this._afterSendRequest, this)
				};
			
			this._sendRequest(options);
		},
		
		_sendRequest: function (options) {
		    var url = AMA.config.apiHostUrl + ScanWorkflow.URL,
				params = {};
			
			var data = options && options.data && JSON.stringify(options.data) || null;

			AMA.debug("Sending a create action request to server for '" + options.data.actionType + "'");
			this._ajax(url, params, data, options && options.callback);
		},
		
		_ajax: function (url, params, data, callback) {
			
			var urlOption = url + "?devId=" + AMA.config.devId + "&endpointId=" + AMA.config.endpointId + "&authToken=" + AMA.config.authToken;
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
				this._startPolling(response.actionId);
			}
			else {
				AMA.debug("connection was not successful");
			}
		},
				
		_startPolling: function(actionId) {
            // If a countdown has timed out, bypass polling
            if (this._timedOut) return;

			var o = this;
			var url = AMA.config.apiHostUrl + "/appInfectionScanResults?actionId=" + actionId;
			var afterAjax = function (response) {
				response = JSON.parse(response);
				
				if(response.originTime) {
					o._stopCountdown();
					if (response && response.sdCardScan) {
						o._afterRetrieveStatus();
					}
					else {
						o.toState(ScanWorkflow.STATE.SCANNING);
						o._pollingTimer = setTimeout(function() { pollScanResult(); }, 3000);
					}
				}
				else if(!this._timedOut) {
					o._pollingTimer = setTimeout(function() { pollScanResult(); }, 3000);
				}
			};
			
			var urlOption =  url + "&devId=" + AMA.config.devId + "&endpointId=" + AMA.config.endpointId + "&authToken=" + AMA.config.authToken;
			
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
			
			AMA.debug("Received ACK for '" + action + "'");
			
			this.toState(BaseWorkflow.STATE.FINALIZING);
			
			// For immediate reflection of details
			AMA.models.threats.invalidate()
		}
		
	});
	
})();