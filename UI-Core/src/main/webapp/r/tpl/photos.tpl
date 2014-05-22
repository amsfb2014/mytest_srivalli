<script type="text/template" id="data_photos_template" class="template">
    <div class="hidden-md hidden-lg hidden-sm toggle-submenu">
        <a class="submenu-show" data-toggle="modal" data-target="#data-menu-tab-sm-full">
            <span class="submenu-left"></span>
            Photos
        </a>
    </div>
    <div id="" class="col-md-3 col-lg-3 hidden-sm hidden-xs hidden-md hidden-lg">
        <div id="record_breakdown" class="console record_breakdown record_breakdown_top" style="">
            <h4 class="side_title">Photo Breakdown<span class="toggle"></span></h4>
            <div class="record_breakdown_spinner">
                <span class="progressing"></span>
            </div>
            <ul class="recordContent" id="data_photos_breakdown">
                <li class="syncedwithphone item"><span class="syncedwithphone_val">0</span>&nbsp;Photos synced with your phone</li>
                <li class="savedonweb item"><span class="savedonweb_val">0</span>&nbsp;Photos saved on the web</li>
                <li class="tobesynced item"><span class="tobesynced_val">0</span>&nbsp;Photos will be updated during the next sync</li>
            </ul>
        </div>
        <div class="console sync_settings">
            <h4 class="side_title">Auto Sync Settings<span class="toggle"></span></h4>
            <div id="photos_settings_summary_placeholder"  class="hidden">
                    <span class="progressing"></span>
            </div>
            <ul class="link">
                <li class="link">
                    <a class="link_text report_event" href="javascript:;" id="sync_settings">
                        <span class="ios">View</span><span class="non-ios">Edit</span> Sync Settings
                    </a>
                </li>
            </ul>
        </div>
        <div class="transfer_data_instruction console transferdata" style="display: none;">
            <div class="mc_title">
                Transfer Data
                <span class="toggle"></span>
            </div>
            <ul class="transferdetails content">
                <li class="link">
                    <a class="link_text report_event transfer_data_view_instruction" href="javascript:void(0);" id="">View Instruction</a>
                </li>
            </ul>
        </div>
    </div>

    <div id="" class="list_bordered col-md-4 col-lg-4 col-sm-3 col-xs-12">
        <div class="hidden">
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

        <div id="photos_list_view" class="scroll-tricks scrollable">
            <div id="ct_rowbox" class="rt_rowbox" batchnumber="0">
                <div id="data_photos_list" class="scroll-gesture">
                    <div style="progressing"></div>
                </div>
            </div>
        </div>
    </div>
    <div id="photos_details_view" class="details_bordered col-md-8 col-lg-8 col-sm-9 hidden-xs">
        <div class="progressing">Loading Data</div>
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
        <a href="<%= thumbnailUrl %>" class="thumb_items col-xs-4 col-md-12 col-sm-12 col-lg-12" data-id="<%= id %>" id="ct_row_<%= id %>" uid="<%= id %>"  data-gallery="#blueimp-gallery-photos">
            <span class="thumb_container thumbnail" >
                <img src="<%= thumbnailUrl %>" data-src="<%=thumbnailUrl %>" alt="<%= id %>">
            </span>
        </a>
</script>

<script type="text/template" id="photos_blank_list_template" class="template">
        <a href="#" class="thumb_items col-xs-12 col-md-12 col-sm-12 col-lg-12">
            <span class="thumb_container thumb_blank_container thumbnail" >
                No Photos to display.
            </span>
        </a>
</script>
<script type="text/template" id="photos_blank_details_template" class="template">
    <div class="details_image blank_container">
        <div class="details_filepicture">
            No Photos to display.
        </div>
    </div>
</script>

<script type="text/template" id="photo_details_template" class="template">
    <div class="modal-header"> <!--%=fileName% -->
        <button type="button" class="close" aria-hidden="true">&times;</button>
        <h4 class="modal-title"></h4>
    </div>
    <div class="details_image">
        <div class="btn-group btn-group-justified <%=onTrash%>">
<!--
            <a class="btn btn-primary btn-default  <%=onTrash%> btn_downloadphoto details_button standard_button report_event" id="view_photo_btn" uid="<%=id%>" role="button">Download Photo</a>
-->
            <a class="btn btn-primary btn-default btn_removefromphone <%=statueText.removeFromPhone%> details_button standard_button report_event" id="remove_photo_btn" uid="<%=id%>" role="button">Remove From Phone</a>
            <a class="btn btn-primary btn-default btn_addtophone <%=statueText.addToPhone%> details_button standard_button report_event" id="remove_photo_btn" uid="<%=id%>" role="button">Add to Phone</a>
            <a class="btn btn-primary btn-default btn_deletephoto details_button standard_button report_event" id="delete_photo_btn" uid="<%=id%>" role="button">Delete From Phone &amp; Web</a>
        </div>
        <div class="btn-group btn-group-justified <%=notOnTrash%>">
            <!--<a class="btn btn-primary btn-default btn_downloadphoto details_button standard_button report_event" id="view_photo_btn" uid="<%=id%>" role="button">Download Photo</a>-->
            <a class="btn btn-primary btn-default details_undeletebutton details_button standard_button report_event " id="restore_photo_btn" uid="<%=id%>" role="button">Restore Photo</a>
            <a class="btn btn-primary btn-default details_deletefromtrashbutton details_button standard_button report_event" id="permanent_delete_photo_btn" uid="<%=id%>" role="button">Permanently Delete Photo</a>
        </div>

        <div class="details_filepicture ">
            <img border="0" align="middle" src="<%=mediaUrl%>" class="thumbnail">
        </div>
        <div class="col-md-12 col-sm-12 col-lg-12">
            <div class="pull-left">
                <strong>File Size</strong><br>
                <span class="details_filesize"><%=fileSizeInBytes%></span>
            </div>
			<div class="fbshare"><img src="/web/r/img/fbshare.png"></img><p class="fbsharestatus"> </p></div>
			<div class="dropboxSave"><a class="dropbox-saver dropbox-dropin-btn dropbox-dropin-default"><span class="dropin-btn-status"></span>Save to Dropbox</a></div>
				
            <div class="pull-right">
                <strong>Status</strong><br>

                <span class="details_status <%=statueText.addSync%>">Added on next Sync.</span>
                <span class="details_status <%=statueText.deleteSync%>">Removed on next Sync.</span>
                <span class="details_status <%=statueText.webOnly%>">Web Only</span>
                <span class="details_status <%=statueText.onDevice%>">On Device</span>
            </div>
        </div>
    </div>
</script>


<script type="text/template" id="blueimp-gallery-photos_template" class="template">
    <div id="blueimp-gallery-photos" data-useBootstrapModal="false" useBootstrapModal="false" class="hidden hidden-sm hidden-md hidden-lg blueimp-gallery ">
        <!-- The container for the modal slides -->
        <div class="slides"></div>
        <!-- Controls for the borderless lightbox -->
        <h3 class="title"></h3>
        <a class="close">×</a>
        <a class="play-pause">dsad</a>
        <div class="modal fade hidden">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" aria-hidden="true">&times;</button>
                        <h4 class="modal-title"></h4>
                    </div>
                    <div class="modal-body next"></div>
                </div>
            </div>
        </div>
    </div>
</script>
