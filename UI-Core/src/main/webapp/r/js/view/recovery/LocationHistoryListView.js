/*! LocationHistoryListView */
(function () {

	AMA.namespace("view");


	/**
	 * This view shows the Location History List
	 *
	 * @class LocationHistoryListView
	 * @namespace view
	 * @extends AMA.view.ListView
	 * @constructor
	 */
	var LocationHistoryListView = AMA.view.LocationHistoryListView = AMA.view.ListView.extend();


	/**
	 * ID of the template
	 *
	 * @property TEMPLATE_ID
	 * @type string
	 * @static
	 * @final
	 */
	LocationHistoryListView.TEMPLATE_ID = "location_history_item_template";


	/**
	 * Applicable only to view classes that fetch the aggregated templates for
	 * itself and its child views, this property defines the name of the
	 * template file to load. The path is defined in AMA.config.templatePath.
	 *
	 * @property TEMPLATE_SRC
	 * @type string
	 * @static
	 * @final
	 */
	LocationHistoryListView.TEMPLATE_SRC = "";


	/**
	 * Defines CSS classes
	 *
	 * @property CSS
	 * @type object
	 * @static
	 * @final
	 */
	LocationHistoryListView.CSS = {
			ITEM: "item",
			ITEM_STYLE: ["rt_rowlighter", "rt_rowdarker"],   // alternating row styles
			SELECTED_ITEM: "selected"
	};

	/**
	 * Defines Event names
	 *
	 * @property EVENT
	 * @type object
	 * @static
	 * @final
	 */
	LocationHistoryListView.EVENT = AMA.enums(
			"ADDRESS_RETRIEVED"
	);


	AMA.augment(LocationHistoryListView.prototype, {

		/**
		 * defines EVENTS.
		 *
		 * @override
		 * @property events
		 */
		events: {
            "click #clear_location_history a.link_text": "clearLocationHistory",
            "click .address a.link_text": "locate",
            "click  #button_locate_history_normal": "locate"
        },
        
        /**
         * Temporary variable to hold the last recorded location while locating
         */
        lastRecordedLocation: null,

		/**
		 * Initializes Location History List View.
		 *
		 * @override
		 * @method initialize
		 * @param {object}
		 */
		initialize: function () {
			LocationHistoryListView.__super__.initialize.apply(this, arguments);
			
			this.responsiveListContainer = $("#location-menu-tab-sm-full .menu");
            if (!this.lastlocationSubmenuTemplate) {
                this.lastlocationSubmenuTemplate = $("#last_location_submenu_item_template").html();
            }
            if (!this.previouslocationSubmenuTemplate) {
                this.previouslocationSubmenuTemplate = $("#previous_location_submenu_item_template").html();
            }			

			var o = this;
			this.bind(LocationHistoryListView.EVENT.ADDRESS_RETRIEVED, function(model) {
				o.$el.find("[uid=" + model.get("id") + "] .address").html(model.get("address"));
				o.responsiveListContainer.find("[uid=" + model.get("id") + "] .address").html(model.get("address"));
			});

			this.bind(AMA.view.ListView.EVENT.LIST_EMPTIED, function() {
				var data = {
						id: 0,
						elId: "location_history_0",
						elStyle: "",
						timeLocated: "",
						accuracy: ""
				};
				o.$el.find("#location_last").html(_.template(o.template, data));
				o.$el.find("#location_history_1_to_4").html("");
				o.$el.find("#location_previous").toggle(this.data.models.length > 1);
				o.$el.find("#clear_location_history").hide();
				
				o.responsiveListContainer.html(_.template(o.lastlocationSubmenuTemplate, data));
			});

			var ActionManager = AMA.ActionManager,
	    		BaseWorkflow = AMA.workflow.BaseWorkflow,
	    		LocateWorkflow = AMA.workflow.LocateWorkflow,
                SecureWorkflow = AMA.workflow.SecurePhoneWorkflow,
                workflowLocate = ActionManager.getWorkflow("locate"),
                workflowSecure = false;
            if( AMA.models.capabilities.canRead("deviceSecurePhoneAction") ) {
                workflowSecure = ActionManager.getWorkflow("secure");
            }
	    	if (workflowLocate) {
                workflowLocate.on(BaseWorkflow.EVENT.STATE_CHANGED, function (event) {
	            	switch (event.state) {
	            		case LocateWorkflow.STATE.CONNECTING:
                            o.toggleStateDisplay("connecting");
                            o.selectLocationSubmenuItem();
	                        break;
	            		case LocateWorkflow.STATE.REFINING:
                            o.toggleStateDisplay("refining");
	            			break;
	            		case BaseWorkflow.STATE.FINALIZING:
	            			o.toggleStateDisplay((workflowLocate._result == AMA.workflow.BaseWorkflow.RESULT.FAILED) ? "fail" : "success");
 	            			break;	            			
	            		default:
	            	}
	            	AMA.debug("Location History List View is now transitioning to '" + workflowLocate.getStateName(event.state) + "' state");
	            }, this);
                
				workflowLocate.on(BaseWorkflow.EVENT.FINISHED, function (event) {
					switch (event.result) {
						case BaseWorkflow.RESULT.CANCELLED:
							o.toggleStateDisplay("cancelled");
							break;
					}
				}, this);                
	    	}
            if (workflowSecure) {
                workflowSecure.on(BaseWorkflow.EVENT.STATE_CHANGED, function (event) {
	            	switch (event.state) {
	            		case SecureWorkflow.STATE.CONNECTING:
	            			o.selectLocationSubmenuItem();
                            o.toggleStateDisplay("connecting");
	                        break;
	            		case SecureWorkflow.STATE.REFINING:
                            o.toggleStateDisplay("refining");
	            			break;
	            		case BaseWorkflow.STATE.FINALIZING:
                            o.toggleStateDisplay("default");
	            			break;
	            		default:
                            o.toggleStateDisplay("default");
	            	}
	            	AMA.debug("Location History List View is now transitioning to '" + workflowSecure.getStateName(event.state) + "' state");
	            }, this);
	    	}
            
            // Hide the appropriate "Location Settings" items in the Location History List View
            if(!AMA.models.capabilities.canRead("eventSettings")) {
            	o.$el.siblings(".location_settings").children().hide();
            } else if(AMA.models.capabilities.canUpdate("eventSettings")) {
            	o.$el.siblings(".location_settings").children(".link:not(:has(.Edit_Location_Settings))").hide();            	
            } else if (AMA.models.capabilities.canRead("eventSettings") && !AMA.models.capabilities.canUpdate("eventSettings")) {
            	o.$el.siblings(".location_settings").children(".link:not(:has(.View_Location_Settings))").hide();
            }
		},

		_setupEvents: function () {
			AMA.debug("List view " + this.options.el + " is initializing onclick handler for each item");

			var o = this;
			// Initialize the click handler for each item
			if (this.data && this.data.models.length > 0) {
				this.$el.find("." + o._css.ITEM).on("click", function () {
                    if(!$(this).closest(".location_refining").size() && !$(this).closest(".location_connecting").size()) {
                        AMA.debug("User clicked item #" + $(this).attr("id") + " on list view " + o.options.el);
                        o._selectItem(this);
                    }
				});
				
				$("#location-menu-tab-sm-full li").on("click", function() {
					if(o.data.models.length > 0) {
						var itemUid = $(this).attr("uid");
						o.selectLocationSubmenuItem(itemUid);					
						o._selectItem(o.$el.find("[uid=" + itemUid + "] ." + o._css.ITEM)[0]);						
					}					
				});
			}
			
			$("#submenu-locate-refresh").on("click", function() {
				o.locate(); 
			});
		},
        toggleStateDisplay: function (state) {
            var toggleClass = {
				"connecting": ".location_connecting",
				"refining"  : ".location_refining",
				"default"   : ".default",
				"success"   : ".default",
				"fail"   : ".default",
				"cancelled" : ".default"
			};
            this.$el.find(toggleClass[state]).show().siblings(".location_history").hide();
            $("#location-toggle-submenu").removeClass("connecting refining").addClass(state);
            switch(state) {
                case "connecting":
                    AMA.debug("Location History List View is now transitioning to 'connecting' state");
                    break;
                case "refining":
                    AMA.debug("Location History List View is now transitioning to 'refining' state");
                    break;
                case "fail":
                	AMA.debug("Location History List View is now transitioning to 'failing' state");
                	this._selectItem();
                    break;
                case "success":
                	AMA.debug("Location History List View is now transitioning to 'success' state");
                    break;
                case "cancelled":
                	AMA.debug("Location History List View is now transitioning to 'cancelled' state");
                	this.$el.find(".location_history").hide();
                	this.$el.find('.default').show();
                    break;
                default:

                }

        },

		/**
		 * Renders Location History List View
		 *
		 * @override
		 * @method render
		 */
		render: function () {
			var content = "",
				submenuContent = "";
				firstLoc = null,
				oldLocation = false;					

			// Apply the filters on the data
			this._applyFilters();
			AMA.debug(this.options.el + " has a final dataset of " + this._dataset.length + " items");

			this.data.prepareLocations();
			this.data.clearDuplicateLocations();			
			this.responsiveListContainer.empty();

			if (this.data.length > 0) {
				var items = this.data.toJSON();
				
				for (var i = 0; i < this.data.numberOfPoints; i++) {
					var location = items[i];
					if (location) {
						processedData = this._processData(location, i);
						templatedContent = _.template(this.template, processedData);						
						content += templatedContent;
						submenuContent = templatedContent;
						submenuContent = submenuContent.replace("id", "class");
						
						if (i == 0) {
							this.$el.find("#location_last").html(content);
							this.responsiveListContainer.append(_.template(this.lastlocationSubmenuTemplate, processedData));
							content = "";
						} else {
							this.responsiveListContainer.append(_.template(this.previouslocationSubmenuTemplate, processedData));
						}
					}
				}
			} else {
				this.$el.find("#location_last").html("");
				this.responsiveListContainer.empty();
			}

			this.$el.find("#location_history_1_to_4").html(content);
			
			this.$el.find("#location_previous").toggle(this.data.models.length > 1);
			this.$el.find("#clear_location_history").show();

			// Get a handle of the items' DOM elements
			this._items = this.$el.find(".default ." + this._css.ITEM);
			AMA.debug(this.options.el + " has rendered " + this._items.length + " items");
			
			firstLoc = (this.data.models.length > 0) ? this.data.models[0] : null,
			oldLocation = (firstLoc && this.lastRecordedLocation && firstLoc.attributes.eventTime <= this.lastRecordedLocation.attributes.eventTime) ? true : false;
			if (oldLocation === true) {
				AMA.debug("Exiting render of location history. Not updated location.");
				return;
			}

			this.lastRecordedLocation = firstLoc;
			AMA.debug("Saving the last recorded location", this.lastRecordedLocation);	

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
				this.trigger(AMA.view.ListView.EVENT.LIST_EMPTIED);
				AMA.debug(this.options.el + " has triggered a 'list emptied' event.");

				// Make sure that item selection is cleared
				this._selectItem();
			}
		},

		/**
		 * Clears all the location histories.
		 *
		 * @method clearLocationHistory
		 */
		clearLocationHistory: function () {
			var o = this;
			var msg = $("#msg_confirm_clear_location_history").html();
			AMA.page.standardDialogs.confirm(msg, function () {
				// Hide Confirm Delete dialog
				//AMA.page.standardDialogs.confirmDialog.hide();
                msg = msg || $("#msg_confirm_clear_location_history").html();
				// Show Loading dialog
				var msg = o.$el.find(".msg_loadingdialog").html();
				AMA.page.standardDialogs.loading(msg);

				o.data.sync("delete", o.data, {
                    parse: function() {},
                    success: function() {
                        // Hide Loading dialog Only after Fetch!
                        o.data.fetch();
                        AMA.page.standardDialogs.hideloading();

                    },
                    error: function() {
                        // Hide Loading dialog Only after Fetch!
                        o.data.fetch();
                        AMA.page.standardDialogs.hideloading();

                    }
                });
				setTimeout(function () {
				}, 500);
			});
		},

		/**
		 * Starts the Locate functionality
		 *
		 * @method locate
		 */
		locate: function () {
			AMA.ActionManager.start("locate");
		},

		_afterRender: function () {
			for (var i = 0; i < this.data.numberOfPoints; i++) {
				var location = this.data.models[i];

				if (!location.get("address")) {
					var geocodeRequest = "https://dev.virtualearth.net/REST/v1/Locations/" + location.get("coordinates");

					var params = {
							output: "json",
							key: AMA.config.getBingMapsKey()
					};

					var o = this;
					var afterRetrieveAddress = function(index, response, status, xhr) {
						var model = this.data.models[index];
						if (response &&
					         	response.resourceSets &&
					          	response.resourceSets.length > 0 &&
					          	response.resourceSets[0].resources &&
					          	response.resourceSets[0].resources.length > 0) {
							var address = o._getAddress(response.resourceSets[0].resources[0]);
							model.set("address", address, {silent:true});
							this.trigger(LocationHistoryListView.EVENT.ADDRESS_RETRIEVED, model);
						} else {
							AMA.debug("Bing was unable to find an address for location: " + model.get("coordinates"));
							AMA.ReportingManager.remoteLog("Bing was unable to find an address for location: " + model.get("coordinates"),
								AMA.config.JsonConstants.LOGLEVEL_STATES.AUDIT);

						}
					};
					$.getJSON(geocodeRequest + "?jsonp=?", params, _.bind(afterRetrieveAddress, this, i));
				}
			}
		},

		_selectItem: function (el) {
			var $selectedItem,
				uid;

			// Unselect any previously selected item
			if (this.selectedItem) {
				$(this.selectedItem).parent().removeClass(this._css.SELECTED_ITEM);
				this.responsiveListContainer.find("li").removeClass("selected");
			}

			// Set the new selected item
			this.selectedItem = el;

			if (this.selectedItem) {
				$selectedItem = $(this.selectedItem);
				$selectedItem.parent().addClass(this._css.SELECTED_ITEM);				
				AMA.debug("Item #" + $selectedItem.parent().attr("id") + " has been selected on list view " + this.options.el);

				// The 'uid' attribute of the item's DOM element is mapped
				// to the unique 'id' property of the data item
				uid = $selectedItem.parent().attr("uid");
				this.selectLocationSubmenuItem(uid);
				
				// Fire an "item selected" event so that other views can
				// respond as necessary, e.g. the contact details view
				this.trigger(AMA.view.ListView.EVENT.ITEM_SELECTED, this.data.get(uid));
				AMA.debug(this.options.el + " has triggered an 'item selected' event with uid=" + uid);

			} else {
				// Fire a "selection cleared" event
				this.trigger(AMA.view.ListView.EVENT.SELECTION_CLEARED);
				this.selectLocationSubmenuItem();
				AMA.debug("There is no selected item on list view " + this.options.el +
							"; a 'selection cleared' event has been triggered");
			}

		},

		_processData: function (item, index) {
			item.elId = "location_history_" + index;
			item.elStyle = "";
			item.address = item.address || "";
			item.timeLocated = this._locationFormat(item.time, item.eventTimeTo);

			switch(AMA.config.accuracyUnit) {
				case "meters":
					item.accuracy = Math.floor(item.accuracy);
					break;
				case "yards":
					item.accuracy = Math.floor(AMA.Util.metersToYards(item.accuracy));
					break;
				case "miles":
					item.accuracy = Math.floor(item.accuracy);
					break;
				default:
					item.accuracy = Math.floor(item.accuracy);
					break;
			}
		    return item;
		},

		_locationFormat: function(gmtTime, gmtTimeRange) {
			if(gmtTime != null && gmtTime != "") {
				var date = new Date(gmtTime);
				if(gmtTimeRange != null) {
					var dateRange = new Date(gmtTimeRange);
					//if start and end times are the same day then just need a time range
					if(date.getDate() == dateRange.getDate()) {
						//if start and end time have the same hour and minutes then NO need for a range
						if(date.getHours() == dateRange.getHours() && date.getMinutes() == dateRange.getMinutes()) {
							//No range
							return (AMA.Util.isIPhone() === true) ? $.timeago(date) : AMA.Util.formatDateAndTime(date, AMA.config.dateAndTimeFormat);
						}
					}
					//Date range
					return (AMA.Util.isIPhone() === true) ? $.timeago(dateRange) : ( AMA.Util.formatDateAndTime(date, AMA.config.dateAndTimeFormat) + " - " + AMA.Util.formatDateAndTime(dateRange, AMA.config.dateAndTimeFormat));
				}
				//No range
				return (AMA.Util.isIPhone() === true) ? $.timeago(date) : AMA.Util.formatDateAndTime(date, AMA.config.dateAndTimeFormat);
			}
		},

		_getAddress: function(bingResponse)
		{
			var address = "";
			address += bingResponse.address.locality != null ?  bingResponse.address.locality : "";
			address += bingResponse.address.adminDistrict != null ? (address != "" ? ", " : "") + bingResponse.address.adminDistrict + " ": "";
			address += bingResponse.address.postalCode != null ? (address != "" ? " " : "") + bingResponse.address.postalCode : "";

			AMA.debug("getAddress: " + address );
			return address;
	   	},
	   	
	   	selectLocationSubmenuItem: function(itemId) {
	   		this.responsiveListContainer.children().removeClass("selected");
	   		if(itemId) {
	   			this.responsiveListContainer.find("[uid="+ itemId +"]").addClass("selected")
	   		}
	   		itemId = itemId || 0;			
	   		var selectedItemLabel = this.responsiveListContainer.find("[uid="+ itemId +"] .submenuItemLabel").text();	   		
			$("#location-toggle-submenu .submenu-title").text(selectedItemLabel);
	   	}

	});

})();
