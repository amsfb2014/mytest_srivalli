/*! LocationSettingsView */
(function () {

    AMA.namespace("view");

    var LocationSettingsView = AMA.view.LocationSettingsView = AMA.view.BaseView.extend();

    LocationSettingsView.TEMPLATE_ID = "location_settings_template";
    LocationSettingsView.TEMPLATE_SRC = "";


    AMA.augment(LocationSettingsView.prototype, {

        _processData: function(item) {
            var data = {};
            data["locationCheck"] = {
                "true": "",
                "false": ""
            };
            data["frequencyMinutes"] = {
                "1": "",
                "3": "",
                "6": ""
            };
            data["batteryLevelThreshold"] = {
                "10": "",
                "20": "",
                "30": "",
                "40": "",
                "50": "",
                "60": ""
            };

            data.locationCheck[(item.locationEnabled) ? "true" : "false"] = "selected='selected'";
            data.frequencyMinutes[item.frequencyMinutes] = "selected='selected'";
            data.batteryLevelThreshold[item.batteryLevelThreshold] = "selected='selected'";
            return data;
        },
        render: function () {
            LocationSettingsView.__super__.render.apply(this, arguments);
        },

        _afterRender: function () {
            var $locationChecksSelect = this.$el.find("select[name=location_check]");
            LocationSettingsView.__super__._afterRender.apply(this, arguments);

            this.parent.hideElements();
            this.changeLocationChecks($locationChecksSelect.val());
            // iPhone hides OK and Cancel buttons
            if( AMA.models.capabilities.canUpdate("eventSettings") ) {
                $("#locations_submit").removeClass("hide");
            }
            else {
                this.$el.find(".location_check").addClass("hide");
                this.$el.find(".frequencyMin").addClass("hide");
                this.$el.find(".battery_level").addClass("hide");
                this.$el.find(".locationbatterynote").addClass("hide");
                $("#locations_submit").addClass("hide");

                this.$el.find(".location_check_" + this.$el.find('select[name=location_check]').val()).removeClass("hidden").addClass("readonly");
                if(this.$el.find('select[name=location_check]').val() === 'true') {
                    this.$el.find(".frequency_" + this.$el.find('select[name=frequency]').val()).removeClass("hidden").addClass("readonly");
                }
                else {
                    this.$el.find(".frequency").addClass("hide");
                }
                this.$el.find(".settings_note").show();
            }
        },

        _setupEvents: function () {
            var o = this,
                    $locationChecksSelect = this.$el.find("select[name=location_check]");

            $locationChecksSelect.on("change", function (){
                o.changeLocationChecks(this.value);
            });
        },

        changeLocationChecks: function (val) {
            var $locationFrequencySelect = this.$el.find("select[name=frequency]"),
                    locationFrequencySelect = $locationFrequencySelect.get(0),
                    locationFrequencyValue,
                    $locationBatteryLevelSelect = this.$el.find("select[name=battery_level]"),
                    locationBatteryLevelSelect = $locationBatteryLevelSelect.get(0),
                    locationBatteryLevelValue;

            if (val === "false") {
                $locationFrequencySelect.find("option").attr("selected",null);
                $locationFrequencySelect.attr("disabled","disabled");
                $locationBatteryLevelSelect.find("option").attr("selected",null);
                $locationBatteryLevelSelect.attr("disabled","disabled");
            }
            else {
                locationFrequencyValue = "" + this.data.models[0].get("frequencyMinutes");
                $locationFrequencySelect.attr("disabled",null);

                if (locationFrequencyValue) {
                    $locationFrequencySelect.selectedIndex = this.setSelectedIndex($locationFrequencySelect, locationFrequencyValue);
                }

                locationBatteryLevelValue = this.data.models[0].get("batteryLevelThreshold");
                $locationBatteryLevelSelect.attr("disabled",null);

                if (locationBatteryLevelValue) {
                    $locationBatteryLevelSelect.selectedIndex = this.setSelectedIndex($locationBatteryLevelSelect, locationBatteryLevelValue);
                }
                AMA.debug("changeLocationChecks, locationFrequencyValue: " + locationFrequencyValue + ", locationBatteryLevelValue: " + locationBatteryLevelValue);
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
            "click .btnLocationSave": "saveLocation"
        },
        saveLocation: function() {
            var section = 'locations';
            this.save(section);
        },
        save: function(section) {
            //$("#" + section + "_submit .after_save_message").html("");
            $(".settings_intro .intro_after_save_message").html("");

            var hasErrors = "";
            var changes = {};
            var profileData = {}; // current values go in here
            var updateCallbacks = [];

            // Location Settings
            if ($(".settings_content .location_settings").is(':visible')) {
                var returnObj = this.saveLocationSettings(".settings_content");
                $.extend(profileData, returnObj.profileData);
                $.extend(changes, returnObj.changes);
                var profileChanged = returnObj.settingsChanged;
                hasErrors = returnObj.hasErrors;
            }

            //If validation errors. Display them. No save!
            if(hasErrors) return;

            //If no changes made... No save!
            if(!profileChanged)
            {
                AMA.Util.switchLabel(".validation_text", ".noChanges", this.$el);
                this.$el.find(".after_save_message").removeClass('hidden');
                return;
            }

            // Save settings
            $("#" + section + "_submit .connecting").show();

            var callback = this.afterBackupSettingsSave;
            this.saveSettings(profileData, profileChanged, callback.bind(this, profileData, changes, section));
        },
        saveLocationSettings: function(container)
        {
            var locationChecksValue = "", locationFrequencyValue = "", locationBatteryValue = "", data = this.data.models[0];
            AMA.debug("Location Settings Save data:"+JSON.stringify(data));  // TODO: remove this debug log before production

            if(data){
                locationChecksValue = ""+data.get("locationEnabled");
                locationFrequencyValue = ""+data.get("frequencyMinutes");
                locationBatteryValue = data.get("batteryLevelThreshold");
            }

            var settingsChanged = false;
            var changes = {};
            var profileData = {};

            profileData.locationCheck = $(container + " select[name='location_check'] option:selected").val();
            //If a change was made to locationCheck
            if(profileData.locationCheck !== locationChecksValue)
            {
                settingsChanged = true;
                AMA.debug("Location Settings Save - Change made to Location Check Changed... Saving to history");
            }

            if(profileData.locationCheck === "true")
            {
                profileData.frequency = $.trim($(container + " select[name='frequency'] option:selected").val());
                AMA.debug("Location Settings Save - Frequency: " + profileData.frequency);
                //If a change was made to frequency
                if(locationFrequencyValue !== profileData.frequency)
                {
                    settingsChanged = true;
                    AMA.debug("Location Settings Save - Change made to Frequency... Saving to history");
                }

                //If battery level is hidden then don't add it to the situation record
                if($(container + " .battery_level").css('display') !== "none")
                {
                    profileData.batteryLevel = $.trim($(container + " select[name='battery_level'] option:selected").val());
                    AMA.debug("Location Settings Save - Battery Level: " + profileData.batteryLevel);
                    //If a change was made to batteryLevel
                    if(locationBatteryValue !== profileData.batteryLevel)
                    {
                        settingsChanged = true;
                        AMA.debug("Location Settings Save - Change made to Battery Level... Saving to history");
                    }
                }
            }

            //Validation
            var hasErrors = false;
            if(profileData.locationCheck === "true")
            {
                if(profileData.frequency === "" && profileData.batteryLevel === "") {
                    AMA.Util.switchLabel(".validation_text", ".noFreqAndLevel", this.$el);
                    this.$el.find(".after_save_message").removeClass('hidden');
                    AMA.debug("Failed validation - location - frequency");
                    AMA.debug("Failed validation - location - battery");
                }
                else if(profileData.frequency === "")
                {
                    AMA.Util.switchLabel(".validation_text", ".noFreq", this.$el);
                    this.$el.find(".after_save_message").removeClass('hidden');
                    //validationErrors += "Please select a location check frequency.<br/>";
                    AMA.debug("Failed validation - location - frequency");
                }
                else if(profileData.batteryLevel === "")
                {
                    AMA.Util.switchLabel(".validation_text", ".noBattLevel", this.$el);
                    this.$el.find(".after_save_message").removeClass('hidden');
                    //validationErrors += "Please select a location check battery level.<br/>";
                    AMA.debug("Failed validation - location - battery");
                }

                if(profileData.frequency === "" || profileData.batteryLevel === "") {
                    hasErrors = true;
                }
            }

            var returnObj = {};
            returnObj.profileData = profileData;
            returnObj.changes = changes;
            returnObj.settingsChanged = settingsChanged;
            returnObj.hasErrors = hasErrors;

            return returnObj;
        },
        saveSettings: function(profileData, profileChanged, callback)
        {
            // save location and security settings
            if(profileChanged) {

                this.data.models[0].set({
                    locationEnabled: (profileData.locationCheck==="true"),
                    frequencyMinutes : Number(profileData.frequency),
                    batteryLevelThreshold : profileData.batteryLevel
                });

                AMA.debug("Location Settings sync data:"+JSON.stringify(this.data.models[0]));  // TODO: remove this debug log before production
                var options = {
                    url: AMA.models.locatesettings.url,
                    success: callback,
                    callback:callback,
                    data:JSON.stringify(this.data.toJSON()[0])
                };

                this.data.sync("update", this.data.models[0], options);
            }
        },

        afterBackupSettingsSave: function(profileData, changes, section, data)
        {
            AMA.Util.switchLabel(".validation_text", ".settingsSaved", this.$el);
            this.$el.find(".after_save_message").removeClass("hidden");
            AMA.models.endpointHistory.fetch();
            AMA.models.devicesettings.fetch();
        }

    });
})();
