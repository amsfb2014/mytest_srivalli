/*! HelpIndexView */
define([
    "jquery",
    "underscore",
    "backbone",
    "text!tpl/help/help_index.html"
], function($, _, Backbone, Template) {

    var View = Backbone.View.extend({

        el: '#body_container',

        template: _.template(Template),

        render: function() {
            var self = this;
                
            this.$el.html(this.template);

            return this;
        }

    });

    return View;

});
