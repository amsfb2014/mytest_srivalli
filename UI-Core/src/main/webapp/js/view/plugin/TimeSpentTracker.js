/*! TimeSpentTracker */
(function () {

	AMA.namespace("view.plugin");

	// TimeSpentTracker plug-in
	AMA.view.plugin.TimeSpentTracker = {

		__name__: "TimeSpentTracker",

		// This is called automatically when TimeSpentTracker plug-in is
		// plugged into a host View object
		__onPlug__: function (options) {
			AMA.assert(this.getChild != null,
					"TimeSpentTracker plug-in is attached to a non-view host object");

			this.options.event = options && options.event || this.options.event;
            
			if(this.options.event) {
				this.on(this.options.event, function(e) {
					this.reportTimeSpent(e);
				});
			}
			
		},

		/**
		 * Logs the time spent by the user in MR and DP sections.
		 *
		 * This method does not normally need any override.
		 * 
		 * @method _doReporting
		 * @private
		 */
		_doReporting: function (currentTabId) {
			if (currentTabId === "data_tab") {
				
				if (!AMA.config.enableDpTimeTracking) {
					AMA.debug("Reporting: Start DP time spent timer as user is on Data Tab");
					
					AMA.config.enableDpTimeTracking = true;
					AMA.ReportingManager.reportPortalTimeSpent("DP", "Start");
				}
				
			} else if (currentTabId === "dashboard_main_tab" || currentTabId === "location_tab" || currentTabId === "security_tab" || currentTabId === "techsupport_tab"
					|| currentTabId === "privacy_tab" || currentTabId === "safebrowsing_tab" || currentTabId ==="replace_tab")	{
				/*
				 Stop timer if AMA.ReportingManager.enableDpTimeTracking = true 
				 AMA.ReportingManager.enableDpTimeTracking = true means the timer set in session, hence need to stop it.
				 this is needed to stop xtra server calls, if timer is already stopped.
				*/
				if (AMA.config.enableDpTimeTracking) {
					AMA.debug("Reporting: stop DP time spent timer as user is on Data Tab--> ");
					
					AMA.ReportingManager.reportPortalTimeSpent("DP", "Stop");
				}
				AMA.config.enableDpTimeTracking = false;
			}
			
			if (currentTabId === "location_tab") {

				if (!AMA.config.enableMrTimeTracking)	{
					AMA.debug("Reporting: Start MR time spent timer as user is on Location Tab");
					
					AMA.config.enableMrTimeTracking = true;
					AMA.ReportingManager.reportPortalTimeSpent("MR", "Start");
				}
			} else if (currentTabId === "dashboard_main_tab"|| currentTabId === "security_tab" || currentTabId === "techsupport_tab"|| currentTabId === "privacy_tab" || currentTabId === "safebrowsing_tab" 
					|| currentTabId ==="replace_tab"|| currentTabId ==="data_tab")	{
				/*
				Stop timer if AMA.ReportingManager.enableMrTimeTracking = true 
				AMA.ReportingManager.enableMrTimeTracking = true means the timer set in session, hence need to stop it
				this is needed to stop xtra server calls, if timer is already stopped.
				*/
				if (AMA.config.enableMrTimeTracking)	{
					AMA.debug("Reporting: stop MR time spent timer as user is on Location Tab--> ");
					
					AMA.ReportingManager.reportPortalTimeSpent("MR", "Stop");
				}
				AMA.config.enableMrTimeTracking = false;
			}
		},
		
		/**
		 * Reports click events
		 * 
		 * 
		 * @method reportTimeSpent
		 */
		reportTimeSpent: function(e) {
			if (AMA.config.enableReporting)	{
			 	this._doReporting(e.to.$el.attr("id"));
			}
		}

	};

})();

