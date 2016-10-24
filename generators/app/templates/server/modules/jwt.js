let isValidName = require(`../lib/isValidName`);

module.exports.register = (server, options, next) => {

  next();

};

module.exports.register.attributes = {
  name: `jwt`,
  version: `0.1.0`
};
