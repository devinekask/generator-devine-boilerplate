'use strict';

require('dotenv').load();

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

server.connection({
  port: port
});

server.register(require('inert'), function(err){
  if(err){
    console.error(err);
  }
});

let routes = require('./routes/');

for(let route in routes) {
  server.route(routes[route]);
}

server.start(function(err){

  if(err){
    console.error(err);
  }

  console.log('Server running at:', server.info.uri);

});
