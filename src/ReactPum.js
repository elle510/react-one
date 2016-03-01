'use strict';

var React = require('react');
var ReactDom = require('react-dom');

// components
var JqGrid = require('./components/JqGrid');
var Test = require('./components/Test');

var ReactPum = {
    JqGrid: JqGrid,
    Test: Test
};

module.exports = ReactPum;
