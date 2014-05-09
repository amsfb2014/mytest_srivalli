/*! Endpoints */
(function () {

    AMA.namespace("model");

    var Endpoints = AMA.model.Endpoints = AMA.model.BaseData.extend();

    //Endpoints.URL = "/accounts";
	// TODO: change to "devices"
	Endpoints.RESOURCE = "device_info";
	
    Endpoints.MODEL = AMA.model.BaseData.MODEL.extend({
		defaults: {
			announceSupported: "", // applicationVersion.announce
			contactsSupported: "", // applicationVersion.contacts
			endpointid: 0, // endpointId
			fileStorageLimit: "",
			interactiveGuideUrls: "",
			locationCheckSupported: "", 
			lostPhoneSupported: "",
			maxchars: {}, 
			name: "", // displayName
			platform: "", // platformName
			platformfriendlyname: "", // ??
			pollingSupported: "", 
			premiumBackupSupported: "", // applicationVersion.premiumBackup
			recoverySupported: "", // applicationVersion.recovery
			retry: {},
			safeBrowsingSupported: "", // applicationVersion.safeBrowsing
			securityActionPendingSupported: "", // applicationVersion.securityActionsPending
			syncAndOrWipeSupported: "", // applicationVersion.syncAndOrWipe
			synctimes: [],
			version: "", // "{"feature-version": applicationVersion.featureVersion,
						// "device-os-version": applicationVersion.deviceOsVersion,
						// "app-version": applicationVersion.appVersion}" 
			wakeupSupported: "" // applicationVersion.noWakeup
		}
    });

    AMA.augment(
	Endpoints.prototype, {
        _configureFetchOptions: function (options) {},
		 
		_configureUrl: function () {
            this.url =  AMA.config.apiHostUrl + "/devices/" +
                        AMA.config.endpointId + "?" +
                        $.param({
                            devId: AMA.config.devId,
                            authToken: AMA.config.authToken
                        });
        },
		
		parse: function(resp) {
			var model = this.constructor.MODEL.prototype.defaults;
			
			model.announceSupported = resp.applicationVersion.announce;
			model.contactsSupported = resp.applicationVersion.contacts;
			model.endpointid = resp.endpointId;
			model.name = resp.displayName;
			model.platform = resp.platformName;
			model.platformfriendlyname = "";
			model.premiumBackupSupported = resp.applicationVersion.premiumBackup;
			model.recoverySupported = resp.applicationVersion.recovery;
			model.safeBrowsingSupported = resp.applicationVersion.safeBrowsing;
			model.securityActionPendingSupported = resp.applicationVersion.securityActionsPending;
			model.syncAndOrWipeSupported = resp.applicationVersion.syncAndOrWipe;
			model.version = '{"feature-version": ' + resp.applicationVersion.featureVersion + ',' +
						'"device-os-version": ' + resp.applicationVersion.deviceOsVersion + ',' +
						'"app-version": ' + resp.applicationVersion.appVersion + '}';
			model.wakeupSupported = resp.applicationVersion.noWakeup;
			
			return model;
		}
		
    });

})();