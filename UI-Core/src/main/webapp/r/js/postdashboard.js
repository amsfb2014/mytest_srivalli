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
/*! ContactDetails */
(function () {

	AMA.namespace("model");

	var ContactDetails = AMA.model.ContactDetails = AMA.model.UserData.extend();

    ContactDetails.RESOURCE = "contacts";

	ContactDetails.MODEL = AMA.model.UserData.MODEL.extend({

	});

	ContactDetails.FieldFormats = AMA.enums(
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
		DF = ContactDetails.FieldFormats;

	ContactDetails.MODEL_DESCRIPTOR = {

		fields: {
			firstName: { type: DT.STRING, val: "", format: DF.REGULAR, displayText: "First Name" },
			fullName: { type: DT.STRING, val: "", format: DF.REGULAR, displayText: "Name" },
			mobilePhone: { type: DT.STRING, val: "", format: DF.PHONE, displayText: "Mobile Phone(s)" },
			mobilePhone1: { type: DT.STRING, val: "", format: DF.PHONE, displayText: "Mobile Phone 1" },
			mobilePhone2: { type: DT.STRING, val: "", format: DF.PHONE, displayText: "Mobile Phone 2" },
			mobilePhone3: { type: DT.STRING, val: "", format: DF.PHONE, displayText: "Mobile Phone 3" },
			notes: { type: DT.STRING, val: "", format: DF.REGULAR, displayText: "Notes" },
			middleName: { type: DT.STRING, val: "", format: DF.REGULAR, displayText: "Middle Name" },
			lastName: { type: DT.STRING, val: "", format: DF.REGULAR, displayText: "Last Name" },
			suffix: { type: DT.STRING, val: "", format: DF.REGULAR, displayText: "Suffix" },
			prefix: { type: DT.STRING, val: "", format: DF.REGULAR, displayText: "Prefix" },
			firstPhonetic: { type: DT.STRING, val: "", format: DF.REGULAR, displayText: "First Phonetic" },
			middlePhonetic: { type: DT.STRING, val: "", format: DF.REGULAR, displayText: "Middle Phonetic" },
			lastPhonetic: { type: DT.STRING, val: "", format: DF.REGULAR, displayText: "Last Phonetic" },
			fax: { type: DT.STRING, val: "", format: DF.PHONE, displayText: "Fax" },
			homefax: { type: DT.STRING, val: "", format: DF.PHONE, displayText: "Home Fax" },
			workfax: { type: DT.STRING, val: "", format: DF.PHONE, displayText: "Work Fax" },
			phone: { type: DT.STRING, val: "", format: DF.PHONE, displayText: "Phone" },
			workPhone: { type: DT.STRING, val: "", format: DF.PHONE, displayText: "Work Phone(s)" },
			workPhone1: { type: DT.STRING, val: "", format: DF.PHONE, displayText: "Work Phone 1" },
			workPhone2: { type: DT.STRING, val: "", format: DF.PHONE, displayText: "Work Phone 2" },
			workPhone3: { type: DT.STRING, val: "", format: DF.PHONE, displayText: "Work Phone 3" },
			homePhone: { type: DT.STRING, val: "", format: DF.PHONE, displayText: "Home Phone(s)" },
			homePhone1: { type: DT.STRING, val: "", format: DF.PHONE, displayText: "Home Phone 1" },
			homePhone2: { type: DT.STRING, val: "", format: DF.PHONE, displayText: "Home Phone 2" },
			otherPhone: { type: DT.STRING, val: "", format: DF.PHONE, displayText: "Other Phone" },
			localPhone: { type: DT.STRING, val: "", format: DF.PHONE, displayText: "Local Phone" },
			iphone: { type: DT.STRING, val: "", format: DF.PHONE, displayText: "iPhone" },
			pager: { type: DT.STRING, val: "", format: DF.PHONE, displayText: "Pager" },
			preferredPhone: { type: DT.STRING, val: "", format: DF.PHONE, displayText: "Preferred Phone" },
			localDate: { type: DT.DATE, val: "", format: DF.REGULAR, displayText: "Local Date" },
			birthday: { type: DT.DATE, val: "", format: DF.REGULAR, displayText: "Birthday" },
			anniversary: { type: DT.DATE, val: "", format: DF.REGULAR, displayText: "Anniversary" },
			nickName: { type: DT.STRING, val: "", format: DF.REGULAR, displayText: "Nick Name" },
			email: { type: DT.STRING, val: "", format: DF.EMAIL, displayText: "Email(s)" },
			email1: { type: DT.STRING, val: "", format: DF.EMAIL, displayText: "Email 1" },
			email2: { type: DT.STRING, val: "", format: DF.EMAIL, displayText: "Email 2" },
			email3: { type: DT.STRING, val: "", format: DF.EMAIL, displayText: "Email 3" },
			homeEmail: { type: DT.STRING, val: "", format: DF.EMAIL, displayText: "Home Email" },
			workEmail: { type: DT.STRING, val: "", format: DF.EMAIL, displayText: "Work Email" },
			otherEmail: { type: DT.STRING, val: "", format: DF.EMAIL, displayText: "Other Email" },
			localEmail: { type: DT.STRING, val: "", format: DF.EMAIL, displayText: "Local Email" },
			addressStreet: { type: DT.STRING, val: "", format: DF.ADDRESS_STREET, displayText: "Street Line 1" },
			addressStreetExtra: { type: DT.STRING, val: "", format: DF.ADDRESS_STREET_EXTRA, displayText: "Street Line 2" },
			addressCity: { type: DT.STRING, val: "", format: DF.ADDRESS_CITY, displayText: "City" },
			addressState: { type: DT.STRING, val: "", format: DF.ADDRESS_STATE, displayText: "State" },
			addressCountry: { type: DT.STRING, val: "", format: DF.ADDRESS_COUNTRY, displayText: "Country" },
			addressCountryCode: { type: DT.STRING, val: "", format: DF.ADDRESS_COUNTRYCODE, displayText: "Country Code" },
			addressZipCode: { type: DT.STRING, val: "", format: DF.ADDRESS_ZIPCODE, displayText: "Zip Code" },
			addressNeighborhood: { type: DT.STRING, val: "", format: DF.ADDRESS_NEIGHBORHOOD, displayText: "Neighborhood" },
			addressFormatted: { type: DT.STRING, val: "", format: DF.ADDRESS_FORMATTED, displayText: "Address" },
			companyName: { type: DT.STRING, val: "", format: DF.COMPANY_NAME, displayText: "Company Name" },
			department: { type: DT.STRING, val: "", format: DF.DEPARTMENT, displayText: "Department" },
			position: { type: DT.STRING, val: "", format: DF.JOB_TITLE, displayText: "Position" },
			workCompany: { type: DT.STRING, val: "", format: DF.COMPANY_NAME, displayText: "Work Company" },
			workDepartment: { type: DT.STRING, val: "", format: DF.DEPARTMENT, displayText: "Work Department" },
			workJobTitle: { type: DT.STRING, val: "", format: DF.JOB_TITLE, displayText: "Work Job Title" },
			otherCompany: { type: DT.STRING, val: "", format: DF.COMPANY_NAME, displayText: "Other Company" },
			otherDepartment: { type: DT.STRING, val: "", format: DF.DEPARTMENT, displayText: "Other Department" },
			otherJobTitle: { type: DT.STRING, val: "", format: DF.JOB_TITLE, displayText: "Other Job Title" },
			localCompany: { type: DT.STRING, val: "", format: DF.COMPANY_NAME, displayText: "Local Company" },
			localDepartment: { type: DT.STRING, val: "", format: DF.DEPARTMENT, displayText: "Local Department" },
			localJobTitle: { type: DT.STRING, val: "", format: DF.JOB_TITLE, displayText: "Local Job Title" },
			localStreet: { type: DT.STRING, val: "", format: DF.ADDRESS_STREET, displayText: "Local Street Line 1" },
			localStreetExtra: { type: DT.STRING, val: "", format: DF.ADDRESS_STREET_EXTRA, displayText: "Local Street Line 2" },
			localCity: { type: DT.STRING, val: "", format: DF.ADDRESS_CITY, displayText: "Local City" },
			localState: { type: DT.STRING, val: "", format: DF.ADDRESS_STATE, displayText: "Local State" },
			localZipCode: { type: DT.STRING, val: "", format: DF.ADDRESS_ZIPCODE, displayText: "Local Zip Code" },
			localCountry: { type: DT.STRING, val: "", format: DF.ADDRESS_COUNTRY, displayText: "Local Country" },
			localNeighborhood: { type: DT.STRING, val: "", format: DF.ADDRESS_NEIGHBORHOOD, displayText: "Local Neighborhood" },
			formattedLocalAddress: { type: DT.STRING, val: "", format: DF.ADDRESS_FORMATTED, displayText: "Local Address" },
			workStreet: { type: DT.STRING, val: "", format: DF.ADDRESS_STREET, displayText: "Work Street Line 1" },
			workStreetExtra: { type: DT.STRING, val: "", format: DF.ADDRESS_STREET_EXTRA, displayText: "Work Street Line 2" },
			workCity: { type: DT.STRING, val: "", format: DF.ADDRESS_CITY, displayText: "Work City" },
			workState: { type: DT.STRING, val: "", format: DF.ADDRESS_STATE, displayText: "Work State" },
			workZipCode: { type: DT.STRING, val: "", format: DF.ADDRESS_ZIPCODE, displayText: "Work Zip Code" },
			workCountry: { type: DT.STRING, val: "", format: DF.ADDRESS_COUNTRY, displayText: "Work Country" },
			workCountryCode: { type: DT.STRING, val: "", format: DF.ADDRESS_COUNTRYCODE, displayText: "Work Country Code" },
			workNeighborhood: { type: DT.STRING, val: "", format: DF.ADDRESS_NEIGHBORHOOD, displayText: "Work Neighbordhood" },
			formattedWorkAddress: { type: DT.STRING, val: "", format: DF.ADDRESS_FORMATTED, displayText: "Work Address" },
			homeStreet: { type: DT.STRING, val: "", format: DF.ADDRESS_STREET, displayText: "Home Street Line 1" },
			homeStreetExtra: { type: DT.STRING, val: "", format: DF.ADDRESS_STREET_EXTRA, displayText: "Home Street Line 2" },
			homeCity: { type: DT.STRING, val: "", format: DF.ADDRESS_CITY, displayText: "Home City" },
			homeState: { type: DT.STRING, val: "", format: DF.ADDRESS_STATE, displayText: "Home State" },
			homeZipCode: { type: DT.STRING, val: "", format: DF.ADDRESS_ZIPCODE, displayText: "Home Zip Code" },
			homeCountry: { type: DT.STRING, val: "", format: DF.ADDRESS_COUNTRY, displayText: "Home Country" },
			homeCountryCode: { type: DT.STRING, val: "", format: DF.ADDRESS_COUNTRYCODE, displayText: "Home Country Code" },
			homeNeighborhood: { type: DT.STRING, val: "", format: DF.ADDRESS_NEIGHBORHOOD, displayText: "Home Neighborhood" },
			formattedHomeAddress: { type: DT.STRING, val: "", format: DF.ADDRESS_FORMATTED, displayText: "Home Address" },
			otherStreet: { type: DT.STRING, val: "", format: DF.ADDRESS_STREET, displayText: "Other Street Line 1" },
			otherStreetExtra: { type: DT.STRING, val: "", format: DF.ADDRESS_STREET_EXTRA, displayText: "Other Line 2" },
			otherCity: { type: DT.STRING, val: "", format: DF.ADDRESS_CITY, displayText: "Other City" },
			otherState: { type: DT.STRING, val: "", format: DF.ADDRESS_STATE, displayText: "Other State" },
			otherZipCode: { type: DT.STRING, val: "", format: DF.ADDRESS_ZIPCODE, displayText: "Other Zip Code" },
			otherCountry: { type: DT.STRING, val: "", format: DF.ADDRESS_COUNTRY, displayText: "Other Country" },
			otherCountryCode: { type: DT.STRING, val: "", format: DF.ADDRESS_COUNTRYCODE, displayText: "Other Country Code" },
			otherNeighborhood: { type: DT.STRING, val: "", format: DF.ADDRESS_NEIGHBORHOOD, displayText: "Other Neighborhood" },
			formattedOtherAddress: { type: DT.STRING, val: "", format: DF.ADDRESS_FORMATTED, displayText: "Other Address" },
			category: { type: DT.STRING, val: "", format: DF.REGULAR, displayText: "Category" },
			gender: { type: DT.STRING, val: "", format: DF.REGULAR, displayText: "Gender" },
			webSiteUrl: { type: DT.STRING, val: "", format: DF.URL, displayText: "Web Site URL" },
			homeWebSiteUrl: { type: DT.STRING, val: "", format: DF.URL, displayText: "Home Web Site URL" },
			workWebSiteUrl: { type: DT.STRING, val: "", format: DF.URL, displayText: "Work Web Site URL" },
			otherWebSiteUrl: { type: DT.STRING, val: "", format: DF.URL, displayText: "Other Web Site URL" },
			preferredWebSiteUrl: { type: DT.STRING, val: "", format: DF.URL, displayText: "Preferred Web Site URL" },
			im: { type: DT.STRING, val: "", format: DF.IM, displayText: "IM" },
			im2: { type: DT.STRING, val: "", format: DF.IM, displayText: "IM 2" },
			im3: { type: DT.STRING, val: "", format: DF.IM, displayText: "IM 3" },
			imOther: { type: DT.STRING, val: "", format: DF.IM, displayText: "Other IM" },
			picture: { type: DT.STRING, val: "", format: DF.PICTURE, displayText: "Picture" },
			resourceName: { type: DT.STRING, val: "", format: DF.REGULAR, displayText: "Resource Name" },
			resourceTimestamp: { type: DT.STRING, val: "", format: DF.REGULAR, displayText: "Resource Timestamp" },
			resourceVersion: { type: DT.STRING, val: "", format: DF.REGULAR, displayText: "Resource Version" },
			imAIM: { type: DT.STRING, val: "", format: DF.IM, displayText: "AIM" },
			imGTalk: { type: DT.STRING, val: "", format: DF.IM, displayText: "GTalk" },
			imICQ: { type: DT.STRING, val: "", format: DF.IM, displayText: "ICQ" },
			imJabber: { type: DT.STRING, val: "", format: DF.IM, displayText: "Jabber" },
			imQQ: { type: DT.STRING, val: "", format: DF.IM, displayText: "QQ" },
			imSkype: { type: DT.STRING, val: "", format: DF.IM, displayText: "Skype" },
			imWindowsLive: { type: DT.STRING, val: "", format: DF.IM, displayText: "Windows Live" },
			imYahoo: { type: DT.STRING, val: "", format: DF.IM, displayText: "Yahoo" },
			usernameFacebook: { type: DT.STRING, val: "", format: DF.REGULAR, displayText: "Facebook Username" },
			usernameTwitter: { type: DT.STRING, val: "", format: DF.REGULAR, displayText: "Twitter Username" },
			usernameFlickr: { type: DT.STRING, val: "", format: DF.REGULAR, displayText: "Flickr Username" },
			usernameYoutube: { type: DT.STRING, val: "", format: DF.REGULAR, displayText: "YouTube Username" },
			usernameAmazonWishlist: { type: DT.STRING, val: "", format: DF.REGULAR, displayText: "Amazon Wishlist Username" },
			usernameSkype: { type: DT.STRING, val: "", format: DF.REGULAR, displayText: "Skype Username" },
			usernameChess: { type: DT.STRING, val: "", format: DF.REGULAR, displayText: "Chess Username" },
			contactEnabledMixin: { type: DT.STRING, val: "", format: DF.REGULAR, displayText: "Contact Enabled Mixin" },
			mixinMimeType: { type: DT.STRING, val: "", format: DF.REGULAR, displayText: "Mixin MIME Type" },
			mixinIdentifier: { type: DT.STRING, val: "", format: DF.REGULAR, displayText: "Mixin Identifier" },
			mixinDisplayIdentifier: { type: DT.STRING, val: "", format: DF.REGULAR, displayText: "Mixin Display Identifier" },
			assistant: { type: DT.STRING, val: "", format: DF.REGULAR, displayText: "Assistant" },
			manager: { type: DT.STRING, val: "", format: DF.REGULAR, displayText: "Manager" },
			governmentID: { type: DT.STRING, val: "", format: DF.REGULAR, displayText: "Government ID" },
			account: { type: DT.STRING, val: "", format: DF.REGULAR, displayText: "Account" },
			customerID: { type: DT.STRING, val: "", format: DF.REGULAR, displayText: "Customer ID" },
			spouse: { type: DT.STRING, val: "", format: DF.REGULAR, displayText: "Spouse" },
			children: { type: DT.STRING, val: "", format: DF.REGULAR, displayText: "Children" },
			localGroupName: { type: DT.STRING, val: "", format: DF.REGULAR, displayText: "Local Group Name" },
			exchangeName: { type: DT.STRING, val: "", format: DF.REGULAR, displayText: "Exchange Name" },
			accountName: { type: DT.STRING, val: "", format: DF.REGULAR, displayText: "Account Name" },
			accountType: { type: DT.STRING, val: "", format: DF.CONTACT_SOURCE, displayText: "Account Type" },
			kind: { type: DT.STRING, val: "", format: DF.REGULAR, displayText: "Kind" },
			relationship: { type: DT.STRING, val: "", format: DF.REGULAR, displayText: "Relationship" },
			internetCall: { type: DT.STRING, val: "", format: DF.REGULAR, displayText: "Internet Call" }
		}

	};


	/** Static methods **/

	ContactDetails.isPhoneType = function (field) {
		return ContactDetails.MODEL_DESCRIPTOR.fields[field].format == ContactDetails.FieldFormats.PHONE;
	};

	ContactDetails.getFieldType = function (field) {
		return ContactDetails.MODEL_DESCRIPTOR.fields[field].type;
	};

	_.extend(ContactDetails.prototype, {

		comparator: function (item) {
			return item.get("fullName");
		}
	});

	_.extend(ContactDetails.prototype, {

		_configureFetchOptions: function (options) {
			this.url = AMA.config.apiHostUrl + "/contacts/" + options.contactId + "?devId=" + AMA.config.devId + "&endpointId=" + AMA.config.endpointId + "&authToken=" + AMA.config.authToken + "&status=" + AMA.model.UserData.Status.ENABLED;
		},

		fetch: function (options) {
			var self = this,
				xhr = null;
			
			if (options.contactId) {

				// if (this.isFetching) {
					// return;
				// }
				// this.isFetching = true;
				// options = options || {};

				this._configureFetchOptions(options);

				if (AMA.Util.useXdr()) {
					xhr = AMA.Util.createCORSRequest("get",this.url);
					
					xhr.onload = function () {
						var response = null;
						try {
							response = JSON.parse(this.responseText);
						}
						catch (e) {
							AMA.error("GET " + this.url  + " - Contact Details - response not JSON: " + this.responseText);
						};
						
						if (response) {
							self.isLoaded = true;
							self.isFetching = false;
							options.callback(true, response);
						}
					};
					xhr.onerror = function () {
						AMA.error("Request failed: GET " + this.url);
						options.callback(false);
					};
					
					xhr.onprogress = function () {};
					xhr.ontimeout = function () {};
					xhr.timeout = 100000; // Prevents IE9 from aborting the request
					
					xhr.send();
				}
				else {
					$.ajax({
						url: this.url
					}).done(function (data){
						self.isLoaded = true;
						self.isFetching = false;
						options.callback(true, data);
					});
				}
			}
			else {
				return;
			}
		},

		getDetails: function (contactId, callback){
			var options = {};
			options.contactId = contactId;
			options.callback = callback;

			var data = this.fetch(options);
		}

	});
})();

/*! Files */
(function () {

    AMA.namespace("model");

    var Files = AMA.model.Files = AMA.model.UserData.extend();

    Files.RESOURCE = "files";

    // Each subclass should define a file type
    Files.FILETYPE = "";

    Files.MODEL = AMA.model.UserData.MODEL.extend({

    });


    _.extend(Files.prototype, {

        _configureUrl: function () {
            this.url = AMA.config.apiHostUrl + "/" + Files.RESOURCE + "?" +
                $.param({
                    devId: AMA.config.devId,
                    endpointId: AMA.config.endpointId,
                    fileType: this.constructor.FILETYPE,
                    authToken: AMA.config.authToken,
                    status: AMA.model.UserData.Status.ENABLED
                });
        },


        // TODO: Adjust this based on changes to Capabilities API
        _checkSyncPrivileges: function () {
            var resource = Files.RESOURCE,
                capabilities = AMA.models.capabilities;

            this.syncPrivileges = {
                "create": capabilities.canCreate(resource),
                "read": capabilities.canRead(resource),
                "update": capabilities.canUpdate(resource),
                "delete": capabilities.canDelete(resource)
            };
        }

    });

})();

/*! Photos */
(function () {

	AMA.namespace("model");
	
	var Photos = AMA.model.Photos = AMA.model.Files.extend();

	Photos.FILETYPE = "image";
	Photos.OFFSET = 0;
	Photos.PAGE_SIZE = 9;
	Photos.PENDING_TRANSMIT = false;

	Photos.MODEL = AMA.model.Files.MODEL.extend({

	});
	
	_.extend(Photos.prototype, {
		initialize: function () {
			Photos.__super__.initialize.apply(this, arguments);

			this.offset = Photos.OFFSET;
			this.pageSize = Photos.PAGE_SIZE;
			this.pendingTransmit = Photos.PENDING_TRANSMIT;
		},

		_configureUrl: function (options) {
			Photos.__super__._configureUrl.call(this, options);

			this.url += "&" +
				$.param({
					offset: this.offset || Photos.OFFSET,
					limit: this.pageSize || Photos.PAGE_SIZE,
					pendingTransmit: this.pendingTransmit || Photos.PENDING_TRANSMIT
					
				});
		}
	});
})();

/*! Videos */
(function () {
	
	AMA.namespace("model");
	
	var Videos = AMA.model.Videos = AMA.model.Files.extend();

	Videos.FILETYPE = "video";
	Videos.OFFSET = 0;
	Videos.PAGE_SIZE = 9;
	Videos.PENDING_TRANSMIT = false;

	Videos.MODEL = AMA.model.Files.MODEL.extend({

	});
	
	_.extend(Videos.prototype, {
		initialize: function () {
			Videos.__super__.initialize.apply(this, arguments);

			this.offset = Videos.OFFSET;
			this.pageSize = Videos.PAGE_SIZE;
			this.pendingTransmit = Videos.PENDING_TRANSMIT;
		},

		_configureUrl: function (options) {
			Videos.__super__._configureUrl.call(this, options);

			this.url += "&" +
				$.param({
					offset: this.offset || Videos.OFFSET,
					limit: this.pageSize || Videos.PAGE_SIZE,
					pendingTransmit: this.pendingTransmit || Videos.PENDING_TRANSMIT
				});
		}
	});
})();

/*! Trash */
(function () {
    AMA.namespace("model");

    /**
     * Trash Collection, contains UserData with status TRASHED.
     *
     * @class Trash
     * @namespace view
     * @extends AMA.view.UserData
     * @constructor
     */
    var Trash = AMA.model.Trash = AMA.model.UserData.extend();

    Trash.OFFSET = 0;       // (Required value) Fetch offset, 0 means fetch from beginning of data
    Trash.LIMIT = 9999;     // (Required value) Limit for fetched items; 9999 is used to indicate fetch all data

    // Trash Collection Model constructor, Override functions goes here if Model needs additional implementation
    Trash.MODEL = AMA.model.UserData.MODEL.extend({

    });

    AMA.augment(Trash.prototype, {
        initialize: function () {
            Trash.__super__.initialize.apply(this);

            // Since this model doesn't really map to a single API resource,
            // individual capabilities for contacts/photos/videos apply.
            // The overall sync privileges should therefore be just all-true.
            this.syncPrivileges = {
                "create": true,
                "read": true,
                "update": true,
                "delete": true
            };

            this.resetTrash();
        },
        
        resetTrash: function () {
            this.trashedItems = [];
            
            this._isTrashedContactsLoaded = false;
            this._isTrashedContactsFetching = false;
            this._isTrashedPhotosLoaded = false;
            this._isTrashedPhotosFetching = false;
            this._isTrashedVideosLoaded = false;
            this._isTrashedVideosFetching = false;
            this._isDropdownTrash = false;
        },

        _configureFetchOptions: function (options) {
            if (options.contacts)
                this.url = AMA.config.apiHostUrl + "/contacts?";
            else if (options.photos)
                this.url = AMA.config.apiHostUrl + "/files?fileType=image&";
            else if (options.videos)
                this.url = AMA.config.apiHostUrl + "/files?fileType=video&";

            this.url +=
                $.param({
                    devId: AMA.config.devId,
                    endpointId: AMA.config.endpointId,
                    authToken: AMA.config.authToken,
                    status: AMA.model.UserData.Status.TRASHED,
                    offset: Trash.OFFSET,
                    limit: Trash.LIMIT
                });

            if (options && options.params && options.params.keyword) {
                this.url += "&" +
                    $.param({
                        keyword: options.params.keyword
                    });
            }
        },

        fetch: function (options) {
            if (this._isTrashedContactsFetching && this._isTrashedPhotosFetching && this._isTrashedVideosFetching)
                return;

            var self = this;
            if (AMA.models.capabilities.isFetching) {
                AMA.models.capabilities.on(AMA.model.BaseData.EVENT.LOADED, function () {
                    self.fetch(self.options);
                });
                return;
            }

            options = options || {};

            // Force reset
            options.reset = true;

            if (!this._isTrashedContactsLoaded && !this._isTrashedContactsFetching) {
                this._isTrashedContactsFetching = true;
                options.contacts = true;
            } else if (!this._isTrashedPhotosLoaded && !this._isTrashedPhotosFetching) {
                this._isTrashedPhotosFetching = true;
                options.contacts = false;
                options.photos = true;
            } else if (!this._isTrashedVideosLoaded && !this._isTrashedVideosFetching) {
                this._isTrashedVideosFetching = true;
                options.contacts = false;
                options.photos = false;
                options.videos = true;
            }

            this._configureFetchOptions(options);

            var complete = options.complete;

            if (AMA.Util.useXdr()) {
                options.success = function() {
                    if (arguments[0].url.indexOf("contacts") > -1 && arguments[0].isLoaded && self._isTrashedContactsFetching) {
                        self._isTrashedContactsLoaded = true;
                        self._isTrashedContactsFetching = false;
                    } else if (arguments[0].url.indexOf("image") > -1 && arguments[0].isLoaded && self._isTrashedPhotosFetching) {
                        self._isTrashedPhotosLoaded = true;
                        self._isTrashedPhotosFetching = false;
                    } else if (arguments[0].url.indexOf("video") > -1 && arguments[0].isLoaded && self._isTrashedVideosFetching) {
                        self._isTrashedVideosLoaded = true;
                        self._isTrashedVideosFetching = false;
                    }

                    if (self._isTrashedContactsLoaded && self._isTrashedPhotosLoaded && self._isTrashedVideosLoaded) {
                        self.unbind("add");
                    	_.each(self.trashedItems, function (item) {
                            self.add(item);
                        });
                        self.isLoaded = true;
                        self.isFetching = false;
                        
                        self.trigger(AMA.model.BaseData.EVENT.LOADED);
                    } else self.fetch(options);
                };
            } else {
                options.complete = _.bind(function() {
                    if (arguments[1] === "success" && this._isTrashedContactsFetching) {
                        this._isTrashedContactsLoaded = true;
                        this._isTrashedContactsFetching = false;
                    } else if (arguments[1] === "success" && this._isTrashedPhotosFetching) {
                        this._isTrashedPhotosLoaded = true;
                        this._isTrashedPhotosFetching = false;
                    } else if (arguments[1] === "success" && this._isTrashedVideosFetching) {
                        this._isTrashedVideosLoaded = true;
                        this._isTrashedVideosFetching = false;
                    }

                    if (this._isTrashedContactsLoaded && this._isTrashedPhotosLoaded && this._isTrashedVideosLoaded) {
                    	self.unbind("add");
                        _.each(this.trashedItems, function (item) {
                            self.add(item);
                        });
                        this.isLoaded = true;
                        this.isFetching = false;
                        this.trigger(AMA.model.BaseData.EVENT.LOADED);
                    } else this.fetch(options);
                }, this);
            }

            Backbone.Collection.prototype.fetch.call(this, options);
        },

        invalidate: function (options) {
            this.resetTrash();

            Trash.__super__.invalidate.call(this, options);
        },

        parse: function (resp) {
            if (this.trashedItems.length == 0) {
                this.trashedItems = resp.list;
            } else {
                var trashItems = this.trashedItems;

                for (i=0; i<resp.list.length; i++) {
                    trashItems.push(resp.list[i]);
                }
            }
        },

        // Override parent trash function as handling is different because items can be of mixed types
        trash: function (itemIds, callback) {
            if (itemIds.length < 1) {
                AMA.debug("No item IDs specified. Cancelling call to trash items.");
                callback(false);
            }

            var isContactDeletedOrRestored=false,
            isVideoDeletedOrRestored=false,
            isPhotoDeletedOrRestored=false;

            var msg, eventMsg = {};

            var contactsToPurge = {
                    id: AMA.config.endpointId,
                    list: [],
                    total: 0,
                    totalPendingSync: 0,
                    totalSynced: 0
                },
                photosToPurge = {
                    id: AMA.config.endpointId,
                    list: [],
                    total: 0,
                    totalPendingSync: 0,
                    totalSynced: 0,
                    keyword: ""
                },
                videosToPurge = {
                    id: AMA.config.endpointId,
                    list: [],
                    total: 0,
                    totalPendingSync: 0,
                    totalSynced: 0,
                    keyword: ""
                },
                self = this,
                trashModel = this.models,
                xhr1 = null,
                xhr2 = null,
                xhr3 = null;

            // Gather all the items to be purged from the Trash model 
            _.each(trashModel, function (item) {
                for (var i in itemIds) {
                    if (itemIds[i] === item.attributes.id) {
                        item.attributes.visibility = AMA.model.UserData.Status.PURGED;
                        if (item.attributes.fullName) {
                            contactsToPurge.list.push(item.attributes);
                            isContactDeletedOrRestored=true;
                        } else if (item.attributes.fileType && item.attributes.fileType.indexOf("image") > -1) {
                            photosToPurge.list.push(item.attributes);
                            isPhotoDeletedOrRestored=true;
                        } else if (item.attributes.fileType && item.attributes.fileType.indexOf("video") > -1) {
                            videosToPurge.list.push(item.attributes);
                            isVideoDeletedOrRestored=true;
                        }
                    }
                }
            });

            if(AMA.config.enableReporting) {
				if (this._isDropdownTrash) {
					if (this._isDropdownTrash) {
						if(isVideoDeletedOrRestored===true) {
							eventMsg['ActionPerformed'] = "Permanant Delete Videos - Action Performed Dropdown";
							AMA.debug("Reporting: logging event for video deleted permanantly");
							AMA.ReportingManager.reportUserAction(AMA.config.reportingEventTypes.actiondropdeletevideotrash,eventMsg);
						}
						if(isContactDeletedOrRestored===true)	{
							eventMsg['ActionPerformed'] = "Permanant Delete Contacts - Action Performed Dropdown";
							AMA.debug("Reporting: logging event for contact deleted permanantly");
							AMA.ReportingManager.reportUserAction(AMA.config.reportingEventTypes.actiondropdeletecontacttrash,eventMsg);
						}
						if(isPhotoDeletedOrRestored===true) {
							eventMsg['ActionPerformed'] = "Permanant Delete Images - Action Performed Dropdown";
							AMA.debug("Reporting: logging event for photo deleted permanantly");
							AMA.ReportingManager.reportUserAction(AMA.config.reportingEventTypes.actiondropdeleteimagetrash,eventMsg);
						}					
					}
				}
			}

            if (contactsToPurge.list.length < 1 && photosToPurge.list.length < 1 && videosToPurge.list.length < 1) {
                AMA.debug("Specified items not found in Trash. Aborting command.");
                callback(false);
            } else {
                if (AMA.Util.useXdr()) {
                    this.invalidateContacts = false;
                    this.invalidatePhotos = false;
                    this.invalidateVideos = false;
                    this.waitingContacts = true;
                    this.waitingPhotos = true;
                    this.waitingVideos = true;

                    if (contactsToPurge.list.length > 0) {
                        xhr1 = AMA.Util.createCORSRequest("POST", AMA.config.apiHostUrl + "/contacts?devId=" + AMA.config.devId + "&endpointId=" + AMA.config.endpointId + "&authToken=" + AMA.config.authToken + "&_method=PUT");

                        xhr1.onload = function () {
                            try {
                                var response = JSON.parse(this.responseText);
                            }
                            catch (e) {
                                AMA.error("POST /contacts - Trash - response not JSON: " + this.responseText);
                            }
                            
                            if (response) {
                                self.invalidateContacts = true;
                                self.waitingContacts = false;
                                self.checkWaiting(callback);
                            }
                        };
                        xhr1.onerror = function () {
                            AMA.error("Request failed: POST /contacts");
                        };
                        xhr1.onprogress = function () {};
                        xhr1.ontimeout = function () {};
                        xhr1.timeout = 100000; // Prevents IE9 from aborting the request

                        xhr1.send(JSON.stringify(contactsToPurge));
                    } else {
                        this.waitingContacts = false;
                    }

                    if (photosToPurge.list.length > 0) {
                        xhr2 = AMA.Util.createCORSRequest("POST", AMA.config.apiHostUrl + "/files?devId=" + AMA.config.devId + "&endpointId=" + AMA.config.endpointId + "&authToken=" + AMA.config.authToken + "&fileType=image&_method=PUT");

                        xhr2.onload = function () {
                            try {
                                var response = JSON.parse(this.responseText);
                            }
                            catch (e) {
                                 AMA.error("POST /files - Trash - response not JSON: " + this.responseText);
                            }

                            if (response) {
                                self.invalidatePhotos = true;
                                self.waitingPhotos = false;
                                self.checkWaiting(callback);
                            }
                        };
                        xhr2.onerror = function () {
                            AMA.error("Request failed: POST /files");
                        };
                        xhr2.onprogress = function () {};
                        xhr2.ontimeout = function () {};
                        xhr2.timeout = 100000; // Prevents IE9 from aborting the request
                        
                        xhr2.send(JSON.stringify(photosToPurge));
                    } else {
                        this.waitingPhotos = false;
                    }

                    if (videosToPurge.list.length > 0) {
                        xhr3 = AMA.Util.createCORSRequest("POST", AMA.config.apiHostUrl + "/files?devId=" + AMA.config.devId + "&endpointId=" + AMA.config.endpointId + "&authToken=" + AMA.config.authToken + "&fileType=video&_method=PUT");

                        xhr3.onload = function () {
                            try {
                                var response = JSON.parse(this.responseText);
                            }
                            catch (e) {
                                AMA.error("POST /files - Trash - response not JSON: " + this.responseText);
                            }

                            if (response) {
                                self.invalidateVideos = true;
                                self.waitingVideos = false;
                                self.checkWaiting(callback);
                            }
                        };
                        xhr3.onerror = function () {
                            AMA.error("Request failed: POST /files");
                        };
                        xhr3.onprogress = function () {};
                        xhr3.ontimeout = function () {};
                        xhr3.timeout = 100000; // Prevents IE9 from aborting the request

                        xhr3.send(JSON.stringify(videosToPurge));
                    } else {
                        this.waitingVideos = false;
                    }
                } else {
                    $.when(
                        $.ajax({
                            type: "PUT",
                            url: AMA.config.apiHostUrl + "/contacts?devId=" + AMA.config.devId + "&endpointId=" + AMA.config.endpointId + "&authToken=" + AMA.config.authToken,
                            data: JSON.stringify(contactsToPurge),
                            contentType: "application/json"
                        }),
                        $.ajax({
                            type: "PUT",
                            url: AMA.config.apiHostUrl + "/files?devId=" + AMA.config.devId + "&endpointId=" + AMA.config.endpointId + "&authToken=" + AMA.config.authToken + "&fileType=image",
                            data: JSON.stringify(photosToPurge),
                            contentType: "application/json"
                        }),
                        $.ajax({
                            type: "PUT",
                            url: AMA.config.apiHostUrl + "/files?devId=" + AMA.config.devId + "&endpointId=" + AMA.config.endpointId + "&authToken=" + AMA.config.authToken + "&fileType=video",
                            data: JSON.stringify(videosToPurge),
                            contentType: "application/json"
                        })
                    ).done(function (request1, request2, request3) {
                        var refreshContacts = request1[1] === "success" ? true : false,
                            refreshPhotos = request2[1] === "success" ? true : false,
                            refreshVideos = request3[1] === "success" ? true : false;

                        callback(refreshContacts, refreshPhotos, refreshVideos);
                    });
                }
            }
        },

        restore: function (itemIds, callback) {
            if (itemIds.length < 1) {
                AMA.debug("No item IDs specified. Cancelling call to restore items.");
                callback(false);
            }

            var self = this,
                contactsToRestore = [],
                photosToRestore = [],
                videosToRestore = [],
                trashModel = this.models,
                options = {};

            this.invalidateContacts = false;
            this.invalidatePhotos = false;
            this.invalidateVideos = false;
            this.waitingContacts = true;
            this.waitingPhotos = true;
            this.waitingVideos = true;

            // Gather all the items to be restored 
            _.each(trashModel, function (item) {
                var temp;

                temp = _.find(itemIds, function (currentId) {
                    return currentId === item.attributes.id;
                });

                if (temp && item.attributes.fullName) {
                    contactsToRestore.push(item.attributes);
                } else if (temp && item.attributes.fileType && item.attributes.fileType.indexOf("image") > -1) {
                    photosToRestore.push(item.attributes);
                } else if (temp && item.attributes.fileType && item.attributes.fileType.indexOf("video") > -1) {
                    videosToRestore.push(item.attributes);
                }
            });

            if (contactsToRestore.length < 1 && photosToRestore.length < 1 && videosToRestore.length < 1) {
                AMA.debug("Specified items not found in Trash. Aborting command.");
                callback(false);
            } else {
                _.each(contactsToRestore, function (item, index) {
                    item.visibility = AMA.model.UserData.Status.ENABLED;
                });
                _.each(photosToRestore, function (item, index) {
                    item.visibility = AMA.model.UserData.Status.ENABLED;
                });
                _.each(videosToRestore, function (item, index) {
                    item.visibility = AMA.model.UserData.Status.ENABLED;
                });

                if (contactsToRestore.length > 0) {
                    Trash.__super__.restore.call(this, "contacts", contactsToRestore, function (updateSuccess) {
                        if (updateSuccess) self.invalidateContacts = true;
                        self.waitingContacts = false;
                        self.checkWaiting(callback);
                    });
                } else {
                    this.waitingContacts = false;
                }

                if (photosToRestore.length > 0) {
                    Trash.__super__.restore.call(this, "photos", photosToRestore, function (updateSuccess) {
                        if (updateSuccess) self.invalidatePhotos = true;
                        self.waitingPhotos = false;
                        self.checkWaiting(callback);
                    });
                } else {
                    this.waitingPhotos = false;
                }

                if (videosToRestore.length > 0) {
                    Trash.__super__.restore.call(this, "videos", videosToRestore, function (updateSuccess) {
                        if (updateSuccess) self.invalidateVideos = true;
                        self.waitingVideos = false;
                        self.checkWaiting(callback);
                    });
                } else {
                    this.waitingVideos = false;
                }
            }
        },

        checkWaiting: function (callback) {
            if (this.waitingContacts || this.waitingPhotos || this.waitingVideos) {
                return;
            } else {
                callback(this.invalidateContacts, this.invalidatePhotos, this.invalidateVideos);
            }
        },

        setDropdownTrash: function (isFromDropdown) {
            this._isDropdownTrash = isFromDropdown;
        }
    });
})();
/*! Locations */
(function () {

    AMA.namespace("model");

    /**
	 * Location Collection
	 *
	 * @class Locations
	 * @namespace view
	 * @extends AMA.view.BaseData
	 * @constructor
	 */
    var Locations = AMA.model.Locations = AMA.model.BaseData.extend();

    Locations.RESOURCE = "locationHistory";

    /**
	 * Rest URL of this collection
	 *
	 * @property URL
	 * @type string
	 * @static
	 * @final
	 */
    Locations.URL = "/locationHistory";


    /**
	 * Locations Collection Model constructor, Override functions goes here if Model needs additional implementation
	 *
	 */
    Locations.MODEL = AMA.model.BaseData.MODEL.extend({

    });

    AMA.augment(Locations.prototype, {
        _configureUrl: function () {
            this.url = AMA.config.apiHostUrl + Locations.URL + "?devId=" + AMA.config.devId + "&endpointId=" + AMA.config.endpointId + "&authToken=" + AMA.config.authToken;
        },

        parse: function(item) {
            item = Locations.__super__.parse.call(this, item);
            _.each(item, function(list, index) {
                list.id = index;
                list.coordinates = [list.latitude, list.longitude].join();
                list.time = list.eventTime;
                list.accuracy = list.precision;
            });
            return item;
        },
    	/**
    	 * Preprocesses Location Models before using this Collection
    	 *
    	 * @method prepareLocations
    	 */
    	prepareLocations: function () {

    	},

    	/**
    	 * Clear Location Duplicates,  Ideally this should be handled by server
    	 *
    	 * @method clearDuplicateLocations
    	 */
    	clearDuplicateLocations: function () {
            // this.numberOfPoints = this.models.length;

             if (this.models.length < AMA.config.locationHistoryLimit) {
                this.numberOfPoints = this.models.length;
              } else {
                this.numberOfPoints = AMA.config.locationHistoryLimit;
            }
        }
    });

})();

/*! Threats */
(function () {
	AMA.namespace("model");
	
	/**
	 * Last Scan
	 *
	 * @class Threats
	 * @namespace model
	 * @extends AMA.model.BaseData
	 * @constructor
	 */
	var Threats = AMA.model.Threats = AMA.model.BaseData.extend();

	Threats.RESOURCE = "appInfectionScanResults_actionId";

	/**
	 * temporary URL of this collection
	 *
	 * @property URL
	 * @type string
	 * @static
	 * @final
	 */
	Threats.URL = "/appInfectionScanResults";
	
	Threats.MODEL = AMA.model.BaseData.MODEL.extend({
		
	});
	
	AMA.augment(Threats.prototype, {

     	fetch: function () {
			this.url = AMA.config.apiHostUrl + this.constructor.URL + "?" +
				$.param({
	                    devId: AMA.config.devId,
	                    endpointId: AMA.config.endpointId,
	                    authToken: AMA.config.authToken
	                });
			Threats.__super__.fetch.call(this);
			
		},

		_configureUrl: function () {
			    
		}
		
	});

})();

/*! Privacy */
(function () {

    AMA.namespace("model");

    var Privacy = AMA.model.Privacy = AMA.model.BaseData.extend();

    Privacy.RESOURCE = "appVulnerabilityScanResults";

    // TODO: Replace this with 'RESOURCE' property
    Privacy.URL = "/appVulnerabilityScanResults";

    Privacy.MODEL = AMA.model.BaseData.MODEL.extend({
    });

    AMA.augment(Privacy.prototype, {
        /**
         * NOTE: This would be a good addition on the
         * BaseModel.
         */
        initialize: function() {
            Privacy.__super__.initialize.apply(this);
            this.sort_direction = 'asc';
            this.sort_key = 'id';
        },
        sortByKey: function(key, dir) {
            this.sort_key = key;
            this.sort_direction = dir;
            this.sort();
        },
        comparator: function(a, b) {

            a = a.get(this.sort_key);
            b = b.get(this.sort_key);
            a = (typeof a === "string") ? a.toLowerCase() : a;
            b = (typeof b === "string") ? b.toLowerCase() : b;

            if(this.sort_direction === "desc") {
                    return a > b ?  -1 : a < b ? 1 : 0;
            }
            return a > b ?  1 : a < b ? -1 : 0;
        },

        _configureFetchOptions: function (options) {
        },
        /**
         * TO DO: use this if REST is not Yet Available...
         * @private
         */
        _configureUrl: function () {
            this.url = AMA.config.apiHostUrl + Privacy.URL + "?devId=" + AMA.config.devId + "&endpointId=" + AMA.config.endpointId + "&authToken=" + AMA.config.authToken;
            //this.url =  this.constructor.URL;
        },
        fetch: function() {
            Privacy.__super__.fetch.apply(this);
        }

    });

})();

/*! SafeBrowsing */
(function () {
	AMA.namespace("model");
	
	/**
	 * Last Scan
	 *
	 * @class Threats
	 * @namespace model
	 * @extends AMA.model.BaseData
	 * @constructor
	 */
	var SafeBrowsing = AMA.model.SafeBrowsing = AMA.model.BaseData.extend();

	SafeBrowsing.RESOURCE = "browserSecuritySettings";
	
	SafeBrowsing.MODEL = AMA.model.BaseData.MODEL.extend({		
	});
	
	AMA.augment(SafeBrowsing.prototype, {
		
    });
})();
/*! DiagnosticResourcedata */
(function () {
	AMA.namespace("model");
	
	var DiagnosticScanResourceData = AMA.model.DiagnosticScanResourceData = AMA.model.BaseData.extend();
	
    DiagnosticScanResourceData.RESOURCE = "apphealthscanresults_id_resources";
	DiagnosticScanResourceData.URL = "/appHealthScanResults";
	DiagnosticScanResourceData.MODEL = AMA.model.BaseData.MODEL.extend({
		
	});
	
	AMA.augment(DiagnosticScanResourceData.prototype, {
        _configureUrl: function () {
            this.url = AMA.config.apiHostUrl + this.constructor.URL + "/"+AMA.config.endpointId+ "/resources?devId=" + AMA.config.devId + "&endpointId="+ AMA.config.endpointId + "&authToken=" + AMA.config.authToken;
            
            
            AMA.debug("\n\n Health Scan Resources config URL: " + this.url + "\n\n");
        }

		
    });
	
})();
/*! DiagnosticScanApssData */
(function () {
	AMA.namespace("model");

	var DiagnosticScanAppsData = AMA.model.DiagnosticScanAppsData = AMA.model.BaseData.extend();

	DiagnosticScanAppsData.RESOURCE = "apphealthscanresults_id_apps";
	DiagnosticScanAppsData.URL = "/appHealthScanResults";
	DiagnosticScanAppsData.MODEL = AMA.model.BaseData.MODEL.extend({

	});

	AMA.augment(DiagnosticScanAppsData.prototype, {
		_configureUrl: function () {
			this.url = AMA.config.apiHostUrl + this.constructor.URL + "/"+AMA.config.endpointId+ "/apps?devId=" + AMA.config.devId + "&endpointId="+ AMA.config.endpointId + "&authToken=" + AMA.config.authToken + "&limit=*";


			AMA.debug("\n\n Health Scan Apps Data config URL: " + this.url + "\n\n");
		},
		defaults: {
			"name": "",
			"lastUsed": "lastUsedTEST",
			"batteryRating": "",
			"memoryRating": "",
			"storageRating": ""
		}


	});

})();
/*! DataTab */
(function () {

    AMA.namespace("view");

    var DataTab = AMA.view.DataTab = AMA.view.BaseView.extend();

    DataTab.TEMPLATE_ID = "data_tab_template";
    DataTab.TEMPLATE_SRC = "data.tpl";

    // Define toolsets that will appear in the data tab toolbar
    DataTab.TOOLBAR = {
        DEFAULT : [
            "endpoint",
            "storageCapacity",
            "sync",
            "transferData"
        ],
        IPHONE: [
            "endpoint",
            "storageCapacity"
        ]
    };


    _.extend(DataTab.prototype, {
        initialize: function () {
            DataTab.__super__.initialize.apply(this, arguments);
            // init: calculate trash, photos, videos;
        },

        render: function () {
			DataTab.__super__.render.apply(this);

            var firstSubTabShown = false,
                $tabSelector = null,
                self = this;

            function showSubTabSelector (el) {
                var $el = $(el);
                $el.show();

                if (!firstSubTabShown) {
                    // If this is the first subtab, make it the default if one isn't specified
                    if (!self.options.defaultTab) {
                        $el.addClass("selected");
                    }
                    firstSubTabShown = true;
                }
            }

            // Create the sub-tabs depending on capabilities
            if (AMA.models.capabilities.canRead("contacts")) {
                this.contactsTab = new AMA.view.ContactsView({el: "#data_contacts_tab", parent: this});
                this.contactsTab.plug(AMA.view.plugin.InputPlaceholder);
                showSubTabSelector("#data_contacts_tab_selector");
            }

            if (AMA.models.capabilities.canRead("files_fileType_image")) {
                this.photosTab = new AMA.view.PhotosView({el: "#data_photos_tab", parent: this});
                showSubTabSelector("#data_photos_tab_selector");
            }

            if (AMA.models.capabilities.canRead("files_fileType_video")) {
                this.videosTab = new AMA.view.VideosView({el: "#data_videos_tab", parent: this});
                showSubTabSelector("#data_videos_tab_selector");
            }

            // If there is at least one subtab enabled, show the Trash subtab
            if (firstSubTabShown) {
                this.trashTab = new AMA.view.TrashView({el: "#data_trash_tab", parent: this});
                $("#data_trash_tab_selector").show();
            }

            // Highlight the default subtab selector, if specified
            if (this.options.defaultTab) {
                $("#" + this.options.defaultTab + "_selector").addClass("selected");
				
				
				// automatic trigger time spent start
				if (!AMA.config.enableDpTimeTracking) {
					AMA.debug("Reporting: Start DP time spent timer as user is on Data Tab");
					
					AMA.config.enableDpTimeTracking = true;
					AMA.ReportingManager.reportPortalTimeSpent("DP", "Start");
				}
            }

        },

        _setupEvents: function () {
            DataTab.__super__._setupEvents.apply(this);
            var o = this,
                navButtons = o.$el.find(".data-tab-menu"),
                navBarParent = navButtons.parent();

            // Set event handler to switch to the tab even when clicking outside its text link
            this.$el.on("click", ".data-tab-menu", function (e) {
                var hashed = $(this).data("tag"),
                    selected = hashed.split("/")[2];
                /*$(this).find("a").click();*/
                e.preventDefault();
                window.location.hash = hashed;

                /** set selected **/
                o.setSelected(selected)
            });
            if(this.isRendered) {
                this.setSelected(window.location.hash.split("/")[2]);
            }
        },
        events: {
        	"click #sync_settings": "editSyncSettings"
        },
        setSelected:function(subTab) {
            subTab = subTab || "contacts";
            this.$el.find(".tab-"+ subTab).addClass("selected").siblings().removeClass("selected");
        },
        editSyncSettings: function(){
            AMA.page.openSettings("backup");
        }
    });
})();
/* SettingsSummaryView */
(function () {
    
    AMA.namespace("view");

    /**
     * This view shows the SettingsSummaryView
     *
     * @class SettingsSummaryView
     * @namespace view
     * @constructor
     */
    var SettingsSummaryView = AMA.view.SettingsSummaryView = AMA.view.BaseView.extend();

    /**
     * ID of the template
     *
     * @property TEMPLATE_ID
     * @type string
     * @static
     * @final
     */
    SettingsSummaryView.TEMPLATE_ID = "settings_summary_template";

    /**
     * Applicable only to view classes that fetch the aggregated templates for
     * itself and its child views, this property defines the name of the
     * template file to load. The path is defined in AMA.config.templatePath.
     *
     * @property TEMPLATE_SRC
     * @type string
     * @static
     * @final
     */
    SettingsSummaryView.TEMPLATE_SRC = "";
    
    _.extend(SettingsSummaryView.prototype, {
        render: function() {
            SettingsSummaryView.__super__.render.apply(this, arguments);
            if(AMA.Util.isIPhone()) {
                this.transferDataWizard = new AMA.view.TransferDataWizard({
                    el: "#transfer_data_instruction_dialog",
                    parent: this
                });
            }

        },
        _setupEvents: function() {
            var o = this;
            $(".transfer_data_view_instruction").on("click", function() {
                if(o.transferDataWizard.isRendered) {
                    o.transferDataWizard.show();
                } else {
                    o.transferDataWizard._doRender()
                    o.transferDataWizard.show()
                }
            });
        },
        _afterRender: function() {
            if(this.backupData) {
                var showspan = this.$el.find(".iosBackupData .showspan"),
                    text;
                if(showspan.size() > 1) {
                    text = $(showspan[showspan.size()-1]).html();
                    $(showspan[showspan.size()-1]).html("& " + text);
                }

                // this.$el.find(".iosBackupData .showspan");
            }
        },
        _processData: function(item) {
            var data = {}, pos=0, day="";
            // initialize CSS class "hide" to hide all elements initially
            data["backupData"] = {
                "syncContacts": "hide",
                "syncPhotos": "hide",
                "syncVideos": "hide"
            };
            data["frequency"] = {
                "NEVER": "hide",
                "DAILY": "hide",
                "WEEKLY": "hide"
            };
            data["day"] = {
                "MONDAY": "hide",
                "TUESDAY": "hide",
                "WEDNESDAY": "hide",
                "THURSDAY": "hide",
                "FRIDAY": "hide",
                "SATURDAY": "hide",
                "SUNDAY": "hide"
            };
            data["backupConnection"] = {
                "Wifi": "hide",
                "MobileData": "hide"
            };
            data["rangeStart"]="";
            data["rangeEnd"]="";

            // show the necessary elements by changing CSS class to "show"
            data.frequency[item.autosyncTime] = "";
            if( item.autosyncTime !== "NEVER" ) {
                if( item.autosyncDay ) {
                    day=item.autosyncDay.toUpperCase();
                }
                else {
                    day="";
                }
                data.day[day] = "showspan";
            }
            data["batteryLevelThreshold"]=item.autosyncBatteryThreshold;
            if( item.syncContactsEnabled ) {
                data.backupData["syncContacts"]="showspan";
            }
            if( item.syncPhotosEnabled ) {
                data.backupData["syncPhotos"]="showspan";
            }
            if( item.syncVideosEnabled ) {
                data.backupData["syncVideos"]="showspan";
            }
            if( item.syncOnWifi ) {
                data.backupConnection["Wifi"]="showspan";
            }
            if( item.syncOnMobileData ) {
                data.backupConnection["MobileData"]="showspan";
            }
            this.backupData = data.backupData;
            return data;

        }

   });

})();
/*! ContactsView */
(function () {
    AMA.namespace("view");

    var ContactsView = AMA.view.ContactsView = AMA.view.BaseView.extend();

    ContactsView.TEMPLATE_ID = "data_contacts_template";
    ContactsView.TEMPLATE_SRC = "contacts.tpl";

    ContactsView.EXPORT_ENDPOINT = "formattedContacts";


    AMA.augment(ContactsView.prototype, {
        events: {
            "click .create_contacts_link" : "createContacts",
            "click .import_contacts_link" : "importContacts",
            "click .batch_perform_button" : "processBatchAction",
            "click .less_is_more_link" : "showLessIsMoreDialog",
            "click .console.transferdata .transferdetails a.link_text": "transferDialog",
            "click .print_contacts_link": "print",
            "click .export_contacts_link": "exportContacts"
        },

        initialize: function () {
            ContactsView.__super__.initialize.apply(this, arguments);

            this.contactsList = null;
        },

        print: function() {
            var url = "/web/print.html";
            if (AMA.models.contacts.length) {
                window.open(url, "cb_print");
            } else {
                AMA.page.standardDialogs.error($("#no_contacts_to_print").html())
            }
        },

        exportContacts: function () {
            // Check that there are contacts to export
            if (AMA.models.contacts.length < 1) {
                AMA.page.standardDialogs.error($("#no_contacts_to_export").html());
                return;
            }

            document.location.href = AMA.config.apiHostUrl + "/" + ContactsView.EXPORT_ENDPOINT + "?" +
                $.param({
                    devId: AMA.config.devId,
                    authToken: AMA.config.authToken,
                    endpointId: AMA.config.endpointId
                });
        },

        render: function () {
            ContactsView.__super__.render.apply(this);

            this._isIPhone = AMA.Util.isIPhone();
            if (this._isIPhone) {
                this.$el.find(".console.transferdata").show();
            } else {
                this.$el.find(".console.transferdata").hide();
            }

            this.contactsImport = new AMA.view.ContactsImportView({
                el: "#data_contacts_import",
                parent: this,
                data: false,
                hidden: true
            });

            this.contactEditor = new AMA.view.ContactEditor({
                el: "#data_contact_add-edit",
                parent: this,
                dataClass: AMA.models.contacts.constructor,
                hidden : true
            });

            this.contactsList = new AMA.view.ContactsListView({
                el: "#data_contacts_list",
                parent: this,
                data: AMA.models.contacts
            })
            .plug(AMA.view.plugin.Breakdown,{
                breakdownContainer: "#data_contacts_breakdown"
            })
//            .plug(AMA.view.plugin.ApiPaginator, {
//                pageSelector: "#data_contacts_pageselector"
//            })
			.plug(AMA.view.plugin.ApiListScrollLoader,{
				scrollContainer: "#data_contacts_list",
				listItemType: "li",
				listItemClassname: "rt_row",
				editorElement: "#data_contact_add-edit"
			})             
            .plug(AMA.view.plugin.ApiSearch, {
                searchInput: "#data_contacts_searchbar .searchinput"
            })
            .plug(AMA.view.plugin.MultiSelector, {
                selectAll: "#data_contacts_selectall"
            });

            this.settingsSummary = new AMA.view.SettingsSummaryView({
                el: "#contacts_settings_summary_placeholder",
                data: AMA.models.syncsettings,
                parent: this
            });

            this.contactDetails = new AMA.view.ContactDetailsView({
                el: "#data_contact_details",
                parent: this,
                hidden: true,
                dataClass: AMA.models.contacts.constructor,
                listView: this.contactsList
            });

            this.lessIsMoreDialog = new AMA.view.LessIsMoreDialog({
                el: "#lessismoredialog",
                width: 670,
                parent: this,
                hidden: true
            });

            // Show the initially-hidden Contact Details panel upon
            // first rendering of Contacts List
            this.contactsList.once(AMA.view.BaseView.EVENT.RENDERED, function () {
                // Show Contact Details only when there is a selected item in the list
                if (this.contactsList.selectedItem) {
                    this.contactDetails.show();
                }
            }, this);           

            $(document).ready(function(){
            	/*$('#commands_searchinput').blur(function(){
            		 if( !$(this).val() ) {
	            		$(this).css("padding","17px")
	            			.css("padding-left","40px")
	            			.css("background-image","url('img/search_icon.png')")
	            			.css("background-repeat","no-repeat")
	            			.css("background-size"," contain"); 
            		 }
            	}).focus(function(){
            		$(this).css("padding-left","0px")
        			.css("background-image","none");    
                });*/
                
            });
        },
        
        createContacts: function() {
        	//console.log(this.$el.find("#contactstable").css("display")=="block");
        	
            this.contactEditor._mode = AMA.view.ContactEditor.MODE.CREATE;
            this.contactEditor.setData(false);
            this.contactEditor.show(AMA.view.ContactEditor.MODE.CREATE);
            if($('#data_contacts_tab').find(".row-offcanvas-right").hasClass("active")){
            	$('#data_contacts_tab').find("#data_contact_add-edit").addClass('antiActive');
            }else{
            	$('#data_contacts_tab').find("#data_contact_add-edit").removeClass('antiActive');
            }           
        },

        editContact: function(model) {
            this.contactEditor._mode = AMA.view.ContactEditor.MODE.EDIT;
            this.contactEditor.setData(this.contactDetails.data.at(0));
            this.contactEditor.show(AMA.view.ContactEditor.MODE.EDIT);
        },

        importContacts: function() {
            this.contactsImport.show();
        },

        processBatchAction: function () {
            var msg;

            // Determine the action to be performed based on the 
            // current selection on the action dropdown
            var action = $("#data_contacts_multiaction_select").val();

            // Handle when no action has been selected
            if (action == "") {
                msg = $("#msg_error_no_action_selected").html();
                AMA.page.standardDialogs.error(msg);
                return false;
            }

            var checkedItems = this.contactsList.getCheckedItems();

            // Handle when no contacts have been selected
            if (checkedItems.length == 0) {
                msg = $("#msg_error_no_contact_selected").html();
                AMA.page.standardDialogs.error(msg);
                return false;
            }

            function performAction() {
                var eventMsg = {};

                // Show the Loading dialog
                var msg = $("#msg_loadingdialog").html();
                AMA.page.standardDialogs.loading(msg);

                switch (action){
                    case "delete" :
                        // Send delete request
                        AMA.models.contacts.trash("contacts", checkedItems, function (refreshModel) {
                            // On success, hide the loading dialog and refresh the contacts model
                            AMA.page.standardDialogs.hideloading();
                            if (refreshModel) {
                                AMA.models.contacts.invalidate();
                                AMA.models.trash.invalidate();
                            }
                        });
                        break;
                    case "addToPhone" :
                        // Send add request
                        AMA.models.contacts.addRemove("add", "contacts", checkedItems, function (refreshModel) {
                            // On success, hide the loading dialog and refresh the contacts model
                            AMA.page.standardDialogs.hideloading();
                            if (refreshModel) {
                                AMA.models.contacts.invalidate();
                            }
                        });
                        break;
                    case "removeFromPhone" :
                        // Send remove request
                        AMA.models.contacts.addRemove("remove", "contacts", checkedItems, function (refreshModel) {
                            // On success, hide the loading dialog and refresh the contacts model
                            AMA.page.standardDialogs.hideloading();
                            if (refreshModel) {
                                AMA.models.contacts.invalidate();
                            } 
                        });
                        break;
                }

                //FIXME: Move to appropriate callback areas
                if(AMA.config.enableReporting) {
                // Log reporting event  for delete action performed dropdown
                    if(action === "delete") {
                        eventMsg['ActionPerformed'] = "Delete Contact from phone & web- ActionPerformed dropdown";
                        AMA.debug("Reporting.logging for contact deleted from phone & web ");
                        AMA.ReportingManager.reportUserAction(AMA.config.reportingEventTypes.actiondropdeletecontact,eventMsg);
                    }
                    // Log reporting event  for add to phone action performed dropdown
                    if(action === "addToPhone") {
                        eventMsg['ActionPerformed'] = "Add contact to Device - ActionPerformed dropdown";
                        AMA.debug("Reporting.logging for contact added to phone ");
                        AMA.ReportingManager.reportUserAction(AMA.config.reportingEventTypes.actiondropdownaddcontact,eventMsg);
                    }
                    // Log reporting event  for remove from  phone action performed dropdown
                    if(action === "removeFromPhone") {
                        eventMsg['ActionPerformed'] = "Remove contact from Device - ActionPerformed dropdown";
                        AMA.debug("Reporting.logging for contact removed from phone ");
                        AMA.ReportingManager.reportUserAction(AMA.config.reportingEventTypes.actiondropremovecontact,eventMsg);
                    }
                }
            }

            // Display confirmation dialog if DELETE, otherwise perform action immediately
            if (action === "delete") {
                msg = $("#msg_confirm_delete_contact" + (checkedItems.length > 1 ? "s" : "")).html();
                AMA.page.standardDialogs.confirm(msg, performAction);

            } else {
                performAction();
            }
        },

        transferDialog:function () {
            Backbone.globalEvent.trigger("showTranferData");
        },

        showLessIsMoreDialog: function () {
            this.lessIsMoreDialog.show();
        },

        toggleDetailView:function(triggeredElement) {
        	this.toggleSlideCanvas();
        },
        
        toggleListView:function() {
        	this.toggleSlideCanvas();
        },	
		
        toggleSlideCanvas: function() {
        	this.$el.find(".row-offcanvas").toggleClass("active");
        	this.$el.find(".sidebar-offcanvas").toggleClass("active");
        	if(this.$el.find("#records_detailshalf").css("position") == "absolute") {
        		if(this.$el.find(".row-offcanvas").hasClass("active")){
            		AMA.view.ContactsView.bodyScrollTopCurr=$('body').scrollTop();
            		AMA.view.ContactsView.HTMLScrollTopCurr=$('html').scrollTop();
					$("body,html").scrollTop(0);
				
        		}else{
            		$("body").scrollTop(AMA.view.ContactsView.bodyScrollTopCurr);
            		$("html").scrollTop(AMA.view.ContactsView.HTMLScrollTopCurr);          			
        		}
        	}
        }
        
    });
})();
/*! ContactsListView */
(function () {

	AMA.namespace("view");

	/**
	 * List view implementation of Contacts.
	 *
	 * @class ContactsListView
	 * @namespace view
	 * @extends AMA.view.ListView
	 * @constructor
	 */
	var ContactsListView = AMA.view.ContactsListView = AMA.view.ListView.extend();


	/**
	 * defines the template ID which corresponds to the 'id' property of the template
	 * <script> used by this class.
	 *
	 * @property TEMPLATE_ID
	 * @type string
	 * @static
	 * @final
	 */
	ContactsListView.TEMPLATE_ID = "contacts_list_template";


	/**
	 * Applicable only to view classes that fetch the aggregated templates for
	 * itself and its child views, this property defines the name of the
	 * template file to load. The path is defined in AMA.config.templatePath.
	 *
	 * @property TEMPLATE_SRC
	 * @type string
	 * @static
	 * @final
	 */
	ContactsListView.TEMPLATE_SRC = "";

	AMA.augment(ContactsListView.prototype, {
		/**
		 * renders this view.
		 *
		 * @override
		 * @method render
		 */
		render: function () {
			ContactsListView.__super__.render.apply(this, arguments);

			AMA.debug(this._dataset.length + " items rendered in contact list view.");
		},

        _setupEvents: function() {
        	AMA.view.ContactsListView.__super__._setupEvents.call(this, arguments);
            var o = this;
            this.$el.find("." + AMA.view.ContactsListView.CSS.ITEM).on("click", function(e) {
                e.preventDefault();
                o.parent.toggleDetailView(this);
            });

        },

		_processData: function (item, index) {
			ContactsListView.__super__._processData.call(this, item, index);

			return item;
		}

	});

})();

/*! ContactDetailsView */
(function () {

	AMA.namespace("view");

	var ContactDetailsView = AMA.view.ContactDetailsView = AMA.view.BaseView.extend();

	ContactDetailsView.TEMPLATE_ID = "contact_details_template";
	ContactDetailsView.TEMPLATE_SRC = "";
    ContactDetailsView.KEY_ARRAY =["im","imAIM","imGTalk","imICQ","imJabber","imQQ","imSkype", "imWindowsLive","imYahoo","imOther","imOther2","imOther1",
        "webSiteUrl","otherUrl", "preferredUrl", "homeUrl", "url", "workUrl", "mobilePhone", "workPhone", "homePhone", "fax", "homeFax", "workFax", "pager",
        "email", "homeEmail", "localEmail", "otherEmail", "workEmail", "otherPhone", "carPhone", "radioPhone", "localPhone", "assistantPhone", "iPhone"];
    ContactDetailsView.KEY_ARRAY_PHONE =["mobilePhone", "workPhone", "homePhone", "fax", "homeFax", "workFax", "pager",
        "otherPhone", "carPhone", "radioPhone", "localPhone", "assistantPhone", "iPhone"];
    ContactDetailsView.KEY_ARRAY_EMAIL = ["email", "homeEmail", "localEmail", "otherEmail", "workEmail"];
    ContactDetailsView.KEY_ARRAY_IM = ["im","imAIM","imGTalk","imICQ","imJabber","imQQ","imSkype", "imWindowsLive","imYahoo","imOther","imOther2","imOther1"];
    ContactDetailsView.KEY_ARRAY_URL = ["webSiteUrl","otherUrl", "preferredUrl", "homeUrl", "workUrl", "url"];

	var maxNameDisplayLength = 35;

	var sections = [
				{	title:	null,
					body:	"details_toptwo",
					typePrefixes: [	"birthday",
									"anniversary",
									"nickName",
									"relationship",
									"notes",
									"webSiteUrl"]
				},
				{	title:	"details_contactinfotitle",
					body:	"details_contactinfo",
					typePrefixes: [ "mobilePhone1",
					                "mobilePhone2",
					                "mobilePhone3",
									"fax",
									"homefax",
									"workfax",
									"phone",
									"workPhone1",
									"workPhone2",
									"workPhone3",
									"homePhone1",
									"homePhone2",
									"otherPhone",
									"localPhone",
									"iphone",
									"pager",
									"preferredPhone",
									"email1",
									"email2",
									"email3",
		          					"homeEmail",
		          					"workEmail",
		          					"otherEmail",
		          					"localEmail",
		          					"im1",
		          					"im2",
		          					"im3",
		        					"imOther",
		        					"picture",
		        					"resourceName",
		        					"resourceTimestamp",
		        					"resourceVersion",
		        					"imAIM",
		        					"imGTalk",
		        					"imICQ",
		        					"imJabber",
		        					"imQQ",
		        					"imSkype",
		        					"imWindowsLive",
		        					"imYahoo",
									"relationship",
		                            "formattedHomeAddress"],
		            alwaysOn: true
		        },
				{	title:	"details_formattedworkaddresstitle",
					body:	"details_formattedworkaddress",
                    typePrefixes: [ "companyName",
                                 "position",
                                 "department",
                                 "formattedWorkAddress",
                                 "workJobTitle",
                                 "workCompany",
                                 "workDepartment"],
					noAttributeDisplay: false
				},
				{	title:	"details_formattedotheraddresstitle",
					body:	"details_formattedotheraddress",
					typePrefixes: [ "formattedOtherAddress"],
					noAttributeDisplay: true
				},
				{	title:	"details_formattedcustomaddresstitle",
					body:	"details_formattedcustomaddress",
					typePrefixes: [ "formattedLocalAddress"],
					noAttributeDisplay: true
				},
				{	title:	"details_othertitle",
					body:	"details_other",
					typePrefixes: [""]
				}
			];

	var excludedFields = [
	 				"fullName",
	 				"firstName",
	 				"middleName",
	 				"lastName",
	 				"suffix",
	 				"prefix",
	 				"category",
	 				"contactEnabledMixin",
	 				"mixinMimeType",
	 				"mixinIdentifier",
	 				"mixinDisplayIdentifier",
	 				"localStreet",
	 				"localStreetExtra",
	 			    "localNeighborhood",
	 				"localCity",
	 				"localState",
	 				"localCountry",
	 				"localCountryCode",
	 				"localZipCode",
	 				"otherStreet",
	 				"otherStreetExtra",
	 			    "otherNeighborhood",
	 				"otherCity",
	 				"otherState",
	 				"otherCountry",
	 				"otherCountryCode",
	 				"otherZipCode",
	 				"workStreet",
	 				"workStreetExtra",
	 			    "workNeighborhood",
	 				"workCity",
	 				"workState",
	 				"workCountry",
	 				"workCountryCode",
	 				"workZipCode",
	 				"homeStreet",
	 				"homeStreetExtra",
	 			    "homeNeighborhood",
	 				"homeCity",
	 				"homeState",
	 				"homeCountry",
	 				"homeCountryCode",
	 				"homeZipCode",
	 				"localGroupName",
	 				"exchangeName",
	 				"kind"
	 			];

	var specialFormatfields = {
			"email1" : "email",
			"email2" : "email",
			"email3" : "email",
			"homeEmail": "email",
			"workEmail": "email",
			"otherEmail": "email",
			"localEmail": "email",
			"formattedHomeAddress": "address",
			"formattedWorkAddress": "address",
			"webSiteUrl": "url",
			"birthday": "date",
			"anniversary": "date"
	};

	var contactResource = [
		// Contact source indicators for Sync
		{type: 'Gmail', indicator: 'com.google', image: 'extres_google'},
		{type: 'Outlook', indicator: 'com.android.exchange', image: 'extres_microsoft'},
		{type: 'Facebook', indicator: 'com.htc.socialnetwork.facebook', image: 'extres_facebook'},
		{type: 'Facebook', indicator: 'com.facebook.auth.login', image: 'extres_facebook'},
		{type: 'Twitter', indicator: 'com.htc.htctwitter', image: 'extres_twitter'},
		{type: 'Twitter', indicator: 'com.sec.android.app.snsaccounttwitter.account_type', image: 'extres_twitter'},
		{type: 'Yahoo', indicator: 'com.yahoo.mobile.client.share.sync', image: 'extres_yahoo'},
		{type: 'Flickr', indicator: 'com.htc.socialnetwork.flickr', image: 'extres_flickr'},
		{type: 'Hotmail', indicator: 'com.hotmail.Z7.eas', image: 'extres_hotmail'},

		// Contact source indicators for import
		{type: 'Gmail', indicator: 'gmail', image: 'extres_google'},
		{type: 'Outlook', indicator: 'outlook', image: 'extres_microsoft'},
		{type: 'My Contacts Backup', indicator: 'My Contacts Backup', image: 'extres_default'},
		{type: 'Yahoo', indicator: 'yahoo', image: 'extres_yahoo'}
	];

	var formatter = {
		"normal" : function(value) {
			return value;
		},
		"email" : function(value) {
			return "<a class='link_text' href='mailto:"+value+"'>"+value+"</a>";
		},
		"url" : function(value) {
            var href = value;
            if(value.indexOf("http://") !== 0)
            {
                href = "http://" + value;
            }
            return "<a class='link_text' href='"+href+"' target='_blank'>"+value+"</a>";
		},
		"address" : function(value) {
			var address = value.replace(/ /g, "%20");
			return value + " &nbsp;&nbsp;<a target='_blank' href='http://www.bing.com/maps/default.aspx?v=2&where1="+address+"'>map</a>";
		},
		"date" : function(value) {
            return $.datepicker.formatDate('mm/dd/yy', new Date(parseInt(value)));
			var gmtTime = value;
			var formattedDate = "";
			if(gmtTime != null && gmtTime != "")
			{
				var date = new Date(parseInt(gmtTime));
				formattedDate = AMA.Util.formatDate(date, AMA.config.dateFormat, true);
			}
			return formattedDate;
		},
        "phone": function (phoneField) {
            var num = phoneField.replace(/[^\d]/g, '')
                    .replace(/[^0-9\.]+/g, '');
                return "(" + num.substring(0, 3) + ")-" + num.substring(3, 6) + "-" + num.substring(6);

        }
    }

	AMA.augment(ContactDetailsView.prototype, {
		initialize: function (options) {
			ContactDetailsView.__super__.initialize.apply(this, arguments);

	    	this.options.trash = options && options.trash || false;
	    	this.options.listView = options && options.listView || {};

	    	var o = this;
	    	if (this.options.listView) {
	    		if (!this.options.trash) {
	    			this.options.listView.on(AMA.view.ListView.EVENT.ITEM_SELECTED, function (data) {
			    		o.setData(data);
			    		o.show();
			    	});
	    		}
		    	this.options.listView.on(AMA.view.ListView.EVENT.SELECTION_CLEARED, function () {
		    		o.hide();
		    	});
	    	} else {
	    		AMA.warning("This instance of ContactDetailsView is not linked to a contacts list. Data switching will not apply.");
	    	}

		},
		
		render: function () {
			var data = (this.data && this.data.length > 0) ? this.data.toJSON()[0] : {},
				content = "",
				o = this;
				
			AMA.models.contactDetails.getDetails(data.id, function (getSuccess, itemDetails){
				if (getSuccess){
					// Generate the content from template + data
					content = _.template(o.template, o._processData(itemDetails));
	
					// Attach the content to the container element
					o.$el.html(content);
					
					o._setupEvents();
				}
			});
		},

		_setupEvents: function () {
			var o = this;

			var listView = this.options.listView;
			var listViewData = listView.data;

			if(AMA.Util.isIPhone()){
				this.$el.find('.details_buttonholder').hide();
				this.$el.find(".contact_note").hide();
			}else{
				this.$el.find('.details_buttonholder').show();
				this.$el.find(".contact_note").show();
			}

			this.$el.find(".details_editbutton").on("click", function() {
				o.parent.editContact(o.data);
			});

			this.$el.find(".details_removefromdevicebutton").on("click", function() {
				// Show Loading dialog
				$("#loading_custom_dialog").addClass('show').removeClass('hide');
				AMA.models.contacts.addRemove("remove", "contacts", [o.data.models[0].id], function (refreshModel) {
                	// On success, hide the loading dialog and refresh the photos model
					$("#loading_custom_dialog").addClass('hide').removeClass('show');
                    if (refreshModel) AMA.models.contacts.invalidate();
                });
                //o.parent.toggleListView();
			});

			this.$el.find(".details_addtodevicebutton").on("click", function() {
				// Show Loading dialog
				$("#loading_custom_dialog").addClass('show').removeClass('hide');
				AMA.models.contacts.addRemove("add", "contacts", [o.data.models[0].id], function (refreshModel) {
                	// On success, hide the loading dialog and refresh the photos model
					$("#loading_custom_dialog").addClass('hide').removeClass('show');
                    if (refreshModel) AMA.models.contacts.invalidate();
                });
                //o.parent.toggleListView();
			});

			this.$el.find(".details_deletebutton").on("click", function() {
				var self = this,
					msg = $("#msg_confirm_delete_contact").html();
				
				// Show Confirm Delete dialog
				AMA.page.standardDialogs.confirm(msg, function () {
					// Hide Confirm Delete dialog
					AMA.page.standardDialogs.confirmDialog.hide();

					// Show Loading dialog
					var msg = $("#msg_loadingdialog").html();
					AMA.page.standardDialogs.loading(msg);
					
					// Send delete request
                    AMA.models.contacts.trash("contacts", [self.attributes.uid.value], function (refreshModel) {
	                    // On success, hide the loading dialog and refresh the contacts model
	                    AMA.page.standardDialogs.hideloading();
	                    if (refreshModel) {
	                    	AMA.models.contacts.invalidate();
	                    	AMA.models.trash.invalidate();
	                    }
                    });
                    o.parent.toggleListView();
				});
			});

			this.$el.find(".details_undeletebutton").on("click", function() {
				var self = this,
				msg = $("#msg_confirm_restore_trashitem").html();
				
				// Show Confirm Restore dialog
				AMA.page.standardDialogs.confirm(msg, function () {
					// Hide Confirm Delete dialog
					AMA.page.standardDialogs.confirmDialog.hide();

					// Show Loading dialog
					var msg = $("#msg_loadingdialog").html();
					AMA.page.standardDialogs.loading(msg);
					
					// Send restore request
                    AMA.models.trash.restore([self.attributes.uid.value], function () {
	                    // On success, hide the loading dialog and refresh the contacts model
	                    AMA.page.standardDialogs.hideloading();
	                    if (arguments[0]) {
	                    	AMA.models.trash.invalidate();
	                    	AMA.models.contacts.invalidate();
	                    }
                    });

                    o.parent.toggleListView();
				});
			});
			
			this.$el.find(".details_deletefromtrashbutton").on("click", function() {
				var self = this,
					msg = $("#msg_confirm_permadelete_trashitem").html();
				
				// Show Confirm Restore dialog
				AMA.page.standardDialogs.confirm(msg, function () {
					// Hide Confirm Delete dialog
					AMA.page.standardDialogs.confirmDialog.hide();

					// Show Loading dialog
					var msg = $("#msg_loadingdialog").html();
					AMA.page.standardDialogs.loading(msg);

					// Send delete request
                    AMA.models.trash.trash([self.attributes.uid.value], function () {
	                    // On success, hide the loading dialog and refresh the trash model
	                    AMA.page.standardDialogs.hideloading();
	                    if (arguments[0]) {
	                    	AMA.models.trash.invalidate();
	                    }
                    });
				});

                o.parent.toggleListView();
			});
            o.$el.find(".close").on("click", function(e) {
                o.parent.toggleListView();
            });
		},

		_processData: function (item) {
			var data = {};

			//TODO: have to properly set this flag
			var showUnsupported = true;

			data.deviceName=AMA.models.endpoints.toJSON()[0].platformfriendlyname;
		
			//Jebber.Debug.print("BARF: " + rowGuid + " - Show empty fields: " + showEmptyFields + " - Enable fields: " + enableFields);
			if (item == null)
			{
				data.fullName = "";
				return;
			}
			// Special case for full name field since it is always present
	        var maxNameLength = maxNameDisplayLength;

	        // TODO:
//	        if(this.parent.attr("id") === "rs_details")
//	        {
//	           maxNameLength = this.maxNameDisplayLengthShifter;
//	        }
	        var displayName = this._getDisplayName(item);
	        data.fullName = AMA.Util.escapeSpecialCharacters(AMA.Util.truncateString(displayName, maxNameLength));
	        data.fullNameTitle = displayName;

			var mediaId = item.photoUUID;
			if (mediaId != null && mediaId != "")
			{
				data.pictureSrc = AMA.config.legacyApiBaseUrl+"/records.poo?method=retrieveThumbnail&csrfvalue="+AMA.config.csrfToken+"&mediaid="+mediaId+"&max=300";
			} else {
				data.pictureSrc = AMA.config.commonImagePath + "silhouette.png";
			}

			var someNotSupported = false;

			for (var i=0;i<sections.length;i++)
			{
				var sectionTitleClass = sections[i].title;
				var alwaysDisplayTitle = sections[i].alwaysOn;
				var sectionBodyClass = sections[i].body;
				var sectionTypes = sections[i].typePrefixes;
				var sectionEmpty = true;

				for (var j=0;j<sectionTypes.length;j++)
				{
					var typePrefix = sectionTypes[j];
					//var fieldCssId = this.convertKeyToId(typePrefix);
					var fieldValue = item[typePrefix];

					data[typePrefix] = {};
					data[typePrefix].value = "";
					data[typePrefix].elClass =  "";
					data[typePrefix].valueClass = "";
					data[typePrefix].display = "none";

					var excludedField = AMA.Util.itemExistsInArray(typePrefix, excludedFields);
					//TODO: !Jebber.Util.itemExistsInArray(typePrefix, ServerConstants.excludedFields checking
					if (!excludedField)
					{
						var supported = true;
						/*
						if (AMA.models.endpoints.models.length > 0) {
							var maxchars = AMA.models.endpoints.models[0].get("maxchars");
							if (!maxchars[typePrefix]) {
								supported = false;
							}
						}
						*/

						if (showUnsupported || supported)
						{
							//Jebber.Debug.print(fieldId + " : " + displayName + " - " + fieldValue);
							if (fieldValue != null && fieldValue !== "")
							{
								fieldValue = AMA.Util.escapeSpecialCharacters(fieldValue);

								var fieldType = specialFormatfields[typePrefix];
								if (!fieldType) {
									fieldValue = formatter.normal(fieldValue);
								} else {
									fieldValue = formatter[fieldType](fieldValue);
								}

								sectionEmpty = false;
								//Jebber.Debug.print("Making line item: " + fieldCssId + ", " + displayName + ", " + fieldValue + ", " + supported);

								if (AMA.model.Contacts.isPhoneType(typePrefix))
								{
									// TODD: migrate Jebber.PhoneNumberValidation.formatPhone
									//fieldValue = Jebber.PhoneNumberValidation.formatPhone(fieldValue);
								}

								if (typePrefix === "accountType")
								{
									fieldValue = this._parseContactSource(fieldValue);
								}

								// generate HTML for this node depending on its field type
								if(AMA.model.Contacts.getFieldType(typePrefix) == "date")
								{
									fieldValue = AMA.Util.dateFormat(value);
								}

								// TODO: Have to first check endpoint if this field is supported
								//
								var elClass = "details_lineitem",
									valueElClass = "details_lineitemvalue shifter_details_lineitemvalue";

								if (!supported)
								{
									elClass = "details_lineitem details_lineitemunsupported";
									valueElClass = "details_lineitemvalue shifter_details_lineitemvalue details_lineitemvalueunsupported";
								}

								data[typePrefix] = {};
								data[typePrefix].value = fieldValue;
								data[typePrefix].elClass =  elClass;
								data[typePrefix].valueClass = valueElClass;
								data[typePrefix].display = "block";
							}
						}
					}
				}
			}

			// process which buttons to display
			var shown = "display:table-cell;";
			var hidden = "display:none;";
			data.buttonStyles = {
				edit: hidden,
				removeFromDevice: hidden,
				addToDevice: hidden,
				trash: hidden,
				restore: hidden,
				permanentDelete: hidden
			};
			data.recordStatusStyle = {
				addToPhone: hidden,
				removeFromPhone: hidden,
				webOnly: hidden,
				onDevice: hidden
			};
			
			if (this.options.trash) {
				data.buttonStyles.restore = shown;
				data.buttonStyles.permanentDelete = shown;
			} else {
				data.buttonStyles.edit = shown;
				data.buttonStyles.trash = shown;
			}
			
			if (item.visibility === AMA.model.UserData.Status.ENABLED) {
				if (item.onPhone || item.pendingCreate) {
					data.buttonStyles.removeFromDevice = shown;
				}
				else {
					data.buttonStyles.addToDevice = shown;
				} 
				
				if (item.pendingCreate) {
					data.recordStatusStyle.addToPhone = shown;
				}
				else if (item.pendingDelete && item.onPhone) {
					data.recordStatusStyle.removeFromPhone = shown;
				}
				else if (item.onPhone) {
					data.recordStatusStyle.onDevice = shown;
				}
				else {
					data.recordStatusStyle.webOnly = shown;
				}
			}

            data.endpointName = "Unknown Device";
            if (AMA.models.endpoints.isLoaded) {
                data.endpointName = AMA.models.endpoints.toJSON()[0].platformfriendlyname;
            }

			data.id = item.id;
            _.each(ContactDetailsView.KEY_ARRAY, function(key) {
                if(key in item) {
                    var tempo = [],
                        allIn = function() {
                            if(_.indexOf(ContactDetailsView.KEY_ARRAY_PHONE, key, false) !== -1) {
                                _.each(item[key], function(name) {
                                    tempo.push(formatter.phone(name));
                                });
                            } else if(_.indexOf(ContactDetailsView.KEY_ARRAY_IM, key, false) !== -1) {
                                _.each(item[key], function(name) {
                                    tempo.push(formatter.normal(name));
                                });
                            } else if(_.indexOf(ContactDetailsView.KEY_ARRAY_EMAIL, key, false) !== -1) {
                                _.each(item[key], function(name) {
                                    tempo.push(formatter.email(name));
                                });
                            } else if(_.indexOf(ContactDetailsView.KEY_ARRAY_URL, key, false) !== -1) {
                                _.each(item[key], function(name) {
                                    tempo.push(formatter.url(name));
                                });
                            }
                            return tempo;
                        };
                    data[key] = {allIn: allIn().join("<br/>"), myClass: (tempo.length) ? "" : "hidden" };
                } else {
                    data[key] = {allIn: "", myClass: "hidden" };
                }
            }, this);
			return data;
		},

		_getDisplayName: function (item) {
			return item.fullName ||
						this._computeFullName(item) ||
						item.companyName ||
						item.email;
		},

		_computeFullName: function (item) {
			var firstName = item.firstName,
				middleName = item.middleName,
				lastName = item.lastName;

			return firstName + (firstName && middleName ? " " : "") + middleName +
					((firstName || middleName) && lastName ? " " : "") + lastName;
		},

		_parseContactSource: function (value) {
			var result = AMA.config.skinName;

			for(var i=0;i<contactResource.length;i++)
			{
				if(value.toLowerCase() == contactResource[i]['indicator'])
				{
					result = contactResource[i]['type'];
					break;
				}
			}

			return result;
	    }

	});

})();

/*! ContactsImportView */
(function () {
    AMA.namespace("view");

    var ContactsImportView = AMA.view.ContactsImportView = AMA.view.BaseView.extend();

    ContactsImportView.TEMPLATE_ID = "contacts_import_template";
    ContactsImportView.TEMPLATE_SRC = "";

    ContactsImportView.CSS = {
        CLOSEVIEW: "#cancel_import",
        FEATURE_UNSUPPORTED: ".feature_unsupported_note",
        GMAILFASTIMPORTDIV: "#ip_fast_method",
        GMAILFASTIMPORTFORM: "#gmail_fastimport",
        GMAILFASTIMPORTMETHOD: "#ip_fast_method",
        IMPORTALL: "#ip_importall_button",
        IMPORTFROM: "#import_source_dropdown",
        IMPORTGMAIL: "#ip_importgmail_button",
        INSTRUCTIONSBODY: ".instructions_body",
        INSTRUCTIONS: "#ip_instructions",
        INSTRUCTIONSOUTLOOK: "#ip_outlook_instructions",
        INSTRUCTIONSOUTLOOKEXPRESS: "#ip_outlook_express_instructions",
        INSTRUCTIONSGMAIL: "#ip_gmail_instructions",
        INSTRUCTIONSGMAILDETAILED: "#ip_gmail_detailed_instructions",
        INSTRUCTIONSGMAILFAST: "#ip_gmail_fast_instructions",
        INSTRUCTIONSOTHER: "#ip_other_instructions",
        INSTRUCTIONSYAHOO: "#ip_yahoo_instructions",
        METHODBOX: "#methodbox",
        METHODSELECT: "#ip_methodselect",
        PROVIDERSELECT: "#ip_providerselect",
        UPLOADBOX: "#uploadbox",
        UPLOADFILE:"#ip_upload_file",
        IMPORTPANE: "#importpane",
        RECORDSHIFTERPANE: "#recordshifterpane"
    };


    AMA.augment(ContactsImportView.prototype, {
        events: {
            "change #ip_providerselect": "_changeSource",
            "change #ip_methodselect": "_changeType",
            "change #ip_upload_file": "_showImportFileOptions",
            "click #cancel_import": "_closeDialog",
            "click #save_selective_import": "_saveSelectiveImport",
            "click #cancel_selective_import": "_cancelSelectiveImport",
            "click #ip_importall_button": "_importAllContacts",
            "click #ip_loadbutton": "_importSelectedContacts",
            "click #ip_importgmail_button": "_importGoogleContacts",
            "click .rs_selectallleft": "_selectAllLeft",
            "click .rs_selectallright": "_selectAllRight",
            "click .arrow.shifter_left": "_shiftLeft",
            "click .arrow.shifter_right": "_shiftRight",
            "focus #import_contacts_searchbar": "_clearSearchInput",
            "blur #import_contacts_searchbar": "_checkSearchInput"
        },

        render: function () {
            ContactsImportView.__super__.render.apply(this);

            this.importContactsNotList = new AMA.view.ContactsImportListView({
                el: "#import_contacts_not_list",
                direction: "right",
                parent: this,
                data: null
            })
            .plug(AMA.view.plugin.Search, {
                searchInput: "#import_contacts_searchbar",
                searchFields: ["fullName", "lastName", "firstName", "middleName", "nickName", "companyName"]
            })
            .plug(AMA.view.plugin.Paginator, {
                pageSelector: "#import_contacts_not_list_pageselector"
            });

            this.importContactsList = new AMA.view.ContactsImportListView({
                el: "#import_contacts_list",
                direction: "left",
                parent: this,
                data: null
            })
            .plug(AMA.view.plugin.Search, {
                searchInput: "#import_contacts_searchbar",
                searchFields: ["fullName", "lastName", "firstName", "middleName", "nickName", "companyName"]
            })
            .plug(AMA.view.plugin.Paginator, {
                pageSelector: "#import_contacts_list_pageselector"
            });

            this.importContactsDetails = new AMA.view.ContactsImportDetailsView({
                el: "#import_contacts_details",
                parent: this,
                dataClass: AMA.models.contacts.constructor,
                listView: this.importContactsNotList,
                listView2: this.importContactsList
            });
        },

        _afterRender: function () {
            var o = this;

            ContactsImportView.__super__._afterRender.apply(this, arguments);

            $("#import_form").ajaxForm({
                success: _.bind(o._afterContactsImport, o)
            });
        },

        // Call this method to show the view
        showView: function () {
            // By default, show the view for importing contacts from Outlook.
            // For IE8/9, show only the Gmail Fast Import option, as this is the only supported method for older IE versions.
            if (AMA.Util.useXdr()) {
                this._switchView(ContactsImportView.CSS.INSTRUCTIONSGMAIL, ContactsImportView.CSS.INSTRUCTIONSGMAILFAST);
            } else {
                this._switchView(ContactsImportView.CSS.INSTRUCTIONSOUTLOOK);
            }

            this.$el.show();
        },

        _changeSource: function () {
            AMA.debug("Import Contacts: Import source changed");
            this._switchView("#" + this.$el.find(ContactsImportView.CSS.PROVIDERSELECT + " option:selected").attr("value"));
        },

        _changeType: function () {
            AMA.debug("Import Contacts: Import type changed");
            this._switchView(
                "#" + this.$el.find(ContactsImportView.CSS.PROVIDERSELECT + " option:selected").attr("value"),
                "#" + this.$el.find(ContactsImportView.CSS.METHODSELECT+" option:selected").attr("value")
            );
        },

        _showImportFileOptions: function () {
            AMA.debug("Import Contacts: File selected for upload");

            // Show action buttons for uploaded file
            this.$el.find("#ip_importall_button, #ip_loadbutton").show();
        },

        _closeDialog: function () {
            AMA.debug("Import Contacts: User clicked Cancel button");
            this.$el.find("#ip_importall_button").hide();
            this.$el.find("#ip_upload_file").val("");
            this._hideView();
        },

        _switchView: function (providerId, methodId) {
            var methodBox = this.$el.find(ContactsImportView.CSS.METHODBOX),
                uploadBox = this.$el.find(ContactsImportView.CSS.UPLOADBOX),
                gmailFastImportDiv = this.$el.find(ContactsImportView.CSS.GMAILFASTIMPORTDIV),
                sourceBox = this.$el.find(ContactsImportView.CSS.IMPORTFROM),
                instructionsBody = this.$el.find(ContactsImportView.CSS.INSTRUCTIONSBODY),
                featureUnsupportedBody = this.$el.find(ContactsImportView.CSS.FEATURE_UNSUPPORTED);

            // Hide all form elements
            this.$el.find(ContactsImportView.CSS.RECORDSHIFTERPANE).hide();
            this.$el.find("#cancel_import").show();
            this.$el.find("#ip_importall_button, #ip_loadbutton, #save_selective_import, #cancel_selective_import").hide();
            this.$el.find(ContactsImportView.CSS.INSTRUCTIONS + " div").hide();
            methodBox.hide();
            uploadBox.hide();
            sourceBox.hide();
            instructionsBody.hide();
            gmailFastImportDiv.hide();
            featureUnsupportedBody.hide();

            // Empty variables used during the import process
            this._importSelected = null;
            this._totalToBeImported = null;

            switch (providerId) {
                case ContactsImportView.CSS.RECORDSHIFTERPANE :
                    this._updateData();
                    this.$el.find(ContactsImportView.CSS.RECORDSHIFTERPANE).show();
                    this.$el.find("#cancel_import").hide();
                    this.$el.find("#save_selective_import, #cancel_selective_import").show();
                    break;

                case ContactsImportView.CSS.INSTRUCTIONSGMAIL :
                    // Show the "Type of Import" drop down
                    sourceBox.show();
                    methodBox.show();
                    instructionsBody.show();
                    methodBox.find("select").prop("selectedIndex", 0);

                    if (methodId) {
                        switch(methodId) {
                            case ContactsImportView.CSS.INSTRUCTIONSGMAILFAST:
                            methodBox.find("select").prop("selectedIndex", 1);
                                gmailFastImportDiv.show();
                                break;
                            case ContactsImportView.CSS.INSTRUCTIONSGMAILDETAILED:
                                methodBox.find("select").prop("selectedIndex", 2);
                                uploadBox.show();
                        };

                        this.$el.find(methodId).show();
                        this.$el.find(methodId + " *").show();
                    } else {
                        this.$el.find(providerId).show();
                        this.$el.find(providerId + " *").show();
                    }

                    break;

                default:
                    sourceBox.show();
                    uploadBox.show();
                    this.$el.find("#ip_upload_file").val("");
                    instructionsBody.show();
                    this.$el.find(providerId).show();
                    this.$el.find(providerId + " *").show();
            }

            if (AMA.Util.useXdr() && ((!methodId && providerId != ContactsImportView.CSS.INSTRUCTIONSGMAIL) || methodId == ContactsImportView.CSS.INSTRUCTIONSGMAILDETAILED)) {
                instructionsBody.hide();
                featureUnsupportedBody.show();
                this.$el.find(ContactsImportView.CSS.FEATURE_UNSUPPORTED + " *").show();
                uploadBox.prop("disabled", "disabled");
            } else {
                featureUnsupportedBody.hide();
            }
        },

        _importAllContacts: function (event) {
            var form = this.$el.find("form#import_form");

            event.preventDefault();

            AMA.models.contacts.csvImport(form);
        },

        _importSelectedContacts: function (event) {
            this._importSelected = true;
            this._importAllContacts(event);
        },

        _importGoogleContacts: function() {
            var dto = {
                    googleUsername: this.$el.find(ContactsImportView.CSS.GMAILFASTIMPORTFORM + " #username").val(),
                    googlePassword: this.$el.find(ContactsImportView.CSS.GMAILFASTIMPORTFORM + " #password").val()
                };

            if (!dto.googleUsername || !AMA.Util.validateEmail(dto.googleUsername)) {
                AMA.error("Supplied Google username is not in the form of an email address");
                AMA.page.standardDialogs.error($("#import_contacts_invalid_gmail_id").html());
                return;
            }

            if (!dto.googlePassword) {
                AMA.error("No supplied password");
                AMA.page.standardDialogs.error($("#import_contacts_invalid_gmail_password").html());
                return;
            }

            // Show Loading dialog
            AMA.page.standardDialogs.loading($("#msg_loadingdialog").html());

            AMA.models.contacts.gmailFastImport(dto, _.bind(this._afterContactsImport, this));
        },

        _afterContactsImport: function (data) {
            if (!data || data.failures) {
                // Response contains no contact data, operation considered a failure
                AMA.page.standardDialogs.hideloading();
                AMA.page.standardDialogs.status($("#import_contacts_error").html());
                this._hideView();
                return;
            }

            var count = 0,
                o = this,
                afterAjax = function (count) {
                    if (count != o._totalToBeImported) {
                        return;
                    }

                    AMA.page.standardDialogs.hideloading();
                    AMA.page.standardDialogs.status($("#import_contacts_success").html());
                    AMA.models.contacts.invalidate();
                    o._hideView();
                };

            if (this._importSelected) {
                // Open the selective contacts import view
                _.each(data, function (item, index) {
                    item.id = "csvContacts" + index;
                    if (!item.fullName) {
                        if (item.firstName) {
                            item.fullName = item.firstName;
                        }
                        if (item.lastName) {
                            item.fullName += " " + item.lastName;
                        }
                    }
                });
                this.importContactsNotList.data = new AMA.model.Contacts();
                this.importContactsList.data = new AMA.model.Contacts();
                this.importContactsNotList.data.add(data);
                this.importContactsNotList.data.isLoaded = true;
                this.importContactsList.data.isLoaded = true;
                this._switchView(ContactsImportView.CSS.RECORDSHIFTERPANE);
            } else {
                AMA.page.standardDialogs.loading($("#msg_loadingdialog").html());

                this._totalToBeImported = data.length;

                // Create all contacts found on server
                _.each(data, function (item){
                    item.id = null;
                    item.visibility = AMA.model.UserData.Status.ENABLED;

                    AMA.models.contactDetails.create("contacts", item, function (createSuccess) {
                        if (createSuccess) {
                            count++;
                            afterAjax(count);
                        } else {
                            AMA.page.standardDialogs.hideloading();
                            AMA.page.standardDialogs.status($("#import_contacts_error").html());
                        }
                    });
                });
            }
        },

        show: function () {
            ContactsImportView.__super__.show.apply(this, arguments);

            if (AMA.Util.useXdr()) {
                this._switchView(ContactsImportView.CSS.INSTRUCTIONSGMAIL, ContactsImportView.CSS.INSTRUCTIONSGMAILFAST);

                this.$el.find("#ip_providerselect option").each(function(index) {
                    if(index === 2) {
                        $(this).attr("selected", "selected");
                    } else {
                        $(this).removeAttr("selected");
                    }
                });
                this.$el.find("#ip_methodselect option").each(function(index) {
                    if(index === 1) {
                        $(this).attr("selected", "selected");
                    } else {
                        $(this).removeAttr("selected");
                    }
                });
            } else {
                this._switchView(ContactsImportView.CSS.INSTRUCTIONSOUTLOOK);

                this.$el.find("#ip_providerselect option").each(function(index) {
                    if(index === 0) {
                        $(this).attr("selected", "selected");
                    } else {
                        $(this).removeAttr("selected");
                    }
                });
                this.$el.find("#ip_methodselect option").each(function(index) {
                    if(index === 0) {
                        $(this).attr("selected", "selected");
                    } else {
                        $(this).removeAttr("selected");
                    }
                });
            }
        },

        _hideView: function () {
            AMA.debug("Import Contacts: Hiding pane");
            this.$el.find("#ip_importall_button").hide();
            this.$el.find("#ip_upload_file").val("");
            // Clear Gmail form values
            this.$el.find(ContactsImportView.CSS.GMAILFASTIMPORTFORM).each( function() {
                this.reset();
            });
            this.$el.hide();
        },

        // Move a contact from the import list to the do not import list
        _shiftLeft: function (e) {
            var el = AMA.Util.eventTarget(e, window);

            this.importContactsNotList.data.add(this.importContactsList.data.get(el.attributes.uid.value));
            this.importContactsList.data.remove(this.importContactsList.data.get(el.attributes.uid.value));
            this._updateData();
        },

        // Move a contact from the do not import list to the import list
        _shiftRight: function (e) {
            var el = AMA.Util.eventTarget(e, window);

            this.importContactsList.data.add(this.importContactsNotList.data.get(el.attributes.uid.value));
            this.importContactsNotList.data.remove(this.importContactsNotList.data.get(el.attributes.uid.value));
            this._updateData();
        },

        // Moves all contacts on the do not import list to the import list
        _selectAllLeft: function () {
            var o = this;

            _.each(this.importContactsNotList.data.models, function (item) {
                o.importContactsList.data.add(item);
            });
            this.importContactsNotList.data.reset();
            this._updateData();
        },

        // Moves all contacts on the import list to the do not import list
        _selectAllRight: function () {
            var o = this;

            _.each(this.importContactsList.data.models, function (item) {
                o.importContactsNotList.data.add(item);
            });
            this.importContactsList.data.reset();
            this._updateData();
        },

        _saveSelectiveImport: function () {
            var data = this.importContactsList.data.models,
                count = 0,
                o = this,
                afterAjax = function (count) {
                    // Check that all contacts have been created on server
                    if (count != o._totalToBeImported) {
                        return;
                    }

                    // Hide the loading dialog and show the success message
                    AMA.page.standardDialogs.hideloading();
                    AMA.page.standardDialogs.status($("#import_contacts_success").html());

                    // Refresh the contacts model and close the import contacts pane
                    AMA.models.contacts.invalidate();
                    o._hideView();
                };

            // Check that the "Contacts to Import" list isn't empty
            if (data.length == 0) {
                // Show error message when no contacts selected for import
                AMA.page.standardDialogs.error($("#import_contacts_no_selection").html());
            } else {
                AMA.page.standardDialogs.loading($("#msg_loadingdialog").html());

                this._totalToBeImported = data.length;

                // Import each contact
                _.each(data, function (item){
                    item.id = null;
                    item.visibility = AMA.model.UserData.Status.ENABLED;

                    AMA.models.contactDetails.create("contacts", item, function (createSuccess) {
                        if (createSuccess) {
                            count++;
                            afterAjax(count);
                        } else {
                            AMA.page.standardDialogs.hideloading();
                            AMA.page.standardDialogs.status($("#import_contacts_error").html());
                        }
                    });
                });
            }
        },

        _cancelSelectiveImport: function () {
            // Delete any data loaded for selective import and go back to previous view
            this.importContactsList.data.reset();
            this.importContactsNotList.data.reset();
            this._switchView("#ip_outlook_instructions");
        },

        clearSelections: function () {
            this.importContactsNotList._selectItem();
            this.importContactsList._selectItem();
        },

        // Clears the search bar when user clicks on it
        _clearSearchInput: function (e) {
            var el = AMA.Util.eventTarget(e, window);

            el.value = "";
            $(el).removeClass("commands_searchfaded");
        },

        // Checks if the search bar is empty after user clicks elsewhere
        _checkSearchInput: function (e) {
            var el = AMA.Util.eventTarget(e, window);

            if (el.value.trim() == "") {
                el.value = "Search";
                $(el).addClass("commands_searchfaded");
            }
        },

        // This function is run every time data for the selective contacts import is changed
        _updateData: function () {
            this.importContactsList.render();
            this.importContactsNotList.render();

            this.importContactsNotList._nonPaginatedDataset = this.importContactsNotList.data;
            this.importContactsNotList.pageCount = Math.ceil(this.importContactsNotList.data.models.length / this.importContactsNotList.data.pageSize);

            this.importContactsList._nonPaginatedDataset = this.importContactsList.data;
            this.importContactsList.pageCount = Math.ceil(this.importContactsList.data.models.length / this.importContactsList.data.pageSize);

            if (this.importContactsNotList.currentPage > this.importContactsNotList.pageCount) {
                this.importContactsNotList.toPage(this.importContactsNotList.currentPage - 1);
            }
            this.importContactsNotList._renderPageSelector();

            if (this.importContactsList.currentPage > this.importContactsList.pageCount) {
                this.importContactsList.toPage(this.importContactsList.currentPage - 1);
            }
            this.importContactsList._renderPageSelector();
        }
    });
})();
/*! ContactsImportListView */
(function () {
    AMA.namespace("view");

    var ContactsImportListView = AMA.view.ContactsImportListView = AMA.view.ListView.extend();

    ContactsImportListView.TEMPLATE_ID = "";
    ContactsImportListView.TEMPLATE_SRC = "";


    AMA.augment(ContactsImportListView.prototype, {
        events: {
            "click .rt_row": "_doSelection"
        },

        initialize: function () {
            // Force fetching of both types of templates
            this.constructor.TEMPLATE_ID = this.options.direction === "right" ? "import_list_arrow_right_template" : "import_list_arrow_left_template";

            ContactsImportListView.__super__.initialize.call(this, arguments);
        },

        render: function () {
            // Set the correct template prior to render
            this.constructor.TEMPLATE_ID = this.options.direction === "right" ? "import_list_arrow_right_template" : "import_list_arrow_left_template";
            this.template = $("#" + this.constructor.TEMPLATE_ID).html();

            var content = "";

            this._applyFilters();
            AMA.debug(this.options.el + " has a final dataset of " + this._dataset.length + " items");

            _.each(this._dataset, function (item, index) {

                content += _.template(this.template, this._processData(item, index));
            }, this);

            this.$el.html(content);

            this._items = this.$el.children("." + this._css.ITEM);
            AMA.debug(this.options.el + " has rendered " + this._items.length + " items");

            if (this._items.length > 0 && this.options.direction === "right") {
                var match = this.selectedItem && this.$el.find("[uid='" + $(this.selectedItem).attr("uid") + "']") || [],
                    stillInList = match.length > 0;

                this.parent.clearSelections();
                this._selectItem(stillInList ? match[0] : this._items[0]);
                this.parent._itemSelected = true;

                AMA.debug("Previously selected item is still in list: " + stillInList);
            } else if (this._items.length == 0 && this.options.direction === "right") {
                this.trigger(ContactsImportListView.EVENT.LIST_EMPTIED);
                AMA.debug(this.options.el + " has triggered a 'list emptied' event.");
                this._selectItem();
                this.parent._itemSelected = false;
            } else if (!this.parent.importContactsDetails.isRendered) {
                this.trigger(ContactsImportListView.EVENT.LIST_EMPTIED);
                AMA.debug(this.options.el + " has triggered a 'list emptied' event.");
                this._selectItem();
                this.parent._itemSelected = false;
            }

            AMA.debug(this._dataset.length + " items rendered in import contacts list view.");
        },

        _processData: function (item, index) {
            ContactsImportListView.__super__._processData.call(this, item, index);

            return item;
        },

        _doSelection: function (e) {
            var el = AMA.Util.eventTarget(e, window);

            if ($(el).hasClass("rt_column")) {
                el = el.parentNode;
            }

            this.parent.clearSelections();
            this._selectItem(el);
        }
    });
})();
/*! ContactsImportDetailsView */
(function () {
    AMA.namespace("view");

    var ContactsImportDetailsView = AMA.view.ContactsImportDetailsView = AMA.view.ContactDetailsView.extend();

    ContactsImportDetailsView.TEMPLATE_ID = "import_contacts_details_template";
    ContactsImportDetailsView.TEMPLATE_SRC = "";


    AMA.augment(ContactsImportDetailsView.prototype, {
        initialize: function (options) {
            ContactsImportDetailsView.__super__.initialize.apply(this, arguments);

            this.options.listView2 = options && options.listView2 || {};

            var o = this;
            if (this.options.listView2) {
                this.options.listView2.on(AMA.view.ListView.EVENT.ITEM_SELECTED, function (data) {
                    o.setData(data);
                    o.show();
                });
                this.options.listView2.on(AMA.view.ListView.EVENT.SELECTION_CLEARED, function () {
                    o.hide();
                });
            } else {
                AMA.warning("This instance of ContactsImportDetailsView is not linked to a contacts list. Data switching will not apply.");
            }
        },

        render: function () {
            var data = (this.data && this.data.length > 0) ? this.data.toJSON()[0] : {},
                content = "";

            // Generate the content from template + data
            content = _.template(this.template, this._processData(data));

            // Attach the content to the container element
            this.$el.html(content);
        }
    });
})();
/*! ContactEditor */
(function () {

    /**
     * Contact Editor: Use to add or edit contact;
     *
     * @class ContactEditor
     * @namespace view
     * @extends BaseView
     * @constructor
     * @abstract
     */
    AMA.namespace("view");

    var ContactEditor = AMA.view.ContactEditor = AMA.view.BaseView.extend();
 
    /**
     * delegate Events selectors
     */
    ContactEditor.CSS = {
        EDITOR_TITLE: "editorTitle",
        CLOSEVIEW: "rs_cancel",
        SAVE_ANOTHER: "rs_save_next",
        SAVE: "rs_save",
        SAVE_EDIT: "rs_saveEdit",
        DATES: "ep_dateinput",
        PHONE_INPUT: "ep_phoneinput"
    };

    ContactEditor.ID = {
        FULLNAME: "ep_name",
        FIRSTNAME: "ep_firstName",
        LASTNAME: "ep_lastName",
        PREFIX: "ep_prefix",
        MIDDLENAME: "ep_middleName",
        SUFFIX: "ep_suffix",
        HOMEADDSTREET: "ep_homeAddressStreet",
        HOMEADDSTREET2: "ep_homeAddressStreet2",
        HOMEADDNEIGHBOR: "ep_homeAddressNeighborhood",
        HOMEADDCITY: "ep_homeAddressCity",
        HOMEADDSTATE: "ep_homeAddressState",
        HOMEADDZIP: "ep_homeAddressZip",
        HOMEADDCOUNTRY: "ep_homeAddressCountry",
        WORKADDSTREET: "ep_workAddressStreet",
        WORKADDSTREET2: "ep_workAddressStreet2",
        WORKADDNEIGHBOR: "ep_workAddressNeighborhood",
        WORKADDCITY: "ep_workAddressCity",
        WORKADDSTATE: "ep_workAddressState",
        WORKADDZIP: "ep_workAddressZip",
        WORKADDCOUNTRY: "ep_workAddressCountry",
        FULLHOMEADDRESS: "ep_homeAddressFormatted",
        FULLWORKADDRESS: "ep_workAddressFormatted"
    };


    ContactEditor.TEMPLATE_ID = "contact_add-edit_template";
    ContactEditor.TEMPLATE_SRC = "";
    ContactEditor.KEY_ARRAY =["im","imAIM","imGTalk","imICQ","imJabber","imQQ","imSkype", "imWindowsLive","imYahoo","imOther","imOther2","imOther1",
        "webSiteUrl","otherUrl", "preferredUrl", "homeUrl", "workUrl", "mobilePhone", "workPhone", "homePhone", "fax", "homeFax", "workFax", "pager",
        "email", "homeEmail", "localEmail", "otherEmail", "workEmail", "otherPhone", "carPhone", "radioPhone", "localPhone", "assistantPhone", "iPhone"];
    ContactEditor.KEY_ARRAY_PHONE =["mobilePhone", "workPhone", "homePhone", "fax", "homeFax", "workFax", "pager",
        "otherPhone", "carPhone", "radioPhone", "localPhone", "assistantPhone", "iPhone"];
    ContactEditor.KEY_ARRAY_EMAIL = ["email", "homeEmail", "localEmail", "otherEmail", "workEmail"];
    ContactEditor.KEY_ARRAY_IM = ["im","imAIM","imGTalk","imICQ","imJabber","imQQ","imSkype", "imWindowsLive","imYahoo","imOther","imOther2","imOther1"];
    ContactEditor.KEY_ARRAY_URL = ["webSiteUrl","otherUrl", "preferredUrl", "homeUrl", "workUrl"];
    /**
     *  Delegate Event methods
     */
    ContactEditor.EVENT = AMA.enums(
            "HIDE_VIEW",
            "SAVED_CONTACT",
            "SHOW_EDITOR",
            "BEFORE_SEND",
            "ERROR",
            "COMPLETE"
    );
    ContactEditor.MODE = AMA.enums(
            "CREATE",
            "EDIT"
    );

    AMA.augment(ContactEditor.prototype, {
        initialize: function () {
            ContactEditor.__super__.initialize.apply(this, arguments);
            this._mode = ContactEditor.MODE.CREATE;
        },

        events: {
            "click #clearBirthdayId": "clearBirthdayDate",
            "click #clearAnniversaryId": "clearAnniversaryDate"
        },

        clearBirthdayDate: function(){
            $("#ep_birthday").val("");
        },

        clearAnniversaryDate: function(){
            $("#ep_anniversary").val("");
        },

		
		render: function () {
			var data = (this.data && this.data.length > 0) ? this.data.toJSON()[0] : {},
				content = "",
				o = this;
				
			if (this._mode === ContactEditor.MODE.EDIT) {
				AMA.models.contactDetails.getDetails(data.id, function (getSuccess, itemDetails){
					if (getSuccess){
						// Generate the content from template + data
						content = _.template(o.template, o._processData(itemDetails));
		
						// Attach the content to the container element
						o.$el.html(content);
						o.show(AMA.view.ContactEditor.MODE.EDIT);
						o._setupEvents();
					}
				});
			}
			else if (this._mode === ContactEditor.MODE.CREATE) {
				content = _.template(this.template, this._processData(data));
				this.$el.html(content);
			}
		},
        _afterRender: function () {
            var o = this;
            this.$el.find('.' + ContactEditor.CSS.PHONE_INPUT).each(function () {
                $(this).val(o.validatePhone(this));
            });

        },
        show: function (mode) {
        	/*
        	if(window.matchMedia("screen and (min-width: 320px)").matches 
        			&& window.matchMedia("screen and (max-width: 768px)").matches){

    			AMA.debug("Showing " + this.options.el);

    			if (!this.isRendered) {
    				ContactEditor.__super__._doRender();
    			}
    			//$('#data_contacts_tab > .toggle-submenu').hide();
    			
    			this.$el.show('slide', {direction: 'rigth'},400);
    			
    			// Clear the 'initially hidden' flag (if any)
    			ContactEditor.__super__.hidden = false;

    			// Trigger a 'shown' event
    			ContactEditor.__super__.trigger(AMA.view.BaseView.EVENT.SHOWN);
        	}else{
        		ContactEditor.__super__.show.apply(this, arguments);
        	}
        	*/        	
        	ContactEditor.__super__.show.apply(this, arguments);
        	
            /**
             * Initiate on show events; base on the arguments create/edit;
             * By default views are for "create" template;
             */

            var objDom = this.$el,
                methodTitle = (mode === ContactEditor.MODE.CREATE) ? "Add Contacts" : "Edit Contacts",
                saveAnother = objDom.find("." + ContactEditor.CSS.SAVE_ANOTHER),
                saveCreate = objDom.find("." + ContactEditor.CSS.SAVE),
                saveEdit = objDom.find("." + ContactEditor.CSS.SAVE_EDIT);

            saveAnother.show();
            saveCreate.show();
            saveEdit.hide();

            if (mode === ContactEditor.MODE.EDIT) {
                saveAnother.hide();
                saveCreate.hide();
                saveEdit.show();
            }
            objDom.find("." + ContactEditor.CSS.EDITOR_TITLE).html(methodTitle);
            
            $("#contactstable").hide();
        },

        _processData: function (item) {
            ContactEditor.__super__._processData(this, arguments);

            var fixedName = (item.fullName) ? this.parse(item.fullName) : null,
                o = this,
                countIMS = 0,
                countEmail = 0,
                countUrl = 0,
                ims =["im","imAIM","imGTalk","imICQ","imJabber","imQQ","imSkype", "imWindowsLive","imYahoo","imOther","imOther2","imOther1"],
                emails = ["email", "homeEmail", "localEmail", "otherEmail", "workEmail"];
            item.ep_ims = "";
            item.ep_emails = "";
            item.ep_urls = "";
            item.ep_phoneNumbers = ""; //mobilePhone
            item.birthdayValue = item.birthday || 0;
            item.anniversaryValue = item.anniversary || 0;
            function processArray(key, generic, details) {
                var template = $("#"+generic+"_template").html(),
                    string = "";

                /**
                 * @key is a generic representaion of the items key;
                 */
                if(details || details.length) {
                    // get Generic Template;
                    _.each(details, function(value) {
                        string += AMA.Util.microTemplate(template, {value : value, key : key})
                    }, this);
                }
                return string;
            }
            _.each(AMA.model.Contacts.MODEL_DESCRIPTOR.fields, function (items, index) {
                if (typeof item[index] !== "undefined" && (index === "birthday" || index === "anniversary")) {
                    item[index] = (item[index]) ? $.datepicker.formatDate('mm/dd/yy', new Date(item[index])) : "";
                } else if(index == "pendingCreate") {
                    item[index] = (item[index]) ? "checked" : "";
                } else if (!item[index]) {
                    item[index] = "";
                }
            });

            if (fixedName){
                item.firstName = fixedName.firstName;
                item.initials = fixedName.initials;
                item.lastName = fixedName.lastName;
                item.salutation = fixedName.salutation;
                item.suffix = fixedName.suffix;
            }
            // if(item.photoUUID) {
                // item.thumbImg = AMA.config.legacyApiBaseUrl+"/records.poo?method=retrieveThumbnail&csrfvalue="+AMA.config.csrfToken+"&mediaid="+item.photoUUID+"&max=300";
            // } else {
                // item.thumbImg = "img/silhouette.png";
            // }
			// TODO: replace with REST API for contact thumbnails
			item.thumbImg = "img/silhouette.png";
			
            item.pendingCreate = (item.pendingCreate) ? "checked" : "";
            item.endpointName = "Unknown Device";
            if  (AMA.models.endpoints.isLoaded) {
                item.endpointName = AMA.models.endpoints.toJSON()[0].platformfriendlyname;
            }
            /**
             * Process IM's
             * @type {Array}
             */
            item.allIm = [];
            _.each(ContactEditor.KEY_ARRAY_IM, function(ar) {
                item[ar] = item[ar] || [];
                countIMS = item[ar].length + countIMS;
                if(ar in item) {
                    item.allIm.push(processArray(ar, "im", item[ar]));
                }
            });
            item.allEmails = [];
            _.each(ContactEditor.KEY_ARRAY_EMAIL, function(ar) {
                item[ar] = item[ar] || [];
                countEmail = item[ar].length + countEmail;
                if(ar in item) {
                    item.allEmails.push(processArray(ar, "email", item[ar]));
                }
            });
            item.allUrl = [];
            _.each(ContactEditor.KEY_ARRAY_URL, function(ar) {
                item[ar] = item[ar] || [];
                countUrl = item[ar].length + countUrl;
                if(ar in item) {
                    item.allUrl.push(processArray(ar, "email", item[ar]));
                }
            });


            /*
             item.url = this.processPhoneNumbers("url_template", item.webSiteUrl); // 1
             item.otherUrl = this.processPhoneNumbers("url_template", item.otherUrl); // 1
             */
            item.allMobilePhone = this.processPhoneNumbers("mobilePhone_template", item.mobilePhone, 3); // 3
            item.allWorkPhone = this.processPhoneNumbers("workPhone_template", item.workPhone, 3);// 3
            item.allHomePhone = this.processPhoneNumbers("homePhone_template", item.homePhone, 1);// 1
            item.allfax = this.processPhoneNumbers("fax_template", item.fax, 1); // 1
            item.allHomeFax = this.processPhoneNumbers("homeFax_template", item.homeFax); // 0
            item.allWorkFax = this.processPhoneNumbers("workFax_template", item.workFax); // 0
            item.allPager = this.processPhoneNumbers("pager_template", item.pager, 1); // 1

            item.allOtherPhone = this.processPhoneNumbers("otherPhone_template", item.otherPhone, 1); // 1
            item.allCarPhone = this.processPhoneNumbers("carPhone_template", item.carPhone);// 0
            item.allRadioPhone = this.processPhoneNumbers("radioPhone_template", item.radioPhone); // 0
            item.allLocalPhone = this.processPhoneNumbers("localPhone_template", item.localPhone); // 0
            item.allAssistantPhone = this.processPhoneNumbers("assistantPhone_template", item.assistantPhone); // 0
            item.alliPhone = this.processPhoneNumbers("iPhone_template", item.iPhone); // 0
            /*


             */

            if (countIMS > 2) {
                item.allIm = item.allIm.join("");
                item.ep_ims = "hidden";
            } else {
                for(var i = 0; i < 3 - countIMS; i++) {
                    item.allIm.push(processArray("im", "im", ["/null/"]));
                }
                item.allIm = item.allIm.join("").replace(/\/null\//g, "");

            }

            if (countEmail > 2) {
                item.allEmails = item.allEmails.join("");
                item.ep_emails = "hidden";
            } else {
                for(var i = 0; i < 3-countEmail; i++) {
                    item.allEmails.push(processArray("email", "email", ["/null/"]));
                }
                item.allEmails = item.allEmails.join("").replace(/\/null\//g, "");

            }

            if (countUrl > 1) {
                item.allUrl = item.allUrl.join("");
            } else {
                item.allUrl.push(processArray("webSiteUrl", "url", ["/null/"]));
                item.allUrl = item.allUrl.join("").replace(/\/null\//g, "");
            }

            return item;
        },
        processPhoneNumbers: function (id, data) {
            var arTemp = [],
                count = 0;
                defaultInput = arguments[2] || 0;
            _.each(data, function(details, index) {
                if(!defaultInput) {
                    index = ""
                } else {
                    index = index+1;
                }
                details = AMA.Util.formatPhone(details);
                arTemp.push(_.template($("#"+id+"").html(), {value : details, index: index}));
            });
            if(defaultInput && defaultInput > arTemp.length) {
                count = arTemp.length;
                for(var i=0; i < arguments[2] - count; i++) {
                    var showIndex = i+count+1;
                    arTemp.push(_.template($("#"+id+"").html(), {value : "", index: showIndex}));
                }
            }
            if (arTemp.length) {
                return {html: arTemp.join(""), count: arTemp.length, hide: "hidden"};
            } else {
                return {html: arTemp.join(""), count: arTemp.length, hide: ""}
            }

        },
        /**
         *  Initialize Events delegation for the class;
         */
        _setupEvents: function () {
            var o = this,
                    objDom = this.$el,
                    fullNameIDs = [
                        "#" + ContactEditor.ID.PREFIX,
                        "#" + ContactEditor.ID.FIRSTNAME,
                        "#" + ContactEditor.ID.MIDDLENAME,
                        "#" + ContactEditor.ID.LASTNAME,
                        "#" + ContactEditor.ID.SUFFIX
                    ],
                    HomeAddress = [
                        "#" + ContactEditor.ID.HOMEADDSTREET,
                        "#" + ContactEditor.ID.HOMEADDSTREET2,
                        "#" + ContactEditor.ID.HOMEADDNEIGHBOR,
                        "#" + ContactEditor.ID.HOMEADDCITY,
                        "#" + ContactEditor.ID.HOMEADDSTATE,
                        "#" + ContactEditor.ID.HOMEADDZIP,
                        "#" + ContactEditor.ID.HOMEADDCOUNTRY
                    ],
                    WorkAddress = [
                        "#" + ContactEditor.ID.WORKADDSTREET,
                        "#" + ContactEditor.ID.WORKADDSTREET2,
                        "#" + ContactEditor.ID.WORKADDNEIGHBOR,
                        "#" + ContactEditor.ID.WORKADDCITY,
                        "#" + ContactEditor.ID.WORKADDSTATE,
                        "#" + ContactEditor.ID.WORKADDZIP,
                        "#" + ContactEditor.ID.WORKADDCOUNTRY
                    ],
                    validate = {
                        empty: function() {
                            return (_.isEmpty($(fullNameIDs[1]).val()) && _.isEmpty($("#"+ContactEditor.ID.FULLNAME).val()));
                        }
                    };
            var elem = document.createElement('input');
            elem.setAttribute('type', 'date');
            if (elem.type === 'text') {
	            objDom.find("." + ContactEditor.CSS.DATES).datepicker({
	                showOn: "button",
	                buttonImage: "img/calendar.gif",
	                buttonImageOnly: true,
	                changeMonth: true,
	                changeYear: true,
	                yearRange: '1900:2050',
	                onSelect: function (dateText, inst) {
	                    if (inst.input.attr("data-value") != '') {
	
	                        var date = new Date(43200000);
	                        date.setUTCFullYear(inst.selectedYear, inst.selectedMonth, inst.selectedDay);
	                        inst.input.attr("data-value", date.getTime());
	                    }
	                    else {
	                        inst.input.attr("data-value", "");
	                    }
	                    return false;
	                }
	            });
            }else{
            	$("#ep_birthday,#ep_anniversary").attr('type', 'date');
            	$("#ep_birthday,#ep_anniversary").removeAttr("readonly");
            	$('input[type=date]').each(function(){
            		$(this).on('change',function(){
            			$(this).data("value", Date.parse($(this).val()));
	                });
            	});
            	
            	$("#clearBirthdayId,#clearAnniversaryId").hide();
            }
            /**
             * Cancel Event
             */
            objDom.find("." + ContactEditor.CSS.CLOSEVIEW).on("click", function () {
                o.hideView();
                o.trigger(ContactEditor.EVENT.HIDE_VIEW);
                $('#data_contacts_tab > .toggle-submenu').show();
            });
            /**
             * Save Event
             */
            objDom.find("." + ContactEditor.CSS.SAVE).on("click", function () {
                if(validate.empty()) {
                    $(fullNameIDs[1]).addClass("error");
                    $("#"+ContactEditor.ID.FULLNAME).addClass("error");
                    AMA.page.standardDialogs.error("Please enter a name for this contact.")
                    return;
                }
                o.saveToModel("save");
                o.hideView();
                if($('#data_contacts_tab').find(".row-offcanvas").hasClass("active")){
                	o.parent.toggleListView();
                }
                o.trigger(ContactEditor.EVENT.SAVED_CONTACT);
            });
            /**
             * Save Edited Event
             */
            objDom.find("." + ContactEditor.CSS.SAVE_EDIT).on("click", function () {
                if(validate.empty()) {
                    $(fullNameIDs[1]).addClass("error");
                    $("#"+ContactEditor.ID.FULLNAME).addClass("error");
                    AMA.page.standardDialogs.error("Please enter a name for this contact.")
                    return;
                }
                o.saveToModel("edit");
                o.hideView();
                o.trigger(ContactEditor.EVENT.SAVED_CONTACT);
            });
            /**
             * Save and add more Events
             */
            objDom.find("." + ContactEditor.CSS.SAVE_ANOTHER).on("click", function () {
                if(validate.empty()) {
                    $(fullNameIDs[1]).addClass("error");
                    $("#"+ContactEditor.ID.FULLNAME).addClass("error");
                    AMA.page.standardDialogs.error("Please enter a name for this contact.")
                    return;
                }
                o.saveToModel("save");
                o.clearForm();
                o.trigger(ContactEditor.EVENT.SAVED_CONTACT, {addMore: true});
            });

            /**
             *parse from Full name:
             */
            objDom.on("keyup", "#" + ContactEditor.ID.FULLNAME, function () {
                var arName = o.parse($(this).val());
                $(fullNameIDs[0]).val(arName.salutation);
                $(fullNameIDs[1]).val(arName.firstName);
                $(fullNameIDs[2]).val(arName.initials);
                $(fullNameIDs[3]).val(arName.lastName);
                $(fullNameIDs[4]).val(arName.suffix);
            });
            /**
             * parse to full name:
             */
            $(fullNameIDs.join(", ")).on("keyup", function () {
                var fullName = [
                    $(fullNameIDs[0]).val(),
                    $(fullNameIDs[1]).val(),
                    $(fullNameIDs[2]).val(),
                    $(fullNameIDs[3]).val(),
                    $(fullNameIDs[4]).val()
                ];
                $("#" + ContactEditor.ID.FULLNAME).val(fullName.join(" "));
            });

            /**
             * phone number auto format;
             */
            objDom.find('.' + ContactEditor.CSS.PHONE_INPUT).on("keyup", function () {
                o.validatePhone(this);
            });

            objDom.find('#clsDate').on("click", function () {
                objDom.find("#ep_birthday").val("");
            });

            objDom.find('#anniversaryDate').on("click", function () {
                objDom.find("#ep_anniversary").val("");
            });

            /**
             * Home Address parse to full address
             */
            $(HomeAddress.join(", ")).on("keyup", function () {
                var homeAdd = [
                    $(HomeAddress[0]).val(),
                    $(HomeAddress[1]).val(),
                    $(HomeAddress[2]).val(),
                    $(HomeAddress[3]).val(),
                    $(HomeAddress[4]).val(),
                    $(HomeAddress[5]).val(),
                    $(HomeAddress[6]).val()
                ];
                $("#" + ContactEditor.ID.FULLHOMEADDRESS).val(homeAdd.join(" "));
            });
            /**
             * Work Address parse to full address
             */
            $(WorkAddress.join(", ")).on("keyup", function () {
                var workAdd = [
                    $(WorkAddress[0]).val(),
                    $(WorkAddress[1]).val(),
                    $(WorkAddress[2]).val(),
                    $(WorkAddress[3]).val(),
                    $(WorkAddress[4]).val(),
                    $(WorkAddress[5]).val(),
                    $(WorkAddress[6]).val()
                ];
                $("#" + ContactEditor.ID.FULLWORKADDRESS).val(workAdd.join(" "));
            });
            /**
             * Ajax listener;
             */
                // beforeSend:
            o.on("CONTACTS" + ContactEditor.EVENT.BEFORE_SEND, function () {
                AMA.debug("Ajax started" + ContactEditor.EVENT.BEFORE_SEND);
                AMA.page.standardDialogs.loading("");
            })
                // error:
            .on("CONTACTS" + ContactEditor.EVENT.ERROR, function () {
                AMA.page.standardDialogs.hideloading();
                    /**
                     * TODO: Message Here Should be provided by the server or should have a server Constant.
                     */
                AMA.page.standardDialogs.error("Unable To Contact services");
                AMA.debug("Ajax completed with errors");
            })
            // Complete
            .on("CONTACTS" + ContactEditor.EVENT.COMPLETE, function () {
                AMA.debug("Ajax Completed" + ContactEditor.EVENT.COMPLETE);
                AMA.page.standardDialogs.hideloading();
            });
        },
        setMsecsValue: "",
        /**
         * Call This method to close the Editor
         */
        hideView: function () {
            this.clearForm();
            $(this.$el).hide();
            $("#contactstable").show();
        },
        /**
         * Call This method to Clear the Editor Form
         */
        clearForm: function () {
            $("#"+ContactEditor.ID.FIRSTNAME).removeClass("error");
            $("#"+ContactEditor.ID.FULLNAME).removeClass("error");

            $(this.$el).find("input").val("");
        },
        /**
         * On save this will process the form and call the create/sync
         * @param type String create/edit
         */
        saveToModel: function (type) {
            var o = this,
                    contactEditorSer = $(this.$el).find("form").serializeArray(),
                    newAr = {},
                    v,
                    options = {
                        beforeSend: function () {
                            o.trigger("CONTACTS" + ContactEditor.EVENT.BEFORE_SEND);
                        },
                        error: function () {
                            o.trigger("CONTACTS" + ContactEditor.EVENT.ERROR);
                        },
                        complete: function () {
                            o.trigger("CONTACTS" + ContactEditor.EVENT.COMPLETE);
                        }
                    };


            _.each(contactEditorSer, function (value, key, list) {
                if(value.value !== "") {
                    switch (value.name) {
                        case "birthday":
                            newAr[value.name] = $('#ep_birthday').data("value") || "";
                            break;
                        case "anniversary":
                            newAr[value.name] = $('#ep_anniversary').data("value") || "";
                            break;
                        case "pendingCreate":
                            newAr[value.name] = value.value === "on" ? true : false;
                            break;
                        case "pendingDelete":
                            newAr[value.name] = value.value === "true" ? true : false;
                            break;
                        default:
                            if(_.indexOf(ContactEditor.KEY_ARRAY_PHONE, value.name, false) !== -1) {
                                value.value = value.value.replace(/\D/g,'');
                            }
                            if(_.indexOf(ContactEditor.KEY_ARRAY, value.name, false) !== -1) {
                                if(!newAr[value.name]) {
                                    newAr[value.name] = [];
                                }
                                newAr[value.name].push(value.value);
                            } else {
                                newAr[value.name] = value.value;
                            }
                            break;
                    }
                }
            });

            newAr["visibility"] = AMA.model.UserData.Status.ENABLED;

            if (type === "save") {
                // Populate values not in form
                newAr["id"] = null;
                newAr["onPhone"] = false;
                newAr["pendingCreate"] = this.$el.find("form input[name=pendingCreate]:checked").length > 0 ? true : false;
                newAr["pendingDelete"] = false;

                AMA.models.contactDetails.create("contacts", newAr, function (createSuccess, data) {
                    if (createSuccess) {
                        o.trigger("CONTACTS" + ContactEditor.EVENT.COMPLETE);
                        AMA.models.contacts.invalidate();
                    } else {
                        o.trigger("CONTACTS" + ContactEditor.EVENT.ERROR);
                    }
                });
            } else {
                newAr["onPhone"] = o.data.models[0].get("onPhone");
                newAr["pendingCreate"] = this.$el.find("form input[name=pendingCreate]:checked").length > 0 ? true : false;

                AMA.models.contacts.update("contacts", newAr.id, newAr, function (createSuccess, data) {
                    if (createSuccess) {
                        o.trigger("CONTACTS" + ContactEditor.EVENT.COMPLETE);
                        AMA.models.contacts.invalidate();
                    } else {
                        o.trigger("CONTACTS" + ContactEditor.EVENT.ERROR);
                    }
                });
            }
        },

        /**
         * Start Form Specific automation and parsing;
         */
        in_array: function (arr, value) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] == value) {
                    return true;
                }
            }
            return false;
        },
        implode: function (arr, separator) {
            var output = "",
                sep = "";
            for (var i = 0; i < arr.length; i++) {
                output += sep + arr[i];
                sep = separator;
            }
            return output;
        },
        trim: function (str) {
            return (str) ? str.replace(/^\s+|\s+$|\,$/g, "") : str;
        },
        ucfirst: function (str) {
            return (str) ? str.substr(0, 1).toUpperCase() + str.substr(1, str.length - 1).toLowerCase() : str;
        },
        /**
         * TODO: Identify "," coma seperated names
         * @param fullastName String full name
         * @returns {{}} Associative array of name
         */
        parse: function (fullastName) {
            fullastName = this.trim(fullastName);
            // split into words
            var unfilteredNameParts = fullastName.split(" "),
                name = {},
                nameParts = [],
                lastName = "",
                firstName = "",
                initials = "",
                j = 0,
                i = 0;
            // completely ignore any words in parentheses
            for (i = 0; i < unfilteredNameParts.length; i++) {
                if (unfilteredNameParts[i].indexOf("(") == -1) {
                    nameParts[j++] = unfilteredNameParts[i];
                }
            }
            var numWords = nameParts.length,
            // is the first word a title? (Mr. Mrs, etc)
                salutation = this.is_salutation(nameParts[0]),
                suffix = this.is_suffix(nameParts[nameParts.length - 1]),
            // set the range for the middle part of the name (trim prefixes & suffixes)
                start = (salutation) ? 1 : 0,
                end = (suffix) ? numWords - 1 : numWords;

            // concat the first name
            for (i = start; i < (end - 1); i++) {
                word = nameParts[i];
                // move on to parsing the last name if we find an indicator of a compound last name (Von, Van, etc)
                // we use i != start to allow for rare cases where an indicator is actually the first name (like "Von Fabella")
                if (this.is_compound_lastName(word) && i != start) {
                    break;
                }
                // is it a middle initial or part of their first name?
                // if we start off with an initial, we'll call it the first name
                if (this.is_initial(word)) {
                    // is the initial the first word?
                    if (i == start) {
                        // if so, do a look-ahead to see if they go by their middle name
                        // for ex: "R. Jason Smith" => "Jason Smith" & "R." is stored as an initial
                        // but "R. J. Smith" => "R. Smith" and "J." is stored as an initial
                        if (this.is_initial(nameParts[i + 1])) {
                            firstName += " " + word.toUpperCase();
                        } else {
                            initials += " " + word.toUpperCase();
                        }
                        // otherwise, just go ahead and save the initial
                    } else {
                        initials += " " + word.toUpperCase();
                    }
                } else {
                    firstName += " " + this.fix_case(word);
                }
            }

            // check that we have more than 1 word in our string
            if ((end - start) > 1) {
                // concat the last name
                for (j = i; j < end; j++) {
                    lastName += " " + this.fix_case(nameParts[j]);
                }
            } else {
                // otherwise, single word strings are assumed to be first names
                firstName = this.fix_case(nameParts[i]);
            }

            // return the various parts in an array
            name.salutation = (salutation != false) ? salutation : "";
            name.firstName = (firstName != "") ? this.trim(firstName) : "";
            name.initials = (initials != "") ? this.trim(initials) : "";
            name.lastName = (lastName != "") ? this.trim(lastName) : "";
            name.suffix = (suffix != false) ? suffix : "";

            return name;
        },

        // detect and format standard salutations
        // I'm only considering english honorifics for now & not words like
        is_salutation: function (word) {
            // ignore periods
            word = word.replace(".", "").toLowerCase();
            // returns normalized values
            if (word == "mr" || word == "master" || word == "mister") {
                return "Mr.";
            } else if (word == "mrs") {
                return "Mrs.";
            } else if (word == "miss" || word == "ms") {
                return "Ms.";
            } else if (word == "dr") {
                return "Dr.";
            } else if (word == "rev") {
                return "Rev.";
            } else if (word == "fr") {
                return "Fr.";
            } else {
                return false;
            }
        },

        //  detect and format common suffixes
        is_suffix: function (word) {
            // ignore periods
            word = word.replace(/\./g, "").toLowerCase();
            // these are some common suffixes - what am I missing?
            var suffixArray = ['I', 'II', 'III', 'IV', 'V', 'Senior', 'Junior', 'Jr', 'Sr', 'PhD', 'APR', 'RPh', 'PE', 'MD', 'MA', 'DMD', 'CME'];
            for (var i = 0; i < suffixArray.length; i++) {
                if (suffixArray[i].toLowerCase() == word) {
                    return suffixArray[i];
                }
            }
            return false;
        },

        // detect compound last names like "Von Fange"
        is_compound_lastName: function (word) {
            word = word.toLowerCase();
            // these are some common prefixes that identify a compound last names - what am I missing?
            var words = ['vere', 'von', 'van', 'de', 'del', 'della', 'di', 'da', 'pietro', 'vanden', 'du', 'st.', 'st', 'la', 'lo', 'ter'];
            return this.in_array(words, word);
        },

        // single letter, possibly followed by a period
        is_initial: function (word) {
            // ignore periods
            word = word.replace(".", "");
            return (word.length == 1);
        },

        // detect mixed case words like "McDonald"
        // returns false if the string is all one case
        is_camel_case: function (word) {
            var ucReg = /|[A-Z]+|s/,
                lcReg = /|[a-z]+|s/;
            return (word.match(ucReg) != null && word.match(lcReg) != null);
        },

        // ucfirst words split by dashes or periods
        // ucfirst all upper/lower strings, but leave camelcase words alone
        fix_case: function (word) {
            if (word) {
                // uppercase words split by dashes, like "Kimura-Fay"
                word = this.safe_ucfirst("-", word);
                // uppercase words split by periods, like "J.P."
                word = this.safe_ucfirst(".", word);
            }
            return word;
        },

        // helper this.for fix_case
        safe_ucfirst: function (seperator, word) {
            var words = [];
            // uppercase words split by the seperator (ex. dashes or periods)
            parts = word.split(seperator);
            for (var i = 0; i < parts.length; i++) {
                var thisWord = parts[i];
                words[i] = (this.is_camel_case(thisWord)) ? thisWord : this.ucfirst(thisWord).toLowerCase();
            }
            return this.implode(words, seperator);
        },


        // will auto format phone number;
        validatePhone: function (phoneField) {
            var phoneField = $(phoneField),
                num = phoneField.val().replace(/[^\d]/g, '')
                    .replace(/[^0-9\.]+/g, '');
            if (num.length > 9) {
                phoneField.val("(" + num.substring(0, 3) + ")-" + num.substring(3, 6) + "-" + num.substring(6));
            } else {
                phoneField.val(num)
            }
        }

        /**
         * END Form Specific automation and parsing;
         */

    });

})();

/*! PhotosView */
(function () {
    
    AMA.namespace("view");

    var PhotosView = AMA.view.PhotosView = AMA.view.BaseView.extend();
    

    PhotosView.TEMPLATE_ID = "data_photos_template";
    PhotosView.TEMPLATE_SRC = "photos.tpl";
    
    
    AMA.augment(PhotosView.prototype, {
        events: {
            "click #data_photos_multiaction_perform" : "processBatchAction",
            "click .learnMore.link_text" : "learnMoreDialog",
            "click .console.sync_settings .syncdetails a.link_text":"settingsDialog",
            "click .console.transferdata .transferdetails a.link_text":"transferDialog"
        },

        initialize: function () {
            PhotosView.__super__.initialize.apply(this, arguments);
            
            // Variable declarations
            this.photosBreakdown = null;
            this.photosSelectBar = null;
            this.photosGrid = null;
        },
        
        learnMoreDialog: function() {
            this.LearnMore.show("photos");
        },
        settingsDialog:function() {
            AMA.page.settings.settingsDialog.prevHash = window.location.hash;
        },
        transferDialog:function() {
            Backbone.globalEvent.trigger("showTranferData");
        },
        render: function () {
            PhotosView.__super__.render.apply(this);
            
            this._isIPhone = AMA.Util.isIPhone();
            if(this._isIPhone){
                this.$el.find("#records_tablehalf .selectbar .selectall").hide();
                this.$el.find(".console.transferdata").show();
            }else{
                this.$el.find("#records_tablehalf .selectbar .iphoneNote").hide();
                this.$el.find(".console.transferdata").hide();
            }
            
             this.LearnMore = new AMA.view.LearnMore({
                    el: "#learnMoreDiv",
                    parent: this
                });
            
            // Create the Photos grid and plug its various elements
            this.photosGrid = new AMA.view.PhotosGridView({
                el: "#data_photos_list", 
                parent: this,
                data: AMA.models.photos
            })
            .plug(AMA.view.plugin.Breakdown,{
                breakdownContainer: "#data_photos_breakdown"
            })
            .plug(AMA.view.plugin.ModalGallery, {
                galleryTemplateId : "#blueimp-gallery-photos_template",
                detailsObj: "#photos_details_view",
                settings: {
                    container: "#blueimp-gallery-photos"
                }
            })
            .plug(AMA.view.plugin.Search, {
                searchInput: "#commands_searchinput",
                searchFields: ["name"]
            })
			.plug(AMA.view.plugin.ApiListScrollLoader,{
				scrollContainer: "#photos_list_view",
				listItemType: "a",
				listItemClassname: "thumb_items col-xs-4 col-md-12 col-sm-12 col-lg-12"
			});            

            this.photosDetails = new AMA.view.PhotoDetailsView({
                el:"#photos_details_view",
                parent:this,
                listView: this.photosGrid,
                dataClass: AMA.model.photos
            });
            
            // Create "Sync Settings" summary view which appears inside Photos tab
            this.settingsSummary = new AMA.view.SettingsSummaryView({
                el: "#photos_settings_summary_placeholder",
                data: AMA.models.syncsettings,
                parent: this
            });


        },
        
        _setupEvents: function () {
            var settingsLink = this.$el.find(".console.sync_settings .syncdetails a.link_text");
            settingsLink.on("click", function (){
                AMA.page.settings.settingsDialog.prevHash = window.location.hash;
            });
        },
        
        /**
         * Performs the chosen batch action selected by the user.
         * Checks whether any photos are selected and calls for the update to be performed
         * 
         */
        processBatchAction: function () {
            var msg;
            
            // Determine the action to be performed based on the 
            // current selection on the action dropdown
            var action = $("#data_photos_multiaction_select").val();
            
            // Handle when no action has been selected
            if (action == "") {
                msg = $("#msg_error_no_action_selected").html();
                AMA.page.standardDialogs.error(msg);
                return false;
            } 
                
            var checkedItems = this.photosGrid.getCheckedItems();
            
            // Handle when no photos have been selected
            if (checkedItems.length == 0) {
                msg = $("#msg_error_no_photo_selected").html();
                AMA.page.standardDialogs.error(msg);
                return false;
            } 
            
            function performAction() {
                var eventMsg = {}, photos = AMA.models.photos,
                    updatedPhotos = new AMA.model.Photos();
                
                // Show the Loading dialog
                var msg = $("#msg_loadingdialog").html();
                AMA.page.standardDialogs.loading(msg);
                
                switch (action){
                    case "delete" :
                        // Send delete request
                        AMA.models.photos.trash("image", checkedItems, function (refreshModel) {
                            // On success, hide the loading dialog and refresh the photos model
                            AMA.page.standardDialogs.hideloading();
                            if (refreshModel) {
                                AMA.models.photos.invalidate();
                                AMA.models.trash.invalidate();
                            }
                        });
                        break;
                    case "addToPhone" :
                        // Send add request
                        AMA.models.photos.addRemove("add", "photos", checkedItems, function (refreshModel) {
                            // On success, hide the loading dialog and refresh the photos model
                            AMA.page.standardDialogs.hideloading();
                            if (refreshModel) {
                                AMA.models.photos.invalidate();
                            }
                        });
                        break;
                    case "removeFromPhone" :
                        // Send remove request
                        AMA.models.photos.addRemove("remove", "photos", checkedItems, function (refreshModel) {
                            // On success, hide the loading dialog and refresh the photos model
                            AMA.page.standardDialogs.hideloading();
                            if (refreshModel) {
                                AMA.models.photos.invalidate();
                            }
                        });
                        break;
                }
                
                
                //FIXME: Move to appropriate callback areas
                
                if(AMA.config.enableReporting) {
                    // Log reporting event    for delete action performed dropdown
                    if(action==="delete") {
                        eventMsg['ActionPerformed'] = "Delete Photo from phone & web- ActionPerformed dropdown";        
                        AMA.debug("Reporting.logging for photo deleted from phone & web ");
                        AMA.ReportingManager.reportUserAction(AMA.config.reportingEventTypes.deletephotoactionperformed,eventMsg);
                    }
                    // Log reporting event    for add to phone action performed dropdown
                    if(action==="addToPhone") {
                        eventMsg['ActionPerformed'] = "Add Photo to Device - ActionPerformed dropdown";        
                        AMA.debug("Reporting.logging for photo added to phone ");
                        AMA.ReportingManager.reportUserAction(AMA.config.reportingEventTypes.actiondropdownaddphoto,eventMsg);
                    }
                    // Log reporting event    for remove from  phone action performed dropdown
                    if(action==="removeFromPhone") {
                        eventMsg['ActionPerformed'] = "Remove Photo from Device - ActionPerformed dropdown";        
                        AMA.debug("Reporting.logging for photo removed from phone ");
                        AMA.ReportingManager.reportUserAction(AMA.config.reportingEventTypes.actiondropremovephoto,eventMsg);
                    }
                }
            }
            
            // Display confirmation dialog if DELETE, otherwise perform action immediately
            if (action === "delete") {
                msg = $("#msg_confirm_delete_photo" + (checkedItems.length > 1 ? "s" : "")).html();
                AMA.page.standardDialogs.confirm(msg, performAction);
        
            } else {
                performAction();
            }
        },
    });
})();



/*! PhotosGridView */
(function () {

    AMA.namespace("view");

    var PhotosGridView = AMA.view.PhotosGridView = AMA.view.ListView.extend();

    PhotosGridView.TEMPLATE_ID = "photos_list_template";
    PhotosGridView.TEMPLATE_SRC = "";

    PhotosGridView.FILE_URLS = [];
    PhotosGridView.FILE_SIZES = [];

    PhotosGridView.CSS = {
        ITEM: "thumb_items",
        ITEM_STYLE: ["rt_rowlighter", "rt_rowdarker"],
        SELECTED_ITEM: "selected",
        BTN_CONTAINER: "buttoncontainer",
        BTN_VIEWFULLSIZE: "btn_viewfullsize",
        BTN_ADDTOPHONE: "btn_addtophone",
        BTN_REMOVEFROMPHONE: "btn_removefromphone",
        BTN_DOWNLOAD: "btn_downloadphoto",
        BTN_DELETE: "btn_deletephoto"
    };

    AMA.augment(PhotosGridView.prototype, {
        initialize: function () {
            PhotosGridView.__super__.initialize.apply(this, arguments);
            this.slideContainer = false;
            this.addFilter("_includes", this._includes, 0);
            this._isIPhone = AMA.Util.isIPhone(AMA.models.endpoints.models[0].get("platformfriendlyname"));
        },
        
		_includes: function (item) {
		      return item.pendingTransmit === false;
		},        

        render: function () {
            if(!this.data.length) {
                var content = _.template($("#photos_blank_list_template").html(), this._processData(this.dataDetails));
                // Attach the content to the container element
                this.$el.html(content);
                this.trigger("PHOTOS:no.data");
            } else {
                PhotosGridView.__super__.render.apply(this);
            }
        },

        _processData: function (item) {
            return item;
        },
        _setupEvents: function () {
            PhotosGridView.__super__._setupEvents.apply(this, arguments);

            var o = this,
                parentObj = o.parent.$el,
                isDownloading = false;
                fullSizeButtons = o.$el.find("." + o._css.BTN_VIEWFULLSIZE),
                addToPhoneButtons = o.$el.find("." + o._css.BTN_ADDTOPHONE),
                removeFromPhoneButtons = o.$el.find("." + o._css.BTN_REMOVEFROMPHONE),
                downloadButtons = o.$el.find("." + o._css.BTN_DOWNLOAD),
                deleteButtons = o.$el.find("." + o._css.BTN_DELETE);

			// Remove Add To Phone button for iPhone device
			if(AMA.Util.isIPhone()) {
				addToPhoneButtons.remove();
			}

            // "Download Photo" triggers a file download for the selected photo

            parentObj.off("click", "." +o._css.BTN_DOWNLOAD).on("click", "." +o._css.BTN_DOWNLOAD, function () {
                if(isDownloading) return;
                var itemUid = this.attributes.uid.value; // Get UID of video to be downloaded
                isDownloading = true;

                AMA.models.photos.downloadFile("image", itemUid, function (data) {
                    // On success, construct download url using data returned by the server, then download file
                    var url = data.mediaUrl.replace("content?", "download?") + "&fileName=" + data.fileName;
                    AMA.Util.downloadFile(url);
                    isDownloading = false;
                });
            });
            // "Remove From Phone" initiates removal of selected photo from device
            parentObj.off("click", "." + o._css.BTN_REMOVEFROMPHONE).on("click", "." + o._css.BTN_REMOVEFROMPHONE, function () {
                var itemUid = this.attributes.uid.value, // Get UID of video to be downloaded
                        msg = $("#msg_loadingdialog").html();

                // Show loading dialog
                AMA.page.standardDialogs.loading(msg);

                if(AMA.config.enableReporting)  {
                    var eventMsg={};
                    eventMsg['ActionPerformed']="Remove From Phone";
                    AMA.debug("Reporting: Logging event for photo added to phone");
                    AMA.ReportingManager.reportUserAction(AMA.config.reportingEventTypes.removephotofrmphone,eventMsg);
                }

                AMA.models.photos.addRemove("remove", "photos", [itemUid], function (refreshModel) {
                    // On success, hide the loading dialog and refresh the photos model
                    o.once(AMA.view.ListView.EVENT.NEW_DATA_LOADED, function(content) {
                        o.eventChangesOnGallery(content, this.currentIndex);
                    })

                    AMA.page.standardDialogs.hideloading();
                    if (refreshModel) AMA.models.photos.invalidate();
                });
            });

            this.$el.on("click", "." + o._css.ITEM, function (e) {
                var node = this,
                        intIndex = o.$el.find(".thumb_items").index($(node)),
                        curretnIndex = o.$el.find(".thumb_items")[intIndex];
                e.preventDefault();
            });

            // "Delete Photo" triggers a confirmation dialog
            // If user confirms, initiate delete request
            parentObj.off('click', ".btn_deletephoto").on("click", ".btn_deletephoto", function () {
                var p = o,
                        itemUid = this.attributes.uid.value; // Store UID to be deleted

                // Show Confirm dialog
                var msg = $("#msg_confirm_delete_photo").html();
                AMA.page.standardDialogs.confirm(msg, function () {
                    // Hide confirmation dialog
                    AMA.page.standardDialogs.confirmDialog.hide();

                    // Show loading dialog
                    var msg = $("#msg_loadingdialog").html();
                    AMA.page.standardDialogs.loading(msg);

                    // Send delete request
                    AMA.models.photos.trash("image", [itemUid], function (refreshModel) {
                        // On success, hide the loading dialog and refresh the photos model
                        AMA.page.standardDialogs.hideloading();
                        if (refreshModel) {
                            AMA.models.photos.invalidate();
                            AMA.models.trash.invalidate();
                        }
                        o.once(AMA.view.ListView.EVENT.NEW_DATA_LOADED, function(content) {
                            o.eventChangesOnGallery(content, this.currentIndex);
                        });
                    });
                });
            });

            parentObj.off("click", "." + o._css.BTN_ADDTOPHONE).on("click", "." + o._css.BTN_ADDTOPHONE, function () {
                var itemUid = this.attributes.uid.value, // Get UID of video to be downloaded
                        msg = $("#msg_loadingdialog").html();

                // Show loading dialog
                AMA.page.standardDialogs.loading(msg);

                if(AMA.config.enableReporting)  {
                    var eventMsg={};
                    eventMsg['ActionPerformed']="Add From Phone";
                    AMA.debug("Reporting: Logging event for photo added to phone");
                    AMA.ReportingManager.reportUserAction(AMA.config.reportingEventTypes.removephotofrmphone,eventMsg);
                }

                AMA.models.photos.addRemove("add", "photos", [itemUid], function (refreshModel) {
                    o.once(AMA.view.ListView.EVENT.NEW_DATA_LOADED, function(content) {
                        o.eventChangesOnGallery(content, this.currentIndex);
                    })
                    // On success, hide the loading dialog and refresh the photos model
                    AMA.page.standardDialogs.hideloading();
                    if (refreshModel) AMA.models.photos.invalidate();
                });

            })
        }
    });
})();
/*! PhotosDetailsView */
(function () {

    AMA.namespace("view");

    var PhotoDetailsView = AMA.view.PhotoDetailsView = AMA.view.BaseView.extend();


    PhotoDetailsView.TEMPLATE_ID = "photo_details_template";
    PhotoDetailsView.TEMPLATE_SRC = "";

    AMA.augment(PhotoDetailsView.prototype, {
        initialize: function () {
            PhotoDetailsView.__super__.initialize.apply(this, arguments);
            var o = this;
            this.dataDetails = null;
            if (this.options.listView) {
                this.options.listView.on(AMA.view.ListView.EVENT.ITEM_SELECTED, function (data) {
                    if(o.data) {
                        o.data.isFetching = true;
                    }
                    o.dataDetails = false;

                    o._fetchDetails(data.toJSON());

                });
                this.options.listView.on(AMA.view.ListView.EVENT.SELECTION_CLEARED, function () {
                    o.hide();
                });
            } else {
                AMA.warning("This instance of ContactDetailsView is not linked to a contacts list. Data switching will not apply.");
            }
        },
        renderBlank: function() {
            var content = _.template($("#photos_blank_details_template").html());
            // Attach the content to the container element
            this.$el.html(content);
        },
        render: function () {
            if(!this.dataDetails) return;
            // Generate the content from template + data
            var content = _.template(this.template, this._processData(this.dataDetails));
            // Attach the content to the container element
            this.$el.html(content);

            this.options.listView.trigger(AMA.view.ListView.EVENT.NEW_DATA_LOADED, [content]);

        },
        _fetchDetails: function(item) {
            var o = this;
            if (AMA.Util.useXdr()){
                xhr = AMA.Util.createCORSRequest("GET", AMA.config.apiHostUrl + "/files/" + item.id + "?devId=" + AMA.config.devId + "&authToken=" + AMA.config.authToken + "&endpointId=" + AMA.config.endpointId + "&fileType=" + mediaType);

                xhr.onload = function () {
                    try {
                        var data = JSON.parse(this.responseText);
                    }
                    catch (e) {
                        AMA.error("Response not JSON");
                    }
                };

                xhr.onerror = function () {
                    AMA.error("Error in request");
                };
                xhr.onprogress = function () {};
                xhr.ontimeout = function () {};
                xhr.timeout = 100000; // Prevents IE9 from aborting the request

                xhr.send();
            }
            else {
                $.ajax({
                    url: AMA.config.apiHostUrl + "/files/" + item.id + "?devId=" + AMA.config.devId + "&authToken=" + AMA.config.authToken + "&endpointId=" + AMA.config.endpointId + "&fileType=image"
                }).done(function (data) {

                            o.dataDetails = data;
                            o.refresh();
                        });
            }
        },

        _setupEvents: function () {
            PhotoDetailsView.__super__._setupEvents.apply(this);
            var o = this;

            this.$el.find(".details_undeletebutton").off("click").on("click", function() {
                var self = this,
                        msg = $("#msg_confirm_restore_trashitem").html();

                // Show Confirm Restore dialog
                AMA.page.standardDialogs.confirm(msg, function () {
                    // Hide Confirm Delete dialog
                    AMA.page.standardDialogs.confirmDialog.hide();

                    // Show Loading dialog
                    var msg = $("#msg_loadingdialog").html();
                    AMA.page.standardDialogs.loading(msg);

                    // Send restore request
                    AMA.models.trash.restore([self.attributes.uid.value], function () {
                        // On success, hide the loading dialog and refresh the contacts model
                        AMA.page.standardDialogs.hideloading();
                        if (arguments[1]) {
                            AMA.models.photos.invalidate();
                            AMA.models.trash.invalidate();
                        }
                    });
                });
            });

            this.$el.find(".details_deletefromtrashbutton").off("click").on("click", function() {
                var self = this,
                        msg = $("#msg_confirm_permadelete_trashitem").html();

                // Show Confirm Restore dialog
                AMA.page.standardDialogs.confirm(msg, function () {
                    // Hide Confirm Delete dialog
                    AMA.page.standardDialogs.confirmDialog.hide();

                    // Show Loading dialog
                    var msg = $("#msg_loadingdialog").html();
                    AMA.page.standardDialogs.loading(msg);

                    // Send delete request
                    AMA.models.trash.trash([self.attributes.uid.value], function () {
                        // On success, hide the loading dialog and refresh the contacts model
                        AMA.page.standardDialogs.hideloading();
                        if (arguments[1]) {
                            AMA.models.trash.invalidate();
                        }
                    });
                });
            });
            if(!this.parent.photosGrid) return;
            this.parent.photosGrid.on("PHOTOS:no.data", function() {
                this.renderBlank();
            }, this);
        },

        _processData: function (item) {
            var data = item;

            data.onTrash = (item.visibility !== "ACTIVE") ? "hide" : "";
            data.notOnTrash = (item.visibility === "ACTIVE") ? "hide" : "";
            data.fileSizeInBytes = AMA.Util.bytesToSize(item.fileSizeInBytes);
            data.statueText = this._getStatusText(item);
            data.statueText.addToPhone = (data.pendingDelete) ? "" : "hide";
            data.statueText.removeFromPhone =  (data.pendingDelete) ? "hide" : "";
            return data;
        },
        _getStatusText: function(item) {
            data = {
                addSync: "hidden hide",
                deleteSync: "hidden hide",
                webOnly: "hidden hide",
                onDevice: "hidden hide",

            }
            switch(true) {
                case (item.pendingCreate):
                    data.addSync = "";
                    break;
                case (item.pendingDelete && item.onPhone):
                    // Deleted on next sync
                    data.deleteSync = "";
                    break;
                case (item.onPhone):
                    // on device
                    data.onDevice = "";
                    break;
                default:
                    // web only
                    data.webOnly = "";
                    break;

            }
            return data;

        },

        /*        _getDisplayName: function (item) {
         return item.fullName ||
         this._computeFullName(item) ||
         item.companyName ||
         item.email;
         }*/

    });

})();

/*! VideosView */
(function () {
    
    AMA.namespace("view");

    var VideosView = AMA.view.VideosView = AMA.view.BaseView.extend();

    VideosView.TEMPLATE_ID = "data_videos_template";
    VideosView.TEMPLATE_SRC = "videos.tpl";
    

    AMA.augment(VideosView.prototype, {
        events: {
            "click #data_videos_multiaction_perform" : "processBatchAction",
            "click .learnMore.link_text" : "learnMoreDialog",
            "click .console.sync_settings .syncdetails a.link_text":"settingsDialog",
            "click .console.transferdata .transferdetails a.link_text":"transferDialog"
        },

        initialize: function () {
            VideosView.__super__.initialize.apply(this, arguments);
            
            this.videosBreakdown = null;
            this.videosGrid = null;
            this.videosSelectBar = null;
        },
        
        learnMoreDialog: function() {
            this.LearnMore.show("videos");
        },
        settingsDialog:function() {
            AMA.page.settings.settingsDialog.prevHash = window.location.hash;
        },
        transferDialog:function() {
            Backbone.globalEvent.trigger("showTranferData");
        },
        render: function () {
            VideosView.__super__.render.apply(this);
            
            this._isIPhone = AMA.Util.isIPhone();
            if(this._isIPhone){
                this.$el.find("#records_tablehalf .selectbar .selectall").hide();
                this.$el.find(".console.transferdata").show();
            }else{
                this.$el.find("#records_tablehalf .selectbar .iphoneNote").hide();
                this.$el.find(".console.transferdata").hide();
            }
            
            this.LearnMore = new AMA.view.LearnMore({
                el: "#learnMoreDiv",
                parent: this
            });
            
            // Create the Photos grid and plug its various elements
            this.videosGrid = new AMA.view.VideosGridView({
                el: "#data_videos_list", 
                parent: this, 
                data: AMA.models.videos
            })
            .plug(AMA.view.plugin.ModalGallery, {
                galleryTemplateId : "#blueimp-gallery-videos_template",
                detailsObj: "#video_details_view",
                settings: {
                    container: "#blueimp-gallery-videos"
                }
            })
            .plug(AMA.view.plugin.Breakdown,{
                breakdownContainer: "#data_videos_breakdown"
            });
            this.videoDetails = new AMA.view.VideoDetailsView({
                el:"#video_details_view",
                parent:this,
                listView: this.videosGrid,
                dataClass: AMA.model.videos
            });

            // Create "Sync Settings" summary view which appears inside Videos tab
            this.settingsSummary = new AMA.view.SettingsSummaryView({
                el: "#videos_settings_summary_placeholder",
                data: AMA.models.syncsettings,
                parent: this
            });
        },
        
        _setupEvents: function () {
            var settingsLink = this.$el.find(".console.sync_settings .syncdetails a.link_text");
            settingsLink.on("click", function (){
                AMA.page.settings.settingsDialog.prevHash = window.location.hash;
            });
        },
        
        /**
         * Performs the chosen batch action selected by the user.
         * Checks whether any photos are selected and calls for the update to be performed
         * 
         */
        processBatchAction: function () {
            var msg;
            
            // Determine the action to be performed based on the 
            // current selection on the action dropdown
            var action = $("#data_videos_multiaction_select").val();
            
            // Handle when no action has been selected
            if (action == "") {
                msg = $("#msg_error_no_action_selected").html();
                AMA.page.standardDialogs.error(msg);
                return false;
            } 
                
            var checkedItems = this.videosGrid.getCheckedItems();
            
            // Handle when no videos have been selected
            if (checkedItems.length == 0) {
                msg = $("#msg_error_no_video_selected").html();
                AMA.page.standardDialogs.error(msg);
                return false;
            } 
            
            function performAction() {
                var eventMsg = {}, videos = AMA.models.videos,
                    updatedVideos = new AMA.model.Videos();
                
                // Show the Loading dialog
                var msg = $("#msg_loadingdialog").html();
                AMA.page.standardDialogs.loading(msg);
                
                switch (action){
                    case "delete" :
                        // Send delete request
                        AMA.models.videos.trash("video", checkedItems, function (refreshModel) {
                            // On success, hide the loading dialog and refresh the videos model
                            AMA.page.standardDialogs.hideloading();
                            if (refreshModel) {
                                AMA.models.videos.invalidate();
                                AMA.models.trash.invalidate();
                            }
                        });
                        break;
                    case "addToPhone" :
                        // Send add request
                        AMA.models.videos.addRemove("add", "videos", checkedItems, function (refreshModel) {
                            // On success, hide the loading dialog and refresh the videos model
                            AMA.page.standardDialogs.hideloading();
                            if (refreshModel) {
                                AMA.models.videos.invalidate();
                            }
                        });
                        break;
                    case "removeFromPhone" :
                        // Send remove request
                        AMA.models.videos.addRemove("remove", "videos", checkedItems, function (refreshModel) {
                            // On success, hide the loading dialog and refresh the videos model
                            AMA.page.standardDialogs.hideloading();
                            if (refreshModel) {
                                AMA.models.videos.invalidate();
                            }
                        });
                        break;
                }
                
                
                //FIXME: Move to appropriate callback areas
                
                if(AMA.config.enableReporting) {
                    // Log reporting event    for delete action performed dropdown
                    if(action==="delete") {
                        eventMsg['ActionPerformed'] = "Delete Video from phone & web- ActionPerformed dropdown";
                        AMA.debug("Reporting.logging for video deleted from phone & web ");
                        AMA.ReportingManager.reportUserAction(AMA.config.reportingEventTypes.deletevideoactionperformed,eventMsg);
                    }
                    // Log reporting event    for add to phone action performed dropdown
                    if(action==="addToPhone") {
                        eventMsg['ActionPerformed'] = "Add video to Device - ActionPerformed dropdown";
                        AMA.debug("Reporting.logging for video added to phone ");
                        AMA.ReportingManager.reportUserAction(AMA.config.reportingEventTypes.actiondropdownaddvideo,eventMsg);
                    }
                    // Log reporting event    for remove from  phone action performed dropdown
                    if(action==="removeFromPhone") {
                        eventMsg['ActionPerformed'] = "Remove video from Device - ActionPerformed dropdown";
                        AMA.debug("Reporting.logging for video removed from phone ");
                        AMA.ReportingManager.reportUserAction(AMA.config.reportingEventTypes.actiondropremovevideo,eventMsg);
                    }
                }
            }
            
            // Display confirmation dialog if DELETE, otherwise perform action immediately
            if (action === "delete") {
                msg = $("#msg_confirm_delete_video" + (checkedItems.length > 1 ? "s" : "")).html();
                AMA.page.standardDialogs.confirm(msg, performAction);
        
            } else {
                performAction();
            }
        }
    });
})();
/*! VideosGridView */
(function () {
    
    AMA.namespace("view");

    var VideosGridView = AMA.view.VideosGridView = AMA.view.ListView.extend();

    VideosGridView.TEMPLATE_ID = "videos_list_template";
    VideosGridView.TEMPLATE_SRC = "";
    
    VideosGridView.FILE_URLS = [];
    VideosGridView.FILE_SIZES = [];
    
    VideosGridView.CSS = {
        ITEM: "thumb_items",
        ITEM_STYLE: ["rt_rowlighter", "rt_rowdarker"],
        SELECTED_ITEM: "selected",
        BTN_CONTAINER: "buttoncontainer",
        BTN_VIEWFULLSIZE: "btn_playvideo",
        BTN_ADDTOPHONE: "btn_addtophone",
        BTN_REMOVEFROMPHONE: "btn_removefromphone",
        BTN_DOWNLOAD: "btn_downloadvideo",
        BTN_DELETE: "btn_deletevideo"
    };

    
    AMA.augment(VideosGridView.prototype, {
        initialize: function () {
            VideosGridView.__super__.initialize.apply(this, arguments);
            this.addFilter("_includes", this._includes, 0);
            this._isIPhone = AMA.Util.isIPhone(AMA.models.endpoints.models[0].get("platformfriendlyname"));
            
            this.fileIds = [];
        },
        
		_includes: function (item) {
		      return item.pendingTransmit === false;
		},
        
        render: function () {
            if(!this.data.length) {
                var content = _.template($("#videos_blank_list_template").html(), this._processData(this.dataDetails));
                // Attach the content to the container element
                this.$el.html(content);
                this.trigger("VIDEOS:no.data");
            } else {
            VideosGridView.__super__.render.apply(this);
            }
        },

        _processData: function (item) {
            return item;
        },
        
        _setupEvents: function () {
            VideosGridView.__super__._setupEvents.apply(this, arguments);
            
            var o = this,
                parentObj = o.parent.$el;
                fullSizeButtons = o.$el.find("." + o._css.BTN_VIEWFULLSIZE),
                addToPhoneButtons = o.$el.find("." + o._css.BTN_ADDTOPHONE),
                removeFromPhoneButtons = o.$el.find("." + o._css.BTN_REMOVEFROMPHONE),
                downloadButtons = o.$el.find("." + o._css.BTN_DOWNLOAD),
                deleteButtons = o.$el.find("." + o._css.BTN_DELETE);
                
			// Remove Add To Phone button for iPhone device
			if(AMA.Util.isIPhone()) {
				addToPhoneButtons.remove();
			}                

            parentObj.off("click", "." +o._css.BTN_DOWNLOAD).on("click", "." +o._css.BTN_DOWNLOAD, function () {
                var itemUid = this.attributes.uid.value; // Get UID of video to be downloaded

                AMA.models.photos.downloadFile("image", itemUid, function (data) {
                    // On success, construct download url using data returned by the server, then download file
                    var url = data.mediaUrl.replace("content?", "download?") + "&fileName=" + data.fileName;

                    AMA.Util.downloadFile(url);
                });
            });
            // "Remove From Phone" initiates removal of selected photo from device
            parentObj.off("click", "." + o._css.BTN_REMOVEFROMPHONE).on("click", "." + o._css.BTN_REMOVEFROMPHONE, function () {
                var itemUid = this.attributes.uid.value, // Get UID of video to be downloaded
                        msg = $("#msg_loadingdialog").html();

                // Show loading dialog
                AMA.page.standardDialogs.loading(msg);

                if(AMA.config.enableReporting)  {
                    var eventMsg={};
                    eventMsg['ActionPerformed']="Remove From Phone";
                    AMA.debug("Reporting: Logging event for photo added to phone");
                    AMA.ReportingManager.reportUserAction(AMA.config.reportingEventTypes.removephotofrmphone,eventMsg);
                }

                AMA.models.videos.addRemove("remove", "videos", [itemUid], function (refreshModel) {
                    o.once(AMA.view.ListView.EVENT.NEW_DATA_LOADED, function(content) {
                        o.eventChangesOnGallery(content, this.currentIndex);
                    });
                    // On success, hide the loading dialog and refresh the videos model
                    AMA.page.standardDialogs.hideloading();
                    if (refreshModel) AMA.models.videos.invalidate();
                });
            });

            this.$el.on("click", "." + o._css.ITEM, function (e) {
                var node = this,
                        intIndex = o.$el.find(".thumb_items").index($(node)),
                        curretnIndex = o.$el.find(".thumb_items")[intIndex];
                e.preventDefault();
            });


            parentObj.off("click", "." + o._css.BTN_DELETE).on("click", "." + o._css.BTN_DELETE, function () {
                var p = o,
                        itemUid = this.attributes.uid.value; // Store UID to be deleted

                // Show Confirm dialog
                var msg = $("#msg_confirm_delete_video").html();
                AMA.page.standardDialogs.confirm(msg, function () {
                    // Hide confirmation dialog
                    AMA.page.standardDialogs.confirmDialog.hide();

                    // Show loading dialog
                    var msg = $("#msg_loadingdialog").html();
                    AMA.page.standardDialogs.loading(msg);

                    // Send delete request
                    AMA.models.videos.trash("video", [itemUid], function (refreshModel) {
                        o.once(AMA.view.ListView.EVENT.NEW_DATA_LOADED, function(content) {
                            o.eventChangesOnGallery(content, this.currentIndex);
                        });
                        // On success, hide the loading dialog and refresh the videos model
                        AMA.page.standardDialogs.hideloading();
                        if (refreshModel) {
                            AMA.models.videos.invalidate();
                            AMA.models.trash.invalidate();
                        }
                    });
                });
            });
            parentObj.off("click", "." + o._css.BTN_ADDTOPHONE).on("click", "." + o._css.BTN_ADDTOPHONE, function () {
                var itemUid = this.attributes.uid.value, // Get UID of video to be downloaded
                        msg = $("#msg_loadingdialog").html();

                // Show loading dialog
                AMA.page.standardDialogs.loading(msg);

                if(AMA.config.enableReporting)  {
                    var eventMsg={};
                    eventMsg['ActionPerformed']="Add From Phone";
                    AMA.debug("Reporting: Logging event for photo added to phone");
                    AMA.ReportingManager.reportUserAction(AMA.config.reportingEventTypes.removephotofrmphone,eventMsg);
                }

                AMA.models.videos.addRemove("add", "videos", [itemUid], function (refreshModel) {
                    o.once(AMA.view.ListView.EVENT.NEW_DATA_LOADED, function(content) {
                        o.eventChangesOnGallery(content, this.currentIndex);
                    });

                    // On success, hide the loading dialog and refresh the videos model
                    AMA.page.standardDialogs.hideloading();
                    if (refreshModel) AMA.models.videos.invalidate();
                });

            })

        }
    });
})();
/*! VideoDetailsView */
(function () {

    AMA.namespace("view");

    /**
     * Renders Video Details View
     *
     * @class VideoDetailsView
     * @namespace view
     * @extends AMA.view.VideoDetailsView
     * @constructor
     */
    var VideoDetailsView = AMA.view.VideoDetailsView = AMA.view.BaseView.extend();

    /**
     * ID of the template
     *
     * @property TEMPLATE_ID
     * @type string
     * @static
     * @final
     */
    VideoDetailsView.TEMPLATE_ID = "video_details_template";


    /**
     * Applicable only to view classes that fetch the aggregated templates for
     * itself and its child views, this property defines the name of the
     * template file to load. The path is defined in AMA.config.templatePath.
     *
     * @property TEMPLATE_SRC
     * @type string
     * @static
     * @final
     */
    VideoDetailsView.TEMPLATE_SRC = "";

    AMA.augment(VideoDetailsView.prototype, {
        initialize: function () {
            VideoDetailsView.__super__.initialize.apply(this, arguments);
            var o = this;
            this.dataDetails = null;
            if (this.options.listView) {
                this.options.listView.on(AMA.view.ListView.EVENT.ITEM_SELECTED, function (data) {
                    if(o.data) {
                        o.data.isFetching = true;
                    }
                    o.dataDetails = false;

                    o._fetchDetails(data.toJSON());

                });
                this.options.listView.on(AMA.view.ListView.EVENT.SELECTION_CLEARED, function () {
                    o.hide();
                });
            } else {
                AMA.warning("This instance of ContactDetailsView is not linked to a contacts list. Data switching will not apply.");
            }
        },
        renderBlank: function() {
            var content = _.template($("#videos_blank_details_template").html());
            // Attach the content to the container element
            this.$el.html(content);
        },

        render: function () {
            if(!this.dataDetails) return;

            var data = (this.data && this.data.length > 0) ? this.data.toJSON()[0] : {},
                content = "";

            // Generate the content from template + data
            var content = _.template(this.template, this._processData(this.dataDetails));

            // Attach the content to the container element
            this.$el.html(content);
        },
        _fetchDetails: function(item) {
            var o = this;
            if (AMA.Util.useXdr()){
                xhr = AMA.Util.createCORSRequest("GET", AMA.config.apiHostUrl + "/files/" + item.id + "?devId=" + AMA.config.devId + "&authToken=" + AMA.config.authToken + "&endpointId=" + AMA.config.endpointId + "&fileType=" + mediaType);

                xhr.onload = function () {
                    try {
                        var data = JSON.parse(this.responseText);
                    }
                    catch (e) {
                        AMA.error("Response not JSON");
                    }
                };

                xhr.onerror = function () {
                    AMA.error("Error in request");
                };
                xhr.onprogress = function () {};
                xhr.ontimeout = function () {};
                xhr.timeout = 100000; // Prevents IE9 from aborting the request

                xhr.send();
            }
            else {
                $.ajax({
                    url: AMA.config.apiHostUrl + "/files/" + item.id + "?devId=" + AMA.config.devId + "&authToken=" + AMA.config.authToken + "&endpointId=" + AMA.config.endpointId + "&fileType=video"
                }).done(function (data) {
                            o.dataDetails = data;
                            o.refresh();
                        });
            }
        },
        _processData: function (item) {
            var data = item;

            data.onTrash = (item.visibility !== "ACTIVE") ? "hide" : "";
            data.notOnTrash = (item.visibility === "ACTIVE") ? "hide" : "";
            data.fileSizeInBytes = AMA.Util.bytesToSize(item.fileSizeInBytes);
            data.statueText = this._getStatusText(item);
            data.statueText.addToPhone = (data.pendingDelete) ? "" : "hide";
            data.statueText.removeFromPhone =  (data.pendingDelete) ? "hide" : "";
            return data;
        },
        _getStatusText: function(item) {
            data = {
                addSync: "hidden",
                deleteSync: "hidden",
                webOnly: "hidden",
                onDevice: "hidden",

            }
            switch(true) {
                case (item.pendingCreate):
                    data.addSync = "";
                    break;
                case (item.pendingDelete && item.onPhone):
                    // Deleted on next sync
                    data.deleteSync = "";
                    break;
                case (item.onPhone):
                    // on device
                    data.webOnly = "";
                    break;
                default:
                    // web only
                    data.onDevice = "";
                    break;

            }
            return data;

        },
        _setupEvents: function() {
            this.$el.find(".details_undeletebutton").off("click").on("click", function() {
                var self = this,
                        msg = $("#msg_confirm_restore_trashitem").html();

                // Show Confirm Restore dialog
                AMA.page.standardDialogs.confirm(msg, function () {
                    // Hide Confirm Delete dialog
                    AMA.page.standardDialogs.confirmDialog.hide();

                    // Show Loading dialog
                    var msg = $("#msg_loadingdialog").html();
                    AMA.page.standardDialogs.loading(msg);

                    // Send restore request
                    AMA.models.trash.restore([self.attributes.uid.value], function () {
                        // On success, hide the loading dialog and refresh the contacts model
                        AMA.page.standardDialogs.hideloading();
                        if (arguments[2]) {
                            AMA.models.videos.invalidate();
                            AMA.models.trash.invalidate();
                        }
                    });
                });
            });

            this.$el.find(".details_deletefromtrashbutton").off("click").on("click", function() {
                var self = this,
                        msg = $("#msg_confirm_permadelete_trashitem").html();

                // Show Confirm Restore dialog
                AMA.page.standardDialogs.confirm(msg, function () {
                    // Hide Confirm Delete dialog
                    AMA.page.standardDialogs.confirmDialog.hide();

                    // Show Loading dialog
                    var msg = $("#msg_loadingdialog").html();
                    AMA.page.standardDialogs.loading(msg);

                    // Send delete request
                    AMA.models.trash.trash([self.attributes.uid.value], function () {
                        // On success, hide the loading dialog and refresh the contacts model
                        AMA.page.standardDialogs.hideloading();
                        if (arguments[2]) {
                            AMA.models.trash.invalidate();
                        }
                    });
                });
            });
            if(!this.parent.videosGrid) return;
            this.parent.videosGrid.on("VIDEOS:no.data", function() {
                this.renderBlank();
            }, this);

        }
        /*
        _processData: function (item) {
            var data = {};

            data.id = item.id;

            data.fileName = item.fileName;

            data.videoURL = item.thumbnailUrl;
            AMA.debug("Attempting to show video: " + data.videoURL);

            data.link = AMA.config.downloadPathPrefix + item.fileName + AMA.config.downloadPathSuffix + item.data;

            return data;
        },
        
        _setupEvents: function () {
            VideoDetailsView.__super__._setupEvents.apply(this);

            var o = this;
            this.$el.find(".details_viewfullsizebutton").on("click", function() {
                var itemUid = this.attributes.uid.value;
                    
                if (AMA.models.capabilities.canRead("files_id_fileType_video")) {
                    $.prettyPhoto.open("video", [itemUid], null, this, true);
                }
            });

        }*/
    });

})();

/*! TrashView */
(function () {

	AMA.namespace("view");

	var TrashView = AMA.view.TrashView = AMA.view.BaseView.extend();


	TrashView.TEMPLATE_ID = "data_trash_template";
	TrashView.TEMPLATE_SRC = "trash.tpl";


	// Filter functions for viewing trash items by data type
	var TYPE_FILTER_FN = {
			contact: function(item) {
				return item.fullName ? true : false;
			},
			photo: function(item) {
				return (item.fileType && item.fileType.indexOf("image") > -1);
			},
			image: function(item) {
				return (item.fileType && item.fileType.indexOf("image") > -1);
			},
			video: function(item) {
				return (item.fileType && item.fileType.indexOf("video") > -1);
			},
			all: function() {
				return true;
			}
	};


	_.extend(TrashView.prototype, {
		events: {
			"click .data_trash_emptytrash": "emptyTrash",
			"change #trashtype": "applyTypeFilter",
            "click #data_trash_multiaction_perform": "processBatchAction"
		},

		initialize: function () {
			TrashView.__super__.initialize.apply(this, arguments);

		},
		
		render: function () {
			TrashView.__super__.render.apply(this);

			this.trashList = new AMA.view.TrashedListView({
				el: "#data_trash_list",
				parent: this,
				data: AMA.models.trash
			})
//			.plug(AMA.view.plugin.Paginator,{
//				pageSelector: "#data_trash_pageselector"
//			})
			.plug(AMA.view.plugin.ListScrollLoader,{
				scrollContainer: "#data_trash_list",
				listItemType: "li",
				listItemClassname: "rt_row"
			})			
			.plug(AMA.view.plugin.MultiSelector, {
				selectAll: "#data_trash_selectall"
			})
			.plug(AMA.view.plugin.ApiSearch, {
				searchInput: "#data_trash_searchbar .searchinput"
			});

			this.trashDetails = new AMA.view.TrashDetailsView({
				el: "#trash_details_view",
				parent: this
			});

		},

		emptyTrash: function () {
			// Bypass if trash list does not exist yet (view not yet rendered)
			if (!this.trashList) return;

			// Show error message if trash is currently empty
			if (this.trashList.data.length == 0) {
				msg = $("#msg_empty_trash_no_items").html();
				AMA.page.standardDialogs.error(msg);
				return;
			}
			
			var trashListIds = [];
			
			_.each(this.trashList.data.models, function (item){
				trashListIds.push(item.id);
			});

			// Prompt user to confirm before proceeding
			msg = $("#msg_confirm_empty_trash").html();
			AMA.page.standardDialogs.confirm(msg, _.bind(function () {
				var msg = $("#msg_trash_loadingdialog").html();
				
				// Hide Confirm Delete dialog
				AMA.page.standardDialogs.confirmDialog.hide();
				
				// Show the Loading dialog
				AMA.page.standardDialogs.loading(msg);
					
				// Send purge request
                AMA.models.trash.trash(trashListIds, function () {
                    // On success, hide the loading dialog and refresh the trash model
                    AMA.page.standardDialogs.hideloading();
                    if (arguments[0] || arguments[1] || arguments[2]) {
                    	AMA.models.trash.invalidate();
                    }
                });
			}, this));
		},

		applyTypeFilter: function () {
			// Bypass if trash list does not exist yet (view not yet rendered)
			if (!this.trashList) return;

			this.trashList.addFilter("_typefilter", TYPE_FILTER_FN[this.$el.find("#trashtype").val()]);
			this.trashList.refresh();
		},

		processBatchAction: function () {
			var msg, eventMsg = {};
			var isContactDeletedOrRestored=false,
				isVideoDeletedOrRestored=false,
				isPhotoDeletedOrRestored=false;

			// Determine the action to be performed based on the
			// current selection on the action dropdown
			var action = $("#data_trash_multiaction_select").val();

			// Handle when no action has been selected
			if (action == "") {
				msg = $("#msg_error_no_action_selected").html();
				AMA.page.standardDialogs.error(msg);
				return false;
			}

			var checkedItems = this.trashList.getCheckedItems();

			// Handle when no trash items have been selected
			if (checkedItems.length == 0) {
				msg = $("#msg_error_no_trashitems_selected").html();
				AMA.page.standardDialogs.error(msg);
				return false;
			}

			function performAction() {
				// Show the Loading dialog 
				var msg = $("#msg_trash_loadingdialog").html();
				AMA.page.standardDialogs.loading(msg);

				// Perform the appropriate action on each checked trash items
				switch (action) {
					case "restore":
						// Send purge request
	                    AMA.models.trash.restore(checkedItems, function () {
		                    // On success, hide the loading dialog and refresh the trash model
		                    AMA.page.standardDialogs.hideloading();
		                    if (arguments[0]) {
		                    	AMA.models.contacts.invalidate();
		                    	isContactDeletedOrRestored=true;
		                    }
		                    if (arguments[1]) {
		                    	AMA.models.photos.invalidate();
		                    	isPhotoDeletedOrRestored=true;
		                    }
		                    if (arguments[2]) {
		                    	AMA.models.videos.invalidate();
		                    	isVideoDeletedOrRestored=true;
		                    }
		                    if (arguments[0] || arguments[1] || arguments[2]) {
		                    	AMA.models.trash.invalidate();
		                    }
	                   
		                    if(AMA.config.enableReporting) {
		    					// Log reporting event	for restore action performed dropdown
		    					if(action==="restore"){
		    						if(isVideoDeletedOrRestored===true)	{
		    								eventMsg['ActionPerformed'] = "Restore Videos - Action Performed Dropdown";
		    								AMA.debug("Reporting: logging event for video restored");
		    								AMA.ReportingManager.reportUserAction(AMA.config.reportingEventTypes.restorevideoactionperformed,eventMsg);
		    						}
		    						if(isContactDeletedOrRestored===true) {
		    							eventMsg['ActionPerformed'] = "Restore Contacts - Action Performed Dropdown";
		    							AMA.debug("Reporting: logging event for contact restored");
		    							AMA.ReportingManager.reportUserAction(AMA.config.reportingEventTypes.restorecontactactionperformed,eventMsg);
		    						}
		    						if(isPhotoDeletedOrRestored===true) {
		    							eventMsg['ActionPerformed'] = "Restore Images - Action Performed Dropdown";
		    							AMA.debug("Reporting: logging event for Image restored");
		    							AMA.ReportingManager.reportUserAction(AMA.config.reportingEventTypes.restoreimageactionperformed,eventMsg);
		    						}
		    					}
		                    }
	                    
	                    });
						break;
					case "purge":
						// Send purge request
						
						AMA.models.trash.setDropdownTrash(true);
	                    AMA.models.trash.trash(checkedItems, function () {
		                    // On success, hide the loading dialog and refresh the trash model
		                    AMA.page.standardDialogs.hideloading();
		                    if (arguments[0] || arguments[1] || arguments [2]) {
		                    	AMA.models.trash.invalidate();
		                    }
	                    });
						break;
				}
				
			}

			// Display confirmation dialog if RESTORE or PURGE, otherwise perform action immediately
			if (action === "restore") {
				msg = $("#msg_confirm_restore_trashitem" + (checkedItems.length > 1 ? "s" : "")).html();
				AMA.page.standardDialogs.confirm(msg, performAction);
			} else if (action === "purge") {
				msg = $("#msg_confirm_permadelete_trashitem" + (checkedItems.length > 1 ? "s" : "")).html();
				AMA.page.standardDialogs.confirm(msg, performAction);
			} else {
				performAction();
			}
		},
		
		_setupEvents: function () {
			TrashView.__super__._setupEvents.apply(this);
			var o = this;
			this.$el.find(".close_trash_details").on("click", function() { o.toggleSlideCanvas(); });
		},		
		
        toggleSlideCanvas: function() {        	
        	var o = this;
        	
        	this.$el.find(".row-offcanvas").toggleClass("active", function() {
        		if($(window).width() < 768) {
            		if(!$(this).hasClass("active")) {
            			$("body").scrollTop($(".rt_rowindicated", this).offset().top);
            		} else {
            			$("body").scrollTop(o.$el.offset().top);
            		}        			
        		}
        	});        	
        }
	});
})();

/*! TrashListView */
(function () {

	AMA.namespace("view");

	/**
	 * List view implementation for Trash.
	 *
	 * @class TrashedListView
	 * @namespace view
	 * @extends AMA.view.ListView
	 * @constructor
	 */
	var TrashedListView = AMA.view.TrashedListView = AMA.view.ListView.extend();


	/**
	 * defines the template ID which corresponds to the 'id' property of the template
	 * <script> used by this class.
	 *
	 * @property TEMPLATE_ID
	 * @type string
	 * @static
	 * @final
	 */
	TrashedListView.TEMPLATE_ID = "trash_list_template";


	/**
	 * Applicable only to view classes that fetch the aggregated templates for
	 * itself and its child views, this property defines the name of the
	 * template file to load. The path is defined in AMA.config.templatePath.
	 *
	 * @property TEMPLATE_SRC
	 * @type string
	 * @static
	 * @final
	 */
	TrashedListView.TEMPLATE_SRC = "";


	var maxNameDisplayLength = 35;

	AMA.augment(TrashedListView.prototype, {
		initialize: function () {
			TrashedListView.__super__.initialize.apply(this, arguments);
			
			var o = this;
			if (!this.listItemEmptyTemplate) {
                this.listItemEmptyTemplate = $("#list_empty_template").html();
            }
			
	    	this.data.on(AMA.model.BaseData.EVENT.LOADED, function() {
				if(this._isTrashedContactsLoaded && this._isTrashedPhotosLoaded && this._isTrashedVideosLoaded) {
		    		if(!o._dataset.length) {
						o.$el.html(_.template(o.listItemEmptyTemplate));						
					}					
				}
            });
		},
		
		/**
		 * renders this view.
		 *
		 * @override
		 * @method render
		 */
		render: function () {			
			TrashedListView.__super__.render.apply(this, arguments);
			this.$el.closest(".row-offcanvas").removeClass("active");

			AMA.debug(this._dataset.length + " items rendered in contact list view.");
		},

		_processData: function (item, index) {
			var maxNameLength = maxNameDisplayLength;
			
			TrashedListView.__super__._processData.call(this, item, index);

			item.typeClass = this._getTypeClass(item);
			item.fullNameTitle = this._getDisplayName(item);
	        item.fullName = AMA.Util.escapeSpecialCharacters(AMA.Util.truncateString(item.fullNameTitle, maxNameLength));
			
			return item;
		},
		
		_getTypeClass: function (item) {
			if (typeof item.fullName != "undefined") return "contactRecordOff";
			else if (item.fileType && item.fileType.indexOf("image") > -1) return "imageRecordOff";
			else if (item.fileType && item.fileType.indexOf("video") > -1) return "videoRecordOff";
		},

		_getDisplayName: function (item) {
			return item.fullName ||
						this._computeFullName(item) ||
						item.companyName ||
						item.email ||
						item.fileName ||
						"";
		},

		_computeFullName: function (item) {
			var firstName = item.firstName,
				middleName = item.middleName,
				lastName = item.lastName;

			if (firstName || middleName || lastName) {
				return firstName + (firstName && middleName ? " " : "") + middleName +
						((firstName || middleName) && lastName ? " " : "") + lastName;
			}
		},
		
        _setupEvents: function() {
        	AMA.view.TrashedListView.__super__._setupEvents.call(this, arguments);        	

        	var o = this;
            this.$el.find("." + AMA.view.TrashedListView.CSS.ITEM).on("click", function(e) {
                e.preventDefault();
                o.parent.toggleSlideCanvas();
            });

        },		

	});

})();

/*! TrashDetailsView */
(function () {

	AMA.namespace("view");

	/**
	 * Renders Photo Details View, this view is a Switcher
	 *
	 * @class TrashDetailsView
	 * @namespace view
	 * @extends AMA.view.BaseView
	 * @constructor
	 */
	var TrashDetailsView = AMA.view.TrashDetailsView = AMA.view.BaseView.extend();
	//AMA.augment(TrashDetailsView.prototype, AMA.view.Switcher);


	/**
	 * defines the template ID which corresponds to the 'id' property of the template
	 * <script> used by this class.
	 *
	 * @property TEMPLATE_ID
	 * @type string
	 * @static
	 * @final
	 */
	TrashDetailsView.TEMPLATE_ID = "trash_details_template";


	/**
	 * Applicable only to view classes that fetch the aggregated templates for
	 * itself and its child views, this property defines the name of the
	 * template file to load. The path is defined in AMA.config.templatePath.
	 *
	 * @property TEMPLATE_SRC
	 * @type string
	 * @static
	 * @final
	 */
	TrashDetailsView.TEMPLATE_SRC = "";

	AMA.augment(TrashDetailsView.prototype, {

		/**
		 * Initializes Trash Details View
		 *
		 * @override
		 * @method initialize
		 * @param {object}
		 */
		initialize: function () {
			TrashDetailsView.__super__.initialize.apply(this, arguments);

			this.plug(AMA.view.plugin.Switcher);

			// override Switcher _afterRender() since we don't need to autoSelect first item every time this view is rendered
			this._afterRender = function (){};

			this._initEvents();
		},

		/**
		 * Renders Trash Details View, also initializes the Switcher's Contents
		 *
		 * @override
		 * @method render
		 */
		render: function () {
			TrashDetailsView.__super__.render.apply(this);

			// Create the sub-tabs
			this.detailsView = {};
			this.detailsView.contact = new AMA.view.ContactDetailsView({
				el: "#trash_details_contact",
				parent: this,
				hidden: true,
				dataClass: AMA.models.contacts.constructor,
				trash: true,
				listView: this.parent.trashList
			});
			this.detailsView.photo = new AMA.view.PhotoDetailsView({
				el: "#trash_details_image",
				parent: this,
				hidden: true,
				dataClass: AMA.models.photos.constructor,
				trash: true,
				listView: this.parent.trashList
			});
			this.detailsView.video = new AMA.view.VideoDetailsView({
				el: "#trash_details_video",
				parent: this,
				hidden: true,
				dataClass: AMA.models.videos.constructor,
				trash: true,
				listView: this.parent.trashList
			});

			if (this.parent.trashList) {
				if (this.parent.trashList._items && this.parent.trashList._items.length > 0) {
					this.parent.trashList._selectItem(this.parent.trashList._items[0]);
				} 
			}
		},

		_initEvents: function() {
			var o = this;

	    	if (this.parent.trashList) {
		    	this.parent.trashList.on(AMA.view.ListView.EVENT.ITEM_SELECTED, function (model) {
		    		if (!model || !o.detailsView) {
		    			return;
		    		}
		    		
		    		o.$el.children().hide();
		    		
		    		if (typeof model.attributes.fullName != "undefined") {
						o.detailsView.contact.setData(model);
						o.switchTo(o.detailsView.contact);
					} else if (model.attributes.fileType && model.attributes.fileType.indexOf("image") > -1) {
						o.detailsView.photo.setData(model);
						o.switchTo(o.detailsView.photo);
					} else if (model.attributes.fileType && model.attributes.fileType.indexOf("video") > -1) {
						o.detailsView.video.setData(model);
						o.switchTo(o.detailsView.video);
					}
		    	});
	    	} else {
	    		AMA.warn("This instance of ContactDetailsView is not linked to a contacts list. Data switching will not apply.");
	    	}
	    	
	    	this.parent.trashList.data.on(AMA.model.BaseData.EVENT.LOADED, function() {
	    		if(this._isTrashedContactsLoaded && this._isTrashedPhotosLoaded && this._isTrashedVideosLoaded && !o.parent.trashList._dataset.length) {
	    			o.$el.find(".list_details_empty").show().siblings().hide();
	    		}	    		
            });
		},

		_setupEvents: function () {
			TrashDetailsView.__super__._setupEvents.apply(this);
		}		
	});
})();


/* LessIsMoreDialog */
(function () {

    AMA.namespace("view");

    var LessIsMoreDialog = AMA.view.LessIsMoreDialog = AMA.view.Dialog.extend();

    LessIsMoreDialog.TEMPLATE_ID = "lessismoredialog_template";
    LessIsMoreDialog.TEMPLATE_SRC = "";

    AMA.augment(LessIsMoreDialog.prototype, {
        _setupEvents: function () {
            var o = this;
            
            // Handler for clicking "Close" button
            this.$el.find("div.close").on("click", function () {
                o.hide();
            });
            
            // Handler for "Restore Instructions" link
            this.$el.find("a.restore_instructions").on("click", function () {
                // Hide this dialog and show Transfer Data Wizard
                o.hide();
                AMA.page.header.toolbar.toolsets.transferData.transferDataWizard.show();
            });
        }
    });
})();
/*! LocationTabView */
(function () {

    AMA.namespace("view");

    /**
	 * Location Tab View
	 *
	 * @class LocationTab
	 * @namespace view
	 * @extends AMA.view.BaseView
	 * @constructor
	 */
    var LocationTab = AMA.view.LocationTab = AMA.view.BaseView.extend();


    /**
	 * ID of the template
	 *
	 * @property TEMPLATE_ID
	 * @type string
	 * @static
	 * @final
	 */
    LocationTab.TEMPLATE_ID = "location_tab_template";


    /**
	 * Applicable only to view classes that fetch the aggregated templates for
	 * itself and its child views, this property defines the name of the
	 * template file to load. The path is defined in AMA.config.templatePath.
	 *
	 * @property TEMPLATE_SRC
	 * @type string
	 * @static
	 * @final
	 */
    LocationTab.TEMPLATE_SRC = "location.tpl";


    /**
	 * Define toolsets that will appear in the locate tab toolbar.
	 *
	 * @property TOOLBAR
	 * @type object
	 * @static
	 * @final
	 */
    LocationTab.TOOLBAR = {
        DEFAULT : [
            "endpoint",
            "locate",
            "alarm",
            "lock",
            "wipe"
        ],

        /* remove securephone since it will be remove in iphone */
        IPHONE : [
            "endpoint",
            "locate",
            "securePhone"
        ]
    };


    AMA.augment(LocationTab.prototype, {

        events: {
            "click #location_setting": "editLocationSettings",
            "click #tip_link" : "showTips"
        },

    	/**
    	 * Renders Location Tab view
    	 *
    	 * @override
    	 * @method render
    	 */
        render: function () {
        	LocationTab.__super__.render.apply(this);
        	
        	// Initialize location history and location map views
        	this.locationHistory = new AMA.view.LocationHistoryListView({
        		el: "#location_history",
				parent: this,
				data: AMA.models.locations
			});
        	this.locationMap = new AMA.view.LocationMapView({
        		el: "#map_container",
				parent: this,
				dataClass: AMA.models.locations.constructor
			});
        	this.locationSummary = new AMA.view.LocationsSettingsSummaryView({
			    el: "#locations_settings_summary_placeholder",
			    data: AMA.models.locatesettings, //AMA.models.syncsettings,//
			    parent: this
			});
      
            this.TipsToRecover = new AMA.view.TipsToRecover({	            	
                el: "#tipstorecover",
                parent: this
            });	  
			
	
			if (!AMA.config.enableMrTimeTracking)	{
				AMA.debug("Reporting: Start MR time spent timer as user is on Location Tab");
				
				AMA.config.enableMrTimeTracking = true;
				AMA.ReportingManager.reportPortalTimeSpent("MR", "Start");
			}
			
        },

        _setupEvents: function () {
            LocationTab.__super__._setupEvents.apply(this, arguments);
            this.$el.on('click', "#toggleMapLandscape", function(){
                $("html, body").animate({ scrollTop: $(document).height()-$(window).height() });
            })
        },
        
        showTips: function() {
			this.TipsToRecover.show();
		},
        editLocationSettings: function(){
            AMA.page.openSettings("location");
        }
    });
})();
/*! LocationHistoryListView */
(function () {

	AMA.namespace("view");


	/**
	 * This view shows the Location History List
	 *
	 * @class LocationHistoryListView
	 * @namespace view
	 * @extends AMA.view.ListView
	 * @constructor
	 */
	var LocationHistoryListView = AMA.view.LocationHistoryListView = AMA.view.ListView.extend();


	/**
	 * ID of the template
	 *
	 * @property TEMPLATE_ID
	 * @type string
	 * @static
	 * @final
	 */
	LocationHistoryListView.TEMPLATE_ID = "location_history_item_template";


	/**
	 * Applicable only to view classes that fetch the aggregated templates for
	 * itself and its child views, this property defines the name of the
	 * template file to load. The path is defined in AMA.config.templatePath.
	 *
	 * @property TEMPLATE_SRC
	 * @type string
	 * @static
	 * @final
	 */
	LocationHistoryListView.TEMPLATE_SRC = "";


	/**
	 * Defines CSS classes
	 *
	 * @property CSS
	 * @type object
	 * @static
	 * @final
	 */
	LocationHistoryListView.CSS = {
			ITEM: "item",
			ITEM_STYLE: ["rt_rowlighter", "rt_rowdarker"],   // alternating row styles
			SELECTED_ITEM: "selected"
	};

	/**
	 * Defines Event names
	 *
	 * @property EVENT
	 * @type object
	 * @static
	 * @final
	 */
	LocationHistoryListView.EVENT = AMA.enums(
			"ADDRESS_RETRIEVED"
	);


	AMA.augment(LocationHistoryListView.prototype, {

		/**
		 * defines EVENTS.
		 *
		 * @override
		 * @property events
		 */
		events: {
            "click #clear_location_history a.link_text": "clearLocationHistory",
            "click .address a.link_text": "locate",
            "click  #button_locate_history_normal": "locate"
        },
        
        /**
         * Temporary variable to hold the last recorded location while locating
         */
        lastRecordedLocation: null,

		/**
		 * Initializes Location History List View.
		 *
		 * @override
		 * @method initialize
		 * @param {object}
		 */
		initialize: function () {
			LocationHistoryListView.__super__.initialize.apply(this, arguments);
			
			this.responsiveListContainer = $("#location-menu-tab-sm-full .menu");
            if (!this.lastlocationSubmenuTemplate) {
                this.lastlocationSubmenuTemplate = $("#last_location_submenu_item_template").html();
            }
            if (!this.previouslocationSubmenuTemplate) {
                this.previouslocationSubmenuTemplate = $("#previous_location_submenu_item_template").html();
            }			

			var o = this;
			this.bind(LocationHistoryListView.EVENT.ADDRESS_RETRIEVED, function(model) {
				o.$el.find("[uid=" + model.get("id") + "] .address").html(model.get("address"));
				o.responsiveListContainer.find("[uid=" + model.get("id") + "] .address").html(model.get("address"));
			});

			this.bind(AMA.view.ListView.EVENT.LIST_EMPTIED, function() {
				var data = {
						id: 0,
						elId: "location_history_0",
						elStyle: "",
						timeLocated: "",
						accuracy: ""
				};
				o.$el.find("#location_last").html(_.template(o.template, data));
				o.$el.find("#location_history_1_to_4").html("");
				o.$el.find("#location_previous").toggle(this.data.models.length > 1);
				o.$el.find("#clear_location_history").hide();
				
				o.responsiveListContainer.html(_.template(o.lastlocationSubmenuTemplate, data));
			});

			var ActionManager = AMA.ActionManager,
	    		BaseWorkflow = AMA.workflow.BaseWorkflow,
	    		LocateWorkflow = AMA.workflow.LocateWorkflow,
                SecureWorkflow = AMA.workflow.SecurePhoneWorkflow,
                workflowLocate = ActionManager.getWorkflow("locate"),
                workflowSecure = false;
            if( AMA.models.capabilities.canRead("deviceSecurePhoneAction") ) {
                workflowSecure = ActionManager.getWorkflow("secure");
            }
	    	if (workflowLocate) {
                workflowLocate.on(BaseWorkflow.EVENT.STATE_CHANGED, function (event) {
	            	switch (event.state) {
	            		case LocateWorkflow.STATE.CONNECTING:
                            o.toggleStateDisplay("connecting");
                            o.selectLocationSubmenuItem();
	                        break;
	            		case LocateWorkflow.STATE.REFINING:
                            o.toggleStateDisplay("refining");
	            			break;
	            		case BaseWorkflow.STATE.FINALIZING:
	            			o.toggleStateDisplay((workflowLocate._result == AMA.workflow.BaseWorkflow.RESULT.FAILED) ? "fail" : "success");
 	            			break;	            			
	            		default:
	            	}
	            	AMA.debug("Location History List View is now transitioning to '" + workflowLocate.getStateName(event.state) + "' state");
	            }, this);
                
				workflowLocate.on(BaseWorkflow.EVENT.FINISHED, function (event) {
					switch (event.result) {
						case BaseWorkflow.RESULT.CANCELLED:
							o.toggleStateDisplay("cancelled");
							break;
					}
				}, this);                
	    	}
            if (workflowSecure) {
                workflowSecure.on(BaseWorkflow.EVENT.STATE_CHANGED, function (event) {
	            	switch (event.state) {
	            		case SecureWorkflow.STATE.CONNECTING:
	            			o.selectLocationSubmenuItem();
                            o.toggleStateDisplay("connecting");
	                        break;
	            		case SecureWorkflow.STATE.REFINING:
                            o.toggleStateDisplay("refining");
	            			break;
	            		case BaseWorkflow.STATE.FINALIZING:
                            o.toggleStateDisplay("default");
	            			break;
	            		default:
                            o.toggleStateDisplay("default");
	            	}
	            	AMA.debug("Location History List View is now transitioning to '" + workflowSecure.getStateName(event.state) + "' state");
	            }, this);
	    	}
            
            // Hide the appropriate "Location Settings" items in the Location History List View
            if(!AMA.models.capabilities.canRead("eventSettings")) {
            	o.$el.siblings(".location_settings").children().hide();
            } else if(AMA.models.capabilities.canUpdate("eventSettings")) {
            	o.$el.siblings(".location_settings").children(".link:not(:has(.Edit_Location_Settings))").hide();            	
            } else if (AMA.models.capabilities.canRead("eventSettings") && !AMA.models.capabilities.canUpdate("eventSettings")) {
            	o.$el.siblings(".location_settings").children(".link:not(:has(.View_Location_Settings))").hide();
            }
		},

		_setupEvents: function () {
			AMA.debug("List view " + this.options.el + " is initializing onclick handler for each item");

			var o = this;
			// Initialize the click handler for each item
			if (this.data && this.data.models.length > 0) {
				this.$el.find("." + o._css.ITEM).on("click", function () {
                    if(!$(this).closest(".location_refining").size() && !$(this).closest(".location_connecting").size()) {
                        AMA.debug("User clicked item #" + $(this).attr("id") + " on list view " + o.options.el);
                        o._selectItem(this);
                    }
				});
				
				$("#location-menu-tab-sm-full li").on("click", function() {
					if(o.data.models.length > 0) {
						var itemUid = $(this).attr("uid");
						o.selectLocationSubmenuItem(itemUid);					
						o._selectItem(o.$el.find("[uid=" + itemUid + "] ." + o._css.ITEM)[0]);						
					}					
				});
			}
			
			$("#submenu-locate-refresh").on("click", function() {
				o.locate(); 
			});
		},
        toggleStateDisplay: function (state) {
            var toggleClass = {
				"connecting": ".location_connecting",
				"refining"  : ".location_refining",
				"default"   : ".default",
				"success"   : ".default",
				"fail"   : ".default",
				"cancelled" : ".default"
			};
            this.$el.find(toggleClass[state]).show().siblings(".location_history").hide();
            $("#location-toggle-submenu").removeClass("connecting refining").addClass(state);
            switch(state) {
                case "connecting":
                    AMA.debug("Location History List View is now transitioning to 'connecting' state");
                    break;
                case "refining":
                    AMA.debug("Location History List View is now transitioning to 'refining' state");
                    break;
                case "fail":
                	AMA.debug("Location History List View is now transitioning to 'failing' state");
                	this._selectItem();
                    break;
                case "success":
                	AMA.debug("Location History List View is now transitioning to 'success' state");
                    break;
                case "cancelled":
                	AMA.debug("Location History List View is now transitioning to 'cancelled' state");
                	this.$el.find(".location_history").hide();
                	this.$el.find('.default').show();
                    break;
                default:

                }

        },

		/**
		 * Renders Location History List View
		 *
		 * @override
		 * @method render
		 */
		render: function () {
			var content = "",
				submenuContent = "";
				firstLoc = null,
				oldLocation = false;					

			// Apply the filters on the data
			this._applyFilters();
			AMA.debug(this.options.el + " has a final dataset of " + this._dataset.length + " items");

			this.data.prepareLocations();
			this.data.clearDuplicateLocations();			
			this.responsiveListContainer.empty();

			if (this.data.length > 0) {
				var items = this.data.toJSON();
				
				for (var i = 0; i < this.data.numberOfPoints; i++) {
					var location = items[i];
					if (location) {
						processedData = this._processData(location, i);
						templatedContent = _.template(this.template, processedData);						
						content += templatedContent;
						submenuContent = templatedContent;
						submenuContent = submenuContent.replace("id", "class");
						
						if (i == 0) {
							this.$el.find("#location_last").html(content);
							this.responsiveListContainer.append(_.template(this.lastlocationSubmenuTemplate, processedData));
							content = "";
						} else {
							this.responsiveListContainer.append(_.template(this.previouslocationSubmenuTemplate, processedData));
						}
					}
				}
			} else {
				this.$el.find("#location_last").html("");
				this.responsiveListContainer.empty();
			}

			this.$el.find("#location_history_1_to_4").html(content);
			
			this.$el.find("#location_previous").toggle(this.data.models.length > 1);
			this.$el.find("#clear_location_history").show();

			// Get a handle of the items' DOM elements
			this._items = this.$el.find(".default ." + this._css.ITEM);
			AMA.debug(this.options.el + " has rendered " + this._items.length + " items");
			
			firstLoc = (this.data.models.length > 0) ? this.data.models[0] : null,
			oldLocation = (firstLoc && this.lastRecordedLocation && firstLoc.attributes.eventTime <= this.lastRecordedLocation.attributes.eventTime) ? true : false;
			if (oldLocation === true) {
				AMA.debug("Exiting render of location history. Not updated location.");
				return;
			}

			this.lastRecordedLocation = firstLoc;
			AMA.debug("Saving the last recorded location", this.lastRecordedLocation);	

			if (this._items.length > 0) {
				// Reselect previously selected item if it is still in the list,
				// i.e. an item with the same 'uid' attrib exists in the list view,
				// otherwise select the first item by default
				var match = this.selectedItem && this.$el.find("[uid='" + $(this.selectedItem).attr("uid") + "']") || [],
					stillInList = match.length > 0;
				this._selectItem(stillInList ? match[0] : this._items[0]);

				AMA.debug("Previously selected item is still in list: " + stillInList);
			} else {
				// Since list is empty, trigger a "list emptied" event
				this.trigger(AMA.view.ListView.EVENT.LIST_EMPTIED);
				AMA.debug(this.options.el + " has triggered a 'list emptied' event.");

				// Make sure that item selection is cleared
				this._selectItem();
			}
		},

		/**
		 * Clears all the location histories.
		 *
		 * @method clearLocationHistory
		 */
		clearLocationHistory: function () {
			var o = this;
			var msg = $("#msg_confirm_clear_location_history").html();
			AMA.page.standardDialogs.confirm(msg, function () {
				// Hide Confirm Delete dialog
				//AMA.page.standardDialogs.confirmDialog.hide();
                msg = msg || $("#msg_confirm_clear_location_history").html();
				// Show Loading dialog
				var msg = o.$el.find(".msg_loadingdialog").html();
				AMA.page.standardDialogs.loading(msg);

				o.data.sync("delete", o.data, {
                    parse: function() {},
                    success: function() {
                        // Hide Loading dialog Only after Fetch!
                        o.data.fetch();
                        AMA.page.standardDialogs.hideloading();

                    },
                    error: function() {
                        // Hide Loading dialog Only after Fetch!
                        o.data.fetch();
                        AMA.page.standardDialogs.hideloading();

                    }
                });
				setTimeout(function () {
				}, 500);
			});
		},

		/**
		 * Starts the Locate functionality
		 *
		 * @method locate
		 */
		locate: function () {
			AMA.ActionManager.start("locate");
		},

		_afterRender: function () {
			for (var i = 0; i < this.data.numberOfPoints; i++) {
				var location = this.data.models[i];

				if (!location.get("address")) {
					var geocodeRequest = "https://dev.virtualearth.net/REST/v1/Locations/" + location.get("coordinates");

					var params = {
							output: "json",
							key: AMA.config.getBingMapsKey()
					};

					var o = this;
					var afterRetrieveAddress = function(index, response, status, xhr) {
						var model = this.data.models[index];
						if (response &&
					         	response.resourceSets &&
					          	response.resourceSets.length > 0 &&
					          	response.resourceSets[0].resources &&
					          	response.resourceSets[0].resources.length > 0) {
							var address = o._getAddress(response.resourceSets[0].resources[0]);
							model.set("address", address, {silent:true});
							this.trigger(LocationHistoryListView.EVENT.ADDRESS_RETRIEVED, model);
						} else {
							AMA.debug("Bing was unable to find an address for location: " + model.get("coordinates"));
							AMA.ReportingManager.remoteLog("Bing was unable to find an address for location: " + model.get("coordinates"),
								AMA.config.JsonConstants.LOGLEVEL_STATES.AUDIT);

						}
					};
					$.getJSON(geocodeRequest + "?jsonp=?", params, _.bind(afterRetrieveAddress, this, i));
				}
			}
		},

		_selectItem: function (el) {
			var $selectedItem,
				uid;

			// Unselect any previously selected item
			if (this.selectedItem) {
				$(this.selectedItem).parent().removeClass(this._css.SELECTED_ITEM);
				this.responsiveListContainer.find("li").removeClass("selected");
			}

			// Set the new selected item
			this.selectedItem = el;

			if (this.selectedItem) {
				$selectedItem = $(this.selectedItem);
				$selectedItem.parent().addClass(this._css.SELECTED_ITEM);				
				AMA.debug("Item #" + $selectedItem.parent().attr("id") + " has been selected on list view " + this.options.el);

				// The 'uid' attribute of the item's DOM element is mapped
				// to the unique 'id' property of the data item
				uid = $selectedItem.parent().attr("uid");
				this.selectLocationSubmenuItem(uid);
				
				// Fire an "item selected" event so that other views can
				// respond as necessary, e.g. the contact details view
				this.trigger(AMA.view.ListView.EVENT.ITEM_SELECTED, this.data.get(uid));
				AMA.debug(this.options.el + " has triggered an 'item selected' event with uid=" + uid);

			} else {
				// Fire a "selection cleared" event
				this.trigger(AMA.view.ListView.EVENT.SELECTION_CLEARED);
				this.selectLocationSubmenuItem();
				AMA.debug("There is no selected item on list view " + this.options.el +
							"; a 'selection cleared' event has been triggered");
			}

		},

		_processData: function (item, index) {
			item.elId = "location_history_" + index;
			item.elStyle = "";
			item.address = item.address || "";
			item.timeLocated = this._locationFormat(item.time, item.eventTimeTo);

			switch(AMA.config.accuracyUnit) {
				case "meters":
					item.accuracy = Math.floor(item.accuracy);
					break;
				case "yards":
					item.accuracy = Math.floor(AMA.Util.metersToYards(item.accuracy));
					break;
				case "miles":
					item.accuracy = Math.floor(item.accuracy);
					break;
				default:
					item.accuracy = Math.floor(item.accuracy);
					break;
			}
		    return item;
		},

		_locationFormat: function(gmtTime, gmtTimeRange) {
			if(gmtTime != null && gmtTime != "") {
				var date = new Date(gmtTime);
				if(gmtTimeRange != null) {
					var dateRange = new Date(gmtTimeRange);
					//if start and end times are the same day then just need a time range
					if(date.getDate() == dateRange.getDate()) {
						//if start and end time have the same hour and minutes then NO need for a range
						if(date.getHours() == dateRange.getHours() && date.getMinutes() == dateRange.getMinutes()) {
							//No range
							return (AMA.Util.isIPhone() === true) ? $.timeago(date) : AMA.Util.formatDateAndTime(date, AMA.config.dateAndTimeFormat);
						}
					}
					//Date range
					return (AMA.Util.isIPhone() === true) ? $.timeago(dateRange) : ( AMA.Util.formatDateAndTime(date, AMA.config.dateAndTimeFormat) + " - " + AMA.Util.formatDateAndTime(dateRange, AMA.config.dateAndTimeFormat));
				}
				//No range
				return (AMA.Util.isIPhone() === true) ? $.timeago(date) : AMA.Util.formatDateAndTime(date, AMA.config.dateAndTimeFormat);
			}
		},

		_getAddress: function(bingResponse)
		{
			var address = "";
			address += bingResponse.address.locality != null ?  bingResponse.address.locality : "";
			address += bingResponse.address.adminDistrict != null ? (address != "" ? ", " : "") + bingResponse.address.adminDistrict + " ": "";
			address += bingResponse.address.postalCode != null ? (address != "" ? " " : "") + bingResponse.address.postalCode : "";

			AMA.debug("getAddress: " + address );
			return address;
	   	},
	   	
	   	selectLocationSubmenuItem: function(itemId) {
	   		this.responsiveListContainer.children().removeClass("selected");
	   		if(itemId) {
	   			this.responsiveListContainer.find("[uid="+ itemId +"]").addClass("selected")
	   		}
	   		itemId = itemId || 0;			
	   		var selectedItemLabel = this.responsiveListContainer.find("[uid="+ itemId +"] .submenuItemLabel").text();	   		
			$("#location-toggle-submenu .submenu-title").text(selectedItemLabel);
	   	}

	});

})();

/*! LocationMapView */
(function () {

    AMA.namespace("view");

    /**
     * This view displays the Map
     *
     * @class LocationMapView
     * @namespace view
     * @extends AMA.view.BaseView
     * @constructor
     */
    var LocationMapView = AMA.view.LocationMapView = AMA.view.BaseView.extend();


    /**
     * ID of the template
     *
     * @property TEMPLATE_ID
     * @type string
     * @static
     * @final
     */
    LocationMapView.TEMPLATE_ID = "location_map_template";


    /**
     * Applicable only to view classes that fetch the aggregated templates for
     * itself and its child views, this property defines the name of the
     * template file to load. The path is defined in AMA.config.templatePath.
     *
     * @property TEMPLATE_SRC
     * @type string
     * @static
     * @final
     */
    LocationMapView.TEMPLATE_SRC = "";

    /**
     * Default Map configs
     *
     * @property MAP_CONFIG
     * @type object
     * @final
     */
    var MAP_CONFIG = {
        defaultZoom: 3,
        markerZIndex: 1000
    };

    var CLOSE_INFOBOX_EL_CLASS = "close_infobox";

    /**
     * Defines Event Names
     *
     * @property EVENT
     * @type object
     * @final
     */
    LocationMapView.EVENT = AMA.enums(
        "MAP_INITIALIZED"
    );
    LocationMapView.CurrentState = null;

    AMA.augment(LocationMapView.prototype, {

    	events: {
            "click .cancel_locate": "cancelLocation"
        },
        /**
         * Initializes Location Map View.
         *
         * @override
         * @method initialize
         * @param {object}
         */
        initialize: function (options) {
            LocationMapView.__super__.initialize.apply(this, arguments);

            /*
            if(AMA.Util.isIPhone()) {
                $(".cancel_locate").show(); 
            } else {
                $(".cancel_locate").hide(); 
            }
            */

            this.options.viewOnly = options && options.viewOnly || false;
            this.options.mapWidth = options && options.mapWidth || AMA.config.locationPaneRWDMap.width;
            this.options.mapHeight = options && options.mapHeight || AMA.config.locationPaneMap.height;
            
            this.lastMapWidth = this.options.mapWidth;
            this.lastMapHeight = this.options.mapHeight;
            
            this.CurrentState = null;
            if (!this.options.viewOnly) {
                var o = this;

                this.parent.locationHistory.on(AMA.view.LocationHistoryListView.EVENT.ADDRESS_RETRIEVED, function(model) {
                    o.reset();
                    if (o.data.get(model.id)) {
                        // address retrieved is for the location currently displayed by MapView
                        o._doRender();
                    }
                });

                this.parent.locationHistory.bind(AMA.view.ListView.EVENT.LIST_EMPTIED, function() {
                    o.reset();
                    o.setData();
                });

                this.parent.locationHistory.on(AMA.view.ListView.EVENT.ITEM_SELECTED, function(model, index) {
                    o.status="";
                    o.setData(model);
                });
                
                this.parent.on(AMA.view.BaseView.EVENT.SHOWN, function() {
                    o._resizeMap();
                });

                var ActionManager = AMA.ActionManager,
                    BaseWorkflow = AMA.workflow.BaseWorkflow,
                    LocateWorkflow = AMA.workflow.LocateWorkflow,
                    SecureWorkflow = AMA.workflow.SecurePhoneWorkflow,
                    workflowLocate = ActionManager.getWorkflow("locate"),
                    workflowSecure = false;
                if( AMA.models.capabilities.canRead("deviceSecurePhoneAction") ) {
                    workflowSecure = ActionManager.getWorkflow("secure");
                }


                if(workflowSecure) {
                    workflowSecure.on(BaseWorkflow.EVENT.STATE_CHANGED, function (event) {
                        switch (event.state) {
                            case BaseWorkflow.STATE.INITIALIZING:
                                break;
                            case SecureWorkflow.STATE.CONNECTING:
                                LocationMapView.CurrentState = SecureWorkflow.STATE.CONNECTING;
                                o.toggleState("connecting");
                                o.$el.find("#location_progress_note .time_remaining").hide();
                                o.$el.find("#location_progress_note .time_remaining .countdown").html("03:00");
                                break;
                            case SecureWorkflow.STATE.REFINING:
                                LocationMapView.CurrentState = SecureWorkflow.STATE.REFINING;

                                AMA.debug("Contacts successfully erased; proceeding to next action");
                                o.toggleState("refining");
                                break;
                            case BaseWorkflow.STATE.FINALIZING:
                                LocationMapView.CurrentState = BaseWorkflow.STATE.FINALIZING;
                                o.toggleState("default");
                                /**
                                 * TODO: Check fail or success
                                 */
                                break;
                            default:
                                o.toggleState("default");
                        }

                    });
                }
                if (workflowLocate) {
                    workflowLocate.on(BaseWorkflow.EVENT.STATE_CHANGED, function (event) {
                        switch (event.state) {
                            case LocateWorkflow.STATE.CONNECTING:
                                o.toggleState("connecting");
                                break;
                            case LocateWorkflow.STATE.REFINING:
                                o.toggleState("refining");
                                break;
                            case BaseWorkflow.STATE.FINALIZING:
                            	o.status = (AMA.ActionManager.getWorkflow("locate")._result == AMA.workflow.BaseWorkflow.RESULT.FAILED) ? "fail" : "success";
                                o.toggleState(o.status);                                
                                break;
                            default:
                        }
                        LocationMapView.CurrentState = event.state;
                        AMA.debug("Location Map View is now transitioning to '" + workflowLocate.getStateName(event.state) + "' state");                        
                    }, this);

                    workflowLocate.on(BaseWorkflow.EVENT.COUNTDOWN_TICK, function (event) {
                        o.$el.find("#location_progress_note .time_remaining").show();
                        o.$el.find("#location_progress_note .time_remaining .countdown").html(event.remaining);
                        o.infoboxLayer.clear();
                    }, this);
                    
                    workflowLocate.on(BaseWorkflow.EVENT.FINISHED, function(event) {
                	    switch (event.result) {
                	        case BaseWorkflow.RESULT.SUCCESSFUL:
                	            break;
                	        case BaseWorkflow.RESULT.FAILED:
                	            break;
                	        case BaseWorkflow.RESULT.CANCELLED:
                	            o.$el.find("#message").hide();
                	            o.$el.find("#location_progress_note .time_remaining .countdown").html("03:00");
                	            break;
                	    }
                	    AMA.debug("Location Map View finished with result of '" + workflowLocate.getResultName(event.result) + "'");
                	}, this); 
                    
                    if (ActionManager) {
                        ActionManager.on(ActionManager.EVENT.ACTION_STARTED, function(response) {
                            if (response.action === 'locate') {
                                o.infoboxLayer.clear();
                            }
                        });   
                    }                    
                }

            }
        },

        /**
         * Renders Location Map View
         *
         * @override
         * @method render
         */
        render: function () {
            if (this.pendingRender) {
                // do nothing, rendering is currently deferred.
                return;
            }

            if (!this.mapInitialized) {
                if (!this.pendingRender) {
                    // Map is not yet initialized, then
                    // set this flag to true, so subsequent call to render won't render anything
                    this.pendingRender = true;

                    var o = this;
                    this.once(LocationMapView.EVENT.MAP_INITIALIZED, function () {
                        o.pendingRender = false;
                        o.render();
                    });
                    var data = (this.data && this.data.length > 0) ? this.data.toJSON()[0] : {},
                        content = "";

                    // Generate the content from template + data
                    content = _.template(this.template, this._processData(data));

                    // Attach the content to the container element
                    this.$el.html(content);
                    this._initMap();
                }

                return;
            }

            if (!this.locationHistory) {
                this.locationHistory = {};
            }

            if (this.data && this.data.length > 0) {
                this.$el.find("#bing_map_dialog").hide();
                this.$el.find("#message").hide();
                this.$el.find("#location_failed_note").hide();

                var locModel = this.data.models[0],
                    infoBoxVisibility = true;

                if (!this.locationHistory[locModel.id]) {
                    this._prepareLocationData(locModel);
                }

                var locationData = this.locationHistory[locModel.id];

                this.pushpinLayer.clear();
                this.infoboxLayer.clear();
                this.pushpinLayer.push(locationData["marker"]);
                this.infoboxLayer.push(locationData["infobox"]);

                locationData["marker"].setOptions({visible:true});
                // check if refining for both secure phone || locate phone;
                switch(LocationMapView.CurrentState) {
                	case AMA.workflow.LocateWorkflow.STATE.CONNECTING:                	
                    case AMA.workflow.LocateWorkflow.STATE.REFINING:
                        infoBoxVisibility = false;
                        $('#accuracyinfoid').remove();
                        $('.cancel_locate').hide();                        
                        break;
                    case AMA.workflow.SecurePhoneWorkflow.STATE.CONNECTING:    
                    case AMA.workflow.SecurePhoneWorkflow.STATE.REFINING:
                        infoBoxVisibility = false;
                        $('#accuracyinfoid').remove();                        
                        break;
                    default:
                        break;
                }

                locationData["infobox"].setOptions({visible:infoBoxVisibility});

                this.$el.find("." + CLOSE_INFOBOX_EL_CLASS).on("click", function() {
                    locationData["infobox"].setOptions({visible:false});
                });

                this.mapObject.setView({ bounds: Microsoft.Maps.LocationRect.fromLocations(locationData["points"]) });
                this.mapObject.setView({ zoom: this._getZoomBasedOnAccuracy(locModel.get("accuracy")) });

                // remove the marker first before redraw it
                this.$el.find('#accuracyinfoid').remove();
                // creating pushpin
                var pushpinLoc = new Microsoft.Maps.Location(locModel.get('latitude'), locModel.get('longitude'));
                var pushpinContent = "<div id='accuracyinfoid' class='markerline accuracyInfo'> -- " + this._getAccuracy(locModel.get("accuracy")) + ' ' + AMA.config.accuracyUnit + " -- </div>";
                var pushpin = new Microsoft.Maps.Pushpin(pushpinLoc, {htmlContent: pushpinContent, zIndex: 1000, visible: true});

                this.mapObject.entities.push(pushpin);

                // invoke all after setup map events
                this._afterSetupMap.apply(this);


            } else {
                this._defaultMapView();
        		this.$el.find("#location_failed_note").hide();
        		if(this.$el.attr("id")!="dashboard_map") {
            		if (this.status === 'fail') {
            			this.$el.find("#bing_map_dialog").hide();
                        this.$el.find("#location_failed_note").show();
                    } else {
                    	this.$el.find("#bing_map_dialog").show();
                        this.$el.find("#message").show();    
                    }
        		}
            }
        	if(this.data && this.data.length > 0 && this.status=="fail"){        		
        		if(this.$el.attr("id")!="dashboard_map")
    				{
	        			this._defaultMapView();
	            		this.$el.find("#location_failed_note").show();
	            		this.$el.find("#bing_map_dialog").hide();
	            		this.$el.find("#message").hide();
    				}
        	}

            /*
        	if(AMA.Util.isIPhone()) {
                $(".cancel_locate").show(); 
            } else {
                $(".cancel_locate").hide(); 
            }
            */
        },


        /**
         * Reset the cache location data
         *
         * @method reset
         */
        reset: function() {
            this.locationHistory = {};
        },

        refresh: function() {
            if(this.options.viewOnly) {
                if (AMA.ActionManager.getWorkflow("locate")._state === AMA.workflow.LocateWorkflow.STATE.REFINING ||
                    AMA.ActionManager.getWorkflow("locate")._state ===  AMA.workflow.LocateWorkflow.STATE.CONNECTING) {
                    return;
                }
            }
            LocationMapView.__super__.refresh.apply(this);

        },

        /**
         * put the Map View to the default US MAp coordinates
         *
         * @method _defaultMapView
         */
        _defaultMapView: function () {
            // remove the accuracy info
            this.$el.find('#accuracyinfoid').remove();
            this.pushpinLayer.clear();
            this.infoboxLayer.clear();
            this.mapObject.setView({zoom: MAP_CONFIG.defaultZoom});
            this.mapObject.setView({bounds: Microsoft.Maps.LocationRect.fromLocations(new Microsoft.Maps.Location(AMA.config.defaultMapCoordinates.lat, AMA.config.defaultMapCoordinates.lon))
            });
        },
        toggleState: function(state) {
            switch(state) {
                case "connecting":
                    this._defaultMapView();
                    this.$el.find("#message").hide();
					AMA.Util.switchLabel(".location_progress_text", ".locating", this.$el);
                    this.$el.find("#location_progress_note").show();
                    //this.$el.find("#location_progress_note .accuracy").addClass("hidden");
                    this.$el.find("#location_progress_note .time_remaining").removeClass("hidden");
                    this.$el.find("#location_failed_note").hide();
                    this.$el.find("#location_progress_note .cancel_locate").show();
                    
                    break;
                case "refining":
                    /**
                     * make sure DATA is loaded!
                     */
                    var accuracy = this.data.toJSON()[0].accuracy || "0";
					AMA.Util.switchLabel(".location_progress_text", ".refining", this.$el);
                    this.$el.find("#location_progress_note .time_remaining").addClass("hidden");
                    /*
                    this.$el.find("#location_progress_note .accuracy").text(
                        this.$el.find("#location_progress_note .accuracy").text().replace('?', accuracy)
                    ).removeClass("hidden");
                    */
                    this.$el.find("#location_progress_note .cancel_locate").hide();

                    break;
                case "fail":
                    this._defaultMapView();
                    this.$el.find("#location_progress_note").hide();
                    this.$el.find("#location_failed_note").show();
                    this.$el.find("#message").hide();

                    break;
                case "success":
                    this.$el.find("#location_progress_note").hide();
                    this._doRender();
                    this.render();

                    break;
                default :
                    this.$el.find("#location_progress_note").hide();
                    this._doRender();
                    this.render();
                    
                    break;
            }
        },

        _prepareLocationData: function (model) {
            var id = model.id;
            if (!this.locationHistory[id]) {
                this.locationHistory[id] = {};
            }
            var currentLatLong = model.get("coordinates");
            this.locationHistory[id]["latLongObject"] = new Microsoft.Maps.Location(currentLatLong.split(",")[0], currentLatLong.split(",")[1]);

            var index = -1;
            // loop through all location models to determine the index of the selected location
            for(var i = 0; i < AMA.models.locations.models.length; i++) {
                var model = AMA.models.locations.models[i];
                if (id == model.id) {
                    index = i;
                    break;
                }
            }

            // add location history marker
            var accuracyCircle = this._createAccuracyCircle(
                this.locationHistory[id]["latLongObject"],
                model.get("address"),
                this._locationFormat(model.get("time")),
                model.get("accuracy"),
                index+1,
                true
            );
            this.locationHistory[id]["marker"] = accuracyCircle.polygon;
            this.locationHistory[id]["points"] = accuracyCircle.points;
            this.locationHistory[id]["infobox"] = accuracyCircle.infobox;
        },

        _setupEvents: function () {
            var o=this;
            Backbone.globalEvent.on("onLocate",function(e){
                o.status=e.status;
                o.render();
            });
        },
        
        _onPageResize: function() {
        	this._resizeMap();        	
        },

        /**
         * all actions needed after map setup should be here
         */
        _afterSetupMap: function() {
            // refresh location
            $('#refresh_loc_map').off('click').on('click', function(e) {
                e.stopPropagation();
                e.preventDefault();
                AMA.ActionManager.start("locate"); 
                return false;
            });
            
            this._resizeMap();
        },

        _initMap: function () {
            try {
                // An object to describe our map when we initially load it.
                // NOTE!  Width and height are necessary for IE6.
                var mapOptions = {
                    credentials: AMA.config.getBingMapsKey(),
                    center: new Microsoft.Maps.Location(AMA.config.defaultMapCoordinates.lat, AMA.config.defaultMapCoordinates.lon),
                    mapTypeId: Microsoft.Maps.MapTypeId[AMA.config.defaultMapType],
                    zoom: MAP_CONFIG.defaultZoom,
                    showScalebar: false,
                    enableClickableLogo: false,
                    enableSearchLogo: false,
                    width:this.options.mapWidth,
                    height:this.options.mapHeight
                };
                if (this.options.viewOnly) {
                    _.extend(mapOptions, {
                        disableUserInput:true,
                        showDashboard:false
                    });
                }
                this.mapObject = new Microsoft.Maps.Map(this.$el.find("#bing_map")[0], mapOptions);
                
                Microsoft.Maps.Events.addHandler(this.mapObject, 'keydown',  function(e) {
					if (e.keyCode === 40 || e.keyCode ===  38) {
						e.handled = true;
					}});

                var o = this;
                // validate bing map api key
                this.mapObject.getCredentials(function(credentials) {
                    if(credentials === null) {
                        /*
                         * DON'T CHANGE THIS LOG STATEMENT UNLESS YOU WANT TO MESS UP REPORTING
                         */
                        AMA.ReportingManager.remoteLog("Bing was unable to validate our key [accountID:-" + AMA.config.accountDetails.accountId + "]" + 
							"[MDN:-" + AMA.config.accountDetails.accountMdn + "]",
							AMA.config.JsonConstants.LOGLEVEL_STATES.AUDIT);
							
                    } else {
                        // Set up the entity-collection layers
                        o.pushpinLayer = new Microsoft.Maps.EntityCollection({zIndex:MAP_CONFIG.markerZIndex++});
                        o.infoboxLayer = new Microsoft.Maps.EntityCollection({zIndex:MAP_CONFIG.markerZIndex++});
                        o.mapObject.entities.push(o.pushpinLayer);
                        if (!o.options.viewOnly) {
                            o.mapObject.entities.push(o.infoboxLayer);
                        }
                        o.mapInitialized = true;
                        o.trigger(LocationMapView.EVENT.MAP_INITIALIZED);
                    }
                });
                Microsoft.Maps.Events.addThrottledHandler(this.mapObject,"viewchangeend", this.followMouse,500);
            } catch(err) {
                //Dialog.Error.external(Strings.jsExternalServiceError.bingMapUnavailable + " Reason: drawMap: " + err.message);
                return;
            };
            
            this._resizeMap();
        },

        followMouse:function()
        {
            $("a").on("mouseout",function(e){
                $(".NavBar_modeSelectorControlContainer").find(".NavBar_itemContainer").each(function(index){
                    $(this).attr("href","javascript:");

                });

            });

        },

        _createAccuracyCircle: function(latLongObject, address, date, accuracy, index, showPopup) {
            var radius = accuracy;
            if(accuracy.indexOf(",") != -1) {
                radius = accuracy.substring(0, accuracy.indexOf(","));
            }

            if(radius < 10) {
                radius = 10;
            }

            var R = 6371; // R is the earth's radius in Km.
            var lat = (latLongObject.latitude*Math.PI)/180;
            var lon = (latLongObject.longitude*Math.PI)/180;
            var d = parseFloat(radius/1000)/R;
            var points = [];

            for (x = 0; x <= 360; x++) {
                var p2 = {};
                brng = x * Math.PI/180;
                p2.Latitude = Math.asin(Math.sin(lat) * Math.cos(d) + Math.cos(lat) * Math.sin(d) * Math.cos(brng));
                p2.Longitude = ((lon + Math.atan2(Math.sin(brng) * Math.sin(d) * Math.cos(lat), Math.cos(d) - Math.sin(lat) * Math.sin(p2.Latitude))) * 180) / Math.PI;
                p2.Latitude = (p2.Latitude * 180) / Math.PI;
                points.push(new Microsoft.Maps.Location(p2.Latitude, p2.Longitude));
            }

            try {
                var accuracyCircle = {};
                var polygonOptions = {
                    // Yes, transparency is first for colors..
                    fillColor: new Microsoft.Maps.Color(AMA.config.mapAccuracyCirleColor[1][3],
                        AMA.config.mapAccuracyCirleColor[1][0],
                        AMA.config.mapAccuracyCirleColor[1][1],
                        AMA.config.mapAccuracyCirleColor[1][2]),
                    strokeColor: new Microsoft.Maps.Color(AMA.config.mapAccuracyCirleColor[2][3],
                        AMA.config.mapAccuracyCirleColor[2][0],
                        AMA.config.mapAccuracyCirleColor[2][1],
                        AMA.config.mapAccuracyCirleColor[2][2]),
                    strokeThickness: 2,
                    visible: false
                };

                var polygon = new Microsoft.Maps.Polygon(points, polygonOptions);

                if(showPopup) {
                    //var markerBody = this._createMarkerBody(address, date, accuracy, index);
                    var markerBody = this._createInfoBox(index);

                    // Note:  Do not use the "title" or "description" attributes with "htmlContent"
                    // or the HTML will not display.
                    // "showCloseButton" does not seem to work with htmlContent so we have to create our own
                    // (in the markerBody).
                    var infoboxOptions = {
                        htmlContent:markerBody,
                        visible:false
                    };
                    var infobox = new Microsoft.Maps.Infobox(latLongObject, infoboxOptions);

                    // Add handlers to show/hide the infobox on hover
                    // Show the infobox on polygon hover
                    //var arrayIndex = index-1;
                    //Microsoft.Maps.Events.addHandler(polygon, 'mouseover', function(e){LocationPane.locationHistory.all[arrayIndex]["infobox"].setOptions({visible:true});});
                    accuracyCircle["infobox"] = infobox;
                }

                accuracyCircle["polygon"] = polygon;
                accuracyCircle["points"] = points;
                accuracyCircle["infobox"] = infobox;
                return accuracyCircle;
            }
            catch(err)
            {
                //Dialog.Error.external(Strings.jsExternalServiceError.bingMapServiceError + " Reason: " + err.message);
                return null;
            }
        },

        _locationFormat: function(gmtTime) {
            if (gmtTime != null && gmtTime != '') {
                var date = new Date(gmtTime);
                return AMA.Util.formatDateAndTime(date, AMA.config.dateAndTimeFormat);
            }
        },

        _getAccuracy: function(accuracy) {
            switch(AMA.config.accuracyUnit) {
                case 'yards':
                    return Math.floor(AMA.Util.metersToYards(accuracy));
                    break;
                case 'meters':
                case 'miles':
                default:
                    return Math.floor(accuracy);
                    break;
            }
        },

        _createInfoBox: function(index) {
            if (!this.infoboxTemplate) {
                this.infoboxTemplate = $("#location_map_infobox_template").html();
            }

            // clone location model
            var item = this.data.toJSON()[0];

			item.index = index - 1;
			item.locatedClass = "";
			item.historyClass = "show";

			if(index == 1) {
				item.locatedClass = "show";
				item.historyClass = "";
			}

            item.timeLocated = this._locationFormat(item.eventTime);
            if (!item.address) {
                item.address = "";
            }
            item.infoboxElClass = CLOSE_INFOBOX_EL_CLASS;

            item.accuracy = this._getAccuracy(item.accuracy);

            return _.template(this.infoboxTemplate, item);
        },

        cancelLocation: function(e) {
            e.stopPropagation();
			var workflowLocate = AMA.ActionManager.getWorkflow("locate");
			workflowLocate.cancelLocate();
			this._defaultMapView();
    		this.$el.find("#location_failed_note").show();
    		this.$el.find("#bing_map_dialog").hide();
    		this.$el.find("#message").hide();
          	this.$el.find("#location_progress_note").hide();
        },

        _getZoomBasedOnAccuracy: function(accuracyStr) {
            //closer to farther

            var accuracy = parseInt(accuracyStr);
            
            if(accuracy < 20) { return 19; }
            else if(accuracy < 60) { return 18; }
            else if(accuracy < 120){ return 17; }
            else if(accuracy < 250){ return 16; }
            else if(accuracy < 500){ return 15; }
            else if(accuracy < 1000){ return 14; }
            else if(accuracy < 2000){ return 13; }
            else if(accuracy < 4000){ return 12; }
            else if(accuracy < 7000){ return 11; }
            else if(accuracy < 15000){ return 10; }
            else if(accuracy < 28000){ return 9; }
            else if(accuracy < 60000){ return 8; }
            else if(accuracy < 130000) { return 7; }
            else if(accuracy < 250000) { return 6; }
            else if(accuracy < 500000) { return 5; }
            else if(accuracy < 1000000) { return 4; }
            else { return 3; }
        },
        
        _resizeMap: function() {
            var bing = $("#bing_map"),
            bingContainer = $("#map_container"),
            bingParent = bingContainer.parent(),
            bingDialog = $("#bing_map_dialog"),
            recoverNote = $("#location_right .note"),
            locateToolsetHeight = $("#locate_toolset").outerHeight(),
            headerlinkPadding = parseInt($("#header_link").css("padding-top")),
            pageHeaderHeight = locateToolsetHeight + headerlinkPadding,
        	locationToggleHeight = parseInt($("#location-toggle-submenu").css("height")),
        	clientHeight = document.documentElement.clientHeight,
        	minMapHeight = parseInt(bingContainer.css("min-height")),
        	smallMapHeight = clientHeight - pageHeaderHeight - locationToggleHeight;
           
        	smallMapHeight = minMapHeight > smallMapHeight ? minMapHeight : smallMapHeight;
        	
        	if (!$("#page_content").hasClass("hidden")) { // Location Map View is refreshing while Settings Dialog is hidden
        		this.lastMapWidth = bingParent.width();
        		this.lastMapHeight = bingParent.height() - recoverNote.outerHeight();           		
        	}
        
            if($(window).width() > 767) { // breakpoint for medium to large devices 
                bing.width(this.lastMapWidth - ((parseInt(bing.css("border-width")))*2) )
                	.height(this.lastMapHeight - ((parseInt(bing.css("border-width")))*2) );
                
                bingDialog.width(this.lastMapWidth)
                	.height(this.lastMapHeight);
                
                bing.find(".MicrosoftMap").width(this.lastMapWidth)
                	.height(this.lastMapHeight);
                
                this.mapObject.setOptions({ width: this.lastMapWidth, height: this.lastMapHeight });                
            } else {
                bing.css({"width":"100%", "height":smallMapHeight +"px"});
                bingDialog.css({"width":"100%", "height":smallMapHeight +"px"});
                bing.find(".MicrosoftMap").css({"width":"100%", "height":smallMapHeight +"px"});
            }            
        }
    });
})();
/*! LocationSettingsSummaryView */
(function () {
    
    AMA.namespace("view");

    var LocationsSettingsSummaryView = AMA.view.LocationsSettingsSummaryView = AMA.view.BaseView.extend();

    LocationsSettingsSummaryView.TEMPLATE_ID = "location_settings_summary_template";
    LocationsSettingsSummaryView.TEMPLATE_SRC = "";

    AMA.augment(LocationsSettingsSummaryView.prototype, {
        _processData: function (item) {
        	
			item.isiOS = false;
            if(item.locationEnabled && AMA.models.endpoints.models[0].get("platform").indexOf("iOS") == -1){
            	item.isiOS = true;
			}
            
            return item;
        }
   
    });
})();
/*! BaseWorkflow */
(function () {
	
	AMA.namespace("workflow");
	
	var BaseWorkflow = AMA.workflow.BaseWorkflow = function (options) {
		this.options = options;

		// Invoke the standard initialize() method
		this.initialize();
	};
	
	// Standard workflow events
	BaseWorkflow.EVENT = AMA.enums(
			"STARTED",
			"STATE_CHANGED",
			"FINISHED",
			"COUNTDOWN_TICK",
			"TIMEOUT"
	);
	
	// Standard workflow states
	BaseWorkflow.STATE = AMA.enums(
			"INACTIVE",
			"INITIALIZING",
			"FINALIZING"
	);
	
	// Standard workflow results
	BaseWorkflow.RESULT = AMA.enums(
			"SUCCESSFUL",
			"FAILED",
			"TIMEDOUT",
			"CANCELLED"
	);
	
	// Take the 'extend' functionality from BackboneJS
	BaseWorkflow.extend = Backbone.History.extend;
	
	_.extend(BaseWorkflow.prototype, Backbone.Events, {
		initialize: function () {
			// Initialize state
			this._state = BaseWorkflow.STATE.INACTIVE;
			
			// This property is set by the ActionManager
			this._action = "";

            this._actionId = "";
            this._timeRemaining="00:00";
		},
		
		start: function (options) {
			// Check for ongoing activity
			if (this._state != BaseWorkflow.STATE.INACTIVE) {
				AMA.debug("'" + this._action + "' is being restarted");
				
				// Cancel the ongoing activity
				this.stop(BaseWorkflow.RESULT.CANCELLED);
			}
			
			AMA.ActionManager.stopRoutinePolling();
			
			this.options = options || {};
			
			AMA.debug("'" + this._action + "' has started");
			this.trigger(BaseWorkflow.EVENT.STARTED);
			var MRLite = "";
		    AMA.ReportingManager.remoteLog("Workflow Triggered [type:-" + this._action + "][accountID:-" + AMA.config.accountDetails.accountId + "]" +
				"[MDN:-" + AMA.config.accountDetails.accountMdn + "]" + MRLite,
				AMA.config.JsonConstants.LOGLEVEL_STATES.AUDIT);
				
            // Reset the timed-out flag
            this._timedOut = false;
			
			// The 'initializing' state is always the first state
			this.toState(BaseWorkflow.STATE.INITIALIZING);
		},
		
		/** 
		 * Changes the workflow state back to "inactive" and triggers a "finished" event
         *
         * @param {Object} status
         */
		stop: function (status) {
			// Set the state back to 'inactive'
			this.toState(BaseWorkflow.STATE.INACTIVE);

            // Cleanup any polling timer
            if (this._pollingTimer) {
                AMA.debug("Cancelling pending poll for '" + this._action + "'");
                clearTimeout(this._pollingTimer);
            }
			
			// Default status is 'successful'
			status = status || BaseWorkflow.RESULT.SUCCESSFUL;
			
			AMA.debug("'" + this._action + "' has finished with result '" + this.getResultName(status) + "'");

            this._afterFinish(status);
			
			this.trigger(BaseWorkflow.EVENT.FINISHED, {
				result: status
			});
			
			
			// <-- logging starts here
			   
			var dialogStatus = status == BaseWorkflow.RESULT.SUCCESSFUL ? "Successful" : "Failed";
			this._timeRemaining = status == BaseWorkflow.RESULT.TIMEDOUT ? 3 : this._timeRemaining;
			
			var otherDetails = "";
			
			if(status == BaseWorkflow.RESULT.FAILED) {
				otherDetails = "[details:-Failed]";
			}
			else if(status == BaseWorkflow.RESULT.TIMEDOUT) {
				otherDetails = "[details:-Timeout Failure]";
			}
			else if(status == BaseWorkflow.RESULT.CANCELLED){
				otherDetails = "[details:-Cancelled]";
			}
			
			// DON'T CHANGE THESE LOG STATEMENTS UNLESS YOU WANT TO MESS UP REPORTING
			AMA.ReportingManager.remoteLog("Workflow " + dialogStatus + " [type:-" + this._action + "][accountID:-" + AMA.config.accountDetails.accountId + "]" +
					"[MDN:-" + AMA.config.accountDetails.accountMdn + "][time remaining:-" + this._timeRemaining + "]" + otherDetails, 
					AMA.config.JsonConstants.LOGLEVEL_STATES.AUDIT);	

			AMA.ReportingManager.remoteLog("Action in device is done. [type:-" + this._action + "][accountID:-" + AMA.config.accountDetails.accountId + "]" +
					"[MDN:-" + AMA.config.accountDetails.accountMdn + "]",
					AMA.config.JsonConstants.LOGLEVEL_STATES.AUDIT);
					
			// logging ends here -->
			AMA.ActionManager.startRoutinePolling();
		},
		
		/**
         * Handles the workflow's state changes
         * 
         * @return {Object}: the current state of thw workflow
         */
		getState: function () {
			return this._state;
		},
		
		/**
         * Handles the workflow's state changes
         * 
         * @param {Object} state: The new state of the workflow
         */
		toState: function (state,data) {
			this._state = state;
			
			this.trigger(BaseWorkflow.EVENT.STATE_CHANGED, { state: state, data:data });
			AMA.debug("'" + this._action + "' changed state to '" + this.getStateName(state) + "'");
						
			// Call the polymorphic state-change handling
			this._onStateChange(state);
			
			// If this is the 'finalizing' state, we can stop the
			// workflow now, marking the action's completion
			if (state === BaseWorkflow.STATE.FINALIZING) {
				
				// By this time, the workflow should have set the this._result
				// flag according to the actual result of the action.
				// If not specified, the default result flag is 'successful'.
				var result = this._result || BaseWorkflow.RESULT.SUCCESSFUL;
				
				this.stop(result);
			}
		},
		
		// Here we perform operations depending on the new state,
		// including the decision tree for transition to the next
		// state. NOTE: Transition from 'finalizing' is NOT needed.
		// Implementation workflow classes should override this.
		_onStateChange: function (state) {
			// This abstract implementation simply jumps from
			// 'initializing' (the standard initial state) to
			// 'finalizing' (the standard final state)
			
			switch (state) {

				case BaseWorkflow.STATE.INITIALIZING:
					AMA.debug("'" + this._action + "' is initializing");
					this.toState(BaseWorkflow.STATE.FINALIZING);
					break;
				
				case BaseWorkflow.STATE.FINALIZING:
					AMA.debug("'" + this._action + "' is finalizing");
					break;
				
				default:
			}
		},
		
		getStateName: function (state) {
			var classLevel = this.constructor;

			while (true) {
				// Try to find the state in the class level's STATE enum
				if (classLevel.STATE) {
					for (var i in classLevel.STATE) {
						if (classLevel.STATE[i] === state) return i;
					}
				}
				
				// If we have reached the base class and still cannot
				// find the state name, just return the numeric value
				if (classLevel === BaseWorkflow)
					return state;
				
				// Attempt the superclass
				classLevel = classLevel.__super__.constructor;
			}
		},
		
		getResultName: function (result) {
			// Find the result in the BaseWorkflow.RESULT enum
			for (var i in BaseWorkflow.RESULT) {
				if (BaseWorkflow.RESULT[i] === result) return i;
			}
			
			// If result name is not found, just return the numeric value
			return result;
		},
		
		/**
		 * Starts the countdown timer for the workflow.
		 * 
		 * At every interval (one second), a 'countdown ticked' event is triggered
		 * so that views can listen to this and display the countdown accordingly.
		 * When the time remaining becomes zero, a 'timeout' event is triggered.
		 * 
		 * @method _startCountdown
		 * @protected
		 * @param {number} time The countdown duration in seconds
		 */
		_startCountdown: function (time) {
			AMA.debug("'" + this._action + "' has started a countdown for " + time + " seconds");
			
			this._countdownTimer = setInterval(_.bind(function () {
				var sec = time % 60,
					min = Math.floor(time / 60),
					timeRemaining;
				
				if (time === 0) {
					AMA.debug("'" + this._action + "' countdown timer has expired");
					
					this.trigger(BaseWorkflow.EVENT.TIMEOUT);
                    this._timedOut = true;

					clearInterval(this._countdownTimer);
					this.stop(BaseWorkflow.RESULT.TIMEDOUT);
					
					return;
				}
				
				timeRemaining = (min < 10 ? "0" : "") + min + ":" + (sec < 10 ? "0" : "") + sec;
				this.trigger(BaseWorkflow.EVENT.COUNTDOWN_TICK, { remaining: timeRemaining });
				
				time--;
			}, this), 1000);
		},
		
		_stopCountdown: function () {
			AMA.debug("'" + this._action + "' has stopped the countdown");
			
			clearInterval(this._countdownTimer);
		},

        _afterFinish: function () {

        }
	});

})();

/*! AlarmWorkflow */
(function () {
	AMA.namespace("workflow");
	
	var AlarmWorkflow = AMA.workflow.AlarmWorkflow = AMA.workflow.BaseWorkflow.extend();
	
	AlarmWorkflow.STATE = AMA.enums(
			"CONNECTING",
			"SOUNDING"
	);
	
	AlarmWorkflow.URL = "/actions";
	
	// Countdown duration while connecting to the server
	AlarmWorkflow.CONNECT_COUNTDOWN = 180;
	
	// Aliases
	var BaseWorkflow = AMA.workflow.BaseWorkflow;
	
	_.extend(AlarmWorkflow.prototype, {
	
		_onStateChange: function (state) {
			
			switch (state) {
				case BaseWorkflow.STATE.INITIALIZING:
					AMA.debug("'" + this._action + "' is initializing");
					this._doInitializing();
					break;
				
				case AlarmWorkflow.STATE.CONNECTING:
					AMA.debug("'" + this._action + "' is connecting");
					this._doConnecting();
					break;
					
				case AlarmWorkflow.STATE.SOUNDING:
					AMA.debug("'" + this._action + "' is sounding");
					break;
					
				case BaseWorkflow.STATE.FINALIZING:
					AMA.debug("'" + this._action + "' is finalizing");
					break;
				
				default:
			}
		},
		
		_doInitializing: function () {
			// manually do this for "sound again"
			this.trigger(BaseWorkflow.EVENT.COUNTDOWN_TICK, { remaining: "03:00" });
			
			this._startCountdown(AlarmWorkflow.CONNECT_COUNTDOWN - 1);
			
			this.toState(AlarmWorkflow.STATE.CONNECTING);
			
		},		
		
		_doConnecting: function () {			
			var options = {
					data: {
						actionType: "soundalert"
					},
					callback: _.bind(this._afterSendRequest, this)
				};
			
			this._sendRequest(options);
		},
		
		_sendRequest: function (options) {
		    var url = AMA.config.apiHostUrl + AlarmWorkflow.URL,
				params = {};
			
			var data = options && options.data && JSON.stringify(options.data) || null;

			AMA.debug("Sending a create action request to server for '" + options.data.actionType + "'");
			this._ajax(url, params, data, options && options.callback);
		},
		
		_ajax: function (url, params, data, callback) {
			
			var urlOption =  url + "?devId=" + AMA.config.devId + "&endpointId=" + AMA.config.endpointId + "&authToken=" + AMA.config.authToken;
			AMA.debug("Sending AJAX request: " + urlOption);

			var request = AMA.Util.createCORSRequest.call(this,
					"POST",
					urlOption
				);
			
			if (request) {
				request.onload = function () {
					var resp = typeof request.response === "undefined" ? request.responseText : request.response;
					callback(resp);
				};
				request.onerror = function (jqXHR, error, errorThrown) {
					AMA.ActionManager._onAjaxError(jqXHR, error, errorThrown);
				};
				
				request.send(data);
			}
			
		},
				
		_afterSendRequest: function (response) {
			AMA.debug("received connecting response: " + response);
			response = JSON.parse(response);
			if(typeof response.actionId != "undefined") {
				
				AMA.debug("connecting actionid:"+response.actionId);

                this._actionId = response.actionId;

                AMA.ReportingManager.reportMRAttempt("alarm", this._actionId);

				this._startPolling();
				
			}
			else {
				AMA.debug("connection was not successful");
			}
		},
		
		_startPolling: function() {
            // If a countdown has timed out, bypass polling
            if (this._timedOut) {
				AMA.ReportingManager.remoteLog("Alarm Failed.[Status Detail:-alarm=on][accountID:-" + AMA.config.accountDetails.accountId + "]" +
							"[MDN:-" + AMA.config.accountDetails.accountMdn + "]" ,
							AMA.config.JsonConstants.LOGLEVEL_STATES.AUDIT);
							
				return;
			}

			var o = this;
			var url = AMA.config.apiHostUrl + "/deviceEvents/" + this._actionId;
			var afterAjax = function (response) {
				response = JSON.parse(response);
				
				var list = response.list;
				if(response.total === 0) {
					o._pollingTimer = setTimeout(function() { pollScanResult(); }, 3000);
					return;
				}
				
				if(list[0].status === "success") {
					var status = list[0].statusDetails.split("=")[1];
					
					if(o.getState() === AlarmWorkflow.STATE.CONNECTING) {
						o._stopCountdown();
						
						// manually display time back to 3 minutes 
						o.trigger(BaseWorkflow.EVENT.COUNTDOWN_TICK, { remaining: "03:00" });
						
						// restart timer for sounding state
						o._startCountdown(AlarmWorkflow.CONNECT_COUNTDOWN - 1);
						o.toState(AlarmWorkflow.STATE.SOUNDING);
					}
					
					o.result = BaseWorkflow.RESULT.SUCCESSFUL;
					
					if(status === "on") {
						o._pollingTimer = setTimeout(function() { pollScanResult(); }, 3000);
					}
					else {
						AMA.ReportingManager.remoteLog("Alarm Successful.[Status Detail:-"+ list[0].statusDetails +"][accountID:-" + AMA.config.accountDetails.accountId + "]" +
							"[MDN:-" + AMA.config.accountDetails.accountMdn + "]" ,
							AMA.config.JsonConstants.LOGLEVEL_STATES.AUDIT);
				
						o._afterRetrieveStatus();
					}
				}
				else {
					o._pollingTimer = setTimeout(function() { pollScanResult(); }, 3000);
					AMA.debug(response.errorMessage);
				}
			};
			
			var urlOption =  url + "?devId=" + AMA.config.devId + "&endpointId=" + AMA.config.endpointId + "&authToken=" + AMA.config.authToken;
			
			var pollScanResult = function () {
				// for browsers that caches AJAX requests
				// var breakCacheUrl = urlOption + "&nocache=" + new Date().getTime();
				
				var request = AMA.Util.createCORSRequest.call(this,
						"GET",
						urlOption
					);
				
				if (request) {
					request.onload = function () {
						var resp = typeof request.response === "undefined" ? request.responseText : request.response;
						afterAjax(resp);
					};
					request.onerror = function (jqXHR, error, errorThrown) {
						AMA.ActionManager._onAjaxError(jqXHR, error, errorThrown);
					};
					
					request.send();
				}
				
			};

			pollScanResult();
		},
		
		_afterRetrieveStatus: function () {
			AMA.debug("_afterRetrieveStatus");
			
			this._stopCountdown();
			
			AMA.debug("Received ACK for '" + this._action + "'");
			
			this.toState(BaseWorkflow.STATE.FINALIZING);

		},

        _afterFinish: function (status) {
            var details = {};
            if (status === BaseWorkflow.RESULT.SUCCESSFUL) {
                details = {
                    SuccessFailureFlag: "S",
                    FailureCode: "N/A"
                }
            } else {
                details = {
                    SuccessFailureFlag: "F",
                    FailureCode: "N/A"
                }
            }

            AMA.ReportingManager.reportMRResult("alarm", this._actionId, details);
        },
		
		_startCountdown: function (time) {
			AMA.debug("'" + this._action + "' has started a countdown for " + time + " seconds");
			
			this._countdownTimer = setInterval(_.bind(function () {
				var sec = time % 60,
					min = Math.floor(time / 60),
					timeRemaining;
				
				if (time === 0) {
					if(this.getState() === AlarmWorkflow.STATE.SOUNDING) {
						this._afterRetrieveStatus();
					}	
					else {
						AMA.debug("'" + this._action + "' countdown timer has expired");
						
						this.trigger(BaseWorkflow.EVENT.TIMEOUT);
						
						this._timedOut = true;
						
						this.stop(BaseWorkflow.RESULT.TIMEDOUT);
					}
					
					clearInterval(this._countdownTimer);
					return;
				}
				
				timeRemaining = (min < 10 ? "0" : "") + min + ":" + (sec < 10 ? "0" : "") + sec;
				this.trigger(BaseWorkflow.EVENT.COUNTDOWN_TICK, { remaining: timeRemaining });
				
				time--;
			}, this), 1000);
		}
	
	});
	
})();

/*! LocateWorkflow */
(function () {

	AMA.namespace("workflow");

	/**
	 * Implementation of the whole Locate Workflow.
	 *
	 * There Are 4 states for this workflow:
	 * 1. Initializing
	 * 2. Connecting
	 * 3. Refining
	 * 4. Finalizing
	 *
	 * @class LocateWorkflow
	 * @namespace workflow
	 * @extends AMA.workflow.BaseWorkflow
	 * @constructor
	 */
	var LocateWorkflow = AMA.workflow.LocateWorkflow = AMA.workflow.BaseWorkflow.extend();


	/**
	 * Additional States needed for this workflow
	 *
	 * @property STATE
	 * @type enum
	 * @static
	 * @final
	 */
	LocateWorkflow.STATE = AMA.enums(
			"CONNECTING",
			"REFINING",
			"CANCELLED"
	);
    LocateWorkflow.URL = "/actions";
	//
	/**
	 * Countdown duration while connecting to the server
	 *
	 * @property CONNECT_COUNTDOWN
	 * @type numric
	 * @static
	 * @final
	 */
	LocateWorkflow.CONNECT_COUNTDOWN = 180;
	
    /**
     * Flag for timeout call to server, false if not doing a call, true if in progress
     */
     LocateWorkflow.ISTIMEOUTCALL = false;	

	// Aliases
	var BaseWorkflow = AMA.workflow.BaseWorkflow;

	_.extend(LocateWorkflow.prototype, {

		_onStateChange: function (state) {

			// This abstract implementation simply jumps from
			// 'initializing' (the standard initial state) to
			// 'finalizing' (the standard final state)

			switch (state) {
				case BaseWorkflow.STATE.INITIALIZING:
					AMA.debug("'" + this._action + "' is initializing");
					this._doInitializing();
					break;

				case LocateWorkflow.STATE.CONNECTING:
					AMA.debug("'" + this._action + "' is connecting");
					this._doConnecting();
					break;

				case LocateWorkflow.STATE.REFINING:
					AMA.debug("'" + this._action + "' is refining");
					break;

				case BaseWorkflow.STATE.FINALIZING:
					AMA.debug("'" + this._action + "' is finalizing");
					this._doFinalizing();
					break;
					
				default:
			}
		},


		// TODO: Maybe this should be standardized in BaseWorkflow ?
		_doInitializing: function () {
			this._result = BaseWorkflow.RESULT.FAILED;
			var o = this,
                options = {
                    data: {
                        actionType: "gpsrefresh"
                    },
                    callback: _.bind(this._afterRESTRequest, this)
                };

			this.reportExecuted=false;
			this.on(BaseWorkflow.EVENT.TIMEOUT, this._onTimeout);

			// Start the countdown timer
			this._startCountdown(LocateWorkflow.CONNECT_COUNTDOWN);

            this.sendRequest(options);

		},


		_doConnecting: function () {
            // If a countdown has timed out, bypass polling
            if (this._timedOut) {
				// logging
				AMA.ReportingManager.remoteLog("Locate Failed.[Status Detail:-failure]" + 
					"[accountID:-" + AMA.config.accountDetails.accountId + "]" + 
					"[MDN:-" + AMA.config.accountDetails.accountId + "]" ,
					AMA.config.JsonConstants.LOGLEVEL_STATES.AUDIT);
					
				return;
			}
            this.breadCrumbShown=false;
            if (AMA.models.locations.models.length >= 1) {

        		this.breadCrumbShown=true;
        	}
            var actionId = this.actionId,
                    url = AMA.config.apiHostUrl + "/locateDeviceEvents/" + actionId,
                    o = this,
                    afterAjax = function (response) {
                        if (!o.isPolling) return;
                        if (response.list.length) {
                            o._result = BaseWorkflow.RESULT.SUCCESSFUL;
                            if (o.getState() !== LocateWorkflow.STATE.REFINING && o.getState() !== BaseWorkflow.STATE.INACTIVE) {
                                o._doRefining();
                            } else if (o.getState() === LocateWorkflow.STATE.REFINING) {
                            	var lastAccuracy = parseFloat(AMA.models.locations.models[0].get("accuracy"));
                            	var newAccuracy = parseFloat(response.list[0].precision);
                            	if (lastAccuracy > newAccuracy) {
                            		o._doRefining();
                            	}
                            }
                            if (response.list[0].status === "success" && !AMA.Util.isIPhone()) {
								// logging
								AMA.ReportingManager.remoteLog("Locate Sucessful.[Status Detail:-"+ response.list[0].statusDetails || response.list[0].status  + "]" + 
									"[accountID:-" + AMA.config.accountDetails.accountId + "]" + 
									"[MDN:-" + AMA.config.accountDetails.accountId + "]" ,
									AMA.config.JsonConstants.LOGLEVEL_STATES.AUDIT);	
								
                                o.toState(BaseWorkflow.STATE.FINALIZING);
                                o._stopCountdown();
                            } else if (response.list[0].status === "failure" && AMA.Util.isIPhone()) {
								// logging
								AMA.ReportingManager.remoteLog("Locate Failed.[Status Detail:-"+ response.list[0].statusDetails || response.list[0].status  + "]" + 
									"[accountID:-" + AMA.config.accountDetails.accountId + "]" + 
									"[MDN:-" + AMA.config.accountDetails.accountId + "]" ,
									AMA.config.JsonConstants.LOGLEVEL_STATES.AUDIT);
								
                                o._result = BaseWorkflow.RESULT.FAILED;
                                o.toState(BaseWorkflow.STATE.FINALIZING);
                                o._stopCountdown();
                            }
                        }
                        if (o.getState() === LocateWorkflow.STATE.CONNECTING || o.getState() === LocateWorkflow.STATE.REFINING) {
                            o._pollingTimer = setTimeout(function() {
                                pollScanResult();
                            }, 4000);
                        }
                    },
                    options = {
                        cache: false,
                        url: url + "?devId=" + AMA.config.devId + "&endpointId=" + AMA.config.endpointId + "&authToken=" + AMA.config.authToken,
                        // error: _.bind(this._onAjaxError, this),
                        success: _.bind(afterAjax, this)
                    },
                    pollScanResult = function () {
                        if (AMA.Util.useXdr()){
                        	var request = AMA.Util.createCORSRequest("GET", options.url);
                        	
                        	if (request){
                        		request.onload = function () {
                        			try {
                        				var response = JSON.parse(this.responseText);
                        			}
                        			catch (e) {
                        				AMA.error("GET /locateDeviceEvents - Locate Workflow - response not JSON: " + this.responseText);
                        			};
                        			
                        			if (response){
                        				afterAjax(response);
                        			}
                        		};
                        		
                        		request.onerror = function () {
                        			AMA.error("Request failed: GET /locateDeviceEvents");
                        		};
                        		
                        		request.send();
                        	}
                        }
                        else {
                        	$.ajax(options);
                        }
                    };
            this.isPolling = true;
            pollScanResult();
		},

        sendRequest: function(options) {
            var url = AMA.config.apiHostUrl + LocateWorkflow.URL,
                    params = {};

            var data = options && options.data && JSON.stringify(options.data) || null;

            this._ajax(url, params, data, options && options.callback);

        },
        
		cancelLocate: function() {
			this.stop(BaseWorkflow.RESULT.CANCELLED);
		},        

        _afterRESTRequest: function(resp) {
            AMA.debug("received connecting response: " + JSON.stringify(resp));
            if(typeof resp.actionId != "undefined") {
                this.actionId = resp.actionId;

                AMA.ReportingManager.reportMRAttempt("locate", this.actionId);

                this.toState(LocateWorkflow.STATE.CONNECTING);
            }
            else {
                AMA.debug("connection was not successful");
            }
        },

        _ajax: function (url, params, data, callback) {
            var afterAjax = function (response) {
                if (callback) callback(response);
            };

            var options = {
                type: "POST",
                cache: false,
                url: url + "?devId=" + AMA.config.devId + "&endpointId=" + AMA.config.endpointId + "&authToken=" + AMA.config.authToken,
                data: data,
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                global: false,
                //error: _.bind(this._onAjaxError, this),
                success: _.bind(afterAjax, this)
            };

            AMA.debug("Sending AJAX request: " + options.url);

			if (AMA.Util.useXdr()){
				var request = AMA.Util.createCORSRequest(options.type, options.url);
				
				if (request) {
					request.onload = function (){
						try {
							var response = JSON.parse(this.responseText);
						}
						catch (e) {
							AMA.error(options.type + " " + url  + " - Locate Workflow - response not JSON: " + this.responseText);
						}
						
						if (response){
							afterAjax(response);
						}
					};
					
					request.onerror = function (){
						AMA.error("Request failed: " + options.type + " " + url);
					};
					
					request.send(data);
				}
			}
			else {
				$.ajax(options);
			}
        },

		_startPolling: function () {

		},

		_afterRetrieveStatus: function (response) {
			/*
			//commented out for now, we won't check again status record.
    		var statusFields = AMA.config.legacyRecordTypes.STATUS.fields,
    		status = _.find(response, function (item) {
    			// Find the latest 'gpsrefresh' status record
    			return item.dt[statusFields.type] === "gpsrefresh";
    		}),
    		statusTime = status.dt[statusFields.time];

    		// Check if the latest 'gpsrefresh' status is newer than the action trigger time.
    		// For newer device App, since they are now sending status every time a new location is available
    		if (statusTime > this._triggerTime) {
    			AMA.debug("Received a status update for '" + this._action + "'");

    			// Save the finish time for this action
    			this._finishTime = statusTime;

    			// Save result flag
    			this._result = (status.dt[statusFields.subject] === "success") ?
    					BaseWorkflow.RESULT.SUCCESSFUL : BaseWorkflow.RESULT.FAILED;
    		} else {
    			AMA.debug(this._action + "' must have new location ready, try reseting the location collection");

    			this._result = BaseWorkflow.RESULT.SUCCESSFUL;
    		}
			*/
		},


		_doRefining: function () {
            var lastLocationTime = 0,
                o = this;
            if (AMA.models.locations.models && AMA.models.locations.models.length > 0) {
                var location = AMA.models.locations.models[0];
                // remember the last location's timestamp
                lastLocationTime = location.get("time");
                AMA.debug("AMA.workflow.LocationWorkflow - About to retrieve new locations, save the current latest one first.")
            }

            AMA.models.locations.fetch({
                reset:true,
                silent: true,
                success: function(collection, resp) {
                        collection.trigger("reset");
                    if(o.getState() == LocateWorkflow.STATE.CONNECTING) {
                        o.toState(LocateWorkflow.STATE.REFINING);
                    }
                },
                error: function() {
                AMA.debug("AMA.workflow.LocationWorkflow - Location f");
                }
            });
		},
        _doFinalizing: function() {
            if(this._result === BaseWorkflow.RESULT.SUCCESSFUL) {
                AMA.models.locations.fetch();
            }
        },


        _afterFinish: function (status) {
            var details = {};
            details.wasBreadCrumbShown = (this.breadCrumbShown) ? "1" : "0";
            
            switch (status) {
				case BaseWorkflow.RESULT.SUCCESSFUL:
				    if(AMA.models.locations.isFetching) {
				        AMA.models.locations.once("reset", function() {
				            details.SuccessFailureFlag="S";
				            details.FailureCode="N/A";
				            details.AccuracyofFixShown=AMA.models.locations.at(0).get("accuracy");
				            AMA.ReportingManager.reportMRResult("locate", this.actionId, details);
				        })
				    }
				    break;
				case BaseWorkflow.RESULT.CANCELLED:
				    // cancel flow here
				    this._stopCountdown();
				    // AMA.ActionManager.addToHistory("locate", {serverAction: "gpsrefresh", actionStatus: "cancelled"});
				    // AMA.ActionManager.stopPolling("locate");
				    // should i still trigger toState? if Yes, what state?				    
				    Backbone.globalEvent.trigger("onLocate",{status:"cancelled"});
				    this.toState(BaseWorkflow.STATE.FINALIZING);
				    break;
				default:
				    if(this.reportExecuted==false){
				        details.SuccessFailureFlag= "F";
				        details.FailureCode="N/A";
				        details.BreadcrumbAccuracy="N/A";
				        details.BreadcrumbTimestamp="N/A";
				        AMA.ReportingManager.reportMRResult("locate", this.actionId, details);
				    }
					this.reportExecuted=true;
					break;
            }
        },

        // _stopLocationConsolidation: function() {
            // var url = AMA.config.legacyApiBaseUrl + "/account.poo",
            // params = {
                // method : "stopLocationConsolidation",
                // endpointid: AMA.currentEndpoint
            // };

            // AMA.ActionManager._ajax(url, params, null, null);
        // }
        
        _onTimeout: function(evt) {
            /*var actionStatus = "failed";
            if (this._result === BaseWorkflow.RESULT.SUCCESSFUL) {
                actionStatus = "success";
            }*/
            // AMA.ActionManager.addToHistory(this._action, {serverAction: "gpsrefresh", actionStatus: actionStatus});

            // new implementation: when timeout reached we need to notify the server
            if (LocateWorkflow.ISTIMEOUTCALL === false && (this._result === BaseWorkflow.EVENT.TIMEOUT || this._result === BaseWorkflow.RESULT.FAILED)) {
                var callbackTimeout = function(response) {
                        LocateWorkflow.ISTIMEOUTCALL = false;
                        AMA.debug("Locate successfully send a timeout call with actionId of " + response.actionId);
                    },
                    url = AMA.config.apiHostUrl + LocateWorkflow.URL,
                    options = {
                            data: {
                                actionType: "gpsrefreshTimeout",
                                actionId: this.actionId
                            },
                            callback: _.bind(callbackTimeout, this)
                        };
                var data = options && options.data && JSON.stringify(options.data) || null;
                this._ajax(url, {}, data, options && options.callback);
                LocateWorkflow.ISTIMEOUTCALL = true
                this.toState(BaseWorkflow.STATE.FINALIZING);
            } else if (this._result === BaseWorkflow.RESULT.SUCCESSFUL) {
                //AMA.ActionManager.addToHistory(this._action, {serverAction: "gpsrefresh", actionStatus: "success"});
                this.toState(BaseWorkflow.STATE.FINALIZING);
            }            

            
        }        

	});

})();

/*! LockWorkflow */
(function () {

	AMA.namespace("workflow");
	
	var LockWorkflow = AMA.workflow.LockWorkflow = AMA.workflow.BaseWorkflow.extend();
	
	LockWorkflow.STATE = AMA.enums(
			"CONNECTING"
	);
	
	LockWorkflow.URL = "/actions";
	
	// Countdown duration while connecting to the server
	LockWorkflow.CONNECT_COUNTDOWN = 180;
	
	// Aliases
	var BaseWorkflow = AMA.workflow.BaseWorkflow;
	
	_.extend(LockWorkflow.prototype, {

		_onStateChange: function (state) {
			switch (state) {
				case BaseWorkflow.STATE.INITIALIZING:
					AMA.debug("'" + this._action + "' is initializing");
					this._doInitializing();
					break;
				
				case LockWorkflow.STATE.CONNECTING:
					AMA.debug("'" + this._action + "' is connecting");
					this._doConnecting();
					break;
					
				case BaseWorkflow.STATE.FINALIZING:
					AMA.debug("'" + this._action + "' is finalizing");
					break;
				
				default:
			}
		},
		
		
		_doInitializing: function () {
			// failed by default
			this._result = BaseWorkflow.RESULT.FAILED;
			
			// manually do this for "try again"
			this.trigger(BaseWorkflow.EVENT.COUNTDOWN_TICK, { remaining: "03:00" });
			
			this._startCountdown(LockWorkflow.CONNECT_COUNTDOWN);
			
			this.toState(LockWorkflow.STATE.CONNECTING);
		},	
		
		_doConnecting: function () {
			var options = {
					data: {
						actionType: "lock"
					},
					callback: _.bind(this._afterSendRequest, this)
				};
			
			this._sendRequest(options);
		},
		
		
		_sendRequest: function (options) {
		    var url = AMA.config.apiHostUrl + LockWorkflow.URL,
				params = {};
			
			var data = options && options.data && JSON.stringify(options.data) || null;
			
			AMA.debug("Sending a 'NEW action' request to server for '" + options.data.actionType + "'");
			this._ajax(url, params, data, options && options.callback);
		},
		
		_ajax: function (url, params, data, callback) {
							
			var urlOption =  url + "?devId=" + AMA.config.devId + "&endpointId=" + AMA.config.endpointId + "&authToken=" + AMA.config.authToken;			
			AMA.debug("Sending AJAX request: " + urlOption);

			var request = AMA.Util.createCORSRequest.call(this,
					"POST",
					urlOption
				);
			
			if (request) {
				request.onload = function () {
					var resp = typeof request.response === "undefined" ? request.responseText : request.response;
					callback(resp);
				};
				request.onerror = function (jqXHR, error, errorThrown) {
					AMA.ActionManager._onAjaxError(jqXHR, error, errorThrown);
				};
				
				request.send(data);
			}
		},
		
		
		_afterSendRequest: function (response) {
			AMA.debug("received connecting response: " + response);
			response = JSON.parse(response);
			if(typeof response.actionId != "undefined") {
				AMA.debug("connecting actionid:"+response.actionId);

                this._actionId = response.actionId;

                AMA.ReportingManager.reportMRAttempt("lock", this._actionId);

                this._startPolling(this._actionId);
			}
			else {
				AMA.debug("connection was not successful");
			}
		
		},
		
		_startPolling: function(actionId) {
            // If a countdown has timed out, bypass polling
            if (this._timedOut) {
				// logging
				AMA.ReportingManager.remoteLog("Lock Failed.[Status Detail:-LOCKED=OFF][accountID:-" + AMA.config.accountDetails.accountId + "]" +
					"[MDN:-" + AMA.config.accountDetails.accountId + "]" ,
					AMA.config.JsonConstants.LOGLEVEL_STATES.AUDIT);
							
				return;
			}

			var o = this;
			var url = AMA.config.apiHostUrl + "/deviceEvents/" + actionId;
			
			var afterAjax = function (response) {
				response = JSON.parse(response);
				
				var list = response.list;
				if(response.total === 0) {
					o._pollingTimer = setTimeout(function() { pollScanResult(); }, 3000);
					return;
				}
				
				if(list[0].status === "success") {
					var status = list[0].statusDetails.split("=")[1];
					
					if(status === "on") {						
						o._result = BaseWorkflow.RESULT.SUCCESSFUL;
						
						// logging
						AMA.ReportingManager.remoteLog("Lock Sucessful.[Status Detail:-"+ list[0].statusDetails + "][accountID:-" + AMA.config.accountDetails.accountId + "]" +
							"[MDN:-" + AMA.config.accountDetails.accountId + "]" ,
							AMA.config.JsonConstants.LOGLEVEL_STATES.AUDIT);	
					
						o._afterRetrieveStatus(list[0].actionType);
					}
					else {
						o._pollingTimer = setTimeout(function() { pollScanResult(); }, 3000);
					}
				}
				else
				{
					o._pollingTimer = setTimeout(function() { pollScanResult(); }, 3000);
				}
					
			};
			
			var urlOption =  url + "?devId=" + AMA.config.devId + "&endpointId=" + AMA.config.endpointId + "&authToken=" + AMA.config.authToken;
			
			var pollScanResult = function () {
				// for browsers that caches AJAX requests
				// var breakCacheUrl = urlOption + "&nocache=" + new Date().getTime();
				
				var request = AMA.Util.createCORSRequest.call(this,
						"GET",
						urlOption
					);
				
				if (request) {
					request.onload = function () {
						var resp = typeof request.response === "undefined" ? request.responseText : request.response;
						afterAjax(resp);
					};
					request.onerror = function (jqXHR, error, errorThrown) {
						AMA.ActionManager._onAjaxError(jqXHR, error, errorThrown);
					};
					
					request.send();
				}
			};
			
			
			pollScanResult();
		},
		
		_afterRetrieveStatus: function (action) {
			AMA.debug("_afterRetrieveStatus");
			
			this._stopCountdown();
			
			AMA.debug("Received ACK for '" + action + "'");
			
			this.toState(BaseWorkflow.STATE.FINALIZING);
		},


        _afterFinish: function (status) {
            var details = {};
            if (status === BaseWorkflow.RESULT.SUCCESSFUL) {
                details = {
                    SuccessFailureFlag: "S",
                    FailureCode: "N/A"
                }
            } else {
                details = {
                    SuccessFailureFlag: "F",
                    FailureCode: "N/A"
                }
            }

            AMA.ReportingManager.reportMRResult("lock", this._actionId, details);
        }


    });
	
})();

/*! SyncWorkflow */
(function () {

	AMA.namespace("workflow");
	
	
	var SyncWorkflow = AMA.workflow.SyncWorkflow = AMA.workflow.BaseWorkflow.extend();
	
	SyncWorkflow.URL = "/actions";
	
	SyncWorkflow.STATE = AMA.enums(
		"CONNECTING",
		"SYNCING"
	);
	
	// Countdown duration while connecting to the server
	SyncWorkflow.CONNECT_COUNTDOWN = 180;
	
	// Amount of time in seconds in between connect retries
    SyncWorkflow.CONNECT_INTERVAL = 15;
	
	// Aliases
	var BaseWorkflow = AMA.workflow.BaseWorkflow;
	
	_.extend(SyncWorkflow.prototype, {
		_onStateChange: function (state) {
			switch (state) {
				case BaseWorkflow.STATE.INITIALIZING:
					AMA.debug("'" + this._action + "' is initializing");
					this._doInitializing();
					break;
				
				case SyncWorkflow.STATE.CONNECTING:
					AMA.debug("'" + this._action + "' is connecting");
					this._doConnecting();
					break;
					
				case SyncWorkflow.STATE.SYNCING:
					AMA.debug("'" + this._action + "' is syncing");
					break;
					
				case BaseWorkflow.STATE.FINALIZING:
					AMA.debug("'" + this._action + "' is finalizing");
					this._doFinalizing();
					break;
				
				default:
			}
		},
	   stop: function (status) {
            this.toState(BaseWorkflow.STATE.INACTIVE);
            
            status = status || BaseWorkflow.RESULT.SUCCESSFUL;
           	this._stopCountdown();
     
            
            AMA.debug("'" + this._action + "' has finished with result '" + this.getResultName(status) + "'");
            this.trigger(BaseWorkflow.EVENT.FINISHED, {
                result: status,
                data: this._resultData
            });
        },
		
		_doInitializing: function () {
			// Start the countdown timer
            this._startCountdown(SyncWorkflow.CONNECT_COUNTDOWN);
            this.syncData={
				contacts: {},
            	images: {},
            	videos: {}
            };
            
            this._doConnecting();
		},
		
		_doConnecting: function () {			
			var options = {
					data: {
						actionType: "sync",
						dataType: this.options.itemsToSync
					},
					callback: _.bind(this._afterSendRequest, this)
				};
            
            // Send the command to the server
            this.sendRequest(options);
		},
        
        sendRequest: function (options) {
        	var url = AMA.config.apiHostUrl + SyncWorkflow.URL,
				params = options && options.async === false && {async: false} || {};
			
			var data = options && options.data && JSON.stringify(options.data) || null;
			
			this._ajax(url, "POST", params, data, options && options.callback);
        },
		
		_ajax: function (url, method, params, data, callback) {
			if (AMA.models.capabilities.canCreate("actions")) {

				var asyncFlag = true;
				if (params && params.async === false) {
					asyncFlag = params.async;
				}
				
				var afterAjax = function (response) {
					if (callback) callback(response);
				};
				
				var options = {
					type: method,
					cache: false,
					url: url + "?devId=" + AMA.config.devId + "&endpointId=" + AMA.config.endpointId + "&authToken=" + AMA.config.authToken,
					contentType: "application/json; charset=utf-8",
					global: false,
					async: asyncFlag,
					error: _.bind(this._onAjaxError, this),
					success: _.bind(afterAjax, this)
				};
				
				if(options.type  === "POST") {
					options.data = data;
					options.dataType = "json";
				}
				
				// var options = {
					// type: "POST",
					// cache: false,
					// url: url + "?devId=" + AMA.config.devId + "&endpointId=" + AMA.config.endpointId + "&authToken=" + AMA.config.authToken,
					// data: data,
					// dataType: "json",
					// contentType: "application/json; charset=utf-8",
					// global: false,
					// async: asyncFlag,
					// error: _.bind(this._onAjaxError, this),
					// success: _.bind(afterAjax, this)
				// };
					
				AMA.debug("Calling REST API:" + method + " - " + options.url);
				
				$.ajax(options);
			} else {
                AMA.debug("Sync is not supported!");
            }
		},
		
		_onAjaxError: function (jqXHR, error, errorThrown) {
			AMA.ActionManager._onAjaxError(jqXHR, error, errorThrown);
		},
		
		_afterSendRequest: function (response) {
			AMA.debug("Received connecting response: " + JSON.stringify(response));
			if(response && typeof response.actionId != "undefined") {
                AMA.debug("Polling for sync action updates...");

				this._doPolling(response.actionId);
			}
			else {
				// Attempt the connection again
				AMA.debug("Connection failed. Attempting to connect again in " + SyncWorkflow.CONNECT_INTERVAL + " seconds");
				
				this._connectRetry = setTimeout(_.bind(this._doConnecting, this), 3000);
			}
		},
		
		_doPolling: function (actionId) {
            // If a countdown has timed out, bypass polling
            if (this._timedOut) return;

			if (AMA.models.capabilities.canRead("syncEvents_actionId")) {
				var url = AMA.config.apiHostUrl + "/syncEvents/" + actionId,
                    o = this;
				var afterAjax = function (response) {
					if (!response.id) {
                        AMA.debug("No sync updates. Checking again in 5 seconds");

						o._pollingTimer = setTimeout(pollScanResult, 5000);
					}
					else {
						this._afterRetrieveStatus(actionId, response);
					}
				};
				
				var options = {
					cache: false,
					url: url + "?devId=" + AMA.config.devId + "&endpointId=" + AMA.config.endpointId + "&authToken=" + AMA.config.authToken,
					error: _.bind(this._onAjaxError, this),
					success: _.bind(afterAjax, this)
				};
				
				var pollScanResult = function () {
                    AMA.debug("Calling REST API: GET " + options.url);

					$.ajax(options);
				};
				
				this._pollingTimer = setTimeout(pollScanResult, 5000);
			}		
		},
        
        _afterRetrieveStatus: function (actionId, response) {
            var self = this;
            
            if (response.list.length == 0) {
                AMA.debug("Sync action acknowledged by server, but no update yet. Polling again in 5 sec");

            	this._doPolling(actionId);
            }
            else {
            	var syncStatus = response.list[0].status,
            		syncSuccess = response.list[0].statusDetails === "Sync Successful" ? true : false;
            	
            	if (syncStatus === "syncing" && !syncSuccess){
            		AMA.debug("Sync in progress...");
					
            		this._resultData = response.list[0];
            		this._retrieveCurrentData();
            		
					if(this.syncData.updateButtons)
            		{
            		   this._stopCountdown();
            		   this.toState(SyncWorkflow.STATE.SYNCING, this.syncData);
	            	}
            		
            		this._doPolling(actionId);
            	}
            	else if (syncStatus === "failed" || syncStatus === "failure") {
            		AMA.debug("Sync has failed");

            		this._result = BaseWorkflow.RESULT.FAILED;
            		this._resultData = response.list[0];
            		this.toState(BaseWorkflow.STATE.FINALIZING);
            	}
            	else if (syncSuccess){
            		AMA.debug("Sync has successfully finished");

            		this._result = BaseWorkflow.RESULT.SUCCESSFUL;
            		this._resultData = response.list[0];
					
					AMA.ReportingManager.remoteLog("Sync Successful [type:-" + this._action + "][accountID:-" + AMA.config.accountDetails.accountId + "]" +
						"[MDN:-" + AMA.config.accountDetails.accountMdn + "][time remaining:-" + this._timeRemaining + "]",
						AMA.config.JsonConstants.LOGLEVEL_STATES.AUDIT);

            		this.toState(BaseWorkflow.STATE.FINALIZING);
            		
            	}
            }
        },
		
		_stopCountdown: function () {
			AMA.debug("'" + this._action + "' has stopped the countdown");
			
			clearInterval(this._countdownTimer);
			clearTimeout(this._connectRetry);
		},
		
		_retrieveCurrentData:function()
		{
			var url = AMA.config.apiHostUrl + "/syncStatusEntries";
			this._ajax(url, "GET", null, null, _.bind(this._afterFetchSyncSessionInfo, this));
		},
		
		_afterFetchSyncSessionInfo: function(data) {
			if(typeof data !== "object") {
				data = JSON.parse(data);
			}
			
			var o = this;
			var completed = data.sourceCompleted || {};
			var pending = data.sourcePending || {};
			var updateButtons = false;
			var startNextSync = false;
			var isEmpty = $.isEmptyObject(data);
			var result = {};
			
			var _countResult = function (recordType, startNextSync) {
				var result = {
					countTotal: 0,
					completedCount: 0,
					pendingCount: 0,
					syncStatus: "",
					startNextSync: startNextSync
				};
				
				//var completedItem = $.grep(completed, function(obj) { return obj.id === recordType; });
				//var pendingItem = $.grep(, function(obj) { return obj.id === recordType; });

				var completedItem = _.where(completed, { id: recordType });
				var pendingItem = _.where(pending, { id: recordType });
					
				_.each(completedItem[0], function(value, key) {
					if(key==="id") return;
					result.completedCount += value;
				});
				
				_.each(pendingItem[0], function(value, key) {
					if(key==="id") return;
					result.pendingCount += value;
				})
				
				result.countTotal = result.completedCount + result.pendingCount;
				
				if (!result.startNextSync && result.countTotal && result.countTotal === result.pendingCount) {
					result.syncStatus = "pending";
				} 
				else if(result.countTotal) {
					result.syncStatus = "syncing";
				} 
				else {
					if(isEmpty) {
						result.syncStatus = "waiting_to_sync";
					}
					else {
						result.syncStatus = "no_change";
					}
				}
						
				if (result.countTotal) {
					updateButtons = true;
					
					if(result.completedCount === result.countTotal) {
						result.startNextSync = true;
					}
				}
				
				return result;
			};
			
			var records = {"contacts": "contact", "pictures": "image", "videos": "video"};
			
			_.each(records, function(value, key) {
				if(o.options.itemsToSync.indexOf(key) >= 0) {
					result = _countResult(AMA.config.recordTypeIds[value], startNextSync);
					
					value += "s";
					o.syncData[value].completed = result.completedCount;
					o.syncData[value].pending = result.pendingCount;
					o.syncData[value].total = result.countTotal;	
					o.syncData[value].status = result.syncStatus;	
					startNextSync = result.startNextSync;
				}
			});
			
			startNextSync = false;

			if(!updateButtons) {
				if(o.options.itemsToSync.indexOf("contacts") !== -1) {
					o.syncData.contacts.status="syncing";
					if(o.options.itemsToSync.indexOf("pictures") !== -1) {
						o.syncData.images.status="waiting_to_sync";
					}
					if(o.options.itemsToSync.indexOf("videos") !== -1) {
						o.syncData.videos.status="waiting_to_sync";
					}
				}
			}
			
			o.syncData.itemsBeingSynced = o.options.itemsToSync;
			o.syncData.updateButtons = true;		
		},
		
		_doFinalizing: function () {
			AMA.debug("Invalidating contacts, photos, and videos data");
			AMA.models.contacts.invalidate();
			AMA.models.photos.invalidate();
			AMA.models.videos.invalidate();
		},


        _afterFinish: function (status) {
            var eventMsg = {};
            eventMsg['Type'] = 'sync';

            if(this.getResultName(status) !== BaseWorkflow.RESULT.SUCCESSFUL) {
                eventMsg['Result'] = 'Failed';
                eventMsg['Reason'] = this.getResultName(status);
            }
            else {
                eventMsg['Result'] = 'Success'
            }

            AMA.ReportingManager.reportSyncEvent(AMA.config.reportingEventTypes.webSyncResult, eventMsg);
        }
	});
})();

/*! WipeWorkflow */
(function () {

    AMA.namespace("workflow");
    
    
    var WipeWorkflow = AMA.workflow.WipeWorkflow = AMA.workflow.BaseWorkflow.extend();
    
    WipeWorkflow.URL = "/actions";
    
    WipeWorkflow.STATE = AMA.enums(
        "CONNECTING",
        "SYNCING",
        "ERASING"
    );
    
    // Amount of time in seconds to be spent in connecting to device and performing the operation
    WipeWorkflow.CONNECT_COUNTDOWN = 300;
    
    // Amount of time in seconds in between connect retries
    WipeWorkflow.CONNECT_INTERVAL = 15;
    
    // WipeWorkflow outcomes
    WipeWorkflow.RESULT = AMA.enums(
        "FACTORY_RESET_SUCCESSFUL"
    );
    
    
    // Aliases
    var BaseWorkflow = AMA.workflow.BaseWorkflow;
    
    _.extend(WipeWorkflow.prototype, {
        _onStateChange: function (state) {
            switch (state) {
                case BaseWorkflow.STATE.INITIALIZING:
                    AMA.debug("'" + this._action + "' is initializing");
                    this._doInitializing();
                    break;
                
                case WipeWorkflow.STATE.CONNECTING:
                    AMA.debug("'" + this._action + "' is connecting");
                    this._doConnecting(this._action);
                    break;
                    
                case WipeWorkflow.STATE.SYNCING:
                    AMA.debug("'" + this._action + "' is syncing");
                    break;
                
                case WipeWorkflow.STATE.ERASING:
                    AMA.debug("'" + this._action + "' is erasing");
                    break;
                    
                case WipeWorkflow.STATE.FINALIZING:
                    AMA.debug("'" + this._action + "' is finalizing");
                    break;
                
                default:
            }
        },

        stop: function (status) {
            this.toState(BaseWorkflow.STATE.INACTIVE);
            
            status = status || BaseWorkflow.RESULT.SUCCESSFUL;
            
            if (status !== BaseWorkflow.RESULT.SUCCESSFUL) {
            	this._stopCountdown();
            }
            
            AMA.debug("'" + this._action + "' has finished with result '" + this.getResultName(status) + "'");
			
			this._afterFinish(status);
			
            this.trigger(BaseWorkflow.EVENT.FINISHED, {
                result: status,
                // Wipe summary is sent as content of the event, which will be used as the button tooltip
                data: this._resultData
            });
        },

        toState: function (state) {
            this._state = state;
            
            this.trigger(BaseWorkflow.EVENT.STATE_CHANGED, {
                state: state,
                // Wipe summary is sent as content of the event, which will be used as the button tooltip
                data: this._resultData
            });
            AMA.debug("'" + this._action + "' changed state to '" + this.getStateName(state) + "'");
            
            this._onStateChange(state);
            
            if (state === BaseWorkflow.STATE.FINALIZING) {
                if (this._action.indexOf("wipefactoryonly") > -1) {
                    var result = WipeWorkflow.RESULT.FACTORY_RESET_SUCCESSFUL || this._result;
                }
                else {
                    var result = this._result || BaseWorkflow.RESULT.SUCCESSFUL;
                }
                
                this.stop(result);
            }
        },
        
        _doInitializing: function () {
            // Start the countdown timer
            this._startCountdown(WipeWorkflow.CONNECT_COUNTDOWN);
            this.toState(WipeWorkflow.STATE.CONNECTING);
            // this._doConnecting();
        },
        
        _doConnecting: function () {
            var options = {
					data: {
						actionType: this._action
					},
					callback: _.bind(this._afterSendRequest, this)
				};
            
            // Send the command to the server
            this.sendRequest(options);
        },
        
        sendRequest: function (options) {
        	var url = AMA.config.apiHostUrl + WipeWorkflow.URL,
				params = {};
			
			var data = options && options.data && JSON.stringify(options.data) || null;
			
			this._ajax(url, params, data, options && options.callback);
        },
        
        _ajax: function (url, params, data, callback) {
            if (AMA.models.capabilities.canCreate("actions")) {
                var afterAjax = function (response) {
                    if (callback) callback(response);
                };

                var options = {
                    type: "POST",
                    cache: false,
                    url: url + "?devId=" + AMA.config.devId + "&endpointId=" + AMA.config.endpointId + "&authToken=" + AMA.config.authToken,
                    data: data,
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    global: false,
                    error: _.bind(this._onAjaxError, this),
                    success: _.bind(afterAjax, this)
                };

                AMA.debug("Sending AJAX request: " + options.url);
                
                if (AMA.Util.useXdr()) {
                    var request = AMA.Util.createCORSRequest(options.type, options.url);

                    if (request) {
                        request.onload = function () {
                            try {
                                var response = JSON.parse(this.responseText);
                            }
                            catch (e) {
                                AMA.error(options.type + " " + url  + " - Wipe Workflow - response not JSON: " + this.responseText);
                            };

                            if (response) {
                                afterAjax(response);
                            }
                        };

                        request.onerror = function () {
                            AMA.error("Request failed: " + options.type + " " + url);
                        };

                        request.send(data);
                    }
                }
                else {
                    $.ajax(options);
                }
            }
        },
        
		_onAjaxError: function (jqXHR, error, errorThrown) {
			AMA.ActionManager._onAjaxError(jqXHR, error, errorThrown);
		},
        
        _afterSendRequest: function (response) {
            var self = this;

            AMA.debug("Received connecting response: " + JSON.stringify(response));
			if(response && typeof response.actionId != "undefined") {

                this._actionId = response.actionId;

                AMA.ReportingManager.reportMRAttempt("wipe", this._actionId);

				this._doPolling(this._actionId);
			}
			else {
				// Attempt the connection again
				AMA.debug("Connection failed. Attempting to connect again in " + WipeWorkflow.CONNECT_INTERVAL + " seconds");
				
				this._connectRetry = setTimeout(_.bind(this._doConnecting, this), WipeWorkflow.CONNECT_INTERVAL * 1000);
			}
        },
        
        _doPolling: function (actionId) {
            // If a countdown has timed out, bypass polling
            if (this._timedOut) return;

            var self = this,
                request = null,
                url = AMA.config.apiHostUrl + "/deviceEvents/" + actionId;

            if (AMA.models.capabilities.canRead("deviceEvents_actionId")) {
                var url = AMA.config.apiHostUrl + "/deviceEvents/" + actionId;
                var afterAjax = function (response) {
                    if (!response.id) {
                        // It appears wipe event has not yet been created, check again in five seconds 
                        self._pollingTimer = setTimeout(function() { pollScanResult(); }, 5000);
                    }
                    else {
                        self._afterRetrieveStatus(response);
                    }
                };

                var options = {
                    cache: false,
                    url: url + "?devId=" + AMA.config.devId + "&endpointId=" + AMA.config.endpointId + "&authToken=" + AMA.config.authToken,
                    data: {
                        actionType: (this._action === "wipe") ? "wipeData" : "factoryReset"
                    },
                    error: _.bind(this._onAjaxError, this),
                    success: _.bind(afterAjax, this)
                };

                var pollScanResult = function () {
                    if (AMA.Util.useXdr()) {
                        var request = AMA.Util.createCORSRequest("GET", options.url);

                        if (request) {
                            request.onload = function () {
                                try {
                                    var response = JSON.parse(this.responseText);
                                }
                                catch (e) {
                                    AMA.error("GET " + url  + " - Wipe Workflow - response not JSON: " + this.responseText);
                                }

                                if (response) {
                                    afterAjax(response);
                                }
                            };

                            request.onerror = function () {
								AMA.error("Request failed: GET " + url);
                            };
                            
                            // Wrapping the send() function in a timeout declaration as part of solution to address aborted requests in IE
                            // http://cypressnorth.com/programming/internet-explorer-aborting-ajax-requests-fixed/
                            setTimeout(function () { 
                            	request.send(JSON.stringify(options.data));
                            	}, 0);                            
                        }
                    }
                    else {
                        $.ajax(options);
                    }
                };

                this._pollingTimer = setTimeout(pollScanResult, 2000);
            }
        },
        
        _afterRetrieveStatus: function (response) {
            var self = this;
            
            if (response.total == 0) {
            	// Action created but no progress update on the sync yet, so poll again
            	this._doPolling(this._actionId);
            }
            else {
            	var actionType = response.list[0].actionType,
            		wipeStatus = response.list[0].status,
            		wipeStatusDetail = response.list[0].statusDetails;
            		
            	if ((actionType === "wipe" && wipeStatus === "success") ||
                    (actionType === "wipefactoryonly" && wipeStatus === "success" && wipeStatusDetail === "wipefactory=on")) {
            		// Wipe successful, end the workflow
            		this._result = BaseWorkflow.RESULT.SUCCESSFUL;
            		this._resultData = response.list[0].statusDetails;
            		
					// logging
					AMA.ReportingManager.remoteLog("Wipe Successful.[Status Detail:-" + wipeStatusDetail + "][accountID:-" + AMA.config.accountDetails.accountId + "]" +
						"[MDN:-" + AMA.config.accountDetails.accountMdn + "]" ,
						AMA.config.JsonConstants.LOGLEVEL_STATES.AUDIT);
					
            		if (actionType === "wipefactoryonly") {
            			AMA.ActionManager.stopRoutinePolling();
						AMA.ActionManager.clearAutoInvalidateData();
            		}
            		
            		this.toState(BaseWorkflow.STATE.FINALIZING);
            	}
            	else if (actionType === "wipe" && (wipeStatus.indexOf("fail") > -1)) {
            		// Wipe failed, end the workflow
            		this._result = BaseWorkflow.RESULT.FAILED;
					
					AMA.ReportingManager.remoteLog("Wipe Failed.[Status Detail:-" + wipeStatusDetail + "[accountID:-" + AMA.config.accountDetails.accountId + "]" +
						"[MDN:-" + AMA.config.accountDetails.accountMdn + "]" ,
						AMA.config.JsonConstants.LOGLEVEL_STATES.AUDIT);
					
            		this.toState(BaseWorkflow.STATE.FINALIZING);
            	}
            	else if (actionType === "wipe" && wipeStatus === "ongoing") {
            		if (!wipeStatusDetail) {
                        // Wipe will first do a sync and throw this status while doing so
                        // Next status will already be sync success so change button state here
                        if (this.state != WipeWorkflow.STATE.SYNCING) {
                            this.toState(WipeWorkflow.STATE.SYNCING);
                            if(this._action === "wipe" || this._action === "wipeonly") AMA.models.locksettings.invalidate();

                            this._stopCountdown();
                        }
                    }
                    else {
                        if (this.state != WipeWorkflow.STATE.ERASING) {
                            this.toState(WipeWorkflow.STATE.ERASING);
                        }
                        this._resultData = response.list[0].statusDetails;
                        this.trigger(WipeWorkflow.STATE.ERASING, {
                            data: this._resultData
                        });
                    }

                    this._doPolling(this._actionId);
            	}
            	else {
					this._doPolling(this._actionId);
            	}
            }
        },
		
		_stopCountdown: function () {
			AMA.debug("'" + this._action + "' has stopped the countdown");
			
			clearInterval(this._countdownTimer);
			clearTimeout(this._connectRetry);
		},

        _afterFinish: function (status) {
            var details = {};
            if (status === BaseWorkflow.RESULT.SUCCESSFUL) {
                details = {
                    SuccessFailureFlag: "S",
                    FailureCode: "N/A"
                }
                // AMA.ReportingManager.remoteLog("Wipe Successful [type:-" + this._action + "][accountID:-" + AMA.config.accountDetails.accountId + "]" +
					// "[MDN:-" + AMA.config.accountDetails.accountMdn + "][time remaining:-" + this._timeRemaining + "]",
					// AMA.config.JsonConstants.LOGLEVEL_STATES.AUDIT);
            } 
            else if (status === WipeWorkflow.RESULT.FACTORY_RESET_SUCCESSFUL) {
                details = {
                    SuccessFailureFlag: "S",
                    FailureCode: "N/A"
                }
            }
            else {
                details = {
                    SuccessFailureFlag: "F",
                    FailureCode: "N/A"
                }
                // AMA.ReportingManager.remoteLog("Wipe Failed [type:-" + this._action + "][accountID:-" + AMA.config.accountDetails.accountId + "]" +
					// "[MDN:-" + AMA.config.accountDetails.accountMdn + "][time remaining:-" + this._timeRemaining + "][details:-Failed]",
					// AMA.config.JsonConstants.LOGLEVEL_STATES.AUDIT);
            }

            if (this._action !== "wipefactoryonly") {
                AMA.ReportingManager.reportMRResult("lock", this._actionId, details);
            }

            AMA.ReportingManager.reportMRResult("wipe", this._actionId, details);
        }

    });
})();
/*! DiagnosticScanWorkflow */
(function (){

	AMA.namespace("workflow");

	var DiagnosticScanWorkflow = AMA.workflow.DiagnosticScanWorkflow = AMA.workflow.BaseWorkflow.extend();
	var _actionId;

	DiagnosticScanWorkflow.STATE = AMA.enums("CONNECTING", "SCANNING");
	DiagnosticScanWorkflow.URL = "/appRemediationEvents";
	DiagnosticScanWorkflow.CONNECT_COUNTDOWN = 300; 

	var BaseWorkflow = AMA.workflow.BaseWorkflow;

	_.extend(DiagnosticScanWorkflow.prototype,{
		_onStateChange: function (state){			
			switch (state){
			case BaseWorkflow.STATE.INITIALIZING:
				AMA.debug("'" + this._action + "' is initializing");
				$(".diagnostic_toolset_countdown.countdown_amount").html("5:00");
				this._doInitializing();
				break;
			case DiagnosticScanWorkflow.STATE.CONNECTING:
				AMA.debug("'" + this._action + "' is connecting");
				this._doConnecting();
				break;
			case DiagnosticScanWorkflow.STATE.SCANNING:
				AMA.debug("'" + this._action + "' is scanning");
				break;
			case BaseWorkflow.STATE.FINALIZING:
				AMA.debug("'" + this._action + "' is finalizing");
				break;
			default:
				AMA.debug("DiagnosticScanWorkflow default state.");
			break;
			}
		},

		_doInitializing: function (){
			this._startCountdown(DiagnosticScanWorkflow.CONNECT_COUNTDOWN);

			this._doConnecting();
		},

		_doConnecting: function (){
			var options = {
					data: {
						actionType: "scanHealthStart"
					},
					callback: _.bind(this._afterSendRequest, this)
			};

			this.sendRequest(options);
		},

		_afterSendRequest: function (response){
			AMA.debug("received connecting response: " + JSON.stringify(response));
			response = JSON.parse(response);
			if(typeof response.actionId != "undefined"){
				this._doPolling(response.actionId);
			}
			else{
				AMA.debug("connection was not successful");
			}
		},

		_doPolling: function(actionId){
			if (this._timedOut) return;

			var self = this;

			self.actionId = actionId;

			var afterAjax = function (response) {
				if (response.total) {
					var progress = response.list[0].progress;

					if (progress === "snapshot") {
						self.toState(DiagnosticScanWorkflow.STATE.SCANNING);
					}
					else if (progress === "finished") {
						AMA.models.diagnosticScanResourceData.healthScanDate = response.list[0].eventTime; 
						self._afterRetrieveStatus();
						return;
					}
				}

				setTimeout(function() { self._doPolling(self.actionId) }, 3000);
			};
			
			var pollScanResult = function () {
				var urlOption = AMA.config.apiHostUrl + "/appHealthScanEvents/" + actionId + "?devId=" + AMA.config.devId + "&endpointId=" + AMA.config.endpointId + "&authToken=" + AMA.config.authToken,
					request = AMA.Util.createCORSRequest(
						"GET",
						urlOption
					);
				
				if (request) {
					request.onload = function () {
						try {
							var resp = JSON.parse(this.responseText);
							afterAjax(resp);
						}
						catch (err) {
							AMA.error("GET /appHealthScanEvents - Diagnostic Scan Workflow - response not JSON: " + this.responseText);
						};

					};
					request.onerror = function (jqXHR, error, errorThrown) {
						AMA.ActionManager._onAjaxError(jqXHR, error, errorThrown);
					};
					
					request.send();
				}
			};
			pollScanResult();
		},

		_afterRetrieveStatus: function (){
			// TODO: append the result to panels
			AMA.models.diagnosticScanResourceData.invalidate();
			AMA.models.diagnosticScanAppsData.invalidate();
			this._stopCountdown();
			this.toState(BaseWorkflow.STATE.FINALIZING);
		},

		sendRequest: function (options){
			var url = AMA.config.apiHostUrl + DiagnosticScanWorkflow.URL,
			params ={};

			var data = options && options.data && JSON.stringify(options.data) || null;

			this._ajax(url, params, data, options && options.callback);
		},

		_ajax: function (url, params, data, callback){
			
			//--------------------------------------------------------------
			var urlOption = url + "?devId=" + AMA.config.devId + "&endpointId=" + AMA.config.endpointId + "&authToken=" + AMA.config.authToken;
			AMA.debug("Sending Diagnostic Scan AJAX request: " + urlOption);

			var request = AMA.Util.createCORSRequest.call(this, 
					"POST",
					urlOption
				);
			
			if (request) {
				request.onload = function () {
					var resp = typeof request.response === "undefined" ? request.responseText : request.response;
					callback(resp);
				};
				request.onerror = function (jqXHR, error, errorThrown) {
					AMA.ActionManager._onAjaxError(jqXHR, error, errorThrown);
				};
				
				request.send(data);
			}
			//--------------------------------------------------------------------
		},
		_onAjaxError: function (jqXHR, error, errorThrown){
			AMA.ActionManager._onAjaxError(jqXHR, error, errorThrown);
		}
	});
})();
/*! ScanWorkflow */
(function () {

	AMA.namespace("workflow");
	
	var ScanWorkflow = AMA.workflow.ScanWorkflow = AMA.workflow.BaseWorkflow.extend();
	
	ScanWorkflow.STATE = AMA.enums(
			"CONNECTING",
			"SCANNING"
	);
	
	ScanWorkflow.URL = "/actions";

	ScanWorkflow.CONNECT_COUNTDOWN = 180;
	
	var BaseWorkflow = AMA.workflow.BaseWorkflow;
	
	_.extend(ScanWorkflow.prototype, {
		_onStateChange: function (state) {			
			switch (state) {
				case BaseWorkflow.STATE.INITIALIZING:
					AMA.debug("'" + this._action + "' is initializing");
					this._doInitializing();
					break;
				
				case ScanWorkflow.STATE.CONNECTING:
					AMA.debug("'" + this._action + "' is connecting");
					this._doConnecting();
					break;
					
				case ScanWorkflow.STATE.SCANNING:
					AMA.debug("'" + this._action + "' is scanning");
					//this._doScanning();
					break;
					
				case BaseWorkflow.STATE.FINALIZING:
					AMA.debug("'" + this._action + "' is finalizing");
					break;
				
				default:
			}
		},
		
		_doInitializing: function () {
			this._startCountdown(ScanWorkflow.CONNECT_COUNTDOWN);
			
			this.toState(ScanWorkflow.STATE.CONNECTING);
		},
		
		_doConnecting: function () {
			var options = {
					data: {
						actionType: "startScan"
					},
					callback: _.bind(this._afterSendRequest, this)
				};
			
			this._sendRequest(options);
		},
		
		_sendRequest: function (options) {
		    var url = AMA.config.apiHostUrl + ScanWorkflow.URL,
				params = {};
			
			var data = options && options.data && JSON.stringify(options.data) || null;

			AMA.debug("Sending a create action request to server for '" + options.data.actionType + "'");
			this._ajax(url, params, data, options && options.callback);
		},
		
		_ajax: function (url, params, data, callback) {
			
			var urlOption = url + "?devId=" + AMA.config.devId + "&endpointId=" + AMA.config.endpointId + "&authToken=" + AMA.config.authToken;
			AMA.debug("Sending AJAX request: " + urlOption);

			var request = AMA.Util.createCORSRequest.call(this, 
					"POST",
					urlOption
				);
			
			if (request) {
				request.onload = function () {
					var resp = typeof request.response === "undefined" ? request.responseText : request.response;
					callback(resp);
				};
				request.onerror = function (jqXHR, error, errorThrown) {
					AMA.ActionManager._onAjaxError(jqXHR, error, errorThrown);
				};
				
				request.send(data);
			}
			
		},
		
		_afterSendRequest: function (response) {
			AMA.debug("received connecting response: " + response);
			response = JSON.parse(response);
			if(typeof response.actionId != "undefined") {
				
				AMA.debug("connecting actionid:"+response.actionId);
				this._startPolling(response.actionId);
			}
			else {
				AMA.debug("connection was not successful");
			}
		},
				
		_startPolling: function(actionId) {
            // If a countdown has timed out, bypass polling
            if (this._timedOut) return;

			var o = this;
			var url = AMA.config.apiHostUrl + "/appInfectionScanResults?actionId=" + actionId;
			var afterAjax = function (response) {
				response = JSON.parse(response);
				if(response.originTime) {
					o._stopCountdown();
					if(response && response.sdCardScan==true) {
						o._afterRetrieveStatus();
					}
					else {
						o.toState(ScanWorkflow.STATE.SCANNING);
						o._pollingTimer = setTimeout(function() { pollScanResult(); }, 3000);
					}
				}
				else if (!this._timedOut){
					o._pollingTimer = setTimeout(function() { pollScanResult(); }, 3000);
				}
			};
			
			var urlOption =  url + "&devId=" + AMA.config.devId + "&endpointId=" + AMA.config.endpointId + "&authToken=" + AMA.config.authToken;
			
			var pollScanResult = function () {
				// for browsers that caches AJAX requests
				// var breakCacheUrl = urlOption + "&nocache=" + new Date().getTime();
				
				var request = AMA.Util.createCORSRequest.call(this, 
						"GET",
						urlOption
					);
				
				if (request) {
					request.onload = function () {
						var resp = typeof request.response === "undefined" ? request.responseText : request.response;
						afterAjax(resp);
					};
					request.onerror = function (jqXHR, error, errorThrown) {
						AMA.ActionManager._onAjaxError(jqXHR, error, errorThrown);
					};
					
					request.send();
				}
			};
			
			AMA.ActionManager.stopRoutinePolling();
			pollScanResult();
		},
		
		_afterRetrieveStatus: function (action) {			
			AMA.debug("_afterRetrieveStatus");
			
			AMA.debug("Received ACK for '" + action + "'");
			
			this.toState(BaseWorkflow.STATE.FINALIZING);
			
			// For immediate reflection of details
			AMA.models.threats.invalidate()
		}
		
	});
	
})();
/*! SecurePhoneWorkflow */
(function () {
    AMA.namespace("workflow");

    var SecurePhoneWorkflow = AMA.workflow.SecurePhoneWorkflow = AMA.workflow.BaseWorkflow.extend();

    SecurePhoneWorkflow.STATE = AMA.enums(
        "CONNECTING",
        "ANNOUNCE_DISPLAYED",
        "CONTACTS_ERASED",
        "REFINING",
        "RETRYING"
    );

    SecurePhoneWorkflow.URL = "/actions";

    // Countdown duration while connecting to the server
    // It appears that anything more than a minute causes no retry information to be returned. 
    SecurePhoneWorkflow.CONNECT_COUNTDOWN = 240;

    // Aliases
    var BaseWorkflow = AMA.workflow.BaseWorkflow;


    _.extend(SecurePhoneWorkflow.prototype, {
        _onStateChange: function (state) {
            switch (state) {
                 case BaseWorkflow.STATE.INITIALIZING:
                    AMA.debug("'" + this._action + "' is initializing");
                    this._doInitializing();
                    break;

                case SecurePhoneWorkflow.STATE.CONNECTING:
                    AMA.debug("SecurePhone command sent");
                    this._doConnecting(this._action);
                    break;

                case SecurePhoneWorkflow.STATE.ANNOUNCE_DISPLAYED:
                    AMA.debug("Announce message has been viewed on the device by the user");
                    break;

                case SecurePhoneWorkflow.STATE.CONTACTS_ERASED:
                    AMA.debug("Contacts successfully erased");
                    AMA.models.contacts.fetch();
                    break;

                case SecurePhoneWorkflow.STATE.REFINING:
                    AMA.debug("Location updated");
                    break;

                case SecurePhoneWorkflow.STATE.RETRYING:
                    AMA.debug("SecurePhone command sent - retry");
                    //this._doRetrying(this._action);
                    break;

                case BaseWorkflow.STATE.FINALIZING:
                    AMA.debug("'" + this._action + "' is finalizing");
                    break;

                default:
            }
        },
		
		/**
		 * Overrides toState method of BaseWorkflow.
         * Handles the workflow's state changes
         * 
         * @param {Object} state: The new state of the workflow
         */
        toState: function (state) {
            this._state = state;

            this.trigger(BaseWorkflow.EVENT.STATE_CHANGED, {
                state: state,
                contactsErased: this._contactsErased,
                retryInformation: this._retryInformation,
				locateSuccess: this._locateSuccess,
				announceSuccess: this._announceSuccess,
				wipeSuccess: this._wipeContactsSuccess
            });

            AMA.debug("'" + this._action + "' changed state to '" + this.getStateName(state) + "'");

            this._onStateChange(state);

            if (state === BaseWorkflow.STATE.FINALIZING) {
                var result = this._result || BaseWorkflow.RESULT.SUCCESSFUL;

                this.stop(result);
            }
        },
		
		/**
		 * Overrides _startCountdown method of BaseWorkflow.
		 * Starts the countdown timer for the workflow.
		 * 
		 * Overridden to include a flag for retry
		 * 
		 * @method _startCountdown
		 * @param {number} time The countdown duration in seconds
		 */
		_startCountdown: function (time) {
			AMA.debug("'" + this._action + "' has started a countdown for " + time + " seconds");
			
			this._countdownTimer = setInterval(_.bind(function () {
				var sec = time % 60,
					min = Math.floor(time / 60),
					timeRemaining;
				
				if (time === 0) {
					AMA.debug("'" + this._action + "' countdown timer has expired");
					
					this.trigger(BaseWorkflow.EVENT.TIMEOUT);
                    this._timedOut = true;

					clearInterval(this._countdownTimer);
					this.stop(BaseWorkflow.RESULT.TIMEDOUT);
					
					// if zero, force the workflow to end
					var oneIsSuccess = this._locateSuccess || (this._announceSuccess && this._performAnnounce) || (this._wipeContactsSuccess && this._performErase);
					this._result = oneIsSuccess ? BaseWorkflow.RESULT.SUCCESSFUL : BaseWorkflow.RESULT.FAILED;

					this.toState(BaseWorkflow.STATE.FINALIZING);
				
					return;
				} else if (time === 10) {
					this._isOkayToRetry = true;
				}
				
				timeRemaining = (min < 10 ? "0" : "") + min + ":" + (sec < 10 ? "0" : "") + sec;
				this.trigger(BaseWorkflow.EVENT.COUNTDOWN_TICK, { remaining: timeRemaining });
				
				time--;
			}, this), 1000);
		},
		
		/**
		 * Sets workflow properties and flags.
		 * Triggers countdown and transition to connecting state.
		 * 
		 */
        _doInitializing: function () {
            // Set workflow properties
            this.actionsString = this.options.actionsString || "gpsrefresh";
            this._performAnnounce = this.options.performAnnounce || false;
            this._announceMessage = this.options.announceMessage || null;
            this._performErase = this.options.performErase || false;
            this._contactsErased = "";

            // Set success flags
            // If an operation will not be performed, mark it as done
            this._wipeContactsSuccess = !this._performErase;
            this._announceSuccess = !this._performAnnounce;
            this._locateSuccess = false;
			
			// set retry flag
			this._isOkayToRetry = false;
			
            this._retryInformation = "";
            this._locationHistory = AMA.models.locations.toJSON();

            // Start the countdown and attempt to connect to server to initialize secure phone
            this._startCountdown(SecurePhoneWorkflow.CONNECT_COUNTDOWN);
            this.toState(SecurePhoneWorkflow.STATE.CONNECTING);
        },
		
		/**
		 * Prepares the options for action request.
		 * 
		 */
        _doConnecting: function () {
            var options = {
                    data: {
                        actionType: "securePhone",
                        actionCmd: this.actionsString,
                        text: this._announceMessage
                    },
                    callback: _.bind(this._afterSendRequest, this)
                };

            this._sendRequest(options);
        },

        _sendRequest: function (options) {
            var url = AMA.config.apiHostUrl + SecurePhoneWorkflow.URL,
                params = {};

            var data = options && options.data && JSON.stringify(options.data) || null;

            AMA.debug("Sending a create action request to server for '" + options.data.actionType + "'");

            this._ajax(url, "POST", params, data, options && options.callback);
        },

        _ajax: function (url, type, params, data, callback, onerror) {
			var o = this;
			
            var urlOption = url + "?devId=" + AMA.config.devId + "&endpointId=" + AMA.config.endpointId + "&authToken=" + AMA.config.authToken;
            AMA.debug("Sending AJAX request: " + urlOption);

            var request = AMA.Util.createCORSRequest.call(this, 
                    type,
                    urlOption
                );

            if (request) {
                // request.onload = function () {
                    
                // };
                request.onerror = function (jqXHR, error, errorThrown) {
                    AMA.ActionManager._onAjaxError(jqXHR, error, errorThrown);
                };
				
				request.onreadystatechange  = function() {
					if(request.readyState == 4 && request.status === 200) {
						var resp = typeof request.response === "undefined" ? request.responseText : request.response;
						callback(resp);
					} else {
						AMA.debug("AJAX Request to " + url + " returns " + request.status);
						if(typeof onerror === "function") {
							callback("error");
						}
					}
				}
				
                request.send(data);
            }
        },
		
		/**
		 * Callback for POST /actions 
		 *
		 * A unique action ID will be generated for each action to be performed in a secure phone attempt.
		 * At the very least, an action ID for the locate operation should be returned in order for the
         * workflow to continue. Other scenarios handled are described below.
		 *
		 * Validates action IDs for the requested action features
		 * 		- all requested actions receive actionId -- good, start polling
		 * 		- not one actionId is received - good, re-connect (if not timedout)
		 *		- at least one actionId is missing - failed, end the workflow
		 *
		 * @param {object} response Response of ajax call
		 */
        _afterSendRequest: function (response) {
			if(this._timedOut) return;
			
            // Validation for response
            if (!response) {
                AMA.error("Secure Phone: Connection unsuccessful. No response data received.");
                // TODO: Try connection again
                return;
            }

            response = JSON.parse(response);
			
            // Save the locate action ID; if none received, try the connection again
            if (response.gpsrefresh) {
                AMA.debug("Secure Phone: Received action ID for locate: " + response.gpsrefresh);
                this._gpsrefreshId = response.gpsrefresh;
                AMA.ReportingManager.reportMRAttempt("locate", this._gpsrefreshId);
            } else if(response.announce || response.wipe) {
				AMA.error("Secure Phone: No action ID received for locate but actionId is received for announce/wipe.");
			
				this._result = BaseWorkflow.RESULT.FAILED;
				this.toState(BaseWorkflow.STATE.FINALIZING);
			
			    return;
			} else {
				AMA.error("Secure Phone: No action ID received for locate.");
				this._doConnecting();
				
				return;
			}
				
            
            // If announce is enabled, save the announce action ID.
            // If announce is enabled but there is no returned action ID, don't perform the whole workflow anymore.
            if (this._performAnnounce && response.announce) {
                AMA.debug("Secure Phone: Received action ID for announce: " + response.announce);
                this._announceId = response.announce;
                AMA.ReportingManager.reportMRAttempt("announce", this._announceId);
            } else if (this._performAnnounce && !response.announce) {
                AMA.error("Secure Phone: No action ID received for announce. Secure phone will not be performed.");
                
				this._result = BaseWorkflow.RESULT.FAILED;
				this.toState(BaseWorkflow.STATE.FINALIZING);
				
				return;
            }

            // If wipe is enabled, save the wipe action ID.
            // If wipe is enabled but there is no returned action ID,  don't perform the whole workflow anymore.
            if (this._performErase && response.wipe) {
                AMA.debug("Secure Phone: Received action ID for wipe: " + response.wipe);
                this._wipeId = response.wipe;
                AMA.ReportingManager.reportMRAttempt("wipe", this._wipeId);
            } else if (this._performErase && !response.wipe) {
                AMA.error("Secure Phone: No action ID received for wipe. Secure phone will not be performed.");
                
				this._result = BaseWorkflow.RESULT.FAILED;
				this.toState(BaseWorkflow.STATE.FINALIZING);
				
				return;
            }

            this._startPolling();
        },

		/**
		 * Triggers polling for each of the action requested
		 * 
		 */
        _startPolling: function () {
            var url = "";

            AMA.ActionManager.stopRoutinePolling();

            // If Locate is not yet successful, poll using the locate action ID
            if (!this._locateSuccess) {
                this._locateIsPolling = true;
                url = AMA.config.apiHostUrl + "/locateDeviceEvents/" + this._gpsrefreshId;
                this._pollActionResult(url, this._afterRetrieveLocateStatus);
            }

            // If Announce is not yet successful, poll using the announce action ID
            if (!this._announceSuccess) {
                this._announceIsPolling = true;
                url = AMA.config.apiHostUrl + "/securePhoneEvents/" + this._announceId;
                this._pollActionResult(url, this._afterRetrieveAnnounceStatus);
            }

            // If Wipe is not yet successful, poll using the wipe action ID
            if (!this._wipeContactsSuccess) {
                this._wipeIsPolling = true;
                url = AMA.config.apiHostUrl + "/securePhoneEvents/" + this._wipeId;
                this._pollActionResult(url, this._afterRetrieveWipeStatus);
            }
        },
		
		/**
		 * Generic method for ajax polling for secure phone actions.
		 * 
		 * @param {string} url API endpoint to call
		 * @param {function} onSuccess Callback once polling succeeds
		 */
        _pollActionResult: function (url, onSuccess) {
            var o = this;

			var afterAjax = function (response) {
				if(o._timedOut) {
					if(o._locateIsPolling && o._announceIsPolling && o._wipeIsPolling) {
						AMA.debug("Failed getting any of the poll results before timeout.");
						
						o._stopCountdown();
						o._result = BaseWorkflow.RESULT.FAILED;
						o.toState(BaseWorkflow.STATE.FINALIZING);
					}
					
					AMA.debug("The following polls are stopped: " + (o._locateIsPolling ? "gpsrefresh" : "") + ", " + (o._announceIsPolling ? "announce" : "") + ", " + (o._wipeIsPolling ? "wipe" : ""));
					return;
				}
				
                if(typeof response !== "object") {
					response = JSON.parse(response);
				}
				
				if (response && typeof onSuccess === "function") {
                    onSuccess.call(o, response);
                } else {
					o._pollingTimer = setTimeout(function() { pollResult(); }, 3000);
                }
            };
            
			
			var pollResult = function () {
				o._ajax(url, "GET", {}, {}, afterAjax);
            };

            pollResult();
        },
        
        _postMRResult: function(action, actionID, successFailureFlag) {
            var details = {};
            
            details.SuccessFailureFlag = successFailureFlag;
            details.FailureCode="N/A";
            
            AMA.ReportingManager.reportMRResult(action, actionID, details);
        },        
 
        _afterRetrieveLocateStatus: function (response) {
            var o = this,
                url = "";

            this._locateIsPolling = false;
			
			if(response === "error") {
				
				AMA.ReportingManager.remoteLog("Locate Failed.[Status Detail:-"+ list[0].statusDetails || list[0].status  + "]" + 
                        "[accountID:-" + AMA.config.accountDetails.accountId + "]" + 
                        "[MDN:-" + AMA.config.accountDetails.accountId + "]" ,
                        AMA.config.JsonConstants.LOGLEVEL_STATES.AUDIT);
				
				this._locateSuccess = false;
				_postMRResult("locate", o._gpsrefreshId, "F");
				
			} else if (response.list && response.list.length && response.list[0].statusDetails === "gps=on") {
                // Server has returned with data about the status of the locate, handle appropriately
                AMA.debug("Secure Phone: Server returned a response for locate");

                if (this.getState() !== SecurePhoneWorkflow.STATE.REFINING && this.getState() !== BaseWorkflow.STATE.INACTIVE) {
                    this._doRefining();
                }

                if (response.list[0].status === "failure" && AMA.Util.isIPhone()) {
                    // logging
                    AMA.ReportingManager.remoteLog("Locate Failed.[Status Detail:-"+ list[0].statusDetails || list[0].status  + "]" + 
                        "[accountID:-" + AMA.config.accountDetails.accountId + "]" + 
                        "[MDN:-" + AMA.config.accountDetails.accountId + "]" ,
                        AMA.config.JsonConstants.LOGLEVEL_STATES.AUDIT);
                    
                    _postMRResult("locate", o._gpsrefreshId, "F");
                }
            }

            this._validatePollStatus();
        },
		
		_doRefining: function () {
            var lastLocationTime = 0;
            var o = this;
			
            AMA.models.locations.fetch({
                reset:true,
                silent: true,
                success: function(collection, resp) {
					var newRecord = false;
                    var newAccuracy = false;
                    var skip = false;
					
                    if(!o._locationHistory[0] && resp.list.length) {
                        newRecord = true;
                        newAccuracy = true;
                    } else {
                        if(resp.list[0].eventTime > o._locationHistory[0].eventTime) {
                            newRecord = true;
                        } else if(resp.list[0].precision < o._locationHistory[0].precision) {
                            newAccuracy = true;
                        }
                    }
					
                    if(newAccuracy || newRecord) {

                        collection.trigger("reset");
                        AMA.debug("CURRENT STATE AS OF FETCH COMPLETE!" + o.getStateName(o.getState()));
						
                        if(o.getState() === BaseWorkflow.STATE.FINALIZING || 
							o.getState() === SecurePhoneWorkflow.STATE.REFINING || 
								o.getState() === BaseWorkflow.STATE.INACTIVE) {
							skip = true;
						}
                       
                        if(!skip) {
                            o.toState(SecurePhoneWorkflow.STATE.REFINING);
                        }
						
                        o._locateSuccess = true;
                    }
                },
                error: function() {
					AMA.debug("AMA.workflow.LocationWorkflow - Fetching locations failed");
                }
            });
		},
		
        _afterRetrieveAnnounceStatus: function (response) {
            var o = this;
            var url = "";

            this._announceIsPolling = false;
			
			if(response === "error") {
				this._announceSuccess = false;
				_postMRResult("announce", o._announceId, "F");
				
			} else if (response.list && response.list.length && response.list[0].statusDetails === "announce=displayed") {
                // Server has returned with data about the status of the announce, handle appropriately
                AMA.debug("Secure Phone: Server returned a response for announce");
				
				this._announceSuccess = true;
				o.toState(SecurePhoneWorkflow.STATE.ANNOUNCE_DISPLAYED);	
				_postMRResult("announce", o._announceId, "S");
            }

            this._validatePollStatus();
        },

        _afterRetrieveWipeStatus: function (response) {
            var o = this;
            var url = "";

            this._wipeIsPolling = false;

			if(response === "error") {
				this._wipeContactsSuccess = false;
				_postMRResult("wipe", o._wipeId, "F");
				
			} else if (response.list && response.list.length && response.list[0].statusDetails === "contacts=0/0") {
                // Server has returned with data about the status of the wipe, handle appropriately
                AMA.debug("Secure Phone: Server returned a response for wipe");
				
				this._wipeContactsSuccess = true;
				o.toState(SecurePhoneWorkflow.STATE.CONTACTS_ERASED);
				_postMRResult("wipe", o._wipeId, "S");
            }

            this._validatePollStatus();
        },

        _validatePollStatus: function () {
            var o = this;

            if (this._locateSuccess && this._announceSuccess && this._wipeContactsSuccess) {
                // All operations have been flagged as done, so end the workflow
				this._stopCountdown();
                this._result = BaseWorkflow.RESULT.SUCCESSFUL;
                this.toState(BaseWorkflow.STATE.FINALIZING);
                _postMRResult("locate", this._gpsrefreshId, "S");
				
            } else if (!this._isOkayToRetry) {
                // Operation not yet timed out, keep polling what needs to be polled
                if (!this._locateSuccess && !this._locateIsPolling) {
                    this._locateIsPolling = true;
                    this._pollingTimer = setTimeout(function () {
                        o._pollActionResult(AMA.config.apiHostUrl + "/locateDeviceEvents/" + o._gpsrefreshId,
                            o._afterRetrieveLocateStatus);
                    }, 3000);
                }

                if (this._performAnnounce && !this._announceSuccess && !this._announceIsPolling) {
                    this._announceIsPolling = true;
                    this._pollingTimer = setTimeout(function () {
                        o._pollActionResult(AMA.config.apiHostUrl + "/securePhoneEvents/" + o._announceId,
                            o._afterRetrieveAnnounceStatus);
                    }, 3000);
                }

                if (this._performErase && !this._wipeContactsSuccess && !this._wipeIsPolling) {
                    this._wipeIsPolling = true;
                    this._pollingTimer = setTimeout(function () {
                        o._pollActionResult(AMA.config.apiHostUrl + "/securePhoneEvents/" + o._wipeId,
                            o._afterRetrieveWipeStatus);
                    }, 3000);
                }
            } else {
                this._checkNotificationRetryStatus();
            }
        },

        _checkNotificationRetryStatus: function () {
			var url = AMA.config.apiHostUrl + "/notificationRetryStatus";

            AMA.debug("Sending a 'notificationRetryStatus' request to server for '" + this._action + "'");

            this._ajax(url, "GET", null, null, _.bind(this._afterCheckingRetryStatus, this));			
        },

        _afterCheckingRetryStatus: function (response) {
			if(typeof response !== "object") {
				response = JSON.parse(response);
			}
			
            if (parseInt(response.retryAttempt) < parseInt(response.retryTotal) && !this._timedOut) {
				this._retryInformation = response;
                this._doRetrying();
            } else {
				var oneIsSuccess = this._locateSuccess || (this._announceSuccess && this._performAnnounce) || (this._wipeContactsSuccess && this._performErase);
				this._result = oneIsSuccess ? BaseWorkflow.RESULT.SUCCESSFUL : BaseWorkflow.RESULT.FAILED;

				this.toState(BaseWorkflow.STATE.FINALIZING);
            }
        },

		_doRetrying: function () {
			this._stopCountdown();
			
			// call retrying state to update dialog header
			this.toState(SecurePhoneWorkflow.STATE.RETRYING);
			
			this._isOkayToRetry = false;
			this._startCountdown(parseInt(this._retryInformation.retryTimeRemaining));
			this._startPolling();
        },
		
        _afterRetrieveStatus: function () {}
    });
})();
/*! ActionManager */
(function () {

	AMA.ActionManager = function () {

		var _workflows = {};

		// Aliases
		var BaseWorkflow = AMA.workflow.BaseWorkflow;

		// List of action polling timers
		var _pollingTimers = {};

        // Background update timer
        var _backgroundUpdateTimer = null;

        // Latest activity data (used by background update)
        var _latestActivity = null;

        // Latest activity timestamp
        var _latestActivityTime = 0;
		
		// List of auto-invalidated data (i.e. invalidated upon background update)
		var _autoInvalidateData = [];


		// Convenience functions

		var _isValidWorkflow = function (wf) {
			// TODO: Add check for workflow validity here
			return true;
		};

		var _isValidAction = function (action) {
			return _workflows[action] != null;
		};

		var _isOngoing = function (action) {
			if(_workflows[action].getState() != AMA.workflow.LocateWorkflow.STATE.CANCELLED && _workflows[action].getState() != BaseWorkflow.STATE.INACTIVE){
				return true;	
			}
			else {
				return false;
			}
		};

		

		return {

			// ActionManager events
			EVENT: AMA.enums(
					"ACTION_STARTED",
					"ACTION_FINISHED",
					"DATA_DIRTY",
					"REQUEST_FAILED",
					"CONNECTION_ERROR"
			),

			// Polling interval (in milliseconds) for actions
			ACTION_POLLING_INTERVAL: 4000,

            // Background update interval (in milliseconds)
            BACKGROUND_UPDATE_INTERVAL: 15000,



			define: function (action, workflow) {
				AMA.assert(action && workflow && _isValidWorkflow(workflow),
						"[ActionManager.define] Action name and workflow are required");

				// Check if this action is already defined
				if (_isValidAction(action)) {
					AMA.warning("Action '" + action + "' is already defined; redefinition will be ignored");
				}

				// Tag the workflow object with the action name
				workflow._action = action;

			    // Listen to 'finished' event on the workflow, so that ActionManager
			    // can also trigger 'action finished' once workflow has completed
			    workflow.on(BaseWorkflow.EVENT.FINISHED, function (event) {
			    	this.trigger(this.EVENT.ACTION_FINISHED, { action: action, result: event.result });
			    	AMA.debug("ActionManager has detected that action '" + action + "' has finished");

			    	// Also make sure that any running poll for this action is stopped
			    	// this.stopPolling(action);

			    }, this);

				// Add the workflow to the list
				_workflows[action] = workflow;
			},


			getWorkflow: function (action) {
		    	AMA.assert(_isValidAction(action),
		    			"[ActionManager.getWorkflow] '" + action + "' is not a recognized action");

		    	return _workflows[action];
			},


			start: function (action, options) {
		    	AMA.assert(_isValidAction(action),
		    			"[ActionManager.start] '" + action + "' is not a recognized action");

		    	// Do not start an action that is already ongoing
		    	if (_isOngoing(action)) {
		    		AMA.debug("Action '" + action + "' was requested but is already ongoing");
		    		return false;
		    	}

			    // Trigger an 'action started' event on ActionManager
			    this.trigger(this.EVENT.ACTION_STARTED, { action: action, options: options });
			    AMA.debug("ActionManager is starting the '" + action + "' action");

			    // Start the workflow
			    _workflows[action].start(options);

			    return true;
			},


			cancel: function (action) {

			},


			getState: function (action) {
		    	AMA.assert(_isValidAction(action),
		    			"[ActionManager.getState] '" + action + "' is not a recognized action.");

		    	return _workflows[action].getState();
			},


            startBackgroundUpdate: function () {
                AMA.debug("Background update has started");

                if (!_latestActivity) {
                    _latestActivity = new AMA.model.EndpointHistory();

                    _latestActivity.url = AMA.config.apiHostUrl + "/" + AMA.model.EndpointHistory.RESOURCE + "?" +
                        $.param({
                            devId: AMA.config.devId,
                            endpointId: AMA.config.endpointId,
                            authToken: AMA.config.authToken,
                            limit: 1
                        });

                    _latestActivity.parse = AMA.model.BaseData.prototype.parse;

                    o = this;
                    _latestActivity.on(AMA.model.BaseData.EVENT.LOADED, function () {
                        var evt = _latestActivity.at(0),
                            evtTime = evt && parseInt(evt.get("eventTime")) || 0;

                        if (evtTime > _latestActivityTime) {
                            AMA.debug("Latest activity timestamp: " + new Date(evtTime));
                            _latestActivityTime = evtTime;

                            // Pause background update
                            o.stopBackgroundUpdate();

                            // Re-fetch the 'auto-invalidated' models
                            AMA.debug("Invalidating and re-fetching all 'auto-invalidate' data");

                            _.each(_autoInvalidateData, function (data) {
                                data.invalidate();
                            });

                            // Resume background update
                            o.startBackgroundUpdate();
                        }
                    });
                }

                this._doBackgroundUpdate();
            },


            _doBackgroundUpdate: function () {

                AMA.debug("Checking for server updates...");

                // Refetch latest activity
                _latestActivity.fetch();

                // Set the next background update based on interval
                clearTimeout(_backgroundUpdateTimer);
                _backgroundUpdateTimer = setTimeout(_.bind(this._doBackgroundUpdate, this), this.BACKGROUND_UPDATE_INTERVAL);

            },


            stopBackgroundUpdate: function () {
                clearTimeout(_backgroundUpdateTimer);
                AMA.debug("Background update has stopped");
            },


			autoInvalidate: function (data) {
				AMA.assert(data.invalidate, 
						"[ActionManager.autoInvalidate] Data passed is not a valid BaseData-derived object");
				
				_autoInvalidateData.push(data);
			},


			clearAutoInvalidateData: function() {
				_autoInvalidateData = [];
			},


			_onAjaxError: function (jqXHR, error, errorThrown) {
				AMA.debug("Ajax request error: " + error + " [Error thrown: " + errorThrown +
						", status: " + jqXHR.status + ", statusText: '" + jqXHR.statusText +
						"', responseText: '" + jqXHR.responseText + "'");

				// Connection error. Cannot hit the server.
				if (error == "error" && jqXHR.status == "0") {
					AMA.error("Could not reach the server");
				}
				// A duplicate request was made, the first one is aborted.
				else if (error == "abort" && jqXHR.status == "0") {
					AMA.warning("Duplicate request made, aborted first one");
				} else {
					AMA.error("An error occurred while communicating with the server");
				}

				this.trigger(this.EVENT.CONNECTION_ERROR, {
					error: error,
					errorThrown: errorThrown,
					status: jqXHR.status,
					statusText: jqXHR.statusText,
					responseText: jqXHR.responseText
				});
			}

		};

	}();


    // Set method aliases for backward compatibility with older workflows
    _.extend(AMA.ActionManager, {
        startRoutinePolling: AMA.ActionManager.startBackgroundUpdate,
        stopRoutinePolling: AMA.ActionManager.stopBackgroundUpdate
    });


	// Use Backbone.Events to support custom events
	_.extend(AMA.ActionManager, Backbone.Events);

})();


/*! SecurityTab */
(function () {

    AMA.namespace("view");

    /**
	 * Security Tab View
	 *
	 * @class SecurityTab
	 * @namespace view
	 * @extends AMA.view.BaseView
	 * @constructor
	 */
    var SecurityTab = AMA.view.SecurityTab = AMA.view.BaseView.extend();


    /**
	 * ID of the template
	 *
	 * @property TEMPLATE_ID
	 * @type string
	 * @static
	 * @final
	 */
    SecurityTab.TEMPLATE_ID = "security_tab_template";


    /**
	 * Applicable only to view classes that fetch the aggregated templates for
	 * itself and its child views, this property defines the name of the
	 * template file to load. The path is defined in AMA.config.templatePath.
	 *
	 * @property TEMPLATE_SRC
	 * @type string
	 * @static
	 * @final
	 */
    SecurityTab.TEMPLATE_SRC = "security.tpl";


    /**
	 * Define toolsets that will appear in the security tab toolbar.
	 *
	 * @property TOOLBAR
	 * @type object
	 * @static
	 * @final
	 */
    SecurityTab.TOOLBAR = {
        DEFAULT : [
            "endpoint",
            "scan"
        ],
        IPHONE : [
			"endpoint",
            "scan"
        ]
    };


    AMA.augment(SecurityTab.prototype, {
		
    	/**
    	 * Renders Security Tab view
    	 *
    	 * @override
    	 * @method render
    	 */
        render: function () {
        	SecurityTab.__super__.render.apply(this);
			
			this.lastScan = new AMA.view.ThreatProtectionView({
				el: "#threat_scan",
				parent: this,
				data: AMA.models.threats
			});
			
			this.scanSettings = new AMA.view.ScanSettingsView({
				el: "#security_settings",
				parent: this,
				data: AMA.models.scansettings
			});
			
        	this.threatHistory = new AMA.view.ThreatHistoryListView({
        		el: "#security_threats",
				parent: this,
				data: AMA.models.threats
			});

            this.safeBrowsingTab = new AMA.view.SafeBrowsingView({
                el: "#safe_browsing",
                parent: this,
                data: AMA.models.safeBrowsing
            });

        },
		
		events: {	
	    	"click #security_activities_view_more": "viewMoreThreats"
	    },
		
		viewMoreThreats: function(e) {
			// TODO: know the cause of redirection, then remove next line
			e.preventDefault();
		
			AMA.view.ThreatHistoryListView.MAX_ITEM_LIMIT += 5;
			
			this.threatHistory.render();
			
			if(AMA.view.ThreatHistoryListView.MAX_ITEM_LIMIT >= AMA.models.threats.length) {
				$(e.currentTarget).hide();
			}
		}
    });
})();
/*! ScanSettingsView */
(function () {

	AMA.namespace("view");


	/**
	 * This view shows the ScanSettingsView
	 *
	 * @class ScanSettingsView
	 * @namespace view
	 * @constructor
	 */
	var ScanSettingsView = AMA.view.ScanSettingsView = AMA.view.BaseView.extend();


	/**
	 * ID of the template
	 *
	 * @property TEMPLATE_ID
	 * @type string
	 * @static
	 * @final
	 */
	ScanSettingsView.TEMPLATE_ID = "scan_settings_template";

	/**
	 * Applicable only to view classes that fetch the aggregated templates for
	 * itself and its child views, this property defines the name of the
	 * template file to load. The path is defined in AMA.config.templatePath.
	 *
	 * @property TEMPLATE_SRC
	 * @type string
	 * @static
	 * @final
	 */
	ScanSettingsView.TEMPLATE_SRC = "";
	
	AMA.augment(ScanSettingsView.prototype, {
		_processData: function (item, index) {
			item.css={};
			if( item.autoThreatScanFrequency === "NEVER" ) {
				item.css["autoThreatScanEnabledOn"]="hide";
				item.css["autoThreatScanEnabledOff"]="show";
			}
			else {
				item.css["autoThreatScanEnabledOn"]="show";
				item.css["autoThreatScanEnabledOff"]="hide";
			}
			if( item.realTimeScanEnabled ) {
				item.css["realTimeScanEnabledOn"]="show";
				item.css["realTimeScanEnabledOff"]="hide";
			}
			else {
				item.css["realTimeScanEnabledOn"]="hide";
				item.css["realTimeScanEnabledOff"]="show";
			}
			if( item.mediaScanEnabled ) {
				item.css["mediaScanEnabledOn"]="show";
				item.css["mediaScanEnabledOff"]="hide";
			}
			else {
				item.css["mediaScanEnabledOn"]="hide";
				item.css["mediaScanEnabledOff"]="show";
			}
			if( item.trayNotificationEnabled ) {
				item.css["trayNotificationEnabledOn"]="show";
				item.css["trayNotificationEnabledOff"]="hide";
			}
			else {
				item.css["trayNotificationEnabledOn"]="hide";
				item.css["trayNotificationEnabledOff"]="show";
			}
			return item;
		},
        events: {
        	"click #edit_security_settings": "editSecuritySettings"
        	/*,"click .security_settings_value": "editSecuritySettings"*/
        },
        editSecuritySettings: function(){
            AMA.page.openSettings("security");
        }
	});

})();

/*! THreatProtectionView */
(function () {

	AMA.namespace("view");

	/**
	 * This view shows the Last Threat Scan
	 *
	 * @class ThreatProtectionView
	 * @namespace view
	 * @extends AMA.view.BaseView
	 * @constructor
	 */
	var ThreatProtectionView = AMA.view.ThreatProtectionView = AMA.view.BaseView.extend();

	/**
	 * ID of the template
	 *
	 * @property TEMPLATE_ID
	 * @type string
	 * @static
	 * @final
	 */
	ThreatProtectionView.TEMPLATE_ID = "threat_protection_template";

	/**
	 * Applicable only to view classes that fetch the aggregated templates for
	 * itself and its child views, this property defines the name of the
	 * template file to load. The path is defined in AMA.config.templatePath.
	 *
	 * @property TEMPLATE_SRC
	 * @type string
	 * @static
	 * @final
	 */
	ThreatProtectionView.TEMPLATE_SRC = "";
	
	ThreatProtectionView.POLLER = "";

	AMA.augment(ThreatProtectionView.prototype, {	
		initialize: function() {
			ThreatProtectionView.__super__.initialize.apply(this, arguments);
			
			// FIX ME: Do proper solution on next iteration.
			// workaround for device-invoked scan auto-refresh, there's no dirty bit being returned
			if (!ThreatProtectionView.POLLER) {
				ThreatProtectionView.POLLER = setInterval(function() { AMA.models.threats.invalidate(); }, 30000); 
			}			
		},
		
		_processData: function (item, index) {
			var attr = this.data.attributes;
			
			item.appClass = attr.appScan ? "" : "hidden";
			item.fileClass = attr.sdCardScan ? "" : "hidden";
			
			item.elId = this.$el.attr("id") + "_list";		
			item.fileScanTotal = attr.fileScanTotal;
			item.appScanTotal = attr.appScanTotal;			
			item.fileInfectedTotal = attr.fileInfectedTotal + attr.appInfectedTotal;

			item.lastScanDate = attr.eventTime ? 
				AMA.Util.formatDateAndTime(new Date(attr.eventTime), AMA.config.dateAndTimeFormat)
				: "Never";
			
			return item;
		},
	
        events: {
        	"click .scan_for_threats": "scan"
        },
		
        scan: function(){           
			AMA.ActionManager.start("scan");
        },
		
		_setupEvents: function () {

        }
	});

})();
/*! ThreatHistoryListView */
(function () {

	AMA.namespace("view");


	/**
	 * This view shows the Threat History List
	 *
	 * @class ThreatHistoryListView
	 * @namespace view
	 * @extends AMA.view.ListView
	 * @constructor
	 */
	var ThreatHistoryListView = AMA.view.ThreatHistoryListView = AMA.view.ListView.extend();


	/**
	 * ID of the template
	 *
	 * @property TEMPLATE_ID
	 * @type string
	 * @static
	 * @final
	 */
	ThreatHistoryListView.TEMPLATE_ID = "threat_history_item_template";
	
	ThreatHistoryListView.CSS = {
			ITEM: "item"
	};

	/**
	 * Applicable only to view classes that fetch the aggregated templates for
	 * itself and its child views, this property defines the name of the
	 * template file to load. The path is defined in AMA.config.templatePath.
	 *
	 * @property TEMPLATE_SRC
	 * @type string
	 * @static
	 * @final
	 */
	ThreatHistoryListView.TEMPLATE_SRC = "";
	
	ThreatHistoryListView.MAX_ITEM_LIMIT = 5;
	
	AMA.augment(ThreatHistoryListView.prototype, {
	
		initialize: function() {
			ThreatHistoryListView.__super__.initialize.call(this);
			
			this.on(AMA.view.ListView.EVENT.LIST_EMPTIED, function() {
				var emptyList = _.template("empty_threat_history_item_template");
				this.$el.html(emptyList);
			});
		},
		
		render: function () {
			ThreatHistoryListView.__super__.render.call(this);
			
			var $viewLink = this.$el.siblings("#security_activities_view_more");
			// hidden by default
			$viewLink.hide();
			
			if(this.data.length > 5) {
				$viewLink.show();
			}
		},
		
		_processData: function (item, index) {
			item.elId = this.$el.attr("id") + "_item_" + index;
			
			item.datetimeDetected = AMA.Util.formatDateAndTime(item.timestamp, AMA.config.dateAndTimeFormat);

			item.fileInfectedTotal = item.fileInfectedTotal + item.appInfectedTotal;
		
			return item;
		},
		
		_applyFilters: function() {
			ThreatHistoryListView.__super__._applyFilters.apply(this, arguments);
			
			this._dataset = this._dataset.slice(0, ThreatHistoryListView.MAX_ITEM_LIMIT);
		}
	});

})();

/*! AppAssisttab */
(function () {

    AMA.namespace("view");

    var AppAssistTab = AMA.view.AppAssistTab = AMA.view.BaseView.extend();
    /**
     * defines the template ID which corresponds to the 'id' property of the template
     * <script> used by this class.
     *
     * @property TEMPLATE_ID
     * @type string
     * @static
     * @final
     */
    AppAssistTab.TEMPLATE_ID = "privacy_template";
    /**
     * Applicable only to view classes that fetch the aggregated templates for
     * itself and its child views, this property defines the name of the
     * template file to load. The path is defined in AMA.config.templatePath.
     *
     * @property TEMPLATE_SRC
     * @type string
     * @static
     * @final
     */
    AppAssistTab.TEMPLATE_SRC = "appassist.tpl";

    /**
     * Use to Initialize the Toolbar use for this Tab
     *
     * @property TOOLBAR.DEFAULT, TOOLBAR.IPHONE
     * @type object
     * @static
     * @final
     */
    AppAssistTab.TOOLBAR = {
        DEFAULT : [
            "endpoint",
            "AppAssist"
        ]
    };

    AMA.augment(AppAssistTab.prototype, {
        /**
         * Initialize with default sort direction;
         */
        initialize: function() {
            AppAssistTab.__super__.initialize.apply(this, arguments);
            this.on(AMA.view.BaseView.EVENT.DATA_LOADED, function() {
                this.data.sortByKey("name", "asc");
            });
        },

        events: {
            "click #app_assist_go" : "search"
        },

        /**
         * Process data to return only the _meta key.
         *
         * @override
         * @method _processData
         */
        _processData: function(data) {
            if(!this.data.attributes.total){
                this.data.attributes.total = this.data.length;
            }
            return this.data.attributes;
        },

        /**
         * Bind Events
         *
         * @override
         * @method _setupEvents
         */
        _setupEvents: function() {
            var o = this;
            $(this.$el).find("#privacy_sort").on('change', function() {
                var obj = $(this),
                        args = obj.val().split('-');
                AMA.debug("======= sorting data =======");
                $("#privacy").find(".submenu-label").html($("[value="+ obj.val() + "]").html())
                AMA.models.privacy.sortByKey(args[0], args[1]);
            });
            $(this.$el).on('click', ".privacy_sort", function() {
                var obj = $(this),
                        args = obj.data("value").split('-');
                AMA.debug("======= sorting data =======");
                $("#privacy").find(".submenu-label").html($("[data-value="+ obj.data("value") + "]").html())

                AMA.models.privacy.sortByKey(args[0], args[1]);
            });
            $(this.$el).find("#privacy_filter").on('change', function() {
                var obj = $(this),
                        oEl = $(o.$el);
                AMA.debug("Clearing search filter on " + o.$el);
                o.appAssistList.removeFilter("batteryOrMemoryUsageRating");
                o.appAssistList.removeFilter("personalInfoAccessRating");
                o.appAssistList.removeFilter("messageAccessRating");
                o.appAssistList.removeFilter("locationAccessRating");

                if(obj.val() !== "all") {
                    AMA.debug("Applying search filter for " + obj.val());

                    o.appAssistList.addFilter(obj.val(), function (item) {
                        return _.some(obj.val(), function (key) {
                            var fieldVal = item[obj.val()];
                            return fieldVal !== null;
                        });
                    });
                }
                $("#privacy").find(".submenu-label").html($("[value="+ obj.val() + "]").html())
                o.appAssistList.refresh();
            });
            $(this.$el).on('click', ".privacy_filter", function() {
                var obj = $(this),
                        oEl = $(o.$el);
                AMA.debug("Clearing search filter on " + o.$el);
                o.appAssistList.removeFilter("batteryOrMemoryUsageRating");
                o.appAssistList.removeFilter("personalInfoAccessRating");
                o.appAssistList.removeFilter("messageAccessRating");
                o.appAssistList.removeFilter("locationAccessRating");

                if(obj.data("value")!== "all") {
                    AMA.debug("Applying search filter for " + obj.data("value"));

                    o.appAssistList.addFilter(obj.data("value"), function (item) {
                        return _.some(obj.data("value"), function (key) {
                            var fieldVal = item[obj.data("value")];
                            return fieldVal !== null;
                        });
                    });
                }
                $("#privacy").find(".submenu-label").html($("[data-value="+ obj.data("value") + "]").html())
                o.appAssistList.refresh();
            });
        },


        search: function() {
            this.appAssistList._onSearchKeyUp(true);
        },

        /**
         * Render the view and the Child Views
         *
         * @override
         * @method render
         */
        render: function () {
            AppAssistTab.__super__.render.apply(this);
            this.appAssistList = new AMA.view.AppAssistListView({
                parent: this,
                el: "#privacy_rowbox",
                data: AMA.models.privacy
            })
                    .plug(AMA.view.plugin.Search, {
                        searchInput: "#privacy_searchinput",
                        searchFields: ["name"]
                    });
            this.appAssistDetails = new AMA.view.AppAssistDetailsView({
                parent: this,
                el: "#privacy_details",
                listView: this.appAssistList,
                dataClass: AMA.model.Privacy
            });
        }
/*        _afterRender: function() {
            if ($("#myelement").css("display").indexOf("block") != -1)
            {
                $("#myelement").hide();
            }
        }*/
    });


})();

/*! AppAssistListView */
(function () {

    AMA.namespace("view");

    var AppAssistListView = AMA.view.AppAssistListView = AMA.view.ListView.extend();

    /**
     * defines the template ID which corresponds to the 'id' property of the template
     * <script> used by this class.
     *
     * @property TEMPLATE_ID
     * @type string
     * @static
     * @final
     */
    AppAssistListView.TEMPLATE_ID = "privacy_list_template";
    /**
     * Applicable only to view classes that fetch the aggregated templates for
     * itself and its child views, this property defines the name of the
     * template file to load. The path is defined in AMA.config.templatePath.
     *
     * @property TEMPLATE_SRC
     * @type string
     * @static
     * @final
     */
    AppAssistListView.TEMPLATE_SRC = "";
    /**
     * CSS classes used in rendering and selecting Items
     * @property  {object} see AMA.view.ListView
     * @type object
     * @static
     * @final
     */
    AppAssistListView.CSS = {
        ITEM: "rt_rowthreat",
        ITEM_STYLE: ["rt_rowlighter", "rt_rowdarker"],   // alternating row styles
        SELECTED_ITEM: "rt_rowindicated"
    };

    _.extend(AppAssistListView.prototype, {
        _processData: function(data) {
            var oEl = $(this.parent.$el);
            var item = {
                appUrl: "",
                batteryOrMemoryUsageRating: "",
                id: "",
                locationAccessRating: "",
                messageAccessRating: "",
                name: "",
                personalInfoAccessRating: "",
                vulnerabilityRating: "",
                vulnerabilityRatingScore: 0
            };

            data.summary = "";

            data.summary += (data.personalInfoAccessRating != null) ?  oEl.find(".personalInfoAccessRating").clone().html('<span class="icon webbycons-addressbook"></span> ' + data.personalInfoAccessRating)[0].outerHTML : '';
            data.summary += (data.locationAccessRating != null) ? oEl.find(".locationAccessRating").clone().html('<span class="icon webbycons-locate"></span> ' + data.locationAccessRating)[0].outerHTML : '';
            data.summary += (data.messageAccessRating != null) ? oEl.find(".messageAccessRating").clone().html('<span class="icon webbycons-mail"></span> ' + data.messageAccessRating)[0].outerHTML : '';
            data.summary += (data.batteryOrMemoryUsageRating != null) ? oEl.find(".batteryOrMemoryUsageRating").clone().html('<span class="icon webbycons-battery"></span> ' + data.batteryOrMemoryUsageRating)[0].outerHTML : '';
            data.summary += (data.summary === "") ? oEl.find(".emptyPrivacyDetails")[0].outerHTML : "";
            data.hasItem = "";
            data.cleanId =  "";
            if(!data.id) {
                data.cleanId = data.id.split("/").join("");
                data.cleanId = data.cleanId.split("+").join("");
                data.hasItem = "hidden";
                _.extend(data, item);
            }

            return data;
        },
        /**
         * Bind Events
         *
         * @override
         * @method _setupEvents
         */
        _setupEvents: function() {
            AppAssistListView.__super__._setupEvents.apply(this, arguments);

            // FIXME: Better to reference this.data instead of assuming specific model
            AMA.models.privacy.once("sort", function() {
                this.refresh();
            }, this);
        }
    });
})();


/*! AppAssistDetailsview */
(function () {

    AMA.namespace("view");

    var AppAssistDetailsView = AMA.view.AppAssistDetailsView = AMA.view.BaseView.extend();

    /**
     * defines the template ID which corresponds to the 'id' property of the template
     * <script> used by this class.
     *
     * @property TEMPLATE_ID
     * @type string
     * @static
     * @final
     */
    AppAssistDetailsView.TEMPLATE_ID = "privacy_details_template";

    /**
     * Applicable only to view classes that fetch the aggregated templates for
     * itself and its child views, this property defines the name of the
     * template file to load. The path is defined in AMA.config.templatePath.
     *
     * @property TEMPLATE_SRC
     * @type string
     * @static
     * @final
     */
    AppAssistDetailsView.TEMPLATE_SRC = "";

    AMA.augment(AppAssistDetailsView.prototype, {

        /**
         * Initialise the view
         *
         * @override
         * @method initialize
         * @param {object} see AMA.view.ListView
         */
        initialize: function () {
            AppAssistDetailsView.__super__.initialize.apply(this, arguments);
            var o = this;
            this.dataDetails = null;
            if (this.options.listView) {
                this.options.listView.on(AMA.view.ListView.EVENT.ITEM_SELECTED, function (data) {
                    if(o.data) {
                        o.data.isFetching = true;
                    }
                    o.$el.addClass('loading_big').html("");
                    o.setData(data);
                    o.dataDetails = data.get("id");
                    o.show();
                });
                this.options.listView.on(AMA.view.ListView.EVENT.SELECTION_CLEARED, function () {
                    o.hide();
                });
            } else {
                AMA.warning("This instance of ContactDetailsView is not linked to a contacts list. Data switching will not apply.");
            }
        },

        /**
         * Process data to return only the _meta key.
         *
         * @override
         * @method _processData
         */
        _processData: function(data) {
            var oEl = $(this.parent.$el);
            var item = {
                    appUrl: "",
                    batteryOrMemoryUsageRating: "",
                    id: "",
                    locationAccessRating: "",
                    messageAccessRating: "",
                    name: "",
                    personalInfoAccessRating: "",
                    vulnerabilityRating: "",
                    vulnerabilityRatingScore: 0
                };

            data.summary = "";

            data.summary += (data.personalInfoAccessRating != null) ?  oEl.find(".personalInfoAccessRating").clone().html('<span class="icon webbycons-addressbook"></span> ' + data.personalInfoAccessRating)[0].outerHTML : '';
            data.summary += (data.locationAccessRating != null) ? oEl.find(".locationAccessRating").clone().html('<span class="icon webbycons-locate"></span> ' + data.locationAccessRating)[0].outerHTML : '';
            data.summary += (data.messageAccessRating != null) ? oEl.find(".messageAccessRating").clone().html('<span class="icon webbycons-mail"></span> ' + data.messageAccessRating)[0].outerHTML : '';
            data.summary += (data.batteryOrMemoryUsageRating != null) ? oEl.find(".batteryOrMemoryUsageRating").clone().html('<span class="icon webbycons-battery"></span> ' + data.batteryOrMemoryUsageRating)[0].outerHTML : '';
            data.summary += (data.summary === "") ? oEl.find(".emptyPrivacyDetails")[0].outerHTML : "";
			data.hasItem = "";
            data.cleanId = "";

			if(!data.id) {
                data.hasItem = "hidden";
                data.cleanId = data.id.split("/").join("");
                data.cleanId = data.cleanId.split("+").join("");
                _.extend(data, item);
            }
			
            return data;
        },
        _beforeRender: function() {
        this.parent.appAssistList.$el.find(".details-sm").addClass("hidden");
        },
        render: function() {
            AppAssistDetailsView.__super__.render.apply(this, arguments);
            if(!this.data) return;
            if(!this.data.toJSON().length) return;
            var currentID = this.data.toJSON()[0].id,
                    cleanId = currentID.split("/").join("");
            cleanId = cleanId.split("+").join("");

            $("#set_details"+cleanId)
                    .html(_.template(this.template, this._processData(this.data.toJSON()[0])))
                    .removeClass("hidden");
        },
        _afterRender: function() {
            this.$el.removeClass('loading_big');
        }
    });


})();


/*! SupportTabView */
(function () {

    AMA.namespace("view");

    var SupportTabView = AMA.view.SupportTabView = AMA.view.BaseView.extend();

    SupportTabView.TEMPLATE_ID = "support_tab_template";
    SupportTabView.TEMPLATE_SRC = "supportTab.tpl";
    SupportTabView.TOOLBAR = {
            DEFAULT : [
                "endpoint",
                "diagnosticScan"
            ],
            IPHONE : [
    			"endpoint",
                "diagnosticScan"
            ]
        };

    AMA.augment(SupportTabView.prototype, {
        render: function () {
        	SupportTabView.__super__.render.apply(this);
        	AMA.debug("<br><br>=========== AMA.view.SupportTabView rendered =================<br><br>");
			
        	this.supportTabResourceView = new AMA.view.SupportTabResourceView({
                el: "#support_tab", //resources_container
                parent: this,
                data: AMA.models.diagnosticScanResourceData
            });
        	
        	this.supportTabAppsListView = new AMA.view.SupportTabAppsListView({
                el: "#hsAppsRowPlaceHolder", //apps list container
                parent: this,
                data: AMA.models.diagnosticScanAppsData
            });
        	
        
		}
	    
		
    });
})();
/*! SupportTabResourceView */
(function () {

	AMA.namespace("view");

	var SupportTabResourceView = AMA.view.SupportTabResourceView = AMA.view.BaseView.extend();

	SupportTabResourceView.TEMPLATE_ID = "support_tab_resources_template";

	SupportTabResourceView.COLOR = {
		high: "green",
		medium: "yellow",
		low: "red"
	};
	
	AMA.augment(SupportTabResourceView.prototype, {
        _initializeDataCss: function(data) {
            if(!data.css) {
                data.css={};
            }
            // initialize css styles to undefined state
            data.css["displayDiagnosticsSuccessful"] = "hide";
            data.css["displayNoData"] = "show";
            data.css["displayPrePS14Snapshot"] = "hide";
            data.css["displayPostPS14Snapshot"] = "hide";

            data.css["batteryRemaining"]="hide";
            data.css["batteryRemainingUndefined"]="show";
            data.css["batteryStatusCharging"]="hide";
            data.css["batteryStatusDischarging"]="hide";
            data.css["batteryStatusFull"]="hide";
            data.css["batteryStatusNotcharging"]="hide";
            data.css["batteryStatusUndefined"]="show";
            data.css["batteryStatusUnknown"]="hide";
            data.css["batteryStatusUnplugged"]="hide";
            data.css["bluetoothFalse"]="hide";
            data.css["bluetoothTrue"]="hide";
            data.css["bluetoothUndefined"]="show";
            data.css["buildVersion"]="hide";
            data.css["buildVersionUndefined"]="show";
            data.css["deviceStorageAvailable"]="hide";
            data.css["deviceStorageAvailableUndefined"]="show";
            data.css["downloadedAppNumber"]="hide";
            data.css["downloadedAppNumberUndefined"]="show";
            data.css["gpsFalse"]="hide";
            data.css["gpsTrue"]="hide";
            data.css["gpsUndefined"]="show";
            data.css["googleLocationServicesFalse"]="hide";
            data.css["googleLocationServicesTrue"]="hide";
            data.css["googleLocationServicesUndefined"]="show";
            data.css["lastBackupDate"]="hide";
            data.css["lastBackupDateUndefined"]="show";
            data.css["listOfBluetoothConnected"]="hide";
            data.css["listOfBluetoothConnectedNone"]="hide";
            data.css["listOfBluetoothConnectedUndefined"]="show";
            data.css["manufacturer"]="hide";
            data.css["manufacturerUndefined"]="show";
            data.css["memoryAvailable"]="hide";
            data.css["memoryAvailableUndefined"]="show";
            data.css["memorySDTotal"]="hide";
            data.css["memorySDTotalUndefined"]="show";
            data.css["SDStorageAvailable"]="hide";
            data.css["SDStorageAvailableUndefined"]="show";
            data.css["memoryFree"]="hide";
            data.css["memoryFreeUndefined"]="show";
            data.css["memoryTotal"]="hide";
            data.css["memoryTotalUndefined"]="show";
            data.css["model"]="hide";
            data.css["modelUndefined"]="show";
            data.css["osVersion"]="hide";
            data.css["osVersionUndefined"]="show";
            data.css["runningAppNumber"]="hide";
            data.css["runningAppNumberUndefined"]="show";
            data.css["screenBrightness"]="hide";
            data.css["screenBrightnessUndefined"]="show";
            data.css["syncedAccountList"]="hide";
            data.css["syncedAccountListNone"]="hide";
            data.css["syncedAccountListUndefined"]="show";
            data.css["syncedAccountNumber"]="hide";
            data.css["timeStamp"]="hide";
            data.css["timeStampUndefined"]="show-inline";
            data.css["totalAppNumber"]="hide";
            data.css["totalAppNumberUndefined"]="show";
            data.css["wifiConnected"]="hide";
            data.css["wifiDisabling"]="hide";
            data.css["wifiEnabling"]="hide";
            data.css["wifiNotConnected"]="hide";
            data.css["wifiOff"]="hide";
            data.css["wifiUndefined"]="show";
            data.css["wifiUnknown"]="hide";

            return data;
        },

        _initializeModelDefaults: function(data) {
            // initialize properties in model, as we're not using Backbone.models.defaults
            if( !data ) {
                data={};
            }
            data.memoryFree=0;
            data.totalAppNumber = 0;
            data.osVersion = "";
            data.deviceStorageAvailable = 0;
            data.memoryTotal = 0;
            data.runningAppNumber = 0;
            data.manufacturer = "";
            data.model = "";
            data.buildVersion = "";
            data.timeStamp = "";
            data.wifi = "";
            data.wifiConnected = "";
            data.bluetooth = "";
            data.totalAppNumber = 0;
            data.listOfBluetoothConnected = "";
            data.gps = "";
            data.googleLocationServices = "";
            data.mobileNetwork = "";
            data.screenBrightness = 0;
            data.batteryRemaining = 0;
            data.batteryStatus = "";
            data.memoryAvailable = 0;
            data.memoryTotal = 0;
            data.memorySDTotal = 0;
            data.memorySDFree = 0;
            data.SDStorageAvailable = 0;
            data.downloadedAppNumber = 0;
            data.lastBackupDate = "";
            data.syncedAccountNumber = 0;
            data.syncedAccountList = "";

            return data;
        },

		_processData: function(data){
			AMA.debug("\n=========== process SupportTabResourceView data =================\n");

			if(data && this.data.models[0]){
                var model=this.data.models[0].attributes;
                this._initializeDataCss(data);

                if( model.memoryFree ) {
                    data.css["memoryFreeUndefined"]="hide";
                    data.css["memoryFree"]="show";
                    data.memoryFree=this.memoryFreeSizeConverter(model.memoryFree);
                }
                else {
                    data.memoryFree=0;
                }

                if( model.totalAppNumber ) {
                    data.css["totalAppNumberUndefined"]="hide";
                    data.css["totalAppNumber"]="show";
                    data.totalAppNumber = model.totalAppNumber;
                }
                else {
                    data.totalAppNumber = 0;
                }

                if( model.osVersion ) {
                    data.css["osVersionUndefined"]="hide";
                    data.css["osVersion"]="show";
                    data.osVersion = model.osVersion;
                }
                else {
                    data.osVersion = "";
                }

                if( model.memoryTotal ) {
                    data.css["memoryTotalUndefined"]="hide";
                    data.css["memoryTotal"]="show";
                    data.css["deviceStorageAvailableUndefined"]="hide";
                    data.css["deviceStorageAvailable"]="show";
                    data.deviceStorageAvailable = Math.floor(100*(model.memoryFree/model.memoryTotal));
                    data.memoryTotal = model.memoryTotal;
                }
                else {
                    data.deviceStorageAvailable = 0;
                    data.memoryTotal = 0;
                }

                if( model.runningAppNumber ) {
                    data.css["runningAppNumberUndefined"]="hide";
                    data.css["runningAppNumber"]="show";
                    data.runningAppNumber = model.runningAppNumber;
                }
                else {
                    data.runningAppNumber = 0;
                }

                if( model.manufacturer ) {
                    data.css["manufacturerUndefined"]="hide";
                    data.css["manufacturer"]="show";
                    data.manufacturer = model.manufacturer;
                }
                else {
                    data.manufacturer = "";
                }

                if( model.model ) {
                    data.css["modelUndefined"]="hide";
                    data.css["model"]="show";
                    data.model = model.model;
                }
                else {
                    data.model = "";
                }

                data.css["displayDiagnosticsSuccessful"] = "show";
                data.css["displayNoData"] = "hide";
                if( model.buildVersion && (model.buildVersion.length>1) ) {
                    data.css["buildVersionUndefined"]="hide";
                    data.css["buildVersion"]="show";
                    data.css["displayPrePS14Snapshot"] = "hide";
                    data.css["displayPostPS14Snapshot"] = "settings_tall";
                    data.buildVersion = model.buildVersion;
                }
                else {
                    data.css["displayPrePS14Snapshot"] = "settings_short";
                    data.css["displayPostPS14Snapshot"] = "hide";
                    data.buildVersion = "";
                }

                if( model.timeStamp ) {
                    data.css["timeStampUndefined"]="hide";
                    data.css["timeStamp"]="show-inline";
                    data.timeStamp = AMA.Util.formatDate(new Date(model.timeStamp), "MMM dd, yyyy hh:mm a Z", false);
                }
                else {
                    data.timeStamp = "";
                }

                if( (model.wifi===null) || (typeof model.wifi==="undefined") || (model.wifi==="UNKNOWN") ) {
                    data.wifi = "";
                    data.wifiConnected = "";
                }
                else {
                    data.css["wifiUndefined"]="hide";
                    data.wifi = model.wifi;
                    data.wifiConnected = model.wifiConnected;
                    if( model.wifiConnected ) {
                        if( model.wifi==="WIFI_STATE_ENABLED" ) {
                            data.css["wifiConnected"]="show";
                        }
                        else {
                            data.css["wifiUnknown"]="show";
                            AMA.warning("SupportTabResourceView: unexpected wifi state:"+model.wifi+" and wifi connected:"+model.wifiConnected);
                        }
                    }
                    else {
                        if( model.wifi==="WIFI_STATE_DISABLED" ) {
                            data.css["wifiOff"]="show";
                        }
                        else if( model.wifi==="WIFI_STATE_DISABLING" ) {
                            data.css["wifiDisabling"]="show";
                        }
                        else if( model.wifi==="WIFI_STATE_ENABLED" ) {
                            data.css["wifiNotConnected"]="show";
                        }
                        else if( model.wifi==="WIFI_STATE_ENABLING" ) {
                            data.css["wifiEnabling"]="show";
                        }
                        else if( model.wifi==="WIFI_STATE_UNKNOWN" ) {
                            data.css["wifiUnknown"]="show";
                        }
                        else {
                            data.css["wifiUnknown"]="show";                          
                            AMA.warning("SupportTabResourceView: unexpected wifi state:"+model.wifi+" and wifi connected:"+model.wifiConnected);
                        }
                    }
                }

                if( (model.bluetooth===null) || (typeof model.bluetooth==="undefined") ) {
                    data.bluetooth = "";
                }
                else {
                    data.css["bluetoothUndefined"]="hide";
                    data.bluetooth = model.bluetooth;
                    if( model.bluetooth ) {
                        data.css["bluetoothFalse"]="hide";
                        data.css["bluetoothTrue"]="show";
                    }
                    else {
                        data.css["bluetoothFalse"]="show";
                        data.css["bluetoothTrue"]="hide";
                    }
                }

                if( model.totalAppNumber ) {
                    data.css["totalAppNumberUndefined"]="hide";
                    data.css["totalAppNumber"]="show";
                    data.totalAppNumber = model.totalAppNumber;
                }
                else {
                    data.totalAppNumber = 0;
                }

                if( model.listOfBluetoothConnected ) {
                    data.css["listOfBluetoothConnectedUndefined"]="hide";
                    if( model.listOfBluetoothConnected.length === 0 ) {
                        data.css["listOfBluetoothConnectedNone"]="show";
                        data.listOfBluetoothConnected = "";
                    }
                    else {
                        data.css["listOfBluetoothConnected"]="show";
                        data.listOfBluetoothConnected = model.listOfBluetoothConnected.join(", ");
                    }
                }
                else {
                    data.listOfBluetoothConnected = "";
                }

                if( (model.gps===null) || (typeof model.gps==="undefined") ) {
                    data.gps = "";
                }
                else {
                    data.css["gpsUndefined"]="hide";
                    data.gps = model.gps;
                    if( model.gps ) {
                        data.css["gpsFalse"]="hide";
                        data.css["gpsTrue"]="show";
                    }
                    else {
                        data.css["gpsFalse"]="show";
                        data.css["gpsTrue"]="hide";
                    }
                }

                if( (model.googleLocationServices===null) || (typeof model.googleLocationServices==="undefined") ) {
                    data.googleLocationServices = "";
                }
                else {
                    data.css["googleLocationServicesUndefined"]="hide";
                    data.googleLocationServices = model.googleLocationServices;
                    if( model.googleLocationServices ) {
                        data.css["googleLocationServicesFalse"]="hide";
                        data.css["googleLocationServicesTrue"]="show";
                    }
                    else {
                        data.css["googleLocationServicesFalse"]="show";
                        data.css["googleLocationServicesTrue"]="hide";
                    }
                }

                if( model.mobileNetwork ) {
                    data.css["mobileNetworkUndefined"]="hide";
                    data.css["mobileNetwork"]="show";
                    data.mobileNetwork = model.mobileNetwork;
                }
                else {
                    data.mobileNetwork = "";
                }

                if( model.screenBrightness ) {
                    data.css["screenBrightnessUndefined"]="hide";
                    data.css["screenBrightness"]="show";
                    data.screenBrightness = model.screenBrightness;
                }
                else {
                    data.screenBrightness = 0;
                }

                if( model.batteryRemaining ) {
                    data.css["batteryRemainingUndefined"]="hide";
                    data.css["batteryRemaining"]="show";
                    data.batteryRemaining = model.batteryRemaining;
                }
                else {
                    data.batteryRemaining = 0;
                }

                if( model.batteryStatus ) {
                    data.css["batteryStatusUndefined"]="hide";
                    data.batteryStatus = model.batteryStatus;
                    if( model.batteryStatus === "BATTERY_STATUS_UNKNOWN") {
                        data.css["batteryStatusUnknown"]="show";
                    }
                    else if( model.batteryStatus === "BATTERY_STATUS_CHARGING" ) {
                        data.css["batteryStatusCharging"]="show";
                    }
                    else if( model.batteryStatus === "BATTERY_STATUS_DISCHARGING" ) {
                        data.css["batteryStatusDischarging"]="show";
                    }
                    else if( model.batteryStatus === "BATTERY_STATUS_FULL" ) {
                        data.css["batteryStatusFull"]="show";
                    }
                    else if( model.batteryStatus === "BATTERY_STATUS_NOTCHARGING" ) {
                        data.css["batteryStatusNotcharging"]="show";
                    }
                    else if( model.batteryStatus === "BATTERY_STATUS_UNPLUGGED" ) {
                        data.css["batteryStatusUnplugged"]="show";
                    }
                    else {
                        data.css["batteryStatusUnknown"]="show";
                    }
                }
                else {
                    data.batteryStatus = "";
                }

                if( model.memoryAvailable ) {
                    data.css["memoryAvailableUndefined"]="hide";
                    data.css["memoryAvailable"]="show";
                    data.memoryAvailable = model.memoryAvailable;
                }
                else {
                    data.memoryAvailable = 0;
                }

                if( model.memorySDTotal ) {
                    data.css["memorySDTotalUndefined"]="hide";
                    data.css["SDStorageAvailableUndefined"]="hide";
                    data.css["memorySDTotal"]="show";
                    data.css["SDStorageAvailable"]="show";
                    data.memoryAvailable = model.memoryAvailable;
                    data.SDStorageAvailable = Math.floor(100*(model.memorySDFree/model.memorySDTotal));
                }
                else {
                    data.memorySDTotal = 0;
                    data.SDStorageAvailable = 0;
                }

                if( model.downloadedAppNumber ) {
                    data.css["downloadedAppNumberUndefined"]="hide";
                    data.css["downloadedAppNumber"]="show";
                    data.downloadedAppNumber = model.downloadedAppNumber;
                }
                else {
                    data.downloadedAppNumber = 0;
                }

                if( model.lastBackupDate ) {
                    data.css["lastBackupDateUndefined"]="hide";
                    data.css["lastBackupDate"]="show";
                    data.lastBackupDate = AMA.Util.formatDate(new Date(model.lastBackupDate), "MMM dd, yyyy hh:mm a Z", false);
                }
                else {
                    data.lastBackupDate = "";
                }

                // only show number of synced accounts span if number greater than 3
                if( (model.syncedAccountNumber) && (model.syncedAccountNumber > 3) ) {
                    data.css["syncedAccountNumber"]="show";
                    data.syncedAccountNumber = model.syncedAccountNumber;
                }
                else {
                    data.syncedAccountNumber = 0;
                }

                if( model.syncedAccountList ) {
                    data.css["syncedAccountListUndefined"]="hide";
                    if( model.syncedAccountList.length === 0 ) {
                        data.css["syncedAccountListNone"]="show";
                        data.syncedAccountList = "";
                    }
                    else {
                        data.css["syncedAccountList"]="show";
                        data.syncedAccountList = model.syncedAccountList.join(", ");
                    }
                }
                else {
                    data.syncedAccountList = "";
                }

			}
            else{
				AMA.debug("SupportTabResourceView - _processData: No data model object");
                // SETTINGS SNAPSHOT shows no data
                data={};
                this._initializeModelDefaults(data);
                this._initializeDataCss(data);
			}

			return data;
		},
		render: function () {
            SupportTabResourceView.__super__.render.apply(this);
			if((this.data.attributes.total>0) && this.data.models[0]){
                var model=this.data.models[0].attributes;
	
				this.memoryFreeSizeConverter(model.memoryFree);
				this.sdMemoryFreeSizeConverter(model.memorySDFree);
	
				this.updateUIBatteryLevel(model.batteryLevel);
				this.updateUIStorageAvailable(model);
				this.updateUIDeviceSpeed(model.deviceSpeed);
				this.updateUIHealthScanDate();
				this.setHealthScanDetails(model);
			}
            AMA.debug("\n=========== AMA.view.SupportTabResourceView rendered =================\n");
		},
		/*_afterRender: function(){
			this.updateUIHealthScanDate();
			this.setHealthScanDetails(this.data.models[0].attributes);
		},*/
		memoryFreeSizeConverter: function(memoryFree) {
			var memoryFreeSize;
			var memoryUnit = "giga";
			var unitChangeAmount = 1024 * 1024 * 1024;
			
			if (memoryFree >= unitChangeAmount)  //in GB Size
			{
				memoryFreeSize = (memoryFree / unitChangeAmount).toFixed(1);
			}
			else  //in MB size
			{
				memoryFreeSize = (memoryFree / (1024 * 1024)).toFixed(1);
				memoryUnit = "mega";
			} 
			
			AMA.Util.switchLabel(".device_storage_number", "." + memoryUnit, this.$el);
			this.$el.find("#device_storage_number").html(memoryFreeSize);
		},
		sdMemoryFreeSizeConverter: function(SDmemoryFree) {
			var SDmemoryFreeSize;
			var memoryUnit = "giga";
			var unitChangeAmount = 1024 * 1024 * 1024;
			
			if (SDmemoryFree >= unitChangeAmount)  //in GB Size
			{
				SDmemoryFreeSize = (SDmemoryFree / unitChangeAmount).toFixed(1);
			}
			else  //in MB size
			{
				SDmemoryFreeSize = (SDmemoryFree / (1024 * 1024)).toFixed(1);
				memoryUnit = "mega";
			}
			AMA.Util.switchLabel(".storage_available_number", "." + memoryUnit, this.$el);
			this.$el.find("#sd_storage_available_number").html(SDmemoryFreeSize);
		},
		updateUIBatteryLevel: function(batteryLevel){			
			this.$el.find("#hsps_battery_level_icon").attr('src', 'img/' + SupportTabResourceView.COLOR[batteryLevel.toLowerCase()] + '_dot.png');
			AMA.Util.switchLabel(".battery_value", "." + batteryLevel.toLowerCase(), this.$el);
		},
		updateUIStorageAvailable: function(resourceData){
			var memoryTotal = resourceData.memoryTotal; 
	        var memoryFree = resourceData.memoryFree; 
	        var SDmemoryTotal = resourceData.memorySDTotal; 
	        var SDmemoryFree = resourceData.memorySDFree; 
	        var storagePercent = Math.round((memoryFree + SDmemoryFree) / (memoryTotal + SDmemoryTotal) * 100);
	        var storageLevel = "medium";
			if (storagePercent <= 20) {
	           storageLevel = "low";
	        }
	        else if (storagePercent > 60)
	        {
				storageLevel = "high"
	        }
			
			this.$el.find("#hsps_available_storage_icon").attr('src', 'img/' + SupportTabResourceView.COLOR[storageLevel.toLowerCase()] + '_dot.png');
			AMA.Util.switchLabel(".available_storage_value", "." + storageLevel.toLowerCase(), this.$el);
		},
		updateUIDeviceSpeed: function(deviceSpeed){
			this.$el.find("#hsps_device_performance_icon").attr('src', 'img/' + SupportTabResourceView.COLOR[deviceSpeed.toLowerCase()] + '_dot.png');
			AMA.Util.switchLabel(".device_performance_value", "." + deviceSpeed.toLowerCase(), this.$el);
		},
    	updateUIHealthScanDate: function(){
    		if(AMA.models.diagnosticScanResourceData.healthScanDate){
    			var healthScanTime = AMA.models.diagnosticScanResourceData.healthScanDate; 
    			var localDate = new Date();
    			healthScanTime = healthScanTime - (localDate.getTimezoneOffset() * 60000);
    			var healthScanDate = AMA.Util.dateFormat(healthScanTime) + " " + AMA.Util.timeFormat(healthScanTime);
    			$(".healthscan_date").html(healthScanDate);
    		}else{
				$(".healthscan_date").html("");
			}
    	},
    	setHealthScanDetails: function(resourceData)
        {
			this.updateUIBatteryLevel(resourceData.batteryLevel);
            this.updateUIStorageAvailable(resourceData);
			this.updateUIDeviceSpeed(resourceData.deviceSpeed);
        },
        events: {
        	"click #hsap_app_name": "hsap_app_name",
        	"click #hsap_last_used": "hsap_last_used",
        	"click #hsap_battery": "hsap_battery",
        	"click #hsap_memory": "hsap_memory",
        	"click #hsap_storage": "hsap_storage"
        },
        hsap_app_name: function(){ 
        	this.handleAppsTableSort("hsap_app_name"); 
        },
        hsap_last_used: function(){ 
        	this.handleAppsTableSort("hsap_last_used"); 
        },
        hsap_battery: function(){ 
        	this.handleAppsTableSort("hsap_battery"); 
        },
        hsap_memory: function(){ 
        	this.handleAppsTableSort("hsap_memory"); 
        },
        hsap_storage: function(){ 
        	this.handleAppsTableSort("hsap_storage"); 
        },
        handleAppsTableSort: function(sortColumnId)
        {
            j_sortColumnId = "#" + sortColumnId;
            var current_class_name = $(j_sortColumnId).attr('class');
            switch (sortColumnId) {
                case "hsap_app_name":  //sort for appname
                    if ((current_class_name == 'app_performance_app_name_header') || (current_class_name == 'app_performance_app_name_header_down'))
                    {
                        $(j_sortColumnId).attr('class', 'app_performance_app_name_header_up');
                        appsDisplayDataTable.fnSort([[5, 'asc']]);
                    }
                    else
                    {
                        $(j_sortColumnId).attr('class', 'app_performance_app_name_header_down');
                        appsDisplayDataTable.fnSort([[5, 'desc']]);
                    }
                    $("#hsap_last_used").attr('class', 'app_performance_last_used_header');
                    $("#hsap_battery").attr('class', 'app_performance_battery_header');
                    $("#hsap_memory").attr('class', 'app_performance_memory_header');
                    $("#hsap_storage").attr('class', 'app_performance_storage_header');
                    break;
                case "hsap_last_used":  //sort for last used
                    if (current_class_name == 'app_performance_last_used_header_down')
                    {
                        $(j_sortColumnId).attr('class', 'app_performance_last_used_header_up');
                        appsDisplayDataTable.fnSort([[6, 'asc'], [5, 'asc']]);
                    }
                    else
                    {
                        $(j_sortColumnId).attr('class', 'app_performance_last_used_header_down');
                        appsDisplayDataTable.fnSort([[6, 'desc'], [5, 'asc']]);
                    }
                    $("#hsap_app_name").attr('class', 'app_performance_app_name_header');
                    $("#hsap_battery").attr('class', 'app_performance_battery_header');
                    $("#hsap_memory").attr('class', 'app_performance_memory_header');
                    $("#hsap_storage").attr('class', 'app_performance_storage_header');
                    break;
                case "hsap_battery":  //sort for battery usage
                    if (current_class_name == 'app_performance_battery_header_down')
                    {
                        $(j_sortColumnId).attr('class', 'app_performance_battery_header_up');
                        appsDisplayDataTable.fnSort([[7, 'asc'], [5, 'asc']]);
                    }
                    else
                    {
                        $(j_sortColumnId).attr('class', 'app_performance_battery_header_down');
                        appsDisplayDataTable.fnSort([[7, 'desc'], [5, 'asc']]);
                    }
                    $("#hsap_app_name").attr('class', 'app_performance_app_name_header');
                    $("#hsap_last_used").attr('class', 'app_performance_last_used_header');
                    $("#hsap_memory").attr('class', 'app_performance_memory_header');
                    $("#hsap_storage").attr('class', 'app_performance_storage_header');
                    break;
                case "hsap_memory":  //sort for memory usage
                    if (current_class_name == 'app_performance_memory_header_down')
                    {
                        $(j_sortColumnId).attr('class', 'app_performance_memory_header_up');
                        appsDisplayDataTable.fnSort([[8, 'asc'], [5, 'asc']]);
                    }
                    else
                    {
                        $(j_sortColumnId).attr('class', 'app_performance_memory_header_down');
                        appsDisplayDataTable.fnSort([[8, 'desc'], [5, 'asc']]);
                    }
                    $("#hsap_app_name").attr('class', 'app_performance_app_name_header');
                    $("#hsap_last_used").attr('class', 'app_performance_last_used_header');
                    $("#hsap_battery").attr('class', 'app_performance_battery_header');
                    $("#hsap_storage").attr('class', 'app_performance_storage_header');
                    break;
                case "hsap_storage": //sort for storage usage
                    if (current_class_name == 'app_performance_storage_header_down')
                    {
                        $(j_sortColumnId).attr('class', 'app_performance_storage_header_up');
                        appsDisplayDataTable.fnSort([[9, 'asc'], [5, 'asc']]);
                    }
                    else
                    {
                        $(j_sortColumnId).attr('class', 'app_performance_storage_header_down');
                        appsDisplayDataTable.fnSort([[9, 'desc'], [5, 'asc']]);
                    }
                    $("#hsap_app_name").attr('class', 'app_performance_app_name_header');
                    $("#hsap_last_used").attr('class', 'app_performance_last_used_header');
                    $("#hsap_battery").attr('class', 'app_performance_battery_header');
                    $("#hsap_memory").attr('class', 'app_performance_memory_header');
                    break;
            }

            appsDisplayDataTable.fnDraw();
        }
    	


	});
})();
/*! SupportTabAppsListView */
(function () {

    AMA.namespace("view");

    var SupportTabAppsListView = AMA.view.SupportTabAppsListView = AMA.view.BaseView.extend(); //AMA.view.ListView.extend(); 
    
    SupportTabAppsListView.TEMPLATE_ID = "appRowTemplate"; 
    
    /*SupportTabAppsListView.CSS = {
            ITEM: "rt_row",
            ITEM_STYLE: ["odd", "even"]   // alternating row styles
        };*/

    AMA.augment(SupportTabAppsListView.prototype, {
    	initialize: function(){
    		SupportTabAppsListView.__super__.initialize.apply(this, arguments);
    	},
    	render: function () {
    		//SupportTabAppsListView.__super__.render.apply(this, arguments);
        	AMA.debug("\n=========== AMA.view.SupportTabAppsListView rendered =================\n");
			
        	//var content = "";
			var runningAppsCounter = 0;
			// var oddEvenAlternator = "odd";	
        	var appCollection = this.data.models;
			
			_.each(appCollection, function(e, i) {
				if(appCollection[i].attributes.status == "STATUS_RUNNING") {
                    runningAppsCounter++;
                }
            }, this);
            // _.each(appCollection, function(e, i) {

				// if(appCollection[i].attributes.updateDate <= 0){
					// appCollection[i].attributes.lastUsed = "N/A";
                // } else if(appCollection[i].attributes.status == "STATUS_RUNNING"){
                	// appCollection[i].attributes.lastUsed = "Currently Running";
                    // runningAppsCounter++;
                // }else{
                	// appCollection[i].attributes.lastUsed = "TBD - LAST USED";
                // }
				
				// switch(oddEvenAlternator){
	                // case "odd":
	                	// appCollection[i].attributes.oddEvenAlternator = "even";
	                    // oddEvenAlternator = "even";
	                    // break;
	                // default:
	                	// appCollection[i].attributes.oddEvenAlternator = "odd";
	                    // oddEvenAlternator = "odd";
	                    // break;
				// }	
				
				// content += _.template(this.template, appCollection[i].attributes);

            // }, this);
            
			//$('#hsAppsRowPlaceHolder').append(content);
			$("#hsps_total_app_number").html(appCollection.length);
			$("#hsps_current_app_running").html(runningAppsCounter);
			
			this.setHealthScanAppPerformance(this.data.models);
        	
		},
	   
		
		_processData: function(data){
    		AMA.debug("\n=========== process SupportTabAppsListView data =================\n");
			return data;
    	},
    	
		// FIXME: Refactor this page for better localization, more flexiblity and better maintainability
		setHealthScanAppPerformance: function(appsData) {
			var appsPerformanceDataSet = [];
			_.each(appsData, function(el, index, list) {
				var appRecord = el.toJSON();
				var appName = appRecord.name;
				
				// appName
				var $appNameHtml = $("#appNameCell table").clone();
				$appNameHtml.find("td:eq(0)").text(appName);
				if (!appRecord.isSystemApp) {
					$appNameHtml.find("td:eq(1)").hide();
				}
				
				var appNameHtml = $appNameHtml.prop("outerHTML");
				
				var appBatteryUsage = appRecord.batteryPercentage 
                var appMemoryUsage = appRecord.memoryPercentage; 
				var appStorageUsage = appRecord.storagePercentage ? appRecord.storagePercentage : 0;
				var appLastUsed = (new Date()).getTime();
				
				// appStatus
				var $appStatusCell = $("#appStatusCell").clone();
				
				if (appRecord.status === "STATUS_RUNNING") {
                    appLastUsedHtml = $appStatusCell.find(".running").prop("outerHTML");;
                }
                else {
                    appLastUsed = AMA.Util.dateFormat(appRecord.updateDate);
					appLastUsedHtml = $appStatusCell.find(".notApplicable").prop("outerHTML");; 
					if(appLastUsed) {
						appLastUsedHtml = $appStatusCell.find(".date").text(appLastUsed).prop("outerHTML");; 
					}
                }
				
				// appBatteryUsage
				var $appBatteryUsageHtml = $("#appBatteryUsageCell").clone();
				var battLevel = appRecord.batteryRating === "LOW" ? "low" : 
									appRecord.batteryRating === "HIGH" ? "high" : "med";
				AMA.Util.switchLabel(".batteryLevel", "." + battLevel, $appBatteryUsageHtml);
				var appBatteryUsageHtml = $appBatteryUsageHtml.prop("outerHTML");
				
				// appMemoryUsage
				var $appMemoryUsageHtml = $("#appMemoryUsageCell").clone();
				var hasRating = appRecord.memoryRating ? "rated" : "none";
				AMA.Util.switchLabel(".memoryRating", "." + hasRating, $appMemoryUsageHtml);
				
				if(appRecord.memoryRating) {
					var memoryRating = appRecord.memoryRating === "LOW" ? "low" : 
									appRecord.memoryRating === "HIGH" ? "high" : "med";
					AMA.Util.switchLabel(".memoryRate", "." + memoryRating, $appMemoryUsageHtml);
				} 
				
				var appMemoryUsageHtml = $appMemoryUsageHtml.prop("outerHTML");
				
				// appStorageUse
				var $appStorageUsageHtml = $("#appStorageUsageCell").clone();
				var storageRating = appRecord.storageRating === "LOW" ? "low" : 
									appRecord.storageRating === "HIGH" ? "high" : "med";
				AMA.Util.switchLabel(".storageRating", "." + storageRating, $appStorageUsageHtml);
				
				var storageType = appRecord.isSystemApp ? "device" : "card";
				AMA.Util.switchLabel(".storageType", "." + storageType, $appStorageUsageHtml);
				
				var appStorageUsageHtml = $appStorageUsageHtml.prop("outerHTML");
				
				appsPerformanceDataSet.push([appNameHtml, appLastUsedHtml, appBatteryUsageHtml, appMemoryUsageHtml, appStorageUsageHtml, appName, appLastUsed, appBatteryUsage, appMemoryUsage, appStorageUsage]);
				
			});
			
            var appsPerformanceColumns = [
                {"sWidth": "229px", "sTitle": $("#appColumns #hsap_app_name").prop("outerHTML"), "bSortable": false},
                {"sWidth": "120px", "sTitle": $("#appColumns #hsap_last_used").prop("outerHTML"), "bSortable": false},
                {"sWidth": "98px", "sTitle": $("#appColumns #hsap_battery").prop("outerHTML"), "bSortable": false},
                {"sWidth": "101px", "sTitle": $("#appColumns #hsap_memory").prop("outerHTML"), "bSortable": false},
                {"sWidth": "113px", "sTitle": $("#appColumns #hsap_storage").prop("outerHTML"), "bSortable": false},
                {"bVisible": false},
                {"bVisible": false},
                {"bVisible": false},
                {"bVisible": false},
                {"bVisible": false}
            ];

            $(document).ready(function() {
                $('#healthscan_apps_performance_section').html('<table cellpadding="0" cellspacing="0" border="0" class="my_display" id="apps_performance_table" ></table>');
                appsDisplayDataTable = $('#apps_performance_table').dataTable({
                    "sScrollY": "246px",
                    "sScrollX": "673px",
                    "bPaginate": false,
                    "bScrollCollapse": true,
                    "bLengthChange": false,
                    "bInfo": false,
                    "bFilter": false,
                    "bAutoWidth": false,
                    "bDeferRender": true,
                    "aaData": appsPerformanceDataSet,
                    "aaSorting": [[7, "desc"], [5, "asc"]],
                    "aoColumns": appsPerformanceColumns,
                    "sDom": '<"top">rt<"bottom"><"clear">'
                });
            });
			
            $(".dataTables_scrollBody").css("overflow-x", "hidden");
		}
		
		
    	// _setHealthScanAppPerformance: function(appsData)
        // {
			// var appsPerformanceDataSet = [];
            // var appRecord, appName, appBatteryUsage, appMemoryUsage, appStorageUsage, appLastUsed;
            // var appNameHtml, appBatteryUsageHtml, appMemoryUsageHtml, appStorageUsageHtml, appLastUsedHtml;
            // var current_time = (new Date()).getTime();
            
            // for (var j = 0; j < appsData.length; j++)  
            // {
                // appRecord = appsData[j].attributes;
                // appName = appRecord.name;
                // appNameHtml = "<table cellpadding='0' cellspacing='0' border='0'>";
                // appNameHtml = appNameHtml + "<tr><td align='left' style='padding-left:13px;font-weight:bold;border: none;word-break:break-all'>" + appName + "</td></tr>";
                // if (appRecord.isSystemApp)
                // {
                    // appNameHtml += "<tr><td align='left' style='padding-left:13px;font-color:#666666;border: none;'>(System App)</td></tr>";
                // }
                // appNameHtml += "</table>";
                // appBatteryUsage = appRecord.batteryPercentage 
                // appMemoryUsage = appRecord.memoryPercentage; 

                // if (appRecord.storagePercentage == null) 
                    // appStorageUsage = 0;
                // else
                    // appStorageUsage = appRecord.storagePercentage 
                
                // if (appRecord.status == "STATUS_RUNNING") 
                // {
                    // appLastUsed = current_time;
                    // appLastUsedHtml = "<div style='text-align: center;'>Currently Running</div>";
                // }
                // else
                // {
                    // appLastUsed = AMA.Util.dateFormat(appRecord.updateDate);
                    // appLastUsedHtml = "<div style='text-align: center;'>" + (appLastUsed || " N/A") + "</div>"; 
                // }

                // appBatteryUsageHtml = "<table cellpadding='0' cellspacing='0' border='0'>";
                // if (appsData[j].attributes.batteryRating == "LOW") 
                // {
                    // appBatteryUsageHtml += "<tr><td width='98px' align='center' style='border: none;'><img src='img/green_dot.png' ><span  style='padding-left:8px;padding-bottom:5px'>Low&nbsp;</span></td></tr>";

                // }
                // else if (appsData[j].attributes.batteryRating == "HIGH") 
                // {
                    // appBatteryUsageHtml += "<tr><td width='98px' align='center' style='border: none;'><img src='img/red_dot.png' ><span  style='padding-left:8px;padding-bottom:5px'>High</span></td></tr>";
                // }
                // else
                // {
                    // appBatteryUsageHtml += "<tr><td width='98px' align='center' style='border: none;'><img src='img/yellow_dot.png' ><span  style='padding-left:8px;padding-bottom:5px'>Med.</span></td></tr>";
                // }
                // appBatteryUsageHtml += "<tr><td width='98px' align='center' style='border: none;'>Battery Usage</td></tr>";
                // appBatteryUsageHtml += "</table>";
                
                // if (appsData[j].attributes.memoryRating == null)  
                // {
                    // appMemoryUsageHtml = "<div style='text-align: center;'>N/A</div>";
                // }
                // else
                // {
                    // appMemoryUsageHtml = "<table cellpadding='0' cellspacing='0' border='0'>";
                    // if (appsData[j].attributes.memoryRating == "LOW") 
                    // {
                        // appMemoryUsageHtml += "<tr><td width='101px' align='center' style='border: none;'><img src='img/green_dot.png' ><span  style='padding-left:8px;padding-bottom:5px'>Low&nbsp;</span></td></tr>";
                    // }
                    // else if (appsData[j].attributes.memoryRating == "HIGH")
                    // {
                        // appMemoryUsageHtml += "<tr><td width='101px' align='center' style='border: none;'><img src='img/red_dot.png' ><span  style='padding-left:8px;padding-bottom:5px'>High</span></td></tr>";
                    // }
                    // else
                    // {
                        // appMemoryUsageHtml += "<tr><td width='101px' align='center' style='border: none;'><img src='img/yellow_dot.png' ><span  style='padding-left:8px;padding-bottom:5px'>Med.</span></td></tr>";
                    // }
                    // appMemoryUsageHtml += "<tr><td width='101px' align='center' style='border: none;'>Memory Usage</td></tr>";
                    // appMemoryUsageHtml += "</table>";
                // }

                // appStorageUsageHtml = "<table cellpadding='0' cellspacing='0' border='0'>";
                // if (appsData[j].attributes.storageRating == "LOW") 
                // {
                    // appStorageUsageHtml += "<tr><td width='93px' align='center' style='border: none;'><img src='img/green_dot.png' ><span  style='padding-left:8px;padding-bottom:5px'>Low&nbsp;</span></td></tr>";
                    // if (appRecord.isSystemApp)
                    // {
                        // appStorageUsageHtml += "<tr><td width='93px' align='center' align='center' style='border: none;'>Device Storage</td></tr>";
                    // }
                    // else
                    // {
                        // appStorageUsageHtml += "<tr><td width='93px' align='center' style='border: none;'>Card Storage</td></tr>";
                    // }
                // }
                // else if (appsData[j].attributes.storageRating == "HIGH")
                // {
                    // appStorageUsageHtml += "<tr><td width='93px' align='center' style='border: none;'><img src='img/red_dot.png' ><span  style='padding-left:8px;padding-bottom:5px'>High</span></td></tr>";

                    // if (appRecord.isSystemApp) 
                    // {
                        // appStorageUsageHtml += "<tr><td width='93px' align='center' style='border: none;'>Device Storage</td></tr>";
                    // }
                    // else
                    // {
                        // appStorageUsageHtml += "<tr><td width='93px' align='center' style='border: none;'>Card Storage</td></tr>";
                    // }
                // }
                // else
                // {
                    // appStorageUsageHtml += "<tr><td width='93px' align='center' style='border: none;'><img src='img/yellow_dot.png' ><span  style='padding-left:8px;padding-bottom:5px'>Med.</span></td></tr>";

                    // if (appRecord.isSystemApp) 
                    // {
                        // appStorageUsageHtml += "<tr><td width='93px' align='center' style='border: none;'>Device Storage</td></tr>";
                    // }
                    // else
                    // {
                        // appStorageUsageHtml += "<tr><td width='93px' align='center' style='border: none;'>Card Storage</td></tr>";
                    // }
                // }
                // appStorageUsageHtml += "</table>";
                
                // appsPerformanceDataSet[j] = [appNameHtml, appLastUsedHtml, appBatteryUsageHtml, appMemoryUsageHtml, appStorageUsageHtml, appName, appLastUsed, appBatteryUsage, appMemoryUsage, appStorageUsage];

            // }
            
            // // FIXME: need to replace this framework with one that allows for text content in the HTML template rather than inlined in JS code
            // var appsPerformanceColumns = [
                // {"sWidth": "229px", "sTitle": "<div id='hsap_app_name'  class='app_performance_app_name_header'><span class='appNameSpan'>App Name</span></div>", "bSortable": false},
                // {"sWidth": "120px", "sTitle": "<div id='hsap_last_used' class='app_performance_last_used_header'><span class='lastUsedSpan'>Last Used</span></div>", "bSortable": false},
                // {"sWidth": "98px", "sTitle": "<div id='hsap_battery' class='app_performance_battery_header_down'><span class='batterySpan'>Battery</span></div>", "bSortable": false},
                // {"sWidth": "101px", "sTitle": "<div id='hsap_memory' class='app_performance_memory_header'><span class='memorySpan'>Memory</span></div>", "bSortable": false},
                // {"sWidth": "113px", "sTitle": "<div id='hsap_storage' class='app_performance_storage_header'><span class='storageSpan'>Storage</span></div>", "bSortable": false},
                // {"bVisible": false},
                // {"bVisible": false},
                // {"bVisible": false},
                // {"bVisible": false},
                // {"bVisible": false}
            // ];
            // // Create DataTables for display

            // $(document).ready(function() {  // All Apps
                // $('#healthscan_apps_performance_section').html('<table cellpadding="0" cellspacing="0" border="0" class="my_display" id="apps_performance_table" ></table>');
                // appsDisplayDataTable = $('#apps_performance_table').dataTable({
                    // "sScrollY": "246px",
                    // "sScrollX": "673px",
                    // "bPaginate": false,
                    // "bScrollCollapse": true,
                    // "bLengthChange": false,
                    // "bInfo": false,
                    // "bFilter": false,
                    // "bAutoWidth": false,
                    // "bDeferRender": true,
                    // "aaData": appsPerformanceDataSet,
                    // "aaSorting": [[7, "desc"], [5, "asc"]],
                    // "aoColumns": appsPerformanceColumns,
                    // "sDom": '<"top">rt<"bottom"><"clear">'
                // });
            // });
            // $(".dataTables_scrollBody").css("overflow-x", "hidden");
        // }

    });
})();
/*! SafeBrowsingView */
(function () {

    AMA.namespace("view");

    var SafeBrowsingView = AMA.view.SafeBrowsingView = AMA.view.BaseView.extend();

    SafeBrowsingView.TEMPLATE_ID = "safe_browsing_tab_template";
    SafeBrowsingView.TEMPLATE_SRC = "";

    AMA.augment(SafeBrowsingView.prototype, {
    
        render: function () {            
        
            SafeBrowsingView.__super__.render.apply(this);
            AMA.debug('AMA.view.SafeBrowsingView rendered');
            
            var data = this.data.models[0];
            var safeBrowsingEnabled = data.get("safeBrowsingEnabled");        

        },        
        _processData: function(item) {

            var active = (!item.safeBrowsingEnabled),
                inactive = (item.safeBrowsingEnabled),
                data = {
                    on:active ? "active" : "",
                    off:inactive ? "active" : "",
                    onChecked: active ? "checked" : "",
                    offChecked: inactive ? "checked" : "",
                }
            return data;
        },
        _setupEvents: function() {
            var o = this;
            $(this.$el).find(".btnSafeBrowsingSave").on('click', function() {
                
                var data = o.data.models[0];
                var safeBrowsingEnabled = ""+data.get("safeBrowsingEnabled");
                
                if(safeBrowsingEnabled !== $(o.$el).find('input[name="safeBrowsing"]:checked').val()) {
                    o.saveSetting();
                }else {
                    $(o.$el).find('.btnSafeBrowsingSaveMsg').html(AMA.config.legacyRecordTypes.ACCOUNT_SETTINGS.messages.noChanges);
                    return;
                }
                
            });
            /*$(this.$el).find(".safebrowsing_settings_value").on('click', function() {
                AMA.page.openSettings("security");
            });*/
            $(this.$el).find(".editSetting").on('click', function() {
                AMA.page.openSettings("security");
            });
        },
        
        saveSetting: function() { 
            
            AMA.page.standardDialogs.loading("");

            var safeBrowsingEnabled = ("true"===$(this.el).find('input[name="safeBrowsing"]:checked').val());
            
            this.data.models[0].set({
                safeBrowsingEnabled: safeBrowsingEnabled
            });

            var options = {
                    url: this.data.url,
                    success: this.saveSuccess, 
                    error: this.saveError,
                    callback: this.successOrFailure,
                    data: JSON.stringify(this.data.models[0].attributes)
            };

            this.data.sync("update", this.data.models[0], options); 
        
        },
        
        saveSuccess: function() {
            AMA.page.standardDialogs.hideloading();            
            $('.btnSafeBrowsingSaveMsg').html(AMA.config.legacyRecordTypes.ACCOUNT_SETTINGS.messages.settingsSaved);
        },
        
        saveError: function() {
            AMA.page.standardDialogs.hideloading();
            AMA.page.standardDialogs.error("Unable To Contact services");
            AMA.debug("Ajax completed with errors");
        },
        
        successOrFailure: function(isSuccess) {
            AMA.page.standardDialogs.hideloading();
            if(isSuccess) {
                $('.btnSafeBrowsingSaveMsg').html(AMA.config.legacyRecordTypes.ACCOUNT_SETTINGS.messages.settingsSaved);
            }
            else {
                AMA.page.standardDialogs.error("Unable To Contact services");
                AMA.debug("Ajax completed with errors");
            }
        }
        
    });
})();
