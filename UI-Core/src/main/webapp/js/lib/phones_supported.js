/* phones_supported.js */
(function () {
	
	AMA.supportedPhones = function () {
		var SupportedPhones = this;
		SupportedPhones.RESOURCE = "deviceMetadata";
		SupportedPhones.platformHTML = {};
		SupportedPhones.platforms = {};
		
		var phoneRegexValidators = {
			android: /^.*\/.*/,
			blackberry: /^BB.*/, 
			iphone: /^iPhone.*/,
			palm: /^(Pixi|Pre).*/,
			winmo: /^(W).*/,
			brew: null,
			j2me: null,
			symbian: null,
			bada: null
		};
		
		return {
			initialize: function() {
				var url = AMA.config.apiHostUrl + "/" + SupportedPhones.RESOURCE + "?" +
                            $.param({ devId: AMA.config.devId });

				this.$containers = $("#phones_supported").find("[id^=phones]");
				
				this.$containers.each(function(i, v) { 
					SupportedPhones.platformHTML[v.id.split("_")[1]] = "";
					SupportedPhones.platforms[v.id.split("_")[1]] = [];
				});

				this._requestReport(url, null, this.afterRetrievingSupportedPlatforms);
			},
			
			_requestReport: function (url, data, callback) {
				$.ajax({
					type: "GET",
					url: url,
					cache: false,
					beforeSend: this.loadingPhoneImages,
					success: callback
				});
			},		
			
			loadingPhoneImages: function() {
				$.each(AMA.supportedPhones.$containers, function(i, container) {
					$(container).html("Loading phone images...");
				});
			},
			
			afterRetrievingSupportedPlatforms: function(response) {
				var toAppend = response.total ? "<ul/>" : "No phone images available yet.";
					
				$.each(AMA.supportedPhones.$containers, function(i, container) {
					$(container).html(toAppend);
				});
				
				if(response.total) {					
					AMA.supportedPhones.categorizePhones(response);
					AMA.supportedPhones.render();
				}
			},
			
			categorizePhones: function(response) {
				$.each(response.list, function(i, platform) {
					$.each(phoneRegexValidators, function(device, regex){
						if(!regex) return;
						
						if(regex.test(platform.platformName)) {
							if(!SupportedPhones.platforms[device]) {
								SupportedPhones.platforms[device] = [];
							}
							
							SupportedPhones.platforms[device].push(platform);
							
							return;
						}
					});
				});
			},
			
			render: function() {
				$.each(SupportedPhones.platforms, function(device, deviceArray) {
					$.each(deviceArray, function(index, deviceObject) {
						var imagePath = AMA.config.apiHostUrl + "/deviceImages?" +
											$.param({ 
												size: "medium",
												platformName: deviceObject.platformName,
												devId: AMA.config.devId 
											});
											
						var currentDevice = AMA.supportedPhones.getHtmlString(imagePath, deviceObject.platformDisplayName);
						
						SupportedPhones.platformHTML[device] += currentDevice;
					});
					
					$("#phones_" + device + " ul").append(SupportedPhones.platformHTML[device]);
					$(".phones_" + device).toggle(SupportedPhones.platformHTML[device].length > 0);
				});
				
			},
			
			getHtmlString: function(imagePath, displayName) {
				return "<li><img src='" + imagePath + "' width='77' height='130' /><div class='bodytext'>" + displayName + "</div></li>";
			}
		}
	}();
}(jQuery));


