/*! DeviceSettings */
(function () {
    
    AMA.namespace("model");
    
    var DeviceSettings = AMA.model.DeviceSettings = AMA.model.BaseData.extend();
            
    //DeviceSettings.URL = "/devicesettings";
	DeviceSettings.RESOURCE = "device_info";
    DeviceSettings.MODEL = AMA.model.BaseData.MODEL.extend({
		defaults: {
			_meta: {},
			android_device_admin: 0, //
			current_lockstatus: 0, //
			data_wiped: 0,
			id: "",
			locationcheck_on: 0, //
			smsDisabled: false,
			visibility: "",
			href: "",
			active: false
		}
    });
    
    AMA.augment(DeviceSettings.prototype, {
		_configureUrl: function () {
            this.url =  AMA.config.apiHostUrl + "/devices/" +
                        AMA.config.endpointId + "/state?" +
                        $.param({
                            devId: AMA.config.devId,
                            authToken: AMA.config.authToken
                        });
        },
		
        parse: function(resp) {
			var model = this.constructor.MODEL.prototype.defaults; 
			
			model.id = resp.endpointId;
			model.android_device_admin = resp.situation.deviceAdminEnabled ? 1 : 0;
			model.current_lockstatus = resp.situation.screenLocked ? 1 : 0;
			model.data_wiped = resp.situation.dataWiped ? 1 : 0;
			model.locationcheck_on = resp.situation.locationCheckEnabled ? 1 : 0;
			model.smsDisabled = resp.smsDisabled;
			model.visibility = resp.visibility;
			model.href = resp.href;
			model.active = resp.active;
			
			return model;
		}
    });

})();