/*! Router */
(function () {

	AMA.Router = Backbone.Router.extend({
	
	    routes: {
	        "home/": "showDefaultView",
	        "home/:tab": "switchView",
	        "home/:tab/:subtab": "switchView",
	        "": "showDefaultView",
	        "index/to/path/:tab/:subtab": "switchView"
	    },
	    
	    defaultSubtabs: {
	    	"data": "contacts"
	    },
	
	    initialize: function () {
	
	        // TODO: Fetch actual endpoint info from server
	        AMA.currentEndpoint = 0;
	    },
	
	    showDefaultView: function () {
	        this.switchView(AMA.config.defaultView);
	    },
	
	    switchView: function (tab, subtab) {
	    	
	    	if(AMA.Util.getCookie("lastVisited")) {
				var lastVisited = "#" + AMA.Util.getCookie("lastVisited");
				AMA.Util.deleteCookie("lastVisited");
				window.location.hash = lastVisited;
				//return;
			}
	    	
	    	// If subtab is not defined, check if default is known
	    	subtab = subtab || this.defaultSubtabs[tab] || "";
	    	
	    	// Create the page view on first routing
	    	if (!this.pageCreated) {
	            AMA.page = new AMA.view.Page({ 
	            	el: "#page_container", 
	            	defaultTab: tab + (subtab ? "_" + subtab : "") + "_tab",
                    noAutoRefresh: true,
	            	data: AMA.models.endpoints
	            });
	            AMA.page.show();
	            
	            this.pageCreated = true;
	    	}
	    	
	        // AMA.page.getHeader(tab, subtab)
	    	if (!AMA.page.isRendered) {
	    		AMA.page.on(AMA.view.BaseView.EVENT.RENDERED, function() {
	        		AMA.page.content.on(AMA.view.BaseView.EVENT.RENDERED, function() {
	        			AMA.page.switchContent(tab, subtab);
	        		});
	    		});
	
	    		return;
	    	}
	    	AMA.page.switchContent(tab, subtab);
	
	        // toolbar.switchTo(toolbarView)
	    },
	
	    showSettingsView: function (tab) {
	        if (!AMA.page.isRendered) {
	            AMA.page.on(AMA.view.BaseView.EVENT.RENDERED, function() {
	                AMA.page.openSettings(tab);
	            });
	            return;
	        }
	        AMA.page.openSettings(tab);
	    },
        demoAwd: function() {
            if(AMA.isMobileBrowsing()) {
                window.close();
            } else {
                window.location.hash = "#home/dashboard_main"
            }
        }
	});
    	
})();
