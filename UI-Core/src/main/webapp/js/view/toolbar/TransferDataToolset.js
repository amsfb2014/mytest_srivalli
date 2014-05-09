/*! TransferDataToolset */
(function () {

    AMA.namespace("view");

    var TransferDataToolset = AMA.view.TransferDataToolset = AMA.view.BaseView.extend();

    TransferDataToolset.TEMPLATE_ID = "transfer_data_toolset_template";
    TransferDataToolset.TEMPLATE_SRC = "";


    _.extend(TransferDataToolset.prototype, {

        initialize: function () {
            TransferDataToolset.__super__.initialize.apply(this, arguments);
        },


        render: function () {
            TransferDataToolset.__super__.render.apply(this);
       
            this.transferDataWizard = new AMA.view.TransferDataWizard({
                el: "#transferdata_dialog",
                parent: this
            });
        },


        _setupEvents: function() {
            var o = this,
                objDom = o.$el;
            objDom.find(".button_transferdata").on("click", function() {
                o.transferDataWizard.show();
            });
        }
    });


})();

