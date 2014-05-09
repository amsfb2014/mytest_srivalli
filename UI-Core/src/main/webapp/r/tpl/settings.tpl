<div id="settings_template" class="template mainStructure">
    <ul class="nav nav-tabs container">
        <li class="active settings_nav_button"><a href="#location_settings_tab" data-toggle="tab" class="hidden-xs settings_nav_button_location report_event" >Location</a></li>
        <li class="settings_nav_button"><a href="#backup_settings_tab" class="hidden-xs settings_nav_button_backup  report_event"  data-toggle="tab">Backup</a></li>
        <li class="settings_nav_button"><a href="#security_settings_tab" class="hidden-xs settings_nav_button_security report_event" data-toggle="tab">Security</a></li>
        <li class="settings_nav_button"><a href="#profile_settings_tab" class="hidden-xs settings_nav_button_profile report_event" data-toggle="tab">Account Info</a></li>
        <li class="dropdown visible-xs"><a href="#" id="myTabDrop1" class="dropdown-toggle" data-toggle="dropdown">Settings <b class="caret"></b></a>
            <ul class="dropdown-menu" role="menu">
                <li class="active settings_nav_button"><a href="#location_settings_tab" data-toggle="tab" class="hidden- settings_nav_button_location report_event" >Location</a></li>
                <li class="settings_nav_button"><a href="#backup_settings_tab" class="hidden- settings_nav_button_backup  report_event"  data-toggle="tab">Backup</a></li>
                <li class="settings_nav_button"><a href="#security_settings_tab" class="hidden- settings_nav_button_security report_event" data-toggle="tab">Security</a></li>
                <li class="settings_nav_button"><a href="#profile_settings_tab" class="hidden- settings_nav_button_profile report_event" data-toggle="tab">Account Info</a></li>
            </ul>
        </li>
        <li class="close settings-close rs_cancel" data-icon="&#59408;"></li>
    </ul>

    <!-- Tab panes -->
    <div class="tab-content settings_content">
        <div id="settings_intro_tab "></div>
        <div class="tab-pane active location_settings container" id="location_settings_tab"></div>
        <div class="tab-pane container" id="backup_settings_tab"></div>
        <div class="tab-pane container" id="security_settings_tab"></div>
        <div class="tab-pane container" id="profile_settings_tab"></div>
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
    <h4>Profile Settings</h4>
    <br />
    <div class="bs-callout bs-callout-info hidden">Note: You may customize your Location settings from the Asurion Labs app installed on your phone.</div>
    <form class="form-horizontal" role="form">
        <div class="form-group">
            <div class="col-md-2">
                <label for="form-location_check" class="">Mobile Number:</label>
            </div>
            <div class="col-md-6">
                <input name="name" maxlength="256" disabled class="form-control" type="text" size="32" value="<%= name %>" disabled>
            </div>
        </div>
        <div class="form-group">
            <div class="col-md-2">
                <label for="form-location_check" class="">Email:</label>
            </div>
            <div class="col-md-6">
                <input name="email" maxlength="200" class="form-control" type="text" size="32" value="<%= email %>">
            </div>
        </div>
        <div class="form-group">
            <div class="col-md-2">
                <label for="form-location_check" class="">Confirm Email:</label>
            </div>
            <div class="col-md-6">
                <input name="confirmemail" maxlength="200" class="form-control" type="text" size="32" value="">
                <div class="bs-callout bs-callout-info hidden">
                Note: Your email will be used for contact purposes if you lose your phone.
                </div>
            </div>
        </div>
        <div class="form-group">
            <div class="col-md-6 col-md-offset-2">
                <!--<button type="button" class="btn btn-primary btnAccountInfoSave">Submit</button>-->
                <span class="connecting progressing"></span>
                <div class="validation_message validation_accountinfo">
                    <p class="bs-callout bs-callout-danger validation_text hidden email_empty">Please enter your email address.<br /></p>
                    <p class="bs-callout bs-callout-danger validation_text hidden email_invalid">Please enter a valid email address.<br /></p>
                    <p class="bs-callout bs-callout-info validation_text hidden email_unchanged">No changes made.<br /></p>
                    <p class="bs-callout bs-callout-danger validation_text hidden email_taken">The email address provided is already in use. Please try again.<br /></p>
                    <p class="bs-callout bs-callout-info validation_text hidden email_changed">Email successfully changed. You need to re-login using the new email.<br /></p>
                    <p class="bs-callout bs-callout-danger validation_text hidden email_update_error">An error occurred.  Settings not saved!<br /></p>
                </div>

            </div>
        </div>
	    <!--
	    <form class="form-horizontal" method="post" name="retrievePin" class="hidden" role="form">
	        <div class="form-group hidden">
	            <div class="col-md-2">
	                <label for="form-location_check" class="">Send PIN:</label>
	                <input type="hidden" value="lostpwd" name="command">
	                <input type="hidden" value="email" name="sendType">
	                <input id="name2" name="phonenumber" type="hidden" value="">
	            </div>
	            <div class="col-md-6">
	                <input type="button" title="You will receive your PIN at the address you specified above" onclick="AccountSettingsPane.sendPIN();" value="Send PIN To Email">
	            </div>
	        </div>
	    </form>
	    -->
	    <h4>Change Password</h4>
	    <br />
        <div class="form-group">
            <div class="col-md-2">
                <label for="form-location_check" class="">Enter Current Password:</label>
            </div>
            <div class="col-md-6">
                <input name="password" maxlength="50" type="password" size="32" value="" class="form-control">
            </div>
        </div>

        <div class="form-group">
            <div class="col-md-2">
                <label for="form-location_check" class="">Create New Password:</label>
            </div>
            <div class="col-md-6">
                <input name="newPin" maxlength="15" type="password" size="32" value="" class="form-control">
            </div>
        </div>

        <div class="form-group">
            <div class="col-md-2">
                <label for="form-location_check" class="">Confirm Password:</label>
            </div>
            <div class="col-md-6">
                <input name="confirmPIN" maxlength="15" type="password" size="32" value="" class="form-control">
            </div>
        </div>

        <div class="form-group">
            <div class="col-md-6 col-md-offset-2">
                <!--<button type="button" class="btn btn-primary btnChangePassword">Submit</button>-->
                <!--<br />-->
                <span class="connecting progressing"></span>
                <!--<span class="after_save_message"></span>-->
                <div class="validation_message validation_password">
                    <p class="bs-callout bs-callout-danger validation_text hidden current_password_empty">Please enter your current password.<br /></p>
                    <p class="bs-callout bs-callout-danger validation_text hidden current_password_has_special_chars">Password cannot contain special characters.<br /></p>
                    <p class="bs-callout bs-callout-danger validation_text hidden new_password_empty">Please enter a new password.<br /></p>
                    <p class="bs-callout bs-callout-danger validation_text hidden new_password_length">New password must be between 6 and 15 characters.<br /></p>
                    <p class="bs-callout bs-callout-danger validation_text hidden new_password_has_special_chars">New password cannot contain special characters.<br /></p>
                    <p class="bs-callout bs-callout-danger validation_text hidden confirm_password_empty">Please confirm your password.<br /></p>
                    <p class="bs-callout bs-callout-danger validation_text hidden confirm_password_mismatch">New password and confirmation password do not match.<br /></p>
                    <p class="bs-callout bs-callout-info validation_text hidden password_changed">Settings Successfully Saved!<br /></p>
                    <p class="bs-callout bs-callout-danger validation_text hidden password_unchanged">Current password and new password cannot be the same.<br /></p>
                    <p class="bs-callout bs-callout-danger validation_text hidden password_invalid">Information entered did not match our system.  Password was not saved!<br /></p>
                    <p class="bs-callout bs-callout-danger validation_text hidden password_update_error">An error occurred.  Settings not saved!<br /></p>
                </div>
            </div>
        </div>
	    <h4>Security Question</h4>
	    <br />
        <div class="form-group">
            <div class="col-md-2">
                <label for="form-location_check" class="">Security Question:</label>
            </div>
            <div class="col-md-6">
                <select name="securityquestion" class="form-control">
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
        </div>
        <div class="form-group">
            <div class="col-md-2">
                <label for="form-location_check" class="">
                    Answer:
                </label>
            </div>
            <div class="col-md-6">
                <input name="securityanswer" maxlength="256" type="password" size="32" id="profile_securityanswer" value="<%= securityAnswer %>" class="form-control">
                <div class="bs-callout bs-callout-info ">Security question / answer will be used for account verification if you ever need customer support.</div>
            </div>
        </div>
        <div class="form-group">
             <div class="col-md-6 col-md-offset-2">
                <!--<button type="button" class="btn btn-primary btnChangeSecurityInfo">Submit</button>-->
                <!--<br />-->
                <span class="connecting progressing"></span>
                <!--<span class="after_save_message"></span>-->
                <div class="validation_message validation_securityqa">
                    <p class="bs-callout bs-callout-danger validation_text hidden security_answer_empty">Please enter a security answer.<br /></p>
                    <p class="bs-callout bs-callout-danger validation_text hidden security_answer_invalid">Please enter 4 digits for security answer. No characters or special symbols allowed.<br /></p>
                    <p class="bs-callout bs-callout-info validation_text hidden security_answer_unchanged">No changes made.<br /></p>
                    <p class="bs-callout bs-callout-info validation_text hidden security_answer_changed">Settings Successfully Saved!<br /></p>
                    <p class="bs-callout bs-callout-danger validation_text hidden security_answer_update_error">An error occurred.  Settings not saved!<br /></p>
                </div>
            </div>
        </div>
	    <div class="form-group">
	        <div class="col-md-6 col-md-offset-2">
	            <button id="btnSubmitProfileSettings" type="button" class="btn btn-primary settings-save-btn">Submit</button>
	        </div>
	    </div>        
    </form>
