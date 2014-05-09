/*! DownloadAppTab */
(function () {

    AMA.namespace("view");

    var DataTab = AMA.view.DownloadAppTab = AMA.view.BaseView.extend();

    DataTab.TEMPLATE_ID = "download_app_template";
    DataTab.TEMPLATE_SRC = "get_started.tpl";

    // Define toolsets that will appear in the data tab toolbar
    DataTab.TOOLBAR = {
        DEFAULT : [],
        IPHONE: []
    };


    _.extend(DataTab.prototype, {
    	_afterRender: function () {
    		$("#download_tab").addClass("selected");
    		$("#page_panes").css({
    			"border":0
    		});
    	}
    });
})();