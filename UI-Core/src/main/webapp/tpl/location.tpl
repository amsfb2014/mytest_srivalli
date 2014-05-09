<script type="text/template" id="location_tab_template">
	<div id="location">
		<div id="location_left" class="col-sm-3 col-md-3">
			<div class="divider location_history_top"></div>

			<div id="location_history">
				<div class="default location_history">
					<div class="title">Last Recorded Location</div>
					<div id="location_last" class="location_last"></div>
					<div id="location_previous" style="display: none;">
						<div class="title">Previous Locations</div>
						<div id="location_history_1_to_4"></div>
					</div>
					<div id="clear_location_history" style="">
						<a class="link_text" title="Clear All Locations">Clear Location History</a>
                        <div class="hidden msg_loadingdialog">Please wait...</div>
                    </div>
				</div>
				<div class="location_connecting location_history" style="display:none">
					<div class="title">Last Recorded Location</div>
					<div class="selected">
						<div class="item">
							<div class="index">
								<div class="mini_1"></div>
							</div>
							<div class="info">
								<div class="address">Locating Phone...</div>
								<div class="time"></div>
								<div class="accuracy"></div>
							</div>
						</div>
					</div>
				</div>
				<div class="location_refining location_history" style="display:none">
					<div class="title">Last Recorded Location</div>
					<div class="selected">
						<div class="item">
							<div class="index">
								<div class="mini_1"></div>
							</div>
							<div class="info">
								<div class="address">Refining...</div>
								<div class="time"></div>
								<div class="accuracy"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="location_settings" style="">
				<div class="title">Location Settings</div>
				<div id="locations_settings_summary_placeholder">
	                <div style="height:10px;padding:10px;font-size:24px;text-align:center;color:#CCC">
	                    <img src="img/working.gif" />
                	</div>
            	</div>
				<div class="link"><a class="link_text report_event Edit_Location_Settings" href="javascript:;" id="location_setting">Edit Location Settings</a></div>
				<div class="link"><a class="link_text report_event View_Location_Settings" href="javascript:;" id="location_setting">View Location Settings</a></div>
			</div>
			<div class="divider location_history_bottom"></div>
			<div class="related_actions">
				<div class="related_actions_title">Related Actions</div>
				<div onclick="Interface.showAccountSettings('security');">Security Settings</div>
				<div onclick="Interface.openNewPhone();">Got a new device?</div>
				<div onclick="Interface.openDownloadInstructions();">Download Mobile App</div>
			</div>
			<div class="top_questions">
				<div class="top_questions_title">Support</div>
				<div onclick="Interface.openSupportCenter();">General support for Asurion Labs</div>
			</div>

		</div>
		<div id="location_right"  class="col-sm-8 col-md-8">
			<div id="map_container">

			</div>			
			<div class="note">
                    <div class="location_recovery_tip" id="tip_link"></div>
                    <div class="location_recovery_tip" id="tip_note">Remember - safety first. We strongly recommend that you do not attempt to retrieve your device from any location that is not safe, that you do not recognize, or that is not familiar to you. If you believe your device has been stolen or is in an unsafe or unfamiliar location, you should contact your local law enforcement. Asurion is not responsible for any liability resulting from your actions in retrieving your device.</div>
                    <div class="clear"></div>
			</div>
		</div>
	</div>

	<div class="dialog_messages hidden">
		<!-- Clear location history -->
		<div id="msg_confirm_clear_location_history">Clearing your location history will delete your recently saved locations.  Are you sure you want to clear your location history?</div>
	</div>
</script>

<script type="text/template" id="location_history_item_template">
	<div id="<%=elId%>" style="<%=elStyle%>" uid="<%=id%>">
		<div class="item">
			<div class="index">
			<div class="mini_1"></div>
		</div>
		<div class="info">
			<% if (!timeLocated && !accuracy) { %>
				<div class="">Asurion Labs has not yet tried to locate your phone.<br><a class='link_text report_event' id="button_locate_normal">Locate my phone</a></div>
			<%}else{%>
				<div class="address"><%=address%></div>
			<%}%>
			<% if (timeLocated) { %><div class="time"><%=timeLocated%></div><%}%>
			<% if (accuracy) { %><div class="accuracy">Accuracy: <%=accuracy%> meters</div><%}%>
			</div>
		</div>
	</div>
</script>

<script type="text/template" id="location_map_template">
	<div id="bing_map" style="position:relative; width:730px; height:625px;"></div>
	<div id="bing_map_dialog" style="display: none;"></div>
	<div id="message" style="display: none;">To find your phone on this map, click the <b>Locate Phone</b> button at the top of the page.</div>
    <div id="location_failed_note" style="display: none;">
            <h3>No Location Available...</h3>
            <span>Your phone may be turned off, out of coverage area, or Location Service may be off on your phone.</span>
    </div>
	<div id="location_progress_note" style="display: none;">
		<div class="text location_progress_text locating">Locating Phone...</div>
		<div class="text location_progress_text refining">Refining Location...</div>
		<div class="cancel_locate"></div>
		<div class="time_remaining">Less than <span class="countdown"></span> remaining</div>
		<!--<div class="accuracy">- Accuracy ? Meters -</div>-->
	</div>
</script>

<script type="text/template" id="location_map_infobox_template">
	<div class="infobox">
		<div class="markertitle">
			<label class="infoTitle <%=historyClass%>">Location History <%=index%></label>
			<label class="infoTitle <%=locatedClass%>">Device Located</label>
			<span class="<%=infoboxElClass%>">X</span>
		</div>
		<div class="markerline"><%=address%></div>
		<div class="markerline"><%=timeLocated%></div>
		<div class="markerline accuracy">
			Accuracy: <%=accuracy%> meters
			<br><br>
			<a class="link_text get_directions" href="http://www.bing.com/maps/default.aspx?v=2&amp;where1=<%=address%>" target="_blank">Get Directions</a>
			<br>
		</div>
		<div class="markerline file_claim_wrapper" id="refresh_loc_map"><a class="btn refresh_loc_btn">Refresh Location</a></div>
	</div>
</script>