</script>

<script type="text/template" id="location_settings_template">
		<div class="bs-callout bs-callout-info settings_note hidden">Note: You may customize your Location settings from the Asurion Labs app installed on your phone.</div>
		<h4>Location Settings</h4>
		<br />        
        <form class="form-horizontal" role="form">
            <div class="form-group location_checks">
                <div class="col-md-2">
                    <label for="form-location_check" class="">Location Checks:</label>
                </div>
                <div class="col-md-6">
                    <p class="form-control-static location_check_true hidden"><strong>On</strong></p>
                    <p class="form-control-static location_check_false hidden"><strong>Off</strong></p>
                    <select name="location_check" class="form-control location_check" id="form-location_check">
                        <option <%=locationCheck['false']%> value="false" >Off</option>
                        <option <%=locationCheck['true']%> value="true" >On</option>
                    </select>
                </div>
            </div>
            <div class="form-group frequency">
                <div class="col-md-2">
                    <label for="form-frequencyMin" class="">Frequency:</label>
                </div>
                <div class="col-md-6">
                    <span class="frequency_1 hidden"><strong>Every Hour</strong></span>
                    <span class="frequency_3 hidden"><strong>Every 3 Hours</strong></span>
                    <span class="frequency_6 hidden"><strong>Every 6 Hours</strong></span>
                    <select name="frequency" class="form-control frequencyMin" id="form-frequencyMin">
                        <option value=""></option>
                        <option <%=frequencyMinutes['1']%> value="1" >Every Hour</option>
                        <option <%=frequencyMinutes['3']%> value="3" >Every 3 Hours</option>
                        <option <%=frequencyMinutes['6']%> value="6" >Every 6 Hours</option>
                    </select>
                </div>
            </div>
            <div class="form-group battery_level">
                <div class="col-md-2">
                    <label for="form-battery_level" class="">While Battery &gt;:</label>
                </div>
                <div class="col-md-6">
                    <select name="battery_level" class="form-control battery_level" id="form-battery_level">
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
            <div class="form-group locationbatterynote"> 
                <div class="col-md-6 col-md-offset-2">
                    <div class="field battery_level note bs-callout bs-callout-info">Note: To conserve remaining battery life, automatic location checks will stop when your battery level falls below the level selected above.</div>
                </div>
            </div>
            <div class="form-group" id="locations_submit">
                <div class="col-md-6 col-md-offset-2 ">
                    <button type="button" class="btn btn-primary btnLocationSave settings-save-btn">Save</button>
                    <button type="button" class="btn btn-primary rs_cancel settings-cancel-btn">Cancel</button>
                    <br />
                    <span class="connecting progressing"></span>
                    <p class="bs-callout bs-callout-info hidden after_save_message validation_message">
                        <label class="validation_text noChanges">No changes made.</label>
                        <label class="validation_text settingsSaved">Settings Successfully Saved!<br/></label>
                        <label class="validation_text noFreq">Please select a location check frequency.<br/></label>
                        <label class="validation_text noBattLevel">Please select a location check battery level.<br/></label>
                        <label class="validation_text noFreqAndLevel">Please select a location check frequency.<br/>Please select a location check battery level.<br/></label>
                    </p>
                </div>
            </div>
        </form>
