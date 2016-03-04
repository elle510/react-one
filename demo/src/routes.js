var React = require('react');

import { Router, Route, hashHistory } from 'react-router';

var Main = require('./controllers/main');
var About = require('./controllers/about');
var Repos = require('./controllers/repos');

module.exports = (
    <Router history={hashHistory}>
        <Route path="/" component={Main}/>
        {/* add the routes here */}
        <Route path="/repos" component={Repos}/>
        <Route path="/about" component={About}/>
    </Router>
)
