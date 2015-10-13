'use strict';

let fs = require('fs');
let path = require('path');

let validateFileName = require('../modules/validateFileName');

module.exports.register = (server, options, next) => {

  fs.readdirSync(__dirname).forEach(file => {

    if(!validateFileName(file)) return;

    let mod = {};
    mod[path.basename(file, '.js')] = require(path.join(__dirname, file));

    for(let route in mod) {
      server.route(mod[route]);
    }

  });

  next();

};

module.exports.register.attributes = {
  name: 'routes',
  version: '0.1.0'
};
