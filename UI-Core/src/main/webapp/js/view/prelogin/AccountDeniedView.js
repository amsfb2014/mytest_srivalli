/*! AccountDeniedView */
define([
    "jquery",
    "underscore",
    "backbone",
    "text!tpl/prelogin/account_denied.html"
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
