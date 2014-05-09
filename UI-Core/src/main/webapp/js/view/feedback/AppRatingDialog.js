/*! AppRatingDialog */
(function () {
    AMA.namespace("view");

    var AppRatingDialog = AMA.view.AppRatingDialog = AMA.view.Dialog.extend();

    AppRatingDialog.TEMPLATE_ID = "app_rating_dialog_template";
    AppRatingDialog.TEMPLATE_SRC = "";

    AppRatingDialog.COOKIE_EXPIRY = 3650;
    AppRatingDialog.SESSION_ID = AMA.Util.guid();


    _.extend(AppRatingDialog.prototype, {
        events: {
            "click .close": "hideSurvey",
            "click #app_rating_dialog_rate_later": "remindMeLater",
            "click #app_rating_dialog_rate_never": "ratingNoThanks",
            "click #app_rating_dialog_rate_now" : "rateApp"
        },

        hideSurvey: function () {
            var eventMsg = {
                surveyId: this._surveyId,
                webUserExperienceSurveySessionId: AppRatingDialog.SESSION_ID,
                sessionId: AMA.config.sessionId,
                endpointId: AMA.config.endpointId,
                action: "close",
                timeStamp: new Date().getTime().toString()
            };

            AMA.ReportingManager.reportEvent(AMA.config.reportingEventTypes.webAppRatingCancel, eventMsg);

            this.hide();
        },

        remindMeLater: function () {
            var eventMsg = {
                surveyId: this._surveyId,
                webUserExperienceSurveySessionId: AppRatingDialog.SESSION_ID,
                sessionId: AMA.config.sessionId,
                endpointId: AMA.config.endpointId,
                action: "later",
                timeStamp: new Date().getTime().toString()
            };

            AMA.ReportingManager.reportEvent(AMA.config.reportingEventTypes.webAppRatingCancel, eventMsg);

            this.hide();
        },

        ratingNoThanks: function () {
            var eventMsg = {
                surveyId: this._surveyId,
                webUserExperienceSurveySessionId: AppRatingDialog.SESSION_ID,
                sessionId: AMA.config.sessionId,
                endpointId: AMA.config.endpointId,
                action: "never",
                timeStamp: new Date().getTime().toString()
            };

            AMA.ReportingManager.reportEvent(AMA.config.reportingEventTypes.webAppRatingCancel, eventMsg);

            //Set the Dismiss Survey flag as true
            if(this._surveyId == 10 || this._surveyId == 11){
                AMA.Util.setCookie("dismissSurvey", true, AppRatingDialog.COOKIE_EXPIRY);
            }

            this.hide();
        },

        rateApp: function () {
            //Set the Dismiss Survey flag as true
            if(this._surveyId == 10 || this._surveyId == 11){
                AMA.Util.setCookie("dismissSurvey", true, AppRatingDialog.COOKIE_EXPIRY);
            }

            var eventMsg = {
                surveyId: this._surveyId,
                webUserExperienceSurveySessionId: AppRatingDialog.SESSION_ID,
                sessionId: AMA.config.sessionId,
                endpointId: AMA.config.endpointId,
                timeStamp: new Date().getTime().toString()
            };

            AMA.ReportingManager.reportEvent(AMA.config.reportingEventTypes.webAppRatingGo, eventMsg);

            window.open(this._appRatingUrl,'_blank');
            this.hide();
        },

        show: function (surveyId, appRatingUrl) {
            this._surveyId = surveyId;
            this._appRatingUrl = appRatingUrl;

            var eventMsg = {
                surveyId: this._surveyId,
                webUserExperienceSurveySessionId: AppRatingDialog.SESSION_ID,
                sessionId: AMA.config.sessionId,
                endpointId: AMA.config.endpointId,
                timeStamp: new Date().getTime().toString()
            };

            AMA.ReportingManager.reportEvent(AMA.config.reportingEventTypes.webAppRatingPrompt, eventMsg);

            AppRatingDialog.__super__.show.apply(this, arguments);
        }
    });
})();