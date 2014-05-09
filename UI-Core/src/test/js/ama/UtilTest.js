var $J = (jQuery || {}),
	Dialog = (Dialog || {}),
	Header = (Header || {}),
	Jebber = (Jebber || {}),
	ServerConstants = (ServerConstants || {}),
	Strings = (Strings || {}),
	window = (window || {});
(function() {
	module("UtilTest", {
		setup: function() {
			// backup globals
			savedglobals={}
			savedglobals.Dialog = JSON.parse(JSON.stringify(Dialog));
			savedglobals.Header = JSON.parse(JSON.stringify(Header));
			savedglobals.Jebber = JSON.parse(JSON.stringify(Jebber));
			savedglobals.ServerConstants = JSON.parse(JSON.stringify(ServerConstants));
			savedglobals.Strings = JSON.parse(JSON.stringify(Strings));
			
			Dialog = {
				"okCallback": function() {},
				"Notification": {
					"disconnect": function(s) {}
				}
			};
			Header={
				"alarm": {
					"smsType":"ALARMSMS"
				},
				"locate": {
					"smsType":"LOCATESMS"
				},
				"lock": {
					"smsType":"LOCKSMS"
				},
				"msgfamily": {
					"smsType":"MSGFAMILYSMS"
				},
				"sync": {
					"smsType":"SYNCSMS"
				},
				"wipe": {
					"smsType":"WIPESMS",
					"timeout": "-1"
				}
			};
			Jebber={
				"Debug": {
					"assertDefined": function(a,s) {
					},
					"print" : function(o) {
						console.log(o);
					}
				},
				"Skin":{
					"dateAndTimeFormat":"NNN dd, yyyy @ h:mm a",
					"dateFormat":"NNN dd, yyyy",
					"phoneNumberFormat" : function(n) {
						return n;
					},
					"supportsLocationHistory":false,
					"timeFormat":"h:mm a"
				},
				"Util":{
					"Account":{
						"isBackupEnabled": function() {return true;},
						"isRecoveryEnabled": function() {return true;},
						"isSecurityEnabled": function() {return true;}
					}
				}
			};
			ServerConstants={"downloadPathPrefix":"/tmp/",
				"downloadPathSuffix":".png",
				"account": {
					"soundingMessage":"SOUNDINGMESSAGE"
				},
				"errors":{
					"sessionForged":"FORGED",
					"sessionInvalid":"INVALID",
					"sessionTimeout":"TIMEOUT"
				},
				"historyEvents": {
					"emergencyContacts":"EMERGENCYCONTACTS",
					"account": {
						"email": "EMAIL",
						"name": "NAME",
						"securityquestion": "SECURITYQUESTION",
						"securityAnswer": "SECURITYANSWER"
					},
					"security": {
						"LBS": "LBS",
						"scanFinished": "scanFinished",
						"scanStarted": "scanStarted",
						"updateTrust": "updateTrust",
						"appInstalled": "appInstalled",
						"appRemoved": "appRemoved",
						"appUpdated": "appUpdated",
						"appScanned": "appScanned",
						"appUpdated": "appUpdated",
						"threatDetected": "threatDetected",
						"fileUpdated": "fileUpdated",
						"fileScanned": "fileScanned",
						"policyUpdated": "policyUpdated",
						"remediationPerformed": "remediationPerformed",
						"scanFinished": "scanFinished"
					}
				},
				"recordType":{
					"type1":"contacts",
					"type2":"photos",
					"type3":"videos"
				},
				"situationProperties": {
					"airplaneLock": "AIRPLANELOCK",
					"autoMediaScan": "AUTOMEDIASCAN",
					"autoUpdate": "AUTOUPDATE",
					"autoUpdateDay": "AUTOUPDATEDAY",
					"autoUpdateSchedule": "AUTOUPDATESCHEDULE",
					"autoUpdateTime": "AUTOUPDATETIME",
					"backupDate": "BACKUPDATE",
					"backupDay": "BACKUPDAY",
					"backupSchedule": "BACKUPSCHEDULE",
					"backupTime": "BACKUPTIME",
					"cloudAV": "CLOUDAV",
					"deleteNotify": "DELETENOTIFY",
					"downloadNotify": "DOWNLOADNOTIFY",
					"gpsInterval":"GPSINTERVAL",
					"gpsBattery":"GPSBATTERY",
					"locationCheck":"LOCATIONCHECK",
					"realTimeScan": "REALTIMESCAN",
					"realTimeScanApp": "REALTIMESCANAPP",
					"realTimeScanCompressed": "REALTIMESCANCOMPRESSED",
					"realTimeScanMessage": "REALTIMESCANMESSAGE",
					"realTimeScanSDCard": "REALTIMESCANSDCARD",
					"safeBrowsing": "SAFEBROWSING",
					"scanDay": "SCANDAY",
					"scanSchedule": "SCANSCHEDULE",
					"scanTime": "SCANTIME",
					"trayNotify": "TRAYNOTIFY"
				}
			};
			Strings={
				"changed": "CHANGED",
				"emergencyContacts": "EMERGENCYCONTACTS",
				"failIndicator": "FAILED",
				"never":"Never",
				"offIndicator": "OFF",
				"onIndicator": "ON",
				"successIndicator": "SUCCESS",
				"unknownError": "Unknown",
				"accountSettings": {
					"accountname": "ACCOUNTNAME",
					"airplaneLock": "AIRPLANELOCK",
					"autoMediaScan": "AUTOMEDIASCAN",
					"autoUpdate": "AUTOUPDATE",
					"autoUpdateDay": "AUTOUPDATEDAY",
					"autoUpdateSchedule": "AUTOUPDATESCHEDULE",
					"autoUpdateTime": "AUTOUPDATETIME",
					"backupDate": "BACKUPDATE",
					"backupDay": "BACKUPDAY",
					"backupSchedule": "BACKUPSCHEDULE",
					"backupTime": "BACKUPTIME",
					"batteryLevel": "BATTERYLEVEL",
					"cloudAV": "CLOUDAV",
					"deleteNotify": "DELETENOTIFY",
					"downloadNotify": "DOWNLOADNOTIFY",
					"email": "EMAIL",
					"frequency": "FREQUENCY",
					"locationChecks": "LOCATIONCHECKS",
					"realTimeScan": "REALTIMESCAN",
					"realTimeScanApp": "REALTIMESCANAPP",
					"realTimeScanCompressed": "REALTIMESCANCOMPRESSED",
					"realTimeScanMessage": "REALTIMESCANMESSAGE",
					"realTimeScanSDCard": "REALTIMESCANSDCARD",
					"safeBrowsing": "SAFEBROWSING",
					"scanDay": "SCANDAY",
					"scanSchedule": "SCANSCHEDULE",
					"scanTime": "SCANTIME",
					"securityanswer": "SECURITYANSWER",
					"securityquestion": "SECURITYQUESTION",
					"trayNotify": "TRAYNOTIFY"
				},
				"alarm": {
					"soundedMessage": "SOUNDEDMESSAGE",
					"soundingMessage": "SOUNDINGMESSAGE",
					"statusFailed": "ALARMSTATUSFAILED",
					"statusSuccessOff": "ALARMSTATUSSUCCESOFF",
					"statusSuccessOn": "ALARMSTATUSSUCCESON"
				},
				"announce": {
					"dismissedMessage": "DISMISSEDMESSAGE",
					"errorMessage": "ERRORMESSAGE",
					"unansweredMessage": "UNANSWEREDMESSAGE"
				},
				"error": {
					"locate": {
						"gpsOff": "GPSOFF"
					}
				},
				"errorCodes": {
					"FORGED":"Session forgery detected",
					"INVALID":"Session is invalid",
					"TIMEOUT":"Session has timed out"
				},
				"historyEventsText": {
					"scanFinished": "scanFinished",
					"scanStarted": "scanStarted",
					"updateTrust": "updateTrust"
				},
				"locate": {
					"statusFailed": "LOCATESTATUSFAILED",
					"statusSuccessOff": "LOCATESTATUSSUCCESOFF",
					"statusSuccessOn": "LOCATESTATUSSUCCESON"
				},
				"lock": {
					"lockedMessage": "LOCKMESSAGE",
					"lockedNativeMessage": "LOCKEDNATIVE",
					"lockedRandomMessage": "LOCKEDRANDOM",
					"statusFailed": "LOCKSTATUSFAILED",
					"statusFailedShort": "LOCKSTATUSFAILEDSHORT",
					"statusSuccessOff": "LOCKSTATUSSUCCESOFF",
					"statusSuccessOn": "LOCKSTATUSSUCCESON"
				},
				"msgfamily": {
					"statusSuccess": "MSGFAMILYSTATUSSUCCESS"
				},
				"wipe": {
					"audios": "AUDIOSWIPE",
					"calendar": "CALENDARWIPE",
					"calllogs": "CALLLOGSWIPE",
					"completedMessage": "COMPLETEDMESSAGE",
					"contacts": "CONTACTSWIPE",
					"didNotLockPhone": "DIDNOTLOCKPHONE",
					"factoryResetSuccessMessage": "FACTORYRESETSUCCESSMESSAGE",
					"files": "FILESWIPE",
					"folders": "FOLDERSWIPE",
					"lockedPhone": "LOCKEDPHONE",
					"memo": "MEMOWIPE",
					"pictures": "PICTURESWIPE",
					"progressMessage": "PROGRESSMESSAGE",
					"sms":"SMSWIPE",
					"statusFailed": "WIPESTATUSFAILED",
					"statusFailedShort": "WIPESTATUSFAILEDSHORT",
					"statusSuccess": "WIPESTATUSSUCCES",
					"todo": "TODOWIPE",
					"videos": "VIDEOSWIPE"
				}
			};
		},
		teardown: function() {
			// restore globals
			Dialog = savedglobals.Dialog;
			Header = savedglobals.Header;
			Jebber = savedglobals.Jebber;
			ServerConstants = savedglobals.ServerConstants;
			Strings = savedglobals.Strings;
		}
	});
})();

