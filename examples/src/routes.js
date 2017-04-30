'use strict';

import React from 'react';

import { Router, Route, browserHistory, hashHistory, IndexRoute } from 'react-router';

import App from './app';

import Home from './views/Home';

// Components
import * as Components from './views/components';

export default (
    <Router history={hashHistory}>
        <Route path='/' component={App}>
            <IndexRoute component={Home} />
            
            <Route path='button' component={Components.ButtonDemo} />
            <Route path='tree' component={Components.TreeDemo} />
            <Route path='select' component={Components.SelectDemo} />
            {/*
            <Route path="toggleButton" component={Components.ToggleButton} />
            <Route path="checkbox" component={Components.Checkbox} />
            <Route path="radio" component={Components.Radio} />
            <Route path="alert" component={Components.Alert} />
            <Route path="modal" component={Components.Modal} />
            <Route path="panel" component={Components.Panel} />
            <Route path="fieldset" component={Components.Fieldset} />
            <Route path="fineUploder" component={Components.FineUploder} />  
            */}
        </Route>
    </Router>
)
