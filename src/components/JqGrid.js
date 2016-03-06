/**
 * JqGrid component
 *
 * version <tt>$ Version: 1.0 $</tt> date:2016/02/29
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 *
 * example:
 * <ReactPum.JqGrid options={options} />
 *
 * jqGrid 라이브러리에 종속적이다.
 *
 */
'use strict';

var React = require('react');
var ReactDom = require('react-dom');

var Util = require('../services/util');

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

module.exports = React.createClass({
	displayName: 'JqGrid',
	/*
	getInitialState: function() {
		return {
			gridId: '',
			pagerId: ''
		};
	},
	 getUUID: function() {
	 return Util.getUUID();
	 },
	*/
	/*
	componentWillMount: function() {
	 // 최초 렌더링이 일어나기 직전(한번 호출)
	 console.log('componentWillMount');
	 console.log(this.props.options);
	 },
	*/
	componentDidMount: function() {
		console.log('componentDidMount');
		this.init();
	},
	gridId: getUUID(),
	pagerId: getUUID(),
	getOptions: function() {
		var propOptions = this.props.options,
			options = $.extend({}, defaultOptions, propOptions);

		if(propOptions && propOptions.hasOwnProperty('groupingView')) {
			$.extend(options['groupingView'], defaultOptions['groupingView'], propOptions['groupingView']);
		}

		// 페이징 처리
		if(this.props.paging == true) {
			options.pager = '#' + this.pagerId;
		}

		return options;
	},
	init: function() {

		//console.log(this);
		//console.log(ReactDom.findDOMNode(this.refs.jqgrid));
		//table = ReactDom.findDOMNode(this.refs.jqgrid);
		//console.log($(table));
		//$(table).jqGrid(options);
		//gridId = this.getUUID();
		//this.setState({gridId: gridId});
		//console.log(this.getOptions());
		$('#'+this.gridId).jqGrid(this.getOptions());

		/*
		$(element).find("#eventsgrid")[0].addJSONData(this.props.eventsModel.attributes);
		$(element).find("#eventsgrid").jqGrid('setSelection', this.props.eventModel.attributes.title, false);
		*/
		//$(element).find("#eventsgrid").jqGrid('sortGrid', 'title', false, context.props.gridData.order.sortorder); Bool not fired?¿?¿¿ -> Obrir cas a tirand!!!!!!
	},
	componentWillUpdate: function() {
		console.log('componentWillUpdate');
		//var element = this.findDOMNode();//getDOMNode();
		//$(element).find("#eventsgrid").GridUnload();
	},
	componentDidUpdate: function(prevProps, prevState) {
		console.log('componentDidUpdate');
		//var element = this.getDOMNode();
		//this.init();
	},
	componentWillUnmount: function() {
		console.log('componentWillUnmount');
		//var element = this.getDOMNode();
		//$(element).find("#eventsgrid").GridUnload();
	},
	render : function() {
		console.log('render');
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
			<div>
				<table id={this.gridId} />
				<div id={this.pagerId} />
			</div>
		);
	}
});