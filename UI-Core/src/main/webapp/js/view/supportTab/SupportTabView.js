/*! SupportTabView */
(function () {

    AMA.namespace("view");

    var SupportTabView = AMA.view.SupportTabView = AMA.view.BaseView.extend();

    SupportTabView.TEMPLATE_ID = "support_tab_template";
    SupportTabView.TEMPLATE_SRC = "supportTab.tpl";
    SupportTabView.TOOLBAR = {
            DEFAULT : [
                "endpoint",
                "diagnosticScan"
            ],
            IPHONE : [
    			"endpoint",
                "diagnosticScan"
            ]
        };

    AMA.augment(SupportTabView.prototype, {
        render: function () {
        	SupportTabView.__super__.render.apply(this);
        	AMA.debug("<br><br>=========== AMA.view.SupportTabView rendered =================<br><br>");
			
        	this.supportTabResourceView = new AMA.view.SupportTabResourceView({
                el: "#support_tab", //resources_container
                parent: this,
                data: AMA.models.diagnosticScanResourceData
            });
        	
        	this.supportTabAppsListView = new AMA.view.SupportTabAppsListView({
                el: "#hsAppsRowPlaceHolder", //apps list container
                parent: this,
                data: AMA.models.diagnosticScanAppsData
            });
        	
        
		}
	    
		
    });
})();