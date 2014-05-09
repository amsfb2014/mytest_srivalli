/*! Envs */
(function () {

    var envs = {
        // WARNING: actual B&R deployed Envs.js come from $CARRIER Madden source code, not from core.  As $CARRIER overrides core, update non-sandbox environments there!!!
        // below are only definitions for sandbox instances, not formal dev, QA, int nor prod instances.
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

        "localhost": {
            type: "DEV",
            securityHostUrl: "http://localhost:8080/core/security/api/v1",
            apiHostUrl: "http://localhost:8080/core/api/v1",
            secureProtocol: false
        }
    };

    _.extend(AMA.envs, envs);

})();
