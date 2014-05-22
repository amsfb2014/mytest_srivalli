/*! AppAssistDetailsview */
(function () {

    AMA.namespace("view");

    var AppAssistDetailsView = AMA.view.AppAssistDetailsView = AMA.view.BaseView.extend();

    /**
     * defines the template ID which corresponds to the 'id' property of the template
     * <script> used by this class.
     *
     * @property TEMPLATE_ID
     * @type string
     * @static
     * @final
     */
    AppAssistDetailsView.TEMPLATE_ID = "privacy_details_template";

    /**
     * Applicable only to view classes that fetch the aggregated templates for
     * itself and its child views, this property defines the name of the
     * template file to load. The path is defined in AMA.config.templatePath.
     *
     * @property TEMPLATE_SRC
     * @type string
     * @static
     * @final
     */
    AppAssistDetailsView.TEMPLATE_SRC = "";

    AMA.augment(AppAssistDetailsView.prototype, {

        /**
         * Initialise the view
         *
         * @override
         * @method initialize
         * @param {object} see AMA.view.ListView
         */
        initialize: function () {
            AppAssistDetailsView.__super__.initialize.apply(this, arguments);
            var o = this;
            this.dataDetails = null;
            if (this.options.listView) {
                this.options.listView.on(AMA.view.ListView.EVENT.ITEM_SELECTED, function (data) {
                    if(o.data) {
                        o.data.isFetching = true;
                    }
                    o.$el.addClass('loading_big').html("");
                    o.setData(data);
                    o.dataDetails = data.get("id");
                    o.show();
                });
                this.options.listView.on(AMA.view.ListView.EVENT.SELECTION_CLEARED, function () {
                    o.hide();
                });
            } else {
                AMA.warning("This instance of ContactDetailsView is not linked to a contacts list. Data switching will not apply.");
            }
        },

        /**
         * Process data to return only the _meta key.
         *
         * @override
         * @method _processData
         */
        _processData: function(data) {
            var oEl = $(this.parent.$el);
            var item = {
                    appUrl: "",
                    batteryOrMemoryUsageRating: "",
                    id: "",
                    locationAccessRating: "",
                    messageAccessRating: "",
                    name: "",
                    personalInfoAccessRating: "",
                    vulnerabilityRating: "",
                    vulnerabilityRatingScore: 0
                };

            data.summary = "";

            data.summary += (data.personalInfoAccessRating != null) ?  oEl.find(".personalInfoAccessRating").clone().html('<span class="icon webbycons-addressbook"></span> ' + data.personalInfoAccessRating)[0].outerHTML : '';
            data.summary += (data.locationAccessRating != null) ? oEl.find(".locationAccessRating").clone().html('<span class="icon webbycons-locate"></span> ' + data.locationAccessRating)[0].outerHTML : '';
            data.summary += (data.messageAccessRating != null) ? oEl.find(".messageAccessRating").clone().html('<span class="icon webbycons-mail"></span> ' + data.messageAccessRating)[0].outerHTML : '';
            data.summary += (data.batteryOrMemoryUsageRating != null) ? oEl.find(".batteryOrMemoryUsageRating").clone().html('<span class="icon webbycons-battery"></span> ' + data.batteryOrMemoryUsageRating)[0].outerHTML : '';
            data.summary += (data.summary === "") ? oEl.find(".emptyPrivacyDetails")[0].outerHTML : "";
			data.hasItem = "";
            data.cleanId = "";

			if(!data.id) {
                data.hasItem = "hidden";
                data.cleanId = data.id.split("/").join("");
                data.cleanId = data.cleanId.split("+").join("");
                _.extend(data, item);
            }
			
            return data;
        },
        _beforeRender: function() {
        this.parent.appAssistList.$el.find(".details-sm").addClass("hidden");
        },
        render: function() {
            AppAssistDetailsView.__super__.render.apply(this, arguments);
            if(!this.data) return;
            if(!this.data.toJSON().length) return;
            var currentID = this.data.toJSON()[0].id,
                    cleanId = currentID.split("/").join("");
            cleanId = cleanId.split("+").join("");

            $("#set_details"+cleanId)
                    .html(_.template(this.template, this._processData(this.data.toJSON()[0])))
                    .removeClass("hidden");
        },
        _afterRender: function() {
            this.$el.removeClass('loading_big');
        }
    });


})();

