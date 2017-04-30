/**
 * Tree Component
 *
 * version <tt>$ Version: 1.0 $</tt> date:2017/04/02
 * author <a href="mailto:elle0510@gmail.com">Ahn Hyung-Ro</a>
 *
 * example:
 * <UI.Tree options={options} />
 *
 * zTree React Component
 * version: 3.5.24
 * Homepage: http://www.treejs.cn
 * GitHub: https://github.com/zTree/zTree_v3
 * 
 */
'use strict';

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { Util } from '../utils';

import 'ztree';
import styles from '../../node_modules/ztree/css/zTreeStyle/zTreeStyle.css';

const propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    method: PropTypes.string,
    items: PropTypes.array,
    onClick: PropTypes.func
};

// 클래스가 생성될 때 한번 호출되고 캐시된다.
// 부모 컴포넌트에서 prop이 넘어오지 않은 경우 (in 연산자로 확인) 매핑의 값이 this.props에 설정된다.
const defaultProps = {
    method: 'POST', 
};

/** Class representing a Tree. */
class Tree extends Component {
    constructor(props) {
        super(props);

        // this.state = {
        //     data: [],
        //     count: props.initialCount
        // };

        this.onClick = this.onClick.bind(this);
    }

    componentWillMount() {
        // 최초 렌더링이 일어나기 직전(한번 호출)
        let id = this.props.id;
        if(typeof id === 'undefined') {
            id = Util.getUUID();
        }

        this.id = id;
    }

    componentDidMount() {
        // 최초 렌더링이 일어난 다음(한번 호출)
        this.$tree = $('#' + this.id);
        $.fn.zTree.init(this.$tree, this.options());
    }

    componentWillReceiveProps(nextProps) {
        // 컴포넌트가 새로운 props를 받을 때 호출(최초 렌더링 시에는 호출되지 않음)
    }

    shouldComponentUpdate(nextProps, nextState) {
        // 새로운 props나 state를 받았을 때 렌더링 전에 호출(최초 렌더링 시에는 호출되지 않음)
        // false 면 render 호출하지 않음(componentWillUpdate 와 componentDidUpdate 역시 호출되지 않음)
        return false;    // default true
    }

    /**
     * @private
     */
    options() {
        const { url, method, onClick } = this.props;

        var options = {
            async: {
		        enable: true,
                type: method,
		        url: url,
		        autoParam: ["id"]
	        },
            callback: {
		        onClick: this.onClick
	        }
        };

        return options;
    }
    
    //-----------------------------
    // methods

    //-----------------------------
    // events
    onClick(e, treeId, treeNode) {
        // console.log(e);
        // console.log('treeId', treeId);
        // console.log('treeNode', treeNode);

        if(typeof this.props.onClick !== 'undefined') {
            this.props.onClick(e, treeId, treeNode);
        }
    }

    render() {
        // 필수 항목
        const { className } = this.props;

        return (
            <ul id={this.id} className={classNames('ztree', className)}></ul>
        );
    }
}

Tree.propTypes = propTypes;
Tree.defaultProps = defaultProps;

export default Tree;
