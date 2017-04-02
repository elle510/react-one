/**
 * HiddenContent component
 *
 * version <tt>$ Version: 1.0 $</tt> date:2016/03/10
 * author <a href="mailto:elle0510@gmail.com">Ahn Hyung-Ro</a>
 *
 * example:
 * <One.HiddenContent id={id} />
 *
 */
'use strict';

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { Util } from '../utils';

const propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    expandLabel: PropTypes.string,
    collapseLabel: PropTypes.string,
    expandIcon: PropTypes.string,
    collapseIcon: PropTypes.string,
    isBottom: PropTypes.bool
};

const defaultProps = {
    
};

/** Class representing a HiddenContent. */
class HiddenContent extends Component {
    constructor(props) {
        super(props);

        let label = props.expandLabel;
        if(typeof label === 'undefined') {
            label = 'Expand';
        }
        let icon = props.expandIcon;
        this.state = {
            label: label, 
            icon: icon
        };

        // Operations usually carried out in componentWillMount go here
        let id = props.id;
        if(typeof id === 'undefined') {
            id = Util.getUUID();
        }

        this.id = id;

        // Manually bind this method to the component instance...
        this.onExpandCollapse = this.onExpandCollapse.bind(this);
        this.onBottomCollapse = this.onBottomCollapse.bind(this);
    }

    //-----------------------------
    // events
    onExpandCollapse(e) {
        //var node = e.target,
        //    aTag = node.parentNode;
        var aTag = e.target;
        if($(aTag).next().css('display') === 'none') {
            this.setState({ label: this.props.collapseLabel, icon: this.props.collapseIcon });
            $(aTag).next().css('display', 'block');
        }else {
            this.setState({ label: this.props.expandLabel, icon: this.props.expandIcon });
            $(aTag).next().css('display', 'none');
        }

    }

    onBottomCollapse(e) {
        let node = e.target,
            div = node.parentNode;//.parentNode;
        $(div).css('display', 'none');
        this.setState({ label: this.props.expandLabel, icon: this.props.expandIcon });
    }
    
    render() {
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

            // # 와 react-router 충돌문제 해결해야 함
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
}

HiddenContent.propTypes = propTypes;
HiddenContent.defaultProps = defaultProps;

export default HiddenContent;