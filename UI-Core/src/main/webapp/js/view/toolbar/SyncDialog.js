/*! SyncDialog */
(function () {

    AMA.namespace("view");

    var SyncDialog = AMA.view.SyncDialog = AMA.view.Dialog.extend();

    SyncDialog.TEMPLATE_ID = "sync_dialog_template";
    SyncDialog.TEMPLATE_SRC = "";
    
    SyncDialog.WIDTH = 650;
    SyncDialog.HEIGHT = "auto";
    SyncDialog.syncTriggeredFrom="";


    _.extend(SyncDialog.prototype, {

    	events: {
    		"click .dialog_buttons .btn_sync ": "doSync",
    		"click .dialog_buttons .btn_cancel": "hide",
    		"click a.syncSettingsDialog": "openBackupTab"
    	},


    	initialize: function () {

    		// Set the width and height prior to initialization
            this.options.width = SyncDialog.WIDTH;
            this.options.height = SyncDialog.HEIGHT;
            SyncDialog.syncTriggeredFrom="";
            SyncDialog.__super__.initialize.apply(this, arguments);
            
            // TODO: Pass contacts/photos/videos count to the dialog
              
            
    	},
    	

        _setupEvents: function () {

        },
        

        show: function (type) {
        	SyncDialog.syncTriggeredFrom=type || SyncDialog.syncTriggeredFrom;
        	// If the models have not been fetched, fetch them first.
        	if (!AMA.models.contacts.isLoaded) {
        		AMA.models.contacts.fetch();
        	}
        	if (!AMA.models.photos.isLoaded) {
        		AMA.models.photos.fetch();
        	}
        	if (!AMA.models.videos.isLoaded) {
        		AMA.models.videos.fetch();
        	}
        	
        	if (AMA.models.contacts.isFetching || AMA.models.photos.isFetching || AMA.models.videos.isFetching) {
        		AMA.debug("One of the models still fetching. Attempting to show dialog again")
        		this._fetchTimeout = setTimeout(_.bind(this.show, this), 500);
        		return;
        	}
        	else {
	        	this.$el.find("input.item_type").prop("checked", false);
	        	var contactCount = this.$el.find(".contact_count"),
	        		photoCount=this.$el.find(".photo_count"),
	        		videoCount=this.$el.find(".video_count");
	        	
	        	AMA.debug("Get count of records pending sync for display on " + this.options.el);
	        	 
	        	var contactsToBeSynced = AMA.models.contacts.attributes.totalPendingSync,
	        		photosToBeSynced = AMA.models.photos.attributes.totalPendingSync,
	        		videosToBeSynced = AMA.models.videos.attributes.totalPendingSync;
	        	
	            contactCount.html(contactsToBeSynced);
	            AMA.debug(contactsToBeSynced + " contacts pending sync");
	            photoCount.html(photosToBeSynced);
	            AMA.debug(photosToBeSynced +" photos pending sync");
	            videoCount.html(videosToBeSynced);
	            AMA.debug(videosToBeSynced +" videos pending sync");
	            
	            var syncSettings = AMA.models.syncsettings.models[0];				
				value = syncSettings.get("syncOnMobileData");
	            
				if(!value) {
					this.$el.find("#backupConnectionWifiOrMobileNetwork_syncdialog").hide();					
					this.$el.find("#syncphonedialog_currentsync_both_label").hide();
					this.$el.find("#backupConnectionWifiOnly_syncdialog").show();
					this.$el.find("#syncphonedialog_currentsync_wifionly_label").show();
	            }
				else {
					this.$el.find("#backupConnectionWifiOnly_syncdialog").hide();
					this.$el.find("#syncphonedialog_currentsync_wifionly_label").hide();
					this.$el.find("#backupConnectionWifiOrMobileNetwork_syncdialog").show();					
					this.$el.find("#syncphonedialog_currentsync_both_label").show();
	            }
	            
	        	// Make sure all error messages are hidden at this point
	    		this.$el.find(".step1 .error").hide();
	    		
	        	SyncDialog.__super__.show.apply(this, arguments);	        	
	        	
	        	if(AMA.config.enableReporting) {
	            	var dataToSync = '';
	            	
					if(this.$el.find("#sync_dialog_contacts_checkbox").attr("checked")) {
						dataToSync = 'contacts,';
					}
					if(this.$el.find("#sync_dialog_photos_checkbox").attr("checked")) {
						dataToSync += 'images,';
					}
					if(this.$el.find("#sync_dialog_videos_checkbox").attr("checked")) {
						dataToSync += 'videos,';
					}
					if(dataToSync.length != 0) {
						dataToSync = dataToSync.substring(0, dataToSync.length-1);
			        }
			        
		            var eventMsg = {};
					eventMsg['Type'] = 'sync';
					eventMsg['DataType'] = dataToSync;
							
					AMA.ReportingManager.reportSyncEvent(AMA.config.reportingEventTypes.webSyncDialogShown, eventMsg);
				}

        	}
        },
        

        doSync: function () {
        	// Determine the item types to sync, based on the checkboxes
        	var itemsChecked = this.$el.find("input.item_type:checked"),
        		itemsToSync = "";
        	
        	// Show an error if there are no item types selected
        	if (itemsChecked.length === 0) {
        		AMA.debug("No item types selected in " + this.options.el + ". Prompting the user");
        		
        		this.$el.find(".step1 .error.nothing_selected").show();
        		return;
        	}
        	
        	_.each(itemsChecked, function (item, index, coll) {
        		itemsToSync += item.value;
        		itemsToSync += (index < coll.length-1) ? ", " : "";
        	}, this);
        	AMA.debug(this.options.el + " indicates that " + itemsToSync + " will be included in the sync");

        	// Once everything is ok, close the dialog
        	this.hide();
        	
        	// Proceed to sync
			AMA.ActionManager.start("sync", { itemsToSync: itemsToSync });		
			if(AMA.config.enableReporting) {
				var eventMsg = {};
				var dataToSync = '';
				var dataTypes=[];
			
				if(this.$el.find("#sync_dialog_contacts_checkbox").prop("checked")) {
					dataToSync = 'contacts,';
					dataTypes.push("Contacts");
				}
				if(this.$el.find("#sync_dialog_photos_checkbox").prop("checked")) {
				dataToSync += 'images,';
				dataTypes.push("Photos");
				}
				if(this.$el.find("#sync_dialog_videos_checkbox").prop("checked")) {
					dataToSync += 'videos,';
					dataTypes.push("Videos");
				}
	        	dataToSync = dataToSync.substring(0, dataToSync.length-1);
			
	        	eventMsg['Type'] = 'sync';
	        	eventMsg['DataType'] = dataToSync;
			
				AMA.ReportingManager.reportSyncEvent(AMA.config.reportingEventTypes.webSyncTriggered, eventMsg);
				
				var i=0;
				for (i=0;i<dataTypes.length;i++) {
					eventMsg={};
					eventMsg['Type'] = 'Sync '+dataTypes[i]+" "+SyncDialog.syncTriggeredFrom;
					AMA.ReportingManager.reportUserAction(AMA.config.reportingEventTypes["websync"+dataTypes[i]+SyncDialog.syncTriggeredFrom], eventMsg);
				}
			}

        },
        

        openBackupTab: function(){
        	if(AMA.config.enableReporting) {
      			var eventMsg = {};
				eventMsg['Type'] = 'sync';
				
				AMA.ReportingManager.reportSyncEvent(AMA.config.webSyncDialogCancelled, eventMsg);
			}
			AMA.page.openSettings("backup");
		}
    });
})();