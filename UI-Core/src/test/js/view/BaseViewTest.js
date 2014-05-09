module("BaseViewTest", {
	setup: function() {
    	if ($("#baseview_test_div").length === 0) {
        	$("<div/>", {
        		id: "baseview_test_div",
        		style: "display:none"
        	}).appendTo("body");
    	}
    	$("#baseview_test_div").html("");
    	
    	if ($("#baseview_test_template").length === 0) {
        	$("<script/>", {
        		id: "baseview_test_template",
        		type: "text/template"
        	}).appendTo("body");
    	}    	
    	$("#baseview_test_template").html("Dummy content: <%=msg%>"); 
	},
	teardown: function() {
		
	}
});


test("AMA.view.BaseView class test", function () {
	equal(typeof AMA.view.BaseView.prototype.initialize, "function", "AMA.view.BaseView.prototype.initialize is a function");
	equal(typeof AMA.view.BaseView.prototype.render, "function", "AMA.view.BaseView.prototype.render is a function");
	equal(typeof AMA.view.BaseView.prototype.show, "function", "AMA.view.BaseView.prototype.show is a function");
	equal(typeof AMA.view.BaseView.prototype.hide, "function", "AMA.view.BaseView.prototype.hide is a function");
	equal(typeof AMA.view.BaseView.prototype.refresh, "function", "AMA.view.BaseView.prototype.refresh is a function");
	equal(typeof AMA.view.BaseView.prototype._processData, "function", "AMA.view.BaseView.prototype._processData is a function");
	equal(typeof AMA.view.BaseView.prototype._setupEvents, "function", "AMA.view.BaseView.prototype._setupEvents is a function");
	equal(typeof AMA.view.BaseView.prototype.getChild, "function", "AMA.view.BaseView.prototype.getChild is a function");
	equal(typeof AMA.view.BaseView.prototype.setData, "function", "AMA.view.BaseView.prototype.setData is a function");
	equal(typeof AMA.view.BaseView.prototype.plug, "function", "AMA.view.BaseView.prototype.plug is a function");
	equal(typeof AMA.view.BaseView.prototype._fetchTemplate, "function", "AMA.view.BaseView.prototype._fetchTemplate is a function");
	equal(typeof AMA.view.BaseView.prototype._fetchData, "function", "AMA.view.BaseView.prototype._fetchData is a function");
	equal(typeof AMA.view.BaseView.prototype._doRender, "function", "AMA.view.BaseView.prototype._doRender is a function");
});	
	
test("AMA.view.BaseView initialization test", function () {
	var parentview = new AMA.view.BaseView();
	var baseview = new AMA.view.BaseView({
		el: "#baseview_test_div",
		parent: parentview,
		data: new AMA.model.UserData([{isDummy: true, id: 1000}])
	});
	ok(baseview, "BaseView instantiated");
	equal(baseview.data.length, 1, "Data initialized");
	equal(baseview.parent, parentview, "Parent view linked");
	equal(parentview.getChild("baseview_test_div"), baseview, "Child view linked");
});

test("AMA.view.BaseView render/show/hide/refresh/setData test", function () {
	AMA.view.BaseView.TEMPLATE_ID = "baseview_test_template";
	baseview = new AMA.view.BaseView({
		el: "#baseview_test_div",
		data: new AMA.model.UserData([{isDummy: true, msg: "Hello"}])
	});
	baseview._afterFetchTemplate($("#baseview_test_template").html());
	baseview.data.isLoaded = true;
	baseview._doRender();
	
	ok(baseview.$el, "Container ok");
	equal(baseview.$el.html(), "Dummy content: Hello", "View rendered");
	
	var visible = false;
	baseview.on(AMA.view.BaseView.EVENT.SHOWN, function () {
		visible = true;
	})
	.on(AMA.view.BaseView.EVENT.HIDDEN, function () {
		visible = false;
	});
	baseview.show();
	equal(visible, true, "Show view");
	baseview.hide();
	equal(visible, false, "Hide view");		
	
	baseview.setData(new AMA.model.UserData([{isDummy: true, msg: "Hola"}]));
	equal(baseview.$el.html(), "Dummy content: Hola", "Set data");
});



