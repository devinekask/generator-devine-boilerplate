'use strict';

module.exports.register = (server, options, next) => {

  console.log('Hello Plugin');
  next();

};

module.exports.register.attributes = {
  name: 'helloplugin',
  version: '0.1.0'
};
