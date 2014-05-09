/*! Contacts */
(function () {
    AMA.namespace("model");

    var Contacts = AMA.model.Contacts = AMA.model.UserData.extend();

    Contacts.RESOURCE = "contacts";
    Contacts.OFFSET = 0;
    Contacts.PAGE_SIZE = 30;

    Contacts.IMPORT = {
        ENDPOINT: "formattedContacts",
        SOURCE : {
            CSV: "csv",
            GOOGLE: "google"
        }
    };

    Contacts.MODEL = AMA.model.UserData.MODEL.extend({

    });

    Contacts.FieldFormats = AMA.enums(
        "REGULAR",
        "PHONE",
        "PICTURE",
        "EMAIL",
        "IM",
        "URL",
        "ADDRESS_STREET",
        "ADDRESS_STREET_EXTRA",
        "ADDRESS_NEIGHBORHOOD",
        "ADDRESS_CITY",
        "ADDRESS_STATE",
        "ADDRESS_COUNTRY",
        "ADDRESS_COUNTRYCODE",
        "ADDRESS_ZIPCODE",
        "ADDRESS_FORMATTED",
        "SMART_CONTACT_ASSOCIATION",
        "COMPANY_NAME",
        "DEPARTMENT",
        "JOB_TITLE",
        "CONTACT_SOURCE"
    );

    var DT = AMA.model.FieldTypes,
        DF = Contacts.FieldFormats;

    Contacts.MODEL_DESCRIPTOR = {
        fields: {
            firstName: { type: DT.STRING, val: "", format: DF.REGULAR },
            fullName: { type: DT.STRING, val: "", format: DF.REGULAR },
            mobilePhone1: { type: DT.STRING, val: "", format: DF.PHONE },
            mobilePhone2: { type: DT.STRING, val: "", format: DF.PHONE },
            mobilePhone3: { type: DT.STRING, val: "", format: DF.PHONE },
            notes: { type: DT.STRING, val: "", format: DF.REGULAR },
            middleName: { type: DT.STRING, val: "", format: DF.REGULAR },
            lastName: { type: DT.STRING, val: "", format: DF.REGULAR },
            suffix: { type: DT.STRING, val: "", format: DF.REGULAR },
            prefix: { type: DT.STRING, val: "", format: DF.REGULAR },
            firstPhonetic: { type: DT.STRING, val: "", format: DF.REGULAR },
            middlePhonetic: { type: DT.STRING, val: "", format: DF.REGULAR },
            lastPhonetic: { type: DT.STRING, val: "", format: DF.REGULAR },
            fax: { type: DT.STRING, val: "", format: DF.PHONE },
            homefax: { type: DT.STRING, val: "", format: DF.PHONE },
            workfax: { type: DT.STRING, val: "", format: DF.PHONE },
            phone: { type: DT.STRING, val: "", format: DF.PHONE },
            workPhone1: { type: DT.STRING, val: "", format: DF.PHONE },
            workPhone2: { type: DT.STRING, val: "", format: DF.PHONE },
            workPhone3: { type: DT.STRING, val: "", format: DF.PHONE },
            homePhone1: { type: DT.STRING, val: "", format: DF.PHONE },
            homePhone2: { type: DT.STRING, val: "", format: DF.PHONE },
            otherPhone: { type: DT.STRING, val: "", format: DF.PHONE },
            localPhone: { type: DT.STRING, val: "", format: DF.PHONE },
            iphone: { type: DT.STRING, val: "", format: DF.PHONE },
            pager: { type: DT.STRING, val: "", format: DF.PHONE },
            preferredPhone: { type: DT.STRING, val: "", format: DF.PHONE },
            localDate: { type: DT.DATE, val: "", format: DF.REGULAR },
            birthday: { type: DT.DATE, val: "", format: DF.REGULAR },
            anniversary: { type: DT.DATE, val: "", format: DF.REGULAR },
            nickName: { type: DT.STRING, val: "", format: DF.REGULAR },
            email1: { type: DT.STRING, val: "", format: DF.EMAIL },
            email2: { type: DT.STRING, val: "", format: DF.EMAIL },
            email3: { type: DT.STRING, val: "", format: DF.EMAIL },
            homeEmail: { type: DT.STRING, val: "", format: DF.EMAIL },
            workEmail: { type: DT.STRING, val: "", format: DF.EMAIL },
            otherEmail: { type: DT.STRING, val: "", format: DF.EMAIL },
            localEmail: { type: DT.STRING, val: "", format: DF.EMAIL },
            addressStreet: { type: DT.STRING, val: "", format: DF.ADDRESS_STREET },
            addressStreetExtra: { type: DT.STRING, val: "", format: DF.ADDRESS_STREET_EXTRA },
            addressCity: { type: DT.STRING, val: "", format: DF.ADDRESS_CITY },
            addressState: { type: DT.STRING, val: "", format: DF.ADDRESS_STATE },
            addressCountry: { type: DT.STRING, val: "", format: DF.ADDRESS_COUNTRY },
            addressCountryCode: { type: DT.STRING, val: "", format: DF.ADDRESS_COUNTRYCODE },
            addressZipCode: { type: DT.STRING, val: "", format: DF.ADDRESS_ZIPCODE },
            addressNeighborhood: { type: DT.STRING, val: "", format: DF.ADDRESS_NEIGHBORHOOD },
            addressFormatted: { type: DT.STRING, val: "", format: DF.ADDRESS_FORMATTED },
            companyName: { type: DT.STRING, val: "", format: DF.COMPANY_NAME },
            department: { type: DT.STRING, val: "", format: DF.DEPARTMENT },
            position: { type: DT.STRING, val: "", format: DF.JOB_TITLE },
            workCompany: { type: DT.STRING, val: "", format: DF.COMPANY_NAME },
            workDepartment: { type: DT.STRING, val: "", format: DF.DEPARTMENT },
            workJobTitle: { type: DT.STRING, val: "", format: DF.JOB_TITLE },
            otherCompany: { type: DT.STRING, val: "", format: DF.COMPANY_NAME },
            otherDepartment: { type: DT.STRING, val: "", format: DF.DEPARTMENT },
            otherJobTitle: { type: DT.STRING, val: "", format: DF.JOB_TITLE },
            localCompany: { type: DT.STRING, val: "", format: DF.COMPANY_NAME },
            localDepartment: { type: DT.STRING, val: "", format: DF.DEPARTMENT },
            localJobTitle: { type: DT.STRING, val: "", format: DF.JOB_TITLE },
            localStreet: { type: DT.STRING, val: "", format: DF.ADDRESS_STREET },
            localStreetExtra: { type: DT.STRING, val: "", format: DF.ADDRESS_STREET_EXTRA },
            localCity: { type: DT.STRING, val: "", format: DF.ADDRESS_CITY },
            localState: { type: DT.STRING, val: "", format: DF.ADDRESS_STATE },
            localZipCode: { type: DT.STRING, val: "", format: DF.ADDRESS_ZIPCODE },
            localCountry: { type: DT.STRING, val: "", format: DF.ADDRESS_COUNTRY },
            localNeighborhood: { type: DT.STRING, val: "", format: DF.ADDRESS_NEIGHBORHOOD },
            formattedLocalAddress: { type: DT.STRING, val: "", format: DF.ADDRESS_FORMATTED },
            workStreet: { type: DT.STRING, val: "", format: DF.ADDRESS_STREET },
            workStreetExtra: { type: DT.STRING, val: "", format: DF.ADDRESS_STREET_EXTRA },
            workCity: { type: DT.STRING, val: "", format: DF.ADDRESS_CITY },
            workState: { type: DT.STRING, val: "", format: DF.ADDRESS_STATE },
            workZipCode: { type: DT.STRING, val: "", format: DF.ADDRESS_ZIPCODE },
            workCountry: { type: DT.STRING, val: "", format: DF.ADDRESS_COUNTRY },
            workCountryCode: { type: DT.STRING, val: "", format: DF.ADDRESS_COUNTRYCODE },
            workNeighborhood: { type: DT.STRING, val: "", format: DF.ADDRESS_NEIGHBORHOOD },
            formattedWorkAddress: { type: DT.STRING, val: "", format: DF.ADDRESS_FORMATTED },
            homeStreet: { type: DT.STRING, val: "", format: DF.ADDRESS_STREET },
            homeStreetExtra: { type: DT.STRING, val: "", format: DF.ADDRESS_STREET_EXTRA },
            homeCity: { type: DT.STRING, val: "", format: DF.ADDRESS_CITY },
            homeState: { type: DT.STRING, val: "", format: DF.ADDRESS_STATE },
            homeZipCode: { type: DT.STRING, val: "", format: DF.ADDRESS_ZIPCODE },
            homeCountry: { type: DT.STRING, val: "", format: DF.ADDRESS_COUNTRY },
            homeCountryCode: { type: DT.STRING, val: "", format: DF.ADDRESS_COUNTRYCODE },
            homeNeighborhood: { type: DT.STRING, val: "", format: DF.ADDRESS_NEIGHBORHOOD },
            formattedHomeAddress: { type: DT.STRING, val: "", format: DF.ADDRESS_FORMATTED },
            otherStreet: { type: DT.STRING, val: "", format: DF.ADDRESS_STREET },
            otherStreetExtra: { type: DT.STRING, val: "", format: DF.ADDRESS_STREET_EXTRA },
            otherCity: { type: DT.STRING, val: "", format: DF.ADDRESS_CITY },
            otherState: { type: DT.STRING, val: "", format: DF.ADDRESS_STATE },
            otherZipCode: { type: DT.STRING, val: "", format: DF.ADDRESS_ZIPCODE },
            otherCountry: { type: DT.STRING, val: "", format: DF.ADDRESS_COUNTRY },
            otherCountryCode: { type: DT.STRING, val: "", format: DF.ADDRESS_COUNTRYCODE },
            otherNeighborhood: { type: DT.STRING, val: "", format: DF.ADDRESS_NEIGHBORHOOD },
            formattedOtherAddress: { type: DT.STRING, val: "", format: DF.ADDRESS_FORMATTED },
            category: { type: DT.STRING, val: "", format: DF.REGULAR },
            gender: { type: DT.STRING, val: "", format: DF.REGULAR },
            webSiteUrl: { type: DT.STRING, val: "", format: DF.URL },
            homeWebSiteUrl: { type: DT.STRING, val: "", format: DF.URL },
            workWebSiteUrl: { type: DT.STRING, val: "", format: DF.URL },
            otherWebSiteUrl: { type: DT.STRING, val: "", format: DF.URL },
            preferredWebSiteUrl: { type: DT.STRING, val: "", format: DF.URL },
            im1: { type: DT.STRING, val: "", format: DF.IM },
            im2: { type: DT.STRING, val: "", format: DF.IM },
            im3: { type: DT.STRING, val: "", format: DF.IM },
            imOther: { type: DT.STRING, val: "", format: DF.IM },
            picture: { type: DT.STRING, val: "", format: DF.PICTURE },
            resourceName: { type: DT.STRING, val: "", format: DF.REGULAR },
            resourceTimestamp: { type: DT.STRING, val: "", format: DF.REGULAR },
            resourceVersion: { type: DT.STRING, val: "", format: DF.REGULAR },
            imAIM: { type: DT.STRING, val: "", format: DF.IM },
            imGTalk: { type: DT.STRING, val: "", format: DF.IM },
            imICQ: { type: DT.STRING, val: "", format: DF.IM },
            imJabber: { type: DT.STRING, val: "", format: DF.IM },
            imQQ: { type: DT.STRING, val: "", format: DF.IM },
            imSkype: { type: DT.STRING, val: "", format: DF.IM },
            imWindowsLive: { type: DT.STRING, val: "", format: DF.IM },
            imYahoo: { type: DT.STRING, val: "", format: DF.IM },
            usernameFacebook: { type: DT.STRING, val: "", format: DF.REGULAR },
            usernameTwitter: { type: DT.STRING, val: "", format: DF.REGULAR },
            usernameFlickr: { type: DT.STRING, val: "", format: DF.REGULAR },
            usernameYoutube: { type: DT.STRING, val: "", format: DF.REGULAR },
            usernameAmazonWishlist: { type: DT.STRING, val: "", format: DF.REGULAR },
            usernameSkype: { type: DT.STRING, val: "", format: DF.REGULAR },
            usernameChess: { type: DT.STRING, val: "", format: DF.REGULAR },
            contactEnabledMixin: { type: DT.STRING, val: "", format: DF.REGULAR },
            mixinMimeType: { type: DT.STRING, val: "", format: DF.REGULAR },
            mixinIdentifier: { type: DT.STRING, val: "", format: DF.REGULAR },
            mixinDisplayIdentifier: { type: DT.STRING, val: "", format: DF.REGULAR },
            assistant: { type: DT.STRING, val: "", format: DF.REGULAR },
            manager: { type: DT.STRING, val: "", format: DF.REGULAR },
            governmentID: { type: DT.STRING, val: "", format: DF.REGULAR },
            account: { type: DT.STRING, val: "", format: DF.REGULAR },
            customerID: { type: DT.STRING, val: "", format: DF.REGULAR },
            spouse: { type: DT.STRING, val: "", format: DF.REGULAR },
            children: { type: DT.STRING, val: "", format: DF.REGULAR },
            localGroupName: { type: DT.STRING, val: "", format: DF.REGULAR },
            exchangeName: { type: DT.STRING, val: "", format: DF.REGULAR },
            accountName: { type: DT.STRING, val: "", format: DF.REGULAR },
            accountType: { type: DT.STRING, val: "", format: DF.CONTACT_SOURCE },
            kind: { type: DT.STRING, val: "", format: DF.REGULAR },
            relationship: { type: DT.STRING, val: "", format: DF.REGULAR },
            internetCall: { type: DT.STRING, val: "", format: DF.REGULAR }
        }
    };

    /** Static methods **/
    Contacts.isPhoneType = function (field) {
        return Contacts.MODEL_DESCRIPTOR.fields[field].format == Contacts.FieldFormats.PHONE;
    };

    Contacts.getFieldType = function (field) {
        return Contacts.MODEL_DESCRIPTOR.fields[field].type;
    };

    _.extend(Contacts.prototype, {
        initialize: function () {
            Contacts.__super__.initialize.apply(this, arguments);

            this.offset = Contacts.OFFSET;
            this.pageSize = Contacts.PAGE_SIZE;
        },

        _configureUrl: function (options) {
            Contacts.__super__._configureUrl.call(this, options);
            if(options) {
                this.offset = options.offset || this.offset;
                this.pageSize = options.pageSize || this.pageSize;
            }
            this.url += "&" +
                $.param({
                    offset: this.offset || Contacts.OFFSET,
                    limit: this.pageSize || Contacts.PAGE_SIZE
                });
        },

        comparator: function (item) {
            return item.get("fullName");
        },

        /* CONTACTS IMPORT FUNCTIONS */

        /* Imports contacts from an uploaded CSV file
         *
         * @param {Object} form
         * @param {Function} callback
         */
        csvImport: function (form) {
            // Make sure that arguments are passed to the function
            if (!form) {
                AMA.error("Import Contacts: One or more required function arguments is missing. Aborting");
                return;
            }

            var url = AMA.config.apiHostUrl + "/" + Contacts.IMPORT.ENDPOINT + "?" +
                        $.param({
                            source: Contacts.IMPORT.SOURCE.CSV,
                            devId: AMA.config.devId,
                            authToken: AMA.config.authToken,
                            endpointId: AMA.config.endpointId
                        });

            form.prop("action", url);
            form.submit();
        },

        /* Imports contacts from Google Contacts based on supplied credentials
         *
         * @param {Object} data
         * @param {Function} callback
         */
        gmailFastImport: function (data, callback) {
            // Make sure that arguments are passed to the function
            if (!data || !callback) {
                AMA.error("Import Contacts: One or more required function arguments is missing. Aborting");
                return;
            }

            var url = AMA.config.apiHostUrl + "/" + Contacts.IMPORT.ENDPOINT + "?" +
                        $.param({
                            source: Contacts.IMPORT.SOURCE.GOOGLE,
                            devId: AMA.config.devId,
                            authToken: AMA.config.authToken,
                            endpointId: AMA.config.endpointId
                        }),
                request = AMA.Util.createCORSRequest("POST", url);

            if (request) {
                request.onload = function () {
                    try {
                        var response = JSON.parse(this.responseText);
                        callback(response);
                    }
                    catch (e) {
                        AMA.error("POST /" + Contacts.IMPORT.ENDPOINT + " - Import Contacts - response not JSON: " + this.responseText);
                        callback();
                    };
                };
                request.onerror = function () {
                    AMA.error("Import Contacts: Request returned an error");
                    callback();
                };
                request.send(JSON.stringify(data));
            }
        }

        /* END: CONTACTS IMPORT FUNCTIONS */
    });
})();