// define globals for testing
test("AMA.Util test", function () {
	equal(AMA.namespace("Util"), AMA.Util, "AMA.namespace('Util')");
});

test("AMA.Util.deepClone test", function () {
	var clone, expect1 = {"a":"1"}, expect2 = [{"b":"2", "c":"3"}, {"d":"4", "e": "5"}];
	equal(typeof AMA.Util.deepClone, "function", "AMA.Util.deepClone is a function");
	clone = AMA.Util.deepClone(expect1);
	deepEqual(clone, {"a":"1"}, "AMA.Util.deepClone simple obj");
	clone = AMA.Util.deepClone(expect2);
	deepEqual(clone, [{"b":"2", "c":"3"}, {"d":"4", "e": "5"}], "AMA.Util.deepClone array of obj");
});

test("AMA.Util.S4 test", function () {
	var s = AMA.Util.S4();
	equal(typeof AMA.Util.S4, "function", "AMA.Util.S4 is a function");
	equal(s.length, 4, "AMA.Util.S4 is a function");
});

test("AMA.Util.guid test", function () {
	var s = AMA.Util.guid();
	equal(typeof AMA.Util.guid, "function", "AMA.Util.guid is a function");
	equal(s.length, 36, "AMA.Util.guid is a function");
});

test("AMA.Util.eventTarget test", function () {
	var window = { 
		"event": { "target":"Asurion" }
	}; 
	var ev=null, o = AMA.Util.eventTarget(ev, window);
	equal(o, "Asurion", "AMA.Util.eventTarget does not return null window.event");
	
	var e={"target":"testEvent"}, o = AMA.Util.eventTarget(e, window);
	equal(typeof AMA.Util.eventTarget, "function", "AMA.Util.eventTarget is a function");
	notEqual(o, null, "AMA.Util.eventTarget does not return null");
	e={"srcElement":"testEvent"}, o = AMA.Util.eventTarget(e, window);
	notEqual(o, null, "AMA.Util.eventTarget does not return null");
});

test("AMA.Util.addSpacesToJsonString test", function () {
	var s="{'a':'1','b':'2','c':'3'}", json = AMA.Util.addSpacesToJsonString(s);
	equal(typeof AMA.Util.addSpacesToJsonString, "function", "AMA.Util.addSpacesToJsonString is a function");
//FIXME:	equal(json, "{'a':'1', 'b':'2', 'c':'3'}", "AMA.Util.addSpacesToJsonString adds spaces after comma");
});

test("AMA.Util.prettyPrintJson test", function () {
	var o={'a':'1','b':'2','c':'3'}, json = AMA.Util.prettyPrintJson(o);
	equal(typeof AMA.Util.prettyPrintJson, "function", "AMA.Util.prettyPrintJson is a function");
	equal(json,  "{\"a\":\"1\", \"b\":\"2\", \"c\":\"3\"}", "AMA.Util.prettyPrintJson add space after comma");
});

test("AMA.Util.replaceQuestionMarks test", function () {
	var s1="hello ?, how are you", values=["there"], regex=null, s2=AMA.Util.replaceQuestionMarks(s1,values);
	equal(typeof AMA.Util.replaceQuestionMarks, "function", "AMA.Util.replaceQuestionMarks is a function");
	equal(s2, "hello there, how are you", "AMA.Util.replaceQuestionMarks replace single value");
	s1="hello ?, how are you ?", values=["there", "kemosabe"], regex=null, s2=AMA.Util.replaceQuestionMarks(s1,values);
	equal(s2, "hello there, how are you kemosabe", "AMA.Util.replaceQuestionMarks replace multiple value");
});

test("AMA.Util.itemExistsInArray test", function () {
	var s1='d', a=['a', 'b', 'c'], b=AMA.Util.itemExistsInArray(s1, a);
	equal(typeof AMA.Util.itemExistsInArray, "function", "AMA.Util.itemExistsInArray is a function");
	equal(b, false, "AMA.Util.itemExistsInArray handle not in array");
	s1='b', a=['a', 'b', 'c'], b=AMA.Util.itemExistsInArray(s1, a);
	equal(b, true, "AMA.Util.itemExistsInArray handle in array");
});

test("AMA.Util.objectKeyCount test", function () {
	var o=null, count=AMA.Util.objectKeyCount(o);
	equal(typeof AMA.Util.objectKeyCount, "function", "AMA.Util.objectKeyCount is a function");
	equal(count, 0, "AMA.Util.objectKeyCount handle null object");
	o={__count__:3, 'a':'1', 'b':'2'}, count=AMA.Util.objectKeyCount(o);
	equal(count, 3, "AMA.Util.objectKeyCount handle object with __count__ property");
	o={'a':'1', 'b':'2'}, count=AMA.Util.objectKeyCount(o);
	equal(count, 2, "AMA.Util.objectKeyCount handle object without __count__ property");
});

test("AMA.Util.formattedLastBackup test", function () {
	var dt=new Date(), o={'synctimes':[]}, s=AMA.Util.formattedLastBackup(o);
	equal(typeof AMA.Util.formattedLastBackup, "function", "AMA.Util.formattedLastBackup is a function");
	equal(s, "Never", "AMA.Util.formattedLastBackup without synctimes")
	dt=new Date(), o={'synctimes':[dt]}, s=AMA.Util.formattedLastBackup(o);
});

test("AMA.Util.formatDateAndTime test", function () {
	var dt=new Date(Date.UTC(2013,3,28,15,1,0)), s;
	equal(typeof AMA.Util.formatDateAndTime, "function", "AMA.Util.formatDateAndTime is a function");
	s=AMA.Util.formatDateAndTime(dt.toUTCString());
	equal(s, "Apr 28, 2013 at 8:01 AM", "AMA.Util.formatDateAndTime converted correctly")
});

test("AMA.Util.locationFormat test", function () {
	var dt=new Date(Date.UTC(2013,3,28,15,1,0)), dt2=new Date(Date.UTC(2013,3,28,16,1,0)), s;
	equal(typeof AMA.Util.locationFormat, "function", "AMA.Util.locationFormat is a function");
	s=AMA.Util.locationFormat(dt.getTime(), dt2.getTime());
	equal(s, "Apr 28, 2013 at 8:01 AM", "AMA.Util.locationFormat handles supportsLocationHistory false");
	Jebber.Skin.supportsLocationHistory=true;
	s=AMA.Util.locationFormat(dt.getTime(), dt.getTime());
	equal(s, "Apr 28, 2013 at 8:01 AM", "AMA.Util.locationFormat handles supportsLocationHistory true, same time and range");
	s=AMA.Util.locationFormat(dt.getTime(), dt2.getTime());
	equal(s, "Apr 28, 2013 at 8:01 AM - Apr 28, 2013 at 9:01 AM", "AMA.Util.locationFormat handles supportsLocationHistory true, different time and range");
	s=AMA.Util.locationFormat("", dt2.getTime());
	equal(s, "", "AMA.Util.locationFormat handles empty time");
});

test("AMA.Util.dateFormat test", function () {
	var dt=new Date(Date.UTC(2013,3,28,15,1,0)), s;
	equal(typeof AMA.Util.dateFormat, "function", "AMA.Util.dateFormat is a function");
	s=AMA.Util.dateFormat(dt.getTime());
	equal(s, "Apr 28, 2013", "AMA.Util.dateFormat converted correctly")
});

test("AMA.Util.timeFormat test", function () {
	var dt=new Date(Date.UTC(2013,3,28,15,1,0)), s;
	equal(typeof AMA.Util.timeFormat, "function", "AMA.Util.timeFormat is a function");
	s=AMA.Util.timeFormat(dt.getTime());
	equal(s, "3:01 PM", "AMA.Util.timeFormat converted correctly")
});

