'use strict';

var React = require('react');
var ReactDom = require('react-dom');

// components
var JqGrid = require('./components/JqGrid');
var JsTree = require('./components/JsTree');
var Test = require('./components/Test');

var ReactPum = {
    JqGrid: JqGrid,
    JsTree: JsTree,
    Test: Test
};

module.exports = ReactPum;
