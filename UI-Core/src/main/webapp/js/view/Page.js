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
                hidden: true
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
                hidden: true
            });

            this.checkPlatform();
            
            this.plug(AMA.view.plugin.PageViewedTracker, {
                tab: ".report_event"
            });
        },

        _setupEvents: function () {
            $(window).bind('beforeunload', function() {
                AMA.session.sendSyncCommand();
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
                this.$el.find("#"+t+"_tab").addClass("selected").siblings().removeClass("selected");
					
                // If subtab is specified and the main tab has already rendered,
                // simply switch to that subtab
                if (subtab && !renderPending) {
                    tabView.switchTo(subtabId);
                    // Highlight the correct submenu link
                    // TODO: This shouldn't have to be in Util
                    AMA.Util.highlightSubNav(subtab);
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