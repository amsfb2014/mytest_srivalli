/*! Threats */
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
	var Threats = AMA.model.Threats = AMA.model.BaseData.extend();

	Threats.RESOURCE = "appInfectionScanResults_actionId";

	/**
	 * temporary URL of this collection
	 *
	 * @property URL
	 * @type string
	 * @static
	 * @final
	 */
	Threats.URL = "/appInfectionScanResults";
	
	Threats.MODEL = AMA.model.BaseData.MODEL.extend({
		
	});
	
	AMA.augment(Threats.prototype, {
		
     	fetch: function () {

			this.url = AMA.config.apiHostUrl + this.constructor.URL + "?devId=" + AMA.config.devId + "&endpointId=" + AMA.config.endpointId + "&authToken=" + AMA.config.authToken;
			Threats.__super__.fetch.call(this);
		},
		
		_configureUrl: function() {}
		
	});

})();
