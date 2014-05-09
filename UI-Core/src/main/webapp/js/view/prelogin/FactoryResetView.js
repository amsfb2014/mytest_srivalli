/*! GetStartedView */
define([
    "jquery",
    "underscore",
    "backbone",
    "text!tpl/prelogin/factory_reset.html"
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
            $('#factory_reset_li').addClass('selected');
            $('#login_header').addClass('hide');
            $('#factory_reset_header').removeClass('hide');

            return this;
        }

    });

    return View;

});
