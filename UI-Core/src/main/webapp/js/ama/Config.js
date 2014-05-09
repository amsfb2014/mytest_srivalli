/*! Config */
(function () {
    var conf = {
        /*  AUTHENTICATION-RELATED PROPERTIES 
            The properties below are used when making requests to REST API endpoints */

            // Authorization ID; obtained from cookie during login
            authToken: AMA.Util && AMA.Util.getCookie("authToken") || "",
            // Client (user web portal) developer ID
            devId: "OZDELSO9JWAOKCY5",
            // Device endpoint ID; obtained from cookie during login
            endpointId: AMA.Util && AMA.Util.getCookie("endpointId") || "",

        /*  END AUTHENTICATION-RELATED PROPERTIES */


        /*  DEBUGGING-RELATED PROPERTIES
            The properties below are settings related to debug information logging */

            // Enable or disable debug information logging
            enableDebug: true,

        /*  END DEBUGGING-RELATED PROPERTIES */


        /*  DP-RELATED PROPERTIES
            The properties below are configuration items for the DP/Backup tab */

            // Configuration items used in building image paths for the DP/Backup tab
            thumbnailPath: "",
            thumbnailMaxParam: "max",
            commonImagePath: "img/",
            downloadPathPrefix: "/ama/jebber/media/",
            downloadPathSuffix: "?method=retrieve&csrfvalue="+this.csrfToken,
            // Skin name used in building contact details view
            skinName: "",

        /*  END DP-RELATED PROPERTIES */


        /*  LICENSE-RELATED PROPERTIES
            The object below is used to store various license keys needed in accessing third-party services */
            licenses: {
                // Key for webpurify, used for checking for profanities within text strings
                webpurify: "7227056326bbbf595ed81b61c71dd490",

                // Bing Maps keys
                // To get environment-specific Bing Maps API key, use AMA.config.getBingMapsKey(),
                // which returns either one of the values below, depending on environment
                bingMapsProdKey: "",
                bingMapsDevKey: "AvU523l310Ydvy_InwmyRlzOLLu-5qy8OfkaWtIRy4xJOPpaiwGRlYKQ6E2tlKA_"
            },

        /*  END LICENSE-RELATED PROPERTIES */


        /*  LOCALIZATION-RELATED PROPERTIES 
            The properties below are used for adjusting the locales used in the application */

            // The default locale is US English, so "en-us" is not required.
            // When browser locale detection is preferred by the carrier implementation,
            // you can use code such as this:
            //      locale: navigator.browserLanguage || navigator.language
            locale: "",
            // Default date format
            dateFormat: "MM/dd/yyyy",
            // Default time format
            timeFormat: "hh:mm a",
            // Default complete date (date and time) format
            dateAndTimeFormat: "NNN dd, yyyy @ h:mm a",

        /*  END LOCALIZATION-RELATED PROPERTIES */


        /*  MR-RELATED PROPERTIES
            The properties below are configuration items for the MR/Locate tab */

            // Color and transparency values for the map accuracy circle
            mapAccuracyCirleColor: {
                "1": [72,173,215,40],
                "2": [72,173,218,100]
            },
            // Location pane dimensions
            locationPaneMap: {
                "height": 625,
                "width": 730
            },
            locationPaneRWDMap: {
                "height": 625,
                "width": 864
            },
            // Default map coordinates shown in Location Map view if none specified
            defaultMapCoordinates: {
                "lat": 39,
                "lon": -98
            },
            // Default map type to be shown in Location Map view
            defaultMapType: "road",
            // Default unit used for map accuracy
            accuracyUnit: "meters",
            // Maximum number of items to be used in the location history
            locationHistoryLimit: 4,
            // Settings to enable GPS and LBS types of location services
            // For now, both are enabled; TODO: Determine this from server code
            gpsLocateSupported: true,
            lbsLocateSupported: true,
            // Specifies whether the lock feature is enabled
            // TODO: Determine this from server code
            lockEnabled: true,

        /*  END MR-RELATED PROPERTIES */


        /*  PATH- AND VIEW-RELATED PROPERTIES
            The properties below are settings for various folders used throughout the application */

            // Relative path to the templates folder
            templatePath: "tpl/",

            // Default view that the application will switch to if none is specified
            defaultView: "dashboard_main",

        /*  END PATH- AND VIEW-RELATED PROPERTIES */


        /*  REPORTING-RELATED PROPERTIES 
            The properties below are settings for reporting-related functions */

            // Controls whether reporting features are enabled or not
            // TODO: Convert the value below to a capabilities check
            enableReporting: true,
            // Controls whether Backup tab time spent tracking is enabled or not
            enableDpTimeTracking: false,
            // Controls whether Locate tab time spent tracking is enabled or not
            enableMrTimeTracking: false,
            // Controls whether post-operation surveys are enabled or not
            enableSurveys: true,
            // Reporting event type codes
            reportingEventTypes:{
                accountsettings: "ACST",
                actiondropdeletecontact: "ADDC",
                actiondropdeletecontacttrash: "ADCT",
                actiondropdeleteimagetrash: "DDMT",
                actiondropdeletevideotrash: "DDVT",
                actiondropdownaddcontact: "ADAC",
                actiondropdownaddphoto: "ADAP",
                actiondropdownaddvideo: "ADAV",
                actiondropremovecontact: "ADRC",
                actiondropremovephoto: "ADRP",
                actiondropremovevideo: "ADRV",
                addcontact: "ADCO",
                addcontacttodevice: "ADCD",
                addphototophone: "APTP",
                addvideotophone: "AVTP",
                deletePhoto: "DEPH",
                deletecontact: "DECO",
                deletephotoactionperformed: "DPAP",
                deleterecordstrash: "DRET",
                deletevideo: "DEVI",
                deletevideoactionperformed: "DVAP",
                dialogaborted: "DialogAborted",
                dialogfail: "DialogFail",
                dialogsuccess: "DialogSuccess",
                dialogtriggered: "DialogTriggered",
                downloadPhoto: "DOPH",
                downloadvideo: "DOVI",
                dppagevisited: "DPVI",
                dptimespent: "DPTimeSpent",
                editcontact: "EDCO",
                emptytrash: "EMTR",
                exportcontact: "EXCO",
                importcontact: "IMCO",
                locationhistoryrequest: "LocationHistoryRequest",
                mrtimespent: "MRTimeSpent",
                pagenavigated: "PageNavigated",
                phototab: "PHTB",
                playvideo: "PLVI",
                printcontact: "PRCO",
                removecontact: "RMCO",
                removephotofrmphone: "RPFP",
                removevideofrmphone: "RVFP",
                restorecontact: "RETC",
                restorecontactactionperformed: "RCAP",
                restoreimage: "RETI",
                restoreimageactionperformed: "RIAP",
                restorerecords: "RETR",
                restorevideo: "RETV",
                restorevideoactionperformed: "RVAP",
                showcontact: "SWCO",
                transfercontact: "TRCO",
                trashtab: "TRTB",
                useractionperformed: "ActionPerformed",
                videotab: "VDTB",
                viewPhoto: "VWPH",
                webattemptlogin: "WebsiteAttemptLogin",
                weblocate: "WebLocate",
                weblogin: "WebsiteLogin",
                webpagevisited: "WPVI",
                webportalusage: "WebPortalUsage",
                websyncContactsBackup: "SYCO",
                websyncContactsDashboard: "SCOD",
                websyncPhotosBackup: "SYPH",
                websyncPhotosDashboard: "SPHD",
                websyncVideosBackup: "SYVI",
                websyncVideosDashboard: "SYID",
                webMRAttempt: "WebMRAttempt",
                webMRResult: "WebMRResult",
                webuserexperiencesurveycancel: "WebUserExperienceSurveyCancel",
                webuserexperiencesurveyprompt: "WebUserExperienceSurveyPrompt",
                webuserexperiencesurveysubmit: "WebUserExperienceSurveySubmit",
                webSyncDialogShown: "WebSyncDialogShown",
                webSyncDialogCancelled: "WebSyncDialogCancelled",
                webSyncTriggered: "WebSyncTriggered",
                webSyncResult: "WebSyncResult",
                eventType:"eventType",
                logmessage:"msg",
                logaccount:"act",
                webAppRatingGo:"WebAppRatingGo",
                webAppRatingCancel:"WebAppRatingCancel",
                webAppRatingPrompt:"WebAppRatingPrompt"
            },
            /*  Reporting events configurations
                Notes: For each entry in array,
                    key: refers to an Id of the tab/element on click of which we log the reporting event
                    value: is an array which contains details of what is to be logged in DB
                    TabId: [Page Visited, isdpPage, Actioned performed/ Sub event, Event Description/Message]
                    @Page Visited : Name of Section/pane visited by user, could be FALSE in case of click event
                    @isdpPage: TRUE for sections under Data Tab else False.
                
                Ex. 1. backup_tab: ["Contacts", true,"showcontact","Show Contacts"],
                    Above Entry describes:
                    1. Data tab has been click and User( by default) has visited Contacts pane(page)
                    2. Since this is DP page, it been set true, for all other pages it has be false
                    3. Sub Event is Show contact, since show contact action/event is performed by default
                    4. Description of the action performed.
            */
            reportEvtDetailsArray: {
                dashboard_tab: ["Dashboard", false],
                backup_tab: ["Contacts", true, "showcontact", "Show Contacts"],
                locate_tab: ["location", false],
                dashboard_btn_locate: ["location", false],
                security_selector_tab: ["security", false],
                app_assist_selector_tab: ["App Assist", false],
                privacy_tab: ["privacy", false],
                safebrowsing_tab: ["SafeBrowsing", false],
                techsupport_tab: ["Tech Support", false],
                rep_newphone: ["New Phone", false],
                data_contacts_createcontact: ["create Contact", true , "addcontact", "Add Contact"],
                data_contacts_importcontacts: ["import Contact", true , "importcontact", "Import Contact"],
                data_contacts_exportcontacts: ["export Contact", true , "exportcontact", "Export Contact"],
                data_contacts_printcontacts: ["PrintContact", true, "printcontact", "Print Contacts"],
                data_trash_emptytrash: ["Empty Trash", true, "emptytrash", "Empty Trash"],
                button_sync_normal: ["Sync Data", false],
                button_transferdata: ["transfer Data", true, "transfercontact", "Transfer Contacts"],
                button_locate_normal: ["location", false],
                button_wipe_normal: ["Wipe Data", false],
                button_alarm_normal: ["alarm", false],
                button_lock_normal: ["lock", false],
                contact_edit_btn: ["Edit Contact", true, "editcontact", "Edit Contact"],
                data_contacts_tab_selector: ["contacts", true ,"showcontact", "Show Contact"],
                data_photos_tab_selector: ["Photos", true, "phototab", "Show Photo"],
                data_videos_tab_selector: ["videos", true, "videotab", "Show Video"],
                data_trash_tab_selector: ["Trash", true, "trashtab", "Show Trash"],
                sync_settings: ["Data Protection Account Settings", true, "accountsettings", "Account Settings"],
                location_setting: ["Data Protection Account Settings", false, "accountsettings", "Account Settings"],
                contact_resource: ["Backup/Sync Policy", true],
                restore_contact_btn: [false, false, "restorecontact", "Restore Contact - Trash Details Pane"],
                restore_photo_btn: [false, false, "restoreimage", "Restore Photo - Trash Details Pane"],
                restore_video_btn: [false, false, "restorevideo", "Restore Video - Trash Details Pane"],
                delete_contact_btn: [false, false, "deleterecordstrash", "Permanant Delete Contact - Trash Details Pane"],
                delete_photo_btn:  [false, false, "deleterecordstrash", "Permanant Delete photo - Trash Details Pane"],
                delete_video_btn: [false, false, "deleterecordstrash", "Permanant Delete video - Trash Details Pane"],
                view_photo_btn: ["Photo slide show", true, "viewPhoto", "View Photos-Trash Details Pane"],
                play_video_btn: ["Play Video", true, "playvideo", "Play Video-Trash Details Pane"],
                view_photo_hover_btn: ["Photo slide show", true, "viewPhoto", "View Photo"],
                photo_download_btn: [false, false, "downloadPhoto", "Download Photo"],
                photo_delete_btn: [false, false, "deletePhoto", "Delete Photo"],
                view_video_hover_btn: ["Play Video", true, "playvideo", "Play Video"],
                video_download_btn: [false, false, "downloadvideo", "Download Video"],
                video_delete_btn: [false, false, "deletevideo", "Delete Video"],
                contact_removefrmdevice_btn: [false, false, "removecontact", "Remove Contact from Device- DetailsPane"],
                contact_addtodevice_btn: [false, false, "addcontacttodevice", "Add Contact to Device- DetailsPane"],
                contact_delete_btn: [false, false, "deletecontact", "Delete Contact from phone and web - Details Pane"],
                locate_setting: ["Account Settings Location", false],
                backup_setting: ["Account Settings Backup", false],
                security_setting: ["Account Settings Security", false],
                profile_setting: ["Account Settings Account Info", false],
                sync_data: ["Sync Data",true],
                sync_data_dashboard: ["Sync Data dashboard", false]
            },
            // Remote logging constants
            JsonConstants:{
                LOGLEVEL_STATES: {
                    ALERT: "alert",
                    AUDIT: "audit",
                    DEBUG: "debug",
                    ERROR: "error",
                    FATAL: "fatal",
                    INFO: "info",
                    STATS: "stats",
                    WARN: "warn"
                }
            },
            // Details about the logged in account
            accountDetails:{
                // ID associated with the user account; obtained from cookie upon login
                accountId: AMA.Util && AMA.Util.getCookie("accountId") || "",
                // User account MDN
                // TODO: Determine this from server code
                accountMdn:"5555555555"
            },
            // Web session ID; obtained from cookie upon login
            sessionId : AMA.Util && AMA.Util.getCookie("webSessionId") || "",

        /*  END REPORTING-RELATED PROPERTIES */


        /*  LEGACY-RELATED ITEMS
            The properties below are settings for legacy/Jebber support
            TODO: Remove this block once all Jebber dependencies have been removed from code */

            // Relative path to the Jebber module
            legacyApiBaseUrl: "/core/jebber",
            // Cross-site request forgery token; obtained from cookie during login
            csrfToken: AMA.Util && AMA.Util.getCookie("csrfpseudorandomnumber") || "",
            // List of data models which remain dependent on Jebber
            // legacyModels: [
                // "Endpoints",
                // "DeviceSettings"
            // ],
            // Translations for meta fields in legacy data
            legacyMetaFields: {
                visibility: "vi",
                visible: "vo",
                pendingCreate: "pc",
                pendingDelete: "pd",
                pendingUpdate: "pu",
                isCurrent: "ic"
            },
            // Translations for the visibility attribute in legacy data
            legacyEnums: {
                visibility: {
                    enabled: 0,
                    trashed: 1,
                    purged: 2
                }
            },
			
			// Do not delete. Used in sync open session info.
			recordTypeIds: {
				contact: 33620224,
				image: 33686528,
				video: 33687552
			},
			
            // Translations for record types and attributes of legacy data
            legacyRecordTypes: {
                CONTACT: {
                    id: 33620224,
                    fields: {
                        firstName: "08-01",
                        fullName: "07-01",
                        cellPhone: "0e-04",
                        cellPhone2: "0e-04",
                        cellPhone3: "0e-04",
                        notes: "0n-01",
                        middleName: "09-01",
                        lastName: "0A-01",
                        suffix: "0G-01",
                        prefix: "0F-01",
                        firstPhonetic: "0B-01",
                        middlePhonetic: "0C-01",
                        lastPhonetic: "0D-01",
                        fax: "0e-0C",
                        homefax: "0e-0G",
                        workfax: "0e-0H",
                        phone: "0e-01",
                        workPhone: "0e-03",
                        workPhone2: "0e-03",
                        workPhone3: "0e-03",
                        homePhone: "0e-02",
                        otherPhone: "0e-0A",
                        localPhone: "0e-07",
                        iphone: "0e-0Q",
                        pager: "0e-06",
                        preferredPhone: "0e-05",
                        localDate: "0l-07",
                        birthday: "0i-01",
                        anniversary: "0j-01",
                        nickName: "0E-01",
                        relationship: "16-07",
                        email: "0c-01",
                        email2: "0c-01",
                        email3: "0c-01",
                        homeEmail: "0c-02",
                        workEmail: "0c-03",
                        otherEmail: "0c-0A",
                        localEmail: "0c-07",
                        addressStreet: "0J-01",
                        addressStreetExtra: "0K-01",
                        addressCity: "0L-01",
                        addressState: "0M-01",
                        addressCountry: "0N-01",
                        addressCountryCode: "0O-01",
                        addressZipCode: "0P-01",
                        addressNeighborhood: "0Q-01",
                        addressFormatted: "0Y-01",
                        company: "0H-01",
                        department: "0b-01",
                        jobTitle: "0I-01",
                        workCompany: "0H-03",
                        workDepartment: "0b-03",
                        workJobTitle: "0I-03",
                        otherCompany: "0H-0A",
                        otherDepartment: "0b-0A",
                        otherJobTitle: "0I-0A",
                        localCompany: "0H-07",
                        localDepartment: "0b-07",
                        localJobTitle: "0I-07",
                        localStreet: "0J-07",
                        localStreetExtra: "0K-07",
                        localCity: "0L-07",
                        localState: "0M-07",
                        localZipCode: "0P-07",
                        localCountry: "0N-07",
                        localNeighborhood: "0Q-07",
                        formattedLocalAddress: "0Y-07",
                        workStreet: "0J-03",
                        workStreetExtra: "0K-03",
                        workCity: "0L-03",
                        workState: "0M-03",
                        workZipCode: "0P-03",
                        workCountry: "0N-03",
                        workCountryCode: "0O-03",
                        workNeighborhood: "0Q-03",
                        formattedWorkAddress: "0Y-03",
                        homeStreet: "0J-02",
                        homeStreetExtra: "0K-02",
                        homeCity: "0L-02",
                        homeState: "0M-02",
                        homeZipCode: "0P-02",
                        homeCountry: "0N-02",
                        homeCountryCode: "0O-02",
                        homeNeighborhood: "0Q-02",
                        formattedHomeAddress: "0Y-02",
                        otherStreet: "0J-0A",
                        otherStreetExtra: "0K-0A",
                        otherCity: "0L-0A",
                        otherState: "0M-0A",
                        otherZipCode: "0P-0A",
                        otherCountry: "0N-0A",
                        otherCountryCode: "0O-0A",
                        otherNeighborhood: "0Q-0A",
                        formattedOtherAddress: "0Y-0A",
                        category: "0q-01",
                        gender: "0d-01",
                        webSiteURL: "0Z-01",
                        homeWebSiteURL: "0Z-02",
                        workWebSiteURL: "0Z-03",
                        otherWebSiteURL: "0Z-0A",
                        preferredWebSiteURL: "0Z-05",
                        im: "0o-01",
                        im2: "0o-01",
                        im3: "0o-01",
                        imOther: "0o-0A",
                        picture: "0p-01",
                        resourceName:"1u-01",
                        resourceTimestamp:"1x-01",
                        resourceVersion:"1w-01",
                        imAIM: "0o-0I",
                        imGTalk: "0o-0N",
                        imICQ: "0o-0O",
                        imJabber: "0o-0P",
                        imQQ: "0o-0M",
                        imSkype: "0o-0L",
                        imWindowsLive: "0o-0J",
                        imYahoo: "0o-0K",
                        usernameFacebook: "1E-01",
                        usernameTwitter: "1Y-01",
                        usernameFlickr: "1Q-01",
                        usernameYoutube: "1c-01",
                        usernameAmazonWishlist: "1I-01",
                        usernameSkype: "1U-01",
                        usernameChess: "1M-01",
                        contactEnabledMixin: "1k-01",
                        mixinMimeType: "0U-01",
                        mixinIdentifier: "0V-01",
                        mixinDisplayIdentifier: "0W-01",
                        assistant: "0z-01",
                        manager: "10-01",
                        governmentID: "11-01",
                        account: "12-01",
                        customerID: "13-01",
                        spouse: "14-01",
                        children: "15-01",
                        localGroupName: "0y-01",
                        exchangeName: "18-01",
                        accountName: "19-01",
                        accountType: "1A-01",
                        kind: "17-01",
                        internetCall: "0f-07"
                    }
                },
                PHOTO: {
                    id: 33686528,
                    fields: {
                        fileName: "1l-01-0-0",
                        fileSize: "1m-01-0-0",
                        fileHash: "1n-01-0-0",
                        fileType: "1p-01-0-0",
                        fileUrl: "/content?",
                        hostUrl: "1q-01-0-0",
                        thumbnailUrl: "/thumbcontent?",
                        downloadUrl: "/download?"
                    }
                },
                VIDEO: {
                    id: 33687552,
                    fields: {
                        fileName: "1l-01-0-0",
                        fileSize: "1m-01-0-0",
                        fileHash: "1n-01-0-0",
                        fileType: "1p-01-0-0",
                        fileUrl: "/content?",
                        hostUrl: "1q-01-0-0",
                        thumbnailUrl: "/thumbcontent?",
                        downloadUrl: "/download?"
                    }
                },
                HISTORY: {
                    id: 41943040,
                    fields: {
                        event: "2X-01",
                        details: "2Y-01",
                        time: "2Z-01"
                    }
                },
                STATUS: {
                    id: 35651584,
                    fields: {
                        id: "2O-01-0-0",
                        type: "2P-01-0-0",
                        subject: "2Q-01-0-0",
                        content: "2R-01-0-0",
                        time: "2S-01-0-0"
                    }
                },
                ACCOUNT_SETTINGS: {
                    id: 37748736,
                    syncSettingsFields: {
                        autobackup_carrier: "AUTOBACKUP_CARRIER",
                        autobackup_contacts: "AUTOBACKUP_CONTACTS",
                        autobackup_day: "AUTOBACKUP_DAY",
                        autobackup_frequency: "AUTOBACKUP_FREQUENCY",
                        autobackup_minimum_battery_level: "AUTOBACKUP_MINIMUM_BATTERY_LEVEL",
                        autobackup_pictures: "AUTOBACKUP_PICTURES",
                        autobackup_videos: "AUTOBACKUP_VIDEOS",
                        autobackup_wifi: "AUTOBACKUP_WIFI",
                        security_cloudav: "security_cloudav",
                        security_scan_dayofweek: "security_scan_dayofweek",
                        security_safe_browser: "security_safe_browser",
                        security_scan_frequency: "security_scan_frequency",
                        security_scan_nextscan: "security_scan_nextscan",
                        security_scan_timeofday: "security_scan_timeofday",
                        security_trayicon: "security_trayicon",
                        security_scan_realtime: "security_scan_realtime",
                        security_scan_if_media_changed: "security_scan_if_media_changed",
                        locationcheck_on: "LOCATIONCHECK_ON",
                        gps_interval: "GPS_INTERVAL",
                        gps_battery: "GPS_BATTERY"
                    },
                    locationSettingsFields: {
                        locationcheck_on: "LOCATIONCHECK_ON",
                        gps_interval: "GPS_INTERVAL",
                        gps_battery: "GPS_BATTERY"
                    },
                    deviceSettingsFields: {
                        locationcheck_on: "LOCATIONCHECK_ON",
                        current_lockstatus: "CURRENT_LOCKSTATUS",
                        android_device_admin: "ANDROID_DEVICE_ADMIN",
                        data_wiped: "DATA_WIPED"
                    }
                    // messages: {
                        // accountname: "Name",
                        // email: "Email",
                        // securityquestion: "Security Question",
                        // securityanswer: "Security Answer",
                        // pinEmailed: "Your PIN has been emailed",
                        // settingsSaved: "Settings Successfully Saved!",
                        // noChanges: "No changes made.",
                        // passwordChanged:"Password Changed",
                        // password: "Password"
                    // }
                },
                LOCATIONS: {
                    id: 34603008,
                    fields: {
                        time: "2I-01",
                        coordinates: "2H-01",
                        accuracy: "2J-01"
                    }
                },
                SYNCDETAILS: {
                    id: 50331648,
                    fields: {
                        clientTransactionID: "3h-01",
                        onDeviceContactAdded: "3Q-01",
                        onDeviceContactDeleted: "3R-01",
                        onDeviceContactUpdated: "3S-01",
                        onDeviceImageAdded: "3W-01",
                        onDeviceImageDeleted: "3X-01",
                        onDeviceImageTransmit: "3Z-01",
                        onDeviceImageUpdated: "3Y-01",
                        onDeviceVideoAdded: "3d-01",
                        onDeviceVideoDeleted: "3e-01",
                        onDeviceVideoTransmit: "3g-01",
                        onDeviceVideoUpdated: "3f-01",
                        onWebContactAdded: "3N-01",
                        onWebContactDeleted: "3O-01",
                        onWebContactUpdated: "3P-01",
                        onWebImageAdded: "3Z-01",
                        onWebImageDeleted: "3U-01",
                        onWebImageUpdated: "3V-01",
                        onWebVideoAdded: "3g-01",
                        onWebVideoDeleted: "3b-01",
                        onWebVideoUpdated: "3c-01"
                    }
                }
            },
            // Location consolidation setting
            locationConsolidation: false

        /*  END LEGACY-RELATED ITEMS */
    };

    conf.defaultView = "dashboard_main";

    _.extend(AMA.config, conf);


    // Resolver for the environment-specific Bing Maps API key
    AMA.config.getBingMapsKey = function () {
        if (!AMA.envs) return false;

        var envType = AMA.envs[location.hostname].type;

        return (envType === "prod") ? this.licenses.bingMapsProdKey : this.licenses.bingMapsDevKey;
    };


    // Auto-resolve API host URLs based on environment
    AMA.config.securityHostUrl = AMA.envs[location.hostname].securityHostUrl;
    AMA.config.apiHostUrl = AMA.envs[location.hostname].apiHostUrl;
    AMA.config.isRecordChanged = false;
    AMA.config.setRecordChangedFlag = function (changedFlag) {
    AMA.config.isRecordChanged = changedFlag;
   };
})();