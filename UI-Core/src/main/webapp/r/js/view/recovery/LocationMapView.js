/*! LocationMapView */
(function () {

    AMA.namespace("view");

    /**
     * This view displays the Map
     *
     * @class LocationMapView
     * @namespace view
     * @extends AMA.view.BaseView
     * @constructor
     */
    var LocationMapView = AMA.view.LocationMapView = AMA.view.BaseView.extend();


    /**
     * ID of the template
     *
     * @property TEMPLATE_ID
     * @type string
     * @static
     * @final
     */
    LocationMapView.TEMPLATE_ID = "location_map_template";


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
    LocationMapView.TEMPLATE_SRC = "";

    /**
     * Default Map configs
     *
     * @property MAP_CONFIG
     * @type object
     * @final
     */
    var MAP_CONFIG = {
        defaultZoom: 3,
        markerZIndex: 1000
    };

    var CLOSE_INFOBOX_EL_CLASS = "close_infobox";

    /**
     * Defines Event Names
     *
     * @property EVENT
     * @type object
     * @final
     */
    LocationMapView.EVENT = AMA.enums(
        "MAP_INITIALIZED"
    );
    LocationMapView.CurrentState = null;

    AMA.augment(LocationMapView.prototype, {

    	events: {
            "click .cancel_locate": "cancelLocation"
        },
        /**
         * Initializes Location Map View.
         *
         * @override
         * @method initialize
         * @param {object}
         */
        initialize: function (options) {
            LocationMapView.__super__.initialize.apply(this, arguments);

            /*
            if(AMA.Util.isIPhone()) {
                $(".cancel_locate").show(); 
            } else {
                $(".cancel_locate").hide(); 
            }
            */

            this.options.viewOnly = options && options.viewOnly || false;
            this.options.mapWidth = options && options.mapWidth || AMA.config.locationPaneRWDMap.width;
            this.options.mapHeight = options && options.mapHeight || AMA.config.locationPaneMap.height;
            
            this.lastMapWidth = this.options.mapWidth;
            this.lastMapHeight = this.options.mapHeight;
            
            this.CurrentState = null;
            if (!this.options.viewOnly) {
                var o = this;

                this.parent.locationHistory.on(AMA.view.LocationHistoryListView.EVENT.ADDRESS_RETRIEVED, function(model) {
                    o.reset();
                    if (o.data.get(model.id)) {
                        // address retrieved is for the location currently displayed by MapView
                        o._doRender();
                    }
                });

                this.parent.locationHistory.bind(AMA.view.ListView.EVENT.LIST_EMPTIED, function() {
                    o.reset();
                    o.setData();
                });

                this.parent.locationHistory.on(AMA.view.ListView.EVENT.ITEM_SELECTED, function(model, index) {
                    o.status="";
                    o.setData(model);
                });
                
                this.parent.on(AMA.view.BaseView.EVENT.SHOWN, function() {
                    o._resizeMap();
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


                if(workflowSecure) {
                    workflowSecure.on(BaseWorkflow.EVENT.STATE_CHANGED, function (event) {
                        switch (event.state) {
                            case BaseWorkflow.STATE.INITIALIZING:
                                break;
                            case SecureWorkflow.STATE.CONNECTING:
                                LocationMapView.CurrentState = SecureWorkflow.STATE.CONNECTING;
                                o.toggleState("connecting");
                                o.$el.find("#location_progress_note .time_remaining").hide();
                                o.$el.find("#location_progress_note .time_remaining .countdown").html("03:00");
                                break;
                            case SecureWorkflow.STATE.REFINING:
                                LocationMapView.CurrentState = SecureWorkflow.STATE.REFINING;

                                AMA.debug("Contacts successfully erased; proceeding to next action");
                                o.toggleState("refining");
                                break;
                            case BaseWorkflow.STATE.FINALIZING:
                                LocationMapView.CurrentState = BaseWorkflow.STATE.FINALIZING;
                                o.toggleState("default");
                                /**
                                 * TODO: Check fail or success
                                 */
                                break;
                            default:
                                o.toggleState("default");
                        }

                    });
                }
                if (workflowLocate) {
                    workflowLocate.on(BaseWorkflow.EVENT.STATE_CHANGED, function (event) {
                        switch (event.state) {
                            case LocateWorkflow.STATE.CONNECTING:
                                AMA.debug("Location Map view is now transitioning to 'connecting' state");
                                o.toggleState("connecting");

                                LocationMapView.CurrentState = LocateWorkflow.STATE.CONNECTING;
                                break;
                            case LocateWorkflow.STATE.REFINING:
                                AMA.debug("Location Map view is now transitioning to 'refining' state");
                                o.toggleState("refining");

                                LocationMapView.CurrentState = LocateWorkflow.STATE.REFINING;
                                break;
                            case BaseWorkflow.STATE.FINALIZING:
                            	o.status = (AMA.ActionManager.getWorkflow("locate")._result == AMA.workflow.BaseWorkflow.RESULT.FAILED) ? "fail" : "success";
                            	o.toggleState(o.status);
                            	
                            	LocationMapView.CurrentState = LocateWorkflow.STATE.FINALIZING;
                                break;
                            default:
                        }
                    }, this);

                    workflowLocate.on(BaseWorkflow.EVENT.COUNTDOWN_TICK, function (event) {
                        o.$el.find("#location_progress_note .time_remaining").show();
                        o.$el.find("#location_progress_note .time_remaining .countdown").html(event.remaining);
                    }, this);
                    
                    workflowLocate.on(BaseWorkflow.EVENT.FINISHED, function(event) {
                	    switch (event.result) {
                	        case BaseWorkflow.RESULT.SUCCESSFUL:
                	            break;
                	        case BaseWorkflow.RESULT.FAILED:
                	            break;
                	        case BaseWorkflow.RESULT.CANCELLED:
                	            o.$el.find("#message").hide();
                	            o.$el.find("#location_progress_note .time_remaining .countdown").html("03:00");
                	            break;
                	    }
                	    AMA.debug("Location Map View finished with result of '" + workflowLocate.getResultName(event.result) + "'");
                	}, this);                    
                }

            }
        },

        /**
         * Renders Location Map View
         *
         * @override
         * @method render
         */
        render: function () {
            if (this.pendingRender) {
                // do nothing, rendering is currently deferred.
                return;
            }

            if (!this.mapInitialized) {
                if (!this.pendingRender) {
                    // Map is not yet initialized, then
                    // set this flag to true, so subsequent call to render won't render anything
                    this.pendingRender = true;

                    var o = this;
                    this.once(LocationMapView.EVENT.MAP_INITIALIZED, function () {
                        o.pendingRender = false;
                        o.render();
                    });
                    var data = (this.data && this.data.length > 0) ? this.data.toJSON()[0] : {},
                        content = "";

                    // Generate the content from template + data
                    content = _.template(this.template, this._processData(data));

                    // Attach the content to the container element
                    this.$el.html(content);
                    this._initMap();
                }

                return;
            }

            if (!this.locationHistory) {
                this.locationHistory = {};
            }

            if (this.data && this.data.length > 0) {
                this.$el.find("#bing_map_dialog").hide();
                this.$el.find("#message").hide();
                this.$el.find("#location_failed_note").hide();

                var locModel = this.data.models[0],
                    infoBoxVisibility = true;

                if (!this.locationHistory[locModel.id]) {
                    this._prepareLocationData(locModel);
                }

                var locationData = this.locationHistory[locModel.id];

                this.pushpinLayer.clear();
                this.infoboxLayer.clear();
                this.pushpinLayer.push(locationData["marker"]);
                this.infoboxLayer.push(locationData["infobox"]);

                locationData["marker"].setOptions({visible:true});
                // check if refining for both secure phone || locate phone;
                switch(LocationMapView.CurrentState) {
                	case AMA.workflow.LocateWorkflow.STATE.CONNECTING:                	
                    case AMA.workflow.LocateWorkflow.STATE.REFINING:
                        infoBoxVisibility = false;
                        break;
                    case AMA.workflow.SecurePhoneWorkflow.STATE.CONNECTING:    
                    case AMA.workflow.SecurePhoneWorkflow.STATE.REFINING:
                        infoBoxVisibility = false;
                        break;
                    default:
                        break;
                }

                locationData["infobox"].setOptions({visible:infoBoxVisibility});

                this.$el.find("." + CLOSE_INFOBOX_EL_CLASS).on("click", function() {
                    locationData["infobox"].setOptions({visible:false});
                });

                this.mapObject.setView({ bounds: Microsoft.Maps.LocationRect.fromLocations(locationData["points"]) });
                this.mapObject.setView({ zoom: this._getZoomBasedOnAccuracy(locModel.get("accuracy")) });

                // remove the marker first before redraw it
                this.$el.find('#accuracyinfoid').remove();
                // creating pushpin
                var pushpinLoc = new Microsoft.Maps.Location(locModel.get('latitude'), locModel.get('longitude'));
                var pushpinContent = "<div id='accuracyinfoid' class='markerline accuracyInfo'> -- " + this._getAccuracy(locModel.get("accuracy")) + ' ' + AMA.config.accuracyUnit + " -- </div>";
                var pushpin = new Microsoft.Maps.Pushpin(pushpinLoc, {htmlContent: pushpinContent, zIndex: 1000, visible: true});

                this.mapObject.entities.push(pushpin);

                // invoke all after setup map events
                this._afterSetupMap.apply(this);


            } else {
                this._defaultMapView();
        		this.$el.find("#location_failed_note").hide();
        		if(this.$el.attr("id")!="dashboard_map") {
            		if (this.status === 'fail') {
            			this.$el.find("#bing_map_dialog").hide();
                        this.$el.find("#location_failed_note").show();
                    } else {
                    	this.$el.find("#bing_map_dialog").show();
                        this.$el.find("#message").show();    
                    }
        		}
            }
        	if(this.data && this.data.length > 0 && this.status=="fail"){        		
        		if(this.$el.attr("id")!="dashboard_map")
    				{
	        			this._defaultMapView();
	            		this.$el.find("#location_failed_note").show();
	            		this.$el.find("#bing_map_dialog").hide();
	            		this.$el.find("#message").hide();
    				}
        	}

            /*
        	if(AMA.Util.isIPhone()) {
                $(".cancel_locate").show(); 
            } else {
                $(".cancel_locate").hide(); 
            }
            */
        },


        /**
         * Reset the cache location data
         *
         * @method reset
         */
        reset: function() {
            this.locationHistory = {};
        },

        refresh: function() {
            if(this.options.viewOnly) {
                if (AMA.ActionManager.getWorkflow("locate")._state === AMA.workflow.LocateWorkflow.STATE.REFINING ||
                    AMA.ActionManager.getWorkflow("locate")._state ===  AMA.workflow.LocateWorkflow.STATE.CONNECTING) {
                    return;
                }
            }
            LocationMapView.__super__.refresh.apply(this);

        },

        /**
         * put the Map View to the default US MAp coordinates
         *
         * @method _defaultMapView
         */
        _defaultMapView: function () {
            // remove the accuracy info
            this.$el.find('#accuracyinfoid').remove();
            this.pushpinLayer.clear();
            this.infoboxLayer.clear();
            this.mapObject.setView({zoom: MAP_CONFIG.defaultZoom});
            this.mapObject.setView({bounds: Microsoft.Maps.LocationRect.fromLocations(new Microsoft.Maps.Location(AMA.config.defaultMapCoordinates.lat, AMA.config.defaultMapCoordinates.lon))
            });
        },
        toggleState: function(state) {
            switch(state) {
                case "connecting":
                    this._defaultMapView();
                    this.$el.find("#message").hide();
					AMA.Util.switchLabel(".location_progress_text", ".locating", this.$el);
                    this.$el.find("#location_progress_note").show();
                    //this.$el.find("#location_progress_note .accuracy").addClass("hidden");
                    this.$el.find("#location_progress_note .time_remaining").removeClass("hidden");
                    this.$el.find("#location_failed_note").hide();
                    this.$el.find("#location_progress_note .cancel_locate").show();
                    
                    break;
                case "refining":
                    /**
                     * make sure DATA is loaded!
                     */
                    var accuracy = this.data.toJSON()[0].accuracy || "0";
					AMA.Util.switchLabel(".location_progress_text", ".refining", this.$el);
                    this.$el.find("#location_progress_note .time_remaining").addClass("hidden");
                    /*
                    this.$el.find("#location_progress_note .accuracy").text(
                        this.$el.find("#location_progress_note .accuracy").text().replace('?', accuracy)
                    ).removeClass("hidden");
                    */
                    this.$el.find("#location_progress_note .cancel_locate").hide();

                    break;
                case "fail":
                    this._defaultMapView();
                    this.$el.find("#location_progress_note").hide();
                    this.$el.find("#location_failed_note").show();
                    this.$el.find("#message").hide();

                    break;
                case "success":
                    this.$el.find("#location_progress_note").hide();
                    this._doRender();
                    this.render();

                    break;
                default :
                    this.$el.find("#location_progress_note").hide();
                    this._doRender();
                    this.render();
            }
        },

        _prepareLocationData: function (model) {
            var id = model.id;
            if (!this.locationHistory[id]) {
                this.locationHistory[id] = {};
            }
            var currentLatLong = model.get("coordinates");
            this.locationHistory[id]["latLongObject"] = new Microsoft.Maps.Location(currentLatLong.split(",")[0], currentLatLong.split(",")[1]);

            var index = -1;
            // loop through all location models to determine the index of the selected location
            for(var i = 0; i < AMA.models.locations.models.length; i++) {
                var model = AMA.models.locations.models[i];
                if (id == model.id) {
                    index = i;
                    break;
                }
            }

            // add location history marker
            var accuracyCircle = this._createAccuracyCircle(
                this.locationHistory[id]["latLongObject"],
                model.get("address"),
                this._locationFormat(model.get("time")),
                model.get("accuracy"),
                index+1,
                true
            );
            this.locationHistory[id]["marker"] = accuracyCircle.polygon;
            this.locationHistory[id]["points"] = accuracyCircle.points;
            this.locationHistory[id]["infobox"] = accuracyCircle.infobox;
        },

        _setupEvents: function () {
            var o=this;
            Backbone.globalEvent.on("onLocate",function(e){
                o.status=e.status;
                o.render();
            });
        },
        
        _onPageResize: function() {
        	this._resizeMap();        	
        },

        /**
         * all actions needed after map setup should be here
         */
        _afterSetupMap: function() {
            // refresh location
            $('#refresh_loc_map').off('click').on('click', function(e) {
                e.stopPropagation();
                e.preventDefault();
                AMA.ActionManager.start("locate"); 
                return false;
            });
            
            this._resizeMap();
        },

        _initMap: function () {
            try {
                // An object to describe our map when we initially load it.
                // NOTE!  Width and height are necessary for IE6.
                var mapOptions = {
                    credentials: AMA.config.getBingMapsKey(),
                    center: new Microsoft.Maps.Location(AMA.config.defaultMapCoordinates.lat, AMA.config.defaultMapCoordinates.lon),
                    mapTypeId: Microsoft.Maps.MapTypeId[AMA.config.defaultMapType],
                    zoom: MAP_CONFIG.defaultZoom,
                    showScalebar: false,
                    enableClickableLogo: false,
                    enableSearchLogo: false,
                    width:this.options.mapWidth,
                    height:this.options.mapHeight
                };
                if (this.options.viewOnly) {
                    _.extend(mapOptions, {
                        disableUserInput:true,
                        showDashboard:false
                    });
                }
                this.mapObject = new Microsoft.Maps.Map(this.$el.find("#bing_map")[0], mapOptions);
                
                Microsoft.Maps.Events.addHandler(this.mapObject, 'keydown',  function(e) {
					if (e.keyCode === 40 || e.keyCode ===  38) {
						e.handled = true;
					}});

                var o = this;
                // validate bing map api key
                this.mapObject.getCredentials(function(credentials) {
                    if(credentials === null) {
                        /*
                         * DON'T CHANGE THIS LOG STATEMENT UNLESS YOU WANT TO MESS UP REPORTING
                         */
                        AMA.ReportingManager.remoteLog("Bing was unable to validate our key [accountID:-" + AMA.config.accountDetails.accountId + "]" + 
							"[MDN:-" + AMA.config.accountDetails.accountMdn + "]",
							AMA.config.JsonConstants.LOGLEVEL_STATES.AUDIT);
							
                    } else {
                        // Set up the entity-collection layers
                        o.pushpinLayer = new Microsoft.Maps.EntityCollection({zIndex:MAP_CONFIG.markerZIndex++});
                        o.infoboxLayer = new Microsoft.Maps.EntityCollection({zIndex:MAP_CONFIG.markerZIndex++});
                        o.mapObject.entities.push(o.pushpinLayer);
                        if (!o.options.viewOnly) {
                            o.mapObject.entities.push(o.infoboxLayer);
                        }
                        o.mapInitialized = true;
                        o.trigger(LocationMapView.EVENT.MAP_INITIALIZED);
                    }
                });
                Microsoft.Maps.Events.addThrottledHandler(this.mapObject,"viewchangeend", this.followMouse,500);
            } catch(err) {
                //Dialog.Error.external(Strings.jsExternalServiceError.bingMapUnavailable + " Reason: drawMap: " + err.message);
                return;
            };
            
            this._resizeMap();
        },

        followMouse:function()
        {
            $("a").on("mouseout",function(e){
                $(".NavBar_modeSelectorControlContainer").find(".NavBar_itemContainer").each(function(index){
                    $(this).attr("href","javascript:");

                });

            });

        },

        _createAccuracyCircle: function(latLongObject, address, date, accuracy, index, showPopup) {
            var radius = accuracy;
            if(accuracy.indexOf(",") != -1) {
                radius = accuracy.substring(0, accuracy.indexOf(","));
            }

            if(radius < 10) {
                radius = 10;
            }

            var R = 6371; // R is the earth's radius in Km.
            var lat = (latLongObject.latitude*Math.PI)/180;
            var lon = (latLongObject.longitude*Math.PI)/180;
            var d = parseFloat(radius/1000)/R;
            var points = [];

            for (x = 0; x <= 360; x++) {
                var p2 = {};
                brng = x * Math.PI/180;
                p2.Latitude = Math.asin(Math.sin(lat) * Math.cos(d) + Math.cos(lat) * Math.sin(d) * Math.cos(brng));
                p2.Longitude = ((lon + Math.atan2(Math.sin(brng) * Math.sin(d) * Math.cos(lat), Math.cos(d) - Math.sin(lat) * Math.sin(p2.Latitude))) * 180) / Math.PI;
                p2.Latitude = (p2.Latitude * 180) / Math.PI;
                points.push(new Microsoft.Maps.Location(p2.Latitude, p2.Longitude));
            }

            try {
                var accuracyCircle = {};
                var polygonOptions = {
                    // Yes, transparency is first for colors..
                    fillColor: new Microsoft.Maps.Color(AMA.config.mapAccuracyCirleColor[1][3],
                        AMA.config.mapAccuracyCirleColor[1][0],
                        AMA.config.mapAccuracyCirleColor[1][1],
                        AMA.config.mapAccuracyCirleColor[1][2]),
                    strokeColor: new Microsoft.Maps.Color(AMA.config.mapAccuracyCirleColor[2][3],
                        AMA.config.mapAccuracyCirleColor[2][0],
                        AMA.config.mapAccuracyCirleColor[2][1],
                        AMA.config.mapAccuracyCirleColor[2][2]),
                    strokeThickness: 2,
                    visible: false
                };

                var polygon = new Microsoft.Maps.Polygon(points, polygonOptions);

                if(showPopup) {
                    //var markerBody = this._createMarkerBody(address, date, accuracy, index);
                    var markerBody = this._createInfoBox(index);

                    // Note:  Do not use the "title" or "description" attributes with "htmlContent"
                    // or the HTML will not display.
                    // "showCloseButton" does not seem to work with htmlContent so we have to create our own
                    // (in the markerBody).
                    var infoboxOptions = {
                        htmlContent:markerBody,
                        visible:false
                    };
                    var infobox = new Microsoft.Maps.Infobox(latLongObject, infoboxOptions);

                    // Add handlers to show/hide the infobox on hover
                    // Show the infobox on polygon hover
                    //var arrayIndex = index-1;
                    //Microsoft.Maps.Events.addHandler(polygon, 'mouseover', function(e){LocationPane.locationHistory.all[arrayIndex]["infobox"].setOptions({visible:true});});
                    accuracyCircle["infobox"] = infobox;
                }

                accuracyCircle["polygon"] = polygon;
                accuracyCircle["points"] = points;
                accuracyCircle["infobox"] = infobox;
                return accuracyCircle;
            }
            catch(err)
            {
                //Dialog.Error.external(Strings.jsExternalServiceError.bingMapServiceError + " Reason: " + err.message);
                return null;
            }
        },

        _locationFormat: function(gmtTime) {
            if (gmtTime != null && gmtTime != '') {
                var date = new Date(gmtTime);
                return AMA.Util.formatDateAndTime(date, AMA.config.dateAndTimeFormat);
            }
        },

        _getAccuracy: function(accuracy) {
            switch(AMA.config.accuracyUnit) {
                case 'yards':
                    return Math.floor(AMA.Util.metersToYards(accuracy));
                    break;
                case 'meters':
                case 'miles':
                default:
                    return Math.floor(accuracy);
                    break;
            }
        },

        _createInfoBox: function(index) {
            if (!this.infoboxTemplate) {
                this.infoboxTemplate = $("#location_map_infobox_template").html();
            }

            // clone location model
            var item = this.data.toJSON()[0];

			item.index = index - 1;
			item.locatedClass = "";
			item.historyClass = "show";

			if(index == 1) {
				item.locatedClass = "show";
				item.historyClass = "";
			}

            item.timeLocated = this._locationFormat(item.eventTime);
            if (!item.address) {
                item.address = "";
            }
            item.infoboxElClass = CLOSE_INFOBOX_EL_CLASS;

            item.accuracy = this._getAccuracy(item.accuracy);

            return _.template(this.infoboxTemplate, item);
        },

        cancelLocation: function(e) {
            e.stopPropagation();
			var workflowLocate = AMA.ActionManager.getWorkflow("locate");
			workflowLocate.cancelLocate();
			this._defaultMapView();
    		this.$el.find("#location_failed_note").show();
    		this.$el.find("#bing_map_dialog").hide();
    		this.$el.find("#message").hide();
    		this.$el.find("#location_failed_note").show();
    		this.$el.find("#bing_map_dialog").hide();
    		this.$el.find("#message").hide();
          	this.$el.find("#location_progress_note").hide();
        },

        _getZoomBasedOnAccuracy: function(accuracyStr) {
            //closer to farther

            var accuracy = parseInt(accuracyStr);
            
            if(accuracy < 20) { return 19; }
            else if(accuracy < 60) { return 18; }
            else if(accuracy < 120){ return 17; }
            else if(accuracy < 250){ return 16; }
            else if(accuracy < 500){ return 15; }
            else if(accuracy < 1000){ return 14; }
            else if(accuracy < 2000){ return 13; }
            else if(accuracy < 4000){ return 12; }
            else if(accuracy < 7000){ return 11; }
            else if(accuracy < 15000){ return 10; }
            else if(accuracy < 28000){ return 9; }
            else if(accuracy < 60000){ return 8; }
            else if(accuracy < 130000) { return 7; }
            else if(accuracy < 250000) { return 6; }
            else if(accuracy < 500000) { return 5; }
            else if(accuracy < 1000000) { return 4; }
            else { return 3; }
        },
        
        _resizeMap: function() {
            var bing = $("#bing_map"),
            bingContainer = $("#map_container"),
            bingParent = bingContainer.parent(),
            bingDialog = $("#bing_map_dialog"),
            recoverNote = $("#location_right .note"),
            locateToolsetHeight = $("#locate_toolset").outerHeight(),
            headerlinkPadding = parseInt($("#header_link").css("padding-top")),
            pageHeaderHeight = locateToolsetHeight + headerlinkPadding,
        	locationToggleHeight = parseInt($("#location-toggle-submenu").css("height")),
        	clientHeight = document.documentElement.clientHeight,
        	minMapHeight = parseInt(bingContainer.css("min-height")),
        	smallMapHeight = clientHeight - pageHeaderHeight - locationToggleHeight;
           
        	smallMapHeight = minMapHeight > smallMapHeight ? minMapHeight : smallMapHeight;
        	
        	if (!$("#page_content").hasClass("hidden")) { // Location Map View is refreshing while Settings Dialog is hidden
        		this.lastMapWidth = bingParent.width();
        		this.lastMapHeight = bingParent.height() - recoverNote.outerHeight();           		
        	}
        
            if($(window).width() > 767) { // breakpoint for medium to large devices 
                bing.width(this.lastMapWidth - ((parseInt(bing.css("border-width")))*2) )
                	.height(this.lastMapHeight - ((parseInt(bing.css("border-width")))*2) );
                
                bingDialog.width(this.lastMapWidth)
                	.height(this.lastMapHeight);
                
                bing.find(".MicrosoftMap").width(this.lastMapWidth)
                	.height(this.lastMapHeight);
                
                this.mapObject.setOptions({ width: this.lastMapWidth, height: this.lastMapHeight });                
            } else {
                bing.css({"width":"100%", "height":smallMapHeight +"px"});
                bingDialog.css({"width":"100%", "height":smallMapHeight +"px"});
                bing.find(".MicrosoftMap").css({"width":"100%", "height":smallMapHeight +"px"});
            }            
        }
    });
})();