</script>

<script type="text/template" id="backup_settings_template">
	<div class="backup_settings">
        <div class="bs-callout bs-callout-info settings_note hidden">Note: You may customize your Sync settings from the Asurion Labs app installed on your phone.</div>
        <h4>Backup Settings</h4>
        <br />
        <form class="form-horizontal" role="form">
            <div class="form-group schedule">
                <div class="col-md-2">
                    <label for="form-backupSchedule" class="">Backup Alerts:</label>
                </div>
                <div class="col-md-6">
                    <span class="backupSchedule_NEVER hidden"><strong>Never</strong></span>
                    <span class="backupSchedule_DAILY hidden"><strong>Daily</strong></span>
                    <span class="backupSchedule_WEEKLY hidden"><strong>Weekly</strong></span>
                    <select id="form-backupSchedule" name="backupSchedule" class="form-control backupSchedule">
                        <option <%=frequency['NEVER']%> value="NEVER" >Never</option>
                        <option <%=frequency['DAILY']%> value="DAILY" >Daily</option>
                        <option <%=frequency['WEEKLY']%> value="WEEKLY" >Weekly</option>
                    </select>
                </div>
            </div>
            <div class="form-group day_of_week">
                <div class="col-md-2">
                    <label for="form-backupDay" class="">Day of the Week:</label>
                </div>
                <div class="col-md-6">
                    <span class="backupDay_MONDAY hidden"><strong>MONDAY</strong></span>
                    <span class="backupDay_TUESDAY hidden"><strong>TUESDAY</strong></span>
                    <span class="backupDay_WEDNESDAY hidden"><strong>WEDNESDAY</strong></span>
                    <span class="backupDay_THURSDAY hidden"><strong>THURSDAY</strong></span>
                    <span class="backupDay_FRIDAY hidden"><strong>FRIDAY</strong></span>
                    <span class="backupDay_SATURDAY hidden"><strong>SATURDAY</strong></span>
                    <span class="backupDay_SUNDAY hidden"><strong>SUNDAY</strong></span>
                    <select id="form-backupDay" name="backupDay" class="form-control backupDay">
                        <option value=""></option>
                        <option <%=day['MONDAY']%> value="MONDAY" >Monday</option>
                        <option <%=day['TUESDAY']%> value="TUESDAY" >Tuesday</option>
                        <option <%=day['WEDNESDAY']%> value="WEDNESDAY" >Wednesday</option>
                        <option <%=day['THURSDAY']%> value="THURSDAY" >Thursday</option>
                        <option <%=day['FRIDAY']%> value="FRIDAY" >Friday</option>
                        <option <%=day['SATURDAY']%> value="SATURDAY" >Saturday</option>
                        <option <%=day['SUNDAY']%> value="SUNDAY" >Sunday</option>
                    </select>
                    <div class="field battery_level note bs-callout bs-callout-info backupDayNote">
                    A random sync time will be chosen on this day.
                    </div>
                </div>
            </div>
            <div class="form-group backupBatteryRow">
                <div class="col-md-2">
                    <label for="form-backupBatteryLevel" class="">AutoSync Only When Battery Is:</label>
                </div>
                <div class="col-md-6">
                    <span class="backupBatteryLevel readonly"></span>
                    <select id="form-backupBatteryLevel" name="backupBatteryLevel" class="form-control backupBatteryLevel">
                        <option class="above10" <%=batteryLevelThreshold['10']%> value="10" >Above 10%</option>
                        <option class="above15" <%=batteryLevelThreshold['15']%> value="15" >Above 15%</option>
                        <option class="above20" <%=batteryLevelThreshold['20']%> value="20" >Above 20%</option>
                    </select>
                </div>

            </div>
            <div class="form-group backupDataBreakdowns">
                <div class="col-md-2">
                    <label for="form-backupSchedule" class="">Backup My:</label>
                </div>
                <div class="col-md-6">
                    <span class="backupDataBreakdown_Contacts_Photos_Videos hidden"><strong>Contacts, Photos & Videos</strong></span>
                    <span class="backupDataBreakdown_Contacts_Photos hidden"><strong>Contacts & Photos</strong></span>
                    <span class="backupDataBreakdown_Contacts_Videos hidden"><strong>Contacts & Videos</strong></span>
                    <span class="backupDataBreakdown_Photos_Videos hidden"><strong>Photos & Videos</strong></span>
                    <span class="backupDataBreakdown_Contacts hidden"><strong>Contacts</strong></span>
                    <span class="backupDataBreakdown_Photos hidden"><strong>Photos</strong></span>
                    <span class="backupDataBreakdown_Videos hidden"><strong>Videos</strong></span>
                    <div class="btn-group" data-toggle="buttons">
                        <label class="btn btn-primary backupDataBreakdown">
                            <input type="checkbox" <%=backupData['syncContacts']%> id="backupDataBreakdownContacts" > Contacts
                        </label>
                        <label class="btn btn-primary backupDataBreakdown">
                            <input type="checkbox" <%=backupData['syncPhotos']%> id="backupDataBreakdownImages" > Photos
                        </label>
                        <label class="btn btn-primary backupDataBreakdown">
                        	<input type="checkbox" <%=backupData['syncVideos']%> id="backupDataBreakdownVideos"> Videos
                        </label>
                    </div>
                    <!--
					<div class="field backupDataBreakdown">
                        <input type="checkbox" <%=backupData['syncContacts']%> id="backupDataBreakdownContacts" >
                        <label for="backupDataBreakdownContacts">Contacts</label>
                        <input type="checkbox" <%=backupData['syncPhotos']%> id="backupDataBreakdownImages" >
                        <label for="backupDataBreakdownImages">Photos</label>
                        <input type="checkbox" <%=backupData['syncVideos']%> id="backupDataBreakdownVideos" >
                        <label for="backupDataBreakdownVideos">Videos</label>
                    </div>
                    -->
                </div>

            </div>
            <div class="form-group backupConnection">
                <div class="col-md-2">
                    <label for="form-backupConnection" class="">AutoSync Only When My Phone Is Connected To:</label>
                </div>
                <div class="col-md-6">
                    <div class="field">
                        <select id="form-backupConnection" name="backupConnection" class="form-control backupConnection">
                            <option <%=backupConnection['WifiOnly']%> value="wifiOnly">
                            Wi-fi Only
                            </option>
                            <option <%=backupConnection['WifiOrMobileData']%> value="wifiOrMobileNetwork">
                            Wi-Fi or Mobile Network
                            </option>
                        </select>
                    </div>
                </div>

            </div>
            <div id="backup_submit" class="form-group syncSettings">
                <div class="col-md-6 col-md-offset-2">
                    <button type="button" class="btn btn-primary btnBackupSync settings-save-btn">Save</button>
                    <button type="button" class="btn btn-primary rs_cancel settings-cancel-btn">Cancel</button>
                    <br />
                    <div class="validation_message">
                        <p class="bs-callout bs-callout-info hidden validation_text no_changes">No changes made.</p>
                        <p class="bs-callout bs-callout-danger hidden validation_text blank_day">Please select a day of week.<br/></p>
                        <p class="bs-callout bs-callout-danger hidden validation_text blank_range">Please select a scan between range.<br/></p>
                        <p class="bs-callout bs-callout-info hidden validation_text success">Settings Successfully Saved!<br/></p>
                    </div>
                </div>
            </div>
        </form>
	</div>
