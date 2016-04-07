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
        onSelectNode: function(event, data) {
            //console.log('TreeMenu: onSelectNode');
            //console.log(data);
            var json = data.node.original;
            if(json.hasOwnProperty('path')) {
                //console.log(json.path);
                //browserHistory.push(json.path);
                hashHistory.push(json.path);
            }else if(json.hasOwnProperty('url')) {
                //location.href = json.url;
                window.open(json.url, '_blank');
            }
            //event.stopPropagation();
            //event.stopImmediatePropagation();
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
            // �븘�닔 �빆紐�
            return (
                <Pum.JsTree options={this.treeMenuOptions} onSelectNode={this.onSelectNode} />
            );
        }
});