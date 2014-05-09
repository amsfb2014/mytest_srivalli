module("LastScanListViewTest", {
	setup: function() {
		if ($("#threat_scan").length === 0) {
        	$("<div/>", {
				id: "threat_scan",
        		style: "display:none"
        	}).appendTo("body");
    	}
		
    	if($("#last_threat_template").length === 0) {
			$("<script />", {
				id: "last_threat_template",
				type: "text/template"
        	}).appendTo("body");
			
    	}
		
		$("#last_threat_template").html("<%=data%>");
	},
	teardown: function() {
		//$("#threat_scan").remove();
	}
});


test("AMA.view.LastScanListView class and default value test", function () {
	expect(4);
	
	deepEqual(AMA.view.LastScanListView.__super__, AMA.view.ListView.prototype, "AMA.view.LastScanListView extends AMA.view.ListView");
	equal(typeof AMA.view.LastScanListView.prototype._processData, "function", "AMA.view.LastScanListView.prototype._processData is a function");
	
	equal(AMA.view.LastScanListView.TEMPLATE_ID, "last_threat_template", "AMA.view.LastScanListView.TEMPLATE_ID returns default value");
	equal(AMA.view.LastScanListView.TEMPLATE_SRC, "", "AMA.view.LastScanListView.TEMPLATE_SRC returns default value");
});	

test("AMA.view.LastScanListView _processData test", function () {	
	expect(1);
	
	var lastScan = new AMA.view.LastScanListView({
		el: "#threat_scan",
		data: new AMA.model.ThreatScans({ "data": "Hooray!" })
	});
	var item = lastScan._processData({ eventTime: 2398329823 }, 1);
	
	deepEqual(item, { elId: "threat_scan_item_1", lastScanDate: "Jan 29, 1970 at 2:12 AM", eventTime: 2398329823 }, "AMA.view.LastScanListView.prototype._processData return expected value");
});

test("AMA.view.LastScanListView render test", function () {
	expect(2);
	
	var lastScan = new AMA.view.LastScanListView({
		el: "#threat_scan",
		data: new AMA.model.ThreatScans({ "data": "Hooray!" })
	});
	
	lastScan.isTemplateLoaded = true;
	lastScan.data.isLoaded = true;
	lastScan._doRender();
	
	ok(lastScan.$el, "Scan Setting container ok");
	equal(lastScan.$el.html(), "Hooray!", "AMA.view.LastScanListView renders correctly");
});