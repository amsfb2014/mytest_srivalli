/*! Tooltip */
(function () {

    AMA.namespace("view.plugin");

    // Tooltip plug-in
    AMA.view.plugin.Tooltip = {

        __name__: "Tooltip",

        // This is called automatically when Switcher plug-in is
        // plugged into a host View object
        __onPlug__: function (options) {
            AMA.assert(this.getChild != null,
                    "Tooltip plug-in is attached to a non-view host object");

            /**
             * TODO: create an on click event... for tooltip;
             *
             */
            this.defaults = _.extend({
                mouseOutDelay: 750
            }, options);


            // this._setTooltip();
        },

        _afterRender: function() {
			this.__beforePlug__.Tooltip._afterRender.apply(this, arguments);
        	
            var that = this;
            this.$el.find(".tooltip_icon, .tooltip_link").unbind().on("mouseover", function() {
            	var that = $(this);
            	if (that.siblings(".tooltip").html() != "") {
            		that.addClass("open")
                        .siblings(".tooltip")
                        .show()
                        .unbind()
                        .on("mouseenter", function() {
                            $(this).addClass("openTooltip");
                        })
                        .on("mouseleave", function() {
                            $(this).hide();
                            $(this).removeClass("openTooltip");
                        });
            	}
            }).on("mouseleave", function() {
                var self = this;
                setTimeout(function() {
                    if (!$(self).siblings(".tooltip").hasClass("openTooltip")) {
                        $(self).removeClass("open").siblings(".tooltip").hide();
                    }
                }, that.defaults.mouseOutDelay)
        });


}

    };

})();

