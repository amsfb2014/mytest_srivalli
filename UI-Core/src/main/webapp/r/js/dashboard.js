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
/*! TableMaker */
(function() {
	TableMaker = function (columns, options) {    var cls = arguments.callee;
    if (!(this instanceof cls)) {
        return new cls(columns, options);
    }
    this.__init__(columns, options);
};

TableMaker.prototype = {

	__class__: TableMaker,
    
	__init__: function (columns, options) {
		this.columns = columns;
		this.elements = 0;
		
		this.options = $.extend({}, {
			columnClass: "tm_td",
			rowClass: "tm_tr",
			tableClass: "tm_table"
		}, options || {});
		
		this.html = "<table class='" + this.options.tableClass + "'>";
	},
	
	add: function(elementHTML)
	{
		if (this.elements % this.columns == 0)
		{
			this.html += "<tr class='" + this.options.rowClass + "'>";
		}
		this.html += "<td class='" + this.options.columnClass + "'>";
		this.html += elementHTML;
		this.html += "<td>";
		
		this.elements++;
		if (this.elements % this.columns == 0)
		{
			this.html += "</tr>";
		}
	},
	
	close: function()
	{
		this.html += "</tr>";
		this.html += "</table>";
		return this.html;
	}
	
}
})();

/*! Endpoints */
(function () {

    AMA.namespace("model");

    var Endpoints = AMA.model.Endpoints = AMA.model.BaseData.extend();

    //Endpoints.URL = "/accounts";
	// TODO: change to "devices"
	Endpoints.RESOURCE = "device_info";
	
    Endpoints.MODEL = AMA.model.BaseData.MODEL.extend({
		defaults: {
			announceSupported: "", // applicationVersion.announce
			contactsSupported: "", // applicationVersion.contacts
			endpointid: 0, // endpointId
			fileStorageLimit: "",
			interactiveGuideUrls: "",
			locationCheckSupported: "", 
			lostPhoneSupported: "",
			maxchars: {}, 
			name: "", // displayName
			platform: "", // platformName
			platformfriendlyname: "", // ??
			pollingSupported: "", 
			premiumBackupSupported: "", // applicationVersion.premiumBackup
			recoverySupported: "", // applicationVersion.recovery
			retry: {},
			safeBrowsingSupported: "", // applicationVersion.safeBrowsing
			securityActionPendingSupported: "", // applicationVersion.securityActionsPending
			syncAndOrWipeSupported: "", // applicationVersion.syncAndOrWipe
			synctimes: [],
			version: "", // "{"feature-version": applicationVersion.featureVersion,
						// "device-os-version": applicationVersion.deviceOsVersion,
						// "app-version": applicationVersion.appVersion}" 
			wakeupSupported: "" // applicationVersion.noWakeup
		}
    });

    AMA.augment(
	Endpoints.prototype, {
        _configureFetchOptions: function (options) {},
		 
		_configureUrl: function () {
            this.url =  AMA.config.apiHostUrl + "/devices/" +
                        AMA.config.endpointId + "?" +
                        $.param({
                            devId: AMA.config.devId,
                            authToken: AMA.config.authToken
                        });
        },
		
		parse: function(resp) {
			var model = this.constructor.MODEL.prototype.defaults;
			
			model.announceSupported = resp.applicationVersion.announce;
			model.contactsSupported = resp.applicationVersion.contacts;
			model.endpointid = resp.endpointId;
			model.name = resp.displayName;
			model.platform = resp.platformName;
			model.platformfriendlyname = "";
			model.premiumBackupSupported = resp.applicationVersion.premiumBackup;
			model.recoverySupported = resp.applicationVersion.recovery;
			model.safeBrowsingSupported = resp.applicationVersion.safeBrowsing;
			model.securityActionPendingSupported = resp.applicationVersion.securityActionsPending;
			model.syncAndOrWipeSupported = resp.applicationVersion.syncAndOrWipe;
			model.version = '{"feature-version": ' + resp.applicationVersion.featureVersion + ',' +
						'"device-os-version": ' + resp.applicationVersion.deviceOsVersion + ',' +
						'"app-version": ' + resp.applicationVersion.appVersion + '}';
			model.wakeupSupported = resp.applicationVersion.noWakeup;
			
			return model;
		}
		
    });

})();
/*! DashboardData */
(function () {
    AMA.namespace("model");

    var DashboardData = AMA.model.DashboardData = AMA.model.BaseData.extend();

    DashboardData.RESOURCE = "accountSettings";
    DashboardData.URL = {
        ENDPOINT: "accounts",
        KEYWORDS: {
            ACCOUNT_PREFERENCES: "preferences",
            CHANGE_PASSWORD: "changePassword",
            SECURE_ACCOUNT_PREFERENCES: "secureAccountPreferences",
            UPDATE_EMAIL: "updateEmail"
        }
    };
    DashboardData.MODEL = AMA.model.BaseData.MODEL.extend({

    });


    AMA.augment(DashboardData.prototype, {
        _configureUrl: function () {
            this.url =  AMA.config.apiHostUrl + "/" + 
                        DashboardData.URL.ENDPOINT + "/" +
                        AMA.config.accountDetails.accountId + "/" +
                        DashboardData.URL.KEYWORDS.ACCOUNT_PREFERENCES + "?" +
                        $.param({
                            devId: AMA.config.devId,
                            authToken: AMA.config.authToken
                        });
        },

        _buildUpdateUrl: function (keyword, options) {
            var url =   AMA.config.apiHostUrl + "/" + 
                        DashboardData.URL.ENDPOINT + "/" +
                        AMA.config.accountDetails.accountId + "/" +
                        keyword + "?" +
                        $.param({
                            devId: AMA.config.devId,
                            authToken: AMA.config.authToken
                        });

            if (options && options.endpointId) {
                url += "&" + $.param({
                    endpointId: AMA.config.endpointId
                });
            }

            return url;
        },

        fetch: function (options) {
            if (this.isFetching) {
                return;
            }
            this.isFetching = true;
            options = options || {};

            // Force reset
            options.reset = true;

            this._configureFetchOptions(options);

            var complete = options.complete,
                o = this;

            options.complete = _.bind(function () {
                this.isLoaded = true;
                this.isFetching = false;

                if (options.callback && typeof options.callback == "function") options.callback();

                if (complete) complete.apply(arguments);
            }, this);

            options.success = function () {
                o.isLoaded = true;
                o.isFetching = false;

                if (options.callback && typeof options.callback == "function") options.callback();

                if (complete) complete.apply(arguments);
            };

            Backbone.Collection.prototype.fetch.call(this, options);
        },

        /* Updates account information
         *
         * @param {Object} data
         * @param {Function} callback
         */
        saveAccountInfo: function (data, callback) {
            var options = {};

            options.cache = false;
            options.complete = function (resp) {
                try {
                    var response = JSON.parse(resp.responseText);
                } catch (e) {
                    response = resp.responseText || resp;
                };

                callback(response);
            };
            options.contentType = "application/json;charset=UTF-8";
            options.data = JSON.stringify(data);
            options.error = function() {
                AMA.error("Request returned an error");
            };
            options.url = this._buildUpdateUrl(DashboardData.URL.KEYWORDS.UPDATE_EMAIL);

            this.sync("update", this, options);
        },

        /* Updates account password
         *
         * @param {Object} data
         * @param {Function} callback
         */
        saveNewPassword: function (data, callback) {
            var options = {},
                buildUrlOptions = {
                    endpointId: true
                };

            options.cache = false;
            options.complete = function (resp) {
                var response = resp.responseText || resp;
                callback(JSON.parse(response) || response);
            };
            options.contentType = "application/json;charset=UTF-8";
            options.data = JSON.stringify(data);
            options.error = function() {
                var data = {
                    "error" : "Invalid Password"
                };
                callback(data);
            };
            options.url = this._buildUpdateUrl(DashboardData.URL.KEYWORDS.CHANGE_PASSWORD, buildUrlOptions);

            this.sync("update", this, options);
        },

        /* Updates account security question and answer
         *
         * @param {Object} data
         * @param {Function} callback
         */
        saveSecurityQA: function (data, callback) {
            var options = {};

            options.cache = false;
            options.callback = callback;
            options.complete = function (resp) {
                callback(true, resp.responseText === AMA.config.accountDetails.accountId ? resp.responseText : JSON.parse(resp.responseText));
            };
            options.success = function () {
                callback(true, this.responseText === AMA.config.accountDetails.accountId ? this.responseText : JSON.parse(this.responseText));
            };
            options.contentType = "application/json;charset=UTF-8";
            options.data = JSON.stringify(data);
            options.error = function() {
                AMA.error("Request returned an error");
            };
            options.url = this._buildUpdateUrl(DashboardData.URL.KEYWORDS.SECURE_ACCOUNT_PREFERENCES);

            this.sync("update", this, options);
        }
    });
})();
/*! DeviceSettings */
(function () {
    
    AMA.namespace("model");
    
    var DeviceSettings = AMA.model.DeviceSettings = AMA.model.BaseData.extend();
            
    //DeviceSettings.URL = "/devicesettings";
	DeviceSettings.RESOURCE = "device_info";
    DeviceSettings.MODEL = AMA.model.BaseData.MODEL.extend({
		defaults: {
			_meta: {},
			android_device_admin: 0, //
			current_lockstatus: 0, //
			data_wiped: 0,
			id: "",
			locationcheck_on: 0, //
			smsDisabled: false,
			visibility: "",
			href: "",
			active: false
		}
    });
    
    AMA.augment(DeviceSettings.prototype, {
		_configureUrl: function () {
            this.url =  AMA.config.apiHostUrl + "/devices/" +
                        AMA.config.endpointId + "/state?" +
                        $.param({
                            devId: AMA.config.devId,
                            authToken: AMA.config.authToken
                        });
        },
		
        parse: function(resp) {
			var model = this.constructor.MODEL.prototype.defaults; 
			
			model.id = resp.endpointId;
			model.android_device_admin = resp.situation.deviceAdminEnabled ? 1 : 0;
			model.current_lockstatus = resp.situation.screenLocked ? 1 : 0;
			model.data_wiped = resp.situation.dataWiped ? 1 : 0;
			model.locationcheck_on = resp.situation.locationCheckEnabled ? 1 : 0;
			model.smsDisabled = resp.smsDisabled;
			model.visibility = resp.visibility;
			model.href = resp.href;
			model.active = resp.active;
			
			return model;
		}
    });

})();
/* LegacyApiSupport */
(function () {
	//if (!AMA.config.useLegacyApi) return;

    var LegacyBaseDataMethods = {
        sync: function (method, model, options) {
            // Default JSON-request options.
            var params = {
                type: "POST",
                dataType: "json"
            };

            // Default options, unless specified.
            _.defaults(options || (options = {}), {
                emulateHTTP: Backbone.emulateHTTP,
                emulateJSON: Backbone.emulateJSON
            });

            // Ensure that we have a URL.
            if (!options.url) {
                params.url = _.result(model, "url") || urlError();
            }

            // Ensure that we have the appropriate request data.
            if (options.data == null && model && (method === "create" || method === "update" || method === "patch")) {
                params.contentType = "application/json";
                params.data = JSON.stringify(options.attrs || model.toJSON(options));
            }

            // For older servers, emulate JSON by encoding the request into an HTML-form.
            if (options.emulateJSON) {
                params.contentType = "application/x-www-form-urlencoded";
                params.data = params.data ? {model: params.data} : {};
            }

            // For older servers, emulate HTTP by mimicking the HTTP method with `_method`
            // And an `X-HTTP-Method-Override` header.
            if (options.emulateHTTP && (type === "PUT" || type === "DELETE" || type === "PATCH")) {
                params.type = "POST";
                if (options.emulateJSON) params.data._method = type;
                var beforeSend = options.beforeSend;
                options.beforeSend = function(xhr) {
                    xhr.setRequestHeader("X-HTTP-Method-Override", type);
                    if (beforeSend) return beforeSend.apply(this, arguments);
                };
            }

            // If we're sending a `PATCH` request, and we're in an old Internet Explorer
            // that still has ActiveX enabled by default, override jQuery to use that
            // for XHR instead. Remove this line when jQuery supports `PATCH` on IE8.
            if (params.type === "PATCH" && window.ActiveXObject &&
                !(window.external && window.external.msActiveXFilteringEnabled)) {
                params.xhr = function() {
                    return new ActiveXObject("Microsoft.XMLHTTP");
                };
            }

            // Make the request, allowing the user to override any Ajax options.
            var xhr = options.xhr = Backbone.ajax(_.extend(params, options));
            model.trigger("request", model, xhr, options);
            return xhr;
        },

        parse: function (resp) {
            var list = [],
                i, j,
                item = null,
                data = null,
                o = null,
                key = "",
                fields = this.constructor.LEGACY_RECORD_TYPE.fields;

            // Lookup field name based on field ID
            function getFieldName (id) {
                var k;
                for (k in fields) {
                    if (id.indexOf(fields[k]) == 0) return k;
                }
                return false;
            }

            for (i = 0; i < resp.length; i++) {
                item = resp[i];

                // Ignore this record if it is not the expected type
                if (item.rt !== this.constructor.LEGACY_RECORD_TYPE.id) continue;

                o = {};

                // Set the id to the value of "ri"
                if (item.ri) {
                    o.id = item.ri;
                }

                // Get the field values from "dt"
                data = item.dt;
                if (data && typeof data === "object") {
                    for (j in data) {
                        key = getFieldName(j);
                        if (key) {
                            if (o[key]) {
                                if (o[key+"2"]) {
                                    o[key+"3"] = data[j];
                                } else {
                                    o[key+"2"] = data[j];
                                }
                            } else {
                                o[key] = data[j];
                            }
                        }
                    }
                }

                // Get the meta information from the rest of the record fields
                o._meta = {};
                for (j in item) {
                    if (j === "ri") continue;
                    o._meta[j] = item[j];
                }

                list.push(o);
            }

            return list;
        },

        _configureUrl: function () {
            this.url = AMA.config.legacyApiBaseUrl + "/records.poo?";
        },

        _configureFetchOptions: function (options) {
            options.data = {
                method: "retrieve",
                recordtype: this.constructor.LEGACY_RECORD_TYPE.id,
                csrfvalue: AMA.config.csrfToken
            };
        }
    };


    var UserData = AMA.model.UserData;
    if (UserData) {

        UserData.actionMethods = {
            UPDATE_VISIBILITY: "setEnabledDataInAccount",
            ADD_TO_DEVICE: "addToEndpoint",
            REMOVE_FROM_DEVICE: "deleteFromEndpoint",
            addToGroup: "addToGroup",
            removeFromGroup: "removeFromGroup"
        };

        var LegacyUserDataMethods = {};
        _.extend(LegacyUserDataMethods, LegacyBaseDataMethods, {

            sync: function(method, model, options) {
                var defaults = {};
                if(method === "update") {
                    var clonedData = model.toJSON();
                    var dataSet = [];
                    var o = this;
                    _.each(clonedData, function(item, index) {
                        var data = {
                            dt: {},
                            vi: parseInt(item.status),
                            ri: item.id,
                            // This is basically just the fullname but it seems to always be blank?
                            se: item._meta.se,
                            sh: item._meta.sh,
                            io: item._meta.io,  // this should had been parsed
                            vo: item.onPhone ? [AMA.currentEndpoint] : [],
                            pd: item.pendingDelete ? [AMA.currentEndpoint] : [],
                            ic: item.isCurrent,  // this should had been parsed
                            dg: item._meta.dg,
                            cp: item._meta.cp,
                            pc: item.pendingCreate ? [AMA.currentEndpoint] : [],
                            oai: item._meta.oai,  // this should had been parsed
                            pu: item.pendingUpdate ? [AMA.currentEndpoint] : [],
                            rt: item._meta.rt
                        };

                        // populates dt
                        dataSet.push(o._prepareData(item, data, model.statusUpdated));
                    });

                    var defaults = {
                        url: this.url+"?"+$.param(this._getParams(model, {csrfvalue: AMA.config.csrfToken})),
                        wait: true,
                        cache : false,
                        contentType : "application/json; charset=utf-8",
                        data: model.statusUpdated ? JSON.stringify(dataSet) : encodeURIComponent(JSON.stringify(dataSet)),
                        dataType: "json"
                    };

                    options = options || {};

                    options.success = options.success || function(data, resp, xhr) {
                        if (resp != null && !resp.failures)
                        {
                            var items = o.parse(data),
                            // Hack to find photos in returned data (used below)
                                photosData = _.find(data, function (item){
                                    return item.rt === AMA.config.legacyRecordTypes.PHOTO.id;
                                }),
                            // Hack to find videos in returned data (used below)
                                videosData = _.find(data, function (item){
                                    return item.rt === AMA.config.legacyRecordTypes.VIDEO.id;
                                });

                            o.set(items, {remove: false});

                            // Hack below to invalidate photos/videos models when present in data
                            // TODO: Remove hack
                            if (photosData) {
                                AMA.models.photos.invalidate();
                            }
                            if (videosData) {
                                AMA.models.videos.invalidate();
                            }

                            // right now, we're unsure whether this model is moved to trash, permanently deleted or restored, so we trigger collect
                            // for that trash will be re-collected
                            o.trigger("collect");
                        }
                    };

                    options.error = options.error || function(xhr) {
                        model.trigger("error", model, xhr, options);
                    };

                    model.statusUpdated = false;
                    model.mustAddToPhone = false;
                    model.mustRemoveFromPhone = false;
                }
                _.extend(defaults, options);

                return LegacyBaseDataMethods.sync.call(this, method, model, defaults || {});
            },

            parse: function (resp) {
                var conf = AMA.config,
                    endpoint = AMA.currentEndpoint;

                var list = LegacyBaseDataMethods.parse.call(this, resp);

                // Filter out the 'purged' items here
                list = _.reject(list, function (item) {
                    return item._meta[conf.legacyMetaFields.visibility] === UserData.Status.PURGED;
                });

                _.each(list, function (item, idx) {
                    item.isCurrent = item._meta[conf.legacyMetaFields.isCurrent];
                    item.status = item._meta[conf.legacyMetaFields.visibility];
                    item.onPhone = _.contains(item._meta[conf.legacyMetaFields.visible], endpoint);
                    item.pendingCreate = _.contains(item._meta[conf.legacyMetaFields.pendingCreate], endpoint);
                    item.pendingDelete = _.contains(item._meta[conf.legacyMetaFields.pendingDelete], endpoint);
                    item.pendingUpdate = _.contains(item._meta[conf.legacyMetaFields.pendingUpdate], endpoint);
                });

                // TODO: Move all items with item.status == "trashed" to Trash
                // by triggering a "ITEM_TRASHED" event passing the model object as event detail

                return list;
            },


            trash: function (id) {
                this.get(id).set("status", UserData.Status.TRASHED, {silent:true});
                this.statusUpdated = true;
            },

            restore: function (id) {
                this.get(id).set("status", UserData.Status.ENABLED, {silent:true});
                this.statusUpdated = true;
            },

            purge: function (id) {
                this.get(id).set("status", UserData.Status.PURGED, {silent:true});
                this.statusUpdated = true;
            },

            addToPhone: function (id) {
                var item = this.get(id);

                if (item.get("onPhone"))
                    item.set("pendingDelete", false, {silent:true});
                item.set("pendingCreate", true, {silent:true});

                this.mustAddToPhone = true;
            },

            removeFromPhone: function (id) {
                var item = this.get(id);

                item.set("pendingDelete", true, {silent:true});

                this.mustRemoveFromPhone = true;
            },

            _getParams: function (model, params) {
                params = params || {};
                if (model.statusUpdated) {
                    params.method = UserData.actionMethods.UPDATE_VISIBILITY;
                } else if (model.mustAddToPhone) {
                    params.endpointid = AMA.currentEndpoint;
                    params.method = UserData.actionMethods.ADD_TO_DEVICE;
                } else if (model.mustRemoveFromPhone) {
                    params.endpointid = AMA.currentEndpoint;
                    params.method = UserData.actionMethods.REMOVE_FROM_DEVICE;
                } else {
                    params.method = "updateInAccount";
                }
                return params;
            },

            _prepareData : function(data, dataSet) {
                var setData = dataSet;

                var fields = AMA.config.legacyRecordTypes.CONTACT.fields;
                if (data._meta.rt == AMA.config.legacyRecordTypes.PHOTO.id) {
                    fields = AMA.config.legacyRecordTypes.PHOTO.fields;
                } else if (data._meta.rt == AMA.config.legacyRecordTypes.VIDEO.id) {
                    fields = AMA.config.legacyRecordTypes.VIDEO.fields;
                }
                _.each(data, function(value, key) {
                    var legacyField = fields[key];
                    if(typeof legacyField !== "undefined") {
                        var count = legacyField.split("-");
                        if (value !== "") {
                            if(count.length == 2) {
                                setData.dt[legacyField+"-0-0"] = value;
                            } else {
                                setData.dt[legacyField] = value;
                            }
                        }
                    }
                });

                return setData;
            }
        });
    }


	var BaseData = AMA.model && AMA.model.BaseData;
	AMA.assert(BaseData, "LegacyApiSupport requires AMA.model.BaseData class to be defined.");

    var legacyModels = AMA.config && AMA.config.legacyModels;
    if (!legacyModels) return;


	var Endpoints = AMA.model.Endpoints;
	if (Endpoints && _.contains(legacyModels, "Endpoints")) {

        _.extend(Endpoints.prototype, LegacyBaseDataMethods);

		_.extend(Endpoints.prototype, {

			fetch: function() {
				var o = this,
				options = {
						url: AMA.config.legacyApiBaseUrl + "/account.poo?method=retrieveEndpoints&csrfvalue="+AMA.config.csrfToken,
						success: function(resp) {
							o.parse(resp);
						}
				};
				return BaseData.prototype.fetch.call(this, options);
			},

			parse: function(resp) {
				var data = resp[0];

				if (data) {
					var fields = AMA.config.legacyRecordTypes.CONTACT.fields;
					function getFieldName (id) {
						var k;
						for (k in fields) {
							if (id.indexOf(fields[k]) == 0) return k;
						}
						return false;
					}

					var maxchars = {};
					_.each(data.maxchars, function(value, key, obj) {
						var field = getFieldName(key);
						if (field) {
							if (maxchars[field]) {
								if (maxchars[field+"2"]) {
									maxchars[field+"3"] = data.maxchars[key];
								} else {
									maxchars[field+"2"] = data.maxchars[key];
								}

							} else {
								maxchars[field] = data.maxchars[key];
							}
						}
					});
					data.maxchars = maxchars;
				}

				return resp;
			},

			_configureFetchOptions: function (options) {}
		});
	}


	var DashboardData = AMA.model.DashboardData;
	if (DashboardData && _.contains(legacyModels, "DashboardData")) {

        _.extend(DashboardData.prototype, LegacyBaseDataMethods);

		_.extend(DashboardData.prototype, {

			fetch: function() {
				var o = this,
				options = {
						url: AMA.config.legacyApiBaseUrl + "/webapi.poo?method=getAccountInfo&csrfvalue="+AMA.config.csrfToken,
						success: function(resp) {
							o.parse(resp);
						}
				};
				return BaseData.prototype.fetch.call(this, options);
			},

			parse: function(resp) {
				return resp;
			},

			_configureFetchOptions: function (options) {

			}

		});
	}


	var Contacts = AMA.model.Contacts;
	if (Contacts && _.contains(legacyModels, "Contacts")) {

        _.extend(Contacts.prototype, LegacyUserDataMethods);

		_.extend(Contacts.prototype, {

			add: function(model, options) {
				if (model.attributes) {
					var toParse = [ model.attributes[0] ];
					model = this.parse(toParse);
				}
				return BaseData.prototype.add.call(this, model, options);
			},

			create: function (data, options) {
				// this.add(data);
				var o = this,
				urlParams = {
						method : "createInAccount",
						csrfvalue : AMA.config.csrfToken
				},

				defaults = {
						url: this.url+"?"+$.param(urlParams),
						wait: true,
						contentType: "application/json; charset=utf-8",
						dataType: "json",
						emulateHTTP: true
				},

				dataSet = {
						dt: {},
						cp: {},
						rt: 33620224,
						pc: data.pendingCreate ? [AMA.currentEndpoint] : []
				},
				setData = this._prepareData(data, dataSet);
				_.extend(defaults, options);

				return BaseData.prototype.create.call(this, setData, defaults);
			},
			_prepareData : function(data, dataSet, statusUpdated) {
				var setData = dataSet;

				function getFullLegacyField (id, index) {
					if(!data || !data._meta) { return false; }
					for (field in data._meta.dt) {
						if (field.indexOf(id) > -1) {
							index--;
							if (index == 0) {
								return field;
							}
						}
					}
					return false;
				}

				_.each(data, function(value, key) {
					var legacyField = AMA.config.legacyRecordTypes.CONTACT.fields[key];

					var list = {
							cellPhone : 1,
							cellPhone2 : 2,
							cellPhone3 : 3,
							workPhone : 1,
							workPhone2 : 2,
							workPhone3 : 3,
							email : 1,
							email2 : 2,
							email3 : 3,
							im : 1,
							im2 : 2,
							im3 : 3
					};

					if (list[key]) {
						var fullField = getFullLegacyField(legacyField, list[key]);
						if (fullField) {
							legacyField = fullField;
						} else {
							if (setData.dt[legacyField + "-0-0"]) {
								if (setData.dt[legacyField + "-0-1"]) {
									legacyField = legacyField + "-0-2";
								} else {
									legacyField = legacyField + "-0-1";
								}
							} else {
								legacyField = legacyField + "-0-0";
							}
						}
					}

					if(typeof legacyField !== "undefined") {
						var count = legacyField.split("-");
						if (value !== "") {
							if(count.length == 2) {
								setData.dt[legacyField+"-0-0"] = value;
								if (!statusUpdated) {
									if(setData.cp) setData.cp[legacyField+"-0-0"] = {};
									if(setData.se) setData.se[legacyField+"-0-0"] = [0];
								}
							} else {
								setData.dt[legacyField] = value;
								if (!statusUpdated) {
									if(setData.cp) setData.cp[legacyField] = {};
									if(setData.se) setData.se[legacyField] = [0];
								}
							}
						}
					}
				});

				return setData;
			}
		});
		Contacts.LEGACY_RECORD_TYPE = AMA.config.legacyRecordTypes.CONTACT;
	}

	var Photos = AMA.model.Photos;
	if (Photos && _.contains(legacyModels, "Photos")) {
		Photos.LEGACY_RECORD_TYPE = AMA.config.legacyRecordTypes.PHOTO;

        _.extend(Photos.prototype, LegacyUserDataMethods);

		_.extend(Photos.prototype, {

			parse: function (resp) {
				var i, j, obj,
				list = [],
				data = null,
				item = null;

				function getFieldName (data, id) {
					var k;
					for (k in Photos.LEGACY_RECORD_TYPE.fields) {
						if (id == Photos.LEGACY_RECORD_TYPE.fields[k])
							return k;
						else if (data[id].toString().indexOf(Photos.LEGACY_RECORD_TYPE.fields[k]) > -1)
							return k;
					}
					return false;
				}

				for (i = 0; i < resp.length; i++) {
					item = resp[i];

					// Ignore this record if it is not the expected type
					if (item.rt !== this.constructor.LEGACY_RECORD_TYPE.id) continue;

					obj = {};

					// Set the id to the value of "ri"
					if (item.ri) {
						obj.id = item.ri;
					}

					// Get the field values from "dt"
					data = item.dt;
					if (data && typeof data === "object") {
						for (j in data) {
							key = getFieldName(data, j);
							if (key) {
								obj[key] = data[j];
							}
						}
					}

					// Get the meta information from the rest of the record fields
					obj._meta = {};
					for (j in item) {
						if (j === "ri") continue;
						obj._meta[j] = item[j];
					}

					list.push(obj);
				}

				_.each(list, function (item, idx) {
					var conf = AMA.config,
					endpoint = AMA.currentEndpoint;

					item.isCurrent = item._meta[conf.legacyMetaFields.isCurrent];
					item.status = item._meta[conf.legacyMetaFields.visibility];
					item.onPhone = _.contains(item._meta[conf.legacyMetaFields.visible], endpoint);
					item.pendingCreate = _.contains(item._meta[conf.legacyMetaFields.pendingCreate], endpoint);
					item.pendingDelete = _.contains(item._meta[conf.legacyMetaFields.pendingDelete], endpoint);
					item.pendingUpdate = _.contains(item._meta[conf.legacyMetaFields.pendingUpdate], endpoint);
				});

				return list;
			}
		});
	}

	var Videos = AMA.model.Videos;
	if (Videos && _.contains(legacyModels, "Videos")) {
		Videos.LEGACY_RECORD_TYPE = AMA.config.legacyRecordTypes.VIDEO;

        _.extend(Videos.prototype, LegacyUserDataMethods);

		_.extend(Videos.prototype, {

			parse: function (resp) {
				var i, j, obj,
				list = [],
				data = null,
				item = null;

				function getFieldName (data, id) {
					var k;
					for (k in Videos.LEGACY_RECORD_TYPE.fields) {
						if (id == Videos.LEGACY_RECORD_TYPE.fields[k])
							return k;
						else if (data[id].toString().indexOf(Videos.LEGACY_RECORD_TYPE.fields[k]) > -1)
							return k;
					}
					return false;
				}

				for (i = 0; i < resp.length; i++) {
					item = resp[i];

					// Ignore this record if it is not the expected type
					if (item.rt !== this.constructor.LEGACY_RECORD_TYPE.id) continue;

					obj = {};

					// Set the id to the value of "ri"
					if (item.ri) {
						obj.id = item.ri;
					}

					// Get the field values from "dt"
					data = item.dt;
					if (data && typeof data === "object") {
						for (j in data) {
							key = getFieldName(data, j);
							if (key && !obj[key]) {
								obj[key] = data[j];
							}
						}
					}

					// Get the meta information from the rest of the record fields
					obj._meta = {};
					for (j in item) {
						if (j === "ri") continue;
						obj._meta[j] = item[j];
					}

					list.push(obj);
				}

				_.each(list, function (item, idx) {
					var conf = AMA.config,
					endpoint = AMA.currentEndpoint;

					item.isCurrent = item._meta[conf.legacyMetaFields.isCurrent];
					item.status = item._meta[conf.legacyMetaFields.visibility];
					item.onPhone = _.contains(item._meta[conf.legacyMetaFields.visible], endpoint);
					item.pendingCreate = _.contains(item._meta[conf.legacyMetaFields.pendingCreate], endpoint);
					item.pendingDelete = _.contains(item._meta[conf.legacyMetaFields.pendingDelete], endpoint);
					item.pendingUpdate = _.contains(item._meta[conf.legacyMetaFields.pendingUpdate], endpoint);
				});

				return list;
			}
		});
	}


	var Trash = AMA.model.Trash;
	if (Trash && _.contains(legacyModels, "Trash")) {
		Trash.LEGACY_RECORD_TYPE = {};

        _.extend(Trash.prototype, LegacyUserDataMethods);

		_.extend(Trash.prototype, {
			trashedContacts: [],
			trashedPhotos: [],
			trashedVideos: [],
			initialize: function () {
				Trash.__super__.initialize.apply(this, arguments);

				var o = this;
				// Make sure that as soon as the Contacts, Photos and Videos data are fetched,
				// collect the trash from those collections
				if (AMA.models.contacts) {
					AMA.models.contacts.on("reset", function () {
						o._collectContacts.call(o);
					});
					AMA.models.contacts.on("collect", function () {
						o._collectContacts.call(o);
					});
				}
				if (AMA.models.photos) {
					AMA.models.photos.on("reset", function () {
						o._collectPhotos.call(o);
					});
					AMA.models.photos.on("collect", function () {
						o._collectPhotos.call(o);
					});
				}
				if (AMA.models.videos) {
					AMA.models.videos.on("reset", function () {
						o._collectVideos.call(o);
					});
					AMA.models.videos.on("collect", function () {
						o._collectVideos.call(o);
					});
				}
			},

			sync: function (method, collection, options) {
				var contacts = [],
				photos = [],
				videos = [];

				_.each(collection.models, function(model) {
					if (model.constructor === AMA.model.Contacts.MODEL) {
						contacts.push(model);
					} else if (model.constructor === AMA.model.Photos.MODEL) {
						photos.push(model);
					} else if (model.constructor === AMA.model.Videos.MODEL) {
						videos.push(model);
					}
				});

				if (contacts.length > 0) {
					AMA.models.contacts.sync("update", new AMA.model.Contacts(contacts));
				}
				if (photos.length > 0) {
					AMA.models.photos.sync("update", new AMA.model.Photos(photos));
				}
				if (videos.length > 0) {
					AMA.models.videos.sync("update", new AMA.model.Videos(videos));
				}
			},

			fetch: function () {
				if (AMA.models.contacts && !AMA.models.contacts.isLoaded) AMA.models.contacts.fetch();
				if (AMA.models.photos && !AMA.models.photos.isLoaded) AMA.models.photos.fetch();
				if (AMA.models.videos && !AMA.models.videos.isLoaded) AMA.models.videos.fetch();
			},

			_collectContacts: function () {
				this.trashedContacts = [];
				this._collectTrashed(AMA.models.contacts, this.trashedContacts);
				this._checkIfAllTrashCollected();
			},

			_collectPhotos: function () {
				this.trashedPhotos = [];
				this._collectTrashed(AMA.models.photos, this.trashedPhotos);
				this._checkIfAllTrashCollected();
			},

			_collectVideos: function() {
				this.trashedVideos = [];
				this._collectTrashed(AMA.models.videos, this.trashedVideos);
				this._checkIfAllTrashCollected();
			},

			_collectTrashed: function (collection, trashed) {
				var ids = [],
				removed = false,
				models = collection.models;

				_.each(models, function(model, index) {
					if (model.get("status") === AMA.model.UserData.Status.TRASHED) {
						ids.push(model.get("id"));
					} else {
						// if ever we find the model that were now not trashed(probabaly restored), let's remove that model from trash
						if (this.get(model.get("id"))) {
							this.remove(model, {silent: true});
							removed = true;
						}
					}
				}, this);

				if (removed) {
					this.trigger("remove");
				}

				removed = false;

				_.each(ids, function(id, index) {
					var model = collection.get(id);
					if (model) {
						trashed.push(model);
						collection.remove(model, {silent:true});
						removed = true;
					}
				}, this);

				if (removed) {
					collection.trigger("remove");
				}
			},

			_checkIfAllTrashCollected: function () {
				var trashed = this.trashedContacts.concat(this.trashedPhotos).concat(this.trashedVideos);

				//suppress the event triggered
				this.set(trashed, {remove: false, silent: true});
				this.trigger("change");

				var allCollected = AMA.models.contacts.isLoaded && AMA.models.photos.isLoaded &&
				AMA.models.videos.isLoaded;

				if (!allCollected) return;
				this.trigger("reset");
			}

		});

	}

	var SettingsDataParser = function (obj, resp, fields) {
		var i, j, o, key, item, data, list = [];

		function getFieldName (id) {
			var k;
			for (k in fields) {
				if (data[id].indexOf(fields[k]) > -1)
					return k;
			}
			return false;
		}

		for (i = 0; i < resp.length; i++) {
			item = resp[i];

			// Ignore this record if it is not the expected type
			if (item.rt !== obj.constructor.LEGACY_RECORD_TYPE.id) continue;

			o = {};

			// Set the id to the value of "ri"
			if (item.ri) {
				o.id = item.ri;
			}

			// Get the field values from "dt"
			data = item.dt;
			if (data && typeof data === "object") {
				for (j in data) {
					key = getFieldName(j);
					if (key) {
						if (o[key]) {
							if (o[key+"2"]) {
								o[key+"3"] = data[j];
							} else {
								o[key+"2"] = data[j];
							}
						} else {
							o[key] = data[j].substr(data[j].indexOf("=") + 1);
						}
					}
				}
			}

			// Get the meta information from the rest of the record fields
			o._meta = {};
			for (j in item) {
				if (j === "ri") continue;
				o._meta[j] = item[j];
			}

			list.push(o);
		}
		return list;
	};


	var SyncSettings = AMA.model.SyncSettings;
	if (SyncSettings && _.contains(legacyModels, "SyncSettings")) {
		SyncSettings.LEGACY_RECORD_TYPE = AMA.config.legacyRecordTypes.ACCOUNT_SETTINGS;

        _.extend(SyncSettings.prototype, LegacyBaseDataMethods);

		_.extend(SyncSettings.prototype, {

			parse: function (resp) {
				var fields = AMA.config.legacyRecordTypes.ACCOUNT_SETTINGS.syncSettingsFields;

				var list = [];

				var index = 0;
				if(resp.length > 1){
					for(var i = 0; i < resp.length; i++){
						if(resp[i].ic === true){
							index = i;
							AMA.debug("IC - is current, INDEX VALUE: " + index);
						}
					}
				}

				if(resp[index] !== null && resp[index] !== undefined && resp[index] !== ''){
					if(resp[index].ri !== null && resp[index].ri !== undefined && resp[index].ri !== ''){
						list = SettingsDataParser(this, [resp[index]], fields);
					}
				}

				return list;
			},

			sync: function(method, model, options) {
				var defaults = {};

				if(method === "update") {
					var dataSet = [];
					var o = this;

					var prefix = "2U-01";
					var syncSettingsField = {};
					var backupData = [];

					syncSettingsFields = AMA.config.legacyRecordTypes.ACCOUNT_SETTINGS.syncSettingsFields;
					backupData =[
					             syncSettingsFields.autobackup_frequency + "=" + model.get("autobackup_frequency"),
					             syncSettingsFields.autobackup_minimum_battery_level + "=" + model.get("autobackup_minimum_battery_level"),
					             syncSettingsFields.autobackup_pictures + "=" + model.get("autobackup_pictures"),
					             syncSettingsFields.autobackup_videos + "=" + model.get("autobackup_videos"),
					             syncSettingsFields.autobackup_contacts + "=" + model.get("autobackup_contacts"),
					             syncSettingsFields.autobackup_wifi + "=" + model.get("autobackup_wifi"),
					             syncSettingsFields.autobackup_carrier + "=" + model.get("autobackup_carrier"),
					             syncSettingsFields.autobackup_day + "=" + model.get("autobackup_day"),

					             syncSettingsFields.locationcheck_on + "=" + model.get("locationcheck_on"),
					             syncSettingsFields.gps_interval + "=" + model.get("gps_interval"),
					             syncSettingsFields.gps_battery + "=" + model.get("gps_battery")
					             ];

					var dtData = {};

					_.each(backupData, function(value, key){
						dtData[prefix + "-0-" + key] = value;
					});

					var data = {
						dt: dtData,
						vi: 0,
						ri: o.models[0].get("id"),
						io: true,  // this should had been parsed
						rt: AMA.config.legacyRecordTypes.ACCOUNT_SETTINGS.id
					};

					dataSet.push(data);

					var defaults = {
							url: this.url+"?"+$.param(this._getParams(model, {csrfvalue: AMA.config.csrfToken})),
							wait: true,
							cache : false,
							contentType : "application/json; charset=utf-8",
							data: model.statusUpdated ? JSON.stringify(dataSet) : encodeURIComponent(JSON.stringify(dataSet)),
									dataType: "json"
					};

					options = options || {};

					options.success = options.success || function(data, resp, xhr) {
						if (resp != null && !resp.failures)
						{
							var items = o.parse(data);
						}
					};

					options.error = options.error || function(xhr) {
						model.trigger("error", model, xhr, options);
					};

				}

				_.extend(defaults, options);

				return LegacyBaseDataMethods.sync.call(this, method, model, defaults || {});
			},

			_getParams: function (model, params) {
				params = params || {};
				params.method = "updateInAccount";

				return params;
			}

		});
	}


	var DeviceSettings = AMA.model.DeviceSettings;
	if (DeviceSettings && _.contains(legacyModels, "DeviceSettings")) {
		DeviceSettings.LEGACY_RECORD_TYPE = AMA.config.legacyRecordTypes.ACCOUNT_SETTINGS;

        _.extend(DeviceSettings.prototype, LegacyBaseDataMethods);

		_.extend(DeviceSettings.prototype, {
            _configureUrl: function () {
                this.url = AMA.config.legacyApiBaseUrl + "/records.poo?";
            },
			parse: function (resp) {
				var fields = AMA.config.legacyRecordTypes.ACCOUNT_SETTINGS.deviceSettingsFields,
				list = SettingsDataParser(this, resp, fields);

				return list;
			}
		});
	}

	var Locations = AMA.model.Locations;
	if (Locations && _.contains(legacyModels, "Locations")) {
		Locations.LEGACY_RECORD_TYPE = AMA.config.legacyRecordTypes.LOCATIONS;

        _.extend(Locations.prototype, LegacyBaseDataMethods);

		_.extend(Locations.prototype, {

			parse: function (resp) {
				var i, list = [],
				item = null,
				o = null,
				data = null,
				fields = this.constructor.LEGACY_RECORD_TYPE.fields;

				function getFieldName (id) {
					var k;
					for (k in fields) {
						if (id.indexOf(fields[k]) == 0) return k;
					}
					return false;
				}

				for (i = 0; i < resp.length; i++) {
					item = resp[i];

					// Ignore this record if it is not the expected type
					if (item.rt !== this.constructor.LEGACY_RECORD_TYPE.id ||
							(AMA.config.locationConsolidation && (resp.length > 1 && item.ri != -2)) ||
							(!AMA.config.locationConsolidation && (resp.length > 1 && i > 0)))
						continue;

					o = {};

					// Set the id to the value of "ri"
					if (item.ri) {
						o.id = item.ri;
					}

					// Get the field values from "dt"
					data = item.dt;
					if (data && typeof data === "object") {
						for (j in data) {
							var key = getFieldName(j);
							if (key) {
								var chunk = j.split("-");
								var index = parseInt(chunk[3]);
								if (list[index]) {
									list[index][key] = data[j];
								} else {
									list[index] = {};
									list[index].id = index;
									list[index][key] = data[j];
								}
							}
						}
					}
				}
				return list.reverse();
			},

			clearDuplicateLocations: function () {
				var previousLocation;
				//Go through the list of location records and merge records with the same timestamp.
				AMA.debug("clearDuplicateLocations - Locations.models.length: " + this.models.length);
				var toRemove = [];
				for (var i = 0; i < this.models.length; i++) {
					var model = this.models[i];
					var currentLatLong = model.get("coordinates");
					if (previousLocation) {
						var previousLatLong = previousLocation.get("coordinates");
						if(previousLatLong == currentLatLong) {
							AMA.debug("clearDuplicateLocations - previousLatLong == currentLatLong: " + currentLatLong);

							previousLocation.set("timeRange", model.get("time"), {silent: true});
							AMA.debug("clearDuplicateLocations - timeRange: " + previousLocation.get("timeRange"));
							AMA.debug("clearDuplicateLocations - time: " + previousLocation.get("time"));

							var accuracy = model.get("accuracy");
							if(accuracy < previousLocation.get("accuracy")) {
								previousLocation.set("accuracy", accuracy, {silent:true});
							}
							//remove this location model, only use the latest.
							this.remove(model, {silent:true});
							i--;
							continue;
						}
					}
					previousLocation = model;
				}

				if (this.models.length < AMA.config.locationHistoryLimit) {
					this.numberOfPoints = this.models.length;
				} else {
					this.numberOfPoints = AMA.config.locationHistoryLimit;
				}
			},

			removeAll: function () {

			},

			sync: function (method, collection, options) {
				options = options || {};
				var defaults = {};
				if(method === "delete") {
					var params = $.param({
						method: "nuke",
						recordtype: this.constructor.LEGACY_RECORD_TYPE.id,
						csrfvalue: AMA.config.csrfToken
					});
					defaults = {
							url: this.url+"?"+params,
							wait: true,
							cache : false,
							contentType : "application/json; charset=utf-8",
							dataType: "json"
					};

					var o = this;
					options.success = options.success || function(data, resp, xhr) {
						o.reset([]);
					};

					options.error = options.error || function(xhr) {
						o.trigger("error", model, xhr, options);
					};
				}

				_.extend(defaults, options);
				return LegacyBaseDataMethods.sync.call(this, method, collection, defaults || {});
			}
		});
	}

	var EndpointHistory = AMA.model.EndpointHistory;
	if (EndpointHistory && _.contains(legacyModels, "EndpointHistory")) {
		EndpointHistory.LEGACY_RECORD_TYPE = AMA.config.legacyRecordTypes.STATUS;

        _.extend(EndpointHistory.prototype, LegacyBaseDataMethods);

		_.extend(EndpointHistory.prototype, {

			fetch: function() {
				var o = this,
				options = {
						url: AMA.config.legacyApiBaseUrl + "/records.poo?method=retrieveEndpointHistory&endpointid="+AMA.currentEndpoint+"&recordtype="+AMA.config.legacyRecordTypes.STATUS.id+"&max=10&desc=true&csrfvalue="+AMA.config.csrfToken,
						remove: false,
						merge:false,
						// url: AMA.config.legacyApiBaseUrl + "/records.poo?method=retrieveHistoryRecord&endpointid=0&recordtype=41943040&max=5&desc=true&csrfvalue="+AMA.config.csrfToken
						success: function(collection, resp) {
							return o.parse(resp)
						}
				};
				return BaseData.prototype.fetch.call(this, options);
			},

			parse: function(resp) {

				var list = [],
				i, j,
				item = null,
				data = null,
				o = null,
				key = "",
				fields = this.constructor.LEGACY_RECORD_TYPE.fields;

				// Lookup field name based on field ID
				function getFieldName (id) {
					var k;
					for (k in fields) {
						if (id.indexOf(fields[k]) == 0) return k;
					}
					return false;
				}

				for (i = 0; i < resp.length; i++) {
					item = resp[i];

					// Ignore this record if it is not the expected type
					if (item.rt !== this.constructor.LEGACY_RECORD_TYPE.id) continue;

					o = {};

					// Set the id to the value of "ri"
					// Overiding the re
					if (item.ri) {
						o.id = item.ri+""+i;
					}

					// Get the field values from "dt"
					data = item.dt;
					if (data && typeof data === "object") {
						for (j in data) {
							key = getFieldName(j);
							if (key) {
								if (o[key]) {
									if (o[key+"2"]) {
										o[key+"3"] = data[j];
									} else {
										o[key+"2"] = data[j];
									}
								} else {
									o[key] = data[j];
								}
							}
						}
					}

					// Get the meta information from the rest of the record fields
					o._meta = {};
					for (j in item) {
						if (j === "ri") continue;
						o._meta[j] = item[j];
					}

					list.push(o);
				}

				return list;
			},

			_configureFetchOptions: function (options) {}
		});
	}

})();
/*! StorageInfo */
(function () {

    AMA.namespace("model");

    var StorageInfo = AMA.model.StorageInfo = AMA.model.BaseData.extend();

    StorageInfo.RESOURCE = "storageInfo";

    StorageInfo.URL = "/storageInfo?";
    StorageInfo.MODEL = AMA.model.BaseData.MODEL.extend({

    });

    AMA.augment(StorageInfo.prototype, {
        _configureFetchOptions: function (options) {},
        _configureUrl: function () {
            this.url = AMA.config.apiHostUrl + StorageInfo.URL + "devId=" + AMA.config.devId + "&endpointId=" + AMA.config.endpointId + "&authToken=" + AMA.config.authToken;
            //this.url =  this.constructor.URL;
        }

    });

})();
/*! ContactsSummary */
(function () {

    AMA.namespace("model");

    var ContactSummary = AMA.model.ContactSummary = AMA.model.BaseData.extend();


    ContactSummary.RESOURCE = "contacts";

    ContactSummary.MODEL = AMA.model.BaseData.MODEL.extend({

    });

    AMA.augment(ContactSummary.prototype, {
        _configureUrl: function () {
            this.url = AMA.config.apiHostUrl + "/" + ContactSummary.RESOURCE + "?" +
                $.param({
                    devId: AMA.config.devId,
                    endpointId: AMA.config.endpointId,
                    authToken: AMA.config.authToken,
                    status: AMA.model.UserData.Status.ENABLED,
                    limit: 0
                });
        }
    });

})();
/*! PhotoSummary */
(function () {

    AMA.namespace("model");

    var PhotosSummary = AMA.model.PhotosSummary = AMA.model.BaseData.extend();
    PhotosSummary.RESOURCE = "files";
    PhotosSummary.FILETYPE = 'image';

    PhotosSummary.MODEL = AMA.model.BaseData.MODEL.extend({

    });
    /**
     * https://amssb02-api.amafib.com/v1/files?
     *      devId=OZDELSO9JWAOKCY5&
     *      endpointId=4d19fd09-840f-4a1c-b2cf-4d6238fe883b&
     *      fileType=image&
     *      authToken=d8920e33-f789-4a93-8bb4-a0e4db89619e&
     *      status=ACTIVE&
     *      limit=0
     */

    AMA.augment(PhotosSummary.prototype, {

        _configureUrl: function () {
            this.url = AMA.config.apiHostUrl + "/files?" +
                    $.param({
                        devId: AMA.config.devId,
                        endpointId: AMA.config.endpointId,
                        fileType: PhotosSummary.FILETYPE,
                        authToken: AMA.config.authToken,
                        status: AMA.model.UserData.Status.ENABLED,
                        limit: 0
                    });
        }

    });

})();
/*! VideoSummary */
(function () {

    AMA.namespace("model");

    var VideosSummary = AMA.model.VideosSummary = AMA.model.BaseData.extend();

    VideosSummary.RESOURCE = "files";

    VideosSummary.FILETYPE = "video";
    VideosSummary.MODEL = AMA.model.BaseData.MODEL.extend({

    });

    AMA.augment(VideosSummary.prototype, {
        _configureUrl: function () {
            this.url = AMA.config.apiHostUrl + "/files?" +
                $.param({
                    devId: AMA.config.devId,
                    endpointId: AMA.config.endpointId,
                    fileType: VideosSummary.FILETYPE,
                    authToken: AMA.config.authToken,
                    status: AMA.model.UserData.Status.ENABLED,
                    limit: 0
                });
        }
    });

})();
/*! LocateSettings */
(function () {
    
    AMA.namespace("model");
    
    var LocateSettings = AMA.model.LocateSettings = AMA.model.BaseData.extend();
        
    
    LocateSettings.URL = "/eventSettings";
    LocateSettings.RESOURCE = "eventSettings";

    LocateSettings.MODEL = AMA.model.BaseData.MODEL.extend({

    });
    
    AMA.augment(LocateSettings.prototype, {
        _configureUrl: function () {
            this.url = AMA.config.apiHostUrl + LocateSettings.URL + "?devId=" + AMA.config.devId + "&endpointId=" + AMA.config.endpointId + "&authToken=" + AMA.config.authToken;
        }
    });

})();

