
module("ThreatsTest");

test("AMA.model.Threats.prototype function tests", function () {
//	expect(7);
	
	deepEqual(AMA.model.Threats.__super__, AMA.model.BaseData.prototype, "AMA.model.Threats extends AMA.model.BaseData");
	equal(typeof AMA.model.Threats.prototype._configureUrl, "function", "AMA.model.Threats.prototype._configureUrl is a function");
	
	// test default values
	equal(AMA.model.Threats.URL, "/core/api/eventActivityHistory?actionType=appScan", "AMA.model.Threats.URL returns default value");
	equal(AMA.model.Threats.COUNTOFFSET, 0, "AMA.model.Threats.COUNTOFFSET returns default value");
	equal(AMA.model.Threats.LIMIT, 5, "AMA.model.Threats.LIMIT returns default value");

    // FIXME: Replace these test cases. They always fail due to dependency on capabilities during instantiation.
//	var threats = new AMA.model.Threats();
//	equal(threats.url, "/core/api/eventActivityHistory?actionType=appScan&offset=0&limit=5", "AMA.model.Threats.prototype._configureUrl returns expected value");
	
//	equal(threats.length, 5, "AMA.model.Threats.prototype.fetch return expected value");
});
