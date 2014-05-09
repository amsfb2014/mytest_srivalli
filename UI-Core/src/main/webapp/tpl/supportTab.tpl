<script type="text/template" id="support_tab_resources_template" >
  <div id="techsupport_right">
    <table border="0" cellspacing="0" cellpadding="0" class=
    "innerframe hsrMain table_border" width="100%" id="healthAppView">
      <tbody>
        <tr class="hsrInnerTables">
          <td style="vtop">
            <div id="phonePerformanceContainer">
              <table id="settingsSnapshotTable" cellspacing="0" cellpadding="4" class=
              "innerframe table_border" width="100%">
                <tbody>
                  <tr class="dataTableTop_bg">
                    <td>
                        <table width="100%">
                          <tbody>
                            <tr>
                              <td class="dataTableTitle">SETTINGS SNAPSHOT</td>

                              <td align="right" class="dataTableDate">DATE UPDATED : 
                                <span id="snapshotDate" class="<%=css['timeStamp']%>"><%=timeStamp%></span>
                                <span class="<%=css['timeStampUndefined']%>">Unknown</span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                    </td>
                  </tr>

                  <tr class="<%=css['displayNoData']%> styleNoData">
                    <td colspan="2">
                      <div style="text-align: center;">No data available in table</div>
                    </td>
                  </tr>

                  <tr class="<%=css['displayPrePS14Snapshot']%>">
                    <td colspan="2">
                      <div id="resourcesTable">
                        <div id="resourcesSummary_wrapper" class="dataTables_wrapper"
                        role="grid">
                          <table cellpadding="0" cellspacing="0" border="0" class=
                          "display dataTable" id="resourcesSummary" style="">
                            <thead>
                              <tr role="row">
                                <th class="sorting_disabled" tabindex="0" rowspan="1"
                                colspan="1" style="width: 15%;"></th>

                                <th class="sorting_disabled" tabindex="0" rowspan="1"
                                colspan="1" style="width: 35%;"></th>

                                <th class="sorting_disabled" tabindex="0" rowspan="1"
                                colspan="1"></th>
                              </tr>
                            </thead>

                            <tbody role="alert" aria-live="polite" aria-relevant="all">
                              <tr class="odd">
                                <td class="category categoryEven lastRowItems" align=
                                "center">Phone Info</td>

                                <td class="lastRowItems">OS Version</td>

                                <td class="lastRowItems">
                                  <span class="<%=css['osVersion']%>"><%=osVersion%></span>
                                  <span class="<%=css['osVersionUndefined']%>">N/A</span>
                                </td>
                              </tr>

                              <tr class="even">
                                <td class="category categoryOdd lastRowItems" align=
                                "center">Battery</td>

                                <td class="lastRowItems">Battery Life Available</td>

                                <td class="lastRowItems">
                                  <span class="<%=css['batteryRemaining']%>"><%=batteryRemaining%>%</span>
                                  <span class="<%=css['batteryRemainingUndefined']%>">N/A</span>
                                </td>
                              </tr>

                              <tr class="odd">
                                <td class="category categoryEven lastRowItems" align=
                                "center">Memory</td>

                                <td class="lastRowItems">Memory Available</td>

                                <td class="lastRowItems">
                                  <span class="<%=css['memoryAvailable']%>"><%=memoryAvailable%>%</span>
                                  <span class="<%=css['memoryAvailableUndefined']%>">N/A</span>
                                </td>
                              </tr>

                              <tr class="even">
                                <td class="category categoryOdd" align="center" rowspan=
                                "2">Storage</td>

                                <td class="">Device Storage Available</td>

                                <td class="lastRowItems">
                                  <span class="<%=css['deviceStorageAvailable']%>"><%=deviceStorageAvailable%>%</span>
                                  <span class="<%=css['deviceStorageAvailableUndefined']%>">N/A</span>
                                </td>
                              </tr>

                              <tr class="odd">
                                <td class="lastRowItems" style="display: none;"></td>

                                <td class="lastRowItems">Card Storage Available</td>

                                <td class="lastRowItems">
                                  <span class="<%=css['SDStorageAvailable']%>"><%=SDStorageAvailable%>%</span>
                                  <span class="<%=css['SDStorageAvailableUndefined']%>">N/A</span>
                                </td>
                              </tr>

                              <tr class="even">
                                <td class="category categoryEven categoryLast" align=
                                "center">Apps</td>

                                <td class="">Apps Currently Running</td>

                                <td class="lastRowItems">
                                  <span class="<%=css['runningAppNumber']%>"><%=runningAppNumber%></span>
                                  <span class="<%=css['runningAppNumberUndefined']%>">N/A</span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr class="<%=css['displayPostPS14Snapshot']%>">
                    <td colspan="2">
                      <div id="resourcesTable">
                        <div id="resourcesSummary_wrapper" class="dataTables_wrapper"
                        role="grid">
                          <table cellpadding="0" cellspacing="0" border="0" class=
                          "display dataTable" id="resourcesSummary" style="">
                            <thead>
                              <tr role="row">
                                <th class="sorting_disabled" tabindex="0" rowspan="1"
                                colspan="1" style="width: 15%;"></th>

                                <th class="sorting_disabled" tabindex="0" rowspan="1"
                                colspan="1" style="width: 35%;"></th>

                                <th class="sorting_disabled" tabindex="0" rowspan="1"
                                colspan="1"></th>
                              </tr>
                            </thead>

                            <tbody role="alert" aria-live="polite" aria-relevant="all">
                              <tr class="odd">
                                <td class="category categoryEven lastRowItems" align=
                                "center" rowspan="5">Phone Info</td>

                                <td class="lastRowItems">Manufacturer</td>

                                <td class="lastRowItems">
                                  <span class="<%=css['manufacturer']%>"><%=manufacturer%></span>
                                  <span class="<%=css['manufacturerUndefined']%>">Unknown</span>
                                </td>
                              </tr>

                              <tr class="even">
                                <td class="lastRowItems" style="display:none;"></td>

                                <td class="lastRowItems">Model</td>

                                <td class="lastRowItems">
                                  <span class="<%=css['model']%>"><%=model%></span>
                                  <span class="<%=css['modelUndefined']%>">Unknown</span>
                                </td>
                              </tr>

                              <tr class="odd">
                                <td class="lastRowItems" style="display:none;"></td>

                                <td class="lastRowItems">OS Version</td>

                                <td class="lastRowItems">
                                  <span class="<%=css['osVersion']%>"><%=osVersion%></span>
                                  <span class="<%=css['osVersionUndefined']%>">N/A</span>
                                </td>
                              </tr>

                              <tr class="even">
                                <td class="lastRowItems" style="display:none;"></td>

                                <td class="lastRowItems">Build Version</td>

                                <td class="lastRowItems">
                                  <span class="<%=css['buildVersion']%>"><%=buildVersion%></span>
                                  <span class="<%=css['buildVersionUndefined']%>">N/A</span>
                                </td>
                              </tr>

                              <tr class="odd">
                                <td class="lastRowItems" style="display: none;"></td>

                                <td class="lastRowItems">Device current time</td>

                                <td class="lastRowItems">
                                  <span class="<%=css['timeStamp']%>"><%=timeStamp%></span>
                                  <span class="<%=css['timeStampUndefined']%>">N/A</span>
                                </td>
                              </tr>

                              <tr class="even">
                                <td class="category categoryOdd lastRowItems" align=
                                "center" rowspan="7">Settings</td>

                                <td class="lastRowItems">Wi-Fi</td>

                                <td class="lastRowItems">
                                  <span class="<%=css['wifiConnected']%>">Connected</span>
                                  <span class="<%=css['wifiDisabling']%>">Disabling</span>
                                  <span class="<%=css['wifiEnabling']%>">Enabling</span>
                                  <span class="<%=css['wifiNotConnected']%>">Not connected</span>
                                  <span class="<%=css['wifiOff']%>">Off</span>
                                  <span class="<%=css['wifiUndefined']%>">Unknown</span>
                                </td>
                              </tr>

                              <tr class="odd">
                                <td class="lastRowItems" style="display:none;"></td>

                                <td class="lastRowItems">Bluetooth</td>

                                <td class="lastRowItems">
                                  <span class="<%=css['bluetoothFalse']%>">Off</span>
                                  <span class="<%=css['bluetoothTrue']%>">On</span>
                                  <span class="<%=css['bluetoothUndefined']%>">Unknown</span>
                                </td>
                              </tr>

                              <tr class="even">
                                <td class="lastRowItems" style="display:none;"></td>

                                <td class="lastRowItems">Connected Bluetooth Devices</td>

                                <td class="lastRowItems">
                                  <span class="<%=css['listOfBluetoothConnected']%>"><%=listOfBluetoothConnected%></span>
                                  <span class="<%=css['listOfBluetoothConnectedNone']%>">None</span>
                                  <span class="<%=css['listOfBluetoothConnectedUndefined']%>">N/A</span>
                                </td>
                              </tr>

                              <tr class="odd">
                                <td class="lastRowItems" style="display:none;"></td>

                                <td class="lastRowItems">GPS</td>

                                <td class="lastRowItems">
                                  <span class="<%=css['gpsFalse']%>">Off</span>
                                  <span class="<%=css['gpsTrue']%>">On</span>
                                  <span class="<%=css['gpsUndefined']%>">Unknown</span>
                                </td>
                              </tr>

                              <tr class="even">
                                <td class="lastRowItems" style="display: none;"></td>

                                <td class="lastRowItems">Google Location Services</td>

                                <td class="lastRowItems">
                                  <span class="<%=css['googleLocationServicesFalse']%>">Off</span>
                                  <span class="<%=css['googleLocationServicesTrue']%>">On</span>
                                  <span class="<%=css['googleLocationServicesUndefined']%>">Unknown</span>
                                </td>
                              </tr>

                              <tr class="odd">
                                <td class="lastRowItems" style="display:none;"></td>

                                <td class="lastRowItems">Mobile Network Used</td>

                                <td class="lastRowItems">
                                  <span class="<%=css['mobileNetwork']%>"><%=mobileNetwork%></span>
                                  <span class="<%=css['mobileNetworkUndefined']%>">N/A</span>
                                </td>
                              </tr>

                              <tr class="even">
                                <td class="lastRowItems" style="display: none;"></td>

                                <td class="lastRowItems">Screen brightness level</td>

                                <td class="lastRowItems">
                                  <span class="<%=css['screenBrightness']%>"><%=screenBrightness%>%</span>
                                  <span class="<%=css['screenBrightnessUndefined']%>">N/A</span>
                                </td>
                              </tr>

                              <tr class="odd">
                                <td class="category categoryEven lastRowItems" align=
                                "center" rowspan="2">Battery</td>

                                <td class="lastRowItems">Battery Life Available</td>

                                <td class="lastRowItems">
                                  <span class="<%=css['batteryRemaining']%>"><%=batteryRemaining%>%</span>
                                  <span class="<%=css['batteryRemainingUndefined']%>">N/A</span>
                                </td>
                              </tr>

                              <tr class="even">
                                <td class="lastRowItems" style="display:none;"></td>

                                <td class="lastRowItems">Battery State</td>

                                <td class="lastRowItems">
                                  <span class="<%=css['batteryStatusCharging']%>">Charging</span>
                                  <span class="<%=css['batteryStatusDischarging']%>">Discharging</span>
                                  <span class="<%=css['batteryStatusFull']%>">Full</span>
                                  <span class="<%=css['batteryStatusNotcharging']%>">Discharging</span>
                                  <span class="<%=css['batteryStatusUndefined']%>">Unknown</span>
                                  <span class="<%=css['batteryStatusUnknown']%>">Unknown</span>
                                  <span class="<%=css['batteryStatusUnplugged']%>">Unplugged</span>
                                </td>
                              </tr>

                              <tr class="odd">
                                <td class="category categoryOdd lastRowItems" align=
                                "center">Memory</td>

                                <td class="lastRowItems">Memory Available</td>

                                <td class="lastRowItems">
                                  <span class="<%=css['memoryAvailable']%>"><%=memoryAvailable%>%</span>
                                  <span class="<%=css['memoryAvailableUndefined']%>">N/A</span>
                                </td>
                              </tr>

                              <tr class="even">
                                <td class="category categoryEven lastRowItems" align=
                                "center" rowspan="2">Storage</td>

                                <td class="lastRowItems">Device Storage Available</td>

                                <td class="lastRowItems">
                                  <span class="<%=css['deviceStorageAvailable']%>"><%=deviceStorageAvailable%>%</span>
                                  <span class="<%=css['deviceStorageAvailableUndefined']%>">N/A</span>
                                </td>
                              </tr>

                              <tr class="odd">
                                <td class="lastRowItems" style="display:none;"></td>

                                <td class="lastRowItems">Card Storage Available</td>

                                <td class="lastRowItems">
                                  <span class="<%=css['SDStorageAvailable']%>"><%=SDStorageAvailable%>%</span>
                                  <span class="<%=css['SDStorageAvailableUndefined']%>">N/A</span>
                                </td>
                              </tr>

                              <tr class="even">
                                <td class="category categoryOdd lastRowItems" align=
                                "center" rowspan="3">Apps</td>

                                <td class="lastRowItems">Apps Total</td>

                                <td class="lastRowItems">
                                  <span class="<%=css['totalAppNumber']%>"><%=totalAppNumber%></span>
                                  <span class="<%=css['totalAppNumberUndefined']%>">N/A</span>
                                </td>
                              </tr>

                              <tr class="odd">
                                <td class="lastRowItems" style="display:none;"></td>

                                <td class="lastRowItems">Apps Currently Running</td>

                                <td class="lastRowItems">
                                  <span class="<%=css['runningAppNumber']%>"><%=runningAppNumber%></span>
                                  <span class="<%=css['runningAppNumberUndefined']%>">N/A</span>
                                </td>
                              </tr>

                              <tr class="even">
                                <td class="lastRowItems" style="display:none;"></td>

                                <td class="lastRowItems">No. of Installed Apps</td>

                                <td class="lastRowItems">
                                  <span class="<%=css['downloadedAppNumber']%>"><%=downloadedAppNumber%></span>
                                  <span class="<%=css['downloadedAppNumberUndefined']%>">N/A</span>
                                </td>
                              </tr>

                              <tr class="odd">
                                <td class="category categoryEven lastRowItems" align=
                                "center">Backup</td>

                                <td class="lastRowItems">Last Backup Date</td>

                                <td class="lastRowItems">
                                  <span class="<%=css['lastBackupDate']%>"><%=lastBackupDate%></span>
                                  <span class="<%=css['lastBackupDateUndefined']%>">N/A</span>
                                </td>
                              </tr>

                              <tr class="even">
                                <td class="category categoryOdd lastRowItems" align=
                                "center">Sync</td>

                                <td class="lastRowItems">Sync'd Accounts</td>

                                <td class="lastRowItems">
                                  <span class="<%=css['syncedAccountNumber']%>">Sync'd Accounts Found <%=syncedAccountNumber%>: </span>
                                  <span class="<%=css['syncedAccountList']%>"><%=syncedAccountList%></span>
                                  <span class="<%=css['syncedAccountListNone']%>">None</span>
                                  <span class="<%=css['syncedAccountListUndefined']%>">N/A</span>
                                </td>
                              </tr>

                            </tbody>
                          </table>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="clear"></div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
    <div id="healthscanphonedialog" class="<%=css['displayDiagnosticsSuccessful']%>">
        <div class="header"><span class="title">Diagnostics Successful</span><span class="healthscan_date">TBD - 10/09/13 3:39PM</span><a class="healthscan_again" onclick="$('.button_healthscan').click();$('#healthscanphonedialog').css('visibility', 'hidden');">Scan Phone Again</a></div>

        <div class="main">
            <div class="success">
                <div class="success_details">
                    <!-- app list -->
                    <div class="healthscan_column_Performance">
                        <div class="healthscan_column_box">
                            <div class="healthscan_category_performance_snapshot_title">PERFORMANCE SNAPSHOT</div>
                            <div>
                                <table class="healthscan_performance_snapshot_table">
                                    <tbody>
                                        <tr class="healthscan_performance_snapshot_table_row_1">
                                            <td width="30px" class="snapshot_content_1" align="center"><img src="/web/img/green_dot.png" id="hsps_battery_level_icon">
                                            </td>
                                            <td id="hsps_battery_description" class="snapshot_content_1" width="194px">
                                                Battery Level:
                                            </td>

                                            <td id="hsps_total_app_number" class="snapshot_content_2" width="60px" align="right" rowspan="2"><%=totalAppNumber%></td>
                                            <td id="hsps_total_app_description_1" class="snapshot_content_4" width="160px" rowspan="2">
                                                Total Apps
                                            </td>

                                            <td id="hsps_current_app_running" class="snapshot_content_2" width="60px" align="right" rowspan="2"><%=runningAppNumber%></td>
                                            <td id="hsps_current_app_running_description_1" class="snapshot_content_1" width="160px">
                                                Apps Currently
                                            </td>
                                        </tr>
                                        <tr class="healthscan_performance_snapshot_table_row_2">
                                            <td>
                                            </td>
                                            <td id="hsps_battery_value" class="snapshot_content_5 battery_value high" width="194px">High</td>
											<td id="hsps_battery_value" class="snapshot_content_5 battery_value medium" width="194px">Medium</td>
											<td id="hsps_battery_value" class="snapshot_content_5 battery_value low" width="194px">Low</td>

                                            <td id="hsps_current_app_running_description_2" class="snapshot_content_5" width="160px">
                                                Running
                                            </td>
                                        </tr>

                                        <tr class="healthscan_performance_snapshot_table_row_1">
                                            <td width="30px" align="center" class="snapshot_content_1"><img src="/web/img/yellow_dot.png" id="hsps_device_performance_icon">
                                            </td>
                                            <td id="hsps_device_performance_description" class="snapshot_content_1" width="194px">
                                                Device Speed:
                                            </td>

                                            <td id="hsps_os_number" class="snapshot_content_2" width="60px" align="right" rowspan="2" style="border-bottom: 1px solid #d5d5d5;">V<%=osVersion%></td>
                                            <td id="hsps_hsps_os_description" class="snapshot_content_4" width="160px" rowspan="2" style="border-bottom: 1px solid #d5d5d5;">
                                                Operating System
                                            </td>

                                            <td class="snapshot_content_2" width="60px" align="right" rowspan="2" style="border-bottom: 1px solid #d5d5d5;">
                                                &nbsp;
                                            </td>
                                            <td class="snapshot_content_1" width="160px">
                                                &nbsp;
                                            </td>
                                        </tr>
                                        <tr class="healthscan_performance_snapshot_table_row_1">
                                            <td style="border-bottom: 1px solid #d5d5d5;">
                                            </td>
                                            <td id="hsps_device_performance_value" class="snapshot_content_5 device_performance_value high" width="194px" style="border-bottom: 1px solid #d5d5d5;">High</td>
											<td id="hsps_device_performance_value" class="snapshot_content_5 device_performance_value medium" width="194px" style="border-bottom: 1px solid #d5d5d5;">Medium</td>
											<td id="hsps_device_performance_value" class="snapshot_content_5 device_performance_value low" width="194px" style="border-bottom: 1px solid #d5d5d5;">Low</td>

                                            <td class="snapshot_content_1" width="160px" style="border-bottom: 1px solid #d5d5d5;">
                                                &nbsp;
                                            </td>
                                        </tr>
                                        <tr class="healthscan_performance_snapshot_table_row_1">
                                            <td width="30px" align="center" class="snapshot_content_1"><img src="/web/img/green_dot.png" id="hsps_available_storage_icon">
                                            </td>
                                            <td id="hsps_available_storage_description" class="snapshot_content_1" width="194px">
                                                Available Storage:
                                            </td>

                                            <td class="snapshot_content_2" width="60px" align="right" rowspan="2">
                                                <span id="device_storage_number"><%=memoryTotal%></span><span class="snapshot_content_3" id="device_storage_unit">
													<label class="device_storage_number giga">GB</label>
													<label class="device_storage_number mega">MB</label>
												</span>
                                            </td>
                                            <td id="hsps_device_storage_available_description_1" class="snapshot_content_1" width="160px"> 
                                                Device Storage
                                            </td>

                                            <td id="hsps_current_app_running" class="snapshot_content_2" width="60px" align="right" rowspan="2">
                                                <span id="sd_storage_available_number"><%=memorySDFree%></span><span class="snapshot_content_3" id="sd_storage_unit">
													<label class="device_storage_number giga">GB</label>
													<label class="device_storage_number mega">MB</label>
												</span>
                                            </td>
                                            <td id="hsps_sd_storage_available_description_1" class="snapshot_content_1" width="160px">
                                                SD Card
                                            </td>
                                        </tr>
                                        <tr class="healthscan_performance_snapshot_table_row_1">
                                            <td>
                                            </td>
                                            <td id="hsps_available_storage_value" class="snapshot_content_5 available_storage_value high" width="194px">High</td>
											<td id="hsps_available_storage_value" class="snapshot_content_5 available_storage_value medium" width="194px">Medium</td>
											<td id="hsps_available_storage_value" class="snapshot_content_5 available_storage_value low" width="194px">Low</td>
											
                                            <td id="hsps_device_storage_available_description_2" class="snapshot_content_5" width="160px">
                                                Available
                                            </td>
                                            <td id="hsps_sd_storage_available_description_2" class="snapshot_content_5" width="160px">
                                                Storage Available
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div class="healthscan_category_app_performance_title">YOUR APPS IMPACT ON PERFORMANCE</div>

