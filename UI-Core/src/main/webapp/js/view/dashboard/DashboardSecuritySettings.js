/*! DashboardSecuritySettings */
(function () {

    AMA.namespace("view");

    var DashboardSecuritySettings = AMA.view.DashboardSecuritySettings = AMA.view.BaseView.extend();
	
    DashboardSecuritySettings.TEMPLATE_ID = "dashboard_security_settings_template";
    DashboardSecuritySettings.TEMPLATE_SRC = "";
	
	DashboardSecuritySettings.URL = "/appSecuritySettings";
	

    _.extend(DashboardSecuritySettings.prototype, {

        events: {
			"change .autoThreatScanFrequency" : "_settingOnChange",
			"click .btn_white" : "_saveSecuritySettings",
        	"click #edit_security_settings": "editSecuritySettings"
		},


        editSecuritySettings: function(){
            AMA.page.openSettings("security");
        },


        render: function() {
			var data = (this.data && this.data.length > 0) ? this.data.toJSON()[0] : {},
				content = "";

			var item = this._processData(data);
			content = _.template(this.template, item);
			
			this.$el.html(content);
			this._assignInitialValues(item);
		},
		

        _processData: function (item, index) {
			this.settings = item;
			
			var oSet = this.originalSettings = {};
			oSet.autoThreatScanFrequency =  item.autoThreatScanFrequency ? item.autoThreatScanFrequency.toUpperCase() : "NEVER";
			oSet.dayOfWeek = oSet.autoThreatScanFrequency == "WEEKLY" ? item.dayOfWeek.toUpperCase() : "";
			oSet.timeOfDay = oSet.autoThreatScanFrequency == "NEVER" ? "" : item.timeOfDay.toUpperCase();

			return oSet;
		},
		

        _assignInitialValues: function(item) {
			var $el = this.$el;
			var dropdowns = $el.find("select");
			
			_.each(dropdowns, function(el, index) {
				var $dropdown = $el.find("select." + el.className);
				
				if(!item[el.name]) {
					$dropdown.attr("disabled", "disabled");
				}
				
				$dropdown.find("option[value=" + item[el.name] + "]")
						.attr("selected", "selected");
			});
		},
		

        _settingOnChange: function(event) {
			var newVal = $(event.currentTarget).val();
			var $el = this.$el;
			
			$el.find(".dayOfWeek, .timeOfDay")
				.removeAttr("disabled");
				
			switch(newVal) {
				case "WEEKLY" :
					break;
				case "DAILY" :
					$el.find(".dayOfWeek").attr("disabled", "disabled");
					break;
				case "NEVER" :
				default : 
					$el.find(".dayOfWeek, .timeOfDay").attr("disabled", "disabled");
			}			
		},
		

        _saveSecuritySettings: function(event) {
			var $currTarget = this.$el.find(".btn_white");
			
			var dropdowns = this.$el.find("select");
			var newSettings = this.settings ? this.settings : {};

			_.each(dropdowns, function(el, index) {
				newSettings[el.name] = el.disabled ? "" : el.value;
			});

			if( (newSettings.autoThreatScanFrequency === this.originalSettings.autoThreatScanFrequency) &&
				(newSettings.dayOfWeek === this.originalSettings.dayOfWeek) &&
				(newSettings.timeOfDay === this.originalSettings.timeOfDay) ) {				
				AMA.Util.switchLabel(".after_save_message", ".no_changes", this.$el);
			}
			else {
				
				var options = {
					url: AMA.config.apiHostUrl + this.constructor.URL + "?devId=" + AMA.config.devId + "&endpointId=" + AMA.config.endpointId + "&authToken=" + AMA.config.authToken,
					beforeSend: function() {
						o.$el.find(".btn_white").hide()
							.next(".loader").show();
					},
					error: _.bind(this._onAjaxError, this),
					success: function() {
						//o.$el.find(".after_save_message").text("Successfully saved changes.");
						AMA.Util.switchLabel(".after_save_message", ".success", o.$el);
						
						o.$el.find(".btn_white").show()
							.next(".loader").hide();
					}
				}, 
				o = this;				
				
				var weeklyValidate = newSettings.autoThreatScanFrequency == "WEEKLY" && (!newSettings.dayOfWeek || !newSettings.timeOfDay);
				var dailyValidate = newSettings.autoThreatScanFrequency == "DAILY" && !newSettings.timeOfDay;
				
				if(weeklyValidate || dailyValidate) {
					AMA.Util.switchLabel(".after_save_message", ".blank_field", this.$el);
				}
				else {
					this.data.models[0].set(newSettings);
					AMA.debug("Security Settings sync data:"+JSON.stringify(this.data.models[0])); 
					
					this.data.sync("update", this.data.models[0], options);
				}
			}
		},
		

        _onAjaxError: function (jqXHR, error, errorThrown) {
			AMA.ActionManager._onAjaxError(jqXHR, error, errorThrown);
		}
    });
})();