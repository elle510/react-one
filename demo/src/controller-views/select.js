'use strict';

var React = require('react');

var colors = [
    {label:'black', value:'1', shade:'dark'},
    {label:'white', value:'2', shade:'light'},
    {label:'red', value:'3', shade:'dark'},
    {label:'blue', value:'4', shade:'dark'},
    {label:'yellow', value:'5', shade:'light'}
];

var cities = [
    {label:'Seoul', value:'1', shade:'dark'},
    {label:'NewYork', value:'2', shade:'light'},
    {label:'London', value:'3', shade:'dark'},
    {label:'Paris', value:'4', shade:'dark'},
    {label:'Shanghai', value:'5', shade:'light'}
];

function changeData() {

}

var Select = React.createClass({
    onSelectChange: function(event, index) {
        console.log('onSelectChange index: ' + index);
    },
    onChangeData: function() {
        if(this.state.items[0]['label'] == 'black') {
            this.setState({items: cities});
        }else {
            this.setState({items: colors});
        }
    },
    onDisabled: function() {
        let disabled = this.state.disabled == false,
            disabledText = (disabled == false) ? 'Disabled' : 'Enabled';
        this.setState({disabled: disabled, disabledText: disabledText});
    },
    getInitialState: function() {
        return {items: colors, disabled: false, disabledText: 'Disabled'};
    },
    componentDidMount: function() {
        // 최초 렌더링이 일어난 다음(한번 호출)
        prettyPrint();
    },
    render: function() {
        return (
            <div className="page-content">
                <div className="page-header">
                    <span className="title">Select</span>
                </div>

                <div className="page-body">
                    <div className="row">{/* start default */}
                        <div className="row">
                            <div className="col-md-12">
                                <h5>Select(콤보박스)</h5>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3">
                                <Pum.Select name="selectName" labelKey="label" valueKey="value"
                                            items={this.state.items} onChange={this.onSelectChange} disabled={this.state.disabled}>
                                </Pum.Select>
                            </div>
                            <div className="col-md-2">
                                <button onClick={this.onChangeData}>Change Data</button>
                            </div>
                            <div className="col-md-1">
                                <button onClick={this.onDisabled}>{this.state.disabledText}</button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <Pum.HiddenContent expandLabel="소스 보기" collapseLabel="소스 닫기"
                                                expandIcon="fa fa-caret-right" collapseIcon="fa fa-caret-down">
                                    <Pum.TabSet>
                                        <Pum.Tabs>
                                            <Pum.Tab>HTML코드</Pum.Tab>
                                            <Pum.Tab>JS코드</Pum.Tab>
                                        </Pum.Tabs>
                                        <Pum.TabContents>
                                            <Pum.TabContent>
                                                <pre className="prettyprint linenums">
                                                    // html
                                                    {'<Pum.JqGrid options={this.options} />'}
                                                </pre>
                                            </Pum.TabContent>
                                            <Pum.TabContent>
                                                <pre className="prettyprint linenums">
                                                    {'// js\n' +
                                                        '안형로'}
                                                </pre>
                                            </Pum.TabContent>
                                        </Pum.TabContents>
                                    </Pum.TabSet>
                                </Pum.HiddenContent>
                            </div>
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

module.exports = Select;