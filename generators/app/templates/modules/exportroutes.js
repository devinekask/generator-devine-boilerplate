'use strict';

let path = require('path');
let fs = require('fs');

module.exports = function(folder, cb){

  fs.readdirSync(folder).forEach(file => {

    if (file === 'index.js' || !file.endsWith('.js') || file.startsWith('_')) return;

    let mod = {};
    mod[path.basename(file, '.js')] = require(path.join(folder, file));

    return cb(undefined, mod);

  });

};
