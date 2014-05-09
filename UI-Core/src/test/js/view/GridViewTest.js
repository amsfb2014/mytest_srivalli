/* var $J = (jQuery || {}),
	Jebber = (Jebber || {});
*/
(function() {
	module("GridViewTest", {
		setup: function() {
			// backup globals
			savedglobals={};
			
			if ($("#gridview_test_div").length === 0) {
                $("<div/>", {
                    id: "gridview_addtophone_test_div",
                    class: "btn_addtophone",
                    style: "display:none"
                }).appendTo("body");
            }
            $("#gridview_test_div").html("");
		},
		teardown: function() {
			// restore globals
		}
	});
})();

test("AMA.view.GridView.prototype function test", function () {
	var o2, o3={};

	equal(typeof AMA.view.GridView.prototype.initialize, "function", "AMA.view.GridView.prototype.initialize is a function");
	equal(typeof AMA.view.GridView.prototype.render, "function", "AMA.view.GridView.prototype.render is a function");
	equal(typeof AMA.view.GridView.prototype._processData, "function", "AMA.view.GridView.prototype._processData is a function");
	equal(typeof AMA.view.GridView.prototype._getStatusText, "function", "AMA.view.GridView.prototype._getStatusText is a function");
	equal(typeof AMA.view.GridView.prototype.addToPhone, "function", "AMA.view.GridView.prototype.addToPhone is a function");
});

test("AMA.view.GridView.prototype._processData function test", function () {
	var o1 = {"id":"test", "thumbnailUrl":"/thumb", "fileName":"file.png"}, o2={}, i=0;
	o2 = AMA.view.GridView.prototype._processData(o1, i);
	equal(JSON.stringify(o2), '{"id":"test","thumbnailUrl":"/thumb","fileName":"file.png","itemUid":"test","rowId":"ct_row_test","thumbUrl":"/thumb&amp;fileName=file.png","downUrl":"undefined&amp;fileName=file.png","statusText":"Web only","addToPhoneClass":"btn_addtophone"}', "AMA.view.GridView.prototype._processData expected value");
});

test("AMA.view.GridView.prototype._getStatusText function test", function () {
	var s, o1 = {"id":"test", "onPhone":true, "pendingDelete":true, "pendingCreate":false},
		o2 = {"id":"test", "onPhone":true, "pendingDelete":false, "pendingCreate":false},
		o3 = {"id":"test", "onPhone":false, "pendingDelete":false, "pendingCreate":true},
		o4 = {"id":"test", "onPhone":false, "pendingDelete":false, "pendingCreate":false};
	s = AMA.view.GridView.prototype._getStatusText(o1);
	equal(s, "Removed At Next Sync", "AMA.view.GridView.prototype._processData onPhone, pendingDelete expected value");
	s = AMA.view.GridView.prototype._getStatusText(o2);
	equal(s, "On Phone", "AMA.view.GridView.prototype._processData onPhone expected value");
	s = AMA.view.GridView.prototype._getStatusText(o3);
	equal(s, "Added At Next Sync", "AMA.view.GridView.prototype._processData pendingCreate expected value");
	s = AMA.view.GridView.prototype._getStatusText(o4);
	equal(s, "Web only", "AMA.view.GridView.prototype._processData expected value");
});

test("AMA.view.GridView.prototype.addToPhone function test", function () {
    var o = $("#gridview_addtophone_test_div");
    AMA.view.GridView.prototype.addToPhone(o);
    equal(o.className, "btn_removefromphone", "AMA.view.GridView.prototype.addToPhone expected value");
});