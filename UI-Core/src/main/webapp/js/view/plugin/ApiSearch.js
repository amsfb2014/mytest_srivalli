/*! Search */
(function () {
	
	AMA.namespace("view.plugin");
	
	var SEARCH_DELAY = 1000,
		SEARCH_PARAM = "&keyword=";

	// Search plug-in 
	AMA.view.plugin.ApiSearch = {
		__name__: "ApiSearch",
			
		// This is called automatically when Search plug-in is 
		// plugged into a host ListView object
		__onPlug__: function (options) {
			AMA.assert(this._selectItem != null, 
			"Search plug-in is attached to a non-ListView object");
			
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

		_afterRender: function () {
			this._invalidateFromSearch = false;
			if (this.data.url.indexOf(SEARCH_PARAM) > -1) {
				this._invalidateFromSearch = true;
			}

			this.__beforePlug__.ApiSearch._afterRender.apply(this, arguments);
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
			var options = {
					params: {}
				};

			if (val) {
				options.params.keyword = val;

				AMA.debug("Searching " + this.options.el + " for '" + val + "'");
				
				// Invalidate the data, including the keyword parameter in the request
				this.data.invalidate(options);
			} else {
				AMA.debug("Clearing search filter on " + this.options.el);
				
				this.data.invalidate();
			}
		}
	};
})();