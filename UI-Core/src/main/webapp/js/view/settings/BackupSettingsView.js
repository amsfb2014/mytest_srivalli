/*! BackupSettingsView */
(function () {

	AMA.namespace("view");


	/**
	 * This view shows the BackupSettingsView
	 *
	 * @class BackupSettingsView
	 * @namespace view
	 * @constructor
	 */
	var BackupSettingsView = AMA.view.BackupSettingsView = AMA.view.BaseView.extend();


	/**
	 * ID of the template
	 *
	 * @property TEMPLATE_ID
	 * @type string
	 * @static
	 * @final
	 */
	BackupSettingsView.TEMPLATE_ID = "backup_settings_template";

	/**
	 * Applicable only to view classes that fetch the aggregated templates for
	 * itself and its child views, this property defines the name of the
	 * template file to load. The path is defined in AMA.config.templatePath.
	 *
	 * @property TEMPLATE_SRC
	 * @type string
	 * @static
	 * @final
	 */
	BackupSettingsView.TEMPLATE_SRC = "";
	
	_.extend(BackupSettingsView.prototype, {

		_processData: function(item) {
			var data = {}, day="";
			data["frequency"] = {
				"NEVER": "",
				"DAILY": "",
				"WEEKLY": ""
			};
			data["day"] = {
				"MONDAY": "",
				"TUESDAY": "",
				"WEDNESDAY": "",
				"THURSDAY": "",
				"FRIDAY": "",
				"SATURDAY": "",
				"SUNDAY": ""
			};
			data["batteryLevelThreshold"] = {
				"10": "",
				"15": "",
				"20": ""
			};
			data["backupData"] = {
				"syncContacts": "",
				"syncPhotos": "",
				"syncVideos": ""
			};
			data["backupConnection"] = {
				"WifiOnly": "",
				"WifiOrMobileData": ""
			};

			if( item.autosyncDay ) {
				day=item.autosyncDay.toUpperCase();
			}
			else {
				day="";
			}
			data.frequency[item.autosyncTime] = "selected='selected'";
			data.day[day] = "selected='selected'";
			data.batteryLevelThreshold[item.autosyncBatteryThreshold] = "selected='selected'";
			if( item.syncContactsEnabled ) {
				data.backupData["syncContacts"]="checked";
			}
			if( item.syncPhotosEnabled ) {
				data.backupData["syncPhotos"]="checked";
			}
			if( item.syncVideosEnabled ) {
				data.backupData["syncVideos"]="checked";
			}			
			if( item.syncOnMobileData ) {
				data.backupConnection["WifiOrMobileData"]= "selected='selected'";
			}
			else {
				data.backupConnection["WifiOnly"]= "selected='selected'";
			}
			return data;
		},

		changeSchedule: function (val) {
			var $backupDaySelect = this.$el.find("select[name=backupDay]"),
			backupDaySelect = $backupDaySelect.get(0),
			backupDayValue,
			$backupBatteryLevelSelect = this.$el.find("select[name=backupBatteryLevel]"),
			backupBatteryLevelSelect = $backupBatteryLevelSelect.get(0),
			backupBatteryLevelValue;

			if (val === "NEVER" ) {
				$backupDaySelect.find("option").attr("selected",null);
				$backupDaySelect.attr("disabled","disabled");
				$backupBatteryLevelSelect.find("option").attr("selected",null);
				$backupBatteryLevelSelect.attr("disabled","disabled");
			}
			else {
				if(val === "DAILY") {
					$backupDaySelect.find("option").attr("selected",null);
					$backupDaySelect.attr("disabled","disabled");
				}
				else {
					backupDayValue = this.data.models[0].get("autosyncDay");
					$backupDaySelect.attr("disabled",null);
				}
				if (backupDayValue) {
					$backupDaySelect.selectedIndex = this.setSelectedIndex($backupDaySelect, backupDayValue.toUpperCase());
				}
				$backupBatteryLevelSelect.attr("disabled",null);
				backupBatteryLevelValue = this.data.models[0].get("autosyncBatteryThreshold");
				if (backupBatteryLevelValue) {
					$backupBatteryLevelSelect.selectedIndex = this.setSelectedIndex($backupBatteryLevelSelect, backupBatteryLevelValue);
				}
			}

		},
		//TODO: should this function go under BaseView?
		setSelectedIndex: function ($el, val) {
			var options = $el.find("option"),
			i = 0;

			_.each(options, function (item, index) {
				if (item.value === val) {
					i = index;
                    $(item).attr("selected", "selected");
				}
			});

			return i;
		},

		render: function () {
			var self = this;

			BackupSettingsView.__super__.render.apply(this, arguments);
		},

		_afterRender: function () {
			var $backupScheduleSelect = this.$el.find("select[name=backupSchedule]");
			BackupSettingsView.__super__._afterRender.apply(this, arguments);
			this.parent.hideElements();
			this.changeSchedule($backupScheduleSelect.val());
			// iPhone hides OK and Cancel buttons
			if( AMA.models.capabilities.canUpdate("mediaSettings") ) {
				$("#backup_submit").removeClass("hide");
			}
			else {
				this.$el.find(".backupSchedule").addClass("hide");
				this.$el.find(".backupDay").addClass("hide");
				this.$el.find(".backupBatteryRow").addClass("hide");
				this.$el.find(".backupConnection").addClass("hide");
				this.$el.find(".backupDataBreakdown").addClass("hide");
				$("#backup_submit").addClass("hide");
				
				this.$el.find(".backupSchedule_" + this.$el.find('select[name=backupSchedule]').val()).removeClass("hidden").addClass("readonly");
				
				if(this.$el.find('select[name=backupSchedule]').val() !== 'NEVER') {
					this.$el.find(".backupDay_" + this.$el.find('select[name=backupDay]').val()).removeClass("hidden").addClass("readonly");
					
					var backupdata = 'backupDataBreakdown';
					if(this.$el.find('#backupDataBreakdownContacts').attr('checked') === 'checked') {
						backupdata += '_Contacts';
					}
					if(this.$el.find('#backupDataBreakdownImages').attr('checked') === 'checked') {
						backupdata += '_Photos';
					}
					if(this.$el.find('#backupDataBreakdownVideos').attr('checked') === 'checked') {
						backupdata += '_Videos';
					}
					this.$el.find("."+backupdata).removeClass("hidden").addClass("readonly");
				}
				else {
					this.$el.find(".backupDayNote").addClass("hide");
					this.$el.find(".day_of_week").addClass("hide");
					this.$el.find(".backupDataBreakdowns").addClass("hide");
				}
				
				this.$el.find(".settings_note").show();
			}
		},

		events: {
			"click .btnBackupSync": "saveBackup"
		},

		_setupEvents: function () {
			var self = this,
			$backupScheduleSelect = this.$el.find("select[name=backupSchedule]");

			$backupScheduleSelect.on("change", function (){
				self.changeSchedule(this.value);
			});
		},

		saveBackup: function() {
			var section = 'backup';
			this.save(section);
		},
		save: function(section) {
			//$("#" + section + "_submit .after_save_message").html("");
			$(".settings_intro .intro_after_save_message").html("");

			var validationErrors = [];
			var changes = {};
			var profileData = {}; // current values go in here
			var updateCallbacks = [];

			// Backup Settings
			if ($(".settings_content .backup_settings").is(':visible')) {
				var returnObj = this.saveBackupSettings(".settings_content");
				$.extend(profileData, returnObj.profileData);
				$.extend(changes, returnObj.changes);
				var profileChanged = returnObj.settingsChanged;
				validationErrors = returnObj.validationErrors;
			}

			//If validation errors. Display them. No save!
			if(validationErrors != null && validationErrors != "") {
				AMA.Util.switchLabel(".validation_text", validationErrors, this.$el);
				return;
			}

			//If no changes made... No save!
			if(!profileChanged) {
				AMA.Util.switchLabel(".validation_text", ".no_changes", this.$el);
				return;
			}
			
			// Save settings
			$("#" + section + "_submit .connecting").show();

			var callback = this.afterBackupSettingsSave;
			this.saveSettings(profileData, profileChanged, callback.bind(this, profileData, changes, section));
		},

		saveBackupSettings: function(container)
		{
			var frequencyValue="", dayValue="", batteryLevelThresholdValue="", syncContactsValue="", syncPhotosValue="", syncVideosValue="",
			wifiValue="", mobileDataValue="", data = this.data.models[0];
			if(data) {
				frequencyValue = data.get("autosyncTime");
				if(data.get("autosyncDay")) {
					dayValue=data.get("autosyncDay").toUpperCase();
				}
				else {
					dayValue="";
				}
				batteryLevelThresholdValue = data.get("autosyncBatteryThreshold");
				syncContactsValue = ""+data.get("syncContactsEnabled");
				syncPhotosValue = ""+data.get("syncPhotosEnabled");
				syncVideosValue = ""+data.get("syncVideosEnabled");
				wifiValue = ""+data.get("syncOnWifi");
				mobileDataValue = ""+data.get("syncOnMobileData");
			}

			var settingsChanged = false;
			var changes = {};
			var profileData = {};

			profileData.frequency = $(container + " select[name='backupSchedule'] option:selected").val();
			//If a change was made to backup schedule
			if(profileData.frequency !== frequencyValue) {
				settingsChanged = true;
				AMA.debug("Backup Settings Save - Change made to backup schedule... Saving to history");
			}

			if(profileData.frequency !== "NEVER") {

				profileData.day = $(container + " select[name='backupDay'] option:selected").val();
				AMA.debug("Backup Settings Save - backup frequency: " + profileData.frequency);

				//If a change was made to day
				if(dayValue !== profileData.day) {
					settingsChanged = true;
					AMA.debug("Backup Settings Save - Change made to backup day... Saving to history");
				}
			}

			profileData.batteryLevelThreshold = $(container + " select[name='backupBatteryLevel'] option:selected").val();
			//If a change was made to day
			if(batteryLevelThresholdValue !== profileData.batteryLevelThreshold) {
				settingsChanged = true;
				AMA.debug("Backup Settings Save - Change made to backup battery level... Saving to history");
			}

			profileData.syncContacts = ""+$(container + " input[id='backupDataBreakdownContacts']").is(":checked");
			//If a change was made to real time scan
			if(syncContactsValue !== profileData.syncContacts) {
				settingsChanged = true;
				AMA.debug("Backup Settings Save - Change made to contacts sync flag... Saving to history");
			}

			profileData.syncPhotos = ""+$(container + " input[id='backupDataBreakdownImages']").is(":checked");
			//If a change was made to media scan
			if(syncPhotosValue !== profileData.syncPhotos) {
				settingsChanged = true;
				AMA.debug("Backup Settings Save - Change made to photos sync... Saving to history");
			}

			profileData.syncVideos = ""+$(container + " input[id='backupDataBreakdownVideos']").is(":checked");
			//If a change was made to tray notification
			if(syncVideosValue !== profileData.syncVideos) {
				settingsChanged = true;
				AMA.debug("Backup Settings Save - Change made to videos sync... Saving to history");
			}
			
			var backupConnectionSelected = ""+$(container + " select[name='backupConnection'] option:selected").val();
      		// WiFi
      		profileData.wifi = "true";

         	// Mobile Network
         	profileData.mobileData = "false";
         	if(backupConnectionSelected === 'wifiOrMobileNetwork') {
         		profileData.mobileData = "true";
         	}

			//If a change was made to wifi
			if(wifiValue !== profileData.wifi) {
				settingsChanged = true;
				AMA.debug("Backup Settings Save - Change made to wifi connection... Saving to history");
			}

			//If a change was made to mobile data
			if(mobileDataValue !== profileData.mobileData) {
				settingsChanged = true;
				AMA.debug("Backup Settings Save - Change made to wifi or mobile data connection... Saving to history");
			}
	
			//Validation
			var validationErrors = [];
			if( (profileData.frequency === "WEEKLY") && (profileData.day === "") ) {
				validationErrors.push(".blank_day");
				AMA.debug("Failed validation - Backup Settings - backup day");
			}
			if( profileData.frequency !== "NEVER" ) {
				if( (profileData.syncContacts === "false") && (profileData.syncPhotos === "false") && (profileData.syncVideos === "false") ) {
					validationErrors.push(".blank_data");
					AMA.debug("Failed validation - Backup Settings - backup sync data");
				}
			}

			var returnObj = {};
			returnObj.profileData = profileData;
			returnObj.changes = changes;
			returnObj.settingsChanged = settingsChanged;
			returnObj.validationErrors = validationErrors;

			return returnObj;
		},
		saveSettings: function(profileData, profileChanged, callback) {
			// save Security and security settings
			if(profileChanged) {

				this.data.models[0].set({
					"autosyncTime": profileData.frequency,
					"autosyncBatteryThreshold": profileData.batteryLevelThreshold,
					"autosyncDay": profileData.day,
					"syncContactsEnabled": (profileData.syncContacts==="true"),
					"syncPhotosEnabled": (profileData.syncPhotos==="true"),
					"syncVideosEnabled": (profileData.syncVideos==="true"),
					"syncOnWifi": (profileData.wifi=="true"),
					"syncOnMobileData": (profileData.mobileData=="true")
				});

AMA.debug("Backup Settings sync data:"+JSON.stringify(this.data.models[0]));  // TODO: remove this debug log before production
				var options = {
					url: AMA.models.syncsettings.url,
					success: callback,
					callback:callback,
					data:JSON.stringify(this.data.toJSON()[0])
				};

				this.data.sync("update", this.data.models[0], options);
			}
		},
		
		afterBackupSettingsSave: function(profileData, changes, section, data) {
			AMA.Util.switchLabel(".validation_text", ".success", this.$el);
		}
	});

})();
