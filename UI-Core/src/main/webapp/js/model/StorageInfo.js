/*! StorageInfo */
(function () {

    AMA.namespace("model");

    var StorageInfo = AMA.model.StorageInfo = AMA.model.BaseData.extend();

    StorageInfo.RESOURCE = "storageInfo";

    StorageInfo.URL = "/storageInfo?";
    StorageInfo.MODEL = AMA.model.BaseData.MODEL.extend({

    });

    AMA.augment(StorageInfo.prototype, {
        _configureFetchOptions: function (options) {},
        _configureUrl: function () {
            this.url = AMA.config.apiHostUrl + StorageInfo.URL + "devId=" + AMA.config.devId + "&endpointId=" + AMA.config.endpointId + "&authToken=" + AMA.config.authToken;
            //this.url =  this.constructor.URL;
        }

    });

})();