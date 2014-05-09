/*! HelpSideNavView */
define([
    "jquery",
    "underscore",
    "backbone",
    "text!tpl/help/help_side_nav.html"
], function($, _, Backbone, Template) {

    var View = Backbone.View.extend({

        el: '#help_sideNav',

        template: _.template(Template),

        render: function() {
            var self = this;
                
            this.$el.html(this.template);

            return this;
        }

    });

    return View;

});
