<script id="data_tab_template" type="text/template">
	<div id="records_mainhalf">

		<!-- Subtab selectors -->
		<div class="recordspane_nav">
			<ul>
				<li id="data_contacts_tab_selector" class="standard_button recordspane_nav_button recordspane_nav_button_contacts report_event" style="width: 25%;">
					<a href="#home/data/contacts" id="contacts">Contacts</a>
				</li>
				<li id="data_photos_tab_selector" class="standard_button recordspane_nav_button recordspane_nav_button_photos report_event" style="width: 25%;">
					<a href="#home/data/photos"  id="photos">Photos</a>
				</li>
				<li id="data_videos_tab_selector" class="standard_button recordspane_nav_button recordspane_nav_button_videos report_event" style="width: 25%;">
					<a href="#home/data/videos" id="videos">Videos</a>
				</li>
				<li id="data_trash_tab_selector" class="standard_button recordspane_nav_button recordspane_nav_button_trash report_event" style="width: 25%;">
					<a href="#home/data/trash"  id="trash">Trash</a>
				</li>
			</ul>
		</div>

		<!-- Subtabs -->
		<div id ="data_contacts_tab">
			<div style="height:220px;padding:120px;font-size:36px;text-align:center;color:#CCC">Loading contacts...</div>
		</div>
		<div id="data_photos_tab">
			<div style="height:220px;padding:120px;font-size:36px;text-align:center;color:#CCC">Loading photos...</div>
		</div>
		<div id="data_videos_tab">
			<div style="height:220px;padding:120px;font-size:36px;text-align:center;color:#CCC">Loading videos...</div>
		</div>
		<div id="data_trash_tab"></div>
	</div>


	<div id="data_standard_dialogs"></div>

	<!-- Data tab standard dialog messages -->
	<div class="dialog_messages hidden">
		<!-- Error messages -->
		<div id="msg_error_no_action_selected">Please choose an action.</div>
	</div>

	<!-- Data tab dialogs -->
	<div id="lessismoredialog"></div>

	<div class="clear"></div>
    <div id="transfer_data_instruction_dialog" class="transferdata_dialog dialog" style="display:none"></div>
    <div id="learnMoreDiv" class="dialog" style="display:none"></div>

</script>

<script type="text/template" id="data_contacts_template">
	<div id="records_consolehalf">
		<div class="console" id="data_contacts_management">
			<div class="mc_title">
				Manage Contacts
				<span class="toggle"></span>
			</div>
			<div class="mc_links">
				<div id="mcp_create">
					<a href="javascript:;" class="mc_link create_contacts_link report_event" id="data_contacts_createcontact">
						Create New Contact(s)
					</a>
				</div>
				<div id="mcp_upload">
					<a href="javascript:;" class="mc_link import_contacts_link report_event" id="data_contacts_importcontacts">
						Import Contacts
					</a>
				</div>
				<div id="mcp_export">
					<a href="javascript:void(0);" class="mc_link export_contacts_link report_event" id="data_contacts_exportcontacts">
						Export Contacts
					</a>
				</div>
				<div id="mcp_print">
					<a href="javascript:void(0);" class="mc_link print_contacts_link report_event" id="data_contacts_printcontacts">
						Print Contacts
					</a>
				</div>
                <div class="hidden">
                    <div id="no_contacts_to_print">No contacts to print.</div>
                    <div id="no_contacts_to_export">There are no contacts to export.</div>
                </div>
			</div>

		</div>
		<div id="record_breakdown" class="console record_breakdown" style="">
			<div class="mc_title">Contact Breakdown<span class="toggle"></span></div>
			<div class="record_breakdown_spinner">
				<img src="img/working.gif" />
			</div>
			<div class="recordContent" id="data_contacts_breakdown">
				<div class="syncedwithphone item"><span class="syncedwithphone_val">0</span>&nbsp;Contacts synced with your phone</div>
				<div class="savedonweb item"><span class="savedonweb_val">0</span>&nbsp;Contacts saved on the web</div>
				<div class="tobesynced item"><span class="tobesynced_val">0</span>&nbsp;Contacts will be updated during the next sync</div>
			</div>
		</div>
		<div class="console sync_settings">
            <div class="mc_title">
                Auto Sync Settings<span class="toggle"></span>
            </div>
            <div id="contacts_settings_summary_placeholder">
                <div style="height:10px;padding:10px;font-size:24px;text-align:center;color:#CCC">
                    <img src="img/working.gif" />
                </div>
            </div>
            <div class="link">
                <a class="link_text report_event" href="javascript:;" id="sync_settings"><span class="ios">View</span><span class="non-ios">Edit</span> Sync Settings</a>
            </div>
            <div class="transfer_data_instruction">
                <div class="mc_title">
                    Transfer Data<span class="toggle"></span>
                </div>
                <div class="transferdetails content">
                    <div class="link">
                        <a class="link_text report_event transfer_data_view_instruction" href="javascript:void(0);" id="">View Instruction</a>
                    </div>
                </div>
            </div>
        </div>

	</div>
	<div id="records_tablehalf" class="records_lefthalf" style="display: block;">
		<div id="contact_resource">
		    <div class="less_is_more_link report_event">Why is this contact list different than what I see on my phone?</div>
		</div>
		<div id="commands_searchplace">
			<!-- IERT -->
		</div>
		<div id="data_contacts_searchbar">
			<input id="commands_searchinput" class="searchinput" placeholder="Search" tabindex="1" type="text">
		</div>
		<div class="actionbar">
			<span class="actiontext">Action:</span>
			<select class="multiactionselect" id="data_contacts_multiaction_select">
				<option value="">Select One</option>
				<option value="delete">Delete From Phone &amp; Web</option>
				<option value="addToPhone">Add To My Phone</option>
				<option value="removeFromPhone">Remove From My Phone</option>

			</select>
			<span class="batch_perform_button btn_perform btn btn_small" id="data_contacts_multiaction_perform">Perform</span>
		</div>

		<div class="selectbar">
			<span class="selectall">
				<input type="checkbox" id="data_contacts_selectall">
				<label for="data_contacts_selectall">Select All</label>
			</span>
			<span id="ct_batchselect">
				<select class="contacts_list_page_select rt_batchselect" id="data_contacts_pageselector"></select>
			</span>
		</div>

		<div id="contactstable" class="recordstable">
			<div id="ct_rowbox" class="rt_rowbox" batchnumber="0">
				<div id="data_contacts_list">
					<div style="height:120px;padding:120px;font-size:24px;text-align:center;color:#CCC">
					<img src="img/working.gif" /></div>
				</div>
			</div>
		</div>

	</div>
	<div id="records_detailshalf" class="records_middlehalf" style="display: block">
		<div id="contactdetailsbox" class="details_outer" style="display: block">
			<div id="data_contact_details"></div>
		</div>
	</div>
	<div id="data_contact_add-edit" style="display:none"></div>
	<div id="data_contacts_import" style="display:none"></div>
	<div class="dialog_messages hidden">
		<!-- Dialog messages for Contacts view -->

		<!-- Confirm delete messages -->
		<div id="msg_confirm_delete_contact">Are you sure you want to delete this contact?</div>
		<div id="msg_confirm_delete_contacts">Are you sure you want to delete these contacts?</div>

		<!-- Error messages -->
		<div id="msg_error_no_contact_selected">Please choose some contacts.</div>
	</div>
</script>

<script type="text/template" id="contacts_list_template">

		<div class="rt_row <%= elStyle %>" id="<%= elId %>" uid="<%= id %>">
			<div rt_checkboxcolumn="" col="0" style="left: 0%; width: 11%;*width:auto;" class="rt_column">
				<input class="rt_rowcheckbox" style="z-index: 2" type="checkbox" uid="<%= itemUid %>">
			</div>
			<div col="1" style="left: 11.3%; width: 83%;*width:auto;" class="rt_column rt_column_name"><%=fullName%></div>
			<div col="2" class="rt_syncRow">
				<div class="sync_icon" style="<%=recordStatusStyle.addToPhone%>">
					Added At Next Sync
				</div>
				<div class="sync_icon" style="<%=recordStatusStyle.removeFromPhone%>">
					Removed At Next Sync
				</div>
				<div style="<%=recordStatusStyle.onDevice%>">
					On Device
				</div>
				<div style="<%=recordStatusStyle.webOnly%>">
				</div>
			</div>
		</div>
		<div class="divider"></div>
</script>
<script type="text/template" id="trash_list_template">
	<div class="rt_row <%= elStyle %>" id="<%= elId %>" uid="<%= id %>">
		<div col="0" style="left: 0%; width: 11%;*width:auto;" class="rt_column rt_checkboxtrashcolumn">
			<input type="checkbox" class="rt_rowcheckbox" style="z-index: 2;" uid="<%= id %>">
		</div>
		<div col="1" style="left: 11.3%; width: 10%;*width:auto;" class="rt_column">
			<div class="<%= typeClass %>"></div>
		</div>
		<div col="2" style="left: 22.3%; width: 83%;*width:auto;" class="rt_column">
			<div title="<%= fullNameTitle %>"><%= fullName %></div>
		</div>
	</div>
	<div class="divider"></div>
</script>
<script type="text/template" id="import_list_arrow_right_template">
    <div class="rt_row <%= elStyle %>" id="<%= elId %>" uid="<%= id %>">
        <div style="left: 0%;" class="rt_column rt_column_name" uid="<%= id %>">
            <%=fullName%>
        </div>
        <div style="left: 89%; width: 11%;*width:auto;" class="rt_column">
            <img src="img/backup/shifter_arrow_right.png" class="arrow shifter_right" border="0" uid="<%= id %>">
        </div>
    </div>
    <div class="divider"></div>
</script>
<script type="text/template" id="import_list_arrow_left_template">
    <div class="rt_row <%= elStyle %>" id="<%= elId %>" uid="<%= id %>">
        <div style="left: 0%; width: 11%;*width:auto;" class="rt_column">
            <img src="img/backup/shifter_arrow_left.png" class="arrow shifter_left" border="0" uid="<%= id %>">
        </div>
        <div style="left: 12%;" class="rt_column rt_column_name">
            <%=fullName%>
        </div>
    </div>
    <div class="divider"></div>
