/*! DashboardSupportView */
(function () {

    AMA.namespace("view");

    var DashboardSupportView = AMA.view.DashboardSupportView = AMA.view.BaseView.extend();
	
    DashboardSupportView.TEMPLATE_ID = "dashboard_support_template";
    DashboardSupportView.TEMPLATE_SRC = "";


    _.extend(DashboardSupportView.prototype, {
		events: {
			"click .btn.scan_phone" : "_onClickScanPhone"
		},
		
		_onClickScanPhone: function() {
			window.location.hash  = "#home/support";
		}
		
    });
})();

