const fs = require(`fs`);
const path = require(`path`);

const isValidName = require(`../lib/isValidName`);

module.exports.register = (server, options, next) => {

  fs.readdirSync(__dirname).forEach(file => {

    if(!isValidName(file)) return;

    const mod = {};
    mod[path.basename(file, `.js`)] = require(path.join(__dirname, file));

    for(const route in mod) {
      server.route(mod[route]);
    }

  });

  next();

};

module.exports.register.attributes = {
  name: `routes`,
  version: `0.1.0`
};
