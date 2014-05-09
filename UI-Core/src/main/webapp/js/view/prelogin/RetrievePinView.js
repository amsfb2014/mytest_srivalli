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
			this.$el.off().on("submit", "form[name=retrievePin]", function(e) {
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
						$(".errorMessage").show();
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
            if(validateEmail(document.retrievePin)) {
                this.$el.find("form").submit();
            }
        }

    });

    return View;

});
