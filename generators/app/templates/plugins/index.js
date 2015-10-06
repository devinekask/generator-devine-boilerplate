'use strict';

let fs = require('fs');

const pluginHandler = (err) => {
  if(err) console.error(err);
};

module.exports.register = (server, options, next) => {

  fs.readdirSync(__dirname).forEach(file => {
    if (file === 'index.js' || !file.endsWith('.js') || file.startsWith('_')) return;
    server.register(require(`./${file}`), pluginHandler);
  });

  next();

};

module.exports.register.attributes = {
  name: 'modules',
  version: '0.1.0'
};
