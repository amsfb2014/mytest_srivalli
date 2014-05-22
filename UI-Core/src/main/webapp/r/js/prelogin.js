/*! ContactUsView */
define([
    "jquery",
    "underscore",
    "backbone",
    "text!tpl/prelogin/contact_us.html"
], function($, _, Backbone, Template) {

    var View = Backbone.View.extend({

        el: '#body_container',

        template: _.template(Template),

        initialize: function() {
            $('#index_li').siblings().removeAttr('class');
        },

        render: function() {
            var self = this;
                
            this.$el.html(this.template);

            return this;
        }

    });

    return View;

});

/*! FaqsView */
define([
    "jquery",
    "underscore",
    "backbone",
    "text!tpl/prelogin/faqs.html"
], function($, _, Backbone, Template) {

    var View = Backbone.View.extend({

        el: '#body_container',

        template: _.template(Template),

        initialize: function() {
            $('#sideNav_faqs').siblings().removeAttr('class');
            $('#learnmore_li').siblings().removeAttr('class');
        },

        render: function() {
            var self = this;
                
            this.$el.html(this.template);

            //set current highlighted item/element
            $('#sideNav_faqs').addClass('selected');
            $('#learnmore_li').addClass('selected');

            return this;
        }

    });

    return View;

});

/*! FooterView */
define([
    "jquery",
    "underscore",
    "backbone",
    "text!tpl/prelogin/footer.html"
], function($, _, Backbone, Template) {

    var View = Backbone.View.extend({

        el: '#footer_containerarea',

        template: _.template(Template),

        render: function() {
            var self = this;
                
            this.$el.html(this.template);
            return this;
        },        
        events: {
            "click #termstext, #privacytext, #contacttext": "hideLogin"
        },
        hideLogin: function(ev){
        	$( "#LoginForm" ).addClass("hidden-md hidden-sm hidden-lg");
        	$('#logincontainer').each(function(index) {
				$(this).children().each (function() { 
					var olink = $(this).attr("id");
					$("#"+olink).removeClass("preloginLinksSelected");
				})
        	});
        }          

    });

    return View;

});

/*! GetStartedView */
define([
    "jquery",
    "underscore",
    "backbone",
    "text!tpl/prelogin/get_started.html"
], function($, _, Backbone, Template) {

    var View = Backbone.View.extend({

        el: '#body_container',

        template: _.template(Template),

        initialize: function() {
            $('#index_li').siblings().removeAttr('class');
        },

        render: function() {
            var self = this;
                
            this.$el.html(this.template);

            //set current highlighted item/element
            $('#get_started_li').addClass('selected');

            return this;
        }

    });

    return View;

});

/*! HeaderView */
// require validateLogin
define([
    "jquery",
    "underscore",
    "backbone",
    "text!tpl/prelogin/header.html",
    "jquery-ui"
], function($, _, Backbone, Template) {

    var View = Backbone.View.extend({

        el: '#header_container',

        template: _.template(Template),

        render: function() {
            var self = this;
            this.$el.html(this.template);
            this.$el.find("#index_tab, #index_modal_tab").addClass("selected");
            this.$el.find("#menu-tab-sm-btn>.selected").html("Home");

            return this;
        },

        events: {
            "submit #loginform": "btnSignup",
            "click #index_tab, #learnmore_tab, #faqs_tab, #download_tab, #claim_tab, #index_modal_tab, #faqs_modal_tab, #download_modal_tab, #learnmore_modal_tab, #claim_modal_tab": "togglePreloginMenu"
        },
        btnSignup: function(e) {
        	e.preventDefault();
        	this.$el.find("#btnSignup").val("Submitting...");
        	return validateLogin(document.login);
        },
        togglePreloginMenu: function(ev) {
        	hashTag = $(ev.currentTarget).attr("tag");
        	ref = $(ev.currentTarget).attr("ref");
        	t = $(ev.currentTarget).attr("id");
        	(ref != "")? location.href=location.pathname + "#" + hashTag : window.open(hashTag,'_fileclaim');
        	this.$el.find("#menu-tab-sm-btn>.selected").html(this.$el.find("#"+ref+"_modal_tab").html());
        	this.$el.find("#"+ref+"_tab, #"+ref+"_modal_tab").addClass("selected").siblings().removeClass("selected");
        	       	       		
        }
    });

    return View;

});

/*! IndexView */
define([
    "jquery",
    "underscore",
    "backbone",
    "text!tpl/prelogin/index.html",
    "jquery-ui"
], function($, _, Backbone, Template) {

    var View = Backbone.View.extend({

        el: "#body_container",

        template: _.template(Template),

        initialize: function() {
            $('#index_li').siblings().removeAttr('class');
        },

        render: function() {
            var thisView = this;

            this.$el.html(this.template);

            //set current highlighted item/element
            $('#index_li').addClass('selected');
            return this;
        }
    });

    return View;

});