/*! SyncHistory */
(function () {


    AMA.namespace("model");

    var SyncHistory = AMA.model.SyncHistory = AMA.model.BaseData.extend();


    SyncHistory.URL = "/syncHistory?";
    SyncHistory.RESOURCE = "syncHistory";
    SyncHistory.MODEL = AMA.model.BaseData.MODEL.extend({

    });

    AMA.augment(SyncHistory.prototype, {
        _configureUrl: function () {
            this.url = AMA.config.apiHostUrl + SyncHistory.URL + "devId=" + AMA.config.devId + "&endpointId=" + AMA.config.endpointId + "&authToken=" + AMA.config.authToken;
            //this.url =  this.constructor.URL;
        },

        _configureFetchOptions: function (options) {}

    });

})();
/*! SyncSettings */
(function () {

	AMA.namespace("model");

	/**
	 * Sync Settings
	 *
	 * @class SyncSettings
	 * @namespace model
	 * @extends AMA.model.BaseData
	 * @constructor
	 */
	var SyncSettings = AMA.model.SyncSettings = AMA.model.BaseData.extend();

	SyncSettings.RESOURCE = "mediaSettings";

	/**
	 * API endpoint for this collection
	 *
	 * @property URL
	 * @type string
	 * @static
	 * @final
	 */
	SyncSettings.URL = "/mediaSettings";

	SyncSettings.MODEL = AMA.model.BaseData.MODEL.extend({

	});

	_.extend(SyncSettings.prototype, {

	});

})();

/*! ScanSettings */
(function () {

	AMA.namespace("model");
	
	/**
	 * Scan Settings
	 *
	 * @class ScanSettings
	 * @namespace model
	 * @extends AMA.model.BaseData
	 * @constructor
	 */
	var ScanSettings = AMA.model.ScanSettings = AMA.model.BaseData.extend();

	ScanSettings.RESOURCE = "appSecuritySettings";

	/**
	 * API endpoint for this collection
	 *
	 * @property URL
	 * @type string
	 * @static
	 * @final
	 */
	ScanSettings.URL = "/appSecuritySettings";

	ScanSettings.MODEL = AMA.model.BaseData.MODEL.extend({

	});

	_.extend(ScanSettings.prototype, {

	});

})();

/*! EndpointHistory */
(function () {

    AMA.namespace("model");

    var EndpointHistory = AMA.model.EndpointHistory = AMA.model.BaseData.extend();

    EndpointHistory.RESOURCE = "eventActionHistory";

    EndpointHistory.MODEL = AMA.model.BaseData.MODEL.extend({

    });


    EndpointHistory.MAX_ITEMS = 10;

    EndpointHistory.INCLUDED_ACTIONS = [
        "sync", "gpsrefresh", "wipe", "wipefactory", "lock", "soundalert", "announce", "security", "startScan", "scanHealthStart", "GPS_BATTERY", "GPS_INTERVAL", "LOCATIONCHECK_ON"
    ];


    AMA.augment(EndpointHistory.prototype, {
        _configureUrl: function () {
            EndpointHistory.__super__._configureUrl.apply(this, arguments);

            this.url += "&limit=" + EndpointHistory.MAX_ITEMS;

        },
        parse: function(resp) {
            var items = EndpointHistory.__super__.parse.apply(this, arguments),
                data = [];
            if(items.length) {
                _.each(items, function(item) {
                    // Filter items to be included in the list
                    // TODO: Fetch more items if due to filtering we haven't used up max items
//                    if (_.contains(EndpointHistory.INCLUDED_ACTIONS, item.actionType) /* &&
//                        _.contains(["success", "failure"], item.status) */) {
                        data.push(item)
  //                  }
                });
            }
            return data;
        }
    });

})();
/*! DashboardSupportView */
(function () {

    AMA.namespace("view");

    var DashboardSupportView = AMA.view.DashboardSupportView = AMA.view.BaseView.extend();
	
    DashboardSupportView.TEMPLATE_ID = "dashboard_support_template";
    DashboardSupportView.TEMPLATE_SRC = "";


    _.extend(DashboardSupportView.prototype, {
		events: {
			"click .btn.scan_phone" : "_onClickScanPhone"
		},
		
		_onClickScanPhone: function() {
			window.location.hash  = "#home/support";
		}
		
    });
})();


/*! Dashboard */
(function () {

    AMA.namespace("view");

    var DashboardTab = AMA.view.DashboardTab = AMA.view.BaseView.extend();

    DashboardTab.TEMPLATE_ID = "dashboard_tab_template";
    DashboardTab.TEMPLATE_SRC = "dashboard.tpl";
    DashboardTab.TOOLBAR = {
        DEFAULT : [
            "endpoint",
            "accountStatus"
        ]
    };

    _.extend(DashboardTab.prototype, {

        initialize: function () {
            DashboardTab.__super__.initialize.apply(this, arguments);

            // Reporting: Logging page visited event as soon as the user logs in and lands on dashboard.
			var eventMsg={};
			eventMsg['pagevisited'] = "Dashboard";
			AMA.ReportingManager.reportPageVisited(eventMsg, false);
        },


        render: function () {

            if(this.isRendered) return;

            DashboardTab.__super__.render.apply(this);

            if (AMA.models.capabilities.canRead("storageInfo")) {
	            this.dashboardData = new AMA.view.DashboardData({
	                parent: this,
	                el: "#dashboard_backup",
	                //noAutoRefresh: true,
	                data:  AMA.models.storageInfo
	            });
	            $("#dashboard_backup").removeClass("hide");
	        }
	        else {
	        	$("#dashboard_backup").addClass("hide");
	        }

            if (AMA.models.capabilities.canRead("locationHistory")) {
	            this.dashboardLocation = new AMA.view.DashboardLocation({
	                parent: this,
	                el: "#dashboard_location",
	                noAutoRefresh: true,
	                data: AMA.models.locations
	            });
	            $("#dashboard_location").removeClass("hide");
	        }
	        else {
	        	$("#dashboard_location").addClass("hide");
	        }

            if (AMA.models.capabilities.canRead("appSecuritySettings")) {
				this.dashboardSecuritySettings = new AMA.view.DashboardSecuritySettings({
					parent: this,
					el: "#dashboard_security_settings",
					data: AMA.models.scansettings
				});
	            $("#dashboard_security_settings").removeClass("hide");
	        }
	        else {
	        	$("#dashboard_security_settings").addClass("hide");
	        }

            if (AMA.models.capabilities.canRead("appVulnerabilityScanResults")) {
				this.dashboardSecurity = new AMA.view.DashboardSecurity({
					parent: this,
					el: "#dashboard_security .panel_left",
					data: AMA.models.threats
				});
	            $("#dashboard_security").removeClass("hide");
	        }
	        else {
	        	$("#dashboard_security").addClass("hide");
	        }

            if (AMA.models.capabilities.canRead("apphealthscanresults_id_resources")) {
				this.dashboardSupport = new AMA.view.DashboardSupportView({
					parent: this,
					el: "#dashboard_support"
				});
	            $("#dashboard_support").removeClass("hide");
	        }
	        else {
	        	$("#dashboard_support").addClass("hide");
	        }
        }

    });

})();


