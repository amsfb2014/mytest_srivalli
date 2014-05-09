/*! ListScrollLoader */
(function () {
    AMA.namespace("view.plugin");

    var DEFAULT_PAGE_SIZE = 30;

    // ListScrollLoader plug-in 
    AMA.view.plugin.ListScrollLoader = {
        __name__: "ListScrollLoader",

        // This is called automatically when ListScrollLoader plug-in is 
        // plugged into a ListView-derived object
        __onPlug__: function (options) {
            AMA.assert(this._selectItem != null, 
                    "ListScrollLoader plug-in is attached to a non-ListView object");

            this.options.pageSize = this.data && this.data.pageSize || DEFAULT_PAGE_SIZE;
            this.options.scrollContainer = options && options.scrollContainer;
            this.options.listItemType = options && options.listItemType;
            this.options.listItemClassname = options && options.listItemClassname;

            this.currentPage = 1;
            this.pageCount = 0;
            
            this._nonPaginatedDataset = this.data && this.data.toJSON() || [];
            this._mustResetPagination = true;            

            AMA.debug("ListScrollLoader plug-in has been plugged into " + this.options.el);

            if (this.options.scrollContainer) {
                AMA.debug("Linking the ListScrollLoader plug-in to scrollable element " + this.options.scrollContainer);

                // Event handler for 'scroll' event of the scrollable parent and the window
                $(this.options.scrollContainer).on("scroll", _.bind(this._onContainerScroll, this));
                $(window).on("scroll", _.bind(this._onContainerScroll, this));                
                
                this.on(AMA.view.ListView.EVENT.NEW_DATA_LOADED, _.bind(this._onContainerScroll, this));
                
            }
            
            // Event handler for filter added/removed
            this.on(AMA.view.ListView.EVENT.FILTER_ADDED, this._onFilterChange);
            this.on(AMA.view.ListView.EVENT.FILTER_REMOVED, this._onFilterChange);
        },
        
        _onFilterChange: function (event) {
            // If the filter added/removed is anything besides "pagination",
            // this means the pagination is already invalid and must be reset
            if (event.which !== "pagination") {
                this._mustResetPagination = true;
            }
        },
        
        _beforeRender: function () {
            this.__beforePlug__.ListScrollLoader._beforeRender.apply(this, arguments);

            // When resetting pagination, add filter to 
            // display the first data-page
            if (this._mustResetPagination) {
                this._addPageFilter(1);
                this._mustResetPagination = false;
            }
        },        

        _afterRender: function () {
            this.__beforePlug__.ListScrollLoader._afterRender.apply(this, arguments);

            this._nonPaginatedDataset = this._datasetBefore.pagination || [];
            this.setPageCount();

            if (this.options.scrollContainer) {
                this._renderListScrollLoader();
                $(this.options.scrollContainer).scrollTop(0);
            }
        },
        
        setPageCount: function () {
        	this.pageCount = Math.ceil(this._nonPaginatedDataset.length / this.options.pageSize);
        },
        
        toPage: function (num) {
            if (this.pageCount === 0) return;
            if (num > this.pageCount) num = this.pageCount;

            AMA.debug(this.options.el + " is switching to page " + num + " of " + this.pageCount);

            this._addPageFilter(num);
            this._applyFilters();            
            //this.options.pageSize += this._dataset.length;
            
            var content = "",
            ctr = this.$el.children(":not(.load-marker)").length;
            
			// Render each list item into content buffer
			_.each(this._dataset, function (item, index ) {
				// Compose the item markup from template + data,
				// then append to the content buffer
				index = index + ctr;
				content += _.template(this.template, this._processData(item, index));
			}, this);
			
			this.$loadMarker.before(content);
			this._setupEvents();
			
			this.setPageCount();			
			//this._addPageFilter(1);
			this.removeFilter("pagination");
			//this._applyFilters();
        },       

        _addPageFilter: function (num) {
            var range = this._getPageRange(num);

            // Add the pagination filter, ensuring a low priority
            // so that it gets applied last
            this.addFilter("pagination", function (item, index) {
                return index >= range.first && index <= range.last;
            }, 4);

            this.currentPage = num;
        },

        // Computes the index of the first and last items in a data-page
        _getPageRange: function (num) {
            var range = { 
                first: (num - 1) * this.options.pageSize,
                last: num * this.options.pageSize - 1
            };

            // If pagination is not invalidated, consider the non-paginated dataset size
            // in getting the upper limit of the range
            if (!this._mustResetPagination) {
                range.last = Math.min(range.last, this._nonPaginatedDataset.length - 1);
            }

            return range;
        },

        _renderListScrollLoader: function () {  
            AMA.debug("Rendering scroll loader of " + this.options.scrollContainer);            
            var content = "",
            itemType = this.options.listItemType,
            itemClassName = this.options.listItemClassname;
            content += "<"+itemType+" class='"+itemClassName+" load-marker loading'><span class='progressing'></span></"+itemType+">";
            
            if(this.pageCount > 1) {
            	this.$el.append(content);
            	this.$loadMarker = $(".load-marker", this.$el);
            }            	
        },

        _onContainerScroll: function () {
        	if(this.$loadMarker && this.$loadMarker.is(":visible")) {
        	    var markerRect = this.$loadMarker[0].getBoundingClientRect(),
        	    containerRect = $(this.options.scrollContainer)[0].getBoundingClientRect(),
        	    isLoadMarkerShown = (
        	        markerRect.top >= 0 &&
        	        markerRect.left >= 0 &&
        	        markerRect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && 
        	        markerRect.right <= (window.innerWidth || document.documentElement.clientWidth) && 
        	        markerRect.bottom <= containerRect.bottom        	        
        	    );
        	    
            	if(isLoadMarkerShown) {
            		this._loadNextPage();
            	}           		
        	}      	    
        },
        
        _loadNextPage: function() {
         	if(this.currentPage < this.pageCount) {
        		this.toPage(this.currentPage + 1);
        	} 
        	if(this.currentPage == this.pageCount) {
        		this.$loadMarker.hide();
        	}
        },

    };
})();