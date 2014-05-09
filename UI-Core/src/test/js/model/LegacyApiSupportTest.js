/* var $J = (jQuery || {}),
	Jebber = (Jebber || {});
*/
(function() {
	module("LegacyApiSupportTest", {
		setup: function() {
			// backup globals
			savedglobals={};
		},
		teardown: function() {
			// restore globals
		}
	});
})();

// define globals for testing
test("AMA.config.useLegacyApi test", function () {
	equal(AMA.config.useLegacyApi, true, "AMA.config.useLegacyApi true");
});

test("AMA.model.BaseData.prototype function test", function () {
	var a1 = [{"rt":33620224, "ri":"firstName", "dt":{"08-01":"Test"}}],
		a2 = [{"rt":33620224, "ri":"firstName", "dt":{"unknown":"unknown"}}],
		o2, o3={},
		contacts = new AMA.model.Contacts(),
		photos = new AMA.model.Photos(),
		videos = new AMA.model.Videos();

	equal(typeof AMA.model.BaseData.prototype.sync, "function", "AMA.model.BaseData.prototype.sync is a function");
	equal(typeof AMA.model.BaseData.prototype.parse, "function", "AMA.model.BaseData.prototype.parse is a function");
	equal(typeof AMA.model.BaseData.prototype._configureUrl, "function", "AMA.model.BaseData.prototype._configureUrl is a function");
	equal(typeof AMA.model.BaseData.prototype._retrieveEndpointsUrl, "function", "AMA.model.BaseData.prototype._retrieveEndpointsUrl is a function");
	equal(typeof AMA.model.BaseData.prototype._configureFetchOptions, "function", "AMA.model.BaseData.prototype._configureFetchOptions is a function");

	o2 = contacts.parse(a1);
	equal(JSON.stringify(o2), '[{"id":"firstName","firstName":"Test","_meta":{"rt":33620224,"dt":{"08-01":"Test"}},"onPhone":false,"pendingCreate":false,"pendingDelete":false,"pendingUpdate":false}]', "AMA.model.BaseData.prototype.parse expected value");
	o2 = contacts.parse(a2);
	equal(JSON.stringify(o2), '[{"id":"firstName","_meta":{"rt":33620224,"dt":{"unknown":"unknown"}},"onPhone":false,"pendingCreate":false,"pendingDelete":false,"pendingUpdate":false}]', "AMA.model.BaseData.prototype.parse expected value");
	delete AMA.config.simulateData;
	contacts._configureUrl();
	equal(JSON.stringify(contacts.url), '"/core/jebber/records.poo"', "AMA.model.BaseData.prototype._configureUrl no simulateData expected value");
	AMA.config.simulateData={};
	contacts._configureUrl();
	equal(JSON.stringify(contacts.url), '"contacts.dta"', "AMA.model.BaseData.prototype._configureUrl contacts simulateData expected value");
	photos._configureUrl();
	equal(JSON.stringify(photos.url), '"photos.dta"', "AMA.model.BaseData.prototype._configureUrl photos simulateData expected value");
	videos._configureUrl();
	equal(JSON.stringify(videos.url), '"videos.dta"', "AMA.model.BaseData.prototype._configureUrl videos simulateData expected value");
	delete AMA.config.simulateData;
	contacts._retrieveEndpointsUrl();
	equal(JSON.stringify(contacts.url), '"/core/jebber/account.poo?method=retrieveEndpoints&csrfvalue="', "AMA.model.BaseData.prototype._retrieveEndpointsUrl expected value");
	contacts._configureFetchOptions(o3);
	equal(JSON.stringify(o3), '{"data":{"method":"retrieve","recordtype":33620224,"csrfvalue":""}}', "AMA.model.BaseData.prototype._configureFetchOptions expected value");
});


