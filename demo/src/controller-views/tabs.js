'use strict';

var React = require('react');

var Tabs = React.createClass({
    render: function() {
        return (
            <div className="page-content">
                <div className="page-header">
                    <h1>Tabs</h1>
                </div>

                <div className="page-body">
                    <div className="row">{/* start default */}
                        <div className="row">
                            <h5>Tab</h5>
                        </div>
                        <Pum.TabSet>
                            <Pum.Tabs>
                                <Pum.Tab>Tab1</Pum.Tab>
                                <Pum.Tab>Tab2</Pum.Tab>
                            </Pum.Tabs>
                            <Pum.TabContents>
                                <Pum.TabContent>
                                    하하
                                </Pum.TabContent>
                                <Pum.TabContent>
                                    호호
                                </Pum.TabContent>
                            </Pum.TabContents>
                        </Pum.TabSet>
                        {/*
                        <div className="row">
                            <div className="row col-md-12">
                                <button className="btn btn-default btn-sm" ng-click="tabs[0].active = true">Select second tab</button>
                                <button className="btn btn-default btn-sm" ng-click="tabs[1].active = true">Select third tab</button>
                            </div>
                            <div className="row">
                                <ps-tabset className="col-md-12">
                                    <ps-tab heading="Static title">
                                        Static content
                                        <input name="input_test" ng-model="test" class="form-control">
                                        <button type="button" className="btn btn-primary" ng-click="testClick()">Click</button>
                                    </ps-tab>
                                    <ps-tab ng-repeat="tab in tabs" heading="{{tab.title}}" active="tab.active" disabled="tab.disabled">
                                        {{tab.content}}
                                    </ps-tab>
                                    <ps-tab select="alertMe()">
                                        <ps-tab-heading>
                                            <i className="glyphicon glyphicon-bell"></i> Alert!
                                        </ps-tab-heading>
                                        I've got an HTML heading, and a select callback. Pretty cool!
                                    </ps-tab>
                                </ps-tabset>
                            </div>
                        </div>
                        */}
                    </div>{/* end default */}
                    <div className="vspace-12" />
                </div>

                <div className="page-footer">

                </div>

            </div>
        );
    }
});

module.exports = Tabs;