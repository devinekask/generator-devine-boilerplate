'use strict';

// some features need the be polyfilled..
// https://babeljs.io/docs/usage/polyfill/

// import 'babel-core/polyfill';
// or import specific polyfills
// import {$} from './helpers/util';<% if(hbs_client){ %>
import helloworldTpl from '../_hbs/helloworld';<% } %><% if(react) { %>
import ReactDOM from 'react-dom';<% if(react_router) { %>
import router from './router/';<% } else { %>
import React from 'react';
import {HelloWorld} from './components/';<% } %><% } %>

const init = () => {<% if(hbs_client){ %>
  console.log(helloworldTpl({name: '<%= author %>'}));<% } else if(react && !react_router){ %>
  ReactDOM.render(<HelloWorld author='<%= author %>'/>, document.querySelector('section'));<% } else if(react && react_router){ %>
  ReactDOM.render(router, document.querySelector('main'));<% } else { %>
  console.log('Hello World <%= author %>');<% } %>
};

init();
