module("ScanSettingsViewTest", {
	setup: function() {
    	if ($("#security_settings").length === 0) {
        	$("<div/>", {
        		id: "security_settings",
        		style: "display:none"
        	}).appendTo("body");
    	}
		
    	if($("#scan_settings_template").length === 0) {
        	$("<script />", {
        		id: "scan_settings_template",
        		type: "text/template"
        	}).appendTo("body");
			
    	}
		$("#scan_settings_template").html("<%=data%>");
	},
	teardown: function() {
		$("#security_settings").remove();
	}
});


test("AMA.view.ScanSettingsView class and default value test", function () {
	expect(4);
	
	deepEqual(AMA.view.ScanSettingsView.__super__, AMA.view.BaseView.prototype, "AMA.view.ScanSettingsView extends AMA.view.BaseView");
	equal(typeof AMA.view.ScanSettingsView.prototype._processData, "function", "AMA.view.ScanSettingsView.prototype._processData is a function");
	
	equal(AMA.view.ScanSettingsView.TEMPLATE_ID, "scan_settings_template", "AMA.view.ScanSettingsView.TEMPLATE_ID returns default value");
	equal(AMA.view.ScanSettingsView.TEMPLATE_SRC, "", "AMA.view.ScanSettingsView.TEMPLATE_SRC returns default value");
});	

test("AMA.view.ScanSettingsView _processData test", function () {	
	expect(2);
	
	var truthyItem = { autoThreatScanFrequency: "WEEKLY", realtimeScanEnabled: true, mediaScanEnabled: true, trayNotificationEnabled: true };
	var falsyItem = { autoThreatScanFrequency: null, realtimeScanEnabled: false, mediaScanEnabled: false,	trayNotificationEnabled: false };
	
	truthyItem = AMA.view.ScanSettingsView.prototype._processData(truthyItem);
	deepEqual(truthyItem,
		{ autoThreatScanFrequency: "WEEKLY", autoThreatScanEnabled: "on", realtimeScanEnabled: "on", mediaScanEnabled: "on",  trayNotificationEnabled: "on" }, 
		"AMA.view.ScanSettingsView.prototype._processData returns expected output");
	
	falsyItem = AMA.view.ScanSettingsView.prototype._processData(falsyItem);
	deepEqual(falsyItem,
		{ autoThreatScanFrequency: null, autoThreatScanEnabled: "off", realtimeScanEnabled: "off", mediaScanEnabled: "off",  trayNotificationEnabled: "off" }, 
		"AMA.view.ScanSettingsView.prototype._processData returns expected output");
	
});	

test("AMA.view.ScanSettingsView render test", function () {
	expect(2);
	
	var scanSettings = new AMA.view.ScanSettingsView({
		el: "#security_settings",
		data: new AMA.model.ScanSettings({ "data": "Cheers!" })
	});
	
	scanSettings.isTemplateLoaded = true;
	scanSettings.data.isLoaded = true;
	scanSettings._doRender();
	
	ok(scanSettings.$el, "Scan Setting container ok");
	equal(scanSettings.$el.html(), "Cheers!", "AMA.view.ScanSettingsView renders correctly");
});