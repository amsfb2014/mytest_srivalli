/*! SupportTabResourceView */
(function () {

	AMA.namespace("view");

	var SupportTabResourceView = AMA.view.SupportTabResourceView = AMA.view.BaseView.extend();

	SupportTabResourceView.TEMPLATE_ID = "support_tab_resources_template";

	SupportTabResourceView.COLOR = {
		high: "green",
		medium: "yellow",
		low: "red"
	};
	
	AMA.augment(SupportTabResourceView.prototype, {
        _initializeDataCss: function(data) {
            if(!data.css) {
                data.css={};
            }
            // initialize css styles to undefined state
            data.css["displayDiagnosticsSuccessful"] = "hide";
            data.css["displayNoData"] = "show";
            data.css["displayPrePS14Snapshot"] = "hide";
            data.css["displayPostPS14Snapshot"] = "hide";

            data.css["batteryRemaining"]="hide";
            data.css["batteryRemainingUndefined"]="show";
            data.css["batteryStatusCharging"]="hide";
            data.css["batteryStatusDischarging"]="hide";
            data.css["batteryStatusFull"]="hide";
            data.css["batteryStatusNotcharging"]="hide";
            data.css["batteryStatusUndefined"]="show";
            data.css["batteryStatusUnknown"]="hide";
            data.css["batteryStatusUnplugged"]="hide";
            data.css["bluetoothFalse"]="hide";
            data.css["bluetoothTrue"]="hide";
            data.css["bluetoothUndefined"]="show";
            data.css["buildVersion"]="hide";
            data.css["buildVersionUndefined"]="show";
            data.css["deviceStorageAvailable"]="hide";
            data.css["deviceStorageAvailableUndefined"]="show";
            data.css["downloadedAppNumber"]="hide";
            data.css["downloadedAppNumberUndefined"]="show";
            data.css["gpsFalse"]="hide";
            data.css["gpsTrue"]="hide";
            data.css["gpsUndefined"]="show";
            data.css["googleLocationServicesFalse"]="hide";
            data.css["googleLocationServicesTrue"]="hide";
            data.css["googleLocationServicesUndefined"]="show";
            data.css["lastBackupDate"]="hide";
            data.css["lastBackupDateUndefined"]="show";
            data.css["listOfBluetoothConnected"]="hide";
            data.css["listOfBluetoothConnectedNone"]="hide";
            data.css["listOfBluetoothConnectedUndefined"]="show";
            data.css["manufacturer"]="hide";
            data.css["manufacturerUndefined"]="show";
            data.css["memoryAvailable"]="hide";
            data.css["memoryAvailableUndefined"]="show";
            data.css["memorySDTotal"]="hide";
            data.css["memorySDTotalUndefined"]="show";
            data.css["SDStorageAvailable"]="hide";
            data.css["SDStorageAvailableUndefined"]="show";
            data.css["memoryFree"]="hide";
            data.css["memoryFreeUndefined"]="show";
            data.css["memoryTotal"]="hide";
            data.css["memoryTotalUndefined"]="show";
            data.css["model"]="hide";
            data.css["modelUndefined"]="show";
            data.css["osVersion"]="hide";
            data.css["osVersionUndefined"]="show";
            data.css["runningAppNumber"]="hide";
            data.css["runningAppNumberUndefined"]="show";
            data.css["screenBrightness"]="hide";
            data.css["screenBrightnessUndefined"]="show";
            data.css["syncedAccountList"]="hide";
            data.css["syncedAccountListNone"]="hide";
            data.css["syncedAccountListUndefined"]="show";
            data.css["syncedAccountNumber"]="hide";
            data.css["timeStamp"]="hide";
            data.css["timeStampUndefined"]="show-inline";
            data.css["totalAppNumber"]="hide";
            data.css["totalAppNumberUndefined"]="show";
            data.css["wifiConnected"]="hide";
            data.css["wifiDisabling"]="hide";
            data.css["wifiEnabling"]="hide";
            data.css["wifiNotConnected"]="hide";
            data.css["wifiOff"]="hide";
            data.css["wifiUndefined"]="show";
            data.css["wifiUnknown"]="hide";

            return data;
        },

        _initializeModelDefaults: function(data) {
            // initialize properties in model, as we're not using Backbone.models.defaults
            if( !data ) {
                data={};
            }
            data.memoryFree=0;
            data.totalAppNumber = 0;
            data.osVersion = "";
            data.deviceStorageAvailable = 0;
            data.memoryTotal = 0;
            data.runningAppNumber = 0;
            data.manufacturer = "";
            data.model = "";
            data.buildVersion = "";
            data.timeStamp = "";
            data.wifi = "";
            data.wifiConnected = "";
            data.bluetooth = "";
            data.totalAppNumber = 0;
            data.listOfBluetoothConnected = "";
            data.gps = "";
            data.googleLocationServices = "";
            data.mobileNetwork = "";
            data.screenBrightness = 0;
            data.batteryRemaining = 0;
            data.batteryStatus = "";
            data.memoryAvailable = 0;
            data.memoryTotal = 0;
            data.memorySDTotal = 0;
            data.memorySDFree = 0;
            data.SDStorageAvailable = 0;
            data.downloadedAppNumber = 0;
            data.lastBackupDate = "";
            data.syncedAccountNumber = 0;
            data.syncedAccountList = "";

            return data;
        },

		_processData: function(data){
			AMA.debug("\n=========== process SupportTabResourceView data =================\n");

			if(data && this.data.models[0]){
                var model=this.data.models[0].attributes;
                this._initializeDataCss(data);

                if( model.memoryFree ) {
                    data.css["memoryFreeUndefined"]="hide";
                    data.css["memoryFree"]="show";
                    data.memoryFree=this.memoryFreeSizeConverter(model.memoryFree);
                }
                else {
                    data.memoryFree=0;
                }

                if( model.totalAppNumber ) {
                    data.css["totalAppNumberUndefined"]="hide";
                    data.css["totalAppNumber"]="show";
                    data.totalAppNumber = model.totalAppNumber;
                }
                else {
                    data.totalAppNumber = 0;
                }

                if( model.osVersion ) {
                    data.css["osVersionUndefined"]="hide";
                    data.css["osVersion"]="show";
                    data.osVersion = model.osVersion;
                }
                else {
                    data.osVersion = "";
                }

                if( model.memoryTotal ) {
                    data.css["memoryTotalUndefined"]="hide";
                    data.css["memoryTotal"]="show";
                    data.css["deviceStorageAvailableUndefined"]="hide";
                    data.css["deviceStorageAvailable"]="show";
                    data.deviceStorageAvailable = Math.floor(100*(model.memoryFree/model.memoryTotal));
                    data.memoryTotal = model.memoryTotal;
                }
                else {
                    data.deviceStorageAvailable = 0;
                    data.memoryTotal = 0;
                }

                if( model.runningAppNumber ) {
                    data.css["runningAppNumberUndefined"]="hide";
                    data.css["runningAppNumber"]="show";
                    data.runningAppNumber = model.runningAppNumber;
                }
                else {
                    data.runningAppNumber = 0;
                }

                if( model.manufacturer ) {
                    data.css["manufacturerUndefined"]="hide";
                    data.css["manufacturer"]="show";
                    data.manufacturer = model.manufacturer;
                }
                else {
                    data.manufacturer = "";
                }

                if( model.model ) {
                    data.css["modelUndefined"]="hide";
                    data.css["model"]="show";
                    data.model = model.model;
                }
                else {
                    data.model = "";
                }

                data.css["displayDiagnosticsSuccessful"] = "show";
                data.css["displayNoData"] = "hide";
                if( model.buildVersion && (model.buildVersion.length>1) ) {
                    data.css["buildVersionUndefined"]="hide";
                    data.css["buildVersion"]="show";
                    data.css["displayPrePS14Snapshot"] = "hide";
                    data.css["displayPostPS14Snapshot"] = "settings_tall";
                    data.buildVersion = model.buildVersion;
                }
                else {
                    data.css["displayPrePS14Snapshot"] = "settings_short";
                    data.css["displayPostPS14Snapshot"] = "hide";
                    data.buildVersion = "";
                }

                if( model.timeStamp ) {
                    data.css["timeStampUndefined"]="hide";
                    data.css["timeStamp"]="show-inline";
                    data.timeStamp = AMA.Util.formatDate(new Date(model.timeStamp), "MMM dd, yyyy hh:mm a Z", false);
                }
                else {
                    data.timeStamp = "";
                }

                if( (model.wifi===null) || (typeof model.wifi==="undefined") || (model.wifi==="UNKNOWN") ) {
                    data.wifi = "";
                    data.wifiConnected = "";
                }
                else {
                    data.css["wifiUndefined"]="hide";
                    data.wifi = model.wifi;
                    data.wifiConnected = model.wifiConnected;
                    if( model.wifiConnected ) {
                        if( model.wifi==="WIFI_STATE_ENABLED" ) {
                            data.css["wifiConnected"]="show";
                        }
                        else {
                            data.css["wifiUnknown"]="show";
                            AMA.warning("SupportTabResourceView: unexpected wifi state:"+model.wifi+" and wifi connected:"+model.wifiConnected);
                        }
                    }
                    else {
                        if( model.wifi==="WIFI_STATE_DISABLED" ) {
                            data.css["wifiOff"]="show";
                        }
                        else if( model.wifi==="WIFI_STATE_DISABLING" ) {
                            data.css["wifiDisabling"]="show";
                        }
                        else if( model.wifi==="WIFI_STATE_ENABLED" ) {
                            data.css["wifiNotConnected"]="show";
                        }
                        else if( model.wifi==="WIFI_STATE_ENABLING" ) {
                            data.css["wifiEnabling"]="show";
                        }
                        else if( model.wifi==="WIFI_STATE_UNKNOWN" ) {
                            data.css["wifiUnknown"]="show";
                        }
                        else {
                            data.css["wifiUnknown"]="show";                          
                            AMA.warning("SupportTabResourceView: unexpected wifi state:"+model.wifi+" and wifi connected:"+model.wifiConnected);
                        }
                    }
                }

                if( (model.bluetooth===null) || (typeof model.bluetooth==="undefined") ) {
                    data.bluetooth = "";
                }
                else {
                    data.css["bluetoothUndefined"]="hide";
                    data.bluetooth = model.bluetooth;
                    if( model.bluetooth ) {
                        data.css["bluetoothFalse"]="hide";
                        data.css["bluetoothTrue"]="show";
                    }
                    else {
                        data.css["bluetoothFalse"]="show";
                        data.css["bluetoothTrue"]="hide";
                    }
                }

                if( model.totalAppNumber ) {
                    data.css["totalAppNumberUndefined"]="hide";
                    data.css["totalAppNumber"]="show";
                    data.totalAppNumber = model.totalAppNumber;
                }
                else {
                    data.totalAppNumber = 0;
                }

                if( model.listOfBluetoothConnected ) {
                    data.css["listOfBluetoothConnectedUndefined"]="hide";
                    if( model.listOfBluetoothConnected.length === 0 ) {
                        data.css["listOfBluetoothConnectedNone"]="show";
                        data.listOfBluetoothConnected = "";
                    }
                    else {
                        data.css["listOfBluetoothConnected"]="show";
                        data.listOfBluetoothConnected = model.listOfBluetoothConnected.join(", ");
                    }
                }
                else {
                    data.listOfBluetoothConnected = "";
                }

                if( (model.gps===null) || (typeof model.gps==="undefined") ) {
                    data.gps = "";
                }
                else {
                    data.css["gpsUndefined"]="hide";
                    data.gps = model.gps;
                    if( model.gps ) {
                        data.css["gpsFalse"]="hide";
                        data.css["gpsTrue"]="show";
                    }
                    else {
                        data.css["gpsFalse"]="show";
                        data.css["gpsTrue"]="hide";
                    }
                }

                if( (model.googleLocationServices===null) || (typeof model.googleLocationServices==="undefined") ) {
                    data.googleLocationServices = "";
                }
                else {
                    data.css["googleLocationServicesUndefined"]="hide";
                    data.googleLocationServices = model.googleLocationServices;
                    if( model.googleLocationServices ) {
                        data.css["googleLocationServicesFalse"]="hide";
                        data.css["googleLocationServicesTrue"]="show";
                    }
                    else {
                        data.css["googleLocationServicesFalse"]="show";
                        data.css["googleLocationServicesTrue"]="hide";
                    }
                }

                if( model.mobileNetwork ) {
                    data.css["mobileNetworkUndefined"]="hide";
                    data.css["mobileNetwork"]="show";
                    data.mobileNetwork = model.mobileNetwork;
                }
                else {
                    data.mobileNetwork = "";
                }

                if( model.screenBrightness ) {
                    data.css["screenBrightnessUndefined"]="hide";
                    data.css["screenBrightness"]="show";
                    data.screenBrightness = model.screenBrightness;
                }
                else {
                    data.screenBrightness = 0;
                }

                if( model.batteryRemaining ) {
                    data.css["batteryRemainingUndefined"]="hide";
                    data.css["batteryRemaining"]="show";
                    data.batteryRemaining = model.batteryRemaining;
                }
                else {
                    data.batteryRemaining = 0;
                }

                if( model.batteryStatus ) {
                    data.css["batteryStatusUndefined"]="hide";
                    data.batteryStatus = model.batteryStatus;
                    if( model.batteryStatus === "BATTERY_STATUS_UNKNOWN") {
                        data.css["batteryStatusUnknown"]="show";
                    }
                    else if( model.batteryStatus === "BATTERY_STATUS_CHARGING" ) {
                        data.css["batteryStatusCharging"]="show";
                    }
                    else if( model.batteryStatus === "BATTERY_STATUS_DISCHARGING" ) {
                        data.css["batteryStatusDischarging"]="show";
                    }
                    else if( model.batteryStatus === "BATTERY_STATUS_FULL" ) {
                        data.css["batteryStatusFull"]="show";
                    }
                    else if( model.batteryStatus === "BATTERY_STATUS_NOTCHARGING" ) {
                        data.css["batteryStatusNotcharging"]="show";
                    }
                    else if( model.batteryStatus === "BATTERY_STATUS_UNPLUGGED" ) {
                        data.css["batteryStatusUnplugged"]="show";
                    }
                    else {
                        data.css["batteryStatusUnknown"]="show";
                    }
                }
                else {
                    data.batteryStatus = "";
                }

                if( model.memoryAvailable ) {
                    data.css["memoryAvailableUndefined"]="hide";
                    data.css["memoryAvailable"]="show";
                    data.memoryAvailable = model.memoryAvailable;
                }
                else {
                    data.memoryAvailable = 0;
                }

                if( model.memorySDTotal ) {
                    data.css["memorySDTotalUndefined"]="hide";
                    data.css["SDStorageAvailableUndefined"]="hide";
                    data.css["memorySDTotal"]="show";
                    data.css["SDStorageAvailable"]="show";
                    data.memoryAvailable = model.memoryAvailable;
                    data.SDStorageAvailable = Math.floor(100*(model.memorySDFree/model.memorySDTotal));
                }
                else {
                    data.memorySDTotal = 0;
                    data.SDStorageAvailable = 0;
                }

                if( model.downloadedAppNumber ) {
                    data.css["downloadedAppNumberUndefined"]="hide";
                    data.css["downloadedAppNumber"]="show";
                    data.downloadedAppNumber = model.downloadedAppNumber;
                }
                else {
                    data.downloadedAppNumber = 0;
                }

                if( model.lastBackupDate ) {
                    data.css["lastBackupDateUndefined"]="hide";
                    data.css["lastBackupDate"]="show";
                    data.lastBackupDate = AMA.Util.formatDate(new Date(model.lastBackupDate), "MMM dd, yyyy hh:mm a Z", false);
                }
                else {
                    data.lastBackupDate = "";
                }

                // only show number of synced accounts span if number greater than 3
                if( (model.syncedAccountNumber) && (model.syncedAccountNumber > 3) ) {
                    data.css["syncedAccountNumber"]="show";
                    data.syncedAccountNumber = model.syncedAccountNumber;
                }
                else {
                    data.syncedAccountNumber = 0;
                }

                if( model.syncedAccountList ) {
                    data.css["syncedAccountListUndefined"]="hide";
                    if( model.syncedAccountList.length === 0 ) {
                        data.css["syncedAccountListNone"]="show";
                        data.syncedAccountList = "";
                    }
                    else {
                        data.css["syncedAccountList"]="show";
                        data.syncedAccountList = model.syncedAccountList.join(", ");
                    }
                }
                else {
                    data.syncedAccountList = "";
                }

			}
            else{
				AMA.debug("SupportTabResourceView - _processData: No data model object");
                // SETTINGS SNAPSHOT shows no data
                data={};
                this._initializeModelDefaults(data);
                this._initializeDataCss(data);
			}

			return data;
		},
		render: function () {
            SupportTabResourceView.__super__.render.apply(this);
			if((this.data.attributes.total>0) && this.data.models[0]){
                var model=this.data.models[0].attributes;
	
				this.memoryFreeSizeConverter(model.memoryFree);
				this.sdMemoryFreeSizeConverter(model.memorySDFree);
	
				this.updateUIBatteryLevel(model.batteryLevel);
				this.updateUIStorageAvailable(model);
				this.updateUIDeviceSpeed(model.deviceSpeed);
				this.updateUIHealthScanDate();
				this.setHealthScanDetails(model);
			}
            AMA.debug("\n=========== AMA.view.SupportTabResourceView rendered =================\n");
		},
		/*_afterRender: function(){
			this.updateUIHealthScanDate();
			this.setHealthScanDetails(this.data.models[0].attributes);
		},*/
		memoryFreeSizeConverter: function(memoryFree) {
			var memoryFreeSize;
			var memoryUnit = "giga";
			var unitChangeAmount = 1024 * 1024 * 1024;
			
			if (memoryFree >= unitChangeAmount)  //in GB Size
			{
				memoryFreeSize = (memoryFree / unitChangeAmount).toFixed(1);
			}
			else  //in MB size
			{
				memoryFreeSize = (memoryFree / (1024 * 1024)).toFixed(1);
				memoryUnit = "mega";
			} 
			
			AMA.Util.switchLabel(".device_storage_number", "." + memoryUnit, this.$el);
			this.$el.find("#device_storage_number").html(memoryFreeSize);
		},
		sdMemoryFreeSizeConverter: function(SDmemoryFree) {
			var SDmemoryFreeSize;
			var memoryUnit = "giga";
			var unitChangeAmount = 1024 * 1024 * 1024;
			
			if (SDmemoryFree >= unitChangeAmount)  //in GB Size
			{
				SDmemoryFreeSize = (SDmemoryFree / unitChangeAmount).toFixed(1);
			}
			else  //in MB size
			{
				SDmemoryFreeSize = (SDmemoryFree / (1024 * 1024)).toFixed(1);
				memoryUnit = "mega";
			}
			AMA.Util.switchLabel(".storage_available_number", "." + memoryUnit, this.$el);
			this.$el.find("#sd_storage_available_number").html(SDmemoryFreeSize);
		},
		updateUIBatteryLevel: function(batteryLevel){			
			this.$el.find("#hsps_battery_level_icon").attr('src', 'img/' + SupportTabResourceView.COLOR[batteryLevel.toLowerCase()] + '_dot.png');
			AMA.Util.switchLabel(".battery_value", "." + batteryLevel.toLowerCase(), this.$el);
		},
		updateUIStorageAvailable: function(resourceData){
			var memoryTotal = resourceData.memoryTotal; 
	        var memoryFree = resourceData.memoryFree; 
	        var SDmemoryTotal = resourceData.memorySDTotal; 
	        var SDmemoryFree = resourceData.memorySDFree; 
	        var storagePercent = Math.round((memoryFree + SDmemoryFree) / (memoryTotal + SDmemoryTotal) * 100);
	        var storageLevel = "medium";
			if (storagePercent <= 20) {
	           storageLevel = "low";
	        }
	        else if (storagePercent > 60)
	        {
				storageLevel = "high"
	        }
			
			this.$el.find("#hsps_available_storage_icon").attr('src', 'img/' + SupportTabResourceView.COLOR[storageLevel.toLowerCase()] + '_dot.png');
			AMA.Util.switchLabel(".available_storage_value", "." + storageLevel.toLowerCase(), this.$el);
		},
		updateUIDeviceSpeed: function(deviceSpeed){
			this.$el.find("#hsps_device_performance_icon").attr('src', 'img/' + SupportTabResourceView.COLOR[deviceSpeed.toLowerCase()] + '_dot.png');
			AMA.Util.switchLabel(".device_performance_value", "." + deviceSpeed.toLowerCase(), this.$el);
		},
    	updateUIHealthScanDate: function(){
    		if(AMA.models.diagnosticScanResourceData.healthScanDate){
    			var healthScanTime = AMA.models.diagnosticScanResourceData.healthScanDate; 
    			var localDate = new Date();
    			healthScanTime = healthScanTime - (localDate.getTimezoneOffset() * 60000);
    			var healthScanDate = AMA.Util.dateFormat(healthScanTime) + " " + AMA.Util.timeFormat(healthScanTime);
    			$(".healthscan_date").html(healthScanDate);
    		}else{
				$(".healthscan_date").html("");
			}
    	},
    	setHealthScanDetails: function(resourceData)
        {
			this.updateUIBatteryLevel(resourceData.batteryLevel);
            this.updateUIStorageAvailable(resourceData);
			this.updateUIDeviceSpeed(resourceData.deviceSpeed);
        },
        events: {
        	"click #hsap_app_name": "hsap_app_name",
        	"click #hsap_last_used": "hsap_last_used",
        	"click #hsap_battery": "hsap_battery",
        	"click #hsap_memory": "hsap_memory",
        	"click #hsap_storage": "hsap_storage"
        },
        hsap_app_name: function(){ 
        	this.handleAppsTableSort("hsap_app_name"); 
        },
        hsap_last_used: function(){ 
        	this.handleAppsTableSort("hsap_last_used"); 
        },
        hsap_battery: function(){ 
        	this.handleAppsTableSort("hsap_battery"); 
        },
        hsap_memory: function(){ 
        	this.handleAppsTableSort("hsap_memory"); 
        },
        hsap_storage: function(){ 
        	this.handleAppsTableSort("hsap_storage"); 
        },
        handleAppsTableSort: function(sortColumnId)
        {
            j_sortColumnId = "#" + sortColumnId;
            var current_class_name = $(j_sortColumnId).attr('class');
            switch (sortColumnId) {
                case "hsap_app_name":  //sort for appname
                    if ((current_class_name == 'app_performance_app_name_header') || (current_class_name == 'app_performance_app_name_header_down'))
                    {
                        $(j_sortColumnId).attr('class', 'app_performance_app_name_header_up');
                        appsDisplayDataTable.fnSort([[5, 'asc']]);
                    }
                    else
                    {
                        $(j_sortColumnId).attr('class', 'app_performance_app_name_header_down');
                        appsDisplayDataTable.fnSort([[5, 'desc']]);
                    }
                    $("#hsap_last_used").attr('class', 'app_performance_last_used_header');
                    $("#hsap_battery").attr('class', 'app_performance_battery_header');
                    $("#hsap_memory").attr('class', 'app_performance_memory_header');
                    $("#hsap_storage").attr('class', 'app_performance_storage_header');
                    break;
                case "hsap_last_used":  //sort for last used
                    if (current_class_name == 'app_performance_last_used_header_down')
                    {
                        $(j_sortColumnId).attr('class', 'app_performance_last_used_header_up');
                        appsDisplayDataTable.fnSort([[6, 'asc'], [5, 'asc']]);
                    }
                    else
                    {
                        $(j_sortColumnId).attr('class', 'app_performance_last_used_header_down');
                        appsDisplayDataTable.fnSort([[6, 'desc'], [5, 'asc']]);
                    }
                    $("#hsap_app_name").attr('class', 'app_performance_app_name_header');
                    $("#hsap_battery").attr('class', 'app_performance_battery_header');
                    $("#hsap_memory").attr('class', 'app_performance_memory_header');
                    $("#hsap_storage").attr('class', 'app_performance_storage_header');
                    break;
                case "hsap_battery":  //sort for battery usage
                    if (current_class_name == 'app_performance_battery_header_down')
                    {
                        $(j_sortColumnId).attr('class', 'app_performance_battery_header_up');
                        appsDisplayDataTable.fnSort([[7, 'asc'], [5, 'asc']]);
                    }
                    else
                    {
                        $(j_sortColumnId).attr('class', 'app_performance_battery_header_down');
                        appsDisplayDataTable.fnSort([[7, 'desc'], [5, 'asc']]);
                    }
                    $("#hsap_app_name").attr('class', 'app_performance_app_name_header');
                    $("#hsap_last_used").attr('class', 'app_performance_last_used_header');
                    $("#hsap_memory").attr('class', 'app_performance_memory_header');
                    $("#hsap_storage").attr('class', 'app_performance_storage_header');
                    break;
                case "hsap_memory":  //sort for memory usage
                    if (current_class_name == 'app_performance_memory_header_down')
                    {
                        $(j_sortColumnId).attr('class', 'app_performance_memory_header_up');
                        appsDisplayDataTable.fnSort([[8, 'asc'], [5, 'asc']]);
                    }
                    else
                    {
                        $(j_sortColumnId).attr('class', 'app_performance_memory_header_down');
                        appsDisplayDataTable.fnSort([[8, 'desc'], [5, 'asc']]);
                    }
                    $("#hsap_app_name").attr('class', 'app_performance_app_name_header');
                    $("#hsap_last_used").attr('class', 'app_performance_last_used_header');
                    $("#hsap_battery").attr('class', 'app_performance_battery_header');
                    $("#hsap_storage").attr('class', 'app_performance_storage_header');
                    break;
                case "hsap_storage": //sort for storage usage
                    if (current_class_name == 'app_performance_storage_header_down')
                    {
                        $(j_sortColumnId).attr('class', 'app_performance_storage_header_up');
                        appsDisplayDataTable.fnSort([[9, 'asc'], [5, 'asc']]);
                    }
                    else
                    {
                        $(j_sortColumnId).attr('class', 'app_performance_storage_header_down');
                        appsDisplayDataTable.fnSort([[9, 'desc'], [5, 'asc']]);
                    }
                    $("#hsap_app_name").attr('class', 'app_performance_app_name_header');
                    $("#hsap_last_used").attr('class', 'app_performance_last_used_header');
                    $("#hsap_battery").attr('class', 'app_performance_battery_header');
                    $("#hsap_memory").attr('class', 'app_performance_memory_header');
                    break;
            }

            appsDisplayDataTable.fnDraw();
        }
    	


	});
})();