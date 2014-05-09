/*! HeaderView */
// require validateLogin
define([
    "jquery",
    "underscore",
    "backbone",
    "text!tpl/prelogin/header.html",
    "jquery-ui"
], function($, _, Backbone, Template) {

    var View = Backbone.View.extend({

        el: '#header_container',

        template: _.template(Template),

        render: function() {
            var self = this;
                
            this.$el.html(this.template);

            return this;
        },

        events: {
            "submit #loginform": "btnSignup"
        },

        btnSignup: function(e) {
        	e.preventDefault();
            return validateLogin(document.login);
        }

    });

    return View;

});
