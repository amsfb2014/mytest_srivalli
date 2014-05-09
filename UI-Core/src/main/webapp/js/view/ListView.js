/*! ListView */
(function () {

	AMA.namespace("view");

	// TODO: Implement a restriction for ABSTRACT classes like this

	/**
	 * The ListView class defines a generic list with selectable/clickable items.
	 * This is an abstract class; actual implementations of list views simply
	 * need to extend it.
	 *
	 * The template for ListView-derived implementation classes should represent
	 * only a single item in the list, not the entire list.  The list view will
	 * iterate through the data passed and render each item. The following is the
	 * general format of the expected template:
	 *
	 * 		<div class="rt_row <%= elStyle %>" id="<%= elId %>" uid="<%= id %>">
	 *      	. . .
	 *      </div>
	 *
	 * @class ListView
	 * @namespace view
	 * @extends BaseView
	 * @constructor
	 * @abstract
	 */
	var ListView = AMA.view.ListView = AMA.view.BaseView.extend();


	ListView.TEMPLATE_ID = "";
	ListView.TEMPLATE_SRC = "";


	// CSS classes used in rendering
	ListView.CSS = {
			ITEM: "rt_row",
			ITEM_STYLE: ["rt_rowlighter", "rt_rowdarker"],   // alternating row styles
			SELECTED_ITEM: "rt_rowindicated"
	};

	// Triggered custom events
	ListView.EVENT = AMA.enums(
			"ITEM_SELECTED",
			"SELECTION_CLEARED",
			"LIST_EMPTIED",
			"FILTER_ADDED",
			"FILTER_REMOVED",
			"FILTERS_CLEARED",
            "NEW_DATA_LOADED"
	);

	// Filter priority range and default
	ListView.MIN_FILTER_PRIORITY = 0;
	ListView.MAX_FILTER_PRIORITY = 4;
	ListView.DEFAULT_FILTER_PRIORITY = 2;


	AMA.augment(ListView.prototype, {

		initialize: function () {
			ListView.__super__.initialize.apply(this, arguments);

			// Get polymorphic CSS override, or fall back to ListView's default
			this._css = this.constructor.CSS || ListView.CSS;

			// Initialize filtering-related variables
			this._filters = {};
			this._dataset = [];
			this._datasetBefore = {};

			// TODO: Find a better place for this part, in a more specific impl class
	//			var o = this;
	//			this.data.on("change", function(){
	//				o._doRender();
	//			});
	//			this.data.on("add", function(){
	//				o._doRender();
	//			});
	//			this.data.on("remove", function(){
	//				o._doRender();
	//			});
		},

		render: function () {
			var content = "";

			// Apply the filters on the data
			this._applyFilters();
			AMA.debug(this.options.el + " has a final dataset of " + this._dataset.length + " items");

			// Render each list item into content buffer
			_.each(this._dataset, function (item, index) {

				// Compose the item markup from template + data,
				// then append to the content buffer
				content += _.template(this.template, this._processData(item, index));
			}, this);

			// Attach the content from buffer to the container element
			//this.$el = $("#" + this.$el.attr("id"));
			this.$el.html(content);


			// Get a handle of the items' DOM elements
			this._items = this.$el.children("." + this._css.ITEM);
			AMA.debug(this.options.el + " has rendered " + this._items.length + " items");

			if (this._items.length > 0) {
				// Reselect previously selected item if it is still in the list,
				// i.e. an item with the same 'uid' attrib exists in the list view,
				// otherwise select the first item by default
				var match = this.selectedItem && this.$el.find("[uid='" + $(this.selectedItem).attr("uid") + "']") || [],
					stillInList = match.length > 0;
				this._selectItem(stillInList ? match[0] : this._items[0]);

				AMA.debug("Previously selected item is still in list: " + stillInList);
			} else {
				// Since list is empty, trigger a "list emptied" event
				this.trigger(ListView.EVENT.LIST_EMPTIED);
				AMA.debug(this.options.el + " has triggered a 'list emptied' event.");

				// Make sure that item selection is cleared
				this._selectItem();
			}
		},


		// Override this method with any necessary pre-processing of
		// each item in the data, before the listview gets rendered.
		// Just make sure to call the __super__ method when overriding.
		_processData: function (item, index) {

			// Ensure unique ID for item's DOM element
			item.elId = this.$el.attr("id") + "_item_" + index;

			// Sets the alternating CSS class for this item
			item.elStyle = this._css.ITEM_STYLE[index % 2];

			item.recordStatusStyle = {
				addToPhone: "display:none",
				removeFromPhone: "display:none",
				webOnly: "display:none",
				onDevice: "display:none"
			};
			
			var markedFor = this._isMarked(item);
			if (markedFor) {
				if (item.onPhone && !item.pendingCreate) {
					item.recordStatusStyle.onDevice = "display:block";
				} else {
					item.recordStatusStyle.addToPhone = "display:block";
				}
			} else {
				if (item.onPhone) {
					item.recordStatusStyle.removeFromPhone = "display:block";
				} else {
					item.recordStatusStyle.webOnly = "display:block";
				}
			}

			item.itemUid = item.id;

			return item;
		},

		_isMarked: function (item) {
			if (item.onPhone && !item.pendingDelete) {
				return true;
			} else {
				return item.pendingCreate || item.pendingUpdate;
			}
			return false;
		},


		_setupEvents: function () {
			var o = this;

			AMA.debug("List view " + this.options.el + " is initializing onclick handler for each item");

			// Initialize the click handler for each item
			o.$el.children("." + o._css.ITEM).off("click").on("click", function () {
				AMA.debug("User clicked item #" + $(this).attr("id") + " on list view " + o.options.el);

				o._selectItem(this);
			});
		},


		_selectItem: function (el) {
			var $selectedItem,
				uid;

			// Unselect any previously selected item
			if (this.selectedItem) {
				$(this.selectedItem).removeClass(this._css.SELECTED_ITEM);
			}

			// Set the new selected item
			this.selectedItem = el;

			if (this.selectedItem) {
				$selectedItem = $(this.selectedItem);
				$selectedItem.addClass(this._css.SELECTED_ITEM);
				AMA.debug("Item #" + $selectedItem.attr("id") + " has been selected on list view " + this.options.el);

				// The 'uid' attribute of the item's DOM element is mapped
				// to the unique 'id' property of the data item
				uid = $selectedItem.attr("uid");

				// Fire an "item selected" event so that other views can
				// respond as necessary, e.g. the contact details view
				this.trigger(ListView.EVENT.ITEM_SELECTED, this.data.get(uid));
				AMA.debug(this.options.el + " has triggered an 'item selected' event with uid=" + uid);

			} else {
				// Fire a "selection cleared" event
				this.trigger(ListView.EVENT.SELECTION_CLEARED);
				AMA.debug("There is no selected item on list view " + this.options.el +
							"; a 'selection cleared' event has been triggered");
			}

		},


		getSelectedItemData: function () {
			if (!this.selectedItem) return null;

			var uid = $(this.selectedItem).attr("uid");
			return this.data.get(uid);
		},


		// Filter priority ranges 0 to 4, 0=highest 2=normal/default
		// Any existing filter with the same name will be overwritten
		// the filter function can be in the form fn(item, index, list)
		addFilter: function (name, fn, priority) {
			AMA.debug("Adding filter '" + name + "' (priority " + priority + ") to " + this.options.el);

			// If priority is not specified, use default value
			if (typeof priority === "undefined") priority = ListView.DEFAULT_FILTER_PRIORITY;

			AMA.assert(typeof priority === "number" &&
					priority >= ListView.MIN_FILTER_PRIORITY && priority <= ListView.MAX_FILTER_PRIORITY,
					"[ListView.addFilter] Filter priority is invalid or out of range: " + priority);

			// Attach priority to the filter function
			fn.priority = priority;

			// Add filter to list
			this._filters[name] = fn;

			// Trigger a 'filters changed' event
			this.trigger(ListView.EVENT.FILTER_ADDED, { which: name });
		},


		removeFilter: function (name) {
			AMA.debug("Removing filter '" + name + "' from " + this.options.el);

			delete this._filters[name];

			// Trigger a 'filters changed' event
			this.trigger(ListView.EVENT.FILTER_REMOVED, { which: name });
		},


		clearFilters: function () {
			AMA.debug("Removing all filters from " +  this.options.el);

			// Remove all filters
			this._filters = {};

			// Trigger a 'filters changed' event
			this.trigger(ListView.EVENT.FILTERS_CLEARED);
		},


		// Progressively applies the filters and populates this._dataset
		_applyFilters: function () {
			var data = this.data && this.data.toJSON() || [],
				i, filterName;

			this._datasetBefore = {};

			if (data.length > 0) {
				// Loop through the priority levels, min value equals top priority
				for (i = ListView.MIN_FILTER_PRIORITY; i <= ListView.MAX_FILTER_PRIORITY; i++) {
					// Apply filters with this priority level
					for (filterName in this._filters) {
						if (this._filters[filterName].priority === i) {
							// Cache the dataset prior to application of this filter
							this._datasetBefore[filterName] = data;

							// Apply the filter to the data
							data = _.filter(data, this._filters[filterName], this);

							AMA.debug("Applied filter '" + filterName + "' to " + this.options.el +
									", resulting in dataset of " + data.length + " items");
						}
					}
				}
			}

			this._dataset = data;
		}


	});
})();