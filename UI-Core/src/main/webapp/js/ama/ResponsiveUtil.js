checkForResponsive = function() {
	if (typeof (carrier) !== "undefined"
			&& typeof (carrier.config) !== "undefined") {
		if (typeof (carrier.config.enableRWD) !== "undefined"
				&& carrier.config.enableRWD === true) {
			window.open("r/index.html", "_self");
		} else if (typeof (carrier.config.hybridRWD) !== "undefined"
				&& carrier.config.hybridRWD === true) {
			if ((/android|iphone|ipad|ipod/i.test(navigator.userAgent
					.toLowerCase()))) {
				window.open("r/index.html", "_self");
			}
		}
	}
};