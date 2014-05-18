<script type="text/template" id="location_tab_template">
    <div id="location" class="row">
		<div id="location-toggle-submenu" class="hidden-md hidden-lg hidden-sm toggle-submenu">
    		<a class="submenu-show" data-toggle="modal" data-target="#location-menu-tab-sm-full">
    			<span class="submenu-left"></span>
    			<span class="submenu-title">Last Recorded Location</span>
    		</a>
    		<!--<a id="submenu-locate-refresh" class="pull-right"><span class="icon webbycons-refresh"></span></a>-->    		
    		<a id="submenu-locate-claim" class="file_claim report_event pull-right" target="_blank" href="http://phoneclaim.com/"><span class="icon webbycons-box"></span></a>   		
    		
    		<h3 class="location-title-connecting">Locating...</h3>
    		<h3 class="location-title-refining">Refining...</h3>
        </div>
        
        <div id="location-menu-tab-sm-full" class="modal fade ama-submenu ama-menu hidden-md hidden-sm hidden-lg">
            <div class="modal-dialog">
                <div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					</div>                
                    <div class="modal-body">
                        <ul class="menu">                         
                        </ul>
                    </div>

                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
            <div class="modal-footer">
                <a class="" data-dismiss="modal"><span class="glyphicon glyphicon-chevron-up"></span><br/>Close Menu</a>
            </div>
        </div><!-- /.modal -->

        <div id="location_left" class="col-sm-3 col-xs-12 hidden-xs">
            <div class="divider location_history_top"></div>
            <div id="location_history">
                <div class="default location_history">
                    <div class="title">Last Recorded Location</div>
                    <div id="location_last" class="location_last"></div>
                    <div id="location_previous" class="hidden-xs" style="display: none;">
                        <div class="title">Previous Locations</div>
                        <div id="location_history_1_to_4"></div>
                    </div>
                    <div id="clear_location_history" class="hidden-xs" style="">
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
                                <div class="address">Locating Device...</div>
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
            <div class="location_settings hidden-xs hidden-sm hidden-md hidden-lg" style="">
                <div class="title">Location Settings</div>

                <div id="locations_settings_summary_placeholder">
                    <span class='progressing'></span>
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
        <div id="location_right" class="col-sm-9 col-xs-12">
            <div id="map_container">

            </div>
            <div class="note hidden-xs">
                <div class="btnTipsRecover hidden">
                    <div class="textTipsRecover">Tips To Recover Your Lost Device Safely</div>
                </div>
                <p>Remember - safety first. We strongly recommend that you do not attempt to retrieve your device from any location that is not safe, that you do not recognize, or that is not familiar to you. If you believe your device has been stolen or is in an unsafe or unfamiliar location, you should contact your local law enforcement. Asurion is not responsible for any liability resulting from your actions in retrieving your device.</p>

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
                <div class="">Asurion Labs has not yet tried to locate your phone.<br /><br /><a class='link_text report_event' id="button_locate_history_normal">Locate my phone</a></div>
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
    <div id="bing_map" style="position:relative;"></div>
    <div id="bing_map_dialog" style="display: none;"></div>
    <div id="message" style="display: none;">To find your phone on this map, click the <b>Locate Phone</b> button at the top of the page.</div>
    <div id="location_failed_note" style="display: none;">
        <h3>No Location Available...</h3>
        <span>Your phone may be turned off, out of coverage area, or Location Service may be off on your phone.</span>    
    </div>
    <div id="location_progress_note" style="display: none;">
        <div class="text location_progress_text locating">Locating Device...</div>
        <div class="text location_progress_text refining">Refining Location...</div>
        <div class="btn btn-primary cancel_locate">Cancel</div>
        <div class="time_remaining">Less than <span class="countdown"></span> remaining</div>
        <!--<div class="accuracy">- Accuracy ? Meters -</div>-->
    </div>
</script>

<script type="text/template" id="location_map_infobox_template">
    <div class="map-info" >
        <div class="modal-dialog" style="">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close <%=infoboxElClass%>" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h3 class="infoTitle <%=historyClass%>">Location History <%=index%></h3>
                    <h3 class="infoTitle <%=locatedClass%>">Device Located</label></h3>
                </div>
                <div class="modal-body">
                    <div class="markerline"><%=address%></div>
                    <div class="markerline"><%=timeLocated%></div>
                    <div class="markerline accuracy">
                        Accuracy: <%=accuracy%> meters
                        <br />                        
                        <a class="link_text get_directions" href="http://www.bing.com/maps/default.aspx?v=2&amp;where1=<%=address%>" target="_blank">Get Directions</a>
						
                    </div>
                </div>
                <div class="modal-footer">
                    <div id="refresh_loc_map"><a class="btn btn-primary refresh_loc_btn">Refresh Location</a></div>
					<div id="fbsharelocation"><img src="/web/r/img/fblike.PNG"> </img> </div>	
					<div class="fb-like" data-href="https://developers.facebook.com/docs/plugins/" data-layout="standard" data-action="recommend" data-show-faces="true" data-share="true"></div>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
</script>

<script type="text/template" id="last_location_submenu_item_template">
	<li id="location_history_subitem_<%=id%>" uid="<%=id%>" data-dismiss="modal">
		<h3 class="submenuItemLabel">Last Recorded Location<span class="pull-right" data-icon="&#59418;"></span></h3>
        <div class="item">
            <div class="info">
                <% if (!timeLocated && !accuracy) { %>
                <div>Asurion Labs has not yet tried to locate your phone.</div>
                <%}else{%>
                <div class="address"><%=address%></div>                
                <div class="time"><%=timeLocated%></div>
                <div class="accuracy">Accuracy: <%=accuracy%> meters</div>
                <%}%>
            </div>
        </div>
	</li>
</script>

<script type="text/template" id="previous_location_submenu_item_template">
	<li id="location_history_subitem_<%=id%>" uid="<%=id%>" data-dismiss="modal">
		<h3 class="submenuItemLabel">Previous Location <%=id%><span class="pull-right" data-icon="&#59418;"></span></h3>
        <div class="item">
            <div class="info">
                <div class="address"><%=address%></div>
                <div class="time"><%=timeLocated%></div>
                <div class="accuracy">Accuracy: <%=accuracy%> meters</div>
            </div>
        </div>		
	</li>
</script>