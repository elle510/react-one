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

var Util = require('../services/Util');
var DateUtil = require('../services/DateUtil');

var defaultOptions = {
    timePicker24Hour: true,
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
        startDate: PropTypes.string,    // YYYY-MM-DD hh:mm:ss 로 전달된 값을
        endDate: PropTypes.string,
        disabled: PropTypes.bool,
        singlePicker: PropTypes.bool,
        timePicker: PropTypes.bool,
        onHide: PropTypes.func,
        onApply: PropTypes.func
    },
    id: '',
    startDate: '',
    endDate: '',
    onApply: function(event, picker) {
        if(typeof this.props.onApply === 'function') {
            var startDate = DateUtil.getDateToString(picker.startDate._d),
                endDate = DateUtil.getDateToString(picker.endDate._d);
            //console.log(startDate);
            //console.log(endDate);
            this.props.onApply(event, startDate, endDate, picker);
        }
    },
    onHide: function(event, picker) {
        this.setHiddenValue();
        if(typeof this.props.onHide === 'function') {
            var startDate = DateUtil.getDateToString(picker.startDate._d),
                endDate = DateUtil.getDateToString(picker.endDate._d);
            this.props.onHide(event, startDate, endDate, picker);
        }
    },
    setHiddenValue: function() {
        var dateRangePicker = $('#' + this.id),
            startDate = dateRangePicker.data('daterangepicker').startDate._d,
            endDate = dateRangePicker.data('daterangepicker').endDate._d,
            startDateString, endDateString;

        startDateString = DateUtil.getDateToString(startDate);
        endDateString = DateUtil.getDateToString(endDate);
        //console.log(startDateString);
        //console.log(endDateString);

        $('[name="' + this.props.startDateName + '"]').val(startDateString);
        $('[name="' + this.props.endDateName + '"]').val(endDateString);

        this.startDate = startDateString;
        this.endDate = endDateString;
    },
    getOptions: function() {
        /*
        var propOptions = this.props.options,
            options = $.extend({}, defaultOptions, propOptions);
        */
        let optional = {};

        let startDate = this.props.startDate;
        if(typeof startDate !== 'undefined') {
            optional.startDate = startDate;
            this.startDate = startDate;
        }

        let endDate = this.props.endDate;
        if(typeof endDate !== 'undefined') {
            optional.endDate = endDate;
            this.endDate = endDate;
        }

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
        dateRangePicker.on('apply.daterangepicker', this.onApply);
    },
    setStateObject: function(props) {
        // disabled 처리
        let disabled = props.disabled;
        if(typeof disabled === 'undefined') {
            disabled = false;
        }

        return {
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
        console.log(nextProps);
        let dateRangePicker = $('#' + this.id),
            startDate = nextProps.startDate,
            endDate = nextProps.endDate;

        if(typeof dateRangePicker.data('daterangepicker') !== 'undefined') {
            if(typeof startDate !== 'undefined') {
                if(this.startDate != startDate) {
                    // startDate type: Date/moment/string
                    console.log('setStartDate');
                    dateRangePicker.data('daterangepicker').setStartDate(startDate);	// '2014-03-01'
                    this.startDate = startDate;
                }
            }

            if(typeof endDate !== 'undefined') {
                if(this.endDate != endDate) {
                    // endDate type: Date/moment/string
                    console.log('setEndDate');
                    dateRangePicker.data('daterangepicker').setEndDate(endDate);	// '2014-03-01'
                    this.endDate = endDate;
                }
            }
        }

        this.setState(this.setStateObject(nextProps));
    },
    componentWillUpdate: function(nextProps, nextState){
        // 새로운 props나 state를 받았을 때 렌더링 직전에 호출(최초 렌더링 시에는 호출되지 않음)
        console.log('componentWillUpdate');
    },
    render: function() {
        // 필수 항목
        const {className, startDateName, endDateName, width} = this.props;
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