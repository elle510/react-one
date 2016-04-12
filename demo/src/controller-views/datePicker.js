'use strict';

var React = require('react');

var _date, _oldDate, _fromDate, _toDate;
var DatePicker = React.createClass({
    getDate: function() {
        alert('date: ' + _date + '\n' + 'oldDate: ' + _oldDate);
    },
    setDate: function() {
        this.setState({date: '2016-03-10'});
    },
    onDisabled: function() {
        let disabled = this.state.disabled == false,
            disabledText = (disabled == false) ? 'Disabled' : 'Enabled';
        this.setState({date: _date, disabled: disabled, disabledText: disabledText});
    },
    onChange: function(event, date, oldDate) {
        _date = date;
        _oldDate = oldDate;
    },
    onInit: function(data) {
        _date = data.date;
    },
    onRangeInit:function(data) {
        _fromDate = data.fromDate;
        _toDate = data.toDate;
    },
    getRangeDate: function() {
        alert('fromDate: ' + _fromDate + '\n' + 'toDate: ' + _toDate);
    },
    setRangeDate: function() {
        this.setState({fromDate: '2016-03-10', toDate:'2016-04-15'});
    },
    onRangeChange: function(event, fromDate, toDate, picker) {
        _fromDate = fromDate;
        _toDate = toDate;
    },
    onRangeDisabled: function() {
        let range_disabled = this.state.range_disabled == false,
            range_disabledText = (range_disabled == false) ? 'Disabled' : 'Enabled';
        this.setState({fromDate: _fromDate, toDate: _toDate, range_disabled: range_disabled, range_disabledText: range_disabledText});
    },
    getInitialState: function() {
        _date = '2016-03-01';
        _fromDate = '2016-03-01';
        _toDate = '2016-04-05';
        return {date: _date, disabled: false, disabledText: 'Disabled', fromDate: _fromDate, toDate: _toDate, range_disabled: false, range_disabledText: 'Disabled'};
    },
    componentDidMount: function() {
        // 최초 렌더링이 일어난 다음(한번 호출)
        prettyPrint();
    },
    render: function() {
        return (
            <div className="page-content">
                <div className="page-header">
                    <span className="title">DatePicker</span>
                </div>

                <div className="page-body">
                    <div className="row">{/* start default */}
                        <div className="row">
                            <div className="col-md-12">
                                <h5>DatePicker</h5>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <Pum.DatePicker name="datepicker_name" onInit={this.onInit} date={this.state.date} onChange={this.onChange}
                                                timePicker={true} disabled={this.state.disabled} />
                            </div>
                            <div className="col-md-1">
                                <button onClick={this.getDate}>getDate</button>
                            </div>
                            <div className="col-md-1">
                                <button onClick={this.setDate}>setDate</button>
                            </div>
                            <div className="col-md-1">
                                <button onClick={this.onDisabled}>{this.state.disabledText}</button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <Pum.HiddenContent expandLabel="소스 보기" collapseLabel="소스 닫기"
                                                expandIcon="fa fa-caret-right" collapseIcon="fa fa-caret-down">
                                    <Pum.TabSet>
                                        <Pum.Tabs>
                                            <Pum.Tab>JSX 코드</Pum.Tab>
                                        </Pum.Tabs>
                                        <Pum.TabContents>
                                            <Pum.TabContent>
                                                <pre className="prettyprint linenums">
                                                    {/*'// html\n'*/}
                                                    {'<Pum.DatePicker startDateName="startDate1" endDateName="endDate1" singlePicker={true} timePicker={true} />'}
                                                </pre>
                                            </Pum.TabContent>
                                        </Pum.TabContents>
                                    </Pum.TabSet>
                                </Pum.HiddenContent>
                            </div>
                        </div>
                    </div>{/* end default */}
                    <div className="vspace-12" />

                    <div className="row">{/* start horizontal checkbox */}
                        <div className="row">
                            <div className="col-md-12">
                                <h5>DateRangePicker (기간선택)</h5>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-5">
                                <Pum.DateRangePicker fromName="fromDate" toName="toDate" fromDate={this.state.fromDate} toDate={this.state.toDate}
                                                     onInit={this.onRangeInit} onChange={this.onRangeChange} timePicker={false} disabled={this.state.range_disabled} />
                            </div>
                            <div className="col-md-1">
                                <button onClick={this.getRangeDate}>getDate</button>
                            </div>
                            <div className="col-md-1">
                                <button onClick={this.setRangeDate}>setDate</button>
                            </div>
                            <div className="col-md-1">
                                <button onClick={this.onRangeDisabled}>{this.state.range_disabledText}</button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <Pum.HiddenContent expandLabel="소스 보기" collapseLabel="소스 닫기"
                                                expandIcon="fa fa-caret-right" collapseIcon="fa fa-caret-down">
                                    <Pum.TabSet>
                                        <Pum.Tabs>
                                            <Pum.Tab>JSX 코드</Pum.Tab>
                                        </Pum.Tabs>
                                        <Pum.TabContents>
                                            <Pum.TabContent>
                                                <pre className="prettyprint linenums">
                                                    {/*'// html\n'*/}
                                                    {'<Pum.RadioGroup name="radio_name" selectedValue="value1" onChange={this.onChange} horizontal={true}>\n'}
                                                    {'  <Pum.Radio value="value1"> 라디오1</Pum.Radio>\n'}
                                                    {'  <Pum.Radio value="value2"> 라디오2</Pum.Radio>\n'}
                                                    {'</Pum.RadioGroup>'}
                                                </pre>
                                            </Pum.TabContent>
                                        </Pum.TabContents>
                                    </Pum.TabSet>
                                </Pum.HiddenContent>
                            </div>
                        </div>
                    </div>{/* end horizontal checkbox */}
                    <div className="vspace-12" />

                </div>

                <div className="page-footer">

                </div>

            </div>
        );
    }
});

module.exports = DatePicker;