/**
 * Temp component
 *
 * version <tt>$ Version: 1.0 $</tt> date:2016/03/03
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 *
 * example:
 * <Pum.Temp options="{options}" />
 *
 * JsTree ���̺귯���� �������̴�.
 */
'use strict';

var React = require('react');
var PropTypes = require('react').PropTypes;

var Util = require('../services/util');

function getUUID() {
    return Util.getUUID();
}

var Temp = React.createClass({
    displayName: 'Temp',
    propTypes: {
        id: PropTypes.string,
        className: PropTypes.string,
        options: PropTypes.object,
        name: PropTypes.string,
        items: PropTypes.array,
        selectedIndex: PropTypes.number,
        disabled: PropTypes.bool,
        onChange: PropTypes.func
    },
    UUID: getUUID(),
    getId: function() {
        let id = this.props.id;
        if(typeof id === 'undefined') {
            id = this.UUID;
        }
        return id;
    },
    getInitialState: function() {
        console.log('getInitialState');
        return {data: []};
    },
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
            <div id={this.getId()}></div>
        );
    }
});

module.exports = Temp;