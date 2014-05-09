/*! UI-LABS Envs */
(function () {

    var envs = {

        "amssb01-web.amafib.com": {
            type: "DEV",
            securityHostUrl: "https://amssb01-security.amafib.com/api/v1",
            apiHostUrl: "https://amssb01-api.amafib.com/v1",
            secureProtocol: true
        },

        "amssb02-web.amafib.com": {
            type: "DEV",
            securityHostUrl: "https://amssb02-security.amafib.com/api/v1",
            apiHostUrl: "https://amssb02-api.amafib.com/v1",
            secureProtocol: true
        },

        "coredev03-web.amafib.com": {
            type: "DEV",
            securityHostUrl: "https://coredev03-security.amafib.com/api/v1",
            apiHostUrl: "https://coredev03-api.amafib.com/v1",
            secureProtocol: true
        },

		"coreqa01-web.amafib.com": {
            type: "DEV",
            securityHostUrl: "https://coreqa01-security.amafib.com/api/v1",
            apiHostUrl: "https://coreqa01-api.amafib.com/v1",
            secureProtocol: true
        },
		
        "coreqa03-web.amafib.com": {
            type: "DEV",
            securityHostUrl: "https://coreqa03-security.amafib.com/api/v1",
            apiHostUrl: "https://coreqa03-api.amafib.com/v1",
            secureProtocol: true
        },

        "coreint03-web.amafib.com": {
            type: "DEV",
            securityHostUrl: "https://coreint03-security.amafib.com/api/v1",
            apiHostUrl: "https://coreint03-api.amafib.com/v1",
            secureProtocol: true
        },
              
        "labsdevsp01-web.amafib.com": {
            type: "DEV",
            securityHostUrl: "https://labsdevsp01-security.amafib.com/api/v1",
            apiHostUrl: "https://labsdevsp01-api.amafib.com/v1",
            secureProtocol: true
        },

        "labsdevsp02-web.amafib.com": {
            type: "DEV",
            securityHostUrl: "https://labsdevsp02-security.amafib.com/api/v1",
            apiHostUrl: "https://labsdevsp02-api.amafib.com/v1",
            secureProtocol: true
        },
        
        "labsqasp01-web.amafib.com": {
            type: "DEV",
            securityHostUrl: "https://labsqasp01-security.amafib.com/api/v1",
            apiHostUrl: "https://labsqasp01-api.amafib.com/v1",
            secureProtocol: true
        },

        "labsqasp02-web.amafib.com": {
            type: "DEV",
            securityHostUrl: "https://labsqasp02-security.amafib.com/api/v1",
            apiHostUrl: "https://labsqasp02-api.amafib.com/v1",
            secureProtocol: true
        },
        
        "localhost": {
            type: "DEV",
            securityHostUrl: "http://localhost:8080/core/security/api/v1",
            apiHostUrl: "http://localhost:8080/core/api/v1",
            secureProtocol: false
        },
        
        "10.45.222.109" : {
        	type: "DEV",
            securityHostUrl: "http://10.45.222.109:8080/core/security/api/v1",
            apiHostUrl: "http://10.45.222.109:8080/core/api/v1",
            secureProtocol: false
        }

    };

    _.extend(AMA.envs, envs);

})();
