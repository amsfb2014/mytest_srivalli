/*! THreatProtectionView */
(function () {

	AMA.namespace("view");

	/**
	 * This view shows the Last Threat Scan
	 *
	 * @class ThreatProtectionView
	 * @namespace view
	 * @extends AMA.view.BaseView
	 * @constructor
	 */
	var ThreatProtectionView = AMA.view.ThreatProtectionView = AMA.view.BaseView.extend();

	/**
	 * ID of the template
	 *
	 * @property TEMPLATE_ID
	 * @type string
	 * @static
	 * @final
	 */
	ThreatProtectionView.TEMPLATE_ID = "threat_protection_template";

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
	ThreatProtectionView.TEMPLATE_SRC = "";
	
	ThreatProtectionView.POLLER = "";

	AMA.augment(ThreatProtectionView.prototype, {	
		initialize: function() {
			ThreatProtectionView.__super__.initialize.apply(this, arguments);
			
			// FIX ME: Do proper solution on next iteration.
			// workaround for device-invoked scan auto-refresh, there's no dirty bit being returned
			if (!ThreatProtectionView.POLLER) {
				ThreatProtectionView.POLLER = setInterval(function() { AMA.models.threats.invalidate(); }, 30000); 
			}			
		},
		
		_processData: function (item, index) {
			var attr = this.data.attributes;
			
			item.appClass = attr.appScan ? "" : "hidden";
			item.fileClass = attr.sdCardScan ? "" : "hidden";
			
			item.elId = this.$el.attr("id") + "_list";		
			item.fileScanTotal = attr.fileScanTotal;
			item.appScanTotal = attr.appScanTotal;			
			item.fileInfectedTotal = attr.fileInfectedTotal + attr.appInfectedTotal;

			item.lastScanDate = attr.eventTime ? 
				AMA.Util.formatDateAndTime(new Date(attr.eventTime), AMA.config.dateAndTimeFormat)
				: "Never";
			
			return item;
		},
	
        events: {
        	"click .scan_for_threats": "scan"
        },
		
        scan: function(){           
			AMA.ActionManager.start("scan");
        },
		
		_setupEvents: function () {

        }
	});

})();