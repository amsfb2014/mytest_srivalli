<script type="text/template" id="page_template">
    <div id="header" class="navbar navbar-static-top">
    </div>

    <div id="settings_dialog" class="container"></div>
    <div id="page_content" class="container"></div>


    <div id="footer" class="hidden-xs">
        <div class="footer container">
            <div class="footer_right col-sm-2 col-sm-push-10 col-md-2 col-md-push-10">
                <div class="icon webbycons-logo"></div>
            </div>        
        
            <div class="footer_left col-sm-10 col-sm-pull-2 col-md-10 col-md-pull-2">
                <span class="copyright">
                    &copy; Asurion Mobile Applications, Inc. 2012-2013. All Rights Reserved.
                </span>
                <span class="footer_left_links">
                    <span class="terms"> <a href="index.html#terms" target="_blank"> Terms and Conditions </a>
                    <span class="terms_pipe pipe">|</span> </span>
                    <span class="privacy_policy"><a href="index.html#privacy" target="_blank"> Privacy Policy </a></span>
                    <!--<span class="privacy_pipe pipe">|</span>
                    <span class="contact_us"><a href="index.html#contact" target="_blank"> Contact </a> </span> -->
                </span>
            </div>

        </div>
    </div>

    <!-- Placeholder for common dialogs -->

    <div id="standard_dialogs"></div>
    <div id="wipephonedialog"  class="modal fade" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"></div>
    <div id="securephonedialog" class="modal fade" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"></div>
   <div id="feedback_dialogs"></div>
   
    <!-- Sync dialog placeholder -->
   <div id="sync_dialog" class="modal fade" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"></div>
   <div id="sync_successdetails" class="modal fade" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"></div>    
   
	<div class="dialog_messages hidden">
		<!-- Loading dialog message -->
		<div id="msg_loadingdialog">Please wait...</div>
	</div>   



</script>
<script type="text/template" id="header_template">
    <div class="navbar-inner">

        <div class="container">
            <a class="btn navbar-btn hidden-md hidden-lg" href="tel:5555555555" id="callsupport">
                <span data-icon="&#59404;" class="icon"></span>
            </a>
            <a class="btn navbar-btn hidden-md hidden-sm hidden-lg" data-toggle="modal" data-target="#menu-sm-full">
                <span data-icon="&#59420;" class="icon"></span>
            </a>

            <div class="dropdown navbar-right hidden-md hidden-xs hidden-lg">
                <a href="#" id="header-drop-menu" role="button" class="dropdown-toggle" data-toggle="dropdown" data-icon="&#59420;" class="icon"></a>
                <ul class="dropdown-menu" role="menu" aria-labelledby="dropdown-menu">
                    <li role="presentation" id="help_link"><a role="menuitem" tabindex="-1">Help</a></li>
                    <li role="presentation" id="account_settings_link"><a role="menuitem" tabindex="-1">Settings</a></li>
                    <li role="presentation" id="share_feedback_link"><a role="menuitem" tabindex="-1">Share Feedback</a></li>
                </ul>
            </div>
            <div id="menu-sm-full" class="modal fade ama-menu hidden-md hidden-sm hidden-lg">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button></div>

                        <div class="modal-body">
                            <ul class="nav">
                                <li id="" class="hidden-xs presentation">
                                    <%=name%>
                                </li>
                                <li id="help_link" class="presentation">
                                    <a data-dismiss="modal" role="menuitem" tabindex="-1"  href="index.html<%if(AMA.Util.isIPhone()){%>?iphone<%}%>#help" target="_blank">Help</a>
                                </li>
                                <li data-dismiss="modal" id="account_settings_link">
                                    <a role="menuitem" tabindex="-1">Settings</a>
                                </li>
                                <li data-dismiss="modal" id="share_feedback_link">
                                    <a role="menuitem" tabindex="-1">Share Feedback</a>
                                </li>
                            </ul>
                        </div>

                    </div><!-- /.modal-content -->
                </div><!-- /.modal-dialog -->
                <div class="modal-footer">
                    <a class="" data-dismiss="modal"><span class="glyphicon glyphicon-chevron-up"></span><br/>Close Menu</a>
                </div>
            </div><!-- /.modal -->
            <div class="navbar-brand logo"><img src="img/logo.png" alt="<div class='icon webbycons-logo'></div>">
                <!--<div class="icon webbycons-logo"></div>-->
            </div>
            <div id="xs-info" class="hidden-md hidden-lg pull-right">
                <!--%=name%-->
                <a role="sda" id="logout_link" tabindex="-1">Logout</a>
            </div>
            <div class="hidden-sm hidden-xs pull-right">
				
			 
                <ul class="nav">
				 <li id='fblink'> 
						<a style="margin-top: -11px;" target="_blank" href="https://facebook.com/asurionwebapp"><img src="img/fbicon.jpg"></a>
				 </li>
                    <li id="help_link" class="hidden-xs presentation">
                        <%=name%>
                    </li>
                    <li id="help_link" class="presentation">
                        <a role="menuitem" tabindex="-1"  href="index.html<%if(AMA.Util.isIPhone()){%>?iphone<%}%>#help" target="_blank">Help</a>
                    </li>
                    <li id="account_settings_link" role="presentation">
                        <a role="menuitem" tabindex="-1">Settings</a>
                    </li>
                    <li id="share_feedback_link" role="presentation">
                        <a role="menuitem" tabindex="-1">Share Feedback</a>
                    </li>
                    <li role="presentation">
                        <a role="menuitem" id="logout_link" tabindex="-1">Logout</a>
                    </li>

                </ul>
            </div><!--/.navbar-collapse -->
        </div>
    </div>
    <div id="tabs">
        <h3 class="hidden-md hidden-lg hidden-sm toggle-menu" id="menu-tab-sm-btn" data-toggle="modal" data-target="#menu-tab-sm-full">
            <span class="submenu-left"></span>
            <span class="selected"></span>
        </h3>
        <div id="menu-tab-sm-full" class="modal fade ama-submenu ama-menu hidden-md hidden-sm hidden-lg">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button></div>
                    <div class="modal-body">
                            <ul class="menu">
                                <li id="dashboard_modal_tab" class="report_event hidden" tag="home/dashboard_main" data-dismiss="modal">
                                    Dashboard
                                </li>
                                <li id="locate_modal_tab" class="report_event " tag="home/location" data-dismiss="modal">
                                    Location <span class="pull-right" data-icon="&#59418;"></span>
                                </li>
                                <li id="backup_modal_tab" class="report_event" tag="home/data" data-dismiss="modal">
                                    Backup <span class="pull-right" data-icon="&#59418;"></span>
                                </li>
                                <li id="security_selector_modal_tab" class="report_event" tag="home/security" data-dismiss="modal">
                                    Security <span class="pull-right" data-icon="&#59418;"></span>
                                </li>
                                <li id="app_assist_selector_modal_tab" class="report_event" tag="home/app_assist" data-dismiss="modal">
                                    App Assist <span class="pull-right" data-icon="&#59418;"></span>
                                </li>
					            <li id="techsupport_modal_tab" class="report_event pull-left" tag="home/support" data-dismiss="modal">
					                Support
					            </li>                                
                            </ul>
                    </div>

                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
            <div class="modal-footer">
                <a class="" data-dismiss="modal"><span class="glyphicon glyphicon-chevron-up"></span><br/>Close Menu</a>
            </div>
        </div><!-- /.modal -->

        <ul class="container menu hidden-xs">
            <li id="dashboard_tab" class="report_event pull-left hidden" tag="home/dashboard_main">
                Dashboard
            </li>
            <li id="locate_tab" class="report_event pull-left" tag="home/location">
                Location
            </li>
            <li id="backup_tab" class="report_event pull-left" tag="home/data">
                Backup
            </li>
            <li id="security_selector_tab" class="report_event pull-left" tag="home/security">
                Security
            </li>
            <li id="app_assist_selector_tab" class="report_event pull-left" tag="home/app_assist">
                App Assist
            </li>
            <!--            <li id="safebrowsing_tab" class="report_event pull-left" tag="home/safe_browsing">
        Safe Browsing
        </li>-->
            <li id="techsupport_tab" class="report_event pull-left" tag="home/support">
                Support
            </li>
            <li style="display:none;" id="replace_tab" class="hidden report_event pull-left"></li>
            <li style="display:none;" id="download_tab" class="hidden report_event pull-left">
                Download Mobile App
            </li>
            <li id="post_cancelation_days" style="display: none;">Account will be terminated in <span></span> days.</li>
        </ul>
    </div>
    <div id="header_link">
        <ul id="toolbar" class="container"></ul>
    </div>

</script>
<script id="toolbar_template" type="text/template">
    <li id="endpoint_toolset" class="col-md-3 hidden-xs hidden-sm"></li>
    <li id="sync_toolset" class="button pull-left"></li>
    <li id="transfer_data_toolset" class="class="hidden-xs hidden-sm hidden-lg" button pull-left"></li>
    <li id="storage_capacity_toolset" class=" pull-left"></li>    
    <li id="shared_feedback_toolset" class=" pull-left"></li>
    <li id="locate_toolset" class="locate_tab_button button pull-left"></li>
    <li id="alarm_toolset" class="locate_tab_button button pull-left"></li>
    <li id="lock_toolset" class="locate_tab_button button pull-left"></li>
    <li id="wipe_toolset" class="locate_tab_button button pull-left"></li>
    <li id="securephone_toolset" class="locate_tab_button button pull-left"></li>
    <li id="account_status_toolset" class="col-md-12 pull-left"></li>
    <!--<li id="recent_activity_toolset" class="col-md-4 pull-left"></li>-->
    <li id="scan_toolset" class="button pull-left"></li>
    <li id="app_assist_toolset" class="col-xs-12 col-sm-12 col-md-9 col-lg-9 pull-left"></li>
    <li id="diagnosticScan_toolset" class="button pull-left"></li>
</script>
<script id="endpoint_toolset_template" type="text/template">
    <div class="row">
        <div class="col-md-3">
            <img src="<%=platformImage%>" class="lp_image_platform hidden">
            <img src="../img/genericphone_small.png" class="lp_image_default">
        </div>
        <div class="col-md-9">
            <ul>
                <li class="phonenumber"><%=name%></li>
                <li class="devicename"><small><%=platformfriendlyname%></small></li>
                <li class="newphone report_event pull-left" id="rep_newphone"><a id="rep_newphone">Got a new phone?</a></li>
                <li class="last_backup hidden">Last Sync</li>
                <li class="report_event hidden pull-left"><a class="btn file_claim" target="_blank" href="http://phoneclaim.com/">File Claim</a></li>
            </ul>
        </div>
        <div class="lp_button update_phone hidden" onclick="Interface.updatePhone(0)"></div>
    </div>
