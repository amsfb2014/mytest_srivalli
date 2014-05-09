/*! DiagnosticScanWorkflow */
(function (){

	AMA.namespace("workflow");

	var DiagnosticScanWorkflow = AMA.workflow.DiagnosticScanWorkflow = AMA.workflow.BaseWorkflow.extend();
	var _actionId;

	DiagnosticScanWorkflow.STATE = AMA.enums("CONNECTING", "SCANNING");
	DiagnosticScanWorkflow.URL = "/appRemediationEvents";
	DiagnosticScanWorkflow.CONNECT_COUNTDOWN = 300; 

	var BaseWorkflow = AMA.workflow.BaseWorkflow;

	_.extend(DiagnosticScanWorkflow.prototype,{
		_onStateChange: function (state){			
			switch (state){
			case BaseWorkflow.STATE.INITIALIZING:
				AMA.debug("'" + this._action + "' is initializing");
				$(".diagnostic_toolset_countdown.countdown_amount").html("5:00");
				this._doInitializing();
				break;
			case DiagnosticScanWorkflow.STATE.CONNECTING:
				AMA.debug("'" + this._action + "' is connecting");
				this._doConnecting();
				break;
			case DiagnosticScanWorkflow.STATE.SCANNING:
				AMA.debug("'" + this._action + "' is scanning");
				break;
			case BaseWorkflow.STATE.FINALIZING:
				AMA.debug("'" + this._action + "' is finalizing");
				break;
			default:
				AMA.debug("DiagnosticScanWorkflow default state.");
			break;
			}
		},

		_doInitializing: function (){
			this._startCountdown(DiagnosticScanWorkflow.CONNECT_COUNTDOWN);

			this._doConnecting();
		},

		_doConnecting: function (){
			var options = {
					data: {
						actionType: "scanHealthStart"
					},
					callback: _.bind(this._afterSendRequest, this)
			};

			this.sendRequest(options);
		},

		_afterSendRequest: function (response){
			AMA.debug("received connecting response: " + JSON.stringify(response));
			response = JSON.parse(response);
			if(typeof response.actionId != "undefined"){
				this._doPolling(response.actionId);
			}
			else{
				AMA.debug("connection was not successful");
			}
		},

		_doPolling: function(actionId){
			if (this._timedOut) return;

			var self = this;

			self.actionId = actionId;

			var afterAjax = function (response) {
				if (response.total) {
					var progress = response.list[0].progress;

					if (progress === "snapshot") {
						self.toState(DiagnosticScanWorkflow.STATE.SCANNING);
					}
					else if (progress === "finished") {
						AMA.models.diagnosticScanResourceData.healthScanDate = response.list[0].eventTime; 
						self._afterRetrieveStatus();
						return;
					}
				}

				setTimeout(function() { self._doPolling(self.actionId) }, 3000);
			};
			
			var pollScanResult = function () {
				var urlOption = AMA.config.apiHostUrl + "/appHealthScanEvents/" + actionId + "?devId=" + AMA.config.devId + "&endpointId=" + AMA.config.endpointId + "&authToken=" + AMA.config.authToken,
					request = AMA.Util.createCORSRequest(
						"GET",
						urlOption
					);
				
				if (request) {
					request.onload = function () {
						try {
							var resp = JSON.parse(this.responseText);
							afterAjax(resp);
						}
						catch (err) {
							AMA.error("GET /appHealthScanEvents - Diagnostic Scan Workflow - response not JSON: " + this.responseText);
						};

					};
					request.onerror = function (jqXHR, error, errorThrown) {
						AMA.ActionManager._onAjaxError(jqXHR, error, errorThrown);
					};
					
					request.send();
				}
			};
			pollScanResult();
		},

		_afterRetrieveStatus: function (){
			// TODO: append the result to panels
			AMA.models.diagnosticScanResourceData.invalidate();
			AMA.models.diagnosticScanAppsData.invalidate();
			this._stopCountdown();
			this.toState(BaseWorkflow.STATE.FINALIZING);
		},

		sendRequest: function (options){
			var url = AMA.config.apiHostUrl + DiagnosticScanWorkflow.URL,
			params ={};

			var data = options && options.data && JSON.stringify(options.data) || null;

			this._ajax(url, params, data, options && options.callback);
		},

		_ajax: function (url, params, data, callback){
			
			//--------------------------------------------------------------
			var urlOption = url + "?devId=" + AMA.config.devId + "&endpointId=" + AMA.config.endpointId + "&authToken=" + AMA.config.authToken;
			AMA.debug("Sending Diagnostic Scan AJAX request: " + urlOption);

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
			//--------------------------------------------------------------------
		},
		_onAjaxError: function (jqXHR, error, errorThrown){
			AMA.ActionManager._onAjaxError(jqXHR, error, errorThrown);
		}
	});
})();