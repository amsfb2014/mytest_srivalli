(function () {

    AMA.namespace("view.plugin");

    /**
     * This plugin should be attach only to the listView
     * @type {{__name__: string, __onPlug__: Function}}
     */
    AMA.view.plugin.ModalGallery = {

        __name__: "ModalGallery",

        // This is called automatically when Switcher plug-in is
        // plugged into a host View object
        _config: {
            settings: {
                container: '#blueimp-gallery',
                slidesContainer: 'div',
                titleElement: 'h3',
                displayClass: 'blueimp-gallery-display',
                controlsClass: 'blueimp-gallery-controls',
                singleClass: 'blueimp-gallery-single',
                leftEdgeClass: 'blueimp-gallery-left',
                rightEdgeClass: 'blueimp-gallery-right',
                playingClass: 'blueimp-gallery-playing',
                slideClass: 'slide',
                slideLoadingClass: 'slide-loading',
                slideErrorClass: 'slide-error',
                slideContentClass: 'slide-content',
                toggleClass: 'toggle',
                prevClass: 'prev',
                nextClass: 'next',
                closeClass: 'close',
                playPauseClass: 'play-pause',
                typeProperty: 'type',
                titleProperty: 'title',
                urlProperty: 'href',
                displayTransition: true,
                clearSlides: true,
                stretchImages: false,
                toggleControlsOnReturn: true,
                toggleSlideshowOnSpace: true,
                enableKeyboardNavigation: true,
                closeOnEscape: true,
                closeOnSlideClick: true,
                closeOnSwipeUpOrDown: true,
                emulateTouchEvents: true,
                stopTouchEventsPropagation: false,
                hidePageScrollbars: true,
                disableScroll: true,
                carousel: false,
                continuous: true,
                unloadElements: true,
                startSlideshow: false,
                slideshowInterval: 5000,
                index: 0,
                preloadRange: 2,
                useBootstrapModal:false,
                transitionSpeed: 400,
                slideshowTransitionSpeed: undefined,

            },
            galleryTemplateId : "#blueimp-gallery_template",
            detailsObj: ""
        },
        gallery: false,
        __onPlug__: function (options) {
            AMA.assert(this.getChild != null, "ModalGallery plug-in is attached to a non-view host object");
            this._config.settings = _.defaults(options.settings, this._config.settings)
            this._config.galleryTemplateId = _.defaults(options.galleryTemplateId, this._config.galleryTemplateId)
            this._config.detailsObj = _.defaults(options.detailsObj, this._config.detailsObj)
            this.initGallery();
        },
        initGallery:function() {
            var o = this
                Gallery = blueimp.Gallery;
            // Set the default config;
            Gallery.prototype.options = this._config.settings;

            // Assert template is there;
            if(!$(this._config.galleryTemplateId).size()) return;

            // Load template;
            this.parent.$el.append( $(this._config.galleryTemplateId).html() );

            if(this._config.detailsObj.isRendered) return;

            // initiating the event to create the gallery;
            this.$el.on('click', '[data-gallery]', function (event) {
                // Get the container id from the data-gallery attribute:
                var id = $(this).data('gallery')
                        viewObj = o,
                        widget = $(id),
                        container = (widget.length && widget) ||
                                $(Gallery.prototype.options.container),
                        callbacks = {
                            onopen: function () {
                                container
                                        .data('gallery', this)
                                        .trigger('open');
                            },
                            onopened: function () {
                                container.trigger('opened');
                            },
                            onslide: function () {
                                viewObj.galleryOnSlide(arguments);
                            },
                            onslideend: function () {
                                container.trigger('slideend', arguments);
                            },
                            onslidecomplete: function () {
                                container.trigger('slidecomplete', arguments);
                            },
                            onclose: function () {
                                container.trigger('close');
                            },
                            onclosed: function () {
                                container
                                        .trigger('closed')
                                        .removeData('gallery');
                            }
                        },
                        options = $.extend(
                                // Retrieve custom options from data-attributes
                                // on the Gallery widget:
                                container.data(),
                                {
                                    container: container[0],
                                    index: this,
                                    event: event
                                },
                                callbacks
                        ),
                // Select all links with the same data-gallery attribute:
                        links = $('[data-gallery="' + id + '"]');
                if (options.filter) {
                    links = links.filter(options.filter);
                }
                viewObj.photoGallery = new Gallery(links, options);
                return viewObj.photoGallery;
            });
        },
        galleryOnSlide: function() {
            var index = arguments[0][0],
                objDom = arguments[0][1],
                el = $(objDom),
                selected = $(this.selectedItem),
                o = this,
                elId = "#"+$("[data-gallery]")[index].id;
            if(el.find("img").attr("src") === selected.find("img").attr("src")) {
                // el.html($(this._config.detailsObj).html());
                $("[data-index=" + index + "]").html($(this._config.detailsObj).html())
            } else {
                this._selectItem($(elId)[0]);
                this.once(AMA.view.ListView.EVENT.NEW_DATA_LOADED, function(content) {
                    // el.html("");
                    $("[data-index=" + index + "]").html(content)
                    //el.html(content);
                }, this)

            }
        },
        galleryOnSlideComplete: function() {

        },
    };

})();