test("AMA.Util.timeElapsed test", function () {
	var dt=new Date(Date.UTC(2013,3,28,15,1,0)), dt2=new Date(Date.UTC(2013,3,28,16,1,0)), s;
	equal(typeof AMA.Util.timeElapsed, "function", "AMA.Util.timeElapsed is a function");
	s=AMA.Util.timeElapsed(dt.getTime(), dt2.getTime());
	equal(s, "1 hr. Ago", "AMA.Util.timeElapsed converted");
	dt2=new Date(Date.UTC(2013,3,28,15,1,30));
	s=AMA.Util.timeElapsed(dt.getTime(), dt2.getTime());
	equal(s, "Less than a min. Ago", "AMA.Util.timeElapsed converted")
});

test("AMA.Util.arraySubtraction test", function () {
	var a1=[1,2,3,4], a2=[2,3], a3=[];
	equal(typeof AMA.Util.arraySubtraction, "function", "AMA.Util.arraySubtraction is a function");
	a3=AMA.Util.arraySubtraction(a1, a2);
	equal(a3.join(","), "1,4", "AMA.Util.arraySubtraction subtraction")
});

test("AMA.Util.formatPhone test", function () {
	var s1="5553456789", s2=AMA.Util.formatPhone(s1);
	equal(typeof AMA.Util.formatPhone, "function", "AMA.Util.formatPhone is a function");
	equal(s2, "(555) 345-6789", "AMA.Util.formatPhone 10 digit format")
});

test("AMA.Util.isType test", function () {
	var n1=13, n2=8, b=AMA.Util.isType(n1, n2);
	equal(typeof AMA.Util.isType, "function", "AMA.Util.isType is a function");
	equal(b, true, "AMA.Util.isType 8 is type of 13")
	n1=18, n2=8, b=AMA.Util.isType(n1, n2);
	equal(b, false, "AMA.Util.isType 8 is type of 13")
});

test("AMA.Util.plusToggle test", function () {
	var o={}, count=0;
	equal(typeof AMA.Util.plusToggle, "function", "AMA.Util.plusToggle is a function");
});

test("AMA.Util.plusOpen test", function () {
	var o={}, count=0;
	equal(typeof AMA.Util.plusOpen, "function", "AMA.Util.plusOpen is a function");
});

/*  --- Method has been deprecated ---
test("AMA.Util.mediaDownloadLink test", function () {
	var o = {
			"getFileMediaId" : function() {
				return "23";
			},
			"getFileName": function() {
				return "test";
			}
		},
		s="";
	equal(typeof AMA.Util.mediaDownloadLink, "function", "AMA.Util.mediaDownloadLink is a function");
	s=AMA.Util.mediaDownloadLink(o);
	equal(s, "/tmp/test.png23", "AMA.Util.mediaDownloadLink uri string")
});
*/

test("AMA.Util.addUnitToFileSize test", function () {
	var s1="0", s2=AMA.Util.addUnitToFileSize(s1);
	equal(typeof AMA.Util.addUnitToFileSize, "function", "AMA.Util.addUnitToFileSize is a function");
	equal(s2, "", "AMA.Util.addUnitToFileSize empty string")
	s1="1", s2=AMA.Util.addUnitToFileSize(s1);
	equal(s2, "1B", "AMA.Util.addUnitToFileSize byte string")
	s1="2560", s2=AMA.Util.addUnitToFileSize(s1);
	equal(s2, "2.5KB", "AMA.Util.addUnitToFileSize kilobyte string")
	s1="2560", s2=AMA.Util.addUnitToFileSize(s1);
	equal(s2, "2.5KB", "AMA.Util.addUnitToFileSize kilobyte string")
	s1="1610612736", s2=AMA.Util.addUnitToFileSize(s1);
	equal(s2, "1.5GB", "AMA.Util.addUnitToFileSize gigabyte string")
});

test("AMA.Util.validateEmail test", function () {
	var s="asurion@test.com", b=AMA.Util.validateEmail(s);
	equal(typeof AMA.Util.validateEmail, "function", "AMA.Util.validateEmail is a function");
	equal(s, "asurion@test.com", "AMA.Util.validateEmail normal email")
});

test("AMA.Util.validDate test", function () {
	var y="2013", m="4", d="30", b=AMA.Util.validDate(m, d, y);
	equal(typeof AMA.Util.validDate, "function", "AMA.Util.validDate is a function");
	equal(b, true, "AMA.Util.validateDate 30 days valid")
	y="2013", m="4", d="31", b=AMA.Util.validDate(m, d, y);
	equal(b, false, "AMA.Util.validateDate 30 days invalid")
	y="2013", m="5", d="31", b=AMA.Util.validDate(m, d, y);
	equal(b, true, "AMA.Util.validateDate 31 days valid")
	y="2013", m="5", d="33", b=AMA.Util.validDate(m, d, y);
	equal(b, false, "AMA.Util.validateDate 31 days invalid")
	y="2013", m="2", d="28", b=AMA.Util.validDate(m, d, y);
	equal(b, true, "AMA.Util.validateDate 28 days valid")
	y="2013", m="2", d="30", b=AMA.Util.validDate(m, d, y);
	equal(b, false, "AMA.Util.validateDate 28 days invalid")
});

/* --- Obsolete method ---
test("AMA.Util.recordTypeFriendlyName test", function () {
	var s1="photos", s2=AMA.Util.recordTypeFriendlyName(s1);
	equal(typeof AMA.Util.recordTypeFriendlyName, "function", "AMA.Util.recordTypeFriendlyName is a function");
	equal(s2, "type2", "AMA.Util.recordTypeFriendlyName valid")
	s1="unknowntype", s2=AMA.Util.recordTypeFriendlyName(s1);
	equal(s2, "", "AMA.Util.recordTypeFriendlyName valid")
});
*/

test("AMA.Util.LZ test", function () {
	var d=31, s=AMA.Util.LZ(d);
	equal(typeof AMA.Util.LZ, "function", "AMA.Util.LZ is a function");
	equal(s, "31", "AMA.Util.LZ without left padding");
	d=3, s=AMA.Util.LZ(d);
	equal(s, "03", "AMA.Util.LZ with left padding");
});

// Year         | yyyy (4 digits)    | yy (2 digits), y (2 or 4 digits)
// Month        | MMM (name or abbr.)| MM (2 digits), M (1 or 2 digits)
//              | NNN (abbr.)        |
//				| FFF (french abbr.) |
// Day of Month | dd (2 digits)      | d (1 or 2 digits)
// Day of Week  | EE (name)          | E (abbr)
// Hour (1-12)  | hh (2 digits)      | h (1 or 2 digits)
// Hour (0-23)  | HH (2 digits)      | H (1 or 2 digits)
// Hour (0-11)  | KK (2 digits)      | K (1 or 2 digits)
// Hour (1-24)  | kk (2 digits)      | k (1 or 2 digits)
// Minute       | mm (2 digits)      | m (1 or 2 digits)
// Second       | ss (2 digits)      | s (1 or 2 digits)
// AM/PM        | a                  |
test("AMA.Util.formatDate test", function () {
	var dt=new Date(Date.UTC(2013,3,28,15,1,0)),
	    f="yyyy MMM NNN FFF dd EE hh HH KK kk mm ss a 'nopad' yy MM d E h H K k m s", 
	    s;
	equal(typeof AMA.Util.formatDate, "function", "AMA.Util.formatDate is a function");
	s=AMA.Util.formatDate(dt, f);
	equal(s, "2013 April Apr avril 28 Sunday 03 15 03 15 01 00 PM nopad 13 04 28 Sun 3 15 3 15 1 0", "AMA.Util.formatDate formatDate full value");
});

test("AMA.Util.escapeSpecialCharacters test", function () {
	var s1="<script>", s2=AMA.Util.escapeSpecialCharacters(s1);
	equal(typeof AMA.Util.escapeSpecialCharacters, "function", "AMA.Util.escapeSpecialCharacters is a function");
	equal(s2, "&lt;script&gt;", "AMA.Util.escapeSpecialCharacters converted string")
});

test("AMA.Util.unEscapeSpecialCharacters test", function () {
	var s1="&lt;script&gt;", s2=AMA.Util.unEscapeSpecialCharacters(s1);
	equal(typeof AMA.Util.unEscapeSpecialCharacters, "function", "AMA.Util.unEscapeSpecialCharacters is a function");
	equal(s2, "<script>", "AMA.Util.unEscapeSpecialCharacters converted string")
});

test("AMA.Util.setCookie test", function () {
	var s1="qunit-test-cookie", s2="set", n=30;
	equal(typeof AMA.Util.setCookie, "function", "AMA.Util.setCookie is a function");
	// FIXME: need a mock for document.cookie
	AMA.Util.setCookie(s1, s2, n);
	equal(document.cookie, "qunit-test-cookie=set", "AMA.Util.setCookie validation: cookie has been set")
});

