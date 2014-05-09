/*! ScanSettingsView */
(function () {

	AMA.namespace("view");


	/**
	 * This view shows the ScanSettingsView
	 *
	 * @class ScanSettingsView
	 * @namespace view
	 * @constructor
	 */
	var ScanSettingsView = AMA.view.ScanSettingsView = AMA.view.BaseView.extend();


	/**
	 * ID of the template
	 *
	 * @property TEMPLATE_ID
	 * @type string
	 * @static
	 * @final
	 */
	ScanSettingsView.TEMPLATE_ID = "scan_settings_template";

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
	ScanSettingsView.TEMPLATE_SRC = "";
	
	AMA.augment(ScanSettingsView.prototype, {
		_processData: function (item, index) {
			item.css={};
			if( item.autoThreatScanFrequency === "NEVER" ) {
				item.css["autoThreatScanEnabledOn"]="hide";
				item.css["autoThreatScanEnabledOff"]="show";
			}
			else {
				item.css["autoThreatScanEnabledOn"]="show";
				item.css["autoThreatScanEnabledOff"]="hide";
			}
			if( item.realTimeScanEnabled ) {
				item.css["realTimeScanEnabledOn"]="show";
				item.css["realTimeScanEnabledOff"]="hide";
			}
			else {
				item.css["realTimeScanEnabledOn"]="hide";
				item.css["realTimeScanEnabledOff"]="show";
			}
			if( item.mediaScanEnabled ) {
				item.css["mediaScanEnabledOn"]="show";
				item.css["mediaScanEnabledOff"]="hide";
			}
			else {
				item.css["mediaScanEnabledOn"]="hide";
				item.css["mediaScanEnabledOff"]="show";
			}
			if( item.trayNotificationEnabled ) {
				item.css["trayNotificationEnabledOn"]="show";
				item.css["trayNotificationEnabledOff"]="hide";
			}
			else {
				item.css["trayNotificationEnabledOn"]="hide";
				item.css["trayNotificationEnabledOff"]="show";
			}
			return item;
		},
        events: {
        	"click #edit_security_settings": "editSecuritySettings",
        	"click .security_settings_value": "editSecuritySettings"
        },
        editSecuritySettings: function(){
            AMA.page.openSettings("security");
        }
	});

})();