</script>
<script type="text/template" id="contact_details_template">
<div class="details_contact" style="display: block;">
	<div class="details_header" style="display: block;">
        <div class="details_pictureholder">
            <img class="details_contactpicture" src="<%= pictureSrc %>" border="0" height="66" hspace="5" width="60">
        </div>

		<div class="details_namebox details_bigtext" title="<%= fullNameTitle %>"><%= fullName %></div>
		<div class="details_metadata">
			<div class="details_ownerholder" showtype="block" style="display: none;">
				Owned By
				<span class="details_owner"></span>
			</div>
			<div class="details_syncinfo" style="<%=recordStatusStyle.onDevice%>">
				<span class="littlephone phone_on"></span><span class="synctext">- Currently On <%= deviceName %></span>
			</div>
			<div class="details_syncinfo" style="<%=recordStatusStyle.addToPhone%>">
				<span class="littlephone phone_on_after_sync"></span><span class="synctext">- After sync, contact on <%= endpointName %></span>
			</div>
			<div class="details_syncinfo" style="<%=recordStatusStyle.removeFromPhone%>">
				<span class="littlephone phone_off_after_sync"></span><span class="synctext">- After sync, removed from <%= endpointName %></span>
			</div>
			<div class="details_syncinfo" style="<%=recordStatusStyle.webOnly%>">
				<span class="littlephone phone_off"></span><span class="synctext">- Not currently on phone</span>
			</div>
		</div>
		<!-- <div class="details_toptwo"></div> -->
	</div>
	<div class="details_buttonholder" style="display: block;">
	    <ul>
	    	<li class="details_editbutton edit_contact_button details_button standard_button report_event"  id="contact_edit_btn" style="<%= buttonStyles.edit%>">
	    		<span class="oneline" id="contact_edit_btn">Edit Contact</span>
	   		</li>
	    	<li class="details_removefromdevicebutton details_button standard_button report_event" id="contact_removefrmdevice_btn" style="<%= buttonStyles.removeFromDevice%>">
	    		<span id="contact_removefrmdevice_btn">Remove Contact<br>From My Phone</span>
	    	</li>
	    	<li class="details_addtodevicebutton details_button standard_button report_event" id="contact_addtodevice_btn" style="<%= buttonStyles.addToDevice%>">
	    		<span id="contact_addtodevice_btn">Add Contact<br>To My Phone</span>
	    	</li>
	    	<li class="details_deletebutton details_button standard_button report_event" id="contact_delete_btn" uid="<%=id%>" style="<%= buttonStyles.trash%>">
	    		<span id="contact_delete_btn">Delete Contact<br>From Phone &amp; Web</span>
	    	</li>
	    	<li class="details_undeletebutton details_button standard_button report_event" id="restore_contact_btn" uid="<%=id%>" style="<%= buttonStyles.restore%>">
	    		<span class="oneline" id="restore_contact_btn">Restore Contact</span>
	    	</li>
	    	<li class="details_deletefromtrashbutton details_button standard_button report_event" id="delete_contact_btn" uid="<%=id%>" style="<%= buttonStyles.permanentDelete%>">
	    		<span class="oneline" id="delete_contact_btn">Permanently Delete Contact</span>
	    	</li>
	    </ul>
	</div>
	<div class="contacts_vertical_scroll" id="contacts_scroll_area" style="display: block;">
		<div class="contact_note">
			Fields colored gray are not supported by your phone.
		</div>

        <div class="details_contactinfotitle details_title" style="">Contact Info</div>

        <div class="details_contactinfo details_infobox contacts_details_infobox" style="">
            <div class="<%=im.myClass%> details_lineitem">
                <div class="lineitem_key left" style="margin-left: 2em; text-align:right; padding-left:10px;">Im</div>
                <div class="lineitem_key left" style="margin-left: 2em; text-align:left; padding-left:10px;"><%=im.allIn%></div>
            </div>
            <div class="<%=imAIM.myClass%> details_lineitem">
                <div class="lineitem_key left" style="margin-left: 2em; text-align:right; padding-left:10px;">Im A I M</div>
                <div class="lineitem_key left" style="margin-left: 2em; text-align:left; padding-left:10px;"><%=imAIM.allIn%></div>
            </div>
            <div class="<%=imGTalk.myClass%> details_lineitem">
                <div class="lineitem_key left" style="margin-left: 2em; text-align:right; padding-left:10px;">Im G Talk</div>
                <div class="lineitem_key left" style="margin-left: 2em; text-align:left; padding-left:10px;"><%=imGTalk.allIn%></div>
            </div>
            <div class="<%=imICQ.myClass%> details_lineitem">
                <div class="lineitem_key left" style="margin-left: 2em; text-align:right; padding-left:10px;">Im I C Q</div>
                <div class="lineitem_key left" style="margin-left: 2em; text-align:left; padding-left:10px;"><%=imICQ.allIn%></div>
            </div>
            <div class="<%=imJabber.myClass%> details_lineitem">
                <div class="lineitem_key left" style="margin-left: 2em; text-align:right; padding-left:10px;">Im Jabber</div>
                <div class="lineitem_key left" style="margin-left: 2em; text-align:left; padding-left:10px;"><%=imJabber.allIn%></div>
            </div>
            <div class="<%=imQQ.myClass%> details_lineitem">
                <div class="lineitem_key left" style="margin-left: 2em; text-align:right; padding-left:10px;">Im Q Q</div>
                <div class="lineitem_key left" style="margin-left: 2em; text-align:left; padding-left:10px;"><%=imQQ.allIn%></div>
            </div>
            <div class="<%=imSkype.myClass%> details_lineitem">
                <div class="lineitem_key left" style="margin-left: 2em; text-align:right; padding-left:10px;">Im Skype</div>
                <div class="lineitem_key left" style="margin-left: 2em; text-align:left; padding-left:10px;"><%=imSkype.allIn%></div>
            </div>
            <div class="<%=imWindowsLive.myClass%> details_lineitem">
                <div class="lineitem_key left" style="margin-left: 2em; text-align:right; padding-left:10px;">Im Windows Live</div>
                <div class="lineitem_key left" style="margin-left: 2em; text-align:left; padding-left:10px;"><%=imWindowsLive.allIn%></div>
            </div>
            <div class="<%=imYahoo.myClass%> details_lineitem">
                <div class="lineitem_key left" style="margin-left: 2em; text-align:right; padding-left:10px;">Im Yahoo</div>
                <div class="lineitem_key left" style="margin-left: 2em; text-align:left; padding-left:10px;"><%=imYahoo.allIn%></div>
            </div>
            <div class="<%=imOther.myClass%> details_lineitem">
                <div class="lineitem_key left" style="margin-left: 2em; text-align:right; padding-left:10px;">Im Other</div>
                <div class="lineitem_key left" style="margin-left: 2em; text-align:left; padding-left:10px;"><%=imOther.allIn%></div>
            </div>
            <div class="<%=imOther2.myClass%> details_lineitem">
                <div class="lineitem_key left" style="margin-left: 2em; text-align:right; padding-left:10px;">Im Other2</div>
                <div class="lineitem_key left" style="margin-left: 2em; text-align:left; padding-left:10px;"><%=imOther2.allIn%></div>
            </div>
            <div class="<%=imOther1.myClass%> details_lineitem">
                <div class="lineitem_key left" style="margin-left: 2em; text-align:right; padding-left:10px;">Im Other1</div>
                <div class="lineitem_key left" style="margin-left: 2em; text-align:left; padding-left:10px;"><%=imOther1.allIn%></div>
            </div>
            <div class="<%=mobilePhone.myClass%> details_lineitem">
                <div class="lineitem_key left" style="margin-left: 2em; text-align:right; padding-left:10px;">Mobile Phone</div>
                <div class="lineitem_key left" style="margin-left: 2em; text-align:left; padding-left:10px;"><%=mobilePhone.allIn%></div>
            </div>
            <div class="<%=workPhone.myClass%> details_lineitem">
                <div class="lineitem_key left" style="margin-left: 2em; text-align:right; padding-left:10px;">Work Phone</div>
                <div class="lineitem_key left" style="margin-left: 2em; text-align:left; padding-left:10px;"><%=workPhone.allIn%></div>
            </div>
            <div class="<%=homePhone.myClass%> details_lineitem">
                <div class="lineitem_key left" style="margin-left: 2em; text-align:right; padding-left:10px;">Home Phone</div>
                <div class="lineitem_key left" style="margin-left: 2em; text-align:left; padding-left:10px;"><%=homePhone.allIn%></div>
            </div>
            <div class="<%=fax.myClass%> details_lineitem">
                <div class="lineitem_key left" style="margin-left: 2em; text-align:right; padding-left:10px;">Fax</div>
                <div class="lineitem_key left" style="margin-left: 2em; text-align:left; padding-left:10px;"><%=fax.allIn%></div>
            </div>
            <div class="<%=homeFax.myClass%> details_lineitem">
                <div class="lineitem_key left" style="margin-left: 2em; text-align:right; padding-left:10px;">Home Fax</div>
                <div class="lineitem_key left" style="margin-left: 2em; text-align:left; padding-left:10px;"><%=homeFax.allIn%></div>
            </div>
            <div class="<%=workFax.myClass%> details_lineitem">
                <div class="lineitem_key left" style="margin-left: 2em; text-align:right; padding-left:10px;">Work Fax</div>
                <div class="lineitem_key left" style="margin-left: 2em; text-align:left; padding-left:10px;"><%=workFax.allIn%></div>
            </div>
            <div class="<%=pager.myClass%> details_lineitem">
                <div class="lineitem_key left" style="margin-left: 2em; text-align:right; padding-left:10px;">Pager</div>
                <div class="lineitem_key left" style="margin-left: 2em; text-align:left; padding-left:10px;"><%=pager.allIn%></div>
            </div>
            <div class="<%=email.myClass%> details_lineitem">
                <div class="lineitem_key left" style="margin-left: 2em; text-align:right; padding-left:10px;">Email</div>
                <div class="lineitem_key left" style="margin-left: 2em; text-align:left; padding-left:10px;"><%=email.allIn%></div>
            </div>
            <div class="<%=homeEmail.myClass%> details_lineitem">
                <div class="lineitem_key left" style="margin-left: 2em; text-align:right; padding-left:10px;">Home Email</div>
                <div class="lineitem_key left" style="margin-left: 2em; text-align:left; padding-left:10px;"><%=homeEmail.allIn%></div>
            </div>
            <div class="<%=localEmail.myClass%> details_lineitem">
                <div class="lineitem_key left" style="margin-left: 2em; text-align:right; padding-left:10px;">Local Email</div>
                <div class="lineitem_key left" style="margin-left: 2em; text-align:left; padding-left:10px;"><%=localEmail.allIn%></div>
            </div>
            <div class="<%=otherEmail.myClass%> details_lineitem">
                <div class="lineitem_key left" style="margin-left: 2em; text-align:right; padding-left:10px;">Other Email</div>
                <div class="lineitem_key left" style="margin-left: 2em; text-align:left; padding-left:10px;"><%=otherEmail.allIn%></div>
            </div>
            <div class="<%=workEmail.myClass%> details_lineitem">
                <div class="lineitem_key left" style="margin-left: 2em; text-align:right; padding-left:10px;">Work Email</div>
                <div class="lineitem_key left" style="margin-left: 2em; text-align:left; padding-left:10px;"><%=workEmail.allIn%></div>
            </div>
            <div class="<%=otherPhone.myClass%> details_lineitem">
                <div class="lineitem_key left" style="margin-left: 2em; text-align:right; padding-left:10px;">Other Phone</div>
                <div class="lineitem_key left" style="margin-left: 2em; text-align:left; padding-left:10px;"><%=otherPhone.allIn%></div>
            </div>
            <div class="<%=carPhone.myClass%> details_lineitem">
                <div class="lineitem_key left" style="margin-left: 2em; text-align:right; padding-left:10px;">Car Phone</div>
                <div class="lineitem_key left" style="margin-left: 2em; text-align:left; padding-left:10px;"><%=carPhone.allIn%></div>
            </div>
            <div class="<%=radioPhone.myClass%> details_lineitem">
                <div class="lineitem_key left" style="margin-left: 2em; text-align:right; padding-left:10px;">Radio Phone</div>
                <div class="lineitem_key left" style="margin-left: 2em; text-align:left; padding-left:10px;"><%=radioPhone.allIn%></div>
            </div>
            <div class="<%=localPhone.myClass%> details_lineitem">
                <div class="lineitem_key left" style="margin-left: 2em; text-align:right; padding-left:10px;">Local Phone</div>
                <div class="lineitem_key left" style="margin-left: 2em; text-align:left; padding-left:10px;"><%=localPhone.allIn%></div>
            </div>
            <div class="<%=assistantPhone.myClass%> details_lineitem">
                <div class="lineitem_key left" style="margin-left: 2em; text-align:right; padding-left:10px;">Assistant Phone</div>
                <div class="lineitem_key left" style="margin-left: 2em; text-align:left; padding-left:10px;"><%=assistantPhone.allIn%></div>
            </div>
            <div class="<%=iPhone.myClass%> details_lineitem">
                <div class="lineitem_key left" style="margin-left: 2em; text-align:right; padding-left:10px;">I Phone</div>
                <div class="lineitem_key left" style="margin-left: 2em; text-align:left; padding-left:10px;"><%=iPhone.allIn%></div>
            </div>
			<br>
        </div>
            <div class="<%= formattedHomeAddress.elClass%> details_lineitem" style="display:<%= formattedHomeAddress.display%>">
                <div class="lineitem_key left" style="margin-left: 2em; text-align:right; padding-left:10px;">Home Address:</div>
                <div class="<%= formattedHomeAddress.valueClass%> lineitem_key" style="margin-left: 2em; text-align:right; padding-left:10px;"><%= formattedHomeAddress.value%></div>
            </div>

		<% if ( formattedWorkAddress.value || companyName.value || position.value || department.value){ %>
		    <div class="details_formattedworkaddresstitle details_title">
        	    Work Info &amp; Address
        	</div>
		<% } %>

        <div class="details_formattedworkaddress details_infobox contacts_details_infobox">
			<div class="<%= companyName.elClass%>" style="display:<%= companyName.display%>">
				<div class="lineitem_key" style="margin-left: 2em">Organization:</div>
				<div class="<%= companyName.valueClass%>" style="margin-left: 2em"><%= companyName.value%></div>
			</div>
			<div class="<%= position.elClass%>" style="display:<%= position.display%>">
				<div class="lineitem_key" style="margin-left: 2em">Job Title:</div>
				<div class="<%= position.valueClass%>" style="margin-left: 2em"><%= position.value%></div>
			</div>
			<div class="<%= department.elClass%>" style="display:<%= department.display%>">
				<div class="lineitem_key" style="margin-left: 2em">Department:</div>
				<div class="<%= department.valueClass%>" style="margin-left: 2em"><%= department.value%></div>
			</div>
			<div class="<%= formattedWorkAddress.elClass%>" style="display:<%= formattedWorkAddress.display%>">
				<div class="lineitem_key" style="margin-left: 2em">Work Address:</div>
				<div class="<%= formattedWorkAddress.valueClass%>" style="margin-left: 2em"><%= formattedWorkAddress.value%></div>
			</div>
           	<br>
       	</div>

        <div class="details_formattedotheraddresstitle details_title" style="display: none;">
            Other Address
        </div>

        <div class="details_formattedotheraddress details_infobox contacts_details_infobox" style="display: none;">
            <div class="<%= formattedOtherAddress.elClass%>" style="display:<%= formattedOtherAddress.display%>">
				<div class="lineitem_key" style="margin-left: 2em">Address:</div>
				<div class="<%= formattedOtherAddress.valueClass%>" style="margin-left: 2em"><%= formattedOtherAddress.value%></div>
			</div>
            <br>
        </div>

		<div class="details_formattedcustomaddress details_infobox contacts_details_infobox" style="display: none;">
            <div class="<%= formattedLocalAddress.elClass%>" style="display:<%= formattedLocalAddress.display%>">
				<div class="lineitem_key" style="margin-left: 2em">Address:</div>
				<div class="<%= formattedLocalAddress.valueClass%>" style="margin-left: 2em"><%= formattedLocalAddress.value%></div>
			</div>
            <br>
        </div>

		<% if ( nickName.value || url.myClass != "hidden" || webSiteUrl.myClass != "hidden" || homeUrl.myClass != "hidden" || otherUrl.myClass != "hidden" || preferredUrl.myClass != "hidden" || birthday.value || notes.value || relationship.value){ %>
        	<div class="details_othertitle details_title">
            	Other
        	</div>
		<% } %>

        <div class="details_other details_infobox contacts_details_infobox">
			<div class="<%= nickName.elClass%>" style="display:<%= nickName.display%>">
				<div class="lineitem_key" style="margin-left: 2em">Nickname:</div>
				<div class="<%= nickName.valueClass%>" style="margin-left: 2em"><%= nickName.value%></div>
			</div>
			<div class="<%= relationship.elClass%>" style="display:<%= relationship.display%>">
				<div class="lineitem_key" style="margin-left: 2em">Relationship:</div>
				<div class="<%= relationship.valueClass%>" style="margin-left: 2em"><%= relationship.value%></div>
			</div>

            <div class="<%=webSiteUrl.myClass%> details_lineitem">
                <div class="lineitem_key left" style="margin-left: 2em; text-align:right; padding-left:10px;">Web Site Url</div>
                <div class="lineitem_key left" style="margin-left: 2em; text-align:left; padding-left:10px;"><%=webSiteUrl.allIn%></div>
            </div>
            <div class="<%=preferredUrl.myClass%> details_lineitem">
                <div class="lineitem_key left" style="margin-left: 2em; text-align:right; padding-left:10px;">Preferred Url</div>
                <div class="lineitem_key left" style="margin-left: 2em; text-align:left; padding-left:10px;"><%=preferredUrl.allIn%></div>
            </div>
            <div class="<%=homeUrl.myClass%> details_lineitem">
                <div class="lineitem_key left" style="margin-left: 2em; text-align:right; padding-left:10px;">Home Url</div>
                <div class="lineitem_key left" style="margin-left: 2em; text-align:left; padding-left:10px;"><%=homeUrl.allIn%></div>
            </div>
            <div class="<%=otherUrl.myClass%> details_lineitem">
                <div class="lineitem_key left" style="margin-left: 2em; text-align:right; padding-left:10px;">Other Url</div>
                <div class="lineitem_key left" style="margin-left: 2em; text-align:left; padding-left:10px;"><%=otherUrl.allIn%></div>
            </div>
            <div class="<%=workUrl.myClass%> details_lineitem">
                <div class="lineitem_key left" style="margin-left: 2em; text-align:right; padding-left:10px;">Work Url</div>
                <div class="lineitem_key left" style="margin-left: 2em; text-align:left; padding-left:10px;"><%=workUrl.allIn%></div>
            </div>
            <div class="<%=url.myClass%> details_lineitem">
                <div class="lineitem_key left" style="margin-left: 2em; text-align:right; padding-left:10px;">Url</div>
                <div class="lineitem_key left" style="margin-left: 2em; text-align:left; padding-left:10px;"><%=url.allIn%></div>
            </div>





			<div class="<%= birthday.elClass%>" style="display:<%= birthday.display%>">
				<div class="lineitem_key" style="margin-left: 2em">Birthday:</div>
				<div class="<%= birthday.valueClass%>" style="margin-left: 2em"><%= birthday.value%></div>
			</div>
			<div class="<%= notes.elClass%>" style="display:<%= notes.display%>">
				<div class="lineitem_key" style="margin-left: 2em">Notes:</div>
				<div class="<%= notes.valueClass%>" style="margin-left: 2em"><%= notes.value%></div>
			</div>
            <br>
		</div>
	</div>
