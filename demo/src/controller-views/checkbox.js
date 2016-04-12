'use strict';

var React = require('react');

var Checkbox = React.createClass({
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
                    <span className="title">Checkbox</span>
                </div>

                <div className="page-body">
                    <div className="row">{/* start default */}
                        <div className="row">
                            <div className="col-md-12">
                                <h5>Checkbox</h5>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <Pum.Checkbox name="checkbox_name" value="checkValue1" onChange={this.checkboxChange}> 체크박스1</Pum.Checkbox>
                                <Pum.Checkbox name="checkbox_name" value="checkValue2" onChange={this.checkboxChange} checked={true}> 체크박스2</Pum.Checkbox>
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
                                                    {'<Pum.Checkbox name="name1" value="value1" onChange={this.onChange}> 체크박스1</Pum.Checkbox>\n'}
                                                    {'<Pum.Checkbox name="name2" value="value2" onChange={this.onChange} checked={true}> 체크박스2</Pum.Checkbox>'}
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
                                <h5>Checkbox (horizontal)</h5>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="checkbox-horizontal">
                                    <Pum.Checkbox name="checkbox_name3" value="checkValue3" onChange={this.checkboxChange}> 체크박스3</Pum.Checkbox>
                                    <Pum.Checkbox name="checkbox_name4" value="checkValue4" onChange={this.checkboxChange}> 체크박스4</Pum.Checkbox>
                                </div>
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
                                                    {'<div className="checkbox-horizontal">\n'}
                                                    {'  <Pum.Checkbox name="name1" value="value1" onChange={this.onChange}> 체크박스1</Pum.Checkbox>\n'}
                                                    {'  <Pum.Checkbox name="name2" value="value2" onChange={this.onChange}> 체크박스2</Pum.Checkbox>\n'}
                                                    {'</div>'}
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

module.exports = Checkbox;