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
                AMA.models.privacy.sortByKey(args[0], args[1]);
            });
            $(this.$el).find("#privacy_filter").on('change', function() {
                var obj = $(this),
                    oEl = $(o.$el);
                AMA.debug("Clearing search filter on " + o.$el);
                o.appAssistList.removeFilter("batteryormemoryusagerating");
                o.appAssistList.removeFilter("personalinfoaccessrating");
                o.appAssistList.removeFilter("messageaccessrating");
                o.appAssistList.removeFilter("locationaccessrating");

                if(obj.val() !== "all") {
                    AMA.debug("Applying search filter for " + obj.val());

                    o.appAssistList.addFilter(obj.val(), function (item) {
                        return _.some(obj.val(), function (key) {
                            var fieldVal = item[obj.val()];
                            return fieldVal !== null;
                        });
                    });
                }
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
    });


})();

/*
@NOTE
 {
 threatHash: "2a-01-0-0",
 threatName: "2b-01-0-0",
 threstStatus: "2c-01-0-0",
 threatInstallDate: "2d-01-0-0",
 threatThreatName: "2e-01-0-0",
 threatMostRecentScanDate: "2f-01-0-0",
 threatUpdateDate: "2g-01-0-0",
 threatSetting: "2h-01-0-0",
 threatVersion: "2i-01-0-0",
 threatConsultationStatus: "2j-01-0-0",
 threatPkg: "2k-01-0-0",
 threatFlaggedStatus: "30-01-0-0",
 threatTrustStatus: "2l-01-0-0",
 threatPermission: "2m-01-0-0",
 threatType: "2x-01-0-0",
 threatAppSize: "2q-01-0-0",
 threatDataSize: "2r-01-0-0",
 threatCacheSize: "2s-01-0-0",
 threatMemoryUsage: "2t-01-0-0",
     threatBatteryUsage: "2u-01-0-0",
 threatRunning: "2v-01-0-0",
 threatLocation: "2w-01-0-0",
 threatCanStop: "2y-01-0-0",
 threatCanUninstall: "2z-01-0-0",
 globalCategory: "3C-01-0-0",
 globalImpactCategories: "3K-01-0-0",
 globalImpactScore: "3J-01-0-0",
 globalImpactDetails: "3L-01-0-0",
 globalPermissions: "3D-01-0-0",
 globalTrustCount: "3E-01-0-0",
 globalInstallCount: "3F-01-0-0",
 globalUninstallCount: "3G-01-0-0",
 globalReportCount: "3H-01-0-0",
 globalAppSummary: "3I-01-0-0"
 }
 */