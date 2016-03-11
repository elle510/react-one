'use strict';

var React = require('react');

var HiddenContent = React.createClass({
    render: function() {
        return (
            <div className="page-content">
                <div className="page-header">
                    <h1>HiddenContent</h1>
                </div>

                <div className="page-body">
                    <div className="row">{/* start default */}
                        <div className="row">
                            <h5>Hidden Content(내용 접기/펼치기)</h5>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <Pum.HiddenContent expandLabel="펼치기" collapseLabel="접기"
                                                expandIcon="fa fa-caret-right" collapseIcon="fa fa-caret-down"
                                                isBottom={true}>
                                    <div>
                                        내용<br/>
                                        내용<br/>
                                        내용<br/>
                                        내용<br/>
                                        내용<br/>
                                        내용<br/>
                                        내용<br/>
                                        내용<br/>
                                        내용<br/>
                                        내용<br/>
                                    </div>
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

module.exports = HiddenContent;