/*! DashboardLocation */
(function () {

    AMA.namespace("view");

    var DashboardLocation = AMA.view.DashboardLocation = AMA.view.BaseView.extend();

    DashboardLocation.TEMPLATE_ID = "dashboard_location_template";
    DashboardLocation.TEMPLATE_SRC = "";

    _.extend(DashboardLocation.prototype, {

        initialize: function() {
            DashboardLocation.__super__.initialize.apply(this, arguments);

            this.data.on("reset", function() {
                if (AMA.ActionManager.getWorkflow("locate")._state === AMA.workflow.LocateWorkflow.STATE.REFINING ||
                    AMA.ActionManager.getWorkflow("locate")._state ===  AMA.workflow.LocateWorkflow.STATE.CONNECTING) {
                    return;
                }
                this.populateAddress(this.data.toJSON()[0]);
            }, this);

            this.$el.addClass("dashboard_panel_loading");

            var ActionManager = AMA.ActionManager,
                BaseWorkflow = AMA.workflow.BaseWorkflow,
                LocateWorkflow = AMA.workflow.LocateWorkflow,
                locateWorkflow = ActionManager.getWorkflow("locate");

            // subscribe to locate workflow
            var o = this;
            locateWorkflow.on(BaseWorkflow.EVENT.STATE_CHANGED, function (event) {
                switch (event.state) {
                    case BaseWorkflow.STATE.INITIALIZING:
                    case LocateWorkflow.STATE.CONNECTING:
                    case LocateWorkflow.STATE.REFINING:
                        o.$el.find('#dashboard_btn_locate').addClass('hidden');
                        o.$el.find('#dashboard_btn_locating').removeClass('hidden');
                        break;
                    case BaseWorkflow.STATE.FINALIZING:
                    case LocateWorkflow.STATE.CANCELLED:
                        o.$el.find('#dashboard_btn_locate').removeClass('hidden');
                        o.$el.find('#dashboard_btn_locating').addClass('hidden');
                        break;
                    default:
                }
            }, this);
        },


        populateAddress: function(data) {
            if(!data) {
                this.$el.find("#no_stored_location_info").removeClass("hidden");
                this.$el.find("#location_status_info").addClass("hidden");
                this.$el.find(".dashboard_locate_time").html("");
                this.$el.find(".dashboard_address").text("");
                this.$el.find(".dashboard_accuracy .accuracy_val").text("");
                return false;
            }

            var location = data;
            location.time = AMA.Util.locationFormat(data.eventTime, data.eventTimeTo).split("-").join("<br/>");
            if (!location.address) {
                var geocodeRequest = "https://dev.virtualearth.net/REST/v1/Locations/" + location.coordinates;

                var params = {
                    output: "json",
                    key: AMA.config.getBingMapsKey()
                };

                var o = this;
                var afterRetrieveAddress = function(index, response, status, xhr) {
                    // var model = this.data.models[index];
                    if (response &&
                            response.resourceSets &&
                            response.resourceSets.length > 0 &&
                            response.resourceSets[0].resources &&
                            response.resourceSets[0].resources.length > 0) {
                        var address = o._getAddress(response.resourceSets[0].resources[0]);
                        o.$el.find(".dashboard_locate_time").html(location.time);
                        o.$el.find(".dashboard_address").text(address);
                        o.$el.find(".dashboard_accuracy .accuracy_val").text(location.accuracy);
                        o.$el.find("#no_stored_location_info").addClass("hidden");
                        o.$el.find("#location_status_info").removeClass("hidden");
                    } else {
						AMA.debug("Bing was unable to find an address for location: " + location.coordinates);
						AMA.ReportingManager.remoteLog("Bing was unable to find an address for location: " + location.coordinates,
							AMA.config.JsonConstants.LOGLEVEL_STATES.AUDIT);
					}
                };
                $.getJSON(geocodeRequest + "?jsonp=?", params, _.bind(afterRetrieveAddress, this, 0));
            }
        },


        refresh: function () {
            if(AMA.ActionManager.getWorkflow("locate")._state === AMA.workflow.LocateWorkflow.STATE.REFINING ||
                AMA.ActionManager.getWorkflow("locate")._state ===  AMA.workflow.LocateWorkflow.STATE.CONNECTING) return;
            setTimeout(DashboardLocation.__super__.refresh.apply(this), 3000);

        },


        _processData: function(item) {
            var data;
            if(item.time) {
                data = {
                    time: AMA.Util.formatDateAndTime(item.time) || "",
                    address:item.address || "",
                    accuracy: item.accuracy || "" ,
                    hasStatus: "",
                    hasNoStatus: "hidden"
                }
            } else {
                data = {
                    time: "",
                    address: "",
                    accuracy: "",
                    hasStatus: "hidden",
                    hasNoStatus: ""
                }
            }
            // this.populateAddress(item);
            return data;
        },


        render: function() {
            DashboardLocation.__super__.render.apply(this);

            this.locationMap = new AMA.view.LocationMapView({
                el: "#dashboard_map",
                parent: this,
                viewOnly: true,
                mapWidth:250,
                mapHeight:210,
                dataClass: AMA.model.Locations
            });
            this.locationMap.setData(AMA.models.locations);

        },


        _setupEvents: function() {
            this.$el.find(".btn_locate").on("click", function() {
                window.location.hash = "home/location";
                AMA.ActionManager.start("locate");
            });
            if(this.locationMap) {
                this.locationMap.on(AMA.view.LocationMapView.EVENT.MAP_INITIALIZED, function() {
                    this.$el.find("#bing_map").css({
                        width:250,
                        height:210
                    });
                    this.locationMap.show();
                }, this);
            }
        },


        _getAddress: function(bingResponse) {
            var address = "";
            address += bingResponse.address.locality != null ?  bingResponse.address.locality : "";
            address += bingResponse.address.adminDistrict != null ? (address != "" ? ", " : "") + bingResponse.address.adminDistrict + " ": "";
            address += bingResponse.address.postalCode != null ? (address != "" ? " " : "") + bingResponse.address.postalCode : "";

            AMA.debug("getAddress: " + address );
            return address;
        },


        _afterRender: function() {
            this.$el.removeClass("dashboard_panel_loading");
            this.$el.find("#bing_map_dialog").remove();
        }

    });


})();


/*! DashboardData */
(function () {

    AMA.namespace("view");

    var DashboardData = AMA.view.DashboardData = AMA.view.BaseView.extend();

    DashboardData.TEMPLATE_ID = "dashboard_backup_template";
    DashboardData.TEMPLATE_SRC = "";

    DashboardData.EVENT = AMA.enums(
        "EXTRA_DATA_LOADED",
        "NEW_SYNC_DETAILS"
    );

    DashboardData.CSS = {
        CONTACTS_COUNT: "dashboard_onweb_count",
        PHOTOS_COUNT: "dashboard_imagesonweb_count",
        VIDEOS_COUNT: "dashboard_videosonweb_count",
        SYNC_CONTACTS: "btn_sync"
    };

    _.extend(DashboardData.prototype, {

        initialize: function () {
            DashboardData.__super__.initialize.apply(this, arguments);

            this.$el.addClass("dashboard_panel_loading");

            AMA.models.syncHistory.on("reset", function() {
                this.trigger(DashboardData.EVENT.NEW_SYNC_DETAILS, {"type": "newSyncDeatils"});
            },  this);

            AMA.models.contactSummary.on("reset", function() {
                this.trigger(DashboardData.EVENT.EXTRA_DATA_LOADED, {"type": "contactSummary"});
            }, this);

            AMA.models.videosSummary.on("reset", function() {
                this.trigger(DashboardData.EVENT.EXTRA_DATA_LOADED, {"type": "videosSummary"});
            },  this);

            AMA.models.photosSummary.on("reset", function() {
                this.trigger(DashboardData.EVENT.EXTRA_DATA_LOADED, {"type": "photosSummary"});
            }, this);

        },


        loadExtraData: function(type) {
            var o = this;
            AMA.models[type].fetch();
        },


        _processData: function(item) {
            var data = item || {};

            data.storageLimit = parseInt(item.totalCapacity || 2147483648);
            data.ImageSize = parseInt(item.photosUsedCapacity || 0);
            data.VideoSize = parseInt(item.videosUsedCapacity || 0);
            data.TrashSize = parseInt(item.trashUsedCapacity || 0);

            data.ImageUse = (data.ImageSize * 100) / data.storageLimit;
            data.VideoUse = (data.VideoSize * 100) / data.storageLimit;
            data.TrashUse = (data.TrashSize * 100) / data.storageLimit;

            data.totalUsed = data.ImageSize + data.VideoSize + data.TrashSize;

            return data;
        },


        _setupEvents: function() {
            var o = this;
            this.on(DashboardData.EVENT.NEW_SYNC_DETAILS, function() {
                var syncHistory = AMA.models.syncHistory.toJSON();
				// get the last item, not the first
				var data = syncHistory[syncHistory.length - 1] || {};
                if(typeof data === "object" && data.eventTime) {
                    var totalContactsSynced =  data.webContactCreate + data.webContactUpdate + data.webContactDelete 
							+ data.deviceContactCreate + data.deviceContactUpdate + data.deviceContactDelete;
					var totalVideosSynced = data.deviceVideosDelete + data.deviceTransmitVideos + data.deviceVideosCreate;
                    var totalPhotosSynced = data.devicePhotosDelete + data.deviceTransmitImages + data.devicePhotosCreate;

                    o.$el.find("." + DashboardData.CSS.CONTACTS_COUNT).text(totalContactsSynced);
                    o.$el.find("." + DashboardData.CSS.VIDEOS_COUNT).text(totalVideosSynced);
                    o.$el.find("." + DashboardData.CSS.PHOTOS_COUNT).text(totalPhotosSynced);
					
					o.$el.find('.dashboard_sync_date.hasSynced').html(AMA.Util.formatDateAndTime(data.eventTime));
					AMA.Util.switchLabel(".dashboard_sync_date", ".hasSynced", this.$el);
                    
                    o.$el.find('.dashboard_sync_msg.hasSynced').html(data.statusDetails);
                    AMA.Util.switchLabel(".dashboard_sync_msg", ".hasSynced", this.$el);
					
					o.$el.find('.dashboard_sync_msg').removeClass("hidden").siblings('.sync_status_message').addClass("hidden");

                } else {

                    o.$el.find("." + DashboardData.CSS.CONTACTS_COUNT).text(0);
                    o.$el.find("." + DashboardData.CSS.VIDEOS_COUNT).text(0);
                    o.$el.find("." + DashboardData.CSS.PHOTOS_COUNT).text(0);
                    // o.$el.find('.dashboard_sync_date').html("Never");
                    // o.$el.find('.dashboard_sync_msg').html("No last Sync Details.");
					AMA.Util.switchLabel(".dashboard_sync_date", ".neverSynced", this.$el);
					AMA.Util.switchLabel(".dashboard_sync_msg", ".hasSynced", this.$el);
                    
					o.$el.find('.dashboard_sync_msg').removeClass("hidden").siblings('.sync_status_message').addClass("hidden");
                    o.$el.find('.backup_summary').removeClass("loading").find("li").show();

                }
				
                if(data.statusDetails) {
                    if(this.checkStatusDetails(data.statusDetails) !== 'NOT_MAPPED') {
                        o.$el.find('.' + this.checkStatusDetails(data.statusDetails) ).removeClass("hidden").siblings('.sync_status_message').addClass("hidden");
                        o.$el.find('.backup_summary').removeClass("loading").find("li").hide();
                    }
                } else {
                    o.$el.find('.dashboard_sync_msg').removeClass("hidden").siblings('.sync_status_message').addClass("hidden");
                }
                if(this.checkStatusDetails(data.statusDetails) === 'NOT_MAPPED') {
                    o.$el.find('.backup_summary').removeClass("loading").find("li").show();
                }
            }, this);
            this.$el.find("." + DashboardData.CSS.SYNC_CONTACTS).on("click", function() {
                window.location.hash = "home/data";
                Backbone.globalEvent.trigger("showSyncDialog",{type:"Dashboard"});
            });
            this.$el.find(".viewdetails").on("click", function() {
                window.location.hash = "home/data";
            })

        },


        checkStatusDetails: function(stat) {
            if(!stat) return;
            if(stat.indexOf("USER_STOPPED") !== -1) {
                return "USER_STOPPED";
            } else if(stat.indexOf("AIRPLANE_MODE") !== -1) {
                return "AIRPLANE_MODE";
            } else if(stat.indexOf("FILE_NOT_FOUND") !== -1) {
                return "FILE_NOT_FOUND";
            } else if(stat.indexOf("LOW_BATTERY") !== -1) {
                return "LOW_BATTERY";
            } else if(stat.indexOf("NETWORK_ERROR") !== -1) {
                return "NETWORK_ERROR";
            } else if(stat.indexOf("NETWORK_ROAMING_DETECTED") !== -1) {
                return "NETWORK_ROAMING_DETECTED";
            } else if(stat.indexOf("NETWORK_SETTINGS_CONFLICT") !== -1) {
                return "NETWORK_SETTINGS_CONFLICT";
            } else if(stat.indexOf("PHONE_STORAGE_EXCEEDED") !== -1) {
                return "PHONE_STORAGE_EXCEEDED";
            } else if(stat.indexOf("SD_UNAVAILABLE") !== -1) {
                return "SD_UNAVAILABLE";
            } else if(stat.indexOf("SYNC_FAILED") !== -1) {
                return "SYNC_FAILED";
            } else if(stat.indexOf("SYSTEM_UNAVAILABLE") !== -1) {
                return "SYSTEM_UNAVAILABLE";
            } else if(stat.indexOf("TIME_CONSUMING") !== -1) {
                return "TIME_CONSUMING";
            } else if(stat.indexOf("WEB_STORAGE_EXCEEDED") !== -1) {
                return "WEB_STORAGE_EXCEEDED";
            } else if(stat.indexOf("APPLICATION_RESET") !== -1) {
                return "APPLICATION_RESET";
            } else if(stat.indexOf("USER_STOPPED_NETWORK_ERROR") !== -1) {
                return "USER_STOPPED_NETWORK_ERROR";
            }
            return "NOT_MAPPED";

        },


        render: function () {
            DashboardData.__super__.render.apply(this);
            //if (AMA.models.contactSummary && !AMA.models.contactSummary.isLoaded)
            try {
                AMA.models.syncHistory.fetch();
            } catch (e) {
                AMA.debug("can't fetch sync?")
            } finally {

            }
        },


        _afterRender: function() {
           this.$el.removeClass("dashboard_panel_loading")
               .find('.backup_summary')
                   .addClass("loading")
               .find("li").hide();
            if(AMA.models.endpoints.models[0].get("platform").indexOf("iPhone") > -1) {
                this.$el.find(".btn_sync").hide();
            }
        }
    });


})();


/*! DashboardSecurity */
(function () {

    AMA.namespace("view");

    var DashboardSecurity = AMA.view.DashboardSecurity = AMA.view.BaseView.extend();
	
    DashboardSecurity.TEMPLATE_ID = "dashboard_security_template";
    DashboardSecurity.TEMPLATE_SRC = "";


    _.extend(DashboardSecurity.prototype, {
		events: {
			"click .btn.view_details" : "_onClickViewDetails"
		},
		
		initialize: function() {
			DashboardSecurity.__super__.initialize.apply(this, arguments);
			
			// FIX ME: Do proper solution on next iteration.
			// workaround for device-invoked scan auto-refresh, there's no dirty bit being returned
			if (!AMA.view.ThreatProtectionView.POLLER) {
				AMA.view.ThreatProtectionView.POLLER = setInterval(function() { AMA.models.threats.invalidate(); }, 30000); 
			}
		},


		_processData: function (item, index) {
			var attr = this.data.attributes;
			
			item.fileScanTotal = attr.fileScanTotal;
			item.appScanTotal = attr.appScanTotal;			
			item.fileInfectedTotal = attr.fileInfectedTotal + attr.appInfectedTotal;
			
			item.filePlurality = attr.fileScanTotal == 1 ? "" : "s";
			item.appPlurality = attr.appScanTotal == 1 ? "" : "s";
			item.threatPlurality = attr.fileInfectedTotal == 1 ? "" : "s";
			
			item.lastScanDate = attr.eventTime ? 
				AMA.Util.formatDateAndTime(new Date(attr.eventTime), AMA.config.dateAndTimeFormat)
				: "Never";
			
			return item;
		},
		
		_onClickViewDetails: function() {
			window.location.hash  = "#home/security";
		}
		
    });
})();


/*! DashboardSecuritySettings */
(function () {

    AMA.namespace("view");

    var DashboardSecuritySettings = AMA.view.DashboardSecuritySettings = AMA.view.BaseView.extend();
	
    DashboardSecuritySettings.TEMPLATE_ID = "dashboard_security_settings_template";
    DashboardSecuritySettings.TEMPLATE_SRC = "";
	
	DashboardSecuritySettings.URL = "/appSecuritySettings";
	

    _.extend(DashboardSecuritySettings.prototype, {

        events: {
			"change .autoThreatScanFrequency" : "_settingOnChange",
			"click .btn_white" : "_saveSecuritySettings",
        	"click #edit_security_settings": "editSecuritySettings"
		},


        editSecuritySettings: function(){
            AMA.page.openSettings("security");
        },


        render: function() {
			var data = (this.data && this.data.length > 0) ? this.data.toJSON()[0] : {},
				content = "";

			var item = this._processData(data);
			content = _.template(this.template, item);
			
			this.$el.html(content);
			this._assignInitialValues(item);
		},
		

        _processData: function (item, index) {
			this.settings = item;
			
			var oSet = this.originalSettings = {};
			oSet.autoThreatScanFrequency =  item.autoThreatScanFrequency ? item.autoThreatScanFrequency.toUpperCase() : "NEVER";
			oSet.dayOfWeek = oSet.autoThreatScanFrequency == "WEEKLY" ? item.dayOfWeek.toUpperCase() : "";
			oSet.timeOfDay = oSet.autoThreatScanFrequency == "NEVER" ? "" : item.timeOfDay.toUpperCase();

			return oSet;
		},
		

        _assignInitialValues: function(item) {
			var $el = this.$el;
			var dropdowns = $el.find("select");
			
			_.each(dropdowns, function(el, index) {
				var $dropdown = $el.find("select." + el.className);
				
				if(!item[el.name]) {
					$dropdown.attr("disabled", "disabled");
				}
				
				$dropdown.find("option[value=" + item[el.name] + "]")
						.attr("selected", "selected");
			});
		},
		

        _settingOnChange: function(event) {
			var newVal = $(event.currentTarget).val();
			var $el = this.$el;
			
			$el.find(".dayOfWeek, .timeOfDay")
				.removeAttr("disabled");
				
			switch(newVal) {
				case "WEEKLY" :
					break;
				case "DAILY" :
					$el.find(".dayOfWeek").attr("disabled", "disabled");
					break;
				case "NEVER" :
				default : 
					$el.find(".dayOfWeek, .timeOfDay").attr("disabled", "disabled");
			}			
		},
		

        _saveSecuritySettings: function(event) {
			var $currTarget = this.$el.find(".btn_white");
			
			var dropdowns = this.$el.find("select");
			var newSettings = this.settings ? this.settings : {};

			_.each(dropdowns, function(el, index) {
				newSettings[el.name] = el.disabled ? "" : el.value;
			});

			if( (newSettings.autoThreatScanFrequency === this.originalSettings.autoThreatScanFrequency) &&
				(newSettings.dayOfWeek === this.originalSettings.dayOfWeek) &&
				(newSettings.timeOfDay === this.originalSettings.timeOfDay) ) {				
				AMA.Util.switchLabel(".after_save_message", ".no_changes", this.$el);
			}
			else {
				
				var options = {
					url: AMA.config.apiHostUrl + this.constructor.URL + "?devId=" + AMA.config.devId + "&endpointId=" + AMA.config.endpointId + "&authToken=" + AMA.config.authToken,
					beforeSend: function() {
						o.$el.find(".btn_white").hide()
							.next(".loader").show();
					},
					error: _.bind(this._onAjaxError, this),
					success: function() {
						//o.$el.find(".after_save_message").text("Successfully saved changes.");
						AMA.Util.switchLabel(".after_save_message", ".success", o.$el);
						
						o.$el.find(".btn_white").show()
							.next(".loader").hide();
					}
				}, 
				o = this;				
				
				var weeklyValidate = newSettings.autoThreatScanFrequency == "WEEKLY" && (!newSettings.dayOfWeek || !newSettings.timeOfDay);
				var dailyValidate = newSettings.autoThreatScanFrequency == "DAILY" && !newSettings.timeOfDay;
				
				if(weeklyValidate || dailyValidate) {
					AMA.Util.switchLabel(".after_save_message", ".blank_field", this.$el);
				}
				else {
					this.data.models[0].set(newSettings);
					AMA.debug("Security Settings sync data:"+JSON.stringify(this.data.models[0])); 
					
					this.data.sync("update", this.data.models[0], options);
				}
			}
		},
		

        _onAjaxError: function (jqXHR, error, errorThrown) {
			AMA.ActionManager._onAjaxError(jqXHR, error, errorThrown);
		}
    });
})();
/*! DownloadAppTab */
(function () {

    AMA.namespace("view");

    var DataTab = AMA.view.DownloadAppTab = AMA.view.BaseView.extend();

    DataTab.TEMPLATE_ID = "download_app_template";
    DataTab.TEMPLATE_SRC = "get_started.tpl";

    // Define toolsets that will appear in the data tab toolbar
    DataTab.TOOLBAR = {
        DEFAULT : [],
        IPHONE: []
    };


    _.extend(DataTab.prototype, {
    	_afterRender: function () {
    		$("#download_tab").addClass("selected");
    		$("#page_panes").css({
    			"border":0
    		});
    	}
    });
})();
/*! SettingsView */
(function () {

	AMA.namespace("view");

	var Settings = AMA.view.Settings = AMA.view.BaseView.extend();

	Settings.TEMPLATE_ID = "settings_template";
	Settings.TEMPLATE_SRC = "settings.tpl";
    

	AMA.augment(Settings.prototype, {
		initialize: function () {
			Settings.__super__.initialize.apply(this, arguments);
			
			this.events = Settings.EVENT;
		},
		
		render: function () {
			Settings.__super__.render.apply(this, arguments);
			var willShowBackupSettings = false,
			isAndroid = AMA.Util.isAndroid();	
			
			/*
			 * Android DP2.4 accounts should not display the Backup Settings tab.
			 * However, iPhone 2.3 accounts should still show the Backup Settings (read-only items) tab 
			 */
			
			if ((isAndroid && AMA.models.capabilities.canUpdate("mediaSettings")) || 
					(!isAndroid && AMA.models.capabilities.canRead("mediaSettings"))) {
				willShowBackupSettings = true;
			}
			
			// Create the Settings dialog
			this.settingsDialog = new AMA.view.SettingsDialog({
				el: "#settings_dialog",
				parent: this,
				settingsIntro: false,
				backupSettings: willShowBackupSettings,
				locationSettings: AMA.models.capabilities.canRead("eventSettings"),
				profileSettings: true,
				securitySettings: AMA.models.capabilities.canRead("appSecuritySettings"),
				safeBrowsingSettings: AMA.models.capabilities.canRead("browserSecuritySettings")
			})
			.plug(AMA.view.plugin.Switcher);
		},
		
		_setupEvents: function () {
		    this.$el.find(".settings_nav_button").on("click", function () {
		        $(this).find("a").get(0).click();
		    });
		    var o=this;
            this.$el.find("#myTabDrop1").dropdown();            
		},
		
		show: function (tab, prevURL) {
			if (prevURL) {
				this.settingsDialog._config.prevURL = prevURL;
			}
			if (!this.settingsDialog.isRendered) {
			    var o = this;
			    this.settingsDialog.on(AMA.view.BaseView.EVENT.RENDERED, function () {
			        o.openSettingsDialog(tab);
			    });
                return;
            }
            this.openSettingsDialog(tab);
		},
		
		openSettingsDialog: function (tab) {
            if(!this.settingsDialog.$el.is(":visible")) {
                $("#account_settings_link").toggleClass("active");
                AMA.page.content.$el.toggleClass("hidden");
                this.settingsDialog.show();
            }
		    this.settingsDialog.options.defaultTab = tab;
            this.$el.find(".nav-tabs li").removeClass("active");
            switch (tab) {
                case 'backup' :
                    if (this.settingsDialog.backupSettings) {
                        this.$el.find(".nav-tabs .settings_nav_button_backup").parent().addClass("active");
                        this.settingsDialog.switchTo(this.settingsDialog.backupSettings);
                    }
                    break;
                case 'location' :
                    if (this.settingsDialog.locationSettings) {
                        this.$el.find(".nav-tabs .settings_nav_button_location").parent().addClass("active");
                        this.settingsDialog.switchTo(this.settingsDialog.locationSettings);
                    }
                    break;
                case 'security' :
                    if (this.settingsDialog.securitySettings) {
                        this.$el.find(".nav-tabs .settings_nav_button_security").parent().addClass("active");
                        this.settingsDialog.switchTo(this.settingsDialog.securitySettings);
                    }
                    break;
                default :
                    if (this.settingsDialog.profileSettings) {
                        this.$el.find(".nav-tabs .settings_nav_button_profile").parent().addClass("active");
                        this.settingsDialog.switchTo(this.settingsDialog.profileSettings);
                    } 
                    break;
            }
		}
	});
})();
/*! SettingsDialogView */
(function () {

    AMA.namespace("view");

    var SettingsDialog = AMA.view.SettingsDialog = AMA.view.BaseView.extend();

    SettingsDialog.TEMPLATE_ID = "";
    SettingsDialog.TEMPLATE_SRC = "";


    AMA.augment(SettingsDialog.prototype, {
        initialize: function () {
            SettingsDialog.__super__.initialize.apply(this, arguments);

            this.prevHash = "";
        },

        render: function () {
            var navButtonsShown = 0;
            this.$el.find(".settings_nav_button").hide();
            // Create the different Settings views

            // Settings Intro
            if (this.options.settingsIntro) {
                this.$el.find("#settings_submit").hide();
                this.settingsIntro = new AMA.view.SettingsIntroView({
                    el: "#settings_intro_tab",
                    parent: this
                });
            }
            else {
                // Profile Settings
                if (this.options.profileSettings) {
                    this.$el.find(".settings_nav_button_profile").parent().show();
                    navButtonsShown++;
                    this.profileSettings = new AMA.view.ProfileSettingsView({
                        el: "#profile_settings_tab",
                        data: AMA.models.dashboardData,
                        parent: this
                    });
                }
                // Backup Settings
                if (this.options.backupSettings) {
                    this.$el.find(".settings_nav_button_backup").parent().show();
                    navButtonsShown++;
                    this.backupSettings = new AMA.view.BackupSettingsView({
                        el: "#backup_settings_tab",
                        data: AMA.models.syncsettings,
                        parent: this
                    });
                }

                // Locate Settings
                if (this.options.locationSettings) {
                    this.$el.find(".settings_nav_button_location").parent().show();
                    navButtonsShown++;
                    this.locationSettings = new AMA.view.LocationSettingsView({
                        el: "#location_settings_tab",
                        data: AMA.models.locatesettings,
                        parent: this
                    });
                }

                // Security Settings
                if (this.options.securitySettings) {
                    this.$el.find(".settings_nav_button_security").parent().show();
                    navButtonsShown++;
                    this.securitySettings = new AMA.view.SecuritySettingsView({
                        el: "#security_settings_tab",
                        data: AMA.models.scansettings,
                        parent: this
                    });
                }

               /* // Safe Browsing Settings
                if (this.options.safeBrowsingSettings) {
                    this.$el.find(".settings_nav .settings_nav_button_security").show();
                    navButtonsShown++;
                    this.safeBrowsingSettings = new AMA.view.SafeBrowsingView({
                        el: "#safebrowsingpane",
                        data: AMA.model.SafeBrowsing,
                        parent: this
                    });
                }*/
            }

            if (navButtonsShown == 1) {
                // Hide Settings navigation bar if there is only one settings view available
                this.$el.find(".settings_nav").hide();
            }
//            else {
//                // Subtract 0.22% for border allowance
//                var ratio = 100 / navButtonsShown - 0.22,
//                        width = ratio.toString() + "%";
//                this.$el.find(".settings_nav_button").css("width", width);
//            }
        },

        hide: function () {
            SettingsDialog.__super__.hide.apply(this, arguments);
            $("#account_settings_link").toggleClass("active");
            AMA.page.content.$el.toggleClass("hidden");

            // $(".ui-dialog-content").dialog("close");
            this.hideElements();
            this.updateValues();
        },
        show: function () {
            SettingsDialog.__super__.show.apply(this, arguments);
        },

        updateValues: function() {
            // invalidate all models to update all values
            if (this.options.profileSettings) {
                AMA.models.dashboardData.invalidate();
            }

            if (this.options.backupSettings) {
                AMA.models.syncsettings.invalidate();
            }

            if (this.options.locationSettings) {
                AMA.models.locatesettings.invalidate();
            }

            if (this.options.securitySettings) {
                AMA.models.scansettings.invalidate();
            }
        },

        _setupEvents: function () {
            //var o = this;
            //this.$el.find(".close").on("click", o.hide);
        },

        hideElements: function () {
            // Hide spinners and any after save messages
            this.$el.find(".settings .connecting").hide();
            this.$el.find(".settings .after_save_message").html("");
            this.$el.find(".settings_intro .intro_after_save_message").html("");
        },
        events: {
            "click li>.settings_nav_button_location": "openLocationsTab",
            "click li>.settings_nav_button_backup": "openBackupTab",
            "click li>.settings_nav_button_profile": "openAccountInfoTab",
            "click li>.settings_nav_button_security": "openSecurityTab",
            "click .rs_cancel": "hide"
        },
        openLocationsTab: function(){
            AMA.page.openSettings("location");
        },
        openBackupTab: function(){
            AMA.page.openSettings("backup");
        },
        openAccountInfoTab: function(){
            AMA.page.openSettings("account_info");
        },
        openSecurityTab: function(){
            AMA.page.openSettings("security");
        }
    });
})();
/*! SettingsIntroView */
(function () {

	AMA.namespace("view");

	var SettingsIntroView = AMA.view.SettingsIntroView = AMA.view.BaseView.extend();

	SettingsIntroView.TEMPLATE_ID = "settings_intro_template";
	SettingsIntroView.TEMPLATE_SRC = "";
    

	AMA.augment(SettingsIntroView.prototype, {		
		
	});
})();
/*! BackupSettingsView */
(function () {

	AMA.namespace("view");


	/**
	 * This view shows the BackupSettingsView
	 *
	 * @class BackupSettingsView
	 * @namespace view
	 * @constructor
	 */
	var BackupSettingsView = AMA.view.BackupSettingsView = AMA.view.BaseView.extend();


	/**
	 * ID of the template
	 *
	 * @property TEMPLATE_ID
	 * @type string
	 * @static
	 * @final
	 */
	BackupSettingsView.TEMPLATE_ID = "backup_settings_template";

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
	BackupSettingsView.TEMPLATE_SRC = "";
	
	_.extend(BackupSettingsView.prototype, {

		_processData: function(item) {
			var data = {}, day="";
			data["frequency"] = {
				"NEVER": "",
				"DAILY": "",
				"WEEKLY": ""
			};
			data["day"] = {
				"MONDAY": "",
				"TUESDAY": "",
				"WEDNESDAY": "",
				"THURSDAY": "",
				"FRIDAY": "",
				"SATURDAY": "",
				"SUNDAY": ""
			};
			data["batteryLevelThreshold"] = {
				"10": "",
				"15": "",
				"20": ""
			};
			data["backupData"] = {
				"syncContacts": "",
				"syncPhotos": "",
				"syncVideos": ""
			};
			data["backupConnection"] = {
				"WifiOnly": "",
				"WifiOrMobileData": ""
			};

			if( item.autosyncDay ) {
				day=item.autosyncDay.toUpperCase();
			}
			else {
				day="";
			}
			data.frequency[item.autosyncTime] = "selected='selected'";
			data.day[day] = "selected='selected'";
			data.batteryLevelThreshold[item.autosyncBatteryThreshold] = "selected='selected'";
			if( item.syncContactsEnabled ) {
				data.backupData["syncContacts"]="checked";
				data.backupData["syncContactsActive"]="active";
			}
			if( item.syncPhotosEnabled ) {
				data.backupData["syncPhotos"]="checked";
				data.backupData["syncPhotosActive"]="active";
			}
			if( item.syncVideosEnabled ) {
				data.backupData["syncVideos"]="checked";
				data.backupData["syncVideosActive"]="active";
			}
			if( item.syncOnMobileData ) {
				data.backupConnection["WifiOrMobileData"]= "selected='selected'";
			}
			else {
				data.backupConnection["WifiOnly"]= "selected='selected'";
			}
			return data;
		},

		changeSchedule: function (val) {
			var $backupDaySelect = this.$el.find("select[name=backupDay]"),
			backupDaySelect = $backupDaySelect.get(0),
			backupDayValue,
			$backupBatteryLevelSelect = this.$el.find("select[name=backupBatteryLevel]"),
			backupBatteryLevelSelect = $backupBatteryLevelSelect.get(0),
			backupBatteryLevelValue,
			$backupDataBreakdown = this.$el.find(".backupDataBreakdown input");

			if (val === "NEVER" ) {
				$backupDaySelect.find("option").attr("selected",null);
				$backupDaySelect.attr("disabled","disabled");
				$backupBatteryLevelSelect.find("option").attr("selected",null);
				$backupBatteryLevelSelect.attr("disabled","disabled");
				$backupDataBreakdown.attr("disabled", "disabled").attr("checked", null);
			}
			else {
				if(val === "DAILY") {
					$backupDaySelect.find("option").attr("selected",null);
					$backupDaySelect.attr("disabled","disabled");
				}
				else {
					backupDayValue = this.data.models[0].get("autosyncDay");
					$backupDaySelect.attr("disabled",null);
				}
				if (backupDayValue) {
					$backupDaySelect.selectedIndex = this.setSelectedIndex($backupDaySelect, backupDayValue.toUpperCase());
				}
				$backupBatteryLevelSelect.attr("disabled",null);
				$backupDataBreakdown.attr("disabled", null)
				backupBatteryLevelValue = this.data.models[0].get("autosyncBatteryThreshold");
				if (backupBatteryLevelValue) {
					$backupBatteryLevelSelect.selectedIndex = this.setSelectedIndex($backupBatteryLevelSelect, backupBatteryLevelValue);
				}
			}

		},
		//TODO: should this function go under BaseView?
		setSelectedIndex: function ($el, val) {
			var options = $el.find("option"),
			i = 0;

			_.each(options, function (item, index) {
				if (item.value === val) {
					i = index;
                    $(item).attr("selected", "selected");
				}
			});

			return i;
		},

		render: function () {
			var self = this;

			BackupSettingsView.__super__.render.apply(this, arguments);
		},

		_afterRender: function () {
			var $backupScheduleSelect = this.$el.find("select[name=backupSchedule]");
			BackupSettingsView.__super__._afterRender.apply(this, arguments);
			this.parent.hideElements();
			this.changeSchedule($backupScheduleSelect.val());
			// iPhone hides OK and Cancel buttons
			if( AMA.models.capabilities.canUpdate("mediaSettings") ) {
				$("#backup_submit").removeClass("hide");
			}
			else {
				this.$el.find(".backupSchedule").addClass("hide");
				this.$el.find(".backupDay").addClass("hide");
				this.$el.find(".backupBatteryRow").addClass("hide");
				this.$el.find(".backupConnection").addClass("hide");
				this.$el.find(".backupDataBreakdown").addClass("hide");
				$("#backup_submit").addClass("hide");
				
				this.$el.find(".backupSchedule_" + this.$el.find('select[name=backupSchedule]').val()).removeClass("hidden").addClass("readonly");
				
				if(this.$el.find('select[name=backupSchedule]').val() !== 'NEVER') {
					this.$el.find(".backupDay_" + this.$el.find('select[name=backupDay]').val()).removeClass("hidden").addClass("readonly");
					
					var backupdata = 'backupDataBreakdown';
					if(this.$el.find('#backupDataBreakdownContacts').attr('checked') === 'checked') {
						backupdata += '_Contacts';
					}
					if(this.$el.find('#backupDataBreakdownImages').attr('checked') === 'checked') {
						backupdata += '_Photos';
					}
					if(this.$el.find('#backupDataBreakdownVideos').attr('checked') === 'checked') {
						backupdata += '_Videos';
					}
					this.$el.find("."+backupdata).removeClass("hidden").addClass("readonly");
				}
				else {
					this.$el.find(".backupDayNote").addClass("hide");
					this.$el.find(".day_of_week").addClass("hide");
					this.$el.find(".backupDataBreakdowns").addClass("hide");
				}
				
				this.$el.find(".settings_note").show();
			}
		},

		events: {
			"click .btnBackupSync": "saveBackup"
		},

		_setupEvents: function () {
			var self = this,
			$backupScheduleSelect = this.$el.find("select[name=backupSchedule]");

			$backupScheduleSelect.on("change", function (){
				self.changeSchedule(this.value);
			});
		},

		saveBackup: function() {
			var section = 'backup';
			this.save(section);
		},
		save: function(section) {
			//$("#" + section + "_submit .after_save_message").html("");
			$(".settings_intro .intro_after_save_message").html("");

			var validationErrors = [];
			var changes = {};
			var profileData = {}; // current values go in here
			var updateCallbacks = [];

			// Backup Settings
			if ($(".settings_content .backup_settings").is(':visible')) {
				var returnObj = this.saveBackupSettings(".settings_content");
				$.extend(profileData, returnObj.profileData);
				$.extend(changes, returnObj.changes);
				var profileChanged = returnObj.settingsChanged;
				validationErrors = returnObj.validationErrors;
			}

			//If validation errors. Display them. No save!
			if(validationErrors != null && validationErrors != "") {
				AMA.Util.switchLabel(".validation_text", validationErrors, this.$el);
				return;
			}

			//If no changes made... No save!
			if(!profileChanged) {
				AMA.Util.switchLabel(".validation_text", ".no_changes", this.$el);
				return;
			}
			
			// Save settings
			$("#" + section + "_submit .connecting").show();

			var callback = this.afterBackupSettingsSave;
			this.saveSettings(profileData, profileChanged, callback.bind(this, profileData, changes, section));
		},

		saveBackupSettings: function(container)
		{
			var frequencyValue="";
			var dayValue="";
			var batteryLevelThresholdValue="";
			var syncContactsValue="";
			var syncPhotosValue="";
			var syncVideosValue="";
			var wifiValue="";
			var mobileDataValue="";
			var data = this.data.models[0];
			
			if(data) {
				frequencyValue = data.get("autosyncTime");
				if(data.get("autosyncDay")) {
					dayValue=data.get("autosyncDay").toUpperCase();
				}
				else {
					dayValue="";
				}
				batteryLevelThresholdValue = data.get("autosyncBatteryThreshold");
				syncContactsValue = "" + data.get("syncContactsEnabled");
				syncPhotosValue = "" + data.get("syncPhotosEnabled");
				syncVideosValue = "" + data.get("syncVideosEnabled");
				wifiValue = "" + data.get("syncOnWifi");
				mobileDataValue = "" + data.get("syncOnMobileData");
			}

			var settingsChanged = false;
			var changes = {};
			var profileData = {};

			profileData.frequency = $(container + " select[name='backupSchedule'] option:selected").val();
			//If a change was made to backup schedule
			if(profileData.frequency !== frequencyValue) {
				settingsChanged = true;
				AMA.debug("Backup Settings Save - Change made to backup schedule... Saving to history");
			}

			if(profileData.frequency !== "NEVER") {

				profileData.day = $(container + " select[name='backupDay'] option:selected").val();
				AMA.debug("Backup Settings Save - backup frequency: " + profileData.frequency);

				//If a change was made to day
				if(dayValue !== profileData.day) {
					settingsChanged = true;
					AMA.debug("Backup Settings Save - Change made to backup day... Saving to history");
				}
			}

			profileData.batteryLevelThreshold = $(container + " select[name='backupBatteryLevel'] option:selected").val();
			//If a change was made to day
			if(batteryLevelThresholdValue !== profileData.batteryLevelThreshold) {
				settingsChanged = true;
				AMA.debug("Backup Settings Save - Change made to backup battery level... Saving to history");
			}

			profileData.syncContacts = ""+$(container + " input[id='backupDataBreakdownContacts']").is(":checked");
			//If a change was made to real time scan
			if(syncContactsValue !== profileData.syncContacts) {
				settingsChanged = true;
				AMA.debug("Backup Settings Save - Change made to contacts sync flag... Saving to history");
			}

			profileData.syncPhotos = ""+$(container + " input[id='backupDataBreakdownImages']").is(":checked");
			//If a change was made to media scan
			if(syncPhotosValue !== profileData.syncPhotos) {
				settingsChanged = true;
				AMA.debug("Backup Settings Save - Change made to photos sync... Saving to history");
			}

			profileData.syncVideos = ""+$(container + " input[id='backupDataBreakdownVideos']").is(":checked");
			//If a change was made to tray notification
			if(syncVideosValue !== profileData.syncVideos) {
				settingsChanged = true;
				AMA.debug("Backup Settings Save - Change made to videos sync... Saving to history");
			}
			
			var backupConnectionSelected = ""+$(container + " select[name='backupConnection'] option:selected").val();
      		// WiFi
      		profileData.wifi = "true";

         	// Mobile Network
         	profileData.mobileData = "false";
         	if(backupConnectionSelected === 'wifiOrMobileNetwork') {
         		profileData.mobileData = "true";
         	}

			//If a change was made to wifi
			if(wifiValue !== profileData.wifi) {
				settingsChanged = true;
				AMA.debug("Backup Settings Save - Change made to wifi connection... Saving to history");
			}

			//If a change was made to mobile data
			if(mobileDataValue !== profileData.mobileData) {
				settingsChanged = true;
				AMA.debug("Backup Settings Save - Change made to wifi or mobile data connection... Saving to history");
			}
	
			//Validation
			var validationErrors = [];
			if( (profileData.frequency === "WEEKLY") && (profileData.day === "") ) {
				validationErrors.push(".blank_day");
				AMA.debug("Failed validation - Backup Settings - backup day");
			}
			if( profileData.frequency !== "NEVER" ) {
				if( (profileData.syncContacts === "false") && (profileData.syncPhotos === "false") && (profileData.syncVideos === "false") ) {
					validationErrors.push(".blank_data");
					AMA.debug("Failed validation - Backup Settings - backup sync data");
				}
			}

			var returnObj = {};
			returnObj.profileData = profileData;
			returnObj.changes = changes;
			returnObj.settingsChanged = settingsChanged;
			returnObj.validationErrors = validationErrors;

			return returnObj;
		},
		
		saveSettings: function(profileData, profileChanged, callback) {
			// save Security and security settings
			if(profileChanged) {

				this.data.models[0].set({
					"autosyncTime": profileData.frequency,
					"autosyncBatteryThreshold": profileData.batteryLevelThreshold,
					"autosyncDay": profileData.day,
					"syncContactsEnabled": (profileData.syncContacts==="true"),
					"syncPhotosEnabled": (profileData.syncPhotos==="true"),
					"syncVideosEnabled": (profileData.syncVideos==="true"),
					"syncOnWifi": (profileData.wifi=="true"),
					"syncOnMobileData": (profileData.mobileData=="true")
				});

AMA.debug("Backup Settings sync data:"+JSON.stringify(this.data.models[0]));  // TODO: remove this debug log before production
				var options = {
					url: AMA.models.syncsettings.url,
					success: callback,
					callback:callback,
					data:JSON.stringify(this.data.toJSON()[0])
				};

				this.data.sync("update", this.data.models[0], options);
			}
		},
		
		afterBackupSettingsSave: function(profileData, changes, section, data) {
			AMA.Util.switchLabel(".validation_text", ".success", this.$el);
		}
	});

})();

