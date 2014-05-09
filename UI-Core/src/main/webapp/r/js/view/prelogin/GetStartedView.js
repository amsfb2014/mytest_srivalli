/*! GetStartedView */
define([
    "jquery",
    "underscore",
    "backbone",
    "text!tpl/prelogin/get_started.html"
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
            $('#get_started_li').addClass('selected');

            return this;
        }

    });

    return View;

});