</script>

<script type="text/template" id="security_settings_template">
	<div class="security_settings">
        <div class="bs-callout bs-callout-info hidden"></div>
        <h4>Security Settings</h4>
        <br />
        <form class="form-horizontal" role="form">
            <div class="form-group">
                <div class="col-md-2">
                    <label for="form-scanSchedule" class="">Auto Threat Scans:</label>
                </div>
                <div class="col-md-6">
                    <select id="form-scanSchedule" name="scanSchedule" class="form-control scanSchedule">
                        <option <%=frequency['NEVER']%> value="NEVER" >Never</option>
                        <option <%=frequency['DAILY']%> value="DAILY" >Daily</option>
                        <option <%=frequency['WEEKLY']%> value="WEEKLY" >Weekly</option>
                    </select>
                    <span class="note">(Automatically scan your phone for threats)</span>
                </div>
            </div>
            <div class="form-group">
                <div class="col-md-2">
                    <label for="form-scanDay" class="">Day Of Week:</label>
                </div>
                <div class="col-md-6">
                    <select id="form-scanDay"  name="scanDay" class="form-control scanDay">
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

            <div class="form-group">
                <div class="col-md-2">
                    <label for="form-scanTime" class="">Scan Between:</label>
                </div>
                <div class="col-md-6">
                    <select id="form-scanTime" name="scanTime" class="form-control scanTime">
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

            <div class="form-group">
                <div class="col-md-2">
                    <label for="form-securitySettingsRealTimeScanOn" class="">Real-Time Scans:</label>
                </div>
                <div class="col-md-6 ">
                    <div class="btn-group" data-toggle="buttons">
                        <label class="btn btn-primary <%=realTimeScanActive['true']%>">
                            <input type="radio" <%=realTimeScan["true"]%> name="realTimeScan" class="realTimeScan" id="securitySettingsRealTimeScanOn" value="true" > On
                        </label>
                        <label class="btn btn-primary <%=realTimeScanActive['false']%>">
                            <input type="radio" <%=realTimeScan["false"]%> name="realTimeScan" class="realTimeScan" id="securitySettingsRealTimeScanOff" value="false" > Off
                        </label>
                    </div>
                    <span class="bs-callout bs-callout-info ">(Actively monitor app downloads)</span>
                </div>
            </div>

            <div class="form-group">
                <div class="col-md-2">
                    <label for="form-backupSchedule" class="">Automatic Media Scans:</label>
                </div>
                <div class="col-md-6">
                    <div class="btn-group" data-toggle="buttons">
                        <label class="btn btn-primary <%=mediaScanActive['true']%> ">
                            <input type="radio" <%=mediaScan["true"]%> name="autoMediaScan" class="autoMediaScan" id="securitySettingsAutoMediaScanOn" value="true" > On
                        </label>
                        <label class="btn btn-primary <%=mediaScanActive['false']%> ">
                            <input type="radio" <%=mediaScan["false"]%> name="autoMediaScan" class="autoMediaScan" id="securitySettingsAutoMediaScanOff" value="false" > Off
                        </label>
                    </div>
                    <span class="bs-callout bs-callout-info ">(Actively monitor app downloads)</span>

                </div>
            </div>

            <div class="form-group">
                <div class="col-md-2">
                    <label for="form-backupSchedule" class="">Tray Notification:</label>
                </div>
                <div class="col-md-6">
                    <div class="btn-group" data-toggle="buttons">
                        <label class="btn btn-primary <%=trayNotificationActive['true']%>">
                            <input type="radio" <%=trayNotification["true"]%> name="trayNotify" class="trayNotify" id="securitySettingsTrayNotifyOn" value="true" > On
                        </label>
                        <label class="btn btn-primary <%=trayNotificationActive['false']%>">
                            <input type="radio" <%=trayNotification["false"]%> name="trayNotify" class="trayNotify" id="securitySettingsTrayNotifyOff" value="false" > Off
                        </label>
                    </div>
                    <span class="bs-callout bs-callout-info ">(Security notifications on your toolbar)</span>
                </div>
            </div>

            <div class="form-group">
                <div class="col-md-2" data-toggle="buttons">
                    <label for="form-backupSchedule" class="">Cloud A/V:</label>
                </div>
                <div class="col-md-6">
                    <div class="btn-group" data-toggle="buttons">
                        <label class="btn btn-primary <%=cloudAvActive['true']%>">
                            <input type="radio"<%=cloudAv["true"]%> name="cloudAV" class="cloudAV" id="securitySettingsCloudAVOn" value="true" > On
                        </label>
                        <label class="btn btn-primary <%=cloudAvActive['false']%>">
                            <input type="radio" <%=cloudAv["false"]%> name="cloudAV" class="cloudAV" id="securitySettingsCloudAVOff" value="false" > Off
                        </label>
                    </div>
                    <span class="bs-callout bs-callout-info ">(Anonymously share your activity to help improve security protection)</span>
                </div>
            </div>
            <div class="form-group" id="safe_browsing_settings">
            </div>

            <div class="form-group">
                <div class="col-md-2">
                    <label for="form-backupSchedule" class=""></label>
                </div>
                <div id="safebrowsing_submit" class="col-md-6 safebrowsing_settings">
                    <button type="button" class="btn btn-primary btnSafeBrowsingSave settings-save-btn">Save</button>
                    <button type="button" class="btn btn-primary rs_cancel settings-cancel-btn">Cancel</button>
                    <span class="after_save_message btnSafeBrowsingSaveMsg"></span>
                </div>
            </div>

        </form>
	</div>
