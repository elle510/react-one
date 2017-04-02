/**
 * RadioGroup component
 *
 * version <tt>$ Version: 1.0 $</tt> date:2016/03/17
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 *
 * example:
 * <Pum.RadioGroup options="{options}" />
 *
 */
'use strict';

import React, {PropTypes} from 'react';
var classNames = require('classnames');

var RadioGroup = React.createClass({
    displayName: 'RadioGroup',
    propTypes: {
        className: PropTypes.string,
        name: PropTypes.string,
        selectedValue: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
            PropTypes.bool,
        ]),
        onChange: PropTypes.func,
        horizontal: PropTypes.bool
    },
    onChange: function(value, event) {
        this.setState({selectedValue: value});
        if(typeof this.props.onChange === 'function') {
            this.props.onChange(event, value);
        }
    },
    getChildren: function() {
        const {className, name, children} = this.props,
            selectedValue = this.state.selectedValue,
            onChange = this.onChange;

        return React.Children.map(children, (radio) => {
            if(radio === null) {
                return null;
            }

            return React.cloneElement(radio, {
                className,
                name,
                selectedValue,
                onChange
            });
        });
    },
    setStateObject: function(props) {
        let selectedValue = props.selectedValue;
        if(typeof selectedValue === 'undefined') {
            selectedValue = null;
        }

        return {
            selectedValue: selectedValue
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
        return (
            <div className={classNames({'radio-horizontal': this.props.horizontal})}>
                {this.getChildren()}
            </div>
        );
    }
});

module.exports = RadioGroup;