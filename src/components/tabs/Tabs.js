/**
 * Tabs component
 *
 * version <tt>$ Version: 1.0 $</tt> date:2016/03/08
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 *
 * example:
 * <Pum.Tabs />
 *
 * Bootstrap CSS
 */
'use strict';

var React = require('react');

var Util = require('../../services/util');

function getUUID() {
    return Util.getUUID();
}

var Tabs = React.createClass({
        displayName: 'Tabs',
        id: getUUID(),
        render: function() {
            // 필수 항목
            return (
                <ul className="nav nav-tabs">{this.props.children}</ul>
            );
        }
});

module.exports = Tabs;