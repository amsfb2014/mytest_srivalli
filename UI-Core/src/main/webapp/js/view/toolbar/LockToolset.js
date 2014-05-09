/*! LockToolset */
(function () {

    AMA.namespace("view");

    var LockToolset = AMA.view.LockToolset = AMA.view.BaseView.extend();

    // NOTE: beginning prefix of *_tool_template prefix must match string in LocateTab.TOOLBAR
    LockToolset.TEMPLATE_ID = "lock_toolset_template";
    LockToolset.TEMPLATE_SRC = "";
    
    LockToolset.CSS = {
        CONNECTING: "connecting",
        UNSUCCESSFUL: "unsuccessful",
        SUCCESS: "locked",
        NORMAL: "normal"
    };
	
	LockToolset.STATUS = "";

    
    _.extend(LockToolset.prototype, {
    
    	events: {
            "click .button_lock.normal, .button_lock.unsuccessful .tryagain": "lock"
        },
        
        
        initialize: function () {
            LockToolset.__super__.initialize.apply(this, arguments);

            var ActionManager = AMA.ActionManager,
            	BaseWorkflow = AMA.workflow.BaseWorkflow,
            	LockWorkflow = AMA.workflow.LockWorkflow;
        
            var workflow = new LockWorkflow();
            
            ActionManager.define("lock", workflow);
                        
            workflow.on(BaseWorkflow.EVENT.STATE_CHANGED, function (event) {
            	switch (event.state) {
            		case BaseWorkflow.STATE.INITIALIZING:
            			AMA.debug("Lock Toolset has switched the Lock Button state to 'connecting'; countdown initialized");
            			
            			this.toggleDisplay(LockToolset.CSS.CONNECTING);
                        break;
            			
            		default:
                        break;
            	}
            }, this);
            
            workflow.on(BaseWorkflow.EVENT.FINISHED, function (event) {
            	switch (event.result) {
            		case BaseWorkflow.RESULT.SUCCESSFUL:
                        this.toggleDisplay(LockToolset.CSS.SUCCESS);                     
            			break;
            		default:
                        this.toggleDisplay(LockToolset.CSS.UNSUCCESSFUL);
            	}
            }, this);
            
            // Event handler for the countdown
            var o=this;
            workflow.on(BaseWorkflow.EVENT.COUNTDOWN_TICK, function (event) {
                 $("#lock_toolset_countdown").html(event.remaining);
                 o._timeRemaining=event.remaining;
            }, this);
            Backbone.globalEvent.on("DeviceSettingChanged",function(){
            	if(AMA.models.devicesettings.models.length > 0 && AMA.models.devicesettings.models[0].get("current_lockstatus")){
                   	o.toggleDisplay(LockToolset.CSS.SUCCESS);
                   }
            	else{
            		o.toggleDisplay(LockToolset.CSS.NORMAL);
            	}
            });
			
        },


		 _processData: function(item) {
			this.STATUS = item.current_lockstatus;
			
            return item;
        },


        toggleDisplay: function(action) {
            this.$el.find("." + action).show().siblings(".button_lock").hide();
        },
        
        
        render: function () {
            LockToolset.__super__.render.apply(this);
		
			switch (this.STATUS) {
				case 1:
            		AMA.debug("Lock Toolset has switched the Lock Button state to 'locked'");
            		this.toggleDisplay(LockToolset.CSS.SUCCESS);
            	
                    break;
            		
            	default:
					this.toggleDisplay(LockToolset.CSS.NORMAL);
            }
		},
        
        
        lock: function() {
            AMA.ActionManager.start("lock");
        }

    });


})();

