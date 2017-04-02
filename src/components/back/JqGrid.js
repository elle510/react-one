/**
 * JqGrid component
 *
 * version <tt>$ Version: 1.0 $</tt> date:2016/02/29
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 *
 * example:
 * <Pum.JqGrid options={options} />
 *
 * jqGrid 라이브러리에 종속적이다.
 *
 */
'use strict';

var React = require('react');
var PropTypes = require('react').PropTypes;
//var classNames = require('classnames');
//var ReactDom = require('react-dom');

var Util = require('../services/Util');

function getUUID() {
	return Util.getUUID();
}

var defaultOptions = {
	mtype: 'POST',
	datatype: "json",
	styleUI : 'Bootstrap',
	jsonReader: {
		page: 'resultValue.page',
		total: 'resultValue.total',
		root: 'resultValue.list',
		records: 'resultValue.records',
		repeatitems: false,
		//id: 'id',
		cell: 'resultValue.cell'
	},
	//caption: "공지사항 목록",
	viewrecords: true,
	recordpos: 'left',		// record(현재 인덱스/ 총개수) 위치
	rowNum: 20,
	rowList: [20, 40, 60, 80, 100],
	autowidth: true,
	shrinkToFit: true,		// 컬럼 width가 자동조절인지(true) 지정한 값인지(false)
	height: 'auto',
	//gridview: true,
	//hidegrid: true,		// 그리드 접힘/펼침 버튼 유무
	//altRows: true,
	//autoencode: true,
	multiselect: true,
	multiboxonly: false,
	grouping: false,		// grouping 할 경우 default groupText 설정 (grouping 제어는 ctrl에서 한다.)
	groupingView: {
//    	groupField : ['invdate'],
//    	groupColumnShow : [true],
		groupText : ['<b>{0} ({1})</b>']
//    	groupCollapse : false,
//    	groupOrder: ['desc'],
//    	groupSummary: [false]
	}
};

var JqGrid = React.createClass({
	displayName: 'JqGrid',
	propTypes: {
		id: PropTypes.string,
		pagerId: PropTypes.string,
		className: PropTypes.string,
		options: PropTypes.object,
		paging: PropTypes.bool
	},
	id: getUUID(),
	pagerId: '',
	getOptions: function() {
		var propOptions = this.props.options,
			options = $.extend({}, defaultOptions, propOptions);

		if(propOptions && propOptions.hasOwnProperty('groupingView')) {
			$.extend(options['groupingView'], defaultOptions['groupingView'], propOptions['groupingView']);
		}

		// 페이징 처리
		if(typeof this.props.paging === 'undefined') {
			options.pager = '#' + this.pagerId;
		}else {
			if(this.props.paging == true) {
				options.pager = '#' + this.pagerId;
			}
		}

		return options;
	},
	init: function() {

		$('#' + this.id).jqGrid(this.getOptions());

		/*
		$(element).find("#eventsgrid")[0].addJSONData(this.props.eventsModel.attributes);
		$(element).find("#eventsgrid").jqGrid('setSelection', this.props.eventModel.attributes.title, false);
		*/
		//$(element).find("#eventsgrid").jqGrid('sortGrid', 'title', false, context.props.gridData.order.sortorder); Bool not fired?¿?¿¿ -> Obrir cas a tirand!!!!!!
	},
	componentWillMount: function() {
		// 최초 렌더링이 일어나기 직전(한번 호출)
		let id = this.props.id;
		if(typeof id === 'undefined') {
			id = Util.getUUID();
		}

		this.id = id;

		let pagerId = this.props.pagerId;
		if(typeof pagerId === 'undefined') {
			pagerId = Util.getUUID();
		}

		this.pagerId = pagerId;
	},
	componentDidMount: function() {
		//console.log('JqGrid Component componentDidMount');
		this.init();
	},
	componentWillUpdate: function() {
		//console.log('JqGrid Component componentWillUpdate');
		//var element = this.findDOMNode();//getDOMNode();
		//$(element).find("#eventsgrid").GridUnload();
	},
	componentDidUpdate: function(prevProps, prevState) {
		//console.log('JqGrid Component componentDidUpdate');
		//var element = this.getDOMNode();
		//this.init();
	},
	componentWillUnmount: function() {
		//console.log('JqGrid Component componentWillUnmount');
		//var element = this.getDOMNode();
		//$(element).find("#eventsgrid").GridUnload();
	},
	render : function() {
		//console.log('JqGrid Component render');
		/*
		var _table = function() {
			return React.DOM.table({ref: 'jqgrid'});
		};
		var _pager = function() {
			return React.DOM.div({ref: 'jqgrid_pager'});
		};
		console.log(_table());
		console.log(_pager());
		return (
			<div>
				{React.DOM.table({ref: 'jqgrid'})}
				{React.DOM.div({ref: 'jqgrid_pager'})}
			</div>
		);
		*/
		return (
			<div className={this.props.className}>
				<table id={this.id} />
				<div id={this.pagerId} />
			</div>
		);
	}
});

module.exports = JqGrid;