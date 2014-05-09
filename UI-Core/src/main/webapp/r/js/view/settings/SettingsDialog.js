/*! SettingsDialogView */
(function () {

    AMA.namespace("view");

    var SettingsDialog = AMA.view.SettingsDialog = AMA.view.BaseView.extend();

    SettingsDialog.TEMPLATE_ID = "";
    SettingsDialog.TEMPLATE_SRC = "";


    AMA.augment(SettingsDialog.prototype, {
        initialize: function () {
            SettingsDialog.__super__.initialize.apply(this, arguments);

            this.prevHash = "";
        },

        render: function () {
            var navButtonsShown = 0;
            this.$el.find(".settings_nav_button").hide();
            // Create the different Settings views

            // Settings Intro
            if (this.options.settingsIntro) {
                this.$el.find("#settings_submit").hide();
                this.settingsIntro = new AMA.view.SettingsIntroView({
                    el: "#settings_intro_tab",
                    parent: this
                });
            }
            else {
                // Profile Settings
                if (this.options.profileSettings) {
                    this.$el.find(".settings_nav_button_profile").parent().show();
                    navButtonsShown++;
                    this.profileSettings = new AMA.view.ProfileSettingsView({
                        el: "#profile_settings_tab",
                        data: AMA.models.dashboardData,
                        parent: this
                    });
                }
                // Backup Settings
                if (this.options.backupSettings) {
                    this.$el.find(".settings_nav_button_backup").parent().show();
                    navButtonsShown++;
                    this.backupSettings = new AMA.view.BackupSettingsView({
                        el: "#backup_settings_tab",
                        data: AMA.models.syncsettings,
                        parent: this
                    });
                }

                // Locate Settings
                if (this.options.locationSettings) {
                    this.$el.find(".settings_nav_button_location").parent().show();
                    navButtonsShown++;
                    this.locationSettings = new AMA.view.LocationSettingsView({
                        el: "#location_settings_tab",
                        data: AMA.models.locatesettings,
                        parent: this
                    });
                }

                // Security Settings
                if (this.options.securitySettings) {
                    this.$el.find(".settings_nav_button_security").parent().show();
                    navButtonsShown++;
                    this.securitySettings = new AMA.view.SecuritySettingsView({
                        el: "#security_settings_tab",
                        data: AMA.models.scansettings,
                        parent: this
                    });
                }

               /* // Safe Browsing Settings
                if (this.options.safeBrowsingSettings) {
                    this.$el.find(".settings_nav .settings_nav_button_security").show();
                    navButtonsShown++;
                    this.safeBrowsingSettings = new AMA.view.SafeBrowsingView({
                        el: "#safebrowsingpane",
                        data: AMA.model.SafeBrowsing,
                        parent: this
                    });
                }*/
            }

            if (navButtonsShown == 1) {
                // Hide Settings navigation bar if there is only one settings view available
                this.$el.find(".settings_nav").hide();
            }
//            else {
//                // Subtract 0.22% for border allowance
//                var ratio = 100 / navButtonsShown - 0.22,
//                        width = ratio.toString() + "%";
//                this.$el.find(".settings_nav_button").css("width", width);
//            }
        },

        hide: function () {
            SettingsDialog.__super__.hide.apply(this, arguments);
            $("#account_settings_link").toggleClass("active");
            AMA.page.content.$el.toggleClass("hidden");

            // $(".ui-dialog-content").dialog("close");
            this.hideElements();
            this.updateValues();
        },
        show: function () {
            SettingsDialog.__super__.show.apply(this, arguments);
        },

        updateValues: function() {
            // invalidate all models to update all values
            if (this.options.profileSettings) {
                AMA.models.dashboardData.invalidate();
            }

            if (this.options.backupSettings) {
                AMA.models.syncsettings.invalidate();
            }

            if (this.options.locationSettings) {
                AMA.models.locatesettings.invalidate();
            }

            if (this.options.securitySettings) {
                AMA.models.scansettings.invalidate();
            }
        },

        _setupEvents: function () {
            //var o = this;
            //this.$el.find(".close").on("click", o.hide);
        },

        hideElements: function () {
            // Hide spinners and any after save messages
            this.$el.find(".settings .connecting").hide();
            this.$el.find(".settings .after_save_message").html("");
            this.$el.find(".settings_intro .intro_after_save_message").html("");
        },
        events: {
            "click li>.settings_nav_button_location": "openLocationsTab",
            "click li>.settings_nav_button_backup": "openBackupTab",
            "click li>.settings_nav_button_profile": "openAccountInfoTab",
            "click li>.settings_nav_button_security": "openSecurityTab",
            "click .rs_cancel": "hide"
        },
        openLocationsTab: function(){
            AMA.page.openSettings("location");
        },
        openBackupTab: function(){
            AMA.page.openSettings("backup");
        },
        openAccountInfoTab: function(){
            AMA.page.openSettings("account_info");
        },
        openSecurityTab: function(){
            AMA.page.openSettings("security");
        }
    });
})();