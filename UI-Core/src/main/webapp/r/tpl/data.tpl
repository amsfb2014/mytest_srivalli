<script id="data_tab_template" type="text/template">
	<div id="records_mainhalf">
        <ul class="nav nav-tabs data-menu hidden-xs">
            <li class="col-sm-3 col-md-3 col-lg-3 tab-contacts">
                <a class="data-tab-menu" href="#" data-tag="#home/data">Contacts</a>
            </li>
            <li class=" col-sm-3 col-md-3 col-lg-3 tab-photos">
                <a class="data-tab-menu" href="#" data-tag="#home/data/photos"  id="photos">Photos</a>
            </li>
            <li class="col-sm-3 col-md-3 col-lg-3 tab-videos">
                <a class="data-tab-menu" href="#" data-tag="#home/data/videos" id="videos">Videos</a>
            </li>
            <li class="col-sm-3 col-md-3 col-lg-3 tab-trash">
                <a class="data-tab-menu" href="#" data-tag="#home/data/trash"  id="trash">Trash</a>
            </li>

        </ul>
        <div class="tab-content">
            <div id ="data_contacts_tab">
                <div class="progressing">Loading contacts...</div>
            </div>
            <div id="data_photos_tab">
                <div class="progressing">Loading photos...</div>
            </div>
            <div id="data_videos_tab">
                <div  class="progressing">Loading videos...</div>

            </div>
            <div id="data_trash_tab"></div>
        </div>
		<!-- Subtab selectors -->
	</div>

    <div id="data-menu-tab-sm-full" class="modal fade ama-submenu ama-menu hidden-md hidden-sm hidden-lg">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button></div>
                <div class="modal-body">
                    <ul class="menu data-menu">
                        <li class="report_event tab-contacts">
                            <a class="data-tab-menu" href="#" data-tag="#home/data" data-dismiss="modal">Contacts</a>
                            <span class="pull-right" data-icon="&#59418;"></span>
                        </li>
                        <li  class="report_event tab-photos">
                            <a class="data-tab-menu" href="#" data-tag="#home/data/photos" data-dismiss="modal">Photos</a>
                            <span class="pull-right" data-icon="&#59418;"></span>
                        </li>
                        <li class="report_event tab-videos">
                            <a class="data-tab-menu" href="#" data-tag="#home/data/videos" data-dismiss="modal">Videos</a>
                            <span class="pull-right" data-icon="&#59418;"></span>
                        </li>
                        <li class="report_event tab-trash">
                            <a class="data-tab-menu" href="#" data-tag="#home/data/trash" data-dismiss="modal">Trash</a>
                            <span class="pull-right" data-icon="&#59418;"></span>
                        </li>
                    </ul>
                </div>

            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
        <div class="modal-footer">
            <a href="javascript:return false;" class="" data-dismiss="modal"><span class="glyphicon glyphicon-chevron-up"></span><br/>Close Menu</a>
        </div>
    </div><!-- /.modal -->


    <div id="data_standard_dialogs"></div>

	<!-- Data tab standard dialog messages -->
	<div class="dialog_messages hidden">
		<!-- Error messages -->
		<div id="msg_error_no_action_selected">Please choose an action.</div>
	</div>

	<!-- Data tab dialogs -->
	<div id="lessismoredialog"></div>

	<div class="clear"></div>
    <!--div id="transfer_data_instruction_dialog" class="transferdata_dialog modal fade"></div-->
    <div id="learnMoreDiv" class="dialog" style="display:none"></div>

</script>

<script type="text/template" id="trash_data_contacts_template">
    <div class="hidden-md hidden-lg hidden-sm toggle-submenu">
        <a class="submenu-show" data-toggle="modal" data-target="#data-menu-tab-sm-full">
            <span class="submenu-left"></span>
            Contacts
        </a>
    </div>

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

<script type="text/template" id="trash_contacts_list_template">

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

