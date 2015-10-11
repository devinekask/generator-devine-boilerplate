'use strict';

import React from 'react';

import {Router, Route} from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';

import {Home} from '../pages/';

const router =
  <Router history={createBrowserHistory()}>
    <Route path="/" component={Home} />
  </Router>;

export default router;
