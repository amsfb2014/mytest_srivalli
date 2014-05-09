/* ShareFeedbackWizard */
(function () {
    AMA.namespace("view");

    var ShareFeedbackWizard  = AMA.view.ShareFeedbackWizard  = AMA.view.Wizard.extend();

    ShareFeedbackWizard.TEMPLATE_ID = "share_feedback_dialog_template";
    ShareFeedbackWizard.TEMPLATE_SRC = "";

    ShareFeedbackWizard.ENDPOINT = "userRatings";


    AMA.augment(ShareFeedbackWizard.prototype, {
        events : {
            "click .fb_radio_submit_btn": "_validateFeedback",
            "click .fb_text_submit_btn": "_validateReason",
            "click .close": "_reset",
            "click .wizard_close": "_reset"
        },

        _validateFeedback : function() {
            var validationError = this.$el.find("#feedback_validation_error"),
                checkedRating = this.$el.find("input[name='fb_rate']:checked");

            validationError.addClass("hide");

            if (checkedRating.length > 0) {
                // Get the rating
                this._rating = checkedRating.val();
            }
            else {
                // No rating selected; show error message
                validationError.removeClass("hide");
                validationError.addClass("show");
                return;
            }

            if (this._rating) {
                this.$el.find(".wiz_step").removeClass("current");
                this.$el.find(".step2.wiz_step").addClass("current");
            }
        },

        _validateReason : function() {
            var validationError = this.$el.find("#feedback_reason_error"),
                feedbackReasonValue = $.trim(this.$el.find("textarea[name='fb_reason']").val());
            
            validationError.addClass("hide");

            if (feedbackReasonValue.length > 0) {
                // Get the feedback reason
                this._ratingReason = feedbackReasonValue;
            }
            else {
                // No feedback reason provided; show error message
                validationError.removeClass("hide");
                validationError.addClass("show");
                return;
            }

            if (this._ratingReason) {
                this.hide();

                // Show loading dialog
                var msg = $("#msg_loadingdialog").html();
                AMA.page.standardDialogs.loading(msg);

                this._sendFeedback();
            }
        },

        _sendFeedback : function() {
            // Validate Share Feedback capability
            if (!AMA.models.capabilities.canCreate("sendFeedbackRate")) {
                AMA.error("User has no capability to send Share Feedback data");
                // Close the dialog
                this._reset();
                return;
            }

            var url = AMA.config.apiHostUrl + "/" + ShareFeedbackWizard.ENDPOINT + "?" +
                        $.param({
                            devId: AMA.config.devId,
                            endpointId: AMA.config.endpointId,
                            authToken: AMA.config.authToken
                        }),
                data = {
                    name: AMA.models.dashboardData.models[0].get("emailAddress"),
                    phoneNumber: AMA.models.dashboardData.models[0].get("phoneNumber"),
                    platformName: AMA.models.endpoints.models[0].get("platformfriendlyname"),
                    platformId: AMA.models.endpoints.models[0].get("platform"),
                    rate:this._rating,
                    reason: this._ratingReason
                },
                request = AMA.Util.createCORSRequest("POST", url),
                o = this;

            if (request) {
                request.onload = function () {
                    o._callbackForFeedback();
                };
                request.onerror = function (jqXHR, error, errorThrown) {
                    AMA.ActionManager._onAjaxError(jqXHR, error, errorThrown);
                };

                request.send(JSON.stringify(data));
            }
        },
        
        _callbackForFeedback : function() {
            this.$el.find(".wiz_step").removeClass("current");
            this.$el.find(".step3.wiz_step").addClass("current");

            AMA.page.standardDialogs.hideloading();
            this.show();
        },

        _reset : function() {
            // Empty form fields
            this.$el.find("textarea[name='fb_reason']").val("");
            this.$el.find("input[name='fb_rate']").prop('checked', false);
            this.$el.find("label.btn").removeClass("active");

            // Reset wizard back to step 1
            this.$el.find(".wiz_step").removeClass("current");
            this.$el.find(".step1.wiz_step").addClass("current");

            // Hide all validation errors
            this.$el.find("#feedback_validation_error").removeClass("show").addClass("hide");
            this.$el.find("#feedback_reason_error").removeClass("show").addClass("hide");

            // Hide the dialog
            this.hide();
        }
    });
})();