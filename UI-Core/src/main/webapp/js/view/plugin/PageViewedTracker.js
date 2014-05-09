/*! UsageTracker */
(function () {

	AMA.namespace("view.plugin");

	AMA.view.plugin.PageViewedTracker = {

		__name__: "PageViewedTracker",

		// This is called automatically when Usage Tracker plug-in is
		// plugged into a host View object
		__onPlug__: function (options) {
			AMA.assert(this.getChild != null,
					"PageViewedTracker plug-in is attached to a non-view host object");
			
			var tracker = this;

			tracker.options.tab = options && options.tab || this.options.tab;
            
			if(this.options.tab) {				
				$(document.body).on("mouseup", this.options.tab,  function(e) {
					tracker.reportAction(e);
				});
			}
			
			
		},
				
		/**
		 * Logs reporting events
		 *
		 * This method does not normally need any override.
		 *
		 * @method _doReporting
		 * @private
		 */
		_doReporting: function (tabId) {
			var actionPerformedEventType, 
				eventMsg={}, eventDetail={},
				//clickedElement = $(parent).find(tab + ".selected").attr("id"),
				reportingEventDetails = AMA.config.reportEvtDetailsArray[tabId];

			if (_.isArray(reportingEventDetails)) {
				if (reportingEventDetails[0]) {
					eventMsg['PageVisited'] = reportingEventDetails[0];
					AMA.debug("Reporting : Logging Page Visited  Event " + reportingEventDetails[0]);
					AMA.ReportingManager.reportPageVisited(eventMsg,reportingEventDetails[1]);
				}
				if (reportingEventDetails[2] && reportingEventDetails[3]){
					AMA.debug("Reporting : Logging Action Performed Event" + reportingEventDetails[2]);
					actionPerformedEventType = AMA.config.reportingEventTypes[reportingEventDetails[2]];
					eventDetail['ActionPerformed'] = reportingEventDetails[3];
					AMA.ReportingManager.reportUserAction(actionPerformedEventType,eventDetail);
				}
			}
		},

		
		/**
		 * Reports click events
		 * 
		 * @method reportAction
		 */
		reportAction: function(event) {
			if (AMA.config.enableReporting)	{
				this._doReporting(event.currentTarget.id);
			 	//this._doReporting(this.options.parent, this.options.tab);
			}
		}

	};

})();

