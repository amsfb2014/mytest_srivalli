module("ListViewTest", {
	setup: function() {
    	if ($("#listview_test_div").length === 0) {
        	$("<div/>", {
        		id: "listview_test_div",
        		style: "display:none"
        	}).appendTo("body");
    	}
    	$("#listview_test_div").html("");
    	
    	if ($("#listview_test_template").length === 0) {
        	$("<script/>", {
        		id: "listview_test_template",
        		type: "text/template",
        	}).appendTo("body");
    	}    	
    	$("#listview_test_template").html("Dummy content");
	},
	teardown: function() {
		
	}
});


test("AMA.view.ListView class test", function () {
	equal(typeof AMA.view.ListView.prototype.initialize, "function", "AMA.view.ListView.prototype.initialize is a function");
	equal(typeof AMA.view.ListView.prototype.render, "function", "AMA.view.ListView.prototype.render is a function");
	equal(typeof AMA.view.ListView.prototype._selectItem, "function", "AMA.view.ListView.prototype._selectItem is a function");
	equal(typeof AMA.view.ListView.prototype.addFilter, "function", "AMA.view.ListView.prototype.addFilter is a function");
	equal(typeof AMA.view.ListView.prototype.removeFilter, "function", "AMA.view.ListView.prototype.removeFilter is a function");
	equal(typeof AMA.view.ListView.prototype.clearFilters, "function", "AMA.view.ListView.prototype.clearFilters is a function");
	equal(typeof AMA.view.ListView.prototype._applyFilters, "function", "AMA.view.ListView.prototype._applyFilters is a function");
});	
	
test("AMA.view.ListView initialization test", function () {
	var listview = new AMA.view.ListView({
		el: "#listview_test_div",
		data: new AMA.model.UserData()
	});
	ok(listview, "ListView instantiated");
	ok(listview._filters, "Filters initialized");
	ok(listview._dataset, "Dataset initialized");
});

test("AMA.view.ListView render test", function () {
	AMA.view.ListView.TEMPLATE_ID = "listview_test_template";
	listview = new AMA.view.ListView({
		el: "#listview_test_div",
		data: new AMA.model.UserData([{isDummy: true}])
	});
	listview.isTemplateLoaded = true;
	listview.data.isLoaded = true;
	listview._doRender();
	ok(listview.$el, "Container ok");
	equal(listview.$el.html(), "Dummy content", "View rendered");
});

test("AMA.view.ListView filtering test", function () {
	var listview = new AMA.view.ListView({
		el: "#listview_test_div",
		data: new AMA.model.UserData([{id: 1000}, {id: 1001}])
	});
	listview.addFilter("filter1", function () { return true; });
	listview.addFilter("filter2", function (item) { return item.id===1000; }, 3);
	
	ok(listview._filters.filter1 && listview._filters.filter2, "Add filter");
	equal(listview._filters.filter1.priority, AMA.view.ListView.DEFAULT_FILTER_PRIORITY, "Default filter priority applied");
	equal(listview._filters.filter2.priority, 3, "Specified filter priority applied");
	
	listview._applyFilters();
	equal(listview._dataset.length, 1, "Apply filters: Filtered dataset ok");
	equal(listview._datasetBefore.filter2.length, 2, "Apply filters: Pre-filtering dataset backup ok");

	listview.removeFilter("filter1");
	equal(listview._filters.filter1, null, "Remove filter");
	
	listview.clearFilters();
	equal(listview._filters.filter2, null, "Clear filters");	
});


