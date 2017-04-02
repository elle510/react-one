'use strict';

var React = require('react');

var browserHistory = require('react-router').browserHistory;
var hashHistory = require('react-router').hashHistory;

module.exports = React.createClass({
        displayName: 'TreeMenu',
        treeMenuOptions: {
            core: {
                data: {
                    url: './json/main-menu.json',
                    type: 'GET',
                    data: function (node) {
                        //console.log(node.id);
                        return node;//{ 'id' : node.id };
                    }
                }
            }
        },
        onTreeClick: function(e, treeId, treeNode) {
            console.log('treeNode.path', treeNode.path);
            hashHistory.push(treeNode.path);
            // e.stopPropagation();
            // e.stopImmediatePropagation();
        },
        componentDidMount: function() {
            /*
            $.ajax({
                url: './json/main-menu.json',
                type: 'GET',
                dataType: 'json',
                cache: false,
                success: function(data) {
                    console.log(data);
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error('./json/main-menu.json', status, err.toString());
                }.bind(this)
            });
            */
        },
        render: function() {
            // 필수 항목
            return (
                <One.Tree url="./data/main-menu.json" method="GET" onClick={this.onTreeClick} />
            );
        }
});