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
			"click #submitNewPassword": "btn_submit"
		},

		btn_submit: function(e) {
			if(validatePIN(document.updateAccountPassword)) {
				this.$el.find("form").submit();
			}
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
