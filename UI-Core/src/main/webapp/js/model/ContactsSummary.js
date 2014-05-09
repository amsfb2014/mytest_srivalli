/*! ContactsSummary */
(function () {

    AMA.namespace("model");

    var ContactSummary = AMA.model.ContactSummary = AMA.model.BaseData.extend();


    ContactSummary.RESOURCE = "contacts";

    ContactSummary.MODEL = AMA.model.BaseData.MODEL.extend({

    });

    AMA.augment(ContactSummary.prototype, {
        _configureUrl: function () {
            this.url = AMA.config.apiHostUrl + "/" + ContactSummary.RESOURCE + "?" +
                $.param({
                    devId: AMA.config.devId,
                    endpointId: AMA.config.endpointId,
                    authToken: AMA.config.authToken,
                    status: AMA.model.UserData.Status.ENABLED,
                    limit: 0
                });
        }
    });

})();