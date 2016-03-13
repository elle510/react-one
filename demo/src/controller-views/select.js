'use strict';

var React = require('react');

var colors = [
    {label:'black', value:'1', shade:'dark'},
    {label:'white', value:'2', shade:'light'},
    {label:'red', value:'3', shade:'dark'},
    {label:'blue', value:'4', shade:'dark'},
    {label:'yellow', value:'5', shade:'light'}
];

var Select = React.createClass({
    componentDidMount: function() {
        // 최초 렌더링이 일어난 다음(한번 호출)
        prettyPrint();
    },
    render: function() {
        return (
            <div className="page-content">
                <div className="page-header">
                    <h1>Select</h1>
                </div>

                <div className="page-body">
                    <div className="row">{/* start default */}
                        <div className="row">
                            <h5>Select(콤보박스)</h5>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <Pum.Select name="selectName" labelKey="label" valueKey="value" items={colors}>
                                </Pum.Select>
                            </div>
                        </div>
                        <div className="row">
                            <Pum.HiddenContent expandLabel="소스 보기" collapseLabel="소스 닫기"
                                            expandIcon="fa fa-caret-right" collapseIcon="fa fa-caret-down">
                                <Pum.TabSet>
                                    <Pum.Tabs>
                                        <Pum.Tab>HTML코드</Pum.Tab>
                                        <Pum.Tab>JS코드</Pum.Tab>
                                    </Pum.Tabs>
                                    <Pum.TabContents>
                                        <Pum.TabContent>
                                            <pre className="prettyprint linenums">
                                                // html
                                                {'<Pum.JqGrid options={this.options} />'}
                                            </pre>
                                        </Pum.TabContent>
                                        <Pum.TabContent>
                                            <pre className="prettyprint linenums">
                                                {'// js\n' +
                                                    '안형로'}
                                            </pre>
                                        </Pum.TabContent>
                                    </Pum.TabContents>
                                </Pum.TabSet>
                            </Pum.HiddenContent>
                        </div>
                    </div>{/* end default */}
                    <div className="vspace-12" />
                </div>

                <div className="page-footer">

                </div>

            </div>
        );
    }
});

module.exports = Select;