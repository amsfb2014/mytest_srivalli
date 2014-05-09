/*! landing */

var errorStrings = {
	msgTitle: $("#msgTitle").val(),
	msgTitleEmail: $("#msgTitleEmail").val(),
	msgValidateEmail: $("#msgValidateEmail").val(),
	msgValidateEmptyPassword: $("#msgValidateEmptyPassword").val(),
	msgValidatePasswordLength: $("#msgValidatePasswordLength").val(),
	msgValidateSpecialChars: $("#msgValidateSpecialChars").val(),
	msgValidateConfirmPassword: $("#msgValidateConfirmPassword").val(),
	msgRetrievePin: $("#msgRetrievePin").val(),
	validationMessageSecurityAnswer: $("#validationMessageSecurityAnswer").val()
};

function clearInput(element, text) {

    if (element.value === text) {

        element.value = "";
    }

    if (element.name === "password_text") {

        element.style.display = "none";
        document.login.actualPassword.style.display = "block";
        document.login.actualPassword.focus();

    } else if (element.name === "newpin_text") {

        element.style.display = "none";
        document.updateAccountPassword.newpin1.style.display = "block";
        document.updateAccountPassword.newpin1.focus();

    } else if (element.name === "confirmpin_text") {

        element.style.display = "none";
        document.updateAccountPassword.confirmpin1.style.display = "block";
        document.updateAccountPassword.confirmpin1.focus();
    }
}

function restoreInput(element, text) {

    if (element.value === "") {

        if (element.name === "password") {

            element.style.display = "none";
            document.login.password_text.style.display = "block";

        } 
        else if(element.name === "actualPassword")
        {
                 element.style.display = "none";
             document.login.password_text.style.display = "block";
        }
        else if (element.name === "newpin") {

            element.style.display = "none";
            document.updateAccountPassword.newpin_text.style.display = "block";

        } else if (element.name === "confirmpin") {

            element.style.display = "none";
            document.updateAccountPassword.confirmpin_text.style.display = "block";

        } else {
            element.value = text;
        }
    }
    return;
}


/* 
 * validates the phone number and the pin enter by end user and 
 * displays error dialog in case the validation fails
 * @param {HTMLFormObj} form
 * @param {String} language
 * @return {Boolean} 
 */
function validateLogin(form) {
    var request = new XMLHttpRequest(),
        method = "GET",
        url = AMA.config.securityHostUrl + "/secretPair?devId=" + AMA.config.devId;

    if ("withCredentials" in request) {
        request.open(method, url, true);
    }
    else if (typeof XDomainRequest != "undefined"){
        request = new XDomainRequest();
        request.open(method, url);
    }
    else {
        request = null;
    }

    if (request) {
        request.onerror = function(){
            AMA.debug("Error in retrieving secret pair.");
            //window.location.hash = "#login_invalid";
        };

        request.onload = function () {
            try{
                var response = JSON.parse(this.responseText);
            }
            catch(err){
                //Chrome and Firefox error handling
                AMA.debug("Error in retrieving secret pair.");
                //window.location.hash = "#login_invalid";
            }

            if (response) {
                var dto = {};

                dto.secretKey = response.secretKey;
                dto.secretHandle = response.handle;
                form.secrethandle.value = response.handle;
                dto.ivr = response.initVector;
                key = CryptoJS.enc.Hex.parse(dto.secretKey);
                iv = CryptoJS.enc.Hex.parse(dto.ivr);
                encryptedPassword = CryptoJS.AES.encrypt($('#actualPassword').val(), key, { iv: iv });
                
                dto.username = (form.username1) ? form.username1.value : form.username.value;
                form.password.value = encryptedPassword;
                form.actualPassword.value = null;
                dto.password = form.password.value;

                performLogin(dto);
            }
        };

        request.send();
    }
}

