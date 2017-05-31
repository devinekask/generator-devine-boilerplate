<% if(react) { %>/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import {render} from 'react-dom';

import App from './containers/App';<% if(reactRouter) { %>

import {BrowserRouter as Router, Route} from 'react-router-dom';<% } %><% if(mobx) { %>

import {Provider} from 'mobx-react';

import stores from './stores';<% } %><% } %>

const init = () => {

  <% if (react) { %>render(<% if(mobx) { %>
    <Provider {...stores}><% } %><% if(reactRouter) { %>
      <Router><% } %>
        <% if(reactRouter) { %><Route component={<% } else { %><<% } %>App<% if(reactRouter) { %>}<% } %> /><% if(reactRouter) { %>
      </Router><% } %><% if(mobx) { %>
    </Provider><% } %>,
    document.querySelector(`.react-mount`)
  );<% } else { %>console.log(`Hello, <%= name %>`)<% } %>

};

init();