test("AMA.model.UserData.prototype function test", function () {
	var o1 = {"statusUpdated":true}, o2={}, o3, o4,
		a1={"firstName":"Test","lastName":"User","_meta":{"rt":"test"}}, a2={"email":"testuser@gmail.com","email2":"testuser@asurion.com","_meta":{"rt":"test"}}, o={ dt:[], cp:[], se:[] }, s=false;

	equal(typeof AMA.model.UserData.prototype.parse, "function", "AMA.model.UserData.prototype.parse is a function");
	equal(typeof AMA.model.UserData.prototype.sync, "function", "AMA.model.UserData.prototype.sync is a function");
	equal(typeof AMA.model.UserData.prototype._getParams, "function", "AMA.model.UserData.prototype._getParams is a function");
	equal(typeof AMA.model.UserData.prototype._prepareData, "function", "AMA.model.UserData.prototype._prepareData is a function");
	o3 = AMA.model.UserData.prototype._getParams(o1, o2);
	equal(JSON.stringify(o3), '{"method":"setEnabledDataInAccount"}', "AMA.model.Account.prototype._getParams expected value");
	o1= { "addToDevice": true };
	o3 = AMA.model.UserData.prototype._getParams(o1, o2);
	equal(JSON.stringify(o3), '{}', "AMA.model.Account.prototype._getParams addToDevice expected value");  // FIXME: bug?
	o1= { "removeFromDevice": true };
	o3 = AMA.model.UserData.prototype._getParams(o1, o2);
	equal(JSON.stringify(o3), '{"method":"deleteFromEndpoint"}', "AMA.model.Account.prototype._getParams removeFromDevice expected value");
	o1= { "dummy": true };
	o3 = AMA.model.UserData.prototype._getParams(o1, o2);
	equal(JSON.stringify(o3), '{"method":"updateInAccount"}', "AMA.model.Account.prototype._getParams unknown expected value");
	o3 = AMA.model.UserData.prototype._prepareData(a1, o);
	equal(JSON.stringify(o3), '{"dt":[],"cp":[],"se":[]}', "AMA.model.UserData.prototype._prepareData length==2 expected value");	
	o3 = AMA.model.UserData.prototype._prepareData(a2, o);
	equal(JSON.stringify(o3), '{"dt":[],"cp":[],"se":[]}', "AMA.model.UserData.prototype._prepareData length>2 expected value");	

});

test("AMA.model.Account.prototype function test", function () {
	var o1 = {}, o2;
	equal(typeof AMA.model.Account.prototype.fetch, "function", "AMA.model.Account.prototype.fetch is a function");
	equal(typeof AMA.model.Account.prototype.parse, "function", "AMA.model.Account.prototype.parse is a function");
	equal(typeof AMA.model.Account.prototype._configureFetchOptions, "function", "AMA.model.Account.prototype._configureFetchOptions is a function");
	o2 = AMA.model.Account.prototype.parse(o1);
	equal(JSON.stringify(o2), "{}", "AMA.model.Account.prototype.parse expected value");
});

test("AMA.model.DashboardData.prototype function test", function () {
	var o1 = {}, o2;
	equal(typeof AMA.model.DashboardData.prototype.fetch, "function", "AMA.model.DashboardData.prototype.fetch is a function");
	equal(typeof AMA.model.DashboardData.prototype.parse, "function", "AMA.model.DashboardData.prototype.parse is a function");
	equal(typeof AMA.model.DashboardData.prototype._configureFetchOptions, "function", "AMA.model.DashboardData.prototype._configureFetchOptions is a function");
	o2 = AMA.model.DashboardData.prototype.parse(o1);
	equal(JSON.stringify(o2), "{}", "AMA.model.DashboardData.prototype.parse expected value");
});

