/*! Modal */
(function () {

    AMA.namespace("view");

    var Modal = AMA.view.Modal = AMA.view.BaseView.extend();

    Modal.TEMPLATE_ID = "dialog_template";
    Modal.TEMPLATE_SRC = "";


    _.extend(Modal.prototype, {
        /**
         * Initializes the Modal
         *  @see http://getbootstrap.com/javascript/#modals
         */
        initialize: function () {
            Modal.__super__.initialize.apply(this, arguments);

            AMA.assert(this.options && this.options.el, "Modal requires options.el parameter");

            // Make sure the dialog content is initially hidden
            this.hidden = true;
            /**
             * normally we don't need config anymore;
             * since Bootstrap Modal can be manipulated using CSS and HTML
             */
            this._config = {
                //id: this.options.el,
                content: this.options.content || false,
                showOk: this.options.showOk || false,
                showCancel: this.options.showCancel || false,
                showTitle: this.options.showTitle || true,
                showClose: this.options.showClose || true,
                showFooter: this.options.showFooter || true,
                okCallback: this.options.okCallback || null,
                cancelCallback: this.options.cancelCallback || null,
                okText:this.options.okText || null
            };
        },

        /**
         * Opens the dialog
         *
         */
        show: function () {
            var okBtn = this.$el.find(".okBtn"),
                dialogMsg = this.$el.find(".modal-body");
            if (this._config.showTitle) {
                this.$el.find(".modal-title").html(this.$el.attr("title"));
                $(".modal-header").show();
                (this._config.showClose) ? this.$el.find(".close").show() : this.$el.find(".close").hide();
            }
            else {
                $(".modal-header").hide();
            }

            (this._config.showFooter) ? this.$el.find(".modal-footer").show() : this.$el.find(".modal-footer").hide();

            if(this._config.showOk){
                this._config.okCallback = this._config.okCallback || function() {};
                okBtn.show();
                okBtn.unbind("click");
                okBtn.on("click", _.bind(function () {
                    this.hide();
                    this._config.okCallback();
                }, this));
                if(this._config.okText!=null){
                	okBtn.html(this._config.okText);
                }
            }
            else{
                okBtn.hide();
            }
            
            
            var cancelBtn =  this.$el.find(".button_cancel");
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
        
            

            if(this._config.content) {
                var dialogMsg = this.$el.find(".modal-body");
                // Build dialog message
                dialogMsg.html(this._config.content);
            }
            this.$el.modal("show");
            
            
        },

        /**
         * Hides the dialog
         *
         */
        hide: function () {
            this.$el.modal("hide");
        },

        /**
         * Stores the content of the dialog into its configuration
         *
         * @param {String} html: Modal contents
         *
         */
        setContent: function (html) {
            /** TODO: need to know what content will be use here? **/
            this._config.content = html;
        }
    });
})();