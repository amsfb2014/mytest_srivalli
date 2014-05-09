/*! Videos */
(function () {
	
	AMA.namespace("model");
	
	var Videos = AMA.model.Videos = AMA.model.Files.extend();

	Videos.FILETYPE = "video";
	Videos.OFFSET = 0;
	Videos.PAGE_SIZE = 9;

	Videos.MODEL = AMA.model.Files.MODEL.extend({

	});
	
	_.extend(Videos.prototype, {
		initialize: function () {
			Videos.__super__.initialize.apply(this, arguments);

			this.offset = Videos.OFFSET;
			this.pageSize = Videos.PAGE_SIZE;
		},

		_configureUrl: function (options) {
			Videos.__super__._configureUrl.call(this, options);

			this.url += "&" +
				$.param({
					offset: this.offset || Videos.OFFSET,
					limit: this.pageSize || Videos.PAGE_SIZE
				});
		}
	});
})();