</div>
</script>
<!-- end contact_details_template -->
<script type="text/template" id="import_contacts_details_template">
<div class="details_contact" style="display: block;">
    <div class="details_header" style="display: block;">
        <div class="details_pictureholder">
            <img class="details_contactpicture" src="<%= pictureSrc %>" border="0" height="66" hspace="5" width="60">
        </div>

        <div class="details_namebox details_bigtext" title="<%= fullNameTitle %>"><%= fullName %></div>
        <div class="details_metadata">
            <div class="details_ownerholder" showtype="block" style="display: none;">
                Owned By
                <span class="details_owner"></span>
            </div>
            <div class="details_syncinfo">
                <span class="littlephone phone_off"></span><span class="synctext">- Not currently on phone</span>
            </div>
        </div>
    </div>
    <div class="shifter_vertical_scroll" id="contacts_scroll_area" style="display: block;">
        <div class="contact_note">
            Fields colored gray are not supported by your phone.
        </div>

        <div class="details_contactinfotitle details_title" style="">Contact Info</div>

        <div class="details_contactinfo details_infobox" style="">
            <div class="<%=im.myClass%> details_lineitem">
                <div class="lineitem_key left">Im</div>
                <div class="lineitem_value left"><%=im.allIn%></div>
            </div>
            <div class="<%=imAIM.myClass%> details_lineitem">
                <div class="lineitem_key left">Im A I M</div>
                <div class="lineitem_value left"><%=imAIM.allIn%></div>
            </div>
            <div class="<%=imGTalk.myClass%> details_lineitem">
                <div class="lineitem_key left">Im G Talk</div>
                <div class="lineitem_value left"><%=imGTalk.allIn%></div>
            </div>
            <div class="<%=imICQ.myClass%> details_lineitem">
                <div class="lineitem_key left">Im I C Q</div>
                <div class="lineitem_value left"><%=imICQ.allIn%></div>
            </div>
            <div class="<%=imJabber.myClass%> details_lineitem">
                <div class="lineitem_key left">Im Jabber</div>
                <div class="lineitem_value left"><%=imJabber.allIn%></div>
            </div>
            <div class="<%=imQQ.myClass%> details_lineitem">
                <div class="lineitem_key left">Im Q Q</div>
                <div class="lineitem_value left"><%=imQQ.allIn%></div>
            </div>
            <div class="<%=imSkype.myClass%> details_lineitem">
                <div class="lineitem_key left">Im Skype</div>
                <div class="lineitem_value left"><%=imSkype.allIn%></div>
            </div>
            <div class="<%=imWindowsLive.myClass%> details_lineitem">
                <div class="lineitem_key left">Im Windows Live</div>
                <div class="lineitem_value left"><%=imWindowsLive.allIn%></div>
            </div>
            <div class="<%=imYahoo.myClass%> details_lineitem">
                <div class="lineitem_key left">Im Yahoo</div>
                <div class="lineitem_value left"><%=imYahoo.allIn%></div>
            </div>
            <div class="<%=imOther.myClass%> details_lineitem">
                <div class="lineitem_key left">Im Other</div>
                <div class="lineitem_value left"><%=imOther.allIn%></div>
            </div>
            <div class="<%=imOther2.myClass%> details_lineitem">
                <div class="lineitem_key left">Im Other2</div>
                <div class="lineitem_value left"><%=imOther2.allIn%></div>
            </div>
            <div class="<%=imOther1.myClass%> details_lineitem">
                <div class="lineitem_key left">Im Other1</div>
                <div class="lineitem_value left"><%=imOther1.allIn%></div>
            </div>
            <div class="<%=mobilePhone.myClass%> details_lineitem">
                <div class="lineitem_key left">Mobile Phone</div>
                <div class="lineitem_value left"><%=mobilePhone.allIn%></div>
            </div>
            <div class="<%=workPhone.myClass%> details_lineitem">
                <div class="lineitem_key left">Work Phone</div>
                <div class="lineitem_value left"><%=workPhone.allIn%></div>
            </div>
            <div class="<%=homePhone.myClass%> details_lineitem">
                <div class="lineitem_key left">Home Phone</div>
                <div class="lineitem_value left"><%=homePhone.allIn%></div>
            </div>
            <div class="<%=fax.myClass%> details_lineitem">
                <div class="lineitem_key left">Fax</div>
                <div class="lineitem_value left"><%=fax.allIn%></div>
            </div>
            <div class="<%=homeFax.myClass%> details_lineitem">
                <div class="lineitem_key left">Home Fax</div>
                <div class="lineitem_value left"><%=homeFax.allIn%></div>
            </div>
            <div class="<%=workFax.myClass%> details_lineitem">
                <div class="lineitem_key left">Work Fax</div>
                <div class="lineitem_value left"><%=workFax.allIn%></div>
            </div>
            <div class="<%=pager.myClass%> details_lineitem">
                <div class="lineitem_key left">Pager</div>
                <div class="lineitem_value left"><%=pager.allIn%></div>
            </div>
            <div class="<%=email.myClass%> details_lineitem">
                <div class="lineitem_key left">Email</div>
                <div class="lineitem_value left"><%=email.allIn%></div>
            </div>
            <div class="<%=homeEmail.myClass%> details_lineitem">
                <div class="lineitem_key left">Home Email</div>
                <div class="lineitem_value left"><%=homeEmail.allIn%></div>
            </div>
            <div class="<%=localEmail.myClass%> details_lineitem">
                <div class="lineitem_key left">Local Email</div>
                <div class="lineitem_value left"><%=localEmail.allIn%></div>
            </div>
            <div class="<%=otherEmail.myClass%> details_lineitem">
                <div class="lineitem_key left">Other Email</div>
                <div class="lineitem_value left"><%=otherEmail.allIn%></div>
            </div>
            <div class="<%=workEmail.myClass%> details_lineitem">
                <div class="lineitem_key left">Work Email</div>
                <div class="lineitem_value left"><%=workEmail.allIn%></div>
            </div>
            <div class="<%=otherPhone.myClass%> details_lineitem">
                <div class="lineitem_key left">Other Phone</div>
                <div class="lineitem_value left"><%=otherPhone.allIn%></div>
            </div>
            <div class="<%=carPhone.myClass%> details_lineitem">
                <div class="lineitem_key left">Car Phone</div>
                <div class="lineitem_value left"><%=carPhone.allIn%></div>
            </div>
            <div class="<%=radioPhone.myClass%> details_lineitem">
                <div class="lineitem_key left">Radio Phone</div>
                <div class="lineitem_value left"><%=radioPhone.allIn%></div>
            </div>
            <div class="<%=localPhone.myClass%> details_lineitem">
                <div class="lineitem_key left">Local Phone</div>
                <div class="lineitem_value left"><%=localPhone.allIn%></div>
            </div>
            <div class="<%=assistantPhone.myClass%> details_lineitem">
                <div class="lineitem_key left">Assistant Phone</div>
                <div class="lineitem_value left"><%=assistantPhone.allIn%></div>
            </div>
            <div class="<%=iPhone.myClass%> details_lineitem">
                <div class="lineitem_key left">I Phone</div>
                <div class="lineitem_value left"><%=iPhone.allIn%></div>
            </div>
            <br>
        </div>
            <div class="<%= formattedHomeAddress.elClass%> details_lineitem" style="display:<%= formattedHomeAddress.display%>">
                <div class="lineitem_key left">Home Address:</div>
                <div class="<%= formattedHomeAddress.valueClass%> lineitem_value"><%= formattedHomeAddress.value%></div>
            </div>

        <% if ( formattedWorkAddress.value || companyName.value || position.value || department.value){ %>
            <div class="details_formattedworkaddresstitle details_title">
                Work Info &amp; Address
            </div>
        <% } %>

        <div class="details_formattedworkaddress details_infobox contacts_details_infobox">
            <div class="<%= companyName.elClass%>" style="display:<%= companyName.display%>">
                <div class="lineitem_key">Organization:</div>
                <div class="<%= companyName.valueClass%>" style=""><%= companyName.value%></div>
            </div>
            <div class="<%= position.elClass%>" style="display:<%= position.display%>">
                <div class="lineitem_key">Job Title:</div>
                <div class="<%= position.valueClass%>"><%= position.value%></div>
            </div>
            <div class="<%= department.elClass%>" style="display:<%= department.display%>">
                <div class="lineitem_key">Department:</div>
                <div class="<%= department.valueClass%>"><%= department.value%></div>
            </div>
            <div class="<%= formattedWorkAddress.elClass%>" style="display:<%= formattedWorkAddress.display%>">
                <div class="lineitem_key">Work Address:</div>
                <div class="<%= formattedWorkAddress.valueClass%>"><%= formattedWorkAddress.value%></div>
            </div>
            <br>
        </div>

        <div class="details_formattedotheraddresstitle details_title" style="display: none;">
            Other Address
        </div>

        <div class="details_formattedotheraddress details_infobox contacts_details_infobox" style="display: none;">
            <div class="<%= formattedOtherAddress.elClass%>" style="display:<%= formattedOtherAddress.display%>">
                <div class="lineitem_key">Address:</div>
                <div class="<%= formattedOtherAddress.valueClass%>"><%= formattedOtherAddress.value%></div>
            </div>
            <br>
        </div>

        <div class="details_formattedcustomaddress details_infobox contacts_details_infobox" style="display: none;">
            <div class="<%= formattedLocalAddress.elClass%>" style="display:<%= formattedLocalAddress.display%>">
                <div class="lineitem_key">Address:</div>
                <div class="<%= formattedLocalAddress.valueClass%>"><%= formattedLocalAddress.value%></div>
            </div>
            <br>
        </div>

        <% if ( nickName.value || url.myClass != "hidden" || webSiteUrl.myClass != "hidden" || homeUrl.myClass != "hidden" || otherUrl.myClass != "hidden" || preferredUrl.myClass != "hidden" || birthday.value || notes.value || relationship.value){ %>
            <div class="details_othertitle details_title">
                Other
            </div>
        <% } %>

        <div class="details_other details_infobox contacts_details_infobox">
            <div class="<%= nickName.elClass%>" style="display:<%= nickName.display%>">
                <div class="lineitem_key">Nickname:</div>
                <div class="<%= nickName.valueClass%>"><%= nickName.value%></div>
            </div>
            <div class="<%= relationship.elClass%>" style="display:<%= relationship.display%>">
                <div class="lineitem_key">Relationship:</div>
                <div class="<%= relationship.valueClass%>"><%= relationship.value%></div>
            </div>

            <div class="<%=webSiteUrl.myClass%> details_lineitem">
                <div class="lineitem_key left">Web Site Url</div>
                <div class="lineitem_value left"><%=webSiteUrl.allIn%></div>
            </div>
            <div class="<%=preferredUrl.myClass%> details_lineitem">
                <div class="lineitem_key left">Preferred Url</div>
                <div class="lineitem_value left"><%=preferredUrl.allIn%></div>
            </div>
            <div class="<%=homeUrl.myClass%> details_lineitem">
                <div class="lineitem_key left">Home Url</div>
                <div class="lineitem_value left"><%=homeUrl.allIn%></div>
            </div>
            <div class="<%=otherUrl.myClass%> details_lineitem">
                <div class="lineitem_key left">Other Url</div>
                <div class="lineitem_value left"><%=otherUrl.allIn%></div>
            </div>
            <div class="<%=workUrl.myClass%> details_lineitem">
                <div class="lineitem_key left">Work Url</div>
                <div class="lineitem_value left"><%=workUrl.allIn%></div>
            </div>
            <div class="<%=url.myClass%> details_lineitem">
                <div class="lineitem_key left">Url</div>
                <div class="lineitem_value left"><%=url.allIn%></div>
            </div>





            <div class="<%= birthday.elClass%>" style="display:<%= birthday.display%>">
                <div class="lineitem_key">Birthday:</div>
                <div class="<%= birthday.valueClass%>"><%= birthday.value%></div>
            </div>
            <div class="<%= notes.elClass%>" style="display:<%= notes.display%>">
                <div class="lineitem_key">Notes:</div>
                <div class="<%= notes.valueClass%>"><%= notes.value%></div>
            </div>
            <br>
        </div>
    </div>