/*! LearnMoreView */
define([
    "jquery",
    "underscore",
    "backbone",
    "text!tpl/prelogin/learn_more.html"
], function($, _, Backbone, Template) {

    var View = Backbone.View.extend({

        el: '#body_container',

        template: _.template(Template),

        initialize: function() {
            $('#sideNav_about_menu').siblings().removeAttr('class');
            $('#learnmore_li').siblings().removeAttr('class');
        },

        render: function() {
            var self = this;
                
            this.$el.html(this.template);

            //set current highlighted item/element
            $('#sideNav_about_menu').addClass('selected');
            $('#learnmore_li').addClass('selected');

            return this;
        }

    });

    return View;

});

/*! LoginInvalidView */
define([
    "jquery",
    "underscore",
    "backbone",
    "text!tpl/prelogin/login_invalid.html",
    "jquery-ui"
], function($, _, Backbone, Template) {

    var View = Backbone.View.extend({

        el: '#header_container',

        template: _.template(Template),

        initialize: function() {
            $('#index_li').siblings().removeAttr('class');
            this.$el.find("#index_tab, #index_modal_tab").addClass("selected");
            this.$el.find("#menu-tab-sm-btn>.selected").html("Home");
        },

        render: function() {
            var self = this;
                
            this.$el.html(this.template);
            //set current highlighted item/element
            $('#index_li').addClass('selected');
            return this;
        },
        events: {
            "submit #loginform": "btnSignup",
            //"click #about_prelogin_menu": "togglePreloginMenu",
            "click #home_prelogin, #learnmore_prelogin, #phones_prelogin, #faqs_prelogin, #download_prelogin, #claim_prelogin": "togglePreloginMenu"
        },
        togglePreloginSMMenu: function(ev) {
        	hashTag = $(ev.currentTarget).attr("tag");
        	ref = $(ev.currentTarget).attr("ref");
        	t = $(ev.currentTarget).attr("id");
        	(ref != "")? location.href=location.pathname + "#" + hashTag : window.open(hashTag,'_fileclaim');
        	this.$el.find("#menu-tab-sm-btn>.selected").html(this.$el.find("#"+ref+"_modal_tab").html());
        	this.$el.find("#"+ref+"_tab, #"+ref+"_modal_tab").addClass("selected").siblings().removeClass("selected");
        	       	       		
        }
    });

    return View;

});

/*! PasswordResetView */
define([
    "jquery",
    "underscore",
    "backbone",
    "text!tpl/prelogin/password_reset.html"
], function($, _, Backbone, Template) {

    var View = Backbone.View.extend({

        el: '#body_container',

        template: _.template(Template),

        initialize: function() {
			var o = this;
			
            $('#sideNav_privacy_policy').siblings().removeAttr('class');

            this.$el.off().on("submit", "form[name=updateAccountPassword]", function(e) {
				e.preventDefault();
				getSecretPair(_.bind(o.createNewPassword, o));
			});
        },

        render: function() {
            var self = this;
            var resetUrl = AMA.config.apiHostUrl + "/accounts/passwordReset/change?" + $.param({ devId: AMA.config.devId });
			   
            this.$el.html(this.template);
			
			$("form[name=updateAccountPassword]").attr("action", resetUrl);
			
			return this;
        },
		
		events: {
			"click #resetPasswordBtn": "btn_submit"
		},
		btn_submit: function(e) {			
		    var newPIN = $.trim(this.$el.find("[name=newpin1]").val()),
		        confirmPIN = $.trim(this.$el.find("[name=confirmpin1]").val()),
		        characterReg = /^\s*[a-zA-Z0-9,\s]+\s*$/;

		    if (newPIN.length < 6 || newPIN.length > 15) {
		    	AMA.Util.switchLabel(".validation_text", ".password_length", this.$el.find(".validation_pinInfo"));
		    	return false;
		    }
		    if (newPIN.length > 0 && !characterReg.test(newPIN)) {
		    	AMA.Util.switchLabel(".validation_text", ".special_chars", this.$el.find(".validation_pinInfo"));
		    	return false;
		    }

		    if (newPIN !== confirmPIN) {
		    	AMA.Util.switchLabel(".validation_text", ".not_match", this.$el.find(".validation_pinInfo"));
		    	return false;
		    }

		    this.$el.find("form").submit();
		},
		
		createNewPassword: function(response) {
			if(typeof response !== "object") {
                response = JSON.parse(this.responseText);
            }
			
			if(!response) return;
			
			var uToken = getCookie("u_token");
			
			var data = { 
				secretHandle: response.handle,
				uniqueToken: uToken
			};
			
            var key = CryptoJS.enc.Hex.parse(response.secretKey);
            var vector = CryptoJS.enc.Hex.parse(response.initVector);
            var answer1 = this.$el.find("[name=newpin1]").val();
			var answer2 = this.$el.find("[name=confirmpin1]").val();
			var encryptedNewPin = CryptoJS.AES.encrypt(answer1, key, { iv: vector });
			var encryptedConfirmPin = CryptoJS.AES.encrypt(answer2, key, { iv: vector });
			
			// API not working with FORM submit
			var url = this.$el.find("form[name=updateAccountPassword]").attr("action");
			
			data.newPassword = encryptedNewPin.toString(); //this.$el.find("[name=securityanswer]").val();
			data.confirmPassword = encryptedConfirmPin.toString(); 
			
			AMA.debug("Sending AJAX request: " + url);

			var request = createCORSRequest.call(this, 
				"POST",
				url
			);

			if (request) {
				request.setRequestHeader('Content-type', 'application/json');
				
				request.onerror = function (jqXHR, error, errorThrown) {
					AMA.ActionManager._onAjaxError(jqXHR, error, errorThrown);
					window.location = "#password_reset_failed";
				};
				
				request.onreadystatechange  = function() {
					if(request.readyState === 4 && request.status === 200) {
						window.location = "#password_reset_successful";
					}
				}
				
				request.send(JSON.stringify(data));
			}
		}
    });

    return View;

});

