/*! InputPlaceholder */
(function () {
	
	AMA.namespace("view.plugin");

	var DEFAULT_CSS = "inputfadedtext";
	
	// InputPlaceholder plug-in 
	AMA.view.plugin.InputPlaceholder = {
			
		__name__: "InputPlaceholder",	
			
		// This is called automatically when InputPlaceholder plug-in is 
		// plugged into a host View object
		__onPlug__: function (options) {
			AMA.assert(this.getChild != null, 
				"InputPlaceholder plug-in is attached to a non-view host object");
			
			this.options.inputPlaceholderCss = options && options.css || DEFAULT_CSS;
		},	
		
		// Override the _setupEvents method so that it sets the proper handling
		// of the placeholder text of <input> elements on focus and on blur.
		_setupEvents: function () {
			// Call the original _afterRender of the view
			this.constructor.prototype._setupEvents.apply(this, arguments);
			
			var o = this;
			
			this.$el.find("[placeholder]").focus(function () {
				var input = $(this);
				
				if (input.val() == input.attr("placeholder")) {
					input.val("");
					input.removeClass(o.options.inputPlaceholderCss);
				}
			})
			.blur(function () {
				var input = $(this);
				
				if (input.val() == "" || input.val() == input.attr("placeholder")) {
					input.addClass(o.options.inputPlaceholderCss);
					input.val(input.attr("placeholder"));
				}
			})
			.blur();	
		}
		
	};
	
})();