</div>
</script>

<script type="text/template" id="data_photos_template" class="template">
    <div id="records_consolehalf" style="display: block;">
    	<div id="record_breakdown" class="console record_breakdown record_breakdown_top" style="">
    		<div class="mc_title">Photo Breakdown<span class="toggle"></span></div>
    		<div class="record_breakdown_spinner">
				<img src="img/working.gif" />
			</div>
			<div class="recordContent" id="data_photos_breakdown">
				<div class="syncedwithphone item"><span class="syncedwithphone_val">0</span>&nbsp;Photos synced with your phone</div>
				<div class="savedonweb item"><span class="savedonweb_val">0</span>&nbsp;Photos saved on the web</div>
				<div class="tobesynced item"><span class="tobesynced_val">0</span>&nbsp;Photos will be updated during the next sync</div>
			</div>
		</div>
	   <div class="console sync_settings">
            <div class="mc_title">
                Auto Sync Settings<span class="toggle"></span>
            </div>
            <div id="photos_settings_summary_placeholder">
                <div style="height:10px;padding:10px;font-size:24px;text-align:center;color:#CCC">
                    <img src="img/working.gif" />
                </div>
            </div>
            <div class="link">
                <a class="link_text report_event" href="javascript:;" id="sync_settings"><span class="ios">View</span><span class="non-ios">Edit</span> Sync Settings</a>
            </div>
		</div>
        <div class="transfer_data_instruction console transferdata" style="display: none;">
            <div class="mc_title">
                Transfer Data
                <span class="toggle"></span>
            </div>
            <div class="transferdetails content">
                <div class="link">
                    <a class="link_text report_event transfer_data_view_instruction" href="javascript:void(0);" id="">View Instruction</a>
                </div>
            </div>
        </div>
	</div>

	<div id="records_tablehalf" class="records_lefthalf records_tablehalfimage" style="display: block;">
		<div id="commands_searchplace">
			<!-- IERT -->
		</div>
		<div id="commands_search" style="display: none;">
			<input type="text" id="commands_searchinput" class="commands_searchplaceholder inputplaceholdertext" onkeyup="Interface.contactsTable.searchFilterChanged();" value="Search" placeholder="Search" onfocus="Jebber.placeholderFields.placeholderTextOnFocus(this);" onblur="Jebber.placeholderFields.placeholderTextOnBlur(this);" tabindex="1">
		</div>
		<div class="actionbar actionbar_media">
			<span class="actiontext">Action:</span>
			<select class="multiactionselect" id="data_photos_multiaction_select">
				<option value="">Select One</option>
				<option value="delete">Delete From Phone &amp; Web</option>
				<option value="addToPhone">Add To My Phone</option>
				<option value="removeFromPhone">Remove From My Phone</option>
			</select>
			<span class="btn_perform btn btn_small" id="data_photos_multiaction_perform">Perform</span>
		</div>
		<div class="selectbar">
			<span class="selectall">
				<input type="checkbox" id="data_photos_selectall">
				<label for="data_photos_selectall">Select All</label>
			</span>
			<span class="selectNote">
				*Note: Web only photos can be added to your phone or deleted to free up storage capacity.<br/>
                <span class="learnMore link_text">Learn more</span>
			</span>
			<span id="ct_batchselect">
				<select class="rt_batchselect" id="data_photos_pageselector"></select>
			</span>
		</div>
		<div id="tab_batchselectcontact" class="tab_batchselectholder">
			<!-- Populated dynamically -->
		</div>
		<div id="tab_batchselectimage" class="tab_batchselectholder">
			<!-- Populated dynamically -->
		</div>
		<div id="tab_batchselectaudio" class="tab_batchselectholder">
			<!-- Populated dynamically -->
		</div>
		<div id="tab_batchselectvideo" class="tab_batchselectholder">
			<!-- Populated dynamically -->
		</div>

		<div id="contactstable" class="recordstable recordstable_media">
			<div id="ct_rowbox" class="rt_rowbox" batchnumber="0">
				<div id="data_photos_list">
					<div style="height:50px;padding:50px;font-size:24px;text-align:center;color:#CCC">
						<img src="img/working.gif" />
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="dialog_messages hidden">
		<!-- Dialog messages for Photos view -->

		<!-- Confirm delete messages -->
		<div id="msg_confirm_delete_photo">Are you sure you want to delete this photo?</div>
		<div id="msg_confirm_delete_photos">Are you sure you want to delete these photos?</div>

		<!-- Error messages -->
		<div id="msg_error_no_photo_selected">Please choose some photos.</div>
	</div>
</script>

<script type="text/template" id="photos_list_template" class="template">
	<div class="rt_rowmedia rt_rowlighter" id="ct_row_<%= id %>" uid="<%= id %>">
		<div class="rt_columnmedia">
			<div class="buttoncontainer">
				<div class="btn_viewfullsize report_event" id="view_photo_hover_btn" uid="<%= id %>"></div>
				<div class="btn_addtophone hidden report_event" id="photo_addtophone_btn" uid="<%= id %>"></div>
				<div class="btn_removefromphone hidden report_event" id="photo_removefromphone_btn" uid="<%= id %>"></div>
				<div class="btn_downloadphoto report_event" id="photo_download_btn" uid="<%= id %>"></div>
				<div class="btn_deletephoto report_event" id="photo_delete_btn" uid="<%= id %>"></div>
			</div>
			<img align="center" border="0" src="<%= thumbnailUrl %>">
		</div>

		<div class="rt_checkRow">
			<input class="rt_rowcheckbox" uid="<%= id %>" style="z-index: 2" type="checkbox">
		</div>

		<div class="rt_endpointsync">
			<div class="rt_endpointsync_text hidden on_phone">On Phone</div>
			<div class="rt_endpointsync_text hidden added_next_sync">Added At Next Sync</div>
			<div class="rt_endpointsync_text hidden removed_next_sync">Removed At Next Sync</div>
			<div class="rt_endpointsync_text hidden web_only">Web Only</div>
		</div>
	</div>
</script>

<script type="text/template" id="data_videos_template" class="template">
	<div id="records_consolehalf" style="display: block;">
		<div id="record_breakdown" class="console record_breakdown record_breakdown_top" style="">
			<div class="mc_title">Video Breakdown<span class="toggle"></span></div>
			<div class="record_breakdown_spinner">
				<img src="img/working.gif" />
			</div>
			<div class="recordContent" id="data_videos_breakdown">
				<div class="syncedwithphone item"><span class="syncedwithphone_val">0</span>&nbsp;Videos synced with your phone</div>
				<div class="savedonweb item"><span class="savedonweb_val">0</span>&nbsp;Videos saved on the web</div>
				<div class="tobesynced item"><span class="tobesynced_val">0</span>&nbsp;Videos will be updated during the next sync</div>
			</div>
		</div>

		<div class="console sync_settings">
            <div class="mc_title">
                Auto Sync Settings<span class="toggle"></span>
            </div>
            <div id="videos_settings_summary_placeholder">
                <div style="height:10px;padding:10px;font-size:24px;text-align:center;color:#CCC">
                    <img src="img/working.gif" />
                </div>
            </div>
            <div class="link">
                <a class="link_text report_event" href="javascript:;" id="sync_settings"><span class="ios">View</span><span class="non-ios">Edit</span> Sync Settings</a>
            </div>
        </div>

        <div class="console transferdata transfer_data_instruction" style="display: none;">
            <div class="mc_title">
                Transfer Data
                <span class="toggle"></span>
            </div>
            <div class="transferdetails content">
                <div class="link">
                    <a class="link_text report_event transfer_data_view_instruction" href="javascript:void(0);" id="">View Instruction</a>
                </div>
            </div>
        </div>

		<div id="new_phone" class="console">
			<div class="mc_title">
				Got a new phone?
				<span class="toggle"></span>
			</div>
			<div class="phonedetails">
			<a href="#" class="mc_link" onclick="Interface.openSupportCenter('support_restore');">
				Restore Instructions
			</a>
			</div>
		</div>

		<div id="phone_key" class="console">
			<div class="mc_title">
				Icon Legend
				<span class="toggle"></span>
			</div>
			<div class="on_phone">
				<div class="icon_image"></div>
				<div class="icon_text">Currently on phone</div>
				<div class="clear"></div>
			</div>
			<div class="off_phone">
				<div class="icon_image"></div>
				<div class="icon_text">Not currently on phone</div>
				<div class="clear"></div>
			</div>
			<div class="arrows_on_off">
				<div class="icon_image"></div>
				<div class="icon_text">Will be added/removed on next sync</div>
				<div class="clear"></div>
			</div>
		</div>
	</div>
	<div id="records_tablehalf" class="records_lefthalf records_tablehalfvideo" style="display: block;">
		<div id="commands_searchplace">
			<!-- IERT -->
		</div>
		<div id="commands_search" style="display: none;">
			<input type="text" id="commands_searchinput" class="commands_searchplaceholder inputplaceholdertext" onkeyup="Interface.contactsTable.searchFilterChanged();" value="Search" placeholder="Search" onfocus="Jebber.placeholderFields.placeholderTextOnFocus(this);" onblur="Jebber.placeholderFields.placeholderTextOnBlur(this);" tabindex="1">
		</div>
		<div class="actionbar actionbar_media">
			<span class="actiontext">Action:</span>
			<select class="multiactionselect" id="data_videos_multiaction_select">
				<option value="">Select One</option>
				<option value="delete">Delete From Phone &amp; Web</option>
				<option value="addToPhone">Add To My Phone</option>
				<option value="removeFromPhone">Remove From My Phone</option>
			</select>
			<span class="btn_perform btn btn_small" id="data_videos_multiaction_perform">Perform</span>
		</div>
		<div class="selectbar">
			<span class="selectall">
				<input type="checkbox" id="data_videos_selectall">
				<label for="data_videos_selectall">Select All</label>
			</span>
			<span class="selectNote">
				*Note: Web only videos can be added to your phone or deleted to free up storage capacity.<br/>
                <span href="javascript:;" class="learnMore link_text">Learn more</span>
			</span>

			<span id="ct_batchselect">
				<select class="rt_batchselect" id="data_videos_pageselector"></select>
			</span>
		</div>
		<div id="tab_batchselectcontact" class="tab_batchselectholder"><!-- Populated dynamically --></div>
		<div id="tab_batchselectimage" class="tab_batchselectholder"><!-- Populated dynamically --></div>
		<div id="tab_batchselectaudio" class="tab_batchselectholder"><!-- Populated dynamically --></div>
		<div id="tab_batchselectvideo" class="tab_batchselectholder"><!-- Populated dynamically --></div>

		<div id="contactstable" class="recordstable recordstable_media">
			<div id="ct_rowbox" class="rt_rowbox" batchnumber="0">
				<div id="data_videos_list">
					<div style="height:50px;padding:50px;font-size:24px;text-align:center;color:#CCC">
						<img src="img/working.gif" />
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="dialog_messages hidden">
		<!-- Dialog messages for Videos view -->

		<!-- Confirm delete messages -->
		<div id="msg_confirm_delete_video">Are you sure you want to delete this video?</div>
		<div id="msg_confirm_delete_videos">Are you sure you want to delete these videos?</div>

		<!-- Error messages -->
		<div id="msg_error_no_video_selected">Please choose some videos.</div>
	</div>
