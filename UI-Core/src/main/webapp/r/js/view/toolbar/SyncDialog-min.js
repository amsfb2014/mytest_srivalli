/*! SyncDialog */
(function(){AMA.namespace("view");var a=AMA.view.SyncDialog=AMA.view.Modal.extend();a.TEMPLATE_ID="sync_dialog_template";a.TEMPLATE_SRC="";a.WIDTH=650;a.HEIGHT="auto";a.syncTriggeredFrom="";_.extend(a.prototype,{events:{"click .modal-footer .btn_sync ":"doSync","click .modal-footer .btn_cancel":"hide","click a.syncSettingsDialog":"openBackupTab"},initialize:function(){this.options.width=a.WIDTH;this.options.height=a.HEIGHT;a.syncTriggeredFrom="";a.__super__.initialize.apply(this,arguments)},_setupEvents:function(){},show:function(j){a.syncTriggeredFrom=j||a.syncTriggeredFrom;if(!AMA.models.contacts.isLoaded){AMA.models.contacts.fetch()}if(!AMA.models.photos.isLoaded){AMA.models.photos.fetch()}if(!AMA.models.videos.isLoaded){AMA.models.videos.fetch()}if(AMA.models.contacts.isFetching||AMA.models.photos.isFetching||AMA.models.videos.isFetching){AMA.debug("One of the models still fetching. Attempting to show dialog again");this._fetchTimeout=setTimeout(_.bind(this.show,this),500);return}else{this.$el.find("input.item_type").prop("checked",false);var c=this.$el.find(".contact_count"),f=this.$el.find(".photo_count"),e=this.$el.find(".video_count");AMA.debug("Get count of records pending sync for display on "+this.options.el);var i=AMA.models.contacts.attributes.totalPendingSync,d=AMA.models.photos.attributes.totalPendingSync,h=AMA.models.videos.attributes.totalPendingSync;c.html(i);AMA.debug(i+" contacts pending sync");f.html(d);AMA.debug(d+" photos pending sync");e.html(h);AMA.debug(h+" videos pending sync");var b=AMA.models.syncsettings.models[0];value=b.get("syncOnMobileData");if(!value){this.$el.find("#backupConnectionWifiOrMobileNetwork_syncdialog").hide();this.$el.find("#syncphonedialog_currentsync_both_label").hide();this.$el.find("#backupConnectionWifiOnly_syncdialog").show();this.$el.find("#syncphonedialog_currentsync_wifionly_label").show()}else{this.$el.find("#backupConnectionWifiOnly_syncdialog").hide();this.$el.find("#syncphonedialog_currentsync_wifionly_label").hide();this.$el.find("#backupConnectionWifiOrMobileNetwork_syncdialog").show();this.$el.find("#syncphonedialog_currentsync_both_label").show()}this.$el.find(".step1 .error").hide();a.__super__.show.apply(this,arguments);if(AMA.config.enableReporting){var k="";if(this.$el.find("#sync_dialog_contacts_checkbox").attr("checked")){k="contacts,"}if(this.$el.find("#sync_dialog_photos_checkbox").attr("checked")){k+="images,"}if(this.$el.find("#sync_dialog_videos_checkbox").attr("checked")){k+="videos,"}if(k.length!=0){k=k.substring(0,k.length-1)}var g={};g.Type="sync";g.DataType=k;AMA.ReportingManager.reportSyncEvent(AMA.config.reportingEventTypes.webSyncDialogShown,g)}}},doSync:function(){var e=this.$el.find("input.item_type:checked"),b="";if(e.length===0){AMA.debug("No item types selected in "+this.options.el+". Prompting the user");this.$el.find(".step1 .error.nothing_selected").show();return}_.each(e,function(j,h,i){b+=j.value;b+=(h<i.length-1)?", ":""},this);AMA.debug(this.options.el+" indicates that "+b+" will be included in the sync");this.hide();AMA.ActionManager.start("sync",{itemsToSync:b});if(AMA.config.enableReporting){var g={};var f="";var d=[];if(this.$el.find("#sync_dialog_contacts_checkbox").prop("checked")){f="contacts,";d.push("Contacts")}if(this.$el.find("#sync_dialog_photos_checkbox").prop("checked")){f+="images,";d.push("Photos")}if(this.$el.find("#sync_dialog_videos_checkbox").prop("checked")){f+="videos,";d.push("Videos")}f=f.substring(0,f.length-1);g.Type="sync";g.DataType=f;AMA.ReportingManager.reportSyncEvent(AMA.config.reportingEventTypes.webSyncTriggered,g);var c=0;for(c=0;c<d.length;c++){g={};g.Type="Sync "+d[c]+" "+a.syncTriggeredFrom;AMA.ReportingManager.reportUserAction(AMA.config.reportingEventTypes["websync"+d[c]+a.syncTriggeredFrom],g)}}},openBackupTab:function(){if(AMA.config.enableReporting){var b={};b.Type="sync";AMA.ReportingManager.reportSyncEvent(AMA.config.webSyncDialogCancelled,b)}AMA.page.openSettings("backup")}})})();