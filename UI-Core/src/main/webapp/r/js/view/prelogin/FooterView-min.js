/*! FooterView */
define(["jquery","underscore","backbone","text!tpl/prelogin/footer.html"],function(c,a,e,b){var d=e.View.extend({el:"#footer_containerarea",template:a.template(b),render:function(){var f=this;this.$el.html(this.template);return this},events:{"click #termstext, #privacytext, #contacttext":"hideLogin"},hideLogin:function(f){c("#LoginForm").addClass("hidden-md hidden-sm hidden-lg");c("#logincontainer").each(function(g){c(this).children().each(function(){var h=c(this).attr("id");c("#"+h).removeClass("preloginLinksSelected")})})}});return d});