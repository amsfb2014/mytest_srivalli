/*! MultiAction */
(function () {
	
	AMA.namespace("view.plugin");
	
	AMA.view.plugin.MultiAction = {
			
		__name__: "MultiAction",
		
		__onPlug__: function (options) {
			AMA.assert(this._selectItem != null, 
					"MultiAction plug-in is attached to a non-ListView object");
			
			this.options.dropDown = options && options.dropDown;
			this.options.performButton = options && options.performButton;
			
			AMA.debug("MultiAction plug-in has been plugged into " + this.options.el);
			
			if (this.options.dropDown && this.options.performButton) {
				this._$multiActionSelect = $(this.options.dropDown);
				this._$multiActionPerform = $(this.options.performButton);
				AMA.debug("Linking the MultiAction plug-in to the 'Action' drop down element and 'Perform' button");
				
				// Event handler for Perform button
				this._$multiActionPerform.on("click", _.bind(this.processBatchAction, this));
			}
		}
	};
})();

