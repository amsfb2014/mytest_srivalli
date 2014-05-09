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
						}
					}
					
					request.send(data);
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
