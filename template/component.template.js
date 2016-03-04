/**
 * JsTree component
 *
 * version <tt>$ Version: 1.0 $</tt> date:2016/03/03
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 *
 * example:
 * <ReactPum.JsTree options="{options}" />
 *
 * JsTree 라이브러리에 종속적이다.
 */

var React = require('react');

var Util = require('../services/util');

function getUUID() {
    return Util.getUUID();
}

module.exports = React.createClass({
    displayName: 'JsTree',
    id: getUUID(),
    componentWillMount: function() {
        // 최초 렌더링이 일어나기 직전(한번 호출)
        console.log('componentWillMount');
    },
    componentDidMount: function() {
        // 최초 렌더링이 일어난 다음(한번 호출)
        console.log('componentDidMount');
    },
    componentWillReceiveProps: function(nextProps) {
        // 컴포넌트가 새로운 props를 받을 때 호출(최초 렌더링 시에는 호출되지 않음)
        console.log('componentWillReceiveProps');
    },
    componentWillUpdate: function(nextProps, nextState){
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
        console.log('render');

        return (
            <div id={this.id}></div>
        );
    }
});