/*! LocationSettingsView */
(function () {

    AMA.namespace("view");

    var LocationSettingsView = AMA.view.LocationSettingsView = AMA.view.BaseView.extend();

    LocationSettingsView.TEMPLATE_ID = "location_settings_template";
    LocationSettingsView.TEMPLATE_SRC = "";


    AMA.augment(LocationSettingsView.prototype, {

        _processData: function(item) {
            var data = {};
            data["locationCheck"] = {
                "true": "",
                "false": ""
            };
            data["frequencyMinutes"] = {
                "1": "",
                "3": "",
                "6": ""
            };
            data["batteryLevelThreshold"] = {
                "10": "",
                "20": "",
                "30": "",
                "40": "",
                "50": "",
                "60": ""
            };

            data.locationCheck[(item.locationEnabled) ? "true" : "false"] = "selected='selected'";
            data.frequencyMinutes[item.frequencyMinutes] = "selected='selected'";
            data.batteryLevelThreshold[item.batteryLevelThreshold] = "selected='selected'";
            return data;
        },
        render: function () {
            LocationSettingsView.__super__.render.apply(this, arguments);
        },

        _afterRender: function () {
            var $locationChecksSelect = this.$el.find("select[name=location_check]");
            LocationSettingsView.__super__._afterRender.apply(this, arguments);

            this.parent.hideElements();
            this.changeLocationChecks($locationChecksSelect.val());
            // iPhone hides OK and Cancel buttons
            if( AMA.models.capabilities.canUpdate("eventSettings") ) {
                $("#locations_submit").removeClass("hide");
            }
            else {
                this.$el.find(".location_check").addClass("hide");
                this.$el.find(".frequencyMin").addClass("hide");
                this.$el.find(".battery_level").addClass("hide");
                this.$el.find(".locationbatterynote").addClass("hide");
                $("#locations_submit").addClass("hide");

                this.$el.find(".location_check_" + this.$el.find('select[name=location_check]').val()).removeClass("hidden").addClass("readonly");
                if(this.$el.find('select[name=location_check]').val() === 'true') {
                    this.$el.find(".frequency_" + this.$el.find('select[name=frequency]').val()).removeClass("hidden").addClass("readonly");
                }
                else {
                    this.$el.find(".frequency").addClass("hide");
                }
                this.$el.find(".settings_note").show();
            }
        },

        _setupEvents: function () {
            var o = this,
                    $locationChecksSelect = this.$el.find("select[name=location_check]");

            $locationChecksSelect.on("change", function (){
                o.changeLocationChecks(this.value);
            });
        },

        changeLocationChecks: function (val) {
            var $locationFrequencySelect = this.$el.find("select[name=frequency]"),
                    locationFrequencySelect = $locationFrequencySelect.get(0),
                    locationFrequencyValue,
                    $locationBatteryLevelSelect = this.$el.find("select[name=battery_level]"),
                    locationBatteryLevelSelect = $locationBatteryLevelSelect.get(0),
                    locationBatteryLevelValue;

            if (val === "false") {
                $locationFrequencySelect.find("option").attr("selected",null);
                $locationFrequencySelect.attr("disabled","disabled");
                $locationBatteryLevelSelect.find("option").attr("selected",null);
                $locationBatteryLevelSelect.attr("disabled","disabled");
            }
            else {
                locationFrequencyValue = "" + this.data.models[0].get("frequencyMinutes");
                $locationFrequencySelect.attr("disabled",null);

                if (locationFrequencyValue) {
                    $locationFrequencySelect.selectedIndex = this.setSelectedIndex($locationFrequencySelect, locationFrequencyValue);
                }

                locationBatteryLevelValue = this.data.models[0].get("batteryLevelThreshold");
                $locationBatteryLevelSelect.attr("disabled",null);

                if (locationBatteryLevelValue) {
                    $locationBatteryLevelSelect.selectedIndex = this.setSelectedIndex($locationBatteryLevelSelect, locationBatteryLevelValue);
                }
                AMA.debug("changeLocationChecks, locationFrequencyValue: " + locationFrequencyValue + ", locationBatteryLevelValue: " + locationBatteryLevelValue);
            }
        },
        //TODO: should this function go under BaseView?
        setSelectedIndex: function ($el, val) {
            var options = $el.find("option"),
                    i = 0;

            _.each(options, function (item, index) {
                if (item.value === val) {
                    i = index;
                    $(item).attr("selected", "selected");
                }
            });

            return i;
        },
        events: {
            "click .btnLocationSave": "saveLocation"
        },
        saveLocation: function() {
            var section = 'locations';
            this.save(section);
        },
        save: function(section) {
            //$("#" + section + "_submit .after_save_message").html("");
            $(".settings_intro .intro_after_save_message").html("");

            var hasErrors = "";
            var changes = {};
            var profileData = {}; // current values go in here
            var updateCallbacks = [];

            // Location Settings
            if ($(".settings_content .location_settings").is(':visible')) {
                var returnObj = this.saveLocationSettings(".settings_content");
                $.extend(profileData, returnObj.profileData);
                $.extend(changes, returnObj.changes);
                var profileChanged = returnObj.settingsChanged;
                hasErrors = returnObj.hasErrors;
            }

            //If validation errors. Display them. No save!
            if(hasErrors) return;

            //If no changes made... No save!
            if(!profileChanged)
            {
                AMA.Util.switchLabel(".validation_text", ".noChanges", this.$el);
                this.$el.find(".after_save_message").removeClass('hidden');
                return;
            }

            // Save settings
            $("#" + section + "_submit .connecting").show();

            var callback = this.afterBackupSettingsSave;
            this.saveSettings(profileData, profileChanged, callback.bind(this, profileData, changes, section));
        },
        saveLocationSettings: function(container)
        {
            var locationChecksValue = "", locationFrequencyValue = "", locationBatteryValue = "", data = this.data.models[0];
            AMA.debug("Location Settings Save data:"+JSON.stringify(data));  // TODO: remove this debug log before production

            if(data){
                locationChecksValue = ""+data.get("locationEnabled");
                locationFrequencyValue = ""+data.get("frequencyMinutes");
                locationBatteryValue = data.get("batteryLevelThreshold");
            }

            var settingsChanged = false;
            var changes = {};
            var profileData = {};

            profileData.locationCheck = $(container + " select[name='location_check'] option:selected").val();
            //If a change was made to locationCheck
            if(profileData.locationCheck !== locationChecksValue)
            {
                settingsChanged = true;
                AMA.debug("Location Settings Save - Change made to Location Check Changed... Saving to history");
            }

            if(profileData.locationCheck === "true")
            {
                profileData.frequency = $.trim($(container + " select[name='frequency'] option:selected").val());
                AMA.debug("Location Settings Save - Frequency: " + profileData.frequency);
                //If a change was made to frequency
                if(locationFrequencyValue !== profileData.frequency)
                {
                    settingsChanged = true;
                    AMA.debug("Location Settings Save - Change made to Frequency... Saving to history");
                }

                //If battery level is hidden then don't add it to the situation record
                if($(container + " .battery_level").css('display') !== "none")
                {
                    profileData.batteryLevel = $.trim($(container + " select[name='battery_level'] option:selected").val());
                    AMA.debug("Location Settings Save - Battery Level: " + profileData.batteryLevel);
                    //If a change was made to batteryLevel
                    if(locationBatteryValue !== profileData.batteryLevel)
                    {
                        settingsChanged = true;
                        AMA.debug("Location Settings Save - Change made to Battery Level... Saving to history");
                    }
                }
            }

            //Validation
            var hasErrors = false;
            if(profileData.locationCheck === "true")
            {
                if(profileData.frequency === "" && profileData.batteryLevel === "") {
                    AMA.Util.switchLabel(".validation_text", ".noFreqAndLevel", this.$el);
                    this.$el.find(".after_save_message").removeClass('hidden');
                    AMA.debug("Failed validation - location - frequency");
                    AMA.debug("Failed validation - location - battery");
                }
                else if(profileData.frequency === "")
                {
                    AMA.Util.switchLabel(".validation_text", ".noFreq", this.$el);
                    this.$el.find(".after_save_message").removeClass('hidden');
                    //validationErrors += "Please select a location check frequency.<br/>";
                    AMA.debug("Failed validation - location - frequency");
                }
                else if(profileData.batteryLevel === "")
                {
                    AMA.Util.switchLabel(".validation_text", ".noBattLevel", this.$el);
                    this.$el.find(".after_save_message").removeClass('hidden');
                    //validationErrors += "Please select a location check battery level.<br/>";
                    AMA.debug("Failed validation - location - battery");
                }

                if(profileData.frequency === "" || profileData.batteryLevel === "") {
                    hasErrors = true;
                }
            }

            var returnObj = {};
            returnObj.profileData = profileData;
            returnObj.changes = changes;
            returnObj.settingsChanged = settingsChanged;
            returnObj.hasErrors = hasErrors;

            return returnObj;
        },
        saveSettings: function(profileData, profileChanged, callback)
        {
            // save location and security settings
            if(profileChanged) {

                this.data.models[0].set({
                    locationEnabled: (profileData.locationCheck==="true"),
                    frequencyMinutes : Number(profileData.frequency),
                    batteryLevelThreshold : profileData.batteryLevel
                });

                AMA.debug("Location Settings sync data:"+JSON.stringify(this.data.models[0]));  // TODO: remove this debug log before production
                var options = {
                    url: AMA.models.locatesettings.url,
                    success: callback,
                    callback:callback,
                    data:JSON.stringify(this.data.toJSON()[0])
                };

                this.data.sync("update", this.data.models[0], options);
            }
        },

        afterBackupSettingsSave: function(profileData, changes, section, data)
        {
            AMA.Util.switchLabel(".validation_text", ".settingsSaved", this.$el);
            this.$el.find(".after_save_message").removeClass("hidden");
            AMA.models.endpointHistory.fetch();
            AMA.models.devicesettings.fetch();
        }

    });
})();

