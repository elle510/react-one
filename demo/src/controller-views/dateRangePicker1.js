'use strict';

var React = require('react');

var startDate1, endDate1, startDate2, endDate2;
var DateRangePicker = React.createClass({
    getDate1: function() {
        alert('startDate: ' + startDate1 + '\n' + 'endDate: ' + endDate1);
    },
    setDate1: function() {
        this.setState({startDate1: '2016-03-10', endDate1:'2016-03-10'});
    },
    onHide1: function(event, startDate, endDate, picker) {
        startDate1 = startDate;
        endDate1 = endDate;
    },
    onDisabled1: function() {
        let disabled1 = this.state.disabled1 == false,
            disabledText1 = (disabled1 == false) ? 'Disabled' : 'Enabled';
        this.setState({disabled1: disabled1, disabledText1: disabledText1});
    },
    getDate2: function() {
        alert('startDate: ' + startDate2 + '\n' + 'endDate: ' + endDate2);
    },
    setDate2: function() {
        console.log('setDate2');
        this.setState({startDate2: '2016-03-10', endDate2:'2016-04-15'});
    },
    onHide2: function(event, startDate, endDate, picker) {
        startDate2 = startDate;
        endDate2 = endDate;
    },
    onDisabled2: function() {
        let disabled2 = this.state.disabled2 == false,
            disabledText2 = (disabled2 == false) ? 'Disabled' : 'Enabled';
        this.setState({disabled2: disabled2, disabledText2: disabledText2});
    },
    getInitialState: function() {
        startDate2 = '2016-03-01';
        endDate2 = '2016-04-05';
        return {disabled1: false, disabledText1: 'Disabled', startDate2: startDate2, endDate2: endDate2, disabled2: false, disabledText2: 'Disabled'};
    },
    componentDidMount: function() {
        // 최초 렌더링이 일어난 다음(한번 호출)
        prettyPrint();
    },
    render: function() {
        return (
            <div className="page-content">
                <div className="page-header">
                    <h1>DateRangePicker</h1>
                </div>

                <div className="page-body">
                    <div className="row">{/* start default */}
                        <div className="row">
                            <h5>DateRangePicker(singleDatePicker)</h5>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <Pum.DateRangePicker1 startDateName="startDate1" endDateName="endDate1" singlePicker={true} timePicker={true}
                                                    onHide={this.onHide1} disabled={this.state.disabled1} />
                            </div>
                            <div className="col-md-1">
                                <button onClick={this.getDate1}>getDate</button>
                            </div>
                            <div className="col-md-1">
                                <button onClick={this.setDate1}>setDate</button>
                            </div>
                            <div className="col-md-1">
                                <button onClick={this.onDisabled1}>{this.state.disabledText1}</button>
                            </div>
                        </div>
                        <div className="row">
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
                                                {'<Pum.DateRangePicker startDateName="startDate1" endDateName="endDate1" singlePicker={true} timePicker={true} />'}
                                            </pre>
                                        </Pum.TabContent>
                                    </Pum.TabContents>
                                </Pum.TabSet>
                            </Pum.HiddenContent>
                        </div>
                    </div>{/* end default */}
                    <div className="vspace-12" />

                    <div className="row">{/* start horizontal checkbox */}
                        <div className="row">
                            <h5>DateRangePicker (기간선택)</h5>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <Pum.DateRangePicker1 startDateName="startDate2" endDateName="endDate2"
                                                    startDate={this.state.startDate2} endDate={this.state.endDate2}
                                                    onHide={this.onHide2}
                                                    timePicker={true} disabled={this.state.disabled2} />
                            </div>
                            <div className="col-md-1">
                                <button onClick={this.getDate2}>getDate</button>
                            </div>
                            <div className="col-md-1">
                                <button onClick={this.setDate2}>setDate</button>
                            </div>
                            <div className="col-md-1">
                                <button onClick={this.onDisabled2}>{this.state.disabledText2}</button>
                            </div>
                        </div>
                        <div className="row">
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
                    </div>{/* end horizontal checkbox */}
                    <div className="vspace-12" />

                </div>

                <div className="page-footer">

                </div>

            </div>
        );
    }
});

module.exports = DateRangePicker;