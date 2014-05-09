/*! LocateToolset */
(function () {

    AMA.namespace("view");

    /**
	 * Button Toolset for Locate
	 *
	 * @class LocateToolset
	 * @namespace view
	 * @extends AMA.view.BaseView
	 * @constructor
	 */
    var LocateToolset = AMA.view.LocateToolset = AMA.view.BaseView.extend();


    /**
	 * ID of the template
	 *
	 * @property TEMPLATE_ID
	 * @type string
	 * @static
	 * @final
	 */
    LocateToolset.TEMPLATE_ID = "locate_toolset_template";


    /**
	 * Applicable only to view classes that fetch the aggregated templates for
	 * itself and its child views, this property defines the name of the
	 * template file to load. The path is defined in AMA.config.templatePath.
	 *
	 * @property TEMPLATE_SRC
	 * @type string
	 * @static
	 * @final
	 */
    LocateToolset.TEMPLATE_SRC = "";


    /**
     * Defined CSS for every state
     *
     * @property CSS
     * @type object
     * @static
     * @final
     */
    LocateToolset.CSS = {
        CONNECTING: "connecting",
        REFINING: "refining",
        UNSUCCESSFUL: "unsuccessful",
        SUCCESS: "success",
        NORMAL: "normal",
        CANCELLED: 'cancelled'
    };


    _.extend(LocateToolset.prototype, {

    	events: {
            "click .button_locate.normal": "locate",
            "click .button_locate .tryagain": "locate",
            "click .button_locate .locateagain": "locate",
            "click .button_locate.outcome.cancelled": "locate"
        },


        /**
         * Initializes toolset view
         *
         * @override
         * @method initialize
         */
        initialize: function () {
        	LocateToolset.__super__.initialize.apply(this, arguments);

            var ActionManager = AMA.ActionManager,
            	BaseWorkflow = AMA.workflow.BaseWorkflow,
            	LocateWorkflow = AMA.workflow.LocateWorkflow;

            var workflow = new LocateWorkflow();

            ActionManager.define("locate", workflow);

            workflow.on(BaseWorkflow.EVENT.STATE_CHANGED, function (event) {
            	switch (event.state) {
            		case BaseWorkflow.STATE.INITIALIZING:
            			this.toggleDisplay(LocateToolset.CSS.CONNECTING);
                        break;
            		case LocateWorkflow.STATE.REFINING:
                    	this.toggleDisplay(LocateToolset.CSS.REFINING);
            			break;
            		default:
            	}
            	AMA.debug("Locate Toolset has switched the Locate Button state to '" + workflow.getStateName(event.state) + "' state");
            }, this);

            workflow.on(BaseWorkflow.EVENT.FINISHED, function (event) {
            	switch (event.result) {
            		case BaseWorkflow.RESULT.SUCCESSFUL:
                        this.toggleDisplay(LocateToolset.CSS.SUCCESS);
						
						// attempts to launch the survey dialog
						if (AMA.config.enableSurveys)	{
							AMA.page.openSurvey("location-success");
						}
            			break;
            		case BaseWorkflow.RESULT.FAILED:
                        this.toggleDisplay(LocateToolset.CSS.UNSUCCESSFUL);                        
            			break;
            		case BaseWorkflow.RESULT.CANCELLED:
         	 	 	 	this.toggleDisplay(LocateToolset.CSS.CANCELLED);
         	 	 	 	break;	
            		default:
            	}
            	$(".locate_toolset_countdown").html("03:00");
            	AMA.debug("Locate toolset finished with result of '" + workflow.getResultName(event.result) + "'");
            }, this);

            // Event handler for the countdown
            var o=this;
            workflow.on(BaseWorkflow.EVENT.COUNTDOWN_TICK, function (event) {
            	$(".locate_toolset_countdown").html(event.remaining);
            	 o._timeRemaining=event.remaining;
            }, this);

        },


        /**
         * toggles the given css class name
         *
         * @method toggleDisplay
         * @param action
         */
        toggleDisplay: function(action) {
            this.$el.find("." + action).show().siblings(".button_locate").hide();
        },


        /**
         * Renders ths toolset view
         *
         * @override
         * @method render
         */
        render: function () {
        	LocateToolset.__super__.render.apply(this);
        },


        /**
         * Starts the Locate workflow
         *
         * @method locate
         */
        locate: function(e) {
            e.stopPropagation();
            AMA.ActionManager.start("locate");
        },


        _afterRender: function() {
            if(AMA.models.endpoints.models[0].get("platform").indexOf("iOS") === 0) {
                this.$el.find("#button_locate_normal .tooltip").html(
                    this.$el.find(".normal_iPhone_tooltip").html()
                );
            }
        }

    });


})();

