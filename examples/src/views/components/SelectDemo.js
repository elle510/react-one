'use strict';

import React, { Component, PropTypes } from 'react';

var items = [
    { id: 0, text: 'enhancement' }, 
    { id: 1, text: 'bug' }, 
    { id: 2, text: 'duplicate' }, 
    { id: 3, text: 'invalid' }, 
    { id: 4, text: 'wontfix' }
];

const propTypes = {
    
};

const defaultProps = {
    
};

/** Class representing a SelectDemo. */
class SelectDemo extends Component {
    constructor(props) {
        super(props);

        // Event Binding
        this.onChange = this.onChange.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.onUnSelect = this.onUnSelect.bind(this);
    }

    componentDidMount() {
        // 최초 렌더링이 일어난 다음(한번 호출)
        prettyPrint();
    }

    onChange(e) {
        console.log('Select onChange', e);
    }

    onSelect(e) {
        console.log('Select onSelect', e);
    }
    
    onUnSelect(e) {
        console.log('Select onUnSelect', e);
    }

    render() {
        return (
            <div className="page-body">
                <div className="ui grid">{/* start default */}
                    <div className="row">
                        <span className="title">Select</span>
                    </div>
                    <div className="row">
                        <UI.Select items={items} onChange={this.onChange} onSelect={this.onSelect} onUnSelect={this.onUnSelect} />
                    </div>
                    <div className="sixteen wide column">      
                        <UI.HiddenContent expandLabel="소스 보기" collapseLabel="소스 닫기"
                                        expandIcon="fa fa-caret-right" collapseIcon="fa fa-caret-down">
                            <pre className="prettyprint linenums">
                                {/*'// jsx\n'*/}
                                {'<UI.Tree url="/demo/json/kendo/tree.json"\n'}
                                {'         method="GET"\n'}
                                {'         onClick={this.onClick} />'}
                            </pre>
                        </UI.HiddenContent>
                    </div>
                </div>{/* end default */}
            </div>
        );
    }
}

SelectDemo.propTypes = propTypes;
SelectDemo.defaultProps = defaultProps;

export default SelectDemo;