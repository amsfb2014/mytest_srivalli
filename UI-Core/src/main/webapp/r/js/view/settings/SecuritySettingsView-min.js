/*! SecuritySettingsView */
(function(){AMA.namespace("view");var a=AMA.view.SecuritySettingsView=AMA.view.BaseView.extend();a.TEMPLATE_ID="security_settings_template";a.TEMPLATE_SRC="";AMA.augment(a.prototype,{initialize:function(){a.__super__.initialize.apply(this,arguments);this.safeBrowsingTab=AMA.models.safeBrowsing},_processData:function(c){var d={},b="";d.frequency={NEVER:"",DAILY:"",WEEKLY:""};d.day={MONDAY:"",TUESDAY:"",WEDNESDAY:"",THURSDAY:"",FRIDAY:"",SATURDAY:"",SUNDAY:""};d.range={AM12TO1:"",AM1TO2:"",AM2TO3:"",AM3TO4:"",AM4TO5:"",AM5TO6:"",AM6TO7:"",AM7TO8:"",AM8TO9:"",AM9TO10:"",AM10TO11:"",AM11TO12:"",PM12TO1:"",PM1TO2:"",PM2TO3:"",PM3TO4:"",PM4TO5:"",PM5TO6:"",PM6TO7:"",PM7TO8:"",PM8TO9:"",PM9TO10:"",PM10TO11:"",PM11TO12:""};d.realTimeScan={"true":"","false":""};d.mediaScan={"true":"","false":""};d.trayNotification={"true":"","false":""};d.cloudAv={"true":"","false":""};d.realTimeScanActive={"true":"","false":""};d.mediaScanActive={"true":"","false":""};d.trayNotificationActive={"true":"","false":""};d.cloudAvActive={"true":"","false":""};d.frequency[c.autoThreatScanFrequency]="selected='selected'";if(c.dayOfWeek){b=c.dayOfWeek.toUpperCase()}else{b=""}d.day[b]="selected='selected'";d.range[c.timeOfDay]="selected='selected'";d.realTimeScan[""+c.realTimeScanEnabled]="checked";d.mediaScan[""+c.mediaScanEnabled]="checked";d.trayNotification[""+c.trayNotificationEnabled]="checked";d.realTimeScanActive[""+c.realTimeScanEnabled]="active";d.mediaScanActive[""+c.mediaScanEnabled]="active";d.trayNotificationActive[""+c.trayNotificationEnabled]="active";d.cloudAv[""+c.cloudAvEnabled]="checked";d.cloudAvActive[""+c.cloudAvEnabled]="active";AMA.debug("SecuritySettingsView _processData item:"+JSON.stringify(c)+", data:"+JSON.stringify(d));return d},render:function(){var b=this;a.__super__.render.apply(this,arguments);if(AMA.models.capabilities.canUpdate("appSecuritySettings")){$("#security_submit").removeClass("hide")}else{$("#security_submit").addClass("hide")}this.safeBrowsingTab.fetch({silent:true,success:function(d){var c=d.models[0].get("safeBrowsingEnabled");if(c){$(b.$el).find(".safeBrowsingToggle .on").toggleClass("active").find("input").prop("checked",true)}else{$(b.$el).find(".safeBrowsingToggle .off").toggleClass("active").find("input").prop("checked",true)}}})},_afterRender:function(){var b=this.$el.find("select[name=scanSchedule]");a.__super__._afterRender.apply(this,arguments);this.parent.hideElements();this.changeSchedule(b.val())},_setupEvents:function(){var c=this,b=this.$el.find("select[name=scanSchedule]");b.on("change",function(){c.changeSchedule(this.value)});var d=this;$(this.$el).find(".btnSafeBrowsingSave").on("click",function(){d.saveSecurity()})},saveSafeBrowsingSetting:function(){AMA.page.standardDialogs.loading("");var b=("true"===$(this.el).find('input[name="safeBrowsing"]:checked').val());this.safeBrowsingTab.models[0].set({safeBrowsingEnabled:b});var c={url:this.safeBrowsingTab.url,success:$.proxy(this.saveSuccess,this),error:$.proxy(this.saveError,this),callback:$.proxy(this.successOrFailure,this),data:JSON.stringify(this.safeBrowsingTab.models[0].attributes)};this.safeBrowsingTab.sync("update",this.safeBrowsingTab.models[0],c)},changeSchedule:function(h){var g=this.$el.find("select[name=scanDay]"),e=g.get(0),f,d=this.$el.find("select[name=scanTime]"),b=d.get(0),c;AMA.debug("SecuritySettingsView changeSchedule, frequency: "+h);if(h==="NEVER"){g.find("option").attr("selected",null);g.attr("disabled","disabled");d.find("option").attr("selected",null);d.attr("disabled","disabled")}else{if(h==="DAILY"){g.find("option").attr("selected",null);g.attr("disabled","disabled")}else{f=this.data.models[0].get("dayOfWeek");g.attr("disabled",null)}if(f){g.selectedIndex=this.setSelectedIndex(g,f.toUpperCase())}c=this.data.models[0].get("timeOfDay");$(b).attr("disabled",null);if(c){d.selectedIndex=this.setSelectedIndex(d,c)}}},setSelectedIndex:function(d,e){var b=d.find("option"),c=0;_.each(b,function(g,f){if(g.value===e){c=f;$(g).attr("selected","selected")}});return c},events:{"click .btnSecuritySave":"saveSecurity"},saveSecurity:function(){var b="security";this.save(b)},save:function(i){$(".settings_intro .intro_after_save_message").html("");var l=[],h={},d={},g=[],e=AMA.models.safeBrowsing.models[0],f=""+e.get("safeBrowsingEnabled"),b=(f===$(this.$el).find('input[name="safeBrowsing"]:checked').val());if($(".settings_content .security_settings").is(":visible")){var j=this.saveSecuritySettings(".settings_content");$.extend(d,j.profileData);$.extend(h,j.changes);var c=j.settingsChanged;l=j.validationErrors}if(l!=null&&l!=""){AMA.Util.switchLabel(".validation_text",l,this.$el);this.$el.find(".after_save_message").removeClass("hidden");return}if(!c&&b){AMA.Util.switchLabel(".validation_text",".no_changes",this.$el);this.$el.find(".after_save_message").removeClass("hidden");return}if(!b){this.saveSafeBrowsingSetting()}$("#"+i+"_submit .connecting").show();var k=this.afterBackupSettingsSave;if(c){this.saveSettings(d,c,k.bind(this,d,h,i))}},saveSecuritySettings:function(b){var i="",f="",k="",e="",d="",c="",l="",h=this.data.models[0];AMA.debug("Security Settings Save data:"+JSON.stringify(h));if(h){i=h.get("autoThreatScanFrequency");if(h.get("dayOfWeek")){f=h.get("dayOfWeek").toUpperCase()}else{f=""}k=h.get("timeOfDay");e=""+h.get("realTimeScanEnabled");d=""+h.get("mediaScanEnabled");c=""+h.get("trayNotificationEnabled");l=""+h.get("cloudAvEnabled");airplaneModeLockValue=""+h.get("airplanModeLockEnabled")}var j=false;var m={};var g={};g.frequency=$(b+" select[name='scanSchedule'] option:selected").val();if(g.frequency!==i){j=true;AMA.debug("Security Settings Save - Change made to scan schedule... Saving to history")}if(g.frequency!=="NEVER"){if(g.frequency!=="DAILY"){g.day=$(b+" select[name='scanDay'] option:selected").val();AMA.debug("Security Settings Save - scan frequency: "+g.frequency);if(f!==g.day){j=true;AMA.debug("Security Settings Save - Change made to scan day... Saving to history")}}g.range=$(b+" select[name='scanTime'] option:selected").val();if(k!==g.range){j=true;AMA.debug("Security Settings Save - Change made to scan range... Saving to history")}}g.realTimeScan=$(b+" input[name='realTimeScan']:checked").val();if(e!==g.realTimeScan){j=true;AMA.debug("Security Settings Save - Change made to real time scan... Saving to history")}g.mediaScan=$(b+" input[name='autoMediaScan']:checked").val();if(d!==g.mediaScan){j=true;AMA.debug("Security Settings Save - Change made to media scan... Saving to history")}g.trayNotification=$(b+" input[name='trayNotify']:checked").val();if(c!==g.trayNotification){j=true;AMA.debug("Security Settings Save - Change made to tray notification... Saving to history")}g.cloudAv=$(b+" input[name='cloudAV']:checked").val();if(l!==g.cloudAv){j=true;AMA.debug("Security Settings Save - Change made to cloud AV... Saving to history")}g.airplaneModeLock=airplaneModeLockValue;var o=[];if(g.frequency!=="NEVER"){if(g.frequency==="WEEKLY"&&g.day===""){o.push(".blank_day");AMA.debug("Failed validation - Security - scan schedule")}if(g.range===""){o.push(".blank_range");AMA.debug("Failed validation - Security - scan range")}}var n={};n.profileData=g;n.changes=m;n.settingsChanged=j;n.validationErrors=o;return n},saveSettings:function(d,c,e){if(c){this.data.models[0].set({autoThreatScanFrequency:d.frequency,dayOfWeek:d.day,timeOfDay:d.range,realTimeScanEnabled:(d.realTimeScan==="true"),mediaScanEnabled:(d.mediaScan==="true"),trayNotificationEnabled:(d.trayNotification=="true"),cloudAvEnabled:(d.cloudAv=="true"),airplaneModeLockEnabled:(d.airplaneModeLock=="true")});AMA.debug("Security Settings sync data:"+JSON.stringify(this.data.models[0]));var b={url:AMA.models.scansettings.url,success:e,callback:e,data:JSON.stringify(this.data.toJSON()[0])};this.data.sync("update",this.data.models[0],b)}},afterBackupSettingsSave:function(e,b,d,c){AMA.page.standardDialogs.hideloading();AMA.Util.switchLabel(".validation_text",".settingsSaved",this.$el);this.$el.find(".after_save_message").removeClass("hidden")},saveSuccess:function(){AMA.page.standardDialogs.hideloading();AMA.Util.switchLabel(".validation_text",".settingsSaved",this.$el);this.$el.find(".after_save_message").removeClass("hidden")},saveError:function(){AMA.page.standardDialogs.hideloading();AMA.page.standardDialogs.error("Unable To Contact services");AMA.debug("Ajax completed with errors")},successOrFailure:function(b){AMA.page.standardDialogs.hideloading();if(b){AMA.Util.switchLabel(".validation_text",".settingsSaved",this.$el);this.$el.find(".after_save_message").removeClass("hidden")}else{AMA.page.standardDialogs.error("Unable To Contact services");AMA.debug("Ajax completed with errors")}}})})();