/*! Privacy */
(function () {

    AMA.namespace("model");

    var Privacy = AMA.model.Privacy = AMA.model.BaseData.extend();

    Privacy.RESOURCE = "appVulnerabilityScanResults";

    // TODO: Replace this with 'RESOURCE' property
    Privacy.URL = "/appVulnerabilityScanResults";

    Privacy.MODEL = AMA.model.BaseData.MODEL.extend({
    });

    AMA.augment(Privacy.prototype, {
        /**
         * NOTE: This would be a good addition on the
         * BaseModel.
         */
        initialize: function() {
            Privacy.__super__.initialize.apply(this);
            this.sort_direction = 'asc';
            this.sort_key = 'id';
        },
        sortByKey: function(key, dir) {
            this.sort_key = key;
            this.sort_direction = dir;
            this.sort();
        },
        comparator: function(a, b) {

            a = a.get(this.sort_key);
            b = b.get(this.sort_key);
            a = (typeof a === "string") ? a.toLowerCase() : a;
            b = (typeof b === "string") ? b.toLowerCase() : b;

            if(this.sort_direction === "desc") {
                    return a > b ?  -1 : a < b ? 1 : 0;
            }
            return a > b ?  1 : a < b ? -1 : 0;
        },

        _configureFetchOptions: function (options) {
        },
        /**
         * TO DO: use this if REST is not Yet Available...
         * @private
         */
        _configureUrl: function () {
            this.url = AMA.config.apiHostUrl + Privacy.URL + "?devId=" + AMA.config.devId + "&endpointId=" + AMA.config.endpointId + "&authToken=" + AMA.config.authToken;
            //this.url =  this.constructor.URL;
        },
        fetch: function() {
            Privacy.__super__.fetch.apply(this);
        }

    });

})();
