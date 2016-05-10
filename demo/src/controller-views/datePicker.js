'use strict';

var React = require('react');

var _date, _oldDate, _startDate, _endDate, _startRangeDate, _endRangeDate,
    // Predefined Ranges
    predefined_ranges = {
    '금일': [moment(), moment()],
    '전일': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    '일주일전': [moment().subtract(6, 'days'), moment()],
    '한달전': [moment().subtract(29, 'days'), moment()],
    '이번달': [moment().startOf('month'), moment().endOf('month')],
    '지난달': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
};

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
        _startDate = data.startDate;
        _endDate = data.endDate;
    },
    getRangeDate: function() {
        alert('startDate: ' + _startDate + '\n' + 'endDate: ' + _endDate);
    },
    setRangeDate: function() {
        this.setState({startDate: '2016-03-10', endDate:'2016-04-15'});
    },
    onRangeChange: function(event, startDate, endDate, picker) {
        _startDate = startDate;
        _endDate = endDate;
    },
    onRangeDisabled: function() {
        let range_disabled = this.state.range_disabled == false,
            range_disabledText = (range_disabled == false) ? 'Disabled' : 'Enabled';
        this.setState({startDate: _startDate, endDate: _endDate, range_disabled: range_disabled, range_disabledText: range_disabledText});
    },
    rangesInit: function(data) {
        _startRangeDate = data.startDate;
        _endRangeDate = data.endDate;
    },
    getRangesDate: function() {
        alert('startDate: ' + _startRangeDate + '\n' + 'endDate: ' + _endRangeDate);
    },
    setRangesDate: function() {
        this.setState({startRangeDate: predefined_ranges['일주일전'][0], endRangeDate: predefined_ranges['일주일전'][1]});
    },
    onRangesHide: function(event, startDate, endDate, picker) {
        _startRangeDate = startDate;
        _endRangeDate = endDate;
    },
    onRangesDisabled: function() {
        let ranges_disabled = this.state.ranges_disabled == false,
            ranges_disabledText = (ranges_disabled == false) ? 'Disabled' : 'Enabled';
        this.setState({ranges_disabled: ranges_disabled, ranges_disabledText: ranges_disabledText});
    },
    getInitialState: function() {
        _date = '2016-03-01';
        _startDate = '2016-03-01';
        _endDate = '2016-04-05';
        return {date: _date, disabled: false, disabledText: 'Disabled', startDate: _startDate, endDate: _endDate, range_disabled: false, range_disabledText: 'Disabled', startRangeDate: _startRangeDate, endRangeDate: _endRangeDate, ranges_disabled: false, ranges_disabledText: 'Disabled'};
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
                                                    {'<Pum.DatePicker name="datepicker_name" onInit={this.onInit} date={this.state.date} onChange={this.onChange} timePicker={true} disabled={this.state.disabled} />'}
                                                </pre>
                                            </Pum.TabContent>
                                        </Pum.TabContents>
                                    </Pum.TabSet>
                                </Pum.HiddenContent>
                            </div>
                        </div>
                    </div>{/* end default */}
                    <div className="vspace-12" />

                    <div className="row">{/* start DateRangePicker */}
                        <div className="row">
                            <div className="col-md-12">
                                <h5>DateRangePicker (기간선택)</h5>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-5">
                                <Pum.DateRangePicker startName="startDate" endName="endDate" startDate={this.state.startDate} endDate={this.state.endDate}
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
                                                    {'<Pum.DateRangePicker fromName="startDate" toName="endDate" startDate={this.state.startDate} endDate={this.state.endDate} onInit={this.onRangeInit} onChange={this.onRangeChange} timePicker={false} disabled={this.state.range_disabled} />'}
                                                </pre>
                                            </Pum.TabContent>
                                        </Pum.TabContents>
                                    </Pum.TabSet>
                                </Pum.HiddenContent>
                            </div>
                        </div>
                    </div>{/* end DateRangePicker */}
                    <div className="vspace-12" />

                    <div className="row">{/* start Predefined Ranges */}
                        <div className="row">
                            <div className="col-md-12">
                                <h5>Predefined Ranges</h5>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <Pum.DateRanges startName="startDate1" endName="endDate1" ranges={predefined_ranges} disabled={this.state.ranges_disabled}
                                                startDate={this.state.startRangeDate} endDate={this.state.endRangeDate} init={this.rangesInit} onHide={this.onRangesHide} />
                            </div>
                            <div className="col-md-1">
                                <button onClick={this.getRangesDate}>getRangesDate</button>
                            </div>
                            <div className="col-md-1">
                                <button onClick={this.setRangesDate}>setRangesDate</button>
                            </div>
                            <div className="col-md-1">
                                <button onClick={this.onRangesDisabled}>{this.state.ranges_disabledText}</button>
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
                                                    {'<Pum.DateRanges startName="startDate" endName="endDate" ranges={predefined_ranges} disabled={this.state.ranges_disabled} />'}
                                                </pre>
                                            </Pum.TabContent>
                                        </Pum.TabContents>
                                    </Pum.TabSet>
                                </Pum.HiddenContent>
                            </div>
                        </div>
                    </div>{/* end Predefined Ranges */}
                    <div className="vspace-12" />

                </div>

                <div className="page-footer">

                </div>

            </div>
        );
    }
});

module.exports = DatePicker;