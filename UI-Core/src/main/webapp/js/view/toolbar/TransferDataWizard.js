/*! TransferDataWizard */
(function () {

    AMA.namespace("view");

    var TransferDataWizard = AMA.view.TransferDataWizard = AMA.view.Wizard.extend();

    TransferDataWizard.TEMPLATE_ID = "transferdata_dialog_template";
    TransferDataWizard.TEMPLATE_SRC = "";


    _.extend(TransferDataWizard.prototype, {

        initialize: function () {
        	// Set the width and height prior to initialization
            this.options.width = 650;
            this.options.height = 400;

            TransferDataWizard.__super__.initialize.apply(this, arguments);
        },


        hide: function() {
            TransferDataWizard.__super__.hide.apply(this, arguments);
            this.$el.find(".step1").addClass("current").siblings(".wiz_step").removeClass("current")
        }
    });
})();