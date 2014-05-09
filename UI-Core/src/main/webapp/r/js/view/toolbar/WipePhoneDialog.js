/*! WipePhoneDialog */
(function () {
    AMA.namespace("view");

    var WipePhoneDialog = AMA.view.WipePhoneDialog = AMA.view.Wizard.extend();

    WipePhoneDialog.TEMPLATE_ID = "wipephonedialog_template";
    WipePhoneDialog.TEMPLATE_SRC = "";


    _.extend(WipePhoneDialog.prototype, {
        events: {
            "click .close": "_hideDialog",
            "click .btn_cancel": "_hideDialog",
            "click .btn_factory_reset_device.sync": "_wipe",
            "click .btn_factory_reset_device.nosync": "_wipeonly",
            "click .btn_erase.sync": "_wipe",
            "click .btn_erase.nosync": "_wipeonly",
            "click .btn_erase_and_lock.sync": "_wipe",
            "click .btn_erase_and_lock.nosync": "_wipeonly",
            "click .btn_sync_then_wipe": "_wipe",
            "click .btn_nosync_then_wipe": "_wipeonly",
            "click .btn_sync_then_reset": "_wipe",
            "click .btn_nosync_then_reset": "_wipeonly",
            "click .btn_logout" : "_factorySuccessLogout"
        },

        _setupEvents: function() {
            var o = this;
            this._setupSteps();

            // Event handlers for Previous/Next buttons
            this.$el.find(".next").on("click", function() {
                $(o.steps[o.steps.index(o.$el.find("." + AMA.view.Wizard.CSS.ACTIVE))])
                        .removeClass(AMA.view.Wizard.CSS.ACTIVE)
                        .next()
                        .addClass(AMA.view.Wizard.CSS.ACTIVE);
                // Override to call processDialogView
                o.processDialogView();
            });
            this.$el.find(".previous").on("click", function() {
                $(o.steps[o.steps.index(o.$el.find("."+AMA.view.Wizard.CSS.ACTIVE))])
                        .removeClass(AMA.view.Wizard.CSS.ACTIVE)
                        .prev()
                        .addClass(AMA.view.Wizard.CSS.ACTIVE);
                // Override to call processDialogView
                o.processDialogView();
            });
        },

        /**
         * Opens the Erase dialog
         *
         * @param {String} step: Name of the step that the dialog will proceed to (optional)
         * 
         */
        show: function (step) {
            if (step === "resetsuccess") {
                // Hide the Close button for the Factory Reset Successful step
                this.$el.find(".close").hide();
            }

            WipePhoneDialog.__super__.show.call(this);

            this.processDialogView(step);
        },

        _hideDialog: function () {
            // Reset to first step when closing the dialog
            if(!this.$el.find(".step1").hasClass("current")) {
            	
                this.$el.find(".title").addClass("hidden");
                this.$el.find(".title.wipe").removeClass("hidden");
                this.$el.find(".wiz_step").removeClass("current");
                this.$el.find(".step1, .step1_buttons").addClass("current");
            }
            this.hide();
        },

        _wipe: function () {
            this._hideDialog();
            var wipeWorkflow = this._createWipeWorkflow();

            if (this.$el.find("input#wipephone_reset:checked").length > 0) {
                AMA.ActionManager.define("wipefactoryonly", wipeWorkflow);
                AMA.ActionManager.start("wipefactoryonly");
            } else {
                AMA.ActionManager.define("wipe", wipeWorkflow);
                AMA.ActionManager.start("wipe");
            }
        },

        _wipeonly: function () {
            this._hideDialog();
            var wipeonlyWorkflow = this._createWipeWorkflow();

            if (this.$el.find("input#wipephone_reset:checked").length > 0) {
                AMA.ActionManager.define("wipefactoryonly", wipeonlyWorkflow);
                AMA.ActionManager.start("wipefactoryonly");
            } else {
                AMA.ActionManager.define("wipeonly", wipeonlyWorkflow);
                AMA.ActionManager.start("wipeonly");
            }
        },

        _createWipeWorkflow : function () {
            var ActionManager = AMA.ActionManager,
                BaseWorkflow = AMA.workflow.BaseWorkflow,
                WipeWorkflow = AMA.workflow.WipeWorkflow,
                workflow = new WipeWorkflow();

            workflow.on(BaseWorkflow.EVENT.STATE_CHANGED, function (event) {
                switch (event.state) {
                    case BaseWorkflow.STATE.INITIALIZING:
                        AMA.debug("Wipe Toolset has switched the Wipe Button state to 'connecting'; countdown initialized");

                        this.parent.toggleDisplay(AMA.view.WipeToolset.CSS.CONNECTING);
                        break;

                    case WipeWorkflow.STATE.SYNCING:
                        AMA.debug("Wipe Toolset has switched the Wipe Button state to 'syncing'");

                        this.parent.toggleDisplay(AMA.view.WipeToolset.CSS.SYNCING);
                        break;

                    case WipeWorkflow.STATE.ERASING:
                        AMA.debug("Wipe Toolset has switched the Wipe Button state to 'erasing'");

                        this.parent.toggleDisplay(AMA.view.WipeToolset.CSS.ERASING);

                        // Update the tooltip with the running totals
                        var buttonTooltip = this.parent.$el.find(".button_wipe.outcome:not(.unsuccessful) .tooltip"),
                            totals = this._buildTotals(event.data);

                        buttonTooltip.find(".total_erased_audio").html(totals.audio || "0/0");
                        buttonTooltip.find(".total_erased_mediafiles").html(totals.file || "0/0");
                        buttonTooltip.find(".total_erased_video").html(totals.video || "0/0");
                        buttonTooltip.find(".total_erased_photo").html(totals.photo || "0/0");
                        buttonTooltip.find(".total_erased_folder").html(totals.folder || "0/0");
                        buttonTooltip.find(".total_erased_sms").html(totals.sms || "0/0");
                        buttonTooltip.find(".total_erased_calllog").html(totals.call_log || "0/0");
                        buttonTooltip.find(".total_erased_calendar").html(totals.calendar || "0/0");
                        buttonTooltip.find(".total_erased_contact").html(totals.contacts || "0/0");

                        break;

                    default:
                }
            }, this);

            workflow.on(BaseWorkflow.EVENT.FINISHED, function (event) {
                switch (event.result) {
                    case BaseWorkflow.RESULT.SUCCESSFUL:
                        this.parent.toggleDisplay(AMA.view.WipeToolset.CSS.SUCCESS);

                        // Update the tooltip with the final totals
                        var buttonTooltip = this.parent.$el.find(".button_wipe.outcome:not(.unsuccessful) .tooltip"),
                            totals = this._buildTotals(event.data.split("\n"));

                        buttonTooltip.find(".total_erased_audio").html(totals.audio || "0/0");
                        buttonTooltip.find(".total_erased_mediafiles").html(totals.file || "0/0");
                        buttonTooltip.find(".total_erased_video").html(totals.video || "0/0");
                        buttonTooltip.find(".total_erased_photo").html(totals.photo || "0/0");
                        buttonTooltip.find(".total_erased_folder").html(totals.folder || "0/0");
                        buttonTooltip.find(".total_erased_sms").html(totals.sms || "0/0");
                        buttonTooltip.find(".total_erased_calllog").html(totals.call_log || "0/0");
                        buttonTooltip.find(".total_erased_calendar").html(totals.calendar || "0/0");
                        buttonTooltip.find(".total_erased_contact").html(totals.contacts || "0/0");

                        AMA.models.contacts.invalidate();
                        AMA.models.photos.invalidate();
                        AMA.models.videos.invalidate();

                        break;
                    case WipeWorkflow.RESULT.FACTORY_RESET_SUCCESSFUL:
                        this.parent.toggleDisplay(AMA.view.WipeToolset.CSS.NORMAL);

                        // Move to "Factory Reset Success" step of wizard
                        this.show("resetsuccess");

                        break;
                    default:
                        this.parent.toggleDisplay(AMA.view.WipeToolset.CSS.UNSUCCESSFUL);
                }
            }, this);

            // Event handler for the countdown
            workflow.on(BaseWorkflow.EVENT.COUNTDOWN_TICK, function (event) {
                $("#wipe_toolset_countdown").html(event.remaining);
            }, this);

            return workflow;
        },

        /** 
         * Show/hide elements in the dialog template based on parameters passed
         *
         * @param {String} step: Name of the step which the wizard will jump to; matches class name in template (optional)
         * 
         */
        processDialogView: function (step) {
            var isAndroid = AMA.Util.isAndroid(this.options.endpoint.models[0].get("platformfriendlyname")),
                //osVersion = isAndroid ? $.parseJSON(this.options.endpoint.models[0].get("version")) : 0;
                adminEnabled = (this.data.models[0].get("android_device_admin") === "1"),
                syncAndOrWipeSupported = (this.options.endpoint.models[0].get("syncAndOrWipeSupported") === "true");

            // Proceed to a step in the wizard if one is defined
            if (step) {
                this.$el.find(".wiz_step").removeClass("current");
                this.$el.find("." + step + ".wiz_step, ."+ step +"_buttons").addClass("current");
            }

            if (this.$el.find(".step1").hasClass("current")) {
            	this.$el.find(".step1_buttons").addClass("current").removeClass("hidden");
            	this.$el.find(".step1_buttons").siblings().removeClass("current").addClass("hidden");
                // Hide all buttons except "Cancel"            	
            	this.$el.find(".step1_buttons .btn-primary:not(.btn_cancel)").hide();

                // If lock is disabled, remove lock terminology and buttons
                if (!AMA.config.lockEnabled) {
                    this.$el.find(".step1 .no_lock, .step1_buttons .no_lock").hide();
                }

                // Based on capabilities, hide sections of the dialog
                // 1. In current labs, factory reset is enabled only if device is Android and has device admin enabled
                //if (isAndroid && (parseInt(osVersion["device-os-version"]) > 7) && adminEnabled) {
                if (isAndroid && adminEnabled) {
                    this.$el.find(".step1 .wipeonly").hide();
                    this.$el.find(".step1 .wipesync").hide();
                    this.$el.find(".step1 input#wipephone_wipe").prop("checked", true);
                } else {
                    // 2. Else, wipe with sync or wipe without sync depending on whether device supports backup 
                    this.$el.find(".step1 .wipereset").hide();
                    if (AMA.models.capabilities.canCreate("syncEvents")) {
                        this.$el.find(".step1 .wipeonly").hide();
                    } else {
                        this.$el.find(".step1 .wipesync").hide();
                    }
                }

                // Based on capabilities, show dialog buttons
                if (adminEnabled) {
                    this.$el.find(".step1_buttons .btn_next").show();
                } else {
                    if (AMA.config.lockEnabled) {
                        this.$el.find(".step1_buttons .btn_erase_and_lock").show();
                    } else {
                        this.$el.find(".step1_buttons .btn_erase").show();
                    }

                    if (AMA.models.capabilities.canCreate("syncEvents")) {
                    	console.log("1 - "+AMA.models.capabilities.canCreate("syncEvents"));
                        this.$el.find(".step1_buttons .nosync").hide();
                    } else {
                    	console.log("2 - "+AMA.models.capabilities.canCreate("syncEvents"));
                        this.$el.find(".step1_buttons .sync").hide();
                    }
                }
            } else if(this.$el.find(".step2").hasClass("current")) {
                this.$el.find(".step2 .warning").hide();
            	this.$el.find(".step2_buttons").addClass("current").removeClass("hidden");
            	this.$el.find(".step2_buttons").siblings().removeClass("current").addClass("hidden");
                this.$el.find(".step2_buttons .btn-primary:not(.btn_cancel)").hide();
                if (this.$el.find("#wipephone_wipe:checked").length > 0) {
                    if (syncAndOrWipeSupported) {
                        this.$el.find(".step2 .warning.optionalsync").show();
                        this.$el.find(".step2_buttons .btn_sync_then_wipe").show();
                        this.$el.find(".step2_buttons .btn_nosync_then_wipe").show();
                        this.$el.find(".step2 .confirm .wipingorresetting_wiping").show();
                        this.$el.find(".step2 .confirm .wipingorresetting_resetting").hide();
                    } else {
                        this.$el.find(".step2 .warning.erase").show();

                        if (!AMA.config.lockEnabled) {
                            this.$el.find(".step2_buttons .btn_erase_and_lock").hide();
                            this.$el.find(".step2_buttons .btn_erase").show();
                        } else {
                            this.$el.find(".step2_buttons .btn_erase_and_lock").show();
                            this.$el.find(".step2_buttons .btn_erase").hide();
                        }
                        
                        if (AMA.models.capabilities.canCreate("syncEvents")) {
                            this.$el.find(".step2_buttons .nosync").hide();
                        } else {
                            this.$el.find(".step2_buttons .sync").hide();
                        }
                    }
                } else {
                    this.$el.find(".title").addClass("hidden");
                    this.$el.find(".title.reset").removeClass("hidden");
                    if (syncAndOrWipeSupported) {
                        this.$el.find(".step2 .warning.optionalsync").show();
                        this.$el.find(".step2_buttons .btn_sync_then_reset").show();
                        this.$el.find(".step2_buttons .btn_nosync_then_reset").show();
                        this.$el.find(".step2 .confirm .wipingorresetting_resetting").show();
                        this.$el.find(".step2 .confirm .wipingorresetting_wiping").hide();
                    } else {
                        this.$el.find(".step2 .warning.factoryreset").show();
                        this.$el.find(".step2_buttons .btn_factory_reset_device").show();

                        if (AMA.models.capabilities.canCreate("syncEvents")) {
                            this.$el.find(".step2_buttons .nosync").hide();
                        } else {
                            this.$el.find(".step2_buttons .sync").hide();
                        }
                    }
                }
            } else if(this.$el.find(".resetsuccess").hasClass("current")) {
                this.$el.find(".title").addClass("hidden");
                this.$el.find(".title.resetsuccess").removeClass("hidden");
            	this.$el.find(".resetsuccess_buttons").addClass("current").removeClass("hidden");
            	this.$el.find(".resetsuccess_buttons").siblings().removeClass("current").addClass("hidden");
            }
        },

        _buildTotals: function (totalsObj) {
            var obj = {
                audio : null,
                file : null,
                video : null,
                photo : null,
                folder : null,
                sms : null,
                call_log : null,
                calendar : null,
                contacts : null
            };

            _.each(totalsObj, function (item) {
                if (item.indexOf("audios") == 0)
                    obj.audio = item.substr(7) === "0/-1" ? "0/0" : item.substr(7);
                else if (item.indexOf("files") == 0)
                    obj.file = item.substr(6) === "0/-1" ? "0/0" : item.substr(6);
                else if (item.indexOf("videos") == 0)
                    obj.video = item.substr(7) === "0/-1" ? "0/0" : item.substr(7);
                else if (item.indexOf("pictures") == 0)
                    obj.photo = item.substr(9) === "0/-1" ? "0/0" : item.substr(9);
                else if (item.indexOf("folders") == 0)
                    obj.folder = item.substr(8) === "0/-1" ? "0/0" : item.substr(8);
                else if (item.indexOf("sms") == 0)
                    obj.sms = item.substr(4) === "0/-1" ? "0/0" : item.substr(4);
                else if (item.indexOf("calllogs") == 0)
                    obj.call_log = item.substr(9) === "0/-1" ? "0/0" : item.substr(9);
                else if (item.indexOf("calendar") == 0)
                    obj.calendar = item.substr(9) === "0/-1" ? "0/0" : item.substr(9);
                else if (item.indexOf("contacts") == 0)
                    obj.contacts = item.substr(9) === "0/-1" ? "0/0" : item.substr(9);
            }, obj);

            return obj;
        },

        _factorySuccessLogout: function () {
            //AMA.Util.logout();

            location = "index.html#get_started";
        }
    });
})();
