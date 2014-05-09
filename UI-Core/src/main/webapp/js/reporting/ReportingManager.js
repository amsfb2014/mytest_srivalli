/*! ReportingManager */
(function () {
    // This is the base class that will provide function for reporting.
    AMA.ReportingManager = function() {

        var Manager = this;
        Manager.ENDPOINT = "reportEvents";
        Manager.URL = "logEntries";


        return {
            reportEvent: function (eventType, eventMsg, callback) {
                // Event type validation
                if (!eventType) {
                    AMA.debug("Reporting: eventType cannot be null. No reports will be saved.");
                    return;
                }

                // Validate user capability to submit report event
                if (!AMA.models.capabilities.canCreate("reportEvents")) {
                    AMA.error("User has no capability to send report events");
                    if (callback) {
                        callback(false);
                    }
                    return;
                }

                AMA.debug("Reporting to server: " + eventType);

                var url = AMA.config.apiHostUrl + "/" + Manager.ENDPOINT + "?" +
                            $.param({
                                devId: AMA.config.devId,
                                endpointId: AMA.config.endpointId,
                                authToken: AMA.config.authToken
                            });

                eventMsg.eventType = eventType;

                this._requestReport(url, eventMsg, callback);
            },

            /**
            * This method is used to set Interface.enableDpTimeTracking = true/false based on timer stop/start in Reporting controller.
            *
            * @param data {}
            */
            afterReportingTimeSpentEvent: function (data) {
                AMA.debug("Reporting to Server: In Function afterReportingEvent--> " + data);
                AMA.debug("In afterReportingEvent function and server response is " + data);

                if (data && typeof data['dpTimerInSession']!=="undefined" && data['dpTimerInSession'] !== null) {
                    if (data['dpTimerInSession'] === true) {
                        AMA.config.enableDpTimeTracking = true;
                    } else {
                        AMA.config.enableDpTimeTracking = false;
                    }
                }
                if (data && typeof data['mrTimerInSession'] !== "undefined" && data['mrTimerInSession'] !== null) {
                    if (data['mrTimerInSession'] === true) {
                        AMA.config.enableMrTimeTracking = true;
                    } else {
                        AMA.config.enableMrTimeTracking = false;
                    }
                }
            },

            /**
             * This method is used to log page visited on the web portal.
             * @param pageid
             * @param phoneNumber
             */
            reportPageVisited: function (eventProps,isDPPage) {
                if (typeof eventProps === "undefined" || !eventProps) {
                    AMA.debug("eventProps could not be null. No reports saved.");
                    return;
                }

                AMA.debug("Reporting page visit on feature...");

                var props = {};
                props.SessionId = AMA.config.sessionId;
                props.EndpointId = AMA.config.accountDetails.endpointId; 

                if (isDPPage) {
                    props.SubEvent = AMA.config.reportingEventTypes.dppagevisited;
                } else {
                    props.SubEvent = AMA.config.reportingEventTypes.webpagevisited;
                }

                _.extend(props, eventProps);

                this.reportEvent(AMA.config.reportingEventTypes.pagenavigated, props);
            },

            /**
             * This method is used to log user action performed on DP pages. 
             * @param eventID
             * @param actionPerformed
             * @param phoneNumber
             */
            reportUserAction: function (eventID,eventMsg) {
                AMA.debug("Reporting user action...");

                var props = eventMsg;
                props.SessionId = AMA.config.sessionId;
                props.EndpointId = AMA.config.accountDetails.endpointId; 
                props.SubEvent = eventID;

                this.reportEvent(AMA.config.reportingEventTypes.useractionperformed, props);
            },

            /**
             * This method is used to calculate & log time spent on DP pages/portal.
             * @param condition {Stop/Start}
             */
            reportPortalTimeSpent: function (feature, condition) {
                if (condition.toLowerCase() === "start") {
                    AMA.debug("Usage timer on " + feature + " feature started.");
                    AMA.Util.setCookie(feature + "StartTime", new Date().getTime(), 1);
                    
                } else if (condition.toLowerCase() === "stop") {
                    AMA.debug("Usage timer on " + feature + " feature started.");
                    AMA.debug("Reporting on time spent on feature...");

                    var startTime = AMA.Util.getCookie(feature + "StartTime");
                    var stopTime = new Date().getTime();

                    var props = {};
                    props.SessionId = AMA.config.sessionId;
                    props.EndpointId = AMA.config.accountDetails.endpointId;

                    props[feature + "TimeSpent"] = stopTime - startTime;

                    props[feature + "TimeLoggingCondition"] = condition;
                    this.reportEvent(AMA.config.reportingEventTypes[feature.toLowerCase() + "timespent"], props, this.afterReportingTimeSpentEvent);
                } else {
                    AMA.debug("Invalid condition: " + condition);
                    AMA.debug("No reports saved for time sent.");
                }
            },

            reportMRAttempt: function (actionType, actionID) {
                if (!AMA.config.enableReporting) return;

                AMA.debug("Reporting MR attempt...");

                var props = {
                    MRFunction: actionType,
                    SessionId: AMA.config.csrfToken || AMA.config.authToken,
                    EndpointId: AMA.config.endpointId,
                    UsageID: actionID || "NoActionID",
                    Timestamp: new Date().getTime().toString()
                };

                this.reportEvent(AMA.config.reportingEventTypes.webMRAttempt, props);
            },

            reportMRResult: function (actionType, actionID, details) {
                if (!AMA.config.enableReporting) return;

                AMA.debug("Reporting MR result...");

                var props = {
                    MRFunction: actionType,
                    SessionId: AMA.config.csrfToken || AMA.config.authToken,
                    EndpointId: AMA.config.endpointId,
                    UsageID: actionID || "NoActionID",
                    Timestamp: new Date().getTime().toString()
                };

                _.extend(props, details || {});

                this.reportEvent(AMA.config.reportingEventTypes.webMRResult, props);
            },

            /**
             * This method is used to log sync events. 
             *
             * @param eventID
             * @param eventMsgr
             */
            reportSyncEvent: function(eventID, eventMsg) {
                AMA.debug("Reporting to Server: In Function reportSyncEvent--> " + eventID);

                var props = {};
                props.Platform = AMA.models.endpoints.models[0].get('platformfriendlyname');

                _.extend(props, eventMsg);

                this.reportEvent(eventID, props);
            },

            _requestReport: function (url, data, callback) {
                var request = AMA.Util.createCORSRequest("POST", url);

                if (request) {
                    request.onload = function () {
                        try {
                            var response = JSON.parse(this.responseText);
                        }
                        catch (e) {
                           AMA.error("POST " + url + " - Reporting Manager - response not JSON: " + this.responseText);
                        };

                        if (callback && response) {
                            callback(response);
                        }
                        else if (callback) {
                            callback(true);
                        }
                    };
                    request.onerror = function (jqXHR, error, errorThrown) {
                        AMA.ActionManager._onAjaxError(jqXHR, error, errorThrown);
                    };

                    AMA.debug("Sending AJAX request: " + url);
                    request.send(JSON.stringify(data));
                }
            },
            
            /*
             * Call for Parasol logging
             *
             */
            remoteLog: function (message, level, duration) {
                AMA.debug("Logging to Server: " + message);
                
                var url = AMA.config.apiHostUrl + "/" + Manager.URL + "?" +
                            $.param({
                                devId: AMA.config.devId,
                                endpointId: AMA.config.endpointId,
                                authToken: AMA.config.authToken
                            });
                            
                var browserInfo = "[appName: " + navigator.appName + 
                            " appVersion: " + navigator.appVersion +
                            " appCodeName: " + navigator.appCodeName + "] ";
                
                var logObject = {
                    "level": (typeof level === "undefined" || !level) ? AMA.config.JsonConstants.LOGLEVEL_STATES.ERROR : level,
                    "message": browserInfo + message,
                    "account": AMA.config.accountDetails.accountId
                };

                // duration is only used when level is "stats"
                if (typeof duration === "undefined" || !duration) {
                    logObject.duration = duration;
                }
                
                this._requestReport(url, logObject);
            }
        };
    }();
})();