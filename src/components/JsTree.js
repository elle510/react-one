/**
 * JsTree component
 *
 * version <tt>$ Version: 1.0 $</tt> date:2016/03/03
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 *
 * example:
 * <Pum.JsTree options="{options}" />
 *
 * JsTree 라이브러리에 종속적이다.
 */
'use strict';

var React = require('react');
var PropTypes = require('react').PropTypes;
//var classNames = require('classnames');

var Util = require('../services/util');

function getUUID() {
    return Util.getUUID();
}

var defaultOptions = {
    core: {
        data: {
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            cache: false,
            beforeSend: function (xhr) {
                if (xhr.overrideMimeType) {
                    xhr.overrideMimeType("application/json");
                }
            }
        }
    }
};

var JsTree = React.createClass({
    displayName: 'JsTree',
    id: getUUID(),
    propTypes: {
        className: PropTypes.string,
        options: PropTypes.object
    },
    getOptions: function() {

        var propOptions = this.props.options,
            options = $.extend({}, defaultOptions, propOptions);

        if(propOptions && propOptions.hasOwnProperty('core') && propOptions['core'].hasOwnProperty('data')) {
            //$.extend(options['core']['data'], defaultOptions['core']['data'], propOptions['core']['data']);
            options['core']['data'] = $.extend({}, defaultOptions['core']['data'], propOptions['core']['data']);
        }

        return options;

    },
    onSelectNode: function(event, data) {
        if(typeof this.props.onSelectNode === 'function') {
            //console.log('select_node');
            //console.log(data.selected);
            //console.log(event);
            //console.log(data);
            this.props.onSelectNode(event, data);
            event.stopImmediatePropagation();
        }
    },
    onChanged: function(event, data) {
        if(typeof this.props.onChanged === 'function') {
            this.props.onChanged(event, data);
        }
    },
    onDblClick: function(event, data) {
        if(typeof this.props.onDblClick === 'function') {
            this.props.onDblClick(event, data);
        }
    },
    init: function() {
        var tree = $('#'+this.id);
        tree.jstree(this.getOptions());

        // setting events
        tree.on('select_node.jstree', this.onSelectNode);
        tree.on('changed.jstree', this.onChanged);
        tree.on('dblclick.jstree', this.onDblClick);
    },
    componentDidMount: function() {
        // 최초 렌더링이 일어난 다음(한번 호출)
        this.init();
    },
    render: function() {
        // 필수 항목
        return (
            <div className={this.props.className} id={this.id}></div>
        );
    }
});

module.exports = JsTree;