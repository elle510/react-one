/**
 * DateRangePicker component
 *
 * version <tt>$ Version: 1.0 $</tt> date:2016/03/17
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 *
 * example:
 * <Puf.DateRanges startName="startDate" endName="endDate" ranges={predefined_ranges} />
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
    //opens: 'right',
    locale: {
        format: "YYYY-MM-DD",
        separator: " ~ ",
        applyLabel: $ps_locale.apply,
        cancelLabel: $ps_locale.cancel,
        customRangeLabel: $ps_locale.direct_select,
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

var DateRanges = React.createClass({
    displayName: 'DateRanges',
    propTypes: {
        id: PropTypes.string,
        className: PropTypes.string,
        format: PropTypes.string,
        startName: PropTypes.string,
        endName: PropTypes.string,
        startDate: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.object
        ]),
        endDate: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.object
        ]),
        ranges: PropTypes.object,
        timePicker: PropTypes.bool,
        disabled: PropTypes.bool,
        width: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        opens: PropTypes.string,        // 'left'/'right'/'center'
        onHide: PropTypes.func,
        onApply: PropTypes.func,
        init: PropTypes.func
    },
    id: '',
    startDate: '',
    endDate: '',
    onApply: function(event, picker) {
        //console.log('onApply');
        if(typeof this.props.onApply === 'function') {
            var startDate = DateUtil.getDateToString(picker.startDate._d),
                endDate = DateUtil.getDateToString(picker.endDate._d);
            //console.log(startDate);
            //console.log(endDate);
            this.props.onApply(event, startDate, endDate, picker);
        }
    },
    onHide: function(event, picker) {
        //console.log('onHide'); // hide 호출되고 apply 호출됨 (날짜값 셋팅은 여기서)
        this.setHiddenValue();
        if(typeof this.props.onHide === 'function') {
            var startDate = DateUtil.getDateToString(picker.startDate._d),
                endDate = DateUtil.getDateToString(picker.endDate._d);
            this.props.onHide(event, startDate, endDate, picker);
        }
    },
    setHiddenValue: function() {
        var startDate = this.$dateRangePicker.data('daterangepicker').startDate._d,
            endDate = this.$dateRangePicker.data('daterangepicker').endDate._d,
            startDateString, endDateString;

        startDateString = DateUtil.getDateToString(startDate);
        endDateString = DateUtil.getDateToString(endDate);
        //console.log(startDateString);
        //console.log(endDateString);

        $('[name="' + this.props.startName + '"]').val(startDateString);
        $('[name="' + this.props.endName + '"]').val(endDateString);

        this.startDate = startDateString;
        this.endDate = endDateString;
    },
    displayDate: function(start, end) {
        var format = 'YYYY-MM-DD';
        if(typeof this.props.format !== 'undefined') {
            format = this.props.format;
        }
        //$('div#' + this.id + ' span').html(start.format(format) + ' - ' + end.format(format));


        if(typeof start === 'string') {
            start = moment(start);
        }

        if(typeof end === 'string') {
            end = moment(end);
        }

        this.$dateRangePicker.find('span').html(start.format(format) + ' - ' + end.format(format));
    },
    getOptions: function() {
        /*
        var propOptions = this.props.options,
            options = $.extend({}, defaultOptions, propOptions);
        */
        let optional = {};

        let ranges = this.props.ranges;
        if(typeof ranges !== 'undefined') {
            optional.ranges = ranges;
        }

        // Date, moment, string
        let startDate = this.props.startDate,
            endDate = this.props.endDate;
        if(typeof startDate !== 'undefined' && typeof endDate !== 'undefined') {
            optional.startDate = startDate;
            optional.endDate = endDate;
            /*
            if(typeof startDate === 'string') {
                this.startDate = startDate;
            }else {
                if(startDate.hasOwnProperty('_d')) {
                    // moment
                    this.startDate = DateUtil.getDateToString(startDate._d);
                    console.log(this.startDate);
                }else {
                    // Date
                    this.startDate = DateUtil.getDateToString(startDate);
                }
            }
            */
        }else {
            var first;

            for(var key in ranges) {
                if (ranges.hasOwnProperty(key) && typeof key !== 'function') {
                    first = ranges[key];
                    break;
                }
            }

            if(first !== undefined && Array.isArray(first) && first.length > 0) {
                optional.startDate = first[0];
                optional.endDate = first[1];
            }
        }

        let timePicker = this.props.timePicker;
        optional.timePicker = timePicker;

        let opens = this.props.opens;
        optional.opens = opens;

        var options = $.extend({}, defaultOptions, optional);

        return options;
    },
    init: function() {
        var options = this.getOptions();
        this.$dateRangePicker = $('#' + this.id);
        this.$dateRangePicker.daterangepicker(options, this.displayDate);

        // init display
        this.displayDate(options.startDate, options.endDate);

        this.setHiddenValue();

        // setting events
        this.$dateRangePicker.on('hide.daterangepicker', this.onHide);
        this.$dateRangePicker.on('apply.daterangepicker', this.onApply);
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
    getDefaultProps: function() {
        // 클래스가 생성될 때 한번 호출되고 캐시된다.
        // 부모 컴포넌트에서 prop이 넘어오지 않은 경우 (in 연산자로 확인) 매핑의 값이 this.props에 설정된다.
        return {timePicker: false, opens: 'right'};
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

        if(typeof this.props.init === 'function') {
            var data = {};

            // this.startDate/this.endDate 은 setHiddenValue() 에서 설정됨
            data.startDate = this.startDate;
            data.endDate = this.endDate;
            data.datepicker = this.$dateRangePicker;
            this.props.init(data);
        }
    },
    componentWillReceiveProps: function(nextProps) {
        // 컴포넌트가 새로운 props를 받을 때 호출(최초 렌더링 시에는 호출되지 않음)
        console.log(nextProps);
        let startDate = nextProps.startDate,
            endDate = nextProps.endDate;

        if(typeof this.$dateRangePicker.data('daterangepicker') !== 'undefined') {
            if(typeof startDate !== 'undefined') {
                if(this.startDate != startDate) {
                    // startDate type: Date/moment/string
                    //console.log('setStartDate');
                    this.$dateRangePicker.data('daterangepicker').setStartDate(startDate);	// '2014-03-01'
                    this.startDate = startDate;
                }
            }

            if(typeof endDate !== 'undefined') {
                if(this.endDate != endDate) {
                    // endDate type: Date/moment/string
                    //console.log('setEndDate');
                    this.$dateRangePicker.data('daterangepicker').setEndDate(endDate);	// '2014-03-01'
                    this.endDate = endDate;
                }
            }

            var _startDate = this.$dateRangePicker.data('daterangepicker').startDate,
                _endDate = this.$dateRangePicker.data('daterangepicker').endDate;
            this.displayDate(_startDate, _endDate);
        }

        this.setState(this.setStateObject(nextProps));
    },
    render: function() {
        // 필수 항목
        const {className, startName, endName, width} = this.props;
        return (
            <div id={this.id} className={classNames('daterangepicker-ranges pull-right', className)} style={{width: width}}>
                <i className='glyphicon glyphicon-calendar fa fa-calendar'>{'\u00A0'}</i>
                <span></span>
                <b className='caret'></b>
                <input type="hidden" name={startName} />
                <input type="hidden" name={endName} />
            </div>
        );
    }
});

module.exports = DateRanges;