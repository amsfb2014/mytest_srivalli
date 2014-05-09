/*! SurveyDialog */
(function () {
    AMA.namespace("view");

    var SurveyDialog = AMA.view.SurveyDialog = AMA.view.Dialog.extend();

    SurveyDialog.TEMPLATE_ID = "survey_dialog_template";
    SurveyDialog.TEMPLATE_SRC = "";

    SurveyDialog.ENDPOINT = "surveyQuestions";
    SurveyDialog.COOKIE_EXPIRY = 3650; // in days, for AMA.Util.setCookie
    SurveyDialog.SESSION_ID = AMA.Util.guid();
    SurveyDialog.SYNC_EVENT_TYPES = [
        "sync-manual-success",
        "auto-sync-opt-out"
    ];


    _.extend(SurveyDialog.prototype, {
        events: {
            "click #survey_close " : "hideSurvey",
            "click #close" : "hideSurvey",
            "click .submit" : "_submit",
            "click .cancel" : "_cancel",
            "keyup #survey_text_textarea" : "_checkCommentLength",
            "click #survey_stars .ratingdiv span" : "_setRatingValue"
        },

        /** 
         * Opens the Survey dialog
         *
         * @param {String} surveyType: Determines type of survey dialog to be displayed
         * 
         */
        show: function (surveyType) {
            // Validation to check if a survey type is specified
            if (!surveyType) {
                AMA.error("Survey: No survey type specified. Operation will be aborted.");
                return;
            } else {
                this._surveyType = surveyType;
                AMA.debug("Survey: Showing survey dialog of type: "+  this._surveyType);

                $("#survey_step1").show();
                $("#survey_step2").hide();
                this._fetchSurveyData();
            }
        },

        // Retrieve survey details from server
        _fetchSurveyData: function () {
            // Validate capability to read survey questions
            if (!AMA.models.capabilities.canRead("surveyQuestions")) {
                AMA.error("Survey: Account has no capability to retrieve survey questions");
                return;
            }

            var url = AMA.config.apiHostUrl + "/" + SurveyDialog.ENDPOINT + "?" +
                        $.param({
                            devId: AMA.config.devId,
                            endpointId: AMA.config.endpointId,
                            authToken: AMA.config.authToken,
                            surveyEvent: this._surveyType
                        }),
                request = AMA.Util.createCORSRequest("GET", url),
                o = this;

            if (request) {
                request.onload = function () {
                    try {
                        var response = JSON.parse(this.responseText);
                    }
                    catch (e) {
                        AMA.error("GET /" + SurveyDialog.ENDPOINT + " - Survey Dialog - response not JSON: " + this.responseText);
                    }

                    if (response) {
                        o._init(response);
                    }
                };
                request.onerror = function (jqXHR, error, errorThrown) {
                    AMA.ActionManager._onAjaxError(jqXHR, error, errorThrown);
                };

                AMA.debug("Survey: Fetching survey of type: " + this._surveyType);
                request.send();
            }
        },

        _init: function (response) {
            if (this._surveyType != response.event) {
                AMA.error("Survey: Response is not the expected for type " + this._surveyType);
                return;
            }
            else {
                if ($.inArray(this._surveyType, SurveyDialog.SYNC_EVENT_TYPES) >= 0) {
                    // Proceed to build survey dialog if sync event type
                    this._promptSurvey(response);
                } else {
                    var suffix = this._surveyType === "location-success" ? "Locate" : "HealthScan",
                        firstTriggerName = "firstTrigger" + suffix,
                        counterName = "counterOfSuccessful" + suffix,
                        isExisting = this._isCookieExisting("firstTrigger" + suffix),
                        firstTriggerCookie = response.triggerConditionFirst,
                        counterCookie = 1,
                        repetitions = response.triggerConditionValue,
                        expectedCount = parseInt(AMA.Util.getCookie(counterName));

                    if (isExisting) {
                        AMA.debug("Survey: Updating cookies for survey type: " + this._surveyType);
                        firstTriggerCookie = parseInt(AMA.Util.getCookie(firstTriggerName));
                        counterCookie = parseInt(AMA.Util.getCookie(counterName)) + 1;
                    } else {
                        AMA.debug("Survey: Creating new cookies for survey type: " + this._surveyType);
                        AMA.Util.setCookie(firstTriggerName, firstTriggerCookie, SurveyDialog.COOKIE_EXPIRY);
                    }

                    // Update the counter cookie
                    AMA.Util.setCookie(counterName, counterCookie, SurveyDialog.COOKIE_EXPIRY);

                    if (!firstTriggerCookie && !repetitions) {
                        if (expectedCount > firstTriggerCookie) {
                            firstTriggerCookie = parseInt(AMA.Util.getCookie(firstTriggerName)) + repetitions;
                            AMA.Util.setCookie(firstTriggerName, firstTriggerCookie, SurveyDialog.COOKIE_EXPIRY);
                        }
                    }

                    if (counterCookie === firstTriggerCookie) {
                        AMA.debug("Survey: Validated trigger values. Launching the survey.");
                        this._promptSurvey(response);
                    } else {
                        return false;
                    }
                }
            }
        },

        _promptSurvey: function (response) {
            var appRatingSurvey = false,
                dismissSurvey = false,
                eventMsg = {};

            // Build survey only on a valid response
            if (response && !response.failures && response.id) {
                AMA.debug("Survey: Building survey id=" + response.id);

                this._surveyId = response.id;
                this._questionList = response.questions;
                this._rating = null;

                $("#survey_stars").hide();
                $("#survey_text").hide();
                for (var key in this._questionList) {
                    switch(this._questionList[key].type) {
                        case "stars" :
                            this.$el.find("#survey_stars_rating1").removeClass("starratingselected").addClass("starrating");
                            this.$el.find("#survey_stars_rating2").removeClass("starratingselected").addClass("starrating");
                            this.$el.find("#survey_stars_rating3").removeClass("starratingselected").addClass("starrating");
                            this.$el.find("#survey_stars_rating4").removeClass("starratingselected").addClass("starrating");
                            this.$el.find("#survey_stars_rating5").removeClass("starratingselected").addClass("starrating");
                            $("#survey_stars").show();
                            $("#survey_stars .survey_error").hide();
                            this.$el.find("#survey_stars .surveyquestion").html(this._questionList[key].label);
                            break;
                        case "text" :
                            $("#survey_text").show();
                            $("#survey_text .survey_error").hide();
                            this._textQuestionMinLength = this._questionList[key].minLength || 1024;
                            this._textQuestionMaxLength = this._questionList[key].maxLength || 1024;
                            this.$el.find("#survey_text .surveyquestion").html(this._questionList[key].label);
                            break;
                        case "appRating" :
                            appRatingSurvey = true;
                            this._appRatingUrl = this._questionList[key].label;
                            break;
                        default:
                    }
                }

                if (this._getDismissSurvey("dismissSurvey") == "true") {
                    dismissSurvey = true;
                }

                if (appRatingSurvey && !dismissSurvey) {
                    this.parent.openAppRating(this._surveyId, this._appRatingUrl);
                }
                else {
                    AMA.debug("Survey: Popup ready");
                    eventMsg = {
                        surveyId : this._surveyId,
                        sessionId : AMA.config.sessionId,
                        endpointId : AMA.config.endpointId,
                        webUserExperienceSurveySessionId : SurveyDialog.SESSION_ID,
                        timestamp : new Date().getTime().toString()
                    };
                    
                    AMA.debug("Survey-Reporting: Survey prompt to user, logging the reporting event." );
                    AMA.ReportingManager.reportEvent(AMA.config.reportingEventTypes.webuserexperiencesurveyprompt, eventMsg);
                }
            }

            if (!appRatingSurvey) {
                SurveyDialog.__super__.show.apply(this, arguments); 
            }
        },

        _getDismissSurvey: function(key) {
            var cookies = document.cookie.split("; ");

            for(var i = 0; i < cookies.length; i++) {
                var item = cookies[i].split("=");
                if(item[0] === key) {
                    return item[1];
                }
            }

            return null;
        },

        // Set the star rating selected by the user
        _setRatingValue: function (event) {
            var source = event.target || event.srcElement,
                rating = source.id.split("survey_stars_rating")[1];

            this._rating = rating;
            this.$el.find("#survey_stars .starratingselected").removeClass("starratingselected").addClass("starrating");
            switch (rating) {
                case "5" : this.$el.find("#survey_stars_rating5").removeClass("starrating").addClass("starratingselected");
                case "4" : this.$el.find("#survey_stars_rating4").removeClass("starrating").addClass("starratingselected");
                case "3" : this.$el.find("#survey_stars_rating3").removeClass("starrating").addClass("starratingselected");
                case "2" : this.$el.find("#survey_stars_rating2").removeClass("starrating").addClass("starratingselected");
                case "1" : this.$el.find("#survey_stars_rating1").removeClass("starrating").addClass("starratingselected");
                default :
            }
        },

        hideSurvey: function () {
            if (!this._isSubmitted) {
                var eventMsg ={
                    surveyId: this._surveyId,
                    sessionId: AMA.config.sessionId,
                    endpointId: AMA.config.endpointId,
                    webUserExperienceSurveySessionId : SurveyDialog.SESSION_ID,
                    timestamp: new Date().getTime().toString()
                };

                AMA.debug("Survey-Reporting:  User canceled Survey, logging the reporting event." +  this._surveyType );
                AMA.ReportingManager.reportEvent(AMA.config.reportingEventTypes.webuserexperiencesurveycancel, eventMsg);
            }

            this._isSubmitted = false;
            this.hide();
        },

        // Handler when "No Thanks" button is clicked
        _cancel: function () {
            // Set the Dismiss Survey Flag as true
            if (this._surveyId == 10 || this._surveyId == 11) {
                AMA.Util.Cookie("dismissSurvey", true, SurveyDialog.COOKIE_EXPIRY);
            }

            // if the user cancels the survey Log that too in fourspeed reporting table.
            this.hideSurvey();
        },

        // Survey submission handler
        _submit: function () {
            // Validation to make sure there is a question list
            if (!this._questionList) {
                AMA.error("Survey: Cannot process submission as there is no question list");
                return;
            }

            var validationError = false,
                question = {},
                response = {},
                eventMsg = {},
                o = this;

            for (var key in this._questionList) {
                question = this._questionList[key];

                switch (question.type) {
                    case "stars":
                        if (question.required && !this._rating) {
                            AMA.error("Survey: Rating required but none provided");
                            validationError = true;
                            $("#survey_stars .survey_error").show();
                        }
                        else {
                            response[key] = this._rating;
                        }

                        break;

                    case "text":
                        // Get comments, if any
                        this._reason = $("#survey_text_textarea").val();

                        // Comment validation
                        if (question.required && this._reason.length == 0) {
                            AMA.error(" Survey: Comment required but none provided");
                            $("#survey_text .survey_error_no_comment").show();
                            validationError = true;
                        } else if (question.required && this._reason.length == 0) {
                            if (this._reason.length < parseInt(question.minLength)) {
                                AMA.error("Survey: Comment length is short of minimum required.");
                                $("#survey_text .survey_error_no_comment").show();
                                $("#survey_text .survey_error_min_length").show();
                                $("#survey_text .survey_text_min_chars").html(question.minLength);
                                $("#survey_text .survey_text_min_chars").show();
                            } else {
                                response[key] = this._reason;
                            }
                        } else {
                            response[key] = this._reason;
                        }

                        break;
                };
            }

            // Submit answers if validation successful
            if (!validationError) {
                AMA.debug("Survey: Response validation passed");
                
                //Set the Dismiss Survey flag as true for two types of surveys
                if (this._surveyId == 10 || this._surveyId == 11) {
                   AMA.Util.setCookie("dismissSurvey", true, SurveyDialog.COOKIE_EXPIRY);
                }

                if (AMA.models.capabilities.canCreate("reportEvents")) {
                    eventMsg = {
                        surveyId: this._surveyId,
                        mdn: AMA.models.endpoints.toJSON()[0].name,
                        webUserExperienceSurveySessionId : SurveyDialog.SESSION_ID,
                        responses: response,
                        timestamp: new Date().getTime().toString()
                    };

                    AMA.debug("Survey: Submitting survey responses");
                    AMA.ReportingManager.reportEvent(
                        AMA.config.reportingEventTypes.webuserexperiencesurveysubmit,
                        eventMsg,
                        o._confirmSubmission
                    );

                    this._isSubmitted = true;
                }
                else {
                    AMA.error("Survey: Account does not have permission to submit survey responses");
                    return;
                }
            }

            return false;
        },

        // If submit successful, show acknowledgement
        _confirmSubmission: function (success) {
            if (success) {
                $("#survey_step1").hide();
                $("#survey_step2").show();
            }
            else {
                this.hide();
            }
        },

        _isCookieExisting: function(key) {
            var cookie = document.cookie,
                isExisting = false,
                cookieContent = null;

            for (var i = 0; i < (cookie.length - key.length); i++) {
                cookieContent = cookie.substr(i, key.length);
                
                if(cookieContent === key) {
                    isExisting = true;
                    break;
                }
            }

            return isExisting;
        },

        // Limits comment length to the specified value
        _checkCommentLength: function () {
            var textarea = this.$el.find("#survey_text_textarea"),
                commentLength = textarea.val().length;

            if (commentLength > this._textQuestionMaxLength) {
                textarea.val(textarea.val().substr(this._textQuestionMinLength, this._textQuestionMaxLength));
            }
        }
    });
})();