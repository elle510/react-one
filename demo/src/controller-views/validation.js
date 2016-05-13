'use strict';

var React = require('react');

var Validation = React.createClass({
    componentDidMount: function() {
        // 최초 렌더링이 일어난 다음(한번 호출)
        $("#validationForm").validate({
            rules: {
                text: "required",
                email: {
                    required: true,
                    email: true
                }
                /*lastname: "required",
                username: {
                    required: true,
                    minlength: 2
                },
                password: {
                    required: true,
                    minlength: 5
                },
                confirm_password: {
                    required: true,
                    minlength: 5,
                    equalTo: "#password"
                },
                topic: {
                    required: "#newsletter:checked",
                    minlength: 2
                },
                agree: "required"*/
            },
            messages: {
                text: "Please enter your text",
                email: "Please enter a valid email address",
                lastname: "Please enter your lastname",
                username: {
                    required: "Please enter a username",
                    minlength: "Your username must consist of at least 2 characters"
                },
                password: {
                    required: "Please provide a password",
                    minlength: "Your password must be at least 5 characters long"
                },
                confirm_password: {
                    required: "Please provide a password",
                    minlength: "Your password must be at least 5 characters long",
                    equalTo: "Please enter the same password as above"
                },
                agree: "Please accept our policy"
            },
            submitHandler: function(form) {
                console.log('submitHandler');
                /*
                $(form).ajaxSubmit();
                // !!! Important !!!
                // always return false to prevent standard browser submit and page navigation
                return false;
                */
            }
        });
    },
    render: function() {
        return (
            <div className="page-content">
                <div className="page-header">
                    <span className="title">Validation</span>
                </div>

                <div className="page-body">
                    <div className="row">{/* start default */}
                        <div className="row">
                            <div className="col-md-12">
                                <span className="component-title">validation 체크</span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <form id="validationForm" className="form-horizontal">
                                    <div className="form-group">
                                        <label className="col-md-2 control-label">Text</label>
                                        <div className="col-md-10">
                                            <input type="text" className="form-control" name="text" placeholder="input text" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-md-2 control-label">Email</label>
                                        <div className="col-md-10">
                                            <input type="email" className="form-control" name="email" placeholder="Email" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-md-2 control-label">Password</label>
                                        <div className="col-md-10">
                                            <input type="password" className="form-control" id="inputPassword3" placeholder="Password" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-md-offset-2 col-md-10">
                                            <button type="submit" className="btn btn-default">submit</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <Puf.HiddenContent expandLabel="소스 보기" collapseLabel="소스 닫기"
                                                expandIcon="fa fa-caret-right" collapseIcon="fa fa-caret-down">
                                    <Puf.TabSet>
                                        <Puf.Tabs>
                                            <Puf.Tab>JSX 코드</Puf.Tab>
                                        </Puf.Tabs>
                                        <Puf.TabContents>
                                            <Puf.TabContent>
                                                <pre className="prettyprint linenums">
                                                    {'// js\n' +
                                                    '안형로'}
                                                </pre>
                                            </Puf.TabContent>
                                        </Puf.TabContents>
                                    </Puf.TabSet>
                                </Puf.HiddenContent>
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

module.exports = Validation;