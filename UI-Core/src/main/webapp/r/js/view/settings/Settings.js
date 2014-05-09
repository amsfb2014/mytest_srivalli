/*! SettingsView */
(function () {

	AMA.namespace("view");

	var Settings = AMA.view.Settings = AMA.view.BaseView.extend();

	Settings.TEMPLATE_ID = "settings_template";
	Settings.TEMPLATE_SRC = "settings.tpl";
    

	AMA.augment(Settings.prototype, {
		initialize: function () {
			Settings.__super__.initialize.apply(this, arguments);
			
			this.events = Settings.EVENT;
		},
		
		render: function () {
			Settings.__super__.render.apply(this, arguments);
			
			// Create the Settings dialog
			this.settingsDialog = new AMA.view.SettingsDialog({
				el: "#settings_dialog",
				parent: this,
				settingsIntro: false,
				backupSettings: AMA.models.capabilities.canRead("mediaSettings"),
				locationSettings: AMA.models.capabilities.canRead("eventSettings"),
				profileSettings: true,
				securitySettings: AMA.models.capabilities.canRead("appSecuritySettings"),
				safeBrowsingSettings: AMA.models.capabilities.canRead("browserSecuritySettings")
			})
			.plug(AMA.view.plugin.Switcher);
		},
		
		_setupEvents: function () {
		    this.$el.find(".settings_nav_button").on("click", function () {
		        $(this).find("a").get(0).click();
		    });
		    var o=this;
            this.$el.find("#myTabDrop1").dropdown();
		},
		
		show: function (tab, prevURL) {
			if (prevURL) {
				this.settingsDialog._config.prevURL = prevURL;
			}
			if (!this.settingsDialog.isRendered) {
			    var o = this;
			    this.settingsDialog.on(AMA.view.BaseView.EVENT.RENDERED, function () {
			        o.openSettingsDialog(tab);
			    });
                return;
            }
            this.openSettingsDialog(tab);
		},
		
		openSettingsDialog: function (tab) {
            if(!this.settingsDialog.$el.is(":visible")) {
                $("#account_settings_link").toggleClass("active");
                AMA.page.content.$el.toggleClass("hidden");
                this.settingsDialog.show();
            }
		    this.settingsDialog.options.defaultTab = tab;
            this.$el.find(".nav-tabs li").removeClass("active");
            switch (tab) {
                case 'backup' :
                    if (this.settingsDialog.backupSettings) {
                        this.$el.find(".nav-tabs .settings_nav_button_backup").parent().addClass("active");
                        this.settingsDialog.switchTo(this.settingsDialog.backupSettings);
                    }
                    break;
                case 'location' :
                    if (this.settingsDialog.locationSettings) {
                        this.$el.find(".nav-tabs .settings_nav_button_location").parent().addClass("active");
                        this.settingsDialog.switchTo(this.settingsDialog.locationSettings);
                    }
                    break;
                case 'security' :
                    if (this.settingsDialog.securitySettings) {
                        this.$el.find(".nav-tabs .settings_nav_button_security").parent().addClass("active");
                        this.settingsDialog.switchTo(this.settingsDialog.securitySettings);
                    }
                    break;
                default :
                    if (this.settingsDialog.profileSettings) {
                        this.$el.find(".nav-tabs .settings_nav_button_profile").parent().addClass("active");
                        this.settingsDialog.switchTo(this.settingsDialog.profileSettings);
                    } 
                    break;
            }
		}
	});
})();