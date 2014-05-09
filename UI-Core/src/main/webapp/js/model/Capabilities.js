/*! Capabilities */
(function () {

	AMA.namespace("model");

	var Capabilities = AMA.model.Capabilities = AMA.model.BaseData.extend();


    Capabilities.RESOURCE = "capabilities";

	Capabilities.MODEL = Backbone.Model.extend({

	});
	

	_.extend(Capabilities.prototype, {

        // This override forces syncPrivileges values for this model
        // without circular dependency on itself (in BaseData.initialize)
        initialize: function (models, options) {
            this.model = this.constructor.MODEL;

            this.options = this.options || {};
            _.extend(this.options, options);

            this._configureUrl();

            this.syncPrivileges = {
                "create": true,
                "read": true,
                "update": true,
                "delete": true
            };

            this.isLoaded = models && models.length > 0;
            this.isFetching = false;

            // Use the 'reset' event to indicate that data has been fetched
            this.on("reset", function () {
                this.isLoaded = true;
                this.isFetching = false;

                this.trigger(AMA.model.BaseData.EVENT.LOADED);
            });

            this.on("add remove change", function() {
                this.trigger(AMA.model.BaseData.EVENT.UPDATED);
            });

            this._afterInitialize();
        },


        _configureUrl: function () {
            this.url = AMA.config.securityHostUrl + "/" + Capabilities.RESOURCE + "?" +
                $.param({
                    devId: AMA.config.devId,
                    endpointId: AMA.config.endpointId,
                    authToken: AMA.config.authToken
                });
        },


        parse: function (resp) {
            resp = Capabilities.__super__.parse.apply(this, arguments);

            var list = [];
            _.each(resp, function (item) {
                // Ignore any (unexpected) non-string items
                if (!_.isString(item)) {
                    AMA.error("Unexpected non-string list item in response from Capabilities API");
                    return;
                }

                // Ignore any invalid capability string
                var CRUD = ["create", "read", "update", "delete"],
                    method = item.split("_")[0];
                if (!_.contains(CRUD, method)) {
                    AMA.error("Invalid capability string in response from Capabilities API");
                }
                else {
                    // Create an object with property 'capability'
                    list.push({ capability: item });
                }
            });

            return list;
        },


		_isAllowed: function (method, resource) {
			var list = this.toJSON() || [],
				capability = method + "_" + resource;

            // Try to find a match for the capability being queried
			var match = _.find(list, function (item){
				return item.capability === capability;
			});

			return !_.isUndefined(match);
		},


        canCreate: function (resource) {
            return this._isAllowed("create", resource);
        },

        canRead: function (resource) {
            return this._isAllowed("read", resource);
        },

        canUpdate: function (resource) {
            return this._isAllowed("update", resource);
        },

        canDelete: function (resource) {
            return this._isAllowed("delete", resource);
        }

	});
})();