</script>
<script id="storage_capacity_toolset_template" type="text/template">
    <div class="storage_capacity header_settings" style="display: block;">

        <div class="title">Storage: Used <span class="totalused"><%= AMA.Util.bytesToSize(totalUsed)%></span><span class="totalstorage"> / <%= AMA.Util.bytesToSize(storageLimit)%></span>
        </div>
        <div class="progress">
            <div class="progress-bar progress-bar-danger" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: <%=ImageUse%>%">
                <span class="sr-only"><%=ImageUse%>% Image</span>
            </div>
            <div class="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: <%=VideoUse%>%">
                <span class="sr-only"><%=VideoUse%>% Video</span>
            </div>
            <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: <%=TrashUse%>%">
                <span class="sr-only"><%=TrashUse%>% Trash</span>
            </div>
        </div>
        <div class="storageBreakdown storage_row">
            <span class="imagesStorage"><%= AMA.Util.bytesToSize(ImageSize)%></span> Photos,
            <span class="videosStorage"><%= AMA.Util.bytesToSize(VideoSize)%></span> Videos,
            <span class="trashStorage"><%= AMA.Util.bytesToSize(TrashSize)%></span> Trash
        </div>
        <div class="note storage_row">*Contacts are unlimited</div>
    </div>
</script>
<script id="sync_toolset_template" type="text/template">
    <div class="button_sync normal report_event pull-left" id="button_sync_normal" type="sync" style="display: block;">
        <div class="button_title_inactive">Sync Data</div>
        <span class="icon webbycons-sync"></span>
        <div class="tooltip_icon"></div>
        <div class="tooltip"><div class="popover bottom"><div class="arrow"></div><div class="popover-content">
            This feature will sync the data stored on the website with your phone.<br><br>
            Your phone will also be automatically synced based on your <a class="link_text sync_settings_link">automatic sync schedule</a>.
        </div></div>
        </div>
    </div>
    <div class="button_sync connecting" type="sync" style="display: none;">
        <div class="button_title">Sync Data</div>
        <span class="icon webbycons-sync hidden-sm hidden-md hidden-lg"></span>
        <div class="button_countdown">Connecting...
            <span class="countdown hasCountdown" >
                <span id="sync_toolset_countdown" class="countdown_row countdown_amount">03:00</span>
            </span>
        </div>
        <div class="working"></div>
        <div class="tooltip_icon connecting"></div>
        <div class="tooltip"><div class="popover bottom"><div class="arrow"></div><div class="popover-content">A sync is being performed on your phone.<br><br>The website will update once the sync is complete.</div></div></div>
    </div>
    <div class="button_sync outcome syncing" type="sync" style="display: none;">
        <div class="button_title">Sync Data</div>
        <span class="icon webbycons-sync hidden-sm hidden-md hidden-lg"></span>
        <div class="outcome_text">Syncing</div>
        <div class="tooltip_icon syncing"></div>
        <div class="progressbar ui-progressbar ui-widget ui-widget-content ui-corner-all  total_progress"><div class="ui-progressbar-value ui-widget-header ui-corner-left ui-corner-right" style="width:0%;"></div></div>
        <div class="tooltip sync">
            <div class='title'>Currently Syncing:</div>
            <div class='contacts progress'>
                <div class='contacts_text'>
                    <span class='tooltip_image icon_contacts'></span>
                    <span>Contacts</span>
                    <span class='contacts_count' style='margin-left: 6px;'></span>
                    <span class='contacts_progress' style='float: right; width: 78px;'></span>
                    <span class='tooltip_image icon_checkmark' style='float: right; width: 78px;'></span>
                </div>
            </div>
            <div class='clear'></div>
            <div class='images progress'>
                <div class='images_text'>
     	<span class='tooltip_image icon_images'>
     	</span><span>Photos</span>
                    <span class='images_count' style='margin-left: 10px;'></span>
                    <span class='images_progress' style='float: right; width: 78px;'></span>
                    <span class='tooltip_image icon_checkmark' style='float: right; width: 78px;'></span>
                </div>
            </div>
            <div class='clear'></div>
            <div class='videos progress'>
                <div class='videos_text'>
                    <span class='tooltip_image icon_videos'></span>
                    <span>Videos</span>
                    <span class='videos_count' style='margin-left: 10px;'></span>
                    <span class='videos_progress' style='float: right; width: 78px;'></span>
                    <span class='tooltip_image icon_checkmark' style='float: right; width: 78px;'></span>
                </div>
            </div>
            <div class='clear'></div>

        </div>
    </div>
    <div class="button_sync outcome unsuccessful" type="sync" style="display: none;">
        <div class="button_title">Sync Data</div>
        <span class="icon webbycons-sync"></span>
        <div class="outcome_text">Unsuccessful</div>
        <div class="tryagain button_small">Try Again</div>
        <div class="tooltip_icon outcome unsuccessful"></div>
        <div class="tooltip"><div class="popover bottom"><div class="arrow"></div><div class="popover-content">Asurion Labs was unable to connect to your phone.<br><br>In order to complete this task, your phone must be turned on and within coverage area.</div></div></div>
    </div>
    <div class="button_sync outcome success" type="sync" style="display: none;">
        <div class="button_title">Sync Data</div>
        <span class="icon webbycons-sync hidden-sm hidden-md hidden-lg"></span>
        <div class="outcome_text">Successful</div>
        <div class="viewdetails button_small">View Details</div>
        <div class="tooltip_icon outcome success"></div>
        <div class="tooltip"><div class="popover bottom"><div class="arrow"></div><div class="popover-content">
            <span class="syncsuccess_totalContacts">0</span>&nbsp;Contacts,
            <span class="syncsuccess_totalPhotos">0</span>&nbsp;Photos and
            <span class="syncsuccess_totalVideos">0</span>&nbsp;Videos were successfully synced between your phone and the website.<br><br>
            Your data will also be automatically synced based on your <a class="link_text sync_settings_link">automatic sync settings</a>.
        </div>
        </div>
        </div>
    </div>

</script>
<script id="sync_dialog_template" type="text/template">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
	            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
	            <h4 class="modal-title">Sync Data</h4>
	        </div>
			<div class="modal-body">
					<div class="instructions">
					<div class="step1">
							<ul>
								<li><div class="error bs-callout bs-callout-danger nothing_selected hidden">Please select at least one data type to sync.</div></li>
								<li>This feature will sync the contacts, photos, and videos stored on the web with your phone.<br></li>
								<li><div class="selectdata"><strong>Select data to sync:&nbsp;&nbsp;</strong>							
									
									<label class="checkbox-inline">
										<input type="checkbox" id="sync_dialog_contacts_checkbox" value="contacts" class="item_type"> <strong>Contacts</strong>
									</label>
									
									<label class="checkbox-inline">
										<input type="checkbox" id="sync_dialog_photos_checkbox" value="pictures" class="item_type"> <strong>Photos</strong>
									</label>
									
									<label class="checkbox-inline">
										<input type="checkbox" id="sync_dialog_videos_checkbox" value="videos" class="item_type"> <strong>Videos</strong>
									</label>					
									
									
								<li><div class="note bs-callout bs-callout-info">Note: The selections above will affect this sync only.</div></li>
								<li>
									<div class="sync_setting">
										<strong>Current Sync setting:</strong>
										<label id="backupConnectionWifiOnly_syncdialog" class="sync_current" for="backupConnectionWifi"><span class="icon webbycons-check"></span> Wi-Fi only</label>
										<label id="backupConnectionWifiOrMobileNetwork_syncdialog" class="sync_current" for="backupConnectionMobileNetwork"><span class="icon webbycons-check"></span> Wi-Fi or Mobile Network</label>
										
										<div id="syncphonedialog_currentsync_both_label" class="sync_message">The device will start the sync with whatever data connection is currently available. Click on Sync Data to initiate a Sync.</div>
										<div id="syncphonedialog_currentsync_wifionly_label" class="sync_message">If a Wifi connection is not available, the device will start the sync with whatever data connection is currently available. Click on Sync Data to initiate a Sync.</div>
	
									</div>
								</li>								
							</ul>					
						</div>
					</div>
					<div class="error hidden">
						<div class="textcontainer">
							<div class="message"></div>
						</div>
						<div class="dialog_buttons">
							<ul>
								<li class="btn_tryagain"></li>
							</ul>
						</div>
					</div>
					<div class="success hidden">
						<div class="syncing">
							<div class="textcontainer">
								<div class="instructions">
									<ul>
										<li>The Asurion Labs should start on your phone within a few minutes and perform a sync.<br><br></li><li>You may also perform a sync by launching the Asurion Labs on your phone and pressing 'Sync Contacts' on the main menu.</li>
									</ul>
								</div>
							</div>
							<div class="dialog_buttons">
								<ul>
									<li class="btn_close"></li>
								</ul>
							</div>
						</div>
	
					</div>
				</div>		
				<!--div class="dialog_buttons">
					<ul>
						<li class="btn_sync report_event pull-left" id="sync_data"></li>
						<li class="btn_cancel"></li>
					</ul>
				</div-->		
				<div class="modal-footer">	
					<button type="button" id="sync_data" class="done btn_sync report_event btn btn-primary">Sync Data</button>
					<button type="button" class="btn_cancel btn btn-default">Cancel</button>
				</div>		
			</div>
		</div>
	</div>
