'use strict';

var React = require('react');
var PropTypes = require('react').PropTypes;

var ReportTempForm = React.createClass({
    propTypes: {
        onHide: PropTypes.func
    },
    onCancel: function() {
        if(typeof this.props.onHide === 'function') {
            this.props.onHide();
            //event.stopImmediatePropagation();
        }
    },
    render: function() {
        return (
            <form className="form-horizontal">
                <div className="form-group">
                    <label className="col-md-3 control-label">타입</label>
                    <div className="col-md-9">
                        <input type="text" className="form-control" name="type" />
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-md-3 control-label">템플릿 이름</label>
                    <div className="col-md-9">
                        <input type="text" className="form-control" name="templateName" />
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-md-3 control-label">설명</label>
                    <div className="col-md-9">
                        <textarea className="form-control" rows="5" name="desc" placeholder="설명을 입력하세요."></textarea>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-md-3 control-label">ODI 명</label>
                    <div className="col-md-9">
                        <input type="file" id="odi" name="upload" multiple />
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-md-3 control-label">OZR 명</label>
                    <div className="col-md-9">
                        <input type="file" id="ozr" name="upload" multiple />
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-md-offset-3 col-md-9">
                        <button type="submit" className="btn btn-default">저장</button>
                        <button type="button" className="btn btn-default" onClick={this.onCancel}>취소</button>
                    </div>
                </div>
            </form>
        );
    }
});

module.exports = ReportTempForm;