</script>

<script type="text/template" id="videos_list_template" class="template">
	<div class="rt_rowmedia rt_rowlighter" id="ct_row_<%= id %>" uid="<%= id %>">
		<div class="rt_columnmedia">
			<div class="buttoncontainer">
				<div class="btn_playvideo report_event" id="view_video_hover_btn" uid="<%= id %>"></div>
				<div class="btn_addtophone hidden report_event" id="video_addtophone_btn" uid="<%= id %>"></div>
				<div class="btn_removefromphone hidden report_event" id="video_removefromphone_btn" uid="<%= id %>"></div>
				<div class="btn_downloadvideo report_event" id="video_download_btn" uid="<%= id %>"></div>
				<div class="btn_deletevideo report_event" id="video_delete_btn" uid="<%= id %>"></div>
			</div>
			<img align="center" border="0" src="<%= thumbnailUrl %>">
		</div>

		<div class="rt_checkRow">
			<input class="rt_rowcheckbox" uid="<%= id %>" style="z-index: 2" type="checkbox">
		</div>

		<div class="rt_endpointsync">
			<div class="rt_endpointsync_text hidden on_phone">On Phone</div>
			<div class="rt_endpointsync_text hidden added_next_sync">Added At Next Sync</div>
			<div class="rt_endpointsync_text hidden removed_next_sync">Removed At Next Sync</div>
			<div class="rt_endpointsync_text hidden web_only">Web Only</div>
		</div>
	</div>
</script>

<script type="text/template" id="location_settings_summary_template" class="template">
    <div class="locationSyncDetails">
		<% if (locationEnabled) { %>
			<div class="content">
				<div>On: <% if (frequencyMinutes == 1) { %>Every Hour<% } else { %>Every <%=frequencyMinutes%> Hours<% } %><% if(isiOS) { %><br/>While battery > <%=batteryLevelThreshold%>%<% } %></div>
			</div>
		<% } else { %>
			<div class="content"><div>Location Check is turned off.</div></div>
		<% } %>
    </div>
</script>
<script type="text/template" id="settings_summary_template" class="template">
    <div class="syncdetails">
	<%if(AMA.Util.isAndroid()){%>
        <div class="content android">
        	<div class="androidBackupData">Backup:
        		<span class="<%=backupData['syncContacts']%>">Contacts</span>
        		<span class="<%=backupData['syncPhotos']%>">Photos</span> &
        		<span class="<%=backupData['syncVideos']%>">Videos</span>
        	</div>
        	<div class="<%=frequency['NEVER']%>">No schedule set.</div>
        	<div class="<%=frequency['DAILY']%>">Every day at a random time.</div>
        	<div class="<%=frequency['WEEKLY']%>">Every
        		<span class="<%=day['MONDAY']%>">Monday</span>
       			<span class="<%=day['TUESDAY']%>">Tuesday</span>
        		<span class="<%=day['WEDNESDAY']%>">Wednesday</span>
        		<span class="<%=day['THURSDAY']%>">Thursday</span>
        		<span class="<%=day['FRIDAY']%>">Friday</span>
        		<span class="<%=day['SATURDAY']%>">Saturday</span>
        		<span class="<%=day['SUNDAY']%>">Sunday</span>
        	 	at a random time.
        	</div>
        	<div>While battery: &gt;<%=batteryLevelThreshold%>%</div>
        	<div>When Connected Via:
        		<span class="<%=backupConnection['MobileData']%>">Mobile Network</span>
        		<span class="<%=backupConnection['Wifi']%>">Wi-Fi<span>
	        </div>
        </div>
	
		<%}else if(AMA.Util.isIPhone()){%>
        <div class="content ios">
        	<div class="iosBackupData">Backup:
        		<span class="<%=backupData['syncContacts']%>">Contacts</span>
        		<span class="<%=backupData['syncPhotos']%>">Photos</span>
        		<span class="<%=backupData['syncVideos']%>">Videos</span>
        	</div>
            <div> Backup Alerts:
                <div class="<%=frequency['NEVER']%>">No schedule set.</div>
                <div class="<%=frequency['DAILY']%>">Every day at a random time.</div>
                <span class="<%=frequency['WEEKLY']%>">Every
                    <span class="<%=day['MONDAY']%>">Monday</span>
                    <span class="<%=day['TUESDAY']%>">Tuesday</span>
                    <span class="<%=day['WEDNESDAY']%>">Wednesday</span>
                    <span class="<%=day['THURSDAY']%>">Thursday</span>
                    <span class="<%=day['FRIDAY']%>">Friday</span>
                    <span class="<%=day['SATURDAY']%>">Saturday</span>
                    <span class="<%=day['SUNDAY']%>">Sunday</span>
                </span>
            </div>
        </div>
        <%}%>
    </div>
</script>

<script type="text/template" id="data_trash_template" class="template">
	<div id="records_consolehalf">
		<div class="console" id="data_trash_management">
			<div class="mc_title">Manage Trash</div>
			<div class="mc_links">
				<a class="mc_link report_event" href="javascript:;" id="data_trash_emptytrash">Empty Trash</a>
			</div>
		</div>
	</div>

	<div class="records_lefthalf" id="records_tablehalf">
		<div id="commands_searchplace"><!-- IERT --></div>
		<div id="data_trash_searchbar">
			<input id="commands_searchinput" class="searchinput" placeholder="Search" tabindex="1" type="text">
		</div>
		<div class="tab_batchselectholder" id="selecttrash">
			<span>Filter By:</span>
			<select class="rt_batchselect" id="trashtype">
				<option value="all">All Items</option>
				<option value="contact">Contacts</option>
				<option value="image">Photos</option>
				<!-- <option value="audio">Audio</option> -->
				<option value="video">Videos</option>
			</select>
		</div>
		<div class="actionbar">
			<span class="actiontext">Action:</span>
			<select class="multiactionselect" id="data_trash_multiaction_select">
				<option value="">Select One</option>
				<option value="restore">Restore Items</option>
				<option value="purge">Permanently Delete Items</option>
			</select>
			<span class="btn_perform btn btn_small" id="data_trash_multiaction_perform">Perform</span>
		</div>
		<div class="selectbar">
			<span class="selectall">
				<input id="data_trash_selectall"type="checkbox">
				<label for="data_trash_selectall">Select All</label>
			</span>
			<span id="ct_batchselect">View:&nbsp;&nbsp;
				<select class="rt_batchselect" id="data_trash_pageselector"></select>
			</span>
		</div>
		<div class="recordstable">
			<div class="rt_rowbox" id="ct_rowbox">
				<div id="data_trash_list">
					<div style="height:120px;padding:120px;font-size:24px;text-align:center;color:#CCC">
						<img src="img/working.gif" />
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="records_middlehalf" id="records_detailshalf" style="display: block">
		<div class="details_outer" id="contactdetailsbox" style="display: block">
			<div id="trash_details_view"></div>
		</div>
	</div>

	<div class="dialog_messages hidden">
		<!-- Dialog messages for Trash view -->

		<!-- Empty trash -->
		<div id="msg_confirm_empty_trash">Are you sure you want to empty the trash?</div>
		<div id="msg_empty_trash_no_items">There are no items to be deleted.</div>

		<!-- Confirm restore -->
		<div id="msg_confirm_restore_trashitem">Are you sure you want to restore the selected item?</div>
		<div id="msg_confirm_restore_trashitems">Are you sure you want to restore the selected items?</div>

		<!-- Confirm permanent delete -->
		<div id="msg_confirm_permadelete_trashitem">Are you sure that you want to permanently delete the selected item?</div>
		<div id="msg_confirm_permadelete_trashitems">Are you sure that you want to permanently delete the selected items?</div>

		<!-- Error messages -->
		<div id="msg_error_no_trashitems_selected">Please choose some items.</div>
	</div>
</script>

<script type="text/template" id="trash_details_template" class="template">
	<div id="trash_details_contact"></div>
	<div id="trash_details_image"></div>
	<div id="trash_details_video"></div>
</script>

<script type="text/template" id="photo_details_template" class="template">
	<div class="details_image">
		<div class="details_filepicture">
    		<img border="0" align="middle" src="<%=imgSrc%>">
    	</div><br>

    	<div class="filename">
     	   	Filename:
			<span class="details_filename"><%=fileName%></span>
   		</div><br>

    	<div class="details_buttonholder" style="">
        	<ul>
            	<li class="details_viewfullsizebutton details_button standard_button report_event" id="view_photo_btn" uid="<%=id%>"><span class="oneline"  id="view_photo_btn">View Full Size</span></li>
            	<li class="details_undeletebutton details_button standard_button report_event" id="restore_photo_btn" uid="<%=id%>"><span class="oneline" id="restore_photo_btn">Restore Photo</span></li>
            	<li class="details_deletefromtrashbutton details_button standard_button report_event" id="delete_photo_btn" uid="<%=id%>"><span class="oneline" id="delete_photo_btn">Permanently Delete Photo</span></li>
     		</ul>
    	</div><br>
    	<br>

    	<div class="details_metadata">
        	<div class="details_ownerholder" style="display: none;">
            	Owned By
        	</div>Syncing with: <span class="details_syncinfo synctext">- Not currently on phone</span><br>
        	Added to: <span class="details_sharedshareinfo">0</span>&nbsp;albums<br>
        	<a class="details_downloadlink standard_link" href="<%=link%>" style="text-decoration: underline;" target="_blank">Download</a>
    	</div><br>
	</div>
</script>
<script type="text/template" id="video_details_template" class="template">
	<div class="details_video">
        <div class="details_indented">
            <br>
            <div style="text-align: center;">
                <div class="details_qtvideo">
                    <img border='0' align='middle' src="<%=videoURL%>"/>
                </div><br>

                <div class="filename">
                    Filename:
				    <span class="details_filename"><%=fileName%></span>
                </div>
            </div>
        </div>

        <div class="details_buttonholder" style="">
			<ul>
                <li class="details_viewfullsizebutton details_button standard_button report_event" id="play_video_btn" uid="<%=id%>"><span class="oneline" id="play_video_btn">Play Video</span></li>
                <li class="details_undeletebutton details_button standard_button report_event" id="restore_video_btn" uid="<%=id%>"><span class="oneline" id="restore_video_btn">Restore Video</span></li>
                <li class="details_deletefromtrashbutton details_button standard_button report_event" id="delete_video_btn" uid="<%=id%>"><span class="oneline" id="delete_video_btn">Permanently Delete Video</span></li>
            </ul>
        </div><br>

        <div class="details_indented details_metadata">
            <div class="details_ownerholder" style="display: none;">
                Owned By
            </div>Syncing with: <span class="details_syncinfo synctext">- Not currently on phone</span><br>
            Added to: <span class="details_sharedshareinfo">0</span>&nbsp;playlists<br>
            <a class="details_downloadlink standard_link" href="<%=link%>" style="text-decoration: underline;" target="_blank">Download</a>
        </div>
	</div>
</script>

