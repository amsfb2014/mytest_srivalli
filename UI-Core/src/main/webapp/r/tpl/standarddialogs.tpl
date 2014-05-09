<script type="text/template" id="dialog_template">
    <div class="modal-dialog" style="position: relative; top: auto; left: auto; right: auto; margin: 0 auto 20px 0; z-index: 300000;max-width: 100%;">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title">Modal title</h4>
            </div>
            <div class="modal-body">
                <p>One fine body&hellip;</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn cancelBtn btn-default button_cancel" data-dismiss="modal">Cancel</button>
                <button type="button" class="btn okBtn btn-primary">Confirm</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</script>

<script type="text/template" id="standard_dialogs_template">

	<div id="error_dialog" class="modal fade"title="Error" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"></div>
	
	<div id="confirm_dialog" class="modal fade" title="Confirmation" role="dialog"  aria-labelledby="myModalLabel" aria-hidden="true"></div>
	
	<div id="loading_dialog" class="modal fade" title="Loading" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"></div>

	<div id="status_dialog"  class="modal fade" xtitle="" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"></div>
	
	<div id="loading_custom_dialog" style="display:none">
		<div id="loading_progress">Please wait...</br> <span class='progressing'></span></div>
	</div>
	

</script>