/*! DashboardData */
(function () {
    AMA.namespace("model");

    var DashboardData = AMA.model.DashboardData = AMA.model.BaseData.extend();

    DashboardData.RESOURCE = "accountSettings";
    DashboardData.URL = {
        ENDPOINT: "accounts",
        KEYWORDS: {
            ACCOUNT_PREFERENCES: "preferences",
            CHANGE_PASSWORD: "changePassword",
            SECURE_ACCOUNT_PREFERENCES: "secureAccountPreferences",
            UPDATE_EMAIL: "updateEmail"
        }
    };
    DashboardData.MODEL = AMA.model.BaseData.MODEL.extend({

    });


    AMA.augment(DashboardData.prototype, {
        _configureUrl: function () {
            this.url =  AMA.config.apiHostUrl + "/" + 
                        DashboardData.URL.ENDPOINT + "/" +
                        AMA.config.accountDetails.accountId + "/" +
                        DashboardData.URL.KEYWORDS.ACCOUNT_PREFERENCES + "?" +
                        $.param({
                            devId: AMA.config.devId,
                            authToken: AMA.config.authToken
                        });
        },

        _buildUpdateUrl: function (keyword, options) {
            var url =   AMA.config.apiHostUrl + "/" + 
                        DashboardData.URL.ENDPOINT + "/" +
                        AMA.config.accountDetails.accountId + "/" +
                        keyword + "?" +
                        $.param({
                            devId: AMA.config.devId,
                            authToken: AMA.config.authToken
                        });

            if (options && options.endpointId) {
                url += $.param({
                    endpointId: AMA.config.endpointId
                });
            }

            return url;
        },

        fetch: function (options) {
            if (this.isFetching) {
                return;
            }
            this.isFetching = true;
            options = options || {};

            // Force reset
            options.reset = true;

            this._configureFetchOptions(options);

            var complete = options.complete,
                o = this;

            options.complete = _.bind(function () {
                this.isLoaded = true;
                this.isFetching = false;

                if (options.callback && typeof options.callback == "function") options.callback();

                if (complete) complete.apply(arguments);
            }, this);

            options.success = function () {
                o.isLoaded = true;
                o.isFetching = false;

                if (options.callback && typeof options.callback == "function") options.callback();

                if (complete) complete.apply(arguments);
            };

            Backbone.Collection.prototype.fetch.call(this, options);
        },

        /* Updates account information
         *
         * @param {Object} data
         * @param {Function} callback
         */
        saveAccountInfo: function (data, callback) {
            var options = {};

            options.cache = false;
            options.complete = function (resp) {
                try {
                    var response = JSON.parse(resp.responseText);
                } catch (e) {
                    response = resp.responseText || resp;
                };

                callback(response);
            };
            options.contentType = "application/json;charset=UTF-8";
            options.data = JSON.stringify(data);
            options.error = function() {
                AMA.error("Request returned an error");
            };
            options.url = this._buildUpdateUrl(DashboardData.URL.KEYWORDS.UPDATE_EMAIL);

            this.sync("update", this, options);
        },

        /* Updates account password
         *
         * @param {Object} data
         * @param {Function} callback
         */
        saveNewPassword: function (data, callback) {
            var options = {},
                buildUrlOptions = {
                    endpointId: true
                };

            options.cache = false;
            options.complete = function (resp) {
                var response = resp.responseText || resp;
                callback(JSON.parse(response) || response);
            };
            options.contentType = "application/json;charset=UTF-8";
            options.data = JSON.stringify(data);
            options.error = function() {
                var data = {
                    "error" : "Invalid Password"
                };
                callback(data);
            };
            options.url = this._buildUpdateUrl(DashboardData.URL.KEYWORDS.CHANGE_PASSWORD, buildUrlOptions);

            this.sync("update", this, options);
        },

        /* Updates account security question and answer
         *
         * @param {Object} data
         * @param {Function} callback
         */
        saveSecurityQA: function (data, callback) {
            var options = {};

            options.cache = false;
            options.callback = callback;
            options.complete = function (resp) {
                callback(true, resp.responseText === AMA.config.accountDetails.accountId ? resp.responseText : JSON.parse(resp.responseText));
            };
            options.success = function () {
                callback(true, this.responseText === AMA.config.accountDetails.accountId ? this.responseText : JSON.parse(this.responseText));
            };
            options.contentType = "application/json;charset=UTF-8";
            options.data = JSON.stringify(data);
            options.error = function() {
                AMA.error("Request returned an error");
            };
            options.url = this._buildUpdateUrl(DashboardData.URL.KEYWORDS.SECURE_ACCOUNT_PREFERENCES);

            this.sync("update", this, options);
        }
    });
})();