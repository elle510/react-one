'use strict';

var React = require('react');

var mydata = [
    {id:'1',type:'서버',name:'서버 인벤토리',desc:'서버 인벤토리에 대한 보고서 템플릿',report:'2',create:'2111.00'},
    {id:'2',type:'작업',name:'서버별 작업 결과',desc:'서버별 작업에 대한 결과 보고서 템플릿',report:'3',create:'2111.00'},
    {id:'3',type:'서버',name:'서버 인벤토리',desc:'서버 인벤토리에 대한 보고서 템플릿',report:'2',create:'2111.00'},
    {id:'4',type:'작업',name:'서버별 작업 결과',desc:'서버별 작업에 대한 결과 보고서 템플릿',report:'3',create:'2111.00'},
    {id:'5',type:'서버',name:'서버 인벤토리',desc:'서버 인벤토리에 대한 보고서 템플릿',report:'2',create:'2111.00'},
    {id:'6',type:'작업',name:'서버별 작업 결과',desc:'서버별 작업에 대한 결과 보고서 템플릿',report:'3',create:'2111.00'},
    {id:'7',type:'서버',name:'서버 인벤토리',desc:'서버 인벤토리에 대한 보고서 템플릿',report:'2',create:'2111.00'},
    {id:'8',type:'작업',name:'서버별 작업 결과',desc:'서버별 작업에 대한 결과 보고서 템플릿',report:'3',create:'2111.00'},
    {id:'9',type:'서버',name:'서버 인벤토리',desc:'서버 인벤토리에 대한 보고서 템플릿',report:'2',create:'2111.00'},
    {id:'10',type:'작업',name:'서버별 작업 결과',desc:'서버별 작업에 대한 결과 보고서 템플릿',report:'3',create:'2111.00'},
    {id:'11',type:'서버',name:'서버 인벤토리',desc:'서버 인벤토리에 대한 보고서 템플릿',report:'2',create:'2111.00'},
    {id:'12',type:'작업',name:'서버별 작업 결과',desc:'서버별 작업에 대한 결과 보고서 템플릿',report:'3',create:'2111.00'},
    {id:'13',type:'서버',name:'서버 인벤토리',desc:'서버 인벤토리에 대한 보고서 템플릿',report:'2',create:'2111.00'},
    {id:'14',type:'작업',name:'서버별 작업 결과',desc:'서버별 작업에 대한 결과 보고서 템플릿',report:'3',create:'2111.00'},
    {id:'15',type:'서버',name:'서버 인벤토리',desc:'서버 인벤토리에 대한 보고서 템플릿',report:'2',create:'2111.00'},
    {id:'16',type:'작업',name:'서버별 작업 결과',desc:'서버별 작업에 대한 결과 보고서 템플릿',report:'3',create:'2111.00'},
    {id:'17',type:'서버',name:'서버 인벤토리',desc:'서버 인벤토리에 대한 보고서 템플릿',report:'2',create:'2111.00'},
    {id:'18',type:'작업',name:'서버별 작업 결과',desc:'서버별 작업에 대한 결과 보고서 템플릿',report:'3',create:'2111.00'},
];

function detailViewLink(cellvalue, options, rowObject) {
    //return '<a href="template/view/' + rowObject.id + '">' + cellvalue + '</a>';
    return '<a href="#/template-form">' + cellvalue + '</a>';
    //return <Link to="/template/view">{cellvalue}</Link>;
};

var ReportList = React.createClass({
    addReport: function() {

    },
    deleteTemp: function() {

    },
    refresh: function() {

    },
    gridOptions: {
        data: mydata,
        datatype: "local",
        rowNum: 10,
        rowList: [10,20,30],
        colNames: ['id','타입', '템플릿 이름', '설명', '보고서', '생성'],
        colModel: [
            {name: 'id', index: 'id', hidden: true},
            {name: 'type', index: 'type', width: 80},
            {name: 'name', index: 'name', width: 100, formatter: detailViewLink},
            {name: 'desc', index: 'desc', width: 150},
            {name: 'report', index: 'report', width: 50, align:"center", formatter: function(cellvalue, options, rowObject) {
                return '<a href="#/report-list">' + cellvalue + ' <i class="fa fa-list-alt"></i>' + '</a>';
            }},
            {name: 'create', index: 'create', width: 50, align:"center"}
        ]
    },
    render: function() {
        return (
            <div className="page-content container-980">
                <div className="page-header">
                    <span className="title">보고서 목록</span>
                </div>

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
                                                    <input type="text" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-5">
                                            <div className="search-group">
                                                <label className="search-label">템플릿 이름</label>
                                                <div className="search-item">
                                                    <input type="text" />
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
                                <button type="button" className="btn btn-default" onClick={this.addReport}>추가</button>
                                <button type="button" className="btn btn-default" onClick={this.deleteTemp}>삭제</button>
                                <button type="button" className="btn btn-default" onClick={this.refresh}><i className="fa fa-refresh"></i></button>
                            </div>
                        </div>

                        {/* 보고서 목록 */}
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

module.exports = ReportList;