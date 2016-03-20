'use strict';

var React = require('react');

var Stepper = React.createClass({
    onChange: function(event, value) {
        console.log(value);
    },
    onDisabled: function() {
        let disabled = this.state.disabled == false,
            disabledText = (disabled == false) ? 'Disabled' : 'Enabled';
        this.setState({disabled: disabled, disabledText: disabledText});
    },
    getInitialState: function() {
        return {disabled: false, disabledText: 'Disabled'};
    },
    render: function() {
        return (
            <div className="page-content">
                <div className="page-header">
                    <h1>Stepper</h1>
                </div>

                <div className="page-body">
                    <div className="row">{/* start default */}
                        <div className="row">
                            <h5>Stepper</h5>
                        </div>
                        <div className="row">
                            <div className="col-md-2">
                                <Pum.Stepper name="stepper_name" value={10} min={0} max={100} step={5} onChange={this.onChange} disabled={this.state.disabled} />
                            </div>
                            <div className="col-md-1">
                                <button onClick={this.onDisabled}>{this.state.disabledText}</button>
                            </div>
                        </div>
                        <div className="row">
                            <Pum.HiddenContent expandLabel="소스 보기" collapseLabel="소스 닫기"
                                            expandIcon="fa fa-caret-right" collapseIcon="fa fa-caret-down">
                                <Pum.TabSet>
                                    <Pum.Tabs>
                                        <Pum.Tab>JSX 코드</Pum.Tab>
                                    </Pum.Tabs>
                                    <Pum.TabContents>
                                        <Pum.TabContent>
                                            <pre className="prettyprint linenums">
                                                {/*'// html\n'*/}
                                                {'<Pum.Stepper name="stepper_name" value={10} min={0} max={100} step={5} />'}
                                            </pre>
                                        </Pum.TabContent>
                                    </Pum.TabContents>
                                </Pum.TabSet>
                            </Pum.HiddenContent>
                        </div>
                    </div>{/* end default */}
                    <div className="vspace-12" />
                </div>

                <div className="page-footer">

                </div>

            </div>
        );
    }
});

module.exports = Stepper;