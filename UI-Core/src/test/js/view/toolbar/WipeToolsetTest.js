(function() {
    module("WipeToolsetTest", {
        setup: function() {
            
        },
        teardown: function() {
            
        }
    });
})();

test("AMA.view.WipeToolset.prototype object and function test", function () {
    equal(typeof AMA.view.WipeToolset.prototype.events, "object", "AMA.view.WipeToolset.prototype.events is an object");
    equal(typeof AMA.view.WipeToolset.prototype.initialize, "function", "AMA.view.WipeToolset.prototype.initialize is a function");
    equal(typeof AMA.view.WipeToolset.prototype.render, "function", "AMA.view.WipeToolset.prototype.render is a function");
    equal(typeof AMA.view.WipeToolset.prototype.toggleDisplay, "function", "AMA.view.WipeToolset.prototype.toggleDisplay is a function");
    equal(typeof AMA.view.WipeToolset.prototype._processData, "function", "AMA.view.WipeToolset.prototype._processData is a function");
    equal(typeof AMA.view.WipeToolset.prototype._showDialog, "function", "AMA.view.WipeToolset.prototype._showDialog is a function");
    equal(typeof AMA.view.WipeToolset.prototype._showRestoreSteps, "function", "AMA.view.WipeToolset.prototype._showRestoreSteps is a function");
});