/*! ProfilesettingsView */
(function () {
    AMA.namespace("view");

    var ProfileSettingsView = AMA.view.ProfileSettingsView = AMA.view.BaseView.extend();

    ProfileSettingsView.TEMPLATE_ID = "profile_settings_template";
    ProfileSettingsView.TEMPLATE_SRC = "";


    AMA.augment(ProfileSettingsView.prototype, {
        events: {
            "click .btnAccountInfoSave" : "updateAccountInfo",
            "click .btnChangePassword" : "updatePassword",
            "click .btnChangeSecurityInfo": "updateSecurityInfo",
            "change select[name='securityquestion']": "clearSecurityAnswer",
            "click #btnSubmitProfileSettings" : "submitProfileSettings"
        },

        render: function () {
            ProfileSettingsView.__super__.render.apply(this, arguments);

            // Set the value of the security question drop down to the user's current security question
            $("select[name='securityquestion']").val(AMA.Util.decodeHTMLEntityString(this.data.models[0].get("securityQuestion")));
        },

        _processData: function (item) {
            name = item.phoneNumber;
            email = item.emailAddress;
            securityAnswer = item.securityAnswer;
        },

        _afterRender: function () {
            ProfileSettingsView.__super__._afterRender.apply(this, arguments);

            this.parent.hideElements();
            this.parent.$el.find(".settings .connecting").hide();

            // in case we want future read-only Profile Settings feature similar to Sync Settings behavior on iPhone
            if( AMA.models.capabilities.canUpdate("accountSettings") ) {
                $("#account_info_submit").removeClass("hide");
                $("#password_submit").removeClass("hide");
                $("#securityQA_submit").removeClass("hide");
            } else {
                $("#account_info_submit").addClass("hide");
                $("#password_submit").addClass("hide");
                $("#securityQA_submit").addClass("hide");
            }
        },

        show: function () {
            ProfileSettingsView.__super__.show.apply(this, arguments);

            //this.parent.$el.find("#settings_submit").hide();
        },

        // Validates entries in the "Account Info" section and sends request to update if validation successful
        updateAccountInfo: function() {
            var currentEmail = AMA.Util.decodeHTMLEntityString(this.data.models[0].get("emailAddress")),
                newEmail = $.trim(this.$el.find("input[name='email']").get(0).value),
                validationSuccess = true,
                newAccountInfo = {},
                o = this,
                afterAjax = function (data) {
                    $("#account_info_submit .connecting").hide();

                    if (typeof data == "object" && data.error) {
                        AMA.Util.switchLabel(".validation_text", ".email_taken", o.$el.find(".validation_accountinfo"));
                        //AMA.Util.switchLabel(".validation_text", ".email_update_error", o.$el);
                        return;
                    }

                    AMA.Util.switchLabel(".validation_text", ".email_changed", o.$el.find(".validation_accountinfo"));
                    AMA.page.logout();
                };

            if (newEmail == "") {
                AMA.Util.switchLabel(".validation_text", ".email_empty", this.$el.find(".validation_accountinfo"));
                this.$el.find(".after_save_message").removeClass("hidden");
                validationSuccess = false;
            } else if (!AMA.Util.validateEmail(newEmail)) {
                AMA.Util.switchLabel(".validation_text", ".email_invalid", this.$el.find(".validation_accountinfo"));
                validationSuccess = false;
            } else if (currentEmail === newEmail) {
                AMA.Util.switchLabel(".validation_text", ".email_unchanged", this.$el.find(".validation_accountinfo"));
                validationSuccess = false;
            }

            if (!validationSuccess) {
                return;
            }

            $("#account_info_submit .connecting").show();

            newAccountInfo.email = newEmail;

            // Send request to update account information
            this.data.saveAccountInfo(newAccountInfo, afterAjax);
        },

        // Validates entries in the "Change Password" section and sends request to update if validation successful
        updatePassword: function() {
            var password = $.trim(this.$el.find("input[name='password']").get(0).value),
                newPIN = $.trim(this.$el.find("input[name='newPin']").get(0).value),
                confirmPIN = $.trim(this.$el.find("input[name='confirmPIN']").get(0).value),
                validationSuccess = true,
                messagesToShow = [],
                passwordCharRegex = /^\s*[a-zA-Z0-9,\s]+\s*$/;

            if (password !== "" || newPIN !== "" || confirmPIN !== "") {
                if (password === "") {
                    messagesToShow.push(".current_password_empty");
                    validationSuccess = false;
                } else if (!passwordCharRegex.test(password)) {
                    messagesToShow.push(".current_password_has_special_chars");
                    validationSuccess = false;
                }

                if (newPIN === "") {
                    messagesToShow.push(".new_password_empty");
                    validationSuccess = false;
                } else if (this.validatePassword(newPIN)) {
                    messagesToShow.push(".new_password_length");
                    validationSuccess = false;
                } else if (!passwordCharRegex.test(newPIN)) {
                    messagesToShow.push(".new_password_has_special_chars");
                    validationSuccess = false;
                }

                if (confirmPIN === "") {
                    messagesToShow.push(".confirm_password_empty");
                    validationSuccess = false;
                }

                if (confirmPIN !== newPIN) {
                    messagesToShow.push(".confirm_password_mismatch");
                    validationSuccess = false;
                }

                if (password !== "" && newPIN != "" && password === newPIN) {
                    messagesToShow.push(".password_unchanged");
                    validationSuccess = false;
                }

                // Prevent saving if there are validation errors
                if (!validationSuccess) {
                    AMA.Util.switchLabel(".validation_text", messagesToShow, this.$el.find(".validation_password"));
                    return;
                }

                $("#password_submit .connecting").show();

                // Santizing the input data using xss validator
                password = xssClean(password);
                newPIN = xssClean(newPIN);
                confirmPIN = xssClean(confirmPIN);

                // Send request to encrypt the password
                this.encryptPassword(password, newPIN, confirmPIN);            	
            }
        },

        /*
         * Ajax call to get the secret key and handle to encrypt the password
         */
        encryptPassword: function (password, newPIN, confirmPIN) {
            var o = this,
                callback = function (data) {
                    o._afterUpdatePassword(data);
                },
                afterAjax = function (data) {
                    if (!data) {
                        AMA.error("Expected response data is missing. Unable to perform password update");
                        return;
                    }

                    var secretKey =  data.secretKey,
                        secretHandle = data.handle,
                        ivr = data.initVector,
                        key = CryptoJS.enc.Hex.parse(secretKey),
                        iv = CryptoJS.enc.Hex.parse(ivr),
                        encPassword = CryptoJS.AES.encrypt(password, key, { iv: iv }).toString(),
                        encNewPIN = CryptoJS.AES.encrypt(newPIN, key, { iv: iv }).toString(),
                        encConfirmPIN = CryptoJS.AES.encrypt(confirmPIN, key, { iv: iv }).toString(),
                        returnObj = {
                            oldPassword: encPassword,
                            newPassword: encNewPIN,
                            confirmPassword: encConfirmPIN,
                            secretHandle: secretHandle
                        };

                    // Send request to update the password
                    o.data.saveNewPassword(returnObj, callback);
                },
                data = AMA.Util.getSecretPair(afterAjax);
        },

        _afterUpdatePassword: function (data) {
            $("#password_submit .connecting").hide();

            if (typeof data == "object" && data.error) {
                if (data.error === "Invalid Password") {
                    AMA.Util.switchLabel(".validation_text", ".password_invalid", this.$el.find(".validation_password"));
                } else {
                    AMA.Util.switchLabel(".validation_text", ".password_update_error", this.$el.find(".validation_password"));
                }
                return;
            }

            AMA.Util.switchLabel(".validation_text", ".password_changed", this.$el.find(".validation_password"));
            AMA.page.logout();
        },

        updateSecurityInfo: function () {
            var currentQuestion = AMA.Util.decodeHTMLEntityString(this.data.models[0].get("securityQuestion")),
                currentAnswer = this.data.models[0].get("securityAnswer"),
                newQuestion = this.$el.find("select[name='securityquestion']").val(),
                newAnswer = $.trim(this.$el.find("input[name='securityanswer']").get(0).value),
                validationSuccess = true,
                newSecurityQA = {},
                o = this,
                afterInvalidate = function () {
                    AMA.Util.switchLabel(".validation_text", ".security_answer_changed", o.$el.find(".validation_securityqa"));
                },
                afterAjax = function (success, response) {
                    var options = {
                        callback: afterInvalidate
                    };

                    $("#securityQA_submit .connecting").hide();

                    if (response === AMA.config.accountDetails.accountId) {
                        //AMA.Util.switchLabel(".validation_text", ".security_answer_changed", o.$el);
                        AMA.models.dashboardData.invalidate(options);
                    } else {
                        AMA.Util.switchLabel(".validation_text", ".security_answer_update_error", o.$el.find(".validation_securityqa"));
                    }
                };
            
            o.$el.find(".validation_securityqa .validation_text").hide();
                
            if (currentQuestion !== newQuestion || (currentQuestion === newQuestion && currentAnswer !== newAnswer && newAnswer !== "")) {
                if (newAnswer == "") {
                    AMA.Util.switchLabel(".validation_text", ".security_answer_empty", this.$el.find(".validation_securityqa"));
                    validationSuccess = false;
                } else if (currentQuestion === newQuestion && currentAnswer === newAnswer) {
                    AMA.Util.switchLabel(".validation_text", ".security_answer_unchanged", this.$el.find(".validation_securityqa"));
                    validationSuccess = false;
                } else if (!this.validateSecurityAnswer(newAnswer)) {
                    AMA.Util.switchLabel(".validation_text", ".security_answer_invalid", this.$el.find(".validation_securityqa"));
                    validationSuccess = false;
                }

                if (!validationSuccess) {
                    return;
                }

                newSecurityQA.securityQuestion = newQuestion;
                newSecurityQA.securityAnswer = newAnswer;

                $("#securityQA_submit .connecting").show();

                // Send request to update security question and/or answer
                this.data.saveSecurityQA(newSecurityQA, afterAjax);            	
            }  
        },
        
        validateSecurityAnswer: function (data){
            return ((data.length === 4) && !(isNaN(data)));
        },

        validatePassword: function (data) {
            return (data.length < 6 || data.length > 15);
        },

        clearSecurityAnswer : function () {
            AMA.Util.switchLabel(".validation_text", "", this.$el.find(".validation_securityqa"));
            $('#profile_securityanswer').val('');
        },
        
        submitProfileSettings : function() {
        	this.updateAccountInfo();
        	this.updatePassword();
        	this.updateSecurityInfo();
        }        
        
    });
})();
/*! SecuritySettingsView */
(function () {

    AMA.namespace("view");

    var SecuritySettingsView = AMA.view.SecuritySettingsView = AMA.view.BaseView.extend();

    SecuritySettingsView.TEMPLATE_ID = "security_settings_template";
    SecuritySettingsView.TEMPLATE_SRC = "";

    AMA.augment(SecuritySettingsView.prototype, {
        initialize: function() {
            SecuritySettingsView.__super__.initialize.apply(this, arguments);
            this.safeBrowsingTab = AMA.models.safeBrowsing;

        },
        _processData: function(item) {
            var data = {}, day="";
            data["frequency"] = {
                "NEVER": "",
                "DAILY": "",
                "WEEKLY": ""
            };
            data["day"] = {
                "MONDAY": "",
                "TUESDAY": "",
                "WEDNESDAY": "",
                "THURSDAY": "",
                "FRIDAY": "",
                "SATURDAY": "",
                "SUNDAY": ""
            };
            data["range"] = {
                "AM12TO1": "",
                "AM1TO2": "",
                "AM2TO3": "",
                "AM3TO4": "",
                "AM4TO5": "",
                "AM5TO6": "",
                "AM6TO7": "",
                "AM7TO8": "",
                "AM8TO9": "",
                "AM9TO10": "",
                "AM10TO11": "",
                "AM11TO12": "",
                "PM12TO1": "",
                "PM1TO2": "",
                "PM2TO3": "",
                "PM3TO4": "",
                "PM4TO5": "",
                "PM5TO6": "",
                "PM6TO7": "",
                "PM7TO8": "",
                "PM8TO9": "",
                "PM9TO10": "",
                "PM10TO11": "",
                "PM11TO12": ""
            };
            data["realTimeScan"] = {
                "true": "",
                "false": ""
            };
            data["mediaScan"] = {
                "true": "",
                "false": ""
            };
            data["trayNotification"] = {
                "true": "",
                "false": ""
            };
            data["cloudAv"] = {
                "true": "",
                "false": ""
            };
            data["realTimeScanActive"] = {
                "true": "",
                "false": ""
            };
            data["mediaScanActive"] = {
                "true": "",
                "false": ""
            };
            data["trayNotificationActive"] = {
                "true": "",
                "false": ""
            };
            data["cloudAvActive"] = {
                "true": "",
                "false": ""
            };

            data.frequency[item.autoThreatScanFrequency] = "selected='selected'";
            if( item.dayOfWeek ) {
                day=item.dayOfWeek.toUpperCase();
            }
            else {
                day="";
            }
            data.day[day] = "selected='selected'";
            data.range[item.timeOfDay] = "selected='selected'";
            data.realTimeScan[""+item.realTimeScanEnabled] = "checked";
            data.mediaScan[""+item.mediaScanEnabled] = "checked";
            data.trayNotification[""+item.trayNotificationEnabled] = "checked";
            data.realTimeScanActive[""+item.realTimeScanEnabled] = "active";
            data.mediaScanActive[""+item.mediaScanEnabled] = "active";
            data.trayNotificationActive[""+item.trayNotificationEnabled] = "active";
            data.cloudAv[""+item.cloudAvEnabled] = "checked";
            data.cloudAvActive[""+item.cloudAvEnabled] = "active";

            AMA.debug("SecuritySettingsView _processData item:"+JSON.stringify(item)+", data:"+JSON.stringify(data));  //TODO: remove for production

            return data;
        },

        render: function () {
            var self = this;

            SecuritySettingsView.__super__.render.apply(this, arguments);
            // iPhone hides OK and Cancel buttons
            if( AMA.models.capabilities.canUpdate("appSecuritySettings") ) {
                $("#security_submit").removeClass("hide");
            }
            else {
                $("#security_submit").addClass("hide");
            }



            this.safeBrowsingTab.fetch({
                silent: true,
                success: function(resp) {
                    var safeBrowsingEnabled = resp.models[0].get("safeBrowsingEnabled");

                    if (safeBrowsingEnabled) {
                        $(self.$el).find('.safeBrowsingToggle .on').toggleClass('active').find('input').prop('checked', true);
                    } else {
                        $(self.$el).find('.safeBrowsingToggle .off').toggleClass('active').find('input').prop('checked', true);
                    }
                }
            });
/*

             this.safeBrowsingTab.once(AMA.view.BaseView.EVENT.DATA_LOADED, function() {
                 var safeBrowsingEnabled = this.data.models[0].get("safeBrowsingEnabled");
             });


*/

        },

        _afterRender: function () {
            var $scanScheduleSelect = this.$el.find("select[name=scanSchedule]");
            SecuritySettingsView.__super__._afterRender.apply(this, arguments);

            this.parent.hideElements();
            this.changeSchedule($scanScheduleSelect.val());
        },

        _setupEvents: function () {
            var self = this,
                $scanScheduleSelect = this.$el.find("select[name=scanSchedule]");

            $scanScheduleSelect.on("change", function (){
                self.changeSchedule(this.value);
            });

            var o = this;
            $(this.$el).find(".btnSafeBrowsingSave").on('click', function() {
                o.saveSecurity();
            });
        },
        saveSafeBrowsingSetting: function() {

            AMA.page.standardDialogs.loading("");

            var safeBrowsingEnabled = ("true"===$(this.el).find('input[name="safeBrowsing"]:checked').val());

            this.safeBrowsingTab.models[0].set({
                safeBrowsingEnabled: safeBrowsingEnabled
            });

            var options = {
                url: this.safeBrowsingTab.url,
                success: $.proxy(this.saveSuccess, this),
                error: $.proxy(this.saveError, this),
                callback: $.proxy(this.successOrFailure, this),
                data: JSON.stringify(this.safeBrowsingTab.models[0].attributes)
            };

            this.safeBrowsingTab.sync("update", this.safeBrowsingTab.models[0], options);

        },

        changeSchedule: function (val) {
            var $scanDaySelect = this.$el.find("select[name=scanDay]"),
                    scanDaySelect = $scanDaySelect.get(0),
                    scanDayValue,
                    $scanTimeSelect = this.$el.find("select[name=scanTime]"),
                    scanTimeSelect = $scanTimeSelect.get(0),
                    scanTimeValue;

            AMA.debug("SecuritySettingsView changeSchedule, frequency: " + val);  //TODO: remove for production

            if (val === "NEVER" ) {
                $scanDaySelect.find("option").attr("selected",null);
                $scanDaySelect.attr("disabled","disabled");
                $scanTimeSelect.find("option").attr("selected",null);
                $scanTimeSelect.attr("disabled","disabled");
            }
            else {
                if(val === "DAILY") {
                    $scanDaySelect.find("option").attr("selected",null);
                    $scanDaySelect.attr("disabled","disabled");
                }
                else {
                    scanDayValue = this.data.models[0].get("dayOfWeek");
                    $scanDaySelect.attr("disabled",null);
                }

                if (scanDayValue) {
                    $scanDaySelect.selectedIndex = this.setSelectedIndex($scanDaySelect, scanDayValue.toUpperCase());
                }

                scanTimeValue = this.data.models[0].get("timeOfDay");
                $(scanTimeSelect).attr("disabled",null);

                if (scanTimeValue) {
                    $scanTimeSelect.selectedIndex = this.setSelectedIndex($scanTimeSelect, scanTimeValue);
                }
            }
        },
        //TODO: should this function go under BaseView?
        setSelectedIndex: function ($el, val) {
            var options = $el.find("option"),
                    i = 0;

            _.each(options, function (item, index) {
                if (item.value === val) {
                    i = index;
                    $(item).attr("selected", "selected");
                }
            });

            return i;
        },
        events: {
            "click .btnSecuritySave": "saveSecurity"
        },
        saveSecurity: function() {
            var section = 'security';
            this.save(section);
        },
        save: function(section) {
            //$("#" + section + "_submit .after_save_message").html("");
            $(".settings_intro .intro_after_save_message").html("");

            var validationErrors = [],
                changes = {},
                profileData = {}, // current values go in here
                updateCallbacks = [],
                data = AMA.models.safeBrowsing.models[0],
                safeBrowsingEnabled = ""+data.get("safeBrowsingEnabled"),
                noChangesSafeBrowsing = (safeBrowsingEnabled === $(this.$el).find('input[name="safeBrowsing"]:checked').val());

            // Security Settings
            if ($(".settings_content .security_settings").is(':visible')) {
                var returnObj = this.saveSecuritySettings(".settings_content");
                $.extend(profileData, returnObj.profileData);
                $.extend(changes, returnObj.changes);
                var profileChanged = returnObj.settingsChanged;
                validationErrors = returnObj.validationErrors;
            }

            //If validation errors. Display them. No save!
            if(validationErrors != null && validationErrors != "") {
                AMA.Util.switchLabel(".validation_text", validationErrors, this.$el);
                this.$el.find(".after_save_message").removeClass('hidden');

                return;
            }

            //If no changes made... No save!
            if(!profileChanged && noChangesSafeBrowsing) {
                AMA.Util.switchLabel(".validation_text", ".no_changes", this.$el);
                this.$el.find(".after_save_message").removeClass('hidden');

                return;
            }
            if(!noChangesSafeBrowsing) {
                this.saveSafeBrowsingSetting();
            }
            // Save settings
            $("#" + section + "_submit .connecting").show();

            var callback = this.afterBackupSettingsSave;
            if(profileChanged) {
                this.saveSettings(profileData, profileChanged, callback.bind(this, profileData, changes, section));
            }
        },

        saveSecuritySettings: function(container)
        {
            var frequencyValue="", dayValue="", rangeValue="", realTimeScanValue="", mediaScanValue="", trayNotificationValue="",
                    cloudAvValue="", data = this.data.models[0];
            AMA.debug("Security Settings Save data:"+JSON.stringify(data));  // TODO: remove this debug log before production

            if(data) {
                frequencyValue = data.get("autoThreatScanFrequency");
                if( data.get("dayOfWeek") ) {
                    dayValue=data.get("dayOfWeek").toUpperCase();
                }
                else {
                    dayValue="";
                }
                rangeValue = data.get("timeOfDay");
                realTimeScanValue = ""+data.get("realTimeScanEnabled");
                mediaScanValue = ""+data.get("mediaScanEnabled");
                trayNotificationValue = ""+data.get("trayNotificationEnabled");
                cloudAvValue = ""+data.get("cloudAvEnabled");
                airplaneModeLockValue = ""+data.get("airplanModeLockEnabled");  // this won't be changed by UI as it's not shown, just retrieve value.
            }

            var settingsChanged = false;
            var changes = {};
            var profileData = {};

            profileData.frequency = $(container + " select[name='scanSchedule'] option:selected").val();
            //If a change was made to SecurityCheck
            if(profileData.frequency !== frequencyValue) {
                settingsChanged = true;
                AMA.debug("Security Settings Save - Change made to scan schedule... Saving to history");
            }

            if(profileData.frequency !== "NEVER") {
                if(profileData.frequency !== "DAILY") {
                    profileData.day = $(container + " select[name='scanDay'] option:selected").val();
                    AMA.debug("Security Settings Save - scan frequency: " + profileData.frequency);

                    //If a change was made to day
                    if(dayValue !== profileData.day) {
                        settingsChanged = true;
                        AMA.debug("Security Settings Save - Change made to scan day... Saving to history");
                    }
                }
                profileData.range = $(container + " select[name='scanTime'] option:selected").val();
                //If a change was made to day
                if(rangeValue !== profileData.range) {
                    settingsChanged = true;
                    AMA.debug("Security Settings Save - Change made to scan range... Saving to history");
                }
            }

            profileData.realTimeScan = $(container + " input[name='realTimeScan']:checked").val();
            //If a change was made to real time scan
            if(realTimeScanValue !== profileData.realTimeScan) {
                settingsChanged = true;
                AMA.debug("Security Settings Save - Change made to real time scan... Saving to history");
            }

            profileData.mediaScan = $(container + " input[name='autoMediaScan']:checked").val();
            //If a change was made to media scan
            if(mediaScanValue !== profileData.mediaScan) {
                settingsChanged = true;
                AMA.debug("Security Settings Save - Change made to media scan... Saving to history");
            }

            profileData.trayNotification = $(container + " input[name='trayNotify']:checked").val();
            //If a change was made to tray notification
            if(trayNotificationValue !== profileData.trayNotification) {
                settingsChanged = true;
                AMA.debug("Security Settings Save - Change made to tray notification... Saving to history");
            }

            profileData.cloudAv = $(container + " input[name='cloudAV']:checked").val();
            //If a change was made to tray notification
            if(cloudAvValue !== profileData.cloudAv) {
                settingsChanged = true;
                AMA.debug("Security Settings Save - Change made to cloud AV... Saving to history");
            }

            profileData.airplaneModeLock = airplaneModeLockValue;  // this won't be changed by UI, just repeat it back

            //Validation
            var validationErrors = [];
            if(profileData.frequency !== "NEVER")
            {

                if(profileData.frequency === "WEEKLY" && profileData.day === "")
                {
                    validationErrors.push(".blank_day");
                    AMA.debug("Failed validation - Security - scan schedule");
                }

                if(profileData.range === "") {
                    validationErrors.push(".blank_range");
                    AMA.debug("Failed validation - Security - scan range");
                }
            }

            var returnObj = {};
            returnObj.profileData = profileData;
            returnObj.changes = changes;
            returnObj.settingsChanged = settingsChanged;
            returnObj.validationErrors = validationErrors;

            return returnObj;
        },
        saveSettings: function(profileData, profileChanged, callback)
        {
            // save Security and security settings
            if(profileChanged) {

                this.data.models[0].set({
                    "autoThreatScanFrequency": profileData.frequency,
                    "dayOfWeek": profileData.day,
                    "timeOfDay": profileData.range,
                    "realTimeScanEnabled": (profileData.realTimeScan==="true"),
                    "mediaScanEnabled": (profileData.mediaScan==="true"),
                    "trayNotificationEnabled": (profileData.trayNotification=="true"),
                    "cloudAvEnabled": (profileData.cloudAv=="true"),
                    "airplaneModeLockEnabled": (profileData.airplaneModeLock=="true")
                });

                AMA.debug("Security Settings sync data:"+JSON.stringify(this.data.models[0]));  // TODO: remove this debug log before production
                var options = {
                    url: AMA.models.scansettings.url,
                    success: callback,
                    callback:callback,
                    data:JSON.stringify(this.data.toJSON()[0])
                };

                this.data.sync("update", this.data.models[0], options);
            }
        },
        afterBackupSettingsSave: function(profileData, changes, section, data)
        {
            AMA.page.standardDialogs.hideloading();
            AMA.Util.switchLabel(".validation_text", ".settingsSaved", this.$el);
            this.$el.find(".after_save_message").removeClass('hidden');

        },
        saveSuccess: function() {
            AMA.page.standardDialogs.hideloading();
            AMA.Util.switchLabel(".validation_text", ".settingsSaved", this.$el);
            this.$el.find(".after_save_message").removeClass('hidden');

        },

        saveError: function() {
            AMA.page.standardDialogs.hideloading();
            AMA.page.standardDialogs.error("Unable To Contact services");
            AMA.debug("Ajax completed with errors");
        },

        successOrFailure: function(isSuccess) {
            AMA.page.standardDialogs.hideloading();
            if(isSuccess) {
                AMA.Util.switchLabel(".validation_text", ".settingsSaved", this.$el);
                this.$el.find(".after_save_message").removeClass('hidden');
            }
            else {
                AMA.page.standardDialogs.error("Unable To Contact services");
                AMA.debug("Ajax completed with errors");
            }
        }


    });
})();

/* Feedback */
(function () {
    AMA.namespace("view");

    var Feedback = AMA.view.Feedback = AMA.view.BaseView.extend();

    Feedback.TEMPLATE_ID = "feedback_template";
    Feedback.TEMPLATE_SRC = "";


    AMA.augment(Feedback.prototype, {
        render: function () {
            Feedback.__super__.render.apply(this);

            this.appRatingDialog = new AMA.view.AppRatingDialog({
                el: "#app_rating_dialog",
                parent: this,
                showTitle: false,
                showClose: false,
                showOk: false,
                showCancel: false,
                width: 370
            });

            this.shareFeedbackWizard = new AMA.view.ShareFeedbackWizard({
                el: "#share_feedback_dialog",
                parent: this,
                showTitle: false,
                showClose: false,
                showOk: false,
                showCancel: false,
                width: 760,
                height: 380
            });

            this.surveyDialog = new AMA.view.SurveyDialog({
                el: "#survey_dialog",
                parent: this,
                showTitle: false,
                showClose: false,
                showOk: false,
                showCancel: false,
                width: 650
            });
        },

        show: function () {},

        openAppRating: function (surveyId, appRatingUrl) {
            if (!this.appRatingDialog.isRendered) {
                var o = this;
                this.appRatingDialog.on(AMA.view.BaseView.EVENT.RENDERED, function () {
                    o.appRatingDialog.show(surveyId, appRatingUrl);
                });
                return;
            }

            // Show the App Rating dialog
            this.appRatingDialog.show(surveyId, appRatingUrl);
        },

        openSurvey: function (surveyType) {
            if (!this.surveyDialog.isRendered) {
                var o = this;
                this.surveyDialog.on(AMA.view.BaseView.EVENT.RENDERED, function () {
                    o.surveyDialog.show(surveyType);
                });
                return;
            }

            // Show the Survey dialog
            this.surveyDialog.show(surveyType);
        },

        openShareFeedback: function () {
            if (!this.shareFeedbackWizard.isRendered) {
                var o = this;
                this.shareFeedbackWizard.on(AMA.view.BaseView.EVENT.RENDERED, function () {
                    o.shareFeedbackWizard.show();
                });
                return;
            }

            // Show the Share Feedback dialog
            this.shareFeedbackWizard.show();
        }
    });
})();
/*! AppRatingDialog */
(function () {
    AMA.namespace("view");

    var AppRatingDialog = AMA.view.AppRatingDialog = AMA.view.Modal.extend();

    AppRatingDialog.TEMPLATE_ID = "app_rating_dialog_template";
    AppRatingDialog.TEMPLATE_SRC = "";

    AppRatingDialog.COOKIE_EXPIRY = 3650;
    AppRatingDialog.SESSION_ID = AMA.Util.guid();


    _.extend(AppRatingDialog.prototype, {
        events: {
            "click .close": "hideSurvey",
            "click #app_rating_dialog_rate_later": "remindMeLater",
            "click #app_rating_dialog_rate_never": "ratingNoThanks",
            "click #app_rating_dialog_rate_now" : "rateApp"
        },

        hideSurvey: function () {
            var eventMsg = {
                surveyId: this._surveyId,
                webUserExperienceSurveySessionId: AppRatingDialog.SESSION_ID,
                sessionId: AMA.config.sessionId,
                endpointId: AMA.config.endpointId,
                action: "close",
                timeStamp: new Date().getTime().toString()
            };

            AMA.ReportingManager.reportEvent(AMA.config.reportingEventTypes.webAppRatingCancel, eventMsg);

            this.hide();
        },

        remindMeLater: function () {
            var eventMsg = {
                surveyId: this._surveyId,
                webUserExperienceSurveySessionId: AppRatingDialog.SESSION_ID,
                sessionId: AMA.config.sessionId,
                endpointId: AMA.config.endpointId,
                action: "later",
                timeStamp: new Date().getTime().toString()
            };

            AMA.ReportingManager.reportEvent(AMA.config.reportingEventTypes.webAppRatingCancel, eventMsg);

            this.hide();
        },

        ratingNoThanks: function () {
            var eventMsg = {
                surveyId: this._surveyId,
                webUserExperienceSurveySessionId: AppRatingDialog.SESSION_ID,
                sessionId: AMA.config.sessionId,
                endpointId: AMA.config.endpointId,
                action: "never",
                timeStamp: new Date().getTime().toString()
            };

            AMA.ReportingManager.reportEvent(AMA.config.reportingEventTypes.webAppRatingCancel, eventMsg);

            //Set the Dismiss Survey flag as true
            if(this._surveyId == 10 || this._surveyId == 11){
                AMA.Util.setCookie("dismissSurvey", true, AppRatingDialog.COOKIE_EXPIRY);
            }

            this.hide();
        },

        rateApp: function () {
            //Set the Dismiss Survey flag as true
            if(this._surveyId == 10 || this._surveyId == 11){
                AMA.Util.setCookie("dismissSurvey", true, AppRatingDialog.COOKIE_EXPIRY);
            }

            var eventMsg = {
                surveyId: this._surveyId,
                webUserExperienceSurveySessionId: AppRatingDialog.SESSION_ID,
                sessionId: AMA.config.sessionId,
                endpointId: AMA.config.endpointId,
                timeStamp: new Date().getTime().toString()
            };

            AMA.ReportingManager.reportEvent(AMA.config.reportingEventTypes.webAppRatingGo, eventMsg);

            window.open(this._appRatingUrl,'_blank');
            this.hide();
        },

        show: function (surveyId, appRatingUrl) {
            this._surveyId = surveyId;
            this._appRatingUrl = appRatingUrl;

            var eventMsg = {
                surveyId: this._surveyId,
                webUserExperienceSurveySessionId: AppRatingDialog.SESSION_ID,
                sessionId: AMA.config.sessionId,
                endpointId: AMA.config.endpointId,
                timeStamp: new Date().getTime().toString()
            };

            AMA.ReportingManager.reportEvent(AMA.config.reportingEventTypes.webAppRatingPrompt, eventMsg);

            AppRatingDialog.__super__.show.apply(this, arguments);
        }
    });
    
})();
/* ShareFeedbackWizard */
(function () {
    AMA.namespace("view");

    var ShareFeedbackWizard  = AMA.view.ShareFeedbackWizard  = AMA.view.Wizard.extend();

    ShareFeedbackWizard.TEMPLATE_ID = "share_feedback_dialog_template";
    ShareFeedbackWizard.TEMPLATE_SRC = "";

    ShareFeedbackWizard.ENDPOINT = "userRatings";


    AMA.augment(ShareFeedbackWizard.prototype, {
        events : {
            "click .fb_radio_submit_btn": "_validateFeedback",
            "click .fb_text_submit_btn": "_validateReason",
            "click .close": "_reset",
            "click .wizard_close": "_reset"
        },

        _validateFeedback : function() {
            var validationError = this.$el.find("#feedback_validation_error"),
                checkedRating = this.$el.find("input[name='fb_rate']:checked");

            validationError.addClass("hide");

            if (checkedRating.length > 0) {
                // Get the rating
                this._rating = checkedRating.val();
            }
            else {
                // No rating selected; show error message
                validationError.removeClass("hide");
                validationError.addClass("show");
                return;
            }

            if (this._rating) {
                this.$el.find(".wiz_step").removeClass("current");
                this.$el.find(".step2.wiz_step").addClass("current");
            }
        },

        _validateReason : function() {
            var validationError = this.$el.find("#feedback_reason_error"),
                feedbackReasonValue = $.trim(this.$el.find("textarea[name='fb_reason']").val());
            
            validationError.addClass("hide");

            if (feedbackReasonValue.length > 0) {
                // Get the feedback reason
                this._ratingReason = feedbackReasonValue;
            }
            else {
                // No feedback reason provided; show error message
                validationError.removeClass("hide");
                validationError.addClass("show");
                return;
            }

            if (this._ratingReason) {
                this.hide();

                // Show loading dialog
                var msg = $("#msg_loadingdialog").html();
                AMA.page.standardDialogs.loading(msg);

                this._sendFeedback();
            }
        },

        _sendFeedback : function() {
            // Validate Share Feedback capability
            if (!AMA.models.capabilities.canCreate("sendFeedbackRate")) {
                AMA.error("User has no capability to send Share Feedback data");
                // Close the dialog
                this._reset();
                return;
            }

            var url = AMA.config.apiHostUrl + "/" + ShareFeedbackWizard.ENDPOINT + "?" +
                        $.param({
                            devId: AMA.config.devId,
                            endpointId: AMA.config.endpointId,
                            authToken: AMA.config.authToken
                        }),
                data = {
                    name: AMA.models.dashboardData.models[0].get("emailAddress"),
                    phoneNumber: AMA.models.dashboardData.models[0].get("phoneNumber"),
                    platformName: AMA.models.endpoints.models[0].get("platformfriendlyname"),
                    platformId: AMA.models.endpoints.models[0].get("platform"),
                    rate:this._rating,
                    reason: this._ratingReason
                },
                request = AMA.Util.createCORSRequest("POST", url),
                o = this;

            if (request) {
                request.onload = function () {
                    o._callbackForFeedback();
                };
                request.onerror = function (jqXHR, error, errorThrown) {
                    AMA.ActionManager._onAjaxError(jqXHR, error, errorThrown);
                };

                request.send(JSON.stringify(data));
            }
        },
        
        _callbackForFeedback : function() {
            this.$el.find(".wiz_step").removeClass("current");
            this.$el.find(".step3.wiz_step").addClass("current");

            AMA.page.standardDialogs.hideloading();
            this.show();
        },

        _reset : function() {
            // Empty form fields
            this.$el.find("textarea[name='fb_reason']").val("");
            this.$el.find("input[name='fb_rate']").prop('checked', false);
            this.$el.find("label.btn").removeClass("active");

            // Reset wizard back to step 1
            this.$el.find(".wiz_step").removeClass("current");
            this.$el.find(".step1.wiz_step").addClass("current");

            // Hide all validation errors
            this.$el.find("#feedback_validation_error").removeClass("show").addClass("hide");
            this.$el.find("#feedback_reason_error").removeClass("show").addClass("hide");

            // Hide the dialog
            this.hide();
        }
    });
})();
/*! SurveyDialog */
(function () {
    AMA.namespace("view");

    var SurveyDialog = AMA.view.SurveyDialog = AMA.view.Modal.extend();

    SurveyDialog.TEMPLATE_ID = "survey_dialog_template";
    SurveyDialog.TEMPLATE_SRC = "";

    SurveyDialog.ENDPOINT = "surveyQuestions";
    SurveyDialog.COOKIE_EXPIRY = 3650; // in days, for AMA.Util.setCookie
    SurveyDialog.SESSION_ID = AMA.Util.guid();
    SurveyDialog.SYNC_EVENT_TYPES = [
        "sync-manual-success",
        "auto-sync-opt-out"
    ];


    _.extend(SurveyDialog.prototype, {
        events: {
            "click #survey_close " : "hideSurvey",
            "click #close" : "hideSurvey",
            "click .submit" : "_submit",
            "click .cancel" : "_cancel",
            "keyup #survey_text_textarea" : "_checkCommentLength",
            "click #survey_stars .ratingdiv span" : "_setRatingValue"
        },

        /** 
         * Opens the Survey dialog
         *
         * @param {String} surveyType: Determines type of survey dialog to be displayed
         * 
         */
        show: function (surveyType) {
            // Validation to check if a survey type is specified
            if (!surveyType) {
                AMA.error("Survey: No survey type specified. Operation will be aborted.");
                return;
            } else {
                //SurveyDialog.__super__.show.apply(this, arguments)
                this._surveyType = surveyType;
                AMA.debug("Survey: Showing survey dialog of type: "+  this._surveyType);

                $("#survey_step1").show();
                $("#survey_send_feedback").show();
                $("#survey_step2").hide();
                $("#sv_text_close_div").hide();
                this._fetchSurveyData();
            }
        },

        // Retrieve survey details from server
        _fetchSurveyData: function () {
            // Validate capability to read survey questions
            if (!AMA.models.capabilities.canRead("surveyQuestions")) {
                AMA.error("Survey: Account has no capability to retrieve survey questions");
                return;
            }

            var url = AMA.config.apiHostUrl + "/" + SurveyDialog.ENDPOINT + "?" +
                        $.param({
                            devId: AMA.config.devId,
                            endpointId: AMA.config.endpointId,
                            authToken: AMA.config.authToken,
                            surveyEvent: this._surveyType
                        }),
                request = AMA.Util.createCORSRequest("GET", url),
                o = this;

            if (request) {
                request.onload = function () {
                    try {
                        var response = JSON.parse(this.responseText);
                    }
                    catch (e) {
                        AMA.error("Survey: Response not JSON");
                    }

                    if (response) {
                        o._init(response);
                    }
                };
                request.onerror = function (jqXHR, error, errorThrown) {
                    AMA.ActionManager._onAjaxError(jqXHR, error, errorThrown);
                };

                AMA.debug("Survey: Fetching survey of type: " + this._surveyType);
                request.send();
            }
        },

        _init: function (response) {
            if (this._surveyType != response.event) {
                AMA.error("Survey: Response is not the expected for type " + this._surveyType);
                return;
            }
            else {
                if ($.inArray(this._surveyType, SurveyDialog.SYNC_EVENT_TYPES) >= 0) {
                    // Proceed to build survey dialog if sync event type
                    this._promptSurvey(response);
                } else {
                    var suffix = this._surveyType === "location-success" ? "Locate" : "HealthScan",
                        firstTriggerName = "firstTrigger" + suffix,
                        counterName = "counterOfSuccessful" + suffix,
                        isExisting = this._isCookieExisting("firstTrigger" + suffix),
                        firstTriggerCookie = response.triggerConditionFirst,
                        counterCookie = 1,
                        repetitions = response.triggerConditionValue,
                        expectedCount = parseInt(AMA.Util.getCookie(counterName));

                    if (isExisting) {
                        AMA.debug("Survey: Updating cookies for survey type: " + this._surveyType);
                        firstTriggerCookie = parseInt(AMA.Util.getCookie(firstTriggerName));
                        counterCookie = parseInt(AMA.Util.getCookie(counterName)) + 1;
                    } else {
                        AMA.debug("Survey: Creating new cookies for survey type: " + this._surveyType);
                        AMA.Util.setCookie(firstTriggerName, firstTriggerCookie, SurveyDialog.COOKIE_EXPIRY);
                    }

                    // Update the counter cookie
                    AMA.Util.setCookie(counterName, counterCookie, SurveyDialog.COOKIE_EXPIRY);

                    if (!firstTriggerCookie && !repetitions) {
                        if (expectedCount > firstTriggerCookie) {
                            firstTriggerCookie = parseInt(AMA.Util.getCookie(firstTriggerName)) + repetitions;
                            AMA.Util.setCookie(firstTriggerName, firstTriggerCookie, SurveyDialog.COOKIE_EXPIRY);
                        }
                    }

                    if (counterCookie === firstTriggerCookie) {
                        AMA.debug("Survey: Validated trigger values. Launching the survey.");
                        this._promptSurvey(response);
                    } else {
                        return false;
                    }
                }
            }
        },

        _promptSurvey: function (response) {
            var appRatingSurvey = false,
                dismissSurvey = false,
                eventMsg = {};

            // Build survey only on a valid response
            if (response && !response.failures && response.id) {
                AMA.debug("Survey: Building survey id=" + response.id);

                this._surveyId = response.id;
                this._questionList = response.questions;
                this._rating = null;

                $("#survey_stars").hide();
                $("#survey_text").hide();
                for (var key in this._questionList) {
                    switch(this._questionList[key].type) {
                        case "stars" :
                            this.$el.find("#survey_stars_rating1").removeClass("starratingselected").addClass("starrating");
                            this.$el.find("#survey_stars_rating2").removeClass("starratingselected").addClass("starrating");
                            this.$el.find("#survey_stars_rating3").removeClass("starratingselected").addClass("starrating");
                            this.$el.find("#survey_stars_rating4").removeClass("starratingselected").addClass("starrating");
                            this.$el.find("#survey_stars_rating5").removeClass("starratingselected").addClass("starrating");
                            $("#survey_stars").show();
                            $("#survey_stars .survey_error").hide();
                            this.$el.find("#survey_stars .surveyquestion").html(this._questionList[key].label);
                            break;
                        case "text" :
                            $("#survey_text").show();
                            $("#survey_text .survey_error").hide();
                            this._textQuestionMinLength = this._questionList[key].minLength || 1024;
                            this._textQuestionMaxLength = this._questionList[key].maxLength || 1024;
                            this.$el.find("#survey_text .surveyquestion").html(this._questionList[key].label);
                            break;
                        case "appRating" :
                            appRatingSurvey = true;
                            this._appRatingUrl = this._questionList[key].label;
                            break;
                        default:
                    }
                }

                if (this._getDismissSurvey("dismissSurvey") == "true") {
                    dismissSurvey = true;
                }

                if (appRatingSurvey && !dismissSurvey) {
                    this.parent.openAppRating(this._surveyId, this._appRatingUrl);
                }
                else {
                    AMA.debug("Survey: Popup ready");
                    eventMsg = {
                        surveyId : this._surveyId,
                        sessionId : AMA.config.sessionId,
                        endpointId : AMA.config.endpointId,
                        webUserExperienceSurveySessionId : SurveyDialog.SESSION_ID,
                        timestamp : new Date().getTime().toString()
                    };
                    
                    AMA.debug("Survey-Reporting: Survey prompt to user, logging the reporting event." );
                    AMA.ReportingManager.reportEvent(AMA.config.reportingEventTypes.webuserexperiencesurveyprompt, eventMsg);
                }
            }

            if (!appRatingSurvey) {
                SurveyDialog.__super__.show.apply(this, arguments); 
            }
        },

        _getDismissSurvey: function(key) {
            var cookies = document.cookie.split("; ");

            for(var i = 0; i < cookies.length; i++) {
                var item = cookies[i].split("=");
                if(item[0] === key) {
                    return item[1];
                }
            }

            return null;
        },

        // Set the star rating selected by the user
        _setRatingValue: function (event) {
            var source = event.target || event.srcElement,
                rating = source.id.split("survey_stars_rating")[1];

            this._rating = rating;
            this.$el.find("#survey_stars .starratingselected").removeClass("starratingselected").addClass("starrating");
            switch (rating) {
                case "5" : this.$el.find("#survey_stars_rating5").removeClass("starrating").addClass("starratingselected");
                case "4" : this.$el.find("#survey_stars_rating4").removeClass("starrating").addClass("starratingselected");
                case "3" : this.$el.find("#survey_stars_rating3").removeClass("starrating").addClass("starratingselected");
                case "2" : this.$el.find("#survey_stars_rating2").removeClass("starrating").addClass("starratingselected");
                case "1" : this.$el.find("#survey_stars_rating1").removeClass("starrating").addClass("starratingselected");
                default :
            }
        },

        hideSurvey: function () {
            if (!this._isSubmitted) {
                var eventMsg ={
                    surveyId: this._surveyId,
                    sessionId: AMA.config.sessionId,
                    endpointId: AMA.config.endpointId,
                    webUserExperienceSurveySessionId : SurveyDialog.SESSION_ID,
                    timestamp: new Date().getTime().toString()
                };

                AMA.debug("Survey-Reporting:  User canceled Survey, logging the reporting event." +  this._surveyType );
                AMA.ReportingManager.reportEvent(AMA.config.reportingEventTypes.webuserexperiencesurveycancel, eventMsg);
            }

            this._isSubmitted = false;
            this.hide();
        },

        // Handler when "No Thanks" button is clicked
        _cancel: function () {
            // Set the Dismiss Survey Flag as true
            if (this._surveyId == 10 || this._surveyId == 11) {
                AMA.Util.setCookie("dismissSurvey", true, SurveyDialog.COOKIE_EXPIRY);
            }

            // if the user cancels the survey Log that too in fourspeed reporting table.
            this.hideSurvey();
        },

        // Survey submission handler
        _submit: function () {
            // Validation to make sure there is a question list
            if (!this._questionList) {
                AMA.error("Survey: Cannot process submission as there is no question list");
                return;
            }

            var validationError = false,
                question = {},
                response = {},
                eventMsg = {},
                o = this;

            for (var key in this._questionList) {
                question = this._questionList[key];

                switch (question.type) {
                    case "stars":
                        if (question.required && !this._rating) {
                            AMA.error("Survey: Rating required but none provided");
                            validationError = true;
                            $("#survey_stars .survey_error").show();
                        }
                        else {
                            response[key] = this._rating;
                        }

                        break;

                    case "text":
                        // Get comments, if any
                        this._reason = $("#survey_text_textarea").val();

                        // Comment validation
                        if (question.required && this._reason.length == 0) {
                            AMA.error(" Survey: Comment required but none provided");
                            $("#survey_text .survey_error_no_comment").show();
                            validationError = true;
                        } else if (question.required && this._reason.length == 0) {
                            if (this._reason.length < parseInt(question.minLength)) {
                                AMA.error("Survey: Comment length is short of minimum required.");
                                $("#survey_text .survey_error_no_comment").show();
                                $("#survey_text .survey_error_min_length").show();
                                $("#survey_text .survey_text_min_chars").html(question.minLength);
                                $("#survey_text .survey_text_min_chars").show();
                            } else {
                                response[key] = this._reason;
                            }
                        } else {
                            response[key] = this._reason;
                        }

                        break;
                };
            }

            // Submit answers if validation successful
            if (!validationError) {
                AMA.debug("Survey: Response validation passed");
                
                //Set the Dismiss Survey flag as true for two types of surveys
                if (this._surveyId == 10 || this._surveyId == 11) {
                   AMA.Util.setCookie("dismissSurvey", true, SurveyDialog.COOKIE_EXPIRY);
                }

                if (AMA.models.capabilities.canCreate("reportEvents")) {
                    eventMsg = {
                        surveyId: this._surveyId,
                        mdn: AMA.models.endpoints.toJSON()[0].name,
                        webUserExperienceSurveySessionId : SurveyDialog.SESSION_ID,
                        responses: response,
                        timestamp: new Date().getTime().toString()
                    };

                    AMA.debug("Survey: Submitting survey responses");
                    AMA.ReportingManager.reportEvent(
                        AMA.config.reportingEventTypes.webuserexperiencesurveysubmit,
                        eventMsg,
                        o._confirmSubmission
                    );

                    this._isSubmitted = true;
                }
                else {
                    AMA.error("Survey: Account does not have permission to submit survey responses");
                    return;
                }
            }

            return false;
        },

        // If submit successful, show acknowledgement
        _confirmSubmission: function (success) {
            if (success) {
                $("#survey_step1").hide();
                $("#survey_send_feedback").hide();
                $("#survey_step2").show();
                $("#sv_text_close_div").show();                
            }
            else {
                this.hide();
            }
        },

        _isCookieExisting: function(key) {
            var cookie = document.cookie,
                isExisting = false,
                cookieContent = null;

            for (var i = 0; i < (cookie.length - key.length); i++) {
                cookieContent = cookie.substr(i, key.length);
                
                if(cookieContent === key) {
                    isExisting = true;
                    break;
                }
            }

            return isExisting;
        },

        // Limits comment length to the specified value
        _checkCommentLength: function () {
            var textarea = this.$el.find("#survey_text_textarea"),
                commentLength = textarea.val().length;

            if (commentLength > this._textQuestionMaxLength) {
                textarea.val(textarea.val().substr(this._textQuestionMinLength, this._textQuestionMaxLength));
            }
        }
    });
    
})();
/*! accountStatusToolset */
(function () {

    AMA.namespace("view");

    var AccountStatusToolset = AMA.view.AccountStatusToolset = AMA.view.BaseView.extend();

    AccountStatusToolset.TEMPLATE_ID = "account_status_toolset_template";
    AccountStatusToolset.TEMPLATE_SRC = "";

    AccountStatusToolset.CHECKS = [
        "redx",
        "greentick"
    ];

    AccountStatusToolset.LOCKS = [
        "unlocked",
        "locked"
    ];

    AccountStatusToolset.ENABLED = [
        "Disabled",
        "Enabled"
    ];


    _.extend(AccountStatusToolset.prototype, {

        initialize: function () {
            AccountStatusToolset.__super__.initialize.apply(this, arguments);
        },


        _processData: function(item) {
            item.is_lock_enabled = AccountStatusToolset.ENABLED[item.current_lockstatus];
            item.is_locaction_enabled = AccountStatusToolset.ENABLED[item.locationcheck_on];
            item.is_admin_enabled = AccountStatusToolset.ENABLED[item.android_device_admin];

            item.android_device_admin = AccountStatusToolset.CHECKS[item.android_device_admin];
            item.locationcheck_on = AccountStatusToolset.CHECKS[item.locationcheck_on];

            item.current_lockstatus = AccountStatusToolset.LOCKS[item.current_lockstatus];
            return item;
        },


        render: function () {
            AccountStatusToolset.__super__.render.apply(this);

        },


        _afterRender: function() {
            if(AMA.models.endpoints.models[0].get("platform").indexOf("iOS") > -1) {
                this.$el.find(".android_device_admin").hide();
                this.$el.find(".current_lockstatus").hide();
                this.$el.find(".account_active").show();
                // Hide "Location Checks" from the toolset when iPhone app version has no 
                // read capability for location settings
                if(!AMA.models.capabilities.canRead("eventSettings")) {
                	this.$el.find(".locationcheck_on").hide();
                }
            } else {
                this.$el.find(".account_active").hide();
            }
        }
    });


})();


