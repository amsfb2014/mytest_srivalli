/*! LoginFailedView */
define([
    "jquery",
    "underscore",
    "backbone",
    "text!tpl/prelogin/login_failed.html"
], function($, _, Backbone, Template) {

    var View = Backbone.View.extend({

        el: '#header_container',

        template: _.template(Template),

        initialize: function() {
            $('#index_li').siblings().removeAttr('class');
        },

        render: function() {
            var self = this;
                
            this.$el.html(this.template);
            //set current highlighted item/element
            $('#index_li').addClass('selected');
            this.$el.find(".errorMsgIcon").show();

            return this;
        }

    });

    return View;

});
