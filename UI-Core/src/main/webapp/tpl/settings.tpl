<div id="settings_template" class="template mainStructure">
	
	<div class="header">
		<div class="title">Asurion Labs Settings </div>
	</div>
	<div class="close"></div>

	<div class="settings">
		<div class="settings_left">
			<div class="lp_endpointsection">
				<div class="lp_box">
					<div class="lp_info">
						<div class="left">
							<img src="img/genericphone_small.png" class="lp_image_default" border="0">
						</div>
						<div class="right">
							<ul>
								<li>(773)430-6019</li>
								<li class="devicename">Mobile Security Demo</li>
								<li class="newphone">
									<a onclick="Interface.openNewPhone();">Got a new phone?</a>
								</li>
								<li class="download">
									<a onclick="Interface.openDownloadInstructions();">Download App</a>
								</li>
								<li class="last_backup">Last Sync</li>
								<li class="last_backup">Oct 19, 2012 at 4:18 PM</li>
								<li></li>
							</ul>
						</div>
					</div>
					<div class="lp_button update_phone" onclick="Interface.updatePhone(0)"></div>
				</div>
			</div>
		</div>
		<div class="settings_right">
			<div class="settings_nav">
				<ul>
					<li id="locate_setting"  class="standard_button settings_nav_button settings_nav_button_location  report_event">
						<a href="javascript:;" id="locate_setting" class="report_event" >Location</a>
					</li>
					<li  id="backup_setting" class="standard_button settings_nav_button settings_nav_button_backup report_event">
						<a href="javascript:;" class="report_event" id="backup_setting" >Backup</a>
					</li>
					<li   id="security_setting"  class="standard_button settings_nav_button settings_nav_button_security report_event" >
						<a href="javascript:;" id="security_setting" class="report_event">Security</a>
					</li>
					<li id="profile_setting" class="standard_button settings_nav_button settings_nav_button_profile report_event" >
						<a href="javascript:;" id="profile_setting" class="report_event">Account Info</a>
					</li>
				</ul>
			</div>
			<div class="settings_content">
				<!-- Settings introduction -->
				<div id="settings_intro_tab"></div>

				<!-- Account settings -->
				<div id="profile_settings_tab"></div>

				<!-- Location settings -->
				<div id="location_settings_tab"></div>

				<!-- Backup settings -->
				<div id="backup_settings_tab"></div>

				<!-- Security settings -->
				<div id="security_settings_tab"></div>
			</div>

			<!-- info_right -->
			<div class="settings_info">
				<div class="title recovery_settings">Location Settings</div>
				<div class="text recovery_settings">To customize your location frequency settings, launch the application on your phone and from the Main Menu select<br>'Settings &gt; Location Interval'.</div>
				<div class="title backup_settings_text">XXX---syncSettings---XXX</div>
				<div class="text backup_settings_text">To customize your automatic sync frequency settings, launch the application on your phone and from the Main Menu select<br>'Settings &gt; Auto Sync'.</div>
				<div class="title sso">Asurion Labs PIN</div>
				<div class="text sso">To change your Asurion Labs PIN, launch the application on your phone and from the Main Menu select<br>'Settings &gt; Change PIN'.</div>
	     	</div>
			<!-- <div id="settings_submit" class="pane_floatingbuttons">
				<ul>
					<li onclick="AccountSettingsPane.save(&#39;settings&#39;);" class="rs_save"></li>
					<li onclick="AccountSettingsPane.close();" class="rs_cancel"></li>
					<li class="connecting"></li>
					<li class="after_save_message"></li>
				</ul>
			</div> -->
		</div>
	</div>
</div>

<script type="text/template" id="settings_intro_template">
	<div class="settings_intro">
		<div class="welcome">Welcome to&nbsp; Asurion Labs.</div>
		<div class="into">Please take a minute to fill out the information below, including a security question which is used for lost PINs.</div>
		<div class="red_text">All fields are required
			<div class="intro_after_save_message"></div>
		</div>
		<br>
	</div>
</script>

