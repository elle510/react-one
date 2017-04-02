/**
 * Radio component
 *
 * version <tt>$ Version: 1.0 $</tt> date:2016/03/17
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 *
 * example:
 * <Pum.Radio options="{options}" />
 *
 */
'use strict';

import React, {PropTypes} from 'react';
var classNames = require('classnames');

var Radio = React.createClass({
    displayName: 'Radio',
    propTypes: {
        className: PropTypes.string,
        name: PropTypes.string,
        selectedValue: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
            PropTypes.bool,
        ]),
        onChange: PropTypes.func,
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
            PropTypes.bool,
        ])
    },
    render: function() {
        // 필수 항목
        const {className, name, selectedValue, onChange, value} = this.props;
        const optional = {};
        if(selectedValue !== undefined) {
            optional.checked = (this.props.value === selectedValue);
        }
        /*
        if(typeof onChange === 'function') {
            optional.onChange = onChange.bind(null, this.props.value);
        }
        */
        optional.onChange = onChange.bind(null, this.props.value);

        return (
            <div className="radio">
                <label>
                    <input type="radio" className={className} name={name} value={value}
                        {...optional} />
                    <span className="lbl">{this.props.children}</span>
                </label>
            </div>
        );
    }
});

module.exports = Radio;