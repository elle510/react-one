/**
 * Stepper component
 *
 * version <tt>$ Version: 1.0 $</tt> date:2016/03/19
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 *
 * example:
 * <Pum.Stepper name="name1" value={10} min={0} max={100} step={5} />
 *
 */
'use strict';

var React = require('react');
var PropTypes = require('react').PropTypes;
var classNames = require('classnames');

var Util = require('../services/util');

var Stepper = React.createClass({
    displayName: 'Stepper',
    propTypes: {
        id: PropTypes.string,
        className: PropTypes.string,
        name: PropTypes.string,
        value: PropTypes.number,        // defaultValue 사용해서 하는 방법 생각해 보자
        direction: PropTypes.string,    // horizontal/vertical (default: vertical)
        min: PropTypes.number,
        max: PropTypes.number,
        step: PropTypes.number,         // default 1
        width: PropTypes.string,
        disabled: PropTypes.bool,
        onChange: PropTypes.func
    },
    id: '',
    _step: 1,
    _direction: 'input-group-btn-vertical',
    onChange: function(event) {
        // input 직접입력시
        //console.log(event.target.value);
        let value = Number(event.target.value);
        if(!isNaN(value)) {
            if(!(this.isOverMin(value) || this.isOverMax(value))) {
                this.updateValue(event, value, false);
            }
        }
    },
    onIncrement: function(event) {
        this.updateValueClick(event, this._step);
    },
    onDecrement: function(event) {
        this.updateValueClick(event, this._step * -1);
    },
    isOverMax: function(value) {
        let b = false;
        if(typeof this.props.max !== 'undefined') {
            if(value > this.props.max) {
                b = true;
            }
        }
        return b;
    },
    isOverMin: function(value) {
        let b = false;
        if(typeof this.props.min !== 'undefined') {
            if(value < this.props.min) {
                b = true;
            }
        }
        return b;
    },
    updateValueClick: function(event, step) {
        let value = this.state.value + step;
        if(this.isOverMin(value)) {
            this.setState({downDisabled: true});
        }else if(this.isOverMax(value)) {
            this.setState({upDisabled: true});
        }else {
            this.updateValue(event, value, true);
        }
    },
    updateValue: function(event, value, isClick) {
        if(isClick) {
            this.setState({value: value, upDisabled: false, downDisabled: false});
        }else {
            this.setState({value: value});
        }

        if(typeof this.props.onChange === 'function') {
            this.props.onChange(event, value);
        }
    },
    setStateObject: function(props) {
        let value = props.value;
        if(typeof value === 'undefined') {
            value = 0;
        }

        let disabled = props.disabled,
            upDisabled, downDisabled;
        if(typeof disabled === 'undefined') {
            disabled = upDisabled = downDisabled = false;
        }else {
            upDisabled = downDisabled = disabled;
        }

        return {
            value: value,
            disabled: disabled,
            upDisabled: upDisabled,
            downDisabled: downDisabled
        };
    },
    getInitialState: function() {
        return this.setStateObject(this.props);
    },
    componentWillMount: function() {
        // 최초 렌더링이 일어나기 직전(한번 호출)
        let id = this.props.id;
        if(typeof id === 'undefined') {
            id = Util.getUUID();
        }
        this.id = id;

        // step
        if(typeof this.props.step !== 'undefined') {
            this._step = this.props.step;
        }

        // direction
        let direction = this.props.direction;
        if(direction == 'horizontal') {
            this._direction = "input-group-btn-horizontal";
        }else {
            this._direction = "input-group-btn-vertical";
        }
    },
    componentDidMount: function() {
        // 최초 렌더링이 일어난 다음(한번 호출)
    },
    componentWillReceiveProps: function(nextProps) {
        // 컴포넌트가 새로운 props를 받을 때 호출(최초 렌더링 시에는 호출되지 않음)
        this.setState(this.setStateObject(nextProps));
    },
    render: function() {
        // 필수 항목
        const {className, name, width} = this.props;

        return (
            <div className={classNames('input-group', 'stepper', className)} style={{width: width}}>
                <input type="text" className="form-control" name={name} value={this.state.value} onChange={this.onChange} style={{width: 'inherit'}} disabled={this.state.disabled} />
                <div className={classNames(this._direction)}>
                    <button className="btn btn-default" onClick={this.onIncrement} disabled={this.state.upDisabled}><i className="fa fa-caret-up"></i></button>
                    <button className="btn btn-default" onClick={this.onDecrement} disabled={this.state.downDisabled}><i className="fa fa-caret-down"></i></button>
                </div>
            </div>
        );
    }
});

module.exports = Stepper;