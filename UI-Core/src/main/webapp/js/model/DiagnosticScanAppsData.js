/*! DiagnosticScanApssData */
(function () {
	AMA.namespace("model");

	var DiagnosticScanAppsData = AMA.model.DiagnosticScanAppsData = AMA.model.BaseData.extend();

	DiagnosticScanAppsData.RESOURCE = "apphealthscanresults_id_apps";
	DiagnosticScanAppsData.URL = "/appHealthScanResults";
	DiagnosticScanAppsData.MODEL = AMA.model.BaseData.MODEL.extend({

	});

	AMA.augment(DiagnosticScanAppsData.prototype, {
		_configureUrl: function () {
			this.url = AMA.config.apiHostUrl + this.constructor.URL + "/"+AMA.config.endpointId+ "/apps?devId=" + AMA.config.devId + "&endpointId="+ AMA.config.endpointId + "&authToken=" + AMA.config.authToken + "&limit=*";


			AMA.debug("\n\n Health Scan Apps Data config URL: " + this.url + "\n\n");
		},
		defaults: {
			"name": "",
			"lastUsed": "lastUsedTEST",
			"batteryRating": "",
			"memoryRating": "",
			"storageRating": ""
		}


	});

})();