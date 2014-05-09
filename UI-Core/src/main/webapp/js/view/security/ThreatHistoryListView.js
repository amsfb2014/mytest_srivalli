/*! ThreatHistoryListView */
(function () {

	AMA.namespace("view");


	/**
	 * This view shows the Threat History List
	 *
	 * @class ThreatHistoryListView
	 * @namespace view
	 * @extends AMA.view.ListView
	 * @constructor
	 */
	var ThreatHistoryListView = AMA.view.ThreatHistoryListView = AMA.view.ListView.extend();


	/**
	 * ID of the template
	 *
	 * @property TEMPLATE_ID
	 * @type string
	 * @static
	 * @final
	 */
	ThreatHistoryListView.TEMPLATE_ID = "threat_history_item_template";
	
	ThreatHistoryListView.CSS = {
			ITEM: "item"
	};

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
	ThreatHistoryListView.TEMPLATE_SRC = "";
	
	ThreatHistoryListView.MAX_ITEM_LIMIT = 5;
	
	AMA.augment(ThreatHistoryListView.prototype, {
	
		initialize: function() {
			ThreatHistoryListView.__super__.initialize.call(this);
			
			this.on(AMA.view.ListView.EVENT.LIST_EMPTIED, function() {
				var emptyList = _.template("empty_threat_history_item_template");
				this.$el.html(emptyList);
			});
		},
		
		render: function () {
			ThreatHistoryListView.__super__.render.call(this);
			
			var $viewLink = this.$el.siblings("#security_activities_view_more");
			// hidden by default
			$viewLink.hide();
			
			if(this.data.length > 5) {
				$viewLink.show();
			}
		},
		
		_processData: function (item, index) {
			item.elId = this.$el.attr("id") + "_item_" + index;
			
			item.datetimeDetected = AMA.Util.formatDateAndTime(item.timestamp, AMA.config.dateAndTimeFormat);

			item.fileInfectedTotal = item.fileInfectedTotal + item.appInfectedTotal;
		
			return item;
		},
		
		_applyFilters: function() {
			ThreatHistoryListView.__super__._applyFilters.apply(this, arguments);
			
			this._dataset = this._dataset.slice(0, ThreatHistoryListView.MAX_ITEM_LIMIT);
		}
	});

})();
