/*! SettingsView */
(function () {
    AMA.namespace("view");

    var Settings = AMA.view.Settings = AMA.view.BaseView.extend();

    Settings.TEMPLATE_ID = "settings_template";
    Settings.TEMPLATE_SRC = "settings.tpl";


    AMA.augment(Settings.prototype, {
        initialize: function () {
            Settings.__super__.initialize.apply(this, arguments);

            this.events = Settings.EVENT;
        },

        render: function () {
            Settings.__super__.render.apply(this, arguments);

            // Create the Settings dialog
            this.settingsDialog = new AMA.view.SettingsDialog({
                el: "#settings_dialog",
                parent: this,
                showTitle: false,
                showClose: false,
                showOk: false,
                showCancel: false,
                width: 980,
                // Specify below which settings views are to be shown
                settingsIntro: false,
                backupSettings: AMA.models.capabilities.canRead("mediaSettings"),
                locationSettings: AMA.models.capabilities.canRead("eventSettings"),
                profileSettings: AMA.models.capabilities.canRead("accountSettings"),
                securitySettings: AMA.models.capabilities.canRead("appSecuritySettings")
            })
            .plug(AMA.view.plugin.Switcher);
        },

        _setupEvents: function () {
            this.$el.find(".settings_nav_button").on("click", function () {
                $(this).find("a").get(0).click();
            });
            var o=this;
        },

        show: function (tab, prevURL) {
            if (prevURL) {
                this.settingsDialog._config.prevURL = prevURL;
            }
            if (!this.settingsDialog.isRendered) {
                var o = this;
                this.settingsDialog.on(AMA.view.BaseView.EVENT.RENDERED, function () {
                    o.openSettingsDialog(tab);
                });
                return;
            }
            this.openSettingsDialog(tab);
        },

        openSettingsDialog: function (tab) {
            this.settingsDialog.show();
            this.settingsDialog.options.defaultTab = tab;
            this.$el.find(".settings_nav_button").removeClass("selected");
            switch (tab) {
                case 'backup' :
                    if (this.settingsDialog.backupSettings) {
                        this.$el.find(".settings_nav .settings_nav_button_backup").addClass("selected");
                        this.settingsDialog.switchTo(this.settingsDialog.backupSettings);
                    }
                    break;
                case 'location' :
                    if (this.settingsDialog.locationSettings) {
                        this.$el.find(".settings_nav .settings_nav_button_location").addClass("selected");
                        this.settingsDialog.switchTo(this.settingsDialog.locationSettings);
                    }
                    break;
                case 'security' :
                    if (this.settingsDialog.securitySettings) {
                        this.$el.find(".settings_nav .settings_nav_button_security").addClass("selected");
                        this.settingsDialog.switchTo(this.settingsDialog.securitySettings);
                    }
                    break;
                default :
                    if (this.settingsDialog.profileSettings) {
                        this.$el.find(".settings_nav .settings_nav_button_profile").addClass("selected");
                        this.settingsDialog.switchTo(this.settingsDialog.profileSettings);
                    } 
                    break;
            }
        }
    });
})();