/**
 * Alert component
 *
 * version <tt>$ Version: 1.0 $</tt> date:2016/03/24
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 *
 * example:
 * <Pum.Alert />
 *
 * bootstrap component
 */
'use strict';

var React = require('react');
var PropTypes = require('react').PropTypes;
var classNames = require('classnames');

var Util = require('../services/util');

var Alert = React.createClass({
    displayName: 'Alert',
    propTypes: {
        id: PropTypes.string,
        className: PropTypes.string,
        type: PropTypes.string,             // null/confirm (default: null)
        title: PropTypes.string,
        message: PropTypes.string,
        okLabel: PropTypes.string,
        cancelLabel: PropTypes.string,
        onOk: PropTypes.func,
        onCancel: PropTypes.func,
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
    onOk: function(event) {
        // custom event emit 에 대해서 연구 필요
        this.hide();

        // okFunc
        if(typeof this.okFunc === 'function') {
            this.okFunc();
        }

        // onOk
        if(typeof this.props.onOk === 'function') {
            this.props.onOk();
        }
    },
    onCancel: function(event) {
        // custom event emit 에 대해서 연구 필요
        this.hide();

        // cancelFunc
        if(typeof this.cancelFunc === 'function') {
            this.cancelFunc();
        }

        // onCancel
        if(typeof this.props.onCancel === 'function') {
            this.props.onCancel();
        }
    },
    getInitialState: function() {
        var {title, okLabel, cancelLabel} = this.props;

        if(typeof title === 'undefined') {
            title = 'Title';
        }

        if(typeof okLabel === 'undefined') {
            okLabel = $ps_locale.confirm;
        }

        if(typeof cancelLabel === 'undefined') {
            cancelLabel = $ps_locale.cancel;
        }

        return {title: title, okLabel: okLabel, cancelLabel: cancelLabel};
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
        const {className, type, message, cancelable, width} = this.props;

        var cancelButton;
        if(type === 'confirm') {
            cancelButton = <button type="button" className="btn btn-default" onClick={this.onCancel} data-dismiss="modal">{this.state.cancelLabel}</button>;
        }

        return (
            <div id={this.id} className={classNames('modal', 'modal-alert', className)} role="dialog" aria-labelledby="" aria-hidden="true" data-backdrop="static" data-keyboard="false">
                <div className="modal-dialog modal-sm" style={{width: width}}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">{this.state.title}</h4>
                        </div>
                        <div className="modal-body">
                            {message}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" onClick={this.onOk}>{this.state.okLabel}</button>
                            {cancelButton}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Alert;