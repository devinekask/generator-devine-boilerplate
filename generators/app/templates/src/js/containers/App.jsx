import React from 'react';<% if(reactRouter) { %>
import {Route, BrowserRouter as Router} from 'react-router-dom';

import Home from '../pages/Home';<% } %>

const App = () => {
  return (
    <% if(!reactRouter) { %><header>
      <h1>Hello, <%= name %></h1>
    </header><% } else { %><Router>
      <main>
        <Route
          exact path='/'
          component={Home}
        />
      </main>
    </Router><% } %>
  );
};

export default App;
