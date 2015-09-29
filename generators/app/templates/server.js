'use strict';

require('dotenv').load({silent: true});

let Hapi = require('hapi');
let path = require('path');

let port = process.env.PORT || 3000;

let server = new Hapi.Server({
  connections: {
    routes: {
      files: {
        relativeTo: path.join(__dirname, 'public')
      }
    }
  }
});

server.connection({port: port});

const pluginHandler = (err) => {
  if(err) console.error(err);
};

server.register(require('inert'), pluginHandler);
server.register(require('vision'), pluginHandler);

server.register(require('./routes/'), pluginHandler);

server.views({
  engines: {
    hbs: require('handlebars')
  },
  path: __dirname + '/templates',
  helpersPath: __dirname + '/helpers'
});

server.start(err => {
  if(err) console.error(err);
  console.log('Server running at:', server.info.uri);
});
