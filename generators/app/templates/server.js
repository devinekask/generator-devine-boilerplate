'use strict';

let Hapi = require('hapi');
let path = require('path');

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
  port: 3000
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
