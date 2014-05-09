/*! TermsView */
define([
    "jquery",
    "underscore",
    "backbone",
    "text!tpl/prelogin/terms.html"
], function($, _, Backbone, Template) {

    var View = Backbone.View.extend({

        el: '#body_container',

        template: _.template(Template),

        initialize: function() {
            $('#sideNav_terms_and_conditions').siblings().removeAttr('class');
        },

        render: function() {
            var self = this;
                
            this.$el.html(this.template);

            //set current highlighted item/element
            $('#sideNav_terms_and_conditions').addClass('selected');

            return this;
        }

    });

    return View;

});

