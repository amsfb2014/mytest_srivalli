/*! WipeToolset */
(function () {
    AMA.namespace("view");

    var WipeToolset = AMA.view.WipeToolset = AMA.view.BaseView.extend();

    WipeToolset.TEMPLATE_ID = "wipe_toolset_template";
    WipeToolset.TEMPLATE_SRC = "";

    WipeToolset.CSS = {
        CONNECTING: "connecting",
        SYNCING: "syncing",
        ERASING: "erasing",
        UNSUCCESSFUL: "unsuccessful",
        SUCCESS: "success",
        NORMAL: "normal"
    };


    _.extend(WipeToolset.prototype, {
        events: {
            "click .button_wipe.normal": "_showDialog",
            "click .button_wipe.unsuccessful": "_showDialog"
        },

        /**
         * Changes button state of the toolset
         *
         * @param {String} action: Name of the button state to be displayed
         * 
         */
        toggleDisplay: function(action) {
            this.$el.find("." + action).show().siblings(".button_wipe").hide();
        },

        render: function () {
            WipeToolset.__super__.render.apply(this);

            if (!this.wipePhoneDialog) {
                // Create the Erase dialog
                this.wipePhoneDialog = new AMA.view.WipePhoneDialog({
                    el: "#wipephonedialog",
                    width: 670,
                    parent: this,
                    hidden: true,
                    data: AMA.models.devicesettings,
                    endpoint: AMA.models.endpoints
                }); 
            } else {
                this.wipePhoneDialog.render();
            }

            // Tooltip processing

            // Show tooltip about backing up device if supported
            if (AMA.models.capabilities.canCreate("syncEvents")) {
                this.$el.find(".tooltip .wipe").removeClass("hidden");
            } else {
                this.$el.find(".tooltip .wipeonly").removeClass("hidden");
            }

            // Show tooltip about locking device if supported
            if (AMA.config.lockEnabled) {
                this.$el.find(".tooltip .lockenabled").removeClass("hidden");
            }

            // Show tooltip about BlackBerry device if supported
            if (AMA.Util.isBB(AMA.models.endpoints.models[0].get("platformfriendlyname"))) {
                this.$el.find(".tooltip").addClass("long");
                this.$el.find(".tooltip .isblackberry").removeClass("hidden");
            }
        },

        _processData: function (item) {

        },

        _showDialog: function() {
            this.wipePhoneDialog.show();
        },

        _showRestoreSteps: function () {
            // Open the Transfer Data Wizard
            AMA.page.header.toolbar.toolsets.transferData.transferDataWizard.show();
        }
    });
})();