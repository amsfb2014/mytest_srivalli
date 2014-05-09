/* Feedback */
(function () {
    AMA.namespace("view");

    var Feedback = AMA.view.Feedback = AMA.view.BaseView.extend();

    Feedback.TEMPLATE_ID = "feedback_template";
    Feedback.TEMPLATE_SRC = "";


    AMA.augment(Feedback.prototype, {
        render: function () {
            Feedback.__super__.render.apply(this);

            this.appRatingDialog = new AMA.view.AppRatingDialog({
                el: "#app_rating_dialog",
                parent: this,
                showTitle: false,
                showClose: false,
                showOk: false,
                showCancel: false,
                width: 370
            });

            this.shareFeedbackWizard = new AMA.view.ShareFeedbackWizard({
                el: "#share_feedback_dialog",
                parent: this,
                showTitle: false,
                showClose: false,
                showOk: false,
                showCancel: false,
                width: 760,
                height: 380
            });

            this.surveyDialog = new AMA.view.SurveyDialog({
                el: "#survey_dialog",
                parent: this,
                showTitle: false,
                showClose: false,
                showOk: false,
                showCancel: false,
                width: 650
            });
        },

        show: function () {},

        openAppRating: function (surveyId, appRatingUrl) {
            if (!this.appRatingDialog.isRendered) {
                var o = this;
                this.appRatingDialog.on(AMA.view.BaseView.EVENT.RENDERED, function () {
                    o.appRatingDialog.show(surveyId, appRatingUrl);
                });
                return;
            }

            // Show the App Rating dialog
            this.appRatingDialog.show(surveyId, appRatingUrl);
        },

        openSurvey: function (surveyType) {
            if (!this.surveyDialog.isRendered) {
                var o = this;
                this.surveyDialog.on(AMA.view.BaseView.EVENT.RENDERED, function () {
                    o.surveyDialog.show(surveyType);
                });
                return;
            }

            // Show the Survey dialog
            this.surveyDialog.show(surveyType);
        },

        openShareFeedback: function () {
            if (!this.shareFeedbackWizard.isRendered) {
                var o = this;
                this.shareFeedbackWizard.on(AMA.view.BaseView.EVENT.RENDERED, function () {
                    o.shareFeedbackWizard.show();
                });
                return;
            }

            // Show the Share Feedback dialog
            this.shareFeedbackWizard.show();
        }
    });
})();