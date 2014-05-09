/*! AMA */
/**
 * The AMA global namespace forms the foundation code for Web UI, which includes
 * namespacing mechanism, dynamic JS loading and core utilities.
 * 
 * @class AMA
 */
if (typeof AMA === "undefined") {
	AMA = {};
}


AMA.config = {
	enableDebug: false,
	logger: null,
	ignoreAborts: false,
	onAbort: function (s) { }			
};


AMA.envs = {};


/**
 * This utility method is used to safely create a namespace (if it doesn't 
 * already exist).
 * 
 * Namespaces can be multiple levels deep. The dots in the input parameter 
 * separate the levels, and the tokens are used to create nested objects.  
 * If any level of the hierarchy already exists, the current object is 
 * preserved.
 * 
 * Due to the nesting of objects, it is highly recommended to keep the 
 * depth of namespacing at minimum.  Avoid using reserved words for namespace
 * tokens.  All namespaces begin with "AMA", therefore indicating this as first
 * token in the namespace is not necessary (it is discarded).
 * 
 * @method namespace
 * @param {string} ns The namespace to create
 * @returns {object} Reference to the namespace object created
 */
AMA.namespace = function (ns) {
	var o = this,
		tokens = [], 
		i = 0;
	
	if (ns.indexOf(".") > -1) {
		tokens = ns.split(".");
		for (i = (tokens[0] === "AMA") ? 1 : 0; i < tokens.length; i++) {
			o[tokens[i]] = o[tokens[i]] || {};
			o = o[tokens[i]];
		} 
	} else {
		o[ns] = o[ns] || {};
		o = o[ns];
	}
	
	return o;
};


/**
 * Creates an enumerated object.
 * 
 * This method ensures a unique numeric value for each item in the enumeration.
 * Since it uses a static counter that increments on each value assignment,
 * the uniqueness of the value is across all enums created by this method.
 * 
 * @method enum
 * @param {string} [items]* The items to include in the enumeration
 * @returns {object} The enumerated object
 */
AMA.enums = function () {
	var o = {}, 
		i;
	
	// Initialize the enum counter as necessary
	if (typeof AMA.__enumCtr === "undefined") {
		AMA.__enumCtr = 0;
	}
	
	// Assign a unique value to each item, using the enum counter
	for (i = 0; i < arguments.length; i++) {
		o[arguments[i]] = AMA.__enumCtr++;
	}
	
	return o;
};


/**
 * Copies object properties from the source to the target.  If the target
 * already has the property, a switchable overwrite mode allows for the value
 * of that property from source object to override the one on the target.
 * 
 * @method augment
 * @param {object} target The target object
 * @param {object} source The source object
 * @param {boolean} [overwrite=true] If true, allows overwriting existing properties
 * @returns {object} The target object
 */
AMA.augment = function (target, source, overwrite) {
	if (!source) return target;
	
	if (typeof overwrite === "undefined") {
		overwrite = true;
	}
	
	var key, exists;
	
	for (key in source) {
		// We copy only the instance properties of 'source', not its 
		// prototype properties
		if (!Object.prototype.hasOwnProperty.call(source, key)) {
			continue;
		}
		
		// Exclude special properties
		if (key == "__onAugment__") {
			continue;
		}
		
		// Note that the 'key in target' check is intentional, because
		// using hasOwnProperty() will only check for instance properties but
		// we don't want to overwrite prototype properties of 'target' either.
		if (overwrite || !(key in target)) {
			target[key] = source[key];
		}
	}
	
	// The special property __onAugment__ is a function that will be invoked
	// once augmentation is completed.  This is useful if we need to do some
	// post-processing on the target object, e.g. when attaching a plug-in.
	if (source.__onAugment__) {
		source.__onAugment__(target);
	}
	
	return target;
};


/**
 * Defines a new class with the specified constructor.  This essentially
 * extends the Object base class, and sets the 'constructor' property of the
 * new class.
 * 
 * @param {function} constructor The constructor for the class
 * @param {object} proto The prototype properties of the class
 * @returns {object} The new class
 */
AMA.define = function (constructor, proto) {
	return AMA.extend(constructor, Object, proto);
};


/**
 * Extends a class. This utility provides the proper setup of prototype,
 * 'constructor' and 'superclass' properties of the subclass, to allow for
 * complete inheritance mechanism. 
 * 
 * Example:
 * 
 * 		function MyClass(options) {
 * 			this.superclass.constructor(options);
 * 		}
 * 		AMA.MyClass = AMA.extend(MyClass, AMA.BaseClass, {
 * 
 * 			doSomething: function (action) {
 * 				this.superclass.doSomething(action);
 * 			}
 * 
 * 			// Add more properties for the subclass here
 * 
 * 		});
 * 
 * @method extend
 * @param {function} target The constructor of the target class
 * @param {function} base The constructor of the parent class
 * @param {object} source
 * @returns {object} The target class
 */
AMA.extend = function (target, base, source) {
	if (!base) return target;
	
	var bproto = base.prototype,
		tproto = null;
	
	// Inherit 'base' prototype properties into 'target' prototype then
	// define 'constructor' and 'superclass' properties
	function F() {}
	F.prototype = bproto;	
	tproto = new F();
	tproto.constructor = target;
	tproto.superclass = bproto;
	target.prototype = tproto;
	
	// Make sure that the superclass 'constructor' property is set 
	if (base != Object && bproto.constructor === Object.prototype.constructor) {
		bproto.constructor = base;
	}
	
	// Add new properties from 'source'
	if (source) {
		AMA.augment(tproto, source, true);
	}
	
	return target;
};



AMA.log = function (msg, type) {	
	if(!AMA.counter)
		AMA.counter = 0;
	// If a custom logger is registered, use it instead of console logging
	var logger = AMA.config.logger;
	if (logger && typeof logger.log === "function") {
		return logger.log(msg, type);
	}
	
	var PREFIX = {
			info: "INFO",
			warning: "WARNING",
			error: "ERROR",
			debug: "DEBUG",
			abort: "ABORT"
		},
		pre = type && PREFIX[type] ? PREFIX[type]+": " : "";
	
	msg = pre + msg;	
		
	if (window.console && console.log) {
		AMA.counter++;
		console.log(AMA.counter + " " + msg);
	}
	
	return msg;
};

AMA.info = function (msg) { return AMA.log(msg, "info"); };

AMA.warning = function (msg) { return AMA.log(msg, "warning"); };

AMA.error = function (msg) { return AMA.log(msg, "error"); };

AMA.debug = function (msg, category) {
    var showThis = true,
        filter = AMA.config.debugMsgFilter;

    // If a debug message category is specified and a filter is configured,
    // check if the message category is among the included categories
    if (category && filter) {
        showThis = false;
        for (var i=0; i<filter.length; i++) {
            if (filter[i] === category) {
                showThis = true;
                break;
            }
        }
    }

	if (AMA.config.enableDebug && showThis) {
		return AMA.log(msg, "debug"); 
	}
	return "";
};


AMA.abort = function (msg) {
	if (AMA.config.ignoreAborts) return;
	
	AMA.log("Javascript execution aborted due to the following error: " + msg);
	
	AMA.config.onAbort.call(this, msg);
	throw msg;
};

AMA.assert = function (cond, msg) {
	if (!cond) {
		AMA.abort(msg);
	}
	return true;
};

// Pre-defined namespaces
AMA.namespace("views");
AMA.namespace("models");
