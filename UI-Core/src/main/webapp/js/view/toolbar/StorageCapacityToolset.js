/*! StorageCapacityToolset */
(function () {

    AMA.namespace("view");

    var StorageCapacityToolset = AMA.view.StorageCapacityToolset = AMA.view.BaseView.extend();

    StorageCapacityToolset.TEMPLATE_ID = "storage_capacity_toolset_template";
    StorageCapacityToolset.TEMPLATE_SRC = "";


    _.extend(StorageCapacityToolset.prototype, {

        initialize: function () {
            StorageCapacityToolset.__super__.initialize.apply(this, arguments);
            AMA.models.photos.on("reset", function() {
                this.data.fetch();
            }, this);
            AMA.models.trash.on("reset", function() {
                this.data.fetch();
            }, this);
            AMA.models.videos.on("reset", function() {
                this.data.fetch();
            }, this);
        },


        _refetch: function() {
            this.data.fetch();
        },


        render: function () {
            StorageCapacityToolset.__super__.render.apply(this);
        },

        
        _processData: function(item) {
            var data = item || {};

            data.storageLimit = parseInt(item.totalCapacity || 2147483648);
            data.ImageSize = parseInt(item.photosUsedCapacity || 0);
            data.VideoSize = parseInt(item.videosUsedCapacity || 0);
            data.TrashSize = parseInt(item.trashUsedCapacity || 0);

            data.ImageUse = (data.ImageSize * 100) / data.storageLimit;
            data.VideoUse = (data.VideoSize * 100) / data.storageLimit;
            data.TrashUse = (data.TrashSize * 100) / data.storageLimit;

            data.totalUsed = data.ImageSize + data.VideoSize + data.TrashSize;

            return data;
        }
    });


})();

