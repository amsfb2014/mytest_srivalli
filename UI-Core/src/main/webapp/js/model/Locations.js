/*! Locations */
(function () {

    AMA.namespace("model");

    /**
	 * Location Collection
	 *
	 * @class Locations
	 * @namespace view
	 * @extends AMA.view.BaseData
	 * @constructor
	 */
    var Locations = AMA.model.Locations = AMA.model.BaseData.extend();

    Locations.RESOURCE = "locationHistory";

    /**
	 * Rest URL of this collection
	 *
	 * @property URL
	 * @type string
	 * @static
	 * @final
	 */
    Locations.URL = "/locationHistory";


    /**
	 * Locations Collection Model constructor, Override functions goes here if Model needs additional implementation
	 *
	 */
    Locations.MODEL = AMA.model.BaseData.MODEL.extend({

    });

    AMA.augment(Locations.prototype, {
        _configureUrl: function () {
            this.url = AMA.config.apiHostUrl + Locations.URL + "?devId=" + AMA.config.devId + "&endpointId=" + AMA.config.endpointId + "&authToken=" + AMA.config.authToken;
        },

        parse: function(item) {
            item = Locations.__super__.parse.call(this, item);
            _.each(item, function(list, index) {
                list.id = index;
                list.coordinates = [list.latitude, list.longitude].join();
                list.time = list.eventTime;
                list.accuracy = list.precision;
            });
            return item;
        },
    	/**
    	 * Preprocesses Location Models before using this Collection
    	 *
    	 * @method prepareLocations
    	 */
    	prepareLocations: function () {

    	},

    	/**
    	 * Clear Location Duplicates,  Ideally this should be handled by server
    	 *
    	 * @method clearDuplicateLocations
    	 */
    	clearDuplicateLocations: function () {
            // this.numberOfPoints = this.models.length;

             if (this.models.length < AMA.config.locationHistoryLimit) {
                this.numberOfPoints = this.models.length;
              } else {
                this.numberOfPoints = AMA.config.locationHistoryLimit;
            }
        }
    });

})();
