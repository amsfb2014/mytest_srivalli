<script type="text/template" id="data_contacts_template">
    <div class="hidden-md hidden-lg hidden-sm toggle-submenu">
        <a class="submenu-show" data-toggle="modal" data-target="#data-menu-tab-sm-full">
            <span class="submenu-left"></span>
            Contacts
        </a>
        <a class="create_contacts_link pull-right report_event" id="data_contacts_submenu_createcontact">
        	<span class="icon webbycons-createuser"></span>
        </a>
    </div>

    <div id="records_consolehalf" class="col-md-3 col-lg-3 hidden-xs hidden-sm hidden-md  hidden-lg">
		<div class="console" id="data_contacts_management">
			<h4 class="side_title">
				Manage Contacts
				<span class="toggle"></span>
			</h4>
			<div class="mc_links">
				<!--<div id="mcp_create">
					<a href="javascript:;" class="mc_link create_contacts_link report_event" id="data_contacts_createcontact">
						Create New Contact(s)
					</a>
				</div>-->
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
			<h4 class="side_title">Contact Breakdown<span class="toggle"></span></h4>
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
            <h4 class="side_title">
                Auto Sync Settings<span class="toggle"></span>
            </h4>
            <div id="contacts_settings_summary_placeholder">
                <div style="height:10px;padding:10px;font-size:24px;text-align:center;color:#CCC">
                    <img src="img/working.gif" />
                </div>
            </div>
            <div class="link">
                <a class="link_text report_event" href="javascript:;" id="sync_settings"><span class="ios hidden">View</span><span class="non-ios">Edit</span> Sync Settings</a>
            </div>
            <div class="transfer_data_instruction hidden">
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
	<div class="row-offcanvas row-offcanvas-right">
	<div id="records_tablehalf" class="records_lefthalf list_bordered col-xs-12 col-sm-6 col-md-6 col-lg-6" style="display:block;">
		
		<div id="contact_btn_container" class="hidden-xs col-sm-6 col-md-6 col-lg-6">
			<!--
			<div id="contact_resource" class="button col-sm-6 col-md-6 col-lg-4">
				<div style="float:right" class="mc_link create_contacts_link report_event col-xs-12 col-sm-11 col-md-11 col-lg-11"
				id="data_contacts_createcontact">Create Contacts</div>
			</div>
			-->
			<!--div id="data_contacts_searchbar" style="float:left" class="col-xs-12 col-sm-6 col-md-6 col-lg-8">
				<input id="commands_searchinput" class="searchinput col-xs-12 col-sm-11 col-md-11 col-lg-11" placeholder="Search" tabindex="1" type="text">
			</div-->			
			<!--
			<form class="form-horizontal hidden-xs" role="search" onsubmit="javascript:return false;">
                <div id="data_contacts_searchbar" class="form-group input-group col-xs-12 col-sm-6 col-md-6 col-lg-6">
                    <span class="input-group-addon icon webbycons-search"></span>                    
                    <input type="text" id="commands_searchinput" placeholder="Search" class="searchinput inputfadedtext form-control col-xs-12 col-sm-11 col-md-11 col-lg-11" tabindex="1">
                </div>                
            </form>
            -->
            <div class="mc_link create_contacts_link report_event btn btn-primary" id="data_contacts_createcontact">Create Contacts</div>						
		</div>
        <div id="data_contacts_searchbar" class="input-group hidden-xs col-sm-6 col-md-6 col-lg-6">
            <span class="input-group-addon icon webbycons-search"></span>                    
            <input type="text" id="commands_searchinput" placeholder="Search" class="searchinput inputfadedtext form-control col-xs-12 col-sm-11 col-md-11 col-lg-11" tabindex="1">
        </div>                
		<div id="contactstable" class="recordstable col-xs-12 col-sm-12 col-dm-12 col-lg-12">
			<div id="ct_rowbox" class="rt_rowbox" batchnumber="0">	
				<ul id="data_contacts_list" class="scrollable">
					 <span class='progressing'></span>
				</ul>
			</div>
		</div>

	</div>
	<div id="records_detailshalf" class="records_middlehalf details_bordered col-xs-12 col-sm-6 col-md-6 col-lg-6 sidebar-offcanvas active">
		<div id="contactdetailsbox" class="details_outer">
			<div id="data_contact_details"></div>
		</div>
	</div>
	<div id="data_contact_add-edit" class="hidden"></div>
	<div id="data_contacts_import" class="hidden"></div>
	<div class="dialog_messages hidden">
		<!-- Dialog messages for Contacts view -->

		<!-- Confirm delete messages -->
		<div id="msg_confirm_delete_contact">Are you sure you want to delete this contact?</div>
		<div id="msg_confirm_delete_contacts">Are you sure you want to delete these contacts?</div>

		<!-- Error messages -->
		<div id="msg_error_no_contact_selected">Please choose some contacts.</div>
	</div>
</script>