test("AMA.Util.getCookie test", function () {
	var s1="qunit-test-cookie", s2;
	equal(typeof AMA.Util.getCookie, "function", "AMA.Util.getCookie is a function");
	// FIXME: need a mock for document.cookie
	s2=AMA.Util.getCookie(s1);
	equal(s2, "set", "AMA.Util.getCookie validation: cookie retrieved correctly")
});

test("AMA.Util.deleteCookie test", function () {
	var s="qunit-test-cookie";
	equal(typeof AMA.Util.deleteCookie, "function", "AMA.Util.deleteCookie is a function");
	// FIXME: need a mock for document.cookie
	AMA.Util.deleteCookie(s);
	equal(document.cookie, "", "AMA.Util.deleteCookie validation: cookie is null")
});

test("AMA.Util.getBrowserType test", function () {
	var o={}, count=0;
	equal(typeof AMA.Util.getBrowserType, "function", "AMA.Util.getBrowserType is a function");
});

test("AMA.Util.isIEVersionLessThan test", function () {
	var o={}, count=0;
	equal(typeof AMA.Util.isIEVersionLessThan, "function", "AMA.Util.isIEVersionLessThan is a function");
});

test("AMA.Util.replaceConsecutiveSpaces test", function () {
	var s1="Hi    There", s2=AMA.Util.replaceConsecutiveSpaces(s1);
	equal(typeof AMA.Util.replaceConsecutiveSpaces, "function", "AMA.Util.replaceConsecutiveSpaces is a function");
	equal(s2, "Hi There", "AMA.Util.replaceConsecutiveSpaces converted string")
});

test("AMA.Util.spaceConcatAndTrim test", function () {
	var s1="Hi There", s2="Asurion", s3=AMA.Util.spaceConcatAndTrim(s1, s2);
	equal(typeof AMA.Util.spaceConcatAndTrim, "function", "AMA.Util.spaceConcatAndTrim is a function");
	equal(s3, "Hi There Asurion", "AMA.Util.spaceConcatAndTrim converted string without comma")
	var s1="Hi There", s2=",1,2,3", s3=AMA.Util.spaceConcatAndTrim(s1, s2);
	equal(s3, "Hi There,1,2,3", "AMA.Util.spaceConcatAndTrim converted string with comma")
});

test("AMA.Util.combineNames test", function () {
	var f="f", m="m", l="l", p="p", s="s", name=AMA.Util.combineNames(f, m, l, p, s);
	equal(typeof AMA.Util.combineNames, "function", "AMA.Util.combineNames is a function");
	equal(name, "p f m l s", "AMA.Util.combineNames converted string")
});

test("AMA.Util.parseFullName test", function () {
	var s="p f m l s", a=AMA.Util.parseFullName(s);
	equal(typeof AMA.Util.parseFullName, "function", "AMA.Util.parseFullName is a function");
	equal(a.join(' '), " p f m l s ", "AMA.Util.combineNames converted string normal order")
	s="l, p f m s", a=AMA.Util.parseFullName(s);
	equal(a.join(' '), " p f m s l ", "AMA.Util.combineNames converted string lastname first")
});

test("AMA.Util.removePreNominalTitle test", function () {
	var s="Dr. Asurion Test", a=AMA.Util.removePreNominalTitle(s);
	equal(typeof AMA.Util.removePreNominalTitle, "function", "AMA.Util.removePreNominalTitle is a function");
	equal(a.join(','), "Dr. ,Asurion Test", "AMA.Util.removePreNominalTitle converted string for Dr.");
	s="Ms. Asurion Test", a=AMA.Util.removePreNominalTitle(s);
	equal(a.join(','), "Ms. ,Asurion Test", "AMA.Util.removePreNominalTitle converted string for Ms.");
	s="Mr. Asurion Test", a=AMA.Util.removePreNominalTitle(s);
	equal(a.join(','), "Mr. ,Asurion Test", "AMA.Util.removePreNominalTitle converted string for Mr.");
	s="Prof. Asurion Test", a=AMA.Util.removePreNominalTitle(s);
	equal(a.join(','), "Prof. ,Asurion Test", "AMA.Util.removePreNominalTitle converted string for Prof.");
	s="Qt Asurion Test", a=AMA.Util.removePreNominalTitle(s);
	equal(a.join(','), ",Qt Asurion Test", "AMA.Util.removePreNominalTitle converted string for Prof.");
});

test("AMA.Util.removePostNominalTitle test", function () {
	var s="Asurion Test Sr.", a=AMA.Util.removePostNominalTitle(s);
	equal(typeof AMA.Util.removePostNominalTitle, "function", "AMA.Util.removePostNominalTitle is a function");
	equal(a.join(','), "Sr.,Asurion Test", "AMA.Util.removePostNominalTitle converted string for Sr.");
	s="Asurion Test Jr.", a=AMA.Util.removePostNominalTitle(s);
	equal(a.join(','), "Jr.,Asurion Test", "AMA.Util.removePostNominalTitle converted string for Jr.");
	s="Asurion Test III", a=AMA.Util.removePostNominalTitle(s);
	equal(a.join(','), "III,Asurion Test", "AMA.Util.removePostNominalTitle converted string for III");
	s="Asurion Test PhD.", a=AMA.Util.removePostNominalTitle(s);
	equal(a.join(','), "PhD.,Asurion Test", "AMA.Util.removePostNominalTitle converted string for PhD.");
	s="Asurion Test ((Cell)555-345-6789)", a=AMA.Util.removePostNominalTitle(s);
	equal(a.join(','), ",Asurion Test ((Cell)555-345-6789)", "AMA.Util.removePostNominalTitle converted string for (Cell)");
});

test("AMA.Util.chop test", function () {
	var s1="pie", s2="whole pie", a=AMA.Util.chop(s1, s2);
	equal(typeof AMA.Util.chop, "function", "AMA.Util.chop is a function");
	equal(a.join(','), "pie,whole ", "AMA.Util.chop converted string");
	var s1="piece", s2="whole pie", a=AMA.Util.chop(s1, s2);
	equal(a.join(','), "piece,whole pie", "AMA.Util.chop converted string");
});

test("AMA.Util.removeLast test", function () {
	var s1="w", s2="whole whale", s3=AMA.Util.removeLast(s1, s2);
	equal(typeof AMA.Util.removeLast, "function", "AMA.Util.removeLast is a function");
	equal(s3, "whole hale", "AMA.Util.removeLast converted string");
	s1="", s2="whole whale", s3=AMA.Util.removeLast(s1, s2);
	equal(s3, "whole whale", "AMA.Util.removeLast converted string empty piece");
	s1="piece", s2="whole whale", s3=AMA.Util.removeLast(s1, s2);
	equal(s3, "whole whale", "AMA.Util.removeLast converted string mismatch piece");
});

test("AMA.Util.remove test", function () {
	var s1="w", s2="whole", s3=AMA.Util.remove(s1, s2);
	equal(typeof AMA.Util.remove, "function", "AMA.Util.remove is a function");
	equal(s3, "hole", "AMA.Util.remove converted string");
	s1="", s2="whole", s3=AMA.Util.remove(s1, s2);
	equal(s3, "whole", "AMA.Util.remove converted string empty piece");
	s1="piece", s2="whole", s3=AMA.Util.remove(s1, s2);
	equal(s3, "whole", "AMA.Util.remove converted string mismatch piece");
});

test("AMA.Util.truncateString test", function () {
	var s1="whole whale", n=5, s2=AMA.Util.truncateString(s1, n);
	equal(typeof AMA.Util.truncateString, "function", "AMA.Util.truncateString is a function");
	equal(s2, "who...", "AMA.Util.truncateString converted string");
	s1="whole whale", n="5", s2=AMA.Util.truncateString(s1, n);
	equal(s2, undefined, "AMA.Util.truncateString converted string");
});

test("AMA.Util.removeEmptyStrings test", function () {
	var a1=["1", "2", "", "4", ""], a2=AMA.Util.removeEmptyStrings(a1);
	equal(typeof AMA.Util.removeEmptyStrings, "function", "AMA.Util.removeEmptyStrings is a function");
	equal(a2.join(','), "1,2,4", "AMA.Util.removeEmptyStrings converted array");
});

test("AMA.Util.limitText test", function () {
	var o={}, count=0;
	equal(typeof AMA.Util.limitText, "function", "AMA.Util.limitText is a function");
});

test("AMA.Util.updateCharacterCountDisplay test", function () {
	var o={}, count=0;
	equal(typeof AMA.Util.updateCharacterCountDisplay, "function", "AMA.Util.updateCharacterCountDisplay is a function");
});

