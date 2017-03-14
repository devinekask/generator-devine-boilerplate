import React from 'react';<% if(reactRouter) { %>
import {Route, BrowserRouter as Router} from 'react-router-dom';

import Home from './Home';<% } %>

const App = () => {
  return (
    <section>

      <header>
        <h1>Hello, <%= name %></h1>
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
};

export default App;