</script>
<script id="syncSuccess_dialog_template" type="text/template">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">		
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				<h4 class="modal-title">Sync Details</h4>
			</div>
			<div class="modal-body">
				<div class="instruction">
					<h5 class="currentsyncdetails">
						<span class="syncsuccess_totalContacts">0</span>&nbsp;Contacts,
						<span class="syncsuccess_totalPhotos">0</span>&nbsp;Photos and
						<span class="syncsuccess_totalVideos">0</span>&nbsp;Videos Saved
					</h5>
					<div class="divider"></div>
					<div class="onphonedetails col-xs-12 col-sm-6 col-md-6 col-lg-6">
						<h5 class="">On Your Device:</h5>
						<div class="contacts">
							<div class="name col-xs-6 col-sm-6 col-md-6 col-lg-6">Contacts:</div>
							<div class="details col-xs-6 col-sm-6 col-md-6 col-lg-6">
								<ul>
									<li><span class="syncsuccess_deviceContactsAdded">0</span>&nbsp;Added</li>
									<li><span class="syncsuccess_deviceContactsEdited">0</span>&nbsp;Edited</li>
									<li><span class="syncsuccess_deviceContactsDeleted">0</span>&nbsp;Deleted</li>
								</ul>
							</div>
							<div class="clear"></div>
						</div>
						<div class="images">
							<div class="name col-xs-6 col-sm-6 col-md-6 col-lg-6">Photos:</div>
							<div class="details col-xs-6 col-sm-6 col-md-6 col-lg-6">
								<ul>
									<li><span class="syncsuccess_devicePhotosAdded">0</span>&nbsp;Added</li>
									<li><span class="syncsuccess_devicePhotosDeleted">0</span>&nbsp;Deleted</li>
								</ul>
							</div>
							<div class="clear"></div>
						</div>
						<div class="videos">
							<div class="name col-xs-6 col-sm-6 col-md-6 col-lg-6">Videos:</div>
							<div class="details col-xs-6 col-sm-6 col-md-6 col-lg-6">
								<ul>
									<li><span class="syncsuccess_deviceVideosAdded">0</span>&nbsp;Added</li>
									<li><span class="syncsuccess_deviceVideosDeleted">0</span>&nbsp;Deleted</li>
								</ul>
							</div>
							<div class="clear"></div>
						</div>
					</div>
					<div class="onwebdetails  col-xs-12 col-sm-6 col-md-6 col-lg-6">
						<h5 class="">On The Website:</h5>
						<div class="contacts">
							<div class="name col-xs-6 col-sm-6 col-md-6 col-lg-6">Contacts:</div>
							<div class="details col-xs-6 col-sm-6 col-md-6 col-lg-6">
								<ul>
									<li><span class="syncsuccess_webContactsAdded">0</span>&nbsp;Added</li>
									<li><span class="syncsuccess_webContactsEdited">0</span>&nbsp;Edited</li>
									<li><span class="syncsuccess_webContactsDeleted">0</span>&nbsp;Edited</li>
								</ul>
							</div>
							<div class="clear"></div>
						</div>
						<div class="images">
							<div class="name col-xs-6 col-sm-6 col-md-6 col-lg-6">Photos:</div>
							<div class="details col-xs-6 col-sm-6 col-md-6 col-lg-6">
								<ul>
									<li><span class="syncsuccess_webPhotosAdded">0</span>&nbsp;Added</li>
									<li><span class="syncsuccess_webPhotosDeleted">0</span>&nbsp;Deleted</li>
								</ul>
							</div>
							<div class="clear"></div>
						</div>
						<div class="videos">
							<div class="name col-xs-6 col-sm-6 col-md-6 col-lg-6">Videos:</div>
							<div class="details col-xs-6 col-sm-6 col-md-6 col-lg-6">
								<ul>
									<li><span class="syncsuccess_webVideosAdded">0</span>&nbsp;Added</li>
									<li><span class="syncsuccess_webVideosDeleted">0</span>&nbsp;Deleted</li>
								</ul>
							</div>
							<div class="clear"></div>
						</div>
					</div>
					<div class="clear"></div>
				</div>
			</div>			
		</div>
	</div>
</script>
<script id="transfer_data_toolset_template" type="text/template">
    <div>
        <div class="hidden-xs hidden-sm hidden-md hidden-lg button_transferdata report_event pull-left" id="button_transferdata" type="transferdata" style="display: block;">
        	<div class="button_title_inactive">Transfer Data</div>
        	<span class="icon webbycons-transfer"></span>
        	<div class="tooltip_icon"></div>
        	<div class="tooltip">
        		<div class="popover bottom">
					<div class="arrow"></div>
					<div class="popover-content">This button will provide step-by-step instructions detailing how you can quickly and
            	wirelessly transfer your data from one phone to another.
					</div>
				</div>
			</div>
       	</div>
	    <div >
	    	<div id="transferdata_dialog"  class="transferdata_dialog  modal fade " tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: block;overflow:visible;"></div>
	    </div>	
    </div>

    <!-- Transfer Data dialog placeholder -->
</script>
<script type="text/template" id="transferdata_dialog_template">
		<div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">                    
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                    <h4 class="modal-title" id="myModalLabel">Transfer Data</h4>
                </div>
                <div class="modal-body">
                    <div class="instructions">
                        <div class="step1 wiz_step current">
                            Follow the steps below to transfer your data from one
                            <a class="link_text supported" href="index.html#phones_supported" target="_blank">supported</a>
                            device to another.
                            <div class="transferdata_step1">
                                <div class="transferdata_old">Old Phone</div>
                                <div class="transferdata_web">Asurion Labs Website</div>
                                <div class="transferdata_new">New Phone</div>
                            </div>
                            <div class="stepcount">Step 1 of 2</div>
                            <div class="step">1. Be sure to have Asurion Labs
                                <a class="link_text download" href="index.html#get_started" target="_blank">downloaded and installed</a>
                                on your old device and your data synced with the Asurion Labs website.
                            </div>
                            <!--<div class="button next">Next</div>-->
                        </div>

                        <div class="step2 wiz_step">
                            Follow the steps below to transfer your data from one
                            <a class="link_text supported" href="index.html#phones_supported" target="_blank">supported</a>
                            device to another.
                            <div class="transferdata_step2">
                                <div class="transferdata_old">Old Phone</div>
                                <div class="transferdata_web">Asurion Labs Website</div>
                                <div class="transferdata_new">New Phone</div>
                            </div>
                            <div class="stepcount">Step 2 of 2</div>
                            <div class="step">2. <a class="link_text download" href="index.html#get_started" target="_blank">Download and install</a>
                                Asurion Labs on your new device. At the end of the install process you will be prompted to
                                <b>Restore Your Data</b> to your new device.
                            </div>
                        </div>
                    </div>
                </div>
				<div class="modal-footer">
					<div class="wiz_step_footer wiz_first current" style="display: none;">
						<button type="button" class="next btn btn-default">Next</button>
					</div>
					<div class="wiz_step_footer wiz_last" style="display: none;">
						<button type="button" class="previous btn btn-default">Previous</button>
					</div>
				</div>
            </div>
	</div>
</script>
<script id="account_status_toolset_template" type="text/template">
    <div class="dashboard_status header_settings" style="display: block;">
        <div class="title">Status</div>
        <div class="dashboard_content">
            <div class="account_active greentick">Account Active</div>
            <div class="android_device_admin <%=android_device_admin%>">Device Admin <%=is_admin_enabled%></div>
            <div class="locationcheck_on <%=locationcheck_on%>">Location Checks <%=is_locaction_enabled%></div>
            <div class="current_lockstatus <%=current_lockstatus%>">Phone <%=AMA.Util.uppercaseFirst(current_lockstatus||"Lock")%></div>
        </div>
    </div>