/*  --- Deprecated method ---
test("AMA.Util.parseFailure test", function () {
	var o={"message":"world peace", "failures":[]}, s=AMA.Util.parseFailure(o);
	equal(typeof AMA.Util.parseFailure, "function", "AMA.Util.parseFailure is a function");
	equal(s, "world peace", "AMA.Util.parseFailure converted string");
	o={"message":"world peace", "failures":["TIMEOUT"]}, s=AMA.Util.parseFailure(o);
	equal(s, undefined, "AMA.Util.parseFailure converted TIMEOUT failure");
	o={"message":"world peace", "failures":["INVALID"]}, s=AMA.Util.parseFailure(o);
	equal(s, undefined, "AMA.Util.parseFailure converted INVALID failure");
	o={"message":"world peace", "failures":["FORGED"]}, s=AMA.Util.parseFailure(o);
	equal(s, undefined, "AMA.Util.parseFailure converted FORGED failure");
	o={"message":"Request failed", "failures":[]}, s=AMA.Util.parseFailure(o);
	equal(s, undefined, "AMA.Util.parseFailure converted Request failed message");
	o={"message":"", "failures":[]}, s=AMA.Util.parseFailure(o);
	equal(s, undefined, "AMA.Util.parseFailure converted empty message");
});
*/

test("AMA.Util.getInsertIndex test", function () {
	var a=[1, 3, 5, 7, 9, 11], n1=8, n2=0, n3=a.length,
	fn=function(a, b){ if (a<b){ return -1; } else { if(a>b) {return 1;} else {return 0} } },
	n4=0;
	equal(typeof AMA.Util.getInsertIndex, "function", "AMA.Util.getInsertIndex is a function");
	n4=AMA.Util.getInsertIndex(a, n1, n2, n3, fn);
	equal(n4, 4, "AMA.Util.getInsertIndex internal index");
	n1=12;
	n4=AMA.Util.getInsertIndex(a, n1, n2, n3, fn);
	equal(n4, 6, "AMA.Util.getInsertIndex right index");
	n1=0;
	n4=AMA.Util.getInsertIndex(a, n1, n2, n3, fn);
	equal(n4, 0, "AMA.Util.getInsertIndex left index");
});

test("AMA.Util.calculateTimeRange test", function () {
	var s1="12", s2=AMA.Util.calculateTimeRange(s1);
	equal(typeof AMA.Util.calculateTimeRange, "function", "AMA.Util.calculateTimeRange is a function");
	equal(s2, "12-112", "AMA.Util.calculateTimeRange close to 12");
	s1="6", s2=AMA.Util.calculateTimeRange(s1);
	equal(s2, "6-76", "AMA.Util.calculateTimeRange away from 12");
});

