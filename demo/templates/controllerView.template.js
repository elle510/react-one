'use strict';

var React = require('react');

var Temp = React.createClass({
    render: function() {
        return (
            <div className="page-content">
                <div className="page-header">
                    <h1>Temp</h1>
                </div>

                <div className="page-body">
                    <div className="row">{/* start default */}
                        <div className="row">
                            <h5>Hidden Content(내용 접기/펼치기)</h5>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <Pum.Temp />
                            </div>
                        </div>
                        <div className="row">
                            <Pum.HiddenContent expandLabel="소스 보기" collapseLabel="소스 닫기"
                                            expandIcon="fa fa-caret-right" collapseIcon="fa fa-caret-down">
                                <Pum.TabSet>
                                    <Pum.Tabs>
                                        <Pum.Tab>JS코드</Pum.Tab>
                                    </Pum.Tabs>
                                    <Pum.TabContents>
                                        <Pum.TabContent>
                                            <pre className="prettyprint linenums">
                                                {'// html\n'}
                                                {'<Pum.JqGrid options={this.options} />'}
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

module.exports = Temp;