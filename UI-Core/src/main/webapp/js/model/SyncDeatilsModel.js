(function () {

	
	AMA.namespace("model");

    var SyncDeatilsModel = AMA.model.SyncDeatilsModel = AMA.model.BaseData.extend();


    SyncDeatilsModel.URL = "/syncHistory?";
    SyncDeatilsModel.RESOURCE = "syncHistory";
    SyncDeatilsModel.MODEL = AMA.model.BaseData.MODEL.extend({

    });

    AMA.augment(SyncDeatilsModel.prototype, {
        _configureUrl: function () {
            this.url = AMA.config.apiHostUrl + SyncDeatilsModel.URL + "devId=" + AMA.config.devId + "&endpointId=" + AMA.config.endpointId + "&authToken=" + AMA.config.authToken;
            //this.url =  this.constructor.URL;
        },

        _configureFetchOptions: function (options) {}
    	
    });

})();