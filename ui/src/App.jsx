// let PRODUCTS = [];
import 'babel-polyfill';
import 'whatwg-fetch';
import React from '../node_modules/react';
import ReactDOM from '../node_modules/react-dom';
import Page from './Page.jsx';
import { HashRouter as Router } from 'react-router-dom';


ReactDOM.render(<Router><Page /></Router>, document.getElementById('root'));
if (module.hot) {
  module.hot.accept();
}