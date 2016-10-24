const fs = require(`fs`);

const pluginHandler = require(`../lib/pluginHandler`);
const isValidName = require(`../lib/isValidName`);

module.exports.register = (server, options, next) => {

  fs.readdirSync(__dirname).forEach(f => {

    if(!isValidName(f)) return;
    server.register(require(`./${f}`), pluginHandler);

  });

  next();

};

module.exports.register.attributes = {
  name: `modules`,
  version: `0.1.0`
};
