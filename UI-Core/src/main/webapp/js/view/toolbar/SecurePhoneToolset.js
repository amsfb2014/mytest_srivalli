/*! SecurePhoneToolset */
(function () {
    AMA.namespace("view");

    var SecurePhoneToolset = AMA.view.SecurePhoneToolset = AMA.view.BaseView.extend();

    SecurePhoneToolset.TEMPLATE_ID = "securephone_toolset_template";
    SecurePhoneToolset.TEMPLATE_SRC = "";
    
    SecurePhoneToolset.CSS = {
        CONNECTING: "connecting",
        UNSUCCESSFUL: "unsuccessful",
        ANNOUNCING: "announcing",
        RETRYING: "retrying",
        NORMAL: "normal"
    };


    _.extend(SecurePhoneToolset.prototype, {
        events: {
            "click .button_securephone.normal": "_showStep1Dialog",
            "click .button_securephone.connecting, .button_securephone.announcing, .button_securephone.retrying": "_showStep2Dialog"
        },

        workflow: null,

        initialize: function () {
            SecurePhoneToolset.__super__.initialize.apply(this);

            this.workflow = new AMA.workflow.SecurePhoneWorkflow();
            AMA.ActionManager.define("secure", this.workflow);
        },

        start: function (options) {
            //this.workflow.doStart(options);
            AMA.ActionManager.start("secure", options);
        },

        /**
         * Changes button state of the toolset
         *
         * @param {String} action: Name of the button state to be displayed
         * 
         */
        toggleDisplay: function (action) {
            this.$el.find("." + action).show().siblings(".button_securephone").hide();
        },

        render: function () {
            SecurePhoneToolset.__super__.render.apply(this);

            // Create the Secure Phone dialog
            this.securePhoneDialog = new AMA.view.SecurePhoneDialog({
                el: "#securephonedialog",
                width: 670,
                parent: this,
                hidden: true,
                endpoint: AMA.models.endpoints
            });
        },

        _showStep1Dialog: function () {
            this.securePhoneDialog.show("step1");
        },

        _showStep2Dialog: function () {
            this.securePhoneDialog.show("step2");
        }
    });
})();