/*! SafeBrowsing */
(function () {
	AMA.namespace("model");
	
	/**
	 * Last Scan
	 *
	 * @class Threats
	 * @namespace model
	 * @extends AMA.model.BaseData
	 * @constructor
	 */
	var SafeBrowsing = AMA.model.SafeBrowsing = AMA.model.BaseData.extend();

	SafeBrowsing.RESOURCE = "browserSecuritySettings";
	
	SafeBrowsing.MODEL = AMA.model.BaseData.MODEL.extend({		
	});
	
	AMA.augment(SafeBrowsing.prototype, {
		
    });
})();