'use strict';

var React = require('react');

var Fieldset = React.createClass({
    onToggle: function(expand) {
        console.log('onToggle: ' + expand);
    },
    render: function() {
        return (
            <div className="page-content">
                <div className="page-header">
                    <span className="title">Fieldset</span>
                </div>

                <div className="page-body">
                    <div className="row">{/* start default */}
                        <div className="row">
                            <div className="col-md-12">
                                <span className="component-title">Fieldset</span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <Pum.Fieldset legend="검색" collapsible={false} onToggle={this.onToggle}>
                                    <div>
                                        내용<br/>
                                        내용<br/>
                                        내용<br/>
                                        내용<br/>
                                        내용<br/>
                                        내용<br/>
                                        내용<br/>
                                        내용<br/>
                                        내용<br/>
                                        내용<br/>
                                    </div>
                                </Pum.Fieldset>
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
                                                    {'// js\n' +
                                                    '안형로'}
                                                </pre>
                                            </Pum.TabContent>
                                        </Pum.TabContents>
                                    </Pum.TabSet>
                                </Pum.HiddenContent>
                            </div>
                        </div>
                    </div>{/* end default */}
                    <div className="vspace-12" />

                    <div className="row">{/* start panel style */}
                        <div className="row">
                            <div className="col-md-1">
                                <span className="component-title">Fieldset</span>
                            </div>
                            <div className="col-md-11">
                                <span className="component-class">className="panel"</span>
                            </div>
                        </div>
                    <div className="row">
                        <div className="col-md-12">
                            <Pum.Fieldset className="panel" legend="검색" collapsible={true} onToggle={this.onToggle}>
                                <div>
                                    내용<br/>
                                    내용<br/>
                                    내용<br/>
                                    내용<br/>
                                    내용<br/>
                                    내용<br/>
                                    내용<br/>
                                    내용<br/>
                                    내용<br/>
                                    내용<br/>
                                </div>
                            </Pum.Fieldset>
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
                                                {'// js\n' +
                                                '안형로'}
                                            </pre>
                                        </Pum.TabContent>
                                    </Pum.TabContents>
                                </Pum.TabSet>
                            </Pum.HiddenContent>
                        </div>
                    </div>
                    </div>{/* end panel style */}
                    <div className="vspace-12" />
                </div>

                <div className="page-footer">

                </div>

            </div>
        );
    }
});

module.exports = Fieldset;