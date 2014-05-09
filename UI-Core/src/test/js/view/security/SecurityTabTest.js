module("SecurityTabTest", {
	setup: function() {
    	if ($("#security_tab").length === 0) {
        	$("<div/>", {
        		id: "security_tab",
        		style: "display:none"
        	}).appendTo("body");
    	}
    	$("#security_tab").html("");
	},
	teardown: function() {
		$("#security_tab").remove();
	}
});


test("AMA.view.SecurityTab class test", function () {
	expect(2);
	
	deepEqual(AMA.view.SecurityTab.__super__, AMA.view.BaseView.prototype, "AMA.view.SecurityTab extends AMA.view.BaseView");
	equal(typeof AMA.view.SecurityTab.prototype.render, "function", "AMA.view.SecurityTab.prototype.render is a function");
});	

test("AMA.view.SecurityTab default test", function () {
	expect(3);

	equal(AMA.view.SecurityTab.TEMPLATE_ID, "security_tab_template", "AMA.view.SecurityTab.TEMPLATE_ID returns default value");
	equal(AMA.view.SecurityTab.TEMPLATE_SRC, "security.tpl", "AMA.view.SecurityTab.TEMPLATE_SRC returns default value");
	deepEqual(AMA.view.SecurityTab.TOOLBAR, { DEFAULT : ["endpoint", "scan"], IPHONE : ["endpoint", "scan"] }, "AMA.view.SecurityTab.TEMPLATE_ID returns default value");
});

/* FIXME:  This is causing issues that stop the unit test suite
test("AMA.view.SecurityTab render test", function () {
	expect(4);
	
	var securityTab = new AMA.view.SecurityTab({
		el: "#security_tab" 
	});
	securityTab.render();
	
	ok(securityTab.$el, "Container okay");
	ok(securityTab.lastScan, "Last scan panel okay");
	ok(securityTab.scanSettings, "Scan settings panel okay");
	ok(securityTab.threatHistory, "Threat history panel okay");
});
*/