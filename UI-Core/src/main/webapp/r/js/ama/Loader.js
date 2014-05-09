require.config({
	waitSeconds: 600,
	baseUrl: "../js",
    paths: {
        jquery: "lib/jquery",
        underscore: "lib/lodash.underscore",
        backbone: "lib/backbone",
		AMA: "ama/AMA",
		Envs: "ama/Envs",
        AmaConfig: "ama/Config"
    },

    shim: {
    	"jquery-ui": {
            exports: "$",
            deps: ['jquery']
        },
        "backbone": {
            deps: [ "underscore", "jquery"],
            exports: "Backbone"
        },
		"Envs": {
			deps: ["underscore"]
		},
		"AmaConfig": {
			deps: ["AMA", "underscore"]
		}
    }
});

require([
	"jquery",
	"underscore",
	"backbone",
	"AMA",
	"Envs",
	"AmaConfig"
], function($, _, Backbone){
	var counter = 0;
	var defaultMode = false;
	
	var loader = {		
		initialize: function() {
			// check the url if debug is manually invoked
			var isDebugMode = loader._getCookie("debugmode");
			
			if(isDebugMode === "") {
				// if debug mode is NOT invoked manually, get and use default mode
				// if envronment is "DEV", debug mode is true by default
				isDebugMode = loader._isDevEnv();
			} 
			else {
				// if manually invoked, set cookie to the invoked mode
				loader._setCookie("debugmode", isDebugMode === "true", 1);
			}
			
			// redirect to correct html file	
            
            window.location.href = "main" + (isDebugMode === "true" ? "_debug" : "") + ".html";          
            
		},
		
		_getParameterByName: function(name) {
			name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
			var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
				results = regex.exec(location.search);
			return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
		},
				
		_getCookie: function(c_name) {
			if (document.cookie.length>0) {
				c_start=document.cookie.indexOf(c_name + "=");
				if (c_start!=-1) {
					c_start=c_start + c_name.length+1;
					c_end=document.cookie.indexOf(";",c_start);
					if (c_end==-1) {
						c_end=document.cookie.length;
					}
					return unescape(document.cookie.substring(c_start,c_end));
				}
			}
			return "";
		},

		_setCookie: function(c_name,value,expiredays) {
			//alert('set cookie');
			var exdate=new Date();
			exdate.setDate(exdate.getDate()+expiredays);
			document.cookie=c_name+ "=" +escape(value)+
			((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
		},
	
		_isDevEnv: function() {
			var isDev = false;
			var envType = AMA.envs[window.location.hostname].type;
			isDev = envType === "DEV";
				
			loader._setCookie("debugmode", isDev, 1);
				
				return isDev;
		}
	};
	
	loader.initialize();
});