<script  type="text/template" class="template" id="contact_add-edit_template">
    <form id="contactEditor" method="post" action="">
        <% if (typeof(id) !== "undefined") { %>
            <input type="hidden" value="<%=status%>" name="status"/>
            <input type="hidden" value="<%=id%>"  name="id"/>
            <input type="hidden" value="<%=pendingDelete%>" name="pendingDelete"/>
            <input type="hidden" value="<%=pendingCreate%>" name="pendingCreate"/>
        <% } %>
        <div class="windowb" style="display: block;">
            <div class="windowbinner" id="editpaneinner">
                <div id="ep_note">
                    Fields colored gray are not supported on your phone and will not be saved to your phone. These fields can be saved and edited on the website.
                </div>
                <table>
                    <tbody>
                        <tr>
                            <td>
                            <div class="ep_column" id="ep_column1">
                                <div style="padding-left: 10px;" class="relativebuffer">

                                    <div class="ep_fieldblock">

                                        <!-- Names -->
                                        <div class="ep_title">
                                            Name:
                                        </div>
                                        <div class="ep_row">
                                            <input type="text" maxlength="2048" value="<%=fullName%>" data-name="07-01" name="fullName" class="ep_textinput" id="ep_name">
                                        </div>

                                        <div class="ep_title">
                                            Prefix:
                                        </div>
                                        <div class="ep_row">
                                            <input type="text" maxlength="2048" value="<%=prefix%>" data-name="0F-01" name="prefix" class="ep_textinput ep_nameinput ep_unsupported" id="ep_prefix">
                                        </div>
                                        <div class="ep_title">
                                            First:
                                        </div>
                                        <div class="ep_row">
                                            <input type="text" maxlength="2048" value="<%=firstName%>" data-name="08-01" name="firstName" class="ep_textinput ep_nameinput" id="ep_firstName">
                                        </div>
                                        <div class="ep_title">
                                            Middle:
                                        </div>
                                        <div class="ep_row">
                                            <input type="text" maxlength="2048" value="<%=middleName%>" data-name="09-01" name="middleName" class="ep_textinput ep_nameinput" id="ep_middleName">
                                        </div>
                                        <div class="ep_title">
                                            Last:
                                        </div>
                                        <div class="ep_row">
                                            <input type="text" maxlength="2048" value="<%=lastName%>" data-name="0A-01" name="lastName" class="ep_textinput ep_nameinput" id="ep_lastName">
                                        </div>
                                        <div class="ep_title">
                                            Suffix:
                                        </div>
                                        <div class="ep_row">
                                            <input type="text" maxlength="2048" value="<%=suffix%>" data-name="0G-01" name="suffix" class="ep_textinput ep_nameinput ep_unsupported" id="ep_suffix">
                                        </div>

                                        <div class="ep_title">
                                            Nickname:
                                        </div>
                                        <div class="ep_row">
                                            <input type="text" maxlength="2048" value="<%=nickName%>" data-name="0E-01" name="nickName" class="ep_textinput" id="ep_nickName">
                                        </div>
										<!--div class="ep_title">
                                            Relationship:
                                        </div>
                                        <div class="ep_row">
                                            <input type="text" maxlength="2048" value="<%=relationship%>" data-name="16-07" name="relationship" class="ep_textinput" id="ep_nickName">
                                        </div-->
                                        <div id="ep_pictureholder">
                                            <img width="60" height="66" border="0" src="<%=thumbImg%>" id="ep_picture_default">
                                            <img width="60" height="66" border="0" style="display: none;" id="ep_picture" onload="EditPane.showPictureOnload()" src="">

                                        </div>

                                        <div class="ep_title">
                                            Birthday:
                                        </div>
                                        <div id="ep_birthdayHolder" class="ep_fieldtable ep_row">
                                            <input type="text" value="<%=birthday%>" data-value="<%=birthdayValue%>" data-name="0i-01" name="birthday" class="ep_textinput ep_dateinput" readonly="readonly" id="ep_birthday">
                                            <!-- img class="ui-datepicker-trigger" src="img/calendar.gif" alt="..." title="..." -->
                                            <img class="ui-datepicker-trigger" title="Remove this date" src="img/redX.png" id="clearBirthdayId">
                                        </div>

                                        <div class="ep_title">
                                            Anniversary:
                                        </div>
                                        <div style="margin-bottom: 35px" id="ep_anniversaryHolder" class="ep_fieldtable ep_row">
                                            <input type="text" value="<%=anniversary%>" data-value="<%=anniversaryValue%>" data-name="0j-01" name="anniversary" class="ep_textinput ep_dateinput ep_unsupported" readonly="readonly" id="ep_anniversary">
                                            <!-- img class="ui-datepicker-trigger" src="img/calendar.gif" alt="..." title="..." -->
                                            <img class="ui-datepicker-trigger" title="Remove this date" src="img/redX.png" id="clearAnniversaryId">
                                        </div>

                                    </div><!-- ep_fieldblock -->

                                    <div class="ep_fieldblock contactnumbers">
                                        <div style="margin-bottom: 10px" class="ep_title">
                                            Contact Numbers:
                                        </div>
                                        <table class="ep_fieldtable">
                                            <tbody id="ep_phoneNumbers">
                                                <!-- Populated dynamically -->
                                                <%=allMobilePhone.html%>
                                                <tr class="<%=allMobilePhone.hide%>">
                                                    <td class="ep_contactfieldtitletd">Mobile  1:</td><td colspan="2" class="left">
                                                    <input value="<%=mobilePhone1%>" data-name="0e-04" name="mobilePhone" type="text" class="ep_textinput ep_phoneinput" maxlength="512">
                                                    </td>
                                                </tr>
                                                <tr class="<%=allMobilePhone.hide%>">
                                                    <td class="ep_contactfieldtitletd">Mobile  2:</td><td colspan="2" class="left">
                                                    <input value="<%=mobilePhone2%>" data-name="0e-04" name="mobilePhone" type="text" class="ep_textinput ep_phoneinput" maxlength="512">
                                                    </td>
                                                </tr>
                                                <tr class="<%=allMobilePhone.hide%>">
                                                    <td class="ep_contactfieldtitletd">Mobile  3:</td><td colspan="2" class="left">
                                                    <input value="<%=mobilePhone3%>" data-name="0e-04" name="mobilePhone" type="text" class="ep_textinput ep_phoneinput" maxlength="512">
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <table class="ep_fieldtable">
                                            <tbody id="ep_workNumber">
                                                <%=allWorkPhone.html%>
                                                <!-- Populated dynamically -->
                                                <tr class="<%=allWorkPhone.hide%>">
                                                    <td class="ep_contactfieldtitletd">Work  1:</td><td colspan="2" class="left">
                                                    <input value="<%=workPhone1%>" data-name="0e-03" name="workPhone" name="" type="text" class="ep_textinput ep_phoneinput" maxlength="512">
                                                    </td>
                                                </tr>
                                                <tr class="<%=allWorkPhone.hide%>">
                                                    <td class="ep_contactfieldtitletd">Work  2:</td><td colspan="2" class="left">
                                                    <input value="<%=workPhone2%>" data-name="0e-03" name="workPhone" type="text" class="ep_textinput ep_phoneinput" maxlength="512">
                                                    </td>
                                                </tr>
                                                <tr class="<%=allWorkPhone.hide%>">
                                                    <td class="ep_contactfieldtitletd">Work  3:</td><td colspan="2" class="left">
                                                    <input value="<%=workPhone3%>" data-name="0e-03" name="workPhone" type="text" class="ep_textinput ep_phoneinput" maxlength="512">
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <table class="ep_fieldtable">
                                            <tbody id="ep_homePhoneNumber">
                                            <%=allHomePhone.html%>
                                                <!-- Populated dynamically -->
                                            </tbody>
                                        </table>
                                        <table class="ep_fieldtable">
                                            <tbody id="ep_faxNumber">
                                                <!-- Populated dynamically -->
                                                <%=allfax.html%>
                                                <%=allHomeFax.html%>
                                                <%=allWorkFax.html%>
                                                <!-- Populated dynamically -->
                                            </tbody>
                                        </table>
                                        <table class="ep_fieldtable">
                                            <tbody id="ep_pagerNumber">
                                                <!-- Populated dynamically -->
                                                <%=allPager.html%>
                                                <!-- Populated dynamically -->
                                            </tbody>
                                        </table>
                                        <table class="ep_fieldtable">
                                            <tbody id="ep_otherNumber">
                                                <!-- Populated dynamically -->
                                                <%=allOtherPhone.html%>
                                                <%=allCarPhone.html%>
                                                <%=allRadioPhone.html%>
                                                <%=allLocalPhone.html%>
                                                <%=allAssistantPhone.html%>
                                                <%=alliPhone.html%>
                                                <!-- Populated dynamically -->
                                            </tbody>
                                        </table>
                                    </div><!-- ep_fieldblock -->
                                </div><!-- relativebuffer -->
                            </div><!-- end col 1 --></td>
                            <td>
                            <div class="ep_column" id="ep_column2">
                                <div class="relativebuffer">

                                    <div class="ep_fieldblock">
                                        <div class="ep_title">
                                            Home Address:
                                        </div>
                                        <table width="100%" cellspacing="0" cellpadding="0" border="0" id="ep_homeAddress">
                                            <tbody>
                                                <tr>
                                                    <td valign="top" height="25" colspan="2">
                                                    <input type="text" value="<%=homeStreet%>" data-name="0J-02" name="homeStreet" maxlength="2048" placeholder=" Street 1" class="ep_textinput inputplaceholdertext" id="ep_homeAddressStreet">
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td valign="top" height="25" colspan="2">
                                                    <input type="text" value="<%=homeStreetExtra%>" data-name="0K-02" name="homeStreetExtra" maxlength="2048" placeholder=" Street 2" class="ep_textinput inputplaceholdertext" id="ep_homeAddressStreet2">
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td valign="top" height="25" colspan="2">
                                                    <input type="text" value="<%=homeNeighborhood%>" data-name="0Q-02" name="homeNeighborhood" maxlength="2048" placeholder=" Neighborhood" class="ep_textinput inputplaceholdertext" id="ep_homeAddressNeighborhood">
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td valign="top" height="25" colspan="2">
                                                    <input type="text" value="<%=homeCity%>" data-name="0L-02" name="homeCity" maxlength="2048" placeholder=" City" class="ep_textinput inputplaceholdertext" id="ep_homeAddressCity">
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td valign="top" height="25">
                                                    <input type="text" value="<%=homeState%>" data-name="0M-02" name="homeState" maxlength="2048" placeholder=" State" class="ep_textinput ep_stateinput inputplaceholdertext" id="ep_homeAddressState">
                                                    &nbsp;
                                                    <input type="text" value="<%=homeZipCode%>" data-name="0P-02" name="homeZipCode" maxlength="2048" placeholder=" Zip Code" class="ep_textinput ep_zipinput inputplaceholdertext" id="ep_homeAddressZip">
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td valign="top" height="25" colspan="2">
                                                    <input type="text" value="<%=homeCountry%>" data-name="0N-02" name="homeCountry" maxlength="2048" placeholder=" Country" class="ep_textinput inputplaceholdertext" id="ep_homeAddressCountry">
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div><!-- ep_fieldblock -->

                                    <div class="ep_fieldblock">
                                        <div class="ep_title">
                                            Formatted Home Address:
                                        </div>
                                        <div class="ep_row">
                                            <input type="text" value="<%=formattedHomeAddress%>" data-name="0Y-02" name="formattedHomeAddress" maxlength="2048" placeholder="Street1 Street2 Neighborhood City State ZipCode Country" class="ep_textinput inputplaceholdertext ep_unsupported" id="ep_homeAddressFormatted" readonly="readonly">
                                        </div>
                                    </div><!-- ep_fieldblock -->

                                    <div class="ep_fieldblock">
                                        <div class="ep_title">
                                            Work Address:
                                        </div>

                                        <table width="100%" cellspacing="0" cellpadding="0" border="0" id="ep_workAddress">
                                            <tbody>
                                                <tr>
                                                    <td valign="top" height="25" colspan="2">
                                                    <input type="text" value="<%=workStreet%>" data-name="0J-03" name="workStreet" maxlength="2048" placeholder=" Street 1" class="ep_textinput inputplaceholdertext" id="ep_workAddressStreet">
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td valign="top" height="25" colspan="2">
                                                    <input type="text" value="<%=workStreetExtra%>" data-name="0K-03" name="workStreetExtra" maxlength="2048" placeholder=" Street 2" class="ep_textinput inputplaceholdertext" id="ep_workAddressStreet2">
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td valign="top" height="25" colspan="2">
                                                    <input type="text" value="<%=workNeighborhood%>" data-name="0Q-03" name="workNeighborhood" maxlength="2048" placeholder=" Neighborhood" class="ep_textinput inputplaceholdertext" id="ep_workAddressNeighborhood">
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td valign="top" height="25" colspan="2">
                                                    <input type="text" value="<%=workCity%>" data-name="0L-03" name="workCity" maxlength="2048" placeholder=" City" class="ep_textinput inputplaceholdertext" id="ep_workAddressCity">
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td valign="top" height="25" colspan="2">
                                                    <input type="text" value="<%=workState%>" data-name="0M-03" name="workState" maxlength="2048" placeholder=" State" class="ep_textinput ep_stateinput inputplaceholdertext" id="ep_workAddressState">
                                                    &nbsp;
                                                    <input type="text" value="<%=workZipCode%>" data-name="0P-03" name="workZipCode" maxlength="2048" placeholder=" Zip Code" class="ep_textinput ep_zipinput inputplaceholdertext" id="ep_workAddressZip">
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td valign="top" height="25" colspan="2">
                                                    <input type="text" value="<%=workCountry%>" data-name="0N-03" name="workCountry" maxlength="2048" placeholder=" Country" class="ep_textinput inputplaceholdertext" id="ep_workAddressCountry">
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div><!-- ep_fieldblock -->

                                    <div class="ep_fieldblock">
                                        <div class="ep_title">
                                            Formatted Work Address:
                                        </div>
                                        <div class="ep_row">
                                            <input type="text" value="<%=formattedWorkAddress%>" data-name="0Y-03" name="formattedWorkAddress" maxlength="2048" placeholder="Street1 Street2 Neighborhood City State ZipCode Country" class="ep_textinput inputplaceholdertext ep_unsupported" id="ep_workAddressFormatted" readonly="readonly">
                                        </div>
                                    </div><!-- ep_fieldblock -->

                                    <div class="ep_fieldblock">
                                        <div class="ep_title">
                                            Notes:
                                        </div>
                                        <div class="ep_row">
                                            <textarea data-name="0n-01" name="notes" class="ep_textinput ep_textareaInput" id="ep_notes"><%=notes%></textarea>
                                        </div>
                                    </div><!-- ep_fieldblock -->

                                </div><!-- relativebuffer -->
                            </div><!-- end col 2 --></td>
                            <td>
                            <div class="ep_column" id="ep_column3">
                                <div class="ep_fieldblock">
                                    <div class="ep_title">
                                        Email:
                                    </div>
                                    <table class="ep_fieldtable">
                                        <tbody id="ep_emails">
                                            <!-- Populated dynamically -->
                                            <%=allEmails%>
                                        </tbody>
                                    </table>
                                </div><!-- ep_fieldblock -->

                                <div class="ep_fieldblock">
                                    <div class="ep_title">
                                        IM:
                                    </div>
                                    <table class="ep_fieldtable">
                                        <tbody id="ep_ims">
                                            <%=allIm%>
                                            <!-- Populated dynamically -->
                                        </tbody>
                                    </table>
                                </div><!-- ep_fieldblock -->

                                <div class="ep_fieldblock">
                                    <div class="ep_title">
                                        Website URL:
                                    </div>
                                    <table class="ep_fieldtable">
                                        <tbody id="ep_urls">
                                            <!-- Populated dynamically -->
                                            <%=allUrl%>
                                        </tbody>
                                    </table>
                                </div><!-- ep_fieldblock -->

                                <div class="ep_fieldblock">
                                    <div class="ep_title">
                                        Organization Name:
                                    </div>
                                    <table class="ep_fieldtable">
                                        <tbody id="ep_organization">
                                            <!-- Populated dynamically -->
                                            <tr>
                                                <td>
                                                <input value="<%=companyName%>" data-name="0H-01" name="companyName" type="text" maxlength="2048" class="ep_textinput ep_longinput">
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div class="ep_title">
                                        Department:
                                    </div>
                                    <table class="ep_fieldtable">
                                        <tbody id="ep_department">
                                            <!-- Populated dynamically -->
                                            <tr>
                                                <td>
                                                <input value="<%=department%>" data-name="0b-01" name="department" type="text" maxlength="2048" class="ep_textinput ep_longinput">
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div class="ep_title">
                                        Position:
                                    </div>
                                    <table class="ep_fieldtable">
                                        <tbody id="ep_jobtitle">
                                            <!-- Populated dynamically -->
                                            <tr>
                                                <td>
                                                <input value="<%=position%>" data-name="0I-01" name="position" type="text" maxlength="2048" class="ep_textinput ep_longinput">
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div><!-- ep_fieldblock -->

                                <div class="relativebuffer">
                                    <div id="ep_supportedbar">
                                        <div id="ep_supportedkey">
                                            <span class="ep_supportedtext"></span>
                                            <br>
                                            <div id="ep_supportedkeyboxes">
                                                <!-- Populated with checkboxes for the endpoints -->
                                            </div>
                                        </div>
                                    </div>
                                    <br>
                                    <div id="ep_endpointselectwithtitle">
                                        Automatically Sync with Phone:
                                        <div id="ep_endpointselect">
                                            <input type="checkbox" id="ep_endpointselect_input_0" checked="checked" name="pendingCreate" endpointid="0">
											<label for="ep_endpointselect_input_0"><%if(endpointName==""){%>Unknown Device<%}else{%><%=endpointName%><%}%></label>										
                                            <br>
                                        </div>
                                    </div>
                                    <br>

                                </div>
                            </div></td>
                        </tr>
                    </tbody>
                </table>

                <div style="display: none;" id="ep_hidden">

                </div>

                <div id="header_title" class="pane_floatingbuttons">		
                    <h3><% if (typeof id === "undefined") {%>Add Contact/s<%} else {%>Edit Contact<%}%></h3>
                    <ul>
						<% if (typeof id === "undefined") {%>
							<li class="rs_save" id="add_contact_save_btn">Save</li>
							<li class="rs_save_next" id="save_next">Save and add another</li>						
						<%} else {%>
							<li class="rs_saveEdit" id="edit_contact_save_btn">Edit</li>						
						<%}%>
                        <li class="rs_cancel" id="add_edit_contact_cancel_btn">Cancel</li>
                    </ul>
                </div>

            </div>

            <div style="text-align: left;" id="ep_debugRecordOutput"></div>

        </div>
    </form>
