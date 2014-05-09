/*! PasswordFailedNoEmailView */
define([
    "jquery",
    "underscore",
    "backbone",
    "text!tpl/prelogin/password_failed_no_email.html"
], function($, _, Backbone, Template) {

    var View = Backbone.View.extend({

        el: '#body_container',

        template: _.template(Template),

        initialize: function() {
            $('#sideNav_privacy_policy').siblings().removeAttr('class');
        },

        render: function() {
            var self = this;
                
            this.$el.html(this.template);

            return this;
        }

    });

    return View;

});
