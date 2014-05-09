/*! ActionManager */
(function () {

	AMA.ActionManager = function () {

		var _workflows = {};

		// Aliases
		var BaseWorkflow = AMA.workflow.BaseWorkflow;

		// List of action polling timers
		var _pollingTimers = {};

        // Background update timer
        var _backgroundUpdateTimer = null;

        // Latest activity data (used by background update)
        var _latestActivity = null;

        // Latest activity timestamp
        var _latestActivityTime = 0;
		
		// List of auto-invalidated data (i.e. invalidated upon background update)
		var _autoInvalidateData = [];


		// Convenience functions

		var _isValidWorkflow = function (wf) {
			// TODO: Add check for workflow validity here
			return true;
		};

		var _isValidAction = function (action) {
			return _workflows[action] != null;
		};

		var _isOngoing = function (action) {
			if(_workflows[action].getState() != AMA.workflow.LocateWorkflow.STATE.CANCELLED && _workflows[action].getState() != BaseWorkflow.STATE.INACTIVE){
				return true;	
			}
			else {
				return false;
			}
		};

		

		return {

			// ActionManager events
			EVENT: AMA.enums(
					"ACTION_STARTED",
					"ACTION_FINISHED",
					"DATA_DIRTY",
					"REQUEST_FAILED",
					"CONNECTION_ERROR"
			),

			// Polling interval (in milliseconds) for actions
			ACTION_POLLING_INTERVAL: 4000,

            // Background update interval (in milliseconds)
            BACKGROUND_UPDATE_INTERVAL: 15000,



			define: function (action, workflow) {
				AMA.assert(action && workflow && _isValidWorkflow(workflow),
						"[ActionManager.define] Action name and workflow are required");

				// Check if this action is already defined
				if (_isValidAction(action)) {
					AMA.warning("Action '" + action + "' is already defined; redefinition will be ignored");
				}

				// Tag the workflow object with the action name
				workflow._action = action;

			    // Listen to 'finished' event on the workflow, so that ActionManager
			    // can also trigger 'action finished' once workflow has completed
			    workflow.on(BaseWorkflow.EVENT.FINISHED, function (event) {
			    	this.trigger(this.EVENT.ACTION_FINISHED, { action: action, result: event.result });
			    	AMA.debug("ActionManager has detected that action '" + action + "' has finished");

			    	// Also make sure that any running poll for this action is stopped
			    	// this.stopPolling(action);

			    }, this);

				// Add the workflow to the list
				_workflows[action] = workflow;
			},


			getWorkflow: function (action) {
		    	AMA.assert(_isValidAction(action),
		    			"[ActionManager.getWorkflow] '" + action + "' is not a recognized action");

		    	return _workflows[action];
			},


			start: function (action, options) {
		    	AMA.assert(_isValidAction(action),
		    			"[ActionManager.start] '" + action + "' is not a recognized action");

		    	// Do not start an action that is already ongoing
		    	if (_isOngoing(action)) {
		    		AMA.debug("Action '" + action + "' was requested but is already ongoing");
		    		return false;
		    	}

			    // Trigger an 'action started' event on ActionManager
			    this.trigger(this.EVENT.ACTION_STARTED, { action: action, options: options });
			    AMA.debug("ActionManager is starting the '" + action + "' action");

			    // Start the workflow
			    _workflows[action].start(options);

			    return true;
			},


			cancel: function (action) {

			},


			getState: function (action) {
		    	AMA.assert(_isValidAction(action),
		    			"[ActionManager.getState] '" + action + "' is not a recognized action.");

		    	return _workflows[action].getState();
			},


            startBackgroundUpdate: function () {
                AMA.debug("Background update has started");

                if (!_latestActivity) {
                    _latestActivity = new AMA.model.EndpointHistory();

                    _latestActivity.url = AMA.config.apiHostUrl + "/" + AMA.model.EndpointHistory.RESOURCE + "?" +
                        $.param({
                            devId: AMA.config.devId,
                            endpointId: AMA.config.endpointId,
                            authToken: AMA.config.authToken,
                            limit: 1
                        });

                    _latestActivity.parse = AMA.model.BaseData.prototype.parse;

                    o = this;
                    _latestActivity.on(AMA.model.BaseData.EVENT.LOADED, function () {
                        var evt = _latestActivity.at(0),
                            evtTime = evt && parseInt(evt.get("eventTime")) || 0;

                        if (evtTime > _latestActivityTime) {
                            AMA.debug("Latest activity timestamp: " + new Date(evtTime));
                            _latestActivityTime = evtTime;

                            // Pause background update
                            o.stopBackgroundUpdate();

                            // Re-fetch the 'auto-invalidated' models
                            AMA.debug("Invalidating and re-fetching all 'auto-invalidate' data");

                            _.each(_autoInvalidateData, function (data) {
                                data.invalidate();
                            });

                            // Resume background update
                            o.startBackgroundUpdate();
                        }
                    });
                }

                this._doBackgroundUpdate();
            },


            _doBackgroundUpdate: function () {

                AMA.debug("Checking for server updates...");

                // Refetch latest activity
                _latestActivity.fetch();

                // Set the next background update based on interval
                clearTimeout(_backgroundUpdateTimer);
                _backgroundUpdateTimer = setTimeout(_.bind(this._doBackgroundUpdate, this), this.BACKGROUND_UPDATE_INTERVAL);

            },


            stopBackgroundUpdate: function () {
                clearTimeout(_backgroundUpdateTimer);
                AMA.debug("Background update has stopped");
            },


			autoInvalidate: function (data) {
				AMA.assert(data.invalidate, 
						"[ActionManager.autoInvalidate] Data passed is not a valid BaseData-derived object");
				
				_autoInvalidateData.push(data);
			},


			clearAutoInvalidateData: function() {
				_autoInvalidateData = [];
			},


			_onAjaxError: function (jqXHR, error, errorThrown) {
				AMA.debug("Ajax request error: " + error + " [Error thrown: " + errorThrown +
						", status: " + jqXHR.status + ", statusText: '" + jqXHR.statusText +
						"', responseText: '" + jqXHR.responseText + "'");

				// Connection error. Cannot hit the server.
				if (error == "error" && jqXHR.status == "0") {
					AMA.error("Could not reach the server");
				}
				// A duplicate request was made, the first one is aborted.
				else if (error == "abort" && jqXHR.status == "0") {
					AMA.warning("Duplicate request made, aborted first one");
				} else {
					AMA.error("An error occurred while communicating with the server");
				}

				this.trigger(this.EVENT.CONNECTION_ERROR, {
					error: error,
					errorThrown: errorThrown,
					status: jqXHR.status,
					statusText: jqXHR.statusText,
					responseText: jqXHR.responseText
				});
			}

		};

	}();


    // Set method aliases for backward compatibility with older workflows
    _.extend(AMA.ActionManager, {
        startRoutinePolling: AMA.ActionManager.startBackgroundUpdate,
        stopRoutinePolling: AMA.ActionManager.stopBackgroundUpdate
    });


	// Use Backbone.Events to support custom events
	_.extend(AMA.ActionManager, Backbone.Events);

})();

