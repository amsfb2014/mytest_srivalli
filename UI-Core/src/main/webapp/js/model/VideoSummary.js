/*! VideoSummary */
(function () {

    AMA.namespace("model");

    var VideosSummary = AMA.model.VideosSummary = AMA.model.BaseData.extend();

    VideosSummary.RESOURCE = "files";

    VideosSummary.FILETYPE = "video";
    VideosSummary.MODEL = AMA.model.BaseData.MODEL.extend({

    });

    AMA.augment(VideosSummary.prototype, {
        _configureUrl: function () {
            this.url = AMA.config.apiHostUrl + "/files?" +
                $.param({
                    devId: AMA.config.devId,
                    endpointId: AMA.config.endpointId,
                    fileType: VideosSummary.FILETYPE,
                    authToken: AMA.config.authToken,
                    status: AMA.model.UserData.Status.ENABLED,
                    limit: 0
                });
        }
    });

})();