</script>
<script id="recent_activity_toolset_template" type="text/template">
    <div id="dashboard_activity" class="dashboard_activity header_settings" style="display: block;">
        <div class="title">Recent Activity</div>
        <div id="recent_activity_container_template" class="dashboard_content">
        </div>
        <div id="recent_activity_no_entries" class="dashboard_content hidden">No recent activity stored</div>
        <a href="#" onclick="return false;" class="link_text tooltip_link" >View More</a>
        <div id="recent_activity_viewmore_container_template" class="dashboard_more_content tooltip">
        </div>
    </div>
    <div class="each_activity hidden template" id="LOCATIONCHECK_ON">
        <div class="activity_image <%=statusType%>"></div>
        <div class="activity_text <%=actionStatus.success%>">Location Check On<span class="activitytime"> (<%=statusTime%>)</span></div>
        <div class="activity_text <%=actionStatus.started%>">Location Check Off<span class="activitytime"> (<%=statusTime%>)</span></div>
    </div>
    <div class="each_activity hidden template" id="GPS_INTERVAL">
        <div class="activity_image <%=statusType%>"></div>
        <div class="activity_text <%=actionStatus.success%>">Location Frequency Change<span class="activitytime"> (<%=statusTime%>)</span></div>
        <div class="activity_text <%=actionStatus.started%>">Location Frequency Change<span class="activitytime"> (<%=statusTime%>)</span></div>
    </div>
    <div class="each_activity hidden template" id="GPS_BATTERY">
        <div class="activity_image <%=statusType%>"></div>
        <div class="activity_text <%=actionStatus.success%>">Location Battery Level Change<span class="activitytime"> (<%=statusTime%>)</span></div>
        <div class="activity_text <%=actionStatus.failed%>" title="<%=actionStatusTitle%>"><%=actionStatusMsg%><span class="activitytime"> (<%=statusTime%>)</span></div>
        <div class="activity_text <%=actionStatus.started%>">Location Battery Level Change<span class="activitytime"> (<%=statusTime%>)</span></div>
    </div>
    <div class="each_activity hidden template" id="sync">
        <div class="activity_image <%=statusType%>"></div>
        <div class="activity_text <%=actionStatus.success%>">Sync Successful<span class="activitytime"> (<%=statusTime%>)</span></div>
        <div class="activity_text <%=actionStatus.failed%>" title="<%=actionStatusTitle%>"><%=actionStatusMsg%><span class="activitytime"> (<%=statusTime%>)</span></div>
        <div class="activity_text <%=actionStatus.started%>">Sync Started<span class="activitytime"> (<%=statusTime%>)</span></div>
    </div>
    <div class="each_activity hidden template" id="sync">
        <div class="activity_image <%=statusType%>"></div>
        <div class="activity_text <%=actionStatus.success%>">Sync Successful<span class="activitytime"> (<%=statusTime%>)</span></div>
        <div class="activity_text <%=actionStatus.failed%>" title="<%=actionStatusTitle%>"><%=actionStatusMsg%><span class="activitytime"> (<%=statusTime%>)</span></div>
        <div class="activity_text <%=actionStatus.started%>">Sync Started<span class="activitytime"> (<%=statusTime%>)</span></div>
    </div>
    <div class="each_activity hidden template" id="gpsrefresh">
        <div class="activity_image <%=statusType%>"></div>
        <div class="activity_text <%=actionStatus.success%>">Locate Successful<span class="activitytime"> (<%=statusTime%>)</span></div>
        <div class="activity_text <%=actionStatus.failed%>">Locate Failed<span class="activitytime"> (<%=statusTime%>)</span></div>
        <div class="activity_text <%=actionStatus.started%>">Locate Started<span class="activitytime"> (<%=statusTime%>)</span></div>
    </div>
    <div class="each_activity hidden template" id="locate">
        <div class="activity_image <%=statusType%>"></div>
        <div class="activity_text <%=actionStatus.success%>">Locate Successful<span class="activitytime"> (<%=statusTime%>)</span></div>
        <div class="activity_text <%=actionStatus.failed%>">Locate Failed<span class="activitytime"> (<%=statusTime%>)</span></div>
        <div class="activity_text <%=actionStatus.started%>">Locate Started<span class="activitytime"> (<%=statusTime%>)</span></div>
    </div>
    <div class="each_activity hidden template" id="wipefactory">
        <div class="activity_image <%=statusType%>"></div>
        <div class="activity_text <%=actionStatus.success%>">Factory Reset Successful<span class="activitytime"> (<%=statusTime%>)</span></div>
        <div class="activity_text <%=actionStatus.failed%>">Factory Reset Failed<span class="activitytime"> (<%=statusTime%>)</span></div>
        <div class="activity_text <%=actionStatus.started%>">Factory Reset Started<span class="activitytime"> (<%=statusTime%>)</span></div>
    </div>
    <div class="each_activity hidden template" id="wipe">
        <div class="activity_image <%=statusType%>"></div>
        <div class="activity_text <%=actionStatus.success%>">Wipe Successful<span class="activitytime"> (<%=statusTime%>)</span></div>
        <div class="activity_text <%=actionStatus.failed%>">Wipe Failed<span class="activitytime"> (<%=statusTime%>)</span></div>
        <div class="activity_text <%=actionStatus.started%>">Wipe Started<span class="activitytime"> (<%=statusTime%>)</span></div>
    </div>
    <div class="each_activity hidden template" id="lock">
        <div class="activity_image <%=statusType%>"></div>
        <div class="activity_text <%=actionStatus.success%>">Phone Lock Successful<span class="activitytime"> (<%=statusTime%>)</span></div>
        <div class="activity_text <%=actionStatus.failed%>">Phone Lock Failed<span class="activitytime"> (<%=statusTime%>)</span></div>
        <div class="activity_text <%=actionStatus.started%>">Phone Lock Started<span class="activitytime"> (<%=statusTime%>)</span></div>
    </div>
    <div class="each_activity hidden template" id="unlock">
        <div class="activity_image <%=statusType%>"></div>
        <div class="activity_text <%=actionStatus.success%>">Phone Unlock Successful<span class="activitytime"> (<%=statusTime%>)</span></div>
        <div class="activity_text <%=actionStatus.failed%>">Phone Unlock Failed<span class="activitytime"> (<%=statusTime%>)</span></div>
        <div class="activity_text <%=actionStatus.started%>">Phone Unlock Started<span class="activitytime"> (<%=statusTime%>)</span></div>
    </div>
    <div class="each_activity hidden template" id="soundalert">
        <div class="activity_image <%=statusType%>"></div>
        <div class="activity_text <%=actionStatus.success%>">Alarm Successful<span class="activitytime"> (<%=statusTime%>)</span></div>
        <div class="activity_text <%=actionStatus.failed%>">Alarm Failed<span class="activitytime"> (<%=statusTime%>)</span></div>
        <div class="activity_text <%=actionStatus.started%>">Alarm Started<span class="activitytime"> (<%=statusTime%>)</span></div>
    </div>
    <div class="each_activity hidden template" id="announce">
        <div class="activity_image <%=statusType%>"></div>
        <div class="activity_text <%=actionStatus.success%>">Secure Phone Successful<span class="activitytime"> (<%=statusTime%>)</span></div>
        <div class="activity_text <%=actionStatus.failed%>">Secure Phone Failed<span class="activitytime"> (<%=statusTime%>)</span></div>
        <div class="activity_text <%=actionStatus.started%>">Secure Phone Started<span class="activitytime"> (<%=statusTime%>)</span></div>
    </div>
    <div class="each_activity hidden template" id="security">
        <div class="activity_image <%=statusType%>"></div>
        <div class="activity_text <%=actionStatus.success%>">Secure Phone Successful<span class="activitytime"> (<%=statusTime%>)</span></div>
        <div class="activity_text <%=actionStatus.failed%>">Secure Phone Failed<span class="activitytime"> (<%=statusTime%>)</span></div>
        <div class="activity_text <%=actionStatus.started%>">Secure Phone Started<span class="activitytime"> (<%=statusTime%>)</span></div>
    </div>
    <div class="each_activity hidden template" id="startScan">
        <div class="activity_image <%=statusType%>"></div>
        <div class="activity_text <%=actionStatus.success%>">Scan Successful<span class="activitytime"> (<%=statusTime%>)</span></div>
        <div class="activity_text <%=actionStatus.failed%>">Scan Failed<span class="activitytime"> (<%=statusTime%>)</span></div>
        <div class="activity_text <%=actionStatus.started%>">Scan Started<span class="activitytime"> (<%=statusTime%>)</span></div>
    </div>
    <div class="each_activity hidden template" id="errorLog">
        <div class="activity_image <%=statusType%>"></div>
        <div class="activity_text <%=actionStatus.success%>">Log Successful<span class="activitytime"> (<%=statusTime%>)</span></div>
        <div class="activity_text <%=actionStatus.failed%>">Log Failed<span class="activitytime"> (<%=statusTime%>)</span></div>
        <div class="activity_text <%=actionStatus.started%>">Log Started<span class="activitytime"> (<%=statusTime%>)</span></div>
    </div>
    <div class="each_activity hidden template" id="scanFinished">
        <div class="activity_image <%=statusType%>"></div>
        <div class="activity_text <%=actionStatus.success%>">Diagnostics Successful<span class="activitytime"> (<%=statusTime%>)</span></div>
        <div class="activity_text <%=actionStatus.failed%>">Diagnostics Failed<span class="activitytime"> (<%=statusTime%>)</span></div>
        <div class="activity_text <%=actionStatus.started%>">Diagnostics Started<span class="activitytime"> (<%=statusTime%>)</span></div>
    </div>

    <div id="recent_activity_item_template" class="hidden">
        <div class="each_activity" id="activity_log_items_template">
            <%=item%>
        </div>
        <div class="clear"></div>
    </div>
</script>
<script id="alarm_toolset_template" type="text/template">
    <div class="button_alarm normal report_event pull-left" id="button_alarm_normal" type="alarm" style="display: block;">
        <div class="button_title_inactive">Sound Alarm</div>
        <span class="icon webbycons-alarm"></span>
        <div class="tooltip_icon"></div>
        <div class="tooltip">
            <div class="popover bottom">
                <div class="arrow"></div>
                <div class="popover-content">
                    This feature will sound a beeping alarm on your phone for 3 minutes.  You can end the alarm by pressing the 'Stop Alarm' button on your phone.
                </div>
            </div>
        </div>
    </div>
    <div class="button_alarm connecting" type="alarm" style="display: none;">
        <div class="button_title">Sound Alarm</div>
        <span class="icon webbycons-alarm hidden-xs hidden-sm hidden-md hidden-lg"></span>
        <div class="button_countdown">Connecting
                <span class="countdown hasCountdown" >
                    <span class="alarm_toolset_countdown countdown_row countdown_amount">03:00</span>
                </span>
        </div>
        <div class="working"></div>
        <div class="tooltip_icon connecting"></div>
        <div class="tooltip">
            <div class="popover bottom">
                <div class="arrow"></div>
                <div class="popover-content">
                    Asurion Labs is attempting to connect with your phone.<br><br>In order to complete this task, your phone must be turned on and within coverage area.
                </div>
            </div>
        </div>
    </div>
    <div class="button_alarm action-progress sounding" type="alarm" style="display: none;">
        <div class="button_title">Sound Alarm</div>
        <span class="icon webbycons-alarm hidden-xs hidden-sm hidden-md hidden-lg"></span>
        <div class="button_countdown">Sounding
                <span class="countdown hasCountdown" >
                    <span class="alarm_toolset_countdown countdown_row countdown_amount">03:00</span>
                </span>
        </div>
        <div class="working"></div>
        <div class="tooltip_icon connecting"></div>
        <div class="tooltip">
            <div class="popover bottom">
                <div class="arrow"></div>
                <div class="popover-content">
                    A beeping alarm is now sounding on your phone.<br><br>The alarm will sound for 3 minutes or until the Stop Alarm button is pressed on the phone.
                </div>
            </div>

        </div>
    </div>
    <div class="button_alarm outcome unsuccessful" type="alarm" style="display: none;">
        <div class="button_title">Sound Alarm</div>
        <span class="icon webbycons-alarm hidden-xs hidden-sm hidden-md hidden-lg"></span>
        <div class="outcome_text">Failed</div>
        <div class="tryagain button_small">Try Again</div>
        <div class="tooltip_icon outcome unsuccessful"></div>
        <div class="tooltip">
            <div class="popover bottom">
                <div class="arrow"></div>
                <div class="popover-content">
                    Asurion Labs was unable to connect to your phone.<br><br>In order to complete this task, your phone must be turned on and within coverage area.
                </div>
            </div>

        </div>

    </div>
    <div class="button_alarm outcome success" type="alarm" style="display: none;">
        <div class="button_title">Sound Alarm</div>
        <span class="icon webbycons-alarm hidden-xs hidden-sm hidden-md hidden-lg"></span>
        <div class="outcome_text">Ended</div>
        <div class="soundagain button_small">Sound Again</div>
        <div class="tooltip_icon outcome success"></div>
        <div class="tooltip">
            <div class="popover bottom">
                <div class="arrow"></div>
                <div class="popover-content">
                    The beeping alarm sounded for 3 minutes or was manually stopped on the phone.<br><br>Your email address will be displayed on the phone once the alarm is stopped for retrieval purposes.
                </div>
            </div>
        </div>
    </div>

</script>
<script id="lock_toolset_template" type="text/template">
    <div class="button_lock normal report_event pull-left" id="button_lock_normal" type="lock" style="display: block;">
        <div class="button_title_inactive">Lock Phone</div>
        <span class="icon webbycons-lock"></span>
        <div class="tooltip_icon"></div>
        <div class="tooltip"><div class="popover bottom"><div class="arrow"></div><div class="popover-content">This feature will remotely lock your phone to keep your private information safe.<br><br>You can unlock your phone by entering an Asurion Labs password into the locked screen on your phone.
        </div>
        </div>
        </div>
    </div>
    <div class="button_lock connecting" type="lock" style="display: none;">
        <div class="button_title">Lock Phone</div>
        <span class="icon webbycons-lock hidden-xs hidden-sm hidden-md hidden-lg"></span>
        <div class="button_countdown">Connecting
                <span class="countdown hasCountdown" >
                    <span id="lock_toolset_countdown" class="countdown_row countdown_amount">03:00</span>
                </span>
        </div>
        <div class="working"></div>
        <div class="tooltip_icon connecting"></div>
        <div class="tooltip"><div class="popover bottom"><div class="arrow"></div><div class="popover-content">Asurion Labs is attempting to connect with your phone.<br><br>In order to complete this task, your phone must be turned on and within coverage area.</div></div></div>
    </div>
    <div class="button_lock outcome unsuccessful" type="lock" style="display: none;">
        <div class="button_title">Lock Phone</div>
        <span class="icon webbycons-lock hidden-xs hidden-sm hidden-md hidden-lg"></span>
        <div class="outcome_text">Failed</div>
        <div class="tryagain button_small">Try Again</div>
        <div class="tooltip_icon outcome unsuccessful"></div>
        <div class="tooltip"><div class="popover bottom"><div class="arrow"></div><div class="popover-content">Asurion Labs was unable to connect to your phone.<br><br>In order to complete this task, your phone must be turned on and within coverage area.</div></div></div>

    </div>
    <div class="button_lock locked" type="lock" style="display: none;">
        <div class="button_title">Phone Locked</div>
        <span class="icon webbycons-lock hidden-xs hidden-sm hidden-md hidden-lg"></span>
        <span class="icon webbycons-lock"></span>
        <div class="tooltip_icon outcome success"></div>
        <div class="tooltip"><div class="popover bottom"><div class="arrow"></div><div class="popover-content">Your phone is currently locked.<br><br>To unlock your phone, you will need to enter your Asurion Labs password into the locked screen on your phone.</div></div></div>
    </div>

