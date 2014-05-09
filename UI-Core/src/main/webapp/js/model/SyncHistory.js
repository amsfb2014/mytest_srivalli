/*! SyncHistory */
(function () {


    AMA.namespace("model");

    var SyncHistory = AMA.model.SyncHistory = AMA.model.BaseData.extend();


    SyncHistory.URL = "/syncHistory?";
    SyncHistory.RESOURCE = "syncHistory";
    SyncHistory.MODEL = AMA.model.BaseData.MODEL.extend({

    });

    AMA.augment(SyncHistory.prototype, {
        _configureUrl: function () {
            this.url = AMA.config.apiHostUrl + SyncHistory.URL + "devId=" + AMA.config.devId + "&endpointId=" + AMA.config.endpointId + "&authToken=" + AMA.config.authToken;
            //this.url =  this.constructor.URL;
        },

        _configureFetchOptions: function (options) {}

    });

})();