/*! AppAssistListView */
(function () {

    AMA.namespace("view");

    var AppAssistListView = AMA.view.AppAssistListView = AMA.view.ListView.extend();

    /**
     * defines the template ID which corresponds to the 'id' property of the template
     * <script> used by this class.
     *
     * @property TEMPLATE_ID
     * @type string
     * @static
     * @final
     */
    AppAssistListView.TEMPLATE_ID = "privacy_list_template";
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
    AppAssistListView.TEMPLATE_SRC = "";
    /**
     * CSS classes used in rendering and selecting Items
     * @property  {object} see AMA.view.ListView
     * @type object
     * @static
     * @final
     */
    AppAssistListView.CSS = {
        ITEM: "rt_rowthreat",
        ITEM_STYLE: ["rt_rowlighter", "rt_rowdarker"],   // alternating row styles
        SELECTED_ITEM: "rt_rowindicated"
    };

    _.extend(AppAssistListView.prototype, {
        /**
         * Bind Events
         *
         * @override
         * @method _setupEvents
         */
        _setupEvents: function() {
            AppAssistListView.__super__._setupEvents.apply(this, arguments);

            // FIXME: Better to reference this.data instead of assuming specific model
            AMA.models.privacy.once("sort", function() {
                this.refresh();
            }, this);
        }
    });
})();