/*! AlarmToolset */
(function () {

    AMA.namespace("view");

    var AlarmToolset = AMA.view.AlarmToolset = AMA.view.BaseView.extend();

    // NOTE: beginning prefix of *_tool_template prefix must match string in DataTab.TOOLBAR
    AlarmToolset.TEMPLATE_ID = "alarm_toolset_template";
    AlarmToolset.TEMPLATE_SRC = "";
    
    AlarmToolset.CSS = {
        CONNECTING: "connecting",
        SOUNDING: "sounding",
        UNSUCCESSFUL: "unsuccessful",
        SUCCESS: "success",
        NORMAL: "normal"
    };

    
    _.extend(AlarmToolset.prototype, {
    
    	events: {
            "click .button_alarm": "alarm"
        },
        
        
        initialize: function () {
            AlarmToolset.__super__.initialize.apply(this, arguments);

            var ActionManager = AMA.ActionManager,
            	BaseWorkflow = AMA.workflow.BaseWorkflow,
            	AlarmWorkflow = AMA.workflow.AlarmWorkflow;
        
            var workflow = new AlarmWorkflow();
            
            ActionManager.define("alarm", workflow);
                        
            workflow.on(BaseWorkflow.EVENT.STATE_CHANGED, function (event) {
            	switch (event.state) {
            		case BaseWorkflow.STATE.INITIALIZING:
            			AMA.debug("Alarm Toolset has switched the Alarm Button state to 'connecting'; countdown initialized");
            			
            			this.toggleDisplay(AlarmToolset.CSS.CONNECTING);
                        break;
            			
            		case AlarmWorkflow.STATE.SOUNDING:	
            			AMA.debug("Alarm Toolset has switched the Alarm Button state to 'sounding'");
            			
                    	this.toggleDisplay(AlarmToolset.CSS.SOUNDING);
            			break;
            			
            		default:
            	}
            }, this);
            
            workflow.on(BaseWorkflow.EVENT.FINISHED, function (event) {
            	switch (event.result) {
            		case BaseWorkflow.RESULT.SUCCESSFUL:
                        this.toggleDisplay(AlarmToolset.CSS.SUCCESS);                     
            			break;
            		default:
                        this.toggleDisplay(AlarmToolset.CSS.UNSUCCESSFUL);
            	}
            }, this);
            
            // Event handler for the countdown
            var o=this;
            workflow.on(BaseWorkflow.EVENT.COUNTDOWN_TICK, function (event) {
                 $(".alarm_toolset_countdown").html(event.remaining);
                 o._timeRemaining=event.remaining;
            }, this);

        },
        

        toggleDisplay: function(action) {
            this.$el.find("." + action).show().siblings(".button_alarm").hide();
        },
        
        
        render: function () {
            AlarmToolset.__super__.render.apply(this);
        },
        
        
        alarm: function() {
            AMA.ActionManager.start("alarm");
        }

    });


})();


/*! EndpointToolset */
(function () {

    AMA.namespace("view");

    var EndPointToolset = AMA.view.EndPointToolset = AMA.view.BaseView.extend();

    EndPointToolset.TEMPLATE_ID = "endpoint_toolset_template";
    EndPointToolset.TEMPLATE_SRC = "";

    _.extend(EndPointToolset.prototype, {
    	
    	events: {
    		"click .newphone a": "showNewPhonePopup"
    	},

        initialize: function () {
            EndPointToolset.__super__.initialize.apply(this, arguments);
			
        },

        render: function () {
            EndPointToolset.__super__.render.apply(this);
			
			$(".lp_image_default").error(function(){
				$(this).attr("src", "img/genericphone_small.png");
			});
        },
        
        _processData: function (item) {
        	var platform = AMA.config.apiHostUrl + "/deviceImages?" + 
				$.param({
					size: "small",
					platformName: item.platform,
					devId: AMA.config.devId
				});
				
			item.platformImage = item.platform ? platform : "img/genericphone_small.png";
			
			// Here the endpoint name is the mobile number, so we format it as such
        	item.name = AMA.Util.formatPhone(item.name);
        	
        	return item;
        },
        
        showNewPhonePopup: function () {
			var options = {
				id: "newPhone",
				url: "/web/new_phone.html?title=newPhone",
				width: 730,
				height: 390			
			};
			
			AMA.Util.openPopupWindow(options);
        }
        
    });


})();


/*! LearnMore */
(function () {

    AMA.namespace("view");

    var LearnMore = AMA.view.LearnMore = AMA.view.Dialog.extend();

    LearnMore.TEMPLATE_ID = "Learn_More_template";
    LearnMore.TEMPLATE_SRC = "";
    
    LearnMore.WIDTH = 650;
    LearnMore.HEIGHT = "auto";

    _.extend(LearnMore.prototype, {

    	initialize: function () {

    		// Set the width and height prior to initialization
            this.options.width = LearnMore.WIDTH;
            this.options.height = LearnMore.HEIGHT;
            LearnMore.__super__.initialize.apply(this, arguments);
    	},

        show: function () {
            this.$el.find("." + arguments[0]).removeClass("hidden").siblings("div").addClass("hidden");
        	LearnMore.__super__.show.apply(this, arguments);
        }
    });

})();
/*! LocateToolset */
(function () {

    AMA.namespace("view");

    /**
	 * Button Toolset for Locate
	 *
	 * @class LocateToolset
	 * @namespace view
	 * @extends AMA.view.BaseView
	 * @constructor
	 */
    var LocateToolset = AMA.view.LocateToolset = AMA.view.BaseView.extend();


    /**
	 * ID of the template
	 *
	 * @property TEMPLATE_ID
	 * @type string
	 * @static
	 * @final
	 */
    LocateToolset.TEMPLATE_ID = "locate_toolset_template";


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
    LocateToolset.TEMPLATE_SRC = "";


    /**
     * Defined CSS for every state
     *
     * @property CSS
     * @type object
     * @static
     * @final
     */
    LocateToolset.CSS = {
        CONNECTING: "connecting",
        REFINING: "refining",
        UNSUCCESSFUL: "unsuccessful",
        SUCCESS: "success",
        NORMAL: "normal",
        CANCELLED: 'cancelled'
    };


    _.extend(LocateToolset.prototype, {

    	events: {
            "click .button_locate.normal": "locate",
            "click .button_locate.outcome.success": "locate",
            "click .button_locate.outcome.unsuccessful": "locate",
            "click .button_locate.outcome.cancelled": "locate"            	
        },


        /**
         * Initializes toolset view
         *
         * @override
         * @method initialize
         */
        initialize: function () {
        	LocateToolset.__super__.initialize.apply(this, arguments);

            var ActionManager = AMA.ActionManager,
            	BaseWorkflow = AMA.workflow.BaseWorkflow,
            	LocateWorkflow = AMA.workflow.LocateWorkflow;

            var workflow = new LocateWorkflow();

            ActionManager.define("locate", workflow);

            workflow.on(BaseWorkflow.EVENT.STATE_CHANGED, function (event) {
            	switch (event.state) {
            		case BaseWorkflow.STATE.INITIALIZING:
            			this.toggleDisplay(LocateToolset.CSS.CONNECTING);
                        break;
            		case LocateWorkflow.STATE.REFINING:
                    	this.toggleDisplay(LocateToolset.CSS.REFINING);
            			break;
            		default:
            	}
            	AMA.debug("Locate Toolset has switched the Locate Button state to '" + workflow.getStateName(event.state) + "' state");
            }, this);

            workflow.on(BaseWorkflow.EVENT.FINISHED, function (event) {
            	switch (event.result) {
            		case BaseWorkflow.RESULT.SUCCESSFUL:
                        this.toggleDisplay(LocateToolset.CSS.SUCCESS);
						
						// attempts to launch the survey dialog
						if (AMA.config.enableSurveys)	{
							AMA.page.openSurvey("location-success");
						}
            			break;
            		case BaseWorkflow.RESULT.FAILED:
                        this.toggleDisplay(LocateToolset.CSS.UNSUCCESSFUL);                        
            			break;
            		case BaseWorkflow.RESULT.CANCELLED:
         	 	 	 	this.toggleDisplay(LocateToolset.CSS.CANCELLED);
         	 	 	 	break;	
            		default:
            	}
            	$(".locate_toolset_countdown").html("03:00");
            	AMA.debug("Locate toolset finished with result of '" + workflow.getResultName(event.result) + "'");
            }, this);

            // Event handler for the countdown
            var o=this;
            workflow.on(BaseWorkflow.EVENT.COUNTDOWN_TICK, function (event) {
            	$(".locate_toolset_countdown").html(event.remaining);
            	 o._timeRemaining=event.remaining;
            }, this);

        },


        /**
         * toggles the given css class name
         *
         * @method toggleDisplay
         * @param action
         */
        toggleDisplay: function(action) {
            this.$el.find("." + action).show().siblings(".button_locate").hide();
        },


        /**
         * Renders ths toolset view
         *
         * @override
         * @method render
         */
        render: function () {
        	LocateToolset.__super__.render.apply(this);
        },


        /**
         * Starts the Locate workflow
         *
         * @method locate
         */
        locate: function(e) {
            e.stopPropagation();
            AMA.ActionManager.start("locate");
        },


        _afterRender: function() {
            if(AMA.models.endpoints.models[0].get("platform").indexOf("iOS") === 0) {
                this.$el.find("#button_locate_normal .tooltip").html(
                    this.$el.find(".normal_iPhone_tooltip").html()
                );
            }
        }

    });


})();


/*! LockToolset */
(function () {

    AMA.namespace("view");

    var LockToolset = AMA.view.LockToolset = AMA.view.BaseView.extend();

    // NOTE: beginning prefix of *_tool_template prefix must match string in LocateTab.TOOLBAR
    LockToolset.TEMPLATE_ID = "lock_toolset_template";
    LockToolset.TEMPLATE_SRC = "";
    
    LockToolset.CSS = {
        CONNECTING: "connecting",
        UNSUCCESSFUL: "unsuccessful",
        SUCCESS: "locked",
        NORMAL: "normal"
    };
	
	LockToolset.STATUS = "";

    
    _.extend(LockToolset.prototype, {
    
    	events: {
            "click .button_lock.normal, .button_lock.unsuccessful .tryagain": "lock"
        },
        
        
        initialize: function () {
            LockToolset.__super__.initialize.apply(this, arguments);

            var ActionManager = AMA.ActionManager,
            	BaseWorkflow = AMA.workflow.BaseWorkflow,
            	LockWorkflow = AMA.workflow.LockWorkflow;
        
            var workflow = new LockWorkflow();
            
            ActionManager.define("lock", workflow);
                        
            workflow.on(BaseWorkflow.EVENT.STATE_CHANGED, function (event) {
            	switch (event.state) {
            		case BaseWorkflow.STATE.INITIALIZING:
            			AMA.debug("Lock Toolset has switched the Lock Button state to 'connecting'; countdown initialized");
            			
            			this.toggleDisplay(LockToolset.CSS.CONNECTING);
                        break;
            			
            		default:
                        break;
            	}
            }, this);
            
            workflow.on(BaseWorkflow.EVENT.FINISHED, function (event) {
            	switch (event.result) {
            		case BaseWorkflow.RESULT.SUCCESSFUL:
                        this.toggleDisplay(LockToolset.CSS.SUCCESS);                     
            			break;
            		default:
                        this.toggleDisplay(LockToolset.CSS.UNSUCCESSFUL);
            	}
            }, this);
            
            // Event handler for the countdown
            var o=this;
            workflow.on(BaseWorkflow.EVENT.COUNTDOWN_TICK, function (event) {
                 $("#lock_toolset_countdown").html(event.remaining);
                 o._timeRemaining=event.remaining;
            }, this);
            Backbone.globalEvent.on("DeviceSettingChanged",function(){
            	if(AMA.models.devicesettings.models.length > 0 && AMA.models.devicesettings.models[0].get("current_lockstatus")){
                   	o.toggleDisplay(LockToolset.CSS.SUCCESS);
                   }
            	else{
            		o.toggleDisplay(LockToolset.CSS.NORMAL);
            	}
            });
			
        },


		 _processData: function(item) {
			this.STATUS = item.current_lockstatus;
			
            return item;
        },


        toggleDisplay: function(action) {
            this.$el.find("." + action).show().siblings(".button_lock").hide();
        },
        
        
        render: function () {
            LockToolset.__super__.render.apply(this);
		
			switch (this.STATUS) {
				case 1:
            		AMA.debug("Lock Toolset has switched the Lock Button state to 'locked'");
            		this.toggleDisplay(LockToolset.CSS.SUCCESS);
            	
                    break;
            		
            	default:
					this.toggleDisplay(LockToolset.CSS.NORMAL);
            }
		},
        
        
        lock: function() {
            AMA.ActionManager.start("lock");
        }

    });


})();


/*! SecurePhoneToolset */
(function () {
    AMA.namespace("view");

    var SecurePhoneToolset = AMA.view.SecurePhoneToolset = AMA.view.BaseView.extend();

    SecurePhoneToolset.TEMPLATE_ID = "securephone_toolset_template";
    SecurePhoneToolset.TEMPLATE_SRC = "";
    
    SecurePhoneToolset.CSS = {
        CONNECTING: "connecting",
        UNSUCCESSFUL: "unsuccessful",
        ANNOUNCING: "announcing",
        RETRYING: "retrying",
        NORMAL: "normal"
    };


    _.extend(SecurePhoneToolset.prototype, {
        events: {
            "click .button_securephone.normal": "_showStep1Dialog",
            "click .button_securephone.connecting, .button_securephone.announcing, .button_securephone.retrying": "_showStep2Dialog"
        },

        workflow: null,

        initialize: function () {
            SecurePhoneToolset.__super__.initialize.apply(this);

            this.workflow = new AMA.workflow.SecurePhoneWorkflow();
            AMA.ActionManager.define("secure", this.workflow);
        },

        start: function (options) {
            //this.workflow.doStart(options);
            AMA.ActionManager.start("secure", options);
        },

        /**
         * Changes button state of the toolset
         *
         * @param {String} action: Name of the button state to be displayed
         * 
         */
        toggleDisplay: function (action) {
            this.$el.find("." + action).show().siblings(".button_securephone").hide();
        },

        render: function () {
            SecurePhoneToolset.__super__.render.apply(this);

            // Create the Secure Phone dialog
            this.securePhoneDialog = new AMA.view.SecurePhoneDialog({
                el: "#securephonedialog",
                width: 670,
                parent: this,
                hidden: true,
                endpoint: AMA.models.endpoints
            });
        },

        _showStep1Dialog: function () {
            this.securePhoneDialog.show("step1");
        },

        _showStep2Dialog: function () {
            this.securePhoneDialog.show("step2");
        }
    });
})();
/*! StorageCapacityToolset */
(function () {

    AMA.namespace("view");

    var StorageCapacityToolset = AMA.view.StorageCapacityToolset = AMA.view.BaseView.extend();

    StorageCapacityToolset.TEMPLATE_ID = "storage_capacity_toolset_template";
    StorageCapacityToolset.TEMPLATE_SRC = "";


    _.extend(StorageCapacityToolset.prototype, {

        initialize: function () {
            StorageCapacityToolset.__super__.initialize.apply(this, arguments);
            AMA.models.photos.on("reset", function() {
                this.data.fetch();
            }, this);
            AMA.models.trash.on("reset", function() {
                this.data.fetch();
            }, this);
            AMA.models.videos.on("reset", function() {
                this.data.fetch();
            }, this);
        },


        _refetch: function() {
            this.data.fetch();
        },


        render: function () {
            StorageCapacityToolset.__super__.render.apply(this);
        },

        
        _processData: function(item) {
            var data = item || {};

            data.storageLimit = parseInt(item.totalCapacity || 2147483648);
            data.ImageSize = parseInt(item.photosUsedCapacity || 0);
            data.VideoSize = parseInt(item.videosUsedCapacity || 0);
            data.TrashSize = parseInt(item.trashUsedCapacity || 0);

            data.ImageUse = (data.ImageSize * 100) / data.storageLimit;
            data.VideoUse = (data.VideoSize * 100) / data.storageLimit;
            data.TrashUse = (data.TrashSize * 100) / data.storageLimit;

            data.totalUsed = data.ImageSize + data.VideoSize + data.TrashSize;

            return data;
        }
    });


})();


