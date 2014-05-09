/*! StandardDialogs */
(function () {

	AMA.namespace("view");

	var StandardDialogs = AMA.view.StandardDialogs = AMA.view.BaseView.extend();

	StandardDialogs.TEMPLATE_ID = "standard_dialogs_template";
	StandardDialogs.TEMPLATE_SRC = "standarddialogs.tpl";
	
	StandardDialogs.EVENT = AMA.enums(
		"BATCH_ACTION_CONFIRMED"
	);
    

	AMA.augment(StandardDialogs.prototype, {
		initialize: function () {
			StandardDialogs.__super__.initialize.apply(this, arguments);
			
			this._events = StandardDialogs.EVENT;
		},
		
		render: function () {
			StandardDialogs.__super__.render.apply(this, arguments);
			
			// Create Error dialog
			this.errorDialog = new AMA.view.Modal({
				el: "#error_dialog",
				parent: this,
				showTitle: true,
				showClose: true,
				showOk: true,
				showCancel: false,
				okText:"Ok",
				width: 400
			});
			
			// Create Confirm dialog
			this.confirmDialog = new AMA.view.Modal({
				el: "#confirm_dialog",
				parent: this,
				showTitle: true,
				showClose: true,
				showOk: true,
				showCancel: true,
				width: 400
			});
			
			// Create status dialog
			
			this.statusDialog = new AMA.view.Modal({
				el: "#status_dialog",
				parent: this,
				showTitle: true,
				showClose: true,
				showOk: true,
				showCancel: false,
				width: 400
			});
			
			// Create "Loading" dialog
			this.loadingDialog = new AMA.view.Modal({
				el: "#loading_dialog",
				parent: this,
				showTitle: false,
				showClose: false,
				showOk: false,
                showFooter: false,
				showCancel: false
			});
		},
		
		/** 
         * Opens a Confirm dialog
         *
         * @param {String} msg: Text to appear in dialog
         * @param {Function} ok_callback: Function to call when clicking the "OK" button
         * @param {Function} cancel_callback: Function to call when clicking the "Cancel" button
         *  
         */
		confirm: function (msg, ok_callback, cancel_callback) {
			this.confirmDialog._config.okCallback = ok_callback;
			this.confirmDialog._config.cancelCallback = cancel_callback || this.closeConfirmDeleteDialog;
			this.confirmDialog._config.content = msg;
				
			this.confirmDialog.show();
		},
		
		/** 
         * Opens an Error dialog
         *
         * @param {String} msg: Text to appear in dialog
         * @param {Function} callback: Function to call when clicking the "OK" button
         *  
         */
		error: function (msg, callback) {
			this.errorDialog._config.okCallback = callback;
			this.errorDialog._config.content = msg;
				
			this.errorDialog.show();
		},
		
		/** 
         * Opens the Loading dialog
         *
         * @param {String} msg: Text to appear in dialog
         *  
         */
		loading: function (msg) {
            // hide header and footer;
			this.loadingDialog._config.showFooter = false;
			this.loadingDialog._config.content = msg + "<div class='loadingimage'></div>";

			this.loadingDialog.show();
		},
		
		/** 
         * Closes the Loading dialog
         * 
         */
		hideloading: function () {
			this.loadingDialog.hide();
		},
		/** 
         * Opens a status / generic message dialog
         *
         * @param {String} msg Text to appear in dialog
         * @param {Function} callback Function to call when clicking the "OK" button
         *
         */
		status: function (msg, callback) {
            this.statusDialog._config.okCallback = callback;
			this.statusDialog._config.content = msg;

            this.statusDialog.show();
		}
	});
})();