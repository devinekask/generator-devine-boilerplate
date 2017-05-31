import React from 'react';<% if(mobx) { %>
import {string} from 'prop-types';

import {inject, observer} from 'mobx-react';
import DevTools from 'mobx-react-devtools';<% } %><% if(reactRouter) { %>

import {Route} from 'react-router-dom';
import Home from './Home';<% } %>

const App = (<% if (mobx) { %>{name}<% } %>) => (

  <section><% if (mobx) { %>

    {process.env.NODE_ENV !== `production` ? <DevTools/> : null}<% } %>

    <header>
      <h1>Hello, <% if (mobx) { %>{name}<% } else { %><%= name %><% } %></h1>
    </header><% if(reactRouter) { %>

    <section>
      <Route
        exact path='/'
        component={Home}
      />
    </section><% } %>

  </section>

);<% if (mobx) { %>

App.propTypes = {
  name: string.isRequired
};<% } %>

export default <% if (mobx) { %>inject(
  ({store}) => ({
    name: store.name
  })
)(
  observer(<% } %>App<% if (mobx) { %>)
)<% } %>;
