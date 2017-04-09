<% if(react) { %>/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import {render} from 'react-dom';
import App from './containers/App';<% if(mobx) { %>

import store from './store/';<% } %>

<% } %>const init = () => {

  <% if (react) { %>render(
    <App <% if (mobx) { %>store={store}<% } %> />,
    document.querySelector(`.react-mount`)
  );<% } else { %>console.log(`Hello, <%= name %>`)<% } %>

};

init();
