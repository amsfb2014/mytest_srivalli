/*! LoginInvalidView */
define([
    "jquery",
    "underscore",
    "backbone",
    "text!tpl/prelogin/login_invalid.html",
    "jquery-ui"
], function($, _, Backbone, Template) {

    var View = Backbone.View.extend({

        el: '#header_container',

        template: _.template(Template),

        initialize: function() {
            $('#index_li').siblings().removeAttr('class');
            this.$el.find("#index_tab, #index_modal_tab").addClass("selected");
            this.$el.find("#menu-tab-sm-btn>.selected").html("Home");
        },

        render: function() {
            var self = this;
                
            this.$el.html(this.template);
            //set current highlighted item/element
            $('#index_li').addClass('selected');
            return this;
        },
        events: {
            "submit #loginform": "btnSignup",
            //"click #about_prelogin_menu": "togglePreloginMenu",
            "click #home_prelogin, #learnmore_prelogin, #phones_prelogin, #faqs_prelogin, #download_prelogin, #claim_prelogin": "togglePreloginMenu"
        },
        togglePreloginSMMenu: function(ev) {
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
