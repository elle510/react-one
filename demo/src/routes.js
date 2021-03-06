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
var DateRangePicker1 = require('./controller-views/dateRangePicker1');
var Stepper = require('./controller-views/stepper');
var Alert = require('./controller-views/alert');
var Modal = require('./controller-views/modal');
var Panel = require('./controller-views/panel');
var Fieldset = require('./controller-views/fieldset');
var Splitter = require('./controller-views/splitter');
var Autocomplete = require('./controller-views/autocomplete');
var Validation = require('./controller-views/validation');

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
        <Route path="/daterangepicker" component={DateRangePicker1} />
        <Route path="/stepper" component={Stepper} />
        <Route path="/alert" component={Alert} />
        <Route path="/modal" component={Modal} />
        <Route path="/panel" component={Panel} />
        <Route path="/fieldset" component={Fieldset} />
        <Route path="/splitter" component={Splitter} />
        <Route path="/autocomplete" component={Autocomplete} />
		<Route path="/validation" component={Validation} />
    </Router>
)