function performLogin(obj) {
    var secureCookie = AMA.envs[location.hostname].secureProtocol ? ";secure" : "",
        request = new XMLHttpRequest(),
        method = "POST",
        url = AMA.config.securityHostUrl + "/authtoken?devId=" + AMA.config.devId,
        dto = {};

    if (obj) {
        dto.username = obj.username;
        dto.password = obj.password;
        dto.secrethandle = obj.secretHandle;
    }
    else {
        return;
    }

    if ("withCredentials" in request) {
        request.open(method, url, true);
    }
    else if (typeof XDomainRequest != "undefined"){
        request = new XDomainRequest();
        request.open(method, url);
    }
    else {
        request = null;
    }

    if (request) {
        //Internet Explorer error handling
        request.onerror = function(){
            AMA.debug("ERROR: Request to " + url + " failed. Invalid login.");
                window.location.hash = "#login_invalid";
        };

        request.onload = function () {
			try{
				// if user does not exist, stop processing.
				if(request.status === 401) {
					AMA.debug("User [" + obj.username + "] does not exist.");
					
					window.location.hash = "#login_invalid";
					return;
				}
			
				// continue if username exists
				var response = JSON.parse(this.responseText);
				
				if(response.accountStatus === "LOCKED") {
					
					AMA.debug("No authToken received. Invalid login. Account locked.");
					window.location.hash = "#login_invalid";
					setTimeout(function() {
						window.location.hash = "#account_locked";
					}, 100);
					
				} else if(response.finalAttempt) {
					
					AMA.debug("No authToken received. Invalid login. Final attempt.");
					window.location.hash = "#login_failed";
					
				} else if (!response.authToken && !response.accountId && !response.endpointId) {					
					
					AMA.debug("No authToken received. Invalid login.");
					window.location.hash = "#login_invalid";
					
				} else {
				
					AMA.debug("authToken has been successfully received. Login successful");
					
					// save tokens to cookie
					document.cookie = "authToken=" + response.authToken + secureCookie;
					document.cookie = "endpointId=" + response.endpointId + secureCookie;
					document.cookie = "accountId=" + response.accountId + secureCookie;
					document.cookie = "csrfToken=" + response.csrfToken + secureCookie;
					
					//document.login.submit();
					window.location = "dashboard.html";
				}
				
            }
            catch(err){
				// Chrome and Firefox error handling
                AMA.debug("No authToken received. Invalid login.");
                window.location.hash = "#login_invalid";
            }
        };

        request.send(JSON.stringify(dto));
    }
}

/* 
 * validates email address.
 * @param {htmlFormObj}  form
 * @return {Boolean}
 */
function validateEmail(form) {
    
    var regExp = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i,
        emailAddress = (form.username1) ? form.username1.value : form.username.value;

    if (!regExp.test(emailAddress)) {
        
        showDialog(true, errorStrings.msgTitleEmail, 448, errorStrings.msgValidateEmail);
        return false;
    }
    return true;
}


/* 
 * validates PIN length and checks whether old and new pin are same.
 * @param {htmlFormObj}  form
 * @return {Boolean}
 * PIN/Password rules: All new PINs should be 6-15 alpha numeric characters. NO special characters allowed.
 * PIN/Password rules: Since old Android clients used to allow characters, 
 *                          we need won't apply any validation to passwords during login.
 */

function validatePIN(form) {

    var newPIN = $.trim(form.newpin1.value),
        confirmPIN = $.trim(form.confirmpin1.value),
        characterReg = /^\s*[a-zA-Z0-9,\s]+\s*$/,
        error = "";

    if (newPIN.length < 6 || newPIN.length > 15) {

        error += errorStrings.msgValidatePasswordLength;
    }
    if (newPIN.length > 0 && !characterReg.test(newPIN)) {

        error += errorStrings.msgValidateSpecialChars;
    }

    if (newPIN !== confirmPIN) {

        error += errorStrings.msgValidateConfirmPassword;
    }

    //No validation errors
    if(error == ""){
        return true;
    }

    showDialog(true, errorStrings.msgTitle, 448, error);
    return false;
}


/*
 * Ajax call to get the secret key and handle to encrypt the new password and confirm password
 */
function encryptForgotPassword(form) {
    $.ajax({
            url: "../security.do?method=getSecretPair",
            type: "POST",
            data: "",
            dataType: "json",
            async: false,
            success: function (result) {
                if(result !== null) {
                    var secretKey = result.secretKey;
                    var secretHandle = result.secretHandle;
                    var ivr = result.iv;
                    var key = CryptoJS.enc.Hex.parse(secretKey);
                    var iv = CryptoJS.enc.Hex.parse(ivr);
                    var newpin = CryptoJS.AES.encrypt($('#newpin1').val(), key, { iv: iv });
                    var confirmpin = CryptoJS.AES.encrypt($('#confirmpin1').val(), key, { iv: iv });
                    form.newpin.value = newpin;
                    form.confirmpin.value = confirmpin;
                    form.secrethandle.value = secretHandle;
                    $(form.newpin1).attr("disabled", "disabled");
                    $(form.confirmpin1).attr("disabled", "disabled");
                    document.updateAccountPassword.submit();
                } else {
                    form.newpin.value = form.newpin1.value;
                    form.confirmpin.value = form.confirmpin1.value;
                    $(form.newpin1).attr("disabled", "disabled");
                    $(form.confirmpin1).attr("disabled", "disabled");
                    form.submit();
                }   
            },
            error: function () {
                AMA.debug("Error Receiving Secret Keys");
            }
        });
}


