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
        selectedItem: PropTypes.object
    },
    id: getUUID(),
    getId: function() {
        let id = this.props.id;
        if(typeof id === 'undefined') {
            id = this.id;
        }
        return id;
    },
    getOptions: function() {
        var propOptions = this.props.options,
            options = $.extend({}, defaultOptions, propOptions);

        return options;
    },
    init: function() {
        var select = $('#'+this.getId());
        select.selectpicker(this.getOptions());
    },
    getInitialState: function() {
        let items = this.props.items;
        if(typeof items === 'undefined') {
            items = [];
        }

        let selectedIndex = this.props.selectedIndex;
        if(typeof selectedIndex === 'undefined') {
            if(this.state && this.state.selectedIndex) {
                selectedIndex = this.state.selectedIndex;
            }else {
                selectedIndex = 0;
            }
        }

        return {items: items, selectedIndex: selectedIndex};
    },
    componentDidMount: function() {
        // 최초 렌더링이 일어난 다음(한번 호출)
        this.init();
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
            <select className={classNames('selectpicker', this.props.className)} id={this.getId()} name={this.props.name}>
                {React.Children.toArray(items)}
            </select>
        );
    }
});

module.exports = Select;