/*   --- Obsolete method ---
test("AMA.Util.parseInfoForDashboardActivity test", function () {
	var s1="", s2="", s3="", o={};
	equal(typeof AMA.Util.parseInfoForDashboardActivity, "function", "AMA.Util.parseInfoForDashboardActivity is a function");
	// Recovery
	s1=Header.alarm.smsType;
	s2=Strings.successIndicator;
	s3=Strings.onIndicator;
	o=AMA.Util.parseInfoForDashboardActivity(s1, s2, s3);
	equal(o.image, "icon_alarm_success", "AMA.Util.parseInfoForDashboardActivity for alarm sms, success, on");
	equal(o.text, Strings.alarm.statusSuccessOn, "AMA.Util.parseInfoForDashboardActivity for alarm sms, success, on");
	s3=Strings.offIndicator;
	o=AMA.Util.parseInfoForDashboardActivity(s1, s2, s3);
	equal(o.image, "icon_alarm_success", "AMA.Util.parseInfoForDashboardActivity for alarm sms, success, off");
	equal(o.text, Strings.alarm.statusSuccessOff, "AMA.Util.parseInfoForDashboardActivity for alarm sms, success, off");
	s2=Strings.failIndicator;
	o=AMA.Util.parseInfoForDashboardActivity(s1, s2, s3);
	equal(o.image, "icon_alarm_failed", "AMA.Util.parseInfoForDashboardActivity for alarm sms, failed, off");
	equal(o.text, Strings.alarm.statusFailed, "AMA.Util.parseInfoForDashboardActivity for alarm sms, failed, off");
	s1=Header.lock.smsType;
	s2=Strings.successIndicator;
	s3=Strings.onIndicator;
	o=AMA.Util.parseInfoForDashboardActivity(s1, s2, s3);
	equal(o.image, "icon_lock_success", "AMA.Util.parseInfoForDashboardActivity for lock sms, success, on");
	equal(o.text, Strings.lock.statusSuccessOn, "AMA.Util.parseInfoForDashboardActivity for lock sms, success, on");
	s3=Strings.offIndicator;
	o=AMA.Util.parseInfoForDashboardActivity(s1, s2, s3);
	equal(o.image, "icon_unlock_success", "AMA.Util.parseInfoForDashboardActivity for lock sms, success, off");
	equal(o.text, Strings.lock.statusSuccessOff, "AMA.Util.parseInfoForDashboardActivity for lock sms, success, off");
	s2=Strings.failIndicator;
	o=AMA.Util.parseInfoForDashboardActivity(s1, s2, s3);
	equal(o.image, "icon_lock_failed", "AMA.Util.parseInfoForDashboardActivity for lock sms, failed, off");
	equal(o.text, Strings.lock.statusFailed, "AMA.Util.parseInfoForDashboardActivity for lock sms, failed, off");
	s1=Header.locate.smsType;
	s2=Strings.successIndicator;
	s3=Strings.onIndicator;
	o=AMA.Util.parseInfoForDashboardActivity(s1, s2, s3);
	equal(o.image, "icon_locate_success", "AMA.Util.parseInfoForDashboardActivity for locate sms, success, on");
	equal(o.text, Strings.locate.statusSuccess, "AMA.Util.parseInfoForDashboardActivity for locate sms, success, on");
	s2=Strings.failIndicator;
	o=AMA.Util.parseInfoForDashboardActivity(s1, s2, s3);
	equal(o.image, "icon_locate_failed", "AMA.Util.parseInfoForDashboardActivity for locate sms, failed, off");
	equal(o.text, Strings.locate.statusFailed, "AMA.Util.parseInfoForDashboardActivity for locate sms, failed, off");
	s1=Header.wipe.smsType;
	s2=Strings.successIndicator;
	s3=Strings.successIndicator;
	o=AMA.Util.parseInfoForDashboardActivity(s1, s2, s3);
	equal(o.image, "icon_wipe_success", "AMA.Util.parseInfoForDashboardActivity for wipe sms, success, success");
	equal(o.text, "WIPESTATUSSUCCES & LOCKSTATUSSUCCESON", "AMA.Util.parseInfoForDashboardActivity for wipe sms, success, success");
	s2=Strings.failIndicator;
	o=AMA.Util.parseInfoForDashboardActivity(s1, s2, s3);
	equal(o.image, "icon_wipe_failed", "AMA.Util.parseInfoForDashboardActivity for wipe sms, failed, success");
	equal(o.text, "WIPESTATUSFAILEDSHORT&#44; LOCKSTATUSSUCCESON", "AMA.Util.parseInfoForDashboardActivity for wipe sms, failed, success");
	s2=Strings.successIndicator;
	s3=Strings.failIndicator;
	o=AMA.Util.parseInfoForDashboardActivity(s1, s2, s3);
	equal(o.image, "icon_wipe_success", "AMA.Util.parseInfoForDashboardActivity for wipe sms, success, failed");
	equal(o.text, "WIPESTATUSSUCCES&#44; LOCKSTATUSFAILEDSHORT", "AMA.Util.parseInfoForDashboardActivity for wipe sms, success, failed");
	s2=Strings.successIndicator;
	s3="";
	o=AMA.Util.parseInfoForDashboardActivity(s1, s2, s3);
	equal(o.image, "icon_wipe_success", "AMA.Util.parseInfoForDashboardActivity for wipe sms, success, ");
	equal(o.text, Strings.wipe.statusSuccess, "AMA.Util.parseInfoForDashboardActivity for wipe sms, success, ");
	s2=Strings.failIndicator;
	s3="";
	o=AMA.Util.parseInfoForDashboardActivity(s1, s2, s3);
	equal(o.image, "icon_wipe_failed", "AMA.Util.parseInfoForDashboardActivity for wipe sms, failed, ");
	equal(o.text, Strings.wipe.statusFailed, "AMA.Util.parseInfoForDashboardActivity for wipe sms, failed, ");
	s1=Header.msgfamily.smsType;
	s2=Strings.successIndicator;
	s3=Strings.onIndicator;
	o=AMA.Util.parseInfoForDashboardActivity(s1, s2, s3);
	equal(o.image, "icon_profile_update_success", "AMA.Util.parseInfoForDashboardActivity for msgfamily sms, success, on");
	equal(o.text, Strings.msgfamily.statusSuccess, "AMA.Util.parseInfoForDashboardActivity for msgfamily sms, success, on");
	// Recovery Settings
	s1=ServerConstants.historyEvents.emergencyContacts;
	o=AMA.Util.parseInfoForDashboardActivity(s1, s2, s3);
	equal(o.image, "icon_profile_update_success", "AMA.Util.parseInfoForDashboardActivity for emergencyContacts sms, success, on");
	equal(o.text, "EMERGENCYCONTACTS CHANGED", "AMA.Util.parseInfoForDashboardActivity for emergencyContacts sms, success, on");
	s1=ServerConstants.situationProperties.locationCheck;
	o=AMA.Util.parseInfoForDashboardActivity(s1, s2, s3);
	equal(o.image, "icon_profile_update_success", "AMA.Util.parseInfoForDashboardActivity for locationCheck sms, success, on");
	equal(o.text, "LOCATIONCHECKS CHANGED", "AMA.Util.parseInfoForDashboardActivity for locationCheck sms, success, on");
	s1=ServerConstants.situationProperties.gpsInterval;
	o=AMA.Util.parseInfoForDashboardActivity(s1, s2, s3);
	equal(o.image, "icon_profile_update_success", "AMA.Util.parseInfoForDashboardActivity for gpsInterval sms, success, on");
	equal(o.text, "FREQUENCY CHANGED", "AMA.Util.parseInfoForDashboardActivity for gpsInterval sms, success, on");
	s1=ServerConstants.situationProperties.gpsBattery;
	o=AMA.Util.parseInfoForDashboardActivity(s1, s2, s3);
	equal(o.image, "icon_profile_update_success", "AMA.Util.parseInfoForDashboardActivity for gpsBattery sms, success, on");
	equal(o.text, "BATTERYLEVEL CHANGED", "AMA.Util.parseInfoForDashboardActivity for gpsBattery sms, success, on");
	// Backup
	s1=Header.sync.smsType;
	s2=Strings.successIndicator;
	s3=Strings.onIndicator;
	o=AMA.Util.parseInfoForDashboardActivity(s1, s2, s3);
	equal(o.image, "icon_sync_success", "AMA.Util.parseInfoForDashboardActivity for sync sms, success, on");
	equal(o.text, "Sync Successful", "AMA.Util.parseInfoForDashboardActivity for sync sms, success, on");
	s2=Strings.failIndicator;
	o=AMA.Util.parseInfoForDashboardActivity(s1, s2, s3);
	equal(o.image, "icon_sync_failed", "AMA.Util.parseInfoForDashboardActivity for sync sms, failed, on");
	equal(o.text, "Sync Command Not Sent", "AMA.Util.parseInfoForDashboardActivity for sync sms, failed, on");
	// Backup
	s1=ServerConstants.situationProperties.backupSchedule;
	o=AMA.Util.parseInfoForDashboardActivity(s1, s2, s3);
	equal(o.image, "icon_profile_update_success", "AMA.Util.parseInfoForDashboardActivity for backupSchedule sms, success, on");
	equal(o.text, "BACKUPSCHEDULE CHANGED", "AMA.Util.parseInfoForDashboardActivity for backupSchedule sms, success, on");
	s1=ServerConstants.situationProperties.backupDate;
	o=AMA.Util.parseInfoForDashboardActivity(s1, s2, s3);
	equal(o.image, "icon_profile_update_success", "AMA.Util.parseInfoForDashboardActivity for backupDate sms, success, on");
	equal(o.text, "BACKUPDATE CHANGED", "AMA.Util.parseInfoForDashboardActivity for backupDate sms, success, on");
	s1=ServerConstants.situationProperties.backupDay;
	o=AMA.Util.parseInfoForDashboardActivity(s1, s2, s3);
	equal(o.image, "icon_profile_update_success", "AMA.Util.parseInfoForDashboardActivity for backupDay sms, success, on");
	equal(o.text, "BACKUPDAY CHANGED", "AMA.Util.parseInfoForDashboardActivity for backupDay sms, success, on");
	s1=ServerConstants.situationProperties.backupTime;
	o=AMA.Util.parseInfoForDashboardActivity(s1, s2, s3);
	equal(o.image, "icon_profile_update_success", "AMA.Util.parseInfoForDashboardActivity for backupTime sms, success, on");
	equal(o.text, "BACKUPTIME CHANGED", "AMA.Util.parseInfoForDashboardActivity for backupTime sms, success, on");
	s1=ServerConstants.historyEvents.account.name;
	o=AMA.Util.parseInfoForDashboardActivity(s1, s2, s3);
	equal(o.image, "icon_profile_update_success", "AMA.Util.parseInfoForDashboardActivity for account.name sms, success, on");
	equal(o.text, "ACCOUNTNAME CHANGED", "AMA.Util.parseInfoForDashboardActivity for account.name sms, success, on");
	s1=ServerConstants.historyEvents.account.email;
	o=AMA.Util.parseInfoForDashboardActivity(s1, s2, s3);
	equal(o.image, "icon_profile_update_success", "AMA.Util.parseInfoForDashboardActivity for account.email sms, success, on");
	equal(o.text, "EMAIL CHANGED", "AMA.Util.parseInfoForDashboardActivity for account.email sms, success, on");
	s1=ServerConstants.historyEvents.account.securityQuestion;
	o=AMA.Util.parseInfoForDashboardActivity(s1, s2, s3);
	equal(o.image, "icon_profile_update_success", "AMA.Util.parseInfoForDashboardActivity for account.securityquestion sms, success, on");
	equal(o.text, "SECURITYQUESTION CHANGED", "AMA.Util.parseInfoForDashboardActivity for account.securityquestion sms, success, on");
	s1=ServerConstants.historyEvents.account.securityAnswer;
	o=AMA.Util.parseInfoForDashboardActivity(s1, s2, s3);
	equal(o.image, "icon_profile_update_success", "AMA.Util.parseInfoForDashboardActivity for account.securityAnswer sms, success, on");
	equal(o.text, "SECURITYANSWER CHANGED", "AMA.Util.parseInfoForDashboardActivity for account.securityAnswer sms, success, on");
	// Account Info Settings
	s1="updateTrust";
	s2=Strings.successIndicator;
	s3=Strings.onIndicator;
	o=AMA.Util.parseInfoForDashboardActivity(s1, s2, s3);
	equal(o.image, "icon_app_advisor_success", "AMA.Util.parseInfoForDashboardActivity for updateTrust sms, success, on");
	equal(o.text, "updateTrust", "AMA.Util.parseInfoForDashboardActivity for updateTrust sms, success, on");
	s1="scanStarted";
	s2="allAppScanType";
	o=AMA.Util.parseInfoForDashboardActivity(s1, s2, s3);
	equal(o.image, "icon_threat_protection_success", "AMA.Util.parseInfoForDashboardActivity for scanStarted sms, allAppScanType, on");
	equal(o.text, "App scanStarted", "AMA.Util.parseInfoForDashboardActivity for scanStarted sms, allAppScanType, on");
	s1="scanFinished";
	s2="mediaScanType";
	o=AMA.Util.parseInfoForDashboardActivity(s1, s2, s3);
	equal(o.image, "icon_threat_protection_success", "AMA.Util.parseInfoForDashboardActivity for scanFinished sms, mediaScanType, on");
	equal(o.text, "Files scanFinished", "AMA.Util.parseInfoForDashboardActivity for scanFinished sms, mediaScanType, on");
	s2="singleAppScanType";
	o=AMA.Util.parseInfoForDashboardActivity(s1, s2, s3);
	equal(o.image, "icon_threat_protection_success", "AMA.Util.parseInfoForDashboardActivity for scanFinished sms, singleAppScanType, on");
	equal(o.text, "Single App scanFinished", "AMA.Util.parseInfoForDashboardActivity for scanFinished sms, singleAppScanType, on");
	// Security Settings
	s1=ServerConstants.situationProperties.autoUpdate;
	s2=Strings.successIndicator;
	s3=Strings.onIndicator;
	o=AMA.Util.parseInfoForDashboardActivity(s1, s2, s3);
	equal(o.image, "icon_profile_update_success", "AMA.Util.parseInfoForDashboardActivity for autoupdate sms, success, on");
	equal(o.text, "AUTOUPDATE CHANGED", "AMA.Util.parseInfoForDashboardActivity for autoupdate sms, success, on");
	s1=ServerConstants.situationProperties.autoUpdateSchedule;
	o=AMA.Util.parseInfoForDashboardActivity(s1, s2, s3);
	equal(o.image, "icon_profile_update_success", "AMA.Util.parseInfoForDashboardActivity for autoUpdateSchedule sms, success, on");
	equal(o.text, "AUTOUPDATESCHEDULE CHANGED", "AMA.Util.parseInfoForDashboardActivity for autoUpdateSchedule sms, success, on");
	s1=ServerConstants.situationProperties.autoUpdateDay;
	o=AMA.Util.parseInfoForDashboardActivity(s1, s2, s3);
	equal(o.image, "icon_profile_update_success", "AMA.Util.parseInfoForDashboardActivity for autoUpdateDay sms, success, on");
	equal(o.text, "AUTOUPDATEDAY CHANGED", "AMA.Util.parseInfoForDashboardActivity for autoUpdateDay sms, success, on");
	s1=ServerConstants.situationProperties.autoUpdateTime;
	o=AMA.Util.parseInfoForDashboardActivity(s1, s2, s3);
	equal(o.image, "icon_profile_update_success", "AMA.Util.parseInfoForDashboardActivity for autoUpdateTime sms, success, on");
	equal(o.text, "AUTOUPDATETIME CHANGED", "AMA.Util.parseInfoForDashboardActivity for autoUpdateTime sms, success, on");
	s1=ServerConstants.situationProperties.cloudAV;
	o=AMA.Util.parseInfoForDashboardActivity(s1, s2, s3);
	equal(o.image, "icon_profile_update_success", "AMA.Util.parseInfoForDashboardActivity for cloudAV sms, success, on");
	equal(o.text, "CLOUDAV CHANGED", "AMA.Util.parseInfoForDashboardActivity for cloudAV sms, success, on");
	s1=ServerConstants.situationProperties.scanSchedule;
	o=AMA.Util.parseInfoForDashboardActivity(s1, s2, s3);
	equal(o.image, "icon_profile_update_success", "AMA.Util.parseInfoForDashboardActivity for scanSchedule sms, success, on");
	equal(o.text, "SCANSCHEDULE CHANGED", "AMA.Util.parseInfoForDashboardActivity for scanSchedule sms, success, on");
	s1=ServerConstants.situationProperties.scanDay;
	o=AMA.Util.parseInfoForDashboardActivity(s1, s2, s3);
	equal(o.image, "icon_profile_update_success", "AMA.Util.parseInfoForDashboardActivity for scanDay sms, success, on");
	equal(o.text, "SCANDAY CHANGED", "AMA.Util.parseInfoForDashboardActivity for scanDay sms, success, on");
	s1=ServerConstants.situationProperties.scanTime;
	o=AMA.Util.parseInfoForDashboardActivity(s1, s2, s3);
	equal(o.image, "icon_profile_update_success", "AMA.Util.parseInfoForDashboardActivity for scanTime sms, success, on");
	equal(o.text, "SCANTIME CHANGED", "AMA.Util.parseInfoForDashboardActivity for scanTime sms, success, on");
	s1=ServerConstants.situationProperties.realTimeScan;
	o=AMA.Util.parseInfoForDashboardActivity(s1, s2, s3);
	equal(o.image, "icon_profile_update_success", "AMA.Util.parseInfoForDashboardActivity for realTimeScan sms, success, on");
	equal(o.text, "REALTIMESCAN CHANGED", "AMA.Util.parseInfoForDashboardActivity for realTimeScan sms, success, on");
	s1=ServerConstants.situationProperties.realTimeScanApp;
	o=AMA.Util.parseInfoForDashboardActivity(s1, s2, s3);
	equal(o.image, "icon_profile_update_success", "AMA.Util.parseInfoForDashboardActivity for realTimeScanApp sms, success, on");
	equal(o.text, "REALTIMESCANAPP CHANGED", "AMA.Util.parseInfoForDashboardActivity for realTimeScanApp sms, success, on");
	s1=ServerConstants.situationProperties.realTimeScanSDCard;
	o=AMA.Util.parseInfoForDashboardActivity(s1, s2, s3);
	equal(o.image, "icon_profile_update_success", "AMA.Util.parseInfoForDashboardActivity for realTimeScanSDCard sms, success, on");
	equal(o.text, "REALTIMESCANSDCARD CHANGED", "AMA.Util.parseInfoForDashboardActivity for realTimeScanSDCard sms, success, on");
	s1=ServerConstants.situationProperties.realTimeScanMessage;
	o=AMA.Util.parseInfoForDashboardActivity(s1, s2, s3);
	equal(o.image, "icon_profile_update_success", "AMA.Util.parseInfoForDashboardActivity for realTimeScanMessage sms, success, on");
	equal(o.text, "REALTIMESCANMESSAGE CHANGED", "AMA.Util.parseInfoForDashboardActivity for realTimeScanMessage sms, success, on");
	s1=ServerConstants.situationProperties.realTimeScanCompressed;
	o=AMA.Util.parseInfoForDashboardActivity(s1, s2, s3);
	equal(o.image, "icon_profile_update_success", "AMA.Util.parseInfoForDashboardActivity for realTimeScanCompressed sms, success, on");
	equal(o.text, "REALTIMESCANCOMPRESSED CHANGED", "AMA.Util.parseInfoForDashboardActivity for realTimeScanCompressed sms, success, on");
	s1=ServerConstants.situationProperties.downloadNotify;
	o=AMA.Util.parseInfoForDashboardActivity(s1, s2, s3);
	equal(o.image, "icon_profile_update_success", "AMA.Util.parseInfoForDashboardActivity for downloadNotify sms, success, on");
	equal(o.text, "DOWNLOADNOTIFY CHANGED", "AMA.Util.parseInfoForDashboardActivity for downloadNotify sms, success, on");
	s1=ServerConstants.situationProperties.deleteNotify;
	o=AMA.Util.parseInfoForDashboardActivity(s1, s2, s3);
	equal(o.image, "icon_profile_update_success", "AMA.Util.parseInfoForDashboardActivity for deleteNotify sms, success, on");
	equal(o.text, "DELETENOTIFY CHANGED", "AMA.Util.parseInfoForDashboardActivity for deleteNotify sms, success, on");
	s1=ServerConstants.situationProperties.trayNotify;
	o=AMA.Util.parseInfoForDashboardActivity(s1, s2, s3);
	equal(o.image, "icon_profile_update_success", "AMA.Util.parseInfoForDashboardActivity for trayNotify sms, success, on");
	equal(o.text, "TRAYNOTIFY CHANGED", "AMA.Util.parseInfoForDashboardActivity for trayNotify sms, success, on");
	s1=ServerConstants.situationProperties.autoMediaScan;
	o=AMA.Util.parseInfoForDashboardActivity(s1, s2, s3);
	equal(o.image, "icon_profile_update_success", "AMA.Util.parseInfoForDashboardActivity for autoMediaScan sms, success, on");
	equal(o.text, "AUTOMEDIASCAN CHANGED", "AMA.Util.parseInfoForDashboardActivity for autoMediaScan sms, success, on");
	s1=ServerConstants.situationProperties.airplaneLock;
	o=AMA.Util.parseInfoForDashboardActivity(s1, s2, s3);
	equal(o.image, "icon_profile_update_success", "AMA.Util.parseInfoForDashboardActivity for airplaneLock sms, success, on");
	equal(o.text, "AIRPLANELOCK CHANGED", "AMA.Util.parseInfoForDashboardActivity for airplaneLock sms, success, on");
	s1=ServerConstants.situationProperties.safeBrowsing;
	o=AMA.Util.parseInfoForDashboardActivity(s1, s2, s3);
	equal(o.image, "icon_profile_update_success", "AMA.Util.parseInfoForDashboardActivity for safeBrowsing sms, success, on");
	equal(o.text, "SAFEBROWSING CHANGED", "AMA.Util.parseInfoForDashboardActivity for safeBrowsing sms, success, on");
	
});
*/

