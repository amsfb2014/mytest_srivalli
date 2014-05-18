<script type="text/template" id="data_videos_template" class="template">
    <div class="hidden-md hidden-lg hidden-sm toggle-submenu">
        <a class="submenu-show" data-toggle="modal" data-target="#data-menu-tab-sm-full">
            <span class="submenu-left"></span>
            Videos
        </a>
    </div>
    <div id="" class="col-md-3 col-lg-3 hidden-sm hidden-xs hidden-md hidden-lg">
        <div id="record_breakdown" class="console record_breakdown record_breakdown_top" style="">
            <h4 class="side_title">Video Breakdown<span class="toggle"></span></h4>
            <ul class="recordContent" id="data_videos_breakdown">
                <li class="syncedwithphone item"><span class="syncedwithphone_val">0</span>&nbsp;Videos synced with your phone</li>
                <li class="savedonweb item"><span class="savedonweb_val">0</span>&nbsp;Videos saved on the web</li>
                <li class="tobesynced item"><span class="tobesynced_val">0</span>&nbsp;Videos will be updated during the next sync</li>
            </ul>
        </div>

        <div class="console sync_settings">
            <h4 class="side_title">Auto Sync Settings<span class="toggle"></span></h4>
            <ul class="link">
                <li>
                    <a class="link_text report_event" href="javascript:;" id="sync_settings">
                        <span class="ios">View</span><span class="non-ios">Edit</span> Sync Settings
                    </a>
                </li>
            </ul>
        </div>

        <div class="console transferdata transfer_data_instruction">
            <h4 class="side_title">Transfer Data<span class="toggle"></span></h4>
            <div id="videos_settings_summary_placeholder" class="hidden">
                <div style="progressing"></div>
            </div>
            <ul class="transferdetails content">
                <li class="link">
                    <a class="link_text report_event transfer_data_view_instruction" href="javascript:void(0);" id="">View Instruction</a>
                </li>
            </ul>
        </div>
    </div>
    <div id="" class="list_bordered col-md-4 col-lg-4 col-sm-3 col-xs-12" style="display: block;">
        <div id="commands_search" style="display: none;">
            <input type="text" id="commands_searchinput" class="commands_searchplaceholder inputplaceholdertext" onkeyup="Interface.contactsTable.searchFilterChanged();" value="Search" placeholder="Search" onfocus="Jebber.placeholderFields.placeholderTextOnFocus(this);" onblur="Jebber.placeholderFields.placeholderTextOnBlur(this);" tabindex="1">
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
        </div>

        <div id="videoss_list_view" class="scroll-tricks scrollable">
            <div id="ct_rowbox" class="rt_rowbox" batchnumber="0">
                <div id="data_videos_list">
                    <div id="data_photos_list">
                        <div style="progressing"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="video_details_view" class="details_bordered col-md-8 col-lg-8 col-sm-9 hidden-xs">
        <div id="ct_rowbox" class="rt_rowbox" batchnumber="0">
            <div id="data_photos_list">
                <div class="progressing">Loading Data</div>
            </div>
						<div class="fb-share-button" data-href="https://developers.facebook.com/docs/plugins/" data-width="30px" data-type="button"></div>

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
    <a href="<%= thumbnailUrl %>" class="thumb_items col-xs-4 col-md-12 col-sm-12 col-lg-12" data-id="<%= id %>" id="ct_row_<%= id %>" uid="<%= id %>"  data-gallery="#blueimp-gallery-videos">
            <span class="thumb_container thumbnail" >
                <img src="<%= thumbnailUrl %>" data-src="<%= thumbnailUrl %>" alt="<%= id %>">
            </span>
    </a>
</script>

<script type="text/template" id="videos_blank_list_template" class="template">
    <a href="#" class="thumb_items col-xs-12 col-md-12 col-sm-12 col-lg-12">
        <span class="thumb_container thumb_blank_container thumbnail" >
            No Video to display.
        </span>
    </a>
</script>
<script type="text/template" id="videos_blank_details_template" class="template">
    <div class="details_image blank_container">
        <div class="details_filepicture">
            No Video to display.
        </div>
    </div>
</script>


<script type="text/template" id="video_details_template" class="template">
    <div class="details_image">
        <div class="btn-group btn-group-justified <%=onTrash%>">
            <a class="btn btn-primary btn-default btn_downloadvideo details_button standard_button report_event" id="view_photo_btn" uid="<%=id%>" role="button">Download Video</a>
            <a class="btn btn-primary btn-default btn_removefromphone <%=statueText.removeFromPhone%> details_button standard_button report_event" id="remove_photo_btn" uid="<%=id%>" role="button">Remove From Phone</a>
            <a class="btn btn-primary btn-default btn_addtophone <%=statueText.addToPhone%> details_button standard_button report_event" id="remove_photo_btn" uid="<%=id%>" role="button">Add to Phone</a>
            <a class="btn btn-primary btn-default btn_deletevideo details_button standard_button report_event" id="delete_photo_btn" uid="<%=id%>" role="button">Delete From Phone &amp; Web</a>
        </div>

        <div class="btn-group btn-group-justified <%=notOnTrash%>">
            <a class="btn btn-primary btn-default btn_downloadvideo details_button standard_button report_event" id="view_photo_btn" uid="<%=id%>" role="button">Download Video</a>
            <a class="btn btn-primary btn-default details_undeletebutton details_button standard_button report_event" id="restore_photo_btn" uid="<%=id%>" role="button">Restore Video</a>
            <a class="btn btn-primary btn-default details_deletefromtrashbutton details_button standard_button report_event" id="delete_photo_btn" uid="<%=id%>" role="button">Permanently Delete Video</a>
        </div>

        <div class="details_filepicture video-thumbnail ">
            <img border="0" align="middle" src="<%=thumbnailUrl%>" class="thumbnail" />
        </div>
        <div class="col-md-12 col-sm-12 col-lg-12">
            <div class="pull-left">
                <strong>File Size</strong><br>
                <span class="details_filesize"><%=fileSizeInBytes%> </span>
            </div>

            <div class="pull-right">
                <strong>Status</strong><br>

                <span class="details_status <%=statueText.addSync%>">Added on next Sync.</span>
                <span class="details_status <%=statueText.deleteSync%>">Deleted on next Sync.</span>
                <span class="details_status <%=statueText.webOnly%>">Web Only</span>
                <span class="details_status <%=statueText.onDevice%>">On Device</span>
            </div>
        </div>
    </div>
</script>
<script  type="text/template" id="video_player_template">
    <div class="player-container">
        <object classid="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B" codebase="http://www.apple.com/qtactivex/qtplugin.cab" height="auto" width="100%">
            <param name="src" value="<%=mediaUrl%>&fileName=<%=fileName%>">
            <param name="autoplay" value="true">
            <param name="type" value="<%=fileType%>">
            <param name="wmode" value="transparent">
            <embed src="<%=mediaUrl%>&fileName=<%=fileName%>" height="auto" width="100%" wmode="transparent" autoplay="true" type="<%=fileType%>" pluginspage="http://www.apple.com/quicktime/download/" title="QuickTime Player">
        </object>
    </div>
</script>

<script type="text/template" id="blueimp-gallery-videos_template" class="template">
    <div id="blueimp-gallery-videos" data-useBootstrapModal="false" useBootstrapModal="false" class="hidden hidden-sm hidden-md hidden-lg blueimp-gallery  blueimp-gallery-display">
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
