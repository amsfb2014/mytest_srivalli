/*! EndpointHistory */
(function () {

    AMA.namespace("model");

    var EndpointHistory = AMA.model.EndpointHistory = AMA.model.BaseData.extend();

    EndpointHistory.RESOURCE = "eventActionHistory";

    EndpointHistory.MODEL = AMA.model.BaseData.MODEL.extend({

    });


    EndpointHistory.MAX_ITEMS = 10;

    EndpointHistory.INCLUDED_ACTIONS = [
        "sync", "gpsrefresh", "wipe", "wipefactory", "lock", "soundalert", "announce", "security", "startScan", "scanHealthStart", "GPS_BATTERY", "GPS_INTERVAL", "LOCATIONCHECK_ON"
    ];


    AMA.augment(EndpointHistory.prototype, {
        _configureUrl: function () {
            EndpointHistory.__super__._configureUrl.apply(this, arguments);

            this.url += "&limit=" + EndpointHistory.MAX_ITEMS;

        },
        parse: function(resp) {
            var items = EndpointHistory.__super__.parse.apply(this, arguments),
                data = [];
            if(items.length) {
                _.each(items, function(item) {
                    // Filter items to be included in the list
                    // TODO: Fetch more items if due to filtering we haven't used up max items
                    if (_.contains(EndpointHistory.INCLUDED_ACTIONS, item.actionType) /* &&
                        _.contains(["success", "failure"], item.status) */) {
                        data.push(item)
                    }
                });
            }
            return data;
        }
    });

})();