<div id="healthscan_apps_performance_section" class="healthscan_column_box_2">
    <div id="apps_performance_table_wrapper" class="dataTables_wrapper" role="grid">
        <div class="top"></div>
        <div class="dataTables_scroll">
            <div class="dataTables_scrollHead" style="overflow: hidden; position: relative; border: 0px; width: 100%;">
                <div class="dataTables_scrollHeadInner" style="width: 640px; padding-right: 0px;">
                    <table cellpadding="0" cellspacing="0" border="0" class="my_display dataTable" style="margin-left: 0px; width: 640px;">
                        <thead>
                            <tr role="row">
                                <th class="sorting_disabled" tabindex="0" rowspan="1" colspan="1" aria-label="" style="width: 229px;">
                                    <div id="hsap_app_name" class="app_performance_app_name_header" ><span class="appNameSpan">App Name</span></div>
                                </th>
                                <th class="sorting_disabled" tabindex="0" rowspan="1" colspan="1" aria-label="" style="width: 120px;">
                                    <div id="hsap_last_used" class="app_performance_last_used_header" ><span class="lastUsedSpan">Last Used</span></div>
                                </th>
                                <th class="sorting_disabled" tabindex="0" rowspan="1" colspan="1" aria-label="" style="width: 98px;">
                                    <div id="hsap_battery" class="app_performance_battery_header_down"><span class="batterySpan">Battery</span></div>
                                </th>
                                <th class="sorting_disabled" tabindex="0" rowspan="1" colspan="1" aria-label="" style="width: 101px;">
                                    <div id="hsap_memory" class="app_performance_memory_header"><span class="memorySpan">Memory</span></div>
                                 </th>
                                 <th class="sorting_disabled" tabindex="0" rowspan="1" colspan="1" aria-label="" style="width: 113px;">
                                    <div id="hsap_storage" class="app_performance_storage_header"><span class="storageSpan">Storage</span></div>
                                </th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
            <div class="dataTables_scrollBody" style="overflow-y: auto; overflow-x: hidden; width: 100%; height: 246px;">
                <table cellpadding="0" cellspacing="0" border="0" class="my_display dataTable" id="apps_performance_table" style="margin-left: 0px; width: 640px;">
                    <thead>
                        <tr role="row" style="height: 0px;">
                            <th class="sorting_disabled" tabindex="0" rowspan="1" colspan="1" aria-label="" style="width: 229px; padding-top: 0px; padding-bottom: 0px; border-top-width: 0px; border-bottom-width: 0px; height: 0px;">
                            </th>
                            <th class="sorting_disabled" tabindex="0" rowspan="1" colspan="1" aria-label="" style="width: 120px; padding-top: 0px; padding-bottom: 0px; border-top-width: 0px; border-bottom-width: 0px; height: 0px;">
                            </th>
                            <th class="sorting_disabled" tabindex="0" rowspan="1" colspan="1" aria-label="" style="width: 98px; padding-top: 0px; padding-bottom: 0px; border-top-width: 0px; border-bottom-width: 0px; height: 0px;">
                            </th>
                            <th class="sorting_disabled" tabindex="0" rowspan="1" colspan="1" aria-label="" style="width: 101px; padding-top: 0px; padding-bottom: 0px; border-top-width: 0px; border-bottom-width: 0px; height: 0px;">
                            </th>
                            <th class="sorting_disabled" tabindex="0" rowspan="1" colspan="1" aria-label="" style="width: 113px; padding-top: 0px; padding-bottom: 0px; border-top-width: 0px; border-bottom-width: 0px; height: 0px;">
                            </th>
                        </tr>
                    </thead>
                    <tbody role="alert" aria-live="polite" aria-relevant="all" id="hsAppsRowPlaceHolder">

                    </tbody>
                </table>
            </div>
        </div>
        <div class="bottom"></div>
        <div class="clear"></div>

    </div>

