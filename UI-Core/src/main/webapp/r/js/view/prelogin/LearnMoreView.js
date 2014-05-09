/*! LearnMoreView */
define([
    "jquery",
    "underscore",
    "backbone",
    "text!tpl/prelogin/learn_more.html"
], function($, _, Backbone, Template) {

    var View = Backbone.View.extend({

        el: '#body_container',

        template: _.template(Template),

        initialize: function() {
            $('#sideNav_about_menu').siblings().removeAttr('class');
            $('#learnmore_li').siblings().removeAttr('class');
        },

        render: function() {
            var self = this;
                
            this.$el.html(this.template);

            //set current highlighted item/element
            $('#sideNav_about_menu').addClass('selected');
            $('#learnmore_li').addClass('selected');

            return this;
        }

    });

    return View;

});
