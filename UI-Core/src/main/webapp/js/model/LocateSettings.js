/*! LocateSettings */
(function () {
    
    AMA.namespace("model");
    
    var LocateSettings = AMA.model.LocateSettings = AMA.model.BaseData.extend();
        
    
    LocateSettings.URL = "/eventSettings";
    LocateSettings.RESOURCE = "eventSettings";

    LocateSettings.MODEL = AMA.model.BaseData.MODEL.extend({

    });
    
    AMA.augment(LocateSettings.prototype, {
        _configureUrl: function () {
            this.url = AMA.config.apiHostUrl + LocateSettings.URL + "?devId=" + AMA.config.devId + "&endpointId=" + AMA.config.endpointId + "&authToken=" + AMA.config.authToken;
        }
    });

})();
