/*! Page */
(function () {
    AMA.namespace("view");

    var Page = AMA.view.Page = AMA.view.BaseView.extend();

    Page.TEMPLATE_ID = "page_template";
    Page.TEMPLATE_SRC = "page.tpl";


    AMA.augment(Page.prototype, {
        render: function () {
            Page.__super__.render.apply(this);

            this.header = new AMA.view.Header({
                el: "#header",
                parent: this
            });

            this.content = new AMA.view.Content({
                el: "#page_content",
                defaultTab: this.options.defaultTab,
                parent: this
            });

            // Create standard dialogs (alert, confirm, etc.)
            this.standardDialogs = new AMA.view.StandardDialogs({
                el: "#standard_dialogs",
                parent: this,
            });

            // Create Settings dialog
            this.settings = new AMA.view.Settings({
                el: "#settings_dialog",
                parent: this,
                hidden: true
            });

            // Feedback-related items (Share Feedback, Survey, etc.)
            this.feedback = new AMA.view.Feedback({
                el: "#feedback_dialogs",
                parent: this,
                hidden: false
            });

            this.checkPlatform();

            this.plug(AMA.view.plugin.PageViewedTracker, {
                tab: ".report_event"
            });
            // this.fotterHack();
        },

        _setupEvents: function () {
            $(window).bind('beforeunload', function() {
                AMA.session.sendSyncCommand();
            });
            $(document)
                    .on('focus', 'input', function(e) {
                        $("#footer").addClass('hidden');
                    })
                    .on('blur', 'input', function(e) {
                        $("#footer").removeClass('hidden');
                    });
        },

        checkPlatform: function () {
            if(this.data.toJSON()[0].platform.indexOf("iOS") > -1) {
                this.$el.addClass("ios");
            }
            /*
             var headerView = this.header,
             headerChild = headerView.getChild("toolbar"),
             renderPending = false;


             if (headerChild) {
             // If subtab is specified and the main tab is not yet rendered,
             // set the subtab as the default to be shown upon rendering
             if (headerChild.isRendered) {
             headerChild.options.defaultTab = subtabId;
             renderPending = true;
             }

             headerView.switchTo(headerChild);
             }
             */
        },
        _onPageResize: function(e) {
            if($(".modal-open").is(":visible")) {
                $(".ama-menu.in").modal('toggle');
            }
            // this.fotterHack();
            /* Comment out below line to prevent throwing a JS error in IE */
        	//console.debug(e);
        },
        fotterHack: function() {
            $("#body_container").css({ "minHeight": document.documentElement.clientHeight-$("#header_container").height()-47});
        },

        switchContent: function (tab, subtab) {
            var pageView = this.content,
                    tabView = pageView.getChild(tab + "_tab"),
                    subtabId = (subtab && (tab + "_" + subtab + "_tab")) || "",
                    renderPending = false;

            if (tabView) {
                // If subtab is specified and the main tab is not yet rendered,
                // set the subtab as the default to be shown upon rendering
                if (subtab && !tabView.isRendered) {
                    tabView.options.defaultTab = subtabId;
                    renderPending = true;
                }

                pageView.switchTo(tabView);

                var mapping = {
                    dashboard_main: "dashboard",
                    location: "locate",
                    data: "backup",
                    security: "security_selector",
                    app_assist: "app_assist_selector",
                    safe_browsing: "safebrowsing",
                    support: "techsupport"
                };
                var t = mapping[tab] ? mapping[tab] : tab;

                this.$el.find("#"+t+"_tab, #"+t+"_modal_tab").addClass("selected").siblings().removeClass("selected");
                this.$el.find("#menu-tab-sm-btn>.selected").html(this.$el.find("#"+t+"_tab").html());

                // If subtab is specified and the main tab has already rendered,
                // simply switch to that subtab
                if (subtab && !renderPending) {
                    tabView.switchTo(subtabId);
                    // util.highlightSubNav Not applicable on RWD...
                    // AMA.Util.highlightSubNav(subtab);
                    this.$el.find(".tab-" + subtab ).addClass("selected").siblings().removeClass("selected");
                }
            }
        },

        /**
         * Opens the Settings dialog
         *
         * @param {String} tab: The specific settings tab to be opened
         * @param {String} prevURL: Previous URL
         *
         */
        openSettings: function (tab, prevURL) {
            if (!this.settings.isRendered) {
                var o = this;
                this.settings.on(AMA.view.BaseView.EVENT.RENDERED, function () {
                    o.settings.show(tab, prevURL);
                });
                return;
            }

            // Show the Settings dialog
            this.settings.show(tab, prevURL);
        },

        // Opens the Share Feedback dialog
        openShareFeedback: function () {
            this.feedback.openShareFeedback();
        },

        /**
         * Opens the Survey dialog
         *
         * @param {String} surveyType: The type of survey to be loaded
         *
         */
        openSurvey: function (surveyType) {
            this.feedback.openSurvey(surveyType);
        },

        logout: function () {
            AMA.debug("Logging out");
            AMA.session.logout();
        }
    });
})();