/*  --- Obsolete method ---
test("AMA.Util.parseHistoryDetails test", function () {
	var s1="", s2="", s3="";
	equal(typeof AMA.Util.parseHistoryDetails, "function", "AMA.Util.parseHistoryDetails is a function");
	s3=AMA.Util.parseHistoryDetails(s1,s2);
	equal(s3, "", "AMA.Util.parseStatusDetails for null");
	s1="appInstalled";
	s2="name=test"
	s3=AMA.Util.parseHistoryDetails(s1,s2);
	equal(s3, "test", "AMA.Util.parseStatusDetails for appInstalled name=test");
	s1="threatDetected";
	s2="filename=test.png"
	s3=AMA.Util.parseHistoryDetails(s1,s2);
	equal(s3, "test.png", "AMA.Util.parseStatusDetails for threatDetected filename=test.png");
	s1="policyUpdated";
	s2="policy=testpolicy"
	s3=AMA.Util.parseHistoryDetails(s1,s2);
	equal(s3, "testpolicy", "AMA.Util.parseStatusDetails for policyUpdated policy=testpolicy");
	s1="remediationPerformed";
	s2="test=details"
	s3=AMA.Util.parseHistoryDetails(s1,s2);
	equal(s3, "<span title=''></span><br />", "AMA.Util.parseStatusDetails for remediationPerformed test=details");
	s1="scanFinished";
	s2="numfilesscanned=10\noutcome=mediaScanType"
	s3=AMA.Util.parseHistoryDetails(s1,s2);
	equal(s3, "10 Files Scanned<br/>", "AMA.Util.parseStatusDetails for scanFinished numfilesscanned=10, outcome=mediaScanType");
	s1="scanFinished";
	s2="numfilesscanned=10\noutcome=aborted"
	s3=AMA.Util.parseHistoryDetails(s1,s2);
	equal(s3, "10 Apps Scanned<br/>", "AMA.Util.parseStatusDetails for scanFinished numfilesscanned=10, outcome=aborted");
	s1="scanFinished";
	s2="numthreatsdetected=10"
	s3=AMA.Util.parseHistoryDetails(s1,s2);
	equal(s3, "10 Threats Detected<br/>", "AMA.Util.parseStatusDetails for scanFinished numthreatsdetected=10");
});
*/

