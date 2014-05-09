<div id="dashboard_tab_template" class="dashboard">
	<div id="dashboard" class="dashboard">

		<div id="dashboard_location" class="dashboard_panel col-md-12"></div>
	
		<div id="dashboard_backup" class="dashboard_panel col-md-12" style=""></div>

		<div id="dashboard_security" class="dashboard_panel col-md-12">
			<div class="panel_left col-md-5 col-sm-5"><img class="working" src="img/transparent_loading_circle_blue.gif" /></div>
			<div class="panel_right col-md-7 col-sm-7">
				<div id="dashboard_security_settings" class="dashboard_settings">
					<img class="working" src="img/transparent_loading_circle_blue.gif" />
				</div>
			</div>
		</div>
		
		<div id="dashboard_support" class="dashboard_panel col-md-12"></div>
	
		<div id="dashboard_privacy" class="dashboard_panel col-md-12" style="display:none;""></div>
	
	
		<div id="dashboard_techsupport" class="dashboard_panel" style="display: none;">
			<div class="panel_left">
				<div class="dashboard_title">Support</div>
				<div class="dashboard_content">Need help using the features on your phone? Check out the interactive guides for
					step-by-step instructions or call a device expert.
				</div>
				<div onclick="Interface.showTechSupport()" class="btn_learnmore"></div>
			</div>
			<div class="panel_right">
				<div class="dashboard_settings">
					<div class="dashboard_content_title device_display_name"></div>
					<div class="dashboard_content_title">Interactive Device Guide</div>
					<div class="dashboard_content">
						Get help with:
						<ul>
							<li>First Time Setup</li>
							<li>Features &amp; Functionalities</li>
							<li>Connecting to bluetooth or the internet</li>
						</ul>
					</div>
					<a class="link_text"
					href="http://coreqa01-web.amafib.com/ama/jebber/home?Y3NyZnZhbHVlPWY5ZDBmNmI2LWI1M2YtNGVhMS1iNGUxLWQzNmI1ZWVmODc0OCY=#">View
						interactive guides &gt; </a>
			</div>
    </div>
</div>


<div id="dashboard_safebrowsing" class="dashboard_panel" style="display: none;">
    <div class="panel_left">
        <div class="dashboard_title">Safe Browsing</div>
        <div class="explanation">The Safe Browsing feature will protect your phone and privacy from potential threats
            while you surf the web on your phone.
        </div>
        <div class="viewsafebrowsing"></div>
    </div>
    <div class="panel_right">
        <div class="dashboard_settings">
            <div class="dashboard_content_title">Safe Browsing Settings</div>
            <div class="divider"></div>
            <div class="safebrowsing_settings">
                <input id="dashboardSafeBrowsingOn" type="radio" name="safeBrowsing" class="safeBrowsing" value="true">
                <label for="dashboardSafeBrowsingOn">ON</label>
                <input id="dashboardSafeBrowsingOff" type="radio" name="safeBrowsing" class="safeBrowsing"
                       value="false">
                <label for="dashboardSafeBrowsingOff">OFF</label>
            </div>
            <div class="pane_floatingbuttons">
                <ul>
                    <li class="after_save_message"></li>
                    <li class="rs_save"></li>
                </ul>
            </div>
        </div>
    </div>
</div>


<div id="dashboard_faqs" class="dashboard_panel" style="display: none;">
    <div class="panel_full">
        <div class="dashboard_title">FAQs</div>
        <div class="link_container"><a class="link_text">How do I locate my device?</a></div>
        <div class="link_container"><a class="link_text">How do I sound an alarm from my device?</a></div>
        <div class="link_container"><a class="link_text">How do I remotely lock my device?</a></div>
        <div class="link_container"><a class="link_text">How do I sync my data?</a></div>
        <div class="link_container"><a class="link_text">How do I transfer my data from one supported device to another?</a></div>
        <div class="btn_view_faqs"></div>
    </div>
</div>

</div>

</div>

