'use strict';

// some features need the be polyfilled..
// https://babeljs.io/docs/usage/polyfill/

// import 'babel-core/polyfill';
// or import specific polyfills<% if(hbs_client){ %>

import helloworldTpl from '../_hbs/helloworld';<% } %>
// import {$} from './helpers/util';

const init = () => {<% if(hbs_client){ %>
  console.log(helloworldTpl({name: '<%= author %>'}));<% } else { %>
  console.log('Hello World <%= author %>');<% } %>
};

init();
