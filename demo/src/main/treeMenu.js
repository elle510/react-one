'use strict';

var React = require('react');

var browserHistory = require('react-router').browserHistory;

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
            console.log('TreeMenu: onSelectNode');
            console.log(data);
            var json = data.node.original;
            if(json.hasOwnProperty('url')) {
                console.log(json.url);
                browserHistory.push('#' + json.url);
            }
            /*
            if(json.hasOwnProperty('route')) {
                console.log(json.route);
                //browserHistory.push('#/repos');
            }else if(json.hasOwnProperty('url')) {
                $window.location.href = json.url;
            }
            */
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
            // 필수 항목
            return (
                <ReactPum.JsTree options={this.treeMenuOptions} onSelectNode={this.onSelectNode} />
            );
        }
});