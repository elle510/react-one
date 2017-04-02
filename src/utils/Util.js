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

export default class Util {
	static getUUID() {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
			return v.toString(16);
		});
	}

	static uniqueID() {
		return 'id-' + Math.random().toString(36).substr(2, 9);
	}

	static sleep(milliseconds) {
		var start = new Date().getTime();
		for (var i = 0; i < 1e7; i++) {
			if ((new Date().getTime() - start) > milliseconds) {
				break;
			}
		}
	}

	// 시작페이지로 설정
	static setStartPage(obj, url) {
		obj.style.behavior='url(#default#homepage)';
		//obj.setHomePage('http://internet.scourt.go.kr/');
		obj.setHomePage(url);
	}

	// 쿠키 설정
	/*
	function setCookie(name, value, expires) {
		// alert(name + ", " + value + ", " + expires);
		document.cookie = name + "=" + escape(value) + "; path=/; expires=" + expires.toGMTString();
	}
	*/
	static setCookie(cname, cvalue, exdays, cdomain) {
		var d = new Date();
		d.setTime(d.getTime() + (exdays*24*60*60*1000));
		var expires = 'expires=' + d.toUTCString();
		var domain;
		if(cdomain) {
			domain = '; domain=' + cdomain;
		}
		document.cookie = cname + '=' + escape(cvalue) + '; path=/; ' + expires + domain;
	}

	// 쿠키 가져오기
	/*
	function getCookie(Name) {
		var search = Name + "="
		if (document.cookie.length > 0) { // 쿠키가 설정되어 있다면
			offset = document.cookie.indexOf(search)
			if (offset != -1) { // 쿠키가 존재하면
				offset += search.length
				// set index of beginning of value
				end = document.cookie.indexOf(";", offset)
				// 쿠키 값의 마지막 위치 인덱스 번호 설정
				if (end == -1)
					end = document.cookie.length
				return unescape(document.cookie.substring(offset, end))
			}
		}
		return "";
	}
	*/
	static getCookie(cname) {
		var name = cname + '=';
		var ca = document.cookie.split(';');
		for(var i = 0; i <ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return unescape(c.substring(name.length, c.length));
			}
		}
		return '';
	}
}