</div>

                    </div>

                    <!-- details -->
                    <div class="healthscan_column_Performance healthscan_details_recommendations">
                        <div class="healthscan_category_recommendations">
                            <div class="healthscan_category_recommendations_title" id="healthscan_recommendations_title_section">
                                RECOMMENDATIONS
                            </div>
                            <div class="healthscan_category_recommendations_line">
                            </div>
                            <div id="healthscan_recommendations_battery_section">
                                <div class="healthscan_category_recommendations_title" id="healthscan_recommendations_battery_section_title">
                                    Battery
                                </div>
                                <div class="healthscan_category_recommendations_content" id="healthscan_recommendations_battery_section_content">
                                    By stopping apps that are running, especially high battery users, you will extend the life of your battery.
                                </div>

                            </div>
                            <div class="healthscan_category_recommendations_line">
                            </div>
                            <div id="healthscan_recommendations_memory_section">
                                <div class="healthscan_category_recommendations_title" id="healthscan_recommendations_memory_section_title">
                                    Memory
                                </div>
                                <div class="healthscan_category_recommendations_content" id="healthscan_recommendations_memory_section_content">
                                    By stopping apps that are running, especially high memory users, you will free up memory and improve your device speed.
                                </div>

                            </div>
                            <div class="healthscan_category_recommendations_line">
                            </div>
                            <div id="healthscan_recommendations_storage_section">
                                <div class="healthscan_category_recommendations_title" id="healthscan_recommendations_storage_section_title">
                                    Storage
                                </div>
                                <div class="healthscan_category_recommendations_content" id="healthscan_recommendations_battery_storage_content">
                                    Looking to free up space on your device? You can sort the app list by last used date to quickly see which apps you rarely use.
                                </div>

                            </div>
                        </div>
                    </div>
                </div>



            </div><!-- success details -->

        </div>
    </div>
