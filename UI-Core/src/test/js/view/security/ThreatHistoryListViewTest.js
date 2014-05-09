module("ThreatHistoryListViewTest", {
	setup: function() {
		if ($("#threat_history").length === 0) {
        	$("<div/>", {
				id: "threat_history",
        		style: "display:none"
        	}).appendTo("body");
    	}
		
    	if($("#threat_history_item_template").length === 0) {
			$("<script />", {
				id: "threat_history_item_template",
				type: "text/template"
        	}).appendTo("body");
			
    	}
		
		$("#threat_history_item_template").html("<%=data%>");
	},
	teardown: function() {
		//$("#threat_scan").remove();
	}
});


test("AMA.view.ThreatHistoryListView class and default value test", function () {
	expect(6);
	
	deepEqual(AMA.view.ThreatHistoryListView.__super__, AMA.view.ListView.prototype, "AMA.view.ThreatHistoryListView extends AMA.view.ListView");
	equal(typeof AMA.view.ThreatHistoryListView.prototype._processData, "function", "AMA.view.ThreatHistoryListView.prototype._processData is a function");
	equal(typeof AMA.view.ThreatHistoryListView.prototype._applyFilters, "function", "AMA.view.ThreatHistoryListView.prototype._applyFilters is a function");
	
	equal(AMA.view.ThreatHistoryListView.TEMPLATE_ID, "threat_history_item_template", "AMA.view.ThreatHistoryListView.TEMPLATE_ID returns default value");
	equal(AMA.view.ThreatHistoryListView.TEMPLATE_SRC, "", "AMA.view.ThreatHistoryListView.TEMPLATE_SRC returns default value");
	equal(AMA.view.ThreatHistoryListView.MAX_ITEM_LIMIT, 5, "AMA.view.ThreatHistoryListView.MAX_ITEM_LIMIT returns default value");
});

/*   FIXME: This wouldn't work because of capabilities dependency

test("AMA.view.ThreatHistoryListView _processData test", function () {	
	expect(1);
	
	var history = new AMA.view.ThreatHistoryListView({
		el: "#threat_history",
		data: new AMA.model.Threats({ "data": "Bravo!" })
	});
	var item = history._processData({ datetimeDetected: 2398329823 }, 1);
	
	deepEqual(item, { elId: "threat_history_item_1", datetimeDetected: "Jan 29, 1970 at 2:12 AM" }, "AMA.view.ThreatHistoryListView.prototype._processData return expected value");
});

test("AMA.view.ThreatHistoryListView render test", function () {
//	expect(2);
	
	var history = new AMA.view.ThreatHistoryListView({
		el: "#threat_history",
		data: new AMA.model.Threats({ "data": "Bravo!" })
	});
	
	history.isTemplateLoaded = true;
	history.data.isLoaded = true;
	history._doRender();
	
	ok(history.$el, "Scan Setting container ok");
	equal(history.$el.html(), "Bravo!", "AMA.view.ThreatHistoryListView renders correctly");
});
*/