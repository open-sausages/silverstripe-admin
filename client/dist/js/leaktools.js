webpackJsonp([2],{"./client/src/legacy/leaktools.js":function(e,o,n){"use strict";var t=n("jquery"),l=function(e){return e&&e.__esModule?e:{default:e}}(t),c=function(e){var o=e.cloneNode(!0),n=(0,l.default)("<div></div>");return n.append(o),n.html()};l.default.leaktools={logDuplicateElements:function(){var e=(0,l.default)("*"),o=!1;e.each(function(n,t){e.not(t).each(function(e,n){c(t)==c(n)&&(o=!0,console.log(t,n))})}),o||console.log("No duplicates found")},logUncleanedElements:function(e){l.default.each(l.default.cache,function(){var o=this.handle&&this.handle.elem;if(o){for(var n=o;n&&1==n.nodeType;)n=n.parentNode;n?n!==document&&console.log("Attached, but to",n,"not our document",o):(console.log("Unattached",o),console.log(this.events),e&&(0,l.default)(o).unbind().remove())}})}}}},["./client/src/legacy/leaktools.js"]);