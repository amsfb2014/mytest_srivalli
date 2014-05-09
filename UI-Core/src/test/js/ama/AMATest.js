test("AMA.namespace test", function () {
	equal(AMA.namespace("test"), AMA.test, "AMA.namespace('test')");
	equal(AMA.namespace("AMA.view"), AMA.view, "AMA.namespace('AMA.view')");
	equal(AMA.namespace("AMA.view.panel"), AMA.view.panel, "AMA.namespace('AMA.view.panel')");
	
	AMA.view.panel.stub = "X";
	AMA.namespace("AMA.view.panel");
	equal(AMA.view.panel.stub, "X", "Repeat call to AMA.namespace() preserves existing namespace");		
});

test("AMA.enums test", function () {
	AMA.namespace("test");
	AMA.test.enum1 = AMA.enums("A", "B", "C");
	AMA.test.enum2 = AMA.enums("D", "E");
	equal(typeof AMA.test.enum1.A, "number", "Numeric value used in enumeration");
	equal(AMA.test.enum1.B, AMA.test.enum1.A + 1, "Incremental value used in enumeration");	
	equal(AMA.test.enum2.D, AMA.test.enum1.C + 1, "Unique enum value spans multiple enumerations");
});


test("AMA.augment test", function () {
	AMA.namespace("test");
	AMA.test.obj1 = { shape: "round", color: "blue" };
	AMA.augment(AMA.test.obj1, { material: "metal" });
	equal(AMA.test.obj1.material, "metal", "AMA.augment() with simple property add");
	
	AMA.augment(AMA.test.obj1, { color: "red", material: "wood" }, false);
	equal(AMA.test.obj1.color, "blue", "AMA.augment() with overwrite=false");
	
	AMA.augment(AMA.test.obj1, { color: "red", material: "wood" });
	equal(AMA.test.obj1.color, "red", "AMA.augment() with default param value of overwrite=true");	
	
	AMA.augment(AMA.test.obj1, { weight: 15, __onAugment__: function (target) {
		target.postProcessed = true;
	} });
	equal(AMA.test.obj1.postProcessed, true, "Augment with post-processing using __onAugment__");
	
	var o = AMA.augment(AMA.test.obj1);
	equal(AMA.test.obj1, o, "Augment with no 'source' parameter");
});

test("AMA.define test", function () {
	AMA.namespace("test");
	function BaseClass(id) {
		this.id = id;
	}
	AMA.test.BaseClass = AMA.define(BaseClass, {
		protoProp: "abc"
	});
	AMA.test.obj = new AMA.test.BaseClass("123");
	equal(AMA.test.obj.constructor, AMA.test.BaseClass, "The 'constructor' property is defined");
	equal(AMA.test.obj.id, "123", "Generated class instance property ok");
	equal(AMA.test.obj.protoProp, "abc", "Generated class prototype property ok");
});

test("AMA.extend test", function () {
	AMA.namespace("test");
	function BaseClass(msg) {
		this.name = "BaseClass";
		this.msg = msg;
	}
	AMA.test.BaseClass = BaseClass;
	BaseClass.prototype = {
		doThis: function (action) {
			this.todo = action;
		}
	};
	function MyClass(msg) {
		//this.superclass.constructor.call(this, msg);
		this.superclass.constructor(msg); 
		this.name = "MyClass";
	}
	AMA.test.MyClass = AMA.extend(MyClass, AMA.test.BaseClass, {
		doThis: function (action) {
			this.superclass.doThis(action);
			this.todo += " twice";
		}
	});
	AMA.test.MyObject = new AMA.test.MyClass("Hello");
	equal(AMA.test.MyObject.constructor, AMA.test.MyClass, "AMA.extend() defines object.constructor property");
	equal(AMA.test.MyObject.superclass, AMA.test.BaseClass.prototype, "AMA.extend() defines object.superclass property");
	equal(AMA.test.MyObject.superclass.constructor, AMA.test.BaseClass, "AMA.extend() defines object.superclass.constructor property");
	equal(AMA.test.MyObject.name, "MyClass", "subclass constructor works");
	equal(AMA.test.MyObject.msg, "Hello", "superclass constructor can be invoked from subclass constructor");	
	
	AMA.test.MyObject.doThis("blink");
	equal(AMA.test.MyObject.todo, "blink twice", "subclass method can access superclass method");
	
	function F() {}
	AMA.test.NewClass = AMA.extend(F);
	equal(AMA.test.NewClass, F, "AMA.extend() without bass class specified");
});

test("Logging test", function () {
	AMA.namespace("test");
	ok(AMA.info("(DUMMY LOG) For your information"), "Info logging ok");
	ok(AMA.warning("(DUMMY LOG) Consider yourself warned!"), "Warning logging ok");
	ok(AMA.error("(DUMMY LOG) Something has gone wrong"), "Error logging ok");
	AMA.config.enableDebug = true;
	ok(AMA.debug("(DUMMY LOG) Secret debugging information. Sssh don't tell anyone."), "Debug logging ok");
	AMA.config.enableDebug = false;
	equal(AMA.debug("This should not be logged!"), "", "Debug logging does not work when AMA.config.enableDebug=false");
	equal(AMA.assert(true), true, "Successful assert ok");
	AMA.config.onAbort = function () { AMA.test.abortInvoked = true; };
	try {
		var res = AMA.assert(false, "Assertion failed (DUMMY LOG)");
		alert(res);
	} catch (e) {}
	equal(AMA.test.abortInvoked, true, "Program abort with event handler");
	
});