'use strict';

import React, { Component, PropTypes } from 'react';

const propTypes = {
    
};

const defaultProps = {
    
};

/** Class representing a TreeDemo. */
class TreeDemo extends Component {
    constructor(props) {
        super(props);

        // Manually bind this method to the component instance...
        this.onClick = this.onClick.bind(this);       
    }

    componentDidMount() {
        // 최초 렌더링이 일어난 다음(한번 호출)
        prettyPrint();
    }

    onClick() {
        console.log('Tree onClick');
    }

    render() {
        return (
            <div className="page-body">
                <div className="ui grid">{/* start default */}
                    <div className="row">
                        <span className="title">Tree</span>
                    </div>
                    <div className="row">
                        <UI.Tree url="./data/main-menu.json" method="GET" onClick={this.onClick} />
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

TreeDemo.propTypes = propTypes;
TreeDemo.defaultProps = defaultProps;

export default TreeDemo;