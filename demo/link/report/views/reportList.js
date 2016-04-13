'use strict';

var React = require('react');
var hashHistory = require('react-router').hashHistory;

var mydata = [
    {id:'1', name:'보고서 이름 #1', display:'시별', period:'지난 24시간', schedule:'매주 월요일 00시', recipient: 'nkia@nkia.co.kr', registrant: 'admin'},
    {id:'2', name:'보고서 이름 #2', display:'일별', period:'지난주', schedule:'매일 02시', recipient: 'user01@nkia.co.kr', registrant: 'admin'},
    {id:'3', name:'보고서 이름 #3', display:'시별', period:'지난 24시간', schedule:'매주 월요일 00시', recipient: 'nkia@nkia.co.kr', registrant: 'admin'},
    {id:'4', name:'보고서 이름 #4', display:'일별', period:'지난주', schedule:'매일 02시', recipient: 'user01@nkia.co.kr', registrant: 'admin'},
    {id:'5', name:'보고서 이름 #5', display:'시별', period:'지난 24시간', schedule:'매주 월요일 00시', recipient: 'nkia@nkia.co.kr', registrant: 'admin'},
    {id:'6', name:'보고서 이름 #6', display:'일별', period:'지난주', schedule:'매일 02시', recipient: 'user01@nkia.co.kr', registrant: 'admin'},
    {id:'7', name:'보고서 이름 #7', display:'시별', period:'지난 24시간', schedule:'매주 월요일 00시', recipient: 'nkia@nkia.co.kr', registrant: 'admin'},
    {id:'8', name:'보고서 이름 #8', display:'일별', period:'지난주', schedule:'매일 02시', recipient: 'user01@nkia.co.kr', registrant: 'admin'},
    {id:'9', name:'보고서 이름 #9', display:'시별', period:'지난 24시간', schedule:'매주 월요일 00시', recipient: 'nkia@nkia.co.kr', registrant: 'admin'},
    {id:'10', name:'보고서 이름 #10', display:'일별', period:'지난주', schedule:'매일 02시', recipient: 'user01@nkia.co.kr', registrant: 'admin'},
    {id:'11', name:'보고서 이름 #11', display:'시별', period:'지난 24시간', schedule:'매주 월요일 00시', recipient: 'nkia@nkia.co.kr', registrant: 'admin'},
    {id:'12', name:'보고서 이름 #12', display:'일별', period:'지난주', schedule:'매일 02시', recipient: 'user01@nkia.co.kr', registrant: 'admin'},
    {id:'13', name:'보고서 이름 #13', display:'시별', period:'지난 24시간', schedule:'매주 월요일 00시', recipient: 'nkia@nkia.co.kr', registrant: 'admin'},
    {id:'14', name:'보고서 이름 #14', display:'일별', period:'지난주', schedule:'매일 02시', recipient: 'user01@nkia.co.kr', registrant: 'admin'},
    {id:'15', name:'보고서 이름 #15', display:'시별', period:'지난 24시간', schedule:'매주 월요일 00시', recipient: 'nkia@nkia.co.kr', registrant: 'admin'},
    {id:'16', name:'보고서 이름 #16', display:'일별', period:'지난주', schedule:'매일 02시', recipient: 'user01@nkia.co.kr', registrant: 'admin'},
    {id:'17', name:'보고서 이름 #17', display:'시별', period:'지난 24시간', schedule:'매주 월요일 00시', recipient: 'nkia@nkia.co.kr', registrant: 'admin'},
    {id:'18', name:'보고서 이름 #18', display:'일별', period:'지난주', schedule:'매일 02시', recipient: 'user01@nkia.co.kr', registrant: 'admin'}
];

function detailViewLink(cellvalue, options, rowObject) {
    //return '<a href="template/view/' + rowObject.id + '">' + cellvalue + '</a>';
    return '<a href="#/report-form">' + cellvalue + '</a>';
    //return <Link to="/template/view">{cellvalue}</Link>;
};

var ReportList = React.createClass({
    search: function() {

    },
    addReport: function() {
        hashHistory.push('/report-form');
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
        colNames: ['id','보고서 이름', '데이터 표시', '조회 기간', '스케줄', '받는 사람', '등록자'],
        colModel: [
            {name: 'id', index: 'id', hidden: true},
            {name: 'name', index: 'name', width: 120, formatter: detailViewLink},
            {name: 'display', index: 'display', width: 100},
            {name: 'period', index: 'period', width: 100},
            {name: 'schedule', index: 'schedule', width: 150},
            {name: 'recipient', index: 'recipient', width: 150},
            {name: 'registrant', index: 'registrant', width: 80}
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

                        {/* 보고서 템플릿 정보 */}
                        <div className="row">
                            <div className="col-md-12">
                                <Pum.Panel>
                                    <Pum.PanelHeader>보고서 템플릿</Pum.PanelHeader>
                                    <Pum.PanelBody>
                                        <div className="row">
                                            <div className="col-md-1">타입</div>
                                            <div className="col-md-2">작업</div>
                                            <div className="col-md-2">템플릿 이름</div>
                                            <div className="col-md-5">서버별 작업결과</div>
                                        </div>
                                    </Pum.PanelBody>
                                </Pum.Panel>
                            </div>
                        </div>

                        {/* 검색 */}
                        <div className="row">
                            <div className="col-md-12">
                                <Pum.Fieldset legend="검색" expand={false}>
                                    <div className="row">
                                        <div className="col-md-5">
                                            <div className="search-group">
                                                <label className="search-label">보고서 이름</label>
                                                <div className="search-item">
                                                    <input type="text" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-5">
                                            <div className="search-group">
                                                <label className="search-label">조회 기간</label>
                                                <div className="search-item">
                                                    <input type="text" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-5">
                                            <div className="search-group">
                                                <label className="search-label">스케줄</label>
                                                <div className="search-item">
                                                    <input type="text" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-5">
                                            <div className="search-group">
                                                <label className="search-label">받는 사람</label>
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
                                <button type="button" className="btn btn-default" onClick={this.search}>조회</button>
                                <button type="button" className="btn btn-default" onClick={this.addReport}>추가</button>
                                <button type="button" className="btn btn-default" onClick={this.deleteTemp}>삭제</button>
                                {/*<button type="button" className="btn btn-default" onClick={this.refresh}><i className="fa fa-refresh"></i></button>*/}
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