/* 
 * Validates method selection(PIN, SMS or email) for password retrieval, 
 * displays error dialog in case of failure 
 * @param {String} parameterName
 * @return {Boolean}
 */

function setSendPasswordType(form) {

    var message;
    if (form.type[0].checked) {

        form.sendType.value = form.type[0].value;
        return true;
    } else if ((document.sendpasswd.type[1].checked)) {

        form.sendType.value = form.type[1].value;
        return true;
    }

    message = errorStrings.validatePasswordSentMethod;
    showDialog(true, errorStrings.sentPasswordFailed, 448, message);
    return false;
}


function checkSecurityAnswer(form) {
    if (form.securityanswer.value !== "") {
        // Santizing the input data using xss validator
        form.securityanswer.value = xssClean(form.securityanswer.value);
        return true;
    }

    showDialog(true, errorStrings.msgRetrievePin, 448, errorStrings.validationMessageSecurityAnswer);
    return false;
}

/* 
 * Strips out special characters from the given array
 * @param {Array} s
 * @param {String} bag
 * @return {String}
 */
function stripCharsInBag(s, bag) {

    var i, c, returnString = "";

    for (i = 0; i < s.length; i++) {

        c = s.charAt(i);
        if (bag.indexOf(c) === -1) returnString += c;
    }

    return returnString;
}

/* 
 * Retrieves the value for particular parameter from the url containing the query string,
 * returns value if parameter is found or else returns null 
 * @param {String} parameterName
 * @return {String}
 * @return {NULL}
 */

function getQueryValue(parameterName) {

    var i, nameValue, name, value,
        dividedLocation = window.location.href.split("?"),
        queryString = dividedLocation[1],
        pairs = queryString !== null ? queryString.split("&") : [];

    for (i = 0; i < pairs.length; i++) {

        nameValue = pairs[i].split("=");
        name = nameValue[0];

        if (name === parameterName) {
            value = nameValue[1];
            return value;
        }
    }
    return null;
}

/* 
 * Displays jquery dialog box. 
 * @param {String} displayTitle
 * @param {String} titleText
 * @param {Integer} width
 * @param {String} dialogMessage
 * @param {String} id
 */

function showDialog(displayTitle, titleText, width, dialogMessage) {

    $("#dialog").dialog({
        modal: true,
        resizable: false,
        position: ['center', 150],
        title: titleText,
        minHeight: 75,
        width: width
    });

    if (!displayTitle) {

        $(".ui-dialog-titlebar").hide();
    }

    $(".ui-widget-overlay").css("width", "100%");
    $(".ui-widget-overlay").css("height", "100%");
    $(".dialogMessage").html(dialogMessage);
}

/*
 * Hides dialog box 
 */

function hideDialog() {
    $("#dialog").dialog("close");
}

/** Creates a CORS request
* From: http://www.nczonline.net/blog/2010/05/25/cross-domain-ajax-with-cross-origin-resource-sharing/
* 
* @param {String} method
* @param {String} url
* 
* @return {Object} xhr
*/
function createCORSRequest(method, url) {
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
	}
	// Browser doesn't support CORS requests
	else {
		xhr = null;
	}

	return xhr;
}
	

/** Utility to get a secret pair for encrypting passwords
 *
 *  @param {Function} Code to be executed after Ajax request
 *  @return {String} Secret Pair
 */
function getSecretPair(callback) {
    // Check that a callback function is specified
    if (!callback || typeof callback != "function") {
        AMA.error("Error: A callback function must be specified. Aborting.");
        return;
    }

    var url = AMA.config.securityHostUrl + "/secretPair?devId=" + AMA.config.devId,
        request = createCORSRequest("GET", url);

    if (request) {
        request.onerror = function(){
            AMA.debug("Error in retrieving secret pair.");
        };

        request.onload = function () {
            try{
                callback(JSON.parse(this.responseText));
            }
            catch(err){
                //Chrome and Firefox error handling
                AMA.debug("Error in retrieving secret pair.");
                callback(null);
            }
        };

        request.send();
    }
}

function getCookie(c_name) {
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
}

function setCookie(c_name,value,expiredays) {
	var exdate=new Date();
	exdate.setDate(exdate.getDate()+expiredays);
	document.cookie=c_name+ "=" +escape(value)+
	((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
}

$(function() {

    $("#dialogBtn").on("click", function(event){
        hideDialog();
    });
    
});