/*! SecurePhoneWorkflow */
(function () {
    AMA.namespace("workflow");

    var SecurePhoneWorkflow = AMA.workflow.SecurePhoneWorkflow = AMA.workflow.BaseWorkflow.extend();

    SecurePhoneWorkflow.STATE = AMA.enums(
        "CONNECTING",
        "ANNOUNCE_DISPLAYED",
        "CONTACTS_ERASED",
        "REFINING",
        "RETRYING"
    );

    SecurePhoneWorkflow.URL = "/actions";

    // Countdown duration while connecting to the server
    // It appears that anything more than a minute causes no retry information to be returned. 
    SecurePhoneWorkflow.CONNECT_COUNTDOWN = 240;

    // Aliases
    var BaseWorkflow = AMA.workflow.BaseWorkflow;


    _.extend(SecurePhoneWorkflow.prototype, {
        _onStateChange: function (state) {
            switch (state) {
                 case BaseWorkflow.STATE.INITIALIZING:
                    AMA.debug("'" + this._action + "' is initializing");
                    this._doInitializing();
                    break;

                case SecurePhoneWorkflow.STATE.CONNECTING:
                    AMA.debug("SecurePhone command sent");
                    this._doConnecting(this._action);
                    break;

                case SecurePhoneWorkflow.STATE.ANNOUNCE_DISPLAYED:
                    AMA.debug("Announce message has been viewed on the device by the user");
                    break;

                case SecurePhoneWorkflow.STATE.CONTACTS_ERASED:
                    AMA.debug("Contacts successfully erased");
                    AMA.models.contacts.fetch();
                    break;

                case SecurePhoneWorkflow.STATE.REFINING:
                    AMA.debug("Location updated");
                    break;

                case SecurePhoneWorkflow.STATE.RETRYING:
                    AMA.debug("SecurePhone command sent - retry");
                    //this._doRetrying(this._action);
                    break;

                case BaseWorkflow.STATE.FINALIZING:
                    AMA.debug("'" + this._action + "' is finalizing");
                    break;

                default:
            }
        },
		
		/**
		 * Overrides toState method of BaseWorkflow.
         * Handles the workflow's state changes
         * 
         * @param {Object} state: The new state of the workflow
         */
        toState: function (state) {
            this._state = state;

            this.trigger(BaseWorkflow.EVENT.STATE_CHANGED, {
                state: state,
                contactsErased: this._contactsErased,
                retryInformation: this._retryInformation,
				locateSuccess: this._locateSuccess,
				announceSuccess: this._announceSuccess,
				wipeSuccess: this._wipeContactsSuccess
            });

            AMA.debug("'" + this._action + "' changed state to '" + this.getStateName(state) + "'");

            this._onStateChange(state);

            if (state === BaseWorkflow.STATE.FINALIZING) {
                var result = this._result || BaseWorkflow.RESULT.SUCCESSFUL;

                this.stop(result);
            }
        },
		
		/**
		 * Overrides _startCountdown method of BaseWorkflow.
		 * Starts the countdown timer for the workflow.
		 * 
		 * Overridden to include a flag for retry
		 * 
		 * @method _startCountdown
		 * @param {number} time The countdown duration in seconds
		 */
		_startCountdown: function (time) {
			AMA.debug("'" + this._action + "' has started a countdown for " + time + " seconds");
			
			this._countdownTimer = setInterval(_.bind(function () {
				var sec = time % 60,
					min = Math.floor(time / 60),
					timeRemaining;
				
				if (time === 0) {
					AMA.debug("'" + this._action + "' countdown timer has expired");
					
					this.trigger(BaseWorkflow.EVENT.TIMEOUT);
                    this._timedOut = true;

					clearInterval(this._countdownTimer);
					this.stop(BaseWorkflow.RESULT.TIMEDOUT);
					
					// if zero, force the workflow to end
					var oneIsSuccess = this._locateSuccess || (this._announceSuccess && this._performAnnounce) || (this._wipeContactsSuccess && this._performErase);
					this._result = oneIsSuccess ? BaseWorkflow.RESULT.SUCCESSFUL : BaseWorkflow.RESULT.FAILED;

					this.toState(BaseWorkflow.STATE.FINALIZING);
				
					return;
				} else if (time === 10) {
					this._isOkayToRetry = true;
				}
				
				timeRemaining = (min < 10 ? "0" : "") + min + ":" + (sec < 10 ? "0" : "") + sec;
				this.trigger(BaseWorkflow.EVENT.COUNTDOWN_TICK, { remaining: timeRemaining });
				
				time--;
			}, this), 1000);
		},
		
		/**
		 * Sets workflow properties and flags.
		 * Triggers countdown and transition to connecting state.
		 * 
		 */
        _doInitializing: function () {
            // Set workflow properties
            this.actionsString = this.options.actionsString || "gpsrefresh";
            this._performAnnounce = this.options.performAnnounce || false;
            this._announceMessage = this.options.announceMessage || null;
            this._performErase = this.options.performErase || false;
            this._contactsErased = "";

            // Set success flags
            // If an operation will not be performed, mark it as done
            this._wipeContactsSuccess = !this._performErase;
            this._announceSuccess = !this._performAnnounce;
            this._locateSuccess = false;
			
			// set retry flag
			this._isOkayToRetry = false;
			
            this._retryInformation = "";
            this._locationHistory = AMA.models.locations.toJSON();

            // Start the countdown and attempt to connect to server to initialize secure phone
            this._startCountdown(SecurePhoneWorkflow.CONNECT_COUNTDOWN);
            this.toState(SecurePhoneWorkflow.STATE.CONNECTING);
        },
		
		/**
		 * Prepares the options for action request.
		 * 
		 */
        _doConnecting: function () {
            var options = {
                    data: {
                        actionType: "securePhone",
                        actionCmd: this.actionsString,
                        text: this._announceMessage
                    },
                    callback: _.bind(this._afterSendRequest, this)
                };

            this._sendRequest(options);
        },

        _sendRequest: function (options) {
            var url = AMA.config.apiHostUrl + SecurePhoneWorkflow.URL,
                params = {};

            var data = options && options.data && JSON.stringify(options.data) || null;

            AMA.debug("Sending a create action request to server for '" + options.data.actionType + "'");

            this._ajax(url, "POST", params, data, options && options.callback);
        },

        _ajax: function (url, type, params, data, callback, onerror) {
			var o = this;
			
            var urlOption = url + "?devId=" + AMA.config.devId + "&endpointId=" + AMA.config.endpointId + "&authToken=" + AMA.config.authToken;
            AMA.debug("Sending AJAX request: " + urlOption);

            var request = AMA.Util.createCORSRequest.call(this, 
                    type,
                    urlOption
                );

            if (request) {
                // request.onload = function () {
                    
                // };
                request.onerror = function (jqXHR, error, errorThrown) {
                    AMA.ActionManager._onAjaxError(jqXHR, error, errorThrown);
                };
				
				request.onreadystatechange  = function() {
					if(request.readyState == 4 && request.status === 200) {
						var resp = typeof request.response === "undefined" ? request.responseText : request.response;
						callback(resp);
					} else {
						AMA.debug("AJAX Request to " + url + " returns " + request.status);
						if(typeof onerror === "function") {
							callback("error");
						}
					}
				}
				
                request.send(data);
            }
        },
		
		/**
		 * Callback for POST /actions 
		 *
		 * A unique action ID will be generated for each action to be performed in a secure phone attempt.
		 * At the very least, an action ID for the locate operation should be returned in order for the
         * workflow to continue. Other scenarios handled are described below.
		 *
		 * Validates action IDs for the requested action features
		 * 		- all requested actions receive actionId -- good, start polling
		 * 		- not one actionId is received - good, re-connect (if not timedout)
		 *		- at least one actionId is missing - failed, end the workflow
		 *
		 * @param {object} response Response of ajax call
		 */
        _afterSendRequest: function (response) {
			if(this._timedOut) return;
			
            // Validation for response
            if (!response) {
                AMA.error("Secure Phone: Connection unsuccessful. No response data received.");
                // TODO: Try connection again
                return;
            }

            response = JSON.parse(response);
			
            // Save the locate action ID; if none received, try the connection again
            if (response.gpsrefresh) {
                AMA.debug("Secure Phone: Received action ID for locate: " + response.gpsrefresh);
                this._gpsrefreshId = response.gpsrefresh;
            } else if(response.announce || response.wipe) {
				AMA.error("Secure Phone: No action ID received for locate but actionId is received for announce/wipe.");
			
				this._result = BaseWorkflow.RESULT.FAILED;
				this.toState(BaseWorkflow.STATE.FINALIZING);
			
			    return;
			} else {
				AMA.error("Secure Phone: No action ID received for locate.");
				this._doConnecting();
				
				return;
			}
				
            
            // If announce is enabled, save the announce action ID.
            // If announce is enabled but there is no returned action ID, don't perform the whole workflow anymore.
            if (this._performAnnounce && response.announce) {
                AMA.debug("Secure Phone: Received action ID for announce: " + response.announce);
                this._announceId = response.announce;
            } else if (this._performAnnounce && !response.announce) {
                AMA.error("Secure Phone: No action ID received for announce. Secure phone will not be performed.");
                
				this._result = BaseWorkflow.RESULT.FAILED;
				this.toState(BaseWorkflow.STATE.FINALIZING);
				
				return;
            }

            // If wipe is enabled, save the wipe action ID.
            // If wipe is enabled but there is no returned action ID,  don't perform the whole workflow anymore.
            if (this._performErase && response.wipe) {
                AMA.debug("Secure Phone: Received action ID for wipe: " + response.wipe);
                this._wipeId = response.wipe;
            } else if (this._performErase && !response.wipe) {
                AMA.error("Secure Phone: No action ID received for wipe. Secure phone will not be performed.");
                
				this._result = BaseWorkflow.RESULT.FAILED;
				this.toState(BaseWorkflow.STATE.FINALIZING);
				
				return;
            }

            this._startPolling();
        },

		/**
		 * Triggers polling for each of the action requested
		 * 
		 */
        _startPolling: function () {
            var url = "";

            AMA.ActionManager.stopRoutinePolling();

            // If Locate is not yet successful, poll using the locate action ID
            if (!this._locateSuccess) {
                this._locateIsPolling = true;
                url = AMA.config.apiHostUrl + "/locateDeviceEvents/" + this._gpsrefreshId;
                this._pollActionResult(url, this._afterRetrieveLocateStatus);
            }

            // If Announce is not yet successful, poll using the announce action ID
            if (!this._announceSuccess) {
                this._announceIsPolling = true;
                url = AMA.config.apiHostUrl + "/securePhoneEvents/" + this._announceId;
                this._pollActionResult(url, this._afterRetrieveAnnounceStatus);
            }

            // If Wipe is not yet successful, poll using the wipe action ID
            if (!this._wipeContactsSuccess) {
                this._wipeIsPolling = true;
                url = AMA.config.apiHostUrl + "/securePhoneEvents/" + this._wipeId;
                this._pollActionResult(url, this._afterRetrieveWipeStatus);
            }
        },
		
		/**
		 * Generic method for ajax polling for secure phone actions.
		 * 
		 * @param {string} url API endpoint to call
		 * @param {function} onSuccess Callback once polling succeeds
		 */
        _pollActionResult: function (url, onSuccess) {
            var o = this;

			var afterAjax = function (response) {
				if(o._timedOut) {
					if(o._locateIsPolling && o._announceIsPolling && o._wipeIsPolling) {
						AMA.debug("Failed getting any of the poll results before timeout.");
						
						o._stopCountdown();
						o._result = BaseWorkflow.RESULT.FAILED;
						o.toState(BaseWorkflow.STATE.FINALIZING);
					}
					
					AMA.debug("The following polls are stopped: " + (o._locateIsPolling ? "gpsrefresh" : "") + ", " + (o._announceIsPolling ? "announce" : "") + ", " + (o._wipeIsPolling ? "wipe" : ""));
					return;
				}
				
                if(typeof response !== "object") {
					response = JSON.parse(response);
				}
				
				if (response && typeof onSuccess === "function") {
                    onSuccess.call(o, response);
                } else {
					o._pollingTimer = setTimeout(function() { pollResult(); }, 3000);
                }
            };
            
			
			var pollResult = function () {
				o._ajax(url, "GET", {}, {}, afterAjax);
            };

            pollResult();
        },

        _afterRetrieveLocateStatus: function (response) {
            var o = this,
                url = "";

            this._locateIsPolling = false;
			
			if(response === "error") {
				
				AMA.ReportingManager.remoteLog("Locate Failed.[Status Detail:-"+ list[0].statusDetails || list[0].status  + "]" + 
                        "[accountID:-" + AMA.config.accountDetails.accountId + "]" + 
                        "[MDN:-" + AMA.config.accountDetails.accountId + "]" ,
                        AMA.config.JsonConstants.LOGLEVEL_STATES.AUDIT);
				
				this._locateSuccess = false;
				
			} else if (response.list && response.list.length && response.list[0].statusDetails === "gps=on") {
                // Server has returned with data about the status of the locate, handle appropriately
                AMA.debug("Secure Phone: Server returned a response for locate");

                if (this.getState() !== SecurePhoneWorkflow.STATE.REFINING && this.getState() !== BaseWorkflow.STATE.INACTIVE) {
                    this._doRefining();
                }

                if (response.list[0].status === "failure" && AMA.Util.isIPhone()) {
                    // logging
                    AMA.ReportingManager.remoteLog("Locate Failed.[Status Detail:-"+ list[0].statusDetails || list[0].status  + "]" + 
                        "[accountID:-" + AMA.config.accountDetails.accountId + "]" + 
                        "[MDN:-" + AMA.config.accountDetails.accountId + "]" ,
                        AMA.config.JsonConstants.LOGLEVEL_STATES.AUDIT);
                }
            }

            this._validatePollStatus();
        },
		
		_doRefining: function () {
            var lastLocationTime = 0;
            var o = this;
			
            AMA.models.locations.fetch({
                reset:true,
                silent: true,
                success: function(collection, resp) {
					var newRecord = false;
                    var newAccuracy = false;
                    var skip = false;
					
                    if(!o._locationHistory[0] && resp.list.length) {
                        newRecord = true;
                        newAccuracy = true;
                    } else {
                        if(resp.list[0].eventTime > o._locationHistory[0].eventTime) {
                            newRecord = true;
                        } else if(resp.list[0].precision < o._locationHistory[0].precision) {
                            newAccuracy = true;
                        }
                    }
					
                    if(newAccuracy || newRecord) {

                        collection.trigger("reset");
                        AMA.debug("CURRENT STATE AS OF FETCH COMPLETE!" + o.getStateName(o.getState()));
						
                        if(o.getState() === BaseWorkflow.STATE.FINALIZING || 
							o.getState() === SecurePhoneWorkflow.STATE.REFINING || 
								o.getState() === BaseWorkflow.STATE.INACTIVE) {
							skip = true;
						}
                       
                        if(!skip) {
                            o.toState(SecurePhoneWorkflow.STATE.REFINING);
                        }
						
                        o._locateSuccess = true;
                    }
                },
                error: function() {
					AMA.debug("AMA.workflow.LocationWorkflow - Fetching locations failed");
                }
            });
		},
		
        _afterRetrieveAnnounceStatus: function (response) {
            var o = this;
            var url = "";

            this._announceIsPolling = false;
			
			if(response === "error") {
				this._announceSuccess = false;
				
			} else if (response.list && response.list.length && response.list[0].statusDetails === "announce=displayed") {
                // Server has returned with data about the status of the announce, handle appropriately
                AMA.debug("Secure Phone: Server returned a response for announce");
				
				this._announceSuccess = true;
				o.toState(SecurePhoneWorkflow.STATE.ANNOUNCE_DISPLAYED);
				
            }

            this._validatePollStatus();
        },

        _afterRetrieveWipeStatus: function (response) {
            var o = this;
            var url = "";

            this._wipeIsPolling = false;

			if(response === "error") {
				this._wipeContactsSuccess = false;
				
			} else if (response.list && response.list.length && response.list[0].statusDetails === "contacts=0/0") {
                // Server has returned with data about the status of the wipe, handle appropriately
                AMA.debug("Secure Phone: Server returned a response for wipe");
				
				this._wipeContactsSuccess = true;
				o.toState(SecurePhoneWorkflow.STATE.CONTACTS_ERASED);
            }

            this._validatePollStatus();
        },

        _validatePollStatus: function () {
            var o = this;

            if (this._locateSuccess && this._announceSuccess && this._wipeContactsSuccess) {
                // All operations have been flagged as done, so end the workflow
				this._stopCountdown();
                this._result = BaseWorkflow.RESULT.SUCCESSFUL;
                this.toState(BaseWorkflow.STATE.FINALIZING);
				
            } else if (!this._isOkayToRetry) {
                // Operation not yet timed out, keep polling what needs to be polled
                if (!this._locateSuccess && !this._locateIsPolling) {
                    this._locateIsPolling = true;
                    this._pollingTimer = setTimeout(function () {
                        o._pollActionResult(AMA.config.apiHostUrl + "/locateDeviceEvents/" + o._gpsrefreshId,
                            o._afterRetrieveLocateStatus);
                    }, 3000);
                }

                if (this._performAnnounce && !this._announceSuccess && !this._announceIsPolling) {
                    this._announceIsPolling = true;
                    this._pollingTimer = setTimeout(function () {
                        o._pollActionResult(AMA.config.apiHostUrl + "/securePhoneEvents/" + o._announceId,
                            o._afterRetrieveAnnounceStatus);
                    }, 3000);
                }

                if (this._performErase && !this._wipeContactsSuccess && !this._wipeIsPolling) {
                    this._wipeIsPolling = true;
                    this._pollingTimer = setTimeout(function () {
                        o._pollActionResult(AMA.config.apiHostUrl + "/securePhoneEvents/" + o._wipeId,
                            o._afterRetrieveWipeStatus);
                    }, 3000);
                }
            } else {
                this._checkNotificationRetryStatus();
            }
        },

        _checkNotificationRetryStatus: function () {
			var url = AMA.config.apiHostUrl + "/notificationRetryStatus";

            AMA.debug("Sending a 'notificationRetryStatus' request to server for '" + this._action + "'");

            this._ajax(url, "GET", null, null, _.bind(this._afterCheckingRetryStatus, this));			
        },

        _afterCheckingRetryStatus: function (response) {
			if(typeof response !== "object") {
				response = JSON.parse(response);
			}
			
            if (parseInt(response.retryAttempt) < parseInt(response.retryTotal) && !this._timedOut) {
				this._retryInformation = response;
                this._doRetrying();
            } else {
				var oneIsSuccess = this._locateSuccess || (this._announceSuccess && this._performAnnounce) || (this._wipeContactsSuccess && this._performErase);
				this._result = oneIsSuccess ? BaseWorkflow.RESULT.SUCCESSFUL : BaseWorkflow.RESULT.FAILED;

				this.toState(BaseWorkflow.STATE.FINALIZING);
            }
        },

		_doRetrying: function () {
			this._stopCountdown();
			
			// call retrying state to update dialog header
			this.toState(SecurePhoneWorkflow.STATE.RETRYING);
			
			this._isOkayToRetry = false;
			this._startCountdown(parseInt(this._retryInformation.retryTimeRemaining));
			this._startPolling();
        },
		
        _afterRetrieveStatus: function () {}
    });
})();