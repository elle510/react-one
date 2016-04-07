'use strict';

var React = require('react');

var HiddenContent = React.createClass({
    render: function() {
        return (
            <div className="page-content">
                <div className="page-header">
                    <h1>Splitter</h1>
                </div>

                <div className="page-body">
                    <div className="row">{/* start default */}
                        <div className="row">
                            <div className="col-md-12">
                                <span className="component-title">Splitter(Vertical)</span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <Pum.Splitter>
                                    <Pum.SplitterPane>
                                        Left 영역
                                    </Pum.SplitterPane>

                                    <Pum.SplitterPane>
                                        Right 영역
                                    </Pum.SplitterPane>
                                </Pum.Splitter>
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

                    <div className="row">{/* start horizontal */}
                        <div className="row">
                            <div className="col-md-12">
                                <span className="component-title">Splitter(Horizontal)</span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <Pum.Splitter type="h">
                                    <Pum.SplitterPane>
                                        Top 영역
                                    </Pum.SplitterPane>

                                    <Pum.SplitterPane>
                                        Bottom 영역
                                    </Pum.SplitterPane>
                                </Pum.Splitter>
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
                    </div>{/* end horizontal */}
                    <div className="vspace-12" />

                    <div className="row">{/* start 3-columns */}
                        <div className="row">
                            <div className="col-md-12">
                                <span className="component-title">Splitter(3-Columns)</span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <Pum.Splitter minHeight={300}>
                                    <Pum.SplitterPane>
                                        Left 영역
                                    </Pum.SplitterPane>

                                    <Pum.SplitterPane type="v">
                                        <Pum.SplitterPane>
                                            Center 영역
                                        </Pum.SplitterPane>

                                        <Pum.SplitterPane>
                                            Right 영역
                                        </Pum.SplitterPane>
                                    </Pum.SplitterPane>
                                </Pum.Splitter>
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
                    </div>{/* end 3-columns */}
                    <div className="vspace-12" />

                    <div className="row">{/* start 3-pane */}
                        <div className="row">
                            <div className="col-md-12">
                                <span className="component-title">Splitter(3-Pane)</span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <Pum.Splitter>
                                    <Pum.SplitterPane>
                                        Left 영역
                                    </Pum.SplitterPane>

                                    <Pum.SplitterPane type="h">
                                        <Pum.SplitterPane>
                                            Top 영역
                                        </Pum.SplitterPane>

                                        <Pum.SplitterPane>
                                            Bottom 영역
                                        </Pum.SplitterPane>
                                    </Pum.SplitterPane>
                                </Pum.Splitter>
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
                    </div>{/* end 3-pane */}
                    <div className="vspace-12" />

                </div>

                <div className="page-footer">

                </div>

            </div>
        );
    }
});

module.exports = HiddenContent;