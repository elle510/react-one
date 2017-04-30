'use strict';

import React, { Component, PropTypes } from 'react';

const propTypes = {
    
};

const defaultProps = {
    
};

/** Class representing a ButtonDemo. */
class ButtonDemo extends Component {
    constructor(props) {
        super(props);

        // Manually bind this method to the component instance...
        this.onClick = this.onClick.bind(this);       
    }

    componentDidMount() {
        // 최초 렌더링이 일어난 다음(한번 호출)
        //this.refs.Btn.enable(false);
        prettyPrint();
    }

    onClick() {
        console.log('Button onClick');
    }

    render() {
        return (
            <div className="page-body">
                <div className="ui grid">{/* start default */}
                    <div className="row">
                        <span className="title">Button</span>
                    </div>
                    <div className="row">
                        <UI.Button ref="Btn" className="ui primary button" 
                                    onClick={this.onClick} tooltip="버튼버튼버튼툴팁<br>버튼버튼버튼툴팁">
                                    버튼
                        </UI.Button>
                    </div>
                    <div className="row">      
                        <UI.HiddenContent expandLabel="소스 보기" collapseLabel="소스 닫기"
                                        expandIcon="fa fa-caret-right" collapseIcon="fa fa-caret-down">
                            <pre className="prettyprint linenums">
                                {'// js\n' +
                                '안형로'}
                            </pre>
                        </UI.HiddenContent>
                    </div>
                </div>{/* end default */}
            </div>
        );
    }
}

ButtonDemo.propTypes = propTypes;
ButtonDemo.defaultProps = defaultProps;

export default ButtonDemo;