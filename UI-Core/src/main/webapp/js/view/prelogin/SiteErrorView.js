/*! SiteErrorView */
define([
    "jquery",
    "underscore",
    "backbone",
    "text!tpl/prelogin/site_error.html"
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
            //set current highlighted item/element
            $('#index_li').addClass('selected');

            return this;
        }

    });

    return View;

});
