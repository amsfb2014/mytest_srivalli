/*! Header */
(function () {
    AMA.namespace("view");

    var Header = AMA.view.Header = AMA.view.BaseView.extend();

    Header.TEMPLATE_ID = "header_template";
    Header.TEMPLATE_SRC = "";


    AMA.augment(Header.prototype, {
        events: {
            "click #logout_link": "doLogout",
            "click #account_settings_link": "openSettingsTab",
            "click #share_feedback_link": "openShareFeedback"
        },

        initialize: function () {
            Header.__super__.initialize.apply(this, arguments);
        },

        _setupEvents: function () {
            this.$el.find("#tabs .menu").children().on("click", function(evt) {
                var tab = $(evt.target),
                    hashTag = tab.attr("tag");
                location.href=location.pathname + "#" + hashTag;
                AMA.Util.setCookie("lastVisited", hashTag, 1);
            });
            this.$el.find("#header-drop-menu").dropdown();
        },
        _processData: function (item){
            item.name = AMA.Util.formatPhone(this.parent.data.toJSON()[0].name)
            return item;
        },
        render: function () {
            Header.__super__.render.apply(this);
            var o = this;
            this.toolbar = new AMA.view.Toolbar({
                el: "#toolbar",
                parent: this
            });

            this.toolbar.once(AMA.view.BaseView.EVENT.RENDERED, function() {
                o.toolbar.registerToolset("endpoint", new AMA.view.EndPointToolset({
                    el: "#endpoint_toolset",
                    parent: this.toolbar,
                    data: AMA.models.endpoints
                }));
                if (AMA.models.capabilities.canRead("storageInfo")) {
                    o.toolbar.registerToolset("storageCapacity", new AMA.view.StorageCapacityToolset({
                        el: "#storage_capacity_toolset",
                        parent: this.toolbar,
                        data: AMA.models.storageInfo
                    }));
                }
                if (AMA.models.capabilities.canRead("syncEvents_actionId")) {
                    o.toolbar.registerToolset("sync", new AMA.view.SyncToolset({
                        parent: this.toolbar,
                        el: "#sync_toolset"
                    }).plug(AMA.view.plugin.Tooltip,{}));
                }
                if (AMA.models.capabilities.canRead("deviceWipeDataAction")) {
                    o.toolbar.registerToolset("wipe", new AMA.view.WipeToolset({
                        el: "#wipe_toolset",
                        parent: this.toolbar
                    }).plug(AMA.view.plugin.Tooltip,{}));
                }
                if (AMA.models.capabilities.canRead("syncEvents_actionId")) {
                    o.toolbar.registerToolset("transferData", new AMA.view.TransferDataToolset({
                        parent: this.toolbar,
                        el: "#transfer_data_toolset"
                    }).plug(AMA.view.plugin.Tooltip,{}));
                }
                o.toolbar.registerToolset("accountStatus", new AMA.view.AccountStatusToolset({
                    parent: this.toolbar,
                    el: "#account_status_toolset",
                    data: AMA.models.devicesettings
                }));
                if (AMA.models.capabilities.canRead("deviceAlarmAction")) {
                    o.toolbar.registerToolset("alarm", new AMA.view.AlarmToolset({
                        parent: this.toolbar,
                        el: "#alarm_toolset"
                    }).plug(AMA.view.plugin.Tooltip,{}));
                }
                if (AMA.models.capabilities.canRead("deviceLockAction")) {
                    o.toolbar.registerToolset("lock", new AMA.view.LockToolset({
                        parent: this.toolbar,
                        el: "#lock_toolset",
                        data: AMA.models.locksettings
                    }).plug(AMA.view.plugin.Tooltip,{}));
                }
                if (AMA.models.capabilities.canRead("locateDeviceEvents_actionId")) {
                    o.toolbar.registerToolset("locate", new AMA.view.LocateToolset({
                        parent: this.toolbar,
                        el: "#locate_toolset"
                    }).plug(AMA.view.plugin.Tooltip,{}));
                }
                if (AMA.models.capabilities.canRead("deviceSecurePhoneAction")) {
                    o.toolbar.registerToolset("securePhone", new AMA.view.SecurePhoneToolset({
                        parent: this.toolbar,
                        el: "#securephone_toolset"
                    }).plug(AMA.view.plugin.Tooltip,{}));
                }
                if (AMA.models.capabilities.canRead("eventActionHistory")) {
                    o.toolbar.registerToolset("recentActivity", new AMA.view.RecentActivityToolset({
                        parent: this.toolbar,
                        el: "#recent_activity_toolset",
                        data: AMA.models.endpointHistory
                    }).plug(AMA.view.plugin.Tooltip,{}));
                }
                if (AMA.models.capabilities.canRead("appInfectionScanResults_actionId")) {
                    o.toolbar.registerToolset("scan", new AMA.view.ScanToolset({
                        el: "#scan_toolset",
                        parent: this.toolbar
                    }).plug(AMA.view.plugin.Tooltip,{}));
                }
                if (AMA.models.capabilities.canRead("apphealthscanresults_id_resources")) {
                    o.toolbar.registerToolset("diagnosticScan", new AMA.view.DiagnosticScanToolset({
                        el: "#diagnosticScan_toolset",
                        parent: this.toolbar
                    }).plug(AMA.view.plugin.Tooltip,{}));
                }
                if (AMA.models.capabilities.canRead("appVulnerabilityScanResults_id")) {
                    o.toolbar.registerToolset("AppAssist", new AMA.view.AppAssistToolset({
                        el: "#app_assist_toolset",
                        parent: this.toolbar,
                        data: AMA.models.privacy
                    }));
                }
            });
			
        },
        
        addToolbar : function(owner, toolset) {
            return this.toolbar.addToolbar(owner, toolset);
        },

        switchToolbar: function(tool) {
            this.toolbar.switchTo(tool);
        },

        doLogout: function () {
            AMA.page.logout();
        },

        openSettingsTab: function(){
            AMA.page.openSettings("location");
        },

        openShareFeedback:function() {
            AMA.page.openShareFeedback();
        },

        showAdaptiveView: function (e) {			
            AMA.showAdaptiveSite();
        }
    });
})();
