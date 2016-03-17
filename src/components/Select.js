/**
 * Select component
 *
 * version <tt>$ Version: 1.0 $</tt> date:2016/03/12
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 *
 * example:
 * <Pum.Select options="{options}" />
 *
 * bootstrap-select 라이브러리에 종속적이다.
 * https://silviomoreto.github.io/bootstrap-select/
 */
'use strict';

var React = require('react');
var PropTypes = require('react').PropTypes;
var classNames = require('classnames');

var Util = require('../services/util');

function getUUID() {
    return Util.getUUID();
}

var defaultOptions = {
    //size: 4
    width: '150px'
};

var Select = React.createClass({
    displayName: 'Select',
    propTypes: {
        id: PropTypes.string,
        className: PropTypes.string,
        options: PropTypes.object,
        name: PropTypes.string,
        labelKey: PropTypes.string,
        valueKey: PropTypes.string,
        groupKey: PropTypes.string,
        items: PropTypes.array,
        selectedIndex: PropTypes.number,
        selectedValue: PropTypes.string,
        disabled: PropTypes.bool,
        multiple: PropTypes.bool,
        onChange: PropTypes.func,
        selectedItem: PropTypes.object
    },
    UUID: getUUID(),
    getId: function() {
        let id = this.props.id;
        if(typeof id === 'undefined') {
            id = this.UUID;
        }
        return id;
    },
    getOptions: function() {
        var propOptions = this.props.options,
            options = $.extend({}, defaultOptions, propOptions);

        return options;
    },
    __setProps__: function(props) {
        let items = props.items;
        if(typeof items === 'undefined') {
            items = [];
        }

        let selectedIndex = props.selectedIndex;
        if(typeof selectedIndex === 'undefined') {
            if(this.state && this.state.selectedIndex) {
                selectedIndex = this.state.selectedIndex;
            }else {
                selectedIndex = 0;
            }
        }

        let disabled = props.disabled;
        if(typeof disabled === 'undefined') {
            disabled = false;
        }

        let multiple = props.multiple;
        if(typeof multiple === 'undefined') {
            multiple = false;
        }

        return {
            items: items,
            selectedIndex: selectedIndex,
            disabled: disabled,
            multiple: multiple
        };
    },
    onChange: function(event, index) {
        if(typeof this.props.onChange === 'function') {
            //console.log('select onChange');
            //console.log(event);
            //console.log(index);
            this.props.onChange(event, index);
            //event.stopImmediatePropagation();
        }
    },
    init: function() {
        var select = $('#'+this.getId());
        select.selectpicker(this.getOptions());

        // setting events
        select.on('changed.bs.select', this.onChange);
    },
    getInitialState: function() {
        return this.__setProps__(this.props);
    },
    componentDidMount: function() {
        // 최초 렌더링이 일어난 다음(한번 호출)
        this.init();
    },
    componentWillReceiveProps: function(nextProps) {
        // 컴포넌트가 새로운 props를 받을 때 호출(최초 렌더링 시에는 호출되지 않음)
        this.setState(this.__setProps__(nextProps));
    },
    componentWillUpdate: function(nextProps, nextState){
        // 새로운 props나 state를 받았을 때 렌더링 직전에 호출(최초 렌더링 시에는 호출되지 않음)
        //console.log('componentWillUpdate');
    },
    componentDidUpdate: function(prevProps, prevState) {
        // 컴포넌트의 업데이트가 DOM에 반영된 직후에 호출(최초 렌더링 시에는 호출되지 않음)
        //console.log('componentDidUpdate');
        var select = $('#'+this.getId());
        select.selectpicker('refresh');
    },
    render: function() {
        // 필수 항목
        let items = [], labelKey = this.props.labelKey, valueKey = this.props.valueKey;
        $.each(this.state.items, function(index, item) {
            //items.push(React.createElement('option', {value: item[valueKey]}, item[labelKey]));
            items.push(<option value={item[valueKey]}>{item[labelKey]}</option>);
        });
        {/*
        let labelKey = this.props.labelKey, valueKey = this.props.valueKey;
        let items = React.Children.map(this.state.items, (item) => {
            console.log(item);
            return React.createElement ('option', {value: item[valueKey]}, item[labelKey]);
        });
        */}
        return (
            <select className={classNames('selectpicker', this.props.className)} id={this.getId()} name={this.props.name}
                    disabled={this.state.disabled} multiple={this.state.multiple}>
                {React.Children.toArray(items)}
            </select>
        );
    }
});

module.exports = Select;