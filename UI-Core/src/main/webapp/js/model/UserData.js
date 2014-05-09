/*! UserData */
(function () {

	AMA.namespace("model");

	var UserData = AMA.model.UserData = AMA.model.BaseData.extend();


	UserData.URL = "";

	UserData.MODEL = Backbone.Model.extend({

	});

	UserData.Status = {
		"ENABLED": "ACTIVE",
		"TRASHED": "INACTIVE",
		"PURGED": "HIDDEN"
	};

	_.extend(UserData.prototype, {
		initialize: function () {
			UserData.__super__.initialize.apply(this, arguments);

			this.status = UserData.Status.ENABLED;
		},


        _configureUrl: function (options) {
            this.url = AMA.config.apiHostUrl + "/" + this.constructor.RESOURCE + "?" +
                $.param({
                    devId: AMA.config.devId,
                    endpointId: AMA.config.endpointId,
                    authToken: AMA.config.authToken,
                    status: UserData.Status.ENABLED
                });

			if (options && options.params && options.params.keyword) {
				this.url += "&" +
					$.param({
						keyword: options.params.keyword
					});
			}
        },

        _configureFetchOptions: function (options) {
        	this._configureUrl(options);
        },

        /* Initiates a request to create a new item of a specified type
         *
         * @param {String} itemType (specifies the item type, such as contacts, photos or videos)
         * @param {Object} itemData (contains data of the item to be created)
         * @param {Function} callback (code to be executed when ajax request succeeds)
         *
         */
		create: function (itemType, itemData, callback) {
			var mediaType = (itemType === "photos" || itemType === "videos") ? "files" : itemType,
				options = {};
				
			/*
			if (AMA.models.capabilities.canCreate(itemType + "_id")) {
				$.ajax({
					type: "POST",
					url: AMA.config.apiHostUrl + "/" + mediaType + "?devId=" + AMA.config.devId + "&endpointId=" + AMA.config.endpointId + "&authToken=" + AMA.config.authToken,
					data: JSON.stringify(itemData),
					contentType: "application/json;charset=UTF-8"
				}).done(function () {
					createSuccess = true;
				}).always(function () {
					callback(createSuccess);
				});
			}
			*/
			
			if (AMA.models.capabilities.canCreate(itemType)) {
				options.url = AMA.config.apiHostUrl + "/" + mediaType + "?devId=" + AMA.config.devId + "&endpointId=" + AMA.config.endpointId + "&authToken=" + AMA.config.authToken;
				options.data = JSON.stringify(itemData);
				options.contentType = "application/json;charset=UTF-8";
				options.callback = callback;
				options.cache = false;
				options.complete = _.bind(function(resp) {
					AMA.config.setRecordChangedFlag(true);
					callback(true);
				}, this);
				options.error = _.bind(function() {
					AMA.error("Request failed: PUT /" + mediaType);
					//callback(false);
				}, this);
				
				this.sync("create", this, options);
			}
		},
		
		/* Initiates a request to update an item's details
		 *
	     * @param {String} itemType (specifies the item type, such as contacts, photos or videos)
	     * @param {String} itemId (ID of the item to be created)
	     * @param {String} itemData (data of the item to be updated)
	     * @param {Function} callback (code to be executed when ajax request succeeds)
	     * 
	     */
		update: function (itemType, itemId, itemData, callback) {
			var updateSuccess = false
				options = {};
				
			if (AMA.models.capabilities.canUpdate(itemType + "_id")) {
				/*
				$.ajax({
					type: "PUT",
					url: AMA.config.apiHostUrl + "/" + itemType + "/" + itemData.id + "?devId=" + AMA.config.devId + "&endpointId=" + AMA.config.endpointId + "&authToken=" + AMA.config.authToken,
					data: JSON.stringify(itemData),
					contentType: "application/json;charset=UTF-8"
				}).done(function () {
					updateSuccess = true;
				}).always(function () {
					callback(updateSuccess);
				});
				*/
				
				options.url = AMA.config.apiHostUrl + "/" + itemType + "/" + itemData.id + "?devId=" + AMA.config.devId + "&endpointId=" + AMA.config.endpointId + "&authToken=" + AMA.config.authToken;
				options.data = JSON.stringify(itemData);
				options.contentType = "application/json;charset=UTF-8";
				options.callback = callback;
				options.cache = false;
				options.complete = _.bind(function(resp) {
					AMA.config.setRecordChangedFlag(true);
					callback(true, JSON.parse(resp.responseText));
				}, this);
				options.error = _.bind(function() {
					callback(false);
				}, this);
				
				this.sync("update", this, options);
			}
		},
		
		/* Initiates add or remove of items from device
		 *
	     * @param {String} action (specifies the desired action, either add or remove)
	     * @param {String} itemType (specifies the item type, such as contacts, photos or videos)
	     * @param {String or Array} itemIds (IDs of the items to be trashed)
	     * @param {Function} callback (code to be executed when ajax request succeeds)
	     * 
	     */
		addRemove: function (action, itemType, itemIds, callback) {
			if (!_.isArray(itemIds) || itemIds.length < 1) return;
			
			var mediaType = (itemType === "photos" || itemType === "videos") ? "files" : itemType,
				dto = {
					id: AMA.config.endpointId,
					list: [],
					total: 0,
					totalPendingSync: 0,
					totalSynced: 0
				},
				updateSuccess = false,
				options = {};
			
			if (mediaType === "files") {
				switch (itemType) {
					case "photos" : itemType = "image"; break;
					case "videos" : itemType = "video"; break;
				}
			}
			
			if (AMA.models.capabilities.canUpdate(mediaType)) {
				_.each(this.models, function (item){
					if ($.inArray(item.id, itemIds) > -1) {
						dto.list.push(item.attributes);
					}
				});
				
				_.each(dto.list, function (item){
					if (action === "add") {
						item.pendingCreate = true;
						item.pendingDelete = false;
					}
					else if (action === "remove") {
						item.pendingDelete = true;
						item.pendingCreate = false;
					}
				});
				
				if (dto.list && itemType === "contacts") {
					/*
					$.ajax({
						type: "PUT",
						url: AMA.config.apiHostUrl + "/" + mediaType + "?devId=" + AMA.config.devId + "&endpointId=" + AMA.config.endpointId + "&authToken=" + AMA.config.authToken,
						data: JSON.stringify(dto),
						contentType: "application/json;charset=UTF-8"
					}).done(function () {
						updateSuccess = true;
					}).always(function () {
						callback(updateSuccess);
					});
					*/
					
					options.url = AMA.config.apiHostUrl + "/" + mediaType + "?devId=" + AMA.config.devId + "&endpointId=" + AMA.config.endpointId + "&authToken=" + AMA.config.authToken;
					options.data = JSON.stringify(dto);
					options.contentType = "application/json;charset=UTF-8";
					options.callback = callback;
					options.cache = false;
					options.complete = _.bind(function(resp) {
						AMA.config.setRecordChangedFlag(true);
						callback(true, JSON.parse(resp.responseText));
					}, this);
					options.error = _.bind(function() {
						callback(false);
					}, this);
					
					this.sync("update", this, options);
					
				}
				else if (dto.list && mediaType === "files") {
					/*
					$.ajax({
						type: "PUT",
						url: AMA.config.apiHostUrl + "/" + mediaType + "?devId=" + AMA.config.devId + "&endpointId=" + AMA.config.endpointId + "&authToken=" + AMA.config.authToken + "&fileType=" + itemType,
						data: JSON.stringify(dto),
						contentType: "application/json;charset=UTF-8"
					}).done(function () {
						updateSuccess = true;
					}).always(function () {
						callback(updateSuccess);
					});
					*/
					
					dto.keyword = "";
					
					options.url = AMA.config.apiHostUrl + "/" + mediaType + "?devId=" + AMA.config.devId + "&endpointId=" + AMA.config.endpointId + "&authToken=" + AMA.config.authToken + "&fileType=" + itemType;
					options.data = JSON.stringify(dto);
					options.contentType = "application/json;charset=UTF-8";
					options.callback = callback;
					options.cache = false;
					options.complete = _.bind(function(resp) {
						AMA.config.setRecordChangedFlag(true);
						callback(true, JSON.parse(resp.responseText));
					}, this);
					options.error = _.bind(function() {
						callback(false);
					}, this);
					
					this.sync("update", this, options);
				}
			}
		},
		
		/* Given an item type (photos or videos) and item IDs, download the file/s
		 *
	     * @param {String} itemType (specifies the file type, such as photos or videos)
	     * @param {String or Array} itemIds (IDs of the items to be downloaded)
	     * @param {Function} callback (code to be executed when ajax request succeeds)
	     * 
	     */
		downloadFile: function (itemType, itemIds, callback) {
			var xhr = null,
				dto = {
					fileType: itemType
				};
			
			if (AMA.models.capabilities.canRead("files_id")) {
				if (AMA.Util.useXdr()){
					xhr = AMA.Util.createCORSRequest("GET", AMA.config.apiHostUrl + "/files/" + itemIds + "?devId=" + AMA.config.devId + "&endpointId=" + AMA.config.endpointId + "&authToken=" + AMA.config.authToken + "&fileType=" + itemType);
					xhr.send();
					
					xhr.onload = function (){
						callback(JSON.parse(this.responseText));
					};
				}
				else {
					$.ajax({
						url: AMA.config.apiHostUrl + "/files/" + itemIds + "?devId=" + AMA.config.devId + "&endpointId=" + AMA.config.endpointId + "&authToken=" + AMA.config.authToken,
						data: {
							fileType: itemType
						}
					}).done(function (data){
						callback(data);
					});
				}
			}
		},
		
		/* Moves specified items to trash.
		 * 1. In the case of active items, they will be moved to trash
		 * 2. In the case of trashed items, they will be purged/hidden from the Web interface
		 *
	     * @param {String} itemType (specifies the item type, such as contacts, photos or videos)
	     * @param {String or Array} itemIds (IDs of the items to be trashed)
	     * @param {Function} callback (code to be executed when ajax request succeeds)
	     * 
	     */
		trash: function (itemType, itemIds, callback) {
			var self = this,
				options = {},
				refreshModel = false,
				mediaType = (itemType === "image" || itemType === "video") ? "files" : itemType,
				dto = {
					id: AMA.config.endpointId,
					list: [],
					total: 0,
					totalPendingSync: 0,
					totalSynced: 0,
					keyword: ""
				};
			
			if (itemIds.length < 1) return;
			
			// Separate handling for contacts and files
			if (AMA.models.capabilities.canDelete(mediaType + "_id")) {
				_.each(this.models, function(item){
					for (var i in itemIds) {
						if (itemIds[i] === item.attributes.id) {
							item.attributes.visibility = AMA.model.UserData.Status.TRASHED;
							dto.list.push(item.attributes);
						}
					}
				});
				
				if (mediaType === "contacts") {
					/*
					$.ajax({
						type: "PUT",
						url: AMA.config.apiHostUrl + "/" + mediaType + "?devId=" + AMA.config.devId + "&endpointId=" + AMA.config.endpointId + "&authToken=" + AMA.config.authToken,
						data: JSON.stringify(dto),
						contentType: "application/json"
					}).done(function () {
						refreshModel = true;
					}).always(function  () {
						callback(refreshModel);
					});
					*/
					options.url = AMA.config.apiHostUrl + "/" + mediaType + "?devId=" + AMA.config.devId + "&endpointId=" + AMA.config.endpointId + "&authToken=" + AMA.config.authToken;
					options.data = JSON.stringify(dto);
					options.contentType = "application/json;charset=UTF-8";
					options.callback = callback;
					options.cache = false;
					options.complete = _.bind(function(resp) {
						AMA.config.setRecordChangedFlag(true);
						callback(true, JSON.parse(resp.responseText));
					}, this);
					options.error = _.bind(function() {
						callback(false);
					}, this);
					
					this.sync("update", this, options);
				}
				else if (mediaType === "files") {
					/*
					$.ajax({
						type: "PUT",
						url: AMA.config.apiHostUrl + "/" + mediaType + "?devId=" + AMA.config.devId + "&endpointId=" + AMA.config.endpointId + "&authToken=" + AMA.config.authToken + "&fileType=" + itemType,
						data: JSON.stringify(dto),
						contentType: "application/json"
					}).done(function () {
						refreshModel = true;
					}).always(function  () {
						callback(refreshModel);
					});
					*/
					options.url = AMA.config.apiHostUrl + "/" + mediaType + "?devId=" + AMA.config.devId + "&endpointId=" + AMA.config.endpointId + "&authToken=" + AMA.config.authToken + "&fileType=" + itemType;
					options.data = JSON.stringify(dto);
					options.contentType = "application/json;charset=UTF-8";
					options.callback = callback;
					options.cache = false;
					options.complete = _.bind(function(resp) {
						AMA.config.setRecordChangedFlag(true);
						callback(true);
					}, this);
					options.error = _.bind(function() {
						callback(false);
					}, this);
					
					this.sync("update", this, options);
				}
				
				/* ALTERNATIVE METHOD using DELETE request
					LIMITATION: Does not accept a list; request done on per-item basis
				
				if (mediaType === "contacts") {
					_.each(itemIds, function (item, index){
						$.ajax({
							type: "DELETE",
							url: AMA.config.apiHostUrl + "/" + mediaType + "/" + itemIds[index] + "?devId=" + AMA.config.devId + "&endpointId=" + AMA.config.endpointId + "&authToken=" + AMA.config.authToken,
							contentType: "application/json"
						}).done(function () {
							refreshModel = true;
						}).always(function  () {
							callback(refreshModel);
						});
					});
				}
				else if (mediaType === "files") {
					_.each(itemIds, function (item, index){
						$.ajax({
							type: "DELETE",
							url: AMA.config.apiHostUrl + "/" + mediaType + "/" + itemIds[index] + "?devId=" + AMA.config.devId + "&endpointId=" + AMA.config.endpointId + "&authToken=" + AMA.config.authToken + "&fileType=" + itemType,
							contentType: "application/json"
						}).done(function () {
							refreshModel = true;
						}).always(function  () {
							callback(refreshModel);
						});
					});
				}
				*/
			}
		},

		restore: function (itemType, itemData, callback) {
			if (!_.isObject(itemData)) return;
			
			var mediaType = (itemType === "photos" || itemType === "videos") ? "files" : itemType,
				updateSuccess = false,
				dto = {
					id: AMA.config.endpointId,
					list: itemData,
					total: 0,
					totalPendingSync: 0,
					totalSynced: 0,
					keyword: ""
				},
				options = {};
			
			if (mediaType === "files") {
				switch (itemType) {
					case "photos" : itemType = "image"; break;
					case "videos" : itemType = "video"; break;
				}
			}
			
			if (AMA.models.capabilities.canUpdate(mediaType)) {
				if (itemData && itemType === "contacts") {
					/*
					$.ajax({
						type: "PUT",
						url: AMA.config.apiHostUrl + "/" + mediaType + "?devId=" + AMA.config.devId + "&endpointId=" + AMA.config.endpointId + "&authToken=" + AMA.config.authToken,
						data: JSON.stringify(dto),
						contentType: "application/json;charset=UTF-8"
					}).done(function () {
						updateSuccess = true;
					}).always(function () {
						callback(updateSuccess);
					});
					*/
					
					options.url = AMA.config.apiHostUrl + "/" + mediaType + "?devId=" + AMA.config.devId + "&endpointId=" + AMA.config.endpointId + "&authToken=" + AMA.config.authToken;
					options.data = JSON.stringify(dto);
					options.contentType = "application/json;charset=UTF-8";
					options.callback = callback;
					options.cache = false;
					options.complete = _.bind(function(resp) {
						AMA.config.setRecordChangedFlag(true);
						callback(true, JSON.parse(resp.responseText));
					}, this);
					options.error = _.bind(function() {
						callback(false);
					}, this);
					
					this.sync("update", this, options);
				}
				else if (itemData && mediaType === "files") {
					/*
					$.ajax({
						type: "PUT",
						url: AMA.config.apiHostUrl + "/" + mediaType + "?devId=" + AMA.config.devId + "&endpointId=" + AMA.config.endpointId + "&authToken=" + AMA.config.authToken + "&fileType=" + itemType,
						data: JSON.stringify(dto),
						contentType: "application/json;charset=UTF-8"
					}).done(function () {
						updateSuccess = true;
					}).always(function () {
						callback(updateSuccess);
					});
					*/
					options.url = AMA.config.apiHostUrl + "/" + mediaType + "?devId=" + AMA.config.devId + "&endpointId=" + AMA.config.endpointId + "&authToken=" + AMA.config.authToken + "&fileType=" + itemType;
					options.data = JSON.stringify(dto);
					options.contentType = "application/json;charset=UTF-8";
					options.callback = callback;
					options.cache = false;
					options.complete = _.bind(function(resp) {
						AMA.config.setRecordChangedFlag(true);
						callback(true, JSON.parse(resp.responseText));
					}, this);
					options.error = _.bind(function() {
						callback(false);
					}, this);
					
					this.sync("update", this, options);
				}
			}
		}
	});
})();