</script>
<script type="text/template" id="safe_browsing_tab_template">
    <div id="safebrowsingpane" >
        <div id="safebrowsing">
            <div id="safebrowsing_left">
            </div>
            <div id="safebrowsing_right">
                <div class="title">Safe Browsing</div>
                <div>The Safe Browsing feature will protect your phone and privacy from potential threats while you surf the web on your phone.</div>
                <br>
                <div class="safebrowsing_settings" style="display: block;">
                    <div class="safebrowsing_settings_value col-xs-2 col-md-2 col-sm-2 col-lg-2">
                        <span class="settings_text_on show">On</span>
                        <span class="settings_text_off hide">Off</span>
                    </div>
                    <span class="safebrowsing_settings_text">Safe Browsing</span>
                    <!--<div class="title">Settings</div>
                    Safe Browsing:
                    <input id="safeBrowsingOn" type="radio" name="safeBrowsing" class="safeBrowsing" value="true">
                    <label for="safeBrowsingOn">On</label>
                    <input id="safeBrowsingOff" type="radio" name="safeBrowsing" class="safeBrowsing" value="false">
                    <label for="safeBrowsingOff">Off</label>
                    <div class="pane_floatingbuttons">
                        <ul>
                            <li class="rs_save btnSafeBrowsingSave">Save</li>
                            <li class="after_save_message btnSafeBrowsingSaveMsg"></li>
                        </ul>
                    </div> -->
                </div>
            </div>
        </div>
        <div class="editSetting" >
            <a  style="float:left">Edit Safe Browsing Settings</a>
        </div>
    </div>
    <div class="settings_edit_safeBrowser">
        <div class="col-md-2" data-toggle="buttons">
            <label for="form-backupSchedule" class="">Safe Browsing Settings:</label>
        </div>
        <div class="col-md-6">
            <div class="btn-group" data-toggle="buttons">
                <label class="btn btn-primary <%=on%>">
                    <input type="radio" <%=onChecked%> name="safeBrowsing" class="cloudAV" id="safeBrowsingOn" value="true" > On
                </label>
                <label class="btn btn-primary <%=off%>">
                    <input type="radio" <%=offChecked%> name="safeBrowsing" class="cloudAV" id="safeBrowsingOff" value="false" > Off
                </label>
            </div>
            <span class="bs-callout bs-callout-info ">(Protect your phone and privacy from potential threats while you surf the web on your phone)</span>
        </div>
    </div>
</script>