</script>
<script id="content_template" type="text/template">
    <div id="page_panes">
        <div id="data_tab"></div>
        <div id="dashboard_main_tab"></div>
        <div id="location_tab"class="<%if(AMA.Util.isIPhone()){%>iphone<%}%>"> </div>
        <div id="security_tab"></div>
        <div id="app_assist_tab" class="tab_container"></div>
        <div id="support_tab" class=""></div>
        <div id="download_app_tab" class="tab_container hidden" ></div>
    </div>

</script>
<script id="wipe_toolset_template" type="text/template">
    <div class="button_wipe normal report_event pull-left"  id="button_wipe_normal">
        <div class="button_title_inactive">Erase Data</div>
        <span class="icon webbycons-erase"></span>
        <div class="tooltip_icon"></div>
        <div class="tooltip">
            <div class="popover bottom"><div class="arrow"></div><div class="popover-content">
                This feature will delete the data that is saved on your phone.<br /><br />
                <span class="wipe hidden">Only your contacts will be synced before they are erased so you can restore them to a new or found phone at a later time.</span>
                <span class="wipeonly hidden">At this time Asurion Labs does not backup or restore your data. If your data is not backed up, performing the Erase Data feature will permanently erase your data.</span>
                <span class="lockenabled hidden"><br /><br />Your phone will also be locked.</span>
                <span class="isblackberry hidden"><br /><br />Blackberry users: You must have set up a password on your phone prior to using the lock phone feature.</span>
            </div>
            </div>
        </div>
    </div>
    <div class="button_wipe connecting hidden">
        <div class="button_title">Erase Data</div>
        <span class="icon webbycons-erase hidden-xs hidden-sm hidden-md hidden-lg"></span>
        <div class="button_countdown">Connecting<span class="countdown hasCountdown" >
                <span id="wipe_toolset_countdown" class="countdown_row countdown_amount"></span>
            </span>
        </div>
        <div class="working"></div>
        <div class="tooltip_icon connecting"></div>
        <div class="tooltip"><div class="popover bottom"><div class="arrow"></div><div class="popover-content">Asurion Labs is attempting to connect with your phone.<br><br>In order to complete this task, your phone must be turned on and within coverage area.</div></div></div>
    </div>
    <div class="button_wipe action-progress syncing hidden">
        <div class="button_title">Erase Data</div>
        <span class="icon webbycons-erase hidden-xs hidden-sm hidden-md hidden-lg"></span>
        <div class="button_countdown">Syncing</div>
        <div class="working"></div>
        <div class="tooltip_icon connecting"></div>
        <div class="tooltip">
            Asurion Labs is attempting to make a backup copy of your contacts before erasing them from your phone so you can restore them to a new or found phone at a later time.<br /><br />
            You may close the website while the sync and erase are happening.
        </div>
    </div>
    <div class="button_wipe action-progress erasing hidden">
        <div class="button_title">Erase Data</div>
        <span class="icon webbycons-erase hidden-xs hidden-sm hidden-md hidden-lg"></span>
        <div class="button_countdown">Erasing</div>
        <div class="working"></div>
        <div class="tooltip_icon inprogress"></div>
        <div class="tooltip long">
            Erase Data In Progress:<br /><br />
            Audio files: <span class="total_erased_audio">0/0</span><br />
            Call log: <span class="total_erased_calllog">0/0</span><br />
            Calendar: <span class="total_erased_calendar">0/0</span><br />
            Contacts: <span class="total_erased_contact">0/0</span><br />
            Folders: <span class="total_erased_folder">0/0</span><br />
            Media files: <span class="total_erased_mediafiles">0/0</span><br />
            Photos: <span class="total_erased_photo">0/0</span><br />
            Text messages: <span class="total_erased_sms">0/0</span><br />
            Videos: <span class="total_erased_video">0/0</span>
            <br /><br />You may close the website while the erase is happening.
        </div>
    </div>
    <div class="button_wipe outcome unsuccessful hidden">
        <div class="button_title">Erase Data</div>
        <span class="icon webbycons-alarm hidden-xs hidden-sm hidden-md hidden-lg"></span>
        <div class="outcome_text">Failed</div>
        <div class="tryagain button_small">Try Again</div>
        <div class="tooltip_icon outcome unsuccessful"></div>
        <div class="tooltip"><div class="popover bottom"><div class="arrow"></div><div class="popover-content">Asurion Labs was unable to connect to your phone.<br><br>In order to complete this task, your phone must be turned on and within coverage area.</div></div></div>

    </div>
    <div class="button_wipe outcome success hidden">
        <div class="button_title">Erase Data</div>
        <span class="icon webbycons-alarm hidden-xs hidden-sm hidden-md hidden-lg"></span>
        <div class="outcome_text">Success</div>
        <!--<div class="restoresteps button_small">Restore Steps</div>-->
        <div class="tooltip_icon outcome success"></div>
        <div class="tooltip long"><div class="popover bottom"><div class="arrow"></div><div class="popover-content">
            The following items were erased from your phone:<br /><br />
            Audio files: <span class="total_erased_audio">0/0</span><br />
            Call log: <span class="total_erased_calllog">0/0</span><br />
            Calendar: <span class="total_erased_calendar">0/0</span><br />
            Contacts: <span class="total_erased_contact">0/0</span><br />
            Folders: <span class="total_erased_folder">0/0</span><br />
            Media files: <span class="total_erased_mediafiles">0/0</span><br />
            Photos: <span class="total_erased_photo">0/0</span><br />
            Text messages: <span class="total_erased_sms">0/0</span><br />
            Videos: <span class="total_erased_video">0/0</span>
            <br /><br />Your phone has also been locked.
        </div>
        </div>
        </div>
    </div>
</script>
<script type="text/template" id="wipephonedialog_template">
    <div id="wipephone_dialog" class="modal-dialog" style="">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <h3>
                    <span class="wipe">Erase Data</span>
                    <span class="reset hidden">Factory Reset</span>
                    <span class="resetsuccess hidden">Factory Reset Successful</span>
                </h3>
            </div>
            <div class="modal-body">
                <div class="instructions">
                    <div class="step1 wiz_step">
                        <ul>
                            <li class="wipereset">
                                <div class="no_choice">Choose an option below:</div>
                                <input class="no_choice" type="radio" id="wipephone_wipe" name="wipephone" checked="checked">
                                <label for="wipephone_wipe" class="no_choice wipephone_wipe_label">Erase Data
                                    <span class="no_lock"> &amp; Lock Phone</span>
                                </label>
                                <div class="no_choice description">This feature will erase data from your device. Depending on your device, this may include contacts, text messages, calendar and call history from your device, as well as photos, videos, and audio from your external memory card.</div>
                                <input class="no_choice" type="radio" id="wipephone_reset" name="wipephone">
                                <label class="no_choice" for="wipephone_reset">Factory reset my phone</label>
                                <div class="description">This will erase all data and apps stored on the phone, including Asurion Labs so the service will be nonfunctional until you redownload the app.</div>
                            </li>
                            <li class="wipeonly">
                                <div class="warning">
                                    <div>
                                        <b>At this time Asurion Labs does not backup or restore your data. If your data is not backed up, performing the Erase Data feature will permanently erase your data
                                            <span class="wipereset"> and apps</span>
                                            from your phone.</b>
                                    </div>
                                    <div class="no_lock">Your phone will also be locked.</div>
                                </div>
                            </li>
                            <li class="wipesync">
                                <div class="warning">
                                    <div>This feature will erase select data from your device. Depending on your device, this may include contacts, text messages, calendar and call history from your device, as well as photos, videos and audio from your external memory card.</div>
                                    <div class="no_lock">Your phone will also be locked.</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="step2 wiz_step">
                        <div class="confirm">
                            <ul>
                                <li class="warning erase">
                                    <div>This feature will erase data from your device. Depending on your device, this may include contacts, text messages, calendar and call history from your device, as well as photos, videos and audio from your external memory card.</div>
                                    <div class="no_lock">Your phone will also be locked.</div>
                                </li>
                                <li class="warning factoryreset">
                                    This feature will factory reset your device to the state it was in when purchased. This will include
                                    erasing most of the apps and data from the device.<br /><br />
                                    Pre-installed apps cannot be erased from the device and we may not be able to erase data or apps that
                                    have been installed in external memory such as an SD card.
                                </li>
                                <li class="warning optionalsync">
                                    <b>Optional Data Sync</b><br /><br />
                                    If you would like to perform a Sync before
                                    <span class="wipingorresetting_wiping">erasing the data on your phone,</span>
                                    <span class="wipingorresetting_resetting">resetting your phone to factory settings,</span>
                                    press the
                                    <b>Sync Then
                                        <span class="wipingorresetting_wiping">Erase Data</span>
                                        <span class="wipingorresetting_resetting">Reset Phone</span>
                                    </b> button.
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="resetsuccess wiz_step">
                        <ul>
                            <li>
                                <div>
                                    Asurion Labs has successfully factory reset your phone.<br /><br />
                                    All data and apps were deleted, including the Asurion Labs app, so the locate and secure features are no longer available to you.<br /><br />
                                    To restart your coverage, download and install the Asurion Labs app to a new or found phone.
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>


            </div>
            <div class="modal-footer">
                <div class="step1_buttons hidden">
                    <div class="dialog_buttons">
                        <button type="button" class="btn btn-primary btn_erase sync">Erase Data</button>
                        <button type="button" class="btn btn-primary btn_erase nosync">Erase Data</button>
                        <button type="button" class="btn btn-primary btn_erase_and_lock sync">Erase Data &amp; Lock Phone</button>
                        <button type="button" class="btn btn-primary btn_erase_and_lock nosync">Erase Data &amp; Lock Phone</button>
                        <a href="javascript:void(0)" class="btn btn-primary btn_next next">Next</a>
                        <a href="javascript:void(0)" class="btn btn-primary btn_cancel">Cancel</a>
                    </div>
                </div>
                <div class="step2_buttons hidden">
                    <div class="dialog_buttons">
                        <button type="button" class="btn btn-primary btn_factory_reset_device sync">Factory Reset Device</button>
                        <button type="button" class="btn btn-primary btn_factory_reset_device nosync">Factory Reset Device</button>
                        <button type="button" class="btn btn-primary btn_erase sync">Erase Data</button>
                        <button type="button" class="btn btn-primary btn_erase nosync">Erase Data</button>
                        <button type="button" class="btn btn-primary btn_erase_and_lock sync">Erase Data &amp; Lock Phone</button>
                        <button type="button" class="btn btn-primary btn_erase_and_lock nosync">Erase Data &amp; Lock Phone</button>
                        <button type="button" class="btn btn-primary btn_sync_then_wipe">Sync Then Erase Data</button>
                        <button type="button" class="btn btn-primary btn_nosync_then_wipe">Erase Data Without Sync</button>
                        <button type="button" class="btn btn-primary btn_sync_then_reset">Sync Then Reset Phone</button>
                        <button type="button" class="btn btn-primary btn_nosync_then_reset">Reset Phone Without Sync</button>                                    
                        <a href="javascript:void(0)" class="btn btn-primary btn_cancel">Cancel</a>                        
                    </div>
                </div>
                <div class="resetsuccess_buttons hidden">
                    <div class="dialog_buttons">
                    	<a href="javascript:void(0)" id="logout_link" class="btn btn-primary btn_logout">Logout</a>
                    </div>                	
                </div>
            </div>
        </div>

    </div>