<script id="dashboard_backup_template" type="text/template">
    <div class="panel_left col-md-5 col-sm-5">

        <div class="dashboard_title">Backup</div>

        <div class="dashboard_sync_date neverSynced">Never</div>
		<div class="dashboard_sync_date hasSynced"></div>
		
        <div class="dashboard_content_title backup_details">Last <%if(AMA.Util.isAndroid()){%>backup<%}%>  <%if(AMA.Util.isIPhone()){%>Sync<%}%> Details:</div>
        
		<div class="dashboard_sync_msg neverSynced">No last Sync Details.</div>
		<div class="dashboard_sync_msg hasSynced"></div>
		
        <ul class="backup_summary loading">
            <!-- li class="contacts_onphone" style="display: none;"><span class="dashboard_onphone_count"></span>&nbsp;Contacts
                synced to your phone
            </li-->
            <li><span class="dashboard_onweb_count">0</span>&nbsp;Contacts saved on website</li>
            <li class="images_onweb"><span class="dashboard_imagesonweb_count">0</span>&nbsp;Photos saved on website
            </li>
            <li class="videos_onweb"><span class="dashboard_videosonweb_count">0</span>&nbsp;Videos saved on website
            </li>
        </ul>
        <!-- Need to pass "sync_dashboard" to identify the sync initiated from DashboardTab section. but in showDialog() setting the type back to "Sync" after logging report -->
        <div class="btn btn_sync">Sync Data</div>
        <div class="viewdetails"><a class="link_text">View Details</a></div>
    </div>
    <div class="panel_right  col-md-7 col-sm-7">
        <!-- storage capacity -->
        <div class="storage_capacity" style="">
            <div class="dashboard_content_title">Storage Capacity Snapshot</div>
            <div class="divider"></div>

            <div class="title storage_row">Used <span class="totalused"><%= AMA.Util.bytesToSize(totalUsed)%></span><span class="totalstorage"> /  <%=AMA.Util.bytesToSize(storageLimit)%></span>
            </div>
            <div class="progress storage_row ui-progressbar ui-widget ui-widget-content ui-corner-all"
                 role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">
                <div class="ui-progressbar-value ui-widget-header ui-corner-left images" style="width:<%=ImageUse%>%;"></div>
                <div class="ui-progressbar-value ui-widget-header videos" style="width:<%=VideoUse%>%"></div>
                <div class="ui-progressbar-value ui-widget-header trash ui-corner-left" style="width: <%=TrashUse%>%;"></div>
                <div class="clear"></div>
            </div>
            <div class="storageBreakdown storage_row">
                <div class="images storage_row">
                    <div class="imagesLegend legend ui-progressbar ui-widget ui-widget-content ui-corner-all col-md-1 col-sm-1"
                         role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="100">
                        <div class="ui-progressbar-value ui-widget-header ui-corner-left ui-corner-right"
                             style="width: 100%;"></div>
                    </div>
                    <div class="storageText"><span class="imagesStorage"> <%=AMA.Util.bytesToSize(ImageSize)%></span> - Photos</div>
                    <div class="clear"></div>
                </div>
                <div class="videos storage_row">
                    <div class="videosLegend legend ui-progressbar ui-widget ui-widget-content ui-corner-all col-md-1 col-sm-1"
                         role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="100">
                        <div class="ui-progressbar-value ui-widget-header ui-corner-left ui-corner-right"
                             style="width:100%;"></div>
                    </div>
                    <div class="storageText"><span class="videosStorage" > <%=AMA.Util.bytesToSize(VideoSize)%></span> - Videos</div>
                    <div class="clear"></div>
                </div>
                <div class="trash storage_row">
                    <div class="trashLegend legend ui-progressbar ui-widget ui-widget-content ui-corner-all col-md-1 col-sm-0"
                         role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="100">
                        <div class="ui-progressbar-value ui-widget-header ui-corner-left ui-corner-right"
                             style="width:100%;"></div>
                    </div>
                    <div class="storageText"><span class="trashStorage"> <%=AMA.Util.bytesToSize(TrashSize)%></span> - Trash</div>
                    <div class="clear"></div>
                </div>
            </div>
            <div class="note storage_row">*Contacts are unlimited</div>
        </div>

        <!-- settings -->
        <div class="dashboard_settings" style="display: none;">No settings found.</div>
    </div>
