/**
 * DateRangePicker component
 *
 * version <tt>$ Version: 1.0 $</tt> date:2016/03/17
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 *
 * example:
 * <Pum.DateRangePicker options="{options}" />
 *
 * Date Range Picker 라이브러리에 종속적이다.
 * http://www.daterangepicker.com/
 */
'use strict';

var React = require('react');
var PropTypes = require('react').PropTypes;
var classNames = require('classnames');

var Util = require('../services/util');
var DateUtil = require('../services/DateUtil');

var defaultOptions = {
    locale: {
        format: "YYYY-MM-DD",
        separator: " ~ ",
        applyLabel: $ps_locale.apply,
        cancelLabel: $ps_locale.cancel,
        daysOfWeek: [
            $ps_locale.sun,
            $ps_locale.mon,
            $ps_locale.tue,
            $ps_locale.wed,
            $ps_locale.thu,
            $ps_locale.fri,
            $ps_locale.sat
        ],
        monthNames: [
            $ps_locale.jan,
            $ps_locale.feb,
            $ps_locale.mar,
            $ps_locale.apr,
            $ps_locale.may,
            $ps_locale.jun,
            $ps_locale.jul,
            $ps_locale.aug,
            $ps_locale.sep,
            $ps_locale.oct,
            $ps_locale.nov,
            $ps_locale.dec
        ]
    }
};

var DateRangePicker = React.createClass({
    displayName: 'DateRangePicker',
    propTypes: {
        id: PropTypes.string,
        className: PropTypes.string,
        //options: PropTypes.object,
        startDateName: PropTypes.string,
        endDateName: PropTypes.string,
        disabled: PropTypes.bool,
        singlePicker: PropTypes.bool,
        timePicker: PropTypes.bool,
        onHide: PropTypes.func
    },
    id: '',
    onHide: function(event, picker) {
        this.setHiddenValue();
        if(typeof this.props.onHide === 'function') {
            this.props.onHide(event, picker);
        }
    },
    setHiddenValue: function() {
        var dateRangePicker = $('#' + this.id),
            startDate = dateRangePicker.data('daterangepicker').startDate._d,
            endDate = dateRangePicker.data('daterangepicker').endDate._d,
            startDateString, endDateString;

        startDateString = DateUtil.getDateToString(startDate);
        endDateString = DateUtil.getDateToString(endDate);
        console.log(startDateString);
        console.log(endDateString);

        $('[name="' + this.props.startDateName + '"]').val(startDateString);
        $('[name="' + this.props.endDateName + '"]').val(endDateString);
    },
    getOptions: function() {
        /*
        var propOptions = this.props.options,
            options = $.extend({}, defaultOptions, propOptions);
        */
        let optional = {};

        let singlePicker = this.props.singlePicker;
        if(typeof singlePicker !== 'undefined') {
            optional.singleDatePicker = singlePicker;
        }

        let timePicker = this.props.timePicker;
        if(typeof timePicker !== 'undefined') {
            optional.timePicker = timePicker;
        }

        var options = $.extend({}, defaultOptions, optional);

        return options;
    },
    init: function() {
        var dateRangePicker = $('#' + this.id);
        dateRangePicker.daterangepicker(this.getOptions());

        this.setHiddenValue();

        // setting events
        dateRangePicker.on('hide.daterangepicker', this.onHide);
    },
    setStateObject: function(props) {
        let value = props.value;
        if(typeof value === 'undefined') {
            value = null;
        }

        let disabled = props.disabled;
        if(typeof disabled === 'undefined') {
            disabled = false;
        }

        return {
            value: value,
            disabled: disabled
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
    },
    componentDidMount: function() {
        // 최초 렌더링이 일어난 다음(한번 호출)
        this.init();
    },
    componentWillReceiveProps: function(nextProps) {
        // 컴포넌트가 새로운 props를 받을 때 호출(최초 렌더링 시에는 호출되지 않음)
        this.setState(this.setStateObject(nextProps));
    },
    componentWillUpdate: function(nextProps, nextState){
        // 새로운 props나 state를 받았을 때 렌더링 직전에 호출(최초 렌더링 시에는 호출되지 않음)
        console.log('componentWillUpdate');
    },
    render: function() {
        // 필수 항목
        const {className, startDateName, endDateName, width, disabled} = this.props;
        return (
            <div className={classNames('input-group daterange', className)}>
                <input type="text" id={this.id} className="form-control" style={{width: width}} disabled={this.state.disabled} />
                <span className="input-group-addon"><i className={classNames('glyphicon', 'glyphicon-calendar', 'fa', 'fa-calendar', {disabled: this.state.disabled})}></i></span>
                <input type="hidden" name={startDateName} />
                <input type="hidden" name={endDateName} />
            </div>
        );
    }
});

module.exports = DateRangePicker;