/**
 * CheckBox component
 *
 * version <tt>$ Version: 1.0 $</tt> date:2016/03/14
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 *
 * example:
 * <Pum.CheckBox name="name1" value="value1" onChange={this.onChange} checked={true}> 체크박스</Pum.CheckBox>
 *
 */
'use strict';

var React = require('react');
var PropTypes = require('react').PropTypes;
var classNames = require('classnames');

var Util = require('../services/util');

var CheckBox = React.createClass({
    displayName: 'CheckBox',
    propTypes: {
        id: PropTypes.string,
        className: PropTypes.string,
        name: PropTypes.string,
        value: PropTypes.string,
        checked: PropTypes.bool,
        onChange: PropTypes.func
    },
    onChange: function(event) {
        //console.log(event);
        let checked = !this.state.checked;
        //console.log(checked);
        this.setState({checked: checked});
        if(typeof this.props.onChange === 'function') {
            this.props.onChange(event);
        }
    },
    setStateObject: function(props) {
        let value = props.value;
        if(typeof value === 'undefined') {
            value = null;
        }

        let checked = props.checked;
        if(typeof checked === 'undefined') {
            checked = false;
        }

        return {
            value: value,
            checked: checked
        };
    },
    getInitialState: function() {
        return this.setStateObject(this.props);
    },
    componentDidMount: function() {
        // 최초 렌더링이 일어난 다음(한번 호출)
        //console.log('componentDidMount');
    },
    componentWillReceiveProps: function(nextProps) {
        // 컴포넌트가 새로운 props를 받을 때 호출(최초 렌더링 시에는 호출되지 않음)
        this.setState(this.setStateObject(nextProps));
    },
    render: function() {
        // 필수 항목
        const {className, name, children} = this.props;
        return (
            <div className="checkbox">
                <label>
                    <input type="checkbox" className={className} name={name} value={this.state.value} checked={this.state.checked}
                        onChange={this.onChange} />
                    <span className="lbl">{children}</span>
                    {/*<input type="hidden" name={this.props.name} value={this.state.value}>*/}
                </label>
            </div>
        );
    }
});

module.exports = CheckBox;