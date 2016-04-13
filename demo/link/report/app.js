'use strict';

var React = require('react');
var ReactDom = require('react-dom');

import { Router, Route, browserHistory, hashHistory } from 'react-router';

var ReportTempList = require('./views/tempList');
var ReportTempForm = require('./views/tempForm');
var ReportList = require('./views/reportList');
var ReportForm = require('./views/reportForm');

ReactDom.render((
	<Router history={hashHistory}>
		<Route path="/" component={ReportTempList} />
		<Route path="/template-form" component={ReportTempForm} />
		<Route path="/report-list" component={ReportList} />
		<Route path="/report-form" component={ReportForm} />
	</Router>
), document.getElementById('app'));

/*
ReactDom.render((
	<Router history={browserHistory}>
		<Route path="/" component={ReportTempList} />
		<Route path="/template/view" component={ReportTempView} />
	</Router>
), document.getElementById('app'));
*/
/*
ReactDom.render((
	<Router history={browserHistory}>
		<Route path="/" component={ReportTempList}>
			<Route path="user/:userID" component={User}>
				<Route path="tasks/:taskID" component={Task} />
				<Redirect from="todos/:taskID" to="tasks/:taskID" />
			</Route>
		</Route>
	</Router>
), document.getElementById('app'));
*/