<!-- Add edit contact start -->
<script  type="text/template" class="template" id="contact_add-edit_template">
    <form id="contactEditor" method="post" action="" role="form">
        <% if (typeof(id) !== "undefined") { %>
            <input type="hidden" value="<%=status%>" name="status"/>
            <input type="hidden" value="<%=id%>"  name="id"/>
            <input type="hidden" value="<%=pendingDelete%>" name="pendingDelete"/>
            <input type="hidden" value="<%=pendingCreate%>" name="pendingCreate"/>
        <% } %>
        <div class="windowb" style="display: block;">
            <div class="windowbinner" id="editpaneinner">
                <div class="note bs-callout bs-callout-info">
                    Note: Fields colored gray are not supported on your phone and will not be saved to your phone. These fields can be saved and edited on the website.
                </div>				
				
                <div id="header_title" class="pane_floatingbuttons">		
                    <h3><% if (typeof id === "undefined") {%>Add Contact<span class="hidden-xs">/s</span><%} else {%>Edit Contact<%}%></h3>
                    <ul class="col-xs-12 button">
						<% if (typeof id === "undefined") {%>
							<li class="rs_save" id="add_contact_save_btn">Save</li>
							<li class="rs_save_next hidden-xs" id="save_next">Save and add another</li>						
						<%} else {%>
							<li class="rs_saveEdit" id="edit_contact_save_btn">Edit</li>						
						<%}%>
                        <li class="rs_cancel" id="add_edit_contact_cancel_btn">Cancel</li>
                    </ul>
                </div>
						<div id="ep_column_1" class="col-xs-12 col-sm-4 col-md-4 col-lg-4"> 
                            <div class="ep_column">
                                <div class="relativebuffer">

                                    <div class="ep_fieldblock">

                                        <!-- Names -->
                                        
                                        <div id="ep_pictureholder">
                                            <img width="60" height="66" border="0" src="<%=thumbImg%>" id="ep_picture_default">
                                            <img width="60" height="66" border="0" style="display: none;" id="ep_picture" onload="EditPane.showPictureOnload()" src="">
                                        </div>
                                        
                                        <!--div class="ep_title">
                                            Name:
                                        </div>
                                        <div class="ep_row">
                                            <input type="text" maxlength="2048" value="<%=fullName%>" data-name="07-01" name="fullName" class="ep_textinput" id="ep_name">
                                        </div-->
                                        
                                        <div class="form-group">
    										<label for="ep_name">Name:</label>
    										<input type="text" maxlength="2048" value="<%=fullName%>" data-name="07-01" name="fullName" class="form-control ep_textinput" id="ep_name">
  										</div>

                                        <!--div class="ep_title">
                                            Prefix:
                                        </div>
                                        <div class="ep_row">
                                            <input type="text" maxlength="2048" value="<%=prefix%>" data-name="0F-01" name="prefix" class="ep_textinput ep_nameinput ep_unsupported" id="ep_prefix">
                                        </div-->                                        
                                        <div class="form-group">
    										<label for="ep_prefix">Prefix:</label>
    										<input type="text" maxlength="2048" value="<%=prefix%>" data-name="0F-01" name="prefix" class="form-control ep_textinput ep_nameinput ep_unsupported" id="ep_prefix">
  										</div>
                                        
                                                                                
                                        <!--div class="ep_title">
                                            First:
                                        </div>
                                        <div class="ep_row">
                                            <input type="text" maxlength="2048" value="<%=firstName%>" data-name="08-01" name="firstName" class="ep_textinput ep_nameinput" id="ep_firstName">
                                        </div-->                                        
                                        <div class="form-group">
                                            <label for="ep_firstName">First:</label>                                        
                                            <input type="text" maxlength="2048" value="<%=firstName%>" data-name="08-01" name="firstName" class="form-control ep_textinput ep_nameinput" id="ep_firstName">
                                        </div>                                        
                                        
                                                                             
                                        <!--div class="ep_title">
                                            Middle:
                                        </div>
                                        <div class="ep_row">
                                            <input type="text" maxlength="2048" value="<%=middleName%>" data-name="09-01" name="middleName" class="ep_textinput ep_nameinput" id="ep_middleName">
                                        </div-->
                                        <div class="form-group">
                                            <label for="ep_middleName">Middle:</label>                                        
                                            <input type="text" maxlength="2048" value="<%=middleName%>" data-name="09-01" name="middleName" class="form-control ep_textinput ep_nameinput" id="ep_middleName">
                                        </div>                                                                              
                                        
                                        
                                        <!--div class="ep_title">
                                            Last:
                                        </div>
                                        <div class="ep_row">
                                            <input type="text" maxlength="2048" value="<%=lastName%>" data-name="0A-01" name="lastName" class="ep_textinput ep_nameinput" id="ep_lastName">
                                        </div-->
                                        <div class="form-group">
                                            <label for="ep_lastName">Last:</label>                                        
                                            <input type="text" maxlength="2048" value="<%=lastName%>" data-name="0A-01" name="lastName" class="form-control ep_textinput ep_nameinput" id="ep_lastName">
                                        </div>                                       
                                        
                                        
                                        <!--div class="ep_title">
                                            Suffix:
                                        </div>
                                        <div class="ep_row">
                                            <input type="text" maxlength="2048" value="<%=suffix%>" data-name="0G-01" name="suffix" class="ep_textinput ep_nameinput ep_unsupported" id="ep_suffix">
                                        </div-->                                        
                                        <div class="form-group">
                                            <label for="ep_suffix">Suffix:</label>                                        
                                            <input type="text" maxlength="2048" value="<%=suffix%>" data-name="0G-01" name="suffix" class="form-control ep_textinput ep_nameinput ep_unsupported" id="ep_suffix">
                                        </div>
                                        

                                        <!--div class="ep_title">
                                            Nickname:
                                        </div>
                                        <div class="ep_row">
                                            <input type="text" maxlength="2048" value="<%=nickName%>" data-name="0E-01" name="nickName" class="ep_textinput" id="ep_nickName">
                                        </div-->
                                        <div class="form-group">
                                            <label for="ep_nickName">Nickname:</label>                                        
                                            <input type="text" maxlength="2048" value="<%=nickName%>" data-name="0E-01" name="nickName" class="form-control ep_textinput" id="ep_nickName">
                                        </div>                                    
                                        
                                        
										<!--div class="ep_title">
                                            Relationship:
                                        </div>
                                        <div class="ep_row">
                                            <input type="text" maxlength="2048" value="<%=relationship%>" data-name="16-07" name="relationship" class="ep_textinput" id="ep_nickName">
                                        </div-->

                                        <div class="ep_title">
                                            Birthday:
                                        </div>
                                        <div id="ep_birthdayHolder" class="ep_fieldtable ep_row">
                                            <input type="text" value="<%=birthday%>" data-value="<%=birthdayValue%>" data-name="0i-01" name="birthday" class="ep_textinput ep_dateinput" readonly="readonly" id="ep_birthday">
                                            <!-- img class="ui-datepicker-trigger" src="../img/calendar.gif" alt="..." title="..." -->
                                            <img class="ui-datepicker-trigger" title="Remove this date" src="../img/redX.png" id="clearBirthdayId">
                                        </div>

                                        <div class="ep_title">
                                            Anniversary:
                                        </div>
                                        <div style="margin-bottom: 35px" id="ep_anniversaryHolder" class="ep_fieldtable ep_row">
                                            <input type="text" value="<%=anniversary%>" data-value="<%=anniversaryValue%>" data-name="0j-01" name="anniversary" class="ep_textinput ep_dateinput ep_unsupported" readonly="readonly" id="ep_anniversary">
                                            <!-- img class="ui-datepicker-trigger" src="../img/calendar.gif" alt="..." title="..." -->
                                            <img class="ui-datepicker-trigger" title="Remove this date" src="../img/redX.png" id="clearAnniversaryId">
                                        </div>

                                    </div><!-- ep_fieldblock -->

                                    <div class="ep_fieldblock contactnumbers">
                                        <label><strong>Contact Numbers:</strong></label>
                                        <div class="ep_fieldtable">
                                        	<div id="ep_phoneNumbers">
                                        		<!-- Populated dynamically -->
                                        		<%=allMobilePhone.html%>										
											  	
											  	<div class="form-group <%=allMobilePhone.hide%>">
											    	<label for="mobile2">Mobile 2:</label>
											    	<input value="<%=mobilePhone2%>" data-name="0e-04" id="mobile2" name="mobilePhone" type="text" class="form-control ep_textinput ep_phoneinput" maxlength="512">
											  	</div>
											  	
											  	<div class="form-group <%=allMobilePhone.hide%>">
											    	<label for="mobile3">Mobile 3:</label>
											    	<input value="<%=mobilePhone3%>" data-name="0e-04" id="mobile3" name="mobilePhone" type="text" class="form-control ep_textinput ep_phoneinput" maxlength="512">
											  	</div>
                                        	</div>	
                                        </div>
                                        
                                        <div class="ep_fieldtable">
                                        	<div id="ep_workNumber">
                                        		<!-- Populated dynamically -->
                                        		<%=allWorkPhone.html%>                                        		
												<div class="form-group <%=allWorkPhone.hide%>">
											    	<label for="Work1">Work 1:</label>											    	
											    	<input value="<%=workPhone1%>" data-name="0e-03" id="Work1" name="workPhone" type="text" class="form-control ep_textinput ep_phoneinput" maxlength="512">
											  	</div>
											  	
											  	<div class="form-group <%=allWorkPhone.hide%>">
											    	<label for="Work2">Work 2:</label>
											    	<input value="<%=workPhone2%>" data-name="0e-03" id="Work2" name="workPhone" type="text" class="form-control ep_textinput ep_phoneinput" maxlength="512">
											  	</div>
											  	
											  	<div class="form-group <%=allWorkPhone.hide%>">
											    	<label for="Work3">Work 3:</label>
											    	<input value="<%=workPhone3%>" data-name="0e-03" id="Work3" name="workPhone" type="text" class="form-control ep_textinput ep_phoneinput" maxlength="512">
											  	</div>
                                        	</div>	
                                        </div>
                                        
                                                                               
                                        <div class="ep_fieldtable">
	                                        <div id="ep_homePhoneNumber">
		                                        <div class="form-group" >
													<%=allHomePhone.html%>
	                                            	<!-- Populated dynamically -->													
												</div>
											</div>
                                        </div>                                        
                                                                               
                                        <div class="ep_fieldtable">
	                                        <div id="ep_faxNumber">
		                                        <div class="form-group" >
													<!-- Populated dynamically -->
	                                                <%=allfax.html%>
	                                                <%=allHomeFax.html%>
	                                                <%=allWorkFax.html%>
	                                                <!-- Populated dynamically -->													
												</div>
											</div>
                                        </div>
                                        
                                        
                                        <div class="ep_fieldtable">
	                                        <div id="ep_pagerNumber">
		                                        <div class="form-group" >
													<!-- Populated dynamically -->
	                                                <%=allPager.html%>
	                                                <!-- Populated dynamically -->													
												</div>
											</div>
                                        </div>
                                        
                                        <div class="ep_fieldtable">
	                                        <div id="ep_otherNumber">
		                                        <div class="form-group" >
													<!-- Populated dynamically -->
	                                                <%=allOtherPhone.html%>
	                                                <%=allCarPhone.html%>
	                                                <%=allRadioPhone.html%>
	                                                <%=allLocalPhone.html%>
	                                                <%=allAssistantPhone.html%>
	                                                <%=alliPhone.html%>
	                                                <!-- Populated dynamically -->													
												</div>
											</div>
                                        </div>
                                        
                                        
                                    </div><!-- ep_fieldblock -->
                                </div><!-- relativebuffer -->
                            </div><!-- end col 1 --></td>
                          </div>
						  <div id="ep_column_2" class="col-xs-12 col-sm-4 col-md-4 col-lg-4">
                            <div class="ep_column">
                                <div class="relativebuffer">

                                    <div class="ep_fieldblock top-buffer-appned">                                        
                                        <label><strong>Home Address:</strong></label>                                        
                                        <div id="id="ep_homeAddress"">
                                        	<div class="form-group">
                                        		<input type="text" value="<%=homeStreet%>" data-name="0J-02" name="homeStreet" maxlength="2048" placeholder=" Street 1" class="form-control ep_textinput inputplaceholdertext" id="ep_homeAddressStreet">
                                        	<div>
                                        	<div class="form-group">                                                    
                                                <input type="text" value="<%=homeStreetExtra%>" data-name="0K-02" name="homeStreetExtra" maxlength="2048" placeholder=" Street 2" class="form-control ep_textinput inputplaceholdertext" id="ep_homeAddressStreet2">                                                    
                                        	</div>
                                        	<div class="form-group">                                                
                                                <input type="text" value="<%=homeNeighborhood%>" data-name="0Q-02" name="homeNeighborhood" maxlength="2048" placeholder=" Neighborhood" class="form-control ep_textinput inputplaceholdertext" id="ep_homeAddressNeighborhood">                                                
                                            </div>
                                            <div class="form-group">                                                    
                                                <input type="text" value="<%=homeCity%>" data-name="0L-02" name="homeCity" maxlength="2048" placeholder=" City" class="form-control ep_textinput inputplaceholdertext" id="ep_homeAddressCity">                                                    
                                            </div>
                                            <div class="form-group">                                                    
                                                <input type="text" value="<%=homeState%>" data-name="0M-02" name="homeState" maxlength="2048" placeholder=" State" class="form-control ep_textinput ep_stateinput inputplaceholdertext" id="ep_homeAddressState">
                                             </div>
                                             <div class="form-group">                              
                                                <input type="text" value="<%=homeZipCode%>" data-name="0P-02" name="homeZipCode" maxlength="2048" placeholder=" Zip Code" class="form-control ep_textinput ep_zipinput inputplaceholdertext" id="ep_homeAddressZip">                                                    
                                             </div>                                             
                                             <div class="form-group">                                                    
                                                <input type="text" value="<%=homeCountry%>" data-name="0N-02" name="homeCountry" maxlength="2048" placeholder=" Country" class="form-control ep_textinput inputplaceholdertext" id="ep_homeAddressCountry">                                                   
                                             </div>                                        	
                                        </div>                                        
                                    </div><!-- ep_fieldblock -->

                                    <div class="ep_fieldblock top-buffer">
                                        <label><strong>Formatted Home Address:</strong></label>
                                        <div class="form-group">
                                            <input type="text" value="<%=formattedHomeAddress%>" data-name="0Y-02" name="formattedHomeAddress" maxlength="2048" placeholder="Street1 Street2 Neighborhood City State ZipCode Country" class="form-control ep_textinput inputplaceholdertext ep_unsupported" id="ep_homeAddressFormatted" readonly="readonly">
                                        </div>
                                    </div><!-- ep_fieldblock -->

                                    <div class="ep_fieldblock top-buffer">
                                        <label><strong>Work Address:</strong></label>
                                        <div id="ep_workAddress">
                                        	<div class="form-group">                                                    
                                                <input type="text" value="<%=workStreet%>" data-name="0J-03" name="workStreet" maxlength="2048" placeholder=" Street 1" class="form-control ep_textinput inputplaceholdertext" id="ep_workAddressStreet">                                                   
                                            </div>
                                            <div class="form-group">                                                    
                                            	<input type="text" value="<%=workStreetExtra%>" data-name="0K-03" name="workStreetExtra" maxlength="2048" placeholder=" Street 2" class="form-control ep_textinput inputplaceholdertext" id="ep_workAddressStreet2">                                                    
                                            </div>
                                            <div class="form-group">                                            
                                            	<input type="text" value="<%=workNeighborhood%>" data-name="0Q-03" name="workNeighborhood" maxlength="2048" placeholder=" Neighborhood" class="form-control ep_textinput inputplaceholdertext" id="ep_workAddressNeighborhood">                                            
                                            </div>
                                            <div class="form-group">                                                    
                                                <input type="text" value="<%=workCity%>" data-name="0L-03" name="workCity" maxlength="2048" placeholder=" City" class="form-control ep_textinput inputplaceholdertext" id="ep_workAddressCity">                                                    
                                            </div>
                                            <div class="form-group">                                                    
                                                <input type="text" value="<%=workState%>" data-name="0M-03" name="workState" maxlength="2048" placeholder=" State" class="form-control ep_textinput ep_stateinput inputplaceholdertext" id="ep_workAddressState">
                                            </div>                                                            
                                            <div class="form-group">
                                                <input type="text" value="<%=workZipCode%>" data-name="0P-03" name="workZipCode" maxlength="2048" placeholder=" Zip Code" class="form-control ep_textinput ep_zipinput inputplaceholdertext" id="ep_workAddressZip">                                                    
                                            </div>                                                
                                            <div class="form-group">                                                    
                                                <input type="text" value="<%=workCountry%>" data-name="0N-03" name="workCountry" maxlength="2048" placeholder=" Country" class="form-control ep_textinput inputplaceholdertext" id="ep_workAddressCountry">                                                    
                                            </div>
                                        </div>
                                        
                                    </div><!-- ep_fieldblock -->

                                    <div class="ep_fieldblock top-buffer">
                                        <div class="form-group">
                                        	<label for="ep_workAddressFormatted"><strong>Formatted Work Address:</strong></label>                                        
                                        	<input type="text" value="<%=formattedWorkAddress%>" data-name="0Y-03" name="formattedWorkAddress" maxlength="2048" placeholder="Street1 Street2 Neighborhood City State ZipCode Country" class="form-control ep_textinput inputplaceholdertext ep_unsupported" id="ep_workAddressFormatted" readonly="readonly">                                        
                                        </div>
                                    </div><!-- ep_fieldblock -->

                                    <div class="ep_fieldblock top-buffer">
                                        <div class="form-group">
                                        	<label><strong>Notes:</strong></label>
                                        	<textarea data-name="0n-01" name="notes" class="form-control ep_textinput ep_textareaInput" id="ep_notes"><%=notes%></textarea>
                                        </div>
                                    </div><!-- ep_fieldblock -->

                                </div><!-- relativebuffer -->
                            </div><!-- end col 2 -->
                          </div>
                        </div>
                                                   
                          						  
                <div style="display: none;" id="ep_hidden"></div>
            </div>
			<div id="ep_column_3" class="col-xs-12 col-sm-4 col-md-4 col-lg-4">
                            <div class="ep_column">
                                <div class="ep_fieldblock">
                                    <label><strong>Email:</strong></label>                                    
                                    <div class="form-group">
                                    	<div id="ep_emails">
                                    		<!-- Populated dynamically -->
                                            <%=allEmails%>
                                    	</div>
                                    </div>
                                </div><!-- ep_fieldblock -->

                                <div class="ep_fieldblock top-buffer">
                                    <label><strong>IM:</strong></label>                                    
                                    <div class="form-group">
                                    	<div id="ep_ims">
                                    		<%=allIm%>
                                            <!-- Populated dynamically -->
                                    	</div>
                                    </div>                                    
                                </div><!-- ep_fieldblock -->

                                <div class="ep_fieldblock top-buffer">
                                    <label>Website URL:</label>                                   
                                    <div class="form-group">
                                    	<div id="ep_urls">
                                    		<!-- Populated dynamically -->
                                    		<%=allUrl%>                                            
                                    	</div>
                                    </div>                                    
                                </div><!-- ep_fieldblock -->

                                <div class="ep_fieldblock">
                                    <label>Organization Name:</label>
                                    <div id="ep_organization">
                                    	<div class="form-group">
                                    		<input value="<%=companyName%>" data-name="0H-01" name="companyName" type="text" maxlength="2048" class="form-control ep_textinput ep_longinput">
                                    	</div>
                                    </div>
                                    
                                    <label>Department:</label>                                    
                                    <div id="ep_department">
                                    	<div class="form-group">
                                    		<input value="<%=department%>" data-name="0b-01" name="department" type="text" maxlength="2048" class="form-control ep_textinput ep_longinput">
                                    	</div>
                                    </div>                                    
                                    
                                                                       
                                    <div  id="ep_jobtitle">
                                    	<div class="form-group">
                                    		<label>Position:</label>
                                    		<input value="<%=position%>" data-name="0I-01" name="position" type="text" maxlength="2048" class="form-control ep_textinput ep_longinput">
                                    	</div>
                                    </div>                                   
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
											<div id="ep_endpointselect" class="checkbox">
											  <label>
											    <input type="checkbox" id="ep_endpointselect_input_0" checked="checked" name="pendingCreate" endpointid="0">
											    <%if(endpointName==""){%>Unknown Device<%}else{%><%=endpointName%><%}%>
											  </label>
											</div>                                        
                                    </div>
                                    <br>
                                </div>
                            </div>
						</div>
            <div style="text-align: left;" id="ep_debugRecordOutput"></div>

        </div>
    </form>
