/*! Switcher */
(function () {

	AMA.namespace("view.plugin");

	// Switcher plug-in
	AMA.view.plugin.Switcher = {

		__name__: "Switcher",

		// This is called automatically when Switcher plug-in is
		// plugged into a host View object
		__onPlug__: function (options) {
			AMA.assert(this.getChild != null,
					"Switcher plug-in is attached to a non-view host object");

			this.options.defaultTab = options && options.defaultTab || this.options.defaultTab;
            this.SWITCH_VIEW_EVENT = "switchview";
		},

		// 'el' can either be an element ID or a View object
		switchTo: function (el) {
			var tab = (typeof el.show === "function") ? el : this.getChild(el);
			if (!tab || tab.parent !== this) {
				AMA.error("[Switcher] '" + el + "' is not a child view of '" + this.$el.attr("id") + "'.");
				return;
			}

			AMA.debug(this.options.el + " is switching to tab " + tab.options.el);

			this.currentTab = tab;

			_.each(this.children, function (v) {
				v.hide();
			});
			tab.show();

            this.trigger(this.SWITCH_VIEW_EVENT, {to: tab});
			
			return this.currentTab;
		},

		// Override the _afterRender method so that it shows the default tab
		// instead of rendering all child views
		_afterRender: function () {
			this.switchTo(this.options.defaultTab || this.children[0]);

		}

	};

})();

