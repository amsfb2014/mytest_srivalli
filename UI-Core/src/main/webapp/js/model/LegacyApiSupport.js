/* LegacyApiSupport */
(function () {
	//if (!AMA.config.useLegacyApi) return;

    var LegacyBaseDataMethods = {
        sync: function (method, model, options) {
            // Default JSON-request options.
            var params = {
                type: "POST",
                dataType: "json"
            };

            // Default options, unless specified.
            _.defaults(options || (options = {}), {
                emulateHTTP: Backbone.emulateHTTP,
                emulateJSON: Backbone.emulateJSON
            });

            // Ensure that we have a URL.
            if (!options.url) {
                params.url = _.result(model, "url") || urlError();
            }

            // Ensure that we have the appropriate request data.
            if (options.data == null && model && (method === "create" || method === "update" || method === "patch")) {
                params.contentType = "application/json";
                params.data = JSON.stringify(options.attrs || model.toJSON(options));
            }

            // For older servers, emulate JSON by encoding the request into an HTML-form.
            if (options.emulateJSON) {
                params.contentType = "application/x-www-form-urlencoded";
                params.data = params.data ? {model: params.data} : {};
            }

            // For older servers, emulate HTTP by mimicking the HTTP method with `_method`
            // And an `X-HTTP-Method-Override` header.
            if (options.emulateHTTP && (type === "PUT" || type === "DELETE" || type === "PATCH")) {
                params.type = "POST";
                if (options.emulateJSON) params.data._method = type;
                var beforeSend = options.beforeSend;
                options.beforeSend = function(xhr) {
                    xhr.setRequestHeader("X-HTTP-Method-Override", type);
                    if (beforeSend) return beforeSend.apply(this, arguments);
                };
            }

            // If we're sending a `PATCH` request, and we're in an old Internet Explorer
            // that still has ActiveX enabled by default, override jQuery to use that
            // for XHR instead. Remove this line when jQuery supports `PATCH` on IE8.
            if (params.type === "PATCH" && window.ActiveXObject &&
                !(window.external && window.external.msActiveXFilteringEnabled)) {
                params.xhr = function() {
                    return new ActiveXObject("Microsoft.XMLHTTP");
                };
            }

            // Make the request, allowing the user to override any Ajax options.
            var xhr = options.xhr = Backbone.ajax(_.extend(params, options));
            model.trigger("request", model, xhr, options);
            return xhr;
        },

        parse: function (resp) {
            var list = [],
                i, j,
                item = null,
                data = null,
                o = null,
                key = "",
                fields = this.constructor.LEGACY_RECORD_TYPE.fields;

            // Lookup field name based on field ID
            function getFieldName (id) {
                var k;
                for (k in fields) {
                    if (id.indexOf(fields[k]) == 0) return k;
                }
                return false;
            }

            for (i = 0; i < resp.length; i++) {
                item = resp[i];

                // Ignore this record if it is not the expected type
                if (item.rt !== this.constructor.LEGACY_RECORD_TYPE.id) continue;

                o = {};

                // Set the id to the value of "ri"
                if (item.ri) {
                    o.id = item.ri;
                }

                // Get the field values from "dt"
                data = item.dt;
                if (data && typeof data === "object") {
                    for (j in data) {
                        key = getFieldName(j);
                        if (key) {
                            if (o[key]) {
                                if (o[key+"2"]) {
                                    o[key+"3"] = data[j];
                                } else {
                                    o[key+"2"] = data[j];
                                }
                            } else {
                                o[key] = data[j];
                            }
                        }
                    }
                }

                // Get the meta information from the rest of the record fields
                o._meta = {};
                for (j in item) {
                    if (j === "ri") continue;
                    o._meta[j] = item[j];
                }

                list.push(o);
            }

            return list;
        },

        _configureUrl: function () {
            this.url = AMA.config.legacyApiBaseUrl + "/records.poo?";
        },

        _configureFetchOptions: function (options) {
            options.data = {
                method: "retrieve",
                recordtype: this.constructor.LEGACY_RECORD_TYPE.id,
                csrfvalue: AMA.config.csrfToken
            };
        }
    };


    var UserData = AMA.model.UserData;
    if (UserData) {

        UserData.actionMethods = {
            UPDATE_VISIBILITY: "setEnabledDataInAccount",
            ADD_TO_DEVICE: "addToEndpoint",
            REMOVE_FROM_DEVICE: "deleteFromEndpoint",
            addToGroup: "addToGroup",
            removeFromGroup: "removeFromGroup"
        };

        var LegacyUserDataMethods = {};
        _.extend(LegacyUserDataMethods, LegacyBaseDataMethods, {

            sync: function(method, model, options) {
                var defaults = {};
                if(method === "update") {
                    var clonedData = model.toJSON();
                    var dataSet = [];
                    var o = this;
                    _.each(clonedData, function(item, index) {
                        var data = {
                            dt: {},
                            vi: parseInt(item.status),
                            ri: item.id,
                            // This is basically just the fullname but it seems to always be blank?
                            se: item._meta.se,
                            sh: item._meta.sh,
                            io: item._meta.io,  // this should had been parsed
                            vo: item.onPhone ? [AMA.currentEndpoint] : [],
                            pd: item.pendingDelete ? [AMA.currentEndpoint] : [],
                            ic: item.isCurrent,  // this should had been parsed
                            dg: item._meta.dg,
                            cp: item._meta.cp,
                            pc: item.pendingCreate ? [AMA.currentEndpoint] : [],
                            oai: item._meta.oai,  // this should had been parsed
                            pu: item.pendingUpdate ? [AMA.currentEndpoint] : [],
                            rt: item._meta.rt
                        };

                        // populates dt
                        dataSet.push(o._prepareData(item, data, model.statusUpdated));
                    });

                    var defaults = {
                        url: this.url+"?"+$.param(this._getParams(model, {csrfvalue: AMA.config.csrfToken})),
                        wait: true,
                        cache : false,
                        contentType : "application/json; charset=utf-8",
                        data: model.statusUpdated ? JSON.stringify(dataSet) : encodeURIComponent(JSON.stringify(dataSet)),
                        dataType: "json"
                    };

                    options = options || {};

                    options.success = options.success || function(data, resp, xhr) {
                        if (resp != null && !resp.failures)
                        {
                            var items = o.parse(data),
                            // Hack to find photos in returned data (used below)
                                photosData = _.find(data, function (item){
                                    return item.rt === AMA.config.legacyRecordTypes.PHOTO.id;
                                }),
                            // Hack to find videos in returned data (used below)
                                videosData = _.find(data, function (item){
                                    return item.rt === AMA.config.legacyRecordTypes.VIDEO.id;
                                });

                            o.set(items, {remove: false});

                            // Hack below to invalidate photos/videos models when present in data
                            // TODO: Remove hack
                            if (photosData) {
                                AMA.models.photos.invalidate();
                            }
                            if (videosData) {
                                AMA.models.videos.invalidate();
                            }

                            // right now, we're unsure whether this model is moved to trash, permanently deleted or restored, so we trigger collect
                            // for that trash will be re-collected
                            o.trigger("collect");
                        }
                    };

                    options.error = options.error || function(xhr) {
                        model.trigger("error", model, xhr, options);
                    };

                    model.statusUpdated = false;
                    model.mustAddToPhone = false;
                    model.mustRemoveFromPhone = false;
                }
                _.extend(defaults, options);

                return LegacyBaseDataMethods.sync.call(this, method, model, defaults || {});
            },

            parse: function (resp) {
                var conf = AMA.config,
                    endpoint = AMA.currentEndpoint;

                var list = LegacyBaseDataMethods.parse.call(this, resp);

                // Filter out the 'purged' items here
                list = _.reject(list, function (item) {
                    return item._meta[conf.legacyMetaFields.visibility] === UserData.Status.PURGED;
                });

                _.each(list, function (item, idx) {
                    item.isCurrent = item._meta[conf.legacyMetaFields.isCurrent];
                    item.status = item._meta[conf.legacyMetaFields.visibility];
                    item.onPhone = _.contains(item._meta[conf.legacyMetaFields.visible], endpoint);
                    item.pendingCreate = _.contains(item._meta[conf.legacyMetaFields.pendingCreate], endpoint);
                    item.pendingDelete = _.contains(item._meta[conf.legacyMetaFields.pendingDelete], endpoint);
                    item.pendingUpdate = _.contains(item._meta[conf.legacyMetaFields.pendingUpdate], endpoint);
                });

                // TODO: Move all items with item.status == "trashed" to Trash
                // by triggering a "ITEM_TRASHED" event passing the model object as event detail

                return list;
            },


            trash: function (id) {
                this.get(id).set("status", UserData.Status.TRASHED, {silent:true});
                this.statusUpdated = true;
            },

            restore: function (id) {
                this.get(id).set("status", UserData.Status.ENABLED, {silent:true});
                this.statusUpdated = true;
            },

            purge: function (id) {
                this.get(id).set("status", UserData.Status.PURGED, {silent:true});
                this.statusUpdated = true;
            },

            addToPhone: function (id) {
                var item = this.get(id);

                if (item.get("onPhone"))
                    item.set("pendingDelete", false, {silent:true});
                item.set("pendingCreate", true, {silent:true});

                this.mustAddToPhone = true;
            },

            removeFromPhone: function (id) {
                var item = this.get(id);

                item.set("pendingDelete", true, {silent:true});

                this.mustRemoveFromPhone = true;
            },

            _getParams: function (model, params) {
                params = params || {};
                if (model.statusUpdated) {
                    params.method = UserData.actionMethods.UPDATE_VISIBILITY;
                } else if (model.mustAddToPhone) {
                    params.endpointid = AMA.currentEndpoint;
                    params.method = UserData.actionMethods.ADD_TO_DEVICE;
                } else if (model.mustRemoveFromPhone) {
                    params.endpointid = AMA.currentEndpoint;
                    params.method = UserData.actionMethods.REMOVE_FROM_DEVICE;
                } else {
                    params.method = "updateInAccount";
                }
                return params;
            },

            _prepareData : function(data, dataSet) {
                var setData = dataSet;

                var fields = AMA.config.legacyRecordTypes.CONTACT.fields;
                if (data._meta.rt == AMA.config.legacyRecordTypes.PHOTO.id) {
                    fields = AMA.config.legacyRecordTypes.PHOTO.fields;
                } else if (data._meta.rt == AMA.config.legacyRecordTypes.VIDEO.id) {
                    fields = AMA.config.legacyRecordTypes.VIDEO.fields;
                }
                _.each(data, function(value, key) {
                    var legacyField = fields[key];
                    if(typeof legacyField !== "undefined") {
                        var count = legacyField.split("-");
                        if (value !== "") {
                            if(count.length == 2) {
                                setData.dt[legacyField+"-0-0"] = value;
                            } else {
                                setData.dt[legacyField] = value;
                            }
                        }
                    }
                });

                return setData;
            }
        });
    }


	var BaseData = AMA.model && AMA.model.BaseData;
	AMA.assert(BaseData, "LegacyApiSupport requires AMA.model.BaseData class to be defined.");

    var legacyModels = AMA.config && AMA.config.legacyModels;
    if (!legacyModels) return;


	var Endpoints = AMA.model.Endpoints;
	if (Endpoints && _.contains(legacyModels, "Endpoints")) {

        _.extend(Endpoints.prototype, LegacyBaseDataMethods);

		_.extend(Endpoints.prototype, {

			fetch: function() {
				var o = this,
				options = {
						url: AMA.config.legacyApiBaseUrl + "/account.poo?method=retrieveEndpoints&csrfvalue="+AMA.config.csrfToken,
						success: function(resp) {
							o.parse(resp);
						}
				};
				return BaseData.prototype.fetch.call(this, options);
			},

			parse: function(resp) {
				var data = resp[0];

				if (data) {
					var fields = AMA.config.legacyRecordTypes.CONTACT.fields;
					function getFieldName (id) {
						var k;
						for (k in fields) {
							if (id.indexOf(fields[k]) == 0) return k;
						}
						return false;
					}

					var maxchars = {};
					_.each(data.maxchars, function(value, key, obj) {
						var field = getFieldName(key);
						if (field) {
							if (maxchars[field]) {
								if (maxchars[field+"2"]) {
									maxchars[field+"3"] = data.maxchars[key];
								} else {
									maxchars[field+"2"] = data.maxchars[key];
								}

							} else {
								maxchars[field] = data.maxchars[key];
							}
						}
					});
					data.maxchars = maxchars;
				}

				return resp;
			},

			_configureFetchOptions: function (options) {}
		});
	}


	var DashboardData = AMA.model.DashboardData;
	if (DashboardData && _.contains(legacyModels, "DashboardData")) {

        _.extend(DashboardData.prototype, LegacyBaseDataMethods);

		_.extend(DashboardData.prototype, {

			fetch: function() {
				var o = this,
				options = {
						url: AMA.config.legacyApiBaseUrl + "/webapi.poo?method=getAccountInfo&csrfvalue="+AMA.config.csrfToken,
						success: function(resp) {
							o.parse(resp);
						}
				};
				return BaseData.prototype.fetch.call(this, options);
			},

			parse: function(resp) {
				return resp;
			},

			_configureFetchOptions: function (options) {

			}

		});
	}


	var Contacts = AMA.model.Contacts;
	if (Contacts && _.contains(legacyModels, "Contacts")) {

        _.extend(Contacts.prototype, LegacyUserDataMethods);

		_.extend(Contacts.prototype, {

			add: function(model, options) {
				if (model.attributes) {
					var toParse = [ model.attributes[0] ];
					model = this.parse(toParse);
				}
				return BaseData.prototype.add.call(this, model, options);
			},

			create: function (data, options) {
				// this.add(data);
				var o = this,
				urlParams = {
						method : "createInAccount",
						csrfvalue : AMA.config.csrfToken
				},

				defaults = {
						url: this.url+"?"+$.param(urlParams),
						wait: true,
						contentType: "application/json; charset=utf-8",
						dataType: "json",
						emulateHTTP: true
				},

				dataSet = {
						dt: {},
						cp: {},
						rt: 33620224,
						pc: data.pendingCreate ? [AMA.currentEndpoint] : []
				},
				setData = this._prepareData(data, dataSet);
				_.extend(defaults, options);

				return BaseData.prototype.create.call(this, setData, defaults);
			},
			_prepareData : function(data, dataSet, statusUpdated) {
				var setData = dataSet;

				function getFullLegacyField (id, index) {
					if(!data || !data._meta) { return false; }
					for (field in data._meta.dt) {
						if (field.indexOf(id) > -1) {
							index--;
							if (index == 0) {
								return field;
							}
						}
					}
					return false;
				}

				_.each(data, function(value, key) {
					var legacyField = AMA.config.legacyRecordTypes.CONTACT.fields[key];

					var list = {
							cellPhone : 1,
							cellPhone2 : 2,
							cellPhone3 : 3,
							workPhone : 1,
							workPhone2 : 2,
							workPhone3 : 3,
							email : 1,
							email2 : 2,
							email3 : 3,
							im : 1,
							im2 : 2,
							im3 : 3
					};

					if (list[key]) {
						var fullField = getFullLegacyField(legacyField, list[key]);
						if (fullField) {
							legacyField = fullField;
						} else {
							if (setData.dt[legacyField + "-0-0"]) {
								if (setData.dt[legacyField + "-0-1"]) {
									legacyField = legacyField + "-0-2";
								} else {
									legacyField = legacyField + "-0-1";
								}
							} else {
								legacyField = legacyField + "-0-0";
							}
						}
					}

					if(typeof legacyField !== "undefined") {
						var count = legacyField.split("-");
						if (value !== "") {
							if(count.length == 2) {
								setData.dt[legacyField+"-0-0"] = value;
								if (!statusUpdated) {
									if(setData.cp) setData.cp[legacyField+"-0-0"] = {};
									if(setData.se) setData.se[legacyField+"-0-0"] = [0];
								}
							} else {
								setData.dt[legacyField] = value;
								if (!statusUpdated) {
									if(setData.cp) setData.cp[legacyField] = {};
									if(setData.se) setData.se[legacyField] = [0];
								}
							}
						}
					}
				});

				return setData;
			}
		});
		Contacts.LEGACY_RECORD_TYPE = AMA.config.legacyRecordTypes.CONTACT;
	}

	var Photos = AMA.model.Photos;
	if (Photos && _.contains(legacyModels, "Photos")) {
		Photos.LEGACY_RECORD_TYPE = AMA.config.legacyRecordTypes.PHOTO;

        _.extend(Photos.prototype, LegacyUserDataMethods);

		_.extend(Photos.prototype, {

			parse: function (resp) {
				var i, j, obj,
				list = [],
				data = null,
				item = null;

				function getFieldName (data, id) {
					var k;
					for (k in Photos.LEGACY_RECORD_TYPE.fields) {
						if (id == Photos.LEGACY_RECORD_TYPE.fields[k])
							return k;
						else if (data[id].toString().indexOf(Photos.LEGACY_RECORD_TYPE.fields[k]) > -1)
							return k;
					}
					return false;
				}

				for (i = 0; i < resp.length; i++) {
					item = resp[i];

					// Ignore this record if it is not the expected type
					if (item.rt !== this.constructor.LEGACY_RECORD_TYPE.id) continue;

					obj = {};

					// Set the id to the value of "ri"
					if (item.ri) {
						obj.id = item.ri;
					}

					// Get the field values from "dt"
					data = item.dt;
					if (data && typeof data === "object") {
						for (j in data) {
							key = getFieldName(data, j);
							if (key) {
								obj[key] = data[j];
							}
						}
					}

					// Get the meta information from the rest of the record fields
					obj._meta = {};
					for (j in item) {
						if (j === "ri") continue;
						obj._meta[j] = item[j];
					}

					list.push(obj);
				}

				_.each(list, function (item, idx) {
					var conf = AMA.config,
					endpoint = AMA.currentEndpoint;

					item.isCurrent = item._meta[conf.legacyMetaFields.isCurrent];
					item.status = item._meta[conf.legacyMetaFields.visibility];
					item.onPhone = _.contains(item._meta[conf.legacyMetaFields.visible], endpoint);
					item.pendingCreate = _.contains(item._meta[conf.legacyMetaFields.pendingCreate], endpoint);
					item.pendingDelete = _.contains(item._meta[conf.legacyMetaFields.pendingDelete], endpoint);
					item.pendingUpdate = _.contains(item._meta[conf.legacyMetaFields.pendingUpdate], endpoint);
				});

				return list;
			}
		});
	}

	var Videos = AMA.model.Videos;
	if (Videos && _.contains(legacyModels, "Videos")) {
		Videos.LEGACY_RECORD_TYPE = AMA.config.legacyRecordTypes.VIDEO;

        _.extend(Videos.prototype, LegacyUserDataMethods);

		_.extend(Videos.prototype, {

			parse: function (resp) {
				var i, j, obj,
				list = [],
				data = null,
				item = null;

				function getFieldName (data, id) {
					var k;
					for (k in Videos.LEGACY_RECORD_TYPE.fields) {
						if (id == Videos.LEGACY_RECORD_TYPE.fields[k])
							return k;
						else if (data[id].toString().indexOf(Videos.LEGACY_RECORD_TYPE.fields[k]) > -1)
							return k;
					}
					return false;
				}

				for (i = 0; i < resp.length; i++) {
					item = resp[i];

					// Ignore this record if it is not the expected type
					if (item.rt !== this.constructor.LEGACY_RECORD_TYPE.id) continue;

					obj = {};

					// Set the id to the value of "ri"
					if (item.ri) {
						obj.id = item.ri;
					}

					// Get the field values from "dt"
					data = item.dt;
					if (data && typeof data === "object") {
						for (j in data) {
							key = getFieldName(data, j);
							if (key && !obj[key]) {
								obj[key] = data[j];
							}
						}
					}

					// Get the meta information from the rest of the record fields
					obj._meta = {};
					for (j in item) {
						if (j === "ri") continue;
						obj._meta[j] = item[j];
					}

					list.push(obj);
				}

				_.each(list, function (item, idx) {
					var conf = AMA.config,
					endpoint = AMA.currentEndpoint;

					item.isCurrent = item._meta[conf.legacyMetaFields.isCurrent];
					item.status = item._meta[conf.legacyMetaFields.visibility];
					item.onPhone = _.contains(item._meta[conf.legacyMetaFields.visible], endpoint);
					item.pendingCreate = _.contains(item._meta[conf.legacyMetaFields.pendingCreate], endpoint);
					item.pendingDelete = _.contains(item._meta[conf.legacyMetaFields.pendingDelete], endpoint);
					item.pendingUpdate = _.contains(item._meta[conf.legacyMetaFields.pendingUpdate], endpoint);
				});

				return list;
			}
		});
	}


	var Trash = AMA.model.Trash;
	if (Trash && _.contains(legacyModels, "Trash")) {
		Trash.LEGACY_RECORD_TYPE = {};

        _.extend(Trash.prototype, LegacyUserDataMethods);

		_.extend(Trash.prototype, {
			trashedContacts: [],
			trashedPhotos: [],
			trashedVideos: [],
			initialize: function () {
				Trash.__super__.initialize.apply(this, arguments);

				var o = this;
				// Make sure that as soon as the Contacts, Photos and Videos data are fetched,
				// collect the trash from those collections
				if (AMA.models.contacts) {
					AMA.models.contacts.on("reset", function () {
						o._collectContacts.call(o);
					});
					AMA.models.contacts.on("collect", function () {
						o._collectContacts.call(o);
					});
				}
				if (AMA.models.photos) {
					AMA.models.photos.on("reset", function () {
						o._collectPhotos.call(o);
					});
					AMA.models.photos.on("collect", function () {
						o._collectPhotos.call(o);
					});
				}
				if (AMA.models.videos) {
					AMA.models.videos.on("reset", function () {
						o._collectVideos.call(o);
					});
					AMA.models.videos.on("collect", function () {
						o._collectVideos.call(o);
					});
				}
			},

			sync: function (method, collection, options) {
				var contacts = [],
				photos = [],
				videos = [];

				_.each(collection.models, function(model) {
					if (model.constructor === AMA.model.Contacts.MODEL) {
						contacts.push(model);
					} else if (model.constructor === AMA.model.Photos.MODEL) {
						photos.push(model);
					} else if (model.constructor === AMA.model.Videos.MODEL) {
						videos.push(model);
					}
				});

				if (contacts.length > 0) {
					AMA.models.contacts.sync("update", new AMA.model.Contacts(contacts));
				}
				if (photos.length > 0) {
					AMA.models.photos.sync("update", new AMA.model.Photos(photos));
				}
				if (videos.length > 0) {
					AMA.models.videos.sync("update", new AMA.model.Videos(videos));
				}
			},

			fetch: function () {
				if (AMA.models.contacts && !AMA.models.contacts.isLoaded) AMA.models.contacts.fetch();
				if (AMA.models.photos && !AMA.models.photos.isLoaded) AMA.models.photos.fetch();
				if (AMA.models.videos && !AMA.models.videos.isLoaded) AMA.models.videos.fetch();
			},

			_collectContacts: function () {
				this.trashedContacts = [];
				this._collectTrashed(AMA.models.contacts, this.trashedContacts);
				this._checkIfAllTrashCollected();
			},

			_collectPhotos: function () {
				this.trashedPhotos = [];
				this._collectTrashed(AMA.models.photos, this.trashedPhotos);
				this._checkIfAllTrashCollected();
			},

			_collectVideos: function() {
				this.trashedVideos = [];
				this._collectTrashed(AMA.models.videos, this.trashedVideos);
				this._checkIfAllTrashCollected();
			},

			_collectTrashed: function (collection, trashed) {
				var ids = [],
				removed = false,
				models = collection.models;

				_.each(models, function(model, index) {
					if (model.get("status") === AMA.model.UserData.Status.TRASHED) {
						ids.push(model.get("id"));
					} else {
						// if ever we find the model that were now not trashed(probabaly restored), let's remove that model from trash
						if (this.get(model.get("id"))) {
							this.remove(model, {silent: true});
							removed = true;
						}
					}
				}, this);

				if (removed) {
					this.trigger("remove");
				}

				removed = false;

				_.each(ids, function(id, index) {
					var model = collection.get(id);
					if (model) {
						trashed.push(model);
						collection.remove(model, {silent:true});
						removed = true;
					}
				}, this);

				if (removed) {
					collection.trigger("remove");
				}
			},

			_checkIfAllTrashCollected: function () {
				var trashed = this.trashedContacts.concat(this.trashedPhotos).concat(this.trashedVideos);

				//suppress the event triggered
				this.set(trashed, {remove: false, silent: true});
				this.trigger("change");

				var allCollected = AMA.models.contacts.isLoaded && AMA.models.photos.isLoaded &&
				AMA.models.videos.isLoaded;

				if (!allCollected) return;
				this.trigger("reset");
			}

		});

	}

	var SettingsDataParser = function (obj, resp, fields) {
		var i, j, o, key, item, data, list = [];

		function getFieldName (id) {
			var k;
			for (k in fields) {
				if (data[id].indexOf(fields[k]) > -1)
					return k;
			}
			return false;
		}

		for (i = 0; i < resp.length; i++) {
			item = resp[i];

			// Ignore this record if it is not the expected type
			if (item.rt !== obj.constructor.LEGACY_RECORD_TYPE.id) continue;

			o = {};

			// Set the id to the value of "ri"
			if (item.ri) {
				o.id = item.ri;
			}

			// Get the field values from "dt"
			data = item.dt;
			if (data && typeof data === "object") {
				for (j in data) {
					key = getFieldName(j);
					if (key) {
						if (o[key]) {
							if (o[key+"2"]) {
								o[key+"3"] = data[j];
							} else {
								o[key+"2"] = data[j];
							}
						} else {
							o[key] = data[j].substr(data[j].indexOf("=") + 1);
						}
					}
				}
			}

			// Get the meta information from the rest of the record fields
			o._meta = {};
			for (j in item) {
				if (j === "ri") continue;
				o._meta[j] = item[j];
			}

			list.push(o);
		}
		return list;
	};


	var SyncSettings = AMA.model.SyncSettings;
	if (SyncSettings && _.contains(legacyModels, "SyncSettings")) {
		SyncSettings.LEGACY_RECORD_TYPE = AMA.config.legacyRecordTypes.ACCOUNT_SETTINGS;

        _.extend(SyncSettings.prototype, LegacyBaseDataMethods);

		_.extend(SyncSettings.prototype, {

			parse: function (resp) {
				var fields = AMA.config.legacyRecordTypes.ACCOUNT_SETTINGS.syncSettingsFields;

				var list = [];

				var index = 0;
				if(resp.length > 1){
					for(var i = 0; i < resp.length; i++){
						if(resp[i].ic === true){
							index = i;
							AMA.debug("IC - is current, INDEX VALUE: " + index);
						}
					}
				}

				if(resp[index] !== null && resp[index] !== undefined && resp[index] !== ''){
					if(resp[index].ri !== null && resp[index].ri !== undefined && resp[index].ri !== ''){
						list = SettingsDataParser(this, [resp[index]], fields);
					}
				}

				return list;
			},

			sync: function(method, model, options) {
				var defaults = {};

				if(method === "update") {
					var dataSet = [];
					var o = this;

					var prefix = "2U-01";
					var syncSettingsField = {};
					var backupData = [];

					syncSettingsFields = AMA.config.legacyRecordTypes.ACCOUNT_SETTINGS.syncSettingsFields;
					backupData =[
					             syncSettingsFields.autobackup_frequency + "=" + model.get("autobackup_frequency"),
					             syncSettingsFields.autobackup_minimum_battery_level + "=" + model.get("autobackup_minimum_battery_level"),
					             syncSettingsFields.autobackup_pictures + "=" + model.get("autobackup_pictures"),
					             syncSettingsFields.autobackup_videos + "=" + model.get("autobackup_videos"),
					             syncSettingsFields.autobackup_contacts + "=" + model.get("autobackup_contacts"),
					             syncSettingsFields.autobackup_wifi + "=" + model.get("autobackup_wifi"),
					             syncSettingsFields.autobackup_carrier + "=" + model.get("autobackup_carrier"),
					             syncSettingsFields.autobackup_day + "=" + model.get("autobackup_day"),

					             syncSettingsFields.locationcheck_on + "=" + model.get("locationcheck_on"),
					             syncSettingsFields.gps_interval + "=" + model.get("gps_interval"),
					             syncSettingsFields.gps_battery + "=" + model.get("gps_battery")
					             ];

					var dtData = {};

					_.each(backupData, function(value, key){
						dtData[prefix + "-0-" + key] = value;
					});

					var data = {
						dt: dtData,
						vi: 0,
						ri: o.models[0].get("id"),
						io: true,  // this should had been parsed
						rt: AMA.config.legacyRecordTypes.ACCOUNT_SETTINGS.id
					};

					dataSet.push(data);

					var defaults = {
							url: this.url+"?"+$.param(this._getParams(model, {csrfvalue: AMA.config.csrfToken})),
							wait: true,
							cache : false,
							contentType : "application/json; charset=utf-8",
							data: model.statusUpdated ? JSON.stringify(dataSet) : encodeURIComponent(JSON.stringify(dataSet)),
									dataType: "json"
					};

					options = options || {};

					options.success = options.success || function(data, resp, xhr) {
						if (resp != null && !resp.failures)
						{
							var items = o.parse(data);
						}
					};

					options.error = options.error || function(xhr) {
						model.trigger("error", model, xhr, options);
					};

				}

				_.extend(defaults, options);

				return LegacyBaseDataMethods.sync.call(this, method, model, defaults || {});
			},

			_getParams: function (model, params) {
				params = params || {};
				params.method = "updateInAccount";

				return params;
			}

		});
	}


	var DeviceSettings = AMA.model.DeviceSettings;
	if (DeviceSettings && _.contains(legacyModels, "DeviceSettings")) {
		DeviceSettings.LEGACY_RECORD_TYPE = AMA.config.legacyRecordTypes.ACCOUNT_SETTINGS;

        _.extend(DeviceSettings.prototype, LegacyBaseDataMethods);

		_.extend(DeviceSettings.prototype, {
            _configureUrl: function () {
                this.url = AMA.config.legacyApiBaseUrl + "/records.poo?";
            },
			parse: function (resp) {
				var fields = AMA.config.legacyRecordTypes.ACCOUNT_SETTINGS.deviceSettingsFields,
				list = SettingsDataParser(this, resp, fields);

				return list;
			}
		});
	}

	var Locations = AMA.model.Locations;
	if (Locations && _.contains(legacyModels, "Locations")) {
		Locations.LEGACY_RECORD_TYPE = AMA.config.legacyRecordTypes.LOCATIONS;

        _.extend(Locations.prototype, LegacyBaseDataMethods);

		_.extend(Locations.prototype, {

			parse: function (resp) {
				var i, list = [],
				item = null,
				o = null,
				data = null,
				fields = this.constructor.LEGACY_RECORD_TYPE.fields;

				function getFieldName (id) {
					var k;
					for (k in fields) {
						if (id.indexOf(fields[k]) == 0) return k;
					}
					return false;
				}

				for (i = 0; i < resp.length; i++) {
					item = resp[i];

					// Ignore this record if it is not the expected type
					if (item.rt !== this.constructor.LEGACY_RECORD_TYPE.id ||
							(AMA.config.locationConsolidation && (resp.length > 1 && item.ri != -2)) ||
							(!AMA.config.locationConsolidation && (resp.length > 1 && i > 0)))
						continue;

					o = {};

					// Set the id to the value of "ri"
					if (item.ri) {
						o.id = item.ri;
					}

					// Get the field values from "dt"
					data = item.dt;
					if (data && typeof data === "object") {
						for (j in data) {
							var key = getFieldName(j);
							if (key) {
								var chunk = j.split("-");
								var index = parseInt(chunk[3]);
								if (list[index]) {
									list[index][key] = data[j];
								} else {
									list[index] = {};
									list[index].id = index;
									list[index][key] = data[j];
								}
							}
						}
					}
				}
				return list.reverse();
			},

			clearDuplicateLocations: function () {
				var previousLocation;
				//Go through the list of location records and merge records with the same timestamp.
				AMA.debug("clearDuplicateLocations - Locations.models.length: " + this.models.length);
				var toRemove = [];
				for (var i = 0; i < this.models.length; i++) {
					var model = this.models[i];
					var currentLatLong = model.get("coordinates");
					if (previousLocation) {
						var previousLatLong = previousLocation.get("coordinates");
						if(previousLatLong == currentLatLong) {
							AMA.debug("clearDuplicateLocations - previousLatLong == currentLatLong: " + currentLatLong);

							previousLocation.set("timeRange", model.get("time"), {silent: true});
							AMA.debug("clearDuplicateLocations - timeRange: " + previousLocation.get("timeRange"));
							AMA.debug("clearDuplicateLocations - time: " + previousLocation.get("time"));

							var accuracy = model.get("accuracy");
							if(accuracy < previousLocation.get("accuracy")) {
								previousLocation.set("accuracy", accuracy, {silent:true});
							}
							//remove this location model, only use the latest.
							this.remove(model, {silent:true});
							i--;
							continue;
						}
					}
					previousLocation = model;
				}

				if (this.models.length < AMA.config.locationHistoryLimit) {
					this.numberOfPoints = this.models.length;
				} else {
					this.numberOfPoints = AMA.config.locationHistoryLimit;
				}
			},

			removeAll: function () {

			},

			sync: function (method, collection, options) {
				options = options || {};
				var defaults = {};
				if(method === "delete") {
					var params = $.param({
						method: "nuke",
						recordtype: this.constructor.LEGACY_RECORD_TYPE.id,
						csrfvalue: AMA.config.csrfToken
					});
					defaults = {
							url: this.url+"?"+params,
							wait: true,
							cache : false,
							contentType : "application/json; charset=utf-8",
							dataType: "json"
					};

					var o = this;
					options.success = options.success || function(data, resp, xhr) {
						o.reset([]);
					};

					options.error = options.error || function(xhr) {
						o.trigger("error", model, xhr, options);
					};
				}

				_.extend(defaults, options);
				return LegacyBaseDataMethods.sync.call(this, method, collection, defaults || {});
			}
		});
	}

	var EndpointHistory = AMA.model.EndpointHistory;
	if (EndpointHistory && _.contains(legacyModels, "EndpointHistory")) {
		EndpointHistory.LEGACY_RECORD_TYPE = AMA.config.legacyRecordTypes.STATUS;

        _.extend(EndpointHistory.prototype, LegacyBaseDataMethods);

		_.extend(EndpointHistory.prototype, {

			fetch: function() {
				var o = this,
				options = {
						url: AMA.config.legacyApiBaseUrl + "/records.poo?method=retrieveEndpointHistory&endpointid="+AMA.currentEndpoint+"&recordtype="+AMA.config.legacyRecordTypes.STATUS.id+"&max=10&desc=true&csrfvalue="+AMA.config.csrfToken,
						remove: false,
						merge:false,
						// url: AMA.config.legacyApiBaseUrl + "/records.poo?method=retrieveHistoryRecord&endpointid=0&recordtype=41943040&max=5&desc=true&csrfvalue="+AMA.config.csrfToken
						success: function(collection, resp) {
							return o.parse(resp)
						}
				};
				return BaseData.prototype.fetch.call(this, options);
			},

			parse: function(resp) {

				var list = [],
				i, j,
				item = null,
				data = null,
				o = null,
				key = "",
				fields = this.constructor.LEGACY_RECORD_TYPE.fields;

				// Lookup field name based on field ID
				function getFieldName (id) {
					var k;
					for (k in fields) {
						if (id.indexOf(fields[k]) == 0) return k;
					}
					return false;
				}

				for (i = 0; i < resp.length; i++) {
					item = resp[i];

					// Ignore this record if it is not the expected type
					if (item.rt !== this.constructor.LEGACY_RECORD_TYPE.id) continue;

					o = {};

					// Set the id to the value of "ri"
					// Overiding the re
					if (item.ri) {
						o.id = item.ri+""+i;
					}

					// Get the field values from "dt"
					data = item.dt;
					if (data && typeof data === "object") {
						for (j in data) {
							key = getFieldName(j);
							if (key) {
								if (o[key]) {
									if (o[key+"2"]) {
										o[key+"3"] = data[j];
									} else {
										o[key+"2"] = data[j];
									}
								} else {
									o[key] = data[j];
								}
							}
						}
					}

					// Get the meta information from the rest of the record fields
					o._meta = {};
					for (j in item) {
						if (j === "ri") continue;
						o._meta[j] = item[j];
					}

					list.push(o);
				}

				return list;
			},

			_configureFetchOptions: function (options) {}
		});
	}

})();