/*! SafeBrowsingTabView */
(function () {

    AMA.namespace("view");

    var SafeBrowsingView = AMA.view.SafeBrowsingTabView = AMA.view.BaseView.extend();

    SafeBrowsingView.TEMPLATE_ID = "safe_browsing_tab_template";
    SafeBrowsingView.TEMPLATE_SRC = "safeBrowsingTab.tpl";
    SafeBrowsingView.TOOLBAR = {
            DEFAULT : [
                "endpoint"
            ],
            IPHONE : [
    			"endpoint"
            ]
        };

    AMA.augment(SafeBrowsingView.prototype, {
    
		render: function () {        	
        
        	SafeBrowsingView.__super__.render.apply(this);
			AMA.debug('AMA.view.SafeBrowsingView rendered');
			
			var data = this.data.models[0];
			var safeBrowsingEnabled = data.get("safeBrowsingEnabled");		
			
			if(safeBrowsingEnabled)
				$(this.$el).find('#safeBrowsingOn').prop('checked',true);
			else
				$(this.$el).find('#safeBrowsingOff').prop('checked',true);
			
		},	    
	    
	    _setupEvents: function() {
	    	var o = this;
            $(this.$el).find(".btnSafeBrowsingSave").on('click', function() {             	            	
            	
            	var data = o.data.models[0];
				var safeBrowsingEnabled = ""+data.get("safeBrowsingEnabled");
            	
            	if(safeBrowsingEnabled !== $(o.$el).find('input[name="safeBrowsing"]:checked').val()) {
            		o.saveSetting();
            	}else {
					AMA.Util.switchLabel(".after_save_message.btnSafeBrowsingSaveMsg", ".noChanges", o.$el);
            		return;
            	}
            	
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
					success: _.bind(this.saveSuccess, this), 
					error: _.bind(this.saveError, this),
					callback: _.bind(this.successOrFailure, this),
					data: JSON.stringify(this.data.models[0].attributes)
			};
			
			this.messageOnError = $("#safe_browsing_save_error").val();

			this.data.sync("update", this.data.models[0], options); 
		
        },
        
        saveSuccess: function() {
        	AMA.page.standardDialogs.hideloading();
			AMA.Util.switchLabel(".after_save_message.btnSafeBrowsingSaveMsg", ".settingsSaved", this.$el);
        },
        
        saveError: function() {
        	AMA.page.standardDialogs.error(this.messageOnError);
            AMA.debug("Ajax completed with errors");
        },
        
        successOrFailure: function(isSuccess) {
        	if(isSuccess) {
        		AMA.page.standardDialogs.hideloading();			
				AMA.Util.switchLabel(".after_save_message.btnSafeBrowsingSaveMsg", ".settingsSaved", this.$el);
        	}
        	else {
        		AMA.page.standardDialogs.error(this.messageOnError);
                AMA.debug("Ajax completed with errors");
        	}
        }
        
    });
})();