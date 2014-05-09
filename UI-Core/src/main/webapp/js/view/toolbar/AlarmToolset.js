/*! AlarmToolset */
(function () {

    AMA.namespace("view");

    var AlarmToolset = AMA.view.AlarmToolset = AMA.view.BaseView.extend();

    // NOTE: beginning prefix of *_tool_template prefix must match string in DataTab.TOOLBAR
    AlarmToolset.TEMPLATE_ID = "alarm_toolset_template";
    AlarmToolset.TEMPLATE_SRC = "";
    
    AlarmToolset.CSS = {
        CONNECTING: "connecting",
        SOUNDING: "sounding",
        UNSUCCESSFUL: "unsuccessful",
        SUCCESS: "success",
        NORMAL: "normal"
    };

    
    _.extend(AlarmToolset.prototype, {
    
    	events: {
            "click .button_alarm": "alarm"
        },
        
        
        initialize: function () {
            AlarmToolset.__super__.initialize.apply(this, arguments);

            var ActionManager = AMA.ActionManager,
            	BaseWorkflow = AMA.workflow.BaseWorkflow,
            	AlarmWorkflow = AMA.workflow.AlarmWorkflow;
        
            var workflow = new AlarmWorkflow();
            
            ActionManager.define("alarm", workflow);
                        
            workflow.on(BaseWorkflow.EVENT.STATE_CHANGED, function (event) {
            	switch (event.state) {
            		case BaseWorkflow.STATE.INITIALIZING:
            			AMA.debug("Alarm Toolset has switched the Alarm Button state to 'connecting'; countdown initialized");
            			
            			this.toggleDisplay(AlarmToolset.CSS.CONNECTING);
                        break;
            			
            		case AlarmWorkflow.STATE.SOUNDING:	
            			AMA.debug("Alarm Toolset has switched the Alarm Button state to 'sounding'");
            			
                    	this.toggleDisplay(AlarmToolset.CSS.SOUNDING);
            			break;
            			
            		default:
            	}
            }, this);
            
            workflow.on(BaseWorkflow.EVENT.FINISHED, function (event) {
            	switch (event.result) {
            		case BaseWorkflow.RESULT.SUCCESSFUL:
                        this.toggleDisplay(AlarmToolset.CSS.SUCCESS);                     
            			break;
            		default:
                        this.toggleDisplay(AlarmToolset.CSS.UNSUCCESSFUL);
            	}
            }, this);
            
            // Event handler for the countdown
            var o=this;
            workflow.on(BaseWorkflow.EVENT.COUNTDOWN_TICK, function (event) {
                 $(".alarm_toolset_countdown").html(event.remaining);
                 o._timeRemaining=event.remaining;
            }, this);

        },
        

        toggleDisplay: function(action) {
            this.$el.find("." + action).show().siblings(".button_alarm").hide();
        },
        
        
        render: function () {
            AlarmToolset.__super__.render.apply(this);
        },
        
        
        alarm: function() {
            AMA.ActionManager.start("alarm");
        }

    });


})();

