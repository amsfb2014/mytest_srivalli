/*! DiagnosticResourcedata */
(function () {
	AMA.namespace("model");
	
	var DiagnosticScanResourceData = AMA.model.DiagnosticScanResourceData = AMA.model.BaseData.extend();
	
    DiagnosticScanResourceData.RESOURCE = "apphealthscanresults_id_resources";
	DiagnosticScanResourceData.URL = "/appHealthScanResults";
	DiagnosticScanResourceData.MODEL = AMA.model.BaseData.MODEL.extend({
		
	});
	
	AMA.augment(DiagnosticScanResourceData.prototype, {
        _configureUrl: function () {
            this.url = AMA.config.apiHostUrl + this.constructor.URL + "/"+AMA.config.endpointId+ "/resources?devId=" + AMA.config.devId + "&endpointId="+ AMA.config.endpointId + "&authToken=" + AMA.config.authToken;
            
            
            AMA.debug("\n\n Health Scan Resources config URL: " + this.url + "\n\n");
        }

		
    });
	
})();