/*! Photos */
(function () {

	AMA.namespace("model");
	
	var Photos = AMA.model.Photos = AMA.model.Files.extend();

	Photos.FILETYPE = "image";
	Photos.OFFSET = 0;
	Photos.PAGE_SIZE = 9;

	Photos.MODEL = AMA.model.Files.MODEL.extend({

	});
	
	_.extend(Photos.prototype, {
		initialize: function () {
			Photos.__super__.initialize.apply(this, arguments);

			this.offset = Photos.OFFSET;
			this.pageSize = Photos.PAGE_SIZE;
		},

		_configureUrl: function (options) {
			Photos.__super__._configureUrl.call(this, options);

			this.url += "&" +
				$.param({
					offset: this.offset || Photos.OFFSET,
					limit: this.pageSize || Photos.PAGE_SIZE
				});
		}
	});
})();
