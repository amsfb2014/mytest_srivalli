require.config({waitSeconds:600,baseUrl:"../js",paths:{jquery:"lib/jquery",underscore:"lib/lodash.underscore",backbone:"lib/backbone",AMA:"ama/AMA",Envs:"ama/Envs",AmaConfig:"ama/Config"},shim:{"jquery-ui":{exports:"$",deps:["jquery"]},backbone:{deps:["underscore","jquery"],exports:"Backbone"},Envs:{deps:["underscore"]},AmaConfig:{deps:["AMA","underscore"]}}});require(["jquery","underscore","backbone","AMA","Envs","AmaConfig"],function(e,d,f){var b=0;var c=false;var a={initialize:function(){var g=a._getCookie("debugmode");if(g===""){g=a._isDevEnv()}else{a._setCookie("debugmode",g==="true",1)}window.location.href="main"+(g==="true"?"_debug":"")+".html"},_getParameterByName:function(g){g=g.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");var i=new RegExp("[\\?&]"+g+"=([^&#]*)"),h=i.exec(location.search);return h==null?"":decodeURIComponent(h[1].replace(/\+/g," "))},_getCookie:function(g){if(document.cookie.length>0){c_start=document.cookie.indexOf(g+"=");if(c_start!=-1){c_start=c_start+g.length+1;c_end=document.cookie.indexOf(";",c_start);if(c_end==-1){c_end=document.cookie.length}return unescape(document.cookie.substring(c_start,c_end))}}return""},_setCookie:function(h,i,g){var j=new Date();j.setDate(j.getDate()+g);document.cookie=h+"="+escape(i)+((g==null)?"":";expires="+j.toGMTString())},_isDevEnv:function(){var h=false;var g=AMA.envs[window.location.hostname].type;h=g==="DEV";a._setCookie("debugmode",h,1);return h}};a.initialize()});