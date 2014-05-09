/*! Session */
(function () {
    AMA.session = function () {
        var _removeCookies = function () {
            var d = new Date();
            document.cookie = "accountId=;expires=" + d.toGMTString() + ";;";
            document.cookie = "authToken=;expires=" + d.toGMTString() + ";;";
            document.cookie = "csrfpseudorandomnumber=;expires=" + d.toGMTString() + ";;";
            document.cookie = "endpointId=;expires=" + d.toGMTString() + ";;";
            document.cookie = "webSessionId=;expires=" + d.toGMTString() + ";;";
            AMA.debug("Cookies removed. Current cookies remaining: " + document.cookie);
        };


        return {
            EVENT: AMA.enums(
                "SESSION_TIMEOUT",
                "LOGOUT"
            ),

            logout: function () {
                this.sendSyncCommand();

                // Trigger a 'logout' event so that objects get a chance to cleanup
                this.trigger(this.EVENT.LOGOUT);

                // Call the Authorization API to de-authorize from REST API
                var url = AMA.config.securityHostUrl + "/authtoken?" +
                    $.param({
                        devId: AMA.config.devId,
                        authToken: AMA.config.authToken
                    }),
                    method = "DELETE";

                if (AMA.Util.useXdr()) {
                    url = url + "&_method=DELETE";
                    method="POST";
                }

                var request = AMA.Util.createCORSRequest.call(this, method, url);

                if (request) {
                    AMA.debug("Sending de-authorization request to REST API");
                    request.onload = function () {
                        // Remove the cookies after de-authorization
                        _removeCookies();

                        // Redirect to login page
                        window.location.href = "index.html";
                    };
                    request.send();
                }
            },


            timeout: function () {
            //    this.sendSyncCommand();

                // get hash before timing out
                var pageHash = (window.location.hash.split("#")[1] || window.location.hash);

                // save last visited page's hash
                AMA.Util.setCookie("lastVisited", pageHash, 1);

                // Trigger a 'session timeout' event so that objects can react as needed
                this.trigger(this.EVENT.SESSION_TIMEOUT);

                // Invoke logout
                this.logout();
            },

            //This function is used to send the sync command whenever there is change in storage values
            //Server should actually handle this functionality, this implementation should be removed once server takes care of this 
            sendSyncCommand: function () {
                if (AMA.models.capabilities.canCreate("syncEvents") && AMA.config.isRecordChanged) {
                    var options = {
                            data: {
                                actionType: "sync",
                                dataType: "contacts, pictures, videos"
                            },
                            async: false
                        };
                    
                    new AMA.workflow.SyncWorkflow().sendRequest(options);
                    AMA.config.isRecordChanged = false;
                }
            }
        };
    }();

    _.extend(AMA.session, Backbone.Events);
})();