</script>
<script id="locate_toolset_template" type="text/template">
    <div class="button_locate normal report_event pull-left" id="button_locate_normal" type="locate" style="display: block;">
        <div class="button_title_inactive">Locate Phone</div>
        <span class="icon webbycons-locate"></span>

        <div class="tooltip_icon" ></div>
        <div class="tooltip">
            <div class="popover bottom">
                <div class="arrow"></div>
                <div class="popover-content">
                    This feature will utilize GPS technology to locate your phone and will display the location on the map below.<br><br>For fastest and most accurate location responses, be sure to have all GPS and Location Services on your phone set to On.
                </div>
            </div>
        </div>
    </div>
    <div class="hidden normal_iPhone_tooltip">This feature will locate your phone and will display the location on the map below.<br><br>
        Note: Location responses initiated from your device may be more accurate than those initiated from the web</div>
    <div class="button_locate connecting" type="locate" style="display: none;">
        <div class="button_title">Locate Phone</div>
        <span class="icon webbycons-location hidden-sm hidden-md hidden-lg"></span>
        <div class="button_countdown">Connecting<span class="hidden-xs">...</span>
                <span class="countdown hasCountdown" >
                    <span class="locate_toolset_countdown countdown_row countdown_amount">03:00</span>
                </span>
        </div>
        <div class="working"></div>
        <div class="tooltip_icon connecting hidden-xs"></div>
        <div class="tooltip">
            <div class="popover bottom">
                <div class="arrow"></div>
                <div class="popover-content">
                    Asurion Labs is attempting to connect with your phone.<br><br>In order to complete this task, your phone must be turned on and within coverage area.
                </div>
            </div>
        </div>
    </div>
    <div class="button_locate action-progress refining" type="locate" style="display: none;">
        <div class="button_title">Locate Phone</div>
        <span class="icon webbycons-location hidden-sm hidden-md hidden-lg"></span>
        <div class="button_countdown">Refining<span class="hidden-xs">...</span>
        	<span class="countdown hasCountdown" >
            	<span class="locate_toolset_countdown countdown_row countdown_amount">03:00</span>
            </span>
        </div>
        <div class="tooltip_icon refining hidden-xs"></div>
        <div class="tooltip">
            <div class="popover bottom">
                <div class="arrow"></div>
                <div class="popover-content">
                    Asurion Labs has connected with your phone.<br><br>The system is now utilizing different location methods to get the most accurate location for your phone.
                </div>
            </div>
        </div>
    </div>
    <div class="button_locate outcome unsuccessful" type="locate" style="display: none;">    	
        <div class="button_title">Locate Phone</div>
        <span class="icon webbycons-location hidden-sm hidden-md hidden-lg"></span>
        <div class="outcome_text">Failed</div>
        <div class="tryagain button_small">Try Again</div>
        <div class="tooltip_icon outcome unsuccessful hidden-xs"></div>
        <div class="tooltip">
            <div class="popover bottom">
                <div class="arrow"></div>
                <div class="popover-content">
                    Asurion Labs was unable to connect to your phone.<br><br>In order to complete this task, your phone must be turned on and within coverage area.<br><br>Check the Previous Stored Locations for the last recorded location of your phone.
                </div>
            </div>
        </div>

    </div>
    <div class="button_locate outcome success" type="locate" style="display: none;">    	
        <div class="button_title">Locate Phone</div>
        <span class="icon webbycons-location hidden-sm hidden-md hidden-lg"></span>
        <div class="outcome_text">Success</div>
        <div class="locateagain button_small">Locate Again</div>
        <div class="tooltip_icon outcome success hidden-xs"></div>
        <div class="tooltip">
            <div class="popover bottom">
                <div class="arrow"></div>
                <div class="popover-content">
                    Your phone has been located and its location is displayed on the map below.
                </div>
            </div>
        </div>
    </div>
    <div class="button_locate outcome cancelled" type="locate" style="display: none;">
        <div class="button_title">Locate Phone</div>
        <span class="icon webbycons-location hidden-sm hidden-md hidden-lg"></span>
        <div class="outcome_text">Cancelled</div>
        <div class="tryagain button_small">Try Again</div>        
        <div class="tooltip_icon outcome unsuccessful hidden-xs"></div>
        <div class="tooltip">
            <div class="popover bottom">
                <div class="arrow"></div>
                <div class="popover-content">Locate command has been cancelled.</div>
            </div>
        </div>        
    </div>
</script>
<script id="securephone_toolset_template" type="text/template">
    <div class="button_securephone normal">
        <div class="button_title_inactive">Secure Phone</div>
        <span class="icon webbycons-big-shield"></span>
        <div class="tooltip_icon"></div>
        <div class="tooltip">
            <div class="popover bottom">
                <div class="arrow"></div>
                <div class="popover-content">
                    This feature will allow you to sound a beeping alarm from your phone, send a custom message to your phone and erase the contacts from your phone.<br /><br />
                    This will also attempt to get an updated location of your phone.
                </div>
            </div>
        </div>
    </div>
    <div class="button_securephone connecting hidden">
        <div class="button_title">Secure Phone</div>
        <div class="button_countdown">Connecting</div>
        <div class="working"></div>
        <div class="tooltip_icon connecting"></div>
        <div class="tooltip">
            <div class="popover bottom">
                <div class="arrow"></div>
                <div class="popover-content">
                    Asurion Labs is attempting to connect with your phone.<br /><br />
                    In order to complete this task, your phone must be turned on and within coverage area.
                </div>
            </div>
        </div>
    </div>
    <div class="button_securephone action-progress announcing hidden">
        <div class="button_title">Secure Phone</div>
        <div class="button_countdown">In Progress<br />
            <span class="countdown hasCountdown" >
                <span class="securephone_toolset_countdown countdown_row countdown_amount"></span>
            </span>
        </div>
        <div class="working"></div>
        <div class="tooltip_icon connecting"></div>
        <div class="tooltip">
            <div class="popover bottom">
                <div class="arrow"></div>
                <div class="popover-content">
                    Asurion Labs is attempting to connect with your phone.<br /><br />
                    In order to complete this task, your phone must be turned on and within coverage area.
                </div>
            </div>
        </div>
    </div>
    <div class="button_securephone action-progress retrying hidden">
        <div class="button_title">Secure Phone</div>
        <div class="button_countdown">Retry<span class="hidden-xs">&nbsp;</span>
        	<span class="hidden-sm hidden-md hidden-lg"><br /></span>
        	<span class="securephone_retry_current"></span>&nbsp;of&nbsp;<span class="securephone_retry_total"></span><br />
            <span class="countdown hasCountdown" >
                <span class="securephone_toolset_countdown countdown_row countdown_amount"></span>
            </span>
        </div>
        <div class="working"></div>
        <div class="tooltip_icon connecting"></div>
        <div class="tooltip">
            <div class="popover bottom">
                <div class="arrow"></div>
                <div class="popover-content">
                    Asurion Labs is attempting to connect with your phone.<br /><br />
                    In order to complete this task, your phone must be turned on and within coverage area.
                </div>
            </div>
        </div>
    </div>
