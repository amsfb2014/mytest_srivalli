/*! ScanToolset */
(function () {

    AMA.namespace("view");

    var ScanToolset = AMA.view.ScanToolset = AMA.view.BaseView.extend();

    ScanToolset.TEMPLATE_ID = "scan_toolset_template";
    ScanToolset.TEMPLATE_SRC = "";
    
    ScanToolset.CSS = {
        CONNECTING: "connecting",
        UNSUCCESSFUL: "unsuccessful",
        SUCCESS: "scanned",
		SCANNING: "scanning",
        NORMAL: "normal"
    };


    _.extend(ScanToolset.prototype, {

        events: {
            "click #button_scan_normal, .button_security_scan .tryagain,#button_scan_ended": "scan",
            "click #edit_security_settings": "editSecuritySettings"
        },


        editSecuritySettings: function(e){
            e.stopImmediatePropagation();  // prevent scan button from triggering after settings
            AMA.page.openSettings("security", "home/security");
        },


        initialize: function () {
            ScanToolset.__super__.initialize.apply(this, arguments);

            var ActionManager = AMA.ActionManager,
            	BaseWorkflow = AMA.workflow.BaseWorkflow,
            	ScanWorkflow = AMA.workflow.ScanWorkflow;
        
            var workflow = new ScanWorkflow();
            
            ActionManager.define("scan", workflow);
            
			// FIX ME: Do proper solution on next iteration.
			// workaround for device-invoked scan auto-refresh, there's no dirty bit being returned
			// stops polling when Manual Scan is invoked
			workflow.on(BaseWorkflow.EVENT.STARTED, function (event) {
				clearInterval(AMA.view.ThreatProtectionView.POLLER);
            }, this);
						
            workflow.on(BaseWorkflow.EVENT.STATE_CHANGED, function (event) {
            	switch (event.state) {
            		case BaseWorkflow.STATE.INITIALIZING:
            			AMA.debug("Scan Toolset has switched the Scan Button state to 'connecting'; countdown initialized");
            			
            			this.toggleDisplay(ScanToolset.CSS.CONNECTING);
                        break;
            			
            		case ScanWorkflow.STATE.SCANNING:	
            			AMA.debug("Scan Toolset has switched the Scan Button state to 'scanning'");
            			
                    	this.toggleDisplay(ScanToolset.CSS.SCANNING);
            			break;
            			
            		default:
            	}
            }, this);
            
            workflow.on(BaseWorkflow.EVENT.FINISHED, function (event) {
				
				// FIX ME: Do proper solution on next iteration.
				// workaround for device-invoked scan auto-refresh, there's no dirty bit being returned
				// restarts polling when Manual Scan is invoked
				AMA.view.ThreatProtectionView.POLLER = setInterval(function() { AMA.models.threats.invalidate(); }, 30000); 
				
            	switch (event.result) {
            		case BaseWorkflow.RESULT.SUCCESSFUL:
                        this.toggleDisplay(ScanToolset.CSS.SUCCESS);                     
            			break;
            		default:
                        this.toggleDisplay(ScanToolset.CSS.UNSUCCESSFUL);
            	}
            }, this);
            
            // Event handler for the countdown
            workflow.on(BaseWorkflow.EVENT.COUNTDOWN_TICK, function (event) {
                 $(".scan_toolset_countdown").html(event.remaining);
            }, this);

        },
		

        toggleDisplay: function(action) {
            this.$el.find("." + action).show().siblings(".button_security_scan").hide();
        },
        

        render: function () {
            ScanToolset.__super__.render.apply(this);
        },
		

        scan: function() {
            AMA.ActionManager.start("scan");
        }
    });

})();

