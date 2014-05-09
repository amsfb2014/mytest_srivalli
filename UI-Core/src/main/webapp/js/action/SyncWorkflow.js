/*! SyncWorkflow */
(function () {

	AMA.namespace("workflow");
	
	
	var SyncWorkflow = AMA.workflow.SyncWorkflow = AMA.workflow.BaseWorkflow.extend();
	
	SyncWorkflow.URL = "/actions";
	
	SyncWorkflow.STATE = AMA.enums(
		"CONNECTING",
		"SYNCING"
	);
	
	// Countdown duration while connecting to the server
	SyncWorkflow.CONNECT_COUNTDOWN = 180;
	
	// Amount of time in seconds in between connect retries
    SyncWorkflow.CONNECT_INTERVAL = 15;
	
	// Aliases
	var BaseWorkflow = AMA.workflow.BaseWorkflow;
	
	_.extend(SyncWorkflow.prototype, {
		_onStateChange: function (state) {
			switch (state) {
				case BaseWorkflow.STATE.INITIALIZING:
					AMA.debug("'" + this._action + "' is initializing");
					this._doInitializing();
					break;
				
				case SyncWorkflow.STATE.CONNECTING:
					AMA.debug("'" + this._action + "' is connecting");
					this._doConnecting();
					break;
					
				case SyncWorkflow.STATE.SYNCING:
					AMA.debug("'" + this._action + "' is syncing");
					break;
					
				case BaseWorkflow.STATE.FINALIZING:
					AMA.debug("'" + this._action + "' is finalizing");
					this._doFinalizing();
					break;
				
				default:
			}
		},
	   stop: function (status) {
            this.toState(BaseWorkflow.STATE.INACTIVE);
            
            status = status || BaseWorkflow.RESULT.SUCCESSFUL;
           	this._stopCountdown();
     
            
            AMA.debug("'" + this._action + "' has finished with result '" + this.getResultName(status) + "'");
            this.trigger(BaseWorkflow.EVENT.FINISHED, {
                result: status,
                data: this._resultData
            });
        },
		
		_doInitializing: function () {
			// Start the countdown timer
            this._startCountdown(SyncWorkflow.CONNECT_COUNTDOWN);
            this.syncData={
				contacts: {},
            	images: {},
            	videos: {}
            };
            
            this._doConnecting();
		},
		
		_doConnecting: function () {			
			var options = {
					data: {
						actionType: "sync",
						dataType: this.options.itemsToSync
					},
					callback: _.bind(this._afterSendRequest, this)
				};
            
            // Send the command to the server
            this.sendRequest(options);
		},
        
        sendRequest: function (options) {
        	var url = AMA.config.apiHostUrl + SyncWorkflow.URL,
				params = options && options.async === false && {async: false} || {};
			
			var data = options && options.data && JSON.stringify(options.data) || null;
			
			this._ajax(url, "POST", params, data, options && options.callback);
        },
		
		_ajax: function (url, method, params, data, callback) {
			if (AMA.models.capabilities.canCreate("actions")) {

				var asyncFlag = true;
				if (params && params.async === false) {
					asyncFlag = params.async;
				}
				
				var afterAjax = function (response) {
					if (callback) callback(response);
				};
				
				var options = {
					type: method,
					cache: false,
					url: url + "?devId=" + AMA.config.devId + "&endpointId=" + AMA.config.endpointId + "&authToken=" + AMA.config.authToken,
					contentType: "application/json; charset=utf-8",
					global: false,
					async: asyncFlag,
					error: _.bind(this._onAjaxError, this),
					success: _.bind(afterAjax, this)
				};
				
				if(options.type  === "POST") {
					options.data = data;
					options.dataType = "json";
				}
				
				// var options = {
					// type: "POST",
					// cache: false,
					// url: url + "?devId=" + AMA.config.devId + "&endpointId=" + AMA.config.endpointId + "&authToken=" + AMA.config.authToken,
					// data: data,
					// dataType: "json",
					// contentType: "application/json; charset=utf-8",
					// global: false,
					// async: asyncFlag,
					// error: _.bind(this._onAjaxError, this),
					// success: _.bind(afterAjax, this)
				// };
					
				AMA.debug("Calling REST API:" + method + " - " + options.url);
				
				$.ajax(options);
			} else {
                AMA.debug("Sync is not supported!");
            }
		},
		
		_onAjaxError: function (jqXHR, error, errorThrown) {
			AMA.ActionManager._onAjaxError(jqXHR, error, errorThrown);
		},
		
		_afterSendRequest: function (response) {
			AMA.debug("Received connecting response: " + JSON.stringify(response));
			if(response && typeof response.actionId != "undefined") {
                AMA.debug("Polling for sync action updates...");

				this._doPolling(response.actionId);
			}
			else {
				// Attempt the connection again
				AMA.debug("Connection failed. Attempting to connect again in " + SyncWorkflow.CONNECT_INTERVAL + " seconds");
				
				this._connectRetry = setTimeout(_.bind(this._doConnecting, this), 3000);
			}
		},
		
		_doPolling: function (actionId) {
            // If a countdown has timed out, bypass polling
            if (this._timedOut) return;

			if (AMA.models.capabilities.canRead("syncEvents_actionId")) {
				var url = AMA.config.apiHostUrl + "/syncEvents/" + actionId,
                    o = this;
				var afterAjax = function (response) {
					if (!response.id) {
                        AMA.debug("No sync updates. Checking again in 5 seconds");

						o._pollingTimer = setTimeout(pollScanResult, 5000);
					}
					else {
						this._afterRetrieveStatus(actionId, response);
					}
				};
				
				var options = {
					cache: false,
					url: url + "?devId=" + AMA.config.devId + "&endpointId=" + AMA.config.endpointId + "&authToken=" + AMA.config.authToken,
					error: _.bind(this._onAjaxError, this),
					success: _.bind(afterAjax, this)
				};
				
				var pollScanResult = function () {
                    AMA.debug("Calling REST API: GET " + options.url);

					$.ajax(options);
				};
				
				this._pollingTimer = setTimeout(pollScanResult, 5000);
			}		
		},
        
        _afterRetrieveStatus: function (actionId, response) {
            var self = this;
            
            if (response.list.length == 0) {
                AMA.debug("Sync action acknowledged by server, but no update yet. Polling again in 5 sec");

            	this._doPolling(actionId);
            }
            else {
            	var syncStatus = response.list[0].status,
            		syncSuccess = response.list[0].statusDetails === "Sync Successful" ? true : false;
            	
            	if (syncStatus === "syncing" && !syncSuccess){
            		AMA.debug("Sync in progress...");
					
            		this._resultData = response.list[0];
            		this._retrieveCurrentData();
            		
					if(this.syncData.updateButtons)
            		{
            		   this._stopCountdown();
            		   this.toState(SyncWorkflow.STATE.SYNCING, this.syncData);
	            	}
            		
            		this._doPolling(actionId);
            	}
            	else if (syncStatus === "failed" || syncStatus === "failure") {
            		AMA.debug("Sync has failed");

            		this._result = BaseWorkflow.RESULT.FAILED;
            		this._resultData = response.list[0];
            		this.toState(BaseWorkflow.STATE.FINALIZING);
            	}
            	else if (syncSuccess){
            		AMA.debug("Sync has successfully finished");

            		this._result = BaseWorkflow.RESULT.SUCCESSFUL;
            		this._resultData = response.list[0];
					
					AMA.ReportingManager.remoteLog("Sync Successful [type:-" + this._action + "][accountID:-" + AMA.config.accountDetails.accountId + "]" +
						"[MDN:-" + AMA.config.accountDetails.accountMdn + "][time remaining:-" + this._timeRemaining + "]",
						AMA.config.JsonConstants.LOGLEVEL_STATES.AUDIT);

            		this.toState(BaseWorkflow.STATE.FINALIZING);
            		
            	}
            }
        },
		
		_stopCountdown: function () {
			AMA.debug("'" + this._action + "' has stopped the countdown");
			
			clearInterval(this._countdownTimer);
			clearTimeout(this._connectRetry);
		},
		
		_retrieveCurrentData:function()
		{
			var url = AMA.config.apiHostUrl + "/syncStatusEntries";
			this._ajax(url, "GET", null, null, _.bind(this._afterFetchSyncSessionInfo, this));
		},
		
		_afterFetchSyncSessionInfo: function(data) {
			if(typeof data !== "object") {
				data = JSON.parse(data);
			}
			
			var o = this;
			var completed = data.sourceCompleted || {};
			var pending = data.sourcePending || {};
			var updateButtons = false;
			var startNextSync = false;
			var isEmpty = $.isEmptyObject(data);
			var result = {};
			
			var _countResult = function (recordType, startNextSync) {
				var result = {
					countTotal: 0,
					completedCount: 0,
					pendingCount: 0,
					syncStatus: "",
					startNextSync: startNextSync
				};
				
				//var completedItem = $.grep(completed, function(obj) { return obj.id === recordType; });
				//var pendingItem = $.grep(, function(obj) { return obj.id === recordType; });

				var completedItem = _.where(completed, { id: recordType });
				var pendingItem = _.where(pending, { id: recordType });
					
				_.each(completedItem[0], function(value, key) {
					if(key==="id") return;
					result.completedCount += value;
				});
				
				_.each(pendingItem[0], function(value, key) {
					if(key==="id") return;
					result.pendingCount += value;
				})
				
				result.countTotal = result.completedCount + result.pendingCount;
				
				if (!result.startNextSync && result.countTotal && result.countTotal === result.pendingCount) {
					result.syncStatus = "pending";
				} 
				else if(result.countTotal) {
					result.syncStatus = "syncing";
				} 
				else {
					if(isEmpty) {
						result.syncStatus = "waiting_to_sync";
					}
					else {
						result.syncStatus = "no_change";
					}
				}
						
				if (result.countTotal) {
					updateButtons = true;
					
					if(result.completedCount === result.countTotal) {
						result.startNextSync = true;
					}
				}
				
				return result;
			};
			
			var records = {"contacts": "contact", "pictures": "image", "videos": "video"};
			
			_.each(records, function(value, key) {
				if(o.options.itemsToSync.indexOf(key) >= 0) {
					result = _countResult(AMA.config.recordTypeIds[value], startNextSync);
					
					value += "s";
					o.syncData[value].completed = result.completedCount;
					o.syncData[value].pending = result.pendingCount;
					o.syncData[value].total = result.countTotal;	
					o.syncData[value].status = result.syncStatus;	
					startNextSync = result.startNextSync;
				}
			});
			
			startNextSync = false;

			if(!updateButtons) {
				if(o.options.itemsToSync.indexOf("contacts") !== -1) {
					o.syncData.contacts.status="syncing";
					if(o.options.itemsToSync.indexOf("pictures") !== -1) {
						o.syncData.images.status="waiting_to_sync";
					}
					if(o.options.itemsToSync.indexOf("videos") !== -1) {
						o.syncData.videos.status="waiting_to_sync";
					}
				}
			}
			
			o.syncData.itemsBeingSynced = o.options.itemsToSync;
			o.syncData.updateButtons = true;		
		},
		
		_doFinalizing: function () {
			AMA.debug("Invalidating contacts, photos, and videos data");
			AMA.models.contacts.invalidate();
			AMA.models.photos.invalidate();
			AMA.models.videos.invalidate();
		},


        _afterFinish: function (status) {
            var eventMsg = {};
            eventMsg['Type'] = 'sync';

            if(this.getResultName(status) !== BaseWorkflow.RESULT.SUCCESSFUL) {
                eventMsg['Result'] = 'Failed';
                eventMsg['Reason'] = this.getResultName(status);
            }
            else {
                eventMsg['Result'] = 'Success'
            }

            AMA.ReportingManager.reportSyncEvent(AMA.config.reportingEventTypes.webSyncResult, eventMsg);
        }
	});
})();