/*! PasswordRetrieveSecureView */
define([
    "jquery",
    "underscore",
    "backbone",
    "text!tpl/prelogin/password_retrieve_secure.html"
], function($, _, Backbone, Template) {

    var View = Backbone.View.extend({

        el: '#body_container',

        template: _.template(Template),

        initialize: function() {
            var o = this;
			
			$('#sideNav_privacy_policy').siblings().removeAttr('class');

            this.$el.off().on("submit", "form[name=sendpasswd]", function(e) {
				e.preventDefault();
				getSecretPair(_.bind(o.submitAnswer, o));
			});
		},
		
        render: function() {
            var self = this;
            var retrievePinUrl = AMA.config.apiHostUrl + "/accounts/passwordReset/validate?" + $.param({ devId: AMA.config.devId });
			   
            this.$el.html(this.template);
			
			$("form[name=sendpasswd]").attr("action", retrievePinUrl);
			
			this.$el.find("#securityquestion").text(this.options.securityQuestion);
			
			return this;
        },
		
        events: {
			"click #submitSecurityAnswer": "btn_submit"
		},

		btn_submit: function(e) {
			e.preventDefault();
			if(checkSecurityAnswer(document.sendpasswd)) {
				this.$el.find("form").submit();
			}
		},
		
		submitAnswer: function(response) {
			if(typeof response !== "object") {
                response = JSON.parse(this.responseText);
            }
			
			if(!response) return;
			
			var data = { 
				secretHandle: response.handle,
				uniqueToken: this.options.uniqueToken
			};
			
            var key = CryptoJS.enc.Hex.parse(response.secretKey);
            var vector = CryptoJS.enc.Hex.parse(response.initVector);
            var answer = this.$el.find("[name=securityanswer]").val();
			var encryptedAnswer = CryptoJS.AES.encrypt(answer, key, { iv: vector });
			
			// API not working with FORM submit
			var url = this.$el.find("form[name=sendpasswd]").attr("action");
			
			data.securityAnswer = encryptedAnswer.toString(); //this.$el.find("[name=securityanswer]").val();
			
			setCookie("u_token", data.uniqueToken, 1);
			
			AMA.debug("Sending AJAX request: " + url);

			var request = createCORSRequest.call(this, 
				"POST",
				url
			);

			if (request) {
				request.setRequestHeader('Content-type', 'application/json');
				
				request.onerror = function (jqXHR, error, errorThrown) {
					AMA.debug("AJAX Request to " + url + " returns " + request.status);
					$("#wronganswer").show();
				};
				
				request.onreadystatechange = function() {
					if(request.readyState === 4 && request.status === 200) {
						window.location = "#password_reset";
					}
				}
				
				request.send(JSON.stringify(data));
			}
		}
    });

    return View;

});

/*! PasswordSentEmailView */
define([
    "jquery",
    "underscore",
    "backbone",
    "text!tpl/prelogin/password_sent_email.html"
], function($, _, Backbone, Template) {

    var View = Backbone.View.extend({

        el: '#body_container',

        template: _.template(Template),

        initialize: function() {
            $('#sideNav_privacy_policy').siblings().removeAttr('class');
        },

        render: function() {
            var self = this;
                
            this.$el.html(this.template);

            return this;
        }

    });

    return View;

});

