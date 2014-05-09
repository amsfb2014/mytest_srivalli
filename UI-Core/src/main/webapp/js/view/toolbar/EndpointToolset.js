/*! EndpointToolset */
(function () {

    AMA.namespace("view");

    var EndPointToolset = AMA.view.EndPointToolset = AMA.view.BaseView.extend();

    EndPointToolset.TEMPLATE_ID = "endpoint_toolset_template";
    EndPointToolset.TEMPLATE_SRC = "";

    _.extend(EndPointToolset.prototype, {
    	
    	events: {
    		"click .newphone a": "showNewPhonePopup"
    	},

        initialize: function () {
            EndPointToolset.__super__.initialize.apply(this, arguments);
			
        },

        render: function () {
            EndPointToolset.__super__.render.apply(this);
			
			$(".lp_image_default").error(function(){
				$(this).attr("src", "img/genericphone_small.png");
			});
        },
        
        _processData: function (item) {
        	var platform = AMA.config.apiHostUrl + "/deviceImages?" + 
				$.param({
					size: "small",
					platformName: item.platform,
					devId: AMA.config.devId
				});
				
			item.platformImage = item.platform ? platform : "img/genericphone_small.png";
			
			// Here the endpoint name is the mobile number, so we format it as such
        	item.name = AMA.Util.formatPhone(item.name);
        	
        	return item;
        },
        
        showNewPhonePopup: function () {
			var options = {
				id: "newPhone",
				url: "/web/new_phone.html?title=newPhone",
				width: 730,
				height: 390			
			};
			
			AMA.Util.openPopupWindow(options);
        }
        
    });


})();

