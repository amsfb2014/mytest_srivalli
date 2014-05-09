/*! Util */
AMA.Util = {
	/* Returns a clone of the object passed in
     *
     * @param {Object} object
     * @return {Object}
     */
	deepClone: function(object) {
		var objectAsString = JSON.stringify(object);
		return JSON.parse(objectAsString);
	},

	S4: function() {
		   return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
	},
	/*
	 * return GUID
	 */
	guid: function() {
		   return (this.S4()+this.S4()+"-"+this.S4()+"-"+this.S4()+"-"+this.S4()+"-"+this.S4()+this.S4()+this.S4());
	},
    /* Returns the target of an event for both IE and Firefox
     *
     * @param {Event} e
     * @return {DOM element}
     */

	eventTarget: function(e, window)
	{

		var targ;
		if (e == null) {
			e = window.event;
		}
		if (e.target != null) {
			targ = e.target;
		}
		else if (e.srcElement) {
			targ = e.srcElement;
		}
		return targ;
	},

	/* Stringifies a java object and adds some spaces.
	 *
	 * @param {Object} data
	 * @return {String}
	 */
	prettyPrintJson: function(data) {
		var serialized =  JSON.stringify(data);
		return this.addSpacesToJsonString(serialized);
	},

	/* Adds a space after every , - helps with readabilty of JSON objects
	 *
	 * @param {String} jsonString
	 * @return {String}
	 */
	addSpacesToJsonString: function(jsonString) {
		return jsonString.replace(/,/g, ", ");
	},

	/*Replaces all the question marks/provided regular expression with provided values array
	 *
	 * @param {String} originalString
	 * @param {Array} values
	 * @param {Regular Expression} tokenRegex
	 * @return {String}
	 */
	replaceQuestionMarks: function(originalString, values, tokenRegex) {
		if (tokenRegex == null) {
			tokenRegex = /\?/;
		}
		var newString = originalString;
		for (var i=0;i < values.length;i++) {
			newString = newString.replace(tokenRegex, values[i]);
		}
		return newString;
	},

	/*Returns true if an item exits in an array, else false
	 *
	 * @param {Object} item
	 * @param {Array} array
	 * @return {Boolean}
	 */
	itemExistsInArray: function(item, array) {
        if (typeof(item) !== "undefined" && typeof(array) !== "undefined"
         && $.inArray(item, array) > -1) {
			return true;
		}
		return false;

	},

	objectKeyCount: function(obj) {
		if( obj == null ) {
			return 0;
		}

		if( obj.__count__ !== undefined) {
			return obj.__count__;
		}

		var c = 0;
		for (var p in obj) {
			if (obj.hasOwnProperty(p)) {
				c += 1;
			}
		}

		return c;
	},

	/* Formats the last backup time associated an endpoint. Returns 'Never' if no sync time available.
	 *
	 * @param {Enpoint} endpoint
	 * @return {String}
	 */
	formattedLastBackup: function(endpoint) {
		if (endpoint.synctimes.length == 0) {
			return Strings.never;
		}
		var gmtTime = endpoint.synctimes[0];
		return this.formatDateAndTime(gmtTime);
	},

	/* Formats the last backup time based on passed in GMT. NNN dd, yyyy @ h:mm a.
	 *
	 * @param {String} gmtTime
	 * @return {String}
	 */
	formatDateAndTime: function(gmtTime) {
		var date = new Date(gmtTime);
		return this.formatDate(date, AMA.config.dateAndTimeFormat).replace("@", "at");
	},

	locationFormat: function(gmtTime, gmtTimeRange) {
		var formattedDate = "";
		var timeRange = "";
		if(!AMA.models.capabilities.canRead("locationHistory")) {
			gmtTimeRange = null;
		}
		if(gmtTime != null && gmtTime != "") {
			var date = new Date(gmtTime);
			if(gmtTimeRange != null) {
				var dateRange = new Date(gmtTimeRange);
				//if start and end times are the same day then just need a time range
				if(date.getDate() == dateRange.getDate()) {
					//if start and end time have the same hour and minutes then NO need for a range
					if(date.getHours() == dateRange.getHours() && date.getMinutes() == dateRange.getMinutes()) {
						//No range
						return this.formatDateAndTime(date, AMA.config.dateAndTimeFormat);
					}
				}
				//Date range
				return (this.formatDateAndTime(date, AMA.config.dateAndTimeFormat) + " - " + this.formatDateAndTime(dateRange, AMA.config.dateAndTimeFormat));
			}
			//No range
			return this.formatDateAndTime(date, AMA.config.dateAndTimeFormat);
		}

		return formattedDate;
	},

	dateFormat: function(gmtTime) {
		var formattedDate = "";
		if(gmtTime != null && gmtTime != "") {
			var date = new Date(parseInt(gmtTime));
			formattedDate = this.formatDate(date, AMA.config.dateFormat, true);
		}
		return formattedDate;
	},

	timeFormat: function(gmtTime) {
		var formattedTime = "";
		if(gmtTime != null && gmtTime != "") {
			var date = new Date(parseInt(gmtTime));
			formattedTime = this.formatDate(date, AMA.config.timeFormat, true);
		}
		return formattedTime;
	},

	timeElapsed: function(gmtTime, elapsedGmtTime, options) {
		options = options || {};
		options.depth = options.depth || 2;
		options.strings = options.strings || {year : "yr.", month : "month", week : "week", day : "day", hour : "hr.", minute:"min."};

		var put = function (val, s, items) {
			if (val > 0) {
				items.push(val + " " + s + " ");
			}
		}

		var oneMinute = 60 * 1000;
		var oneHour = 60 * oneMinute;
		var oneDay = 24 * oneHour;
		var oneWeek = 7 * oneDay;
		var oneMonth = 30 * oneDay;
		var oneYear = 12 * oneMonth;

		var items = [];

		var diff = elapsedGmtTime - gmtTime;
		var years = Math.floor(diff / oneYear);
		put(years, options.strings.year, items);

		diff = diff - (years * oneYear);
		var months = Math.floor(diff / oneMonth);
		put(months, options.strings.month, items);

		diff = diff - (months * oneMonth);
		var weeks = Math.floor(diff / oneWeek);
		put(weeks, options.strings.week, items);

		diff = diff - (weeks * oneWeek);
		var days = Math.floor(diff / oneDay);
		put(days, options.strings.day, items);

		diff = diff - (days * oneDay);
		var hours = Math.floor(diff / oneHour);
		put(hours, options.strings.hour, items);

		diff = diff - (hours * oneHour);
		var minutes = Math.floor(diff / oneMinute);
		put(minutes, options.strings.minute, items);

		var result = "";
		for (var x = 0; x < items.length; x++) {
			result += items[x];
			if (x >= (options.depth - 1)) {
				break;
			}
		}
		result = (result.length > 0) ? result + "Ago" : "Less than a " + options.strings.minute + " Ago";
		return result;
	},

	/*
	 * Returns a subtraction of 2 arrays. does not affect passed in data.
	 *
	 * @param {Array} arrayOne
	 * @param {Array} arrayTwo
	 * @return {Array}
	 */
	arraySubtraction: function(arrayOne, arrayTwo) {
		var y = {};
		for (var i=0;i<arrayTwo.length;i++) {
			y[arrayTwo[i]] = arrayTwo[i];
		}
		var result = [];
		for (var i=0;i<arrayOne.length;i++) {
			if (y[arrayOne[i]] == null) {
				result.push(arrayOne[i]);
			}
		}
		return result;
	},

	/*
	 * Returns a formatted phone number.
	 *
	 * @see /js/view/ContactEditor.js
	 * @param {String} number
	 * @return {String}
	 */
	formatPhone: function(number) {
		// TODO: handle cases other than the 10-number case
		number = number.replace(/[^0-9]/g, "");
		return ("(" + number.substring(0,3) + ") " + number.substring(3,6) + "-" + number.substring(6));
	},

     /*
	 * returns true if 'type' is the same type or a subtype of 'recordtype'
	 * i.e. type=profile and recordType=contact will return true
	 *
	 * @param {String} type
	 * @param {String} recordType
	 * @return {String}
	 */
    isType: function(type, recordType) {
   		return ((type & recordType) == recordType);
    },

    /*
	 * Toggle the 'invisible' class on the divId & the 'lp_plus' & 'lp_minus' class on the target DOM
	 *
	 * @param {Event} e
	 * @param {String} divId
	 * @return {String}
	 */
	plusToggle: function(e, divId) {
		var target = this.eventTarget(e, window);
		var div = $J("#"+divId);
		div.toggleClass('invisible');
		$J(target).toggleClass('lp_plus');
		$J(target).toggleClass('lp_minus');
	},

	/*
	 * Opens a container
	 *
	 * @param {Event} e
	 * @param {String} divId
	 * @return {String}
	 */
	plusOpen: function(containerId, plusMinusId) {
		$J("#"+containerId).removeClass('invisible');
		$J("#"+plusMinusId).removeClass('lp_plus');
		$J("#"+plusMinusId).addClass('lp_minus');
	},

	/*
	 * Adds the appropriate unit to a given file size
	 *
	 * @param {int} fileSize
	 * @return {String}
	 */
    addUnitToFileSize: function(fileSize) {
		fileSize = parseFloat(fileSize);
    	if (fileSize == null || fileSize == "") {
    		return "";
    	}
    	if (fileSize < 1024) {
    		return fileSize + "B";
    	}

    	if(fileSize < 1048576) {
    		return (fileSize/1024) + "KB"
    	}

    	return (fileSize/1073741824) + "GB";
    },

	validateEmail: function(emailaddress) {
		var regExp = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
		return regExp.test(emailaddress);
	},

	validDate: function(strMonth, strDay, strYear) {
		var month = parseInt(strMonth);
		var day = parseInt(strDay);
		var year = parseInt(strYear);

		var daysInFeb = (((year % 4 == 0) && ( (!(year % 100 == 0)) || (year % 400 == 0))) ? 29 : 28 );
		var daysInMonth = [];

		for (var i = 1; i <= 12; i++) {
			daysInMonth[i] = 31;
			if (i==4 || i==6 || i==9 || i==11) {daysInMonth[i] = 30};
			if (i==2) {daysInMonth[i] = daysInFeb};
	    }

		return (day <= daysInMonth[month]);
	},


	// ------------------------------------------------------------------
	// formatDate (date_object, format, convertDateToUTC)
	// Returns a date in the output format specified.
	// The format string uses the same abbreviations as in getDateFromFormat()
	// Field        | Full Form          | Short Form
	// -------------+--------------------+-----------------------
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
	// UTC +08:00   | Z                  |
	//
	// NOTE THE DIFFERENCE BETWEEN MM and mm! Month=MM, not mm!
	// Examples:
	//  "MMM d, y" matches: January 01, 2000
	//                      Dec 1, 1900
	//                      Nov 20, 00
	//  "M/d/yy"   matches: 01/20/00
	//                      9/2/00
	//  "MMM dd, yyyy hh:mm:ssa" matches: "January 01, 2000 12:30:45AM"
	//
	// NOTE if date_object is already in UTC time, set parameter convertDateToUTC to false
	// ------------------------------------------------------------------
	MONTH_NAMES: new Array('January','February','March','April','May','June','July','August','September','October','November','December','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'),
	FRENCH_MONTH_NAMES: new Array('janv.','f�vr.','mars','avril','mai','juin','juil.','ao�t','sept.','oct.','nov.','d�c.'),
	DAY_NAMES: new Array('Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sun','Mon','Tue','Wed','Thu','Fri','Sat'),
	LZ: function(x) {return(x<0||x>9?"":"0")+x},

	formatDate: function(date, format, convertDateToUTC) {
		format=format+"";
		var result="";
		var i_format=0;
		var c="";
		var token="";
		var y="", M=0, d=0, E=0, H=0, m=0, s=0, Z=0, ZS="", ZH="", ZM="";
		Z=date.getTimezoneOffset()/60;  // 480 / 60 = UTC -08:00
		if( Z<0 ){
			ZS="+";
		}
		else {
			ZS="-";
		}
		Z=Math.abs(Z);
		if( Z<10 ) {
			ZH="0"+Math.floor(Z);
		}
		else {
			ZH=Math.floor(Z);
		}
		ZM=(Z-Math.floor(Z))*60;
		if( ZM<10 ) {
			ZM="0"+ZM;
		}
		if(convertDateToUTC != null && convertDateToUTC) {
			y=date.getUTCFullYear()+"";
			M=date.getUTCMonth()+1;
			d=date.getUTCDate();
			E=date.getUTCDay();
			H=date.getUTCHours();
			m=date.getUTCMinutes();
			s=date.getUTCSeconds();
		}
		else {
			y=date.getFullYear()+"";
			M=date.getMonth()+1;
			d=date.getDate();
			E=date.getDay();
			H=date.getHours();
			m=date.getMinutes();
			s=date.getSeconds();
		}
		var yyyy,yy,MMM,MM,dd,hh,h,mm,ss,ampm,HH,H,KK,K,kk,k;
		// Convert real date parts into formatted versions
		var value=new Object();
		if (y.length < 4) {y=""+(y-0+1900);}
		value["y"]=""+y;
		value["yyyy"]=y;
		value["yy"]=y.substring(2,4);
		value["M"]=M;
		value["MM"]=this.LZ(M);
		value["MMM"]=this.MONTH_NAMES[M-1];
		value["NNN"]=this.MONTH_NAMES[M+11];
		value["FFF"]=this.FRENCH_MONTH_NAMES[M-1];
		value["d"]=d;
		value["dd"]=this.LZ(d);
		value["E"]=this.DAY_NAMES[E+7];
		value["EE"]=this.DAY_NAMES[E];
		value["H"]=H;
		value["HH"]=this.LZ(H);
		if (H==0){value["h"]=12;}
		else if (H>12){value["h"]=H-12;}
		else {value["h"]=H;}
		value["hh"]=this.LZ(value["h"]);
		if (H>11){value["K"]=H-12;} else {value["K"]=H;}
		value["k"]=H;
		value["KK"]=this.LZ(value["K"]);
		value["kk"]=this.LZ(value["k"]);
		if (H > 11) { value["a"]="PM"; }
		else { value["a"]="AM"; }
		value["m"]=m;
		value["mm"]=this.LZ(m);
		value["s"]=s;
		value["ss"]=this.LZ(s);
		value["Z"]="UTC"+ZS+ZH+":"+ZM;
		var inQuotes = false;
		while (i_format < format.length) {
			c=format.charAt(i_format);
			token="";
			while ((format.charAt(i_format)==c) && (i_format < format.length)) {
				token += format.charAt(i_format++);
			}
			if ( token == "'" ) {
				inQuotes = !inQuotes;
			}
			else if (!inQuotes && value[token] != null) {
				result=result + value[token];
			}
			else {
				result=result + token;
			}
		}
		return result;
	},

	//Escapes < > characters
	escapeSpecialCharacters: function(originalString) {
		//Need to make sure the date coming in is a string
		originalString = "" + originalString;
		var newString = originalString.replace(/</g, '&lt;');
		newString = newString.replace(/>/g, '&gt;');
		return newString;
	},

	unEscapeSpecialCharacters: function(originalString) {
		//Need to make sure the date coming in is a string
		originalString = "" + originalString;
		var newString = originalString.replace(/&lt;/g, '<');
		newString = newString.replace(/&gt;/g, '>');
		return newString;
	},

	getCookie: function(c_name) {
		if (document.cookie.length>0) {
			c_start=document.cookie.indexOf(c_name + "=");
			if (c_start!=-1) {
				c_start=c_start + c_name.length+1;
				c_end=document.cookie.indexOf(";",c_start);
				if (c_end==-1) {
					c_end=document.cookie.length;
				}
				return unescape(document.cookie.substring(c_start,c_end));
		    }
		}
		return "";
	},
    getXXCookie: function(c_name, cookie) {
        if (cookie.length>0) {
            c_start=cookie.indexOf(c_name + "=");
            if (c_start!=-1) {
                c_start=c_start + c_name.length+1;
                c_end=cookie.indexOf(";",c_start);
                if (c_end==-1) {
                    c_end=cookie.length;
                }
                return unescape(cookie.substring(c_start,c_end));
            }
        }
        return "";
    },

	deleteCookie: function(c_name) {
		document.cookie = c_name + "=; expires=Fri, 31 Dec 1999 23:59:59 GMT;";
	},

	setCookie: function(c_name,value,expiredays) {
		var exdate=new Date();
		exdate.setDate(exdate.getDate()+expiredays);
		document.cookie=c_name+ "=" +escape(value)+
		((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
	},

	getBrowserType: function() {
		var nAgt = navigator.userAgent;

		if(nAgt.toLowerCase().indexOf("msie") != -1) {
            return "IE";
		}
		else if(nAgt.toLowerCase().indexOf("chrome") != -1) {
			return "Chrome";
		}
		else if(nAgt.toLowerCase().indexOf("safari") != -1) {
			return "Safari";
		}
		else if(nAgt.toLowerCase().indexOf("firefox") != -1) {
			return "Firefox";
		}
		else {
			// we don't support this browser yet
			return "Other";
		}
	},

	isIEVersionLessThan: function(version) {
		version = version != null ? version : 8;
		if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
			var ieversion=new Number(RegExp.$1) // capture x.x portion and store as a number
			if (ieversion < version){return true};
		}
	},

	replaceConsecutiveSpaces: function(fromThis) {
		var newString = "";
		var wasSpace = false;
		for (var i=0;i<fromThis.length;i++) {
			if (fromThis.charAt(i) != ' ' || !wasSpace) {
				newString = newString + fromThis.charAt(i)
			}
			wasSpace = (fromThis.charAt(i) == ' ');
		}
		return newString;
	},

   // Concatenates two strings, placing exactly one space in between
	// them (unless the second string starts with a comma) and stripping leading and trailing whitespace.
	spaceConcatAndTrim: function(string1, string2) {
		var trimmed2 = $J.trim(string2);

		if( trimmed2 != '' && trimmed2.charAt(0) == ',' ) {
			return $J.trim($J.trim(string1) + trimmed2);
		}
		else {
			return $J.trim($J.trim(string1) + ' ' + trimmed2);
		}
	},

	combineNames: function(first, middle, last, prefix, suffix) {
		var combination = prefix == null ? "" : prefix + " ";
		combination += first + " " + middle + " " + last;
		combination += suffix == null ? "" : " " + suffix;
		combination = this.replaceConsecutiveSpaces($J.trim(combination));
		return combination;
	},

	//RETURNS AN ARRAY OF PREFIX, FIRST, MIDDLE, LAST, SUFFIX
	parseFullName: function(fullName) {
		var remainder = fullName;
		var preAndRest = this.removePreNominalTitle(remainder);
		var preTitle = preAndRest[0];
		remainder = preAndRest[1];
		var postAndRest = this.removePostNominalTitle(remainder);
		var postTitle = postAndRest[0];
		remainder = postAndRest[1];

		var firstComma = remainder.indexOf(',');

		var nameArray = null;

		if( firstComma != -1 ) {
			// assume LAST, FIRST MIDDLE
			var lastName = remainder.substring(0, firstComma);
			var everythingElse = remainder.substring(firstComma+1, remainder.length);

			remainder = this.spaceConcatAndTrim( everythingElse, lastName );

			nameArray = everythingElse.split(/\s+/);
			nameArray = this.removeEmptyStrings(nameArray);
			nameArray.push(lastName);
		}
		else {
			// at this point, we should have preTitle and postTitle populated
			// and remainder should be the rest of the fullname

			nameArray = remainder.split(/\s+/);
			nameArray = this.removeEmptyStrings(nameArray);
		}

		var wordCount = nameArray.length;

		var parsedNameArray = new Array(5);
		parsedNameArray[0] = '';
		parsedNameArray[1] = '';
		parsedNameArray[2] = '';
		parsedNameArray[3] = '';
		parsedNameArray[4] = '';

		//alert("Word count in parseFullName is " + wordCount);


		if( preTitle != "" ) {
			parsedNameArray[0] = preTitle;
		}

		if( wordCount > 0 ) {
			parsedNameArray[1] = nameArray[0];
		}

		if( wordCount > 1 ) {
			parsedNameArray[3] = nameArray[wordCount-1];

			for( var i = 1; i < wordCount-1; i++ ) {
				parsedNameArray[2] = this.spaceConcatAndTrim( parsedNameArray[2], nameArray[i] );
			}
		}

		if( postTitle != "" ) {
			parsedNameArray[4] = postTitle;
		}

		return parsedNameArray;
	},

	removePreNominalTitle: function( fullName ) {
		var titleArray = fullName.match(/(^|\b)(Doctor|Dr(\.)?)(\s)+/i);
		if( titleArray != null && titleArray.length > 0 ) {
			return this.chop(titleArray[0], fullName);
		}

		titleArray = fullName.match(/(^|\b)(Miss|Ms(\.)?)(\s)+/i);
		if( titleArray != null && titleArray.length > 0 ) {
			return this.chop(titleArray[0], fullName);
		}

		titleArray = fullName.match(/(^|\b)(M(r|s)(\.)?)(\s)+/i);
		if( titleArray != null && titleArray.length > 0 ) {
			return this.chop(titleArray[0], fullName);
		}

		titleArray = fullName.match(/(^|\b)(Professor|Prof(\.)?)(\s)+/i);
		if( titleArray != null && titleArray.length > 0 ) {
			return this.chop(titleArray[0], fullName);
		}

		return this.chop('', fullName);
	},

	removePostNominalTitle: function( fullName )
	{
		var postTitle = '';
		var remainder = fullName;
		var titleArray = null;
		var lastIndex = -1;

		titleArray = remainder.match(/((?:\b)|,)(\s)*(Senior|Sr(\.)?)(?=($|\s|,))/i);
		if( titleArray != null && titleArray.length > 0 ) {
			if( fullName.lastIndexOf(titleArray[0]) > lastIndex ) {
				postTitle = this.spaceConcatAndTrim(postTitle, titleArray[0]);
				remainder = this.removeLast(titleArray[0], remainder);
			}
			lastIndex = fullName.lastIndexOf(titleArray[0]);
			//return chop(titleArray[0], fullName);
		}

		//alert(remainder + "+" + postTitle + "(" + lastIndex + ")");

		titleArray = remainder.match(/((?:\b)|,)(\s)*(Junior|Jr(\.)?)(?=($|\s|,))/i);
		if( titleArray != null && titleArray.length > 0 ) {
			if( fullName.lastIndexOf(titleArray[0]) > lastIndex ) {
				postTitle = this.spaceConcatAndTrim(postTitle, titleArray[0]);
				remainder = this.removeLast(titleArray[0], remainder);
			}
			lastIndex = fullName.lastIndexOf(titleArray[0]);
			//return chop(titleArray[0], fullName);
		}

		//alert(remainder + "+" + postTitle + "(" + lastIndex + ")");

		titleArray = remainder.match(/((?:\b)|,)(\s)*I{1,3}(\.)?(?=($|\s|,))/i);
		if( titleArray != null && titleArray.length > 0 ) {
			if( fullName.lastIndexOf(titleArray[0]) > lastIndex ) {
				postTitle = this.spaceConcatAndTrim(postTitle, titleArray[0]);
				remainder = this.removeLast(titleArray[0], remainder);
			}
			lastIndex = fullName.lastIndexOf(titleArray[0]);
			//return chop(titleArray[0], fullName);
		}

		//alert(remainder + "+" + postTitle + "(" + lastIndex + ")");


		titleArray = remainder.match(/((?:\b)|,)(\s)*(M|(Ph)|J)(\.)?D(\.)?(?=($|\s|,))/i);
		if( titleArray != null && titleArray.length > 0 ) {
			if( fullName.lastIndexOf(titleArray[0]) > lastIndex ) {
				postTitle = this.spaceConcatAndTrim(postTitle, titleArray[0]);
				remainder = this.removeLast(titleArray[0], remainder);
			}
			lastIndex = fullName.lastIndexOf(titleArray[0]);
			//return chop(titleArray[0], fullName);
		}

		//alert(remainder + "+" + postTitle + "(" + lastIndex + ")");


		titleArray = remainder.match(/((?:\b)|,)(\s)*((Cell)|(\(c\))|(Office)|(\(o\))|(Mobile)|(\(m\))|(Home)|(\(h\))|(Work)|(\(w\)))(?=($|\s|,))/i);

		if( titleArray != null && titleArray.length > 0 ) {
			if( fullName.lastIndexOf(titleArray[0]) > lastIndex ) {
				postTitle = this.spaceConcatAndTrim(postTitle, titleArray[0]);
				remainder = this.removeLast(titleArray[0], remainder);
			}
			lastIndex = fullName.lastIndexOf(titleArray[0]);
			//return chop(titleArray[0], fullName);
		}

		//alert(remainder + "+" + postTitle + "(" + lastIndex + ")");

		var array = new Array(2);
		array[0] = postTitle;
		array[1] = remainder;

		return array;
		//return chop('', fullName);
	},

   // returns an array with the piece in index 0, the rest of
	// the whole in index 1
	chop: function( piece, whole ) {
		var chopped = new Array(2);

	    chopped[0] = piece;
	    chopped[1] = this.remove(piece, whole);

	    return chopped;
	},

	removeLast: function( piece, whole ) {
		if( piece.length == 0 ) return whole;

		var start = whole.lastIndexOf(piece);

		if( start == -1 ) {
			return whole;
		}

		var copy = whole;
		var remainder = copy.substring(0, start) + copy.substring(start + piece.length, copy.length);

		return remainder;
	},

	// removes piece from whole and returns the remainder of whole, as a string
	// with piece removed. If whole doesn't contain piece, or piece is the
	// empty string, then whole is returned the same as it was given
	remove: function( piece, whole ) {
		if( piece.length == 0 ) return whole;

		var start = whole.indexOf(piece);

		if( start == -1 ) {
			return whole;
		}

		var copy = whole;
		var remainder = copy.substring(0, start) + copy.substring(start + piece.length, copy.length);

		return remainder;
	},

	truncateString: function(string, limit) {
		if (typeof(string) === 'string' && typeof(limit) === 'number') {
			var truncatedStr = string;

			if(string.length > limit) {
				truncatedStr = string.substr(0, limit-2) + '...';
			}

			return truncatedStr;
		}
		else {
			AMA.debug('Invalid parameter: ' + string + ', ' + limit + '.');
		}
	},

   removeEmptyStrings: function(stringArray) {
		var newArray = Array();

		var newIndex = 0;
		var oldIndex = 0;
		while (oldIndex < stringArray.length) {
			if (stringArray[oldIndex] != "") {
				newArray[newIndex] = stringArray[oldIndex];
				newIndex++;
			}
			oldIndex++;
		}
		return newArray;
	},

   /* Functions for limiting text in textareas.  The textarea may have a corresponding
    "# characters" element, which we will update. Recommended to call limitText onkeyup and
    onkeydown.  Note we cannot prevent the user from entering one character more than the limit.

       textElementId: The ID of the textarea for which we will limit the number of characters.
       limit: Positive number indicating the character limit for the specified element.
       charCountId: The ID of the span containing just the character-count number.
                    <span id="charCountId">0</span> characters
   */
   limitText: function(textElementId, limit, charCountId) {
      // Make sure the message is no longer than <limit> characters
		if ($J("#"+textElementId).val().length > limit)
		{
			var truncatedMessage = $J("#"+textElementId).val().substring(0,limit);
			$J("#"+textElementId).val(truncatedMessage);
      }

      // Update the display counter if we were given an element ID for it.
      if(typeof(charCountId) !== 'undefined') {
         this.updateCharacterCountDisplay(textElementId, charCountId);
      }
   },

   updateCharacterCountDisplay: function(textElementId, charCountId) {
		var characters = $J("#"+textElementId).val().length;
		$J("#"+charCountId).html(characters);
	},

/*
	parseFailure: function(data) {
		var failurePrintout = "";

		if(data != null && data.failures != null) {
			for (var i=0;i<data.failures.length;i++) {
				failurePrintout += failurePrintout != "" ?  "<br>" : "";

				var failureCode = data.failures[i];
				if (failureCode == ServerConstants.errors.sessionTimeout ||
					failureCode == ServerConstants.errors.sessionInvalid ||
					failureCode == ServerConstants.errors.sessionForged) {
					if(failureCode == ServerConstants.errors.sessionForged) {
						failurePrintout = Strings.errorCodes[failureCode];
						Jebber.Debug.print("Forged request was detected. Informing user with a dialog.");
					}
					else if(failureCode == ServerConstants.errors.sessionInvalid) {
						failurePrintout = Strings.errorCodes[failureCode];
						Jebber.Debug.print("Invalid session was detected. Informing user with a dialog.");
					}
					else {
						failurePrintout = Strings.errorCodes[failureCode];
						Jebber.Debug.print("Session timeout was detected. Informing user with a dialog.");
					}

					Dialog.Notification.disconnect(failurePrintout);
					setTimeout(Dialog.okCallback, 10000);
					return;
				}

				var failureString = Strings.errorCodes[failureCode];
				if (failureString == undefined || failureString == null) {
					break;
				}
				failurePrintout += failureString;
			}

			if (failurePrintout == "" && data.message != undefined && data.message != null) {
				failurePrintout = data.message;
			}

			if (failurePrintout == "Request failed") {
				Jebber.Debug.print("Not telling the user about: '" + failurePrintout + "' because they are probably just navigating to another page. Will show session timeout dialog in a second.");
				setTimeout(Dialog.Notification.disconnect.bind(Dialog.Notification, Strings.errorCodes[ServerConstants.errors.sessionTimeout]), 5000);
				setTimeout(Dialog.okCallback, 10000);
				return;
			}

			if($J.trim(failurePrintout) == "") {
				// for some reason, the error code is not defined from ajax error response, use unknown error here
				Dialog.Notification.disconnect(Strings.unknownError);
				setTimeout(Dialog.okCallback, 10000);
				return;
			}
		}
		return failurePrintout;
	},
*/

	getInsertIndex : function(data, newData, low, high, compareFunction) {
		//alert(low + " : " + high);
		if(high < low ) {
			//alert("Low: " + low);
			return low;
		}

		var mid = low + Math.floor((high - low)/2);
		var compareResult = compareFunction(data[mid], newData);
		if (compareResult == 1) {
			//alert(compareResult + " : " + low + " : " + (mid-1));
			return this.getInsertIndex(data, newData, low, mid-1, compareFunction);
		}
		else if(compareResult == -1) {
			//alert(compareResult + " : " + (mid+1) + " : " + high);
			return this.getInsertIndex(data, newData, mid+1, high, compareFunction);
		}
		//alert(compareResult + " : Mid: " + mid);
		return mid;
	},

	calculateTimeRange: function(time) {
		var period = time.substr(0, 2);
		time = parseInt(time.substring(2, time.indexOf("to")));
		var timePeriod = time + "-";

		if(time == 12) {
			timePeriod += 1 + period;
		}
		else {
			timePeriod += (time+1) + period;
		}
		return timePeriod;
	},

/*	parseInfoForDashboardActivity: function(event, result, details) {
		var text = "";
		var image = "";

		//Recovery Section
		if(Jebber.Util.Account.isRecoveryEnabled() && Header.alarm.smsType == event) {
			image = "";
			text = "";
			if(result == Strings.successIndicator && details.match(Strings.offIndicator) == null) {
				image = "icon_alarm_success";
				text = Strings.alarm.statusSuccessOn;
			}
			else if(result == Strings.successIndicator && details.match(Strings.offIndicator) != null) {
				image = "icon_alarm_success";
				text = Strings.alarm.statusSuccessOff;
			}
			else if(result == Strings.failIndicator) {
				image = "icon_alarm_failed";
				text = Strings.alarm.statusFailed;
			}
		}
		else if(Jebber.Util.Account.isRecoveryEnabled() && Header.lock.smsType == event) {
			image = "";
			text = "";
			//Lock on
			if(result == Strings.successIndicator && details.match(Strings.offIndicator) == null) {
				image = "icon_lock_success";
				text = Strings.lock.statusSuccessOn;
			}
			//Lock off
			else if(result == Strings.successIndicator && details.match(Strings.offIndicator) != null) {
				image = "icon_unlock_success";
				text = Strings.lock.statusSuccessOff;
			}
			else if(result == Strings.failIndicator) {
				image = "icon_lock_failed";
				text = Strings.lock.statusFailed;
			}
		}
		else if(Jebber.Util.Account.isRecoveryEnabled() && Header.locate.smsType == event) {
			image = "";
			text = "";
			if(result == Strings.successIndicator) {
				image = "icon_locate_success";
				text = Strings.locate.statusSuccess;
			}
			else if(result == Strings.failIndicator) {
				image = "icon_locate_failed";
				text = Strings.locate.statusFailed;
			}
		}
		else if(Jebber.Util.Account.isRecoveryEnabled() && Header.wipe.smsType == event) {
			image = "";
			text = "";
         	// Wipe Failed, Phone Locked
			if(result == Strings.failIndicator && details.match(Strings.successIndicator) != null) {
				image = "icon_wipe_failed";
				text = Strings.wipe.statusFailedShort + "&#44; " + Strings.lock.statusSuccessOn;
			}
			//Wipe success and lock success
			else if(result == Strings.successIndicator && details.match(Strings.successIndicator) != null) {
				image = "icon_wipe_success";
				text = Strings.wipe.statusSuccess + " & " + Strings.lock.statusSuccessOn;
			}
			//Wipe success but lock failed
			else if(result == Strings.successIndicator && details.match(Strings.failIndicator) != null) {
				image = "icon_wipe_success";
				text = Strings.wipe.statusSuccess + "&#44; " + Strings.lock.statusFailedShort;
			}
			//No lock info sent in the details
			else if(result == Strings.successIndicator) {
				image = "icon_wipe_success";
				text = Strings.wipe.statusSuccess;
			}
			else if(result == Strings.failIndicator) {
				image = "icon_wipe_failed";
				text = Strings.wipe.statusFailed;
			}
		}
		else if(Jebber.Util.Account.isRecoveryEnabled() && Header.msgfamily.smsType == event) {
			image = "icon_profile_update_success";
			text = Strings.msgfamily.statusSuccess;
		}
		//Recovery Settings
		else if(Jebber.Util.Account.isRecoveryEnabled() && ServerConstants.historyEvents.emergencyContacts == event) {
			image = "icon_profile_update_success";
			text = Strings.emergencyContacts + " " + Strings.changed;
		}
		else if(Jebber.Util.Account.isRecoveryEnabled() && ServerConstants.situationProperties.locationCheck == event) {
			image = "icon_profile_update_success";
			text = Strings.accountSettings.locationChecks + " " + Strings.changed;
		}
		else if(Jebber.Util.Account.isRecoveryEnabled() && ServerConstants.situationProperties.gpsInterval == event) {
			image = "icon_profile_update_success";
			text = Strings.accountSettings.frequency + " " + Strings.changed;
		}
		else if(Jebber.Util.Account.isRecoveryEnabled() && ServerConstants.situationProperties.gpsBattery == event) {
			image = "icon_profile_update_success";
			text = Strings.accountSettings.batteryLevel + " " + Strings.changed;
		}
		//END - Recovery Settings
		//END - Recovery Section

		//Backup Section
		else if(Jebber.Util.Account.isBackupEnabled() && Header.sync.smsType == event) {
			image = "";
			text = "";
			if(result == Strings.successIndicator) {
				image = "icon_sync_success";
				//TODO: MA: Temp change until we can display a more appropriate sync status
				text = "Sync Successful";
			}
			else if(result == Strings.failIndicator) {
				image = "icon_sync_failed";
				text = "Sync Command Not Sent";
			}
		}
		//Backup Settings
		else if(Jebber.Util.Account.isBackupEnabled() && ServerConstants.situationProperties.backupSchedule == event) {
			image = "icon_profile_update_success";
			text = Strings.accountSettings.backupSchedule + " " + Strings.changed;
		}
		else if(Jebber.Util.Account.isBackupEnabled() && ServerConstants.situationProperties.backupDate == event) {
			image = "icon_profile_update_success";
			text = Strings.accountSettings.backupDate + " " + Strings.changed;
		}
		else if(Jebber.Util.Account.isBackupEnabled() && ServerConstants.situationProperties.backupDay == event) {
			image = "icon_profile_update_success";
			text = Strings.accountSettings.backupDay + " " + Strings.changed;
		}
		else if(Jebber.Util.Account.isBackupEnabled() && ServerConstants.situationProperties.backupTime == event) {
			image = "icon_profile_update_success";
			text = Strings.accountSettings.backupTime + " " + Strings.changed;
		}
		//END - Backup Settings
		//END - Backup Section

		//Account Info Settings
		else if(ServerConstants.historyEvents.account.name == event) {
			image = "icon_profile_update_success";
			text = Strings.accountSettings.accountname + " " + Strings.changed;
		}
		else if(ServerConstants.historyEvents.account.email == event) {
			image = "icon_profile_update_success";
			text = Strings.accountSettings.email + " " + Strings.changed;
		}
		else if(ServerConstants.historyEvents.account.securityQuestion == event) {
			image = "icon_profile_update_success";
			text = Strings.accountSettings.securityquestion + " " + Strings.changed;
		}
		else if(ServerConstants.historyEvents.account.securityAnswer == event) {
			image = "icon_profile_update_success";
			text = Strings.accountSettings.securityanswer + " " + Strings.changed;
		}
		//END - Account Info Settings
		//Security Section
		else if(Jebber.Util.Account.isSecurityEnabled() && ServerConstants.historyEvents.security[event] != null) {
			text = Strings.historyEventsText[event];
			image = "icon_security_success";
			if(ServerConstants.historyEvents.security.updateTrust == event) {
				image = "icon_app_advisor_success";
			}
			else if(ServerConstants.historyEvents.security.scanStarted == event ||
					ServerConstants.historyEvents.security.scanFinished == event) {
				image = "";
				text = "";
				if(result.match("allAppScanType")) {
					image = "icon_threat_protection_success";
					text = "App " + Strings.historyEventsText[event];
				}
				else if(result.match("mediaScanType")) {
					image = "icon_threat_protection_success";
					text = "Files " + Strings.historyEventsText[event];
				}
				else if(result.match("singleAppScanType")) {
					image = "icon_threat_protection_success";
					text = "Single App " + Strings.historyEventsText[event];
				}
			}
		}
		//Security Settings
		else if(Jebber.Util.Account.isSecurityEnabled() && ServerConstants.situationProperties.autoUpdate == event) {
			image = "icon_profile_update_success";
			text = Strings.accountSettings.autoUpdate + " " + Strings.changed;
		}
		else if(Jebber.Util.Account.isSecurityEnabled() && ServerConstants.situationProperties.autoUpdateSchedule == event) {
			image = "icon_profile_update_success";
			text = Strings.accountSettings.autoUpdateSchedule + " " + Strings.changed;
		}
		else if(Jebber.Util.Account.isSecurityEnabled() && ServerConstants.situationProperties.autoUpdateDay == event) {
			image = "icon_profile_update_success";
			text = Strings.accountSettings.autoUpdateDay + " " + Strings.changed;
		}
		else if(Jebber.Util.Account.isSecurityEnabled() && ServerConstants.situationProperties.autoUpdateTime == event) {
			image = "icon_profile_update_success";
			text = Strings.accountSettings.autoUpdateTime + " " + Strings.changed;
		}
		else if(Jebber.Util.Account.isSecurityEnabled() && ServerConstants.situationProperties.cloudAV == event) {
			image = "icon_profile_update_success";
			text = Strings.accountSettings.cloudAV + " " + Strings.changed;
		}
		else if(Jebber.Util.Account.isSecurityEnabled() && ServerConstants.situationProperties.scanSchedule == event) {
			image = "icon_profile_update_success";
			text = Strings.accountSettings.scanSchedule + " " + Strings.changed;
		}
		else if(Jebber.Util.Account.isSecurityEnabled() && ServerConstants.situationProperties.scanDay == event) {
			image = "icon_profile_update_success";
			text = Strings.accountSettings.scanDay + " " + Strings.changed;
		}
		else if(Jebber.Util.Account.isSecurityEnabled() && ServerConstants.situationProperties.scanTime == event) {
			image = "icon_profile_update_success";
			text = Strings.accountSettings.scanTime + " " + Strings.changed;
		}
		else if(Jebber.Util.Account.isSecurityEnabled() && ServerConstants.situationProperties.realTimeScan == event) {
			image = "icon_profile_update_success";
			text = Strings.accountSettings.realTimeScan + " " + Strings.changed;
		}
		else if(Jebber.Util.Account.isSecurityEnabled() && ServerConstants.situationProperties.realTimeScanApp == event) {
			image = "icon_profile_update_success";
			text = Strings.accountSettings.realTimeScanApp + " " + Strings.changed;
		}
		else if(Jebber.Util.Account.isSecurityEnabled() && ServerConstants.situationProperties.realTimeScanSDCard == event) {
			image = "icon_profile_update_success";
			text = Strings.accountSettings.realTimeScanSDCard + " " + Strings.changed;
		}
		else if(Jebber.Util.Account.isSecurityEnabled() && ServerConstants.situationProperties.realTimeScanMessage == event) {
			image = "icon_profile_update_success";
			text = Strings.accountSettings.realTimeScanMessage + " " + Strings.changed;
		}
		else if(Jebber.Util.Account.isSecurityEnabled() && ServerConstants.situationProperties.realTimeScanCompressed == event) {
			image = "icon_profile_update_success";
			text = Strings.accountSettings.realTimeScanCompressed + " " + Strings.changed;
		}
		else if(Jebber.Util.Account.isSecurityEnabled() && ServerConstants.situationProperties.downloadNotify == event) {
			image = "icon_profile_update_success";
			text = Strings.accountSettings.downloadNotify + " " + Strings.changed;
		}
		else if(Jebber.Util.Account.isSecurityEnabled() && ServerConstants.situationProperties.deleteNotify == event) {
			image = "icon_profile_update_success";
			text = Strings.accountSettings.deleteNotify + " " + Strings.changed;
		}
		else if(Jebber.Util.Account.isSecurityEnabled() && ServerConstants.situationProperties.trayNotify == event) {
			image = "icon_profile_update_success";
			text = Strings.accountSettings.trayNotify + " " + Strings.changed;
		}
		else if(Jebber.Util.Account.isSecurityEnabled() && ServerConstants.situationProperties.autoMediaScan == event) {
			image = "icon_profile_update_success";
			text = Strings.accountSettings.autoMediaScan + " " + Strings.changed;
		}
		else if(Jebber.Util.Account.isSecurityEnabled() && ServerConstants.situationProperties.airplaneLock == event) {
			image = "icon_profile_update_success";
			text = Strings.accountSettings.airplaneLock + " " + Strings.changed;
		}
		else if(Jebber.Util.Account.isSecurityEnabled() && ServerConstants.situationProperties.safeBrowsing == event) {
			image = "icon_profile_update_success";
			text = Strings.accountSettings.safeBrowsing + " " + Strings.changed;
		}
		//END - Security Settings
		//END - Security Section
		return {text : text, image: image};
	},*/

/*	parseHistoryDetails: function(event, details) {
		var pairsDivider = "\n";
		var keyValueDivider = "=";
		var detailsObj = {};
		var formattedDetails = "";

		if(details.indexOf(keyValueDivider) == -1) {
			Jebber.Debug.print("Phone did not send details in the format that can appropriately be parsed: " + details);
		}
		else {
			Jebber.Debug.print("Parsing History Record Details: " + details);
			var pairs = details.split(pairsDivider);
			Jebber.Debug.print("History record has " + pairs.length + " key value pairs.");

			for(var i=0;i<pairs.length;i++) {
				//If no '=' then ignore it
				if(pairs[i].indexOf(keyValueDivider) != -1) {
					//Split on '='
					var nameValue = pairs[i].split(keyValueDivider);
					var name = $J.trim(nameValue[0]).toLowerCase();
					var value = $J.trim(nameValue[1]);
					Jebber.Debug.print("Name: " + name + ", Value: "+ value);


					// TODO: Move the building of 'formattedDetails' out of this loop,
					// so that the sequence of the JSON fields would not matter.
					// This is currently a major pitfall of this part of the code.
					// In lieu of this, simply build the 'detailsObj' here.

					if(value != null) {
						if(event == ServerConstants.historyEvents.security.appInstalled ||
							event == ServerConstants.historyEvents.security.appRemoved ||
							event == ServerConstants.historyEvents.security.appUpdated ||
							event == ServerConstants.historyEvents.security.appScanned)
						{
							if(name == "name") {
								return value;
							}
						}
						else if(event == ServerConstants.historyEvents.security.threatDetected ||
								event == ServerConstants.historyEvents.security.fileUpdated ||
								event == ServerConstants.historyEvents.security.fileScanned) {
							if(name == "filename") {
								return value;
							}
						}
						else if(event == ServerConstants.historyEvents.security.policyUpdated) {
							if(name == "policy") {
								return value;
							}
						}
						else if(event == ServerConstants.historyEvents.security.remediationPerformed) {
							detailsObj[name] = value;
						}
						else if(event == ServerConstants.historyEvents.security.scanFinished) {
							if(name == "numfilesscanned") {
								if(details.match("outcome=mediaScanType")) {
									formattedDetails = value + " Files Scanned<br/>";
								}
								else {
									formattedDetails = value + " Apps Scanned<br/>";
								}
							}
							else if(name == "numthreatsdetected") {
								// NOTE: Do not simplify the singular/plural distinction by conditional "s",
								// as it will cause problems with future localization of such message to non-English
								formattedDetails += value + " " +
									(value == 1 ? "Threat Detected" : "Threats Detected") + "<br/>";
							}
//							else if(name == "numquarantinedfiles") {
//								formattedDetails += value + " Quarantined Files.";
//							}
						}
					}
				}
			}

			if (event == ServerConstants.historyEvents.security.remediationPerformed) {
				formattedDetails = "<span title='" + (detailsObj.pkg || "") + "'>" + (detailsObj.name || "") + "</span><br />" +
									(detailsObj.action || "");
			}
		}
		return formattedDetails;
	},*/

    // FIXME: Avoid generating messages this way. This is non-localizable.
	parseStatusDetails: function(string, type) {
	    if (AMA.Util.useLegacyApi){
	    	var pairsDivider = "\n";
	    	var keyValueDivider = "=";
	    	var valueTotalDivider = "/";
			var finalResult = "";
	
			var wipeParameters = { "contacts": "contacts",
								   "pictures": "pictures",
								   "audios": "audios",
								   "videos": "videos",
								   "folders": "folders",
								   "files": "files",
								   "sms":"sms",
								   "calllogs": "calllogs",
								   "calendar": "calendar",
								   "todo": "todo",
								   "memo": "memo"
								  };
	        var result = {"deleted" : {show: false, message: ""},
	            	      "lock"    : {show: false, message: ""},
	            	      "alarm"   : {show: false, message: ""},
	            	      "gps"	    : {show: false, message: ""},
						  "announce": {show: false, message: ""}};
	
	
			//Phone did not send details in the format that can appropriately be parsed.
			if(string.indexOf(keyValueDivider) == -1) {
				AMA.debug("Phone did not send details in the format that can appropriately be parsed: " + string);
			}
			else {
				AMA.debug("Parsing Status Record Details: " + string);
	
				//Split the string on \n
				var wipeDone = true;
				var factoryWipe = false;
				var pairs = string.split(pairsDivider);
				AMA.debug("Status record has " + pairs.length + " key value pairs.");
	
				for(var i=0;i<pairs.length;i++) {
					//If no '=' then ignore it
					if(pairs[i].indexOf(keyValueDivider) != -1) {
						//Split on '='
						var nameValue = pairs[i].split(keyValueDivider);
						var name = $.trim(nameValue[0]).toLowerCase();
						var value = $.trim(nameValue[1]);
						AMA.debug("Name: " + name + ", Value: "+ value);
	
						if(value) {
							if(name == "lock" || name == "locknative" || name == "lockrandom") {
								if(value == Strings.successIndicator && Header.wipe.timeout == "-1") {
									result.lock.message += Strings.wipe.lockedPhone;
									result.lock.show = true;
									AMA.debug("LOCK SUCCESS: " + result.lock.message);
								}
								else if(value == Strings.failIndicator && Header.wipe.timeout == "-1") {
									result.lock.message += Strings.wipe.didNotLockPhone;
									result.lock.show = true;
									AMA.debug("LOCK FAILED: " + result.lock.message);
								}
								else if(value == Strings.onIndicator) {
									if(name == "locknative") {
										result.lock.message += (type == "wipe") ? Strings.wipe.lockedPhone : Strings.lock.lockedNativeMessage;
									}
									else if(name == "lockrandom") {
										result.lock.message += (type == "wipe") ? Strings.wipe.lockedPhone : Strings.lock.lockedRandomMessage.replace('$', ServerConstants.account.randomUnlockPIN);
									}
									else {
										result.lock.message += (type == "wipe") ? Strings.wipe.lockedPhone : Strings.lock.lockedMessage;
									}
									result.lock.show = true;
									AMA.debug("LOCK ON: " + result.lock.message);
								}
							}
							else if(name == "alarm") {
								result.alarm.show = true;
								if(value == Strings.onIndicator) {
									result.alarm.message += Strings.alarm.soundingMessage;
									AMA.debug("ALARM ON: " + result.alarm.message);
								}
								else {
									result.alarm.message += Strings.alarm.soundedMessage;
									AMA.debug("ALARM OFF: " + result.alarm.message);
								}
							}
							else if(name == "announce") {
								result.announce.show = true;
								if(value == "unanswered") {
									result.announce.message += Strings.announce.unansweredMessage;
									AMA.debug("ANNOUNCE unanswered: " + result.announce.message);
								}
								else if(value == "dismissed") {
									result.announce.message += Strings.announce.dismissedMessage;
									AMA.debug("ANNOUNCE dismissed: " + result.announce.message);
								}
								else if(value == "error") {
									result.announce.message += Strings.announce.errorMessage;
									AMA.debug("ANNOUNCE dismissed: " + result.announce.message);
								}
							}
							else if(name == "gps") {
								if(value == Strings.offIndicator) {
									result.gps.show = true;
									result.gps.message += Strings.error.locate.gpsOff;
									AMA.debug("GPS OFF: " + result.gps.message);
								}
							}
							else if(name == "wipefactory") {
								if(value == Strings.onIndicator) {
									factoryWipe = true;
									result.deleted.show = true;
									result.deleted.message += Strings.wipe.factoryResetSuccessMessage;
									AMA.debug("WIPE FACTORY SUCCESS: " + result.deleted.message );
								}
							}
							else if(wipeParameters[name] != null) {
								result.deleted.show = true;
								var currentCount = value;
								var totalCount = value;
								//Check if the value has a '/' indicating batch wipe
								if(value.indexOf(valueTotalDivider) != -1) {
									var currentTotal = value.split(valueTotalDivider);
									currentCount = $J.trim(currentTotal[0]);
									totalCount = $J.trim(currentTotal[1]);
								}
								AMA.debug("Name: " + name + ", CurrentCount: " + currentCount + ", TotalCount: " + totalCount);
	
								//If the totalCount is a '-1' then the phone is not capable of getting a total count before starting the delete
								if(totalCount == "-1") {
									result.deleted.message += "<br/>" + Strings.wipe[name] + ": " + currentCount;
								}
								else {
									result.deleted.message += "<br/>" + Strings.wipe[name] + ": " +  currentCount + " / " + totalCount;
								}
	
								//If wipeDone has been set to false before don't change the value.
								wipeDone = wipeDone ? (totalCount == currentCount) : wipeDone;
								AMA.debug("Wipe Done: " + wipeDone);
								AMA.debug("WIPE: " + result.deleted.message);
							}
						}
						else {
							AMA.debug("Phone sent a parameter that the web doesn't recognize: " + name);
						}
					}
					else {
						AMA.debug("Phone did not send up status details in key=value format: " + nameValue);
					}
				}
			}
	
			result.deleted.message = factoryWipe ? result.deleted.message : "<div class='wipe_status'><b>" + (wipeDone ? Strings.wipe.completedMessage : Strings.wipe.progressMessage ) + "</b>" + result.deleted.message;
			finalResult = result.deleted.show ? result.deleted.message + "</div><br/>" : "";
	
			//Wipe and lock case
			if(result.deleted.show) {
				if(wipeDone && !factoryWipe && result.lock.show ) {
					finalResult += "" + result.lock.message;
				}
			}
			//Only lock case
			else {
				finalResult += result.lock.show ?  result.lock.message : "";
			}
			finalResult += result.alarm.show ? result.alarm.message : "";
			finalResult += result.announce.show ? result.announce.message : "";
			return finalResult;
	    }
	    else {
	    	var pairsDivider = "\n";
	    	var keyValueDivider = "=";
	    	var valueTotalDivider = "/";
			var finalResult = "";
			
	        var result = {"sync"    : {show: false, message: ""}};
	
	
			//Phone did not send details in the format that can appropriately be parsed.
			if(string.indexOf(keyValueDivider) == -1) {
				AMA.debug("Phone did not send details in the format that can appropriately be parsed: " + string);
			}
			else {
				AMA.debug("Parsing Status Record Details: " + string);
	
				//Split the string on \n
				var wipeDone = true;
				var factoryWipe = false;
				var pairs = string.split(pairsDivider);
				AMA.debug("Status record has " + pairs.length + " key value pairs.");
	
				for(var i=0;i<pairs.length;i++) {
					//If no '=' then ignore it
					if(pairs[i].indexOf(keyValueDivider) != -1) {
						//Split on '='
						var nameValue = pairs[i].split(keyValueDivider);
						var name = $.trim(nameValue[0]).toLowerCase();
						var value = $.trim(nameValue[1]);
						AMA.debug("Name: " + name + ", Value: "+ value);
	
						if(value) {
							if(type === "sync"){
								result.sync.show = true;
								
								if($('.status_detail_msg').find('.' + value).length > 0) {
									result.sync.message += $('.status_detail_msg').find('.' + value).text();
								}
								else {
									result.sync.message += $('.status_detail_msg').find('.SYNC_STOPPED').text();
								}							
							}
						}
						else {
							AMA.debug("Phone sent a parameter that the web doesn't recognize: " + name);
						}
					}
					else {
						AMA.debug("Phone did not send up status details in key=value format: " + nameValue);
					}
				}
			}
	
			if(type == "sync"){
				if(result.sync.message === "" && string !== ""){
					return string; 
				}
	            else if(result.sync.message === "")
	            {
	                return "";
	            }
	            else{
					return result.sync.message;
				}
			}
	    }
	},

	calculateNextWeek: function(targetWeekDay) {
		var dateMapping = {sunday : 0,
						   monday : 1,
						   tuesday: 2,
						   wednesday : 3,
						   thursday: 4,
						   friday : 5,
						   saturday : 6};
        var date = new Date();

        var day = date.getDate();
        var month = date.getMonth();
        var year = date.getFullYear();
        var weekDay = date.getDay();

        //This assumes that if today is a target week day,
        //today's date will be used and not next week's.
        //To change that, just change
        //if(week_day <= dateMapping[targetWeekDay])
        //to
        //if(week_day < dateMapping[targetWeekDay])

        if(weekDay < dateMapping[targetWeekDay]) {
            daysLeft = dateMapping[targetWeekDay] - weekDay;
        }
        else {
        	daysLeft = 7 - (weekDay - dateMapping[targetWeekDay]);
		}

        //This script works by finding out the number of days separating
        //the current date and the next target week day.
        nextWeekDay = new Date(year, month, day + daysLeft);

       return this.MONTH_NAMES[nextWeekDay.getMonth()] + " " + nextWeekDay.getDate() + ", " + nextWeekDay.getFullYear();
    },
    /**
     * @see /js/toolbar/StorageCapacityToolset.js
     * @param bytes
     * @returns {string}
     */
   bytesToSize: function(bytes) {
      var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
      if (bytes == 0) return '0 ' + sizes[0];
      var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
      return ((i == 0)? (bytes / Math.pow(1024, i)) : (bytes / Math.pow(1024, i)).toFixed(1)) + ' ' + sizes[i];
   },

   exportContacts: function() {
       AMA.debug("Exporting contacts");

	   if (AMA.models.contacts.length > 0) {
		   document.location.href="../core/jebber/export?method=retrieveCSV&csrfvalue=" + AMA.config.csrfToken;
	   }
	   else {
		   AMA.error("There are no contacts to export");
		   //Dialog.Error.script(Strings.error.noContactsToExport);
	   }

	   // We haven't enabled reporting and omniture, so commenting out this code for now
	   // Make sure to perform the reporting (AJAX request) after changing the page or
	   // the AJAX request will fail.

		//do not change below reporting unless, you want to mess up the reporting requirements.
//		var eventMsg={};
//		eventMsg['ActionPerformed']="Export Contacts";
//		eventMsg['MDN']=ServerData.getRecentMobileDevice().name;
//		Jebber.Report.reportUserAction(ServerConstants.reportingEventType.exportcontact,eventMsg);
//		//WebAnalytic changes
//		if(Jebber.Skin.siteIdentifier != undefined && Jebber.Skin.siteIdentifier != null){
//			Tagging.trackPageViews({loginState : "Postlogin",pageName : "Backup/Manage Contacts/Export Contacts" ,event : "event1"});// WebAnalytic changes
//		}
	},

	print: function() {
		// We haven't enabled reporting and omniture, so commenting out this code for now
		//do not change below reporting unless, you want to mess up the reporting requirements.
/*		var eventMsg={};
		eventMsg['PageVisited']="Print Contacts";
	    eventMsg['MDN']=ServerData.getRecentMobileDevice().name;
		Jebber.Report.logPageVisited(eventMsg,true);

		var eventDetail={};
		eventDetail['ActionPerformed']="Print Contact";
		eventDetail['MDN']=ServerData.getRecentMobileDevice().name;
		Jebber.Report.reportUserAction(ServerConstants.reportingEventType.printcontact,eventDetail);*/
		var url = "/web/print.html";

		//WebAnalytic changes
//		if(Jebber.Skin.siteIdentifier != undefined && Jebber.Skin.siteIdentifier != null){
//			Tagging.trackPageViews({loginState : "Postlogin",pageName : "Backup/Manage Contacts/Print Contacts" ,event : "event1"});// WebAnalytic changes
//		}
		window.open(url, "cb_print");
	},

	printHTML: function() {
		if (AMA.config.useLegacyApi){
			var printTable = new TableMaker(2);
			for (var i=0;i<AMA.models.contacts.length;i++) {
				  var modelAttr = AMA.models.contacts.models[i].attributes;
				  var modelDescriptors = AMA.model.Contacts.MODEL_DESCRIPTOR.fields;
				  var html;
				  var finalHtml='';
				  for(var item in modelAttr) {
				  	for(var prop in modelDescriptors) {
				  		if (item === prop) {
				  				html = "<span class='printfield'>"+item+":</span> ";
								html += "<span class='printvalue'>";
								html += modelAttr[item];
								html += "</span>";
								html += "<br>";
								finalHtml+= html;
				  			}
				  		}
					}
					printTable.add(finalHtml);
				}
	/*		var logoImg = "<img src='" + Jebber.Skin.imagePath;
	
			if(ServerConstants.isFrench)
			{
				logoImg += "title_fr.gif'";
			}
			else if(ServerConstants.isSpanish)
			{
				logoImg += "title_sp.gif'";
			}
			else if(ServerConstants.isChinese)
			{
				logoImg += "title_zh.gif'";
			}
			else
			{
				logoImg += "title.gif'";
			}
	
			logoImg += " border='0'/>";*/
	
			var tableHTML = printTable.close();
			return tableHTML;
			//return logoImg + "<br><br>" + tableHTML;
		}
		else {
			var printTable = new TableMaker(2);
			var ids = [];
			
			if(typeof AMA.models.contacts === "undefined") {
				return "Portal has not been completely loaded.";
			};
			
			for (var i = 0; i < AMA.models.contacts.length; i++) {
				var modelId = AMA.models.contacts.models[i].id;
				var modelAttr = AMA.models.contacts.models[i].attributes;
				var modelDescriptors = AMA.model.ContactDetails.MODEL_DESCRIPTOR.fields;
				var finalHtml = '';
				
				ids.push(modelId);
				for(var item in modelAttr) {
					var prop = modelDescriptors[item];
					
					if (prop) {
						finalHtml += "<span class='printfield'>" + prop.displayText + ": </span>"
							+ "<span class='printvalue'> " + modelAttr[item] + "</span><br>"
							+ "<div id='" + modelId + "'><img class='itemloader' alt='loading...' src='img/loadingcircle.gif' />" 
							+ "<span class='loadertext'>  loading details...</span></div>";
							
					}
				}
				
				printTable.add(finalHtml);
			}
			
			var tableHTML = printTable.close();
			return [tableHTML, ids];
		}
	},
	
	loadSpinner: function(elem, options) {
        var defaults = {
                resizable : false,
                modal: true,
                maxWidth: 150
            },
            loadingSpinner = $(elem);//"#loadingdialog");
       if(typeof options !== "string") {
           defaults = _.extend(options, defaults)
       }

       loadingSpinner.dialog(options);
       loadingSpinner.siblings(".ui-dialog-titlebar").hide()
	},

	// Highlight the correct submenu link
	highlightSubNav: function(subtab) {
		if(subtab !== "") {
			$('#records_mainhalf .recordspane_nav li').removeClass('selected');
			$('#records_mainhalf .recordspane_nav_button_' + subtab).addClass('selected');
		}
	},

	logout: function() {
		if (AMA.config.useLegacyApi){
			//document.location= "../core/jebber/logout.poo";
			return false;
		}
	},

	generateCreateInAccountObject: function(data) {
		var o=JSON.parse(data), o2=[], dt, i=0;
		if( o && (o.length > 0)) {
			AMA.debug("generateCreateInAccountObject length:" + o.length);
			for( i=0; i<o.length; i++ ) {
				dt=o[i];
				// reset dg property and add empty cp, pc properties
				dt.dg="";
				dt.cp={};
				dt.pc=[0];
				AMA.debug("generateCreateInAccountObject i:" + i + ", content:" + JSON.stringify(dt));
				o2.push(dt);
			}
		}
		else {
			AMA.debug( "generateCreateInAccountObject unexpected data:" + data);
		}

		return o2;
	},

	createInAccount: function( postUrl, postData ) {
		var o=this;
		$.ajax({
			type: "POST",
			cache : false,
			url: postUrl,
			data: postData,
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			global: false,
			success: function(data, textStatus, jqXHR){
				AMA.debug("post complete");
				AMA.models.contacts.invalidate();
				Backbone.globalEvent.trigger("ContactImported", {status: "success",data:o.totalImportedContacts});
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				Backbone.globalEvent.trigger("ContactImported", {status: "fail"});
			 }
		});
	},

	// Deprecated - Jebber-based  
	// TODO: delete this method
	iFrameLoaded: function() {
		var data=$("#uploadHiddenframe").contents().find("#up_iframecontent").text(), o, postUrl="", postData="";
		AMA.debug("iFrameLoaded received data:" + data);
		o=this.generateCreateInAccountObject(data);
		postUrl=AMA.config.legacyApiBaseUrl+"/records.poo?method=createInAccount&csrfvalue="+encodeURIComponent(AMA.config.csrfToken);
		postData=encodeURIComponent(JSON.stringify(o));
		AMA.debug('iFrameLoaded invoking createInAccount, url:'+postUrl+', object2:'+postData);
		this.createInAccount(postUrl, postData);
		this.totalImportedContacts=o.length;
	},

	// Deprecated - Jebber-based  
	// TODO: delete this method
	iFrameFailed: function() {
		AMA.debug('inside iFrameLoaded');
		var data=$("#uploadHiddenframe").contents().find("#up_iframecontent").text(), postUrl="", postData="";
		postUrl=AMA.config.legacyApiBaseUrl+"/records.poo?method=createInAccount&csrfvalue="+encodeURIComponent(AMA.config.csrfToken);
		postData="";
		AMA.debug('iFrameLoaded invoking createInAccount, url:'+postUrl+', object2:'+postData);
		this.createInAccount(postUrl, postData);
		this.totalImportedContacts=0;
	},

	getGmailFastImportFormData: function() {
		// #gmail_fastimport is form id for gmail fast import
		// expect application/x-www-form-urlencoded format, username=<encodeURIComponent(user)>&password=<encodeURIComponent(pass)>
		return $("#gmail_fastimport").serialize();
	},
	
	// Deprecated - Jebber-based  
	// TODO: delete this method
	gmailFastImport: function() {
		var that=this,
			postUrl=this.getGmailFastImportUrl(),
			postData=this.getGmailFastImportFormData();
		AMA.debug("url:"+postUrl+", data:"+postData);
		$.ajax({
			type: "POST",
			cache : false,
			url: postUrl,
			data: postData,
			global: false,
			success: function(data, textStatus, jqXHR){
				AMA.debug("gmailFastImport post complete, data:"+data);
				if(JSON.parse(data).failures === undefined) {
					var o2=that.generateCreateInAccountObject(data),
						postUrl2=AMA.config.legacyApiBaseUrl+"/records.poo?method=createInAccount&csrfvalue="+encodeURIComponent(AMA.config.csrfToken),
						postData2=encodeURIComponent(JSON.stringify(o2));
					AMA.debug('gmailFastImport invoking createInAccount, url:'+postUrl2+', object2:'+postData2);
					that.createInAccount(postUrl2, postData2);
				}
				else {
					Backbone.globalEvent.trigger("ContactImported", {status: "fail"});
				}
			}
		});
	},

	/* Returns either true or false after checking if the platform (through the supplied string platform name value) is Android or not
     *
     * @param {String} platformName
     * @return {Boolean}
     */
	isAndroid: function () {
		var platformName=AMA.models.endpoints.models[0].get("platform");
		var platformFriendlyName=AMA.models.endpoints.models[0].get("platformfriendlyname");
	    if (platformName.toLowerCase().indexOf("android") > -1 || platformFriendlyName.toLowerCase().indexOf("android") > -1)
            return true;
	    else
	       return false;
	},

	/* Returns either true or false after checking if the platform (through the supplied string platform name value) is BlackBerry or not
     *
     * @param {String} platformName
     * @return {Boolean}
     */
    isBB: function () {
    	var platformName=AMA.models.endpoints.models[0].get("platformfriendlyname");
        if (platformName.toLowerCase().indexOf("blackberry") > -1)
            return true;
        else
           return false;
    },

    /* Returns either true or false after checking if the platform (through the supplied string platform name value) is an iPhone or not
     *
     * @param {String} platformName
     * @return {Boolean}
     */
    isIPhone: function () {
    	var platformName = AMA.models.endpoints.models[0].get("platform"),
    	platformFriendlyName=AMA.models.endpoints.models[0].get("platformfriendlyname");
        if (platformName.toLowerCase().indexOf("ios") > -1 || platformFriendlyName.toLowerCase().indexOf("iphone") > -1)
            return true;
        else
           return false;
    },

    metersToYards: function(accuracy) {
		if(accuracy.indexOf(",") != -1) {
			accuracy = accuracy.substring(0,accuracy.indexOf(","));
		}
		return accuracy*1.0936133;

	},

	uppercaseFirst: function(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);

    },
	openPopupWindow: function (options) {
		AMA.popupWindows = AMA.popupWindows || [];
		
		var win = AMA.popupWindows[options.id];
		
		// Refocus or close if window with the specified ID is already open
		if (win && !win.closed) {
			if (this.getBrowserType() !== "Chrome") {
				win.focus();
				return;
			} else {
				win.close();
			}
		}

		AMA.popupWindows[options.id] = window.open(options.url, options.id, 
				"scrollbars=1,toolbar=0,location=0,directories=0,status=0,menubar=0,resizable=1,titlebar=0,width=" + options.width + 
				",height=" + options.height + ",left=100,top=100");
	},
	
	/* File downloader using invisible iframe, as described in
	 * http://stackoverflow.com/questions/3749231/download-file-using-javascript-jquery
	 *
     * @param {String} fileUrl
     */
    downloadFile: function (fileUrl) {
		var $idown;

		if ($idown) {
			$idown.attr('src',fileUrl);
		} else {
			$idown = $('<iframe>', { id:'idown', src:fileUrl }).hide().appendTo('body');
		}
    },
		
	/** Creates a CORS request
	 * From: http://www.nczonline.net/blog/2010/05/25/cross-domain-ajax-with-cross-origin-resource-sharing/
	 * 
	 * @param {String} method
	 * @param {String} url
	 * 
	 * @return {Object} xhr
	 */
	createCORSRequest: function (method, url) {
		// disables caching of AJAX calls
		url += "&nocache=" + new Date().getTime();
		
		AMA.debug("Calling REST API: " + method + " " + url);

		var xhr = new XMLHttpRequest();
		
		// Handles IE10+ and most other popular browsers
		if ("withCredentials" in xhr) {
			xhr.open(method, url, true);
		}
		// Creates a new XDomainRequest for IE8/9 as these browsers used a different method for CORS
		else if (typeof XDomainRequest != "undefined"){
			xhr = new XDomainRequest();
			xhr.open(method, url);
			
			// Setting "required" handlers below to address aborted requests in IE
			// http://cypressnorth.com/programming/internet-explorer-aborting-ajax-requests-fixed/
			xhr.ontimeout = function(){return;}
			xhr.onprogress = function(){return;}
		}
		// Browser doesn't support CORS requests
		else {
			xhr = null;
		}

		return xhr;
	},
		
	/** Utility to determine whether a CORS request should use XDomainRequest (for IE8/9)
	 * 
	 * Based on: http://www.nczonline.net/blog/2010/05/25/cross-domain-ajax-with-cross-origin-resource-sharing/
	 * 
	 * @return {Boolean}
	 */
	useXdr: function () {
		var xhr = new XMLHttpRequest();
		
		// IE10+ and other browsers
		if ("withCredentials" in xhr) {
			return false;
		}
		// IE8/9
		else if (typeof XDomainRequest != "undefined"){
			return true;
		}
		// Default return is false
		else {
			return false;
		}
	},
	
    microTemplate: function(string, data) {
        var template = string.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
        return _.template(template, data);
    },
	
	/** Utility to easily show and hide static labels
	 * 
	 * 
	 * @param {String} class selector common to all the labels
	 * @param {String} the class selector to show
	 * @param {Object} the $el of a view
	 */
	switchLabel: function(group, elements, $context) {
		var $group = typeof $context === undefined ? $(group) : $context.find(group);	
		var selector = _.isArray(elements) ? elements.join(",") : elements;		
		
		$group.hide();
		$group.filter(selector).show();
	},

    /** Utility to get a secret pair for encrypting passwords
     *
     *  @param {Function} Code to be executed after Ajax request
     *  @return {String} Secret Pair
     */
    getSecretPair: function (callback) {
        // Check that a callback function is specified
        if (!callback || typeof callback != "function") {
            AMA.error("Error: A callback function must be specified. Aborting.");
            return;
        }

        var url = AMA.config.securityHostUrl + "/secretPair?devId=" + AMA.config.devId,
            request = AMA.Util.createCORSRequest("GET", url);

        if (request) {
            request.onerror = function () {
                AMA.debug("Error in retrieving secret pair.");
                callback(null);
            };

            request.onload = function () {
                try {
                    callback(JSON.parse(this.responseText));
                } catch (err) {
                    //Chrome and Firefox error handling
                    AMA.debug("Error in retrieving secret pair.");
                    callback(this.responseText);
                }
            };

            request.send();
        }
    }
};