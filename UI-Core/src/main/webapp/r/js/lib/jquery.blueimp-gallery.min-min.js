!function(b){"function"==typeof define&&define.amd?define(["./blueimp-helper"],b):(window.blueimp=window.blueimp||{},window.blueimp.Gallery=b(window.blueimp.helper||window.jQuery))}(function(d){function c(b,e){return void 0===document.body.style.maxHeight?null:this&&this.options===c.prototype.options?b&&b.length?(this.list=b,this.num=b.length,this.initOptions(e),void this.initialize()):void this.console.log("blueimp Gallery: No or empty list provided as first argument.",b):new c(b,e)}return d.extend(c.prototype,{options:{container:"#blueimp-gallery",slidesContainer:"div",titleElement:"h3",displayClass:"blueimp-gallery-display",controlsClass:"blueimp-gallery-controls",singleClass:"blueimp-gallery-single",leftEdgeClass:"blueimp-gallery-left",rightEdgeClass:"blueimp-gallery-right",playingClass:"blueimp-gallery-playing",slideClass:"slide",slideLoadingClass:"slide-loading",slideErrorClass:"slide-error",slideContentClass:"slide-content",toggleClass:"toggle",prevClass:"prev",nextClass:"next",closeClass:"close",playPauseClass:"play-pause",typeProperty:"type",titleProperty:"title",urlProperty:"href",displayTransition:!0,clearSlides:!0,stretchImages:!1,toggleControlsOnReturn:!0,toggleSlideshowOnSpace:!0,enableKeyboardNavigation:!0,closeOnEscape:!0,closeOnSlideClick:!0,closeOnSwipeUpOrDown:!0,emulateTouchEvents:!0,stopTouchEventsPropagation:!1,hidePageScrollbars:!0,disableScroll:!0,carousel:!1,continuous:!0,unloadElements:!0,startSlideshow:!1,slideshowInterval:5000,index:0,preloadRange:2,transitionSpeed:400,slideshowTransitionSpeed:void 0,event:void 0,onopen:void 0,onopened:void 0,onslide:void 0,onslideend:void 0,onslidecomplete:void 0,onclose:void 0,onclosed:void 0},carouselOptions:{hidePageScrollbars:!1,toggleControlsOnReturn:!1,toggleSlideshowOnSpace:!1,enableKeyboardNavigation:!1,closeOnEscape:!1,closeOnSlideClick:!1,closeOnSwipeUpOrDown:!1,disableScroll:!1,startSlideshow:!0},console:window.console&&"function"==typeof window.console.log?window.console:{log:function(){}},support:function(a){var h={touch:void 0!==window.ontouchstart||window.DocumentTouch&&document instanceof DocumentTouch},g={webkitTransition:{end:"webkitTransitionEnd",prefix:"-webkit-"},MozTransition:{end:"transitionend",prefix:"-moz-"},OTransition:{end:"otransitionend",prefix:"-o-"},transition:{end:"transitionend",prefix:""}},f=function(){var b,j,i=h.transition;document.body.appendChild(a),i&&(b=i.name.slice(0,-9)+"ransform",void 0!==a.style[b]&&(a.style[b]="translateZ(0)",j=window.getComputedStyle(a).getPropertyValue(i.prefix+"transform"),h.transform={prefix:i.prefix,name:b,translate:!0,translateZ:!!j&&"none"!==j})),void 0!==a.style.backgroundSize&&(h.backgroundSize={},a.style.backgroundSize="contain",h.backgroundSize.contain="contain"===window.getComputedStyle(a).getPropertyValue("background-size"),a.style.backgroundSize="cover",h.backgroundSize.cover="cover"===window.getComputedStyle(a).getPropertyValue("background-size")),document.body.removeChild(a)};return function(b,i){var e;for(e in i){if(i.hasOwnProperty(e)&&void 0!==a.style[e]){b.transition=i[e],b.transition.name=e;break}}}(h,g),document.body?f():d(document).on("DOMContentLoaded",f),h}(document.createElement("div")),requestAnimationFrame:window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame,initialize:function(){return this.initStartIndex(),this.initWidget()===!1?!1:(this.initEventListeners(),this.onslide(this.index),this.ontransitionend(),void (this.options.startSlideshow&&this.play()))},slide:function(h,g){window.clearTimeout(this.timeout);var l,k,j,i=this.index;if(i!==h&&1!==this.num){if(g||(g=this.options.transitionSpeed),this.support.transition){for(this.options.continuous||(h=this.circle(h)),l=Math.abs(i-h)/(i-h),this.options.continuous&&(k=l,l=-this.positions[this.circle(h)]/this.slideWidth,l!==k&&(h=-l*this.num+h)),j=Math.abs(i-h)-1;j;){j-=1,this.move(this.circle((h>i?h:i)-j-1),this.slideWidth*l,0)}h=this.circle(h),this.move(i,this.slideWidth*l,g),this.move(h,0,g),this.options.continuous&&this.move(this.circle(h-l),-(this.slideWidth*l),0)}else{h=this.circle(h),this.animate(i*-this.slideWidth,h*-this.slideWidth,g)}this.onslide(h)}},getIndex:function(){return this.index},getNumber:function(){return this.num},prev:function(){(this.options.continuous||this.index)&&this.slide(this.index-1)},next:function(){(this.options.continuous||this.index<this.num-1)&&this.slide(this.index+1)},play:function(f){var e=this;window.clearTimeout(this.timeout),this.interval=f||this.options.slideshowInterval,this.elements[this.index]>1&&(this.timeout=this.setTimeout(!this.requestAnimationFrame&&this.slide||function(b,g){e.animationFrameId=e.requestAnimationFrame.call(window,function(){e.slide(b,g)})},[this.index+1,this.options.slideshowTransitionSpeed],this.interval)),this.container.addClass(this.options.playingClass)},pause:function(){window.clearTimeout(this.timeout),this.interval=null,this.container.removeClass(this.options.playingClass)},add:function(f){var e;for(f.concat||(f=Array.prototype.slice.call(f)),this.list.concat||(this.list=Array.prototype.slice.call(this.list)),this.list=this.list.concat(f),this.num=this.list.length,this.num>2&&null===this.options.continuous&&(this.options.continuous=!0,this.container.removeClass(this.options.leftEdgeClass)),this.container.removeClass(this.options.rightEdgeClass).removeClass(this.options.singleClass),e=this.num-f.length;e<this.num;e+=1){this.addSlide(e),this.positionSlide(e)}this.positions.length=this.num,this.initSlides(!0)},resetSlides:function(){this.slidesContainer.empty(),this.slides=[]},handleClose:function(){var b=this.options;this.destroyEventListeners(),this.pause(),this.container[0].style.display="none",this.container.removeClass(b.displayClass).removeClass(b.singleClass).removeClass(b.leftEdgeClass).removeClass(b.rightEdgeClass),b.hidePageScrollbars&&(document.body.style.overflow=this.bodyOverflowStyle),this.options.clearSlides&&this.resetSlides(),this.options.onclosed&&this.options.onclosed.call(this)},close:function(){var f=this,e=function(a){a.target===f.container[0]&&(f.container.off(f.support.transition.end,e),f.handleClose())};this.options.onclose&&this.options.onclose.call(this),this.support.transition&&this.options.displayTransition?(this.container.on(this.support.transition.end,e),this.container.removeClass(this.options.displayClass)):this.handleClose()},circle:function(b){return(this.num+b%this.num)%this.num},move:function(f,e,g){this.translateX(f,e,g),this.positions[f]=e},translate:function(i,h,n,m){var l=this.slides[i].style,k=this.support.transition,j=this.support.transform;l[k.name+"Duration"]=m+"ms",l[j.name]="translate("+h+"px, "+n+"px)"+(j.translateZ?" translateZ(0)":"")},translateX:function(f,e,g){this.translate(f,e,0,g)},translateY:function(f,e,g){this.translate(f,0,e,g)},animate:function(h,g,l){if(!l){return void (this.slidesContainer[0].style.left=g+"px")}var k=this,j=(new Date).getTime(),i=window.setInterval(function(){var a=(new Date).getTime()-j;return a>l?(k.slidesContainer[0].style.left=g+"px",k.ontransitionend(),void window.clearInterval(i)):void (k.slidesContainer[0].style.left=(g-h)*(Math.floor(a/l*100)/100)+h+"px")},4)},preventDefault:function(b){b.preventDefault?b.preventDefault():b.returnValue=!1},stopPropagation:function(b){b.stopPropagation?b.stopPropagation():b.cancelBubble=!0},onresize:function(){this.initSlides(!0)},onmousedown:function(b){b.which&&1===b.which&&"VIDEO"!==b.target.nodeName&&(b.preventDefault(),(b.originalEvent||b).touches=[{pageX:b.pageX,pageY:b.pageY}],this.ontouchstart(b))},onmousemove:function(b){this.touchStart&&((b.originalEvent||b).touches=[{pageX:b.pageX,pageY:b.pageY}],this.ontouchmove(b))},onmouseup:function(b){this.touchStart&&(this.ontouchend(b),delete this.touchStart)},onmouseout:function(a){if(this.touchStart){var f=a.target,e=a.relatedTarget;(!e||e!==f&&!d.contains(f,e))&&this.onmouseup(a)}},ontouchstart:function(f){this.options.stopTouchEventsPropagation&&this.stopPropagation(f);var e=(f.originalEvent||f).touches[0];this.touchStart={x:e.pageX,y:e.pageY,time:Date.now()},this.isScrolling=void 0,this.touchDelta={}},ontouchmove:function(h){this.options.stopTouchEventsPropagation&&this.stopPropagation(h);var g,l,k=(h.originalEvent||h).touches[0],j=(h.originalEvent||h).scale,i=this.index;if(!(k.length>1||j&&1!==j)){if(this.options.disableScroll&&h.preventDefault(),this.touchDelta={x:k.pageX-this.touchStart.x,y:k.pageY-this.touchStart.y},g=this.touchDelta.x,void 0===this.isScrolling&&(this.isScrolling=this.isScrolling||Math.abs(g)<Math.abs(this.touchDelta.y)),this.isScrolling){this.options.closeOnSwipeUpOrDown&&this.translateY(i,this.touchDelta.y+this.positions[i],0)}else{for(h.preventDefault(),window.clearTimeout(this.timeout),this.options.continuous?l=[this.circle(i+1),i,this.circle(i-1)]:(this.touchDelta.x=g/=!i&&g>0||i===this.num-1&&0>g?Math.abs(g)/this.slideWidth+1:1,l=[i],i&&l.push(i-1),i<this.num-1&&l.unshift(i+1));l.length;){i=l.pop(),this.translateX(i,g+this.positions[i],0)}}}},ontouchend:function(z){this.options.stopTouchEventsPropagation&&this.stopPropagation(z);var y,x,w,v,u,t=this.index,s=this.options.transitionSpeed,r=this.slideWidth,q=Number(Date.now()-this.touchStart.time)<250,p=q&&Math.abs(this.touchDelta.x)>20||Math.abs(this.touchDelta.x)>r/2,o=!t&&this.touchDelta.x>0||t===this.num-1&&this.touchDelta.x<0,n=!p&&this.options.closeOnSwipeUpOrDown&&(q&&Math.abs(this.touchDelta.y)>20||Math.abs(this.touchDelta.y)>this.slideHeight/2);this.options.continuous&&(o=!1),y=this.touchDelta.x<0?-1:1,this.isScrolling?n?this.close():this.translateY(t,0,s):p&&!o?(x=t+y,w=t-y,v=r*y,u=-r*y,this.options.continuous?(this.move(this.circle(x),v,0),this.move(this.circle(t-2*y),u,0)):x>=0&&x<this.num&&this.move(x,v,0),this.move(t,this.positions[t]+v,s),this.move(this.circle(w),this.positions[this.circle(w)]+v,s),t=this.circle(w),this.onslide(t)):this.options.continuous?(this.move(this.circle(t-1),-r,s),this.move(t,0,s),this.move(this.circle(t+1),r,s)):(t&&this.move(t-1,-r,s),this.move(t,0,s),t<this.num-1&&this.move(t+1,r,s))},ontouchcancel:function(b){this.touchStart&&(this.ontouchend(b),delete this.touchStart)},ontransitionend:function(f){var e=this.slides[this.index];f&&e!==f.target||(this.interval&&this.play(),this.setTimeout(this.options.onslideend,[this.index,e]))},oncomplete:function(a){var h,g=a.target||a.srcElement,f=g&&g.parentNode;g&&f&&(h=this.getNodeIndex(f),d(f).removeClass(this.options.slideLoadingClass),"error"===a.type?(d(f).addClass(this.options.slideErrorClass),this.elements[h]=3):this.elements[h]=2,g.clientHeight>this.container[0].clientHeight&&(g.style.maxHeight=this.container[0].clientHeight),this.interval&&this.slides[this.index]===f&&this.play(),this.setTimeout(this.options.onslidecomplete,[h,f]))},onload:function(b){this.oncomplete(b)},onerror:function(b){this.oncomplete(b)},onkeydown:function(b){switch(b.which||b.keyCode){case 13:this.options.toggleControlsOnReturn&&(this.preventDefault(b),this.toggleControls());break;case 27:this.options.closeOnEscape&&this.close();break;case 32:this.options.toggleSlideshowOnSpace&&(this.preventDefault(b),this.toggleSlideshow());break;case 37:this.options.enableKeyboardNavigation&&(this.preventDefault(b),this.prev());break;case 39:this.options.enableKeyboardNavigation&&(this.preventDefault(b),this.next())}},handleClick:function(a){var j=this.options,i=a.target||a.srcElement,h=i.parentNode,g=function(e){return d(i).hasClass(e)||d(h).hasClass(e)};g(j.toggleClass)?(this.preventDefault(a),this.toggleControls()):g(j.prevClass)?(this.preventDefault(a),this.prev()):g(j.nextClass)?(this.preventDefault(a),this.next()):g(j.closeClass)?(this.preventDefault(a),this.close()):g(j.playPauseClass)?(this.preventDefault(a),this.toggleSlideshow()):h===this.slidesContainer[0]?(this.preventDefault(a),j.closeOnSlideClick?this.close():this.toggleControls()):h.parentNode&&h.parentNode===this.slidesContainer[0]&&(this.preventDefault(a),this.toggleControls())},onclick:function(b){return this.options.emulateTouchEvents&&this.touchDelta&&(Math.abs(this.touchDelta.x)>20||Math.abs(this.touchDelta.y)>20)?void delete this.touchDelta:this.handleClick(b)},updateEdgeClasses:function(b){b?this.container.removeClass(this.options.leftEdgeClass):this.container.addClass(this.options.leftEdgeClass),b===this.num-1?this.container.addClass(this.options.rightEdgeClass):this.container.removeClass(this.options.rightEdgeClass)},handleSlide:function(b){this.options.continuous||this.updateEdgeClasses(b),this.loadElements(b),this.options.unloadElements&&this.unloadElements(b),this.setTitle(b)},onslide:function(b){this.index=b,this.handleSlide(b),this.setTimeout(this.options.onslide,[b,this.slides[b]])},setTitle:function(f){var e=this.slides[f].firstChild.title,g=this.titleElement;g.length&&(this.titleElement.empty(),e&&g[0].appendChild(document.createTextNode(e)))},setTimeout:function(f,e,h){var g=this;return f&&window.setTimeout(function(){f.apply(g,e||[])},h||0)},imageFactory:function(t,s){var r,q,p,o=this,n=this.imagePrototype.cloneNode(!1),m=t,l=this.options.stretchImages,a=function(e){if(!r){if(e={type:e.type,target:q},!q.parentNode){return o.setTimeout(a,[e])}r=!0,d(n).off("load error",a),l&&"load"===e.type&&(q.style.background='url("'+m+'") center no-repeat',q.style.backgroundSize=l),s(e)}};return"string"!=typeof m&&(m=this.getItemProperty(t,this.options.urlProperty),p=this.getItemProperty(t,this.options.titleProperty)),l===!0&&(l="contain"),l=this.support.backgroundSize&&this.support.backgroundSize[l]&&l,l?q=this.elementPrototype.cloneNode(!1):(q=n,n.draggable=!1),p&&(q.title=p),d(n).on("load error",a),n.src=m,q},createElement:function(a,j){var i=a&&this.getItemProperty(a,this.options.typeProperty),h=i&&this[i.split("/")[0]+"Factory"]||this.imageFactory,g=a&&h.call(this,a,j);return g||(g=this.elementPrototype.cloneNode(!1),this.setTimeout(j,[{type:"error",target:g}])),d(g).addClass(this.options.slideContentClass),g},loadElement:function(a){this.elements[a]||(this.slides[a].firstChild?this.elements[a]=d(this.slides[a]).hasClass(this.options.slideErrorClass)?3:2:(this.elements[a]=1,d(this.slides[a]).addClass(this.options.slideLoadingClass),this.slides[a].appendChild(this.createElement(this.list[a],this.proxyListener))))},loadElements:function(f){var e,h=Math.min(this.num,2*this.options.preloadRange+1),g=f;for(e=0;h>e;e+=1){g+=e*(e%2===0?-1:1),g=this.circle(g),this.loadElement(g)}},unloadElements:function(f){var e,h,g;for(e in this.elements){this.elements.hasOwnProperty(e)&&(g=Math.abs(f-e),g>this.options.preloadRange&&g+this.options.preloadRange<this.num&&(h=this.slides[e],h.removeChild(h.firstChild),delete this.elements[e]))}},addSlide:function(f){var e=this.slidePrototype.cloneNode(!1);e.setAttribute("data-index",f),this.slidesContainer[0].appendChild(e),this.slides.push(e)},positionSlide:function(f){var e=this.slides[f];e.style.width=this.slideWidth+"px",this.support.transition&&(e.style.left=f*-this.slideWidth+"px",this.move(f,this.index>f?-this.slideWidth:this.index<f?this.slideWidth:0,0))},initSlides:function(a){var f,e;for(a||(this.positions=[],this.positions.length=this.num,this.elements={},this.imagePrototype=document.createElement("img"),this.elementPrototype=document.createElement("div"),this.slidePrototype=document.createElement("div"),d(this.slidePrototype).addClass(this.options.slideClass),this.slides=this.slidesContainer[0].children,f=this.options.clearSlides||this.slides.length!==this.num),this.slideWidth=this.container[0].offsetWidth,this.slideHeight=this.container[0].offsetHeight,this.slidesContainer[0].style.width=this.num*this.slideWidth+"px",f&&this.resetSlides(),e=0;e<this.num;e+=1){f&&this.addSlide(e),this.positionSlide(e)}this.options.continuous&&this.support.transition&&(this.move(this.circle(this.index-1),-this.slideWidth,0),this.move(this.circle(this.index+1),this.slideWidth,0)),this.support.transition||(this.slidesContainer[0].style.left=this.index*-this.slideWidth+"px")},toggleControls:function(){var b=this.options.controlsClass;this.container.hasClass(b)?this.container.removeClass(b):this.container.addClass(b)},toggleSlideshow:function(){this.interval?this.pause():this.play()},getNodeIndex:function(b){return parseInt(b.getAttribute("data-index"),10)},getNestedProperty:function(f,e){return e.replace(/\[(?:'([^']+)'|"([^"]+)"|(\d+))\]|(?:(?:^|\.)([^\.\[]+))/g,function(a,l,k,j,i){var h=i||l||k||j&&parseInt(j,10);a&&f&&(f=f[h])}),f},getDataProperty:function(a,h){if(a.getAttribute){var g=a.getAttribute("data-"+h.replace(/([A-Z])/g,"-$1").toLowerCase());if("string"==typeof g){if(/^(true|false|null|-?\d+(\.\d+)?|\{[\s\S]*\}|\[[\s\S]*\])$/.test(g)){try{return d.parseJSON(g)}catch(f){}}return g}}},getItemProperty:function(f,e){var g=f[e];return void 0===g&&(g=this.getDataProperty(f,e),void 0===g&&(g=this.getNestedProperty(f,e))),g},initStartIndex:function(){var f,e=this.options.index,g=this.options.urlProperty;if(e&&"number"!=typeof e){for(f=0;f<this.num;f+=1){if(this.list[f]===e||this.getItemProperty(this.list[f],g)===this.getItemProperty(e,g)){e=f;break}}}this.index=this.circle(parseInt(e,10)||0)},initEventListeners:function(){var a=this,f=this.slidesContainer,e=function(b){var g=a.support.transition&&a.support.transition.end===b.type?"transitionend":b.type;a["on"+g](b)};d(window).on("resize",e),d(document.body).on("keydown",e),this.container.on("click",e),this.support.touch?f.on("touchstart touchmove touchend touchcancel",e):this.options.emulateTouchEvents&&this.support.transition&&f.on("mousedown mousemove mouseup mouseout",e),this.support.transition&&f.on(this.support.transition.end,e),this.proxyListener=e},destroyEventListeners:function(){var a=this.slidesContainer,e=this.proxyListener;d(window).off("resize",e),d(document.body).off("keydown",e),this.container.off("click",e),this.support.touch?a.off("touchstart touchmove touchend touchcancel",e):this.options.emulateTouchEvents&&this.support.transition&&a.off("mousedown mousemove mouseup mouseout",e),this.support.transition&&a.off(this.support.transition.end,e)},handleOpen:function(){this.options.onopened&&this.options.onopened.call(this)},initWidget:function(){var a=this,e=function(b){b.target===a.container[0]&&(a.container.off(a.support.transition.end,e),a.handleOpen())};return this.container=d(this.options.container),this.container.length?(this.slidesContainer=this.container.find(this.options.slidesContainer).first(),this.slidesContainer.length?(this.titleElement=this.container.find(this.options.titleElement).first(),1===this.num&&this.container.addClass(this.options.singleClass),this.options.onopen&&this.options.onopen.call(this),this.support.transition&&this.options.displayTransition?this.container.on(this.support.transition.end,e):this.handleOpen(),this.options.hidePageScrollbars&&(this.bodyOverflowStyle=document.body.style.overflow,document.body.style.overflow="hidden"),this.container[0].style.display="block",this.initSlides(),void this.container.addClass(this.options.displayClass)):(this.console.log("blueimp Gallery: Slides container not found.",this.options.slidesContainer),!1)):(this.console.log("blueimp Gallery: Widget container not found.",this.options.container),!1)},initOptions:function(a){this.options=d.extend({},this.options),(a&&a.carousel||this.options.carousel&&(!a||a.carousel!==!1))&&d.extend(this.options,this.carouselOptions),d.extend(this.options,a),this.num<3&&(this.options.continuous=this.options.continuous?null:!1),this.support.transition||(this.options.emulateTouchEvents=!1),this.options.event&&this.preventDefault(this.options.event)}}),c}),function(b){"function"==typeof define&&define.amd?define(["./blueimp-helper","./blueimp-gallery"],b):b(window.blueimp.helper||window.jQuery,window.blueimp.Gallery)}(function(f,e){f.extend(e.prototype.options,{fullScreen:!1});var h=e.prototype.initialize,g=e.prototype.close;return f.extend(e.prototype,{getFullScreenElement:function(){return document.fullscreenElement||document.webkitFullscreenElement||document.mozFullScreenElement||document.msFullscreenElement},requestFullScreen:function(b){b.requestFullscreen?b.requestFullscreen():b.webkitRequestFullscreen?b.webkitRequestFullscreen():b.mozRequestFullScreen?b.mozRequestFullScreen():b.msRequestFullscreen&&b.msRequestFullscreen()},exitFullScreen:function(){document.exitFullscreen?document.exitFullscreen():document.webkitCancelFullScreen?document.webkitCancelFullScreen():document.mozCancelFullScreen?document.mozCancelFullScreen():document.msExitFullscreen&&document.msExitFullscreen()},initialize:function(){h.call(this),this.options.fullScreen&&!this.getFullScreenElement()&&this.requestFullScreen(this.container[0])},close:function(){this.getFullScreenElement()===this.container[0]&&this.exitFullScreen(),g.call(this)}}),e}),function(b){"function"==typeof define&&define.amd?define(["./blueimp-helper","./blueimp-gallery"],b):b(window.blueimp.helper||window.jQuery,window.blueimp.Gallery)}(function(j,i){j.extend(i.prototype.options,{indicatorContainer:"ol",activeIndicatorClass:"active",thumbnailProperty:"thumbnail",thumbnailIndicators:!0});var p=i.prototype.initSlides,o=i.prototype.addSlide,n=i.prototype.resetSlides,m=i.prototype.handleClick,l=i.prototype.handleSlide,k=i.prototype.handleClose;return j.extend(i.prototype,{createIndicator:function(a){var t,s,r=this.indicatorPrototype.cloneNode(!1),q=this.getItemProperty(a,this.options.titleProperty),h=this.options.thumbnailProperty;return this.options.thumbnailIndicators&&(s=a.getElementsByTagName&&j(a).find("img")[0],s?t=s.src:h&&(t=this.getItemProperty(a,h)),t&&(r.style.backgroundImage='url("'+t+'")')),q&&(r.title=q),r},addIndicator:function(d){if(this.indicatorContainer.length){var c=this.createIndicator(this.list[d]);c.setAttribute("data-index",d),this.indicatorContainer[0].appendChild(c),this.indicators.push(c)}},setActiveIndicator:function(a){this.indicators&&(this.activeIndicator&&this.activeIndicator.removeClass(this.options.activeIndicatorClass),this.activeIndicator=j(this.indicators[a]),this.activeIndicator.addClass(this.options.activeIndicatorClass))},initSlides:function(b){b||(this.indicatorContainer=this.container.find(this.options.indicatorContainer),this.indicatorContainer.length&&(this.indicatorPrototype=document.createElement("li"),this.indicators=this.indicatorContainer[0].children)),p.call(this,b)},addSlide:function(b){o.call(this,b),this.addIndicator(b)},resetSlides:function(){n.call(this),this.indicatorContainer.empty(),this.indicators=[]},handleClick:function(e){var d=e.target||e.srcElement,f=d.parentNode;if(f===this.indicatorContainer[0]){this.preventDefault(e),this.slide(this.getNodeIndex(d))}else{if(f.parentNode!==this.indicatorContainer[0]){return m.call(this,e)}this.preventDefault(e),this.slide(this.getNodeIndex(f))}},handleSlide:function(b){l.call(this,b),this.setActiveIndicator(b)},handleClose:function(){this.activeIndicator&&this.activeIndicator.removeClass(this.options.activeIndicatorClass),k.call(this)}}),i}),function(b){"function"==typeof define&&define.amd?define(["./blueimp-helper","./blueimp-gallery"],b):b(window.blueimp.helper||window.jQuery,window.blueimp.Gallery)}(function(e,d){e.extend(d.prototype.options,{videoContentClass:"video-content",videoLoadingClass:"video-loading",videoPlayingClass:"video-playing",videoPosterProperty:"poster",videoSourcesProperty:"sources"});var f=d.prototype.handleSlide;return e.extend(d.prototype,{handleSlide:function(b){f.call(this,b),this.playingVideo&&this.playingVideo.pause()},videoFactory:function(L,K,J){var I,H,G,F,E,D=this,C=this.options,B=this.elementPrototype.cloneNode(!1),A=e(B),z=[{type:"error",target:B}],y=J||document.createElement("video"),x=this.getItemProperty(L,C.urlProperty),w=this.getItemProperty(L,C.typeProperty),v=this.getItemProperty(L,C.titleProperty),u=this.getItemProperty(L,C.videoPosterProperty),a=this.getItemProperty(L,C.videoSourcesProperty);if(A.addClass(C.videoContentClass),v&&(B.title=v),y.canPlayType){if(x&&w&&y.canPlayType(w)){y.src=x}else{for(;a&&a.length;){if(H=a.shift(),x=this.getItemProperty(H,C.urlProperty),w=this.getItemProperty(H,C.typeProperty),x&&w&&y.canPlayType(w)){y.src=x;break}}}}return u&&(y.poster=u,I=this.imagePrototype.cloneNode(!1),e(I).addClass(C.toggleClass),I.src=u,I.draggable=!1,B.appendChild(I)),G=document.createElement("a"),G.setAttribute("target","_blank"),J||G.setAttribute("download",v),G.href=x,y.src&&(y.controls=!0,(J||e(y)).on("error",function(){D.setTimeout(K,z)}).on("pause",function(){F=!1,A.removeClass(D.options.videoLoadingClass).removeClass(D.options.videoPlayingClass),E&&D.container.addClass(D.options.controlsClass),delete D.playingVideo,D.interval&&D.play()}).on("playing",function(){F=!1,A.removeClass(D.options.videoLoadingClass).addClass(D.options.videoPlayingClass),D.container.hasClass(D.options.controlsClass)?(E=!0,D.container.removeClass(D.options.controlsClass)):E=!1}).on("play",function(){window.clearTimeout(D.timeout),F=!0,A.addClass(D.options.videoLoadingClass),D.playingVideo=y}),e(G).on("click",function(b){D.preventDefault(b),F?y.pause():y.play()}),B.appendChild(J&&J.element||y)),B.appendChild(G),this.setTimeout(K,[{type:"load",target:B}]),B}}),d}),function(b){"function"==typeof define&&define.amd?define(["./blueimp-helper","./blueimp-gallery-video"],b):b(window.blueimp.helper||window.jQuery,window.blueimp.Gallery)}(function(g,f){if(!window.postMessage){return f}g.extend(f.prototype.options,{vimeoVideoIdProperty:"vimeo",vimeoPlayerUrl:"//player.vimeo.com/video/VIDEO_ID?api=1&player_id=PLAYER_ID",vimeoPlayerIdPrefix:"vimeo-player-",vimeoClickToPlay:!0});var j=f.prototype.textFactory||f.prototype.imageFactory,i=function(k,e,m,l){this.url=k,this.videoId=e,this.playerId=m,this.clickToPlay=l,this.element=document.createElement("div"),this.listeners={}},h=0;return g.extend(i.prototype,{canPlayType:function(){return !0},on:function(d,c){return this.listeners[d]=c,this},loadAPI:function(){for(var a,p,o=this,n="//"+("https"===location.protocol?"secure-":"")+"a.vimeocdn.com/js/froogaloop2.min.js",m=document.getElementsByTagName("script"),l=m.length,k=function(){!p&&o.playOnReady&&o.play(),p=!0};l;){if(l-=1,m[l].src===n){a=m[l];break}}a||(a=document.createElement("script"),a.src=n),g(a).on("load",k),m[0].parentNode.insertBefore(a,m[0]),/loaded|complete/.test(a.readyState)&&k()},onReady:function(){var b=this;this.ready=!0,this.player.addEvent("play",function(){b.hasPlayed=!0,b.onPlaying()}),this.player.addEvent("pause",function(){b.onPause()}),this.player.addEvent("finish",function(){b.onPause()}),this.playOnReady&&this.play()},onPlaying:function(){this.playStatus<2&&(this.listeners.playing(),this.playStatus=2)},onPause:function(){this.listeners.pause(),delete this.playStatus},insertIframe:function(){var b=document.createElement("iframe");b.src=this.url.replace("VIDEO_ID",this.videoId).replace("PLAYER_ID",this.playerId),b.id=this.playerId,this.element.parentNode.replaceChild(b,this.element),this.element=b},play:function(){var b=this;this.playStatus||(this.listeners.play(),this.playStatus=1),this.ready?!this.hasPlayed&&(this.clickToPlay||window.navigator&&/iP(hone|od|ad)/.test(window.navigator.platform))?this.onPlaying():this.player.api("play"):(this.playOnReady=!0,window.$f?this.player||(this.insertIframe(),this.player=$f(this.element),this.player.addEvent("ready",function(){b.onReady()})):this.loadAPI())},pause:function(){this.ready?this.player.api("pause"):this.playStatus&&(delete this.playOnReady,this.listeners.pause(),delete this.playStatus)}}),g.extend(f.prototype,{VimeoPlayer:i,textFactory:function(d,c){var e=this.getItemProperty(d,this.options.vimeoVideoIdProperty);return e?(h+=1,this.videoFactory(d,c,new i(this.options.vimeoPlayerUrl,e,this.options.vimeoPlayerIdPrefix+h,this.options.vimeoClickToPlay))):j.call(this,d,c)}}),f}),function(b){"function"==typeof define&&define.amd?define(["./blueimp-helper","./blueimp-gallery-video"],b):b(window.blueimp.helper||window.jQuery,window.blueimp.Gallery)}(function(f,e){if(!window.postMessage){return e}f.extend(e.prototype.options,{youTubeVideoIdProperty:"youtube",youTubePlayerVars:{wmode:"transparent"},youTubeClickToPlay:!0});var h=e.prototype.textFactory||e.prototype.imageFactory,g=function(i,d,j){this.videoId=i,this.playerVars=d,this.clickToPlay=j,this.element=document.createElement("div"),this.listeners={}};return f.extend(g.prototype,{canPlayType:function(){return !0},on:function(d,c){return this.listeners[d]=c,this},loadAPI:function(){var j,i=this,n=window.onYouTubeIframeAPIReady,m="//www.youtube.com/iframe_api",l=document.getElementsByTagName("script"),k=l.length;for(window.onYouTubeIframeAPIReady=function(){n&&n.apply(this),i.playOnReady&&i.play()};k;){if(k-=1,l[k].src===m){return}}j=document.createElement("script"),j.src=m,l[0].parentNode.insertBefore(j,l[0])},onReady:function(){this.ready=!0,this.playOnReady&&this.play()},onPlaying:function(){this.playStatus<2&&(this.listeners.playing(),this.playStatus=2)},onPause:function(){e.prototype.setTimeout.call(this,this.checkSeek,null,2000)},checkSeek:function(){(this.stateChange===YT.PlayerState.PAUSED||this.stateChange===YT.PlayerState.ENDED)&&(this.listeners.pause(),delete this.playStatus)},onStateChange:function(b){switch(b.data){case YT.PlayerState.PLAYING:this.hasPlayed=!0,this.onPlaying();break;case YT.PlayerState.PAUSED:case YT.PlayerState.ENDED:this.onPause()}this.stateChange=b.data},onError:function(b){this.listeners.error(b)},play:function(){var b=this;this.playStatus||(this.listeners.play(),this.playStatus=1),this.ready?!this.hasPlayed&&(this.clickToPlay||window.navigator&&/iP(hone|od|ad)/.test(window.navigator.platform))?this.onPlaying():this.player.playVideo():(this.playOnReady=!0,window.YT&&YT.Player?this.player||(this.player=new YT.Player(this.element,{videoId:this.videoId,playerVars:this.playerVars,events:{onReady:function(){b.onReady()},onStateChange:function(a){b.onStateChange(a)},onError:function(a){b.onError(a)}}})):this.loadAPI())},pause:function(){this.ready?this.player.pauseVideo():this.playStatus&&(delete this.playOnReady,this.listeners.pause(),delete this.playStatus)}}),f.extend(e.prototype,{YouTubePlayer:g,textFactory:function(d,c){var i=this.getItemProperty(d,this.options.youTubeVideoIdProperty);return i?this.videoFactory(d,c,new g(i,this.options.youTubePlayerVars,this.options.youTubeClickToPlay)):h.call(this,d,c)}}),e}),function(b){"function"==typeof define&&define.amd?define(["jquery","./blueimp-gallery"],b):b(window.jQuery,window.blueimp.Gallery)}(function(d,c){d(document).on("click","[data-gallery]",function(n){var m=d(this).data("gallery"),l=d(m),k=l.length&&l||d(c.prototype.options.container),j={onopen:function(){k.data("gallery",this).trigger("open")},onopened:function(){k.trigger("opened")},onslide:function(){k.trigger("slide",arguments)},onslideend:function(){k.trigger("slideend",arguments)},onslidecomplete:function(){k.trigger("slidecomplete",arguments)},onclose:function(){k.trigger("close")},onclosed:function(){k.trigger("closed").removeData("gallery")}},b=d.extend(k.data(),{container:k[0],index:this,event:n},j),a=d('[data-gallery="'+m+'"]');return b.filter&&(a=a.filter(b.filter)),new c(a,b)})});(function(a){if(typeof define==="function"&&define.amd){define(["jquery","./blueimp-gallery"],a)}else{a(window.jQuery,window.blueimp.Gallery)}}(function(a,b){}));