<script type="text/template" id="trash_contact_details_template">
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
		<!--
		<div class="contact_note">
			Fields colored gray are not supported by your phone.
		</div>
		-->

        <h4 class="details_contactinfotitle details_title" >Contact Info</h4>

        <div class="details_contactinfo details_infobox contacts_details_infobox" style="">
            <div class="<%=im.myClass%> details_lineitem">
                <div class="lineitem_key left" >Im</div>
                <div class="lineitem_key left" ><%=im.allIn%></div>
            </div>
            <div class="<%=imAIM.myClass%> details_lineitem">
                <div class="lineitem_key left" >Im A I M</div>
                <div class="lineitem_key left" ><%=imAIM.allIn%></div>
            </div>
            <div class="<%=imGTalk.myClass%> details_lineitem">
                <div class="lineitem_key left" >Im G Talk</div>
                <div class="lineitem_key left" ><%=imGTalk.allIn%></div>
            </div>
            <div class="<%=imICQ.myClass%> details_lineitem">
                <div class="lineitem_key left" >Im I C Q</div>
                <div class="lineitem_key left" ><%=imICQ.allIn%></div>
            </div>
            <div class="<%=imJabber.myClass%> details_lineitem">
                <div class="lineitem_key left" >Im Jabber</div>
                <div class="lineitem_key left" ><%=imJabber.allIn%></div>
            </div>
            <div class="<%=imQQ.myClass%> details_lineitem">
                <div class="lineitem_key left" >Im Q Q</div>
                <div class="lineitem_key left" ><%=imQQ.allIn%></div>
            </div>
            <div class="<%=imSkype.myClass%> details_lineitem">
                <div class="lineitem_key left" >Im Skype</div>
                <div class="lineitem_key left" ><%=imSkype.allIn%></div>
            </div>
            <div class="<%=imWindowsLive.myClass%> details_lineitem">
                <div class="lineitem_key left" >Im Windows Live</div>
                <div class="lineitem_key left" ><%=imWindowsLive.allIn%></div>
            </div>
            <div class="<%=imYahoo.myClass%> details_lineitem">
                <div class="lineitem_key left" >Im Yahoo</div>
                <div class="lineitem_key left" ><%=imYahoo.allIn%></div>
            </div>
            <div class="<%=imOther.myClass%> details_lineitem">
                <div class="lineitem_key left" >Im Other</div>
                <div class="lineitem_key left" ><%=imOther.allIn%></div>
            </div>
            <div class="<%=imOther2.myClass%> details_lineitem">
                <div class="lineitem_key left" >Im Other2</div>
                <div class="lineitem_key left" ><%=imOther2.allIn%></div>
            </div>
            <div class="<%=imOther1.myClass%> details_lineitem">
                <div class="lineitem_key left" >Im Other1</div>
                <div class="lineitem_key left" ><%=imOther1.allIn%></div>
            </div>
            <div class="<%=mobilePhone.myClass%> details_lineitem">
                <div class="lineitem_key left" >Mobile Phone</div>
                <div class="lineitem_key left" ><%=mobilePhone.allIn%></div>
            </div>
            <div class="<%=workPhone.myClass%> details_lineitem">
                <div class="lineitem_key left" >Work Phone</div>
                <div class="lineitem_key left" ><%=workPhone.allIn%></div>
            </div>
            <div class="<%=homePhone.myClass%> details_lineitem">
                <div class="lineitem_key left" >Home Phone</div>
                <div class="lineitem_key left" ><%=homePhone.allIn%></div>
            </div>
            <div class="<%=fax.myClass%> details_lineitem">
                <div class="lineitem_key left" >Fax</div>
                <div class="lineitem_key left" ><%=fax.allIn%></div>
            </div>
            <div class="<%=homeFax.myClass%> details_lineitem">
                <div class="lineitem_key left" >Home Fax</div>
                <div class="lineitem_key left" ><%=homeFax.allIn%></div>
            </div>
            <div class="<%=workFax.myClass%> details_lineitem">
                <div class="lineitem_key left" >Work Fax</div>
                <div class="lineitem_key left" ><%=workFax.allIn%></div>
            </div>
            <div class="<%=pager.myClass%> details_lineitem">
                <div class="lineitem_key left" >Pager</div>
                <div class="lineitem_key left" ><%=pager.allIn%></div>
            </div>
            <div class="<%=email.myClass%> details_lineitem">
                <div class="lineitem_key left" >Email</div>
                <div class="lineitem_key left" ><%=email.allIn%></div>
            </div>
            <div class="<%=homeEmail.myClass%> details_lineitem">
                <div class="lineitem_key left" >Home Email</div>
                <div class="lineitem_key left" ><%=homeEmail.allIn%></div>
            </div>
            <div class="<%=localEmail.myClass%> details_lineitem">
                <div class="lineitem_key left" >Local Email</div>
                <div class="lineitem_key left" ><%=localEmail.allIn%></div>
            </div>
            <div class="<%=otherEmail.myClass%> details_lineitem">
                <div class="lineitem_key left" >Other Email</div>
                <div class="lineitem_key left" ><%=otherEmail.allIn%></div>
            </div>
            <div class="<%=workEmail.myClass%> details_lineitem">
                <div class="lineitem_key left" >Work Email</div>
                <div class="lineitem_key left" ><%=workEmail.allIn%></div>
            </div>
            <div class="<%=otherPhone.myClass%> details_lineitem">
                <div class="lineitem_key left" >Other Phone</div>
                <div class="lineitem_key left" ><%=otherPhone.allIn%></div>
            </div>
            <div class="<%=carPhone.myClass%> details_lineitem">
                <div class="lineitem_key left" >Car Phone</div>
                <div class="lineitem_key left" ><%=carPhone.allIn%></div>
            </div>
            <div class="<%=radioPhone.myClass%> details_lineitem">
                <div class="lineitem_key left" >Radio Phone</div>
                <div class="lineitem_key left" ><%=radioPhone.allIn%></div>
            </div>
            <div class="<%=localPhone.myClass%> details_lineitem">
                <div class="lineitem_key left" >Local Phone</div>
                <div class="lineitem_key left" ><%=localPhone.allIn%></div>
            </div>
            <div class="<%=assistantPhone.myClass%> details_lineitem">
                <div class="lineitem_key left" >Assistant Phone</div>
                <div class="lineitem_key left" ><%=assistantPhone.allIn%></div>
            </div>
            <div class="<%=iPhone.myClass%> details_lineitem">
                <div class="lineitem_key left" >I Phone</div>
                <div class="lineitem_key left" ><%=iPhone.allIn%></div>
            </div>
			<br>
        </div>
            <div class="<%= formattedHomeAddress.elClass%> details_lineitem" style="display:<%= formattedHomeAddress.display%>">
                <div class="lineitem_key left" >Home Address:</div>
                <div class="<%= formattedHomeAddress.valueClass%> lineitem_key" ><%= formattedHomeAddress.value%></div>
            </div>

		<% if ( formattedWorkAddress.value || companyName.value || position.value || department.value){ %>
		    <h4 class="details_formattedworkaddresstitle details_title">
        	    Work Info &amp; Address
        	</h4>
		<% } %>

        <div class="details_formattedworkaddress details_infobox contacts_details_infobox">
			<div class="<%= companyName.elClass%>" style="display:<%= companyName.display%>">
				<div class="lineitem_key" >Organization:</div>
				<div class="<%= companyName.valueClass%>" ><%= companyName.value%></div>
			</div>
			<div class="<%= position.elClass%>" style="display:<%= position.display%>">
				<div class="lineitem_key" >Job Title:</div>
				<div class="<%= position.valueClass%>" ><%= position.value%></div>
			</div>
			<div class="<%= department.elClass%>" style="display:<%= department.display%>">
				<div class="lineitem_key" >Department:</div>
				<div class="<%= department.valueClass%>" ><%= department.value%></div>
			</div>
			<div class="<%= formattedWorkAddress.elClass%>" style="display:<%= formattedWorkAddress.display%>">
				<div class="lineitem_key" >Work Address:</div>
				<div class="<%= formattedWorkAddress.valueClass%>" ><%= formattedWorkAddress.value%></div>
			</div>
           	<br>
       	</div>

        <h4 class="details_formattedotheraddresstitle details_title" style="display: none;">
            Other Address
        </h4>

        <div class="details_formattedotheraddress details_infobox contacts_details_infobox" style="display: none;">
            <div class="<%= formattedOtherAddress.elClass%>" style="display:<%= formattedOtherAddress.display%>">
				<div class="lineitem_key" >Address:</div>
				<div class="<%= formattedOtherAddress.valueClass%>" ><%= formattedOtherAddress.value%></div>
			</div>
            <br>
        </div>

		<div class="details_formattedcustomaddress details_infobox contacts_details_infobox" style="display: none;">
            <div class="<%= formattedLocalAddress.elClass%>" style="display:<%= formattedLocalAddress.display%>">
				<div class="lineitem_key" >Address:</div>
				<div class="<%= formattedLocalAddress.valueClass%>" ><%= formattedLocalAddress.value%></div>
			</div>
            <br>
        </div>

		<% if ( nickName.value || url.myClass != "hidden" || webSiteUrl.myClass != "hidden" || homeUrl.myClass != "hidden" || otherUrl.myClass != "hidden" || preferredUrl.myClass != "hidden" || birthday.value || notes.value || relationship.value){ %>
        	<h4 class="details_othertitle details_title">
            	Other
        	</h4>
		<% } %>

        <div class="details_other details_infobox contacts_details_infobox">
			<div class="<%= nickName.elClass%>" style="display:<%= nickName.display%>">
				<div class="lineitem_key" >Nickname:</div>
				<div class="<%= nickName.valueClass%>" ><%= nickName.value%></div>
			</div>
			<div class="<%= relationship.elClass%>" style="display:<%= relationship.display%>">
				<div class="lineitem_key" >Relationship:</div>
				<div class="<%= relationship.valueClass%>" ><%= relationship.value%></div>
			</div>

            <div class="<%=webSiteUrl.myClass%> details_lineitem">
                <div class="lineitem_key left" >Web Site Url</div>
                <div class="lineitem_key left" ><%=webSiteUrl.allIn%></div>
            </div>
            <div class="<%=preferredUrl.myClass%> details_lineitem">
                <div class="lineitem_key left" >Preferred Url</div>
                <div class="lineitem_key left" ><%=preferredUrl.allIn%></div>
            </div>
            <div class="<%=homeUrl.myClass%> details_lineitem">
                <div class="lineitem_key left" >Home Url</div>
                <div class="lineitem_key left" ><%=homeUrl.allIn%></div>
            </div>
            <div class="<%=otherUrl.myClass%> details_lineitem">
                <div class="lineitem_key left" >Other Url</div>
                <div class="lineitem_key left" ><%=otherUrl.allIn%></div>
            </div>
            <div class="<%=workUrl.myClass%> details_lineitem">
                <div class="lineitem_key left" >Work Url</div>
                <div class="lineitem_key left" ><%=workUrl.allIn%></div>
            </div>
            <div class="<%=url.myClass%> details_lineitem">
                <div class="lineitem_key left" >Url</div>
                <div class="lineitem_key left" ><%=url.allIn%></div>
            </div>





			<div class="<%= birthday.elClass%>" style="display:<%= birthday.display%>">
				<div class="lineitem_key" >Birthday:</div>
				<div class="<%= birthday.valueClass%>" ><%= birthday.value%></div>
			</div>
			<div class="<%= notes.elClass%>" style="display:<%= notes.display%>">
				<div class="lineitem_key" >Notes:</div>
				<div class="<%= notes.valueClass%>" ><%= notes.value%></div>
			</div>
            <br>
		</div>
	</div>
