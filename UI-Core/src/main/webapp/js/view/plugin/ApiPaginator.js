/*! ApiPaginator */
(function () {
    AMA.namespace("view.plugin");

    var DEFAULT_PAGE_SIZE = 30;

    // Paginator plug-in 
    AMA.view.plugin.ApiPaginator = {
        __name__: "ApiPaginator",

        // This is called automatically when Paginator plug-in is 
        // plugged into a ListView-derived object
        __onPlug__: function (options) {
            AMA.assert(this._selectItem != null, 
                    "Paginator plug-in is attached to a non-ListView object");

            this.options.pageSize = this.data && this.data.pageSize || DEFAULT_PAGE_SIZE;
            this.options.pageSelector = options && options.pageSelector;

            this.currentPage = 1;
            this.pageCount = 0;

            AMA.debug("Paginator plug-in has been plugged into " + this.options.el);

            if (this.options.pageSelector) {
                AMA.debug("Linking the Paginator plug-in to page selector element");

                // Event handler for 'change' event on page selector
                $(this.options.pageSelector).on("change", _.bind(this._onPageSelectorChange, this));
            }
        },

        _afterRender: function () {
            this.__beforePlug__.ApiPaginator._afterRender.apply(this, arguments);

            this.pageCount = Math.ceil(this.data.attributes.total / this.data.pageSize);

            if (this._invalidateFromSearch) {
                this.pageCount = Math.ceil(this.data.length / this.data.pageSize);
            }

            if (this.options.pageSelector) {
                this._renderPageSelector();
            }

            // Handle emptied last pages by switching to the previous page
            if (this.currentPage > this.pageCount) {
                this._onPageSelectorChange();
            }
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
                first: (num - 1) * this.data.pageSize,
                last: Math.min(num * this.data.pageSize - 1, this.data.attributes.total - 1)
            };

            if (this._invalidateFromSearch) {
                range.last = Math.min(num * this.data.pageSize - 1, this.data.length - 1);
            }

            return range;
        },

        _renderPageSelector: function () {  
            AMA.debug("Rendering page selector of " + this.options.el);

            var i, r,
                content = "",
                $select = $(this.options.pageSelector);
            
            for (i = 1; i <= this.pageCount; i++) {
                r = this._getPageRange(i);

                content += "<option value='" + i + "'>" + (r.first+1) + " - " + (r.last+1) + "</option>";
            }

            if(r) {
                if(r.first + 1 === 1 && r.last + 1 === 1 ) {
                    $select.closest("#ct_batchselect").hide()
                } else {
                    $select.closest("#ct_batchselect").show()
                }
            } else {
                $select.closest("#ct_batchselect").hide()
            }

            // Set the content of the page selector
            $select.html(content);

            // Disable the page selector if the list is empty
            $select.prop("disabled", this._items.length === 0);

            // Set the selection on the page selector to match the current data-page
            $select.val(this.currentPage);
        },

        _onPageSelectorChange: function () {
            var $select = $(this.options.pageSelector);

            if (this.currentPage > this.pageCount) {
                this.data.offset = (this.currentPage - 2) * this.data.pageSize;
            } else {
                this.data.offset = ($select.val() - 1) * this.data.pageSize;
            }

            this.currentPage = (this.data.offset / this.data.pageSize) + 1;

            AMA.debug(this.options.el + " is switching to page " + this.currentPage + " of " + this.pageCount);
            $select.val(this.currentPage);
            this.data.invalidate();
        }
    };
})();