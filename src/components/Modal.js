/**
 * Modal component
 *
 * version <tt>$ Version: 1.0 $</tt> date:2016/03/25
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 *
 * example:
 * <Pum.Modal />
 *
 * bootstrap component
 */
'use strict';

var React = require('react');
var PropTypes = require('react').PropTypes;
var classNames = require('classnames');

var Util = require('../services/util');

var ModalHeader = React.createClass({
    displayName: 'ModalHeader',
    render: function() {
        // 필수 항목
        return (
            <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span className="sr-only">Close</span></button>
                <span className="modal-title">{this.props.children}</span>
            </div>
        );
    }
});

var ModalBody = React.createClass({
    displayName: 'ModalBody',
    render: function() {
        // 필수 항목
        return (
            <div className="modal-body">{this.props.children}</div>
        );
    }
});

var ModalFooter = React.createClass({
    displayName: 'ModalFooter',
    render: function() {
        // 필수 항목
        return (
            <div className="modal-footer">{this.props.children}</div>
        );
    }
});

var Modal = React.createClass({
    displayName: 'Modal',
    propTypes: {
        id: PropTypes.string,
        className: PropTypes.string,
        width: PropTypes.string
    },
    id: '',
    show: function(okFunc, cancelFunc) {
        var alert = $('#'+this.id);
        alert.modal('show');

        this.okFunc = okFunc;
        this.cancelFunc = cancelFunc;
    },
    hide: function() {
        var alert = $('#'+this.id);
        alert.modal('hide');
    },
    getChildren: function() {
        var children = this.props.children;

        return React.Children.map(children, (child) => {
            if(child === null) {
                return null;
            }

            return React.cloneElement(child, {});
        });
    },
    componentWillMount: function() {
        // 최초 렌더링이 일어나기 직전(한번 호출)
        let id = this.props.id;
        if(typeof id === 'undefined') {
            id = Util.getUUID();
        }

        this.id = id;
    },
    render: function() {
        // 필수 항목
        const {className, width} = this.props;

        return (
            <div id={this.id} className={classNames('modal', 'fade', className)} role="dialog" aria-labelledby="" aria-hidden="true">
                <div className="modal-dialog" style={{width: width}}>
                    <div className="modal-content">
                        {this.getChildren()}
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = {
    Modal: Modal,
    ModalHeader: ModalHeader,
    ModalBody: ModalBody,
    ModalFooter: ModalFooter
};