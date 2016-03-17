'use strict';

var React = require('react');

var CheckBox = React.createClass({
    checkboxChange: function(event) {
        //console.log('--- checkbox view ---');
        //console.log(event);
    },
    componentDidMount: function() {
        // 최초 렌더링이 일어난 다음(한번 호출)
        prettyPrint();
    },
    render: function() {
        return (
            <div className="page-content">
                <div className="page-header">
                    <h1>CheckBox</h1>
                </div>

                <div className="page-body">
                    <div className="row">{/* start default */}
                        <div className="row">
                            <h5>CheckBox</h5>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <Pum.CheckBox name="checkbox_name" value="checkValue1" onChange={this.checkboxChange}> 체크박스1</Pum.CheckBox>
                                <Pum.CheckBox name="checkbox_name" value="checkValue2" onChange={this.checkboxChange} checked={true}> 체크박스2</Pum.CheckBox>
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
                                                {'<Pum.CheckBox name="name1" value="value1" onChange={this.onChange}> 체크박스1</Pum.CheckBox>\n'}
                                                {'<Pum.CheckBox name="name2" value="value2" onChange={this.onChange} checked={true}> 체크박스2</Pum.CheckBox>'}
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
                            <h5>CheckBox (horizontal)</h5>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="checkbox-horizontal">
                                    <Pum.CheckBox name="checkbox_name3" value="checkValue3" onChange={this.checkboxChange}> 체크박스3</Pum.CheckBox>
                                    <Pum.CheckBox name="checkbox_name4" value="checkValue4" onChange={this.checkboxChange}> 체크박스4</Pum.CheckBox>
                                </div>
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
                                                {'<div className="checkbox-horizontal">\n'}
                                                {'  <Pum.CheckBox name="name1" value="value1" onChange={this.onChange}> 체크박스1</Pum.CheckBox>\n'}
                                                {'  <Pum.CheckBox name="name2" value="value2" onChange={this.onChange}> 체크박스2</Pum.CheckBox>\n'}
                                                {'</div>'}
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

module.exports = CheckBox;