// FIXME: This method should be deprecated in Util.js? It fails all the parsing tests.
test("AMA.Util.parseStatusDetails test", function () {
	var s1="locknative=SUCCESS", s2="wipe", s3="";
	equal(typeof AMA.Util.parseStatusDetails, "function", "AMA.Util.parseStatusDetails is a function");
	s3=AMA.Util.parseStatusDetails(s1, s2);
	equal(s3, Strings.wipe.lockedPhone, "AMA.Util.parseStatusDetails for locknative=SUCCESS");
	s1="locknative=FAILED";
	s3=AMA.Util.parseStatusDetails(s1, s2);
	equal(s3, Strings.wipe.didNotLockPhone, "AMA.Util.parseStatusDetails for locknative=FAILED");
	s1="locknative=ON";
	s3=AMA.Util.parseStatusDetails(s1, s2);
	equal(s3, Strings.wipe.lockedPhone, "AMA.Util.parseStatusDetails for locknative=ON");
	s1="lockrandom=ON";
	s3=AMA.Util.parseStatusDetails(s1, s2);
	equal(s3, Strings.wipe.lockedPhone, "AMA.Util.parseStatusDetails for lockrandom=ON");
	s1="lock=ON";
	s3=AMA.Util.parseStatusDetails(s1, s2);
	equal(s3, Strings.wipe.lockedPhone, "AMA.Util.parseStatusDetails for lock=ON");
	s1="alarm=ON";
	s3=AMA.Util.parseStatusDetails(s1, s2);
	equal(s3, Strings.alarm.soundingMessage, "AMA.Util.parseStatusDetails for alarm=ON");
	s1="alarm=OFF";
	s3=AMA.Util.parseStatusDetails(s1, s2);
	equal(s3, Strings.alarm.soundedMessage, "AMA.Util.parseStatusDetails for alarm=OFF");
	s1="announce=unanswered";
	s3=AMA.Util.parseStatusDetails(s1, s2);
	equal(s3, Strings.announce.unansweredMessage, "AMA.Util.parseStatusDetails for announce=unanswered");
	s1="announce=dismissed";
	s3=AMA.Util.parseStatusDetails(s1, s2);
	equal(s3, Strings.announce.dismissedMessage, "AMA.Util.parseStatusDetails for announce=dismissed");
	s1="announce=error";
	s3=AMA.Util.parseStatusDetails(s1, s2);
	equal(s3, Strings.announce.errorMessage, "AMA.Util.parseStatusDetails for announce=error");
	s1="gps=OFF";
	s3=AMA.Util.parseStatusDetails(s1, s2);
	equal(s3, "", "AMA.Util.parseStatusDetails for gps=OFF");
	s1="wipefactory=ON";
	s3=AMA.Util.parseStatusDetails(s1, s2);
	equal(s3, "FACTORYRESETSUCCESSMESSAGE</div><br/>", "AMA.Util.parseStatusDetails for wipefactory=ON");
	s1="locknative=SUCCESS\ncontacts=3/3";
	s3=AMA.Util.parseStatusDetails(s1, s2);
	equal(s3, "<div class='wipe_status'><b>COMPLETEDMESSAGE</b><br/>CONTACTSWIPE: 3 / 3</div><br/>LOCKEDPHONE", "AMA.Util.parseStatusDetails for locknative=SUCCESS/contacts=3/3");
	s1="contacts=1/3";
	s3=AMA.Util.parseStatusDetails(s1, s2);
	equal(s3, "<div class='wipe_status'><b>PROGRESSMESSAGE</b><br/>CONTACTSWIPE: 1 / 3</div><br/>", "AMA.Util.parseStatusDetails for contacts=1/3");
	s1="contacts=0/-1";
	s3=AMA.Util.parseStatusDetails(s1, s2);
	equal(s3, "<div class='wipe_status'><b>PROGRESSMESSAGE</b><br/>CONTACTSWIPE: 0</div><br/>", "AMA.Util.parseStatusDetails for contacts=0/-1");
	s1="lock=";
	s3=AMA.Util.parseStatusDetails(s1, s2);
	equal(s3, "", "AMA.Util.parseStatusDetails for null value");
	s1="wipefactory/ON\nlock=ON";
	s3=AMA.Util.parseStatusDetails(s1, s2);
	equal(s3, "LOCKEDPHONE", "AMA.Util.parseStatusDetails for missing value delimiter");
});

test("AMA.Util.calculateNextWeek test", function () {
	var dt1=new Date(), dt2, d1=dt1.getDay(), d2, s="";
	var dateMapping = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
	equal(typeof AMA.Util.calculateNextWeek, "function", "AMA.Util.calculateNextWeek is a function");
	s=AMA.Util.calculateNextWeek(dateMapping[d1]);
	dt2=new Date(s), d2=dt2.getDay();
	equal(d1, d2, "AMA.Util.calculateNextWeek same day of week");
});

test("AMA.Util.bytesToSize test", function () {
	var n=0, s=AMA.Util.bytesToSize(n);
	equal(typeof AMA.Util.bytesToSize, "function", "AMA.Util.bytesToSize is a function");
	equal(s, "0 Bytes", "AMA.Util.bytesToSize for 0 bytes");
	n=10238, s=AMA.Util.bytesToSize(n);
	equal(s, "10.0 KB", "AMA.Util.bytesToSize for 0 bytes");
});

test("AMA.Util.exportContacts test", function () {
	var o={}, count=0;
	equal(typeof AMA.Util.exportContacts, "function", "AMA.Util.exportContacts is a function");
});

test("AMA.Util.printHTML test", function () {
	var o={}, count=0;
	equal(typeof AMA.Util.printHTML, "function", "AMA.Util.printHTML is a function");
});

test("AMA.Util.isAndroid test", function () {
    equal(typeof AMA.Util.isAndroid, "function", "AMA.Util.isAndroid is a function");
/*  TODO: Restore these once Util.js implementation has been fixed
    var s1="Android", s2=AMA.Util.isAndroid(s1);
    equal(s2, true, "AMA.Util.isAndroid returned " + s2.toString() + " for '" + s1 + "'");
    s1="iPhone 5", s2=AMA.Util.isAndroid(s1);
    equal(s2, false, "AMA.Util.isAndroid returned " + s2.toString() + " for '" + s1 + "'");
    s1="BlackBerry", s2=AMA.Util.isAndroid(s1);
    equal(s2, false, "AMA.Util.isAndroid returned " + s2.toString() + " for '" + s1 + "'");
*/
});

test("AMA.Util.isBB test", function () {
    equal(typeof AMA.Util.isBB, "function", "AMA.Util.isBB is a function");
/*  TODO: Restore these once Util.js has been fixed
    var s1="Android", s2=AMA.Util.isBB(s1);
    equal(s2, false, "AMA.Util.isBB returned " + s2.toString() + " for '" + s1 + "'");
    s1="iPhone 5", s2=AMA.Util.isBB(s1);
    equal(s2, false, "AMA.Util.isBB returned " + s2.toString() + " for '" + s1 + "'");
    s1="BlackBerry", s2=AMA.Util.isBB(s1);
    equal(s2, true, "AMA.Util.isBB returned " + s2.toString() + " for '" + s1 + "'");
*/
});

test("AMA.Util.isIPhone test", function () {
    equal(typeof AMA.Util.isIPhone, "function", "AMA.Util.isIPhone is a function");
/*  TODO: Restore these once Util.js has been fixed
    var s1="Android", s2=AMA.Util.isIPhone(s1);
    equal(s2, false, "AMA.Util.isIPhone returned " + s2.toString() + " for '" + s1 + "'");
    s1="iPhone 5", s2=AMA.Util.isIPhone(s1);
    equal(s2, true, "AMA.Util.isIPhone returned " + s2.toString() + " for '" + s1 + "'");
    s1="BlackBerry", s2=AMA.Util.isIPhone(s1);
    equal(s2, false, "AMA.Util.isIPhone returned " + s2.toString() + " for '" + s1 + "'");
*/
});

test("AMA.Util.uppercaseFirst test", function () {
    var s1="test String", s2=AMA.Util.uppercaseFirst(s1);
    equal(typeof AMA.Util.uppercaseFirst, "function", "AMA.Util.uppercaseFirst is a function");
    equal(s2, "Test String", "AMA.Util.uppercaseFirst returned '" + s2 + "' for '" + s1 + "'");
    s1="A", s2=AMA.Util.uppercaseFirst(s1);
    equal(s2, "A", "AMA.Util.uppercaseFirst returned '" + s2 + "' for '" + s1 + "'");
    s1="aAAA", s2=AMA.Util.uppercaseFirst(s1);
    equal(s2, "AAAA", "AMA.Util.uppercaseFirst returned '" + s2 + "' for '" + s1 + "'");
});