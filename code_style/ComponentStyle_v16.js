import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Util from '../services/Util';

// 참고
// https://reactjs.org/docs/react-component.html

class ComponentStyle extends Component {
	static propTypes = {
		id: PropTypes.string,
		className: PropTypes.string,
		options: PropTypes.object,
		name: PropTypes.string,
		items: PropTypes.array,
		selectedIndex: PropTypes.number,
		disabled: PropTypes.bool,
		init: PropTypes.func,
		onChange: PropTypes.func,
		category: PropTypes.oneOf(['News','Photos']).isRequired,
		dialog: PropTypes.instanceOf(Dialog).isRequired,
		value: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number,
			PropTypes.bool
		])
	};

	static defaultProps = {
		value: 'default value',
		boolValue: true
	};

    constructor(props) {
        super(props);

        console.log('1. constructor');

        // state 초기화
        // 컴포넌트가 마운트되기 전 (한번 호출) / 리턴값은 this.state의 초기값으로 사용
        this.state = {
            data: [],
            count: props.initialCount
        };
    }

    componentWillMount() {
        // 최초 렌더링이 일어나기 직전(한번 호출)
        console.log('2. componentWillMount');
        let id = this.props.id;
        if(typeof id === 'undefined') {
            id = Util.getUUID();
        }

        this.id = id;
    }

    componentDidMount() {
        // 최초 렌더링이 일어난 다음(한번 호출)
        console.log('4. componentDidMount');
    }

    componentWillReceiveProps(nextProps) {
        // 컴포넌트가 새로운 props를 받을 때 호출(최초 렌더링 시에는 호출되지 않음)
        console.log('5. componentWillReceiveProps');
    }

    shouldComponentUpdate(nextProps, nextState) {
        // 새로운 props나 state를 받았을 때 렌더링 전에 호출(최초 렌더링 시에는 호출되지 않음)
        console.log('6. shouldComponentUpdate');

        // false 면 render 호출하지 않음(componentWillUpdate 와 componentDidUpdate 역시 호출되지 않음)
        return true;    // default true
    }

    componentWillUpdate(nextProps, nextState) {
        // 새로운 props나 state를 받았을 때 렌더링 직전에 호출(최초 렌더링 시에는 호출되지 않음)
        console.log('7. componentWillUpdate');
    }

    componentDidUpdate(prevProps, prevState) {
        // 컴포넌트의 업데이트가 DOM에 반영된 직후에 호출(최초 렌더링 시에는 호출되지 않음)
        console.log('8. componentDidUpdate');
    }

    componentWillUnmount() {
        // 컴포넌트가 DOM에서 마운트 해제 되기 직전에 호출
        console.log('9. componentWillUnmount');
    }

    /**
     * @private
     */
    // pirvate Event Handler
    _onClick = (e) => {

    }

    // pirvate method
    _func = () => {

    }

    /**
     * @public
     */
    // Event Handler
    onClick = (e) => {

    }

    // method
    func = () => {

    }

    // render를 위한 메소드
    renderNavigation = () => {

    }

    render() {
        // 필수 항목
        console.log('3. render');
        const { className } = this.props;

        return (
            <div id={this.id} className={classNames('panel', className)}></div>
        );
    }
}

export default ComponentStyle;
