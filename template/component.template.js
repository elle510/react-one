/**
 * JsTree component
 *
 * version <tt>$ Version: 1.0 $</tt> date:2016/03/03
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 *
 * example:
 * <ReactPum.JsTree options="{options}" />
 *
 * JsTree ���̺귯���� �������̴�.
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
        // ���� �������� �Ͼ�� ����(�ѹ� ȣ��)
        console.log('componentWillMount');
    },
    componentDidMount: function() {
        // ���� �������� �Ͼ ����(�ѹ� ȣ��)
        console.log('componentDidMount');
    },
    componentWillReceiveProps: function(nextProps) {
        // ������Ʈ�� ���ο� props�� ���� �� ȣ��(���� ������ �ÿ��� ȣ����� ����)
        console.log('componentWillReceiveProps');
    },
    componentWillUpdate: function(nextProps, nextState){
        // ���ο� props�� state�� �޾��� �� ������ ������ ȣ��(���� ������ �ÿ��� ȣ����� ����)
        console.log('componentWillUpdate');
    },
    componentDidUpdate: function(prevProps, prevState) {
        // ������Ʈ�� ������Ʈ�� DOM�� �ݿ��� ���Ŀ� ȣ��(���� ������ �ÿ��� ȣ����� ����)
        console.log('componentDidUpdate');
    },
    componentWillUnmount: function(){
        // ������Ʈ�� DOM���� ����Ʈ ���� �Ǳ� ������ ȣ��
        console.log('componentWillUnmount');
    },
    render: function() {
        // �ʼ� �׸�
        console.log('render');

        return (
            <div id={this.id}></div>
        );
    }
});
