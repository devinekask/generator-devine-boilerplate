const Boom = require(`boom`);

module.exports = [

  {

    method: `GET`,
    path: `/api/{param*}`,

    handler: (req, res) => res(Boom.notFound())

  }

];
