'use strict';

var React = require('react');
var hashHistory = require('react-router').hashHistory;

var dataDisplay = [
    {label:'시별', value:'1'},
    {label:'일별', value:'2'},
    {label:'주별', value:'3'},
    {label:'월별', value:'4'},
    {label:'년별', value:'5'}
];

var periods = [
    {label:'지난 1시간', value:'1'},
    {label:'지난 3시간', value:'2'},
    {label:'지난 6시간', value:'3'},
    {label:'지난 12시간', value:'4'},
    {label:'지난 24시간', value:'5'},
    {label:'금일', value:'6'},
    {label:'어제', value:'7'},
    {label:'이번주', value:'8'},
    {label:'지난주', value:'9'},
    {label:'이번달', value:'10'}
];

var ReportForm = React.createClass({
    onCancel: function() {
        hashHistory.push('/report-list');
    },
    getInitialState: function() {
        return {items: dataDisplay, periods: periods};
    },
    render: function() {
        return (
            <div className="page-content container-980">
                <div className="page-header">
                    <span className="title">보고서</span>
                </div>

                <div className="page-body">
                    <div className="row">

                        <form className="form-horizontal">
                            <div className="form-group">
                                <label className="col-md-3 control-label">보고서 템플릿</label>
                                <div className="col-md-9">
                                    <input type="text" className="form-control" name="type" value="서버별 작업결과" disabled/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-md-3 control-label">보고서 이름</label>
                                <div className="col-md-9">
                                    <input type="text" className="form-control" name="reportName" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-md-3 control-label">대상 리소스</label>
                                <div className="col-md-9">
                                    <input type="text" className="form-control" name="target" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-md-3 control-label">데이터 표시</label>
                                <div className="col-md-9">
                                    <Pum.Select name="datadisplay" labelKey="label" valueKey="value" items={this.state.items} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-md-3 control-label">조회 기간</label>
                                <div className="col-md-9">
                                    <Pum.Select name="period" labelKey="label" valueKey="value" items={this.state.periods} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-md-3 control-label">스케줄</label>
                                <div className="col-md-9">
                                    <Pum.Select name="schedule" labelKey="label" valueKey="value" items={this.state.items} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-md-3 control-label">첨부파일</label>
                                <div className="col-md-9">
                                    <div className="checkbox-horizontal">
                                        <Pum.Checkbox name="xls" value="xls"> XLS</Pum.Checkbox>
                                        <Pum.Checkbox name="pdf" value="pdf"> PDF</Pum.Checkbox>
                                        <Pum.Checkbox name="doc" value="doc"> DOC</Pum.Checkbox>
                                        <Pum.Checkbox name="hwp" value="hwp"> HWP</Pum.Checkbox>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-md-3">
                                    <button type="button" className="btn btn-primary">생성</button>
                                </div>
                                <div className="col-md-9">
                                    <button type="submit" className="btn btn-default">저장</button>
                                    <button type="button" className="btn btn-default" onClick={this.onCancel}>취소</button>
                                </div>
                            </div>
                        </form>

                    </div>
                    <div className="vspace-12" />
                </div>

                <div className="page-footer">

                </div>
            </div>
        );
    }
});

module.exports = ReportForm;