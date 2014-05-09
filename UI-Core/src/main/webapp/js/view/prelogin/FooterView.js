/*! FooterView */
define([
    "jquery",
    "underscore",
    "backbone",
    "text!tpl/prelogin/footer.html"
], function($, _, Backbone, Template) {

    var View = Backbone.View.extend({

        el: '#footer_container',

        template: _.template(Template),

        render: function() {
            var self = this;
                
            this.$el.html(this.template);

            return this;
        }

    });

    return View;

});
