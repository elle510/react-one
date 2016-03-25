/**
 * DatePicker component
 *
 * version <tt>$ Version: 1.0 $</tt> date:2016/03/19
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 *
 * example:
 * <Pum.DatePicker id="datepicker" name="datepicker_name" date="2016-03-19"
 *                 disabled={true} timePicker={true} onChange={this.onChange} options={this.options} />
 *
 * Bootstrap 3 DatePicker 라이브러리에 종속적이다.
 * http://eonasdan.github.io/bootstrap-datetimepicker/
 */
'use strict';

var React = require('react');
var PropTypes = require('react').PropTypes;
var classNames = require('classnames');

var Util = require('../services/util');
var DateUtil = require('../services/DateUtil');

var defaultOptions = {
    format: 'YYYY-MM-DD',
    dayViewHeaderFormat: 'YYYY-MM',
    locale: $ps_locale.locale,
    tooltips: {
        today: 'Go to today',
        clear: 'Clear selection',
        close: 'Close the picker',
        selectMonth: 'Select Month',
        prevMonth: 'Previous Month',
        nextMonth: 'Next Month',
        selectYear: 'Select Year',
        prevYear: 'Previous Year',
        nextYear: 'Next Year',
        selectDecade: 'Select Decade',
        prevDecade: 'Previous Decade',
        nextDecade: 'Next Decade',
        prevCentury: 'Previous Century',
        nextCentury: 'Next Century'
    }
};

var DatePicker = React.createClass({
    displayName: 'DatePicker',
    propTypes: {
        id: PropTypes.string,
        className: PropTypes.string,
        name: PropTypes.string,
        date: PropTypes.string,             // YYYY-MM-DD HH:mm:ss format의 string
        //minDate: PropTypes.string,          // YYYY-MM-DD HH:mm:ss format의 string
        //maxDate: PropTypes.string,          // YYYY-MM-DD HH:mm:ss format의 string
        disabled: PropTypes.bool,
        timePicker: PropTypes.bool,
        onInit: PropTypes.func,
        onChange: PropTypes.func,
        options: PropTypes.object,
        toDatePicker: PropTypes.bool        // DateRangePicker 에서 toDate로 사용시 true(DateRangePicker 내에서만 사용)
    },
    id: '',
    getOptions: function() {
        var propOptions = this.props.options,
            options = $.extend({}, defaultOptions, propOptions);

        // timePicker 설정
        if(typeof this.props.timePicker !== 'undefined') {
            if(this.props.timePicker === true) {
                options.format = 'YYYY-MM-DD HH:mm:ss';
            }
        }

        // defaultDate 설정
        if((typeof this.props.date === 'undefined' || !this.props.date)
            && (typeof options.defaultDate === 'undefined' || !options.defaultDate)) {
            options.defaultDate = moment();
        }else {
            // date 가 YYYY-MM-DD string으로 들어오면 moment() 로 변환
            options.defaultDate = moment(this.props.date, options.format);//this.props.date;
        }

        return options;
    },
    onChange: function(event) {
        //console.log('datepicker onChange');
        //console.log(event);
        //console.log(DateUtil.getDateToString(event.date._d));
        //console.log(DateUtil.getDateToString(event.oldDate._d));

        let date = DateUtil.getDateToString(event.date._d),
            oldDate = DateUtil.getDateToString(event.oldDate._d);

        // name 의 value 값 설정
        if(this.props.toDatePicker === true && (typeof this.props.timePicker === 'undefined' || !this.props.timePicker)) {
            var arr = date.split(' '), oldArr = oldDate.split(' ');
            date = arr[0] + ' 23:59:59';
            oldDate = oldArr[0] + ' 23:59:59';
        }
        this.setState({date: date});

        if(typeof this.props.onChange === 'function') {
            this.props.onChange(event, date, oldDate);
            //event.stopImmediatePropagation();
        }
    },
    init: function() {
        var datepicker = $('#'+this.id);
        datepicker.datetimepicker(this.getOptions());

        // name 의 value 값 설정
        var date = DateUtil.getDateToString(datepicker.data("DateTimePicker").date()._d);
        if(this.props.toDatePicker === true && (typeof this.props.timePicker === 'undefined' || !this.props.timePicker)) {
            var arr = date.split(' ');
            date = arr[0] + ' 23:59:59';
        }
        this.setState({date: date});

        // setting events
        datepicker.on('dp.change', this.onChange);
    },
    getInitialState: function() {
        return {date: this.props.date};
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
        if(typeof this.props.onInit === 'function') {
            var datepicker = $('#'+this.id),
                data = {};

            // name 의 value 값 설정
            var date = DateUtil.getDateToString(datepicker.data("DateTimePicker").date()._d);
            if(this.props.toDatePicker === true && (typeof this.props.timePicker === 'undefined' || !this.props.timePicker)) {
                var arr = date.split(' ');
                date = arr[0] + ' 23:59:59';
            }
            data.date = date;
            data.datepicker = datepicker;
            this.props.onInit(data);
        }
    },
    componentWillReceiveProps: function(nextProps) {
        // 컴포넌트가 새로운 props를 받을 때 호출(최초 렌더링 시에는 호출되지 않음)
        var datepicker = $('#'+this.id);

        // setDate 처리
        if(typeof nextProps.date !== 'undefined') {
            // string 을 moment 로 변환해서 넣자
            var d = moment(nextProps.date, datepicker.data("DateTimePicker").format());
            datepicker.data("DateTimePicker").date(d);

            // name 의 value 값 설정
            var date = DateUtil.getDateToString(datepicker.data("DateTimePicker").date()._d);
            if(this.props.toDatePicker === true && (typeof this.props.timePicker === 'undefined' || !this.props.timePicker)) {
                var arr = date.split(' ');
                date = arr[0] + ' 23:59:59';
            }
            this.setState({date: date});
        }

        // disabled 처리
        if(nextProps.disabled === true) {
            datepicker.data("DateTimePicker").disable();
        }else {
            datepicker.data("DateTimePicker").enable();
        }

        // minDate/maxDate 처리
        /*
        if(typeof nextProps.minDate !== 'undefined') {
            console.log('minDate: ' + nextProps.minDate);
            var minDate = moment(nextProps.minDate);
            datepicker.data('DateTimePicker').minDate(minDate);
        }

        if(typeof nextProps.maxDate !== 'undefined') {
            console.log('maxDate: ' + nextProps.maxDate);
            var maxDate = moment(nextProps.maxDate);
            datepicker.data('DateTimePicker').maxDate(maxDate);
        }
        */
    },
    render: function() {
        // 필수 항목
        return (
            <div className={classNames('input-group', 'date', this.props.className)} id={this.id}>
                <input type='text' className="form-control" />
                <span className="input-group-addon">
                    <span className="fa fa-calendar"></span>
                </span>
                {/* input text 에서 value 는 plugin에서 컨트롤 해서 충돌방지를 위해 hidden으로 처리 */}
                <input type="hidden" name={this.props.name} value={this.state.date} />
            </div>
        );
    }
});

