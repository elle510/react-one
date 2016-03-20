'use strict';

var React = require('react');

import { Router, Route, browserHistory, hashHistory } from 'react-router';

var Home = require('./controller-views/home');
var FontAwesome = require('./controller-views/icons/fontAwesome');
var PsIconFont = require('./controller-views/icons/psIconFont');
var JqGrid = require('./controller-views/jqgrid');
var Tabs = require('./controller-views/tabs');
var HiddenContent = require('./controller-views/hiddenContent');
var Select = require('./controller-views/select');
var CheckBox = require('./controller-views/checkbox');
var Radio = require('./controller-views/radio');
var DatePicker = require('./controller-views/datePicker');
var DateRangePicker = require('./controller-views/dateRangePicker');
var Stepper = require('./controller-views/Stepper');

//var About = require('./controllers/about');
//var Repos = require('./controllers/repos');
//
//module.exports = (
//    <Router history={hashHistory}>
//        <Route path="/" component={Home}/>
//        {/* add the routes here */}
//        <Route path="/repos" component={Repos}/>
//        <Route path="/about" component={About}/>
//    </Router>
//)

module.exports = (
    <Router history={hashHistory}>
        <Route path="/" component={Home} />
        {/* add the routes here */}
        <Route path="/font-awesome" component={FontAwesome} />
        <Route path="/ps-icon-font" component={PsIconFont} />
        <Route path="/jqgrid" component={JqGrid} />
        <Route path="/tabs" component={Tabs} />
        <Route path="/hiddenContent" component={HiddenContent} />
        <Route path="/select" component={Select} />
        <Route path="/checkbox" component={CheckBox} />
        <Route path="/radio" component={Radio} />
        <Route path="/datepicker" component={DatePicker} />
        <Route path="/daterangepicker" component={DateRangePicker} />
        <Route path="/stepper" component={Stepper} />
    </Router>
)
