/**
 * Panel component
 *
 * version <tt>$ Version: 1.0 $</tt> date:2016/03/30
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 *
 * example:
 * <Pum.Panel  />
 *
 * bootstrap component
 */
'use strict';

var React = require('react');
var PropTypes = require('react').PropTypes;
var classNames = require('classnames');

var Util = require('../services/util');

var PanelHeader = React.createClass({
    displayName: 'PanelHeader',
    render: function() {
        // 필수 항목
        return (
            <div className="panel-heading">
                <div className="panel-title">{this.props.children}</div>
            </div>
        );
    }
});

var PanelBody = React.createClass({
    displayName: 'PanelBody',
    render: function() {
        // 필수 항목
        return (
            <div className="panel-body">{this.props.children}</div>
        );
    }
});

var PanelFooter = React.createClass({
    displayName: 'PanelFooter',
    render: function() {
        // 필수 항목
        return (
            <div className="panel-footer">{this.props.children}</div>
        );
    }
});

var Panel = React.createClass({
    displayName: 'Panel',
    propTypes: {
        id: PropTypes.string,
        className: PropTypes.string,
        onInit: PropTypes.func,
    },
    id: '',
    getChildren: function() {
        var children = this.props.children;

        return React.Children.map(children, (child) => {
            if(child === null) {
                return null;
            }

            return React.cloneElement(child, {});
        });
    },
	getDefaultProps: function() {
		// 클래스가 생성될 때 한번 호출되고 캐시된다.
		// 부모 컴포넌트에서 prop이 넘어오지 않은 경우 (in 연산자로 확인) 매핑의 값이 this.props에 설정된다.
		return {className: 'panel-default'};
	},
    componentWillMount: function() {
        // 최초 렌더링이 일어나기 직전(한번 호출)
        let id = this.props.id;
        if(typeof id === 'undefined') {
            id = Util.getUUID();
        }

        this.id = id;
    },
    componentDidMount: function() {
        // 최초 렌더링이 일어난 다음(한번 호출)
        if(typeof this.props.onInit === 'function') {
            this.props.onInit();
        }
    },
    render: function() {
        // 필수 항목
        const {className} = this.props;

        return (
            <div className={classNames('panel', className)}>{this.getChildren()}</div>
        );
    }
});

module.exports = {
    Panel: Panel,
    PanelHeader: PanelHeader,
    PanelBody: PanelBody,
    PanelFooter: PanelFooter
};