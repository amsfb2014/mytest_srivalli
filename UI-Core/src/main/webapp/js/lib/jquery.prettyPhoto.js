/*! jquery.prettyPhoto Version 3.1.5 */
/* ------------------------------------------------------------------------
	Class: prettyPhoto
	Use: Lightbox clone for jQuery
	Author: Stephane Caron (http://www.no-margin-for-errors.com)
	Version: 3.1.5
------------------------------------------------------------------------- */
(function($) {
	$.prettyPhoto = {version: '3.1.5'};
	
	$.fn.prettyPhoto = function(pp_settings) {
		if (AMA.config.useLegacyApi) {
			pp_settings = jQuery.extend({
				hook: 'rel', /* the attribute tag to use for prettyPhoto hooks. default: 'rel'. For HTML5, use "data-rel" or similar. */
				animation_speed: 'fast', /* fast/slow/normal */
				ajaxcallback: function() {},
				slideshow: 5000, /* false OR interval time in ms */
				autoplay_slideshow: false, /* true/false */
				opacity: 0.80, /* Value between 0 and 1 */
				show_title: true, /* true/false */
				allow_resize: true, /* Resize the photos bigger than viewport. true/false */
				allow_expand: true, /* Allow the user to expand a resized image. true/false */
				default_width: 500,
				default_height: 344,
				// <AMA>
				min_width: 800, /* Sets a minimum width for the details panel below the image */
				// </AMA>
				counter_separator_label: '/', /* The separator for the gallery counter 1 "of" 2 */
				theme: 'pp_default', /* light_rounded / dark_rounded / light_square / dark_square / facebook */
				horizontal_padding: 20, /* The padding on each side of the picture */
				hideflash: false, /* Hides all the flash object on a page, set to TRUE if flash appears over prettyPhoto */
				wmode: 'transparent', /* Set the flash wmode attribute */
				autoplay: true, /* Automatically start videos: True/False */
				modal: false, /* If set to true, only the close button will close the window */
				deeplinking: true, /* Allow prettyPhoto to update the url to enable deeplinking. */
				overlay_gallery: true, /* If set to true, a gallery will overlay the fullscreen image on mouse over */
				overlay_gallery_max: 30, /* Maximum number of pictures in the overlay gallery */
				keyboard_shortcuts: false, /* Set to false if you open forms inside prettyPhoto */
				changepicturecallback: function(){}, /* Called everytime an item is shown/changed */
				callback: function(){}, /* Called when prettyPhoto is closed */
				ie6_fallback: true,
				markup: '<div class="pp_pic_holder"> \
									<div class="ppt">&nbsp;</div> \
									<div class="pp_content_container"> \
										<div class="pp_left"> \
										<div class="pp_right"> \
											<div class="pp_content"> \
												<div class="pp_loaderIcon"></div> \
												<div class="pp_fade"> \
													<a href="#" class="pp_expand" title="Expand the image">Expand</a> \
													<div id="pp_full_res"></div> \
													<div class="pp_details"> \
							                             <div class="fileInfo"> \
							                                <div class="title">File info:</div> \
							                                <div class="fileSize">Size: <span></span></div> \
							                                <div class="syncStatus"></div> \
							                             </div> \
							                             <div class="mediaBorder"></div> \
							                             <div class="mediaButtons"> \
							                                <div class="mediaActionButtons"> \
														      <div class="btn_addremove"></div> \
							                                   <a href="" target="_blank" class="download_link"><div class="btn_download"></div></a> \
							                                   <div class="btn_delete"></div> \
							                                   <div class="btn_mediaprev" onclick="$.prettyPhoto.changePage(\'previous\')"></div> \
							                                   <div class="btn_medianext" onclick="$.prettyPhoto.changePage(\'next\')"></div> \
							                                   <div class="clear"></div> \
							                                </div> \
							                                <div class="mediaButtonsClose"> \
							                                  <div class="btn_mediaclose" onclick="$.prettyPhoto.close()"></div> \
							                                </div> \
							                             </div> \
							                             <div class="clear"></div> \
													</div> \
												</div> \
											</div> \
										</div> \
										</div> \
									</div> \
								</div> \
								<div class="pp_overlay"></div>',
				gallery_markup: '<div class="pp_gallery"> \
									<a href="#" class="pp_arrow_previous">Previous</a> \
									<div> \
										<ul> \
											{gallery} \
										</ul> \
									</div> \
									<a href="#" class="pp_arrow_next">Next</a> \
								</div>',
				image_markup: '<img id="fullResImage" src="{path}" />',
				flash_markup: '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="{width}" height="{height}"><param name="wmode" value="{wmode}" /><param name="allowfullscreen" value="true" /><param name="allowscriptaccess" value="always" /><param name="movie" value="{path}" /><embed src="{path}" type="application/x-shockwave-flash" allowfullscreen="true" allowscriptaccess="always" width="{width}" height="{height}" wmode="{wmode}"></embed></object>',
				quicktime_markup: '<object classid="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B" codebase="http://www.apple.com/qtactivex/qtplugin.cab" height="{height}" width="{width}"><param name="src" value="{path}"/><param name="autoplay" value="{autoplay}"/><param name="type" value="video/quicktime"/><param name="wmode" value="{wmode}" /><embed src="{path}" height="{height}" width="{width}" autoplay="{autoplay}" type="video/quicktime" wmode="{wmode}" pluginspage="http://www.apple.com/quicktime/download/"></embed></object>',
				iframe_markup: '<iframe src ="{path}" width="{width}" height="{height}" frameborder="no"></iframe>',
				inline_markup: '<div class="pp_inline">{content}</div>',
				custom_markup: '',
				social_tools: '<div class="twitter"><a href="http://twitter.com/share" class="twitter-share-button" data-count="none">Tweet</a><script type="text/javascript" src="http://platform.twitter.com/widgets.js"></script></div><div class="facebook"><iframe src="//www.facebook.com/plugins/like.php?locale=en_US&href={location_href}&amp;layout=button_count&amp;show_faces=true&amp;width=500&amp;action=like&amp;font&amp;colorscheme=light&amp;height=23" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:500px; height:23px;" allowTransparency="true"></iframe></div>' /* html or false to disable */
			}, pp_settings);
		}
		else {
			pp_settings = jQuery.extend({
				hook: 'rel', /* the attribute tag to use for prettyPhoto hooks. default: 'rel'. For HTML5, use "data-rel" or similar. */
				animation_speed: 'fast', /* fast/slow/normal */
				ajaxcallback: function() {},
				slideshow: 5000, /* false OR interval time in ms */
				autoplay_slideshow: false, /* true/false */
				opacity: 0.80, /* Value between 0 and 1 */
				show_title: true, /* true/false */
				allow_resize: true, /* Resize the photos bigger than viewport. true/false */
				allow_expand: true, /* Allow the user to expand a resized image. true/false */
				default_width: 500,
				default_height: 344,
				// <AMA>
				min_width: 800, /* Sets a minimum width for the details panel below the image */
				// </AMA>
				counter_separator_label: '/', /* The separator for the gallery counter 1 "of" 2 */
				theme: 'pp_default', /* light_rounded / dark_rounded / light_square / dark_square / facebook */
				horizontal_padding: 20, /* The padding on each side of the picture */
				hideflash: false, /* Hides all the flash object on a page, set to TRUE if flash appears over prettyPhoto */
				wmode: 'transparent', /* Set the flash wmode attribute */
				autoplay: true, /* Automatically start videos: True/False */
				modal: false, /* If set to true, only the close button will close the window */
				deeplinking: true, /* Allow prettyPhoto to update the url to enable deeplinking. */
				overlay_gallery: true, /* If set to true, a gallery will overlay the fullscreen image on mouse over */
				overlay_gallery_max: 30, /* Maximum number of pictures in the overlay gallery */
				keyboard_shortcuts: false, /* Set to false if you open forms inside prettyPhoto */
				changepicturecallback: function(){}, /* Called everytime an item is shown/changed */
				callback: function(){}, /* Called when prettyPhoto is closed */
				ie6_fallback: true,
				markup: '<div class="pp_pic_holder"> \
									<div class="ppt">&nbsp;</div> \
									<div class="pp_content_container"> \
										<div class="pp_left"> \
										<div class="pp_right"> \
											<div class="pp_content"> \
												<div class="pp_loaderIcon"></div> \
												<div class="pp_fade"> \
													<a href="#" class="pp_expand" title="Expand the image">Expand</a> \
													<div id="pp_full_res"></div> \
													<div class="pp_details"> \
							                             <div class="fileInfo"> \
							                                <div class="title">File Info:</div> \
							                                <div class="fileSize">Size: <span></span></div> \
						                                	<div class="syncStatus"> \
							                                	<span class="rt_endpointsync_text added_next_sync hidden">Added At Next Sync</span> \
							                                	<span class="rt_endpointsync_text removed_next_sync hidden">Removed At Next Sync</span> \
							                                	<span class="rt_endpointsync_text on_phone hidden">On Phone</span> \
							                                	<span class="rt_endpointsync_text web_only hidden">Web Only</span> \
															</div> \
							                             </div> \
							                             <div class="mediaBorder"></div> \
							                             <div class="mediaButtons"> \
							                                <div class="mediaActionButtons"> \
														      <div class="btn_addremove"></div> \
							                                   <div class="btn_download"></div> \
							                                   <div class="btn_delete"></div> \
							                                   <div class="btn_mediaprev" onclick="$.prettyPhoto.changePage(\'previous\')"></div> \
							                                   <div class="btn_medianext" onclick="$.prettyPhoto.changePage(\'next\')"></div> \
							                                   <div class="clear"></div> \
							                                </div> \
							                                <div class="mediaButtonsClose"> \
							                                  <div class="btn_mediaclose" onclick="$.prettyPhoto.close()"></div> \
							                                </div> \
							                             </div> \
							                             <div class="clear"></div> \
													</div> \
												</div> \
											</div> \
										</div> \
										</div> \
									</div> \
								</div> \
								<div class="pp_overlay"></div>',
				gallery_markup: '<div class="pp_gallery"> \
									<a href="#" class="pp_arrow_previous">Previous</a> \
									<div> \
										<ul> \
											{gallery} \
										</ul> \
									</div> \
									<a href="#" class="pp_arrow_next">Next</a> \
								</div>',
				image_markup: '<img id="fullResImage" src="{path}" />',
				flash_markup: '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="{width}" height="{height}"><param name="wmode" value="{wmode}" /><param name="allowfullscreen" value="true" /><param name="allowscriptaccess" value="always" /><param name="movie" value="{path}" /><embed src="{path}" type="application/x-shockwave-flash" allowfullscreen="true" allowscriptaccess="always" width="{width}" height="{height}" wmode="{wmode}"></embed></object>',
				quicktime_markup: '<object classid="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B" codebase="http://www.apple.com/qtactivex/qtplugin.cab" height="{height}" width="{width}"><param name="src" value="{path}"/><param name="autoplay" value="{autoplay}"/><param name="type" value="video/quicktime"/><param name="wmode" value="{wmode}" /><embed src="{path}" height="{height}" width="{width}" wmode="{wmode}" autoplay="{autoplay}" type="video/quicktime" pluginspage="http://www.apple.com/quicktime/download/"></embed></object>',
				iframe_markup: '<iframe src ="{path}" width="{width}" height="{height}" frameborder="no"></iframe>',
				inline_markup: '<div class="pp_inline">{content}</div>',
				custom_markup: '',
				social_tools: '<div class="twitter"><a href="http://twitter.com/share" class="twitter-share-button" data-count="none">Tweet</a><script type="text/javascript" src="http://platform.twitter.com/widgets.js"></script></div><div class="facebook"><iframe src="//www.facebook.com/plugins/like.php?locale=en_US&href={location_href}&amp;layout=button_count&amp;show_faces=true&amp;width=500&amp;action=like&amp;font&amp;colorscheme=light&amp;height=23" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:500px; height:23px;" allowTransparency="true"></iframe></div>' /* html or false to disable */
			}, pp_settings);
		}
		
		// Global variables accessible only by prettyPhoto
		var matchedObjects = this, percentBased = false, pp_dimensions, pp_open,
		
		// prettyPhoto container specific
		pp_contentHeight, pp_contentWidth, pp_containerHeight, pp_containerWidth,
		
		// Window size
		windowHeight = $(window).height(), windowWidth = $(window).width(),

		// Global elements
		pp_slideshow;
		
		doresize = true, scroll_pos = _get_scroll();
	
		// Window/Keyboard events
		$(window).unbind('resize.prettyphoto').bind('resize.prettyphoto',function(){ _center_overlay(); _resize_overlay(); });
		
		if(pp_settings.keyboard_shortcuts) {
			$(document).unbind('keydown.prettyphoto').bind('keydown.prettyphoto',function(e){
				if(typeof $pp_pic_holder != 'undefined'){
					if($pp_pic_holder.is(':visible')){
						switch(e.keyCode){
							case 37:
								$.prettyPhoto.changePage('previous');
								e.preventDefault();
								break;
							case 39:
								$.prettyPhoto.changePage('next');
								e.preventDefault();
								break;
							case 27:
								if(!settings.modal)
								$.prettyPhoto.close();
								e.preventDefault();
								break;
						};
						// return false;
					};
				};
			});
		};
		
		/**
		* Initialize prettyPhoto.
		*/
		$.prettyPhoto.initialize = function() {
			
			settings = pp_settings;
			
			if(settings.theme == 'pp_default') settings.horizontal_padding = 16;
			
			// Find out if the picture is part of a set
			theRel = $(this).attr(settings.hook);
			galleryRegExp = /\[(?:.*)\]/;
			isSet = (galleryRegExp.exec(theRel)) ? true : false;
			
			// Put the SRCs, TITLEs, ALTs into an array.
			pp_images = (isSet) ? jQuery.map(matchedObjects, function(n, i){ if($(n).attr(settings.hook).indexOf(theRel) != -1) return $(n).attr('href'); }) : $.makeArray($(this).attr('href'));
			pp_titles = (isSet) ? jQuery.map(matchedObjects, function(n, i){ if($(n).attr(settings.hook).indexOf(theRel) != -1) return ($(n).find('img').attr('alt')) ? $(n).find('img').attr('alt') : ""; }) : $.makeArray($(this).find('img').attr('alt'));
			pp_descriptions = (isSet) ? jQuery.map(matchedObjects, function(n, i){ if($(n).attr(settings.hook).indexOf(theRel) != -1) return ($(n).attr('title')) ? $(n).attr('title') : ""; }) : $.makeArray($(this).attr('title'));
			
			if(pp_images.length > settings.overlay_gallery_max) settings.overlay_gallery = false;
			
			set_position = jQuery.inArray($(this).attr('href'), pp_images); // Define where in the array the clicked item is positionned
			rel_index = (isSet) ? set_position : $("a["+settings.hook+"^='"+theRel+"']").index($(this));
			
			_build_overlay(this); // Build the overlay {this} being the caller
			
			if(settings.allow_resize)
				$(window).bind('scroll.prettyphoto',function(){ _center_overlay(); });
			
			
			$.prettyPhoto.open();
			
			return false;
		}


		/**
		* Opens the prettyPhoto modal box.
		* @param image {String,Array} Full path to the image to be open, can also be an array containing full images paths.
		* @param title {String,Array} The title to be displayed with the picture, can also be an array containing all the titles.
		* @param description {String,Array} The description to be displayed with the picture, can also be an array containing all the descriptions.
		*/
		if (AMA.config.useLegacyApi){
			$.prettyPhoto.open = function(event) {
				if(typeof settings == "undefined"){ // Means it's an API call, need to manually get the settings and set the variables
					settings = pp_settings;
					pp_images = $.makeArray(arguments[0]);
					syncstatus= $.makeArray(arguments[4]);
					pp_titles = (arguments[1]) ? $.makeArray(arguments[1]) : $.makeArray("");
					pp_descriptions = (arguments[2]) ? $.makeArray(arguments[2]) : $.makeArray("");
					isSet = (pp_images.length > 1) ? true : false;
					set_position = (arguments[3])? arguments[3]: 0;
					uidArray= $.makeArray(arguments[5]);
					_build_overlay(event.target); // Build the overlay {this} being the caller
				}
				
				if(settings.hideflash) $('object,embed,iframe[src*=youtube],iframe[src*=vimeo]').css('visibility','hidden'); // Hide the flash
	
				_checkPosition($(pp_images).size()); // Hide the next/previous links if on first or last images.
			
				$('.pp_loaderIcon').show();
			
				if(settings.deeplinking)
					setHashtag();
			
				// Rebuild Facebook Like Button with updated href
				if(settings.social_tools){
					facebook_like_link = settings.social_tools.replace('{location_href}', encodeURIComponent(location.href)); 
					$pp_pic_holder.find('.pp_social').html(facebook_like_link);
				}
				
				// Fade the content in
				if($ppt.is(':hidden')) $ppt.css('opacity',0).show();
				$pp_overlay.show().fadeTo(settings.animation_speed,settings.opacity);
	
				// Display the current position
				$pp_pic_holder.find('.currentTextHolder').text((set_position+1) + settings.counter_separator_label + $(pp_images).size());
	
				// Set the description
				if(typeof pp_descriptions[set_position] != 'undefined' && pp_descriptions[set_position] != ""){
					$pp_pic_holder.find('.pp_description').show().html(unescape(pp_descriptions[set_position]));
				}else{
					$pp_pic_holder.find('.pp_description').hide();
				}
				
				// Get the dimensions
				movie_width = ( parseFloat(getParam('width',pp_images[set_position])) ) ? getParam('width',pp_images[set_position]) : settings.default_width.toString();
				movie_height = ( parseFloat(getParam('height',pp_images[set_position])) ) ? getParam('height',pp_images[set_position]) : settings.default_height.toString();
				
				// If the size is % based, calculate according to window dimensions
				percentBased=false;
				if(movie_height.indexOf('%') != -1) { movie_height = parseFloat(($(window).height() * parseFloat(movie_height) / 100) - 150); percentBased = true; }
				if(movie_width.indexOf('%') != -1) { movie_width = parseFloat(($(window).width() * parseFloat(movie_width) / 100) - 150); percentBased = true; }
				
				// Fade the holder
				$pp_pic_holder.fadeIn(function(){
					// Set the title
					(settings.show_title && pp_titles[set_position] != "" && typeof pp_titles[set_position] != "undefined") ? $ppt.html(unescape(pp_titles[set_position])) : $ppt.html('&nbsp;');
					
					imgPreloader = "";
					skipInjection = false;
					
					// Inject the proper content
					switch(_getFileType(pp_images[set_position])){
						case 'image':
							$.prettyPhoto.setButtonClass(".pp_pic_holder .btn_addremove", "btn_addtophone");
		                    $.prettyPhoto.setButtonClass(".pp_pic_holder .btn_delete","btn_deletephoto");
		                    $.prettyPhoto.setButtonClass(".pp_pic_holder .btn_download","btn_downloadphoto");
								$( ".pp_pic_holder .btn_addremove.btn_addtophone" ).on( "click", function() {
									Backbone.globalEvent.trigger("performActionOnPhoto", {type:"addToPhone",id:uidArray[set_position]});
								});
							$( ".pp_pic_holder .btn_delete.btn_deletephoto" ).on( "click", function() {
								Backbone.globalEvent.trigger("performActionOnPhoto", {type:"delete",id:uidArray[set_position]});
							});
							imgPreloader = new Image();
							// Preload the neighbour images
							nextImage = new Image();
							if(isSet && set_position < $(pp_images).size() -1) nextImage.src = pp_images[set_position + 1];
							prevImage = new Image();
							if(isSet && pp_images[set_position - 1]) prevImage.src = pp_images[set_position - 1];
							$pp_pic_holder.find('#pp_full_res')[0].innerHTML = settings.image_markup.replace(/{path}/g,pp_images[set_position]);
	
							imgPreloader.onload = function(){
								// Fit item to viewport
								pp_dimensions = _fitToViewport(imgPreloader.width,imgPreloader.height);
	
								_showContent();
							};
	
							imgPreloader.onerror = function(){
								alert('Image cannot be loaded. Make sure the path is correct and image exist.');
								$.prettyPhoto.close();
							};
						
							imgPreloader.src = pp_images[set_position];
						break;
					
						case 'youtube':
							pp_dimensions = _fitToViewport(movie_width,movie_height); // Fit item to viewport
							
							// Regular youtube link
							movie_id = getParam('v',pp_images[set_position]);
							
							// youtu.be link
							if(movie_id == ""){
								movie_id = pp_images[set_position].split('youtu.be/');
								movie_id = movie_id[1];
								if(movie_id.indexOf('?') > 0)
									movie_id = movie_id.substr(0,movie_id.indexOf('?')); // Strip anything after the ?
	
								if(movie_id.indexOf('&') > 0)
									movie_id = movie_id.substr(0,movie_id.indexOf('&')); // Strip anything after the &
							}
	
							movie = 'http://www.youtube.com/embed/'+movie_id;
							(getParam('rel',pp_images[set_position])) ? movie+="?rel="+getParam('rel',pp_images[set_position]) : movie+="?rel=1";
								
							if(settings.autoplay) movie += "&autoplay=1";
						
							toInject = settings.iframe_markup.replace(/{width}/g,pp_dimensions['width']).replace(/{height}/g,pp_dimensions['height']).replace(/{wmode}/g,settings.wmode).replace(/{path}/g,movie);
						break;
					
						case 'vimeo':
							pp_dimensions = _fitToViewport(movie_width,movie_height); // Fit item to viewport
						
							movie_id = pp_images[set_position];
							var regExp = /http(s?):\/\/(www\.)?vimeo.com\/(\d+)/;
							var match = movie_id.match(regExp);
							
							movie = 'http://player.vimeo.com/video/'+ match[3] +'?title=0&amp;byline=0&amp;portrait=0';
							if(settings.autoplay) movie += "&autoplay=1;";
					
							vimeo_width = pp_dimensions['width'] + '/embed/?moog_width='+ pp_dimensions['width'];
					
							toInject = settings.iframe_markup.replace(/{width}/g,vimeo_width).replace(/{height}/g,pp_dimensions['height']).replace(/{path}/g,movie);
						break;
					
						case 'quicktime':
							pp_dimensions = _fitToViewport(movie_width,movie_height); // Fit item to viewport
							pp_dimensions['height']+=15; pp_dimensions['contentHeight']+=15; pp_dimensions['containerHeight']+=15; // Add space for the control bar
					
							toInject = settings.quicktime_markup.replace(/{width}/g,pp_dimensions['width']).replace(/{height}/g,pp_dimensions['height']).replace(/{wmode}/g,settings.wmode).replace(/{path}/g,pp_images[set_position]).replace(/{autoplay}/g,settings.autoplay);
							$.prettyPhoto.setButtonClass(".pp_pic_holder .btn_addremove", "btn_addtophone");
		                    $.prettyPhoto.setButtonClass(".pp_pic_holder .btn_delete","btn_deletevideo");
		                    $.prettyPhoto.setButtonClass(".pp_pic_holder .btn_download","btn_downloadvideo");
							
							$( ".pp_pic_holder .btn_addremove.btn_addtophone" ).on( "click", function() {
									Backbone.globalEvent.trigger("performActionOnVideo", {type:"addToPhone",id:uidArray[set_position]});
								});
							$( ".pp_pic_holder .btn_delete.btn_deletevideo" ).on( "click", function() {
								Backbone.globalEvent.trigger("performActionOnVideo", {type:"delete",id:uidArray[set_position]});
							});
							
						break;
					
						case 'flash':
							pp_dimensions = _fitToViewport(movie_width,movie_height); // Fit item to viewport
						
							flash_vars = pp_images[set_position];
							flash_vars = flash_vars.substring(pp_images[set_position].indexOf('flashvars') + 10,pp_images[set_position].length);
	
							filename = pp_images[set_position];
							filename = filename.substring(0,filename.indexOf('?'));
						
							toInject =  settings.flash_markup.replace(/{width}/g,pp_dimensions['width']).replace(/{height}/g,pp_dimensions['height']).replace(/{wmode}/g,settings.wmode).replace(/{path}/g,filename+'?'+flash_vars);
						break;
					
						case 'iframe':
							pp_dimensions = _fitToViewport(movie_width,movie_height); // Fit item to viewport
					
							frame_url = pp_images[set_position];
							frame_url = frame_url.substr(0,frame_url.indexOf('iframe')-1);
	
							toInject = settings.iframe_markup.replace(/{width}/g,pp_dimensions['width']).replace(/{height}/g,pp_dimensions['height']).replace(/{path}/g,frame_url);
						break;
						
						case 'ajax':
							doresize = false; // Make sure the dimensions are not resized.
							pp_dimensions = _fitToViewport(movie_width,movie_height);
							doresize = true; // Reset the dimensions
						
							skipInjection = true;
							$.get(pp_images[set_position],function(responseHTML){
								toInject = settings.inline_markup.replace(/{content}/g,responseHTML);
								$pp_pic_holder.find('#pp_full_res')[0].innerHTML = toInject;
								_showContent();
							});
							
						break;
						
						case 'custom':
							pp_dimensions = _fitToViewport(movie_width,movie_height); // Fit item to viewport
						
							toInject = settings.custom_markup;
						break;
					
						case 'inline':
							// to get the item height clone it, apply default width, wrap it in the prettyPhoto containers , then delete
							myClone = $(pp_images[set_position]).clone().append('<br clear="all" />').css({'width':settings.default_width}).wrapInner('<div id="pp_full_res"><div class="pp_inline"></div></div>').appendTo($('body')).show();
							doresize = false; // Make sure the dimensions are not resized.
							pp_dimensions = _fitToViewport($(myClone).width(),$(myClone).height());
							doresize = true; // Reset the dimensions
							$(myClone).remove();
							toInject = settings.inline_markup.replace(/{content}/g,$(pp_images[set_position]).html());
						break;
					};
	
					if(!imgPreloader && !skipInjection){
						$pp_pic_holder.find('#pp_full_res')[0].innerHTML = toInject;
					
						// Show content
						_showContent();
					};
				});
				
				// <AMA>
				var fileSize = pp_descriptions[set_position];
	            var syncStatus=syncstatus[set_position];
				var downloadUrl=pp_images[set_position];
	            $(".pp_pic_holder .download_link").attr("href", downloadUrl.replace('content', 'download'));
				$(".pp_pic_holder .syncStatus").html(syncStatus);
				$(".pp_pic_holder .fileSize span").html(fileSize);
				
				// </AMA>
	
				return false;
			};
		}
		else {
			$.prettyPhoto.open = function() {
				var xhr = null;
				
				if(typeof settings == "undefined"){ // Means it's an API call, need to manually get the settings and set the variables
					mediaType = arguments[0];
					fromTrashView = (arguments[4] === true) ? true : false;
					settings = pp_settings;
					pp_images = [];
					imageIds = $.makeArray(arguments[1]);
					pp_descriptions = [];
					pp_addRemove = [];
					pp_mediaStatus = [];
					isSet = (arguments[1].length > 1) ? true : false;
					set_position = arguments[2] ? arguments[2]: 0;
					_build_overlay(arguments[3]);
				}
				
				if (pp_images[set_position]) {
					contentFetched();
				}
				else {
					if (AMA.Util.useXdr()){
						xhr = AMA.Util.createCORSRequest("GET", AMA.config.apiHostUrl + "/files/" + imageIds[set_position] + "?devId=" + AMA.config.devId + "&authToken=" + AMA.config.authToken + "&endpointId=" + AMA.config.endpointId + "&fileType=" + mediaType);
						
						xhr.onload = function () {
							try {
								var data = JSON.parse(this.responseText);
							}
							catch (e) {
								AMA.error("GET /files - Pretty Photo - response not JSON: " + this.responseText);
							}
							
							if (data) {
								pp_images[set_position] = data.mediaUrl + "&fileName=" + data.fileName;
								pp_descriptions[set_position] = AMA.Util.bytesToSize(data.fileSizeInBytes);
								/*
								if (data.pendingDelete || (!data.onPhone && !data.pendingCreate && !data.pendingDelete)) {
									pp_addRemove[set_position] = "add";
								}
								else if (data.onPhone || data.pendingCreate) {
									pp_addRemove[set_position] = "remove";
								}
								*/
								if (data.pendingDelete) {
									pp_mediaStatus[set_position] = "remove";
								}
								else if (data.pendingCreate) {
									pp_mediaStatus[set_position] = "add";
								}
								else if (data.onPhone) {
									pp_mediaStatus[set_position] = "onphone";
								}
								else {
									pp_mediaStatus[set_position] = "webonly";
								}
								contentFetched();
							}
						};
						
						xhr.onerror = function () {
							AMA.error("Request failed: GET /files");
						};
						xhr.onprogress = function () {};
						xhr.ontimeout = function () {};
						xhr.timeout = 100000; // Prevents IE9 from aborting the request
						
						xhr.send();
					}
					else {
						$.ajax({
							url: AMA.config.apiHostUrl + "/files/" + imageIds[set_position] + "?devId=" + AMA.config.devId + "&authToken=" + AMA.config.authToken + "&endpointId=" + AMA.config.endpointId + "&fileType=" + mediaType
						}).done(function (data) {
							pp_images[set_position] = data.mediaUrl + "&fileName=" + data.fileName;
							pp_descriptions[set_position] = AMA.Util.bytesToSize(data.fileSizeInBytes);
							/*
							if (data.pendingDelete || (!data.onPhone && !data.pendingCreate && !data.pendingDelete)) {
								pp_addRemove[set_position] = "add";
							}
							else if (data.onPhone || data.pendingCreate) {
								pp_addRemove[set_position] = "remove";
							}
							*/
							if (data.pendingDelete && data.onPhone) {
								pp_mediaStatus[set_position] = "remove";
							}
							else if (data.pendingCreate) {
								pp_mediaStatus[set_position] = "add";
							}
							else if (data.onPhone) {
								pp_mediaStatus[set_position] = "onphone";
							}
							else {
								pp_mediaStatus[set_position] = "webonly";
							}
							contentFetched();
						});
					}
				}
			};
		}
		
		$.prettyPhoto.setButtonClass = function(element, buttonClass){
	         // add/remove
	         $(element).removeClass("btn_removefromphone");
	         $(element).removeClass("btn_addtophone");
	         // delete photo/video
	         $(element).removeClass("btn_deletephoto");
	         $(element).removeClass("btn_deletevideo");
	         // download photo/video
	         $(element).removeClass("btn_downloadphoto");
	         $(element).removeClass("btn_downloadvideo");

	         // trashed buttons
	         $(element).removeClass("btn_restorephoto");
	         $(element).removeClass("btn_permadeletephoto");
	         $(element).removeClass("btn_restorevideo");
	         $(element).removeClass("btn_permadeletevideo");

	         $(element).addClass(buttonClass);
	      };
	
		/**
		* Change page in the prettyPhoto modal box
		* @param direction {String} Direction of the paging, previous or next.
		*/
		if (AMA.config.useLegacyApi){
			$.prettyPhoto.changePage = function(direction){
				currentGalleryPage = 0;
				
				if(direction == 'previous') {
					set_position--;
					if (set_position < 0) set_position = $(pp_images).size()-1;
				}else if(direction == 'next'){
					set_position++;
					if(set_position > $(pp_images).size()-1) set_position = 0;
				}else{
					set_position=direction;
				};
				
				rel_index = set_position;
	
				if(!doresize) doresize = true; // Allow the resizing of the images
				if(settings.allow_expand) {
					$('.pp_contract').removeClass('pp_contract').addClass('pp_expand');
				}
	
				_hideContent(function(){ $.prettyPhoto.open(); });
			};
		}
		else {
			$.prettyPhoto.changePage = function(direction){
				currentGalleryPage = 0;
				
				if(direction == 'previous') {
					set_position--;
					if (set_position < 0) set_position = $(imageIds).size()-1;
				}else if(direction == 'next'){
					set_position++;
					if(set_position > $(imageIds).size()-1) set_position = 0;
				}else{
					set_position=direction;
				};
				
				rel_index = set_position;
	
				if(!doresize) doresize = true; // Allow the resizing of the images
				if(settings.allow_expand) {
					$('.pp_contract').removeClass('pp_contract').addClass('pp_expand');
				}
	
				_hideContent(function(){ $.prettyPhoto.open(); });
			};
		}
		


		/**
		* Change gallery page in the prettyPhoto modal box
		* @param direction {String} Direction of the paging, previous or next.
		*/
		$.prettyPhoto.changeGalleryPage = function(direction){
			if(direction=='next'){
				currentGalleryPage ++;

				if(currentGalleryPage > totalPage) currentGalleryPage = 0;
			}else if(direction=='previous'){
				currentGalleryPage --;

				if(currentGalleryPage < 0) currentGalleryPage = totalPage;
			}else{
				currentGalleryPage = direction;
			};
			
			slide_speed = (direction == 'next' || direction == 'previous') ? settings.animation_speed : 0;

			slide_to = currentGalleryPage * (itemsPerPage * itemWidth);

			$pp_gallery.find('ul').animate({left:-slide_to},slide_speed);
		};


		/**
		* Start the slideshow...
		*/
		$.prettyPhoto.startSlideshow = function(){
			if(typeof pp_slideshow == 'undefined'){
				$pp_pic_holder.find('.pp_play').unbind('click').removeClass('pp_play').addClass('pp_pause').click(function(){
					$.prettyPhoto.stopSlideshow();
					return false;
				});
				pp_slideshow = setInterval($.prettyPhoto.startSlideshow,settings.slideshow);
			}else{
				$.prettyPhoto.changePage('next');	
			};
		}


		/**
		* Stop the slideshow...
		*/
		$.prettyPhoto.stopSlideshow = function(){
			$pp_pic_holder.find('.pp_pause').unbind('click').removeClass('pp_pause').addClass('pp_play').click(function(){
				$.prettyPhoto.startSlideshow();
				return false;
			});
			clearInterval(pp_slideshow);
			pp_slideshow=undefined;
		}


		/**
		* Closes prettyPhoto.
		*/
		if (AMA.config.useLegacyApi){
			$.prettyPhoto.close = function(){
				if($pp_overlay.is(":animated")) return;
				
				$.prettyPhoto.stopSlideshow();
				
				$pp_pic_holder.stop().find('object,embed').css('visibility','hidden');
				
				$('div.pp_pic_holder,div.ppt,.pp_fade').fadeOut(settings.animation_speed,function(){ $(this).remove(); });
				
				$pp_overlay.fadeOut(settings.animation_speed, function(){
					
					if(settings.hideflash) $('object,embed,iframe[src*=youtube],iframe[src*=vimeo]').css('visibility','visible'); // Show the flash
					
					$(this).remove(); // No more need for the prettyPhoto markup
					
					$(window).unbind('scroll.prettyphoto');
					
					clearHashtag();
					
					settings.callback();
					
					doresize = true;
					
					pp_open = false;
					
					delete settings;
				});
			};
		}
		else {
			$.prettyPhoto.close = function(){
				if($pp_overlay.is(":animated")) return;
				
				$.prettyPhoto.stopSlideshow();
				
				$pp_pic_holder.stop().find('object,embed').css('visibility','hidden');
				
				$('div.pp_pic_holder,div.ppt,.pp_fade').fadeOut('fast',function(){ $(this).remove(); });
				
				$pp_overlay.fadeOut(settings.animation_speed, function(){
					
					if(settings.hideflash) $('object,embed,iframe[src*=youtube],iframe[src*=vimeo]').css('visibility','visible'); // Show the flash
					
					$(this).remove(); // No more need for the prettyPhoto markup
					
					$(window).unbind('scroll.prettyphoto');
					
					clearHashtag();
					
					settings.callback();
					
					doresize = true;
					
					pp_open = false;
					
					delete settings;
				});
			};
		}
		
		function contentFetched () {
			if(settings.hideflash) $('object,embed,iframe[src*=youtube],iframe[src*=vimeo]').css('visibility','hidden'); // Hide the flash

			_checkPosition(set_position); // Hide the next/previous links if set contains only one image
			_hideOtherButtons(fromTrashView);
		
			$('.pp_loaderIcon').show();
            if(AMA.Util.isIPhone()) {
                $pp_pic_holder.addClass("ios");
            }
            $pp_pic_holder.find(".pp_content_container")
                    .removeClass("webonly")
                    .removeClass("onphone")
                    .addClass(pp_mediaStatus[set_position]);

			if(settings.deeplinking)
				setHashtag();
		
			// Rebuild Facebook Like Button with updated href
			if(settings.social_tools){
				facebook_like_link = settings.social_tools.replace('{location_href}', encodeURIComponent(location.href)); 
				$pp_pic_holder.find('.pp_social').html(facebook_like_link);
			}
			
			// Fade the content in
			if($ppt.is(':hidden')) $ppt.css('opacity',0).show();
			$pp_overlay.show().fadeTo(settings.animation_speed,settings.opacity);

			// Display the current position
			$pp_pic_holder.find('.currentTextHolder').text((set_position+1) + settings.counter_separator_label + $(pp_images).size());

			// Set the description
			/*if(typeof pp_descriptions[set_position] != 'undefined' && pp_descriptions[set_position] != ""){
				$pp_pic_holder.find('.pp_description').show().html(unescape(pp_descriptions[set_position]));
			}else{
				$pp_pic_holder.find('.pp_description').hide();
			}*/
			
			
			
			// Get the dimensions
			movie_width = ( parseFloat(getParam('width',pp_images[set_position])) ) ? getParam('width',pp_images[set_position]) : settings.default_width.toString();
			movie_height = ( parseFloat(getParam('height',pp_images[set_position])) ) ? getParam('height',pp_images[set_position]) : settings.default_height.toString();
			
			// If the size is % based, calculate according to window dimensions
			percentBased=false;
			if(movie_height.indexOf('%') != -1) { movie_height = parseFloat(($(window).height() * parseFloat(movie_height) / 100) - 150); percentBased = true; }
			if(movie_width.indexOf('%') != -1) { movie_width = parseFloat(($(window).width() * parseFloat(movie_width) / 100) - 150); percentBased = true; }
			
			// Fade the holder
			$pp_pic_holder.fadeIn(function(){
				// Set the title
				(settings.show_title && pp_titles[set_position] != "" && typeof pp_titles[set_position] != "undefined") ? $ppt.html(unescape(pp_titles[set_position])) : $ppt.html('&nbsp;');
				
				imgPreloader = "";
				skipInjection = false;
				
				// Inject the proper content
				switch(_getFileType(pp_images[set_position])){
					case 'image':
						imgPreloader = new Image();
						
						// Remove any previously stored extra classes and add the appropriate classes to the buttons
						$pp_pic_holder.find(".btn_addremove").removeClass().addClass("btn_addremove");
						if (fromTrashView){
							$pp_pic_holder.find(".btn_addremove").addClass("btn_restorephoto");
							$pp_pic_holder.find(".btn_delete").removeClass().addClass("btn_delete btn_permadeletephoto");
						}
						else {
							/*
							if (pp_addRemove[set_position] === "add") {
								$pp_pic_holder.find(".btn_addremove").addClass("btn_addtophone");
							}
							else if (pp_addRemove[set_position] === "remove") {
								$pp_pic_holder.find(".btn_addremove").addClass("btn_removefromphone");
							}
							*/
							
							// Set endpoint text and "Add To Phone" or "Remove From Phone" button
							$pp_pic_holder.find(".rt_endpointsync_text").addClass("hidden");
							switch (pp_mediaStatus[set_position]) {
								case "add" :
									$pp_pic_holder.find(".btn_addremove").addClass("btn_removefromphone");
									$pp_pic_holder.find(".rt_endpointsync_text.added_next_sync").removeClass("hidden");
									break;
								case "webonly" :
									$pp_pic_holder.find(".btn_addremove").addClass("btn_addtophone");
									$pp_pic_holder.find(".rt_endpointsync_text.web_only").removeClass("hidden");
									break;
								case "remove" :
									$pp_pic_holder.find(".btn_addremove").addClass("btn_addtophone");
									$pp_pic_holder.find(".rt_endpointsync_text.removed_next_sync").removeClass("hidden");
									break;
								case "onphone" :
									$pp_pic_holder.find(".btn_addremove").addClass("btn_removefromphone");
									$pp_pic_holder.find(".rt_endpointsync_text.on_phone").removeClass("hidden");
									break;
							}
								
							$pp_pic_holder.find(".btn_delete").removeClass("btn_deletevideo").addClass("btn_deletephoto");
						}
						
						$pp_pic_holder.find(".btn_download").removeClass("btn_downloadvideo").addClass("btn_downloadphoto");
						
						
						
						//this is used for trashed buttons
						
					
						
						
						// Bind event handlers to buttons
						$pp_pic_holder.find(".btn_addremove").off("click").on("click", function () {
							var o = $(this),
								msg = $("#msg_loadingdialog").html(),
								eventMsg = {};
			                
			                // Show loading dialog
			                AMA.page.standardDialogs.loading(msg);
			                if(o.hasClass("btn_restorephoto"))
			                	{
					             if(AMA.config.enableReporting)  {
					                    eventMsg = {};
					                    eventMsg['ActionPerformed']="Restore Photo - Trash Details Pane";
					                    AMA.debug("Reporting: Logging event for restore photo to phone");                 
					                    AMA.ReportingManager.reportUserAction(AMA.config.reportingEventTypes.restoreimage, eventMsg);
					                }
					                
					             AMA.models.trash.restore([imageIds[set_position]] , function (refreshModel) {
					                	// On success, hide the loading dialog and refresh the photos model
					                    AMA.page.standardDialogs.hideloading();
				                    	AMA.models.trash.invalidate();
				                    	AMA.models.photos.invalidate();
					                    
					                    $.prettyPhoto.close();
					                });
			                	}
			                else {
			                	if(AMA.config.enableReporting)  {
				                    eventMsg = {};
				                    if (o.hasClass("btn_addtophone")) {
					                    eventMsg['ActionPerformed']="Add Photo To Phone";
					                    AMA.debug("Reporting: Logging event for photo added to phone");                 
					                    AMA.ReportingManager.reportUserAction(AMA.config.reportingEventTypes.addphototophone, eventMsg);
				                    	
				                    } else {
					                    eventMsg['ActionPerformed']="Remove Photo From Phone";
					                    AMA.debug("Reporting: Logging event for photo removed from phone");                 
					                    AMA.ReportingManager.reportUserAction(AMA.config.reportingEventTypes.removephotofrmphone, eventMsg);
				                    	
				                    }
				                }
			                
				                AMA.models.photos.addRemove($pp_pic_holder.find(".btn_addremove").hasClass("btn_addtophone") ? "add" : "remove", "photos", [imageIds[set_position]] , function (refreshModel, resp) {
				                	var data = resp.list[0];
				                	
				                	// On success, hide the loading dialog and refresh the photos model
				                    AMA.page.standardDialogs.hideloading();
				                    if (refreshModel) {
				                    	if(o.hasClass("btn_addtophone")) {
				                    		o.removeClass("btn_addtophone").addClass("btn_removefromphone");
				                    	}
				                    	else {
				                    		o.removeClass("btn_removefromphone").addClass("btn_addtophone");
				                    	}
				                    	
				                    	$pp_pic_holder.find(".rt_endpointsync_text").addClass("hidden");
				                    	if (data.pendingCreate) {
				                    		$pp_pic_holder.find(".rt_endpointsync_text.added_next_sync").removeClass("hidden");
				                    	}
				                    	else if (data.pendingDelete && data.onPhone) {
				                    		$pp_pic_holder.find(".rt_endpointsync_text.removed_next_sync").removeClass("hidden");
				                    	}
				                    	else if (data.onPhone) {
				                    		$pp_pic_holder.find(".rt_endpointsync_text.on_phone").removeClass("hidden");
				                    	}
				                    	else {
				                    		$pp_pic_holder.find(".rt_endpointsync_text.web_only").removeClass("hidden");
				                    	}
				                    	
				                    	AMA.models.photos.invalidate();
				                    }
				                });
		                	}  
						});
						$pp_pic_holder.find(".btn_downloadphoto").off("click").on("click", function () {
							AMA.models.photos.downloadFile("image", imageIds[set_position], function (data) {
								// On success, construct download url using data returned by the server, then download file
								var url = data.mediaUrl.replace("content?", "download?") + "&fileName=" + data.fileName;
								
								AMA.Util.downloadFile(url);
							});
							
		                	if(AMA.config.enableReporting)  {
			                    var eventMsg = {};
			                    eventMsg['ActionPerformed'] = "Download Photo";			                                     
			                    AMA.ReportingManager.reportUserAction(AMA.config.reportingEventTypes.downloadPhoto, eventMsg);
		                	}
						});
						$pp_pic_holder.find(".btn_deletephoto").on("click", function () {
							var msg = $("#msg_confirm_delete_photo").html();
			                AMA.page.standardDialogs.confirm(msg, function () {
			                    // Hide confirmation dialog
			                    AMA.page.standardDialogs.hide();
			                    
			                    // Show loading dialog
			                    var msg = $("#msg_loadingdialog").html();
			                    AMA.page.standardDialogs.loading(msg);
			                    
			                    // Send delete request
			                    AMA.models.photos.trash("image", [imageIds[set_position]], function (refreshModel) {
				                    // On success, hide the loading dialog and refresh the photos model
				                    AMA.page.standardDialogs.hideloading();
				                    $.prettyPhoto.close();
				                    if (refreshModel) AMA.models.photos.invalidate();
				                    AMA.models.trash.invalidate();
			                    });
			                    
			                	if(AMA.config.enableReporting)  {
				                    var eventMsg = {};
				                    eventMsg['ActionPerformed'] = "Delete Photo";			                                     
				                    AMA.ReportingManager.reportUserAction(AMA.config.reportingEventTypes.deletePhoto, eventMsg);
			                	}
			                });
						});
						
						$pp_pic_holder.find(".btn_permadeletephoto").on("click", function () {
							var msg = $("#msg_confirm_delete_photo").html();
			                AMA.page.standardDialogs.confirm(msg, function () {
			                    // Hide confirmation dialog
			                    AMA.page.standardDialogs.hide();
			                    
			                    // Show loading dialog
			                    var msg = $("#msg_loadingdialog").html();
			                    AMA.page.standardDialogs.loading(msg);
			                    
			                    // Send delete request
			                    AMA.models.trash.trash([imageIds[set_position]], function (refreshModel) {
				                    // On success, hide the loading dialog and refresh the photos model
				                    AMA.page.standardDialogs.hideloading();
				                    $.prettyPhoto.close();
				                     AMA.models.trash.invalidate();
			                    });
			                    
			                	if(AMA.config.enableReporting)  {
				                    var eventMsg = {};
				                    eventMsg['ActionPerformed'] = "Permanant Delete photo - Trash Details Pane";			                                     
				                    AMA.ReportingManager.reportUserAction(AMA.config.reportingEventTypes.deleterecordstrash, eventMsg);
			                	}
			                });
						});

						// Preload the neighbour images
						nextImage = new Image();
						if(isSet && set_position < $(pp_images).size() -1) nextImage.src = pp_images[set_position + 1];
						prevImage = new Image();
						if(isSet && pp_images[set_position - 1]) prevImage.src = pp_images[set_position - 1];

						$pp_pic_holder.find('#pp_full_res')[0].innerHTML = settings.image_markup.replace(/{path}/g,pp_images[set_position]);

						imgPreloader.onload = function(){
							// Fit item to viewport
							pp_dimensions = _fitToViewport(imgPreloader.width,imgPreloader.height);

							_showContent();
						};

						imgPreloader.onerror = function(){
							alert('Image cannot be loaded. Make sure the path is correct and image exist.');
							$.prettyPhoto.close();
						};
					
						imgPreloader.src = pp_images[set_position];
					break;
				
					case 'youtube':
						pp_dimensions = _fitToViewport(movie_width,movie_height); // Fit item to viewport
						
						// Regular youtube link
						movie_id = getParam('v',pp_images[set_position]);
						
						// youtu.be link
						if(movie_id == ""){
							movie_id = pp_images[set_position].split('youtu.be/');
							movie_id = movie_id[1];
							if(movie_id.indexOf('?') > 0)
								movie_id = movie_id.substr(0,movie_id.indexOf('?')); // Strip anything after the ?

							if(movie_id.indexOf('&') > 0)
								movie_id = movie_id.substr(0,movie_id.indexOf('&')); // Strip anything after the &
						}

						movie = 'http://www.youtube.com/embed/'+movie_id;
						(getParam('rel',pp_images[set_position])) ? movie+="?rel="+getParam('rel',pp_images[set_position]) : movie+="?rel=1";
							
						if(settings.autoplay) movie += "&autoplay=1";
					
						toInject = settings.iframe_markup.replace(/{width}/g,pp_dimensions['width']).replace(/{height}/g,pp_dimensions['height']).replace(/{wmode}/g,settings.wmode).replace(/{path}/g,movie);
					break;
				
					case 'vimeo':
						pp_dimensions = _fitToViewport(movie_width,movie_height); // Fit item to viewport
					
						movie_id = pp_images[set_position];
						var regExp = /http(s?):\/\/(www\.)?vimeo.com\/(\d+)/;
						var match = movie_id.match(regExp);
						
						movie = 'http://player.vimeo.com/video/'+ match[3] +'?title=0&amp;byline=0&amp;portrait=0';
						if(settings.autoplay) movie += "&autoplay=1;";
				
						vimeo_width = pp_dimensions['width'] + '/embed/?moog_width='+ pp_dimensions['width'];
				
						toInject = settings.iframe_markup.replace(/{width}/g,vimeo_width).replace(/{height}/g,pp_dimensions['height']).replace(/{path}/g,movie);
					break;
				
					case 'quicktime':
						// Remove any previously stored extra classes and add the appropriate classes to the buttons
						if (fromTrashView) {
							$pp_pic_holder.find(".btn_addremove").removeClass().addClass("btn_addremove");
							$pp_pic_holder.find(".btn_addremove").addClass("btn_restorevideo");
							$pp_pic_holder.find(".btn_delete").removeClass().addClass("btn_delete btn_permadeletevideo");
						}
						/*
						$pp_pic_holder.find('.btn_addremove').removeClass("btn_addtophone btn_removefromphone").addClass(pp_addRemove[set_position] === "add" ? "btn_addtophone" : "btn_removefromphone");
						$pp_pic_holder.find('.btn_delete').removeClass("btn_deletephoto").addClass("btn_deletevideo");
						*/
						
						$pp_pic_holder.find(".rt_endpointsync_text").addClass("hidden");
						switch (pp_mediaStatus[set_position]) {
							case "add" :
								$pp_pic_holder.find(".btn_addremove").addClass("btn_removefromphone");
								$pp_pic_holder.find(".rt_endpointsync_text.added_next_sync").removeClass("hidden");
								break;
							case "webonly" :
								$pp_pic_holder.find(".btn_addremove").addClass("btn_addtophone");
								$pp_pic_holder.find(".rt_endpointsync_text.web_only").removeClass("hidden");
								break;
							case "remove" :
								$pp_pic_holder.find(".btn_addremove").addClass("btn_addtophone");
								$pp_pic_holder.find(".rt_endpointsync_text.removed_next_sync").removeClass("hidden");
								break;
							case "onphone" :
								$pp_pic_holder.find(".btn_addremove").addClass("btn_removefromphone");
								$pp_pic_holder.find(".rt_endpointsync_text.on_phone").removeClass("hidden");
								break;
						}
						
						$pp_pic_holder.find('.btn_delete').removeClass("btn_deletephoto").addClass("btn_deletevideo");
						
						$pp_pic_holder.find('.btn_download').removeClass("btn_downloadphoto").addClass("btn_downloadvideo");
						// Bind event handlers to buttons
						$pp_pic_holder.find(".btn_addremove").off("click").on("click", function () {
							var o = $(this),
								msg = $("#msg_loadingdialog").html(),
								eventMsg = {};
			                
			                // Show loading dialog
			                AMA.page.standardDialogs.loading(msg);
			                if(o.hasClass("btn_restorevideo"))
		                	{
				             if(AMA.config.enableReporting)  {
				                    eventMsg = {};
				                    eventMsg['ActionPerformed']="Restore Video - Trash Details Pane";
				                    AMA.debug("Reporting: Logging event for restore video to phone");                 
				                    AMA.ReportingManager.reportUserAction(AMA.config.reportingEventTypes.restorevideo, eventMsg);
				                }
				                
				             AMA.models.trash.restore([imageIds[set_position]] , function (refreshModel) {
				                	// On success, hide the loading dialog and refresh the videos model
				                    AMA.page.standardDialogs.hideloading();
				                   	AMA.models.trash.invalidate();
				                    AMA.models.videos.invalidate();
				                   
				                    $.prettyPhoto.close();
				                });
		                	}
			                else
			                {
				                if(AMA.config.enableReporting)  {
				                    if (o.hasClass("btn_addtophone")) {
					                    eventMsg['ActionPerformed']="Add Video To Phone";
					                    AMA.debug("Reporting: Logging event for video added to phone");                 
					                    AMA.ReportingManager.reportUserAction(AMA.config.reportingEventTypes.addvideotophone, eventMsg);
				                    	
				                    } else {
					                    eventMsg['ActionPerformed']="Remove Video From Phone";
					                    AMA.debug("Reporting: Logging event for video removed from phone");                 
					                    AMA.ReportingManager.reportUserAction(AMA.config.reportingEventTypes.removevideofrmphone, eventMsg);
				                    	
				                    }
				                }
				                
				                AMA.models.videos.addRemove($pp_pic_holder.find(".btn_addremove").hasClass("btn_addtophone") ? "add" : "remove", "videos", [imageIds[set_position]] , function (refreshModel, resp) {
				                	var data = resp.list[0];
				                	
				                	// On success, hide the loading dialog and refresh the photos model
				                    AMA.page.standardDialogs.hideloading();
				                    if (refreshModel) {
				                    	if(o.hasClass("btn_addtophone")) {
				                    		o.removeClass("btn_addtophone").addClass("btn_removefromphone");
				                    	}
				                    	else {
				                    		o.removeClass("btn_removefromphone").addClass("btn_addtophone");
				                    	}
				                    	
				                    	$pp_pic_holder.find(".rt_endpointsync_text").addClass("hidden");
				                    	if (data.pendingCreate) {
				                    		$pp_pic_holder.find(".rt_endpointsync_text.added_next_sync").removeClass("hidden");
				                    	}
				                    	else if (data.pendingDelete  && data.onPhone) {
				                    		$pp_pic_holder.find(".rt_endpointsync_text.removed_next_sync").removeClass("hidden");
				                    	}
				                    	else if (data.onPhone) {
				                    		$pp_pic_holder.find(".rt_endpointsync_text.on_phone").removeClass("hidden");
				                    	}
				                    	else {
				                    		$pp_pic_holder.find(".rt_endpointsync_text.web_only").removeClass("hidden");
				                    	}
				                    	
				                    	AMA.models.videos.invalidate();
				                    }
				                });
						}
						});
						$pp_pic_holder.find(".btn_downloadvideo").off("click").on("click", function () {
							AMA.models.videos.downloadFile("video", imageIds[set_position], function (data) {
								// On success, construct download url using data returned by the server, then download file
								var url = data.mediaUrl.replace("content?", "download?") + "&fileName=" + data.fileName;
								
								AMA.Util.downloadFile(url);
							});
							
		                	if(AMA.config.enableReporting)  {
			                    var eventMsg = {};
			                    eventMsg['ActionPerformed'] = "Download Video";			                                     
			                    AMA.ReportingManager.reportUserAction(AMA.config.reportingEventTypes.downloadvideo, eventMsg);
		                	}
						});
						$pp_pic_holder.find(".btn_deletevideo").on("click", function () {
							var msg = $("#msg_confirm_delete_video").html();
			                AMA.page.standardDialogs.confirm(msg, function () {
			                    // Hide confirmation dialog
			                    AMA.page.standardDialogs.hide();
			                    
			                    // Show loading dialog
			                    var msg = $("#msg_loadingdialog").html();
			                    AMA.page.standardDialogs.loading(msg);
			                    
			                    // Send delete request
			                    AMA.models.videos.trash("video", [imageIds[set_position]], function (refreshModel) {
				                    // On success, hide the loading dialog and refresh the photos model
				                    AMA.page.standardDialogs.hideloading();
				                    $.prettyPhoto.close();
				                    if (refreshModel) AMA.models.videos.invalidate();
				                    AMA.models.trash.invalidate();
			                    });
			                    
			                	if(AMA.config.enableReporting)  {
				                    var eventMsg = {};
				                    eventMsg['ActionPerformed'] = "Delete Video";			                                     
				                    AMA.ReportingManager.reportUserAction(AMA.config.reportingEventTypes.deletevideo, eventMsg);
			                	}			                    
			                });
						});
						
						$pp_pic_holder.find(".btn_permadeletevideo").on("click", function () {
							var msg = $("#msg_confirm_delete_photo").html();
			                AMA.page.standardDialogs.confirm(msg, function () {
			                    // Hide confirmation dialog
			                    AMA.page.standardDialogs.hide();
			                    
			                    // Show loading dialog
			                    var msg = $("#msg_loadingdialog").html();
			                    AMA.page.standardDialogs.loading(msg);
			                    
			                    // Send delete request
			                    AMA.models.trash.trash([imageIds[set_position]], function (refreshModel) {
				                    // On success, hide the loading dialog and refresh the photos model
				                    AMA.page.standardDialogs.hideloading();
				                    $.prettyPhoto.close();
				                     AMA.models.trash.invalidate();
			                    });
			                    
			                	if(AMA.config.enableReporting)  {
				                    var eventMsg = {};
				                    eventMsg['ActionPerformed'] = "Permanant Delete video - Trash Details Pane";			                                     
				                    AMA.ReportingManager.reportUserAction(AMA.config.reportingEventTypes.deleterecordstrash, eventMsg);
			                	}
			                });
						});
						
						pp_dimensions = _fitToViewport(movie_width,movie_height); // Fit item to viewport
						pp_dimensions['height']+=15; pp_dimensions['contentHeight']+=15; pp_dimensions['containerHeight']+=15; // Add space for the control bar
				
						toInject = settings.quicktime_markup.replace(/{width}/g,pp_dimensions['width']).replace(/{height}/g,pp_dimensions['height']).replace(/{wmode}/g,settings.wmode).replace(/{path}/g,pp_images[set_position]).replace(/{autoplay}/g,settings.autoplay);
					break;
				
					case 'flash':
						pp_dimensions = _fitToViewport(movie_width,movie_height); // Fit item to viewport
					
						flash_vars = pp_images[set_position];
						flash_vars = flash_vars.substring(pp_images[set_position].indexOf('flashvars') + 10,pp_images[set_position].length);

						filename = pp_images[set_position];
						filename = filename.substring(0,filename.indexOf('?'));
					
						toInject =  settings.flash_markup.replace(/{width}/g,pp_dimensions['width']).replace(/{height}/g,pp_dimensions['height']).replace(/{wmode}/g,settings.wmode).replace(/{path}/g,filename+'?'+flash_vars);
					break;
				
					case 'iframe':
						pp_dimensions = _fitToViewport(movie_width,movie_height); // Fit item to viewport
				
						frame_url = pp_images[set_position];
						frame_url = frame_url.substr(0,frame_url.indexOf('iframe')-1);

						toInject = settings.iframe_markup.replace(/{width}/g,pp_dimensions['width']).replace(/{height}/g,pp_dimensions['height']).replace(/{path}/g,frame_url);
					break;
					
					case 'ajax':
						doresize = false; // Make sure the dimensions are not resized.
						pp_dimensions = _fitToViewport(movie_width,movie_height);
						doresize = true; // Reset the dimensions
					
						skipInjection = true;
						$.get(pp_images[set_position],function(responseHTML){
							toInject = settings.inline_markup.replace(/{content}/g,responseHTML);
							$pp_pic_holder.find('#pp_full_res')[0].innerHTML = toInject;
							_showContent();
						});
						
					break;
					
					case 'custom':
						pp_dimensions = _fitToViewport(movie_width,movie_height); // Fit item to viewport
					
						toInject = settings.custom_markup;
					break;
				
					case 'inline':
						// to get the item height clone it, apply default width, wrap it in the prettyPhoto containers , then delete
						myClone = $(pp_images[set_position]).clone().append('<br clear="all" />').css({'width':settings.default_width}).wrapInner('<div id="pp_full_res"><div class="pp_inline"></div></div>').appendTo($('body')).show();
						doresize = false; // Make sure the dimensions are not resized.
						pp_dimensions = _fitToViewport($(myClone).width(),$(myClone).height());
						doresize = true; // Reset the dimensions
						$(myClone).remove();
						toInject = settings.inline_markup.replace(/{content}/g,$(pp_images[set_position]).html());
					break;
				};

				if(!imgPreloader && !skipInjection){
					$pp_pic_holder.find('#pp_full_res')[0].innerHTML = toInject;
				
					// Show content
					_showContent();
				};
			});
			
			// <AMA>
			var fileSize = pp_descriptions[set_position];
			$(".pp_pic_holder .fileSize span").html(fileSize);
			// </AMA>

			return false;
		}
	
		/**
		* Set the proper sizes on the containers and animate the content in.
		*/
		function _showContent(){
			$('.pp_loaderIcon').hide();

			// Calculate the opened top position of the pic holder
			projectedTop = scroll_pos['scrollTop'] + ((windowHeight/2) - (pp_dimensions['containerHeight']/2));
			if(projectedTop < 0) projectedTop = 0;

			$ppt.fadeTo(settings.animation_speed,1);

			// Resize the content holder
			$pp_pic_holder.find('.pp_content')
				.animate({
					height:pp_dimensions['contentHeight'],
					width:pp_dimensions['contentWidth']
				},settings.animation_speed);
			
			// Resize picture the holder
			$pp_pic_holder.animate({
				'top': projectedTop,
				'left': ((windowWidth/2) - (pp_dimensions['containerWidth']/2) < 0) ? 0 : (windowWidth/2) - (pp_dimensions['containerWidth']/2),
				width:pp_dimensions['containerWidth']
			},settings.animation_speed,function(){
				$pp_pic_holder.find('.pp_hoverContainer,#fullResImage').height(pp_dimensions['height']).width(pp_dimensions['width']);

				$pp_pic_holder.find('.pp_fade').fadeIn(settings.animation_speed); // Fade the new content

				// Show the nav
				if(isSet && _getFileType(pp_images[set_position])=="image") { $pp_pic_holder.find('.pp_hoverContainer').show(); }else{ $pp_pic_holder.find('.pp_hoverContainer').hide(); }
			
				if(settings.allow_expand) {
					if(pp_dimensions['resized']){ // Fade the resizing link if the image is resized
						$('a.pp_expand,a.pp_contract').show();
					}else{
						$('a.pp_expand').hide();
					}
				}
				
				if(settings.autoplay_slideshow && !pp_slideshow && !pp_open) $.prettyPhoto.startSlideshow();
				
				settings.changepicturecallback(); // Callback!
				
				pp_open = true;
			});
			
			_insert_gallery();
			pp_settings.ajaxcallback();
		};
		
		/**
		* Hide the content...DUH!
		*/
		function _hideContent(callback){
			// Fade out the current picture
			$pp_pic_holder.find('#pp_full_res object,#pp_full_res embed').css('visibility','hidden');
			$pp_pic_holder.find('.pp_fade').fadeOut(settings.animation_speed,function(){
				$('.pp_loaderIcon').show();
				
				callback();
			});
		};
	
		/**
		* Check the item position in the gallery array, hide or show the navigation links
		* @param setCount {integer} The total number of items in the set
		*/
		function _checkPosition(setCount){
			if (AMA.config.useLegacyApi){
				(setCount > 1) ? $('.pp_nav').show() : $('.pp_nav').hide(); // Hide the bottom nav if it's not a set.
			}
			else {
				$('.btn_mediaprev').show();
                $('.btn_medianext').show();
                
                if ((imageIds.length-1)<2) {
                        $('.btn_mediaprev').hide();
                        $('.btn_medianext').hide();
                }
                else if (setCount<= 0 ) {
                        $('.btn_mediaprev').hide();
                } else if (setCount >= imageIds.length-1) {
                        $('.btn_medianext').hide();
                }
			}
		};
		
		/**
		* Hides other buttons from the bottom navigation pane
		*/
		function _hideOtherButtons(hide){
			$('.btn_addremove').show();
			$('.btn_download').show();
			$('.btn_delete').show();
			
			/*if (hide) {
				$('.btn_addremove').hide();
				$('.btn_download').hide();
				$('.btn_delete').hide();
			}*/
		};
	
		/**
		* Resize the item dimensions if it's bigger than the viewport
		* @param width {integer} Width of the item to be opened
		* @param height {integer} Height of the item to be opened
		* @return An array containin the "fitted" dimensions
		*/
		function _fitToViewport(width,height){
			resized = false;

			_getDimensions(width,height);
			
			// Define them in case there's no resize needed
			imageWidth = width, imageHeight = height;

			if( ((pp_containerWidth > windowWidth) || (pp_containerHeight > windowHeight)) && doresize && settings.allow_resize && !percentBased) {
				resized = true, fitting = false;
			
				while (!fitting){
					if((pp_containerWidth > windowWidth)){
						imageWidth = (windowWidth - 200);
						imageHeight = (height/width) * imageWidth;
					}else if((pp_containerHeight > windowHeight)){
						imageHeight = (windowHeight - 200);
						imageWidth = (width/height) * imageHeight;
					}else{
						fitting = true;
					};

					pp_containerHeight = imageHeight, pp_containerWidth = imageWidth;
				};
			

				
				if((pp_containerWidth > windowWidth) || (pp_containerHeight > windowHeight)){
					_fitToViewport(pp_containerWidth,pp_containerHeight);
				};
				
				_getDimensions(imageWidth,imageHeight);
			};
			
			// <AMA>
			// Resize to min_width when container width is smaller
	        if(pp_containerWidth < pp_settings.min_width){
	           pp_containerWidth = pp_settings.min_width;
	        }
	
	        // Resize to min_width when content width is smaller
	        if(pp_contentWidth < pp_settings.min_width){
	           pp_contentWidth = pp_settings.min_width;
	        }
	        // </AMA>
			
			return {
				width:Math.floor(imageWidth),
				height:Math.floor(imageHeight),
				containerHeight:Math.floor(pp_containerHeight),
				containerWidth:Math.floor(pp_containerWidth) + (settings.horizontal_padding * 2),
				contentHeight:Math.floor(pp_contentHeight),
				contentWidth:Math.floor(pp_contentWidth),
				resized:resized
			};
		};
		
		/**
		* Get the containers dimensions according to the item size
		* @param width {integer} Width of the item to be opened
		* @param height {integer} Height of the item to be opened
		*/
		function _getDimensions(width,height){
			width = parseFloat(width);
			height = parseFloat(height);
			
			// Get the details height, to do so, I need to clone it since it's invisible
			$pp_details = $pp_pic_holder.find('.pp_details');
			$pp_details.width(width);
		
			// <AMA>
			// Set details width to min_width
	        if(width < pp_settings.min_width){
				$pp_details.width(pp_settings.min_width);
			}
			// </AMA>
		
			detailsHeight = parseFloat($pp_details.css('marginTop')) + parseFloat($pp_details.css('marginBottom'));
			
			$pp_details = $pp_details.clone().addClass(settings.theme).width(width).appendTo($('body')).css({
				'position':'absolute',
				'top':-10000
			});
			detailsHeight += $pp_details.height();
			detailsHeight = (detailsHeight <= 34) ? 36 : detailsHeight; // Min-height for the details
			$pp_details.remove();
			
			// Get the titles height, to do so, I need to clone it since it's invisible
			$pp_title = $pp_pic_holder.find('.ppt');
			$pp_title.width(width);
			titleHeight = parseFloat($pp_title.css('marginTop')) + parseFloat($pp_title.css('marginBottom'));
			$pp_title = $pp_title.clone().appendTo($('body')).css({
				'position':'absolute',
				'top':-10000
			});
			titleHeight += $pp_title.height();
			$pp_title.remove();
			
			// Get the container size, to resize the holder to the right dimensions
			pp_contentHeight = height + detailsHeight;
			pp_contentWidth = width;
			pp_containerHeight = pp_contentHeight + titleHeight + $pp_pic_holder.find('.pp_top').height() + $pp_pic_holder.find('.pp_bottom').height();
			pp_containerWidth = width;
		}
	
		function _getFileType(itemSrc){
			if (itemSrc.match(/youtube\.com\/watch/i) || itemSrc.match(/youtu\.be/i)) {
				return 'youtube';
			}else if (itemSrc.match(/vimeo\.com/i)) {
				return 'vimeo';
			}else if(itemSrc.match(/.mov\b/i) || itemSrc.match(/.mp4\b/i) || itemSrc.match(/.3gp\b/i)){ 
				return 'quicktime';
			}else if(itemSrc.match(/.swf\b/i)){
				return 'flash';
			}else if(itemSrc.match(/\biframe=true\b/i)){
				return 'iframe';
			}else if(itemSrc.match(/\bajax=true\b/i)){
				return 'ajax';
			}else if(itemSrc.match(/\bcustom=true\b/i)){
				return 'custom';
			}else if(itemSrc.substr(0,1) == '#'){
				return 'inline';
			}else{
				return 'image';
			};
		};
	
		function _center_overlay(){
			if(doresize && typeof $pp_pic_holder != 'undefined') {
				scroll_pos = _get_scroll();
				contentHeight = $pp_pic_holder.height(), contentwidth = $pp_pic_holder.width();

				projectedTop = (windowHeight/2) + scroll_pos['scrollTop'] - (contentHeight/2);
				if(projectedTop < 0) projectedTop = 0;
				
				if(contentHeight > windowHeight)
					return;

				$pp_pic_holder.css({
					'top': projectedTop,
					'left': (windowWidth/2) + scroll_pos['scrollLeft'] - (contentwidth/2)
				});
			};
		};
	
		function _get_scroll(){
			if (self.pageYOffset) {
				return {scrollTop:self.pageYOffset,scrollLeft:self.pageXOffset};
			} else if (document.documentElement && document.documentElement.scrollTop) { // Explorer 6 Strict
				return {scrollTop:document.documentElement.scrollTop,scrollLeft:document.documentElement.scrollLeft};
			} else if (document.body) {// all other Explorers
				return {scrollTop:document.body.scrollTop,scrollLeft:document.body.scrollLeft};
			};
		};
	
		function _resize_overlay() {
			windowHeight = $(window).height(), windowWidth = $(window).width();
			
			if(typeof $pp_overlay != "undefined") $pp_overlay.height($(document).height()).width(windowWidth);
		};
	
		function _insert_gallery(){
			if(isSet && settings.overlay_gallery && _getFileType(pp_images[set_position])=="image") {
				itemWidth = 52+5; // 52 beign the thumb width, 5 being the right margin.
				navWidth = (settings.theme == "facebook" || settings.theme == "pp_default") ? 50 : 30; // Define the arrow width depending on the theme
				
				itemsPerPage = Math.floor((pp_dimensions['containerWidth'] - 100 - navWidth) / itemWidth);
				itemsPerPage = (itemsPerPage < pp_images.length) ? itemsPerPage : pp_images.length;
				totalPage = Math.ceil(pp_images.length / itemsPerPage) - 1;

				// Hide the nav in the case there's no need for links
				if(totalPage == 0){
					navWidth = 0; // No nav means no width!
					$pp_gallery.find('.pp_arrow_next,.pp_arrow_previous').hide();
				}else{
					$pp_gallery.find('.pp_arrow_next,.pp_arrow_previous').show();
				};

				galleryWidth = itemsPerPage * itemWidth;
				fullGalleryWidth = pp_images.length * itemWidth;
				
				// Set the proper width to the gallery items
				$pp_gallery
					.css('margin-left',-((galleryWidth/2) + (navWidth/2)))
					.find('div:first').width(galleryWidth+5)
					.find('ul').width(fullGalleryWidth)
					.find('li.selected').removeClass('selected');
				
				goToPage = (Math.floor(set_position/itemsPerPage) < totalPage) ? Math.floor(set_position/itemsPerPage) : totalPage;

				$.prettyPhoto.changeGalleryPage(goToPage);
				
				$pp_gallery_li.filter(':eq('+set_position+')').addClass('selected');
			}else{
				$pp_pic_holder.find('.pp_content').unbind('mouseenter mouseleave');
				// $pp_gallery.hide();
			}
		}
	
		function _build_overlay(caller){
			// Inject Social Tool markup into General markup
			if(settings.social_tools)
				facebook_like_link = settings.social_tools.replace('{location_href}', encodeURIComponent(location.href)); 

			settings.markup = settings.markup.replace('{pp_social}',''); 
			
			$('body').append(settings.markup); // Inject the markup
			
			$pp_pic_holder = $('.pp_pic_holder') , $ppt = $('.ppt'), $pp_overlay = $('div.pp_overlay'); // Set my global selectors
			
			// Inject the inline gallery!
			if(isSet && settings.overlay_gallery) {
				currentGalleryPage = 0;
				toInject = "";
				for (var i=0; i < pp_images.length; i++) {
					if(!pp_images[i].match(/\b(jpg|jpeg|png|gif)\b/gi)){
						classname = 'default';
						img_src = '';
					}else{
						classname = '';
						img_src = pp_images[i];
					}
					toInject += "<li class='"+classname+"'><a href='#'><img src='" + img_src + "' width='50' alt='' /></a></li>";
				};
				
				toInject = settings.gallery_markup.replace(/{gallery}/g,toInject);
				
				$pp_pic_holder.find('#pp_full_res').after(toInject);
				
				$pp_gallery = $('.pp_pic_holder .pp_gallery'), $pp_gallery_li = $pp_gallery.find('li'); // Set the gallery selectors
				
				$pp_gallery.find('.pp_arrow_next').click(function(){
					$.prettyPhoto.changeGalleryPage('next');
					$.prettyPhoto.stopSlideshow();
					return false;
				});
				
				$pp_gallery.find('.pp_arrow_previous').click(function(){
					$.prettyPhoto.changeGalleryPage('previous');
					$.prettyPhoto.stopSlideshow();
					return false;
				});
				
				// <AMA>
				// Don't show the "play" option on hover
				/*$pp_pic_holder.find('.pp_content').hover(
					function(){
						$pp_pic_holder.find('.pp_gallery:not(.disabled)').fadeIn();
					},
					function(){
						$pp_pic_holder.find('.pp_gallery:not(.disabled)').fadeOut();
					});*/
				// </AMA>

				itemWidth = 52+5; // 52 beign the thumb width, 5 being the right margin.
				$pp_gallery_li.each(function(i){
					$(this)
						.find('a')
						.click(function(){
							$.prettyPhoto.changePage(i);
							$.prettyPhoto.stopSlideshow();
							return false;
						});
				});
			};
			
			
			// Inject the play/pause if it's a slideshow
			if(settings.slideshow){
				$pp_pic_holder.find('.pp_nav').prepend('<a href="#" class="pp_play">Play</a>');
				$pp_pic_holder.find('.pp_nav .pp_play').click(function(){
					$.prettyPhoto.startSlideshow();
					return false;
				});
			}
			
			$pp_pic_holder.attr('class','pp_pic_holder ' + settings.theme); // Set the proper theme
			
			$pp_overlay
				.css({
					'opacity':0,
					'height':$(document).height(),
					'width':$(window).width()
					})
				.bind('click',function(){
					if(!settings.modal) $.prettyPhoto.close();
				});

			$('a.pp_close').bind('click',function(){ $.prettyPhoto.close(); return false; });


			if(settings.allow_expand) {
				$('a.pp_expand').bind('click',function(e){
					// Expand the image
					if($(this).hasClass('pp_expand')){
						$(this).removeClass('pp_expand').addClass('pp_contract');
						doresize = false;
					}else{
						$(this).removeClass('pp_contract').addClass('pp_expand');
						doresize = true;
					};
				
					_hideContent(function(){ $.prettyPhoto.open(); });
			
					return false;
				});
			}
		
			$pp_pic_holder.find('.pp_previous, .pp_nav .pp_arrow_previous').bind('click',function(){
				$.prettyPhoto.changePage('previous');
				$.prettyPhoto.stopSlideshow();
				return false;
			});
		
			$pp_pic_holder.find('.pp_next, .pp_nav .pp_arrow_next').bind('click',function(){
				$.prettyPhoto.changePage('next');
				$.prettyPhoto.stopSlideshow();
				return false;
			});
			
			_center_overlay(); // Center it
		};

		if(!pp_alreadyInitialized && getHashtag()){
			pp_alreadyInitialized = true;
			
			// Grab the rel index to trigger the click on the correct element
			hashIndex = getHashtag();
			hashRel = hashIndex;
			hashIndex = hashIndex.substring(hashIndex.indexOf('/')+1,hashIndex.length-1);
			hashRel = hashRel.substring(0,hashRel.indexOf('/'));

			// Little timeout to make sure all the prettyPhoto initialize scripts has been run.
			// Useful in the event the page contain several init scripts.
			setTimeout(function(){ $("a["+pp_settings.hook+"^='"+hashRel+"']:eq("+hashIndex+")").trigger('click'); },50);
		}
		
		return this.unbind('click.prettyphoto').bind('click.prettyphoto',$.prettyPhoto.initialize); // Return the jQuery object for chaining. The unbind method is used to avoid click conflict when the plugin is called more than once
	};
	
	function getHashtag(){
		var url = location.href;
		hashtag = (url.indexOf('#prettyPhoto') !== -1) ? decodeURI(url.substring(url.indexOf('#prettyPhoto')+1,url.length)) : false;

		return hashtag;
	};
	
	function setHashtag(){
		if(typeof theRel == 'undefined') return; // theRel is set on normal calls, it's impossible to deeplink using the API
		location.hash = theRel + '/'+rel_index+'/';
	};
	
	function clearHashtag(){
		if ( location.href.indexOf('#prettyPhoto') !== -1 ) location.hash = "prettyPhoto";
	}
	
	function getParam(name,url){
	  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	  var regexS = "[\\?&]"+name+"=([^&#]*)";
	  var regex = new RegExp( regexS );
	  var results = regex.exec( url );
	  return ( results == null ) ? "" : results[1];
	}
	
})(jQuery);

var pp_alreadyInitialized = false; // Used for the deep linking to make sure not to call the same function several times.