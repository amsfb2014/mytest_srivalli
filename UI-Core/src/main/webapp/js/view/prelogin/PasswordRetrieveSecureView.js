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
