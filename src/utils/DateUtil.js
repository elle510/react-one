/**
 * ps-util services
 * 
 * version <tt>$ Version: 1.0 $</tt> date:2016/03/01
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 * 
 * example:
 * app.controller('Ctrl', ['$scope', 'psUtil', function($scope, psUtil) {
 * 	   var rootPath = psUtil.getRootPath();
 * }]);
 * 
 */
'use strict';

function getDateToString(date) {
	var year = date.getFullYear(),
		month = zerofill(date.getMonth() + 1, 2),
		day = zerofill(date.getDate(), 2),
		hours = (date.getHours() < 0) ? '00' : zerofill(date.getHours(), 2),	// daterangepicker hours 9시간 오버표시되는 버그로 인해 빼준다.
		minutes = zerofill(date.getMinutes(), 2),
		seconds = zerofill(date.getSeconds(), 2),
		dateString = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;

	return dateString;
}

function zerofill(n, digits) {
	var zero = '';
	n = n.toString();

	if (n.length < digits) {
		for (var i = 0; i < digits - n.length; i++) {
			zero += '0';
		}
	}

	return zero + n;
}

// date: 기준일, hours: 구하고자하는 이전 시간
function getLastDate(date, hours) {
	return new Date(Date.parse(date) - 1000 * 60 * 60 * hours);
}

module.exports = {
	getDateToString: getDateToString,
	getLastDate: getLastDate
};