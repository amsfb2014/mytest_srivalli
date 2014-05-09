/*! MultiSelector */
(function () {

	AMA.namespace("view.plugin");

	// MultiSelector plug-in
	AMA.view.plugin.MultiSelector = {

		__name__: "MultiSelector",

		// This is called automatically when MultiSelector plug-in is
		// plugged into a ListView-derived object
		__onPlug__: function (options) {
			AMA.assert(this._selectItem != null,
					"MultiSelector plug-in is attached to a non-ListView object");

			this.options.selectAll = options && options.selectAll;

			AMA.debug("MultiSelector plug-in has been plugged into " + this.options.el);

			if (this.options.selectAll) {
				this._$selectAll = $(this.options.selectAll);
				AMA.debug("Linking the MultiSelector plug-in to the 'Select All' element");

				// Event handler for 'click' event on 'Select All' element
				this._$selectAll.on("click", _.bind(this._onClickSelectAll, this));
			}

            // Initialize checked-items list
            this._checkedItems = [];
		},
		
		
		getCheckedItems: function () {
			var checkedItems = this.$el.find(":checkbox:checked"),
				temp = [];
			_.each(checkedItems, function (item) {
				temp.push(item.attributes.uid.value);
			});
			
			return temp;
		},


		_afterRender: function () {
			this.__beforePlug__.MultiSelector._afterRender.apply(this, arguments);

            // Restore any previously selected checkboxes
            var o = this;
            this.$el.find(":checkbox").each(function () {
                $(this).prop("checked", _.contains(o._checkedItems, $(this).attr("uid")));
            });

            // Update the 'Select All' checkbox state based on items selected
			if (this._$selectAll.is(":checkbox")) {
				this._updateSelectAllCheckbox();
			}
		},


		_setupEvents: function () {
			this.__beforePlug__.MultiSelector._setupEvents.apply(this, arguments);

			// Event handler for 'click' event on visible item checkboxes
			this.$el.find(":checkbox").on("click", _.bind(this._onClickCheckbox, this));
		},



		_onClickSelectAll: function () {
			AMA.assert(this._$selectAll, "[MultiSelector] Illegal invocation of _onClickSelectAll()");

			var check = true;

			// If 'Select All' is a checkbox, determine whether to check or
			// uncheck all, based on whether 'Select All' is checked/unchecked
			if (this._$selectAll.is(":checkbox")) {
				check = this._$selectAll.prop("checked");
			}

            AMA.debug("'Select All' clicked. All items will be " + (check ? "checked" : "unchecked"));

            // Check/uncheck all checkboxes
            var o = this;
            this.$el.find(":checkbox").each(function () {
                $(this).prop("checked", check);

                // Add to or remove from checked-items list as needed
                if (check) {
                    o._checkedItems.push($(this).attr("uid"));
                } else {
                    o._checkedItems = _.without(o._checkedItems, $(this).attr("uid"));
                }
            });

			// Set the 'checked' property of all the checkboxes
			this.$el.find(":checkbox").prop("checked", check);
		},


		_onClickCheckbox: function (event) {

            var checkbox = event.target,
                isChecked = checkbox.checked,
                uid = checkbox.attributes.uid.value;

			AMA.debug("Checkbox clicked for item " + uid  + "  Checked? " + isChecked);

            // Add to or remove from checked-items list as needed
            if (isChecked) {
                this._checkedItems.push(uid);
            } else {
                this._checkedItems = _.without(this._checkedItems, uid);
            }

			// If 'Select All' is a checkbox, update its 'checked' state
			if (this._$selectAll.is(":checkbox")) {
				this._updateSelectAllCheckbox();
			}

			// Prevent this click event from bubbling up to the item element
			// so that check/unchecking an item does not necessarily
			// select the list item
			event.stopPropagation();
		},


		_updateSelectAllCheckbox: function () {
			var empty = this._items.length === 0,
				allChecked = !empty && this.$el.find(":checkbox:not(:checked)").length === 0;

			if (allChecked) {
				AMA.debug("All checkboxes are checked, so 'Select All' checkbox will also be checked");
			} else if (empty) {
				AMA.debug("'Select All' checkbox is disabled because list is empty");
			}

			// Check the 'Select All' checkbox when all the checkboxes
			// have been checked, otherwise uncheck it
			this._$selectAll.prop("checked", allChecked);

			// Disable the 'Select All' checkbox when list is empty
			this._$selectAll.prop("disabled", empty);
		}

	};

})();

