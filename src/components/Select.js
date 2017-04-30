/**
 * Select Component
 *
 * version <tt>$ Version: 1.0 $</tt> date:2017/04/30
 * author <a href="mailto:elle0510@gmail.com">Ahn Hyung-Ro</a>
 *
 * example:
 * <UI.Select options={options} />
 *
 * Select2 React Component
 * version: 4.0.3
 * Homepage: https://select2.github.io/
 * GitHub: https://github.com/select2/select2
 */
'use strict';

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { Util } from '../utils';

import 'select2';
import styles from '../../node_modules/select2/dist/css/select2.css';

const propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    name: PropTypes.string,
    url: PropTypes.string,
    items: PropTypes.array,
    selectedIndex: PropTypes.number,
    disabled: PropTypes.bool,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    onSelect: PropTypes.func,
    onUnSelect: PropTypes.func
};

// 클래스가 생성될 때 한번 호출되고 캐시된다.
// 부모 컴포넌트에서 prop이 넘어오지 않은 경우 (in 연산자로 확인) 매핑의 값이 this.props에 설정된다.
const defaultProps = {
    items: [],
    selectedIndex: 0,
    disabled: false
};

class Select extends Component {
    constructor(props) {
        super(props);

        // 컴포넌트 id
        this._id = props.id || Util.getUUID();

        // 컴포넌트 Dom
        this._$select = null;

        // Event Binding
        this.onChange = this.onChange.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.onUnSelect = this.onUnSelect.bind(this);
    }

    /**
     * 최초 렌더링이 일어난 다음(한번 호출)
     * @private
     */
    componentDidMount() {
        // 컴포넌트 생성
        this._createComponent();
    }

    /**
     * 컴포넌트가 새로운 props를 받을 때 호출(최초 렌더링 시에는 호출되지 않음)
     * @private
     */
    componentWillReceiveProps(nextProps) {
        
    }

    /**
     * 컴포넌트 생성
     * @private
     */
    _createComponent() {
        this._$select = $('#' + this._id);
        this._$select.select2(this._options());

        // Event Bind
        this._bindEvent();
    }

    /**
     * @private
     */
    _options() {
        const { url, items, placeholder } = this.props;

        let options = {
            placeholder: placeholder
        };

        // url
        if(typeof url !== 'undefined') {
            $.extend(options, { ajax: {} });
        }else {
            $.extend(options, { data: items });
        }

        return options;
    }

    /**
     * Event Bind
     * @private
     */
    _bindEvent() {
        const { onChange, onSelect, onUnSelect } = this.props;

        if(typeof onSelect === 'function') {
            this._$select.on('change', onChange);
        }

        if(typeof onSelect === 'function') {
            this._$select.on('select2:select', onSelect);
        }

        if(typeof onUnSelect === 'function') {
            this._$select.on('select2:unselect', onUnSelect);
        }
    }

    onChange(e) {
        if(typeof this.props.onChange !== 'undefined') {
            this.props.onChange(e);
        }
    }

    onSelect(e) {
        if(typeof this.props.onSelect !== 'undefined') {
            this.props.onSelect(e);
        }
    }

    onUnSelect(e) {
        if(typeof this.props.onUnSelect !== 'undefined') {
            this.props.onUnSelect(e);
        }
    }

    /**
     * @private
     */
    render() {
        // 필수 항목
        const { className } = this.props;

        return (
            <select id={this._id} className={classNames(className)}></select>
        );
    }
}

Select.propTypes = propTypes;
Select.defaultProps = defaultProps;

export default Select;