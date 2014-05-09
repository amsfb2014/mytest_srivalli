/*! Dashboard */
(function () {

    AMA.namespace("view");

    var DashboardTab = AMA.view.DashboardTab = AMA.view.BaseView.extend();

    DashboardTab.TEMPLATE_ID = "dashboard_tab_template";
    DashboardTab.TEMPLATE_SRC = "dashboard.tpl";
    DashboardTab.TOOLBAR = {
        DEFAULT : [
            "endpoint",
            "accountStatus",
            "recentActivity"
        ]
    };

    _.extend(DashboardTab.prototype, {

        initialize: function () {
            DashboardTab.__super__.initialize.apply(this, arguments);

            // Reporting: Logging page visited event as soon as the user logs in and lands on dashboard.
			var eventMsg={};
			eventMsg['pagevisited'] = "Dashboard";
			AMA.ReportingManager.reportPageVisited(eventMsg, false);
        },


        render: function () {

            if(this.isRendered) return;

            DashboardTab.__super__.render.apply(this);

            if (AMA.models.capabilities.canRead("storageInfo")) {
	            this.dashboardData = new AMA.view.DashboardData({
	                parent: this,
	                el: "#dashboard_backup",
	                //noAutoRefresh: true,
	                data:  AMA.models.storageInfo
	            });
	            $("#dashboard_backup").removeClass("hide");
	        }
	        else {
	        	$("#dashboard_backup").addClass("hide");
	        }

            if (AMA.models.capabilities.canRead("locationHistory")) {
	            this.dashboardLocation = new AMA.view.DashboardLocation({
	                parent: this,
	                el: "#dashboard_location",
	                noAutoRefresh: true,
	                data: AMA.models.locations
	            });
	            $("#dashboard_location").removeClass("hide");
	        }
	        else {
	        	$("#dashboard_location").addClass("hide");
	        }

            if (AMA.models.capabilities.canRead("appSecuritySettings")) {
				this.dashboardSecuritySettings = new AMA.view.DashboardSecuritySettings({
					parent: this,
					el: "#dashboard_security_settings",
					data: AMA.models.scansettings
				});
	            $("#dashboard_security_settings").removeClass("hide");
	        }
	        else {
	        	$("#dashboard_security_settings").addClass("hide");
	        }

            if (AMA.models.capabilities.canRead("appVulnerabilityScanResults")) {
				this.dashboardSecurity = new AMA.view.DashboardSecurity({
					parent: this,
					el: "#dashboard_security .panel_left",
					data: AMA.models.threats
				});
	            $("#dashboard_security").removeClass("hide");
	        }
	        else {
	        	$("#dashboard_security").addClass("hide");
	        }

            if (AMA.models.capabilities.canRead("apphealthscanresults_id_resources")) {
				this.dashboardSupport = new AMA.view.DashboardSupportView({
					parent: this,
					el: "#dashboard_support"
				});
	            $("#dashboard_support").removeClass("hide");
	        }
	        else {
	        	$("#dashboard_support").addClass("hide");
	        }
        }

    });

})();

