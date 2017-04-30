/**
 * Temp Component
 *
 * version <tt>$ Version: 1.0 $</tt> date:2016/03/03
 * author <a href="mailto:elle0510@gmail.com">Ahn Hyung-Ro</a>
 *
 * example:
 * <Puf.Temp options={options} />
 *
 * JsTree 라이브러리에 종속적이다.
 */
// https://facebook.github.io/react/docs/reusable-components.html
// https://babeljs.io/blog/2015/06/07/react-on-es6-plus
// http://egorsmirnov.me/2015/05/22/react-and-es6-part1.html
// http://cheng.logdown.com/posts/2015/09/29/converting-es5-react-to-es6
// http://www.newmediacampaigns.com/blog/refactoring-react-components-to-es6-classes
// https://toddmotto.com/react-create-class-versus-component/

// import : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import
// https://24ways.org/2014/javascript-modules-the-es6-way/
// http://ohgyun.com/588
// http://nodejs.github.io/nodejs-ko/articles/2015/05/11/story-about-js-and-babel/
'use strict';

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import Util from '../services/Util';

const propTypes = {
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

// 클래스가 생성될 때 한번 호출되고 캐시된다.
// 부모 컴포넌트에서 prop이 넘어오지 않은 경우 (in 연산자로 확인) 매핑의 값이 this.props에 설정된다.
const defaultProps = {
    value: 'default value',
    boolValue: true
};

class Temp extends Component {
    // static displayName = 'Temp';

    // id = ''

    constructor(props) {
        super(props);

        console.log('1. constructor');

        // getInitialState (state 초기화)
        // 컴포넌트가 마운트되기 전 (한번 호출) / 리턴값은 this.state의 초기값으로 사용
        this.state = {
            data: [],
            count: props.initialCount
        };

        // // Operations usually carried out in componentWillMount go here
        // let id = props.id;
        // if(typeof id === 'undefined') {
        //     id = Util.getUUID();
        // }

        // this.id = id;

        // Manually bind this method to the component instance...
        this.handleOptionsButtonClick = this.handleOptionsButtonClick.bind(this);
        this._bind('_handleClick', '_handleFoo');
    }

    // 상위 클래스에 정의해서 사용할 수 있는지 확인해 보자
    _bind(...methods) {
        methods.forEach( (method) => this[method] = this[method].bind(this) );
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
        if(typeof this.props.init === 'function') {
            var data = {};
            data.key = value;
            this.props.init(data);
        }
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

    render() {
        // 필수 항목
        console.log('3. render');
        const { className } = this.props;

        return (
            <div id={this.id} className={classNames('panel', className)}></div>
        );
    }
}

Temp.propTypes = propTypes;
Temp.defaultProps = defaultProps;

export default Temp;
