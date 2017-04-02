/**
 * Fieldset component
 *
 * version <tt>$ Version: 1.0 $</tt> date:2016/03/30
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 *
 * example:
 * <Pum.Fieldset />
 *
 */
'use strict';

var React = require('react');
var PropTypes = require('react').PropTypes;
var classNames = require('classnames');

var Util = require('../services/util');

var Fieldset = React.createClass({
    displayName: 'Fieldset',
    propTypes: {
        id: PropTypes.string,
        className: PropTypes.string,
        legend: PropTypes.string,
        expand: PropTypes.bool,
        collapsible: PropTypes.bool,
        onToggle: PropTypes.func,
        onInit: PropTypes.func
    },
    id: '',
    toggle: function(props) {
        if(this.props.collapsible === true) {
            if(typeof props.expand !== 'undefined') {
                this.setState({expand: props.expand});
            }else {
                this.setState({expand: true});
            }
        }
    },
    onToggle: function(event) {
        var expand = !this.state.expand;
        this.toggle({expand: expand});

        if(typeof this.props.onToggle === 'function') {
            this.props.onToggle(expand);
        }
    },
	getDefaultProps: function() {
		// 클래스가 생성될 때 한번 호출되고 캐시된다.
		// 부모 컴포넌트에서 prop이 넘어오지 않은 경우 (in 연산자로 확인) 매핑의 값이 this.props에 설정된다.
		return {legend: 'Title', collapsible: true, expand: true};
	},
    getInitialState: function() {
		// 컴포넌트가 마운트되기 전 (한번 호출) / 리턴값은 this.state의 초기값으로 사용
        return {expand: this.props.expand};
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
            var data = {};
            data.expand = this.state.expand;
            this.props.onInit(data);
        }
    },
    componentWillReceiveProps: function(nextProps) {
        // 컴포넌트가 새로운 props를 받을 때 호출(최초 렌더링 시에는 호출되지 않음)
        this.toggle(nextProps);
    },
    render: function() {
        // 필수 항목
        const {className, legend, collapsible} = this.props;

        var display, collapsed = false;
        if(this.state.expand === true) {
            display = 'block';
        }else {
            display = 'none';
            if(collapsible === true) {
                collapsed = true;
            }
        }

        return (
            <fieldset className={classNames('fieldset', className, {collapsible: collapsible, collapsed: collapsed})}>
                <legend onClick={this.onToggle} name={this.id}> {legend}</legend>
                <div style={{display: display}}>
                    <div id={this.id} >{this.props.children}</div>
                </div>
            </fieldset>

        );
    }
});

module.exports = Fieldset;