</script>

<script id="dashboard_location_template" type="text/template">
    <div class="dashboard_location panel_left  col-md-5 col-sm-5">
            <div class="dashboard_title">Location</div>

        <div id="location_status_info" class="<%=hasStatus%>">
            <div class="dashboard_locate_time">
                <%=time%>
            </div>
            <div class="dashboard_content_title">Phone located near:</div>
            <div class="dashboard_address">
                <%=address %>
            </div>
        </div>
        <div id="no_stored_location_info" class="<%=hasNoStatus%>">
            <div class="dashboard_locate_no_location">
                No location information stored
            </div>
        </div>
            <div class="btn report_event" id="dashboard_btn_locating">Locating...</div>
            <div class="btn btn_locate report_event" id="dashboard_btn_locate">Locate Phone</div>
    </div>

    <div id="dashboard_map" class="panel_right col-md-7 col-sm-7"></div>
    <div class="clear"></div>
    <div class="map_description">Last Recorded Location</div>

</script>
<script id="dashboard_security_template" type="text/template">
    <div class="dashboard_title">Security</div>
    <div class="last_threat_scan"><%=lastScanDate%></div>
 
    <div class="dashboard_content_title">Last Threat Scan Details:</div>
    <div class="dashboard_scan_details">
        <ul>
			<li><%=appScanTotal%> App<%=appPlurality%> Scanned</li>
			<li><%=fileScanTotal%> File<%=filePlurality%> Scanned</li>
            <li><%=fileInfectedTotal%> Threat<%=threatPlurality%> Detected</li>
        </ul>
    </div>
	<div class="btn view_details" href="#home/security">View Details</div>
</script>

<script id="dashboard_support_template" class="col-md-0 col-sm-0" type="text/template">
      <div class="panel_left  col-md-5 col-sm-5">
         <div class="dashboard_title">Support</div>
         <div class="dashboard_content">Run a diagnostics on your phone to ensure it is performing at its optimal level.</div>
         <div class="btn scan_phone" href="#home/support">Scan Phone</div>
      </div>
      <div class="panel_right  col-md-7 col-sm-7">
         <div class="dashboard_settings">
            
            <div class="dashboard_content_title">Diagnostics</div>
            <div class="divider"></div>
            <div class="dashboard_content">            	
            	<ul>
            		<li><b>Battery:</b> See which apps drain your battery the most.</li>
            		<li><b>Speed:</b> See which apps are slowing down your phone.</li>
            		<li><b>Storage:</b> Find out how much free space you have on your phone.</li>
            	</ul>
            </div>            
         </div>
      </div>
</script>