</script>
<script type="text/template" id="securephone_dialog_template">
    <div id="securephone_dialog" class="modal-dialog" style="">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h3>                    
					Secure Phone<span class="securephone_retry hidden">&nbsp;- Retry&nbsp;<span class="securephone_retry_current"></span>&nbsp;of&nbsp;<span class="securephone_retry_total"></span></span>                    
                </h3>
            </div>
            <div class="modal-body">
                <div class="instructions">
					<div class="step1 wiz_step">
						<div class="note">
							This feature will sound a beeping alarm from your phone.  If we connect with your phone, an updated location will be recorded.  You may also check the boxes to perform the features listed below.
						</div>
                <!-- Announce -->
						<hr class=""></hr>
                <div class="bs-callout bs-callout-danger error containsprofanity">Please remove profanity before sending message.</div>
                <div class="bs-callout bs-callout-danger error notext">Please enter an announcement before submitting.</div>
                <div class="announce">
                    <div class="announce_description">
								<label for="securephone_announce"><input type="checkbox" id="securephone_announce"><b>Announce:</b> Send a custom message to my device (250 character max).</label>
                        <div class="announce_edit">You may edit the default message below:</div>
                    </div>
                    <textarea id="securephone_announce_message" maxlength="250" disabled="disabled">The owner of this phone is attempting to locate it. You may contact the owner at </textarea>
                    <div id="securephone_announce_default_message" class="hidden">The owner of this phone is attempting to locate it. You may contact the owner at </div>
                    <div class="charcounttext">
                        <span id="securephone_announce_charcount">0</span> characters
                    </div>
                </div>

						<!-- Erase Contacts -->
						<hr class=""></hr>
						<div class="wipe">
							<div class="wipe_description">								
								<label for="securephone_wipe"><input type="checkbox" id="securephone_wipe"><b>Erase Contacts:</b> Erase the contacts from my device to secure my privacy. You can later restore any contacts saved by this service to a new or found device.</label>
							</div>
						</div>

					</div>

					<!-- Progress/Unsuccessful/Successful dialog -->
					<div class="step2 wiz_step">
						<div class="description waiting hidden">Asurion Labs is attempting to connect with your phone. In order to complete this task, your phone must be turned on and within coverage area.</div>
						<div class="description success hidden">Secure features complete.</div>
						<div class="description fail hidden">Secure features timed out.</div>
						<div class="countdown_text">
							Time remaining: Less than&nbsp;<span class="securephone_toolset_countdown countdown"></span>
						</div>
						<hr class="countdowndivider"></hr>
						<div class="alarm feature">
							<span class="featurename">Sound Alarm:</span>
							<span class="status alarm waiting hidden">Waiting For Response</span>
							<span class="status alarm fail hidden">Command Sent</span>
							<span class="status alarm success hidden">Command Sent</span>
						</div>
						<hr class=""></hr>
						<div class="locate feature">
							<span class="featurename">Locate Phone:</span>
							<span class="status locate waiting hidden">Waiting For Response</span>
							<span class="status locate fail hidden">Unable To Update Location</span>
							<span class="status locate success hidden">Location Updated On Map</span>
						</div>
						<hr class=""></hr>
						<div class="announce feature">
							<span class="featurename">Announce:</span>
							<span class="status announce waiting hidden">Waiting For Response</span>
							<span class="status announce fail hidden">Unable To Confirm Delivery</span>
							<span class="status announce success hidden">App Opened - Message Delivered</span>
						</div>
						<hr class="divider-announce"></hr>
						<div class="wipe feature">
							<span class="featurename">Erase Contacts:</span>
							<span class="status wipe waiting hidden">Waiting For Response</span>
							<span class="status wipe fail hidden">Unable To Erase Contacts</span>
							<span class="status wipe success hidden"><span class="contact_count"></span> Contacts Erased</span>
						</div>
						<hr class="divider-wipe"></hr>
					</div>
                </div>

            </div>
            
            <div class="modal-footer">
                <div class="dialog_buttons">
                    <a href="javascript:void(0)" class="btn btn-primary btn_submit">Submit</a>
                    <a href="javascript:void(0)" class="btn btn-primary btn_cancel">Cancel</a>
                </div>
            </div>
        </div>

    </div>
</script>
<script id="scan_toolset_template" type="text/template">
    <div class="button_security_scan normal report_event pull-left" id="button_scan_normal" type="scan" style="display: block;">
        <div class="button_title_inactive">Scan Phone</div>
        <span class="icon webbycons-big-shield"></span>
        <div class="tooltip_icon"></div>
        <div class="tooltip">
            <div class="popover bottom">
                <div class="arrow"></div>
                <div class="popover-content">
                    This feature will scan your phone for any potential threats or malware.<br /><br />
                    Your phone will also be automatically scanned based on your <a class="link_text" id="edit_security_settings">auto-scan schedule.</a>
                </div>
            </div>
        </div>
    </div>
    <div class="button_security_scan connecting" type="scan" style="display: none;">
        <div class="button_title">Scan Phone</div>
        <span class="icon webbycons-big-shield hidden-sm hidden-md hidden-lg"></span>
        <div class="button_countdown">Connecting...
            <span class="countdown hasCountdown" >
                <span class="scan_toolset_countdown countdown_row countdown_amount">03:00</span>
            </span>
        </div>
        <div class="working"></div>
        <div class="tooltip_icon connecting"></div>
        <div class="tooltip">
            <div class="popover bottom">
                <div class="arrow"></div>
                <div class="popover-content">
                    Asurion Labs is attempting to connect with your phone.<br><br>In order to complete this task, your phone must be turned on and within coverage area.
                </div>
            </div>

        </div>
    </div>
    <div class="button_security_scan action-progress scanning" type="scan" style="display: none;">
        <div class="button_title">Scan Phone</div>
        <span class="icon webbycons-big-shield hidden-sm hidden-md hidden-lg"></span>
        <div class="button_countdown">Scanning...</div>
        <div class="working"></div>
        <div class="tooltip_icon connecting"></div>
        <div class="tooltip">
            <div class="popover bottom">
                <div class="arrow"></div>
                <div class="popover-content">
                    Your phone is now being scanned.<br><br>Kindly wait for the scanning to be finished.
                </div>
            </div>

        </div>
    </div>
    <div class="button_security_scan outcome unsuccessful" scan="alarm" style="display: none;">
        <div class="button_title">Scan Phone</div>
        <span class="icon webbycons-big-shield hidden-sm hidden-md hidden-lg"></span>
        <div class="outcome_text">Unsuccessful</div>
        <div class="tryagain button_small">Try Again</div>
        <div class="tooltip_icon outcome unsuccessful"></div>
        <div class="tooltip">            <div class="popover bottom">
            <div class="arrow"></div>
            <div class="popover-content">
                <div class="popover bottom">
                    <div class="arrow"></div>
                    <div class="popover-content">
                        Asurion Labs was unable to connect to your phone.<br><br>In order to complete this task, your phone must be turned on and within coverage area.
                    </div>
                </div>
            </div>
        </div>
        </div>
    </div>
    <div id="button_scan_ended" class="button_security_scan outcome scanned" type="alarm" style="display: none;">
        <div class="button_title">Scan Phone</div>
        <span class="icon webbycons-big-shield hidden-sm hidden-md hidden-lg"></span>
        <div class="outcome_text">Ended</div>
        <div class="tooltip_icon outcome success"></div>
        <div class="tooltip">
            <div class="popover bottom">
                <div class="arrow"></div>
                <div class="popover-content">
                    Successfuly scanned your phone.<br><br>See the results below.
                </div>
            </div>
        </div>
    </div>
</script>
<script id="diagnostic_scan_toolset_template" type="text/template" >
	<div class="button_healthscan normal" id="button_healthscan_normal" type="healthScan" style="display: block;">
        <div class="button_title_inactive">Diagnostics</div>
        <span class="icon webbycons-search"></span>
        <div class="tooltip_icon"></div>
        <div class="tooltip"><div class="popover bottom"><div class="arrow"></div><div class="popover-content">
            Performing Diagnostic scan on your phone will provide storage, memory, and battery diagnostics to help you improve your phone's performance.<br><br>In addition to overall performance, the Diagnostic Scan will also show you how the apps installed on your phone are affecting its speed and battery life.
        </div>
        </div>
        </div>
    </div>
    <div class="button_healthscan connecting" style="display: none;">
        <div class="button_title">Diagnostics</div>
        <span class="icon webbycons-search hidden-sm hidden-md hidden-lg"></span>
        <div class="button_countdown">Connecting...
                <span class="countdown hasCountdown" >
                    <span class="diagnostic_toolset_countdown countdown_row countdown_amount">05:00</span>
                </span>
        </div>
        <div class="working"></div>
        <div class="tooltip_icon connecting"></div>
        <div class="tooltip"><div class="popover bottom"><div class="arrow"></div><div class="popover-content">Asurion Labs is attempting to connect with your phone.<br><br>In order to complete this task, your phone must be turned on.</div></div></div>
    </div>
    <div class="button_healthscan action-progress scanning" style="display: none;">
        <div class="button_title">Diagnostics</div>
        <span class="icon webbycons-search hidden-sm hidden-md hidden-lg"></span>
        <div class="button_countdown">Scanning...
        		<span class="countdown hasCountdown" >
                    <span class="diagnostic_toolset_countdown countdown_row countdown_amount">05:00</span>
                </span>
        </div>
        <div class="working"></div>
        <div class="tooltip_icon connecting"></div>
        <div class="tooltip"><div class="popover bottom"><div class="arrow"></div><div class="popover-content">Your Diagnostic Scan has begun. Memory, battery usage, and currently running application information will be updated shortly.</div></div></div>
    </div>
    <div class="button_healthscan outcome unsuccessful" style="display: none;">
        <div class="button_title">Diagnostics</div>
        <span class="icon webbycons-search hidden-sm hidden-md hidden-lg"></span>
        <div class="outcome_text">Unsuccessful</div>
        <div class="tryagain button_small">Try Again</div>
        <div class="tooltip_icon outcome unsuccessful"></div>
        <div class="tooltip"><div class="popover bottom"><div class="arrow"></div><div class="popover-content">Asurion Labs was unable to connect to your phone.<br><br>In order to complete this task, your phone must be turned on and within coverage area.</div></div></div>
    </div>
    <div class="button_healthscan outcome scanned" style="display: none;" data-toggle="modal" data-target="#myModal">
        <div class="button_title">Diagnostics</div>
        <span class="icon webbycons-search hidden-sm hidden-md hidden-lg"></span>
        <div class="outcome_text">Complete</div>
        <div class="health_scan_view_details viewdetails button_small">View Results</div>
        <div class="tooltip_icon outcome success"></div>
        <div class="tooltip"><div class="popover bottom"><div class="arrow"></div><div class="popover-content">Your Diagnostic Scan is complete.  Select View Details to see memory, battery usage, and currently running application information.</div></div></div>
    </div>
</script>
<script id="app_assist_toolset_template" type="text/template">
        <!--<h5 class="title">Mobile App Count</h5>-->
        <p class="privacy_content"><%=total%> Apps are installed on your phone.</p>
        <p class="privacy_content">
            The details below show how those apps affects your privacy, the ratings are assigned based on what kind of personal information the app can access.
        </p>
</script>
<script id="survey_dialog_template" type="text/template" >
    <div class="modal-content">
        <div class="modal-header">
            <button id="survey_close" type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title">Feedback</h4>
        </div>
        <div class="modal-body">
			<div id="survey_step1" class="fb_text">
				<div id="survey_stars">
					<div class="surveyquestion"></div>
					<div class="ratingdiv">
						<span id="survey_stars_rating1" class="starrating glyphicon glyphicon-star"></span>
						<span id="survey_stars_rating2" class="starrating glyphicon glyphicon-star"></span>
						<span id="survey_stars_rating3" class="starrating glyphicon glyphicon-star"></span>
						<span id="survey_stars_rating4" class="starrating glyphicon glyphicon-star"></span>
						<span id="survey_stars_rating5" class="starrating glyphicon glyphicon-star"></span>
					</div>
					<div class="survey_error bs-callout bs-callout-danger">No Rating Chosen. Please click on a star to give your app rating.</div>
				</div>
				<div id="survey_text">
					<div class="surveyquestion"></div>
					<textarea id="survey_text_textarea" rows="7" cols="95"></textarea>
					<div class="survey_error">
						<span class="survey_error_no_comment bs-callout bs-callout-danger">Please provide your comment.&nbsp;</span>
						<span class="survey_error_min_length bs-callout bs-callout-danger">Please enter at least&nbsp;
							<span class="survey_text_min_chars"></span>&nbsp;characters.
						</span>
					</div>
				</div>
			</div>
			<div id="survey_step2" class="sv_text">
				<div class="surveyquestion">
					Thank you for sharing your feedback.<br>
				</div>
			</div>            
        </div>
        
        <div class="modal-footer">
			<div id="survey_send_feedback">
				<a href='javascript:void(0)' class='submit surveyBtn btn btn-primary'>Send Feedback</a>
				<a href='javascript:void(0)' class="cancel surveyBtn btn btn-default">No Thanks</a>
			</div>
			<div id="sv_text_close_div">
				<a href='javascript:void(0)' id="close" class="surveyBtn btn btn-primary">Close</a>
			</div>
        </div>
    </div>    
