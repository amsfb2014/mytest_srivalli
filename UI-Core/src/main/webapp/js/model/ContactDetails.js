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