/*! SyncDialog */
(function () {

    AMA.namespace("view");

    var SyncDialog = AMA.view.SyncDialog = AMA.view.Modal.extend();

    SyncDialog.TEMPLATE_ID = "sync_dialog_template";
    SyncDialog.TEMPLATE_SRC = "";
    
    SyncDialog.WIDTH = 650;
    SyncDialog.HEIGHT = "auto";
    SyncDialog.syncTriggeredFrom="";


    _.extend(SyncDialog.prototype, {

    	events: {
    		"click .modal-footer .btn_sync ": "doSync",
    		"click .modal-footer .btn_cancel": "hide",
    		"click a.syncSettingsDialog": "openBackupTab"
    	},


    	initialize: function () {

    		// Set the width and height prior to initialization
            this.options.width = SyncDialog.WIDTH;
            this.options.height = SyncDialog.HEIGHT;
            SyncDialog.syncTriggeredFrom="";
            SyncDialog.__super__.initialize.apply(this, arguments);
            
            // TODO: Pass contacts/photos/videos count to the dialog
              
            
    	},
    	

        _setupEvents: function () {

        },
        

        show: function (type) {

			//this.$el.parent().addClass("syncbuttonwidth");
        	SyncDialog.syncTriggeredFrom=type || SyncDialog.syncTriggeredFrom;
        	// If the models have not been fetched, fetch them first.
        	if (!AMA.models.contacts.isLoaded) {
        		AMA.models.contacts.fetch();
        	}
        	if (!AMA.models.photos.isLoaded) {
        		AMA.models.photos.fetch();
        	}
        	if (!AMA.models.videos.isLoaded) {
        		AMA.models.videos.fetch();
        	}
        	
        	if (AMA.models.contacts.isFetching || AMA.models.photos.isFetching || AMA.models.videos.isFetching) {
        		AMA.debug("One of the models still fetching. Attempting to show dialog again")
        		this._fetchTimeout = setTimeout(_.bind(this.show, this), 500);
        		return;
        	}
        	else {
	        	this.$el.find("input.item_type").prop("checked", false);
	        	var contactCount = this.$el.find(".contact_count"),
	        		photoCount=this.$el.find(".photo_count"),
	        		videoCount=this.$el.find(".video_count");
	        	
	        	AMA.debug("Get count of records pending sync for display on " + this.options.el);
	        	 
	        	var contactsToBeSynced = AMA.models.contacts.attributes.totalPendingSync,
	        		photosToBeSynced = AMA.models.photos.attributes.totalPendingSync,
	        		videosToBeSynced = AMA.models.videos.attributes.totalPendingSync;
	        	
	            contactCount.html(contactsToBeSynced);
	            AMA.debug(contactsToBeSynced + " contacts pending sync");
	            photoCount.html(photosToBeSynced);
	            AMA.debug(photosToBeSynced +" photos pending sync");
	            videoCount.html(videosToBeSynced);
	            AMA.debug(videosToBeSynced +" videos pending sync");
	            
	            var syncSettings = AMA.models.syncsettings.models[0];				
				value = syncSettings.get("syncOnMobileData");
	            
				if(!value) {
					this.$el.find("#backupConnectionWifiOrMobileNetwork_syncdialog").hide();					
					this.$el.find("#syncphonedialog_currentsync_both_label").hide();
					this.$el.find("#backupConnectionWifiOnly_syncdialog").show();
					this.$el.find("#syncphonedialog_currentsync_wifionly_label").show();
	            }
				else {
					this.$el.find("#backupConnectionWifiOnly_syncdialog").hide();
					this.$el.find("#syncphonedialog_currentsync_wifionly_label").hide();
					this.$el.find("#backupConnectionWifiOrMobileNetwork_syncdialog").show();					
					this.$el.find("#syncphonedialog_currentsync_both_label").show();
	            }
	            
	        	// Make sure all error messages are hidden at this point
	    		this.$el.find(".step1 .error").hide();
	    		
	        	SyncDialog.__super__.show.apply(this, arguments);	        	
	        	
	        	if(AMA.config.enableReporting) {
	            	var dataToSync = '';
	            	
					if(this.$el.find("#sync_dialog_contacts_checkbox").attr("checked")) {
						dataToSync = 'contacts,';
					}
					if(this.$el.find("#sync_dialog_photos_checkbox").attr("checked")) {
						dataToSync += 'images,';
					}
					if(this.$el.find("#sync_dialog_videos_checkbox").attr("checked")) {
						dataToSync += 'videos,';
					}
					if(dataToSync.length != 0) {
						dataToSync = dataToSync.substring(0, dataToSync.length-1);
			        }
			        
		            var eventMsg = {};
					eventMsg['Type'] = 'sync';
					eventMsg['DataType'] = dataToSync;
							
					AMA.ReportingManager.reportSyncEvent(AMA.config.reportingEventTypes.webSyncDialogShown, eventMsg);
				}

        	}
        },
        

        doSync: function () {
        	// Determine the item types to sync, based on the checkboxes
        	var itemsChecked = this.$el.find("input.item_type:checked"),
        		itemsToSync = "";
        	
        	// Show an error if there are no item types selected
        	if (itemsChecked.length === 0) {
        		AMA.debug("No item types selected in " + this.options.el + ". Prompting the user");
        		
        		this.$el.find(".step1 .error.nothing_selected").show();
        		return;
        	}
        	
        	_.each(itemsChecked, function (item, index, coll) {
        		itemsToSync += item.value;
        		itemsToSync += (index < coll.length-1) ? ", " : "";
        	}, this);
        	AMA.debug(this.options.el + " indicates that " + itemsToSync + " will be included in the sync");

        	// Once everything is ok, close the dialog
        	this.hide();
        	
        	// Proceed to sync
			AMA.ActionManager.start("sync", { itemsToSync: itemsToSync });		
			if(AMA.config.enableReporting) {
				var eventMsg = {};
				var dataToSync = '';
				var dataTypes=[];
			
				if(this.$el.find("#sync_dialog_contacts_checkbox").prop("checked")) {
					dataToSync = 'contacts,';
					dataTypes.push("Contacts");
				}
				if(this.$el.find("#sync_dialog_photos_checkbox").prop("checked")) {
				dataToSync += 'images,';
				dataTypes.push("Photos");
				}
				if(this.$el.find("#sync_dialog_videos_checkbox").prop("checked")) {
					dataToSync += 'videos,';
					dataTypes.push("Videos");
				}
	        	dataToSync = dataToSync.substring(0, dataToSync.length-1);
			
	        	eventMsg['Type'] = 'sync';
	        	eventMsg['DataType'] = dataToSync;
			
				AMA.ReportingManager.reportSyncEvent(AMA.config.reportingEventTypes.webSyncTriggered, eventMsg);
				
				var i=0;
				for (i=0;i<dataTypes.length;i++) {
					eventMsg={};
					eventMsg['Type'] = 'Sync '+dataTypes[i]+" "+SyncDialog.syncTriggeredFrom;
					AMA.ReportingManager.reportUserAction(AMA.config.reportingEventTypes["websync"+dataTypes[i]+SyncDialog.syncTriggeredFrom], eventMsg);
				}
			}

        },
        

        openBackupTab: function(){
        	if(AMA.config.enableReporting) {
      			var eventMsg = {};
				eventMsg['Type'] = 'sync';
				
				AMA.ReportingManager.reportSyncEvent(AMA.config.webSyncDialogCancelled, eventMsg);
			}
			AMA.page.openSettings("backup");
		}
        /*,
		hide: function () {
			this.$el.addClass("syncbuttonwidth");
			this.$el.parent().addClass("syncbuttonwidth");
            this.$el.modal("hide");
        }*/
    });
})();
/*! SyncToolset */
(function () {

    AMA.namespace("view");

    var SyncToolset = AMA.view.SyncToolset = AMA.view.BaseView.extend();

    SyncToolset.TEMPLATE_ID = "sync_toolset_template";
    
    SyncToolset.TEMPLATE_SRC = "";
    
    SyncToolset.CSS = {
        CONNECTING: "connecting",
        SYNCING: "syncing",
        UNSUCCESSFUL: "unsuccessful",
        SUCCESS: "success",
        NORMAL: "normal"
    };

    
    _.extend(SyncToolset.prototype, {

        events: {
            "click .button_sync.normal": "syncData",
            "click .button_sync .tryagain": "syncData",
            "click .viewdetails": "syncDetails",
            "click .sync_settings_link": "syncSettings"
        },
        

        initialize: function () {
            SyncToolset.__super__.initialize.apply(this, arguments);

            var ActionManager = AMA.ActionManager,
                BaseWorkflow = AMA.workflow.BaseWorkflow,
                SyncWorkflow = AMA.workflow.SyncWorkflow;
        
            var workflow = new SyncWorkflow();
            
            ActionManager.define("sync", workflow);
                        
            workflow.on(BaseWorkflow.EVENT.STATE_CHANGED, function (event) {
                switch (event.state) {
                    case BaseWorkflow.STATE.INITIALIZING:
                        AMA.debug("Sync Toolset has switched the Sync Button state to 'connecting'; countdown initialized");
                        
                        this.toggleDisplay(SyncToolset.CSS.CONNECTING);
                        break;
            			
            		case SyncWorkflow.STATE.SYNCING:	
            			AMA.debug("Sync Toolset has switched the Sync Button state to 'syncing'");
            			
                    	this.toggleDisplay(SyncToolset.CSS.SYNCING);
                       	if (event.data) {
                    		// Populate the tooltip
		                    var syncTextContainer = $('.sync_detail_msg');
                       		var syncDetails = {
								"contacts" : event.data.contacts,
								"images" : event.data.images,
								"videos" : event.data.videos		                   					
		                	};
		                   
							var statusText = {
					        	"syncing_of": syncTextContainer.find('.syncing_of').text(),
					        	"waiting_to_sync": syncTextContainer.find('.waiting_to_sync').text(),
					        	"pending": syncTextContainer.find('.pending').text(),
					        	"no_change": syncTextContainer.find('.no_change').text(),
					        	"syncing": syncTextContainer.find('.syncing').text()
					        };
		                   
		                   var itemsBeingSynced = event.data.itemsBeingSynced.split(",");
		                   var buttonClass = ".button_sync.outcome.syncing";
		                   
		                   for (var dataType in syncDetails) {
		                	   this.$el.find(buttonClass + " .tooltip ." + dataType).addClass("hide");
		                   }		                   
		                   
		                   for ( var itemNumber = 0; itemNumber < itemsBeingSynced.length; itemNumber++) {
		                	   var itemType = itemsBeingSynced[itemNumber].trim();
		                	   itemType = itemType === 'pictures'?'images':itemType;
		                	   var itemDetails = syncDetails[itemType];
		                	   
		                	   if(itemDetails) {
		                		   if(itemDetails.status === "syncing") {
		                			  if(itemDetails.completed !== itemDetails.total) {		                				  
		                				  var donePercent = parseInt(itemDetails.completed) / parseInt(itemDetails.total);
		                                  var donePercent =  donePercent * 100;
		                                  
		                				  this.$el.find(buttonClass + " .tooltip ." + itemType + "_count").html(itemDetails.completed + statusText["syncing_of"] + itemDetails.total );
		                				  //this.$el.find(buttonClass + " .tooltip ." + itemType).show();
		                				  this.$el.find(buttonClass + " .tooltip ." + itemType + "_progress").show();
		                				  this.$el.find(buttonClass + " .tooltip ." + itemType + "_progress").progressbar({value:donePercent});
		                				  this.$el.find(buttonClass + " .tooltip ." + itemType + "_progress").addClass('sync_progress');
		                				  this.$el.find(buttonClass + " .tooltip ." + itemType + "_text").find(".icon_checkmark").hide();
		                			  }
		                			  else {
		                				  
		                				  this.$el.find(buttonClass + " .tooltip ." + itemType + "_progress").hide();
		                                   
		                                  if(itemDetails.total !== 0) {
			                				  this.$el.find(buttonClass + " .tooltip ." + itemType + "_text").find(".icon_checkmark").show();
			                				  this.$el.find(buttonClass + " .tooltip ." + itemType + "_text").find(".icon_checkmark").addClass('sync_complete');
		                                  } else {
		                                	  this.$el.find(buttonClass + " .tooltip ." + itemType + "_count").html(statusText[itemDetails.status]);
		                                	  this.$el.find(buttonClass + " .tooltip ." + itemType + "_text").find(".icon_checkmark").hide();
		                                  }
		                			  }
		                		   }
		                		   else {
		                			   var itemSyncText = itemDetails.status === "pending" ? (itemDetails.pending + " " + statusText[itemDetails.status]) : statusText[itemDetails.status];
		                			   
		                			   this.$el.find(buttonClass + " .tooltip ." + itemType + "_count").html(itemSyncText);
		                			   //this.$el.find(buttonClass + " .tooltip ." + itemType).show();
		                			   this.$el.find(buttonClass + " .tooltip ." + itemType + "_text").find(".icon_checkmark").hide();
		                			   this.$el.find(buttonClass + " .tooltip ." + itemType + "_progress").hide();
		                		   }		                		   
		                		   
		                	   }
		                	   
		                	   this.$el.find(buttonClass + " .tooltip ."+itemType+"_count").addClass('sync_'+itemType+'_count');
		                	   this.$el.find(buttonClass + " .tooltip ."+itemType).removeClass("hide");
	             		     }
                       	} 
		                   
                    	
                    break;
                        
                    default:
                }
            }, this);
            
            workflow.on(BaseWorkflow.EVENT.FINISHED, function (event) {
                switch (event.result) {
                    case BaseWorkflow.RESULT.SUCCESSFUL:
                        this.toggleDisplay(SyncToolset.CSS.SUCCESS);
                        
                        // Populate the tooltip and success event data
                        var updatedContacts =   event.data.deviceContactCreate + 
                                                event.data.deviceContactUpdate + 
                                                event.data.deviceContactDelete +
                                                event.data.webContactCreate +
                                                event.data.webContactUpdate +
                                                event.data.webContactDelete,
                            updatedPhotos =     event.data.devicePhotosCreate +
                                                event.data.devicePhotosUpdate +
                                                event.data.devicePhotosDelete +
                                                event.data.deviceTransmitImages,
                            updatedVideos =     event.data.deviceVideosCreate +
                                                event.data.deviceVideosUpdate +
                                                event.data.deviceVideosDelete + 
                                                event.data.deviceTransmitVideos;

                            this._syncSuccessData = event.data;
                            this.$el.find(".button_sync.outcome.success .syncsuccess_totalContacts").html(updatedContacts);
                            this.$el.find(".button_sync.outcome.success .syncsuccess_totalPhotos").html(updatedPhotos);
                            this.$el.find(".button_sync.outcome.success .syncsuccess_totalVideos").html(updatedVideos);

                        if (AMA.config.enableSurveys) {
                            // Launch survey on sync success, if enabled
                            AMA.page.openSurvey("sync-manual-success");
                        }

                        this.$el.find(".button_sync.outcome.syncing .contacts .completed").html(0);
                        this.$el.find(".button_sync.outcome.syncing .photos .completed").html(0);
                        this.$el.find(".button_sync.outcome.syncing .videos .completed").html(0);
                        this.$el.find(".button_sync.outcome.syncing .contacts .total").html(0);
                        this.$el.find(".button_sync.outcome.syncing .photos .total").html(0);
                        this.$el.find(".button_sync.outcome.syncing .videos .total").html(0);
                        this.$el.find(".button_sync.outcome.syncing .contacts .ui-progressbar-value").width("0%");
                        this.$el.find(".button_sync.outcome.syncing .photos .ui-progressbar-value").width("0%");
                        this.$el.find(".button_sync.outcome.syncing .videos .ui-progressbar-value").width("0%");
                        break;
                    default:
                        this.toggleDisplay(SyncToolset.CSS.UNSUCCESSFUL);
            			
						AMA.ReportingManager.remoteLog("Sync Failed [type:-sync][accountID:-" + AMA.config.accountDetails.accountId + "]" +
							"[MDN:-" + AMA.config.accountDetails.accountMdn + "][time remaining:-" + this._timeRemaining + "][details:-Failed]", 
							AMA.config.JsonConstants.LOGLEVEL_STATES.AUDIT);
            		
            			// Populate the tooltip with failure message
            			if (event.data!=null) {
            				var failureMsg = AMA.Util.parseStatusDetails(event.data.statusDetails, "sync");
            				if (failureMsg !== "") {
            					this.$el.find(".button_sync.outcome.unsuccessful .tooltip").html(failureMsg);
            				}
            			}
            	}
            }, this);
            
            // Event handler for the countdown
            var o=this;
            workflow.on(BaseWorkflow.EVENT.COUNTDOWN_TICK, function (event) {
            	$("#sync_toolset_countdown").html(event.remaining);
            	 o._timeRemaining=event.remaining;
            }, this);

        },


        _setupEvents: function () {
        	var o=this;
        	 Backbone.globalEvent.on("showSyncDialog",function(data){
        		   o.syncDialog.show(data.type);
			  });
        },
        

        toggleDisplay: function(action) {
            this.$el.find("." + action).show().siblings(".button_sync").hide();
        },
        

        render: function () {
            SyncToolset.__super__.render.apply(this);
            
            this.syncDialog = new AMA.view.SyncDialog({
                el: "#sync_dialog",
                parent: this
            });
            
            this.SyncDetailsDialog = new AMA.view.SyncDetailsDialog({
                el: "#sync_successdetails",
                parent: this
            });
        },
        

        syncData: function(e) {
        	e.stopPropagation();
        	this.syncDialog.show("Backup");
        },
        

        syncSettings: function(e) {
            e.stopPropagation();
            AMA.page.openSettings("backup");
        },
        

        syncDetails: function(e) {
        	e.stopPropagation();
			this.SyncDetailsDialog.show(this._syncSuccessData);
			$(".button_sync.outcome.success").hide();
			$(".button_sync.normal").show();
        }
    });
})();
/*! TransferDataToolset */
(function () {

    AMA.namespace("view");

    var TransferDataToolset = AMA.view.TransferDataToolset = AMA.view.BaseView.extend();

    TransferDataToolset.TEMPLATE_ID = "transfer_data_toolset_template";
    TransferDataToolset.TEMPLATE_SRC = "";


    _.extend(TransferDataToolset.prototype, {

        initialize: function () {
            TransferDataToolset.__super__.initialize.apply(this, arguments);
        },


        render: function () {
            TransferDataToolset.__super__.render.apply(this);
       
            this.transferDataWizard = new AMA.view.TransferDataWizard({
                el: "#transferdata_dialog",
                parent: this
            });
        },


        _setupEvents: function() {
            var o = this,
                objDom = o.$el;
            objDom.find(".button_transferdata").on("click", function() {
                o.transferDataWizard.show();
            });
        }
    });


})();


/*! TransferDataWizard */
(function () {

    AMA.namespace("view");

    var TransferDataWizard = AMA.view.TransferDataWizard = AMA.view.Wizard.extend();

    TransferDataWizard.TEMPLATE_ID = "transferdata_dialog_template";
    TransferDataWizard.TEMPLATE_SRC = "";


    _.extend(TransferDataWizard.prototype, {

        initialize: function () {
        	// Set the width and height prior to initialization
            this.options.width = 650;
            this.options.height = 400;

            TransferDataWizard.__super__.initialize.apply(this, arguments);
        },

        
        hide: function() {
            TransferDataWizard.__super__.hide.apply(this, arguments);
            this.$el.find(".step1").addClass("current").siblings(".wiz_step").removeClass("current")
        },
        
        _setupEvents: function() {
        	TransferDataWizard.__super__._setupEvents.call(this, arguments);
            var o = this,
                objDom = o.$el;
            objDom.find(".close").on("click", function(e) {
            	e.stopPropagation();
            	o.hide();
            }); 
        }
        
    });
})();
/*! WipePhoneDialog */
(function () {
    AMA.namespace("view");

    var WipePhoneDialog = AMA.view.WipePhoneDialog = AMA.view.Wizard.extend();

    WipePhoneDialog.TEMPLATE_ID = "wipephonedialog_template";
    WipePhoneDialog.TEMPLATE_SRC = "";


    _.extend(WipePhoneDialog.prototype, {
        events: {
            "click .close": "_hideDialog",
            "click .btn_cancel": "_hideDialog",
            "click .btn_factory_reset_device.sync": "_wipe",
            "click .btn_factory_reset_device.nosync": "_wipeonly",
            "click .btn_erase.sync": "_wipe",
            "click .btn_erase.nosync": "_wipeonly",
            "click .btn_erase_and_lock.sync": "_wipe",
            "click .btn_erase_and_lock.nosync": "_wipeonly",
            "click .btn_sync_then_wipe": "_wipe",
            "click .btn_nosync_then_wipe": "_wipeonly",
            "click .btn_sync_then_reset": "_wipe",
            "click .btn_nosync_then_reset": "_wipeonly",
            "click .btn_logout" : "_factorySuccessLogout"
        },

        _setupEvents: function() {
            var o = this;
            this._setupSteps();

            // Event handlers for Previous/Next buttons
            this.$el.find(".next").on("click", function() {
                $(o.steps[o.steps.index(o.$el.find("." + AMA.view.Wizard.CSS.ACTIVE))])
                        .removeClass(AMA.view.Wizard.CSS.ACTIVE)
                        .next()
                        .addClass(AMA.view.Wizard.CSS.ACTIVE);
                // Override to call processDialogView
                o.processDialogView();
            });
            this.$el.find(".previous").on("click", function() {
                $(o.steps[o.steps.index(o.$el.find("."+AMA.view.Wizard.CSS.ACTIVE))])
                        .removeClass(AMA.view.Wizard.CSS.ACTIVE)
                        .prev()
                        .addClass(AMA.view.Wizard.CSS.ACTIVE);
                // Override to call processDialogView
                o.processDialogView();
            });
        },

        /**
         * Opens the Erase dialog
         *
         * @param {String} step: Name of the step that the dialog will proceed to (optional)
         * 
         */
        show: function (step) {
            if (step === "resetsuccess") {
                // Hide the Close button for the Factory Reset Successful step
                this.$el.find(".close").hide();
            }

            WipePhoneDialog.__super__.show.call(this);

            this.processDialogView(step);
        },

        _hideDialog: function () {
            // Reset to first step when closing the dialog
            if(!this.$el.find(".step1").hasClass("current")) {
            	
                this.$el.find(".title").addClass("hidden");
                this.$el.find(".title.wipe").removeClass("hidden");
                this.$el.find(".wiz_step").removeClass("current");
                this.$el.find(".step1, .step1_buttons").addClass("current");
            }
            this.hide();
        },

        _wipe: function () {
            this._hideDialog();
            var wipeWorkflow = this._createWipeWorkflow();

            if (this.$el.find("input#wipephone_reset:checked").length > 0) {
                AMA.ActionManager.define("wipefactoryonly", wipeWorkflow);
                AMA.ActionManager.start("wipefactoryonly");
            } else {
                AMA.ActionManager.define("wipe", wipeWorkflow);
                AMA.ActionManager.start("wipe");
            }
        },

        _wipeonly: function () {
            this._hideDialog();
            var wipeonlyWorkflow = this._createWipeWorkflow();

            if (this.$el.find("input#wipephone_reset:checked").length > 0) {
                AMA.ActionManager.define("wipefactoryonly", wipeonlyWorkflow);
                AMA.ActionManager.start("wipefactoryonly");
            } else {
                AMA.ActionManager.define("wipeonly", wipeonlyWorkflow);
                AMA.ActionManager.start("wipeonly");
            }
        },

        _createWipeWorkflow : function () {
            var ActionManager = AMA.ActionManager,
                BaseWorkflow = AMA.workflow.BaseWorkflow,
                WipeWorkflow = AMA.workflow.WipeWorkflow,
                workflow = new WipeWorkflow();

            workflow.on(BaseWorkflow.EVENT.STATE_CHANGED, function (event) {
                switch (event.state) {
                    case BaseWorkflow.STATE.INITIALIZING:
                        AMA.debug("Wipe Toolset has switched the Wipe Button state to 'connecting'; countdown initialized");

                        this.parent.toggleDisplay(AMA.view.WipeToolset.CSS.CONNECTING);
                        break;

                    case WipeWorkflow.STATE.SYNCING:
                        AMA.debug("Wipe Toolset has switched the Wipe Button state to 'syncing'");

                        this.parent.toggleDisplay(AMA.view.WipeToolset.CSS.SYNCING);
                        break;

                    case WipeWorkflow.STATE.ERASING:
                        AMA.debug("Wipe Toolset has switched the Wipe Button state to 'erasing'");

                        this.parent.toggleDisplay(AMA.view.WipeToolset.CSS.ERASING);

                        // Update the tooltip with the running totals
                        var buttonTooltip = this.parent.$el.find(".button_wipe.outcome:not(.unsuccessful) .tooltip"),
                            totals = this._buildTotals(event.data);

                        buttonTooltip.find(".total_erased_audio").html(totals.audio || "0/0");
                        buttonTooltip.find(".total_erased_mediafiles").html(totals.file || "0/0");
                        buttonTooltip.find(".total_erased_video").html(totals.video || "0/0");
                        buttonTooltip.find(".total_erased_photo").html(totals.photo || "0/0");
                        buttonTooltip.find(".total_erased_folder").html(totals.folder || "0/0");
                        buttonTooltip.find(".total_erased_sms").html(totals.sms || "0/0");
                        buttonTooltip.find(".total_erased_calllog").html(totals.call_log || "0/0");
                        buttonTooltip.find(".total_erased_calendar").html(totals.calendar || "0/0");
                        buttonTooltip.find(".total_erased_contact").html(totals.contacts || "0/0");

                        break;

                    default:
                }
            }, this);

            workflow.on(BaseWorkflow.EVENT.FINISHED, function (event) {
                switch (event.result) {
                    case BaseWorkflow.RESULT.SUCCESSFUL:
                        this.parent.toggleDisplay(AMA.view.WipeToolset.CSS.SUCCESS);

                        // Update the tooltip with the final totals
                        var buttonTooltip = this.parent.$el.find(".button_wipe.outcome:not(.unsuccessful) .tooltip"),
                            totals = this._buildTotals(event.data.split("\n"));

                        buttonTooltip.find(".total_erased_audio").html(totals.audio || "0/0");
                        buttonTooltip.find(".total_erased_mediafiles").html(totals.file || "0/0");
                        buttonTooltip.find(".total_erased_video").html(totals.video || "0/0");
                        buttonTooltip.find(".total_erased_photo").html(totals.photo || "0/0");
                        buttonTooltip.find(".total_erased_folder").html(totals.folder || "0/0");
                        buttonTooltip.find(".total_erased_sms").html(totals.sms || "0/0");
                        buttonTooltip.find(".total_erased_calllog").html(totals.call_log || "0/0");
                        buttonTooltip.find(".total_erased_calendar").html(totals.calendar || "0/0");
                        buttonTooltip.find(".total_erased_contact").html(totals.contacts || "0/0");

                        AMA.models.contacts.invalidate();
                        AMA.models.photos.invalidate();
                        AMA.models.videos.invalidate();

                        break;
                    case WipeWorkflow.RESULT.FACTORY_RESET_SUCCESSFUL:
                        this.parent.toggleDisplay(AMA.view.WipeToolset.CSS.NORMAL);

                        // Move to "Factory Reset Success" step of wizard
                        this.show("resetsuccess");

                        break;
                    default:
                        this.parent.toggleDisplay(AMA.view.WipeToolset.CSS.UNSUCCESSFUL);
                }
            }, this);

            // Event handler for the countdown
            workflow.on(BaseWorkflow.EVENT.COUNTDOWN_TICK, function (event) {
                $("#wipe_toolset_countdown").html(event.remaining);
            }, this);

            return workflow;
        },

        /** 
         * Show/hide elements in the dialog template based on parameters passed
         *
         * @param {String} step: Name of the step which the wizard will jump to; matches class name in template (optional)
         * 
         */
        processDialogView: function (step) {
            var isAndroid = AMA.Util.isAndroid(this.options.endpoint.models[0].get("platformfriendlyname")),
                //osVersion = isAndroid ? $.parseJSON(this.options.endpoint.models[0].get("version")) : 0;
                adminEnabled = (this.data.models[0].get("android_device_admin") === "1"),
                syncAndOrWipeSupported = (this.options.endpoint.models[0].get("syncAndOrWipeSupported") === "true");

            // Proceed to a step in the wizard if one is defined
            if (step) {
                this.$el.find(".wiz_step").removeClass("current");
                this.$el.find("." + step + ".wiz_step, ."+ step +"_buttons").addClass("current");
            }

            if (this.$el.find(".step1").hasClass("current")) {
            	this.$el.find(".step1_buttons").addClass("current").removeClass("hidden");
            	this.$el.find(".step1_buttons").siblings().removeClass("current").addClass("hidden");
                // Hide all buttons except "Cancel"            	
            	this.$el.find(".step1_buttons .btn-primary:not(.btn_cancel)").hide();

                // If lock is disabled, remove lock terminology and buttons
                if (!AMA.config.lockEnabled) {
                    this.$el.find(".step1 .no_lock, .step1_buttons .no_lock").hide();
                }

                // Based on capabilities, hide sections of the dialog
                // 1. In current labs, factory reset is enabled only if device is Android and has device admin enabled
                //if (isAndroid && (parseInt(osVersion["device-os-version"]) > 7) && adminEnabled) {
                if (isAndroid && adminEnabled) {
                    this.$el.find(".step1 .wipeonly").hide();
                    this.$el.find(".step1 .wipesync").hide();
                    this.$el.find(".step1 input#wipephone_wipe").prop("checked", true);
                } else {
                    // 2. Else, wipe with sync or wipe without sync depending on whether device supports backup 
                    this.$el.find(".step1 .wipereset").hide();
                    if (AMA.models.capabilities.canCreate("syncEvents")) {
                        this.$el.find(".step1 .wipeonly").hide();
                    } else {
                        this.$el.find(".step1 .wipesync").hide();
                    }
                }

                // Based on capabilities, show dialog buttons
                if (adminEnabled) {
                    this.$el.find(".step1_buttons .btn_next").show();
                } else {
                    if (AMA.config.lockEnabled) {
                        this.$el.find(".step1_buttons .btn_erase_and_lock").show();
                    } else {
                        this.$el.find(".step1_buttons .btn_erase").show();
                    }

                    if (AMA.models.capabilities.canCreate("syncEvents")) {
                    	console.log("1 - "+AMA.models.capabilities.canCreate("syncEvents"));
                        this.$el.find(".step1_buttons .nosync").hide();
                    } else {
                    	console.log("2 - "+AMA.models.capabilities.canCreate("syncEvents"));
                        this.$el.find(".step1_buttons .sync").hide();
                    }
                }
            } else if(this.$el.find(".step2").hasClass("current")) {
                this.$el.find(".step2 .warning").hide();
            	this.$el.find(".step2_buttons").addClass("current").removeClass("hidden");
            	this.$el.find(".step2_buttons").siblings().removeClass("current").addClass("hidden");
                this.$el.find(".step2_buttons .btn-primary:not(.btn_cancel)").hide();
                if (this.$el.find("#wipephone_wipe:checked").length > 0) {
                    if (syncAndOrWipeSupported) {
                        this.$el.find(".step2 .warning.optionalsync").show();
                        this.$el.find(".step2_buttons .btn_sync_then_wipe").show();
                        this.$el.find(".step2_buttons .btn_nosync_then_wipe").show();
                        this.$el.find(".step2 .confirm .wipingorresetting_wiping").show();
                        this.$el.find(".step2 .confirm .wipingorresetting_resetting").hide();
                    } else {
                        this.$el.find(".step2 .warning.erase").show();

                        if (!AMA.config.lockEnabled) {
                            this.$el.find(".step2_buttons .btn_erase_and_lock").hide();
                            this.$el.find(".step2_buttons .btn_erase").show();
                        } else {
                            this.$el.find(".step2_buttons .btn_erase_and_lock").show();
                            this.$el.find(".step2_buttons .btn_erase").hide();
                        }
                        
                        if (AMA.models.capabilities.canCreate("syncEvents")) {
                            this.$el.find(".step2_buttons .nosync").hide();
                        } else {
                            this.$el.find(".step2_buttons .sync").hide();
                        }
                    }
                } else {
                    this.$el.find(".title").addClass("hidden");
                    this.$el.find(".title.reset").removeClass("hidden");
                    if (syncAndOrWipeSupported) {
                        this.$el.find(".step2 .warning.optionalsync").show();
                        this.$el.find(".step2_buttons .btn_sync_then_reset").show();
                        this.$el.find(".step2_buttons .btn_nosync_then_reset").show();
                        this.$el.find(".step2 .confirm .wipingorresetting_resetting").show();
                        this.$el.find(".step2 .confirm .wipingorresetting_wiping").hide();
                    } else {
                        this.$el.find(".step2 .warning.factoryreset").show();
                        this.$el.find(".step2_buttons .btn_factory_reset_device").show();

                        if (AMA.models.capabilities.canCreate("syncEvents")) {
                            this.$el.find(".step2_buttons .nosync").hide();
                        } else {
                            this.$el.find(".step2_buttons .sync").hide();
                        }
                    }
                }
            } else if(this.$el.find(".resetsuccess").hasClass("current")) {
                this.$el.find(".title").addClass("hidden");
                this.$el.find(".title.resetsuccess").removeClass("hidden");
            	this.$el.find(".resetsuccess_buttons").addClass("current").removeClass("hidden");
            	this.$el.find(".resetsuccess_buttons").siblings().removeClass("current").addClass("hidden");
            }
        },

        _buildTotals: function (totalsObj) {
            var obj = {
                audio : null,
                file : null,
                video : null,
                photo : null,
                folder : null,
                sms : null,
                call_log : null,
                calendar : null,
                contacts : null
            };

            _.each(totalsObj, function (item) {
                if (item.indexOf("audios") == 0)
                    obj.audio = item.substr(7) === "0/-1" ? "0/0" : item.substr(7);
                else if (item.indexOf("files") == 0)
                    obj.file = item.substr(6) === "0/-1" ? "0/0" : item.substr(6);
                else if (item.indexOf("videos") == 0)
                    obj.video = item.substr(7) === "0/-1" ? "0/0" : item.substr(7);
                else if (item.indexOf("pictures") == 0)
                    obj.photo = item.substr(9) === "0/-1" ? "0/0" : item.substr(9);
                else if (item.indexOf("folders") == 0)
                    obj.folder = item.substr(8) === "0/-1" ? "0/0" : item.substr(8);
                else if (item.indexOf("sms") == 0)
                    obj.sms = item.substr(4) === "0/-1" ? "0/0" : item.substr(4);
                else if (item.indexOf("calllogs") == 0)
                    obj.call_log = item.substr(9) === "0/-1" ? "0/0" : item.substr(9);
                else if (item.indexOf("calendar") == 0)
                    obj.calendar = item.substr(9) === "0/-1" ? "0/0" : item.substr(9);
                else if (item.indexOf("contacts") == 0)
                    obj.contacts = item.substr(9) === "0/-1" ? "0/0" : item.substr(9);
            }, obj);

            return obj;
        },

        _factorySuccessLogout: function () {
            //AMA.Util.logout();

            location = "index.html#get_started";
        }
    });
})();

