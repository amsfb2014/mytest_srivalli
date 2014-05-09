/*! ScanSettings */
(function () {

	AMA.namespace("model");
	
	/**
	 * Scan Settings
	 *
	 * @class ScanSettings
	 * @namespace model
	 * @extends AMA.model.BaseData
	 * @constructor
	 */
	var ScanSettings = AMA.model.ScanSettings = AMA.model.BaseData.extend();

	ScanSettings.RESOURCE = "appSecuritySettings";

	/**
	 * API endpoint for this collection
	 *
	 * @property URL
	 * @type string
	 * @static
	 * @final
	 */
	ScanSettings.URL = "/appSecuritySettings";

	ScanSettings.MODEL = AMA.model.BaseData.MODEL.extend({

	});

	_.extend(ScanSettings.prototype, {

	});

})();
