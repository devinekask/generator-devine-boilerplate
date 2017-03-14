import React from 'react';<% if(mobx) { %>

import {PropTypes as MPropTypes, observer} from 'mobx-react';
import DevTools from 'mobx-react-devtools';<% } %><% if(reactRouter) { %>
import {Route, BrowserRouter as Router} from 'react-router-dom';

import Home from './Home';<% } %>

const App = (<% if (mobx) { %>{store}<% } %>) => {<% if (mobx) { %>

  const {name} = store<% } %>

  return (
    <section><% if (mobx) { %>

      {process.env.NODE_ENV !== `production` ? <DevTools/> : null}<% } %>

      <header>
        <h1>Hello, <% if (mobx) { %>{name}<% } else { %><%= name %><% } %></h1>
      </header><% if(reactRouter) { %>

      <Router>
        <section>
          <Route
            exact path='/'
            component={Home}
          />
        </section>
      </Router><% } %>

    </section>
  );

};<% if (mobx) { %>

App.propTypes = {
  store: MPropTypes.observableObject.isRequired
};<% } %>

export default <% if (mobx) { %>observer(<% } %>App<% if (mobx) { %>)<% } %>;
