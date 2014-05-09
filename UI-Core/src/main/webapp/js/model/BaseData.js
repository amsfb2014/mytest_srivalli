/*! BaseData */
(function () {

	AMA.namespace("model");


	AMA.model.FieldTypes = AMA.enums(
			"STRING",
			"NUMBER",
			"DATE"
	);


	var BaseData = AMA.model.BaseData = Backbone.Collection.extend();


	BaseData.RESOURCE = "";

	BaseData.MODEL = Backbone.Model.extend();


	BaseData.EVENT = AMA.enums(
			"LOADED",
			"INVALIDATED",
			"UPDATED"
	);


	_.extend(BaseData.prototype, {

		initialize: function (models, options) {
			this.model = this.constructor.MODEL;

            this.options = this.options || {};
            _.extend(this.options, options);

			this._configureUrl();

            this._checkSyncPrivileges();

			this.isLoaded = models && models.length > 0;
			this.isFetching = false;

			// Use the 'reset' event to indicate that data has been fetched
			this.on("reset", function () {
				this.isLoaded = true;
				this.isFetching = false;

				this.trigger(BaseData.EVENT.LOADED);
			});

			this.on("add remove change", function() {
				this.trigger(BaseData.EVENT.UPDATED);
			});

            this._afterInitialize();
		},


		_configureUrl: function () {
			this.url = AMA.config.apiHostUrl + "/" + this.constructor.RESOURCE + "?" +
                $.param({
                    devId: AMA.config.devId,
                    endpointId: AMA.config.endpointId,
                    authToken: AMA.config.authToken
                });
		},


        _checkSyncPrivileges: function () {
            var resource = this.constructor.RESOURCE,
                capabilities = AMA.models.capabilities;

            this.syncPrivileges = {
                "create": capabilities.canCreate(resource),
                "read": capabilities.canRead(resource),
                "update": capabilities.canUpdate(resource),
                "delete": capabilities.canDelete(resource)
            };
        },


        _afterInitialize: function () {

        },


        sync: function (method, model, options) {
            var CRUD_MAP = {
                "create": "POST",
                "read":   "GET",
                "update": "PUT",
                "delete": "DELETE"
            };

            // Check if this operation is restricted
            if (!this.syncPrivileges[method]) {
                AMA.error("This account has no " + method + " permission for resource '" +
                    this.constructor.RESOURCE + "'");
                return false;
            }

            // Set Ajax error handler
            var error = options.error;
            options.error = _.bind(function (result) {
                // Check if authorization failed (i.e. auth session expired)
                if (result.status === 401) {
                    AMA.error("Server responded 'Unauthorized' (401)");

                    // Invoke a session timeout
                    AMA.session.timeout();
                }

                if (error) error.apply(arguments);
            }, this);
			

            AMA.debug("Calling REST API: " + CRUD_MAP[method] + " " + (options.url || this.url));


            // IE8/9 PUT/DELETE request workaround
			if (method !== "read" && AMA.Util.useXdr()) {
				var xhr = null;
				
				if (method === "update" || method ==="delete") {
					options.url = options.url + "&_method=" + CRUD_MAP[method];
					method = "create";
				}
				
				xhr = AMA.Util.createCORSRequest(CRUD_MAP[method], options.url);
				
				xhr.onload = function () {
					try {
						var response = JSON.parse(this.responseText);
					} catch (e) {
						AMA.error(CRUD_MAP[method] + " " + options.url  + " - Base Data - response not JSON: " + this.responseText);
						response = this.responseText;
					};

					if (options.callback) {
						options.callback(true, response);
					} else if (options.complete) {
						options.complete(true, response);
					} else {
						options.success(true, response);
					}
				};
				xhr.onerror = function () {
					AMA.error("Request failed: " + CRUD_MAP[method] + " " + options.url);
					if(options.callback!=undefined)
						options.callback(false);
					else
						options.error(false);
				};
				xhr.onprogress = function () {};
				xhr.ontimeout = function () {};
				xhr.timeout = 100000; // Prevents IE9 from aborting the request
				if(options.data!=undefined)
					{
					 xhr.send(options.data);
					}
				else
					{
					xhr.send(JSON.stringify(model.attributes));
				}
					
			}
			else {
				Backbone.Collection.prototype.sync.apply(this, arguments);
			}
        },


		fetch: function (options) {
			if (this.isFetching) {
				return;
			}
			this.isFetching = true;
			options = options || {};

			// Force reset
			if(typeof options.reset == "undefined") {
				options.reset = true;
			}			

			this._configureFetchOptions(options);

			var complete = options.complete;
			options.complete = _.bind(function() {
				this.isLoaded = true;
				this.isFetching = false;

				if (complete) complete.apply(arguments);
			}, this);

			Backbone.Collection.prototype.fetch.call(this, options);
		},


		_configureFetchOptions: function (options) {

		},


        parse: function (resp) {
            // Return empty object if response is not valid
            if (!_.isObject(resp)) return [];

            // Return the response as-is if it's an array
            if (_.isArray(resp)) return resp;
						
            // Check if the response object has a 'list' array property,
            // in which case it means it is a collection
			// FIXME: switch this with the second 'if'
            if (_.isArray(resp.list)) {
                // Save all other properties (besides 'list') to
                this.attributes = _.omit(resp, "list");

                return resp.list;
            }

            // If the response is a single object, encapsulate it into
            // a single-element array
            return [ resp ];
        },


		invalidate: function (options) {
			// Defer invalidation until any ongoing fetch has finished
			if (this.isFetching) {
				this.once(BaseData.EVENT.LOADED, this.invalidate);
				return;
			}

			// No need to proceed if data has never been fetched in the first place
			if (!this.isLoaded) return;
			
			// Allow other objects (e.g. related view) to react to the invalidation
			this.isLoaded = false;
			this.trigger(BaseData.EVENT.INVALIDATED);

			// Re-fetch the invalidated data
			this.fetch(options);
		}

	});

})();
