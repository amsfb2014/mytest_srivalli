/*! LearnMore */
(function () {

    AMA.namespace("view");

    var LearnMore = AMA.view.LearnMore = AMA.view.Dialog.extend();

    LearnMore.TEMPLATE_ID = "Learn_More_template";
    LearnMore.TEMPLATE_SRC = "";
    
    LearnMore.WIDTH = 650;
    LearnMore.HEIGHT = "auto";

    _.extend(LearnMore.prototype, {

    	initialize: function () {

    		// Set the width and height prior to initialization
            this.options.width = LearnMore.WIDTH;
            this.options.height = LearnMore.HEIGHT;
            LearnMore.__super__.initialize.apply(this, arguments);
    	},

        show: function () {
            this.$el.find("." + arguments[0]).removeClass("hidden").siblings("div").addClass("hidden");
        	LearnMore.__super__.show.apply(this, arguments);
        }
    });

})();