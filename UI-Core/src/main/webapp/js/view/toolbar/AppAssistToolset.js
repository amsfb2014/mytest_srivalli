/*! AppAssistToolset */
(function () {

    AMA.namespace("view");

    var AppAssistToolset = AMA.view.AppAssistToolset = AMA.view.BaseView.extend();

    AppAssistToolset.TEMPLATE_ID = "app_assist_toolset_template";
    AppAssistToolset.TEMPLATE_SRC = "";


    _.extend(AppAssistToolset.prototype, {

        _processData: function(data) {
            if(!this.data.attributes.total){
                this.data.attributes.total = this.data.length;
            }
            return this.data.attributes;
        }
    });


})();