var DateRangePicker = React.createClass({
    displayName: 'DateRangePicker',
    propTypes: {
        className: PropTypes.string,
        fromName: PropTypes.string,
        toName: PropTypes.string,
        fromDate: PropTypes.string,         // YYYY-MM-DD HH:mm:ss format의 string
        toDate: PropTypes.string,           // YYYY-MM-DD HH:mm:ss format의 string
        disabled: PropTypes.bool,
        timePicker: PropTypes.bool,
        onInit: PropTypes.func,
        onChange: PropTypes.func
    },
    fromDate: '',
    toDate: '',
    fromOldDate: '',
    toOldDate: '',
    fromPicker: '',
    toPicker: '',
    onFromInit: function(data) {
        this.fromDate = data.date;
        this.fromPicker = data.datepicker;
    },
    onToInit: function(data) {
        this.toDate = data.date;
        this.toPicker = data.datepicker;
    },
    onFromChange: function(event, date, oldDate) {
        // minDate 설정
        var minDate = moment(date);
        //$(event.target).next().data('DateTimePicker').minDate(minDate);
        this.toPicker.data('DateTimePicker').minDate(minDate);

        if(typeof this.props.onChange === 'function') {
            this.fromDate = date;
            this.fromOldDate = oldDate;
            this.props.onChange(event, this.fromDate, this.toDate, this.fromOldDate, this.toOldDate);
            //event.stopImmediatePropagation();
        }
    },
    onToChange: function(event, date, oldDate) {
        // maxDate 설정
        var maxDate = moment(date);
        //$(event.target).prev().data('DateTimePicker').maxDate(maxDate);
        this.fromPicker.data('DateTimePicker').maxDate(maxDate);

        if(typeof this.props.onChange === 'function') {
            this.toDate = date;
            this.toOldDate = oldDate;
            this.props.onChange(event, this.fromDate, this.toDate, this.fromOldDate, this.toOldDate);
            //event.stopImmediatePropagation();
        }
    },
    setStateObject: function(props) {
        // fromDate 처리
        let fromDate = props.fromDate;

        // toDate 처리
        let toDate = props.toDate;

        // disabled 처리
        let disabled = props.disabled;
        if(typeof disabled === 'undefined') {
            disabled = false;
        }

        return {
            fromDate: fromDate,
            toDate: toDate,
            disabled: disabled
        };
    },
    getInitialState: function() {
        return this.setStateObject(this.props);
    },
    componentDidMount: function() {
        // 최초 렌더링이 일어난 다음(한번 호출)

        // minDate/maxDate 설정
        var maxDate = moment(this.toDate);
        this.fromPicker.data('DateTimePicker').maxDate(maxDate);

        var minDate = moment(this.fromDate);
        this.toPicker.data('DateTimePicker').minDate(minDate);

        // onInit
        if(typeof this.props.onInit === 'function') {
            var data = {};
            data.fromDate = this.fromDate;
            data.toDate = this.toDate;
            this.props.onInit(data);
        }
    },
    componentWillReceiveProps: function(nextProps) {
        // 컴포넌트가 새로운 props를 받을 때 호출(최초 렌더링 시에는 호출되지 않음)
        this.setState(this.setStateObject(nextProps));
    },
    render: function() {
        // 필수 항목
        return (
            <div className="datepicker-group">
                <Pum.DatePicker className={this.props.className} name={this.props.fromName} date={this.state.fromDate}
                                onInit={this.onFromInit} onChange={this.onFromChange} timePicker={this.props.timePicker} disabled={this.state.disabled} />
                <Pum.DatePicker className={this.props.className} name={this.props.toName} date={this.state.toDate} toDatePicker={true}
                                onInit={this.onToInit} onChange={this.onToChange} timePicker={this.props.timePicker} disabled={this.state.disabled}
                                options={{useCurrent: false}} />
            </div>
        );
    }
});

module.exports = {
    DatePicker: DatePicker,
    DateRangePicker: DateRangePicker
};