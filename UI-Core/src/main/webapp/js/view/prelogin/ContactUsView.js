/*! ContactUsView */
define([
    "jquery",
    "underscore",
    "backbone",
    "text!tpl/prelogin/contact_us.html"
], function($, _, Backbone, Template) {

    var View = Backbone.View.extend({

        el: '#body_container',

        template: _.template(Template),

        initialize: function() {
            $('#index_li').siblings().removeAttr('class');
        },

        render: function() {
            var self = this;
                
            this.$el.html(this.template);

            return this;
        }

    });

    return View;

});
