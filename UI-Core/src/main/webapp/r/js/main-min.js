/*! main */
require.config({waitSeconds:600,baseUrl:"../r/js",paths:{tpl:"../tpl",jquery:"../../js/lib/jquery","jquery-ui":"../../js/lib/jquery-ui",underscore:"../../js/lib/lodash.underscore",backbone:"../../js/lib/backbone",text:"../../js/lib/text"},shim:{"jquery-ui":{exports:"$",deps:["jquery"]},backbone:{deps:["underscore","jquery"],exports:"Backbone"}}});require(["jquery","underscore","backbone","view/prelogin/HeaderView","view/prelogin/IndexView","view/prelogin/FooterView"],function(e,b,h,c,d,a){var g=h.Router.extend({routes:{"":"index",index:"index",learnmore:"learnmore",get_started:"get_started",phones_supported:"phones_supported",faqs:"faqs",terms:"terms",privacy:"privacy",sms_disclosure:"sms_disclosure",contact:"contact",retrieve_pin:"retrieve_pin",login_failed:"login_failed",login_invalid:"login_invalid",account_canceled:"account_canceled",account_denied:"account_denied",account_locked:"account_locked",password_failed:"password_failed",password_failednoaccount:"password_failednoaccount",password_failedlockedaccount:"password_failedlockedaccount",password_failednoemail:"password_failednoemail",password_reset:"password_reset",password_reset_failed:"password_reset_failed",password_reset_successful:"password_reset_successful",password_retrieve_option:"password_retrieve_option",password_retrieve_secure:"password_retrieve_secure",password_sent_email:"password_sent_email",download_mobile_app:"download_mobile_app",download_mobile_app_eligible:"download_mobile_app_eligible",download_mobile_app_noteligible:"download_mobile_app_noteligible",help:"help",help_locatephone:"help_locatephone",help_soundalarm:"help_soundalarm",help_lockphone:"help_lockphone",help_secure_phone:"help_secure_phone",help_erasecontacts:"help_erasecontacts",help_synccontacts:"help_synccontacts",help_transfercontacts:"help_transfercontacts",help_managecontacts:"help_managecontacts",help_security:"help_security",help_safebrowsing:"help_safebrowsing",help_appassist:"help_appassist",help_diagnosticscan:"help_diagnosticscan",help_faqs:"help_faqs",page_not_available:"page_not_available",site_error:"site_error",site_under_construction:"site_under_construction",site_under_maintenance:"site_under_maintenance","password_retrieve_secure?*queryString":"showSecurityQuestion","password_retrieve_secure_wrong?*queryString":"password_retrieve_secure_wrong"},initialize:function(){e("#helpWrapper").hide();e("#LoginForm").hide();e("#wrapper").show();var k=new c().render();var j=new a().render();var i=this._getParameterByName("debug");if(i!==""){AMA.Util.setCookie("debugmode",i==="true",1)}},_getParameterByName:function(i){i=i.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");var k=new RegExp("[\\?&]"+i+"=([^&#]*)"),j=k.exec(location.search);return j==null?"":decodeURIComponent(j[1].replace(/\+/g," "))},index:function(){e("#LoginForm").show();e("link[href='css/main_css.css']").remove();e("link[href='css/main_css-min.css']").remove();require(["view/prelogin/IndexView"],function(j){var i=new j().render()})},get_started:function(){e("#LoginForm").hide();require(["view/prelogin/GetStartedView"],function(i){var j=new i().render()})},learnmore:function(){e("#LoginForm").hide();require(["view/prelogin/LearnMoreView"],function(j){var i=new j().render()})},phones_supported:function(){e("#LoginForm").hide();require(["view/prelogin/PhonesSupportedView"],function(j){var i=new j().render()})},faqs:function(){e("#LoginForm").hide();require(["view/prelogin/FaqsView"],function(i){var j=new i().render()})},terms:function(){e("#LoginForm").hide();require(["view/prelogin/TermsView"],function(j){var i=new j().render()})},privacy:function(){e("#LoginForm").hide();require(["view/prelogin/PrivacyView"],function(i){var j=new i().render()})},sms_disclosure:function(){require(["view/prelogin/SmsDisclosureView"],function(j){var i=new j().render()})},contact:function(){e("#LoginForm").hide();require(["view/prelogin/ContactUsView"],function(j){var i=new j().render()})},retrieve_pin:function(){e("#LoginForm").hide();require(["view/prelogin/RetrievePinView"],function(j){var i=new j().render()})},login_failed:function(){require(["view/prelogin/LoginFailedView"],function(j){var i=new j().render()})},login_invalid:function(){e("#LoginForm").show();require(["view/prelogin/LoginInvalidView"],function(j){var i=new j().render()})},account_canceled:function(){require(["view/prelogin/AccountCanceledView"],function(j){var i=new j().render()})},account_denied:function(){require(["view/prelogin/AccountDeniedView"],function(j){var i=new j().render()})},account_locked:function(){e("#LoginForm").hide();require(["view/prelogin/AccountLockedView"],function(i){var j=new i().render()})},password_failed:function(){require(["view/prelogin/PasswordFailedView"],function(i){var j=new i().render()})},password_failednoaccount:function(){require(["view/prelogin/PasswordFailedNoAccountView"],function(j){var i=new j().render()})},password_failedlockedaccount:function(){require(["view/prelogin/PasswordFailedLockedAccountView"],function(i){var j=new i().render()})},password_failednoemail:function(){require(["view/prelogin/PasswordFailedNoEmailView"],function(i){var j=new i().render()})},password_reset:function(){require(["view/prelogin/PasswordResetView"],function(j){var i=new j().render()})},password_reset_failed:function(){require(["view/prelogin/PasswordResetFailedView"],function(j){var i=new j().render()})},password_reset_successful:function(){require(["view/prelogin/PasswordResetSuccessfulView"],function(j){var i=new j().render()})},password_retrieve_option:function(){require(["view/prelogin/PasswordRetrieveOptionView"],function(i){var j=new i().render()})},password_retrieve_secure:function(){require(["view/prelogin/PasswordRetrieveSecureView"],function(j){var i=new j().render()})},password_retrieve_secure_wrong:function(){require(["view/prelogin/PasswordRetrieveSecureWrongView"],function(j){var i=new j().render()})},password_sent_email:function(){e("#LoginForm").hide();require(["view/prelogin/PasswordSentEmailView"],function(i){var j=new i().render()})},help:function(){e("#wrapper").hide();e("#helpWrapper").show();require(["view/help/HelpSideNavView","view/help/HelpView"],function(i,l){var j=new i().render();var k=new l().render()})},help_locatephone:function(){require(["view/help/HelpLocatePhoneView"],function(i){var j=new i().render()})},help_soundalarm:function(){require(["view/help/HelpSoundAlarmView"],function(i){var j=new i().render()})},help_lockphone:function(){require(["view/help/HelpLockPhoneView"],function(j){var i=new j().render()})},help_erasecontacts:function(){require(["view/help/HelpEraseContactsView"],function(j){var i=new j().render()})},help_synccontacts:function(){require(["view/help/HelpSyncContactsView"],function(i){var j=new i().render()})},help_secure_phone:function(){require(["view/help/HelpSecurePhoneView"],function(i){var j=new i().render()})},help_transfercontacts:function(){require(["view/help/HelpTransferContactsView"],function(j){var i=new j().render()})},help_managecontacts:function(){require(["view/help/HelpManageContactsView"],function(i){var j=new i().render()})},help_security:function(){require(["view/help/HelpSecurityView"],function(j){var i=new j().render()})},help_appassist:function(){require(["view/help/HelpAppAssistView"],function(j){var i=new j().render()})},help_safebrowsing:function(){require(["view/help/HelpSafeBrowsingView"],function(i){var j=new i().render()})},help_diagnosticscan:function(){require(["view/help/HelpDiagnosticScanView"],function(j){var i=new j().render()})},help_faqs:function(){require(["view/help/HelpFaqsView"],function(j){var i=new j().render()})},download_mobile_app:function(){require(["view/prelogin/DownloadMobileAppView"],function(i){var j=new i().render()})},download_mobile_app_eligible:function(){require(["view/prelogin/DownloadMobileAppEligibleView"],function(i){var j=new i().render()})},download_mobile_app_noteligible:function(){require(["view/prelogin/DownloadMobileAppNotEligibleView"],function(i){var j=new i().render()})},page_not_available:function(){require(["view/prelogin/PageNotAvailableView"],function(j){var i=new j().render()})},site_error:function(){require(["view/prelogin/SiteErrorView"],function(j){var i=new j().render()})},site_under_construction:function(){require(["view/prelogin/SiteUnderConstructionView"],function(i){var j=new i().render()})},site_under_maintenance:function(){require(["view/prelogin/SiteUnderMaintenanceView"],function(i){var i=new i().render()})},other:function(){this.index()},showSecurityQuestion:function(i){require(["view/prelogin/PasswordRetrieveSecureView"],function(m){var k=new m().render();var n=f(i);window.q=i;if(n){var l=unescape(n.securityquestion).replace(/\+/g," ");var j=document.getElementById("securityquestion");j.innerHTML=l}})}});function f(j){var i={};if(j){b.each(b.map(decodeURI(j).split(/&/g),function(m,l){var k=m.split("="),p={};if(k.length>=1){var n=undefined;if(k.length==2){n=k[1]}p[k[0]]=n}return p}),function(k){b.extend(i,k)})}return i}e(document).ready(function(){var i=new g();h.history.start()})});