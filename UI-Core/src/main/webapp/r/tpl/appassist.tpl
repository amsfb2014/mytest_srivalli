<script type="text/template" id="privacy_template">
    <div id="privacy">
        <div class="hidden-md hidden-lg hidden-sm toggle-submenu">
            <a class="submenu-show" data-toggle="modal" data-target="#app_assist-menu-tab-sm-full">
                <span class="submenu-left"></span>
                <span class="submenu-label">All Apps</span>

            </a>
        </div>
        <div id="app_assist-menu-tab-sm-full" class="modal fade ama-submenu ama-menu hidden-md hidden-sm hidden-lg">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-body">
                        <ul class="menu">
                            <li id="" class="report_event" data-dismiss="modal">
                                <h4>Filter</h4>
                                <a href="javascript:return false;" class="privacy_filter" data-value="all" data-dismiss="modal">All Apps</a>
                                <a href="javascript:return false;" class="privacy_filter" data-value="messageAccessRating" data-dismiss="modal">Access your messages or pictures</a>
                                <a href="javascript:return false;" class="privacy_filter" data-value="locationAccessRating" data-dismiss="modal">Track your location</a>
                                <a href="javascript:return false;" class="privacy_filter" data-value="personalInfoAccessRating" data-dismiss="modal">Access and send personal info</a>
                                <a href="javascript:return false;" class="privacy_filter" data-value="batteryOrMemoryUsageRating" data-dismiss="modal">Use lots of battery</a>
                            </li>
                            <li id="" class="report_event">
                                <h4>Sort</h4>
                                <a href="javascript:return false;" class="privacy_sort" data-value="name-asc"  data-dismiss="modal">A-Z sort by name</a>
                                <a href="javascript:return false;" class="privacy_sort" data-value="name-desc" data-dismiss="modal">Z-A sort by name</a>
                                <a href="javascript:return false;" class="privacy_sort" data-value="vulnerabilityRatingScore-desc" data-dismiss="modal">Device Access(High to Low)</a>
                                <a href="javascript:return false;" class="privacy_sort" data-value="vulnerabilityRatingScore-asc" data-dismiss="modal">Device Access(Low to High)</a>
                            </li>
                        </ul>
                    </div>

                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
            <div class="modal-footer">
                <a href="javascript:return false;" class="" data-dismiss="modal"><span class="glyphicon glyphicon-chevron-up"></span><br/>Close Menu</a>
            </div>
        </div><!-- /.modal -->

        <div id="privacy_rowbox_container" batchnumber="0" class="col-sm-6 col-md-3 col-lg-3 list_bordered">
            <form class="form-horizontal hidden-xs" role="search" onsubmit="javascript:return false;">
                <div class="form-group input-group">
                    <span class="input-group-addon icon webbycons-search"></span>
                    <input type="text" id="privacy_searchinput" placeholder="Search" class="rs_searchinput commands_searchfaded inputfadedtext form-control" placeholder="Search">
                </div>
            </form>
            <div class="privacy_sort_and_filter hidden-xs">
                <form class="form-horizontal" role="filter" onsubmit="javascript:return false;">
                    <div class="form-group">
                        <label class="col-sm-3 col-md-3 col-lg-3" for="privacy_filter">Filter</label>
                        <div class="col-sm-9 col-md-9 col-lg-9">
                            <select id="privacy_filter">
                                <option value="all">Show all apps</option>
                                <option value="messageAccessRating">Access your messages or pictures</option>
                                <option value="locationAccessRating">Track your location</option>
                                <option value="personalInfoAccessRating">Access and send personal info</option>
                                <option value="batteryOrMemoryUsageRating">Use lots of battery</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 col-md-3 col-lg-3" for="privacy_sort">Sort</label>
                        <div class="col-sm-9 col-md-9 col-lg-9">
                            <select id="privacy_sort">
                                <option value="name-asc">A-Z sort by name</option>
                                <option value="name-desc">Z-A sort by name</option>
                                <option value="vulnerabilityRatingScore-desc">Device Access(High to Low)</option>
                                <option value="vulnerabilityRatingScore-asc">Device Access(Low to High)</option>
                            </select>
                        </div>
                    </div>
                </form>
            </div>
            <div class="scrollable " id="app_assist_list_container" >
                <table id="" batchnumber="0" class="table ">
                    <tbody id="privacy_rowbox"></tbody>
                </table>
            </div>
        </div>
        <div class=" col-sm-6 col-md-9 col-lg-9 privacy_column privacy_details_column details_bordered">
            <div id="privacy_details" class="details_outer loading_big" style="display: block;"> </div>
            <div class="hidden">
                <div class="details_threat_access_details personalInfoAccessRating"><span class="icon webbycons-addressbook"></span> </div>
                <div class="details_threat_access_details locationAccessRating"><span class="icon webbycons-locate"></span> </div>
                <div class="details_threat_access_details messageAccessRating"><span class="icon webbycons-battery"></span> </div>
                <div class="details_threat_access_details batteryOrMemoryUsageRating"><span class="icon webbycons-battery"></span> </div>
                <div class="details_threat_access_details emptyPrivacyDetails"><span class="icon webbycons-question"></span> No specific device access for this app.</div>
            </div>

        </div>
    </div>
</script>

<script type="text/template" id="privacy_details_template">
    <div class="details_threat <%=hasItem%>">
        <div class="details_indented clearfix">
            <h3 class="details_namebox hidden-xs details_bigtext"><%=name%></h3>
            <div class="pull-left hidden-xs">
                <span class="vulnerabilityRatingContainer gi_<%=vulnerabilityRatingScore%>">
                    <span class="vulnerabilityRatingBox"></span>
                    <span class="vulnerabilityRatingBox"></span>
                    <span class="vulnerabilityRatingBox"></span>
                    <span class="vulnerabilityRatingBox"></span>
                    <span class="vulnerabilityRatingBox"></span>
                    <span class="vulnerabilityRating"><%=vulnerabilityRating%></span>
                </span>

            </div>
        </div>
        <div class="details_threat_access">
            <%=summary%>
        </div>
    </div>
</script>
<script type="text/template" id="privacy_list_template">
    <tr class="rt_rowthreat rt_rowlighter" id="privacy_row_<%=id%>" uid="<%= id %>"
        batteryOrMemoryUsageRating="<%=batteryOrMemoryUsageRating%>"
        personalInfoAccessRating="<%=personalInfoAccessRating%>"
        locationAccessRating="<%=locationAccessRating%>"
        messageAccessRating="<%=messageAccessRating%>">
        <td class="row">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 pull-left"><%=name%></div>
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 pull-left">
                    <span class="vulnerabilityRatingContainer  pull-left gi_<%=vulnerabilityRatingScore%>">
                        <span class="vulnerabilityRatingBox"></span>
                        <span class="vulnerabilityRatingBox"></span>
                        <span class="vulnerabilityRatingBox"></span>
                        <span class="vulnerabilityRatingBox"></span>
                        <span class="vulnerabilityRatingBox"></span>
                        <span class="vulnerabilityRating"><%=vulnerabilityRating%></span>
                    </span>
            </div>
            <div class="clearfix details-sm hidden-md hidden-sm  hidden-lg" id="set_details<%=id%>">

            </div>
        </td>
    </tr>
</script>