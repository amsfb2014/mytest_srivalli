/*! Files */
(function () {

    AMA.namespace("model");

    var Files = AMA.model.Files = AMA.model.UserData.extend();

    Files.RESOURCE = "files";

    // Each subclass should define a file type
    Files.FILETYPE = "";

    Files.MODEL = AMA.model.UserData.MODEL.extend({

    });


    _.extend(Files.prototype, {

        _configureUrl: function () {
            this.url = AMA.config.apiHostUrl + "/" + Files.RESOURCE + "?" +
                $.param({
                    devId: AMA.config.devId,
                    endpointId: AMA.config.endpointId,
                    fileType: this.constructor.FILETYPE,
                    authToken: AMA.config.authToken,
                    status: AMA.model.UserData.Status.ENABLED
                });
        },


        // TODO: Adjust this based on changes to Capabilities API
        _checkSyncPrivileges: function () {
            var resource = Files.RESOURCE,
                capabilities = AMA.models.capabilities;

            this.syncPrivileges = {
                "create": capabilities.canCreate(resource),
                "read": capabilities.canRead(resource),
                "update": capabilities.canUpdate(resource),
                "delete": capabilities.canDelete(resource)
            };
        }

    });

})();
