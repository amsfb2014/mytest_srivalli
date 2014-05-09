(function() {
    module("DialogTest", {
        setup: function() {
            
        },
        teardown: function() {
            
        }
    });
})();

test("AMA.view.Dialog.prototype function test", function () {
    equal(typeof AMA.view.Dialog.prototype.initialize, "function", "AMA.view.Dialog.prototype.initialize is a function");
    equal(typeof AMA.view.Dialog.prototype.show, "function", "AMA.view.Dialog.prototype.show is a function");
    equal(typeof AMA.view.Dialog.prototype.hide, "function", "AMA.view.Dialog.prototype.hide is a function");
    equal(typeof AMA.view.Dialog.prototype.setContent, "function", "AMA.view.Dialog.prototype.setContent is a function");
});