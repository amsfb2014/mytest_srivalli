/*! Search */
(function () {
	
	AMA.namespace("view.plugin");
	
	var SEARCH_DELAY = 100;

	// Search plug-in 
	AMA.view.plugin.Search = {
			
		__name__: "Search",
			
		// This is called automatically when Search plug-in is 
		// plugged into a host ListView object
		__onPlug__: function (options) {
			AMA.assert(this._selectItem != null, 
			"Search plug-in is attached to a non-ListView object");
			
			this.options.searchFields = options && options.searchFields || [];
			
			this.options.searchInput = options && options.searchInput;
			
			AMA.debug("Search plug-in has been attached to " + this.options.el);

			// If any search input field is specified in the options,
			// initialize the event handling
			if (this.options.searchInput) {
				AMA.debug("Linking the Search plug-in to search input field");
				$(this.options.searchInput).on("keyup", _.bind(this._onSearchKeyUp, this));
				this.__lastSearchKeyword = "";
			}
		},
		
		_onSearchKeyUp: function (okButton) {
			// Do not respond to search input if Contacts List
			// has not yet finished rendering
			if (!this.isRendered) return;
			
			// Callback function for search keyup delay
			function afterDelay() {
				var currentTime = new Date().getTime();
				
				// Check if enough time has elapsed since latest keyup event
				if (currentTime >= this.__searchKeyUpTime + SEARCH_DELAY) {
					var keyword = $(this.options.searchInput).val();
					
					// Perform search only if current keyword is not the same as previous
					if (keyword.toLowerCase() !== this.__lastSearchKeyword.toLowerCase()|| okButton==true) {
						this.__lastSearchKeyword = keyword;
						this.search(keyword);
					}
				}				
			}
			
			// Capture the time of this keyup event
			this.__searchKeyUpTime = new Date().getTime();
			
			// Allow some delay before responding
			setTimeout(_.bind(afterDelay, this), SEARCH_DELAY);					
		},
		
		search: function (val) {
			if (val) {
				AMA.debug("Searching " + this.options.el + " for '" + val + "'");
				
				// Filter the items where any of its fields that belong to the
				// 'searchFields' option has a value that matches (case-insensitive)
				// the search value
				this.addFilter("search", function (item) {

					// This filtering is short-circuited (stops on first match)
					return _.some(this.options.searchFields, function (key) {
						var fieldVal = item[key] && item[key].toString().toLowerCase();
						return fieldVal && fieldVal.indexOf(val.toLowerCase()) !== -1;
					});
				});
			} else {
				AMA.debug("Clearing search filter on " + this.options.el);
				
				this.removeFilter("search");
			}
			this._doRender();
		}
	};
})();