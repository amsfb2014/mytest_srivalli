/*! DiagnosticScanToolset */
(function () {

    AMA.namespace("view");

    var DiagnosticScanToolset = AMA.view.DiagnosticScanToolset = AMA.view.BaseView.extend();

    DiagnosticScanToolset.TEMPLATE_ID = "diagnostic_scan_toolset_template";
    DiagnosticScanToolset.TEMPLATE_SRC = "";
    
    DiagnosticScanToolset.CSS = {
        CONNECTING: "connecting",
        UNSUCCESSFUL: "unsuccessful",
        SUCCESS: "scanned",
		SCANNING: "scanning",
        NORMAL: "normal"
    };

    
    _.extend(DiagnosticScanToolset.prototype, {

		events: {
            "click #button_healthscan_normal, .button_healthscan .tryagain": "scan",
            "click .health_scan_view_details": "showDiagnosticResults"
        },

		
		initialize: function () {
            DiagnosticScanToolset.__super__.initialize.apply(this, arguments);

            var ActionManager = AMA.ActionManager,
            	BaseWorkflow = AMA.workflow.BaseWorkflow,
            	DiagnosticScanWorkflow = AMA.workflow.DiagnosticScanWorkflow;
        
            var workflow = new DiagnosticScanWorkflow();
            
            ActionManager.define("diagnosticScan", workflow);
                        
            workflow.on(BaseWorkflow.EVENT.STATE_CHANGED, function (event) {
            	switch (event.state) {
            		case BaseWorkflow.STATE.INITIALIZING:
            			AMA.debug("Diagnostic Scan Toolset has switched the Scan Button state to 'connecting'; countdown initialized");
            			
            			this.toggleDisplay(DiagnosticScanToolset.CSS.CONNECTING);
                        break;
            			
            		case DiagnosticScanWorkflow.STATE.SCANNING:	
            			AMA.debug("Diagnostic Scan Toolset has switched the Scan Button state to 'scanning'");
            			
                    	this.toggleDisplay(DiagnosticScanToolset.CSS.SCANNING);
            			break;
            			
            		default:
            	}
            }, this);
            
            workflow.on(BaseWorkflow.EVENT.FINISHED, function (event) {
            	switch (event.result) {
            		case BaseWorkflow.RESULT.SUCCESSFUL:
                        this.toggleDisplay(DiagnosticScanToolset.CSS.SUCCESS);
						
						// attempts to launch the survey dialog
						if (AMA.config.enableSurveys) {
							//var surveyDialogView = new AMA.view.SurveyDialog({el:"#surveydialog"});
							AMA.page.openSurvey("health-scan-success");
						}
						
            			break;
            		default:
                        this.toggleDisplay(DiagnosticScanToolset.CSS.UNSUCCESSFUL);
            			$(".diagnostic_toolset_countdown.countdown_amount").html("5:00");
            			break;
            	}
            }, this);
            
            // Event handler for the countdown
            workflow.on(BaseWorkflow.EVENT.COUNTDOWN_TICK, function (event) {
                 $(".diagnostic_toolset_countdown").html(event.remaining);
            }, this);

        },


		toggleDisplay: function(action) {
            this.$el.find("." + action).show().siblings(".button_healthscan").hide();
        },


        render: function () {
            DiagnosticScanToolset.__super__.render.apply(this);
        },


        scan: function() {
            AMA.ActionManager.start("diagnosticScan");
        },


        showDiagnosticResults: function(){
            var height=$("#support_tab")[0].scrollHeight;
            this.toggleDisplay(DiagnosticScanToolset.CSS.NORMAL);
            $("#support_tab").scrollTop(height);
        }
    });

})();