</div>
</script>
<!-- end contact_details_template -->

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
            </ul>
            </div>
        </div>
        <div id="ip_failures"></div>

        <div class="spacer" style="height: 30px"></div>
        
      
    
          <div class="import_contactfile form-group">
		   <label class=" col-xs-12 col-sm-3 col-md-3 col-lg-3 col-sm-offset-3 control-label" >Import Contacts From:</label>
		       <select id="ip_providerselect" >
                <option value="ip_outlook_instructions">Microsoft Outlook&reg; Contacts</option>
                <option value="ip_outlook_express_instructions">Microsoft Outlook Express&reg; Contacts</option>
                <option value="ip_gmail_instructions">Gmail&reg; Contacts</option>
                <option value="ip_yahoo_instructions">Yahoo!&reg; Contacts</option>
                <option value="ip_other_instructions">Other</option>
            </select>
  		 </div>
  	
  		 
        <div id="methodbox" class="import_contactfile form-group">
         <label class="col-xs-12 col-sm-3 col-sm-3 col-md-3 col-lg-3 col-sm-offset-3 control-label"> Type of Import:</label>
           
            <select id="ip_methodselect" >
                <option value="ip_gmail_instructions">Select One...</option>
                <option value="ip_gmail_fast_instructions">Fast Import</option>
                <option value="ip_gmail_detailed_instructions">Detailed Import</option>
            </select>
        </div>

        <div id="ip_fast_method" style="display: none;">
            <!--
            <form name="gmail_fastimport" id="gmail_fastimport" method="POST">
                <div class="CI_input form-group">
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
            -->
            
              <form id="gmail_fastimport" name="gmail_fastimport"  class="form-horizontal col-xs-12" role="form" method="POST">
            	<div class="CI_input col-xs-12 col-sm-12 col-md-12 col-lg-12 form-group" >
    			<label id="username_importContact" for="username" class="col-xs-12 col-sm-3 col-md-3 col-lg-3 col-sm-offset-3" >Gmail id:</label>
    				<div class="col-xs-12 col-sm-3 col-md-3 col-lg-3">
      				<input id="username" type="text" class="form-control"  name="username" placeholder="Username"><div>( Example: username@gmail.com )</div>
    				</div>
  				</div>
  				 <div id="gps_keyword" class="col-xs-12 col-md-12 col-lg-12 form-group">
				    <label id="password_importContact" for="password" class="col-xs-12 col-xs-4 col-sm-3 col-sm-3 col-md-3 col-lg-3 col-sm-offset-3">Password:</label>
				    <div class="col-xs-12 col-sm-3 col-md-3 col-lg-3 padRZero">
				      <input id="password" type="password" class="form-control" placeholder="Password">
				    </div>
				  </div>
  				<div id="CI_button" class="col-sm-12 col-md-12 col-lg-12">
			    <div class="col-sm-3 col-md-3 col-lg-3 col-sm-offset-6">
			      <button  id="ip_importgmail_button" type="button" class="btn btn-default">Import Gmail Contacts</button>
			    </div>
			  </div>
  			  </form>	
            
            
        </div>

        <div id="uploadbox" display="display: block;" class=" col-xs-12 col-sm-12 col-md-12 col-lg-12 ">
            <form name="import_form" enctype="multipart/form-data" action="" method="post" id="import_form" target="hiddenUploadResponse">                
                <div id="ip_filebrowserholder" class="form-group"><label class="col-sm-6 col-md-6 col-lg-6" style="float:left">Select a CSV file for import: </label><div class="col-sm-6 col-md-6 col-lg-6"><input type="file" name="upload_file" id="ip_upload_file"></div></div>
                </div>
                <!-- FIXME: implement selected contacts -->
                <!--
                <input id="ip_loadbutton" type="button" value="Select Which Contacts To Import" showtype="inline" />
                -->
                <div class="col-xs-12 col-sm-8 col-md-8 col-lg-6 col-lg-offset-6 col-md-offset-6 col-sm-offset-6">
				  <input id="ip_importall_button" type="submit" value="Import All Contacts" showtype="inline" style="display: block;">
				</div>
            </form>
        </div>
        <!-- FIXME: implement selected contacts -->
        <!--
        <input id="ip_loadbutton" type="button" value="Select Which Contacts To Import" onclick="return ImportPane.validateCSV();" showtype="inline" />
        -->

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
    </div>
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

<script type="text/template" id="list_empty_template">
	<li class="list_item_empty">
		No data available.
	</li>
</script>

<script type="text/template" id="list_details_empty_template">
	<div class="list_details_empty">
		<p>No data available.</p>
	</div>
</script>