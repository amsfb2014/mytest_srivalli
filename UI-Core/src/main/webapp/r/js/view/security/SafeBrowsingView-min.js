/*! SafeBrowsingView */
(function(){AMA.namespace("view");var a=AMA.view.SafeBrowsingView=AMA.view.BaseView.extend();a.TEMPLATE_ID="safe_browsing_tab_template";a.TEMPLATE_SRC="";AMA.augment(a.prototype,{render:function(){a.__super__.render.apply(this);AMA.debug("AMA.view.SafeBrowsingView rendered");var c=this.data.models[0];var b=c.get("safeBrowsingEnabled")},_processData:function(c){var e=(!c.safeBrowsingEnabled),b=(c.safeBrowsingEnabled),d={on:e?"active":"",off:b?"active":"",onChecked:e?"checked":"",offChecked:b?"checked":"",};return d},_setupEvents:function(){var b=this;$(this.$el).find(".btnSafeBrowsingSave").on("click",function(){var d=b.data.models[0];var c=""+d.get("safeBrowsingEnabled");if(c!==$(b.$el).find('input[name="safeBrowsing"]:checked').val()){b.saveSetting()}else{$(b.$el).find(".btnSafeBrowsingSaveMsg").html(AMA.config.legacyRecordTypes.ACCOUNT_SETTINGS.messages.noChanges);return}});$(this.$el).find(".editSetting").on("click",function(){AMA.page.openSettings("security")})},saveSetting:function(){AMA.page.standardDialogs.loading("");var b=("true"===$(this.el).find('input[name="safeBrowsing"]:checked').val());this.data.models[0].set({safeBrowsingEnabled:b});var c={url:this.data.url,success:this.saveSuccess,error:this.saveError,callback:this.successOrFailure,data:JSON.stringify(this.data.models[0].attributes)};this.data.sync("update",this.data.models[0],c)},saveSuccess:function(){AMA.page.standardDialogs.hideloading();$(".btnSafeBrowsingSaveMsg").html(AMA.config.legacyRecordTypes.ACCOUNT_SETTINGS.messages.settingsSaved)},saveError:function(){AMA.page.standardDialogs.hideloading();AMA.page.standardDialogs.error("Unable To Contact services");AMA.debug("Ajax completed with errors")},successOrFailure:function(b){AMA.page.standardDialogs.hideloading();if(b){$(".btnSafeBrowsingSaveMsg").html(AMA.config.legacyRecordTypes.ACCOUNT_SETTINGS.messages.settingsSaved)}else{AMA.page.standardDialogs.error("Unable To Contact services");AMA.debug("Ajax completed with errors")}}})})();