</script>

<script type="text/template" id="im_template" class="template">
<tr>
    <td>
        <input value="<%=value%>" data-name="0o-01" name="<%=key%>" type="text" maxlength="2048" class="ep_textinput ep_longinput">
    </td>
</tr>
</script>
<script type="text/template" id="email_template" class="template">
    <tr>
        <td>
            <input value="<%=value%>" data-name="0c-01" name="<%=key%>" type="text" maxlength="2048" class="ep_textinput ep_longinput">
        </td>
    </tr>
</script>
<script type="text/template" id="mobilePhone_template" class="template">
    <tr>
        <td class="ep_contactfieldtitletd">Mobile  <%=index%>:</td><td colspan="2" class="left">
        <input value="<%=value%>" data-name="0e-04" name="mobilePhone" type="text" class="ep_textinput ep_phoneinput" maxlength="512">
    </td>
    </tr>
</script>
<script type="text/template" id="workPhone_template" class="template">
    <tr>
        <td class="ep_contactfieldtitletd">Work  <%=index%>:</td><td colspan="2" class="left">
        <input value="<%=value%>" data-name="0e-04" name="workPhone" type="text" class="ep_textinput ep_phoneinput" maxlength="512">
    </td>
    </tr>
</script>
<script type="text/template" id="homePhone_template" class="template">
    <tr>
        <td class="ep_contactfieldtitletd">Home  <%=index%>:</td><td colspan="2" class="left">
        <input value="<%=value%>" data-name="0e-04" name="homePhone" type="text" class="ep_textinput ep_phoneinput" maxlength="512">
    </td>
    </tr>
</script>
<script type="text/template" id="fax_template" class="template">
    <tr>
        <td class="ep_contactfieldtitletd">Fax  <%=index%>:</td><td colspan="2" class="left">
        <input value="<%=value%>" data-name="0e-04" name="fax" type="text" class="ep_textinput ep_phoneinput" maxlength="512">
    </td>
    </tr>
</script>
<script type="text/template" id="homeFax_template" class="template">
    <tr>
        <td class="ep_contactfieldtitletd">Home Fax  <%=index%>:</td><td colspan="2" class="left">
        <input value="<%=value%>" data-name="0e-04" name="homeFax" type="text" class="ep_textinput ep_phoneinput" maxlength="512">
    </td>
    </tr>
</script>
<script type="text/template" id="workFax_template" class="template">
    <tr>
        <td class="ep_contactfieldtitletd">Work Fax  <%=index%>:</td><td colspan="2" class="left">
        <input value="<%=value%>" data-name="0e-04" name="workFax" type="text" class="ep_textinput ep_phoneinput" maxlength="512">
    </td>
    </tr>
</script>
<script type="text/template" id="url_template" class="template">
    <tr>
        <td>
            <input value="<%=value%>" data-name="0Z-01" name="webSiteUrl" type="text" maxlength="2048" class="ep_textinput ep_longinput">
        </td>
    </tr>
</script>
<script type="text/template" id="pager_template" class="template">
    <tr>
        <td class="ep_contactfieldtitletd">Pager  <%=index%>:</td><td colspan="2" class="left">
        <input value="<%=value%>" data-name="0e-04" name="pager" type="text" class="ep_textinput ep_phoneinput" maxlength="512">
    </td>
    </tr>
</script>
<script type="text/template" id="otherPhone_template" class="template">
    <tr>
        <td class="ep_contactfieldtitletd">Other  <%=index%>:</td><td colspan="2" class="left">
        <input value="<%=value%>" data-name="0e-04" name="otherPhone" type="text" class="ep_textinput ep_phoneinput" maxlength="512">
    </td>
    </tr>
</script>
<script type="text/template" id="carPhone_template" class="template">
    <tr>
        <td class="ep_contactfieldtitletd">Car  <%=index%>:</td><td colspan="2" class="left">
        <input value="<%=value%>" data-name="0e-04" name="carPhone" type="text" class="ep_textinput ep_phoneinput" maxlength="512">
    </td>
    </tr>
</script>
<script type="text/template" id="radioPhone_template" class="template">
    <tr>
        <td class="ep_contactfieldtitletd">Radio  <%=index%>:</td><td colspan="2" class="left">
        <input value="<%=value%>" data-name="0e-04" name="radioPhone" type="text" class="ep_textinput ep_phoneinput" maxlength="512">
    </td>
    </tr>
</script>
<script type="text/template" id="localPhone_template" class="template">
    <tr>
        <td class="ep_contactfieldtitletd">Local  <%=index%>:</td><td colspan="2" class="left">
        <input value="<%=value%>" data-name="0e-04" name="localPhone" type="text" class="ep_textinput ep_phoneinput" maxlength="512">
    </td>
    </tr>
</script>
<script type="text/template" id="assistantPhone_template" class="template">
    <tr>
        <td class="ep_contactfieldtitletd">Assistant  <%=index%>:</td><td colspan="2" class="left">
        <input value="<%=value%>" data-name="0e-04" name="assistantPhone" type="text" class="ep_textinput ep_phoneinput" maxlength="512">
    </td>
    </tr>
</script>
<script type="text/template" id="iPhone_template" class="template">
    <tr>
        <td class="ep_contactfieldtitletd">iPhone  <%=index%>:</td><td colspan="2" class="left">
        <input value="<%=value%>" data-name="0e-04" name="iPhone" type="text" class="ep_textinput ep_phoneinput" maxlength="512">
    </td>
    </tr>
</script>





