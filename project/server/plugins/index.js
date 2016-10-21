const fs = require(`fs`);

const pluginHandler = require(`../lib/pluginHandler`);
const isValidName = require(`../lib/isValidName`);

module.exports.register = (server, options, next) => {

  fs.readdirSync(__dirname).forEach(file => {
    if(!isValidName(file)) return;
    server.register(require(`./${  file}`), pluginHandler);
  });

  next();

};

module.exports.register.attributes = {
  name: `modules`,
  version: `0.1.0`
};
