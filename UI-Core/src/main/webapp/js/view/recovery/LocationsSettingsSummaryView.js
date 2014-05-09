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