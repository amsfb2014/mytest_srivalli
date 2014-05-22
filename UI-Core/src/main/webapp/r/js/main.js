/*! main */
require.config({
	waitSeconds: 600,
	baseUrl: "../r/js",
    paths: {

        /*baseUrl: "../js/",*/

        tpl: "../tpl",

        jquery: "../../js/lib/jquery",
        "jquery-ui": "../../js/lib/jquery-ui",
        underscore: "../../js/lib/lodash.underscore",
        backbone: "../../js/lib/backbone",

        // require plugins
        text: "../../js/lib/text"

    },

    shim: {
    	"jquery-ui": {
            exports: "$",
            deps: ['jquery']
        },
        "backbone": {
            deps: [ "underscore", "jquery"],
            exports: "Backbone"
        }

    }

});


require([
    "jquery",
    "underscore",
    "backbone",
    "view/prelogin/HeaderView",
    "view/prelogin/IndexView",
    "view/prelogin/FooterView"
], function($, _, Backbone, HeaderView, IndexView, FooterView) {

    var AppRouter = Backbone.Router.extend({
        routes: {
            "": "index",
            "index": "index",
            "learnmore": "learnmore",
            "get_started": "get_started",
            "phones_supported": "phones_supported",
            "faqs": "faqs",
            "terms": "terms",
            "privacy": "privacy",
            "sms_disclosure": "sms_disclosure",
            "contact": "contact",
            "retrieve_pin": "retrieve_pin",
            "login_failed": "login_failed",
            "login_invalid": "login_invalid",
            "account_canceled": "account_canceled",
            "account_denied": "account_denied",
            "account_locked": "account_locked",
            "password_failed": "password_failed",
            "password_failednoaccount": "password_failednoaccount",
            "password_failedlockedaccount": "password_failedlockedaccount",
            "password_failednoemail": "password_failednoemail",
            "password_reset": "password_reset",
            "password_reset_failed": "password_reset_failed",
            "password_reset_successful": "password_reset_successful",
            "password_retrieve_option": "password_retrieve_option",
            "password_retrieve_secure": "password_retrieve_secure",
            "password_sent_email": "password_sent_email",
            "download_mobile_app": "download_mobile_app",
            "download_mobile_app_eligible": "download_mobile_app_eligible",
            "download_mobile_app_noteligible": "download_mobile_app_noteligible",
            "help": "help",
            "help_locatephone": "help_locatephone",
            "help_soundalarm": "help_soundalarm",
            "help_lockphone": "help_lockphone",
            "help_secure_phone": "help_secure_phone",
            "help_erasecontacts": "help_erasecontacts",
            "help_synccontacts": "help_synccontacts",
            "help_transfercontacts": "help_transfercontacts",
            "help_managecontacts": "help_managecontacts",
            "help_security": "help_security",
            "help_safebrowsing": "help_safebrowsing",
            "help_appassist": "help_appassist",
            "help_diagnosticscan": "help_diagnosticscan",
            "help_faqs": "help_faqs",
            "page_not_available": "page_not_available",
            "site_error": "site_error",
            "site_under_construction": "site_under_construction",
            "site_under_maintenance": "site_under_maintenance",
            'password_retrieve_secure?*queryString' : 'showSecurityQuestion',
            'password_retrieve_secure_wrong?*queryString': 'password_retrieve_secure_wrong'
        },
        initialize: function() {
        	$('#helpWrapper').hide();
        	$("#LoginForm").hide();
            $('#wrapper').show();
            var headerView = new HeaderView().render();
            var footerView = new FooterView().render();
			
			// for debug mode switching
			var isDebugMode = this._getParameterByName("debug");
			if(isDebugMode !== "") {
				AMA.Util.setCookie("debugmode", isDebugMode === "true", 1);
			}
        },
		
		_getParameterByName: function(name) {
			name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
			var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
				results = regex.exec(location.search);
			return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
		},
		
		
        index: function() {
        	$("#LoginForm").show();
        	$("link[href='css/main_css.css']").remove();
            $("link[href='css/main_css-min.css']").remove();
			//$("#header_container, #footer_container ,#dialog").hide();
			require(["view/prelogin/IndexView"], function(IndexView) {
				var indexView = new IndexView().render();
			});
        },
        get_started: function() {
        	$("#LoginForm").hide();
            require(["view/prelogin/GetStartedView"], function(GetStartedView) {
                var getStartedView = new GetStartedView().render();
            });
        },
        learnmore: function() {
        	$("#LoginForm").hide();
            require(["view/prelogin/LearnMoreView"], function(LearnMoreView) {
                var learnMoreView = new LearnMoreView().render();
            });
        },
        phones_supported: function() {
        	$("#LoginForm").hide();
            require(["view/prelogin/PhonesSupportedView"], function(PhonesSupportedView) {
                var phonesSupportedView = new PhonesSupportedView().render();
            });
        },
        faqs: function() {
        	$("#LoginForm").hide();
            require(["view/prelogin/FaqsView"], function(FaqsView) {
                var FfqsView = new FaqsView().render();
            });
        },
        terms: function() {
        	$("#LoginForm").hide();
            require(["view/prelogin/TermsView"], function(TermsView) {
                var termsView = new TermsView().render();
            });
        },
        privacy: function() {
        	$("#LoginForm").hide();
            require(["view/prelogin/PrivacyView"], function(PrivacyView) {
                var privacyView = new PrivacyView().render();
            });
        },
        sms_disclosure: function() {
            require(["view/prelogin/SmsDisclosureView"], function(SmsDisclosure) {
                var smsDisclosure = new SmsDisclosure().render();
            });
        },
        contact: function() {
        	$("#LoginForm").hide();
            require(["view/prelogin/ContactUsView"], function(ContactUsView) {
                var contactUsView = new ContactUsView().render();
            });
        },
        retrieve_pin: function() {
        	$("#LoginForm").hide();
            require(["view/prelogin/RetrievePinView"], function(RetrievePinView) {
                var retrievePinView = new RetrievePinView().render();
            });
        },
        login_failed: function() {
            require(["view/prelogin/LoginFailedView"], function(LoginFailedView) {
                var loginFailedView = new LoginFailedView().render();
            });
        },
        login_invalid: function() {
        	$("#LoginForm").show();
            require(["view/prelogin/LoginInvalidView"], function(LoginInvalidView) {
                var loginInvalidView = new LoginInvalidView().render();
            });
        },
        account_canceled: function() {
            require(["view/prelogin/AccountCanceledView"], function(AccountCanceledView) {
                var accountCanceledView = new AccountCanceledView().render();
            });
        },
        account_denied: function() {
            require(["view/prelogin/AccountDeniedView"], function(AccountDeniedView) {
                var accountDeniedView = new AccountDeniedView().render();
            });
        },
        account_locked: function() {
        	$("#LoginForm").hide();
            require(["view/prelogin/AccountLockedView"], function(AccountLockedView) {
                var accountLockedView = new AccountLockedView().render();
            });
        },
        password_failed: function() {
            require(["view/prelogin/PasswordFailedView"], function(PasswordFailedView) {
                var passwordFailedView = new PasswordFailedView().render();
            });
        },
        password_failednoaccount: function() {
            require(["view/prelogin/PasswordFailedNoAccountView"], function(PasswordFailedNoAccountView) {
                var passwordFailedNoAccountView = new PasswordFailedNoAccountView().render();
            });
        },
        password_failedlockedaccount: function() {
            require(["view/prelogin/PasswordFailedLockedAccountView"], function(PasswordFailedLockedAccountView) {
                var passwordFailedLockedAccountView = new PasswordFailedLockedAccountView().render();
            });
        },
        password_failednoemail: function() {
            require(["view/prelogin/PasswordFailedNoEmailView"], function(PasswordFailedNoEmailView) {
                var passwordFailedNoEmailView = new PasswordFailedNoEmailView().render();
            });
        },
        password_reset: function() {
            require(["view/prelogin/PasswordResetView"], function(PasswordResetView) {
                var passwordResetView = new PasswordResetView().render();
            });
        },
        password_reset_failed: function() {
            require(["view/prelogin/PasswordResetFailedView"], function(PasswordResetFailedView) {
                var passwordResetFailedView = new PasswordResetFailedView().render();
            });
        },
        password_reset_successful: function() {
            require(["view/prelogin/PasswordResetSuccessfulView"], function(PasswordResetSuccessfulView) {
                var passwordResetSuccessfulView = new PasswordResetSuccessfulView().render();
            });
        },
        password_retrieve_option: function() {
            require(["view/prelogin/PasswordRetrieveOptionView"], function(PasswordRetrieveOptionView) {
                var passwordRetrieveOptionView = new PasswordRetrieveOptionView().render();
            });
        },
        password_retrieve_secure: function() {
            require(["view/prelogin/PasswordRetrieveSecureView"], function(PasswordRetrieveSecureView) {
                var passwordRetrieveSecureView = new PasswordRetrieveSecureView().render();
            });
        },
        password_retrieve_secure_wrong: function() {
            require(["view/prelogin/PasswordRetrieveSecureWrongView"], function(PasswordRetrieveSecureWrongView) {
                var passwordRetrieveSecureWrongView = new PasswordRetrieveSecureWrongView().render();
            });
        },
        password_sent_email: function() {
        	$("#LoginForm").hide();
            require(["view/prelogin/PasswordSentEmailView"], function(PasswordSentEmailView) {
                var passwordSentEmailView = new PasswordSentEmailView().render();
            });
        },
        help: function() {
            $('#wrapper').hide();
            $('#helpWrapper').show();
            require(["view/help/HelpSideNavView", "view/help/HelpView"], function(HelpSideNavView, HelpView) {
                var helpSideNavView = new HelpSideNavView().render();
                var helpView = new HelpView().render();
            });
        },
        help_locatephone: function() {
            require(["view/help/HelpLocatePhoneView"], function(HelpLocatePhoneView) {
                var helpLocatePhoneView = new HelpLocatePhoneView().render();
            });
        },
        help_soundalarm: function() {
            require(["view/help/HelpSoundAlarmView"], function(HelpSoundAlarmView) {
                var helpSoundAlarmView = new HelpSoundAlarmView().render();
            });
        },
        help_lockphone: function() {
            require(["view/help/HelpLockPhoneView"], function(HelpLockPhoneView) {
                var helpLockPhoneView = new HelpLockPhoneView().render();
            });
        },
        help_erasecontacts: function() {
            require(["view/help/HelpEraseContactsView"], function(HelpEraseContactsView) {
                var helpEraseContactsView = new HelpEraseContactsView().render();
            });
        },
        help_synccontacts: function() {
            require(["view/help/HelpSyncContactsView"], function(HelpSyncContactsView) {
                var helpSyncContactsView = new HelpSyncContactsView().render();
            });
        },
        help_secure_phone: function() {
            require(["view/help/HelpSecurePhoneView"], function(HelpSecurePhoneView) {
                var HelpSecurePhone = new HelpSecurePhoneView().render();
            });
        },
        help_transfercontacts: function() {
            require(["view/help/HelpTransferContactsView"], function(HelpTransferContactsView) {
                var helpTransferContactsView = new HelpTransferContactsView().render();
            });
        },
        help_managecontacts: function() {
            require(["view/help/HelpManageContactsView"], function(HelpManageContactsView) {
                var helpManageContactsView = new HelpManageContactsView().render();
            });
        },
        help_security: function() {
            require(["view/help/HelpSecurityView"], function(HelpSecurityView) {
                var helpSecurityView = new HelpSecurityView().render();
            });
        },
        
        help_appassist: function() {
            require(["view/help/HelpAppAssistView"], function(HelpAppAssistView) {
                var helpAppAssistView = new HelpAppAssistView().render();
            });
        },
        help_safebrowsing: function() {
            require(["view/help/HelpSafeBrowsingView"], function(HelpSafeBrowsingView) {
                var helpSafeBrowsingView = new HelpSafeBrowsingView().render();
            });
            },
      
        help_diagnosticscan: function() {
            require(["view/help/HelpDiagnosticScanView"], function(HelpDiagnosticScanView) {
                var helpDiagnosticScanView = new HelpDiagnosticScanView().render();
            });
        },
        help_faqs: function() {
            require(["view/help/HelpFaqsView"], function(HelpFaqsView) {
                var helpFaqsView = new HelpFaqsView().render();
            });
        },
        download_mobile_app: function() {
            require(["view/prelogin/DownloadMobileAppView"], function(DownloadMobileAppView) {
                var downloadMobileAppView = new DownloadMobileAppView().render();
            });
        },
        download_mobile_app_eligible: function() {
            require(["view/prelogin/DownloadMobileAppEligibleView"], function(DownloadMobileAppEligibleView) {
                var downloadMobileAppEligibleView = new DownloadMobileAppEligibleView().render();
            });
        },
        download_mobile_app_noteligible: function() {
            require(["view/prelogin/DownloadMobileAppNotEligibleView"], function(DownloadMobileAppNotEligibleView) {
                var downloadMobileAppNotEligibleView = new DownloadMobileAppNotEligibleView().render();
            });
        },
        page_not_available: function() {
            require(["view/prelogin/PageNotAvailableView"], function(PageNotAvailableView) {
                var pageNotAvailableView = new PageNotAvailableView().render();
            });
        },
        site_error: function() {
            require(["view/prelogin/SiteErrorView"], function(SiteErrorView) {
                var siteErrorView = new SiteErrorView().render();
            });
        },
        site_under_construction: function() {
            require(["view/prelogin/SiteUnderConstructionView"], function(SiteUnderConstructionView) {
                var siteUnderConstructionView = new SiteUnderConstructionView().render();
            });
        },
        site_under_maintenance: function() {
            require(["view/prelogin/SiteUnderMaintenanceView"], function(SiteUnderMaintenanceView) {
                var SiteUnderMaintenanceView = new SiteUnderMaintenanceView().render();
            });
        },
        other: function() {
            this.index();
        },
        showSecurityQuestion: function(queryString) {
            require(["view/prelogin/PasswordRetrieveSecureView"], function(PasswordRetrieveSecureView) {
                var passwordRetrieveSecureView = new PasswordRetrieveSecureView().render();
                var params = parseQueryString(queryString);
                window.q = queryString;
                if(params){
                	var securityQuestion = unescape(params.securityquestion).replace(/\+/g, " ");
                	var securityQuestionSpan = document.getElementById("securityquestion");
                	securityQuestionSpan.innerHTML = securityQuestion;
                }         
            });       	
        }
    });
    
 // and the function that parses the query string can be something like : 
    function parseQueryString (queryString){
        var params = {};
        if(queryString){
            _.each(
                _.map(decodeURI(queryString).split(/&/g),function(el,i){
                    var aux = el.split('='), o = {};
                    if(aux.length >= 1){
                        var val = undefined;
                        if(aux.length == 2)
                            val = aux[1];
                        o[aux[0]] = val;
                    }
                    return o;
                }),
                function(o){
                    _.extend(params,o);
                }
            );
        }
        return params;
    }

    $(document).ready(function() {
        var appRouter = new AppRouter();
        Backbone.history.start();
    });

});
