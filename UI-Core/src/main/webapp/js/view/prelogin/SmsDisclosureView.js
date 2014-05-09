/*! SmsDisclosureView */
define([
    "jquery",
    "underscore",
    "backbone",
    "text!tpl/prelogin/sms_disclosure.html"
], function($, _, Backbone, Template) {

    var View = Backbone.View.extend({

        el: '#body_container',

        template: _.template(Template),

        initialize: function() {
            $('#sideNav_sms_msg_disclosure').siblings().removeAttr('class');
        },

        render: function() {
            var self = this;
                
            this.$el.html(this.template);

            //set current highlighted item/element
            $('#sideNav_sms_msg_disclosure').addClass('selected');

            return this;
        }

    });

    return View;

});