/*! WipeToolset */
(function () {
    AMA.namespace("view");

    var WipeToolset = AMA.view.WipeToolset = AMA.view.BaseView.extend();

    WipeToolset.TEMPLATE_ID = "wipe_toolset_template";
    WipeToolset.TEMPLATE_SRC = "";

    WipeToolset.CSS = {
        CONNECTING: "connecting",
        SYNCING: "syncing",
        ERASING: "erasing",
        UNSUCCESSFUL: "unsuccessful",
        SUCCESS: "success",
        NORMAL: "normal"
    };


    _.extend(WipeToolset.prototype, {
        events: {
            "click .button_wipe.normal": "_showDialog",
            "click .button_wipe.unsuccessful": "_showDialog"
        },

        /**
         * Changes button state of the toolset
         *
         * @param {String} action: Name of the button state to be displayed
         * 
         */
        toggleDisplay: function(action) {
            this.$el.find("." + action).show().siblings(".button_wipe").hide();
        },

        render: function () {
            WipeToolset.__super__.render.apply(this);

            if (!this.wipePhoneDialog) {
                // Create the Erase dialog
                this.wipePhoneDialog = new AMA.view.WipePhoneDialog({
                    el: "#wipephonedialog",
                    width: 670,
                    parent: this,
                    hidden: true,
                    data: AMA.models.devicesettings,
                    endpoint: AMA.models.endpoints
                }); 
            } else {
                this.wipePhoneDialog.render();
            }

            // Tooltip processing

            // Show tooltip about backing up device if supported
            if (AMA.models.capabilities.canCreate("syncEvents")) {
                this.$el.find(".tooltip .wipe").removeClass("hidden");
            } else {
                this.$el.find(".tooltip .wipeonly").removeClass("hidden");
            }

            // Show tooltip about locking device if supported
            if (AMA.config.lockEnabled) {
                this.$el.find(".tooltip .lockenabled").removeClass("hidden");
            }

            // Show tooltip about BlackBerry device if supported
            if (AMA.Util.isBB(AMA.models.endpoints.models[0].get("platformfriendlyname"))) {
                this.$el.find(".tooltip").addClass("long");
                this.$el.find(".tooltip .isblackberry").removeClass("hidden");
            }
        },

        _processData: function (item) {

        },

        _showDialog: function() {
            this.wipePhoneDialog.show();
        },

        _showRestoreSteps: function () {
            // Open the Transfer Data Wizard
            AMA.page.header.toolbar.toolsets.transferData.transferDataWizard.show();
        }
    });
})();
/*! SecurePhoneDialog */
(function () {
    AMA.namespace("view");

    var SecurePhoneDialog = AMA.view.SecurePhoneDialog = AMA.view.Wizard.extend();

    SecurePhoneDialog.TEMPLATE_ID = "securephone_dialog_template";
    SecurePhoneDialog.TEMPLATE_SRC = "";


    _.extend(SecurePhoneDialog.prototype, {
        initialize: function () {
            SecurePhoneDialog.__super__.initialize.apply(this);

            this._performAnnounce = false;
            this._performErase = false;
			
			this._locateSuccess = false;
			this._wipeSuccess = false;
			this._announceSuccess = false;
        },

        events: {
            "click .close": "hide",
            "click .btn_cancel": "hide",
            "click .btn_submit": "_doSecurePhone",
            "click #securephone_announce": "_toggleAnnounceTextarea"
        },

        _setupEvents: function () {
            this._setupSteps();

            var o = this;
            // Event handler to count the number of characters in the announce message textarea whenever a key is pressed
            this.$el.find("#securephone_announce_message").on("keyup", function () {
                o.$el.find("#securephone_announce_charcount").html(o._countAnnounceTextareaChars());
            });
        },

        /**
         * Opens the Secure Phone dialog
         *
         * @param {String} step: Name of the step that the dialog will proceed to (optional)
         * 
         */
        show: function (step) {
            SecurePhoneDialog.__super__.show.call(this);

            // Call to function which will show/hide elements in the dialog
            this.processDialogView(step);
            $("#securephone_announce_message").val($("#securephone_announce_default_message").html());
        },

        _doSecurePhone: function () {
            var ActionManager = AMA.ActionManager,
                BaseWorkflow = AMA.workflow.BaseWorkflow,
                SecurePhoneWorkflow = AMA.workflow.SecurePhoneWorkflow,
                announceMessage = null,
                actionsString = "gpsrefresh",
                workflow = this.parent.workflow,
                o = this;

            // Based on options, determine whether Announce and Erase will be performed
            this._performAnnounce = $("#securephone_announce").is(":checked");
            this._performErase = $("#securephone_wipe").is(":checked");

            // If Announce is enabled, trim whitespaces around message if one is provided
            announceMessage = this._performAnnounce ? $.trim(this.$el.find("#securephone_announce_message").val()) : null;

            // If "Announce" is checked but there is no message, show error message
            if (this._performAnnounce && announceMessage.length == 0) {
                this.$el.find(".error").addClass("hidden");
                this.$el.find(".error.notext").removeClass("hidden");
                return;
            }

            // If required, concatenate wipe and/or announce to action string
            actionsString += this._performErase ? "|wipe" : "";
            actionsString += this._performAnnounce ? "|announce" : "";

            /**
             * TODO: REMOVE all maps related calls.
             */
            workflow.on(BaseWorkflow.EVENT.STATE_CHANGED, function (event) {
                switch (event.state) {
                    case BaseWorkflow.STATE.INITIALIZING:
                        AMA.debug("Secure Phone Toolset has switched the Secure Phone Button state to 'connecting'");

                        this.parent.toggleDisplay(AMA.view.SecurePhoneToolset.CSS.CONNECTING);
                        this.processDialogView("step2", event.state);
                        break;

                    case SecurePhoneWorkflow.STATE.CONNECTING:
                        AMA.debug("Secure Phone Toolset has switched the Secure Phone Button state to 'announcing'; countdown initialized");

                        this.parent.toggleDisplay(AMA.view.SecurePhoneToolset.CSS.ANNOUNCING);
                        this.processDialogView("step2", event.state);
                        break;

                    case SecurePhoneWorkflow.STATE.ANNOUNCE_DISPLAYED:
                        AMA.debug("Announce message has been viewed on the device by the user; proceeding to next action");

                        this.processDialogView("step2", event.state);
                        break;

                    case SecurePhoneWorkflow.STATE.CONTACTS_ERASED:
                        AMA.debug("Contacts successfully erased; proceeding to next action");

                        this.processDialogView("step2", event.state, null, null, null, event.contactsErased);
                        break;

                    case SecurePhoneWorkflow.STATE.REFINING:
                        AMA.debug("Contacts successfully erased; proceeding to next action");
                        AMA.page.content.locationTab.locationMap.CurrentState = AMA.workflow.LocateWorkflow.STATE.REFINING;
                        this.processDialogView("step2", event.state);
                        break;

                    case SecurePhoneWorkflow.STATE.RETRYING:
                        AMA.debug("Updating the Secure Phone dialog with retry information");
                        this.parent.toggleDisplay(AMA.view.SecurePhoneToolset.CSS.RETRYING);
                        this.processDialogView("step2", event.state, null, null, null, null, event.retryInformation);
                        break;

                    case BaseWorkflow.STATE.FINALIZING:
                        AMA.page.content.locationTab.locationMap.CurrentState=BaseWorkflow.STATE.FINALIZING;
                        
						this._locateSuccess = event.locateSuccess;
						this._wipeSuccess = event.wipeSuccess;
						this._announceSuccess = event.announceSuccess;
						
                        //this.processDialogView("step2", event.state);
                        break;

                    default:
                }
            }, this);

            // Handler when workflow finishes
            workflow.on(BaseWorkflow.EVENT.FINISHED, function (event) {
                this.parent.toggleDisplay(AMA.view.SecurePhoneToolset.CSS.NORMAL);
                switch (event.result) {
                    case BaseWorkflow.RESULT.SUCCESSFUL:
                        this.processDialogView("step2", event.result, this._locateSuccess, this._wipeSuccess, this._announceSuccess);
                        break;

                    default:
                        AMA.page.content.locationTab.locationMap.status="fail";
                        this.processDialogView("step2", event.result);
                }
            }, this);

            // Event handler for the countdown
            workflow.on(BaseWorkflow.EVENT.COUNTDOWN_TICK, function (event) {
                $(".securephone_toolset_countdown").html(event.remaining);
            }, this);

            // Check for profanity in the message using the WebPurify plugin
            $.webpurify.check(announceMessage, function (containsProfanity) {
                // If the message contains profanity, display error message. Otherwise, start the workflow.
                if (containsProfanity) { 
                    o.$el.find(".error").addClass("hidden");
                    o.$el.find(".error.containsprofanity").removeClass("hidden");
                    return;
                } else {
                    o.parent.start({
                        actionsString: actionsString,
                        announceMessage: announceMessage,
                        performAnnounce: o._performAnnounce,
                        performErase: o._performErase
                    });
                }
            });
        },

        /**
         * Show/hide elements in the dialog template based on parameters passed
         *
         * All arguments below optional
         * @param {String} step: Name of the step which the wizard will jump to; matches class name in template
         * @param {Object} state: Workflow state
         * @param {Boolean} locateSuccess: Indicator whether locate operation has succeeded
         * @param {String} contactsErased: Number of contacts erased; derived from status response
         * @param {Object} retryInfo: Contains information about Secure Phone retry from the server
         * 
         */
        processDialogView: function (step, state, locateSuccess, announceSuccess, wipeSuccess, contactsErased, retryInfo) {
            var $el = this.$el;
            var announceSupported = (this.options.endpoint.models[0].get("announceSupported") === true);
			
            // Move to the defined step, if provided
            if (step) {
                $el.find(".wiz_step").removeClass("current");
                $el.find("." + step + ".wiz_step").addClass("current");
            }

            // Processing for Step 1
            if ($el.find(".step1").hasClass("current")) {
                $el.find(".title .securephone_retry").addClass("hidden");
                $el.find(".step1 .announce, .step1 .wipe, .modal-footer").show();

                // reset checkboxes
                $el.find("#securephone_announce").prop("checked", null);
                $el.find("#securephone_wipe").prop("checked", null);

                // disable the "Announce" checkbox is phone does not support announce feature
                if (!announceSupported) {
                    $el.find("#securephone_announce").prop("disabled", true);
                }

                $el.find(".error").addClass("hidden");
                this._toggleAnnounceTextarea();
            } else if ($el.find(".step2").hasClass("current")) {
                // Processing for Step 2
                var BaseWorkflow = AMA.workflow.BaseWorkflow,
                    SecurePhoneWorkflow = AMA.workflow.SecurePhoneWorkflow,
                    announceIsChecked = $el.find("#securephone_announce").prop("checked"),
                    wipeIsChecked = $el.find("#securephone_wipe").prop("checked");

                $el.find(".announce.feature, .wipe.feature, .divider-announce, .divider-wipe, .modal-footer").hide();

                if (announceIsChecked) {
                    $el.find(".announce.feature, .divider-announce").show();
                }

                if (wipeIsChecked) {
                    $el.find(".wipe.feature, .divider-wipe").show();
                }

                switch(state) {
                    case BaseWorkflow.STATE.INITIALIZING:
                        $el.find(".countdown_text, .waiting").removeClass("hidden");
                        $el.find(".countdowndivider").hide();
                        $el.find(".success, .fail").addClass("hidden");
                        break;

                    case SecurePhoneWorkflow.STATE.CONNECTING:
                        $el.find(".status.alarm").addClass("hidden");
                        $el.find(".status.alarm.success").removeClass("hidden");
                        break;

                    case SecurePhoneWorkflow.STATE.ANNOUNCE_DISPLAYED:
                        $el.find(".status.announce").addClass("hidden");
                        $el.find(".status.announce.success").removeClass("hidden");
                        break;

                    case SecurePhoneWorkflow.STATE.CONTACTS_ERASED:
                        $el.find(".status.wipe").addClass("hidden");
                        $el.find(".status.wipe.success").removeClass("hidden");
                        $el.find(".status.wipe.success .contact_count").html(contactsErased);
                        break;

                    case SecurePhoneWorkflow.STATE.REFINING:
                        $el.find(".status.locate").addClass("hidden");
                        $el.find(".status.locate.success").removeClass("hidden");
                        break;

                    case SecurePhoneWorkflow.STATE.RETRYING:
                        $el.find(".title .securephone_retry").removeClass("hidden");

                        $(".securephone_retry_current").html(retryInfo.retryAttempt);
                        $(".securephone_retry_total").html(retryInfo.retryTotal);
                        break;

                    case BaseWorkflow.RESULT.SUCCESSFUL:
                        $el.find(".title .securephone_retry," +
                                ".countdown_text," +
                                ".description," +
                                ".status.locate," +
                                ".status.announce," +
                                ".status.wipe").addClass("hidden");

                        $el.find(".securephone_toolset_countdown").html("");
                        $el.find(".countdowndivider").show();
                        $el.find(".description.success").removeClass("hidden");

                        var actionResult = !locateSuccess ? "fail" : "success";
                        $el.find(".status.locate." + actionResult).removeClass("hidden");

                        actionResult = this._performAnnounce && !announceSuccess ? "fail" : "success";
                        $el.find(".status.announce." + actionResult).removeClass("hidden");

                        actionResult = this._performErase && !wipeSuccess ? "fail" : "success";
                        $el.find(".status.wipe." + actionResult).removeClass("hidden");

                        AMA.page.content.locationTab.locationMap.render();

                        break;

                    case BaseWorkflow.RESULT.FAILED:
                        $el.find(".title .securephone_retry," +
                                ".countdown_text," +
                                ".description," +
                                ".status").addClass("hidden");

                        $el.find(".description.fail, .status.fail").removeClass("hidden");

                        $el.find(".securephone_toolset_countdown").html("");
                        $el.find(".countdowndivider").show();

                        AMA.page.content.locationTab.locationMap.render();

                        break;

                    default:
                }
            }
        },

        /**
         * Toggles the announce option elements and displays the char count of the message textarea.
         *
         */
        _toggleAnnounceTextarea: function () {
            var $announceMessage = this.$el.find("#securephone_announce_message");
            var $announceElements = this.$el.find(".announce_edit," +
                                                "#securephone_announce_message," +
                                                ".charcounttext");

            if (this.$el.find("#securephone_announce").prop("checked")) {
                var email = AMA.models.dashboardData.models[0].attributes.emailAddress;
                var defaultAnnouncement = "";

                if (AMA.models.dashboardData && !email) {
                    var announceMsg = $announceMessage.html();

                    defaultAnnouncement = $announceMessage.html() + " " + email + ".";
                    $announceMessage.val(defaultAnnouncement);
                }

                $announceElements.removeClass("hidden");
                $announceMessage.prop("disabled", null);
                this.$el.find("#securephone_announce_charcount").html(this._countAnnounceTextareaChars());
            } else {
                $announceElements.addClass("hidden");
                $announceMessage.prop("disabled", true);
                $announceMessage.html($("#securephone_announce_default_message").html());
            }
        },

        /**
         * Returns the number of characters inside the announce message textarea
         *
         */
        _countAnnounceTextareaChars: function () {
            return this.$el.find("#securephone_announce_message").val().length;
        }
    });
})();
/*! SyncDetailsDialog */
(function () {

    AMA.namespace("view");

    var SyncDetailsDialog = AMA.view.SyncDetailsDialog = AMA.view.Modal.extend();

    SyncDetailsDialog.TEMPLATE_ID = "syncSuccess_dialog_template";
    SyncDetailsDialog.TEMPLATE_SRC = "";
    
    SyncDetailsDialog.WIDTH = 650;
    SyncDetailsDialog.HEIGHT = "auto";


    var data={};

    _.extend(SyncDetailsDialog.prototype, {

    	events: {
    		
    	},


        initialize: function () {
    		// Set the width and height prior to initialization
            this.options.width = SyncDetailsDialog.WIDTH;
            this.options.height = SyncDetailsDialog.HEIGHT;

            SyncDetailsDialog.__super__.initialize.apply(this, arguments);

            // TODO: Pass contacts/photos/videos count to the dialog
            
    	},


        render: function(syncSuccessData) {
    		// Generate the content from template + data
			var content = _.template(this.template, data);

			// Attach the content to the container element
			this.$el.html(content);
			
			if (syncSuccessData) {
				this.populateData(syncSuccessData);
			}
        },
        

        _setupEvents: function ()	{

        },
        

        show: function (data)	{
            this.render(data);
            SyncDetailsDialog.__super__.show.apply(this, arguments);
        },
        



        populateData: function (data) {
        	var updatedContacts = 	data.deviceContactCreate + 
            						data.deviceContactUpdate + 
            						data.deviceContactDelete +
            						data.webContactCreate +
            						data.webContactUpdate +
            						data.webContactDelete,
            	updatedPhotos = 	data.devicePhotosCreate +
            						data.devicePhotosUpdate +
                                    data.devicePhotosDelete + 
                                    data.deviceTransmitImages,
                updatedVideos =     data.deviceVideosCreate +
                                    data.deviceVideosUpdate +
                                    data.deviceVideosDelete +
                                    data.deviceTransmitVideos;
            
            this.$el.find(".syncsuccess_totalContacts").html(updatedContacts);
            this.$el.find(".syncsuccess_totalPhotos").html(updatedPhotos);
            this.$el.find(".syncsuccess_totalVideos").html(updatedVideos);
            
            this.$el.find(".syncsuccess_deviceContactsAdded").html(data.deviceContactCreate);
            this.$el.find(".syncsuccess_deviceContactsEdited").html(data.deviceContactUpdate);
            this.$el.find(".syncsuccess_deviceContactsDeleted").html(data.deviceContactDelete);
            
            this.$el.find(".syncsuccess_devicePhotosAdded").html(data.devicePhotosCreate);
            //this.$el.find(".syncsuccess_devicePhotosEdited").html(data.devicePhotosUpdate);
            this.$el.find(".syncsuccess_devicePhotosDeleted").html(data.devicePhotosDelete);
            
            this.$el.find(".syncsuccess_deviceVideosAdded").html(data.deviceVideosCreate);
            //this.$el.find(".syncsuccess_deviceVideosEdited").html(data.deviceVideosUpdate);
            this.$el.find(".syncsuccess_deviceVideosDeleted").html(data.deviceVideosDelete);
            
            this.$el.find(".syncsuccess_webContactsAdded").html(data.webContactCreate);
            this.$el.find(".syncsuccess_webContactsEdited").html(data.webContactUpdate);
            this.$el.find(".syncsuccess_webContactsDeleted").html(data.webContactDelete);
            
            this.$el.find(".syncsuccess_webPhotosAdded").html(data.deviceTransmitImages);
            this.$el.find(".syncsuccess_webPhotosEdited").html(data.webPhotosDeleted);
            //this.$el.find(".syncsuccess_webPhotosDeleted").html(data.devicePhotosDelete);
            
            this.$el.find(".syncsuccess_webVideosAdded").html(data.deviceTransmitVideos);
            this.$el.find(".syncsuccess_webVideosEdited").html(data.webVideosDeleted);
            //this.$el.find(".syncsuccess_webVideosDeleted").html(data.deviceVideosDelete);
        }
    });
})();
/*! ScanToolset */
(function () {

    AMA.namespace("view");

    var ScanToolset = AMA.view.ScanToolset = AMA.view.BaseView.extend();

    ScanToolset.TEMPLATE_ID = "scan_toolset_template";
    ScanToolset.TEMPLATE_SRC = "";
    
    ScanToolset.CSS = {
        CONNECTING: "connecting",
        UNSUCCESSFUL: "unsuccessful",
        SUCCESS: "scanned",
		SCANNING: "scanning",
        NORMAL: "normal"
    };


    _.extend(ScanToolset.prototype, {

        events: {
            "click #button_scan_normal, .button_security_scan .tryagain,#button_scan_ended": "scan",
            "click #edit_security_settings": "editSecuritySettings"
        },


        editSecuritySettings: function(e){
            e.stopImmediatePropagation();  // prevent scan button from triggering after settings
            AMA.page.openSettings("security", "home/security");
        },


        initialize: function () {
            ScanToolset.__super__.initialize.apply(this, arguments);

            var ActionManager = AMA.ActionManager,
            	BaseWorkflow = AMA.workflow.BaseWorkflow,
            	ScanWorkflow = AMA.workflow.ScanWorkflow;
        
            var workflow = new ScanWorkflow();
            
            ActionManager.define("scan", workflow);
            
			// FIX ME: Do proper solution on next iteration.
			// workaround for device-invoked scan auto-refresh, there's no dirty bit being returned
			// stops polling when Manual Scan is invoked
			workflow.on(BaseWorkflow.EVENT.STARTED, function (event) {
				clearInterval(AMA.view.ThreatProtectionView.POLLER);
            }, this);
						
            workflow.on(BaseWorkflow.EVENT.STATE_CHANGED, function (event) {
            	switch (event.state) {
            		case BaseWorkflow.STATE.INITIALIZING:
            			AMA.debug("Scan Toolset has switched the Scan Button state to 'connecting'; countdown initialized");
            			
            			this.toggleDisplay(ScanToolset.CSS.CONNECTING);
                        break;
            			
            		case ScanWorkflow.STATE.SCANNING:	
            			AMA.debug("Scan Toolset has switched the Scan Button state to 'scanning'");
            			
                    	this.toggleDisplay(ScanToolset.CSS.SCANNING);
            			break;
            			
            		default:
            	}
            }, this);
            
            workflow.on(BaseWorkflow.EVENT.FINISHED, function (event) {
				
				// FIX ME: Do proper solution on next iteration.
				// workaround for device-invoked scan auto-refresh, there's no dirty bit being returned
				// restarts polling when Manual Scan is invoked
				AMA.view.ThreatProtectionView.POLLER = setInterval(function() { AMA.models.threats.invalidate(); }, 30000); 
				
            	switch (event.result) {
            		case BaseWorkflow.RESULT.SUCCESSFUL:
                        this.toggleDisplay(ScanToolset.CSS.SUCCESS);                     
            			break;
            		default:
                        this.toggleDisplay(ScanToolset.CSS.UNSUCCESSFUL);
            	}
            }, this);
            
            // Event handler for the countdown
            workflow.on(BaseWorkflow.EVENT.COUNTDOWN_TICK, function (event) {
                 $(".scan_toolset_countdown").html(event.remaining);
            }, this);

        },
		

        toggleDisplay: function(action) {
            this.$el.find("." + action).show().siblings(".button_security_scan").hide();
        },
        

        render: function () {
            ScanToolset.__super__.render.apply(this);
        },
		

        scan: function() {
            AMA.ActionManager.start("scan");
        }
    });

})();


/*! DiagnosticScanToolset */
(function () {

    AMA.namespace("view");

    var DiagnosticScanToolset = AMA.view.DiagnosticScanToolset = AMA.view.BaseView.extend();

    DiagnosticScanToolset.TEMPLATE_ID = "diagnostic_scan_toolset_template";
    DiagnosticScanToolset.TEMPLATE_SRC = "";
    
    DiagnosticScanToolset.CSS = {
        CONNECTING: "connecting",
        UNSUCCESSFUL: "unsuccessful",
        SUCCESS: "scanned",
		SCANNING: "scanning",
        NORMAL: "normal"
    };

    
    _.extend(DiagnosticScanToolset.prototype, {

		events: {
            "click #button_healthscan_normal, .button_healthscan.unsuccessful": "scan",
            "click .button_healthscan.scanned": "showDiagnosticResults"
        },

		
		initialize: function () {
            DiagnosticScanToolset.__super__.initialize.apply(this, arguments);

            var ActionManager = AMA.ActionManager,
            	BaseWorkflow = AMA.workflow.BaseWorkflow,
            	DiagnosticScanWorkflow = AMA.workflow.DiagnosticScanWorkflow;
        
            var workflow = new DiagnosticScanWorkflow();
            
            ActionManager.define("diagnosticScan", workflow);
                        
            workflow.on(BaseWorkflow.EVENT.STATE_CHANGED, function (event) {
            	switch (event.state) {
            		case BaseWorkflow.STATE.INITIALIZING:
            			AMA.debug("Diagnostic Scan Toolset has switched the Scan Button state to 'connecting'; countdown initialized");
            			
            			this.toggleDisplay(DiagnosticScanToolset.CSS.CONNECTING);
                        break;
            			
            		case DiagnosticScanWorkflow.STATE.SCANNING:	
            			AMA.debug("Diagnostic Scan Toolset has switched the Scan Button state to 'scanning'");
            			
                    	this.toggleDisplay(DiagnosticScanToolset.CSS.SCANNING);
            			break;
            			
            		default:
            	}
            }, this);
            
            workflow.on(BaseWorkflow.EVENT.FINISHED, function (event) {
            	switch (event.result) {
            		case BaseWorkflow.RESULT.SUCCESSFUL:
                        this.toggleDisplay(DiagnosticScanToolset.CSS.SUCCESS);
						
						// attempts to launch the survey dialog
						if (AMA.config.enableSurveys) {
							//var surveyDialogView = new AMA.view.SurveyDialog({el:"#surveydialog"});
							AMA.page.openSurvey("health-scan-success");
						}
						
            			break;
            		default:
                        this.toggleDisplay(DiagnosticScanToolset.CSS.UNSUCCESSFUL);
            			$(".diagnostic_toolset_countdown.countdown_amount").html("05:00");
            			break;
            	}
            }, this);
            
            // Event handler for the countdown
            workflow.on(BaseWorkflow.EVENT.COUNTDOWN_TICK, function (event) {
                 $(".diagnostic_toolset_countdown").html(event.remaining);
            }, this);

        },


		toggleDisplay: function(action) {
            this.$el.find("." + action).show().siblings(".button_healthscan").hide();
        },


        render: function () {
            DiagnosticScanToolset.__super__.render.apply(this);
        },


        scan: function() {
            AMA.ActionManager.start("diagnosticScan");
        },


        showDiagnosticResults: function(){
            this.toggleDisplay(DiagnosticScanToolset.CSS.NORMAL);
        	
        }
    });

})();


/*! Toolbar */
(function () {

    AMA.namespace("view");

    var Toolbar = AMA.view.Toolbar = AMA.view.BaseView.extend();

    Toolbar.TEMPLATE_ID = "toolbar_template";
    Toolbar.TEMPLATE_SRC = "";


    _.extend(Toolbar.prototype, {

        initialize: function () {
            Toolbar.__super__.initialize.apply(this, arguments);
            this.toolsets = {};
        },


        _setupEvents: function () {
/*            $(this.$el).tooltip({
                items: ".tooltip_icon, .tooltip_link",
                tooltipClass: "toolbar-tooltip",
                position: {
                    at: "center top"
                },
                hide: false,
                show: false,
                content: function () {
                    return $(this).next(".tooltip").html();
                }
            });*/
        },


        render: function () {
            Toolbar.__super__.render.apply(this);
        },


        registerToolset: function (name, toolset) {
            this.toolsets[name] = toolset;

            toolset.parent = this;
            this.children.push(toolset);
        },


        registerSwitcher: function (view) {
            AMA.assert(view.SWITCH_VIEW_EVENT, "[Toolbar.registerSwitcher] View is not a switcher");

            var o = this;
            view.on(view.SWITCH_VIEW_EVENT, function (event) {
                o._hideAllToolsets();
                function showToolsets() {
                    // TODO: Better method of checking for iPhone
                    if (AMA.Util.isIPhone(AMA.models.endpoints.models[0].get("platformfriendlyname")) && event.to.constructor.TOOLBAR.IPHONE) {
                        _.each(event.to.constructor.TOOLBAR.IPHONE, function (item) {
                            if (typeof o.toolsets[item] != "undefined") {
                            	o.toolsets[item].show();
                            }
                        });
                    }
                    else {
                        _.each(event.to.constructor.TOOLBAR.DEFAULT, function (item) {
                            if (typeof o.toolsets[item] != "undefined") {
                            	o.toolsets[item].show();
                            }
                        });
                    }
                }

                if (o.isRendered) {
                    showToolsets();
                } else {
                    o.once(AMA.view.BaseView.EVENT.RENDERED, showToolsets);
                }
            });

        },


        _hideAllToolsets: function () {
            _.each(this.toolsets, function (item) {
                if (item) item.hide();
            });
        }

    });
})();


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


/*! TipsToRecover */
(function () {

    AMA.namespace("view");

    var TipsToRecover = AMA.view.TipsToRecover = AMA.view.Dialog.extend();

    TipsToRecover.TEMPLATE_ID = "Tips_To_Recover";
    TipsToRecover.TEMPLATE_SRC = "";
    
    TipsToRecover.WIDTH = 650;
    TipsToRecover.HEIGHT = "auto";


    _.extend(TipsToRecover.prototype, {

    	initialize: function () {

    		// Set the width and height prior to initialization
            this.options.width = TipsToRecover.WIDTH;
            this.options.height = TipsToRecover.HEIGHT;

            TipsToRecover.__super__.initialize.apply(this, arguments);
    	},


        show: function () {
        	TipsToRecover.__super__.show.apply(this, arguments);
        }

    });

})();