/*! PhonesSupportedView */
define([
    "jquery",
    "underscore",
    "backbone",
    "text!tpl/prelogin/phones_supported.html"
], function($, _, Backbone, Template) {

    var View = Backbone.View.extend({

        el: '#body_container',

        template: _.template(Template),

        initialize: function() {
            $('#sideNav_supported_phones').siblings().removeAttr('class');
            $('#learnmore_li').siblings().removeAttr('class');
        },

        render: function() {
            var self = this;
                
            this.$el.html(this.template);

            //set current highlighted item/element
            $('#sideNav_supported_phones').addClass('selected');
            $('#learnmore_li').addClass('selected');

            return this;
        }

    });

    return View;

});

/*! PrivacyView */
define([
    "jquery",
    "underscore",
    "backbone",
    "text!tpl/prelogin/privacy.html"
], function($, _, Backbone, Template) {

    var View = Backbone.View.extend({

        el: '#body_container',

        template: _.template(Template),

        initialize: function() {
            $('#sideNav_privacy_policy').siblings().removeAttr('class');
        },

        render: function() {
            var self = this;
                
            this.$el.html(this.template);

            //set current highlighted item/element
            $('#sideNav_privacy_policy').addClass('selected');

            return this;
        },
        
        events: {
            "click #termstext": "hideLogin"
        },
        
        hideLogin: function(ev){
        	alert('hiding login');
        	clink.indexOf("home") == -1 ? $el.find("#LoginForm").addClass("hidden-md hidden-sm hidden-lg") : $el.find("#LoginForm").removeClass("hidden-md hidden-sm hidden-lg");    	        	
        }

    });

    return View;

});


/*! RetrievePinView */
define([
    "jquery",
    "underscore",
    "backbone",
    "text!tpl/prelogin/retrieve_pin.html"
], function($, _, Backbone, Template) {

    var View = Backbone.View.extend({

        el: '#body_container',

        template: _.template(Template),

        initialize: function() {
            $('#index_li').siblings().removeAttr('class');
			
			var x = 0;
			$el = this.$el;
			this.$el.on("submit", "form[name=retrievePin]", function(e) {
				e.preventDefault();
				
				// API not working with FORM submit
				var url = $(this).attr("action");
				var data = JSON.stringify({ email: $(this).find("[name=email]").val() });
				
				AMA.debug("Sending AJAX request: " + url);
				var request = createCORSRequest.call(this, 
						"POST",
						url
					);
				if (request) {
					request.setRequestHeader('Content-type', 'application/json');
					
					request.onerror = function (jqXHR, error, errorThrown) {
						AMA.debug("AJAX Request to " + url + " returns " + request.status);
						//$(".errorMessage").show();
						AMA.Util.switchLabel(".validation_text", ".email_empty", this.$el.find(".validation_accountinfo2"));
						
					};
					
					request.onreadystatechange  = function() {
						if(request.readyState === 4 && request.status === 200) {
							window.location = "#password_sent_email";
						} else if(request.readyState === 4 && request.status === 500) {
							var res = JSON.parse(request.responseText);
							$el.find(".pin_error").html(res.error);
							AMA.Util.switchLabel(".validation_text", ".email_empty", $el.find(".validation_accountinfo2"));
							
						}
					}
					
					request.send(data);
				} else {
					alert('test');
				}
			});
        },

        render: function() {
            var self = this;
			var retrievePinUrl = AMA.config.apiHostUrl + "/accounts/passwordReset/send?" + $.param({ devId: AMA.config.devId });
			   
            this.$el.html(this.template);
			
			$("form[name=retrievePin]").attr("action", retrievePinUrl);
            
			return this;
        },

        events: {
            "click #triggerPinChange": "btn_submit"
        },

        btn_submit: function(e) {
            var regExp = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i,
            e = this.$el.find("[name=email]").val();
            if (!regExp.test(e)) {
        		AMA.Util.switchLabel(".validation_text", ".email_empty", this.$el.find(".validation_accountinfo2"));
        		return false;
        	}
            this.$el.find("form").submit();
        }

    });

    return View;

});

/*! TermsView */
define([
    "jquery",
    "underscore",
    "backbone",
    "text!tpl/prelogin/terms.html"
], function($, _, Backbone, Template) {

    var View = Backbone.View.extend({

        el: '#body_container',

        template: _.template(Template),

        initialize: function() {
            $('#sideNav_terms_and_conditions').siblings().removeAttr('class');
        },

        render: function() {
            var self = this;
                
            this.$el.html(this.template);

            //set current highlighted item/element
            $('#sideNav_terms_and_conditions').addClass('selected');

            return this;
        },
        
        events: {
            "click #termstext, #termstext": "hideLogin"
        },
        
        hideLogin: function(ev){
        	alert('hiding login');
        	//clink.indexOf("home") == -1 ? this.$el.find("#LoginForm").addClass("hidden-md hidden-sm hidden-lg") : this.$el.find("#LoginForm").removeClass("hidden-md hidden-sm hidden-lg");    	        	
        }

    });

    return View;

});


