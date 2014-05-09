/*! Trash */
(function () {
    AMA.namespace("model");

    /**
     * Trash Collection, contains UserData with status TRASHED.
     *
     * @class Trash
     * @namespace view
     * @extends AMA.view.UserData
     * @constructor
     */
    var Trash = AMA.model.Trash = AMA.model.UserData.extend();

    Trash.OFFSET = 0;       // (Required value) Fetch offset, 0 means fetch from beginning of data
    Trash.LIMIT = 9999;     // (Required value) Limit for fetched items; 9999 is used to indicate fetch all data

    // Trash Collection Model constructor, Override functions goes here if Model needs additional implementation
    Trash.MODEL = AMA.model.UserData.MODEL.extend({

    });

    AMA.augment(Trash.prototype, {
        initialize: function () {
            Trash.__super__.initialize.apply(this);

            // Since this model doesn't really map to a single API resource,
            // individual capabilities for contacts/photos/videos apply.
            // The overall sync privileges should therefore be just all-true.
            this.syncPrivileges = {
                "create": true,
                "read": true,
                "update": true,
                "delete": true
            };

            this.resetTrash();
        },
        
        resetTrash: function () {
            this.trashedItems = [];
            
            this._isTrashedContactsLoaded = false;
            this._isTrashedContactsFetching = false;
            this._isTrashedPhotosLoaded = false;
            this._isTrashedPhotosFetching = false;
            this._isTrashedVideosLoaded = false;
            this._isTrashedVideosFetching = false;
            this._isDropdownTrash = false;
        },

        _configureFetchOptions: function (options) {
            if (options.contacts)
                this.url = AMA.config.apiHostUrl + "/contacts?";
            else if (options.photos)
                this.url = AMA.config.apiHostUrl + "/files?fileType=image&";
            else if (options.videos)
                this.url = AMA.config.apiHostUrl + "/files?fileType=video&";

            this.url +=
                $.param({
                    devId: AMA.config.devId,
                    endpointId: AMA.config.endpointId,
                    authToken: AMA.config.authToken,
                    status: AMA.model.UserData.Status.TRASHED,
                    offset: Trash.OFFSET,
                    limit: Trash.LIMIT
                });

            if (options && options.params && options.params.keyword) {
                this.url += "&" +
                    $.param({
                        keyword: options.params.keyword
                    });
            }
        },

        fetch: function (options) {
            if (this._isTrashedContactsFetching && this._isTrashedPhotosFetching && this._isTrashedVideosFetching)
                return;

            var self = this;
            if (AMA.models.capabilities.isFetching) {
                AMA.models.capabilities.on(AMA.model.BaseData.EVENT.LOADED, function () {
                    self.fetch(self.options);
                });
                return;
            }

            options = options || {};

            // Force reset
            options.reset = true;

            if (!this._isTrashedContactsLoaded && !this._isTrashedContactsFetching) {
                this._isTrashedContactsFetching = true;
                options.contacts = true;
            } else if (!this._isTrashedPhotosLoaded && !this._isTrashedPhotosFetching) {
                this._isTrashedPhotosFetching = true;
                options.contacts = false;
                options.photos = true;
            } else if (!this._isTrashedVideosLoaded && !this._isTrashedVideosFetching) {
                this._isTrashedVideosFetching = true;
                options.contacts = false;
                options.photos = false;
                options.videos = true;
            }

            this._configureFetchOptions(options);

            var complete = options.complete;

            if (AMA.Util.useXdr()) {
                options.success = function() {
                    if (arguments[0].url.indexOf("contacts") > -1 && arguments[0].isLoaded && self._isTrashedContactsFetching) {
                        self._isTrashedContactsLoaded = true;
                        self._isTrashedContactsFetching = false;
                    } else if (arguments[0].url.indexOf("image") > -1 && arguments[0].isLoaded && self._isTrashedPhotosFetching) {
                        self._isTrashedPhotosLoaded = true;
                        self._isTrashedPhotosFetching = false;
                    } else if (arguments[0].url.indexOf("video") > -1 && arguments[0].isLoaded && self._isTrashedVideosFetching) {
                        self._isTrashedVideosLoaded = true;
                        self._isTrashedVideosFetching = false;
                    }

                    if (self._isTrashedContactsLoaded && self._isTrashedPhotosLoaded && self._isTrashedVideosLoaded) {
                        self.unbind("add");
                    	_.each(self.trashedItems, function (item) {
                            self.add(item);
                        });
                        self.isLoaded = true;
                        self.isFetching = false;
                        
                        self.trigger(AMA.model.BaseData.EVENT.LOADED);
                    } else self.fetch(options);
                };
            } else {
                options.complete = _.bind(function() {
                    if (arguments[1] === "success" && this._isTrashedContactsFetching) {
                        this._isTrashedContactsLoaded = true;
                        this._isTrashedContactsFetching = false;
                    } else if (arguments[1] === "success" && this._isTrashedPhotosFetching) {
                        this._isTrashedPhotosLoaded = true;
                        this._isTrashedPhotosFetching = false;
                    } else if (arguments[1] === "success" && this._isTrashedVideosFetching) {
                        this._isTrashedVideosLoaded = true;
                        this._isTrashedVideosFetching = false;
                    }

                    if (this._isTrashedContactsLoaded && this._isTrashedPhotosLoaded && this._isTrashedVideosLoaded) {
                    	self.unbind("add");
                        _.each(this.trashedItems, function (item) {
                            self.add(item);
                        });
                        this.isLoaded = true;
                        this.isFetching = false;
                        this.trigger(AMA.model.BaseData.EVENT.LOADED);
                    } else this.fetch(options);
                }, this);
            }

            Backbone.Collection.prototype.fetch.call(this, options);
        },

        invalidate: function (options) {
            this.resetTrash();

            Trash.__super__.invalidate.call(this, options);
        },

        parse: function (resp) {
            if (this.trashedItems.length == 0) {
                this.trashedItems = resp.list;
            } else {
                var trashItems = this.trashedItems;

                for (i=0; i<resp.list.length; i++) {
                    trashItems.push(resp.list[i]);
                }
            }
        },

        // Override parent trash function as handling is different because items can be of mixed types
        trash: function (itemIds, callback) {
            if (itemIds.length < 1) {
                AMA.debug("No item IDs specified. Cancelling call to trash items.");
                callback(false);
            }

            var isContactDeletedOrRestored=false,
            isVideoDeletedOrRestored=false,
            isPhotoDeletedOrRestored=false;

            var msg, eventMsg = {};

            var contactsToPurge = {
                    id: AMA.config.endpointId,
                    list: [],
                    total: 0,
                    totalPendingSync: 0,
                    totalSynced: 0
                },
                photosToPurge = {
                    id: AMA.config.endpointId,
                    list: [],
                    total: 0,
                    totalPendingSync: 0,
                    totalSynced: 0,
                    keyword: ""
                },
                videosToPurge = {
                    id: AMA.config.endpointId,
                    list: [],
                    total: 0,
                    totalPendingSync: 0,
                    totalSynced: 0,
                    keyword: ""
                },
                self = this,
                trashModel = this.models,
                xhr1 = null,
                xhr2 = null,
                xhr3 = null;

            // Gather all the items to be purged from the Trash model 
            _.each(trashModel, function (item) {
                for (var i in itemIds) {
                    if (itemIds[i] === item.attributes.id) {
                        item.attributes.visibility = AMA.model.UserData.Status.PURGED;
                        if (item.attributes.fullName) {
                            contactsToPurge.list.push(item.attributes);
                            isContactDeletedOrRestored=true;
                        } else if (item.attributes.fileType && item.attributes.fileType.indexOf("image") > -1) {
                            photosToPurge.list.push(item.attributes);
                            isPhotoDeletedOrRestored=true;
                        } else if (item.attributes.fileType && item.attributes.fileType.indexOf("video") > -1) {
                            videosToPurge.list.push(item.attributes);
                            isVideoDeletedOrRestored=true;
                        }
                    }
                }
            });

            if(AMA.config.enableReporting) {
				if (this._isDropdownTrash) {
					if (this._isDropdownTrash) {
						if(isVideoDeletedOrRestored===true) {
							eventMsg['ActionPerformed'] = "Permanant Delete Videos - Action Performed Dropdown";
							AMA.debug("Reporting: logging event for video deleted permanantly");
							AMA.ReportingManager.reportUserAction(AMA.config.reportingEventTypes.actiondropdeletevideotrash,eventMsg);
						}
						if(isContactDeletedOrRestored===true)	{
							eventMsg['ActionPerformed'] = "Permanant Delete Contacts - Action Performed Dropdown";
							AMA.debug("Reporting: logging event for contact deleted permanantly");
							AMA.ReportingManager.reportUserAction(AMA.config.reportingEventTypes.actiondropdeletecontacttrash,eventMsg);
						}
						if(isPhotoDeletedOrRestored===true) {
							eventMsg['ActionPerformed'] = "Permanant Delete Images - Action Performed Dropdown";
							AMA.debug("Reporting: logging event for photo deleted permanantly");
							AMA.ReportingManager.reportUserAction(AMA.config.reportingEventTypes.actiondropdeleteimagetrash,eventMsg);
						}					
					}
				}
			}

            if (contactsToPurge.list.length < 1 && photosToPurge.list.length < 1 && videosToPurge.list.length < 1) {
                AMA.debug("Specified items not found in Trash. Aborting command.");
                callback(false);
            } else {
                if (AMA.Util.useXdr()) {
                    this.invalidateContacts = false;
                    this.invalidatePhotos = false;
                    this.invalidateVideos = false;
                    this.waitingContacts = true;
                    this.waitingPhotos = true;
                    this.waitingVideos = true;

                    if (contactsToPurge.list.length > 0) {
                        xhr1 = AMA.Util.createCORSRequest("POST", AMA.config.apiHostUrl + "/contacts?devId=" + AMA.config.devId + "&endpointId=" + AMA.config.endpointId + "&authToken=" + AMA.config.authToken + "&_method=PUT");

                        xhr1.onload = function () {
                            try {
                                var response = JSON.parse(this.responseText);
                            }
                            catch (e) {
                                AMA.error("POST /contacts - Trash - response not JSON: " + this.responseText);
                            }
                            
                            if (response) {
                                self.invalidateContacts = true;
                                self.waitingContacts = false;
                                self.checkWaiting(callback);
                            }
                        };
                        xhr1.onerror = function () {
                            AMA.error("Request failed: POST /contacts");
                        };
                        xhr1.onprogress = function () {};
                        xhr1.ontimeout = function () {};
                        xhr1.timeout = 100000; // Prevents IE9 from aborting the request

                        xhr1.send(JSON.stringify(contactsToPurge));
                    } else {
                        this.waitingContacts = false;
                    }

                    if (photosToPurge.list.length > 0) {
                        xhr2 = AMA.Util.createCORSRequest("POST", AMA.config.apiHostUrl + "/files?devId=" + AMA.config.devId + "&endpointId=" + AMA.config.endpointId + "&authToken=" + AMA.config.authToken + "&fileType=image&_method=PUT");

                        xhr2.onload = function () {
                            try {
                                var response = JSON.parse(this.responseText);
                            }
                            catch (e) {
                                 AMA.error("POST /files - Trash - response not JSON: " + this.responseText);
                            }

                            if (response) {
                                self.invalidatePhotos = true;
                                self.waitingPhotos = false;
                                self.checkWaiting(callback);
                            }
                        };
                        xhr2.onerror = function () {
                            AMA.error("Request failed: POST /files");
                        };
                        xhr2.onprogress = function () {};
                        xhr2.ontimeout = function () {};
                        xhr2.timeout = 100000; // Prevents IE9 from aborting the request
                        
                        xhr2.send(JSON.stringify(photosToPurge));
                    } else {
                        this.waitingPhotos = false;
                    }

                    if (videosToPurge.list.length > 0) {
                        xhr3 = AMA.Util.createCORSRequest("POST", AMA.config.apiHostUrl + "/files?devId=" + AMA.config.devId + "&endpointId=" + AMA.config.endpointId + "&authToken=" + AMA.config.authToken + "&fileType=video&_method=PUT");

                        xhr3.onload = function () {
                            try {
                                var response = JSON.parse(this.responseText);
                            }
                            catch (e) {
                                AMA.error("POST /files - Trash - response not JSON: " + this.responseText);
                            }

                            if (response) {
                                self.invalidateVideos = true;
                                self.waitingVideos = false;
                                self.checkWaiting(callback);
                            }
                        };
                        xhr3.onerror = function () {
                            AMA.error("Request failed: POST /files");
                        };
                        xhr3.onprogress = function () {};
                        xhr3.ontimeout = function () {};
                        xhr3.timeout = 100000; // Prevents IE9 from aborting the request

                        xhr3.send(JSON.stringify(videosToPurge));
                    } else {
                        this.waitingVideos = false;
                    }
                } else {
                    $.when(
                        $.ajax({
                            type: "PUT",
                            url: AMA.config.apiHostUrl + "/contacts?devId=" + AMA.config.devId + "&endpointId=" + AMA.config.endpointId + "&authToken=" + AMA.config.authToken,
                            data: JSON.stringify(contactsToPurge),
                            contentType: "application/json"
                        }),
                        $.ajax({
                            type: "PUT",
                            url: AMA.config.apiHostUrl + "/files?devId=" + AMA.config.devId + "&endpointId=" + AMA.config.endpointId + "&authToken=" + AMA.config.authToken + "&fileType=image",
                            data: JSON.stringify(photosToPurge),
                            contentType: "application/json"
                        }),
                        $.ajax({
                            type: "PUT",
                            url: AMA.config.apiHostUrl + "/files?devId=" + AMA.config.devId + "&endpointId=" + AMA.config.endpointId + "&authToken=" + AMA.config.authToken + "&fileType=video",
                            data: JSON.stringify(videosToPurge),
                            contentType: "application/json"
                        })
                    ).done(function (request1, request2, request3) {
                        var refreshContacts = request1[1] === "success" ? true : false,
                            refreshPhotos = request2[1] === "success" ? true : false,
                            refreshVideos = request3[1] === "success" ? true : false;

                        callback(refreshContacts, refreshPhotos, refreshVideos);
                    });
                }
            }
        },

        restore: function (itemIds, callback) {
            if (itemIds.length < 1) {
                AMA.debug("No item IDs specified. Cancelling call to restore items.");
                callback(false);
            }

            var self = this,
                contactsToRestore = [],
                photosToRestore = [],
                videosToRestore = [],
                trashModel = this.models,
                options = {};

            this.invalidateContacts = false;
            this.invalidatePhotos = false;
            this.invalidateVideos = false;
            this.waitingContacts = true;
            this.waitingPhotos = true;
            this.waitingVideos = true;

            // Gather all the items to be restored 
            _.each(trashModel, function (item) {
                var temp;

                temp = _.find(itemIds, function (currentId) {
                    return currentId === item.attributes.id;
                });

                if (temp && item.attributes.fullName) {
                    contactsToRestore.push(item.attributes);
                } else if (temp && item.attributes.fileType && item.attributes.fileType.indexOf("image") > -1) {
                    photosToRestore.push(item.attributes);
                } else if (temp && item.attributes.fileType && item.attributes.fileType.indexOf("video") > -1) {
                    videosToRestore.push(item.attributes);
                }
            });

            if (contactsToRestore.length < 1 && photosToRestore.length < 1 && videosToRestore.length < 1) {
                AMA.debug("Specified items not found in Trash. Aborting command.");
                callback(false);
            } else {
                _.each(contactsToRestore, function (item, index) {
                    item.visibility = AMA.model.UserData.Status.ENABLED;
                });
                _.each(photosToRestore, function (item, index) {
                    item.visibility = AMA.model.UserData.Status.ENABLED;
                });
                _.each(videosToRestore, function (item, index) {
                    item.visibility = AMA.model.UserData.Status.ENABLED;
                });

                if (contactsToRestore.length > 0) {
                    Trash.__super__.restore.call(this, "contacts", contactsToRestore, function (updateSuccess) {
                        if (updateSuccess) self.invalidateContacts = true;
                        self.waitingContacts = false;
                        self.checkWaiting(callback);
                    });
                } else {
                    this.waitingContacts = false;
                }

                if (photosToRestore.length > 0) {
                    Trash.__super__.restore.call(this, "photos", photosToRestore, function (updateSuccess) {
                        if (updateSuccess) self.invalidatePhotos = true;
                        self.waitingPhotos = false;
                        self.checkWaiting(callback);
                    });
                } else {
                    this.waitingPhotos = false;
                }

                if (videosToRestore.length > 0) {
                    Trash.__super__.restore.call(this, "videos", videosToRestore, function (updateSuccess) {
                        if (updateSuccess) self.invalidateVideos = true;
                        self.waitingVideos = false;
                        self.checkWaiting(callback);
                    });
                } else {
                    this.waitingVideos = false;
                }
            }
        },

        checkWaiting: function (callback) {
            if (this.waitingContacts || this.waitingPhotos || this.waitingVideos) {
                return;
            } else {
                callback(this.invalidateContacts, this.invalidatePhotos, this.invalidateVideos);
            }
        },

        setDropdownTrash: function (isFromDropdown) {
            this._isDropdownTrash = isFromDropdown;
        }
    });
})();