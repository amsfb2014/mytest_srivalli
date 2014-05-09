var initPrettyPhoto = function () {
	$("div[rel^='prettyPhoto']").prettyPhoto({
		show_title: false,
		social_tools:false,
		opacity: 0.5,
		horizontal_padding:0
 	});
};

var IDLE_TIMEOUT = 15;   // Idle timeout in minutes

$(document).ready(function() {
	
	if(!AMA.config.authToken || !AMA.config.endpointId) {
        var pageHash = (window.location.hash.split("#")[1] || window.location.hash);
        AMA.Util.setCookie("lastVisited", pageHash, 1);
		document.location = "index.html";
		return;
	}

	var Capabilities = AMA.models.capabilities = new AMA.model.Capabilities();
    Capabilities.fetch();
    Capabilities.once(AMA.model.BaseData.EVENT.LOADED, function () {

        AMA.models.contacts = new AMA.model.Contacts();
        AMA.models.contactDetails = new AMA.model.ContactDetails();
        AMA.models.photos = new AMA.model.Photos();
        AMA.models.videos = new AMA.model.Videos();
        AMA.models.trash = new AMA.model.Trash();
        AMA.models.endpoints = new AMA.model.Endpoints();
        AMA.models.syncsettings = new AMA.model.SyncSettings();
        AMA.models.locatesettings = new AMA.model.LocateSettings();
        AMA.models.devicesettings = new AMA.model.DeviceSettings();
		AMA.models.locksettings = new AMA.model.DeviceSettings();
        AMA.models.locations = new AMA.model.Locations();
        AMA.models.dashboardData = new AMA.model.DashboardData();
        AMA.models.storageInfo = new AMA.model.StorageInfo();
        AMA.models.syncHistory = new AMA.model.SyncHistory();
        AMA.models.endpointHistory = new AMA.model.EndpointHistory();
        AMA.models.threats = new AMA.model.Threats();  
        AMA.models.scansettings = new AMA.model.ScanSettings();
        AMA.models.privacy = new AMA.model.Privacy();
        AMA.models.diagnosticScanResourceData = new AMA.model.DiagnosticScanResourceData();
        AMA.models.diagnosticScanAppsData = new AMA.model.DiagnosticScanAppsData();
        AMA.models.safeBrowsing = new AMA.model.SafeBrowsing();
        AMA.models.contactSummary = new AMA.model.ContactSummary();
        AMA.models.photosSummary = new AMA.model.PhotosSummary();
        AMA.models.videosSummary = new AMA.model.VideosSummary();

        AMA.ActionManager.autoInvalidate(AMA.models.contacts);
        AMA.ActionManager.autoInvalidate(AMA.models.photos);
        AMA.ActionManager.autoInvalidate(AMA.models.videos);
        AMA.ActionManager.autoInvalidate(AMA.models.locations);
		AMA.ActionManager.autoInvalidate(AMA.models.locksettings);
		AMA.ActionManager.autoInvalidate(AMA.models.safeBrowsing);
		AMA.ActionManager.autoInvalidate(AMA.models.locatesettings);
		AMA.ActionManager.autoInvalidate(AMA.models.threats);
		AMA.ActionManager.autoInvalidate(AMA.models.storageInfo);
		AMA.ActionManager.autoInvalidate(AMA.models.syncHistory);
		AMA.ActionManager.autoInvalidate(AMA.models.syncsettings);
		AMA.ActionManager.autoInvalidate(AMA.models.scansettings);
        AMA.ActionManager.autoInvalidate(AMA.models.devicesettings);
		AMA.ActionManager.autoInvalidate(AMA.models.diagnosticScanResourceData);
		AMA.ActionManager.autoInvalidate(AMA.models.diagnosticScanAppsData);
		AMA.ActionManager.autoInvalidate(AMA.models.endpointHistory);

        R = new AMA.Router();
        Backbone.history.start();
        initPrettyPhoto();

        // Initialize webpurify with our license key
        $.webpurify.init(AMA.config.licenses.webpurify);

        AMA.ActionManager.startRoutinePolling();

        $.idleTimer(IDLE_TIMEOUT * 60000);
        $(document).bind("idle.idleTimer", function(){
            AMA.session.timeout();
        });
    });


});