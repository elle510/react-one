var React = require('react');

module.exports = React.createClass({
	componentDidMount: function() {
		//var element = this.getDOMNode();
		this.initJQueryPlugin();
	},
	initJQueryPlugin: function () {
		var element = this.getDOMNode();
		var context = this;
		$(element).find("#eventsgrid").jqGrid({
			styleUI : 'Bootstrap',
			data: this.props.data,
			datatype: "local",
			colNames:['Inv No','Date', 'Client', 'Amount','Tax','Total','Notes'],
			colModel:[
				{name:'id',index:'id', width:60, sorttype:'int'},
				{name:'invdate',index:'invdate', width:90, sorttype:'date', formatter:'date'},
				{name:'name',index:'name', width:100, editable:true},
				{name:'amount',index:'amount', width:80, align:'right',sorttype:'float', formatter:'number', editable:true},
				{name:'tax',index:'tax', width:80, align:'right',sorttype:'float', editable:true},
				{name:'total',index:'total', width:80,align:'right',sorttype:'float'},
				{name:'note',index:'note', width:150, sortable:false}
			],
			rowNum: 10,
			rowList: [10,20,30],
			sortname: '',
			viewrecords: true,
			sortorder: "desc",
			caption: "",
			pager: '#eventsgridpager',
			autowidth: true,
			loadOnce: true,
			scrollOffset: false,
			height: '',
			subGrid: false,
			loadComplete: function (maingrid_id) {
				//alert(maingrid_id);
			}
		});
		/*
		$(element).find("#eventsgrid")[0].addJSONData(this.props.eventsModel.attributes);
		$(element).find("#eventsgrid").jqGrid('setSelection', this.props.eventModel.attributes.title, false);
		*/
		//$(element).find("#eventsgrid").jqGrid('sortGrid', 'title', false, context.props.gridData.order.sortorder); Bool not fired?¿?¿¿ -> Obrir cas a tirand!!!!!!
	},
	componentWillUpdate: function(){
		var element = this.findDOMNode();//getDOMNode();
		$(element).find("#eventsgrid").GridUnload();
	},
	componentDidUpdate: function(prevProps, prevState) {
		var element = this.getDOMNode();
		this.initJQueryPlugin();		
	},
	componentWillUnmount: function(){
		var element = this.getDOMNode();
		$(element).find("#eventsgrid").GridUnload();
	},
	render : function() {
		return (
			<div><table id="eventsgrid" /><div id="eventsgridpager"></div></div>
		);
	}
});