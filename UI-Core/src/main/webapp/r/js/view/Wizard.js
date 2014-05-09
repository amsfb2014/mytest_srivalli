/*! Wizard */
(function () {

    AMA.namespace("view");

    var Wizard = AMA.view.Wizard = AMA.view.Modal.extend();

    Wizard.TEMPLATE_ID = "";
    Wizard.TEMPLATE_SRC = "";

    Wizard.CSS = {
        STEP: "wiz_step",
        FIRST: "wiz_first",
        LAST: "wiz_last",
        ACTIVE: "current"
    };

    /**
     * TODO: Should Extend Dialog instead of baseView!
     * @param options
     *          TEMPLATE_ID load the template ID
     *          stepClass all step container should have a common class
     *                      ex:
     *                      <li class="step_wiz">....</li>
     *                      <li class="step_wiz">....</li>
     *                      <li class="step_wiz">....</li>
     *                      <li class="step_wiz">....</li>
     */
    AMA.augment(Wizard.prototype, {

        initialize: function () {
            Wizard.__super__.initialize.apply(this, arguments);
            Wizard.CSS = this.options.CSS || Wizard.CSS;
        },

        render: function () {
            Wizard.__super__.render.apply(this, arguments);
        },
        /*show: function() {
            Wizard.__super__.show.apply(this, arguments);
            // this._setupSteps();
            this.dialog = new AMA.view.Dialog({

            });
            this.dialog.show();
        },*/

        _setupEvents: function() {
            var o = this;
            this._setupSteps();
            // next steps:
            this.$el.find(".next").on("click", function() {
                $(o.steps[o.steps.index(o.$el.find(".modal-content ." + Wizard.CSS.ACTIVE))])
                        .removeClass(Wizard.CSS.ACTIVE)
                        .next()
                        .addClass(Wizard.CSS.ACTIVE);
                $(o.footerSteps[o.footerSteps.index(o.$el.find(".modal-footer ." + Wizard.CSS.ACTIVE))])
                        .removeClass(Wizard.CSS.ACTIVE)
                        .next()
                        .addClass(Wizard.CSS.ACTIVE);
            });
            // prev
            this.$el.find(".previous").on("click", function() {
                $(o.steps[o.steps.index(o.$el.find(".modal-content ."+Wizard.CSS.ACTIVE))])
                        .removeClass(Wizard.CSS.ACTIVE)
                        .prev()
                        .addClass(Wizard.CSS.ACTIVE);
                $(o.footerSteps[o.footerSteps.index(o.$el.find(".modal-footer ."+Wizard.CSS.ACTIVE))])
                        .removeClass(Wizard.CSS.ACTIVE)
                        .prev()
                        .addClass(Wizard.CSS.ACTIVE);
            });

            // CLOSE!
            //this.$el.find(".close").on("click", function() {
            //    o.$el.dialog("close");
            //    o.hide();
            //});

            this.$el.find(".done").on("click", function() {
                // TODO: add callback on done
                // o.options.done();
            });



        },

        _setupSteps: function() {
            var o = this,
               steps = this.$el.find("." + Wizard.CSS.STEP),
               footerSteps = this.$el.find("." + Wizard.CSS.STEP + "_footer" );
            // register steps;
            steps.each(function(i) {
               $(this).attr("id", o.el.id + "_" + i);
            });
            // hide all steps
            steps.hide();
            footerSteps.hide();
            // identify first and last;
            // 0 is always the first!
            $(steps[0]).addClass(Wizard.CSS.FIRST + " " + Wizard.CSS.ACTIVE);
            $(footerSteps[0]).addClass(Wizard.CSS.FIRST + " " + Wizard.CSS.ACTIVE);
            $(steps[steps.length-1]).addClass(Wizard.CSS.LAST);
            $(footerSteps[footerSteps.length-1]).addClass(Wizard.CSS.LAST);
            this.steps = steps;
            this.footerSteps = footerSteps;

        }
    });


})();