test("AMA.model.Contacts.prototype function test", function () {
	var a1={"firstName":"Test","lastName":"User"}, a2={"email":"testuser@gmail.com","email2":"testuser@asurion.com"}, o={ dt:[], cp:[], se:[] }, s=false, o2, o3={}, o4={};
	equal(typeof AMA.model.Contacts.prototype.add, "function", "AMA.model.Contacts.prototype.add is a function");
	equal(typeof AMA.model.Contacts.prototype.create, "function", "AMA.model.Contacts.prototype.create is a function");
	equal(typeof AMA.model.Contacts.prototype._prepareData, "function", "AMA.model.Contacts.prototype._prepareData is a function");
	// FIXME: below generates Failed to load resource file:///.../UI-Core/src/test/js/undefined?method=createInAccount&csrfvalue=
	o2 = AMA.model.Contacts.prototype.create(o3, o4);
	equal(JSON.stringify(o2), '{"dt":{},"cp":{},"rt":33620224,"pc":["0"]}', "AMA.model.Contacts.prototype.create expected value");
	o2 = AMA.model.Contacts.prototype._prepareData(a1, o, s);
	equal(JSON.stringify(o2), '{"dt":[],"cp":[],"se":[]}', "AMA.model.Contacts.prototype._prepareData length==2 expected value");	
	o2 = AMA.model.Contacts.prototype._prepareData(a2, o, s);
	equal(JSON.stringify(o2), '{"dt":[],"cp":[],"se":[]}', "AMA.model.Contacts.prototype._prepareData length>2 expected value");	
});

test("AMA.model.Photos.prototype function test", function () {
	var o1 = {}, o2;
	equal(typeof AMA.model.Photos.prototype.parse, "function", "AMA.model.Photos.prototype.parse is a function");
	o2 = AMA.model.Photos.prototype.parse(o1);
	equal(JSON.stringify(o2), "[]", "AMA.model.Photos.prototype.parse expected value");
});

test("AMA.model.Videos.prototype function test", function () {
	var o1 = {}, o2;
	equal(typeof AMA.model.Videos.prototype.parse, "function", "AMA.model.Videos.prototype.parse is a function");
	o2 = AMA.model.Videos.prototype.parse(o1);
	equal(JSON.stringify(o2), "[]", "AMA.model.Videos.prototype.parse expected value");
});

test("AMA.model.Trash.prototype function test", function () {
	var a1=[],
		o2,
	    o1={
	    	"models":[
	    		{"id":"1", "status":0, "get":function(x) { return this[x]; }},
	    		{"id":"2", "status":1, "get":function(x) { return this[x]; }},
	    		{"id":"3", "status":1, "get":function(x) { return this[x]; }}
	    	],
	    	"get":function(x){
	    		var i=0;
	    		for(i=0; i<this.models.length; i++) {
	    			if(x===this.models[i].id) {
	    				return this.models[i];
	    			}
	    		}
	    	},
	    	"remove":function(x){
	    		var i=0;
	    		for(i=0; i<this.models.length; i++) {
	    			if(x.id===this.models[i].id) {
	    				this.models.splice(i,i);
	    			}
	    		}
	    	}
	    },
		contacts = new AMA.model.Contacts(),
		photos = new AMA.model.Photos(),
		videos = new AMA.model.Videos(),
		trash = new AMA.model.Trash();

	equal(typeof AMA.model.Trash.prototype.initialize, "function", "AMA.model.Trash.prototype.initialize is a function");
	equal(typeof AMA.model.Trash.prototype.fetch, "function", "AMA.model.Trash.prototype.fetch is a function");
	equal(typeof AMA.model.Trash.prototype._collectContacts, "function", "AMA.model.Trash.prototype._collectContacts is a function");
	equal(typeof AMA.model.Trash.prototype._collectPhotos, "function", "AMA.model.Trash.prototype._collectPhotos is a function");
	equal(typeof AMA.model.Trash.prototype._collectVideos, "function", "AMA.model.Trash.prototype._collectVideos is a function");
	equal(typeof AMA.model.Trash.prototype._collectTrashed, "function", "AMA.model.Trash.prototype._collectTrashed is a function");
	equal(typeof AMA.model.Trash.prototype._checkIfAllTrashCollected, "function", "AMA.model.Trash.prototype._checkIfAllTrashCollected is a function");
	AMA.model.Trash.prototype._collectTrashed(o1, a1);
	equal(true, (a1.length===2), "AMA.model.Trash.prototype._collectTrashed removed trash");
});
