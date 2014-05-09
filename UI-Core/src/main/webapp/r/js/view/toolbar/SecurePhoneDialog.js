/*! SecurePhoneDialog */
(function () {
    AMA.namespace("view");

    var SecurePhoneDialog = AMA.view.SecurePhoneDialog = AMA.view.Wizard.extend();

    SecurePhoneDialog.TEMPLATE_ID = "securephone_dialog_template";
    SecurePhoneDialog.TEMPLATE_SRC = "";


    _.extend(SecurePhoneDialog.prototype, {
        initialize: function () {
            SecurePhoneDialog.__super__.initialize.apply(this);

            this._performAnnounce = false;
            this._performErase = false;
			
			this._locateSuccess = false;
			this._wipeSuccess = false;
			this._announceSuccess = false;
        },

        events: {
            "click .close": "hide",
            "click .btn_cancel": "hide",
            "click .btn_submit": "_doSecurePhone",
            "click #securephone_announce": "_toggleAnnounceTextarea"
        },

        _setupEvents: function () {
            this._setupSteps();

            var o = this;
            // Event handler to count the number of characters in the announce message textarea whenever a key is pressed
            this.$el.find("#securephone_announce_message").on("keyup", function () {
                o.$el.find("#securephone_announce_charcount").html(o._countAnnounceTextareaChars());
            });
        },

        /**
         * Opens the Secure Phone dialog
         *
         * @param {String} step: Name of the step that the dialog will proceed to (optional)
         * 
         */
        show: function (step) {
            SecurePhoneDialog.__super__.show.call(this);

            // Call to function which will show/hide elements in the dialog
            this.processDialogView(step);
            $("#securephone_announce_message").val($("#securephone_announce_default_message").html());
        },

        _doSecurePhone: function () {
            var ActionManager = AMA.ActionManager,
                BaseWorkflow = AMA.workflow.BaseWorkflow,
                SecurePhoneWorkflow = AMA.workflow.SecurePhoneWorkflow,
                announceMessage = null,
                actionsString = "gpsrefresh",
                workflow = this.parent.workflow,
                o = this;

            // Based on options, determine whether Announce and Erase will be performed
            this._performAnnounce = $("#securephone_announce").is(":checked");
            this._performErase = $("#securephone_wipe").is(":checked");

            // If Announce is enabled, trim whitespaces around message if one is provided
            announceMessage = this._performAnnounce ? $.trim(this.$el.find("#securephone_announce_message").val()) : null;

            // If "Announce" is checked but there is no message, show error message
            if (this._performAnnounce && announceMessage.length == 0) {
                this.$el.find(".error").addClass("hidden");
                this.$el.find(".error.notext").removeClass("hidden");
                return;
            }

            // If required, concatenate wipe and/or announce to action string
            actionsString += this._performErase ? "|wipe" : "";
            actionsString += this._performAnnounce ? "|announce" : "";

            /**
             * TODO: REMOVE all maps related calls.
             */
            workflow.on(BaseWorkflow.EVENT.STATE_CHANGED, function (event) {
                switch (event.state) {
                    case BaseWorkflow.STATE.INITIALIZING:
                        AMA.debug("Secure Phone Toolset has switched the Secure Phone Button state to 'connecting'");

                        this.parent.toggleDisplay(AMA.view.SecurePhoneToolset.CSS.CONNECTING);
                        this.processDialogView("step2", event.state);
                        break;

                    case SecurePhoneWorkflow.STATE.CONNECTING:
                        AMA.debug("Secure Phone Toolset has switched the Secure Phone Button state to 'announcing'; countdown initialized");

                        this.parent.toggleDisplay(AMA.view.SecurePhoneToolset.CSS.ANNOUNCING);
                        this.processDialogView("step2", event.state);
                        break;

                    case SecurePhoneWorkflow.STATE.ANNOUNCE_DISPLAYED:
                        AMA.debug("Announce message has been viewed on the device by the user; proceeding to next action");

                        this.processDialogView("step2", event.state);
                        break;

                    case SecurePhoneWorkflow.STATE.CONTACTS_ERASED:
                        AMA.debug("Contacts successfully erased; proceeding to next action");

                        this.processDialogView("step2", event.state, null, null, null, event.contactsErased);
                        break;

                    case SecurePhoneWorkflow.STATE.REFINING:
                        AMA.debug("Contacts successfully erased; proceeding to next action");
                        AMA.page.content.locationTab.locationMap.CurrentState = AMA.workflow.LocateWorkflow.STATE.REFINING;
                        this.processDialogView("step2", event.state);
                        break;

                    case SecurePhoneWorkflow.STATE.RETRYING:
                        AMA.debug("Updating the Secure Phone dialog with retry information");
                        this.parent.toggleDisplay(AMA.view.SecurePhoneToolset.CSS.RETRYING);
                        this.processDialogView("step2", event.state, null, null, null, null, event.retryInformation);
                        break;

                    case BaseWorkflow.STATE.FINALIZING:
                        AMA.page.content.locationTab.locationMap.CurrentState=BaseWorkflow.STATE.FINALIZING;
                        
						this._locateSuccess = event.locateSuccess;
						this._wipeSuccess = event.wipeSuccess;
						this._announceSuccess = event.announceSuccess;
						
                        //this.processDialogView("step2", event.state);
                        break;

                    default:
                }
            }, this);

            // Handler when workflow finishes
            workflow.on(BaseWorkflow.EVENT.FINISHED, function (event) {
                this.parent.toggleDisplay(AMA.view.SecurePhoneToolset.CSS.NORMAL);
                switch (event.result) {
                    case BaseWorkflow.RESULT.SUCCESSFUL:
                        this.processDialogView("step2", event.result, this._locateSuccess, this._wipeSuccess, this._announceSuccess);
                        break;

                    default:
                        AMA.page.content.locationTab.locationMap.status="fail";
                        this.processDialogView("step2", event.result);
                }
            }, this);

            // Event handler for the countdown
            workflow.on(BaseWorkflow.EVENT.COUNTDOWN_TICK, function (event) {
                $(".securephone_toolset_countdown").html(event.remaining);
            }, this);

            // Check for profanity in the message using the WebPurify plugin
            $.webpurify.check(announceMessage, function (containsProfanity) {
                // If the message contains profanity, display error message. Otherwise, start the workflow.
                if (containsProfanity) { 
                    o.$el.find(".error").addClass("hidden");
                    o.$el.find(".error.containsprofanity").removeClass("hidden");
                    return;
                } else {
                    o.parent.start({
                        actionsString: actionsString,
                        announceMessage: announceMessage,
                        performAnnounce: o._performAnnounce,
                        performErase: o._performErase
                    });
                }
            });
        },

        /**
         * Show/hide elements in the dialog template based on parameters passed
         *
         * All arguments below optional
         * @param {String} step: Name of the step which the wizard will jump to; matches class name in template
         * @param {Object} state: Workflow state
         * @param {Boolean} locateSuccess: Indicator whether locate operation has succeeded
         * @param {String} contactsErased: Number of contacts erased; derived from status response
         * @param {Object} retryInfo: Contains information about Secure Phone retry from the server
         * 
         */
        processDialogView: function (step, state, locateSuccess, announceSuccess, wipeSuccess, contactsErased, retryInfo) {
            var $el = this.$el;
            var announceSupported = (this.options.endpoint.models[0].get("announceSupported") === true);
			
            // Move to the defined step, if provided
            if (step) {
                $el.find(".wiz_step").removeClass("current");
                $el.find("." + step + ".wiz_step").addClass("current");
            }

            // Processing for Step 1
            if ($el.find(".step1").hasClass("current")) {
                $el.find(".title .securephone_retry").addClass("hidden");
                $el.find(".step1 .announce, .step1 .wipe, .modal-footer").show();

                // reset checkboxes
                $el.find("#securephone_announce").prop("checked", null);
                $el.find("#securephone_wipe").prop("checked", null);

                // disable the "Announce" checkbox is phone does not support announce feature
                if (!announceSupported) {
                    $el.find("#securephone_announce").prop("disabled", true);
                }

                $el.find(".error").addClass("hidden");
                this._toggleAnnounceTextarea();
            } else if ($el.find(".step2").hasClass("current")) {
                // Processing for Step 2
                var BaseWorkflow = AMA.workflow.BaseWorkflow,
                    SecurePhoneWorkflow = AMA.workflow.SecurePhoneWorkflow,
                    announceIsChecked = $el.find("#securephone_announce").prop("checked"),
                    wipeIsChecked = $el.find("#securephone_wipe").prop("checked");

                $el.find(".announce.feature, .wipe.feature, .divider-announce, .divider-wipe, .modal-footer").hide();

                if (announceIsChecked) {
                    $el.find(".announce.feature, .divider-announce").show();
                }

                if (wipeIsChecked) {
                    $el.find(".wipe.feature, .divider-wipe").show();
                }

                switch(state) {
                    case BaseWorkflow.STATE.INITIALIZING:
                        $el.find(".countdown_text, .waiting").removeClass("hidden");
                        $el.find(".countdowndivider").hide();
                        $el.find(".success, .fail").addClass("hidden");
                        break;

                    case SecurePhoneWorkflow.STATE.CONNECTING:
                        $el.find(".status.alarm").addClass("hidden");
                        $el.find(".status.alarm.success").removeClass("hidden");
                        break;

                    case SecurePhoneWorkflow.STATE.ANNOUNCE_DISPLAYED:
                        $el.find(".status.announce").addClass("hidden");
                        $el.find(".status.announce.success").removeClass("hidden");
                        break;

                    case SecurePhoneWorkflow.STATE.CONTACTS_ERASED:
                        $el.find(".status.wipe").addClass("hidden");
                        $el.find(".status.wipe.success").removeClass("hidden");
                        $el.find(".status.wipe.success .contact_count").html(contactsErased);
                        break;

                    case SecurePhoneWorkflow.STATE.REFINING:
                        $el.find(".status.locate").addClass("hidden");
                        $el.find(".status.locate.success").removeClass("hidden");
                        break;

                    case SecurePhoneWorkflow.STATE.RETRYING:
                        $el.find(".title .securephone_retry").removeClass("hidden");

                        $(".securephone_retry_current").html(retryInfo.retryAttempt);
                        $(".securephone_retry_total").html(retryInfo.retryTotal);
                        break;

                    case BaseWorkflow.RESULT.SUCCESSFUL:
                        $el.find(".title .securephone_retry," +
                                ".countdown_text," +
                                ".description," +
                                ".status.locate," +
                                ".status.announce," +
                                ".status.wipe").addClass("hidden");

                        $el.find(".securephone_toolset_countdown").html("");
                        $el.find(".countdowndivider").show();
                        $el.find(".description.success").removeClass("hidden");

                        var actionResult = !locateSuccess ? "fail" : "success";
                        $el.find(".status.locate." + actionResult).removeClass("hidden");

                        actionResult = this._performAnnounce && !announceSuccess ? "fail" : "success";
                        $el.find(".status.announce." + actionResult).removeClass("hidden");

                        actionResult = this._performErase && !wipeSuccess ? "fail" : "success";
                        $el.find(".status.wipe." + actionResult).removeClass("hidden");

                        AMA.page.content.locationTab.locationMap.render();

                        break;

                    case BaseWorkflow.RESULT.FAILED:
                        $el.find(".title .securephone_retry," +
                                ".countdown_text," +
                                ".description," +
                                ".status").addClass("hidden");

                        $el.find(".description.fail, .status.fail").removeClass("hidden");

                        $el.find(".securephone_toolset_countdown").html("");
                        $el.find(".countdowndivider").show();

                        AMA.page.content.locationTab.locationMap.render();

                        break;

                    default:
                }
            }
        },

        /**
         * Toggles the announce option elements and displays the char count of the message textarea.
         *
         */
        _toggleAnnounceTextarea: function () {
            var $announceMessage = this.$el.find("#securephone_announce_message");
            var $announceElements = this.$el.find(".announce_edit," +
                                                "#securephone_announce_message," +
                                                ".charcounttext");

            if (this.$el.find("#securephone_announce").prop("checked")) {
                var email = AMA.models.dashboardData.models[0].attributes.emailAddress;
                var defaultAnnouncement = "";

                if (AMA.models.dashboardData && !email) {
                    var announceMsg = $announceMessage.html();

                    defaultAnnouncement = $announceMessage.html() + " " + email + ".";
                    $announceMessage.val(defaultAnnouncement);
                }

                $announceElements.removeClass("hidden");
                $announceMessage.prop("disabled", null);
                this.$el.find("#securephone_announce_charcount").html(this._countAnnounceTextareaChars());
            } else {
                $announceElements.addClass("hidden");
                $announceMessage.prop("disabled", true);
                $announceMessage.html($("#securephone_announce_default_message").html());
            }
        },

        /**
         * Returns the number of characters inside the announce message textarea
         *
         */
        _countAnnounceTextareaChars: function () {
            return this.$el.find("#securephone_announce_message").val().length;
        }
    });
})();