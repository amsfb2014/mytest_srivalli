<script type="text/template" id="security_tab_template">
	<div id="security">
		<div id="security_right">
			<div id="security_threat_scan">
				<div class="security_title">Threat Protection</div>
				<div class="divider"></div>
				<div id="threat_scan">
					<img class="working" src="img/working.gif"/>
				</div>
			</div>
			<div id="security_security_settings">
				<div class="security_title">Security Settings</div>
				<div class="divider"></div>
				<div id="security_settings">
					<img class="working" src="img/working.gif"/>
				</div>
			</div>
			<div id="security_threat_history">
				<div class="security_title">Recent Activity</div>
				<div class="divider"></div>
				<div class="security_threat_history">
					<ul id="security_threats">
						<li><img class="working" src="img/working.gif"/><li>
					</ul>
					<a id="security_activities_view_more" href="#" class="link_text">View More &gt;</a>
				</div>
			</div>
			<div id="security_threat_news"></div>
		</div>
	</div>
</script>

<script type="text/template" id="empty_threat_history_item_template">
	<li>No threats detected.</li>
</script>

<script type="text/template" id="threat_history_item_template">
	<li id="<%=elId%>" class="item">
		<p><%=datetimeDetected%></p>
		
		<%if(code=="scanFinished"){%>
			<p>Scan Finished</p>
			<%if(fileScanTotal>0){%><p><%=fileScanTotal%> File<%if(fileScanTotal>1){%>s<%}%> Scanned</p><%}%>
			<%if(appScanTotal>0){%><p><%=appScanTotal%> App<%if(appScanTotal>1){%>s<%}%> Scanned</p><%}%>
			<p><%=fileInfectedTotal%> Threat<%if(fileInfectedTotal>1){%>s<%}%> Detected</p>	
		<% } else if(code=="scanStarted"){%><p>Scan Started</p>	
		<% } else if(code=="remediationPerformed"){%><p>Remediation Performed</p>
		<% } else { %><%=code%><% }%>
		
		<p class="filename" title="<%=infectionName%>"><%=infectionName%></p>
		<p><%if(code=="remediationPerformed"){%>Threats <% }%>
			<%if(action=="applicationStopped"){%><label>Application Stopped</label>
			<% } else if(action=="applicationStarted"){%><label>Application Started</label>
			<% } else if(action=="applicationUninstall"){%><label>Application Uninstalled</label>
			<% } else if(action=="deleted"){%><label>Deleted</label>
			<% } else if(action=="ignored"){%><label>Ignored</label>
			<% } else if(action=="quarantined"){%><label>Quarantined</label>
			<% } else if(action=="uninstalled"){%><label>Uninstalled</label>
			<% } else { %><%=action%><% }%>
		</p>
	
		<div class="divider"></div>
	</li>
</script>

<script type="text/template" id="threat_protection_template">
	Last Threat Scan:<br>
	<div class="last_threat_scan"><%=lastScanDate%><br>
	<ul id="<%=elId%>" >
		<li class="<%=appClass%>"><%=appScanTotal%> App<%if(appScanTotal>1){%>s<%}%> Scanned</li>
		<li class="<%=fileClass%>"><%=fileScanTotal%> File<%if(fileScanTotal>1){%>s<%}%> Scanned</li>
        <li><%=fileInfectedTotal%> Threat<%if(fileInfectedTotal>1){%>s<%}%> Detected</li>
	</div>
	
	<div class="last_threat_update" style="display: none;">
						<div class="divider"></div><br>
						Threat Protection Update:<br> 
						<div class="last_threat_update_info"><!-- Populated dynamically --></div>
					</div>
	<div class="scan_for_threats">Scan Phone For Threats</div>
</script>

<script type="text/template" id="scan_settings_template">
	<div class="each_setting auto_threat_scans_row">
		<div class="security_settings_value">
			<span class="settings_text_on <%=css['autoThreatScanEnabledOn']%>">On</span>
			<span class="settings_text_off <%=css['autoThreatScanEnabledOff']%>">Off</span>
		</div>
		<div class="security_settings_text">
			<div class="security_settings_title">Auto Threat Scans</div>
			Automatically scan your phone for threats</div>
		<div class="clear"></div>
		<div class="divider"></div>
	</div>
		
	<div class="each_setting real_time_scan_row">
		<div class="security_settings_value">
			<span class="settings_text_on <%=css['realTimeScanEnabledOn']%>">On</span>
			<span class="settings_text_off <%=css['realTimeScanEnabledOff']%>">Off</span>
		</div>
		<div class="security_settings_text">
			<div class="security_settings_title">Real-Time Scans</div>
			Actively monitor app downloads</div>
		<div class="clear"></div>
		<div class="divider"></div>
	</div>
					
	<div class="each_setting auto_media_scan_row">
		<div class="security_settings_value">
			<span class="settings_text_on <%=css['mediaScanEnabledOn']%>">On</span>
			<span class="settings_text_off <%=css['mediaScanEnabledOff']%>">Off</span>
		</div>
		<div class="security_settings_text">
			<div class="security_settings_title">Automatic Media Scans</div>
			Automatically scan SD card when it is changed</div>
		<div class="clear"></div>
		<div class="divider"></div>
	</div>
		
	<div class="each_setting tray_notification_row">
		<div class="security_settings_value">
			<span class="settings_text_on <%=css['trayNotificationEnabledOn']%>">On</span>
			<span class="settings_text_off <%=css['trayNotificationEnabledOff']%>">Off</span>
		</div>
		<div class="security_settings_text">
			<div class="security_settings_title">Tray Notification</div>
			Security notifications on your toolbar</div>
		<div class="clear"></div>
		<div class="divider"></div>
	</div>
		
	<a href="javascript:void(0)" class="link_text" id="edit_security_settings">View/edit all security settings &gt;</a>
</script>
