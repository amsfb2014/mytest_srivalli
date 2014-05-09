/*! DashboardLocation */
(function () {

    AMA.namespace("view");

    var DashboardLocation = AMA.view.DashboardLocation = AMA.view.BaseView.extend();

    DashboardLocation.TEMPLATE_ID = "dashboard_location_template";
    DashboardLocation.TEMPLATE_SRC = "";

    _.extend(DashboardLocation.prototype, {

        initialize: function() {
            DashboardLocation.__super__.initialize.apply(this, arguments);

            this.data.on("reset", function() {
                if (AMA.ActionManager.getWorkflow("locate")._state === AMA.workflow.LocateWorkflow.STATE.REFINING ||
                    AMA.ActionManager.getWorkflow("locate")._state ===  AMA.workflow.LocateWorkflow.STATE.CONNECTING) {
                    return;
                }
                this.populateAddress(this.data.toJSON()[0]);
            }, this);

            this.$el.addClass("dashboard_panel_loading");

            var ActionManager = AMA.ActionManager,
                BaseWorkflow = AMA.workflow.BaseWorkflow,
                LocateWorkflow = AMA.workflow.LocateWorkflow,
                locateWorkflow = ActionManager.getWorkflow("locate");

            // subscribe to locate workflow
            var o = this;
            locateWorkflow.on(BaseWorkflow.EVENT.STATE_CHANGED, function (event) {
                switch (event.state) {
                    case BaseWorkflow.STATE.INITIALIZING:
                    case LocateWorkflow.STATE.CONNECTING:
                    case LocateWorkflow.STATE.REFINING:
                        o.$el.find('#dashboard_btn_locate').addClass('hidden');
                        o.$el.find('#dashboard_btn_locating').removeClass('hidden');
                        break;
                    case BaseWorkflow.STATE.FINALIZING:
                    case LocateWorkflow.STATE.CANCELLED:
                        o.$el.find('#dashboard_btn_locate').removeClass('hidden');
                        o.$el.find('#dashboard_btn_locating').addClass('hidden');
                        break;
                    default:
                }
            }, this);
        },


        populateAddress: function(data) {
            if(!data) {
                this.$el.find("#no_stored_location_info").removeClass("hidden");
                this.$el.find("#location_status_info").addClass("hidden");
                this.$el.find(".dashboard_locate_time").html("");
                this.$el.find(".dashboard_address").text("");
                this.$el.find(".dashboard_accuracy .accuracy_val").text("");
                return false;
            }

            var location = data;
            location.time = AMA.Util.locationFormat(data.eventTime, data.eventTimeTo).split("-").join("<br/>");
            if (!location.address) {
                var geocodeRequest = "https://dev.virtualearth.net/REST/v1/Locations/" + location.coordinates;

                var params = {
                    output: "json",
                    key: AMA.config.getBingMapsKey()
                };

                var o = this;
                var afterRetrieveAddress = function(index, response, status, xhr) {
                    // var model = this.data.models[index];
                    if (response &&
                            response.resourceSets &&
                            response.resourceSets.length > 0 &&
                            response.resourceSets[0].resources &&
                            response.resourceSets[0].resources.length > 0) {
                        var address = o._getAddress(response.resourceSets[0].resources[0]);
                        o.$el.find(".dashboard_locate_time").html(location.time);
                        o.$el.find(".dashboard_address").text(address);
                        o.$el.find(".dashboard_accuracy .accuracy_val").text(location.accuracy);
                        o.$el.find("#no_stored_location_info").addClass("hidden");
                        o.$el.find("#location_status_info").removeClass("hidden");
                    } else {
						AMA.debug("Bing was unable to find an address for location: " + location.coordinates);
						AMA.ReportingManager.remoteLog("Bing was unable to find an address for location: " + location.coordinates,
							AMA.config.JsonConstants.LOGLEVEL_STATES.AUDIT);
					}
                };
                $.getJSON(geocodeRequest + "?jsonp=?", params, _.bind(afterRetrieveAddress, this, 0));
            }
        },


        refresh: function () {
            if(AMA.ActionManager.getWorkflow("locate")._state === AMA.workflow.LocateWorkflow.STATE.REFINING ||
                AMA.ActionManager.getWorkflow("locate")._state ===  AMA.workflow.LocateWorkflow.STATE.CONNECTING) return;
            setTimeout(DashboardLocation.__super__.refresh.apply(this), 3000);

        },


        _processData: function(item) {
            var data;
            if(item.time) {
                data = {
                    time: AMA.Util.formatDateAndTime(item.time) || "",
                    address:item.address || "",
                    accuracy: item.accuracy || "" ,
                    hasStatus: "",
                    hasNoStatus: "hidden"
                }
            } else {
                data = {
                    time: "",
                    address: "",
                    accuracy: "",
                    hasStatus: "hidden",
                    hasNoStatus: ""
                }
            }
            // this.populateAddress(item);
            return data;
        },


        render: function() {
            DashboardLocation.__super__.render.apply(this);

            this.locationMap = new AMA.view.LocationMapView({
                el: "#dashboard_map",
                parent: this,
                viewOnly: true,
                mapWidth:250,
                mapHeight:210,
                dataClass: AMA.model.Locations
            });
            this.locationMap.setData(AMA.models.locations);

        },


        _setupEvents: function() {
            this.$el.find(".btn_locate").on("click", function() {
                window.location.hash = "home/location";
                AMA.ActionManager.start("locate");
            });
            if(this.locationMap) {
                this.locationMap.on(AMA.view.LocationMapView.EVENT.MAP_INITIALIZED, function() {
                    this.$el.find("#bing_map").css({
                        width:250,
                        height:210
                    });
                    this.locationMap.show();
                }, this);
            }
        },


        _getAddress: function(bingResponse) {
            var address = "";
            address += bingResponse.address.locality != null ?  bingResponse.address.locality : "";
            address += bingResponse.address.adminDistrict != null ? (address != "" ? ", " : "") + bingResponse.address.adminDistrict + " ": "";
            address += bingResponse.address.postalCode != null ? (address != "" ? " " : "") + bingResponse.address.postalCode : "";

            AMA.debug("getAddress: " + address );
            return address;
        },


        _afterRender: function() {
            this.$el.removeClass("dashboard_panel_loading");
            this.$el.find("#bing_map_dialog").remove();
        }

    });


})();

