
module("ScanSettingsTest");

test("AMA.model.ScanSettings.prototype function tests", function () {
	expect(2);
	
	deepEqual(AMA.model.ScanSettings.__super__, AMA.model.BaseData.prototype, "AMA.model.ScanSettings extends AMA.model.BaseData");
	equal(AMA.model.ScanSettings.URL, "/core/api/appsecuritysettings", "AMA.model.ScanSettings.URL returns default value");
});
