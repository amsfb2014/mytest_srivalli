/*! SecuritySettingsView */
(function () {

    AMA.namespace("view");

    var SecuritySettingsView = AMA.view.SecuritySettingsView = AMA.view.BaseView.extend();

    SecuritySettingsView.TEMPLATE_ID = "security_settings_template";
    SecuritySettingsView.TEMPLATE_SRC = "";

    AMA.augment(SecuritySettingsView.prototype, {

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
            data["range"] = {
                "AM12TO1": "",
                "AM1TO2": "",
                "AM2TO3": "",
                "AM3TO4": "",
                "AM4TO5": "",
                "AM5TO6": "",
                "AM6TO7": "",
                "AM7TO8": "",
                "AM8TO9": "",
                "AM9TO10": "",
                "AM10TO11": "",
                "AM11TO12": "",
                "PM12TO1": "",
                "PM1TO2": "",
                "PM2TO3": "",
                "PM3TO4": "",
                "PM4TO5": "",
                "PM5TO6": "",
                "PM6TO7": "",
                "PM7TO8": "",
                "PM8TO9": "",
                "PM9TO10": "",
                "PM10TO11": "",
                "PM11TO12": ""
            };
            data["realTimeScan"] = {
                "true": "",
                "false": ""
            };
            data["mediaScan"] = {
                "true": "",
                "false": ""
            };
            data["trayNotification"] = {
                "true": "",
                "false": ""
            };
            data["cloudAv"] = {
                "true": "",
                "false": ""
            };
            data["realTimeScanActive"] = {
                "true": "",
                "false": ""
            };
            data["mediaScanActive"] = {
                "true": "",
                "false": ""
            };
            data["trayNotificationActive"] = {
                "true": "",
                "false": ""
            };
            data["cloudAvActive"] = {
                "true": "",
                "false": ""
            };

            data.frequency[item.autoThreatScanFrequency] = "selected='selected'";
            if( item.dayOfWeek ) {
                day=item.dayOfWeek.toUpperCase();
            }
            else {
                day="";
            }
            data.day[day] = "selected='selected'";
            data.range[item.timeOfDay] = "selected='selected'";
            data.realTimeScan[""+item.realTimeScanEnabled] = "checked";
            data.mediaScan[""+item.mediaScanEnabled] = "checked";
            data.trayNotification[""+item.trayNotificationEnabled] = "checked";
            data.realTimeScanActive[""+item.realTimeScanEnabled] = "active";
            data.mediaScanActive[""+item.mediaScanEnabled] = "active";
            data.trayNotificationActive[""+item.trayNotificationEnabled] = "active";
            data.cloudAv[""+item.cloudAvEnabled] = "checked";
            data.cloudAvActive[""+item.cloudAvEnabled] = "active";

            AMA.debug("SecuritySettingsView _processData item:"+JSON.stringify(item)+", data:"+JSON.stringify(data));  //TODO: remove for production

            return data;
        },

        render: function () {
            var self = this;

            SecuritySettingsView.__super__.render.apply(this, arguments);
            // iPhone hides OK and Cancel buttons
            if( AMA.models.capabilities.canUpdate("appSecuritySettings") ) {
                $("#security_submit").removeClass("hide");
            }
            else {
                $("#security_submit").addClass("hide");
            }

            this.safeBrowsingTab = new AMA.view.SafeBrowsingView({
                el: "#safe_browsing_settings",
                parent: this,
                data: AMA.models.safeBrowsing
            });

            this.safeBrowsingTab._fetchData();

             this.safeBrowsingTab.once(AMA.view.BaseView.EVENT.DATA_LOADED, function() {
                 var safeBrowsingEnabled = this.data.models[0].get("safeBrowsingEnabled");
                 if (safeBrowsingEnabled) {
                     $(self.$el).find('#safeBrowsingOn').prop('checked', true);
                 } else {
                     $(self.$el).find('#safeBrowsingOff').prop('checked', true);
                 }
             });


        },

        _afterRender: function () {
            var $scanScheduleSelect = this.$el.find("select[name=scanSchedule]");
            SecuritySettingsView.__super__._afterRender.apply(this, arguments);

            this.parent.hideElements();
            this.changeSchedule($scanScheduleSelect.val());
        },

        _setupEvents: function () {
            var self = this,
                    $scanScheduleSelect = this.$el.find("select[name=scanSchedule]");

            $scanScheduleSelect.on("change", function (){
                self.changeSchedule(this.value);
            });

            var o = this;
            $(this.$el).find(".btnSafeBrowsingSave").on('click', function() {

                var data = AMA.models.safeBrowsing.models[0];//o.data.models[0];
                var safeBrowsingEnabled = ""+data.get("safeBrowsingEnabled");

                if(safeBrowsingEnabled !== $(o.$el).find('input[name="safeBrowsing"]:checked').val()) {
                    o.saveSafeBrowsingSetting();
                }else {
                    $(o.$el).find('.btnSafeBrowsingSaveMsg').html(AMA.config.legacyRecordTypes.ACCOUNT_SETTINGS.messages.noChanges);
                    return;
                }
                o.saveSecurity();

            });
        },
        saveSafeBrowsingSetting: function() {

            AMA.page.standardDialogs.loading("");

            var safeBrowsingEnabled = ("true"===$(this.el).find('input[name="safeBrowsing"]:checked').val());

            this.safeBrowsingTab.data.models[0].set({
                safeBrowsingEnabled: safeBrowsingEnabled
            });

            var options = {
                url: this.safeBrowsingTab.data.url,
                success: this.safeBrowsingTab.saveSuccess,
                error: this.safeBrowsingTab.saveError,
                callback: this.safeBrowsingTab.successOrFailure,
                data: JSON.stringify(this.safeBrowsingTab.data.models[0].attributes)
            };

            this.safeBrowsingTab.data.sync("update", this.safeBrowsingTab.data.models[0], options);

        },

        changeSchedule: function (val) {
            var $scanDaySelect = this.$el.find("select[name=scanDay]"),
                    scanDaySelect = $scanDaySelect.get(0),
                    scanDayValue,
                    $scanTimeSelect = this.$el.find("select[name=scanTime]"),
                    scanTimeSelect = $scanTimeSelect.get(0),
                    scanTimeValue;

            AMA.debug("SecuritySettingsView changeSchedule, frequency: " + val);  //TODO: remove for production

            if (val === "NEVER" ) {
                $scanDaySelect.find("option").attr("selected",null);
                $scanDaySelect.attr("disabled","disabled");
                $scanTimeSelect.find("option").attr("selected",null);
                $scanTimeSelect.attr("disabled","disabled");
            }
            else {
                if(val === "DAILY") {
                    $scanDaySelect.find("option").attr("selected",null);
                    $scanDaySelect.attr("disabled","disabled");
                }
                else {
                    scanDayValue = this.data.models[0].get("dayOfWeek");
                    $scanDaySelect.attr("disabled",null);
                }

                if (scanDayValue) {
                    $scanDaySelect.selectedIndex = this.setSelectedIndex($scanDaySelect, scanDayValue.toUpperCase());
                }

                scanTimeValue = this.data.models[0].get("timeOfDay");
                $(scanTimeSelect).attr("disabled",null);

                if (scanTimeValue) {
                    $scanTimeSelect.selectedIndex = this.setSelectedIndex($scanTimeSelect, scanTimeValue);
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
        events: {
            "click .btnSecuritySave": "saveSecurity"
        },
        saveSecurity: function() {
            var section = 'security';
            this.save(section);
        },
        save: function(section) {
            //$("#" + section + "_submit .after_save_message").html("");
            $(".settings_intro .intro_after_save_message").html("");

            var validationErrors = [];
            var changes = {};
            var profileData = {}; // current values go in here
            var updateCallbacks = [];

            // Security Settings
            if ($(".settings_content .security_settings").is(':visible')) {
                var returnObj = this.saveSecuritySettings(".settings_content");
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
                //this.showMessage(AMA.config.legacyRecordTypes.ACCOUNT_SETTINGS.messages.noChanges, section, false, null);
                AMA.Util.switchLabel(".validation_text", ".no_changes", this.$el);
                return;
            }

            // Save settings
            $("#" + section + "_submit .connecting").show();

            var callback = this.afterBackupSettingsSave;
            this.saveSettings(profileData, profileChanged, callback.bind(this, profileData, changes, section));
        },

        saveSecuritySettings: function(container)
        {
            var frequencyValue="", dayValue="", rangeValue="", realTimeScanValue="", mediaScanValue="", trayNotificationValue="",
                    cloudAvValue="", data = this.data.models[0];
            AMA.debug("Security Settings Save data:"+JSON.stringify(data));  // TODO: remove this debug log before production

            if(data) {
                frequencyValue = data.get("autoThreatScanFrequency");
                if( data.get("dayOfWeek") ) {
                    dayValue=data.get("dayOfWeek").toUpperCase();
                }
                else {
                    dayValue="";
                }
                rangeValue = data.get("timeOfDay");
                realTimeScanValue = ""+data.get("realTimeScanEnabled");
                mediaScanValue = ""+data.get("mediaScanEnabled");
                trayNotificationValue = ""+data.get("trayNotificationEnabled");
                cloudAvValue = ""+data.get("cloudAvEnabled");
                airplaneModeLockValue = ""+data.get("airplanModeLockEnabled");  // this won't be changed by UI as it's not shown, just retrieve value.
            }

            var settingsChanged = false;
            var changes = {};
            var profileData = {};

            profileData.frequency = $(container + " select[name='scanSchedule'] option:selected").val();
            //If a change was made to SecurityCheck
            if(profileData.frequency !== frequencyValue) {
                settingsChanged = true;
                AMA.debug("Security Settings Save - Change made to scan schedule... Saving to history");
            }

            if(profileData.frequency !== "NEVER") {

                profileData.day = $(container + " select[name='scanDay'] option:selected").val();
                AMA.debug("Security Settings Save - scan frequency: " + profileData.frequency);

                //If a change was made to day
                if(dayValue !== profileData.day) {
                    settingsChanged = true;
                    AMA.debug("Security Settings Save - Change made to scan day... Saving to history");
                }

                profileData.range = $(container + " select[name='scanTime'] option:selected").val();
                //If a change was made to day
                if(rangeValue !== profileData.range) {
                    settingsChanged = true;
                    AMA.debug("Security Settings Save - Change made to scan range... Saving to history");
                }
            }

            profileData.realTimeScan = $(container + " input[name='realTimeScan']:checked").val();
            //If a change was made to real time scan
            if(realTimeScanValue !== profileData.realTimeScan) {
                settingsChanged = true;
                AMA.debug("Security Settings Save - Change made to real time scan... Saving to history");
            }

            profileData.mediaScan = $(container + " input[name='autoMediaScan']:checked").val();
            //If a change was made to media scan
            if(mediaScanValue !== profileData.mediaScan) {
                settingsChanged = true;
                AMA.debug("Security Settings Save - Change made to media scan... Saving to history");
            }

            profileData.trayNotification = $(container + " input[name='trayNotify']:checked").val();
            //If a change was made to tray notification
            if(trayNotificationValue !== profileData.trayNotification) {
                settingsChanged = true;
                AMA.debug("Security Settings Save - Change made to tray notification... Saving to history");
            }

            profileData.cloudAv = $(container + " input[name='cloudAV']:checked").val();
            //If a change was made to tray notification
            if(cloudAvValue !== profileData.cloudAv) {
                settingsChanged = true;
                AMA.debug("Security Settings Save - Change made to cloud AV... Saving to history");
            }

            profileData.airplaneModeLock = airplaneModeLockValue;  // this won't be changed by UI, just repeat it back

            //Validation
            var validationErrors = [];
            if(profileData.frequency !== "NEVER")
            {

                if(profileData.frequency === "WEEKLY" && profileData.day === "")
                {
                    validationErrors.push(".blank_day");
                    AMA.debug("Failed validation - Security - scan schedule");
                }

                if(profileData.range === "") {
                    validationErrors.push(".blank_range");
                    AMA.debug("Failed validation - Security - scan range");
                }
            }

            var returnObj = {};
            returnObj.profileData = profileData;
            returnObj.changes = changes;
            returnObj.settingsChanged = settingsChanged;
            returnObj.validationErrors = validationErrors;

            return returnObj;
        },
        saveSettings: function(profileData, profileChanged, callback)
        {
            // save Security and security settings
            if(profileChanged) {

                this.data.models[0].set({
                    "autoThreatScanFrequency": profileData.frequency,
                    "dayOfWeek": profileData.day,
                    "timeOfDay": profileData.range,
                    "realTimeScanEnabled": (profileData.realTimeScan==="true"),
                    "mediaScanEnabled": (profileData.mediaScan==="true"),
                    "trayNotificationEnabled": (profileData.trayNotification=="true"),
                    "cloudAvEnabled": (profileData.cloudAv=="true"),
                    "airplaneModeLockEnabled": (profileData.airplaneModeLock=="true")
                });

                AMA.debug("Security Settings sync data:"+JSON.stringify(this.data.models[0]));  // TODO: remove this debug log before production
                var options = {
                    url: AMA.models.scansettings.url,
                    success: callback,
                    callback:callback,
                    data:JSON.stringify(this.data.toJSON()[0])
                };

                this.data.sync("update", this.data.models[0], options);
            }
        },
        afterBackupSettingsSave: function(profileData, changes, section, data)
        {
            AMA.page.standardDialogs.hideloading();
            AMA.Util.switchLabel(".validation_text", ".success", this.$el);
        }

    });
})();
