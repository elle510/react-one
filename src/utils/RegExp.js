/**
 * RegExp services
 * 
 * version <tt>$ Version: 1.0 $</tt> date:2016/05/20
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 * 
 * example:
 * var RegExp = require('../services/RegExp');
 * RegExp.checkEmail(strValue);
 *
 * Puf.RegExp.checkEmail(strValue);
 */
'use strict';

var regExp_EMAIL = /[0-9a-zA-Z][_0-9a-zA-Z-]*@[_0-9a-zA-Z-]+(\.[_0-9a-zA-Z-]+){1,2}$/;

function checkEmail(strValue) {
	if (!strValue.match(regExp_EMAIL)) {
		return false;
	}
	return true;
}

module.exports = {
	checkEmail: checkEmail
};