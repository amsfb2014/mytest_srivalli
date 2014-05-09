/*! Toolbar */
(function () {

    AMA.namespace("view");

    var Toolbar = AMA.view.Toolbar = AMA.view.BaseView.extend();

    Toolbar.TEMPLATE_ID = "toolbar_template";
    Toolbar.TEMPLATE_SRC = "";


    _.extend(Toolbar.prototype, {

        initialize: function () {
            Toolbar.__super__.initialize.apply(this, arguments);
            this.toolsets = {};
        },


        _setupEvents: function () {
/*            $(this.$el).tooltip({
                items: ".tooltip_icon, .tooltip_link",
                tooltipClass: "toolbar-tooltip",
                position: {
                    at: "center top"
                },
                hide: false,
                show: false,
                content: function () {
                    return $(this).next(".tooltip").html();
                }
            });*/
        },


        render: function () {
            Toolbar.__super__.render.apply(this);
        },


        registerToolset: function (name, toolset) {
            this.toolsets[name] = toolset;

            toolset.parent = this;
            this.children.push(toolset);
        },


        registerSwitcher: function (view) {
            AMA.assert(view.SWITCH_VIEW_EVENT, "[Toolbar.registerSwitcher] View is not a switcher");

            var o = this;
            view.on(view.SWITCH_VIEW_EVENT, function (event) {
                o._hideAllToolsets();
                function showToolsets() {
                    // TODO: Better method of checking for iPhone
                    if (AMA.Util.isIPhone(AMA.models.endpoints.models[0].get("platformfriendlyname")) && event.to.constructor.TOOLBAR.IPHONE) {
                        _.each(event.to.constructor.TOOLBAR.IPHONE, function (item) {
                            if (typeof o.toolsets[item] != "undefined") {
                            	o.toolsets[item].show();
                            }
                        });
                    }
                    else {
                        _.each(event.to.constructor.TOOLBAR.DEFAULT, function (item) {
                            if (typeof o.toolsets[item] != "undefined") {
                            	o.toolsets[item].show();
                            }
                        });
                    }
                }

                if (o.isRendered) {
                    showToolsets();
                } else {
                    o.once(AMA.view.BaseView.EVENT.RENDERED, showToolsets);
                }
            });

        },


        _hideAllToolsets: function () {
            _.each(this.toolsets, function (item) {
                if (item) item.hide();
            });
        }

    });
})();

