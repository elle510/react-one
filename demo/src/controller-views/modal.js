'use strict';

var React = require('react');

var Modal = React.createClass({
    onShow: function(event) {
        console.log('onShow');
        console.log(event);
    },
    onHide: function(event) {
        console.log('onHide');
        console.log(event);
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
    render: function() {
        return (
            <div className="page-content">
                <div className="page-header">
                    <span className="title">Modal</span>
                </div>

                <div className="page-body">
                    <div className="row">{/* start default */}
                        <div className="row">
                            <div className="col-md-12">
                                <h5>Modal</h5>
                            </div>
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
                            <div className="col-md-3">
                                <button className="btn btn-primary" onClick={this.onShowModalWidth}>
                                    Modal(width: 700px)
                                </button>
                                <Pum.Modal ref="modal_width" width="700px">
                                    <Pum.ModalHeader>Modal Title</Pum.ModalHeader>
                                    <Pum.ModalBody>Modal Body</Pum.ModalBody>
                                    <Pum.ModalFooter>Modal Footer</Pum.ModalFooter>
                                </Pum.Modal>
                            </div>
                            <div className="col-md-3">
                                <button className="btn btn-primary" data-toggle="modal" data-target="#target_modal">
                                    Modal(data-target))
                                </button>
                                <Pum.Modal id="target_modal">
                                    <Pum.ModalHeader>Modal Title</Pum.ModalHeader>
                                    <Pum.ModalBody>Modal Body</Pum.ModalBody>
                                    <Pum.ModalFooter>Modal Footer</Pum.ModalFooter>
                                </Pum.Modal>
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

                    <div className="row">{/* start backdrop */}
                        <div className="row">
                            <div className="col-md-12">
                                <h5>Modal - backdrop / listener</h5>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-2">
                                <button className="btn btn-primary" data-toggle="modal" data-target="#modal_backdrop">
                                    Modal(backdrop)
                                </button>
                                <Pum.Modal id="modal_backdrop" backdrop={true}>
                                    <Pum.ModalHeader>Modal Title</Pum.ModalHeader>
                                    <Pum.ModalBody>Modal Body</Pum.ModalBody>
                                    <Pum.ModalFooter>Modal Footer</Pum.ModalFooter>
                                </Pum.Modal>
                            </div>
                            <div className="col-md-2">
                                <button className="btn btn-primary" data-toggle="modal" data-target="#modal_listener">
                                Modal(listener)
                                </button>
                                <Pum.Modal id="modal_listener" onShow={this.onShow} onHide={this.onHide}>
                                    <Pum.ModalHeader>Modal Title</Pum.ModalHeader>
                                    <Pum.ModalBody>Modal Body</Pum.ModalBody>
                                </Pum.Modal>
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
                    </div>{/* end backdrop */}
                    <div className="vspace-12" />

                </div>

                <div className="page-footer">

                </div>

            </div>
        );
    }
});

module.exports = Modal;