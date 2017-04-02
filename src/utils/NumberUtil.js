/**
 * NumberUtil services
 * 
 * version <tt>$ Version: 1.0 $</tt> date:2016/05/19
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 * 
 * example:
 * var NumberUtil = require('../services/NumberUtil');
 * NumberUtil.digit();
 *
 * Puf.NumberUtil.digit();
 */
'use strict';

export default class NumberUtil {
	static digit(i) {
		var displayText;
		if(i<10) {
			displayText = '0'+i;
		}else {
			displayText = i.toString();
		}
		return displayText;
	}
}