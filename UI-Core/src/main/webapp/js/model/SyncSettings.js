/*! SyncSettings */
(function () {

	AMA.namespace("model");

	/**
	 * Sync Settings
	 *
	 * @class SyncSettings
	 * @namespace model
	 * @extends AMA.model.BaseData
	 * @constructor
	 */
	var SyncSettings = AMA.model.SyncSettings = AMA.model.BaseData.extend();

	SyncSettings.RESOURCE = "mediaSettings";

	/**
	 * API endpoint for this collection
	 *
	 * @property URL
	 * @type string
	 * @static
	 * @final
	 */
	SyncSettings.URL = "/mediaSettings";

	SyncSettings.MODEL = AMA.model.BaseData.MODEL.extend({

	});

	_.extend(SyncSettings.prototype, {

	});

})();
