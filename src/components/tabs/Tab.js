/**
 * Tab component
 *
 * version <tt>$ Version: 1.0 $</tt> date:2016/03/08
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 *
 * example:
 * <Pum.Tab />
 *
 * Bootstrap CSS
 */
'use strict';

var React = require('react');
var PropTypes = require('react').PropTypes;
var classNames = require('classnames');

var Tab = React.createClass({
        displayName: 'Tab',
        propTypes: {
            selected: PropTypes.bool,
            disabled: PropTypes.bool
        },
        render: function() {
            // 필수 항목
            return (
                <li className={classNames({active: this.props.selected}, {disabled: this.props.disabled})}>
                    <a role="tab">{this.props.children}</a>
                </li>
            );
        }
});

module.exports = Tab;