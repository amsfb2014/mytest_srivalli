/*! ApiListScrollLoader */
(function () {
    AMA.namespace("view.plugin");

    var DEFAULT_PAGE_SIZE = 30;

    // ApiListScrollLoader plug-in 
    AMA.view.plugin.ApiListScrollLoader = {
        __name__: "ApiListScrollLoader",

        // This is called automatically when ApiListScrollLoader plug-in is 
        // plugged into a ListView-derived object
        __onPlug__: function (options) {
            AMA.assert(this._selectItem != null, 
                    "ApiListScrollLoader plug-in is attached to a non-ListView object");

            this.options.pageSize = this.data && this.data.pageSize || DEFAULT_PAGE_SIZE;
            this.options.scrollContainer = options && options.scrollContainer;
            this.options.listItemType = options && options.listItemType;
            this.options.listItemClassname = options && options.listItemClassname;
            this.options.editorElement = options && options.editorElement;

            this.currentPage = 1;
            this.pageCount = 0;
            this.touchStart = false;

            AMA.debug("ApiListScrollLoader plug-in has been plugged into " + this.options.el);

            if (this.options.scrollContainer) {
                AMA.debug("Linking the ApiListScrollLoader plug-in to scrollable element " + this.options.scrollContainer);

             // Event handler for 'scroll' event of the scrollable parent and the window
                $(this.options.scrollContainer).on("scroll", _.bind(this._onContainerScroll, this));
                $(window).on("scroll", _.bind(this._onContainerScroll, this));   
             
                this.on(AMA.view.ListView.EVENT.NEW_DATA_LOADED, _.bind(this._onContainerScroll, this));
            }


        },

        _afterRender: function () {
            this.__beforePlug__.ApiListScrollLoader._afterRender.apply(this, arguments);

            this.pageCount = Math.ceil(this.data.attributes.total / this.data.pageSize);
            this.currentPage = 1;            

            if (this._invalidateFromSearch) {
                this.pageCount = Math.ceil(this.data.length / this.data.pageSize);
            }

            if (this.options.scrollContainer) {
            	$(this.options.scrollContainer).scrollTop(0);
                this._renderListScrollLoader();
            }
            $(document).on('mousemove', ".scroll-gesture", $.proxy(this.onMouseMove, this))
            $(document).on("mousedown", ".scroll-gesture", $.proxy(this.onMouseDown, this));
        },
        
        _renderListScrollLoader: function () {  
            AMA.debug("Rendering scroll loader of " + this.options.scrollContainer);            
            var content = "",
            itemType = this.options.listItemType,
            itemClassName = this.options.listItemClassname;
            content += "<"+itemType+" class='"+itemClassName+" load-marker loading'><span class='progressing'></span></"+itemType+">";
            
            if(this.pageCount > 1 && this.currentPage != this.pageCount) {
            	this.$el.append(content);
            	this.$loadMarker = $(".load-marker", this.$el);
            }            	
        },

        _onContainerScroll: function () {
        	if(this.options.editorElement && $(this.options.editorElement).is(":visible")) {
        		return;
        	}
        	
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
	       	if (!this.data.isFetching) {
	            if (this.currentPage >= this.pageCount) {
	            	this.data.offset = 0;
	            	this.$loadMarker.hide();	
	            	
	            	return;
	            	
	            } else {
	                this.data.offset = (this.currentPage) * this.data.pageSize;
	            }
	
	            this.currentPage = (this.data.offset / this.data.pageSize) + 1;  
	            
	            var o = this;
	        	this.data.fetch({
	        		reset: false, 
	        		remove: false, 
	        		silent: true,
	        		success: function(collection, resp) {
	        			//o.refresh();
	        			var content = "";
	        			_.each( collection.models.slice(o.data.offset, collection.models.length), function(model, index) {
	        			    content += _.template(o.template, o._processData(model.attributes, index));
	        			});
	        			
	        			o.$loadMarker.before(content);
	        			o._setupEvents();
	        		},
	        		complete: function() {
	        			o.data.offset = 0;
	        		}
	        	});    
	    	}
        },
        onMouseDown: function(e) {
            this.touchStart = true
            //console.debug(e);
            this.axis = {
                y: e.clientY,
                offset: e.offsetY,
                screen: e.screenY
            };
            $(document).on('mouseup mouseout', ".scroll-gesture", function() {
                this.touchStart = false

            });


        },
        onMouseMove: function(e) {
            if(!this.touchStart) return;
            //console.debug(this.axis)
            //console.debug(e.clientY, e.offsetY, e.screenY);
            this.$el.find(".scroll-gesture").animate({
                top: ""
            })

        }

    };
})();