/*! RecentActivityToolset */
(function () {

    AMA.namespace("view");

    var RecentActivityToolset = AMA.view.RecentActivityToolset = AMA.view.BaseView.extend();

    RecentActivityToolset.TEMPLATE_ID = "recent_activity_toolset_template";
    RecentActivityToolset.TEMPLATE_SRC = "";


    _.extend(RecentActivityToolset.prototype, {

        initialize: function () {
            RecentActivityToolset.__super__.initialize.apply(this, arguments);
        },


        /**
         * TODO: Move hard coded strings to template:
         */
        _processData: function(items) {
            if(!$("#recent_activity_item_template").size()) return;
            var htmlLoop = {
                    activity: "",
                    viewMore: ""
                },
                loopTpl = $("#recent_activity_item_template").html().replace(/&lt;/g, "<").replace(/&gt;/g, ">");
            _.each(items, function(item, index) {
                AMA.debug("RECENT ACTIVITY: " + item.actionType + " " + !!$("#" + item.actionType).size() + " Not on the item template?");
                if($("#" + item.actionType).size()) {
                    var actionStatusType,
                        data = {},
                        iconClass = "icon_",
                        actionStatus = {
                            "success": "hidden",
                            "failed": "hidden",
                            "started": "hidden"
                        },
                        actionStatusMsg = (item.actionType === 'sync' && item.status === 'failure')?AMA.Util.parseStatusDetails(item.statusDetails, item.actionType):"";
                        item.status = (item.status === null) ? item.statusDetails : item.status;
                        switch (item.status) {
                            case "success":
                                actionStatus.success = "";
                                actionStatusType = "success";
                                break;
                            case "failure":
                            case "failed":
                                actionStatus.failed = "";
                                actionStatusType = "failed";
                                break;
                            default:
                                actionStatus.started = "Started";
                                actionStatusType = "success";
                        }

                        switch(item.actionType) {
                            case "gpsrefresh" :
                                item.actionType = "locate";
                                break;
                            case "lock" :
                                 item.actionType = (item.statusDetails.search("on") == "-1") ? "unlock" : item.actionType;
                                break;
                            case "LOCATIONCHECK_ON" :
                                    if(item.statusDetails === "1") {
                                        actionStatus.success = "";
                                        actionStatus.started = "hidden";
                                    } else {
                                        actionStatus.success = "hidden";
                                        actionStatus.started = "";
                                    }
                                break;
                            default:

                        }
                    var item_template_lookup = $("#" + item.actionType).html().replace(/&lt;/g, "<").replace(/&gt;/g, ">");

                    iconClass += item.actionType + "_" + actionStatusType;
                    data.statusType = iconClass;
                    data.statusTime = AMA.Util.formatDateAndTime(item.eventTime)
                    data.actionStatus = actionStatus;
                    
                    if(actionStatusMsg.length > 30) {
                    	data.actionStatusTitle = actionStatusMsg;
                    	data.actionStatusMsg = actionStatusMsg.substring(0,25) + "...";
                    } 
                    else {
                    	data.actionStatusMsg = actionStatusMsg;
                    	data.actionStatusTitle = "";
                    }

                    AMA.debug("RECENT ACTIVITY ITEM [" + index + "]: {actionType: " + item.actionType + ", eventId: " + item.eventId + ", eventTime:" + item.eventTime + ", status:" + item.status + ", statusDetails:" + item.statusDetails + "}");
                
                    data.item = _.template(item_template_lookup, data);

                    if(index < 3) {
                        htmlLoop.activity += _.template(loopTpl, data);
                    } else {
                        htmlLoop.viewMore += _.template(loopTpl, data);
                    }
                }
            }, this);

            $("#recent_activity_container_template").html(htmlLoop.activity);
            $("#recent_activity_viewmore_container_template").html(htmlLoop.viewMore);
            if(items.length > 3) {
                this.$el.find(".tooltip_link").removeClass("hidden");
            } else {
                this.$el.find(".tooltip_link").addClass("hidden");
            }
        },


        _setupEvents: function() {
            AMA.ActionManager.on(AMA.ActionManager.EVENT.ACTION_FINISHED, function() {
                this.data.invalidate();
            }, this)
        },


        render: function () {
            var data = (this.data && this.data.length > 0) ? this.data.toJSON() : {},
                    content = "";
            this.$el.html(this.template);
            
            if (this.data.length > 0) {
                AMA.debug("RECENT ACTIVITY Found: " + this.data.length + " items");
                this._processData(data);
            }
            else {
                AMA.debug("No items found for RECENT ACTIVITY");
            	this.$el.find("#recent_activity_no_entries").removeClass("hidden");
            	this.$el.find("a.link_text").hide();
            }
        }
    });


})();

