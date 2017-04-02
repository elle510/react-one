/**
 * Button Component
 *
 * version <tt>$ Version: 1.0 $</tt> date:2016/10/29
 * author <a href="mailto:elle0510@gmail.com">Ahn Hyung-Ro</a>
 *
 * example:
 * <One.Button options={options} />
 *
 */
'use strict';

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { Util } from '../utils';

const propTypes = {
    type: PropTypes.oneOf(['button','a']).isRequired,
    className: PropTypes.string,
    iconClassName: PropTypes.string,
    tooltip: PropTypes.string,
    tooltipPosition: PropTypes.oneOf(['bottom', 'top', 'left', 'right', 'center']),
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    disabled: PropTypes.bool,
    hidden: PropTypes.bool,
    onClick: PropTypes.func
};

const defaultProps = {
    type: 'button',
    // className: 'ui button',
    tooltipPosition: 'bottom'
};

/** Class representing a Button. */
class Button extends Component {
    constructor(props) {
        super(props);

        // Manually bind this method to the component instance...
        this.onClick = this.onClick.bind(this);
    }

    componentWillMount() {
        // 최초 렌더링이 일어나기 직전(한번 호출)
        let id = this.props.id;
        if(typeof id === 'undefined') {
            id = Util.getUUID();
        }

        this.id = id;
    }

    componentDidMount() {
        // 최초 렌더링이 일어난 다음(한번 호출)
        this.$button = $('#' + this.id);

        // tooltip
        // if(typeof this.props.tooltip !== 'undefined') {

        //     this.tooltip = this.$button.kendoTooltip({
        //         position: this.props.tooltipPosition
        //     }).data('kendoTooltip');

        // }
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     // 새로운 props나 state를 받았을 때 렌더링 전에 호출(최초 렌더링 시에는 호출되지 않음)
    //     // false 면 render 호출하지 않음(componentWillUpdate 와 componentDidUpdate 역시 호출되지 않음)
    //     return false;    // default true
    // }

    //-----------------------------
    // events
    onClick(e) {
        // console.log(this.$button.attr('disabled'));
        // IE에서는 disabled 속성이 있어도 클릭이벤트가 발생한다.
        if(this.$button.attr('disabled') === 'disabled') return;
        if(typeof this.props.onClick !== 'undefined') {
            this.props.onClick(e);
        }
    }

    //-----------------------------
    // methods
    enable(isBool) {
        if(typeof isBool === 'boolean') {
            this.$button.attr('disabled', !isBool);
        }
    }

    show(isBool) {
        if(typeof isBool === 'boolean') {
            if(isBool === true) {
                this.$button.show();
            }else {
                this.$button.hide();
            }
        }
    }

    /**
     * @private
     * render function
     */
    renderButton() {
        
    }

    renderA() {
        const { children, className, tooltip, size, disabled } = this.props;

        var optional = {};
        
        // if(hidden === true) {
        //     optional.style = { display: 'none' };
        // }

        return (
            <a href="#" className={classNames('btn', className, { disabled: this.state.disabled })} role="button"
                {...optional}>
                {this.renderIcon()}
                {children}
            </a>
        );
    }

    renderIcon() {
        const { iconClassName } = this.props;
        if(iconClassName) {
            return (
                <i className={classNames('fa', iconClassName)}></i>
            );
        }
    }

    render() {
        // 필수 항목
        const { children, className, tooltip, size, disabled, hidden } = this.props;
        
        var optional = {};
        
        // disabled
        if(typeof disabled === 'boolean') {
            optional.disabled = disabled;
        }

        // hidden
        if(typeof hidden === 'boolean') {
            if(hidden === true) {
                optional.style = { display: 'none' };
            }else {
                optional.style = { display: 'inline-block' };
            }
        }

        // {'\u00A0'}
        return (
            <button id={this.id} type="button" className={classNames(className)} onClick={this.onClick} 
                    title={tooltip}
                    {...optional}>
                {this.renderIcon()}
                {children}
            </button>
        );
    }
}

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
