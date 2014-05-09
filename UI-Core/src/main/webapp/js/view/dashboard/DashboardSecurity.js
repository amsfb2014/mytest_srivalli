/*! DashboardSecurity */
(function () {

    AMA.namespace("view");

    var DashboardSecurity = AMA.view.DashboardSecurity = AMA.view.BaseView.extend();
	
    DashboardSecurity.TEMPLATE_ID = "dashboard_security_template";
    DashboardSecurity.TEMPLATE_SRC = "";


    _.extend(DashboardSecurity.prototype, {
		events: {
			"click .btn.view_details" : "_onClickViewDetails"
		},
		
		initialize: function() {
			DashboardSecurity.__super__.initialize.apply(this, arguments);
			
			// FIX ME: Do proper solution on next iteration.
			// workaround for device-invoked scan auto-refresh, there's no dirty bit being returned
			if (!AMA.view.ThreatProtectionView.POLLER) {
				AMA.view.ThreatProtectionView.POLLER = setInterval(function() { AMA.models.threats.invalidate(); }, 30000); 
			}
		},


		_processData: function (item, index) {
			var attr = this.data.attributes;
			
			item.fileScanTotal = attr.fileScanTotal;
			item.appScanTotal = attr.appScanTotal;			
			item.fileInfectedTotal = attr.fileInfectedTotal + attr.appInfectedTotal;
			
			item.filePlurality = attr.fileScanTotal == 1 ? "" : "s";
			item.appPlurality = attr.appScanTotal == 1 ? "" : "s";
			item.threatPlurality = attr.fileInfectedTotal == 1 ? "" : "s";
			
			item.lastScanDate = attr.eventTime ? 
				AMA.Util.formatDateAndTime(new Date(attr.eventTime), AMA.config.dateAndTimeFormat)
				: "Never";
			
			return item;
		},
		
		_onClickViewDetails: function() {
			window.location.hash  = "#home/security";
		}
		
    });
})();

