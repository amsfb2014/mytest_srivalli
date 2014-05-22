/*! WipePhoneDialog */
(function(){AMA.namespace("view");var a=AMA.view.WipePhoneDialog=AMA.view.Wizard.extend();a.TEMPLATE_ID="wipephonedialog_template";a.TEMPLATE_SRC="";_.extend(a.prototype,{events:{"click .close":"_hideDialog","click .btn_cancel":"_hideDialog","click .btn_factory_reset_device.sync":"_wipe","click .btn_factory_reset_device.nosync":"_wipeonly","click .btn_erase.sync":"_wipe","click .btn_erase.nosync":"_wipeonly","click .btn_erase_and_lock.sync":"_wipe","click .btn_erase_and_lock.nosync":"_wipeonly","click .btn_sync_then_wipe":"_wipe","click .btn_nosync_then_wipe":"_wipeonly","click .btn_sync_then_reset":"_wipe","click .btn_nosync_then_reset":"_wipeonly","click .btn_logout":"_factorySuccessLogout"},_setupEvents:function(){var b=this;this._setupSteps();this.$el.find(".next").on("click",function(){$(b.steps[b.steps.index(b.$el.find("."+AMA.view.Wizard.CSS.ACTIVE))]).removeClass(AMA.view.Wizard.CSS.ACTIVE).next().addClass(AMA.view.Wizard.CSS.ACTIVE);b.processDialogView()});this.$el.find(".previous").on("click",function(){$(b.steps[b.steps.index(b.$el.find("."+AMA.view.Wizard.CSS.ACTIVE))]).removeClass(AMA.view.Wizard.CSS.ACTIVE).prev().addClass(AMA.view.Wizard.CSS.ACTIVE);b.processDialogView()})},show:function(b){if(b==="resetsuccess"){this.$el.find(".close").hide()}a.__super__.show.call(this);this.processDialogView(b)},_hideDialog:function(){if(!this.$el.find(".step1").hasClass("current")){this.$el.find(".title").addClass("hidden");this.$el.find(".title.wipe").removeClass("hidden");this.$el.find(".wiz_step").removeClass("current");this.$el.find(".step1, .step1_buttons").addClass("current")}this.hide()},_wipe:function(){this._hideDialog();var b=this._createWipeWorkflow();if(this.$el.find("input#wipephone_reset:checked").length>0){AMA.ActionManager.define("wipefactoryonly",b);AMA.ActionManager.start("wipefactoryonly")}else{AMA.ActionManager.define("wipe",b);AMA.ActionManager.start("wipe")}},_wipeonly:function(){this._hideDialog();var b=this._createWipeWorkflow();if(this.$el.find("input#wipephone_reset:checked").length>0){AMA.ActionManager.define("wipefactoryonly",b);AMA.ActionManager.start("wipefactoryonly")}else{AMA.ActionManager.define("wipeonly",b);AMA.ActionManager.start("wipeonly")}},_createWipeWorkflow:function(){var b=AMA.ActionManager,c=AMA.workflow.BaseWorkflow,d=AMA.workflow.WipeWorkflow,e=new d();e.on(c.EVENT.STATE_CHANGED,function(h){switch(h.state){case c.STATE.INITIALIZING:AMA.debug("Wipe Toolset has switched the Wipe Button state to 'connecting'; countdown initialized");this.parent.toggleDisplay(AMA.view.WipeToolset.CSS.CONNECTING);break;case d.STATE.SYNCING:AMA.debug("Wipe Toolset has switched the Wipe Button state to 'syncing'");this.parent.toggleDisplay(AMA.view.WipeToolset.CSS.SYNCING);break;case d.STATE.ERASING:AMA.debug("Wipe Toolset has switched the Wipe Button state to 'erasing'");this.parent.toggleDisplay(AMA.view.WipeToolset.CSS.ERASING);var f=this.parent.$el.find(".button_wipe.outcome:not(.unsuccessful) .tooltip"),g=this._buildTotals(h.data);f.find(".total_erased_audio").html(g.audio||"0/0");f.find(".total_erased_mediafiles").html(g.file||"0/0");f.find(".total_erased_video").html(g.video||"0/0");f.find(".total_erased_photo").html(g.photo||"0/0");f.find(".total_erased_folder").html(g.folder||"0/0");f.find(".total_erased_sms").html(g.sms||"0/0");f.find(".total_erased_calllog").html(g.call_log||"0/0");f.find(".total_erased_calendar").html(g.calendar||"0/0");f.find(".total_erased_contact").html(g.contacts||"0/0");break;default:}},this);e.on(c.EVENT.FINISHED,function(h){switch(h.result){case c.RESULT.SUCCESSFUL:this.parent.toggleDisplay(AMA.view.WipeToolset.CSS.SUCCESS);var f=this.parent.$el.find(".button_wipe.outcome:not(.unsuccessful) .tooltip"),g=this._buildTotals(h.data.split("\n"));f.find(".total_erased_audio").html(g.audio||"0/0");f.find(".total_erased_mediafiles").html(g.file||"0/0");f.find(".total_erased_video").html(g.video||"0/0");f.find(".total_erased_photo").html(g.photo||"0/0");f.find(".total_erased_folder").html(g.folder||"0/0");f.find(".total_erased_sms").html(g.sms||"0/0");f.find(".total_erased_calllog").html(g.call_log||"0/0");f.find(".total_erased_calendar").html(g.calendar||"0/0");f.find(".total_erased_contact").html(g.contacts||"0/0");AMA.models.contacts.invalidate();AMA.models.photos.invalidate();AMA.models.videos.invalidate();break;case d.RESULT.FACTORY_RESET_SUCCESSFUL:this.parent.toggleDisplay(AMA.view.WipeToolset.CSS.NORMAL);this.show("resetsuccess");break;default:this.parent.toggleDisplay(AMA.view.WipeToolset.CSS.UNSUCCESSFUL)}},this);e.on(c.EVENT.COUNTDOWN_TICK,function(f){$("#wipe_toolset_countdown").html(f.remaining)},this);return e},processDialogView:function(e){var c=AMA.Util.isAndroid(this.options.endpoint.models[0].get("platformfriendlyname")),b=(this.data.models[0].get("android_device_admin")==="1"),d=(this.options.endpoint.models[0].get("syncAndOrWipeSupported")==="true");if(e){this.$el.find(".wiz_step").removeClass("current");this.$el.find("."+e+".wiz_step, ."+e+"_buttons").addClass("current")}if(this.$el.find(".step1").hasClass("current")){this.$el.find(".step1_buttons").addClass("current").removeClass("hidden");this.$el.find(".step1_buttons").siblings().removeClass("current").addClass("hidden");this.$el.find(".step1_buttons .btn-primary:not(.btn_cancel)").hide();if(!AMA.config.lockEnabled){this.$el.find(".step1 .no_lock, .step1_buttons .no_lock").hide()}if(c&&b){this.$el.find(".step1 .wipeonly").hide();this.$el.find(".step1 .wipesync").hide();this.$el.find(".step1 input#wipephone_wipe").prop("checked",true)}else{this.$el.find(".step1 .wipereset").hide();if(AMA.models.capabilities.canCreate("syncEvents")){this.$el.find(".step1 .wipeonly").hide()}else{this.$el.find(".step1 .wipesync").hide()}}if(b){this.$el.find(".step1_buttons .btn_next").show()}else{if(AMA.config.lockEnabled){this.$el.find(".step1_buttons .btn_erase_and_lock").show()}else{this.$el.find(".step1_buttons .btn_erase").show()}if(AMA.models.capabilities.canCreate("syncEvents")){console.log("1 - "+AMA.models.capabilities.canCreate("syncEvents"));this.$el.find(".step1_buttons .nosync").hide()}else{console.log("2 - "+AMA.models.capabilities.canCreate("syncEvents"));this.$el.find(".step1_buttons .sync").hide()}}}else{if(this.$el.find(".step2").hasClass("current")){this.$el.find(".step2 .warning").hide();this.$el.find(".step2_buttons").addClass("current").removeClass("hidden");this.$el.find(".step2_buttons").siblings().removeClass("current").addClass("hidden");this.$el.find(".step2_buttons .btn-primary:not(.btn_cancel)").hide();if(this.$el.find("#wipephone_wipe:checked").length>0){if(d){this.$el.find(".step2 .warning.optionalsync").show();this.$el.find(".step2_buttons .btn_sync_then_wipe").show();this.$el.find(".step2_buttons .btn_nosync_then_wipe").show();this.$el.find(".step2 .confirm .wipingorresetting_wiping").show();this.$el.find(".step2 .confirm .wipingorresetting_resetting").hide()}else{this.$el.find(".step2 .warning.erase").show();if(!AMA.config.lockEnabled){this.$el.find(".step2_buttons .btn_erase_and_lock").hide();this.$el.find(".step2_buttons .btn_erase").show()}else{this.$el.find(".step2_buttons .btn_erase_and_lock").show();this.$el.find(".step2_buttons .btn_erase").hide()}if(AMA.models.capabilities.canCreate("syncEvents")){this.$el.find(".step2_buttons .nosync").hide()}else{this.$el.find(".step2_buttons .sync").hide()}}}else{this.$el.find(".title").addClass("hidden");this.$el.find(".title.reset").removeClass("hidden");if(d){this.$el.find(".step2 .warning.optionalsync").show();this.$el.find(".step2_buttons .btn_sync_then_reset").show();this.$el.find(".step2_buttons .btn_nosync_then_reset").show();this.$el.find(".step2 .confirm .wipingorresetting_resetting").show();this.$el.find(".step2 .confirm .wipingorresetting_wiping").hide()}else{this.$el.find(".step2 .warning.factoryreset").show();this.$el.find(".step2_buttons .btn_factory_reset_device").show();if(AMA.models.capabilities.canCreate("syncEvents")){this.$el.find(".step2_buttons .nosync").hide()}else{this.$el.find(".step2_buttons .sync").hide()}}}}else{if(this.$el.find(".resetsuccess").hasClass("current")){this.$el.find(".title").addClass("hidden");this.$el.find(".title.resetsuccess").removeClass("hidden");this.$el.find(".resetsuccess_buttons").addClass("current").removeClass("hidden");this.$el.find(".resetsuccess_buttons").siblings().removeClass("current").addClass("hidden")}}}},_buildTotals:function(b){var c={audio:null,file:null,video:null,photo:null,folder:null,sms:null,call_log:null,calendar:null,contacts:null};_.each(b,function(d){if(d.indexOf("audios")==0){c.audio=d.substr(7)==="0/-1"?"0/0":d.substr(7)}else{if(d.indexOf("files")==0){c.file=d.substr(6)==="0/-1"?"0/0":d.substr(6)}else{if(d.indexOf("videos")==0){c.video=d.substr(7)==="0/-1"?"0/0":d.substr(7)}else{if(d.indexOf("pictures")==0){c.photo=d.substr(9)==="0/-1"?"0/0":d.substr(9)}else{if(d.indexOf("folders")==0){c.folder=d.substr(8)==="0/-1"?"0/0":d.substr(8)}else{if(d.indexOf("sms")==0){c.sms=d.substr(4)==="0/-1"?"0/0":d.substr(4)}else{if(d.indexOf("calllogs")==0){c.call_log=d.substr(9)==="0/-1"?"0/0":d.substr(9)}else{if(d.indexOf("calendar")==0){c.calendar=d.substr(9)==="0/-1"?"0/0":d.substr(9)}else{if(d.indexOf("contacts")==0){c.contacts=d.substr(9)==="0/-1"?"0/0":d.substr(9)}}}}}}}}}},c);return c},_factorySuccessLogout:function(){location="index.html#get_started"}})})();