/* eslint-disable react/jsx-filename-extension */

<% if(react) { %>import React from 'react';
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
