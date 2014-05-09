/*! Paginator */
(function () {
    AMA.namespace("view.plugin");

    var DEFAULT_PAGE_SIZE = 30;

    // Paginator plug-in 
    AMA.view.plugin.Paginator = {

        __name__: "Paginator",

        // This is called automatically when Paginator plug-in is 
        // plugged into a ListView-derived object
        __onPlug__: function (options) {
            AMA.assert(this._selectItem != null, 
                    "Paginator plug-in is attached to a non-ListView object");

            this.options.pageSize = options && options.pageSize || DEFAULT_PAGE_SIZE;
            this.options.pageSelector = options && options.pageSelector;

            this.currentPage = 1;
            this.pageCount = 0;

            this._nonPaginatedDataset = this.data && this.data.toJSON() || [];

            this._mustResetPagination = true;

            AMA.debug("Paginator plug-in has been plugged into " + this.options.el);

            if (this.options.pageSelector) {
                AMA.debug("Linking the Paginator plug-in to page selector element");

                // Event handler for 'change' event on page selector
                $(this.options.pageSelector).on("change", _.bind(this._onPageSelectorChange, this));
            }

            // Event handler for filter added/removed
            this.on(AMA.view.ListView.EVENT.FILTER_ADDED, this._onFilterChange);
            this.on(AMA.view.ListView.EVENT.FILTER_REMOVED, this._onFilterChange);

/*          // Event handler for updating paginator
            var o = this;
            var flag = false;
            this.data.on(AMA.model.UserData.EVENT.SAVED, function() {
                    o._onDataUpdate();
            });
            this.data.on("change", function() {
                if (flag == false) {
                    flag = true;
                    setTimeout(function() {
                        o._onDataUpdate();
                        flag = false;
                    }, 500);
                }
            });
            this.parent.on(AMA.view.BaseView.EVENT.SHOWN, function() {
                    o._onDataUpdate();
            });*/
        },

        _onFilterChange: function (event) {
            // If the filter added/removed is anything besides "pagination",
            // this means the pagination is already invalid and must be reset
            if (event.which !== "pagination") {
                this._mustResetPagination = true;
            }
        },
/*      // this is used to updated the list of contacts when any thing change in
        // the contact
        _onDataUpdate : function(event) {

            this._mustResetPagination = true;
            this._doRender();
            $(this.options.pageSelector).val(this.currentPage);
            this._onPageSelectorChange();

        },*/

        _beforeRender: function () {
            this.__beforePlug__.Paginator._beforeRender.apply(this, arguments);

            // When resetting pagination, add filter to 
            // display the first data-page
            if (this._mustResetPagination) {
                this._addPageFilter(1);

                this._mustResetPagination = false;
            }
        },

        _afterRender: function () {
            this.__beforePlug__.Paginator._afterRender.apply(this, arguments);

/*          // When resetting pagination, reset the pertinent variables
            // and render the page selector, if any
            if (this._mustResetPagination) {
                this._mustResetPagination = false;

                this._nonPaginatedDataset = this._datasetBefore.pagination || [];
                this.pageCount = Math.ceil(this._nonPaginatedDataset.length / this.options.pageSize);
                
                if (this.options.pageSelector) {
                    this._renderPageSelector();
                }
            }*/

            this._nonPaginatedDataset = this._datasetBefore.pagination || [];
            this.pageCount = Math.ceil(this._nonPaginatedDataset.length / this.options.pageSize);

            if (this.options.pageSelector) {
                this._renderPageSelector();
            }

            // Handle emptied last pages by switching to the previous page
            if (this.currentPage > this.pageCount) {
                this.toPage(this.currentPage - 1);
            }
        },

        toPage: function (num) {
            if (this.pageCount === 0) return;
            if (num > this.pageCount) num = this.pageCount;

            AMA.debug(this.options.el + " is switching to page " + num + " of " + this.pageCount);

            this._addPageFilter(num);

            this._doRender();
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
                if(r.first+1 === 1 && r.last+1 === 1 ) {
                    $select.closest("#ct_batchselect, .batchselect").hide()
                } else {
                    $select.closest("#ct_batchselect, .batchselect").show()

                }
            } else {
                $select.closest("#ct_batchselect, .batchselect").hide()
            }

            // Set the content of the page selector
            $select.html(content);

            // Disable the page selector if the list is empty
            $select.prop("disabled", this._items.length === 0);

            // Set the selection on the page selector to match the current data-page
            $select.val(this.currentPage);
        },

        _onPageSelectorChange: function () {
            this.toPage($(this.options.pageSelector).val());
        }
    };
})();