/**
 * Autocomplete component
 *
 * version <tt>$ Version: 1.0 $</tt> date:2016/04/12
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 *
 * example:
 * <Pum.Autocomplete options={options} />
 *
 * jQuery-UI 라이브러리에 종속적이다.
 * https://jqueryui.com/autocomplete/
 *
 * 참고
 * http://hellogk.tistory.com/74
 */
'use strict';

var React = require('react');
var PropTypes = require('react').PropTypes;
var classNames = require('classnames');

var Util = require('../services/util');

var Autocomplete = React.createClass({
    displayName: 'Autocomplete',
    propTypes: {
        id: PropTypes.string,
        className: PropTypes.string,
        name: PropTypes.string,
        source: PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.func
        ]),
        disabled: PropTypes.bool,
        onInit: PropTypes.func,
        onChange: PropTypes.func
    },
    id: '',
    getInitialState: function() {
		// 컴포넌트가 마운트되기 전 (한번 호출) / 리턴값은 this.state의 초기값으로 사용
        let disabled = this.props.disabled;
        if(typeof disabled !== 'boolean') {
            disabled = false;
        }

        return {
            disabled: disabled
        };

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
        var autoInput = $('#'+this.id);
        autoInput.autocomplete({
            source: this.props.source
        });

        if(typeof this.props.onInit === 'function') {
            var data = {};
            //data.key = value;
            this.props.onInit(data);
        }
    },
    componentWillReceiveProps: function(nextProps) {
        // 컴포넌트가 새로운 props를 받을 때 호출(최초 렌더링 시에는 호출되지 않음)
        if(typeof nextProps.disabled === 'boolean') {
            this.setState({disabled: nextProps.disabled});
        }
    },
    render: function() {
        // 필수 항목
        const {className, name} = this.props;

        return (
            <input type="text" id={this.id} name={name} className={classNames(className)} disabled={this.state.disabled} />
        );
    }
});

module.exports = Autocomplete;