/*! accountStatusToolset */
(function () {

    AMA.namespace("view");

    var AccountStatusToolset = AMA.view.AccountStatusToolset = AMA.view.BaseView.extend();

    AccountStatusToolset.TEMPLATE_ID = "account_status_toolset_template";
    AccountStatusToolset.TEMPLATE_SRC = "";

    AccountStatusToolset.CHECKS = [
        "redx",
        "greentick"
    ];

    AccountStatusToolset.LOCKS = [
        "unlocked",
        "locked"
    ];

    AccountStatusToolset.ENABLED = [
        "Disabled",
        "Enabled"
    ];


    _.extend(AccountStatusToolset.prototype, {

        initialize: function () {
            AccountStatusToolset.__super__.initialize.apply(this, arguments);
        },


        _processData: function(item) {
            item.is_lock_enabled = AccountStatusToolset.ENABLED[item.current_lockstatus];
            item.is_locaction_enabled = AccountStatusToolset.ENABLED[item.locationcheck_on];
            item.is_admin_enabled = AccountStatusToolset.ENABLED[item.android_device_admin];

            item.android_device_admin = AccountStatusToolset.CHECKS[item.android_device_admin];
            item.locationcheck_on = AccountStatusToolset.CHECKS[item.locationcheck_on];

            item.current_lockstatus = AccountStatusToolset.LOCKS[item.current_lockstatus];
            return item;
        },


        render: function () {
            AccountStatusToolset.__super__.render.apply(this);

        },


        _afterRender: function() {
            if(AMA.models.endpoints.models[0].get("platform").indexOf("iOS") > -1) {
                this.$el.find(".android_device_admin").hide();
                this.$el.find(".current_lockstatus").hide();
                this.$el.find(".account_active").show();
                // Hide "Location Checks" from the toolset when iPhone app version has no 
                // read capability for location settings
                if(!AMA.models.capabilities.canRead("eventSettings")) {
                	this.$el.find(".locationcheck_on").hide();
                }
            } else {
                this.$el.find(".account_active").hide();
            }
        }
    });


})();

