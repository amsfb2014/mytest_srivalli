<script type="text/template" id="privacy_template">
    <div id="privacy">
        <div id="privacy_right">
            <div class="col-sm-6 privacy_column">
                <div class="col-sm-12" id="privacy_searchinput_container">
                    <input type="text" id="privacy_searchinput" placeholder="Search" class="rs_searchinput commands_searchfaded inputfadedtext">
					 <div class="privacy_go btn btn_mini" id="app_assist_go" >Go</div>
                </div>
                <div class="privacy_header">
                    <div id="privacy_category">You Currently Have <span class="threat_count_all"><%=total%></span> Apps Installed On Your
                        Phone
                    </div>
                </div>
                <div id="appassist_filter_label">
                    Use these filters below to see how apps can access your personal info.
                </div>
                <div class="privacy_sort_and_filter">
                    <div class="col-sm-12 privacy_filter">
                        <b class="col-sm-2 searchLable">Filter Apps:</b>
                        <select id="privacy_filter">
                            <option value="all">Show all apps</option>
                            <option value="messageAccessRating">Access your messages or pictures</option>
                            <option value="locationAccessRating">Track your location</option>
                            <option value="personalInfoAccessRating">Access and send personal info</option>
                            <option value="batteryOrMemoryUsageRating">Use lots of battery</option>
<!--                            <option value="Games">Games</option>
                            <option value="Social Networking">Social Networking Apps</option>
                            <option value="Travel and Navigation">Navigation Apps</option>
                            <option value="Other">Other Apps</option>-->
                        </select>
                    </div>
                    <div class="col-sm-12 privacy_sort">
                        <b class="col-sm-2 searchLable">Sort Apps:</b>
                        <select id="privacy_sort">
                            <option value="name-asc">A-Z sort by name</option>
                            <option value="name-desc">Z-A sort by name</option>
                            <option value="vulnerabilityRatingScore-desc">Device Access(High to Low)</option>
                            <option value="vulnerabilityRatingScore-asc">Device Access(Low to High)</option>
                        </select>
                    </div>
                </div>
                <div class="clear"></div>
                <div class="divider"></div>
                <div id="privacy_rowbox" batchnumber="0">
                </div>
            </div>
            <div class="col-sm-6 privacy_column privacy_details_column">
                <div id="privacy_details" class="details_outer loading_big" style="display: block;"> </div>
                <div class="hidden">
                    <div class="details_threat_access_details personalInfoAccessRating"><strong>Personal Info </strong></div>
                    <div class="details_threat_access_details locationAccessRating"><strong>Location </strong></div>
                    <div class="details_threat_access_details messageAccessRating"><strong>Messages </strong></div>
                    <div class="details_threat_access_details batteryOrMemoryUsageRating"><strong>Battery or Memory </strong></div>
                    <div class="details_threat_access_details emptyPrivacyDetails">No specific device access for this app.</div>
                </div>

            </div>
        </div>
    </div>
</script>

<script type="text/template" id="privacy_details_template">
    <div class="details_threat <%=hasItem%>">
        <div class="details_indented">
            <div class="details_namebox details_bigtext" title="1 A"><%=name%></div>
            <div class="details_threat_global_impact"><span class="global_impact_indicator gi_<%=vulnerabilityRatingScore%>"></span> <%=vulnerabilityRating%>
            </div>
            <div class="divider"></div>
            <br>
            <div class="details_threat_access">
                <%=summary%>
            </div>
        </div>
        <div style="clear: both;"></div>
    </div>
</script>
<script type="text/template" id="privacy_list_template">
    <div class="rt_rowthreat rt_rowlighter" id="privacy_row_<%=id%>" uid="<%= id %>"
         batteryOrMemoryUsageRating="<%=batteryOrMemoryUsageRating%>"
         personalInfoAccessRating="<%=personalInfoAccessRating%>"
         locationAccessRating="<%=locationAccessRating%>"
         messageAccessRating="<%=messageAccessRating%>">
        <div col="0" style="left: 0%; width: 98%;*width:auto;" class="rt_column">
            <div class="rt_rowthreatname"><%=name%></div>
            <div class="rt_threat_global_impact">
                <span class="global_impact_indicator gi_<%=vulnerabilityRatingScore%>"></span><%=vulnerabilityRating%>
            </div>
        </div>
    </div>
    <div class="divider"><!-- divider --></div>
</script>