'use strict';

var React = require('react');
import { Link } from 'react-router'

var mydata = [
    {id:'1',invdate:'2010-05-24',name:'test',note:'note',tax:'10.00',total:'2111.00'} ,
    {id:'2',invdate:'2010-05-25',name:'test2',note:'note2',tax:'20.00',total:'320.00'},
    {id:'3',invdate:'2007-09-01',name:'test3',note:'note3',tax:'30.00',total:'430.00'},
    {id:'4',invdate:'2007-10-04',name:'test',note:'note',tax:'10.00',total:'210.00'},
    {id:'5',invdate:'2007-10-05',name:'test2',note:'note2',tax:'20.00',total:'320.00'},
    {id:'6',invdate:'2007-09-06',name:'test3',note:'note3',tax:'30.00',total:'430.00'},
    {id:'7',invdate:'2007-10-04',name:'test',note:'note',tax:'10.00',total:'210.00'},
    {id:'8',invdate:'2007-10-03',name:'test2',note:'note2',amount:'300.00',tax:'21.00',total:'320.00'},
    {id:'9',invdate:'2007-09-01',name:'test3',note:'note3',amount:'400.00',tax:'30.00',total:'430.00'},
    {id:'11',invdate:'2007-10-01',name:'test',note:'note',amount:'200.00',tax:'10.00',total:'210.00'},
    {id:'12',invdate:'2007-10-02',name:'test2',note:'note2',amount:'300.00',tax:'20.00',total:'320.00'},
    {id:'13',invdate:'2007-09-01',name:'test3',note:'note3',amount:'400.00',tax:'30.00',total:'430.00'},
    {id:'14',invdate:'2007-10-04',name:'test',note:'note',amount:'200.00',tax:'10.00',total:'210.00'},
    {id:'15',invdate:'2007-10-05',name:'test2',note:'note2',amount:'300.00',tax:'20.00',total:'320.00'},
    {id:'16',invdate:'2007-09-06',name:'test3',note:'note3',amount:'400.00',tax:'30.00',total:'430.00'},
    {id:'17',invdate:'2007-10-04',name:'test',note:'note',amount:'200.00',tax:'10.00',total:'210.00'},
    {id:'18',invdate:'2007-10-03',name:'test2',note:'note2',amount:'300.00',tax:'20.00',total:'320.00'},
    {id:'19',invdate:'2007-09-01',name:'test3',note:'note3',amount:'400.00',tax:'30.00',total:'430.00'},
    {id:'21',invdate:'2007-10-01',name:'test',note:'note',amount:'200.00',tax:'10.00',total:'210.00'},
    {id:'22',invdate:'2007-10-02',name:'test2',note:'note2',amount:'300.00',tax:'20.00',total:'320.00'},
    {id:'23',invdate:'2007-09-01',name:'test3',note:'note3',amount:'400.00',tax:'30.00',total:'430.00'},
    {id:'24',invdate:'2007-10-04',name:'test',note:'note',amount:'200.00',tax:'10.00',total:'210.00'},
    {id:'25',invdate:'2007-10-05',name:'test2',note:'note2',amount:'300.00',tax:'20.00',total:'320.00'},
    {id:'26',invdate:'2007-09-06',name:'test3',note:'note3',amount:'400.00',tax:'30.00',total:'430.00'},
    {id:'27',invdate:'2007-10-04',name:'test',note:'note',amount:'200.00',tax:'10.00',total:'210.00'},
    {id:'28',invdate:'2007-10-03',name:'test2',note:'note2',amount:'300.00',tax:'20.00',total:'320.00'},
    {id:'29',invdate:'2007-09-01',name:'test3',note:'note3',amount:'400.00',tax:'30.00',total:'430.00'}
];

function detailViewLink(cellvalue, options, rowObject) {
    //return '<a href="template/view/' + rowObject.id + '">' + cellvalue + '</a>';
    return '<a href="#/template/view">' + cellvalue + '</a>';
    //return <Link to="/template/view">{cellvalue}</Link>;
};



var ReportTempList = React.createClass({
    search: function() {

    },
    registerTemp: function() {

    },
    deleteTemp: function() {

    },

    gridOptions: {
        data: mydata,
        datatype: "local",
        rowNum: 10,
        rowList: [10,20,30],
        colNames:['Inv No','Date', 'Client', 'Amount','Tax','Total','Notes'],
        colModel:[
            {name:'id',index:'id', width:60, sorttype:"int"},
            {name:'invdate',index:'invdate', width:90, sorttype:"date", formatter:"date"},
            {name:'name',index:'name', width:100, formatter: detailViewLink},
            {name:'amount',index:'amount', width:80, align:"right",sorttype:"float", formatter:"number"},
            {name:'tax',index:'tax', width:80, align:"right",sorttype:"float"},
            {name:'total',index:'total', width:80,align:"right",sorttype:"float"},
            {name:'note',index:'note', width:150, sortable:false}
        ]
    },
    render: function() {
        return (
            <div className="page-content container-980">
                <div className="page-header">
                    <span className="title">보고서 템플릿</span>
                </div>
                <Link to="/template/view">링크</Link>
                <div className="page-body">
                    <div className="row">

                        {/* 검색 */}
                        <div className="row">
                            <div className="col-md-12">
                                <Pum.Fieldset legend="검색">
                                    <div className="row">
                                        <div className="col-md-5">
                                            <div className="search-group">
                                                <label className="search-label">타입</label>
                                                <div className="search-item">
                                                    <input type="text" placeholder="검색어를 입력하세요" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-5">
                                            <div className="search-group">
                                                <label className="search-label">템플릿 이름</label>
                                                <div className="search-item">
                                                    <input type="text" placeholder="검색어를 입력하세요" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Pum.Fieldset>
                            </div>
                        </div>

                        {/* 버튼 */}
                        <div className="row">
                            <div className="col-md-12">
                                <button type="button" className="btn btn-default" onClick={this.search}>조회</button>
                                <button type="button" className="btn btn-default" onClick={this.registerTemp}>등록</button>
                                <button type="button" className="btn btn-default" onClick={this.deleteTemp}>삭제</button>
                            </div>
                        </div>

                        {/* 보고서 템플릿 목록 */}
                        <div className="row">
                            <div className="col-md-12">
                                <Pum.JqGrid options={this.gridOptions} />
                            </div>
                        </div>

                    </div>
                    <div className="vspace-12" />
                </div>

                <div className="page-footer">

                </div>

            </div>
        );
    }
});

module.exports = ReportTempList;