</script>
<!-- Add edit contact end -->

<script type="text/template" id="contacts_list_template">
	<li class="rt_row <%= elStyle %>" id="<%= elId %>" uid="<%= id %>">
		<!--<div rt_checkboxcolumn="" col="0" style="left: 0%; width: 11%;*width:auto;" class="rt_column">
			<input class="rt_rowcheckbox" style="z-index: 2" type="checkbox" uid="<%= itemUid %>">
		</div>-->
		<div col="1" class="rt_column rt_column_name"><%=fullName%></div>
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
	</li>		
</script>

<script type="text/template" id="contact_details_template">
<div class="details_contact" style="display: block;">
	<div class="details_header" style="display: block;">
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
		<img class="close close_conatct_details" src="../img/btn_close.png" style="opacity:1"/>
		<!-- <div class="details_toptwo"></div> -->
	</div>
	<!--
	<div class="details_buttonholder" style="display: block;">
	    <ul>
	    	<li class="button details_editbutton edit_contact_button details_button standard_button report_event"  id="contact_edit_btn" style="display:none;>
	    		<p class="oneline" id="contact_edit_btn">Edit Contact</p>
	   		</li>
	    	<li class="button details_removefromdevicebutton details_button standard_button report_event" id="contact_removefrmdevice_btn" style="<%= buttonStyles.removeFromDevice%>">
	    		<p>Remove <span class="hidden-xs"><br></span>From Phone</p>
	    	</li>
	    	<li class="details_addtodevicebutton details_button standard_button report_event" id="contact_addtodevice_btn" style="<%= buttonStyles.addToDevice%>">
	    		<p>Add Contact <span class="hidden-xs"><br></span>To My Phone</p>
	    	</li>
	    	<li class="button details_deletebutton details_button standard_button report_event" id="contact_delete_btn" uid="<%=id%>" style="<%= buttonStyles.trash%>">
	    		<p>Delete From <span class="hidden-xs"><br></span>Phone &amp; Web</p>
	    	</li>
	    	<li class="details_undeletebutton details_button standard_button report_event" id="restore_contact_btn" uid="<%=id%>" style="<%= buttonStyles.restore%>">
	    		<p class="oneline" id="restore_contact_btn">Restore Contact</p>
	    	</li>
	    	<li class="details_deletefromtrashbutton details_button standard_button report_event" id="delete_contact_btn" uid="<%=id%>" style="<%= buttonStyles.permanentDelete%>">
	    		<p class="oneline" id="delete_contact_btn">Permanently Delete Contact</p>
	    	</li>
	    </ul>
	</div>
	-->	
	<div class="btn-group btn-group-justified">
    	<a class="btn btn-primary details_removefromdevicebutton details_button standard_button report_event" id="contact_removefrmdevice_btn" style="<%= buttonStyles.removeFromDevice%>">
    		Remove From Phone
    	</a>
    	<a class="btn btn-primary details_addtodevicebutton details_button standard_button report_event" id="contact_addtodevice_btn" style="<%= buttonStyles.addToDevice%>">
    		Add Contact To My Phone
    	</a>
    	<a class="btn btn-primary details_deletebutton details_button standard_button report_event" id="contact_delete_btn" uid="<%=id%>" style="<%= buttonStyles.trash%>">
    		Delete From Phone &amp; Web
    	</a>
    	<a class="btn btn-primary details_undeletebutton details_button standard_button report_event" id="restore_contact_btn" uid="<%=id%>" style="<%= buttonStyles.restore%>">
    		Restore Contact
    	</a>
    	<a class="btn btn-primary details_deletefromtrashbutton details_button standard_button report_event" id="delete_contact_btn" uid="<%=id%>" style="<%= buttonStyles.permanentDelete%>">
    		Permanently Delete Contact
    	</a>
	</div>	
	<div class="contacts_vertical_scroll" id="contacts_scroll_area col-sm-12 col-md-12 col-lg-12">
		<div class="contact_note">
			Fields colored gray are not supported by your phone.
		</div>

        <div class="details_contactinfotitle details_title left col-sm-4 col-md-4 col-lg-4" style="">Contact Info</div>

        <div class="details_contactinfo details_infobox contacts_details_infobox" style="">
            <div class="<%=im.myClass%> details_lineitem col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div class="lineitem_key left  col-xs-4 col-sm-4 col-md-3 col-lg-4">Im</div>
                <div class="lineitem_key left col-xs-8 col-sm-8 col-md-9 col-lg-8" style=" text-align:left; padding-left:10px;"><%=im.allIn%></div>
            </div>
            <div class="<%=imAIM.myClass%> details_lineitem col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div class="lineitem_key left  col-xs-4 col-sm-4 col-md-3 col-lg-4">Im A I M</div>
                <div class="lineitem_key left col-xs-8 col-sm-8 col-md-9 col-lg-8" style=" text-align:left; padding-left:10px;"><%=imAIM.allIn%></div>
            </div>
            <div class="<%=imGTalk.myClass%> details_lineitem col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div class="lineitem_key left  col-xs-4 col-sm-4 col-md-3 col-lg-4">Im G Talk</div>
                <div class="lineitem_key left col-xs-8 col-sm-8 col-md-9 col-lg-8" style=" text-align:left; padding-left:10px;"><%=imGTalk.allIn%></div>
            </div>
            <div class="<%=imICQ.myClass%> details_lineitem col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div class="lineitem_key left  col-xs-4 col-sm-4 col-md-3 col-lg-4">Im I C Q</div>
                <div class="lineitem_key left col-xs-8 col-sm-8 col-md-9 col-lg-8" style=" text-align:left; padding-left:10px;"><%=imICQ.allIn%></div>
            </div>
            <div class="<%=imJabber.myClass%> details_lineitem col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div class="lineitem_key left  col-xs-4 col-sm-4 col-md-3 col-lg-4">Im Jabber</div>
                <div class="lineitem_key left col-xs-8 col-sm-8 col-md-9 col-lg-8" style=" text-align:left; padding-left:10px;"><%=imJabber.allIn%></div>
            </div>
            <div class="<%=imQQ.myClass%> details_lineitem col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div class="lineitem_key left  col-xs-4 col-sm-4 col-md-3 col-lg-4">Im Q Q</div>
                <div class="lineitem_key left col-xs-8 col-sm-8 col-md-9 col-lg-8" style=" text-align:left; padding-left:10px;"><%=imQQ.allIn%></div>
            </div>
            <div class="<%=imSkype.myClass%> details_lineitem col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div class="lineitem_key left  col-xs-4 col-sm-4 col-md-3 col-lg-4">Im Skype</div>
                <div class="lineitem_key left col-xs-8 col-sm-8 col-md-9 col-lg-8" style=" text-align:left; padding-left:10px;"><%=imSkype.allIn%></div>
            </div>
            <div class="<%=imWindowsLive.myClass%> details_lineitem col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div class="lineitem_key left  col-xs-4 col-sm-4 col-md-3 col-lg-4">Im Windows Live</div>
                <div class="lineitem_key left col-xs-8 col-sm-8 col-md-9 col-lg-8" style=" text-align:left; padding-left:10px;"><%=imWindowsLive.allIn%></div>
            </div>
            <div class="<%=imYahoo.myClass%> details_lineitem col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div class="lineitem_key left  col-xs-4 col-sm-4 col-md-3 col-lg-4">Im Yahoo</div>
                <div class="lineitem_key left col-xs-8 col-sm-8 col-md-9 col-lg-8" style=" text-align:left; padding-left:10px;"><%=imYahoo.allIn%></div>
            </div>
            <div class="<%=imOther.myClass%> details_lineitem col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div class="lineitem_key left  col-xs-4 col-sm-4 col-md-3 col-lg-4">Im Other</div>
                <div class="lineitem_key left col-xs-8 col-sm-8 col-md-9 col-lg-8" style=" text-align:left; padding-left:10px;"><%=imOther.allIn%></div>
            </div>
            <div class="<%=imOther2.myClass%> details_lineitem col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div class="lineitem_key left  col-xs-4 col-sm-4 col-md-3 col-lg-4">Im Other2</div>
                <div class="lineitem_key left col-xs-8 col-sm-8 col-md-9 col-lg-8" style=" text-align:left; padding-left:10px;"><%=imOther2.allIn%></div>
            </div>
            <div class="<%=imOther1.myClass%> details_lineitem col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div class="lineitem_key left  col-xs-4 col-sm-4 col-md-3 col-lg-4">Im Other1</div>
                <div class="lineitem_key left col-xs-8 col-sm-8 col-md-9 col-lg-8" style=" text-align:left; padding-left:10px;"><%=imOther1.allIn%></div>
            </div>
            <div class="<%=mobilePhone.myClass%> details_lineitem col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div class="lineitem_key left  col-xs-4 col-sm-4 col-md-4 col-lg-4">Mobile Phone</div>
                <div class="lineitem_key left col-xs-8 col-sm-8 col-md-8 col-lg-8" style=" text-align:left; padding-left:10px;"><%=mobilePhone.allIn%></div>
            </div>
            <div class="<%=workPhone.myClass%> details_lineitem col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div class="lineitem_key left  col-xs-4 col-sm-4 col-md-4 col-lg-4">Work Phone</div>
                <div class="lineitem_key left col-xs-8 col-sm-8 col-md-8 col-lg-8" style=" text-align:left; padding-left:10px;"><%=workPhone.allIn%></div>
            </div>
            <div class="<%=homePhone.myClass%> details_lineitem col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div class="lineitem_key left  col-xs-4 col-sm-4 col-md-4 col-lg-4">Home Phone</div>
                <div class="lineitem_key left col-xs-8 col-sm-8 col-md-8 col-lg-8" style=" text-align:left; padding-left:10px;"><%=homePhone.allIn%></div>
            </div>
            <div class="<%=fax.myClass%> details_lineitem col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div class="lineitem_key left  col-xs-4 col-sm-4 col-md-4 col-lg-4">Fax</div>
                <div class="lineitem_key left col-xs-8 col-sm-8 col-md-8 col-lg-8" style=" text-align:left; padding-left:10px;"><%=fax.allIn%></div>
            </div>
            <div class="<%=homeFax.myClass%> details_lineitem col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div class="lineitem_key left  col-xs-4 col-sm-4 col-md-3 col-lg-4">Home Fax</div>
                <div class="lineitem_key left col-xs-8 col-sm-8 col-md-9 col-lg-8" style=" text-align:left; padding-left:10px;"><%=homeFax.allIn%></div>
            </div>
            <div class="<%=workFax.myClass%> details_lineitem col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div class="lineitem_key left  col-xs-4 col-sm-4 col-md-3 col-lg-4">Work Fax</div>
                <div class="lineitem_key left col-xs-8 col-sm-8 col-md-9 col-lg-8" style=" text-align:left; padding-left:10px;"><%=workFax.allIn%></div>
            </div>
            <div class="<%=pager.myClass%> details_lineitem col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div class="lineitem_key left  col-xs-4 col-sm-4 col-md-3 col-lg-4">Pager</div>
                <div class="lineitem_key left col-xs-8 col-sm-8 col-md-9 col-lg-8" style=" text-align:left; padding-left:10px;"><%=pager.allIn%></div>
            </div>
            <div class="<%=email.myClass%> details_lineitem col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div class="lineitem_key left  col-xs-4 col-sm-4 col-md-3 col-lg-4">Email</div>
                <div class="lineitem_key left col-xs-8 col-sm-8 col-md-9 col-lg-8" style=" text-align:left; padding-left:10px;"><%=email.allIn%></div>
            </div>
            <div class="<%=homeEmail.myClass%> details_lineitem col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div class="lineitem_key left  col-xs-4 col-sm-4 col-md-3 col-lg-4">Home Email</div>
                <div class="lineitem_key left col-xs-8 col-sm-5 col-md-9 col-lg-8" style=" text-align:left; padding-left:10px;"><%=homeEmail.allIn%></div>
            </div>
            <div class="<%=localEmail.myClass%> details_lineitem col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div class="lineitem_key left  col-xs-4 col-sm-4 col-md-3 col-lg-4">Local Email</div>
                <div class="lineitem_key left col-xs-8 col-sm-8 col-md-9 col-lg-8" style=" text-align:left; padding-left:10px;"><%=localEmail.allIn%></div>
            </div>
            <div class="<%=otherEmail.myClass%> details_lineitem col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div class="lineitem_key left  col-xs-4 col-sm-4 col-md-3 col-lg-4">Other Email</div>
                <div class="lineitem_key left col-xs-8 col-sm-8 col-md-9 col-lg-8" style=" text-align:left; padding-left:10px;"><%=otherEmail.allIn%></div>
            </div>
            <div class="<%=workEmail.myClass%> details_lineitem col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div class="lineitem_key left  col-xs-4 col-sm-4 col-md-3 col-lg-4">Work Email</div>
                <div class="lineitem_key left col-xs-8 col-sm-8 col-md-9 col-lg-8" style=" text-align:left; padding-left:10px;"><%=workEmail.allIn%></div>
            </div>
            <div class="<%=otherPhone.myClass%> details_lineitem col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div class="lineitem_key left  col-xs-4 col-sm-4 col-md-3 col-lg-4">Other Phone</div>
                <div class="lineitem_key left col-xs-8 col-sm-8 col-md-9 col-lg-8" style=" text-align:left; padding-left:10px;"><%=otherPhone.allIn%></div>
            </div>
            <div class="<%=carPhone.myClass%> details_lineitem col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div class="lineitem_key left  col-xs-4 col-sm-4 col-md-3 col-lg-4">Car Phone</div>
                <div class="lineitem_key left col-xs-8 col-sm-8 col-md-9 col-lg-8" style=" text-align:left; padding-left:10px;"><%=carPhone.allIn%></div>
            </div>
            <div class="<%=radioPhone.myClass%> details_lineitem col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div class="lineitem_key left  col-xs-4 col-sm-4 col-md-3 col-lg-4">Radio Phone</div>
                <div class="lineitem_key left col-xs-8 col-sm-8 col-md-9 col-lg-8" style=" text-align:left; padding-left:10px;"><%=radioPhone.allIn%></div>
            </div>
            <div class="<%=localPhone.myClass%> details_lineitem col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div class="lineitem_key left  col-xs-4 col-sm-4 col-md-3 col-lg-4">Local Phone</div>
                <div class="lineitem_key left col-xs-8 col-sm-8 col-md-9 col-lg-8" style=" text-align:left; padding-left:10px;"><%=localPhone.allIn%></div>
            </div>
            <div class="<%=assistantPhone.myClass%> details_lineitem col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div class="lineitem_key left  col-xs-4 col-sm-4 col-md-3 col-lg-4">Assistant Phone</div>
                <div class="lineitem_key left col-xs-8 col-sm-8 col-md-9 col-lg-8" style=" text-align:left; padding-left:10px;"><%=assistantPhone.allIn%></div>
            </div>
            <div class="<%=iPhone.myClass%> details_lineitem col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div class="lineitem_key left  col-xs-4 col-sm-4 col-md-3 col-lg-4">I Phone</div>
                <div class="lineitem_key left col-xs-8 col-sm-8 col-md-9 col-lg-8" style=" text-align:left; padding-left:10px;"><%=iPhone.allIn%></div>
            </div>
			<br>
        </div>
            <div class="<%= formattedHomeAddress.elClass%> details_lineitem col-xs-12 col-sm-12 col-md-12 col-lg-12" style="display:<%= formattedHomeAddress.display%>">
                <div class="lineitem_key left  col-xs-4 col-sm-4 col-md-3 col-lg-4">Home Address:</div>
                <div class="<%= formattedHomeAddress.valueClass%> lineitem_key col-xs-8 col-sm-8 col-md-9 col-lg-8" style="padding-left:10px;"><%= formattedHomeAddress.value%></div>
            </div>

		<% if ( formattedWorkAddress.value || companyName.value || position.value || department.value){ %>
		    <div class="details_formattedworkaddresstitle details_title col-xs-12 col-sm-12 col-md-12 col-lg-12">
        	    Work Info &amp; Address
        	</div>
		<% } %>

        <div class="details_formattedworkaddress details_infobox contacts_details_infobox">
			<div class="<%= companyName.elClass%> col-xs-12 col-sm-12 col-md-12 col-lg-12" style="display:<%= companyName.display%>">
				<div class="lineitem_key left col-xs-4 col-sm-4 col-md-3 col-lg-4" >Organization:</div>
				<div class="<%= companyName.valueClass%> col-xs-8 col-sm-8 col-md-9 col-lg-8" ><%= companyName.value%></div>
			</div>
			<div class="<%= position.elClass%> col-xs-12 col-sm-12 col-md-12 col-lg-12" style="display:<%= position.display%>">
				<div class="lineitem_key left  col-xs-4 col-sm-4 col-md-3 col-lg-4" >Job Title:</div>
				<div class="<%= position.valueClass%> col-xs-8 col-sm-8 col-md-9 col-lg-8" ><%= position.value%></div>
			</div>
			<div class="<%= department.elClass%> col-xs-12 col-sm-12 col-md-12 col-lg-12" style="display:<%= department.display%>">
				<div class="lineitem_key left  col-xs-4 col-sm-4 col-md-3 col-lg-4" >Department:</div>
				<div class="<%= department.valueClass%> col-xs-8 col-sm-8 col-md-9 col-lg-8" ><%= department.value%></div>
			</div>
			<div class="<%= formattedWorkAddress.elClass%> col-xs-12 col-sm-12 col-md-12 col-lg-12" style="display:<%= formattedWorkAddress.display%>">
				<div class="lineitem_key left  col-xs-4 col-sm-4 col-md-3 col-lg-4" >Work Address:</div>
				<div class="<%= formattedWorkAddress.valueClass%> col-xs-8 col-sm-8 col-md-9 col-lg-8" ><%= formattedWorkAddress.value%></div>
			</div>
           	<br>
       	</div>

        <div class="details_formattedotheraddresstitle details_title" style="display: none;">
            Other Address
        </div>

        <div class="details_formattedotheraddress details_infobox contacts_details_infobox" style="display: none;">
            <div class="<%= formattedOtherAddress.elClass%>" style="display:<%= formattedOtherAddress.display%>">
				<div class="lineitem_key left  col-xs-4 col-sm-4 col-md-3 col-lg-4" >Address:</div>
				<div class="<%= formattedOtherAddress.valueClass%>" ><%= formattedOtherAddress.value%></div>
			</div>
            <br>
        </div>

		<div class="details_formattedcustomaddress details_infobox contacts_details_infobox" style="display: none;">
            <div class="<%= formattedLocalAddress.elClass%>" style="display:<%= formattedLocalAddress.display%>">
				<div class="lineitem_key left  col-xs-4 col-sm-4 col-md-3 col-lg-4" >Address:</div>
				<div class="<%= formattedLocalAddress.valueClass%>" ><%= formattedLocalAddress.value%></div>
			</div>
            <br>
        </div>

		<% if ( nickName.value || url.myClass != "hidden" || webSiteUrl.myClass != "hidden" || homeUrl.myClass != "hidden" || otherUrl.myClass != "hidden" || preferredUrl.myClass != "hidden" || birthday.value || notes.value || relationship.value){ %>
        	<div class="details_othertitle details_title col-xs-12 col-sm-12 col-md-12 col-lg-12">
            	Other
        	</div>
		<% } %>

        <div class="details_other details_infobox contacts_details_infobox">
			<div class="<%= nickName.elClass%> col-xs-12 col-sm-12 col-md-12 col-lg-12" style="display:<%= nickName.display%>">
				<div class="lineitem_key left  col-xs-4 col-sm-4 col-md-3 col-lg-4" >Nickname:</div>
				<div class="<%= nickName.valueClass%> col-xs-8 col-sm-8 col-md-9 col-lg-8" ><%= nickName.value%></div>
			</div>
			<div class="<%= relationship.elClass%>" style="display:<%= relationship.display%>">
				<div class="lineitem_key left  col-xs-4 col-sm-4 col-md-3 col-lg-4" >Relationship:</div>
				<div class="<%= relationship.valueClass%>  col-sm-8 col-md-9 col-lg-8" ><%= relationship.value%></div>
			</div>

            <div class="<%=webSiteUrl.myClass%> details_lineitem col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div class="lineitem_key left  col-xs-4 col-sm-4 col-md-3 col-lg-4" >Web Site Url</div>
                <div class="lineitem_key left col-xs-8 col-sm-8 col-md-9 col-lg-8" style="; text-align:left;"><%=webSiteUrl.allIn%></div>
            </div>
            <div class="<%=preferredUrl.myClass%> details_lineitem col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div class="lineitem_key left  col-xs-4 col-sm-4 col-md-3 col-lg-4" >Preferred Url</div>
                <div class="lineitem_key left col-xs-8 col-sm-8 col-md-9 col-lg-8" style="; text-align:left; padding-left:10px;"><%=preferredUrl.allIn%></div>
            </div>
            <div class="<%=homeUrl.myClass%> details_lineitem col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div class="lineitem_key left  col-xs-4 col-sm-4 col-md-3 col-lg-4" >Home Url</div>
                <div class="lineitem_key left col-xs-8 col-sm-8 col-md-9 col-lg-8" style="; text-align:left; padding-left:10px;"><%=homeUrl.allIn%></div>
            </div>
            <div class="<%=otherUrl.myClass%> details_lineitem  col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div class="lineitem_key left  col-xs-4 col-sm-4 col-md-3 col-lg-4" >Other Url</div>
                <div class="lineitem_key left col-xs-8 col-sm-8 col-md-9 col-lg-8" style="; text-align:left; padding-left:10px;"><%=otherUrl.allIn%></div>
            </div>
            <div class="<%=workUrl.myClass%> details_lineitem col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div class="lineitem_key left  col-xs-4 col-sm-4 col-md-3 col-lg-4" >Work Url</div>
                <div class="lineitem_key left col-xs-8 col-sm-8 col-md-9 col-lg-8" style="; text-align:left; padding-left:10px;"><%=workUrl.allIn%></div>
            </div>
            <div class="<%=url.myClass%> details_lineitem col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div class="lineitem_key left  col-xs-4 col-sm-4 col-md-3 col-lg-4" >Url</div>
                <div class="lineitem_key left col-xs-8 col-sm-8 col-md-9 col-lg-8" style="; text-align:left; padding-left:10px;"><%=url.allIn%></div>
            </div>





			<div class="<%= birthday.elClass%> col-xs-12 col-sm-12 col-md-12 col-lg-12" style="display:<%= birthday.display%>">
				<div class="lineitem_key left  col-xs-4 col-sm-4 col-md-3 col-lg-4" >Birthday:</div>
				<div class="<%= birthday.valueClass%> col-xs-8  col-sm-8 col-md-9 col-lg-8" ><%= birthday.value%></div>
			</div>
			<div class="<%= notes.elClass%> col-xs-12 col-sm-12 col-md-12 col-lg-12" style="display:<%= notes.display%>">
				<div class="lineitem_key left  col-xs-4 col-sm-4 col-md-3 col-lg-4" >Notes:</div>
				<div class="<%= notes.valueClass%> col-xs-8  col-sm-8 col-md-9 col-lg-8" ><%= notes.value%></div>
			</div>
            <br>
		</div>
	</div>
</div>
</script>
<!-- end contact_details_template -->