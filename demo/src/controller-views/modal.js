'use strict';

var React = require('react');

var Modal = React.createClass({
    onOk: function() {
        console.log('onOk');
    },
    onConfirm: function() {
        console.log('onConfirm');
    },
    onCancel: function() {
        console.log('onCancel');
    },
    onShowModal: function(event) {
        //console.log(event);
        //var alert1 = new Pum.Alert({title: 'aa'});
        //console.log(alert1);
        this.refs['modal'].show();
        console.log('modal');
    },
    onShowModalWidth: function(event) {
        this.refs['modal_width'].show();
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
                    <h1>Modal</h1>
                </div>

                <div className="page-body">
                    <div className="row">{/* start default */}
                        <div className="row">
                            <h5>Modal</h5>
                        </div>
                        <div className="row">
                            <div className="col-md-1">
                                <button className="btn btn-primary" onClick={this.onShowModal}>
                                    Modal
                                </button>
                                <Pum.Modal ref="modal">
                                    <Pum.ModalHeader>Modal Title</Pum.ModalHeader>
                                    <Pum.ModalBody>Modal Body</Pum.ModalBody>
                                    <Pum.ModalFooter>Modal Footer</Pum.ModalFooter>
                                </Pum.Modal>
                            </div>
                            <div className="col-md-1">
                                <button className="btn btn-primary" onClick={this.onShowModalWidth}>
                                    Modal(width: 700px)
                                </button>
                                <Pum.Modal ref="modal_width" width="700px">
                                    <Pum.ModalHeader>Modal Title</Pum.ModalHeader>
                                    <Pum.ModalBody>Modal Body</Pum.ModalBody>
                                    <Pum.ModalFooter>Modal Footer</Pum.ModalFooter>
                                </Pum.Modal>
                            </div>
                            <div className="col-md-1">
                                <button className="btn btn-primary" onClick={this.onShowConfirm}>
                                    Confirm
                                </button>
                                <Pum.Modal ref="confirm" />
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

module.exports = Modal;