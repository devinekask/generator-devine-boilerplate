'use strict';

let path = require('path');
let fs = require('fs');
let _ = require('lodash');

fs.readdirSync(__dirname).forEach(function(file){

  if (file === 'index.js' || !file.endsWith('.js')) return;

  let mod = {};
  mod[path.basename(file, '.js')] = require(path.join(__dirname, file));

  _.extend(module.exports, mod);

});
