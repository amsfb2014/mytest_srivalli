/*! SafeBrowsingView */
(function () {

    AMA.namespace("view");

    var SafeBrowsingView = AMA.view.SafeBrowsingView = AMA.view.BaseView.extend();

    SafeBrowsingView.TEMPLATE_ID = "safe_browsing_tab_template";
    SafeBrowsingView.TEMPLATE_SRC = "";

    AMA.augment(SafeBrowsingView.prototype, {
    
        render: function () {            
        
            SafeBrowsingView.__super__.render.apply(this);
            AMA.debug('AMA.view.SafeBrowsingView rendered');
            
            var data = this.data.models[0];
            var safeBrowsingEnabled = data.get("safeBrowsingEnabled");        

        },        
        _processData: function(item) {

            var active = (!item.safeBrowsingEnabled),
                inactive = (item.safeBrowsingEnabled),
                data = {
                    on:active ? "active" : "",
                    off:inactive ? "active" : "",
                    onChecked: active ? "checked" : "",
                    offChecked: inactive ? "checked" : "",
                }
            return data;
        },
        _setupEvents: function() {
            var o = this;
            $(this.$el).find(".btnSafeBrowsingSave").on('click', function() {
                
                var data = o.data.models[0];
                var safeBrowsingEnabled = ""+data.get("safeBrowsingEnabled");
                
                if(safeBrowsingEnabled !== $(o.$el).find('input[name="safeBrowsing"]:checked').val()) {
                    o.saveSetting();
                }else {
                    $(o.$el).find('.btnSafeBrowsingSaveMsg').html(AMA.config.legacyRecordTypes.ACCOUNT_SETTINGS.messages.noChanges);
                    return;
                }
                
            });
            /*$(this.$el).find(".safebrowsing_settings_value").on('click', function() {
                AMA.page.openSettings("security");
            });*/
            $(this.$el).find(".editSetting").on('click', function() {
                AMA.page.openSettings("security");
            });
        },
        
        saveSetting: function() { 
            
            AMA.page.standardDialogs.loading("");

            var safeBrowsingEnabled = ("true"===$(this.el).find('input[name="safeBrowsing"]:checked').val());
            
            this.data.models[0].set({
                safeBrowsingEnabled: safeBrowsingEnabled
            });

            var options = {
                    url: this.data.url,
                    success: this.saveSuccess, 
                    error: this.saveError,
                    callback: this.successOrFailure,
                    data: JSON.stringify(this.data.models[0].attributes)
            };

            this.data.sync("update", this.data.models[0], options); 
        
        },
        
        saveSuccess: function() {
            AMA.page.standardDialogs.hideloading();            
            $('.btnSafeBrowsingSaveMsg').html(AMA.config.legacyRecordTypes.ACCOUNT_SETTINGS.messages.settingsSaved);
        },
        
        saveError: function() {
            AMA.page.standardDialogs.hideloading();
            AMA.page.standardDialogs.error("Unable To Contact services");
            AMA.debug("Ajax completed with errors");
        },
        
        successOrFailure: function(isSuccess) {
            AMA.page.standardDialogs.hideloading();
            if(isSuccess) {
                $('.btnSafeBrowsingSaveMsg').html(AMA.config.legacyRecordTypes.ACCOUNT_SETTINGS.messages.settingsSaved);
            }
            else {
                AMA.page.standardDialogs.error("Unable To Contact services");
                AMA.debug("Ajax completed with errors");
            }
        }
        
    });
})();