/*! HelpLockPhoneView */
define([
    "jquery",
    "underscore",
    "backbone",
    "text!tpl/help/help_lock_phone.html"
], function($, _, Backbone, Template) {

    var View = Backbone.View.extend({

        el: '#help_Body_Container',

        template: _.template(Template),

        initialize: function() {
            $('#sideNav_help_lockphone').siblings().removeClass('selected');
        },

        render: function() {
            var self = this;
                
            this.$el.html(this.template);

            //set current highlighted item/element
            $('#sideNav_help_lockphone').addClass('selected');

            return this;
        }

    });

    return View;

});