<script id="dashboard_security_settings_template" type="text/template">
	<div class="dashboard_content_title">Security Settings (<a class="link_text" href="#" id="edit_security_settings">View All</a>)</div>
    <div class="divider"></div>

    <div class="row">
        <div class="label col-md-6 col-sm-6">Auto Threat Scans:</div>
        <div class="field col-md-6 col-sm-6">
            <select name="autoThreatScanFrequency" class="autoThreatScanFrequency">
                <option value="NEVER">
                    Never
                </option>
                <option value="DAILY">
                    Daily
                </option>
                <option value="WEEKLY">
                    Weekly
                </option>
            </select>
        </div>
    </div>
    <div class="clear"></div>
    <div class="row">
        <div class="label col-md-6 col-sm-6">Day Of Week:</div>
        <div class="field col-md-6 col-sm-6">
            <select name="dayOfWeek" class="dayOfWeek">
                <option value=""></option>
                <option value="MONDAY">
                    Monday
                </option>
                <option value="TUESDAY">
                    Tuesday
                </option>
                <option value="WEDNESDAY">
                    Wednesday
                </option>
                <option value="THURSDAY">
                    Thursday
                </option>
                <option value="FRIDAY">
                    Friday
                </option>
                <option value="SATURDAY">
                    Saturday
                </option>
                <option value="SUNDAY">
                    Sunday
                </option>
            </select>
        </div>
    </div>
    <div class="clear"></div>
    <div class="row">
        <div class="label col-md-6 col-sm-6">Scan Between:</div>
        <div class="field col-md-6 col-sm-6">
            <select name="timeOfDay" class="timeOfDay">
                <option value=""></option>
                <option value="AM12TO1">
                    12AM - 1AM
                </option>

                <option value="AM1TO2">
                    1AM - 2AM
                </option>

                <option value="AM2TO3">
                    2AM - 3AM
                </option>

                <option value="AM3TO4">
                    3AM - 4AM
                </option>

                <option value="AM4TO5">
                    4AM - 5AM
                </option>

                <option value="AM5TO6">
                    5AM - 6AM
                </option>

                <option value="AM6TO7">
                    6AM - 7AM
                </option>

                <option value="AM7TO8">
                    7AM - 8AM
                </option>

                <option value="AM8TO9">
                    8AM - 9AM
                </option>

                <option value="AM9TO10">
                    9AM - 10AM
                </option>

                <option value="AM10TO11">
                    10AM - 11AM
                </option>

                <option value="AM11TO12">
                    11AM - 12PM
                </option>
                <option value="PM12TO1">
                    12PM - 1PM
                </option>

                <option value="PM1TO2">
                    1PM - 2PM
                </option>

                <option value="PM2TO3">
                    2PM - 3PM
                </option>

                <option value="PM3TO4">
                    3PM - 4PM
                </option>

                <option value="PM4TO5">
                    4PM - 5PM
                </option>

                <option value="PM5TO6">
                    5PM - 6PM
                </option>

                <option value="PM6TO7">
                    6PM - 7PM
                </option>

                <option value="PM7TO8">
                    7PM - 8PM
                </option>

                <option value="PM8TO9">
                    8PM - 9PM
                </option>

                <option value="PM9TO10">
                    9PM - 10PM
                </option>

                <option value="PM10TO11">
                    10PM - 11PM
                </option>

                <option value="PM11TO12">
                    11PM - 12AM
                </option>
            </select>
        </div>
    </div>

    <div class="pane_floatingbuttons">
        <ul>
            <li class="after_save_message success">"Successfully saved changes."</li>
			<li class="after_save_message no_changes">"No changes found."</li>
			<li class="after_save_message blank_field">"Blank fields are not allowed."</li>
            <li class="btn btn_white col-md-6 col-md-offset-3">Save</li>
			<li class="loader"><img class="working" src="img/working.gif"/></li>
        </ul>
    </div>
</script>

<script id="dashboard_privacy_template" type="text/template">
<div class="panel_left">
    <div class="dashboard_title">Privacy</div>
    <div class="view_details" onclick="Interface.showPrivacy();"></div>
</div>

<div id="applications_monitored" class="panel_right">
    <div class="dashboard_settings">
        <div class="dashboard_content_title">App Usage Type</div>
        <div class="divider"></div>
        <ul>
            <li>
                <span class="dashboard_threat_count total_apps">5</span>
                <span class="dashboard_threat_title">Total Apps</span>
            </li>
            <li>
                <span class="dashboard_threat_count communication_apps">2</span>
                <span class="dashboard_threat_title">Communication</span>
            </li>
            <li>
                <span class="dashboard_threat_count identity_apps">3</span>
                <span class="dashboard_threat_title">Identity</span>
            </li>
            <li>
                <span class="dashboard_threat_count location_apps">1</span>
                <span class="dashboard_threat_title">Location</span>
            </li>
            <li>
                <span class="dashboard_threat_count resource_usage_apps">2</span>
                <span class="dashboard_threat_title">Resource Usage</span>
            </li>
        </ul>
    </div>
</div>

</script>