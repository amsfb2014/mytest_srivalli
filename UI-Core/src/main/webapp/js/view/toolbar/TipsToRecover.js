/*! TipsToRecover */
(function () {

    AMA.namespace("view");

    var TipsToRecover = AMA.view.TipsToRecover = AMA.view.Dialog.extend();

    TipsToRecover.TEMPLATE_ID = "Tips_To_Recover";
    TipsToRecover.TEMPLATE_SRC = "";
    
    TipsToRecover.WIDTH = 650;
    TipsToRecover.HEIGHT = "auto";


    _.extend(TipsToRecover.prototype, {

    	initialize: function () {

    		// Set the width and height prior to initialization
            this.options.width = TipsToRecover.WIDTH;
            this.options.height = TipsToRecover.HEIGHT;

            TipsToRecover.__super__.initialize.apply(this, arguments);
    	},


        show: function () {
        	TipsToRecover.__super__.show.apply(this, arguments);
        }

    });

})();