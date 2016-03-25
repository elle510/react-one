/**
 * Util services
 * 
 * version <tt>$ Version: 1.0 $</tt> date:2016/03/01
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 * 
 * example:
 * var Util = require('../services/Util');
 * Util.getUUID();
 *
 */
'use strict';

function getUUID() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
		return v.toString(16);
	});
}

function sleep(milliseconds) {
	var start = new Date().getTime();
	for (var i = 0; i < 1e7; i++) {
		if ((new Date().getTime() - start) > milliseconds) {
			break;
		}
	}
}

module.exports = {
	getUUID: getUUID,
	sleep: sleep
};

//angular.module('ps.services.util', [])
//.factory('psUtil', ['$window', '$location', function($window, $location) {
//	var factory = {};
//	factory.show = function(msg) {
//        $window.alert(msg);
//    };
//
//    factory.reverse = function(name) {
//		return name.split("").reverse().join("");
//	};
//
//	// root path
//	factory.getRootPath = function() {
//		// js에서 ContextPath 를 얻을 수 없음 - Root Path를 얻어서 응용하자.
//		/*var offset=location.href.indexOf(location.host)+location.host.length;
//	    var ctxPath=location.href.substring(offset,location.href.indexOf('/',offset+1));
//	    return ctxPath;*/
//
//	    var offset = $window.location.href.indexOf($window.location.host) + $window.location.host.length;
//	    var ctxPath = $window.location.href.substring(offset, $window.location.href.indexOf('/', offset + 1));
//	    return ctxPath;
//	};
//
//	// uuid
//	factory.getUUID = function() {
//		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
//			var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
//			return v.toString(16);
//		});
//	};
//
//	// tooltip
//	factory.tooltip = function(selector) {
//
//		if(typeof selector === 'undefined') {
//			selector = '[data-toggle="tooltip"]';
//		}
////		$(selector).bsTooltip();
//		$(selector).tooltip();
//	};
//
//    return factory;
//}]);
