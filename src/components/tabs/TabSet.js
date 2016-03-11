/**
 * Tabs component
 *
 * version <tt>$ Version: 1.0 $</tt> date:2016/03/08
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 *
 * example:
 * <Pum.TabSet className={className} selectedIndex={0} onSelect={func} />
 *
 * Bootstrap CSS
 */
'use strict';

var React = require('react');
var PropTypes = require('react').PropTypes;

var Util = require('../../services/util');

function getUUID() {
    return Util.getUUID();
}

function isTabNode(node) {
    return node.nodeName === 'A' && node.getAttribute('role') === 'tab';
}

var TabSet = React.createClass({
        displayName: 'TabSet',
        propTypes: {
            className: PropTypes.string,
            selectedIndex: PropTypes.number,
            onSelect: PropTypes.func
        },
        id: getUUID(),
        getTabsCount: function() {
            return this.props.children && this.props.children[0] ?
                React.Children.count(this.props.children[0].props.children) :
                0;
        },
        getChildren: function() {
            var children = this.props.children,
                count = 0, index = 0;

            return React.Children.map(children, (child) => {
                if(child === null) {
                    return null;
                }
                var result;

                // Tabs
                if(count++ === 0) {
                    result = React.cloneElement(child, {
                        children: React.Children.map(child.props.children, (tab) => {
                            if(tab === null) {
                                return null;
                            }

                            let selected = this.state.selectedIndex === index,
                                disabled = false;

                            index++;

                            return React.cloneElement(tab, {
                                selected,
                                disabled
                            });
                        })
                    });

                    index = 0;

                }else {
                    // TabContents
                    result = React.cloneElement(child, {
                        children: React.Children.map(child.props.children, (tabContent) => {
                            let selected = this.state.selectedIndex === index;
                            index++;
                            return React.cloneElement(tabContent, {
                                selected
                            });
                        })
                    });
                }
                return result;
            });
        },
        onSelectTab: function(event) {
            let node = event.target;
            if(isTabNode(node)) {
                let ul = node.parentNode.parentNode,
                    li = node.parentNode;
                let index = [].slice.call(ul.children).indexOf(li);

                this.setSelectedIndex(index);
            }
        },
        setSelectedIndex(index) {

            if (index === this.state.selectedIndex) return;
            if (index < 0 || index >= this.getTabsCount()) return;

            let prevIndex = this.state.selectedIndex;

            this.setState({selectedIndex: index});

            if(typeof this.props.onSelect === 'function') {
                this.props.onSelect(index, prevIndex);
            }
        },
        getInitialState: function() {
            let selectedIndex = this.props.selectedIndex;
            if(typeof selectedIndex === 'undefined') {
                if(this.state && this.state.selectedIndex) {
                    selectedIndex = this.state.selectedIndex;
                }else {
                    selectedIndex = 0;
                }
            }
            return {selectedIndex: selectedIndex};
        },
        componentDidMount: function() {
            // 최초 렌더링이 일어난 다음(한번 호출)
            //console.log('TabSet Component componentDidMount');
        },
        render: function() {
            // 필수 항목
            //console.log('TabSet render');
            //console.log(this.props.children[0].type());
            return (
                <div className={this.props.className}
                    onClick={this.onSelectTab}>
                    {this.getChildren()}
                </div>
            );
        }
});

module.exports = TabSet;