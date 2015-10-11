'use strict';

module.exports = [

  {
    method: 'GET',
    path: '/{param*}',
    handler: {<% if (!react || (react && hbs_server)) { %>
      directory: {
        path: '.',
        redirectToSlash: true,
        index: true
      }<% } else if (react && !hbs_server) { %>
      file: 'index.html'<% } %>
    }
  }<% if (react && !hbs_server) { %>,

  {
    method: 'GET',
    path: '/css/{param*}',
    handler: {
      directory: {
        path: './css'
      }
    }
  },

  {
    method: 'GET',
    path: '/js/{param*}',
    handler: {
      directory: {
        path: './js'
      }
    }
  },

  {
    method: 'GET',
    path: '/assets/{param*}',
    handler: {
      directory: {
        path: './assets'
      }
    }
  }<% } %>

];
