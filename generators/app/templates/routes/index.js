'use strict';

let _ = require('lodash');

require('../modules/exportroutes')(__dirname, (err, mod) => {
  if(err) throw err;
  _.extend(module.exports, mod);
});