<script type="text/template" id="profile_settings_template">
	<div class="profile_settings">
		<div class="title">Account Info
			<div class="divider"></div>
		</div>
		<div class="row name_row">
			<div class="label">Mobile Number:</div>
			<div class="field">
				<input name="name" maxlength="256" type="text" size="32" value="<%= name %>" disabled>
			</div>
		</div>
		<div class="row email_row">
			<div class="label">Email:</div>
			<div class="field">
				<input name="email" maxlength="200" type="text" size="32" value="<%= email %>">
			</div>
		</div>
		<div class="row email_confirm_row">
			<div class="label">Confirm Email:</div>
			<div class="field">
				<input name="confirmemail" maxlength="200" type="text" size="32" value="">
			</div>
		</div>
		<div class="row email_use_row">
			<div class="label">&nbsp;</div>
			<div class="email_use note">Note: Your email will be used for contact purposes if you lose your phone.</div>
		</div>
		<div id="account_info_submit" class="pane_floatingbuttons">
			<ul>
				<li class="rs_submit btnAccountInfoSave">Submit</li>
				<li class="connecting"></li>
				<li class="after_save_message"></li>
				<li class="validation_message">
					<label class="validation_text email_empty">Please enter your email address.<br /></label>
					<label class="validation_text email_invalid">Please enter a valid email address.<br /></label>
					<label class="validation_text email_unchanged">No changes made.<br /></label>
					<label class="validation_text email_taken">The email address provided is already in use. Please try again.<br /></label>
					<label class="validation_text email_changed">Email successfully changed. You need to re-login using the new email.<br /></label>
					<label class="validation_text email_update_error">An error occurred.  Settings not saved!<br /></label>
				</li>
			</ul>
		</div>
		<div class="title password_row">Change Password</div>
		<div class="row password_row">
			<div class="label">Enter Current Password:</div>
			<div class="field">
				<input name="password" maxlength="50" type="password" size="32" value="">
			</div>
		</div>
		<div class="row password_row">
			<div class="label">Create New Password:</div>
			<div class="field">
				<input name="newPin" maxlength="15" type="password" size="32" value="">
			</div>
		</div>
		<div class="row password_row">
			<div class="label">Confirm Password:</div>
			<div class="field">
				<input name="confirmPIN" maxlength="15" type="password" size="32" value="">
			</div>
		</div>
		<div id="password_submit" class="pane_floatingbuttons">
			<ul>
				<li class="rs_submit btnChangePassword">Submit</li>
				<li class="connecting"></li>
				<li class="after_save_message"></li>
				<li class="validation_message">
					<label class="validation_text current_password_empty">Please enter your current password.<br /></label>
					<label class="validation_text current_password_has_special_chars">Password cannot contain special characters.<br /></label>
					<label class="validation_text new_password_empty">Please enter a new password.<br /></label>
					<label class="validation_text new_password_length">New password must be between 6 and 15 characters.<br /></label>
					<label class="validation_text new_password_has_special_chars">New password cannot contain special characters.<br /></label>
					<label class="validation_text confirm_password_empty">Please confirm your password.<br /></label>
					<label class="validation_text confirm_password_mismatch">New password and confirmation password do not match.<br /></label>
					<label class="validation_text password_changed">Settings Successfully Saved!<br /></label>
					<label class="validation_text password_unchanged">Current password and new password cannot be the same.<br /></label>
					<label class="validation_text password_invalid">Information entered did not match our system.  Password was not saved!<br /></label>
					<label class="validation_text password_update_error">An error occurred.  Settings not saved!<br /></label>
					<br />
				</li>
			</ul>
		</div>
		<div class="row sendPIN">
			<form action="/core/jebber/loggedout.poo?method=secureSendPasswordOptions" method="post" name="retrievePin">
				<input type="hidden" value="lostpwd" name="command">
				<input type="hidden" value="email" name="sendType">
				<input id="name2" name="phonenumber" type="hidden" value="">
				<br>
				<div class="row">
	  				<div class="label">Send PIN:</div>
	  				<div class="field">
	  					<input type="button" title="You will receive your PIN at the address you specified above" onclick="AccountSettingsPane.sendPIN();" value="Send PIN To Email">
	  				</div>
				</div>
				<!--li class="after_save_message"></li-->
			</form>
		</div>
		<div class="title security_QA_row">Change Security Info</div>
		<div class="row security_QA_row">
			<div class="label">Security Question:</div>
			<select name="securityquestion">
				<option value="What is your best friend&#39;s birthday(MMDD)?">
					What is your best friend&#39;s birthday(MMDD)?
				</option>
				<option value="What was the make (year) of your first car(YYYY)?">
					What was the make (year) of your first car(YYYY)?
				</option>
				<option value="What are the last four digits of your childhood phone number(####)?">
					What are the last four digits of your childhood phone number(####)?
				</option>
				<option value="What is the year your oldest sibling graduated from high school(YYYY)?">
					What is the year your oldest sibling graduated from high school(YYYY)?
				</option>
				<option value="What was the most memorable year for you(YYYY)?">
					What was the most memorable year for you(YYYY)?
				</option>
			</select>
		</div>
	 	<div class="row security_QA_use_row">
			<div class="label">&nbsp;</div>
			<div class="security_QA_use">Security question / answer will be used for account verification if you ever need customer support.</div>
	 	</div>
		<div class="row security_QA_row">
			<div class="label">Answer:</div>
			<div class="field">
				<input name="securityanswer" maxlength="256" type="password" size="32" id="profile_securityanswer" value="<%= securityAnswer %>">
			</div>
		</div>
	
		<div id="securityQA_submit" class="pane_floatingbuttons">
			<ul>
				<li class="rs_submit btnChangeSecurityInfo">Submit</li>
				<li class="connecting"></li>
				<li class="after_save_message"></li>
				<li class="validation_message">
					<label class="validation_text security_answer_empty">Please enter a security answer.<br /></label>
					<label class="validation_text security_answer_invalid">Please enter 4 digits for security answer. No characters or special symbols allowed.<br /></label>
					<label class="validation_text security_answer_unchanged">No changes made.<br /></label>
					<label class="validation_text security_answer_changed">Settings Successfully Saved!<br /></label>
					<label class="validation_text security_answer_update_error">An error occurred.  Settings not saved!<br /></label>
				</li>
			</ul>
		</div>
	</div>
</script>

<script type="text/template" id="location_settings_template">
	<div class="location_settings">
		<div class="settings_note">Note: You may customize your Location settings from the Asurion Labs app installed on your phone.</div>
		<div class="title">Location Settings
			<div class="divider"></div>
		</div>
		<div class="row location_checks">
			<div class="label">Location Checks:</div>
			<div class="field">
				<span class="location_check_true hidden">On</span>
				<span class="location_check_false hidden">Off</span>
				<select name="location_check" class="location_check">
					<option <%=locationCheck['false']%> value="false" >Off</option>
					<option <%=locationCheck['true']%> value="true" >On</option>
				</select>
			</div>
		</div>
		<div class="row frequency">
			<div class="label">Frequency:</div>
			<div class="field">
				<span class="frequency_1 hidden">Every Hour</span>
				<span class="frequency_3 hidden">Every 3 Hours</span>
				<span class="frequency_6 hidden">Every 6 Hours</span>
			    <select name="frequency" class="frequencyMin">
			        <option value=""></option>
			        <option <%=frequencyMinutes['1']%> value="1" >Every Hour</option>
			        <option <%=frequencyMinutes['3']%> value="3" >Every 3 Hours</option>
			        <option <%=frequencyMinutes['6']%> value="6" >Every 6 Hours</option>
			    </select>			
			</div>
		</div>
		<div class="row battery_level">
			<div class="label">While Battery &gt;:</div>
			<div class="field">
				<select name="battery_level" class="battery_level">
					<option value=""></option>
					<option <%=batteryLevelThreshold['10']%> value="10" >10%</option>
					<option <%=batteryLevelThreshold['20']%> value="20" >20%</option>
					<option <%=batteryLevelThreshold['30']%> value="30" >30%</option>
					<option <%=batteryLevelThreshold['40']%> value="40" >40%</option>
					<option <%=batteryLevelThreshold['50']%> value="50" >50%</option>
					<option <%=batteryLevelThreshold['60']%> value="60" >60%</option>
				</select>
			</div>
		</div>
		<div class="row locationbatterynote">
			<div class="label">&nbsp;</div>
			<div class="field battery_level note">Note: To conserve remaining battery life, automatic location checks will stop when your battery level falls below the level selected above.</div>
			<!--<div class="field auto_battery_level">Note: Asurion Labs will automatically record your phone&#39;s location when the battery hits 20%, 15% and 10% to ensure a location is saved before your battery dies.</div>-->
		</div>
		<div id="locations_submit" class="pane_floatingbuttons locationSettings">
				<ul>
					<li class="rs_save btnLocationSave">Save</li>
					<li class="rs_cancel">Cancel</li>
					<li class="connecting"></li>
					<li class="validation_message">
						<label class="validation_text noChanges">No changes made.</label>
						<label class="validation_text settingsSaved">Settings Successfully Saved!<br/></label>
						<label class="validation_text noFreq">Please select a location check frequency.<br/></label>
						<label class="validation_text noBattLevel">Please select a location check battery level.<br/></label>
						<label class="validation_text noFreqAndLevel">Please select a location check frequency.<br/>Please select a location check battery level.<br/></label>
					</li>
				</ul>
			</div>
	</div>
</script>

<script type="text/template" id="backup_settings_template">
	<div class="backup_settings">
	<div class="settings_note">Note: You may customize your Sync settings from the Asurion Labs app installed on your phone.</div>
		<div class="title">Backup Settings
			<div class="divider"></div>
		</div>
		<div class="row schedule">
			<div class="label">Backup Alerts:</div>
			<div class="field">
				<span class="backupSchedule_NEVER hidden">Never</span>
				<span class="backupSchedule_DAILY hidden">Daily</span>
				<span class="backupSchedule_WEEKLY hidden">Weekly</span>
				<select name="backupSchedule" class="backupSchedule">
				    <option <%=frequency['NEVER']%> value="NEVER" >Never</option>
				    <option <%=frequency['DAILY']%> value="DAILY" >Daily</option>
				    <option <%=frequency['WEEKLY']%> value="WEEKLY" >Weekly</option>
                </select>
			</div>
		</div>
		<div class="row day_of_week">
			<div class="label">Day of Week:</div>
			<div class="field">
				<span class="backupDay_MONDAY hidden">MONDAY</span>
				<span class="backupDay_TUESDAY hidden">TUESDAY</span>
				<span class="backupDay_WEDNESDAY hidden">WEDNESDAY</span>
				<span class="backupDay_THURSDAY hidden">THURSDAY</span>
				<span class="backupDay_FRIDAY hidden">FRIDAY</span>
				<span class="backupDay_SATURDAY hidden">SATURDAY</span>
				<span class="backupDay_SUNDAY hidden">SUNDAY</span>
				<select name="backupDay" class="backupDay">
					<option value=""></option>
					<option <%=day['MONDAY']%> value="MONDAY" >Monday</option>
					<option <%=day['TUESDAY']%> value="TUESDAY" >Tuesday</option>
					<option <%=day['WEDNESDAY']%> value="WEDNESDAY" >Wednesday</option>
					<option <%=day['THURSDAY']%> value="THURSDAY" >Thursday</option>
					<option <%=day['FRIDAY']%> value="FRIDAY" >Friday</option>
					<option <%=day['SATURDAY']%> value="SATURDAY" >Saturday</option>
					<option <%=day['SUNDAY']%> value="SUNDAY" >Sunday</option>
				</select>
			</div>
		</div>
		<div class="row backupDayNote">
			<div class="label">&nbsp;</div>
			<div class="field note">A random sync time will be chosen on this day.</div>
		</div>
		<div class="row backupBatteryRow">
			<div class="label">AutoSync Only When Battery Is:</div>
			<div class="field">
				<span class="backupBatteryLevel readonly"></span>
				<select name="backupBatteryLevel" class="backupBatteryLevel">
					<option class="above10" <%=batteryLevelThreshold['10']%> value="10" >Above 10%</option>
					<option class="above15" <%=batteryLevelThreshold['15']%> value="15" >Above 15%</option>
					<option class="above20" <%=batteryLevelThreshold['20']%> value="20" >Above 20%</option>
				</select>
			</div>
		</div>
		<div class="row backupDataBreakdowns">
			<div class="label">Backup My:</div>
			<span class="backupDataBreakdown_Contacts_Photos_Videos hidden">Contacts, Photos & Videos</span>
			<span class="backupDataBreakdown_Contacts_Photos hidden">Contacts & Photos</span>
			<span class="backupDataBreakdown_Contacts_Videos hidden">Contacts & Videos</span>
			<span class="backupDataBreakdown_Photos_Videos hidden">Photos & Videos</span>
			<span class="backupDataBreakdown_Contacts hidden">Contacts</span>
			<span class="backupDataBreakdown_Photos hidden">Photos</span>
			<span class="backupDataBreakdown_Videos hidden">Videos</span>
			<div class="field backupDataBreakdown">
				<input type="checkbox" <%=backupData['syncContacts']%> id="backupDataBreakdownContacts" >
          		<label for="backupDataBreakdownContacts">Contacts</label>
				<input type="checkbox" <%=backupData['syncPhotos']%> id="backupDataBreakdownImages" >
          		<label for="backupDataBreakdownImages">Photos</label>
				<input type="checkbox" <%=backupData['syncVideos']%> id="backupDataBreakdownVideos" >
          		<label for="backupDataBreakdownVideos">Videos</label>
			</div>
		</div>
		<div class="row backupConnection">
			<div class="label">AutoSync Only When My Phone Is Connected To:</div>
			<div class="field">
				<select name="backupConnection" class="backupConnection">
					<option <%=backupConnection['WifiOnly']%> value="wifiOnly">
						Wi-fi Only
					</option>
					<option <%=backupConnection['WifiOrMobileData']%> value="wifiOrMobileNetwork">
						Wi-Fi or Mobile Network
					</option>
				</select>				
			</div>
		</div>
		<div id="backup_submit" class="pane_floatingbuttons syncSettings">
			<ul>
				<li class="rs_save btnBackupSync">Save</li>
				<li class="rs_cancel">Cancel</li>
				<li class="connecting"></li>
				<li class="after_save_message"></li>
				<li class="validation_message">
					<label class="validation_text no_changes">No changes made.</label>
					<label class="validation_text blank_day">Please select a day of week.<br/></label>
					<label class="validation_text blank_range">Please select a scan between range.<br/></label>
					<label class="validation_text success">Settings Successfully Saved!<br/></label>
				</li>
			</ul>
		</div>
	</div>
</script>

<script type="text/template" id="security_settings_template">
	<div class="security_settings">
		<div class="title">Security Settings
			<div class="divider"></div>
		</div>
		<div class="row autoThreatScans">
			<div class="label">Auto Threat Scans:</div>
			<div class="field">
				<select name="scanSchedule" class="scanSchedule">
					<option <%=frequency['NEVER']%> value="NEVER" >Never</option>
					<option <%=frequency['DAILY']%> value="DAILY" >Daily</option>
					<option <%=frequency['WEEKLY']%> value="WEEKLY" >Weekly</option>
				</select>
				<span class="note">(Automatically scan your phone for threats)</span>
			</div>
		</div>
		<div class="row">
			<div class="label">Day Of Week:</div>
			<div class="field">
				<select name="scanDay" class="scanDay">
					<option value="" ></option>
					<option <%=day['MONDAY']%> value="MONDAY" >Monday</option>
					<option <%=day['TUESDAY']%> value="TUESDAY" >Tuesday</option>
					<option <%=day['WEDNESDAY']%> value="WEDNESDAY" >Wednesday</option>
					<option <%=day['THURSDAY']%> value="THURSDAY" >Thursday</option>
					<option <%=day['FRIDAY']%> value="FRIDAY" >Friday</option>
					<option <%=day['SATURDAY']%> value="SATURDAY" >Saturday</option>
					<option <%=day['SUNDAY']%> value="SUNDAY" >Sunday</option>
				</select>
			</div>
		</div>
		<div class="row">
			<div class="label">Scan Between:</div>
			<div class="field">
				<select name="scanTime" class="scanTime">
					<option value="" ></option>
					<option <%=range['AM12TO1']%> value="AM12TO1" >12AM - 1AM</option>
					<option <%=range['AM1TO2']%> value="AM1TO2" >1AM - 2AM</option>
					<option <%=range['AM2TO3']%> value="AM2TO3" >2AM - 3AM</option>
					<option <%=range['AM3TO4']%> value="AM3TO4" >3AM - 4AM</option>
					<option <%=range['AM4TO5']%> value="AM4TO5" >4AM - 5AM</option>
					<option <%=range['AM5TO6']%> value="AM5TO6" >5AM - 6AM</option>
					<option <%=range['AM6TO7']%> value="AM6TO7" >6AM - 7AM</option>
					<option <%=range['AM7TO8']%> value="AM7TO8" >7AM - 8AM</option>
					<option <%=range['AM8TO9']%> value="AM8TO9" >8AM - 9AM</option>
					<option <%=range['AM9TO10']%> value="AM9TO10" >9AM - 10AM</option>
					<option <%=range['AM10TO11']%> value="AM10TO11" >10AM - 11AM</option>
					<option <%=range['AM11TO12']%> value="AM11TO12" >11AM - 12PM</option>
					<option <%=range['PM12TO1']%> value="PM12TO1" >12PM - 1PM</option>
					<option <%=range['PM1TO2']%> value="PM1TO2" >1PM - 2PM</option>
					<option <%=range['PM2TO3']%> value="PM2TO3" >2PM - 3PM</option>
					<option <%=range['PM3TO4']%> value="PM3TO4" >3PM - 4PM</option>
					<option <%=range['PM4TO5']%> value="PM4TO5" >4PM - 5PM</option>
					<option <%=range['PM5TO6']%> value="PM5TO6" >5PM - 6PM</option>
					<option <%=range['PM6TO7']%> value="PM6TO7" >6PM - 7PM</option>
					<option <%=range['PM7TO8']%> value="PM7TO8" >7PM - 8PM</option>
					<option <%=range['PM8TO9']%> value="PM8TO9" >8PM - 9PM</option>
					<option <%=range['PM9TO10']%> value="PM9TO10" >9PM - 10PM</option>
					<option <%=range['PM10TO11']%> value="PM10TO11" >10PM - 11PM</option>
					<option <%=range['PM11TO12']%> value="PM11TO12" >11PM - 12AM</option>
				</select>
			</div>
		</div>
		<div class="row realTimeScan">
			<div class="label">Real-Time Scans:</div>
			<div class="field">
				<input type="radio" <%=realTimeScan["true"]%> name="realTimeScan" class="realTimeScan" id="securitySettingsRealTimeScanOn" value="true" >
				<label for="securitySettingsRealTimeScanOn">On</label>
				<input type="radio" <%=realTimeScan["false"]%> name="realTimeScan" class="realTimeScan" id="securitySettingsRealTimeScanOff" value="false" >
				<label for="securitySettingsRealTimeScanOff">Off</label>
				<span class="note">(Actively monitor app downloads)</span>
			</div>
		</div>
		<div class="row autoMediaScan">
			<div class="label">Automatic Media Scans:</div>
			<div class="field">
				<input type="radio" <%=mediaScan["true"]%> name="autoMediaScan" class="autoMediaScan" id="securitySettingsAutoMediaScanOn" value="true" >
				<label for="securitySettingsAutoMediaScanOn">On</label>
				<input type="radio" <%=mediaScan["false"]%> name="autoMediaScan" class="autoMediaScan" id="securitySettingsAutoMediaScanOff" value="false" >
				<label for="securitySettingsAutoMediaScanOff">Off</label>
				<span class="note">(Automatically scan SD card when it is changed)</span>
			</div>
		</div>
		<div class="row trayNotify">
			<div class="label">Tray Notification:</div>
			<div class="field">
				<input type="radio" <%=trayNotification["true"]%> name="trayNotify" class="trayNotify" id="securitySettingsTrayNotifyOn" value="true" >
				<label for="securitySettingsTrayNotifyOn">On</label>
				<input type="radio" <%=trayNotification["false"]%> name="trayNotify" class="trayNotify" id="securitySettingsTrayNotifyOff" value="false" >
				<label for="securitySettingsTrayNotifyOff">Off</label>
				<span class="note">(Security notifications on your toolbar)</span>
			</div>
		</div>
		<div class="row cloudAV">
			<div class="label">Cloud A/V:</div>
			<div class="field">
				<input type="radio"<%=trayNotification["true"]%> name="cloudAV" class="cloudAV" id="securitySettingsCloudAVOn" value="true" >
				<label for="securitySettingsCloudAVOn">On</label>
				<input type="radio" <%=cloudAv["false"]%> name="cloudAV" class="cloudAV" id="securitySettingsCloudAVOff" value="false" >
				<label for="securitySettingsCloudAVOff">Off</label>
				<span class="note">(Anonymously share your activity to help improve security protection)</span>
			</div>
		</div>
		<div id="security_submit" class="pane_floatingbuttons securitySettings">
			<ul>
				<li class="rs_save btnSecuritySave">Save</li>
				<li class="rs_cancel">Cancel</li>
				<li class="connecting"></li>
				<li class="validation_message">
					<label class="validation_text no_changes">No changes made.</label>
					<label class="validation_text blank_day">Please select a day of week.<br/></label>
					<label class="validation_text blank_range">Please select a scan between range.<br/></label>
					<label class="validation_text success">Settings Successfully Saved!<br/></label>
				</li>
			</ul>
		</div>
	</div>
</script>
