/*! BaseWorkflow */
(function () {
	
	AMA.namespace("workflow");
	
	var BaseWorkflow = AMA.workflow.BaseWorkflow = function (options) {
		this.options = options;

		// Invoke the standard initialize() method
		this.initialize();
	};
	
	// Standard workflow events
	BaseWorkflow.EVENT = AMA.enums(
			"STARTED",
			"STATE_CHANGED",
			"FINISHED",
			"COUNTDOWN_TICK",
			"TIMEOUT"
	);
	
	// Standard workflow states
	BaseWorkflow.STATE = AMA.enums(
			"INACTIVE",
			"INITIALIZING",
			"FINALIZING"
	);
	
	// Standard workflow results
	BaseWorkflow.RESULT = AMA.enums(
			"SUCCESSFUL",
			"FAILED",
			"TIMEDOUT",
			"CANCELLED"
	);
	
	// Take the 'extend' functionality from BackboneJS
	BaseWorkflow.extend = Backbone.History.extend;
	
	_.extend(BaseWorkflow.prototype, Backbone.Events, {
		initialize: function () {
			// Initialize state
			this._state = BaseWorkflow.STATE.INACTIVE;
			
			// This property is set by the ActionManager
			this._action = "";

            this._actionId = "";
            this._timeRemaining="00:00";
		},
		
		start: function (options) {
			// Check for ongoing activity
			if (this._state != BaseWorkflow.STATE.INACTIVE) {
				AMA.debug("'" + this._action + "' is being restarted");
				
				// Cancel the ongoing activity
				this.stop(BaseWorkflow.RESULT.CANCELLED);
			}
			
			AMA.ActionManager.stopRoutinePolling();
			
			this.options = options || {};
			
			AMA.debug("'" + this._action + "' has started");
			this.trigger(BaseWorkflow.EVENT.STARTED);
			var MRLite = "";
		    AMA.ReportingManager.remoteLog("Workflow Triggered [type:-" + this._action + "][accountID:-" + AMA.config.accountDetails.accountId + "]" +
				"[MDN:-" + AMA.config.accountDetails.accountMdn + "]" + MRLite,
				AMA.config.JsonConstants.LOGLEVEL_STATES.AUDIT);
				
            // Reset the timed-out flag
            this._timedOut = false;
			
			// The 'initializing' state is always the first state
			this.toState(BaseWorkflow.STATE.INITIALIZING);
		},
		
		/** 
		 * Changes the workflow state back to "inactive" and triggers a "finished" event
         *
         * @param {Object} status
         */
		stop: function (status) {
			// Set the state back to 'inactive'
			this.toState(BaseWorkflow.STATE.INACTIVE);

            // Cleanup any polling timer
            if (this._pollingTimer) {
                AMA.debug("Cancelling pending poll for '" + this._action + "'");
                clearTimeout(this._pollingTimer);
            }
			
			// Default status is 'successful'
			status = status || BaseWorkflow.RESULT.SUCCESSFUL;
			
			AMA.debug("'" + this._action + "' has finished with result '" + this.getResultName(status) + "'");

            this._afterFinish(status);
			
			this.trigger(BaseWorkflow.EVENT.FINISHED, {
				result: status
			});
			
			
			// <-- logging starts here
			   
			var dialogStatus = status == BaseWorkflow.RESULT.SUCCESSFUL ? "Successful" : "Failed";
			this._timeRemaining = status == BaseWorkflow.RESULT.TIMEDOUT ? 3 : this._timeRemaining;
			
			var otherDetails = "";
			
			if(status == BaseWorkflow.RESULT.FAILED) {
				otherDetails = "[details:-Failed]";
			}
			else if(status == BaseWorkflow.RESULT.TIMEDOUT) {
				otherDetails = "[details:-Timeout Failure]";
			}
			else if(status == BaseWorkflow.RESULT.CANCELLED){
				otherDetails = "[details:-Cancelled]";
			}
			
			// DON'T CHANGE THESE LOG STATEMENTS UNLESS YOU WANT TO MESS UP REPORTING
			AMA.ReportingManager.remoteLog("Workflow " + dialogStatus + " [type:-" + this._action + "][accountID:-" + AMA.config.accountDetails.accountId + "]" +
					"[MDN:-" + AMA.config.accountDetails.accountMdn + "][time remaining:-" + this._timeRemaining + "]" + otherDetails, 
					AMA.config.JsonConstants.LOGLEVEL_STATES.AUDIT);	

			AMA.ReportingManager.remoteLog("Action in device is done. [type:-" + this._action + "][accountID:-" + AMA.config.accountDetails.accountId + "]" +
					"[MDN:-" + AMA.config.accountDetails.accountMdn + "]",
					AMA.config.JsonConstants.LOGLEVEL_STATES.AUDIT);
					
			// logging ends here -->
			AMA.ActionManager.startRoutinePolling();
		},
		
		/**
         * Handles the workflow's state changes
         * 
         * @return {Object}: the current state of thw workflow
         */
		getState: function () {
			return this._state;
		},
		
		/**
         * Handles the workflow's state changes
         * 
         * @param {Object} state: The new state of the workflow
         */
		toState: function (state,data) {
			this._state = state;
			
			this.trigger(BaseWorkflow.EVENT.STATE_CHANGED, { state: state, data:data });
			AMA.debug("'" + this._action + "' changed state to '" + this.getStateName(state) + "'");
						
			// Call the polymorphic state-change handling
			this._onStateChange(state);
			
			// If this is the 'finalizing' state, we can stop the
			// workflow now, marking the action's completion
			if (state === BaseWorkflow.STATE.FINALIZING) {
				
				// By this time, the workflow should have set the this._result
				// flag according to the actual result of the action.
				// If not specified, the default result flag is 'successful'.
				var result = this._result || BaseWorkflow.RESULT.SUCCESSFUL;
				
				this.stop(result);
			}
		},
		
		// Here we perform operations depending on the new state,
		// including the decision tree for transition to the next
		// state. NOTE: Transition from 'finalizing' is NOT needed.
		// Implementation workflow classes should override this.
		_onStateChange: function (state) {
			// This abstract implementation simply jumps from
			// 'initializing' (the standard initial state) to
			// 'finalizing' (the standard final state)
			
			switch (state) {

				case BaseWorkflow.STATE.INITIALIZING:
					AMA.debug("'" + this._action + "' is initializing");
					this.toState(BaseWorkflow.STATE.FINALIZING);
					break;
				
				case BaseWorkflow.STATE.FINALIZING:
					AMA.debug("'" + this._action + "' is finalizing");
					break;
				
				default:
			}
		},
		
		getStateName: function (state) {
			var classLevel = this.constructor;

			while (true) {
				// Try to find the state in the class level's STATE enum
				if (classLevel.STATE) {
					for (var i in classLevel.STATE) {
						if (classLevel.STATE[i] === state) return i;
					}
				}
				
				// If we have reached the base class and still cannot
				// find the state name, just return the numeric value
				if (classLevel === BaseWorkflow)
					return state;
				
				// Attempt the superclass
				classLevel = classLevel.__super__.constructor;
			}
		},
		
		getResultName: function (result) {
			// Find the result in the BaseWorkflow.RESULT enum
			for (var i in BaseWorkflow.RESULT) {
				if (BaseWorkflow.RESULT[i] === result) return i;
			}
			
			// If result name is not found, just return the numeric value
			return result;
		},
		
		/**
		 * Starts the countdown timer for the workflow.
		 * 
		 * At every interval (one second), a 'countdown ticked' event is triggered
		 * so that views can listen to this and display the countdown accordingly.
		 * When the time remaining becomes zero, a 'timeout' event is triggered.
		 * 
		 * @method _startCountdown
		 * @protected
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
					
					return;
				}
				
				timeRemaining = (min < 10 ? "0" : "") + min + ":" + (sec < 10 ? "0" : "") + sec;
				this.trigger(BaseWorkflow.EVENT.COUNTDOWN_TICK, { remaining: timeRemaining });
				
				time--;
			}, this), 1000);
		},
		
		_stopCountdown: function () {
			AMA.debug("'" + this._action + "' has stopped the countdown");
			
			clearInterval(this._countdownTimer);
		},

        _afterFinish: function () {

        }
	});

})();
