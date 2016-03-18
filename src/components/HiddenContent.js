/**
 * HiddenContent component
 *
 * version <tt>$ Version: 1.0 $</tt> date:2016/03/10
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 *
 * example:
 * <Pum.HiddenContent id={id} />
 *
 */
'use strict';

import React, {PropTypes} from 'react';
//var React = require('react');
//var PropTypes = require('react').PropTypes;
var classNames = require('classnames');

var Util = require('../services/Util');

var HiddenContent = React.createClass({
    displayName: 'HiddenContent',
    propTypes: {
        id: PropTypes.string,
        className: PropTypes.string,
        expandLabel: PropTypes.string,
        collapseLabel: PropTypes.string,
        expandIcon: PropTypes.string,
        collapseIcon: PropTypes.string,
        isBottom: PropTypes.bool
    },
    id: '',
    onExpandCollapse: function(event) {
        //console.log(event);
        let node = event.target;
        let aTag = node.parentNode;
        if($(aTag).next().css('display') === 'none') {
            this.setState({label: this.props.collapseLabel, icon: this.props.collapseIcon});
            $(aTag).next().css('display', 'block');
        }else {
            this.setState({label: this.props.expandLabel, icon: this.props.expandIcon});
            $(aTag).next().css('display', 'none');
        }

    },
    onBottomCollapse: function(event) {
        let node = event.target,
            div = node.parentNode.parentNode;
        $(div).css('display', 'none');
        this.setState({label: this.props.expandLabel, icon: this.props.expandIcon});
    },
    getInitialState: function() {

        let label = this.props.expandLabel;
        if(typeof label === 'undefined') {
            label = 'Expand';
        }

        let icon = this.props.expandIcon;

        return {label: label, icon: icon};
    },
    componentWillMount: function() {
        // 최초 렌더링이 일어나기 직전(한번 호출)
        let id = this.props.id;
        if(typeof id === 'undefined') {
            id = Util.getUUID();
        }

        this.id = id;
    },
    render: function() {
        // 필수 항목
        var Icon;
        if(typeof this.state.icon === 'string') {
            Icon = <i className={this.state.icon}>{'\u00A0'}</i>;
        }

        // 맨 아래 접기버튼 처리
        var BottomButton;
        if(this.props.isBottom === true) {
            let CollapseIcon;
            if(typeof this.props.collapseIcon === 'string') {
                CollapseIcon = <i className={this.props.collapseIcon}>{'\u00A0'}</i>;
            }

            BottomButton = <a href={'#' + this.id} onClick={this.onBottomCollapse}>{CollapseIcon}{this.props.collapseLabel}</a>
        }

        return (
            <div className={classNames('hidden-content', this.props.className)}>
                <a href="javascript:void(0)" onClick={this.onExpandCollapse} name={this.id}>{Icon}{this.state.label}</a>
                <div style={{display: 'none'}}>
                    <div id={this.id}>{this.props.children}</div>
                    {BottomButton}
                </div>
            </div>
        );
    }
});

module.exports = HiddenContent;