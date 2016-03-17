'use strict';

var React = require('react');

var Radio = React.createClass({
    onRadioChange: function(event, value) {
        //console.log('--- checkbox view ---');
        //console.log(event);
        //console.log(value);
    },
    componentDidMount: function() {
        // 최초 렌더링이 일어난 다음(한번 호출)
        prettyPrint();
    },
    render: function() {
        return (
            <div className="page-content">
                <div className="page-header">
                    <h1>Radio</h1>
                </div>

                <div className="page-body">
                    <div className="row">{/* start default */}
                        <div className="row">
                            <h5>Radio</h5>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <Pum.RadioGroup name="radio_name" selectedValue="checkValue2" onChange={this.onRadioChange}>
                                    <Pum.Radio value="checkValue1"> 라디오1</Pum.Radio>
                                    <Pum.Radio value="checkValue2"> 라디오2</Pum.Radio>
                                </Pum.RadioGroup>
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
                                                {'<Pum.RadioGroup name="radio_name" selectedValue="value2" onChange={this.onChange}>\n'}
                                                {'  <Pum.Radio value="value1"> 라디오1</Pum.Radio>\n'}
                                                {'  <Pum.Radio value="value2"> 라디오2</Pum.Radio>\n'}
                                                {'</Pum.RadioGroup>'}
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
                            <h5>Radio (horizontal)</h5>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <Pum.RadioGroup name="radio_name1" onChange={this.onRadioChange} horizontal={true}>
                                    <Pum.Radio value="checkValue3"> 라디오3</Pum.Radio>
                                    <Pum.Radio value="checkValue4"> 라디오4</Pum.Radio>
                                </Pum.RadioGroup>
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

module.exports = Radio;