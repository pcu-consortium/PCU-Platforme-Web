import React from 'react/addons';
import ReactDOM from 'react-dom';
// import Router, { Link } from 'react-router';

// Replace classSet !
if (window) {
  window.React = React;
  window.ReactDOM = ReactDOM;
  // window.Link = Link; // Make global for now, for components...
} 

React.addons.classSet = require('classnames');
React.initializeTouchEvents = function(){};