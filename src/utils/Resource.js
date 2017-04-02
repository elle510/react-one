/**
 * Resource services
 * 
 * version <tt>$ Version: 1.0 $</tt> date:2016/06/03
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 * 
 * example:
 * Puf.Resource.loadResource();
 * Puf.Resource.i18n(key);
 *
 * 다국어 처리
 */
'use strict';

// load properties
var loadResource = function(name, path, mode, language, callback) {

	$.i18n.properties({
	    name: name,
	    path: path,
	    mode: mode,
	    language: language,
	    callback: callback
		/*
		function() {
			// Accessing a simple value through the map
			jQuery.i18n.prop('msg_hello');
			// Accessing a value with placeholders through the map
			jQuery.i18n.prop('msg_complex', 'John');
	
			// Accessing a simple value through a JS variable
			alert(msg_hello +' '+ msg_world);
			// Accessing a value with placeholders through a JS function
			alert(msg_complex('John'));
			alert(msg_hello);
	    }
	    */
	});
};

var i18n = function(key) {
	//var args = '\'' + key + '\'';
	//for (var i=1; i<arguments.length; i++) {
     //   args += ', \'' + arguments[i] + '\'';
	//}
	//return eval('$.i18n.prop(' + args + ')');
	return $.i18n.prop.apply(this, arguments);
};

var i18nByKey = function(key) {
	//var args = '\'' + key + '\'';
	//for (var i=1; i<arguments.length; i++) {
	//	args += ', \'' + $.i18n.prop(arguments[i]) + '\'';
	//}
	//return eval('$.i18n.prop(' + args + ')');
	var args = [key];
	for (var i=1; i<arguments.length; i++) {
		args.push($.i18n.prop(arguments[i]));
	}
	return $.i18n.prop.apply(this, args);
};

module.exports = {
	loadResource: loadResource,
	i18n: i18n,
	i18nByKey: i18nByKey
};