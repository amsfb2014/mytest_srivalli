/*! page_not_found */
require.config({
	waitSeconds: 600,
    paths: {

        baseUrl: "/js/",

        tpl: "../tpl",

        jquery: "lib/jquery",
        underscore: "lib/lodash.underscore",
        backbone: "lib/backbone",

        // require plugins
        text: "lib/text"

    },

    shim: {

        "backbone": {
            deps: [ "underscore", "jquery"],
            exports: "Backbone"
        }

    }

});

require([
    "jquery",
    "underscore",
    "backbone",
    "view/prelogin/HeaderView",
    "view/prelogin/FooterView",
    "view/prelogin/PageNotAvailableView"
], function($, _, Backbone, HeaderView, FooterView, PageNotAvailableView) {

    var PageNotAvailableRouter = Backbone.Router.extend({
        routes: {
            "": "page_not_available",
            "page_not_available": "page_not_available",
        },
        initialize: function() {
            var headerView = new HeaderView().render();
            var footerView = new FooterView().render();
        },
        page_not_available: function() {
            var pageNotAvailableView = new PageNotAvailableView().render();
        },
        other: function() {
            this.page_not_available();
        }
    });

    $(document).ready(function() {
        var router = new PageNotAvailableRouter();
        Backbone.history.start();
    });

});
