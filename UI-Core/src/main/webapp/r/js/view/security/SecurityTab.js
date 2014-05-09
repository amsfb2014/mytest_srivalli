/*! SecurityTab */
(function () {

    AMA.namespace("view");

    /**
	 * Security Tab View
	 *
	 * @class SecurityTab
	 * @namespace view
	 * @extends AMA.view.BaseView
	 * @constructor
	 */
    var SecurityTab = AMA.view.SecurityTab = AMA.view.BaseView.extend();


    /**
	 * ID of the template
	 *
	 * @property TEMPLATE_ID
	 * @type string
	 * @static
	 * @final
	 */
    SecurityTab.TEMPLATE_ID = "security_tab_template";


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
    SecurityTab.TEMPLATE_SRC = "security.tpl";


    /**
	 * Define toolsets that will appear in the security tab toolbar.
	 *
	 * @property TOOLBAR
	 * @type object
	 * @static
	 * @final
	 */
    SecurityTab.TOOLBAR = {
        DEFAULT : [
            "endpoint",
            "scan"
        ],
        IPHONE : [
			"endpoint",
            "scan"
        ]
    };


    AMA.augment(SecurityTab.prototype, {
		
    	/**
    	 * Renders Security Tab view
    	 *
    	 * @override
    	 * @method render
    	 */
        render: function () {
        	SecurityTab.__super__.render.apply(this);
			
			this.lastScan = new AMA.view.ThreatProtectionView({
				el: "#threat_scan",
				parent: this,
				data: AMA.models.threats
			});
			
			this.scanSettings = new AMA.view.ScanSettingsView({
				el: "#security_settings",
				parent: this,
				data: AMA.models.scansettings
			});
			
        	this.threatHistory = new AMA.view.ThreatHistoryListView({
        		el: "#security_threats",
				parent: this,
				data: AMA.models.threats
			});

            this.safeBrowsingTab = new AMA.view.SafeBrowsingView({
                el: "#safe_browsing",
                parent: this,
                data: AMA.models.safeBrowsing
            });

        },
		
		events: {	
	    	"click #security_activities_view_more": "viewMoreThreats"
	    },
		
		viewMoreThreats: function(e) {
			// TODO: know the cause of redirection, then remove next line
			e.preventDefault();
		
			AMA.view.ThreatHistoryListView.MAX_ITEM_LIMIT += 5;
			
			this.threatHistory.render();
			
			if(AMA.view.ThreatHistoryListView.MAX_ITEM_LIMIT >= AMA.models.threats.length) {
				$(e.currentTarget).hide();
			}
		}
    });
})();