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
    render: function() {
        return (
            <div className="page-content">
                <div className="page-header">
                    <h1>jqGrid</h1>
                </div>

                <div className="page-body">
                    <div className="row">
                        jqGrid 데모: <a href="http://www.trirand.com/blog/jqgrid/jqgrid.html" target="blank">http://www.trirand.com/blog/jqgrid/jqgrid.html</a>
                    </div>
                    <div className="vspace-12" />
                    <div className="row">
                        <div className="row">
                            Default Grid
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                Grid Title
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <ReactPum.JqGrid options={this.options} />
                            </div>
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