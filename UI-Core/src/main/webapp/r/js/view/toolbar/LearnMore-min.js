/*! LearnMore */
(function(){AMA.namespace("view");var a=AMA.view.LearnMore=AMA.view.Dialog.extend();a.TEMPLATE_ID="Learn_More_template";a.TEMPLATE_SRC="";a.WIDTH=650;a.HEIGHT="auto";_.extend(a.prototype,{initialize:function(){this.options.width=a.WIDTH;this.options.height=a.HEIGHT;a.__super__.initialize.apply(this,arguments)},show:function(){this.$el.find("."+arguments[0]).removeClass("hidden").siblings("div").addClass("hidden");a.__super__.show.apply(this,arguments)}})})();