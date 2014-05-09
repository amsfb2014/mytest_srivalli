/*! Dialog */
(function () {

	AMA.namespace("view");

	var Dialog = AMA.view.Dialog = AMA.view.BaseView.extend();

	Dialog.TEMPLATE_ID = "dialog_template";
	Dialog.TEMPLATE_SRC = "";


	_.extend(Dialog.prototype, {
	    /** 
         * Initializes the dialog
         * 
         */
		initialize: function () {
			Dialog.__super__.initialize.apply(this, arguments);

			AMA.assert(this.options && this.options.el, "Dialog requires options.el parameter");

			// Make sure the dialog content is initially hidden
			this.hidden = true;

			// Set the JQueryUI Dialog configs
			this._config = {
				modal: true,
				resizable: false,
				position: [ 'center', 150 ],
				//title: this.options.title || "",
				minHeight: 75,
				closeOnEscape: false,
				width: this.options.width || "auto",
				height: this.options.height || "auto",
				top: 0,
				left: 0,
				//id: this.options.el,
				showTitle: this.options.showTitle || false,
				showClose: this.options.showClose || false,
				showOk: this.options.showOk || false,
				showCancel: this.options.showCancel || false,
				content: "",
				//messageAlign: this.options.messageAlign || "center",
				okCallback: this.options.okCallback || null,
				cancelCallback: this.options.cancelCallback || null
			};
		},
		
		/** 
         * Opens the dialog
         * 
         */
		show : function () {
			AMA.debug("Showing dialog " + this.options.el);
			
			var $el = $(this.options.el);
			$el.dialog(this._config).dialog("moveToTop");

			// Show or hide title bar and/or close button
            // FIXME: This appears to be buggy.  Some selectors below do not support layered dialogs.
			if (this._config.showTitle) {
				$(".ui-dialog-titlebar").show();
				if (this._config.showClose)
					$(".ui-dialog-titlebar-close").show();
				else
					$(".ui-dialog-titlebar-close").hide();
			}
			else
				$(".ui-dialog-titlebar").hide();

			// Show or hide OK button; if to be shown, also set action for button
			var okBtn = $el.find(".button_ok");
			if(this._config.showOk){
				this._config.okCallback = this._config.okCallback || function() {};
				okBtn.show();
				okBtn.unbind("click");
				okBtn.on("click", _.bind(function () {
					this.hide();
					this._config.okCallback();
				}, this));
			}
			else
				okBtn.hide();

			// Show or hide Cancel button; if to be shown, also set action for button
			var cancelBtn = $el.find(".button_cancel");
			if (this._config.showCancel) {
				this._config.cancelCallback = this._config.cancelCallback || function() {};
				cancelBtn.show();
				cancelBtn.unbind("click");
				cancelBtn.on("click", _.bind(function () {
					this.hide();
					this._config.cancelCallback();
				}, this));

			}
			else
				cancelBtn.hide();

      		var dialogMsg = $el.find(".message");
			// Build dialog message
			dialogMsg.html(this._config.content);

			// Message alignment
			//dialogMsg.css("text-align", this._config.messageAlign);
			
			// Enable any additional close buttons inside the dialog content
			$el.find(".close").unbind("click").on("click", _.bind(this.hide, this));
		},

		/** 
         * Hides the dialog
         * 
         */
        hide: function () {
			AMA.debug("Closing dialog " + this.options.el);
			
			$(".ui-dialog-content").dialog("close");
			
			if(AMA.config.enableReporting && this.options.el === '#sync_dialog') {
				var eventMsg = {};
				eventMsg['Type'] = 'sync';

				AMA.ReportingManager.reportSyncEvent(AMA.config.reportingEventTypes.webSyncDialogCancelled, eventMsg);
			}
			
		},

		/** 
         * Stores the content of the dialog into its configuration
         *
         * @param {String} html: Dialog contents
         * 
         */
        setContent: function (html) {
			this._config.content = html;
		}
	});
})();