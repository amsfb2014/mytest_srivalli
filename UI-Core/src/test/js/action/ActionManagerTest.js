/* var $J = (jQuery || {}),
	Jebber = (Jebber || {});
*/
(function() {
	module("ActionManagerTest", {
		setup: function() {
			// backup globals
			savedglobals={};
		},
		teardown: function() {
			// restore globals
		}
	});
})();

test("AMA.ActionManager function test", function () {
	equal(typeof AMA.ActionManager.define, "function", "AMA.ActionManager.define is a function");
	equal(typeof AMA.ActionManager.start, "function", "AMA.ActionManager.start is a function");
	equal(typeof AMA.ActionManager.cancel, "function", "AMA.ActionManager.cancel is a function");
	equal(typeof AMA.ActionManager.getState, "function", "AMA.ActionManager.getState is a function");
	equal(typeof AMA.ActionManager.addToHistory, "function", "AMA.ActionManager.addToHistory is a function");
	equal(typeof AMA.ActionManager.sendRequest, "function", "AMA.ActionManager.sendRequest is a function");
	equal(typeof AMA.ActionManager.startPolling, "function", "AMA.ActionManager.startPolling is a function");
	equal(typeof AMA.ActionManager.stopPolling, "function", "AMA.ActionManager.stopPolling is a function");
	equal(typeof AMA.ActionManager._checkDataDirty, "function", "AMA.ActionManager._checkDataDirty is a function");
	equal(typeof AMA.ActionManager._ajax, "function", "AMA.ActionManager._ajax is a function");
	equal(typeof AMA.ActionManager._onAjaxError, "function", "AMA.ActionManager._onAjaxError is a function");
});

test("AMA.ActionManager.define function test", function () {
	var s = "test", o2={"on":function(){}};
	AMA.ActionManager.define(s, o2);
	equal(JSON.stringify(o2), '{"_action":"test"}', "AMA.ActionManager.define expected value");
	// redefinition
	AMA.ActionManager.define(s, o2);
	equal(JSON.stringify(o2), '{"_action":"test"}', "AMA.ActionManager.define expected value");
});

test("AMA.ActionManager.start function test", function () {
	var s = "test2", o2={"on":function(){}, "getState":function(){return "ONGOING";}}, o3={"on":function(){}, "getState":function(){return "INACTIVE";}};
	AMA.ActionManager.define(s, o2);
	AMA.ActionManager.start(s);
	//TODO: figure out how to trap an event
	equal(JSON.stringify(o2), '{"_action":"test2"}', "AMA.ActionManager.start ONGOING value");
	s = "test3";
	AMA.ActionManager.define(s, o3);
	AMA.ActionManager.start(s);
	//TODO: figure out how to trap an event
	equal(JSON.stringify(o3), '{"_action":"test3"}', "AMA.ActionManager.start INACTIVE value");
});

test("AMA.ActionManager.getState function test", function () {
	var s = "test2", o2={"on":function(){}, "getState":function(){return "ONGOING";}}, s2;
	AMA.ActionManager.define(s, o2);
	s2=AMA.ActionManager.getState(s);
	//TODO: figure out how to trap an event
	equal(s2, "ONGOING", "AMA.ActionManager.getState ONGOING value");
});

