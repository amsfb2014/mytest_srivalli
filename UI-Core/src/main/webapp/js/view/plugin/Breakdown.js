/* Breakdown */
(function () {
	
	AMA.namespace("view.plugin");
	var count;
	
	// Breakdown plug-in 
	AMA.view.plugin.Breakdown = {
			
		__name__: "Breakdown",	
			
		// This is called automatically when Breakdown plug-in is 
		// plugged into a ListView-derived object
		__onPlug__: function (options) {
			AMA.assert(this._selectItem != null, 
					"Breakdown plug-in is attached to a non-ListView object");
			
			this.options.breakdownContainer = options && options.breakdownContainer;
			
			AMA.debug("Breakdown plug-in has been plugged into " + this.options.el);
			
			if (this.options.breakdownContainer) {
				this._$breakdownContainer = $(this.options.breakdownContainer);
				this._$breakdownContainer.hide();
			}
		},
		
		_afterRender: function () {
			var syncedWithPhone = this._$breakdownContainer.find(".syncedwithphone_val"),
				savedOnWeb = this._$breakdownContainer.find(".savedonweb_val"),
				toBeSynced = this._$breakdownContainer.find(".tobesynced_val");
			
			syncedWithPhone.html(this.data.attributes.totalSynced || "0");
			savedOnWeb.html(this.data.attributes.total || "0");
			toBeSynced.html(this.data.attributes.totalPendingSync || "0");
			
			this.parent.$el.find(".record_breakdown_spinner").hide();
			this._$breakdownContainer.show();
		}
	};
})();

