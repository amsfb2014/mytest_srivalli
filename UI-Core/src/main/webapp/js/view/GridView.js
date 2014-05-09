/*! GridView */
(function () {
	
	AMA.namespace("view");

	var GridView = AMA.view.GridView = AMA.view.ListView.extend();
	
	GridView.TEMPLATE_ID = "";
	GridView.TEMPLATE_SRC = "";
	
	// CSS classes used in rendering
	GridView.CSS = {
		ITEM: "rt_rowmedia",
		BTN_CONTAINER: "buttoncontainer",
		BTN_VIEWFULLSIZE: "btn_viewfullsize",
		BTN_ADDTOPHONE: "btn_addtophone",
		BTN_REMOVEFROMPHONE: "btn_removefromphone"
	};
	
	// GridView.STATUS_TEXTS = {
		// ON_PHONE: "On Phone",
		// ADDED_AT_NEXT_SYNC: "Added At Next Sync",
		// REMOVED_AT_NEXT_SYNC: "Removed At Next Sync",
		// WEB_ONLY: "Web only"
	// };
	
	GridView.FILE_URLS = [];
	GridView.FILE_SIZES = [];


	AMA.augment(GridView.prototype, {
		initialize: function () {
			GridView.__super__.initialize.apply(this, arguments);
			
			// Variable declarations
			this._fileURLs = this.constructor.FILE_URLS || GridView.FILE_URLS;
			this._fileSizes = this.constructor.FILE_SIZES || GridView.FILE_SIZES;
			//this._statusTexts = GridView.STATUS_TEXTS;
		},
		
		render: function () {
			GridView.__super__.render.apply(this, arguments);
			
			// Populate fileURLs and fileSizes collections
			var data = this.data.models.length > 0 && this.data.models[0].list ? this.data.models[0].list.toJSON() : [];
			_.each(data, function (item, index) {
				this._fileURLs.push(item.fileUrl + "&fileName=" + item.fileName);
				this._fileSizes.push(this.bytesToSize(item.fileSize));
			}, this);
		},
		
		/**
		* Convert number of bytes into human readable format
		*
		* @param integer bytes     Number of bytes to convert
		* @return string
		* 
		* Implementation from: http://codeaid.net/javascript/convert-size-in-bytes-to-human-readable-format-(javascript)
		* 
		*/ 
		bytesToSize: function (bytes) {
			var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
			
			// This implementation uses the nearest whole number unit with one decimal point to get more precise file size
			if (bytes == 0) return '0 ' + sizes[0];
			var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
			return ((i == 0)? (bytes / Math.pow(1024, i)) : (bytes / Math.pow(1024, i)).toFixed(1)) + ' ' + sizes[i];
								
			// Core implementation, using GB as storage unit with three decimal points to reflect storage used until MB
			// This implementation was intended to make it easier for user to understand 
			/*
			if (bytes == 0) return '0.000 ' + sizes[3];
			return (bytes / Math.pow(1024, 3)).toFixed(3) + ' ' + sizes[3];
			*/
		},
		
		_getStatusText: function(item) {
			if (item.pendingCreate) {
				this.$el.find("#ct_row_" + item.id + " .rt_endpointsync_text.added_next_sync").removeClass("hidden");
                this.$el.find("#ct_row_" + item.id + " .buttoncontainer").addClass("web_only");
            }
			else if (item.pendingDelete && item.onPhone) {
				this.$el.find("#ct_row_" + item.id + " .rt_endpointsync_text.removed_next_sync").removeClass("hidden");
			}
			else if (item.onPhone) {
				this.$el.find("#ct_row_" + item.id + " .rt_endpointsync_text.on_phone").removeClass("hidden");
			}
			else {
				this.$el.find("#ct_row_" + item.id + " .rt_endpointsync_text.web_only").removeClass("hidden");
                this.$el.find("#ct_row_" + item.id + " .buttoncontainer").addClass("web_only");
			}
		},
		
		_setAddRemoveButton: function(item) {
			if (!this._isIPhone || (this._isIPhone && !item.onPhone)) {
				if (item.onPhone || item.pendingCreate) {
					this.$el.find("#ct_row_" + item.id + " ." + this._css.BTN_REMOVEFROMPHONE).removeClass("hidden");
				}
				else {
					this.$el.find("#ct_row_" + item.id + " ." + this._css.BTN_ADDTOPHONE).removeClass("hidden");
				}
			}
		}
	});	
	
})();
