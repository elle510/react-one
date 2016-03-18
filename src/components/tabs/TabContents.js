/**
 * TabContents component
 *
 * version <tt>$ Version: 1.0 $</tt> date:2016/03/08
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 *
 * example:
 * <Pum.TabContents />
 *
 * Bootstrap CSS
 */
'use strict';

var React = require('react');

var TabContents = React.createClass({
        displayName: 'TabContents',
        render: function() {
            // 필수 항목
            return (
                <div className="tab-content">
                    {this.props.children}
                </div>
            );
        }
});

module.exports = TabContents;