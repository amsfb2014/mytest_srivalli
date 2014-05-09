/*! BaseView */
(function () {

	AMA.namespace("view");

	/**
	 * BaseView is the base class for all view implementations. It provides the
	 * essential mechanisms to enable view hierarchies, template loading,
	 * data handling, template-based rendering and event handling.
	 *
	 * @class BaseView
	 * @namespace view
	 * @extends Backbone.View
	 * @constructor
	 * @abstract
	 */
	var BaseView = AMA.view.BaseView = Backbone.View.extend();


	/**
	 * The template ID which corresponds to the 'id' property of the template
	 * <script> used by this class.
	 *
	 * IMPORTANT: All implementation classes that derive from BaseView must
	 * define this.
	 *
	 * @property TEMPLATE_ID
	 * @type string
	 * @static
	 * @final
	 */
	BaseView.TEMPLATE_ID = "base_template";

	/**
	 * Applicable only to view classes that fetch the aggregated templates for
	 * itself and its child views, this property defines the name of the
	 * template file to load. The path is defined in AMA.config.templatePath.
	 *
	 * @property TEMPLATE_SRC
	 * @type string
	 * @static
	 * @final
	 */
	BaseView.TEMPLATE_SRC = "";
	// TODO: Toolbar (formerly "header") template should be included in .tpl as well

	// TODO: Move the isTemplateLoaded flag here, as class-wide (static) flag

	/**
	 * Standard view events include:
	 *
	 *   EVENT.TEMPLATE_LOADED
	 *   EVENT.DATA_LOADED
	 *   EVENT.RENDERED
	 *   EVENT.SHOWN
	 *   EVENT.HIDDEN
	 *   EVENT.UPDATED
	 *
	 * @property EVENT
	 * @enum
	 * @static
	 * @final
	 */
	BaseView.EVENT = AMA.enums(
			"TEMPLATE_LOADED",
			"DATA_LOADED",
			"RENDERED",
			"SHOWN",
			"HIDDEN",
			"UPDATED"
	);
    Backbone.globalEvent = _.extend({}, Backbone.Events);

	AMA.augment(BaseView.prototype, {

		/**
		 * Standard initialization method called when the view is instantiated.
		 * Overrides of this method would normally invoke the base method
		 * as in this example (with ViewClass as the implementation class):
		 *
		 * ViewClass.__super__.initialize.apply(this, arguments)
		 *
		 * This method accepts an 'options' parameter that can contain any of
		 * these:
		 *
		 *   el         The container element that is already in the DOM
		 *   parent     The parent view
		 *   hidden     If true, this view is initially hidden even after render
         *   locale     The locale for the view (e.g. "en-gb").  If not specified,
         *              the view gets the locale value from AMA.config.locale.
		 *   data       The data, which is an instance of any BaseData-derived
		 *   			collection class
		 *   dataClass  Identifies the BaseData-derived class of the data. This
		 *              is used when using setData() to pass non-collection-type
		 *              data to the view, with the view auto-wrapping it in a
		 *              proper instance of this class.
		 *
		 * Apart from the above, this method behaves exactly like Backbone.js
		 * implementation.
		 *
		 * @method initialize
		 * @param {object} options Any combination of the options listed above
		 */
	    initialize: function () {
			AMA.debug("Initializing view [el: " + this.options.el +
	    			", parent: " + (this.options.parent && this.options.parent.options.el || "---") + "]");

	    	this.parent = this.options.parent || null;
			this.children = [];
			this.hidden = this.options.hidden || false;

			this.template = "";
			this.data = this.options.data || null;
			this.dataClass = this.options.dataClass || null;
            this.locale = this.options.locale || AMA.config.locale;

			// status flags
			this.isRendered = false;
			this.isTemplateLoaded = false;
			this.isActive = false;

			// Identify this view to its parent
			if (this.parent) {
				this.parent.children.push(this);
			}

			// If this is a template-fetcher class, fetch the template
			if (this.constructor.TEMPLATE_SRC) {
				this._fetchTemplate();
			}

			// This is used by the plug() method to backup original properties
			// when the plug-in is trying to override them.
			this.__beforePlug__ = {};
			
			// TODO: Remove 'noAutoRefresh' hack once auto-refresh bug is solved
			// If view has data, make sure it auto-refreshes whenever the
			// data is reloaded as indicated by the data 'loaded' event
			if (this.data && !this.options.noAutoRefresh) {
				this._initAutoRefresh();
			}

            // Ensure to propagate 'loaded' event from data into the view
            if (this.data) {
                this.data.on(AMA.model.BaseData.EVENT.LOADED, function () {
                    this.trigger(BaseView.EVENT.DATA_LOADED);
                }, this);
            }
            $( window ).resize($.proxy(this._onPageResize, this));

        },
	
	    /**
	     * Initializes the auto-refresh mechanism
	     * 
	     * @method _initAutoRefresh
	     * @private
	     */
	    _initAutoRefresh: function () {
			this.data.on(AMA.model.BaseData.EVENT.LOADED + " " + AMA.model.BaseData.EVENT.UPDATED, function () {
				// Only refresh when this view has already been
				// rendered the first time
				if (this.isRendered) {
					this.refresh();
				}
			}, this);
	    },


	    /**
	     * Shows the view. If the view has not been rendered yet, this also
	     * invokes the rendering.
	     *
	     * @method show
	     */
		show: function () {
			AMA.debug("Showing " + this.options.el);

			if (!this.isRendered) {
				this._doRender();
			}

			this.$el.show();

			// Clear the 'initially hidden' flag (if any)
			this.hidden = false;

			// Trigger a 'shown' event
			this.trigger(BaseView.EVENT.SHOWN);
		},


		/**
		 * Hides the view.
		 *
		 * @method hide
		 */
		hide: function () {
			AMA.debug("Hiding " + this.options.el);

			this.$el.hide();

			// Trigger a 'hidden' event
			this.trigger(BaseView.EVENT.HIDDEN);
		},


		/**
		 * Renders the view from the template based on data (if any).
		 *
		 * @method render
		 */
		render: function () {
			var data = (this.data && this.data.length > 0) ? this.data.toJSON()[0] : {},
				content = "";

			// Generate the content from template + data
			content = _.template(this.template, this._processData(data));

			// Attach the content to the container element
			this.$el.html(content);
		
		},

        _onPageResize: function() {},


        /**
		 * Refreshes the view.
		 *
		 * @method refresh
		 */
		refresh: function () {
			this._doRender();
		},


		/**
		 * Performs data pre-processing prior to rendering.
		 *
		 * The base implementation of this method is pass-through. You need
		 * to override this when you need to set the values for specific
		 * data fields that are required by the view's template but are not
		 * readily available from the data model.
		 *
		 * @method _processData
		 * @protected
		 */
		_processData: function (item, index) {

			return item;
		},


	    /**
	     * Performs actions prior to rendering. The default implementation
	     * does nothing.
	     *
	     * This can be overridden by plug-ins to implement a different behavior
	     * before rendering. However, subclasses should instead just override
	     * render() directly.
	     *
	     * @method _beforeRender
	     * @protected
	     */
		_beforeRender: function () {

		},


	    /**
	     * Performs post-rendering actions. The default implementation is for
	     * the view to invoke the rendering of all its children.
	     *
	     * This can be overridden by plug-ins to implement a different behavior
	     * after rendering. However, subclasses should instead just override
	     * render() directly.
	     *
	     * @method _afterRender
	     * @protected
	     */
		_afterRender: function () {
			// Also render all child views
			_.each(this.children, function(v) {
				v._doRender();
			});
		},


		/**
		 * Defines event handlers for this view.  The BaseView implementation
		 * is abstract; subclasses would normally override this.
		 *
		 * IMPORTANT: Define here only event handlers that apply to events that
		 * are triggered by DOM elements rendered by this view.  To listen to
		 * events from external elements, declare those event handlers in the
		 * initialize() override instead.
		 *
		 * The reason for the above is that this method is called every time
		 * the view is re-rendered.  Re-rendering effectively replaces all DOM
		 * elements in it, so any pre-existing event handlers for those are
		 * discarded.  The same is not true for event handlers on external
		 * elements, though.
		 *
		 * @method _setupEvents
		 * @protected
		 */
		_setupEvents: function () {
			
	     },


		/**
		 * Returns the child view based on the given container ID.
		 *
		 * @method getChild
		 * @param {string} id The container ID of the child view
		 * @returns {object} The child view
		 */
		getChild: function (id) {
			// TODO: Convert this into regular (looped) lookup
			var arr = _.filter(this.children, function(v){
				return v.$el.attr("id") == id;
			});
			return arr.length > 0 ? arr[0] : null;
		},


		/**
		 * Replaces the view's data, then re-renders the view.
		 *
		 * This method accepts either standard BaseData-derived collection or
		 * a singular model.  In the case of the latter, if the view has a
		 * 'dataClass' property defined, the singular model will be wrapped
		 * into a single-element collection of type indicated by 'dataClass'.
		 *
		 * If no data is passed, this method essentially resets the view's
		 * data.  In this case, however, the 'dataClass' property needs to be
		 * defined, so that the method can create an empty data of that type.
		 *
		 * @method setData
		 * @param {object} data The new data
		 */
		setData: function (data) {
			AMA.debug("Replacing data of view " + this.options.el);

			if (this.dataClass) {
				// Create empty collection if data is not specified
				if (!data) {
					data = new this.dataClass();

				}
				// Auto-wrap the data if it is a singular model
				else if (typeof data.isLoaded === "undefined" && data.cid) {
					data = new this.dataClass([data]);
				}

                // Prevent fetching for this scenario
                data.isLoaded = true;
			}
			
			// Remove the auto-refresh link to the previous data (if any)
			if (this.data) {
				this.data.off(AMA.model.BaseData.EVENT.LOADED + " " + AMA.model.BaseData.EVENT.UPDATED, this._initAutoRefresh);
			}

			this.data = data;
			
			// Re-link the new data to the auto-refresh mechanism
			if (!this.options.noAutoRefresh) {
				this._initAutoRefresh();
			}

			this._doRender();
		},


		/**
		 * Attaches a plug-in to the view.
		 *
		 * Plug-ins add functionality to the host view without having to build
		 * the feature, or even make awareness of it, into the view class
		 * itself.  This allows having a mix-and-match of features per view
		 * instance.
		 *
		 * Each plug-in has a mandatory '__name__' property that identifies the
		 * plug-in.  It may also have an optional '__onPlug__' method that would
		 * be invoked once plugging has completed.  This method is useful when
		 * we need some plug-in initialization on the host view.
		 *
		 * When the plug-in overrides a property of the view, it creates a
		 * backup of that property in an internal object called '__beforePlug__'.
		 * For example, if a plug-in named 'Decorator' overrides the view's
		 * 'render' method, the original method can still be invoked within the
		 * plug-in as: this.__beforePlug__.Decorator.render().
		 *
		 *
		 * @method plug
		 * @param {object} plugin The plug-in class
		 * @returns {object} The view instance with the plug-in already attached
		 */
		plug: function (plugin, options) {
			if (!plugin) return this;

			AMA.assert(plugin.__name__, "Plug-in must have property '__name__' defined");

			// Copy all properties from the plug-in
			for (var key in plugin) {
				if (!Object.prototype.hasOwnProperty.call(plugin, key)) {
					continue;
				}

				// Exclude special properties '__name__' and '__onPlug__'
				if (key === "__name__" || key === "__onPlug__") {
					continue;
				}

				// If property exists on the view, store a backup copy of the original
				if (this[key]) {
					this.__beforePlug__[plugin.__name__] = this.__beforePlug__[plugin.__name__] || {};
					this.__beforePlug__[plugin.__name__][key] = this[key];
				}

				this[key] = plugin[key];
			}

			// Invoke the plug-in initialization method, if any
			if (plugin.__onPlug__) {
				plugin.__onPlug__.call(this, options);
			}

			return this;
		},


		/**
		 * Fetches the template file from the server.
		 *
		 * This method does not normally need any override.
		 *
		 * @method _fetchTemplate
		 * @private
		 */
		_fetchTemplate: function () {

	        var o = this,
                localePath = this.locale ? this.locale+"/" : "",
		        conf = {
		            url: AMA.config.templatePath + localePath + o.constructor.TEMPLATE_SRC,
		            success: $.proxy(o._afterFetchTemplate, o),
		            complete: function () {},
		            error: function() {
		            	AMA.error("Failed to fetch template from " + o.constructor.TEMPLATE_SRC);
		            }
		        };

			AMA.debug("View " + this.options.el + " started fetching template from " + conf.url);

		    // Send the AJAX request
		    $.ajax(conf);
		},


		/**
		 * Callback method invoked after template is downloaded.
		 *
		 * This method does not normally need any override.
		 *
		 * @method _afterFetchTemplate
		 * @private
		 */
		_afterFetchTemplate: function (html) {
			AMA.debug("View " + this.options.el + " has finished fetching its template");

			// Insert aggregated template into HTML body
			// TODO: Don't attach templates into DOM
	    	if ($("#ama_templates").length === 0) {
	        	$("<div/>", {
	        		id: "ama_templates",
	        		style: "display:none"
	        	}).appendTo("body");
	    	}
	    	$("#ama_templates").append(html);

	    	this._notifyTemplateLoaded();
		},


		/**
		 * Notifies this view that its template has already been loaded.
		 *
		 * This method does not normally need any override.
		 *
		 * @method _notifyTemplateLoaded
		 * @private
		 */
		_notifyTemplateLoaded: function () {
			this.isTemplateLoaded = true;

			// Notify all child views that the template has been loaded.
			// This is deferred until after first render because child views are
			// only created during render.
			this.once(BaseView.EVENT.RENDERED, function () {
				_.each(this.children, function(v) {
					// Notify child view only if it is not a template-fetcher
					if (v.constructor.TEMPLATE_SRC === "") {
						v._notifyTemplateLoaded();
					}
				});

			});

			this.trigger(BaseView.EVENT.TEMPLATE_LOADED);
		},


		/**
		 * Triggers a data fetch.
		 *
		 * This method does not normally need any override.
		 *
		 * @method _fetchData
		 * @private
		 */
		_fetchData: function () {
			AMA.debug("View " + this.options.el + " triggered a data fetch");

			this.data.fetch();
		},


		/**
		 * Defines the entire flow of view rendering.
		 *
		 * This method does not normally need any override.
		 *
		 * @method _doRender
		 * @private
		 */
		_doRender: function () {
			// If template is still being loaded, defer rendering
			if (!this.isTemplateLoaded) {
				AMA.debug("View " + this.options.el + " has deferred rendering, waiting for template download to complete");

				this.once(BaseView.EVENT.TEMPLATE_LOADED, this._doRender);
				return;
			}

			// If data hasn't been loaded, defer rendering and load data first
			if (this.data && !this.data.isLoaded) {
				AMA.debug("View " + this.options.el + " has deferred rendering, waiting for data download to finish");

				this.once(BaseView.EVENT.DATA_LOADED, this._doRender);

				// Make sure we load the data only once
				if (!this.data.isFetching) {
				    this._fetchData();
				}

				return;
			}

			AMA.debug("View " + this.options.el + " has started rendering");

			this.template = $("#" + this.constructor.TEMPLATE_ID).html();

			// Hide view element if necessary
			if (this.hidden) {
				this.$el.css({"display": "none"});
			}

            // Set the locale-tagging CSS class.  This can be used for localization
            // of image files via CSS.
            if (this.locale) {
                this.$el.addClass(this.locale);
            }

			// Here we can do some actions prior to rendering
			this._beforeRender();

			// Call the Backbone.View render
			this.render();

			AMA.debug("View " + this.options.el + " has finished rendering");

			this.isRendered = true;
			this.trigger(BaseView.EVENT.RENDERED);

			// Initialize any applicable event handlers for the rendered (dynamic)
			// DOM elements, e.g. on-clicks
			this._setupEvents();

			// Here we do the post-rendering actions that can be overridden
			// by subclasses or, more commonly, plug-ins
			this._afterRender();
		}
		
	});
})();


