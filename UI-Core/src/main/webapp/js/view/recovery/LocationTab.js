/*! LocationTabView */
(function () {

    AMA.namespace("view");

    /**
	 * Location Tab View
	 *
	 * @class LocationTab
	 * @namespace view
	 * @extends AMA.view.BaseView
	 * @constructor
	 */
    var LocationTab = AMA.view.LocationTab = AMA.view.BaseView.extend();


    /**
	 * ID of the template
	 *
	 * @property TEMPLATE_ID
	 * @type string
	 * @static
	 * @final
	 */
    LocationTab.TEMPLATE_ID = "location_tab_template";


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
    LocationTab.TEMPLATE_SRC = "location.tpl";


    /**
	 * Define toolsets that will appear in the locate tab toolbar.
	 *
	 * @property TOOLBAR
	 * @type object
	 * @static
	 * @final
	 */
    LocationTab.TOOLBAR = {
        DEFAULT : [
            "endpoint",
            "locate",
            "alarm",
            "lock",
            "wipe"
        ],

        /* remove securephone since it will be remove in iphone */
        IPHONE : [
            "endpoint",
            "locate",
            "securePhone",
            "recentActivity"
        ]
    };


    AMA.augment(LocationTab.prototype, {

        events: {
            "click #location_setting": "editLocationSettings",
            "click #tip_link" : "showTips"
        },

    	/**
    	 * Renders Location Tab view
    	 *
    	 * @override
    	 * @method render
    	 */
        render: function () {
        	LocationTab.__super__.render.apply(this);
        	
        	// Initialize location history and location map views
        	this.locationHistory = new AMA.view.LocationHistoryListView({
        		el: "#location_history",
				parent: this,
				data: AMA.models.locations
			});
        	this.locationMap = new AMA.view.LocationMapView({
        		el: "#map_container",
				parent: this,
				dataClass: AMA.models.locations.constructor
			});
        	this.locationSummary = new AMA.view.LocationsSettingsSummaryView({
			    el: "#locations_settings_summary_placeholder",
			    data: AMA.models.locatesettings, //AMA.models.syncsettings,//
			    parent: this
			});
      
            this.TipsToRecover = new AMA.view.TipsToRecover({	            	
                el: "#tipstorecover",
                parent: this
            });	  
			
	
			if (!AMA.config.enableMrTimeTracking)	{
				AMA.debug("Reporting: Start MR time spent timer as user is on Location Tab");
				
				AMA.config.enableMrTimeTracking = true;
				AMA.ReportingManager.reportPortalTimeSpent("MR", "Start");
			}
			
        },

        _setupEvents: function () {

        },
        
        showTips: function() {
			this.TipsToRecover.show();
		},
        editLocationSettings: function(){
            AMA.page.openSettings("location");
        }
    });
})();