</script>

        
<script type="text/template" id="appRowTemplate">
    <tr class="<%=oddEvenAlternator%>">
        <td class="">
            <table cellpadding="0" cellspacing="0" border="0">
                <tbody>
                    <tr>
                        <td align="left" style="padding-left:13px;font-weight:bold;border: none;word-break:break-all"><%=name%></td>
                    </tr>
                    <tr>
                        <td align="left" style="padding-left:13px;font-color:#666666;border: none;">(System App)</td>
                    </tr>
                </tbody>
            </table>
        </td>
        <td class="">
            <div style="text-align: center;"><%=lastUsed%></div>
        </td>
        <td class="">
            <table cellpadding="0" cellspacing="0" border="0">
                <tbody>
                    <tr>
                        <td width="98px" align="center" style="border: none;">
                            <span style="padding-left:8px;padding-bottom:5px"><%=batteryRating%></span>
                        </td>
                    </tr>
                    <tr>
                        <td width="98px" align="center" style="border: none;">Battery Usage</td>
                    </tr>
                </tbody>
            </table>
        </td>
        <td class="">
            <table cellpadding="0" cellspacing="0" border="0">
                <tbody>
                    <tr>
                        <td width="101px" align="center" style="border: none;">
                            <span style="padding-left:8px;padding-bottom:5px"><%=memoryRating%></span>
                        </td>
                    </tr>
                    <tr>
                        <td width="101px" align="center" style="border: none;">Memory Usage</td>
                    </tr>
                </tbody>
            </table>
        </td>
        <td class="">
            <table cellpadding="0" cellspacing="0" border="0">
                <tbody>
                    <tr>
                        <td width="93px" align="center" style="border: none;">
                            <span style="padding-left:8px;padding-bottom:5px"><%=storageRating%></span>
                        </td>
                    </tr>
                    <tr>
                        <td width="93px" align="center" style="border: none;">Device Storage</td>
                    </tr>
                </tbody>
            </table>

        </td>
    </tr>
</script>

