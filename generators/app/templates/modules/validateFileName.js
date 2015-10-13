'use strict';

module.exports = file =>
  file !== 'index.js'
  && file.endsWith('.js')
  && !file.startsWith('_');
