/*! FooterView */
define([
    "jquery",
    "underscore",
    "backbone",
    "text!tpl/prelogin/footer.html"
], function($, _, Backbone, Template) {

    var View = Backbone.View.extend({

        el: '#footer_containerarea',

        template: _.template(Template),

        render: function() {
            var self = this;
                
            this.$el.html(this.template);
            return this;
        },        
        events: {
            "click #termstext, #privacytext, #contacttext": "hideLogin"
        },
        hideLogin: function(ev){
        	$( "#LoginForm" ).addClass("hidden-md hidden-sm hidden-lg");
        	$('#logincontainer').each(function(index) {
				$(this).children().each (function() { 
					var olink = $(this).attr("id");
					$("#"+olink).removeClass("preloginLinksSelected");
				})
        	});
        }          

    });

    return View;

});
