/*! PhotoSummary */
(function () {

    AMA.namespace("model");

    var PhotosSummary = AMA.model.PhotosSummary = AMA.model.BaseData.extend();
    PhotosSummary.RESOURCE = "files";
    PhotosSummary.FILETYPE = 'image';

    PhotosSummary.MODEL = AMA.model.BaseData.MODEL.extend({

    });
    /**
     * https://amssb02-api.amafib.com/v1/files?
     *      devId=OZDELSO9JWAOKCY5&
     *      endpointId=4d19fd09-840f-4a1c-b2cf-4d6238fe883b&
     *      fileType=image&
     *      authToken=d8920e33-f789-4a93-8bb4-a0e4db89619e&
     *      status=ACTIVE&
     *      limit=0
     */

    AMA.augment(PhotosSummary.prototype, {

        _configureUrl: function () {
            this.url = AMA.config.apiHostUrl + "/files?" +
                    $.param({
                        devId: AMA.config.devId,
                        endpointId: AMA.config.endpointId,
                        fileType: PhotosSummary.FILETYPE,
                        authToken: AMA.config.authToken,
                        status: AMA.model.UserData.Status.ENABLED,
                        limit: 0
                    });
        }

    });

})();