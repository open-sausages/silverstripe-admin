!function(e){function t(r){if(n[r])return n[r].exports;var a=n[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,t),a.l=!0,a.exports}var n={};t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s="./client/src/i18n.js")}({"./client/src/i18n.js":function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=function(){function e(){r(this,e),this.defaultLocale="en_US",this.currentLocale=this.detectLocale(),this.lang={}}return a(e,[{key:"setLocale",value:function(e){this.currentLocale=e}},{key:"getLocale",value:function(){return null!==this.currentLocale?this.currentLocale:this.defaultLocale}},{key:"_t",value:function(e,t,n,r){var a=t||"";if(!this.lang)return a;for(var i=this.getLocale(),o=[i,i.replace(/_[\w]+/i,""),this.defaultLocale,this.defaultLocale.replace(/_[\w]+/i,"")],u=0;u<o.length;u++){var l=o[u];if(this.lang[l]&&this.lang[l][e])return this.lang[l][e]}return a}},{key:"addDictionary",value:function(e,t){void 0===this.lang[e]&&(this.lang[e]={});for(var n in t)this.lang[e][n]=t[n]}},{key:"getDictionary",value:function(e){return this.lang[e]}},{key:"stripStr",value:function(e){return e.replace(/^\s*/,"").replace(/\s*$/,"")}},{key:"stripStrML",value:function(e){for(var t=e.split("\n"),n=0;n<t.length;n+=1)t[n]=stripStr(t[n]);return stripStr(t.join(" "))}},{key:"sprintf",value:function(e){for(var t=arguments.length,n=Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];if(0===n.length)return e;var a=new RegExp("(.?)(%s)","g"),i=0;return e.replace(a,function(e,t,r,a,o){return"%"===t?e:t+n[i++]})}},{key:"inject",value:function(e,t){var n=new RegExp("{([A-Za-z0-9_]*)}","g");return e.replace(n,function(e,n,r,a){return t[n]?t[n]:e})}},{key:"detectLocale",value:function(){var t=document.documentElement.getAttribute("lang");if(t||(t=document.body.getAttribute("lang")),!t)for(var n=document.getElementsByTagName("meta"),r=0;r<n.length;r++)n[r].attributes["http-equiv"]&&"content-language"===n[r].attributes["http-equiv"].nodeValue.toLowerCase()&&(t=n[r].attributes.content.nodeValue);t||(t=this.defaultLocale);if(2===t.length)for(var a in e.lang)if(a.substr(0,2).toLowerCase()===t.toLowerCase())return a;var i=t.match(/([^-|_]*)[-|_](.*)/);return i?i[1].toLowerCase()+"_"+i[2].toUpperCase():null}},{key:"addEvent",value:function(e,t,n,r){return e.addEventListener?(e.addEventListener(t,n,r),!0):e.attachEvent?e.attachEvent("on"+t,n):void console.log("Handler could not be attached")}}]),e}(),o=new i;window.ss=void 0!==window.ss?window.ss:{},window.ss.i18n=window.i18n=o,t.default=o}});