/*! PrivacyView */
define([
    "jquery",
    "underscore",
    "backbone",
    "text!tpl/prelogin/privacy.html"
], function($, _, Backbone, Template) {

    var View = Backbone.View.extend({

        el: '#body_container',

        template: _.template(Template),

        initialize: function() {
            $('#sideNav_privacy_policy').siblings().removeAttr('class');
        },

        render: function() {
            var self = this;
                
            this.$el.html(this.template);

            //set current highlighted item/element
            $('#sideNav_privacy_policy').addClass('selected');

            return this;
        },
        
        events: {
            "click #termstext": "hideLogin"
        },
        
        hideLogin: function(ev){
        	alert('hiding login');
        	clink.indexOf("home") == -1 ? $el.find("#LoginForm").addClass("hidden-md hidden-sm hidden-lg") : $el.find("#LoginForm").removeClass("hidden-md hidden-sm hidden-lg");    	        	
        }

    });

    return View;

});

