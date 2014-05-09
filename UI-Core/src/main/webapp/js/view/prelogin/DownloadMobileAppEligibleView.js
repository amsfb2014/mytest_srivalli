/*! DownloadMobileAppEligibleView */
define([
    "jquery",
    "underscore",
    "backbone",
    "text!tpl/prelogin/download_mobile_app_eligible.html"
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
            //set current highlighted item/element
            $('#sideNav_privacy_policy').addClass('selected');

            return this;
        }

    });

    return View;

});
