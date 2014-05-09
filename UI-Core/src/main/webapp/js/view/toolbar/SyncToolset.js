/*! SyncToolset */
(function () {

    AMA.namespace("view");

    var SyncToolset = AMA.view.SyncToolset = AMA.view.BaseView.extend();

    SyncToolset.TEMPLATE_ID = "sync_toolset_template";
    
    SyncToolset.TEMPLATE_SRC = "";
    
    SyncToolset.CSS = {
        CONNECTING: "connecting",
        SYNCING: "syncing",
        UNSUCCESSFUL: "unsuccessful",
        SUCCESS: "success",
        NORMAL: "normal"
    };

    
    _.extend(SyncToolset.prototype, {

        events: {
            "click .button_sync.normal": "syncData",
            "click .button_sync .tryagain": "syncData",
            "click .viewdetails": "syncDetails",
            "click .sync_settings_link": "syncSettings"
        },
        

        initialize: function () {
            SyncToolset.__super__.initialize.apply(this, arguments);

            var ActionManager = AMA.ActionManager,
                BaseWorkflow = AMA.workflow.BaseWorkflow,
                SyncWorkflow = AMA.workflow.SyncWorkflow;
        
            var workflow = new SyncWorkflow();
            
            ActionManager.define("sync", workflow);
                        
            workflow.on(BaseWorkflow.EVENT.STATE_CHANGED, function (event) {
                switch (event.state) {
                    case BaseWorkflow.STATE.INITIALIZING:
                        AMA.debug("Sync Toolset has switched the Sync Button state to 'connecting'; countdown initialized");
                        
                        this.toggleDisplay(SyncToolset.CSS.CONNECTING);
                        break;
            			
            		case SyncWorkflow.STATE.SYNCING:	
            			AMA.debug("Sync Toolset has switched the Sync Button state to 'syncing'");
            			
                    	this.toggleDisplay(SyncToolset.CSS.SYNCING);
                       	if (event.data) {
                    		// Populate the tooltip
		                    var syncTextContainer = $('.sync_detail_msg');
                       		var syncDetails = {
								"contacts" : event.data.contacts,
								"images" : event.data.images,
								"videos" : event.data.videos		                   					
		                	};
		                   
							var statusText = {
					        	"syncing_of": syncTextContainer.find('.syncing_of').text(),
					        	"waiting_to_sync": syncTextContainer.find('.waiting_to_sync').text(),
					        	"pending": syncTextContainer.find('.pending').text(),
					        	"no_change": syncTextContainer.find('.no_change').text(),
					        	"syncing": syncTextContainer.find('.syncing').text(),
					        };
		                   
		                   var itemsBeingSynced = event.data.itemsBeingSynced.split(",");
		                   var buttonClass = ".button_sync.outcome.syncing";
		                   
		                   for (var dataType in syncDetails) {
		                	   this.$el.find(buttonClass + " .tooltip ." + dataType).addClass("hide");
		                   }		                   
		                   
		                   for ( var itemNumber = 0; itemNumber < itemsBeingSynced.length; itemNumber++) {
		                	   var itemType = itemsBeingSynced[itemNumber].trim();
		                	   itemType = itemType === 'pictures'?'images':itemType;
		                	   var itemDetails = syncDetails[itemType];
		                	   
		                	   if(itemDetails) {
		                		   if(itemDetails.status === "syncing") {
		                			  if(itemDetails.completed !== itemDetails.total) {		                				  
		                				  var donePercent = parseInt(itemDetails.completed) / parseInt(itemDetails.total);
		                                  var donePercent =  donePercent * 100;
		                                  
		                				  this.$el.find(buttonClass + " .tooltip ." + itemType + "_count").html(itemDetails.completed + statusText["syncing_of"] + itemDetails.total );
		                				  //this.$el.find(buttonClass + " .tooltip ." + itemType).show();
		                				  this.$el.find(buttonClass + " .tooltip ." + itemType + "_progress").show();
		                				  this.$el.find(buttonClass + " .tooltip ." + itemType + "_progress").progressbar({value:donePercent});
		                				  this.$el.find(buttonClass + " .tooltip ." + itemType + "_progress").addClass('sync_progress');
		                				  this.$el.find(buttonClass + " .tooltip ." + itemType + "_text").find(".icon_checkmark").hide();
		                			  }
		                			  else {
		                				  
		                				  this.$el.find(buttonClass + " .tooltip ." + itemType + "_progress").hide();
		                                   
		                                  if(itemDetails.total !== 0) {
			                				  this.$el.find(buttonClass + " .tooltip ." + itemType + "_text").find(".icon_checkmark").show();
			                				  this.$el.find(buttonClass + " .tooltip ." + itemType + "_text").find(".icon_checkmark").addClass('sync_complete');
		                                  } else {
		                                	  this.$el.find(buttonClass + " .tooltip ." + itemType + "_count").html(statusText[itemDetails.status]);
		                                	  this.$el.find(buttonClass + " .tooltip ." + itemType + "_text").find(".icon_checkmark").hide();
		                                  }
		                			  }
		                		   }
		                		   else {
		                			   var itemSyncText = itemDetails.status === "pending" ? (itemDetails.pending + " " + statusText[itemDetails.status]) : statusText[itemDetails.status];
		                			   
		                			   this.$el.find(buttonClass + " .tooltip ." + itemType + "_count").html(itemSyncText);
		                			   //this.$el.find(buttonClass + " .tooltip ." + itemType).show();
		                			   this.$el.find(buttonClass + " .tooltip ." + itemType + "_text").find(".icon_checkmark").hide();
		                			   this.$el.find(buttonClass + " .tooltip ." + itemType + "_progress").hide();
		                		   }		                		   
		                		   
		                	   }
		                	   
		                	   this.$el.find(buttonClass + " .tooltip ."+itemType+"_count").addClass('sync_'+itemType+'_count');
		                	   this.$el.find(buttonClass + " .tooltip ."+itemType).removeClass("hide");
	             		     }
                       	} 
		                   
                    	
                    break;
                        
                    default:
                }
            }, this);
            
            workflow.on(BaseWorkflow.EVENT.FINISHED, function (event) {
                switch (event.result) {
                    case BaseWorkflow.RESULT.SUCCESSFUL:
                        this.toggleDisplay(SyncToolset.CSS.SUCCESS);
                        
                        // Populate the tooltip and success event data
                        var updatedContacts =   event.data.deviceContactCreate + 
                                                event.data.deviceContactUpdate + 
                                                event.data.deviceContactDelete +
                                                event.data.webContactCreate +
                                                event.data.webContactUpdate +
                                                event.data.webContactDelete,
                            updatedPhotos =     event.data.devicePhotosCreate +
                                                event.data.devicePhotosUpdate +
                                                event.data.devicePhotosDelete +
                                                event.data.deviceTransmitImages,
                            updatedVideos =     event.data.deviceVideosCreate +
                                                event.data.deviceVideosUpdate +
                                                event.data.deviceVideosDelete + 
                                                event.data.deviceTransmitVideos;

                            this._syncSuccessData = event.data;
                            this.$el.find(".button_sync.outcome.success .syncsuccess_totalContacts").html(updatedContacts);
                            this.$el.find(".button_sync.outcome.success .syncsuccess_totalPhotos").html(updatedPhotos);
                            this.$el.find(".button_sync.outcome.success .syncsuccess_totalVideos").html(updatedVideos);

                        if (AMA.config.enableSurveys) {
                            // Launch survey on sync success, if enabled
                            AMA.page.openSurvey("sync-manual-success");
                        }

                        this.$el.find(".button_sync.outcome.syncing .contacts .completed").html(0);
                        this.$el.find(".button_sync.outcome.syncing .photos .completed").html(0);
                        this.$el.find(".button_sync.outcome.syncing .videos .completed").html(0);
                        this.$el.find(".button_sync.outcome.syncing .contacts .total").html(0);
                        this.$el.find(".button_sync.outcome.syncing .photos .total").html(0);
                        this.$el.find(".button_sync.outcome.syncing .videos .total").html(0);
                        this.$el.find(".button_sync.outcome.syncing .contacts .ui-progressbar-value").width("0%");
                        this.$el.find(".button_sync.outcome.syncing .photos .ui-progressbar-value").width("0%");
                        this.$el.find(".button_sync.outcome.syncing .videos .ui-progressbar-value").width("0%");
                        break;
                    default:
                        this.toggleDisplay(SyncToolset.CSS.UNSUCCESSFUL);
            			
						AMA.ReportingManager.remoteLog("Sync Failed [type:-sync][accountID:-" + AMA.config.accountDetails.accountId + "]" +
							"[MDN:-" + AMA.config.accountDetails.accountMdn + "][time remaining:-" + this._timeRemaining + "][details:-Failed]", 
							AMA.config.JsonConstants.LOGLEVEL_STATES.AUDIT);
            		
            			// Populate the tooltip with failure message
            			if (event.data!=null) {
            				var failureMsg = AMA.Util.parseStatusDetails(event.data.statusDetails, "sync");
            				if (failureMsg !== "") {
            					this.$el.find(".button_sync.outcome.unsuccessful .tooltip").html(failureMsg);
            				}
            			}
            	}
            }, this);
            
            // Event handler for the countdown
            var o=this;
            workflow.on(BaseWorkflow.EVENT.COUNTDOWN_TICK, function (event) {
            	$("#sync_toolset_countdown").html(event.remaining);
            	 o._timeRemaining=event.remaining;
            }, this);

        },


        _setupEvents: function () {
        	var o=this;
        	 Backbone.globalEvent.on("showSyncDialog",function(data){
        		   o.syncDialog.show(data.type);
			  });
        },
        

        toggleDisplay: function(action) {
            this.$el.find("." + action).show().siblings(".button_sync").hide();
        },
        

        render: function () {
            SyncToolset.__super__.render.apply(this);
            
            this.syncDialog = new AMA.view.SyncDialog({
                el: "#sync_dialog",
                parent: this
            });
            
            this.SyncDetailsDialog = new AMA.view.SyncDetailsDialog({
                el: "#sync_successdetails",
                parent: this
            });
        },
        

        syncData: function(e) {
        	e.stopPropagation();
        	this.syncDialog.show("Backup");
        },
        

        syncSettings: function(e) {
            e.stopPropagation();
            AMA.page.openSettings("backup");
        },
        

        syncDetails: function(e) {
        	e.stopPropagation();
			this.SyncDetailsDialog.show(this._syncSuccessData);
			$(".button_sync.outcome.success").hide();
			$(".button_sync.normal").show();
        }
    });
})();