</script>
<script id="app_rating_dialog_template" type="text/template">
    <div class="modal-content">
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title">App Rating</h4>
        </div>
        <div class="modal-body">
			<p>Please take a moment to rate us.</p>
        </div>
        <div class="modal-footer">
		    <div id="apprating_send_feedback">
		        <a href="javascript:void(0)" id="app_rating_dialog_rate_now" class="btn btn-primary surveyBtn">Rate App Now</a>
		        <a href="javascript:void(0)" id="app_rating_dialog_rate_later" class="btn btn-primary surveyBtn">Remind Me Later</a>
		        <a href="javascript:void(0)" id="app_rating_dialog_rate_never" class="btn btn-default surveyBtn">No, Thank You</a>
		    </div>
        </div>
    </div>    
</script>
        <script id="shared_feedback_toolset_template" type="text/template">
            <!-- Share feedback dialog placeholder -->
            <div id="shared_feedback_dialog" class="shared_feedback_dialog dialog " style="display:none"></div>

        </script>
        <script type="text/template" id="shared_feedback_dialog_template">
            <div class="header">
                <div class="title">Share Feedback</div>
            </div>
            <div class="close"></div>
            <div class="feedbackmain">
                <div class="instructions">
                    <div class="fb step1 wiz_step">
                        <div id="survey_q1">How likely is it you would recommend Asurion Labs to a friend or colleague?</div>
                        <form name="fb_radio">
                            <div id="fb_radio">
                                <span><input type="radio" name="fb_rate" id="fb_rate0" value="Definitely not"><label for="fb_rate0"><br>Definitely<br>Not</label></span>
                                <span><input type="radio" name="fb_rate" id="fb_rate1" value="Probably not"><label for="fb_rate1"><br>Probably<br>Not</label></span>
                                <span><input type="radio" name="fb_rate" id="fb_rate2" value="Might or might not"><label for="fb_rate2"><br>Might or might not</label></span>
                                <span><input type="radio" name="fb_rate" id="fb_rate3" value="Probably would"><label for="fb_rate3"><br>Probably<br>Would</label></span>
                                <span><input type="radio" name="fb_rate" id="fb_rate4" value="Definitely would"><label for="fb_rate4"><br>Definitely<br>Would</label></span>
                            </div>
                        </form>
                        <div id="feedback_validation_error" class="hide" >Please select rating.</div>
                        <div class="fb_radio_submit">
                            <div class="fb_radio_submit_btn btn">Next</div>
                        </div>
                    </div>
                    <div class="fb step2 wiz_step hide">
                        <div class="fb_text">
                            Please tell us why you chose that rating.<br>
                            <textarea id="fb_reason" name="fb_reason" rows="7" cols="95"></textarea>
                        </div>
                        <div id="feedback_reason_error" class="hide">Please provide a reason!</div>
                        <div class="fb_text_submit">
                            <div class="btn fb_text_submit_btn">Submit</div>
                        </div>
                        <div class="fb_note">
                            *Note: This survey is not for support requests. Please check the&nbsp;<a href="index.html#help" target="_blank">help center</a>&nbsp;or call 0843 373 4400 for&nbsp;<span>support</span>.</span>
                        </div>
                    </div>
                    <div class="fb step3 wiz_step hide">
                        <div class="fb_text">
                            Thank you for submitting your feedback to the LABS team.
                        </div>
                        <div id="fb_text_close_div" class="close btn">
                            Close
                        </div>
                    </div>
                </div>
            </div>
        </script>
        <div class="status_detail_msg hidden">
            <span class="AIRPLANE_MODE">Sync stopped - device on airplane mode</span>
            <span class="FILE_NOT_FOUND">Sync stopped - no SD card available/Files not found</span>
            <span class="LOW_BATTERY">Sync stopped by user - low battery</span>
            <span class="NETWORK_ERROR">Sync stopped - no network available</span>
            <span class="NETWORK_ROAMING_DETECTED">Sync stopped  - network roaming detected</span>
            <span class="NETWORK_SETTINGS_CONFLICT">Sync stopped - network settings conflict</span>
            <span class="PHONE_STORAGE_EXCEEDED">Sync stopped - phone storage exceeded</span>
            <span class="SD_UNAVAILABLE">Sync stopped - no SD card available/Files not found</span>
            <span class="SYNC_FAILED">Sync Failed</span>
            <span class="SYSTEM_UNAVAILABLE">Sync stopped - system unavailable</span>
            <span class="TIME_CONSUMING">Sync stopped by user - time consuming sync</span>
            <span class="USER_STOPPED">Sync stopped by user</span>
            <span class="WEB_STORAGE_EXCEEDED">Sync stopped - storage capacity exceeded</span>
            <span class="SYNC_STOPPED">Sync stopped</span>
        </div>
        <div class="sync_detail_msg hidden">
            <span class="syncing">Syncing</span>
            <span class="waiting_to_sync">Waiting to Sync</span>
            <span class="no_change">No Change</span>
            <span class="pending">Pending</span>
            <span class="syncing_of"> of </span>
        </div>
        <div id="tipstorecover"></div>

<script id="feedback_template" type="text/template">
    <!-- Feedback-related dialogs -->
    <div id="app_rating_dialog" class="app_rating_dialog modal fade" role="dialog" aria-labelledby="appratingDialog" aria-hidden="true"></div>
    <div id="share_feedback_dialog" class="modal fade share_feedback_dialog" role="dialog" aria-labelledby="shareFeedbackDialog" aria-hidden="true"></div>
    <div id="survey_dialog" class="modal fade" role="dialog" aria-labelledby="surverDialog" aria-hidden="true"></div>
</script>

<script type="text/template" id="share_feedback_dialog_template">
    <div class="survey_dialog modal-dialog">
    <div class="modal-content">
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title">Share Feedback</h4>
        </div>
        <div class="modal-body">
            <div class="instructions">
                <div class="fb step1 wiz_step">
                    <div id="survey_q1">How likely is it you would recommend Asurion Labs to a friend or colleague?</div>
                    <form name="fb_radio">
                        <div id="fb_radio">
                            <div class="btn-group" data-toggle="buttons">
                                <label class="btn btn-primary ">
                                    <input type="radio" name="fb_rate" id="fb_rate0" value="Definitely not"> Definitely <br class="hidden-xs" />Not
                                </label>
                                <label class="btn btn-primary">
                                    <input type="radio" name="fb_rate" id="fb_rate1" value="Probably not"> Probably <br class="hidden-xs" />Not
                                </label>
                                <label class="btn btn-primary">
                                    <input type="radio" name="fb_rate" id="fb_rate2" value="Might or might not">Might or <br class="hidden-xs" />might not
                                </label>
                                <label class="btn btn-primary">
                                    <input type="radio" name="fb_rate" id="fb_rate3" value="Probably would"> Probably <br class="hidden-xs" />Would
                                </label>
                                <label class="btn btn-primary">
                                    <input type="radio" name="fb_rate" id="fb_rate4" value="Definitely would"> Definitely <br class="hidden-xs" />Would
                                </label>
                            </div>
                        </div>
                    </form>
                    <div id="feedback_validation_error" class="bs-callout bs-callout-danger hide" >Please select rating.</div>
                </div>
                <div class="fb step2 wiz_step hide">
                    <div class="fb_text">
                        Please tell us why you chose that rating.<br>
                        <textarea id="fb_reason" name="fb_reason" rows="7" cols="95"></textarea>
                    </div>
                    <div id="feedback_reason_error" class="bs-callout bs-callout-danger hide">Please provide a reason!</div>
                    <div class="fb_text_submit">
                    </div>
                    <div class="fb_note">
                        *Note: This survey is not for support requests. Please check the&nbsp;<a href="index.html#help" target="_blank">help center</a>&nbsp;or call 0843 373 4400 for&nbsp;<span>support</span>.</span>
                    </div>
                </div>
                <div class="fb step3 wiz_step hide">
                    <div class="fb_text">
                        Thank you for submitting your feedback to the LABS team.
                    </div>
                    <!--
                    <div id="fb_text_close_div" class="close btn">
                        Close
                    </div>
                    -->
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <div class="wiz_step_footer step1 wiz_step">
                <button type="button" class="fb_radio_submit_btn surveyBtn btn btn-primary">Next</button>
            </div>
            <div class="wiz_step_footer step2 wiz_step">
                <button type="button" class="submit fb_text_submit_btn surveyBtn btn btn-primary">Submit</button>
            </div>
            <div class="wiz_step_footer step3 wiz_step">
                <button type="button" class="wizard_close surveyBtn btn btn-primary">Close</button>
            </div>
        </div>
    </div>
    </div>
</script>

<script id="Tips_To_Recover" type="text/template">

    <div class="header">
        <div class="title">Tips To Recover Your Lost Device Safely </div>
    </div>

    <div class="close"></div>
    <div class="main">

        <div class="instruction">
            If you lose your phone, please follow the recommendations below to recover it in a safe manner.<br><br>
            <ul>
                <li>Never attempt to retrieve your phone from an unknown location.</li>
                <li>Contact local police authorities for assistance retrieving a lost device from an unknown location.</li>
                <li>Note: While we try to provide a precise location as possible, device GPS may not be exact. Do not assume that your device is exactly where the center of the accuracy circle is.</li>
                <li>If you are a Total Mobile Protection, Total Equipment Protection or Wireless Phone Protection subscriber, you may also file a claim (<a target='_blank' href='http://www.phoneclaim.com'>www.phoneclaim.com</a>) to get a replacement device in some cases as soon as the next day.</li>
            </ul>
            <br><br>
            <div class="clear"></div>
        </div>
    </div>
    <div class="clear"></div>
</script>