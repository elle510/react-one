/**
 * TagsInput component
 *
 * version <tt>$ Version: 1.0 $</tt> date:2016/04/14
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 *
 * example:
 * <Pum.TagsInput options={options} />
 *
 * TagsInput 라이브러리에 종속적이다.
 * https://bootstrap-tagsinput.github.io/bootstrap-tagsinput/examples/
 */
'use strict';

var React = require('react');
var PropTypes = require('react').PropTypes;
var classNames = require('classnames');

var Util = require('../services/util');

var TagsInput = React.createClass({
    displayName: 'TagsInput',
    propTypes: {
        id: PropTypes.string,
        className: PropTypes.string,
        options: PropTypes.object,
        name: PropTypes.string,
        items: PropTypes.array,
        selectedIndex: PropTypes.number,
        disabled: PropTypes.bool,
        onInit: PropTypes.func,
        onChange: PropTypes.func,
		category: PropTypes.oneOf(['News','Photos']).isRequired,
		//dialog: PropTypes.instanceOf(Dialog).isRequired,
		value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
            PropTypes.bool
        ])
    },
    id: '',
	getDefaultProps: function() {
		// 클래스가 생성될 때 한번 호출되고 캐시된다.
		// 부모 컴포넌트에서 prop이 넘어오지 않은 경우 (in 연산자로 확인) 매핑의 값이 this.props에 설정된다.
		console.log('1. getDefaultProps');
		return {value: 'default value'};
	},
    getInitialState: function() {
		// 컴포넌트가 마운트되기 전 (한번 호출) / 리턴값은 this.state의 초기값으로 사용
        console.log('2. getInitialState');
        return {data: []};
    },
    componentWillMount: function() {
        // 최초 렌더링이 일어나기 직전(한번 호출)
        console.log('3. componentWillMount');
        let id = this.props.id;
        if(typeof id === 'undefined') {
            id = Util.getUUID();
        }

        this.id = id;
    },
    componentDidMount: function() {
        // 최초 렌더링이 일어난 다음(한번 호출)
        console.log('5. componentDidMount');
        if(typeof this.props.onInit === 'function') {
            var data = {};
            data.key = value;
            this.props.onInit(data);
        }
    },
    componentWillReceiveProps: function(nextProps) {
        // 컴포넌트가 새로운 props를 받을 때 호출(최초 렌더링 시에는 호출되지 않음)
        console.log('componentWillReceiveProps');
    },
    componentWillUpdate: function(nextProps, nextState) {
        // 새로운 props나 state를 받았을 때 렌더링 직전에 호출(최초 렌더링 시에는 호출되지 않음)
        console.log('componentWillUpdate');
    },
    componentDidUpdate: function(prevProps, prevState) {
        // 컴포넌트의 업데이트가 DOM에 반영된 직후에 호출(최초 렌더링 시에는 호출되지 않음)
        console.log('componentDidUpdate');
    },
    componentWillUnmount: function(){
        // 컴포넌트가 DOM에서 마운트 해제 되기 직전에 호출
        console.log('componentWillUnmount');
    },
    render: function() {
        // 필수 항목
        console.log('4. render');
        const {className} = this.props;

        return (
            <div id={this.id} className={classNames('panel', className)}></div>
        );
    }
});

module.exports = TagsInput;