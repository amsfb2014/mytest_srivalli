/*! AppAssisttab */
(function () {

    AMA.namespace("view");

    var AppAssistTab = AMA.view.AppAssistTab = AMA.view.BaseView.extend();
    /**
     * defines the template ID which corresponds to the 'id' property of the template
     * <script> used by this class.
     *
     * @property TEMPLATE_ID
     * @type string
     * @static
     * @final
     */
    AppAssistTab.TEMPLATE_ID = "privacy_template";
    /**
     * Applicable only to view classes that fetch the aggregated templates for
     * itself and its child views, this property defines the name of the
     * template file to load. The path is defined in AMA.config.templatePath.
     *
     * @property TEMPLATE_SRC
     * @type string
     * @static
     * @final
     */
    AppAssistTab.TEMPLATE_SRC = "appassist.tpl";

    /**
     * Use to Initialize the Toolbar use for this Tab
     *
     * @property TOOLBAR.DEFAULT, TOOLBAR.IPHONE
     * @type object
     * @static
     * @final
     */
    AppAssistTab.TOOLBAR = {
        DEFAULT : [
            "endpoint",
            "AppAssist"
        ]
    };

    AMA.augment(AppAssistTab.prototype, {
        /**
         * Initialize with default sort direction;
         */
        initialize: function() {
            AppAssistTab.__super__.initialize.apply(this, arguments);
            this.on(AMA.view.BaseView.EVENT.DATA_LOADED, function() {
                this.data.sortByKey("name", "asc");
            });
        },

        events: {
            "click #app_assist_go" : "search"
        },

        /**
         * Process data to return only the _meta key.
         *
         * @override
         * @method _processData
         */
        _processData: function(data) {
            if(!this.data.attributes.total){
                this.data.attributes.total = this.data.length;
            }
            return this.data.attributes;
        },

        /**
         * Bind Events
         *
         * @override
         * @method _setupEvents
         */
        _setupEvents: function() {
            var o = this;
            $(this.$el).find("#privacy_sort").on('change', function() {
                var obj = $(this),
                        args = obj.val().split('-');
                AMA.debug("======= sorting data =======");
                $("#privacy").find(".submenu-label").html($("[value="+ obj.val() + "]").html())
                AMA.models.privacy.sortByKey(args[0], args[1]);
            });
            $(this.$el).on('click', ".privacy_sort", function() {
                var obj = $(this),
                        args = obj.data("value").split('-');
                AMA.debug("======= sorting data =======");
                $("#privacy").find(".submenu-label").html($("[data-value="+ obj.data("value") + "]").html())

                AMA.models.privacy.sortByKey(args[0], args[1]);
            });
            $(this.$el).find("#privacy_filter").on('change', function() {
                var obj = $(this),
                        oEl = $(o.$el);
                AMA.debug("Clearing search filter on " + o.$el);
                o.appAssistList.removeFilter("batteryOrMemoryUsageRating");
                o.appAssistList.removeFilter("personalInfoAccessRating");
                o.appAssistList.removeFilter("messageAccessRating");
                o.appAssistList.removeFilter("locationAccessRating");

                if(obj.val() !== "all") {
                    AMA.debug("Applying search filter for " + obj.val());

                    o.appAssistList.addFilter(obj.val(), function (item) {
                        return _.some(obj.val(), function (key) {
                            var fieldVal = item[obj.val()];
                            return fieldVal !== null;
                        });
                    });
                }
                $("#privacy").find(".submenu-label").html($("[value="+ obj.val() + "]").html())
                o.appAssistList.refresh();
            });
            $(this.$el).on('click', ".privacy_filter", function() {
                var obj = $(this),
                        oEl = $(o.$el);
                AMA.debug("Clearing search filter on " + o.$el);
                o.appAssistList.removeFilter("batteryOrMemoryUsageRating");
                o.appAssistList.removeFilter("personalInfoAccessRating");
                o.appAssistList.removeFilter("messageAccessRating");
                o.appAssistList.removeFilter("locationAccessRating");

                if(obj.data("value")!== "all") {
                    AMA.debug("Applying search filter for " + obj.data("value"));

                    o.appAssistList.addFilter(obj.data("value"), function (item) {
                        return _.some(obj.data("value"), function (key) {
                            var fieldVal = item[obj.data("value")];
                            return fieldVal !== null;
                        });
                    });
                }
                $("#privacy").find(".submenu-label").html($("[data-value="+ obj.data("value") + "]").html())
                o.appAssistList.refresh();
            });
        },


        search: function() {
            this.appAssistList._onSearchKeyUp(true);
        },

        /**
         * Render the view and the Child Views
         *
         * @override
         * @method render
         */
        render: function () {
            AppAssistTab.__super__.render.apply(this);
            this.appAssistList = new AMA.view.AppAssistListView({
                parent: this,
                el: "#privacy_rowbox",
                data: AMA.models.privacy
            })
                    .plug(AMA.view.plugin.Search, {
                        searchInput: "#privacy_searchinput",
                        searchFields: ["name"]
                    });
            this.appAssistDetails = new AMA.view.AppAssistDetailsView({
                parent: this,
                el: "#privacy_details",
                listView: this.appAssistList,
                dataClass: AMA.model.Privacy
            });
        }
/*        _afterRender: function() {
            if ($("#myelement").css("display").indexOf("block") != -1)
            {
                $("#myelement").hide();
            }
        }*/
    });


})();
