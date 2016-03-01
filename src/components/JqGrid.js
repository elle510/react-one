/**
 * ps-grid directives
 *
 * version <tt>$ Version: 1.0 $</tt> date:2016/02/29
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 *
 * example:
 * <ps-grid options="options" data="data"></ps-grid>
 *
 * jqGrid 라이브러리에 종속적이다.
 *
 */

var React = require('react');
var ReactDom = require('react-dom');

var Util = require('../services/util');

var defaultOption = {
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
	componentDidMount: function() {
		console.log('componentDidMount');
		this.init();
	},
	gridId: Util.getUUID(),
	pagerId: Util.getUUID(),
	init: function() {
		var gridId, pagerId,
			propOptions = this.props.options,
			options = $.extend({}, defaultOption, propOptions);

		if(propOptions && propOptions.hasOwnProperty('groupingView')) {
			$.extend(options['groupingView'], defaultOption['groupingView'], propOptions['groupingView']);
		}

		// 페이징 처리
		if(this.props.paging == true) {
			//pagerId = this.getUUID();
			//this.setState({pagerId: pagerId});
			options.pager = '#' + this.pagerId;
		}

		//console.log(this);
		//console.log(ReactDom.findDOMNode(this.refs.jqgrid));
		//table = ReactDom.findDOMNode(this.refs.jqgrid);
		//console.log($(table));
		//$(table).jqGrid(options);
		//gridId = this.getUUID();
		//this.setState({gridId: gridId});
		$('#'+this.gridId).jqGrid(options);

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