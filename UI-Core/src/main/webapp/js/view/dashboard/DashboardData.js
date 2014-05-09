/*! DashboardData */
(function () {

    AMA.namespace("view");

    var DashboardData = AMA.view.DashboardData = AMA.view.BaseView.extend();

    DashboardData.TEMPLATE_ID = "dashboard_backup_template";
    DashboardData.TEMPLATE_SRC = "";

    DashboardData.EVENT = AMA.enums(
        "EXTRA_DATA_LOADED",
        "NEW_SYNC_DETAILS"
    );

    DashboardData.CSS = {
        CONTACTS_COUNT: "dashboard_onweb_count",
        PHOTOS_COUNT: "dashboard_imagesonweb_count",
        VIDEOS_COUNT: "dashboard_videosonweb_count",
        SYNC_CONTACTS: "btn_sync"
    };

    _.extend(DashboardData.prototype, {

        initialize: function () {
            DashboardData.__super__.initialize.apply(this, arguments);

            this.$el.addClass("dashboard_panel_loading");

            AMA.models.syncHistory.on("reset", function() {
                this.trigger(DashboardData.EVENT.NEW_SYNC_DETAILS, {"type": "newSyncDeatils"});
            },  this);

            AMA.models.contactSummary.on("reset", function() {
                this.trigger(DashboardData.EVENT.EXTRA_DATA_LOADED, {"type": "contactSummary"});
            }, this);

            AMA.models.videosSummary.on("reset", function() {
                this.trigger(DashboardData.EVENT.EXTRA_DATA_LOADED, {"type": "videosSummary"});
            },  this);

            AMA.models.photosSummary.on("reset", function() {
                this.trigger(DashboardData.EVENT.EXTRA_DATA_LOADED, {"type": "photosSummary"});
            }, this);

        },


        loadExtraData: function(type) {
            var o = this;
            AMA.models[type].fetch();
        },


        _processData: function(item) {
            var data = item || {};

            data.storageLimit = parseInt(item.totalCapacity || 2147483648);
            data.ImageSize = parseInt(item.photosUsedCapacity || 0);
            data.VideoSize = parseInt(item.videosUsedCapacity || 0);
            data.TrashSize = parseInt(item.trashUsedCapacity || 0);

            data.ImageUse = (data.ImageSize * 100) / data.storageLimit;
            data.VideoUse = (data.VideoSize * 100) / data.storageLimit;
            data.TrashUse = (data.TrashSize * 100) / data.storageLimit;

            data.totalUsed = data.ImageSize + data.VideoSize + data.TrashSize;

            return data;
        },


        _setupEvents: function() {
            var o = this;
            this.on(DashboardData.EVENT.NEW_SYNC_DETAILS, function() {
                var syncHistory = AMA.models.syncHistory.toJSON();
				// get the last item, not the first
				var data = syncHistory[syncHistory.length - 1] || {};
                if(typeof data === "object" && data.eventTime) {
                    var totalContactsSynced =  data.webContactCreate + data.webContactUpdate + data.webContactDelete 
							+ data.deviceContactCreate + data.deviceContactUpdate + data.deviceContactDelete;
					var totalVideosSynced = data.deviceVideosDelete + data.deviceTransmitVideos + data.deviceVideosCreate;
                    var totalPhotosSynced = data.devicePhotosDelete + data.deviceTransmitImages + data.devicePhotosCreate;

                    o.$el.find("." + DashboardData.CSS.CONTACTS_COUNT).text(totalContactsSynced);
                    o.$el.find("." + DashboardData.CSS.VIDEOS_COUNT).text(totalVideosSynced);
                    o.$el.find("." + DashboardData.CSS.PHOTOS_COUNT).text(totalPhotosSynced);
					
					o.$el.find('.dashboard_sync_date.hasSynced').html(AMA.Util.formatDateAndTime(data.eventTime));
					AMA.Util.switchLabel(".dashboard_sync_date", ".hasSynced", this.$el);
                    
                    o.$el.find('.dashboard_sync_msg.hasSynced').html(data.statusDetails);
                    AMA.Util.switchLabel(".dashboard_sync_msg", ".hasSynced", this.$el);
					
					o.$el.find('.dashboard_sync_msg').removeClass("hidden").siblings('.sync_status_message').addClass("hidden");

                } else {

                    o.$el.find("." + DashboardData.CSS.CONTACTS_COUNT).text(0);
                    o.$el.find("." + DashboardData.CSS.VIDEOS_COUNT).text(0);
                    o.$el.find("." + DashboardData.CSS.PHOTOS_COUNT).text(0);
                    // o.$el.find('.dashboard_sync_date').html("Never");
                    // o.$el.find('.dashboard_sync_msg').html("No last Sync Details.");
					AMA.Util.switchLabel(".dashboard_sync_date", ".neverSynced", this.$el);
					AMA.Util.switchLabel(".dashboard_sync_msg", ".hasSynced", this.$el);
                    
					o.$el.find('.dashboard_sync_msg').removeClass("hidden").siblings('.sync_status_message').addClass("hidden");
                    o.$el.find('.backup_summary').removeClass("loading").find("li").show();

                }
				
                if(data.statusDetails) {
                    if(this.checkStatusDetails(data.statusDetails) !== 'NOT_MAPPED') {
                        o.$el.find('.' + this.checkStatusDetails(data.statusDetails) ).removeClass("hidden").siblings('.sync_status_message').addClass("hidden");
                        o.$el.find('.backup_summary').removeClass("loading").find("li").hide();
                    }
                } else {
                    o.$el.find('.dashboard_sync_msg').removeClass("hidden").siblings('.sync_status_message').addClass("hidden");
                }
                if(this.checkStatusDetails(data.statusDetails) === 'NOT_MAPPED') {
                    o.$el.find('.backup_summary').removeClass("loading").find("li").show();
                }
            }, this);
            this.$el.find("." + DashboardData.CSS.SYNC_CONTACTS).on("click", function() {
                window.location.hash = "home/data";
                Backbone.globalEvent.trigger("showSyncDialog",{type:"Dashboard"});
            });
            this.$el.find(".viewdetails").on("click", function() {
                window.location.hash = "home/data";
            })

        },


        checkStatusDetails: function(stat) {
            if(!stat) return;
            if(stat.indexOf("USER_STOPPED") !== -1) {
                return "USER_STOPPED";
            } else if(stat.indexOf("AIRPLANE_MODE") !== -1) {
                return "AIRPLANE_MODE";
            } else if(stat.indexOf("FILE_NOT_FOUND") !== -1) {
                return "FILE_NOT_FOUND";
            } else if(stat.indexOf("LOW_BATTERY") !== -1) {
                return "LOW_BATTERY";
            } else if(stat.indexOf("NETWORK_ERROR") !== -1) {
                return "NETWORK_ERROR";
            } else if(stat.indexOf("NETWORK_ROAMING_DETECTED") !== -1) {
                return "NETWORK_ROAMING_DETECTED";
            } else if(stat.indexOf("NETWORK_SETTINGS_CONFLICT") !== -1) {
                return "NETWORK_SETTINGS_CONFLICT";
            } else if(stat.indexOf("PHONE_STORAGE_EXCEEDED") !== -1) {
                return "PHONE_STORAGE_EXCEEDED";
            } else if(stat.indexOf("SD_UNAVAILABLE") !== -1) {
                return "SD_UNAVAILABLE";
            } else if(stat.indexOf("SYNC_FAILED") !== -1) {
                return "SYNC_FAILED";
            } else if(stat.indexOf("SYSTEM_UNAVAILABLE") !== -1) {
                return "SYSTEM_UNAVAILABLE";
            } else if(stat.indexOf("TIME_CONSUMING") !== -1) {
                return "TIME_CONSUMING";
            } else if(stat.indexOf("WEB_STORAGE_EXCEEDED") !== -1) {
                return "WEB_STORAGE_EXCEEDED";
            } else if(stat.indexOf("APPLICATION_RESET") !== -1) {
                return "APPLICATION_RESET";
            } else if(stat.indexOf("USER_STOPPED_NETWORK_ERROR") !== -1) {
                return "USER_STOPPED_NETWORK_ERROR";
            }
            return "NOT_MAPPED";

        },


        render: function () {
            DashboardData.__super__.render.apply(this);
            //if (AMA.models.contactSummary && !AMA.models.contactSummary.isLoaded)
            try {
                AMA.models.syncHistory.fetch();
            } catch (e) {
                AMA.debug("can't fetch sync?")
            } finally {

            }
        },


        _afterRender: function() {
           this.$el.removeClass("dashboard_panel_loading")
               .find('.backup_summary')
                   .addClass("loading")
               .find("li").hide();
            if(AMA.models.endpoints.models[0].get("platform").indexOf("iPhone") > -1) {
                this.$el.find(".btn_sync").hide();
            }
        }
    });


})();

