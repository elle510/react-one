/**
 * TabContent component
 *
 * version <tt>$ Version: 1.0 $</tt> date:2016/03/08
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 *
 * example:
 * <Pum.TabContent />
 *
 * Bootstrap CSS
 */
'use strict';

var React = require('react');
var PropTypes = require('react').PropTypes;
var classNames = require('classnames');

var TabContent = React.createClass({
        displayName: 'TabContent',
        propTypes: {
            selected: PropTypes.bool
        },
        render: function() {
            // 필수 항목
            return (
                <div className={classNames('tab-pane', {active: this.props.selected})}>
                    {this.props.children}
                </div>
            );
        }
});

module.exports = TabContent;