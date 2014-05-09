/*! SupportTabAppsListView */
(function () {

    AMA.namespace("view");

    var SupportTabAppsListView = AMA.view.SupportTabAppsListView = AMA.view.BaseView.extend(); //AMA.view.ListView.extend(); 
    
    SupportTabAppsListView.TEMPLATE_ID = "appRowTemplate"; 
    
    /*SupportTabAppsListView.CSS = {
            ITEM: "rt_row",
            ITEM_STYLE: ["odd", "even"]   // alternating row styles
        };*/

    AMA.augment(SupportTabAppsListView.prototype, {
    	initialize: function(){
    		SupportTabAppsListView.__super__.initialize.apply(this, arguments);
    	},
    	render: function () {
    		//SupportTabAppsListView.__super__.render.apply(this, arguments);
        	AMA.debug("\n=========== AMA.view.SupportTabAppsListView rendered =================\n");
			
        	var content = ""; var runningAppsCounter = 0; var oddEvenAlternator = "odd";	
        	var appCollection = this.data.models;
			
            _.each(appCollection, function(e, i) {
				
				
				if(appCollection[i].attributes.updateDate <= 0){
					appCollection[i].attributes.lastUsed = "N/A";
                }else if(appCollection[i].attributes.status == "STATUS_RUNNING"){
                	appCollection[i].attributes.lastUsed = "Currently Running";
                    runningAppsCounter++;
                }else{
                	appCollection[i].attributes.lastUsed = "TBD - LAST USED";
                }
				
				switch(oddEvenAlternator){
	                case "odd":
	                	appCollection[i].attributes.oddEvenAlternator = "even";
	                    oddEvenAlternator = "even";
	                    break;
	                default:
	                	appCollection[i].attributes.oddEvenAlternator = "odd";
	                    oddEvenAlternator = "odd";
	                    break;
				}	
				
				content += _.template(this.template, appCollection[i].attributes);
				
                
            }, this);
            
			$('#hsAppsRowPlaceHolder').append(content);
			$("#hsps_total_app_number").html(appCollection.length);
			$("#hsps_current_app_running").html(runningAppsCounter);
			
			this.setHealthScanAppPerformance(this.data.models);
        	//AMA.debug(this._dataset.length + " items rendered in contact list view.");
        	
        	//set time to render check if element placeholder is rendered recursively invoke this.render
		},
	   
		/*_processData: function (item, index) {
			SupportTabAppsListView.__super__._processData.call(this, item, index);
	
			return item;
		},*/
		
		_processData: function(data){
    		AMA.debug("\n=========== process SupportTabAppsListView data =================\n");
    	
    		
    		
    		return data;
    	},
    	/*events: {
        	"click #hsap_app_name": "hsap_app_name",
        	"click #hsap_last_used": "hsap_last_used",
        	"click #hsap_battery": "hsap_battery",
        	"click #hsap_memory": "hsap_memory",
        	"click #hsap_storage": "hsap_storage"
        },
        hsap_app_name: function(){ 
        	alert('test hsap_app_name');
        	this.handleAppsTableSort("hsap_app_name"); 
        },
        hsap_last_used: function(){ 
        	alert('test hsap_last_used');
        	this.handleAppsTableSort("hsap_last_used"); 
        },
        hsap_battery: function(){ 
        	alert('test hsap_battery');
        	this.handleAppsTableSort("hsap_battery"); 
        },
        hsap_memory: function(){ 
        	alert('test hsap_memory');
        	this.handleAppsTableSort("hsap_memory"); 
        },
        hsap_storage: function(){ 
        	alert('test hsap_storage');
        	this.handleAppsTableSort("hsap_storage"); 
        },*/
    	/*_afterRender: function(){
			this.setHealthScanAppPerformance(this.data.models);
		},*/
    	setHealthScanAppPerformance: function(appsData)
        {
            var appsPerformanceDataSet = [];
            var appRecord, appName, appBatteryUseage, appMemoryUseage, appStorageUseage, appLastUsed, appType;
            var appNameHtml, appBatteryUseageHtml, appMemoryUseageHtml, appStorageUseageHtml, appLastUsedHtml;
            var runningCount = 0;
            var current_time = (new Date()).getTime();
            
            for (var j = 0; j < appsData.length; j++)  
            {
                appRecord = appsData[j].attributes;
                appName = appRecord.name;
                appType = appRecord.isSystemApp ? "1" : "0"; 
                appNameHtml = "<table cellpadding='0' cellspacing='0' border='0'>";
                appNameHtml = appNameHtml + "<tr><td align='left' style='padding-left:13px;font-weight:bold;border: none;word-break:break-all'>" + appName + "</td></tr>";
                if (appType == '1')
                {
                    appNameHtml += "<tr><td align='left' style='padding-left:13px;font-color:#666666;border: none;'>(System App)</td></tr>";
                }
                appNameHtml += "</table>";
                appBatteryUseage = appRecord.batteryPercentage 
                appMemoryUseage = appRecord.memoryPercentage; 

                if (appRecord.storagePercentage == null) 
                    appStorageUseage = 0;
                else
                    appStorageUseage = appRecord.storagePercentage 
                
                if (appRecord.status == "STATUS_RUNNING") 
                {
                    appLastUsed = current_time;
                    appLastUsedHtml = "<div style='text-align: center;'>Currently Running</div>";
                    runningCount++;
                }
                else
                {
                    appLastUsed = AMA.Util.dateFormat(appRecord.updateDate);
                    appLastUsedHtml = "<div style='text-align: center;'>" + (appLastUsed || " N/A") + "</div>"; 
                }

                appBatteryUseageHtml = "<table cellpadding='0' cellspacing='0' border='0'>";
                if (appsData[j].attributes.batteryRating == "LOW") 
                {
                    appBatteryUseageHtml += "<tr><td width='98px' align='center' style='border: none;'><img src='img/green_dot.png' ><span  style='padding-left:8px;padding-bottom:5px'>Low&nbsp;</span></td></tr>";

                }
                else if (appsData[j].attributes.batteryRating == "HIGH") 
                {
                    appBatteryUseageHtml += "<tr><td width='98px' align='center' style='border: none;'><img src='img/red_dot.png' ><span  style='padding-left:8px;padding-bottom:5px'>High</span></td></tr>";
                }
                else
                {
                    appBatteryUseageHtml += "<tr><td width='98px' align='center' style='border: none;'><img src='img/yellow_dot.png' ><span  style='padding-left:8px;padding-bottom:5px'>Med.</span></td></tr>";
                }
                appBatteryUseageHtml += "<tr><td width='98px' align='center' style='border: none;'>Battery Usage</td></tr>";
                appBatteryUseageHtml += "</table>";
                
                if (appsData[j].attributes.memoryRating == null)  
                {
                    appMemoryUseageHtml = "<div style='text-align: center;'>N/A</div>";
                }
                else
                {
                    appMemoryUseageHtml = "<table cellpadding='0' cellspacing='0' border='0'>";
                    if (appsData[j].attributes.memoryRating == "LOW") 
                    {
                        appMemoryUseageHtml += "<tr><td width='101px' align='center' style='border: none;'><img src='img/green_dot.png' ><span  style='padding-left:8px;padding-bottom:5px'>Low&nbsp;</span></td></tr>";
                    }
                    else if (appsData[j].attributes.memoryRating == "HIGH")
                    {
                        appMemoryUseageHtml += "<tr><td width='101px' align='center' style='border: none;'><img src='img/red_dot.png' ><span  style='padding-left:8px;padding-bottom:5px'>High</span></td></tr>";
                    }
                    else
                    {
                        appMemoryUseageHtml += "<tr><td width='101px' align='center' style='border: none;'><img src='img/yellow_dot.png' ><span  style='padding-left:8px;padding-bottom:5px'>Med.</span></td></tr>";
                    }
                    appMemoryUseageHtml += "<tr><td width='101px' align='center' style='border: none;'>Memory Usage</td></tr>";
                    appMemoryUseageHtml += "</table>";
                }

                appStorageUseageHtml = "<table cellpadding='0' cellspacing='0' border='0'>";
                if (appsData[j].attributes.storageRating == "LOW") 
                {
                    appStorageUseageHtml += "<tr><td width='93px' align='center' style='border: none;'><img src='img/green_dot.png' ><span  style='padding-left:8px;padding-bottom:5px'>Low&nbsp;</span></td></tr>";
                    if (appRecord.isSystemApp)
                    {
                        appStorageUseageHtml += "<tr><td width='93px' align='center' align='center' style='border: none;'>Device Storage</td></tr>";
                    }
                    else
                    {
                        appStorageUseageHtml += "<tr><td width='93px' align='center' style='border: none;'>Card Storage</td></tr>";
                    }
                }
                else if (appsData[j].attributes.storageRating == "HIGH")
                {
                    appStorageUseageHtml += "<tr><td width='93px' align='center' style='border: none;'><img src='img/red_dot.png' ><span  style='padding-left:8px;padding-bottom:5px'>High</span></td></tr>";

                    if (appRecord.isSystemApp) 
                    {
                        appStorageUseageHtml += "<tr><td width='93px' align='center' style='border: none;'>Device Storage</td></tr>";
                    }
                    else
                    {
                        appStorageUseageHtml += "<tr><td width='93px' align='center' style='border: none;'>Card Storage</td></tr>";
                    }
                }
                else
                {
                    appStorageUseageHtml += "<tr><td width='93px' align='center' style='border: none;'><img src='img/yellow_dot.png' ><span  style='padding-left:8px;padding-bottom:5px'>Med.</span></td></tr>";

                    if (appRecord.isSystemApp) 
                    {
                        appStorageUseageHtml += "<tr><td width='93px' align='center' style='border: none;'>Device Storage</td></tr>";
                    }
                    else
                    {
                        appStorageUseageHtml += "<tr><td width='93px' align='center' style='border: none;'>Card Storage</td></tr>";
                    }
                }
                appStorageUseageHtml += "</table>";
                
                appsPerformanceDataSet[j] = [appNameHtml, appLastUsedHtml, appBatteryUseageHtml, appMemoryUseageHtml, appStorageUseageHtml, appName, appLastUsed, appBatteryUseage, appMemoryUseage, appStorageUseage];

            }
            
//            $("#hsps_current_app_running").html(runningCount);
            // FIXME: need to replace this framework with one that allows for text content in the HTML template rather than inlined in JS code
            var appsPerformanceColumns = [
                {"sWidth": "229px", "sTitle": "<div id='hsap_app_name'  class='app_performance_app_name_header'><span class='appNameSpan'>App Name</span></div>", "bSortable": false},
                {"sWidth": "120px", "sTitle": "<div id='hsap_last_used' class='app_performance_last_used_header'><span class='lastUsedSpan'>Last Used</span></div>", "bSortable": false},
                {"sWidth": "98px", "sTitle": "<div id='hsap_battery' class='app_performance_battery_header_down'><span class='batterySpan'>Battery</span></div>", "bSortable": false},
                {"sWidth": "101px", "sTitle": "<div id='hsap_memory' class='app_performance_memory_header'><span class='memorySpan'>Memory</span></div>", "bSortable": false},
                {"sWidth": "113px", "sTitle": "<div id='hsap_storage' class='app_performance_storage_header'><span class='storageSpan'>Storage</span></div>", "bSortable": false},
                {"bVisible": false},
                {"bVisible": false},
                {"bVisible": false},
                {"bVisible": false},
                {"bVisible": false}
            ];
            // Create DataTables for display

            $(document).ready(function() {  // All Apps
                $('#healthscan_apps_performance_section').html('<table cellpadding="0" cellspacing="0" border="0" class="my_display" id="apps_performance_table" ></table>');
                appsDisplayDataTable = $('#apps_performance_table').dataTable({
                    "sScrollY": "246px",
                    "sScrollX": "673px",
                    "bPaginate": false,
                    "bScrollCollapse": true,
                    "bLengthChange": false,
                    "bInfo": false,
                    "bFilter": false,
                    "bAutoWidth": false,
                    "bDeferRender": true,
                    "aaData": appsPerformanceDataSet,
                    "aaSorting": [[7, "desc"], [5, "asc"]],
                    "aoColumns": appsPerformanceColumns,
                    "sDom": '<"top">rt<"bottom"><"clear">'
                });
            });
            $(".dataTables_scrollBody").css("overflow-x", "hidden");
        },
        /*handleAppsTableSort: function(sortColumnId)
        {
            j_sortColumnId = "#" + sortColumnId;
            var current_class_name = $(j_sortColumnId).attr('class');
            switch (sortColumnId) {
                case "hsap_app_name":  //sort for appname
                    if ((current_class_name == 'app_performance_app_name_header') || (current_class_name == 'app_performance_app_name_header_down'))
                    {
                        $(j_sortColumnId).attr('class', 'app_performance_app_name_header_up');
                        appsDisplayDataTable.fnSort([[5, 'asc']]);
                    }
                    else
                    {
                        $(j_sortColumnId).attr('class', 'app_performance_app_name_header_down');
                        appsDisplayDataTable.fnSort([[5, 'desc']]);
                    }
                    $("#hsap_last_used").attr('class', 'app_performance_last_used_header');
                    $("#hsap_battery").attr('class', 'app_performance_battery_header');
                    $("#hsap_memory").attr('class', 'app_performance_memory_header');
                    $("#hsap_storage").attr('class', 'app_performance_storage_header');
                    break;
                case "hsap_last_used":  //sort for last used
                    if (current_class_name == 'app_performance_last_used_header_down')
                    {
                        $(j_sortColumnId).attr('class', 'app_performance_last_used_header_up');
                        appsDisplayDataTable.fnSort([[6, 'asc'], [5, 'asc']]);
                    }
                    else
                    {
                        $(j_sortColumnId).attr('class', 'app_performance_last_used_header_down');
                        appsDisplayDataTable.fnSort([[6, 'desc'], [5, 'asc']]);
                    }
                    $("#hsap_app_name").attr('class', 'app_performance_app_name_header');
                    $("#hsap_battery").attr('class', 'app_performance_battery_header');
                    $("#hsap_memory").attr('class', 'app_performance_memory_header');
                    $("#hsap_storage").attr('class', 'app_performance_storage_header');
                    break;
                case "hsap_battery":  //sort for battery usage
                    if (current_class_name == 'app_performance_battery_header_down')
                    {
                        $(j_sortColumnId).attr('class', 'app_performance_battery_header_up');
                        appsDisplayDataTable.fnSort([[7, 'asc'], [5, 'asc']]);
                    }
                    else
                    {
                        $(j_sortColumnId).attr('class', 'app_performance_battery_header_down');
                        appsDisplayDataTable.fnSort([[7, 'desc'], [5, 'asc']]);
                    }
                    $("#hsap_app_name").attr('class', 'app_performance_app_name_header');
                    $("#hsap_last_used").attr('class', 'app_performance_last_used_header');
                    $("#hsap_memory").attr('class', 'app_performance_memory_header');
                    $("#hsap_storage").attr('class', 'app_performance_storage_header');
                    break;
                case "hsap_memory":  //sort for memory usage
                    if (current_class_name == 'app_performance_memory_header_down')
                    {
                        $(j_sortColumnId).attr('class', 'app_performance_memory_header_up');
                        appsDisplayDataTable.fnSort([[8, 'asc'], [5, 'asc']]);
                    }
                    else
                    {
                        $(j_sortColumnId).attr('class', 'app_performance_memory_header_down');
                        appsDisplayDataTable.fnSort([[8, 'desc'], [5, 'asc']]);
                    }
                    $("#hsap_app_name").attr('class', 'app_performance_app_name_header');
                    $("#hsap_last_used").attr('class', 'app_performance_last_used_header');
                    $("#hsap_battery").attr('class', 'app_performance_battery_header');
                    $("#hsap_storage").attr('class', 'app_performance_storage_header');
                    break;
                case "hsap_storage": //sort for storage usage
                    if (current_class_name == 'app_performance_storage_header_down')
                    {
                        $(j_sortColumnId).attr('class', 'app_performance_storage_header_up');
                        appsDisplayDataTable.fnSort([[9, 'asc'], [5, 'asc']]);
                    }
                    else
                    {
                        $(j_sortColumnId).attr('class', 'app_performance_storage_header_down');
                        appsDisplayDataTable.fnSort([[9, 'desc'], [5, 'asc']]);
                    }
                    $("#hsap_app_name").attr('class', 'app_performance_app_name_header');
                    $("#hsap_last_used").attr('class', 'app_performance_last_used_header');
                    $("#hsap_battery").attr('class', 'app_performance_battery_header');
                    $("#hsap_memory").attr('class', 'app_performance_memory_header');
                    break;
            }

            appsDisplayDataTable.fnDraw();
        }*/
        
        

    
    
    
    });
})();