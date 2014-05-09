/*! IndexView */
define([
    "jquery",
    "underscore",
    "backbone",
    "text!tpl/prelogin/index.html",
    "jquery-ui"
], function($, _, Backbone, Template) {

    var View = Backbone.View.extend({

        el: "#body_container",

        template: _.template(Template),

        initialize: function() {
            $('#index_li').siblings().removeAttr('class');
        },

        render: function() {
            var thisView = this;

            this.$el.html(this.template);

            //set current highlighted item/element
            $('#index_li').addClass('selected');
            return this;
        }
    });

    return View;

});
