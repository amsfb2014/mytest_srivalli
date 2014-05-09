
module("ThreatScansTest");

test("AMA.model.ThreatScans.prototype function tests", function () {
	expect(2);
	
	deepEqual(AMA.model.ThreatScans.__super__, AMA.model.BaseData.prototype, "AMA.model.ThreatScans extends AMA.model.BaseData");
	equal(AMA.model.ThreatScans.URL, "/core/api/appinfectionscanresults", "AMA.model.ThreatScans.URL returns default value");
});
