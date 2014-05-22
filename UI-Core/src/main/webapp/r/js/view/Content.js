/*! Content */
(function () {

    AMA.namespace("view");

    var Content = AMA.view.Content = AMA.view.BaseView.extend();

    Content.TEMPLATE_ID = "content_template";
    Content.TEMPLATE_SRC = "";


    AMA.augment(Content.prototype, {
        initialize: function () {
            Content.__super__.initialize.apply(this, arguments);
            this.plug(AMA.view.plugin.Switcher);
           
			this._afterRender = function() {};
			
			// pass the switch event to the tracker
			this.plug(AMA.view.plugin.TimeSpentTracker, {
				event: this.SWITCH_VIEW_EVENT
			});
		    this.enabledFeatures = [];
        },

        render: function () {
        	AMA.page.header.toolbar.registerSwitcher(this);
	        Content.__super__.render.apply(this);

            this.dashboardTab = new AMA.view.DashboardTab({
                el: "#dashboard_main_tab",
                parent: this
            });
            
            if (!AMA.models.capabilities.canRead("contacts") && 
            	!AMA.models.capabilities.canRead("files") &&
            	!AMA.models.capabilities.canRead("locateDeviceEvents_actionId") &&
            	!AMA.models.capabilities.canRead("appInfectionScanResults_actionId") &&
            	!AMA.models.capabilities.canRead("appVulnerabilityScanResults_id") &&
            	!AMA.models.capabilities.canRead("browserSecuritySettings") &&
            	!AMA.models.capabilities.canRead("apphealthscanresults_id_resources")) {
            		$("#header_link").hide();
            		$("#dashboard_tab").hide();
            		$("#backup_tab").hide();
	                $("#data_tab").hide();
	                $("#location_tab").hide();
	                $("#locate_tab").hide();
	                $("#security_tab").hide();
	                $("#security_selector_tab").hide();
	                $("#app_assist_tab").hide();
	                $("#app_assist_selector_tab").hide();
	                $("#safebrowsing_tab").hide();
	                $("#safe_browsing_tab").hide();
	                $("#techsupport_tab").hide();
	                $("#support_tab").hide();

                    $("#backup_modal_tab").remove();
	                
            		$("#download_tab").show();
            		this.downloadAppTab = new AMA.view.DownloadAppTab({
	                    el: "#download_app_tab",
	                    parent: this
	                });
	                
	                $("#account_settings_link").hide();
	                $("#share_feedback_link").show();
            		
            		location.hash = "home/download_app";
			} else {
				
	            
	            if (AMA.models.capabilities.canRead("contacts") || AMA.models.capabilities.canRead("files")) {
	            	this.dataTab = new AMA.view.DataTab({
			            el: "#data_tab",
			            parent: this
			        });
			        this.dataTab.plug(AMA.view.plugin.Switcher);
			        $("#backup_tab").show();
	            }
	            else {
	                $("#backup_tab").hide();
	                $("#data_tab").hide();
                    this.enabledFeatures.push("#backup_modal_tab");
	            }
	            
	            
	            
	            // FIXME: "hidden" class logic below against top nav tabs does not suppress the tabs
	            // need to figure out why top nav tabs is replaced after this render function
	            if( AMA.models.capabilities.canRead("locateDeviceEvents_actionId") ) {
	                this.locationTab = new AMA.view.LocationTab({
	                    el: "#location_tab",
	                    parent: this
	                });
	                $("#locate_tab").show();
	            }
	            else {
	                $("#location_tab").hide();
	                $("#locate_tab").hide();
                    this.enabledFeatures.push("#locate_modal_tab");
	            }
	            
	            if( AMA.models.capabilities.canRead("appInfectionScanResults_actionId") ) {
	    			this.securityTab = new AMA.view.SecurityTab({
	    				el: "#security_tab",
	                    parent: this
	                });
	                $("#security_selector_tab").show();
	            }
	            else {
	                $("#security_tab").hide();
	                $("#security_selector_tab").hide();
                    this.enabledFeatures.push("#security_selector_modal_tab");

	            }
	            
	            if( AMA.models.capabilities.canRead("appVulnerabilityScanResults_id") ) {
	                this.privacyTab = new AMA.view.AppAssistTab({
	                    el: "#app_assist_tab",
	                    parent: this,
                        noAutoRefresh: true,
	                    data: AMA.models.privacy
	                });
	                $("#app_assist_selector_tab").show();
	            }
	            else {
	                $("#app_assist_tab").hide();
	                $("#app_assist_selector_tab").hide();
                    this.enabledFeatures.push("#app_assist_selector_modal_tab");
                }
	            
	            if( AMA.models.capabilities.canRead("apphealthscanresults_id_resources") ) {
	                this.supportTab = new AMA.view.SupportTabView({
	                    el: "#support_tab",
	                    parent: this/*,
	                    data: AMA.models.diagnosticScanResourceData*/
	                });
	                $("#techsupport_tab").show();
	            }
	            else {
	                $("#techsupport_tab").hide();
	                $("#support_tab").hide();
                    this.enabledFeatures.push("#techsupport_modal_tab");
	            }
			}
            _.each(this.enabledFeatures, function(item, index) {
                $(item).remove();
            });
        }
    });
})();