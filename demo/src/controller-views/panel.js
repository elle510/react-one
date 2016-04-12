'use strict';

var React = require('react');

var Panel = React.createClass({
    onInit: function() {
        console.log('Panel onInit');
    },
    render: function() {
        return (
            <div className="page-content">
                <div className="page-header">
                    <span className="title">Panel</span>
                </div>

                <div className="page-body">
                    <div className="row">{/* start default */}
                        <div className="row">
                            <div className="col-md-12">
                                <h5>Panel</h5>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <Pum.Panel onInit={this.onInit}>
                                    <Pum.PanelHeader>Panel Title</Pum.PanelHeader>
                                    <Pum.PanelBody>Panel Body</Pum.PanelBody>
                                    <Pum.PanelFooter>Panel Footer</Pum.PanelFooter>
                                </Pum.Panel>
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
                </div>

                <div className="page-footer">

                </div>

            </div>
        );
    }
});

module.exports = Panel;