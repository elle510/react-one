'use strict';

var React = require('react');

var JqGrid = React.createClass({
    displayName: 'JqGrid-View',
    options: {
        url: './json/grid.json',
        mtype: 'GET',
        datatype: "json",
        jsonReader: {
            page: 'page',
            total: 'total',
            root: 'rows',
            records: 'records',
            repeatitems: false,
            //id: 'id',
            cell: 'cell'
        },
        //data: mydata,
        //datatype: "local",
        rowNum: 10,
        rowList: [10,20,30],
//			autowidth: false,
//			width: 800,
//			height: 200,
        colNames:['Inv No','Date', 'Client', 'Amount','Tax','Total','Notes'],
        colModel:[
            {name:'id',index:'id', width:60, sorttype:"int"},
            {name:'invdate',index:'invdate', width:90, sorttype:"date", formatter:"date"},
            {name:'name',index:'name', width:100},
            {name:'amount',index:'amount', width:80, align:"right",sorttype:"float", formatter:"number"},
            {name:'tax',index:'tax', width:80, align:"right",sorttype:"float"},
            {name:'total',index:'total', width:80,align:"right",sorttype:"float"},
            {name:'note',index:'note', width:150, sortable:false}
        ],
        //autowidth: false,
        //shrinkToFit: true
        onSelectRow: function(rowid, row, event) {    //row 선택시 처리. ids는 선택한 row
            //alert('row 선택시 rowid: ' + rowid);
            /*console.log(row);
             console.log(event);*/
        }
    },
    componentDidMount: function() {
        // 최초 렌더링이 일어난 다음(한번 호출)
        prettyPrint();
    },
    render: function() {
        return (
            <div className="page-content">
                <div className="page-header">
                    <span className="title">jqGrid</span>
                </div>

                <div className="page-body">
                    <div className="row">
                        jqGrid 데모: <a href="http://www.trirand.com/blog/jqgrid/jqgrid.html" target="blank">http://www.trirand.com/blog/jqgrid/jqgrid.html</a>
                    </div>
                    <div className="vspace-12" />
                    <div className="row">
                        <div className="row">
                            <h5>Default Grid</h5>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                Grid Title
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <Pum.JqGrid options={this.options} />
                            </div>
                        </div>
                        <div className="row">
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
                    <div className="vspace-12" />
                </div>

                <div className="page-footer">

                </div>

            </div>
        );
    }
});

module.exports = JqGrid;