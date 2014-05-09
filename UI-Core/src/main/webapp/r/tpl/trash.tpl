<script type="text/template" id="data_trash_template" class="template">
    <div class="hidden-md hidden-lg hidden-sm toggle-submenu">
        <a class="submenu-show" data-toggle="modal" data-target="#data-menu-tab-sm-full">
            <span class="submenu-left"></span>
            Trash
        </a>
    </div>

	<div id="" class="col-md-3 col-lg-3 hidden">
        <div id="data_trash_management" class="console record_breakdownx record_breakdown_topx">
            <h4 class="side_title">Manage Trash<span class="toggle"></span></h4>
			<div class="mc_links">
				<a class="mc_link report_event data_trash_emptytrash" href="javascript:;" id="data_trash_emptytrash_link">Empty Trash</a>
			</div>            
        </div>
    </div>
    

	<div class="row-offcanvas row-offcanvas-right">
	
		<div class="list_bordered col-md-6 col-lg-6 col-sm-6 col-xs-12" id="">
			<div id="commands_searchplace" class="hidden hidden-xs"><!-- IERT --></div>
			
			<div id="data_trash_emptytrash_btn_holder" class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
				<a class="btn btn-primary report_event data_trash_emptytrash col-xs-6" href="javascript:;" id="data_trash_emptytrash_btn">Empty Trash</a>
			</div>
						
			<div id="data_trash_searchbar" class="input-group col-sm-6 col-md-6 col-lg-6 hidden-xs">
			  <span class="input-group-addon icon webbycons-search"></span>
			  <input type="text" class="form-control searchinput" id="trash_commands_searchinput" placeholder="Search" tabindex="1" />		  
			</div>		
			
			<div class="tab_batchselectholder hidden" id="selecttrash">
				<span>Filter By:</span>
				<select class="rt_batchselect" id="trashtype">
					<option value="all">All Items</option>
					<option value="contact">Contacts</option>
					<option value="image">Photos</option>
					<!-- <option value="audio">Audio</option> -->
					<option value="video">Videos</option>
				</select>
			</div>
						
			<div class="actionbar hidden">
				<span class="actiontext">Action:</span>
				<select class="multiactionselect" id="data_trash_multiaction_select">
					<option value="">Select One</option>
					<option value="restore">Restore Items</option>
					<option value="purge">Permanently Delete Items</option>
				</select>
				<span class="btn_perform btn btn_small" id="data_trash_multiaction_perform">Perform</span>
			</div>
			<div class="selectbar hidden">
				<div class="selectall">
					<input id="data_trash_selectall"type="checkbox">
					<label for="data_trash_selectall">Select All</label>
				</div>
				<!--
				<div id="ct_batchselect" class="hidden">View:
					<select class="rt_batchselect" id="data_trash_pageselector"></select>
				</div>
				-->
			</div>
			<div class="recordstable">
				<div class="rt_rowbox" id="ct_rowbox">
					<ul id="data_trash_list" class="scrollable">
						<li>
							<div class='progressing'>Loading Data...</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	
		<div class="details_bordered col-md-6 col-lg-6 col-sm-6 col-xs-12 sidebar-offcanvas" id="trash_records_detailshalf" style="">
			<button type="button" class="close close_trash_details" aria-hidden="true" data-icon="&#59408;"></button>
			<div class="details_outer">
				<div id="trash_details_view">
					<div class="progressing">Loading Data...</div>
				</div>
			</div>
		</div>
	
	</div>
	

	<div class="dialog_messages hidden">
		<!-- Dialog messages for Trash view -->		
		<div id="msg_trash_loadingdialog">Please wait...</div>

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
	<div class="progressing">
		<p>Loading Data...</p>
	</div>	
	<div class="list_details_empty hidden">
		<p>No data available.</p>
	</div>	
</script>

<script type="text/template" id="trash_list_template">
	<li class="rt_row <%= elStyle %>" id="<%= elId %>" uid="<%= id %>">
		<div col="0" class="rt_column rt_checkboxtrashcolumn hidden">
			<input type="checkbox" class="rt_rowcheckbox" style="z-index: 2;" uid="<%= id %>">
		</div>
		<div col="1" class="rt_column">
			<div class="<%= typeClass %>"></div>
		</div>
		<div col="2" class="rt_column">
			<div title="<%= fullNameTitle %>" class="item-title"><%= fullName %></div>
		</div>
	</li>
</script>