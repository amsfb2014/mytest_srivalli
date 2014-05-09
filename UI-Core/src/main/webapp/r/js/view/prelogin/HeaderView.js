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
            this.$el.find("#index_tab, #index_modal_tab").addClass("selected");
            this.$el.find("#menu-tab-sm-btn>.selected").html("Home");

            return this;
        },

        events: {
            "submit #loginform": "btnSignup",
            "click #index_tab, #learnmore_tab, #faqs_tab, #download_tab, #claim_tab, #index_modal_tab, #faqs_modal_tab, #download_modal_tab, #learnmore_modal_tab, #claim_modal_tab": "togglePreloginMenu"
        },
        btnSignup: function(e) {
        	e.preventDefault();
        	this.$el.find("#btnSignup").val("Submitting...");
        	return validateLogin(document.login);
        },
        togglePreloginMenu: function(ev) {
        	hashTag = $(ev.currentTarget).attr("tag");
        	ref = $(ev.currentTarget).attr("ref");
        	t = $(ev.currentTarget).attr("id");
        	(ref != "")? location.href=location.pathname + "#" + hashTag : window.open(hashTag,'_fileclaim');
        	this.$el.find("#menu-tab-sm-btn>.selected").html(this.$el.find("#"+ref+"_modal_tab").html());
        	this.$el.find("#"+ref+"_tab, #"+ref+"_modal_tab").addClass("selected").siblings().removeClass("selected");
        	       	       		
        }
    });

    return View;

});