<script type="text/template" id="contacts_import_template" class="template">
<div id="importpane" class="windowb" style="display:block;">
    <div id="ip_inner" class="windowbinner">
        <div class="clear"><div>
        <div id="header_title" class="maintitle pane_floatingbuttons">
            <span id="header_titletext">Import Contacts</span>
            <div class="pane_floatingbuttons pane_middlebuttons">
                <ul>
                    <li id="cancel_import" class="rs_cancel">Cancel</li>
                    <li id="save_selective_import" class="rs_save">Save</li>
                    <li id="cancel_selective_import" class="rs_cancel">Cancel</li>
            </ul>
            </div>
        </div>
        <div id="ip_failures"></div>

        <div id="import_source_dropdown" class="import_contactfile" style="padding-left: 250px;">
            Import Contacts From:
            <select id="ip_providerselect">
                <option value="ip_outlook_instructions">Microsoft Outlook&reg; Contacts</option>
                <option value="ip_outlook_express_instructions">Microsoft Outlook Express&reg; Contacts</option>
                <option value="ip_gmail_instructions">Gmail&reg; Contacts</option>
                <option value="ip_yahoo_instructions">Yahoo!&reg; Contacts</option>
                <option value="ip_other_instructions">Other</option>
            </select>
        </div>

        <div id="methodbox" class="import_contactfile" style="padding-left:294px;">
            Type of Import:
            <select id="ip_methodselect" style="width: 245px;">
                <option value="ip_gmail_instructions">Select One...</option>
                <option value="ip_gmail_fast_instructions">Fast Import</option>
                <option value="ip_gmail_detailed_instructions">Detailed Import</option>
            </select>
        </div>

        <div id="ip_fast_method" style="display: none;">
            <form name="gmail_fastimport" id="gmail_fastimport" method="POST">
                <div class="CI_input">
                    <div id="gid_keyword" style="height: 35px;padding-left:330px;">
                        <div style="padding-top:2px;float:left;">Gmail id:</div>
                        <div style="padding-left:16px;float:left;">
                            <input size="28" type="text" id="username" name="username" />
                        </div>
                        <div style="padding-left:13px;padding-top:2px;float:left;color:#cccccc;">
                            ( Example: username@gmail.com )
                        </div>
                    </div>

                    <div id="gps_keyword" style="height: 35px;padding-left:320px;">
                        <div style="padding-top:2px;float:left;">Password:</div>
                        <div style="padding-left:16px;float:left;">
                            <input size="28" type="password" id="password" name="password" />
                        </div>
                    </div>
                </div>
                <div id="CI_button">
                    <input id="ip_importgmail_button" type="button" value="Import Gmail Contacts" />
                </div>
            </form>
        </div>

        <div id="uploadbox" display="display: block;">
            <form name="import_form" enctype="multipart/form-data" action="" method="post" id="import_form" target="hiddenUploadResponse">
                <div id="ip_filebrowserholder">Select a CSV file for import:
                    <input type="file" name="upload_file" id="ip_upload_file" />
                </div>
                <input id="ip_loadbutton" type="button" value="Select Which Contacts To Import" showtype="inline" />
                <input id="ip_importall_button" type="submit" value="Import All Contacts" showtype="inline" /><br />
            </form>
        </div>

        <div id="recordshifterpane">
            <div class="rs_column rs_leftcolumn">
                <input type="text" id="import_contacts_searchbar" tabindex="1" value="Search" class="commands_searchfaded">
                <br /><br />
                <div class="whole_rs_description">
                    <div class="rs_ins">Instructions</div>
                    <div id="rs_description" class="rs_description">
                        Use the arrow buttons to move contacts into the list of those that will be imported.
                    </div>
                </div>
            </div>

            <div class="rs_column rs_lefttablecolumn">
                <div class="rs_sidetitlebox">
                    <div id="rs_recordsintitle">Contacts NOT to Import</div>
                </div>
                <div class="rs_selectallwrapperleft">
                    <div class="rs_selectallleft"></div>
                </div>
                <div id="import_contacts_not_list" class="rsboth_rowboxes rt_rowbox"></div>
                <div class="selectbar">
                    <span class="batchselect">
                        View:&nbsp;
                        <select id="import_contacts_not_list_pageselector" class="rt_batchselect"></select>
                    </span>
                </div>
            </div>

            <div class="rs_column rs_righttablecolumn">
                <div class="rs_sidetitlebox rs_sidetitleboxright">
                    <div id="rs_recordsouttitle">Contacts to Import</div>
                    <div class="rs_groupname rs_tablegrouptitle" style="display: none;">
                        <!-- Populated dynamically -->
                    </div>
                </div>
                <div class="rs_selectallwrapperright">
                    <div class="rs_selectallright"></div>
                </div>
                <div id="import_contacts_list" class="rsboth_rowboxes rt_rowbox"></div>
                <div class="selectbar">
                    <span class="batchselect">
                        View:&nbsp;
                        <select id="import_contacts_list_pageselector" class="rt_batchselect"></select>
                    </span>
                </div>
            </div>

            <div id="import_contacts_details" class="rs_column rs_rightcolumn details_outer"></div>
        </div>
        <br /><br />

        <div class="instructions_body">
            <div class="ins_title">
              Instructions
            </div>

            <div id="ip_instructions">
                <div id="ip_outlook_instructions">
                <div class="ip_instructionstitle">Import Microsoft Outlook&reg; Contacts:</div>
                    <ol class="ip_instructions_list">
                        <li>In Microsoft Outlook, click File &gt; Import and Export.</li>
                        <li>In the action list, select Export to a file and hit Next.</li>
                        <li>Choose Comma Separated Values (Windows) as the file to export and click Next.</li>
                        <li>Select Contacts and click Next.</li>
                        <li>Select a location for your file, making sure that it has a .csv extension and click Finish.</li>
                        <li>Log into your account and click the Import Contacts link.</li>
                        <li>Upload the .csv file you&#39;ve exported above onto the website.</li>
                        <li>Once the .csv file is uploaded, your current phonebook backup should include all your Outlook contacts. You can import these contacts onto your mobile phone by performing a Backup from the main menu of the application or by pressing the &#39;Update Phone&#39; button on the contacts screen.</li>
                    </ol>
                </div>

                <div id="ip_outlook_express_instructions">
                    <div class="ip_instructionstitle">Import Microsoft Outlook Express&reg; Contacts:</div>
                    <ol class="ip_instructions_list">
                        <li>After opening your Outlook Express, click on Addresses icon.</li>
                        <li>Click on File &gt; Export &gt; Other Address Book...</li>
                        <li>Select the Text File (Comma Separated Values) tab and then click Export.</li>
                        <li>Select a location for your .csv file and then click Next.</li>
                        <li>Select the fields you wish to export, then click Finish.</li>
                        <li>Log into your account and click the Import Contacts link.</li>
                        <li>Upload the .csv file you&#39;ve exported above onto the website.</li>
                        <li>Once the .csv file is uploaded, your current phonebook backup should include all your Outlook Express contacts. You can import these contacts onto your mobile phone by pressing the &#39;Update Phone&#39; button on the contacts screen.</li>
                    </ol>
                </div>

                <div id="ip_gmail_instructions">
                    <div class="ip_instructionstitle">Import Gmail Contacts:</div>
                    <div style="padding: 8px 0px 0px 27px;line-height:18px;">
                        Select the style of import you wish to perform.<br /><br />
                        Fast Import allows you to log in to your Gmail account directly and import all your<br />
                        contacts.<br /><br />
                        Detail Import provides instructions for creating and importing a .csv file of your<br />
                        contacts from Gmail. The detailed method often times provides more detail for your<br />
                        contacts.<br /><br />
                    </div>
                </div>

                <div id="ip_gmail_fast_instructions">
                    <div class="ip_instructionstitle">Import Gmail Contacts:</div>
                    <div style="padding: 8px 0px 0px 27px;line-height:18px;">
                        Enter your Gmail username and password and Asurion Labs will perform a direct import<br />
                        of your Gmail contacts. Your login information will not be stored or used for anything<br />
                        other than a one time collection of your contact information.
                    </div>
                </div>

                <div id="ip_gmail_detailed_instructions">
                    <div class="ip_instructionstitle">Import Gmail Contacts:</div>
                    <ol class="ip_instructions_list">
                        <li>Log in to your Gmail Account and click the contact link in the middle-left corner.</li>
                        <li>Click Export in the upper-right corner.</li>
                        <li>Select Everyone (All Contacts), Outlook CSV format then click Export.</li>
                        <li>Log into your Asurion Labs account and click the Import Contacts link.</li>
                        <li>Upload the .csv file you exported above onto the website.</li>
                        <li>Once the .csv file is uploaded, your current phonebook sync should include all your Gmail contacts. You can import these contacts onto your mobile phone by performing a sync from the main menu of the application.</li>
                    </ol>
                </div>

                <div id="ip_yahoo_instructions">
                    <div class="ip_instructionstitle">Import Yahoo Contacts:</div>
                    <ol class="ip_instructions_list">
                        <li>Log in to your Yahoo! Account and click the Contacts tab in the upper-left corner.</li>
                        <li>Click Tools &gt; Export... in the upper-right corner.</li>
                        <li>Click Export Now next to Microsoft Outlook under the Export section and save the file.</li>
                        <li>Log into your account and click the Import Contacts link.</li>
                        <li>Upload the .csv file you exported above onto the website.</li>
                        <li>Once the .csv file is uploaded, your current phonebook backup should include all your<br />
                            Yahoo! contacts. You can import these contacts onto your mobile phone by pressing the &#39;Update Phone&#39; button on the contacts screen.</li>
                    </ol>
                </div>

                <div id="ip_other_instructions">
                    <div class="ip_instructionstitle">Import Other Contacts</div>
                    <div style="padding: 8px 0px 0px 27px;line-height:18px;">
                        To import your contacts, log in to your contact management program and find the<br />
                        export to .csv file option.<br /><br />
                        Save the .csv file to your computer and upload it in the box above.
                    </div>
                </div>
            </div>
        </div>

        <div class="instructions_body feature_unsupported_note">
            <div class="ins_title">
              Note: Feature not supported
            </div>

            <div id="ip_instructions">
                <div>
                    <ol>
                        <li>&nbsp;</li>
                        <li>
                            This feature is not supported for the version of Microsoft Internet Explorer that<br />
                            you are currently using. We encourage you to upgrade to the latest version.
                        </li>
                    </ol>
                </div>
            </div>
        </div>
    </div>
</div>

<div id="import_pane_messages" class="hidden">
    <span id="import_contacts_success" class="hidden">Contacts imported successfully</span>
    <span id="import_contacts_gmail_no_data" class="hidden">No valid records</span>
    <span id="import_contacts_csv_no_data" class="hidden">CSV file contains no records</span>
    <span id="import_contacts_error" class="hidden">Error in importing contacts</span>
    <span id="import_contacts_no_selection" class="hidden">Please select at least one contact to import.</span>
    <span id="import_contacts_invalid_gmail_id" class="hidden">Invalid gmail id, please input a full email address.</span>
    <span id="import_contacts_invalid_gmail_password" class="hidden">Please input your valid gmail password.</span>
</div>
</script>

<script type="text/template" id="lessismoredialog_template">
    <div class="header">
        <div class="title">Backup / Sync Policy - Phone Contacts Only</div>
    </div>
    <div class="close"></div>
    <div class="main">
        <div class="instructions">
            <div class="cc_image">
	            <div class="cc_imagetext1">Contacts from third-party accounts</div>
	            <div class="cc_imagetext2">Phone Contacts saved with Mobile Security</div>
            </div>
            <div class="cc_body">
                <b>Backup/Sync Note...</b><br>
                Asurion Labs does not back up/sync or display contacts from third-party accounts
                such as Facebook, Twitter, Yahoo!, Google and Microsoft Exchange.<br><br>
                <b>Why is this beneficial?</b><br>
                This feature update will avoid contact duplications on both the phone and the Asurion
                Labs website, which will simplify your contact management experience.<br><br>
                <b>Will Asurion Labs transfer all my contacts to a new phone?</b><br>
                Asurion Labs wirelessly restores all contacts saved solely on your phone and will
                provide assistance with reconnecting your third-party accounts.
                <a class="link_text restore_instructions">Restore Instructions</a>
            </div>
        </div>
    </div>
</script>


<script type="text/template" id="Learn_More_template" class="template">
    <div class="header">
        <div class="title photos hidden">Web Only Photos</div>
        <div class="title videos hidden">Web Only Videos</div>
    </div>
    <div class="close"></div>
    <div class="main">
        <div class="instructions">
            <div class="photos hidden">
                <b>To delete web only photos:</b>
                <ul>
                    <li>Hover your mouse over the photo to reveal the action buttons and click the <strong>Delete Photo</strong> button. This will send the photo to the trash where it will be stored for 30 days before being deleted. </li>
                    <li>Note: Items in the trash still count towards your storage capacity, so if you are trying to free up space be sure to navigate to the <strong>Trash</strong> and permanently delete any unwanted items.</li>
                </ul><br>
                <b>To Add web only photos to your phone:</b>
                <ul>
                    <li>Hover your mouse over the photo to reveal the action buttons and click the <strong>Add to Device</strong> button. The next time a sync is initiated from your device, the photo will be added to your device. </li>
                </ul><br>
                <b>To delete iPhone photos:</b>
                <ul>
                    <li> Due to iPhone restrictions, photos that you took from your iPhone can only be deleted from the device itself.
                        The next time a sync is initiated from your device, the photo will be set to <strong>Web Only</strong>.
                        You may then delete the photo from the website or add it back to your device following the steps above.</li>
                </ul>
            </div>
            <div class="videos hidden">
                <b>To delete web only videos:</b>
                <ul>
                    <li>Hover your mouse over the video to reveal the action buttons and click the <strong>Delete Video</strong> button. This will send the video to the trash where it will be stored for 30 days before being deleted. </li>
                    <li>Note: Items in the trash still count towards your storage capacity, so if you are trying to free up space be sure to navigate to the <strong>Trash</strong> and permanently delete any unwanted items.</li>
                </ul><br>
                <b>To Add web only videos to your phone:</b>
                <ul>
                    <li>Hover your mouse over the videos to reveal the action buttons and click the <strong>Add to Device</strong> button. The next time a sync is initiated from your device, the video will be added to your device. </li>
                </ul><br>
                <b>To delete iPhone videos:</b>
                <ul>
                    <li> Due to iPhone restrictions, videos that you took from your iPhone can only be deleted from the device itself.
                        The next time a sync is initiated from your device, the video will be set to <strong>Web Only</strong>.
                        You may then delete the video from the website or add it back to your device following the steps above.</li>
                </ul>
            </div>
        </div>
    </div>
</script>