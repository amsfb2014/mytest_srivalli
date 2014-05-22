/*! SyncDetailsDialog */
(function () {

    AMA.namespace("view");

    var SyncDetailsDialog = AMA.view.SyncDetailsDialog = AMA.view.Modal.extend();

    SyncDetailsDialog.TEMPLATE_ID = "syncSuccess_dialog_template";
    SyncDetailsDialog.TEMPLATE_SRC = "";
    
    SyncDetailsDialog.WIDTH = 650;
    SyncDetailsDialog.HEIGHT = "auto";


    var data={};

    _.extend(SyncDetailsDialog.prototype, {

    	events: {
    		
    	},


        initialize: function () {
    		// Set the width and height prior to initialization
            this.options.width = SyncDetailsDialog.WIDTH;
            this.options.height = SyncDetailsDialog.HEIGHT;

            SyncDetailsDialog.__super__.initialize.apply(this, arguments);

            // TODO: Pass contacts/photos/videos count to the dialog
            
    	},


        render: function(syncSuccessData) {
    		// Generate the content from template + data
			var content = _.template(this.template, data);

			// Attach the content to the container element
			this.$el.html(content);
			
			if (syncSuccessData) {
				this.populateData(syncSuccessData);
			}
        },
        

        _setupEvents: function ()	{

        },
        

        show: function (data)	{
            this.render(data);
            SyncDetailsDialog.__super__.show.apply(this, arguments);
        },
        



        populateData: function (data) {
        	var updatedContacts = 	data.deviceContactCreate + 
            						data.deviceContactUpdate + 
            						data.deviceContactDelete +
            						data.webContactCreate +
            						data.webContactUpdate +
            						data.webContactDelete,
            	updatedPhotos = 	data.devicePhotosCreate +
            						data.devicePhotosUpdate +
                                    data.devicePhotosDelete + 
                                    data.deviceTransmitImages,
                updatedVideos =     data.deviceVideosCreate +
                                    data.deviceVideosUpdate +
                                    data.deviceVideosDelete +
                                    data.deviceTransmitVideos;
            
            this.$el.find(".syncsuccess_totalContacts").html(updatedContacts);
            this.$el.find(".syncsuccess_totalPhotos").html(updatedPhotos);
            this.$el.find(".syncsuccess_totalVideos").html(updatedVideos);
            
            this.$el.find(".syncsuccess_deviceContactsAdded").html(data.deviceContactCreate);
            this.$el.find(".syncsuccess_deviceContactsEdited").html(data.deviceContactUpdate);
            this.$el.find(".syncsuccess_deviceContactsDeleted").html(data.deviceContactDelete);
            
            this.$el.find(".syncsuccess_devicePhotosAdded").html(data.devicePhotosCreate);
            //this.$el.find(".syncsuccess_devicePhotosEdited").html(data.devicePhotosUpdate);
            this.$el.find(".syncsuccess_devicePhotosDeleted").html(data.devicePhotosDelete);
            
            this.$el.find(".syncsuccess_deviceVideosAdded").html(data.deviceVideosCreate);
            //this.$el.find(".syncsuccess_deviceVideosEdited").html(data.deviceVideosUpdate);
            this.$el.find(".syncsuccess_deviceVideosDeleted").html(data.deviceVideosDelete);
            
            this.$el.find(".syncsuccess_webContactsAdded").html(data.webContactCreate);
            this.$el.find(".syncsuccess_webContactsEdited").html(data.webContactUpdate);
            this.$el.find(".syncsuccess_webContactsDeleted").html(data.webContactDelete);
            
            this.$el.find(".syncsuccess_webPhotosAdded").html(data.deviceTransmitImages);
            this.$el.find(".syncsuccess_webPhotosEdited").html(data.webPhotosDeleted);
            //this.$el.find(".syncsuccess_webPhotosDeleted").html(data.devicePhotosDelete);
            
            this.$el.find(".syncsuccess_webVideosAdded").html(data.deviceTransmitVideos);
            this.$el.find(".syncsuccess_webVideosEdited").html(data.webVideosDeleted);
            //this.$el.find(".syncsuccess_webVideosDeleted").html(data.deviceVideosDelete);
        }
    });
})();