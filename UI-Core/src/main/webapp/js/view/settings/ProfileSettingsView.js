/*! ProfilesettingsView */
(function () {
    AMA.namespace("view");

    var ProfileSettingsView = AMA.view.ProfileSettingsView = AMA.view.BaseView.extend();

    ProfileSettingsView.TEMPLATE_ID = "profile_settings_template";
    ProfileSettingsView.TEMPLATE_SRC = "";


    AMA.augment(ProfileSettingsView.prototype, {
        events: {
            "click .btnAccountInfoSave" : "updateAccountInfo",
            "click .btnChangePassword" : "updatePassword",
            "click .btnChangeSecurityInfo": "updateSecurityInfo",
            "change select[name='securityquestion']": "clearSecurityAnswer"
        },

        render: function () {
            ProfileSettingsView.__super__.render.apply(this, arguments);

            // Set the value of the security question drop down to the user's current security question
            $("select[name='securityquestion']").val(this.data.models[0].get("securityQuestion"));
        },

        _processData: function (item) {
            name = item.phoneNumber;
            email = item.emailAddress;
            securityAnswer = item.securityAnswer;
        },

        _afterRender: function () {
            ProfileSettingsView.__super__._afterRender.apply(this, arguments);

            this.parent.hideElements();
            this.parent.$el.find(".settings .connecting").hide();

            // in case we want future read-only Profile Settings feature similar to Sync Settings behavior on iPhone
            if( AMA.models.capabilities.canUpdate("accountSettings") ) {
                $("#account_info_submit").removeClass("hide");
                $("#password_submit").removeClass("hide");
                $("#securityQA_submit").removeClass("hide");
            } else {
                $("#account_info_submit").addClass("hide");
                $("#password_submit").addClass("hide");
                $("#securityQA_submit").addClass("hide");
            }
        },

        show: function () {
            ProfileSettingsView.__super__.show.apply(this, arguments);

            this.parent.$el.find("#settings_submit").hide();
        },

        // Validates entries in the "Account Info" section and sends request to update if validation successful
        updateAccountInfo: function() {
            var currentEmail = this.data.models[0].get("emailAddress"),
                newEmail = $.trim(this.$el.find("input[name='email']").get(0).value),
                validationSuccess = true,
                newAccountInfo = {},
                o = this,
                afterAjax = function (data) {
                    $("#account_info_submit .connecting").hide();

                    if (typeof data == "object" && data.error) {
                        AMA.Util.switchLabel(".validation_text", ".email_taken", o.$el);
                        //AMA.Util.switchLabel(".validation_text", ".email_update_error", o.$el);
                        return;
                    }

                    AMA.Util.switchLabel(".validation_text", ".email_changed", o.$el);
                    AMA.page.logout();
                };

            if (newEmail == "") {
                AMA.Util.switchLabel(".validation_text", ".email_empty", this.$el);
                validationSuccess = false;
            } else if (!AMA.Util.validateEmail(newEmail)) {
                AMA.Util.switchLabel(".validation_text", ".email_invalid", this.$el);
                validationSuccess = false;
            } else if (currentEmail === newEmail) {
                AMA.Util.switchLabel(".validation_text", ".email_unchanged", this.$el);
                validationSuccess = false;
            }

            if (!validationSuccess) {
                return;
            }

            $("#account_info_submit .connecting").show();

            newAccountInfo.email = newEmail;

            // Send request to update account information
            this.data.saveAccountInfo(newAccountInfo, afterAjax);
        },

        // Validates entries in the "Change Password" section and sends request to update if validation successful
        updatePassword: function() {
            var password = $.trim(this.$el.find("input[name='password']").get(0).value),
                newPIN = $.trim(this.$el.find("input[name='newPin']").get(0).value),
                confirmPIN = $.trim(this.$el.find("input[name='confirmPIN']").get(0).value),
                validationSuccess = true,
                messagesToShow = [],
                passwordCharRegex = /^\s*[a-zA-Z0-9,\s]+\s*$/;

            if (password === "") {
                messagesToShow.push(".current_password_empty");
                validationSuccess = false;
            } else if (!passwordCharRegex.test(password)) {
                messagesToShow.push(".current_password_has_special_chars");
                validationSuccess = false;
            }

            if (newPIN === "") {
                messagesToShow.push(".new_password_empty");
                validationSuccess = false;
            } else if (this.validatePassword(newPIN)) {
                messagesToShow.push(".new_password_length");
                validationSuccess = false;
            } else if (!passwordCharRegex.test(newPIN)) {
                messagesToShow.push(".new_password_has_special_chars");
                validationSuccess = false;
            }

            if (confirmPIN === "") {
                messagesToShow.push(".confirm_password_empty");
                validationSuccess = false;
            }

            if (confirmPIN !== newPIN) {
                messagesToShow.push(".confirm_password_mismatch");
                validationSuccess = false;
            }

            if (password !== "" && newPIN != "" && password === newPIN) {
                messagesToShow.push(".password_unchanged");
                validationSuccess = false;
            }

            // Prevent saving if there are validation errors
            if (!validationSuccess) {
                AMA.Util.switchLabel(".validation_text", messagesToShow, this.$el);
                return;
            }

            $("#password_submit .connecting").show();

            // Santizing the input data using xss validator
            password = xssClean(password);
            newPIN = xssClean(newPIN);
            confirmPIN = xssClean(confirmPIN);

            // Send request to encrypt the password
            this.encryptPassword(password, newPIN, confirmPIN);
        },

        /*
         * Ajax call to get the secret key and handle to encrypt the password
         */
        encryptPassword: function (password, newPIN, confirmPIN) {
            var o = this,
                callback = function (data) {
                    o._afterUpdatePassword(data);
                },
                afterAjax = function (data) {
                    if (!data) {
                        AMA.error("Expected response data is missing. Unable to perform password update");
                        return;
                    }

                    var secretKey =  data.secretKey,
                        secretHandle = data.handle,
                        ivr = data.initVector,
                        key = CryptoJS.enc.Hex.parse(secretKey),
                        iv = CryptoJS.enc.Hex.parse(ivr),
                        encPassword = CryptoJS.AES.encrypt(password, key, { iv: iv }).toString(),
                        encNewPIN = CryptoJS.AES.encrypt(newPIN, key, { iv: iv }).toString(),
                        encConfirmPIN = CryptoJS.AES.encrypt(confirmPIN, key, { iv: iv }).toString(),
                        returnObj = {
                            oldPassword: encPassword,
                            newPassword: encNewPIN,
                            confirmPassword: encConfirmPIN,
                            secretHandle: secretHandle
                        };

                    // Send request to update the password
                    o.data.saveNewPassword(returnObj, callback);
                },
                data = AMA.Util.getSecretPair(afterAjax);
        },

        _afterUpdatePassword: function (data) {
            $("#password_submit .connecting").hide();

            if (typeof data == "object" && data.error) {
                if (data.error === "Invalid Password") {
                    AMA.Util.switchLabel(".validation_text", ".password_invalid", this.$el);
                } else {
                    AMA.Util.switchLabel(".validation_text", ".password_update_error", this.$el);
                }
                return;
            }

            AMA.Util.switchLabel(".validation_text", ".password_changed", this.$el);
        },

        updateSecurityInfo: function () {
            var currentQuestion = this.data.models[0].get("securityQuestion"),
                currentAnswer = this.data.models[0].get("securityAnswer"),
                newQuestion = this.$el.find("select[name='securityquestion']").val(),
                newAnswer = $.trim(this.$el.find("input[name='securityanswer']").get(0).value),
                validationSuccess = true,
                newSecurityQA = {},
                o = this,
                afterInvalidate = function () {
                    AMA.Util.switchLabel(".validation_text", ".security_answer_changed", o.$el);
                },
                afterAjax = function (success, response) {
                    var options = {
                        callback: afterInvalidate
                    };

                    $("#securityQA_submit .connecting").hide();

                    if (response === AMA.config.accountDetails.accountId) {
                        //AMA.Util.switchLabel(".validation_text", ".security_answer_changed", o.$el);
                        AMA.models.dashboardData.invalidate(options);
                    } else {
                        AMA.Util.switchLabel(".validation_text", ".security_answer_update_error", o.$el);
                    }
                };

            if (newAnswer == "") {
                AMA.Util.switchLabel(".validation_text", ".security_answer_empty", this.$el);
                validationSuccess = false;
            } else if (currentQuestion === newQuestion && currentAnswer === newAnswer) {
                AMA.Util.switchLabel(".validation_text", ".security_answer_unchanged", this.$el);
                validationSuccess = false;
            } else if (!this.validateSecurityAnswer(newAnswer)) {
                AMA.Util.switchLabel(".validation_text", ".security_answer_invalid", this.$el);
                validationSuccess = false;
            }

            if (!validationSuccess) {
                return;
            }

            newSecurityQA.securityQuestion = newQuestion;
            newSecurityQA.securityAnswer = newAnswer;

            $("#securityQA_submit .connecting").show();

            // Send request to update security question and/or answer
            this.data.saveSecurityQA(newSecurityQA, afterAjax);
        },
        
        validateSecurityAnswer: function (data){
            return ((data.length === 4) && !(isNaN(data)));
        },

        validatePassword: function (data) {
            return (data.length < 6 || data.length > 15);
        },

        clearSecurityAnswer : function () {
            AMA.Util.switchLabel(".validation_text", "", this.$el);
            $('#profile_securityanswer').val('');
        }
    });
})();