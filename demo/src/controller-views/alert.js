'use strict';

var React = require('react');

var Alert = React.createClass({
    onOk: function() {
        console.log('onOk');
    },
    onConfirm: function() {
        console.log('onConfirm');
    },
    onCancel: function() {
        console.log('onCancel');
    },
    onShowAlert: function(event) {
        //console.log(event);
        //var alert1 = new Pum.Alert({title: 'aa'});
        //console.log(alert1);
        this.refs['alert'].show(function() {
            console.log('alert ok done!!!');
        });
        console.log('alert');
    },
    onShowAlert1: function(event) {
        this.refs['alert'].show(function() {
            console.log('alert1 ok done!!!');
        });
    },
    onShowConfirm: function(event) {
        this.refs['confirm'].show(function() {
            console.log('confirm ok done!!!');
        }, function() {
            console.log('confirm cancel done!!!');
        });
        console.log('confirm');
    },
    render: function() {
        return (
            <div className="page-content">
                <div className="page-header">
                    <span className="title">Alert</span>
                </div>

                <div className="page-body">
                    <div className="row">{/* start default */}
                        <div className="row">
                            <div className="col-md-12">
                                <h5>Alert</h5>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-2">
                                <div className="row">
                                    <div className="col-md-5">
                                        <button className="btn btn-primary" onClick={this.onShowAlert}>
                                            Alert
                                        </button>
                                    </div>
                                    <div className="col-md-5">
                                        <button className="btn btn-primary" onClick={this.onShowAlert1}>
                                            Alert
                                        </button>
                                    </div>
                                </div>
                                <Pum.Alert ref="alert" title="타이틀" message="메시지" onOk={this.onOk} />
                            </div>
                            <div className="col-md-1">
                                <button className="btn btn-primary" onClick={this.onShowConfirm}>
                                    Confirm
                                </button>
                                <Pum.Alert ref="confirm" type="confirm" title="타이틀" message="메시지" onOk={this.onConfirm} onCancel={this.onCancel}/>
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

module.exports = Alert;