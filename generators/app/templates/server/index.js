const path = require(`path`);
const log = true;

require(`dotenv`).load({silent: true});

const {PORT = 3000, URL = `http://localhost`<% if(mongo) { %>, MONGO_URL<% } %><% if(jwt) { %>, SECRET<% } %>} = process.env;

const Server = require(`hapi`).Server;

const server = new Server({
  connections: {
    routes: {
      files: {
        relativeTo: path.join(__dirname, `public`)
      }
    }
  }
});

server.connection({port: PORT});

server.start(err => {

  if (err) return console.error(err);

  console.log(``);
  console.log(`Server running at: ${URL}:${PORT}`);

  server.register({

    register: require(`hapi-devine-autoload`),

    options: {

      path: path.join(__dirname, `plugins`),
      log,

      plugins: [<% if(mongo) { %>
        require(`hapi-devine-mongodb`),<% } %>
        require(`hapi-devine-routes`),<% if(jwt) { %>
        require(`hapi-devine-auth`),<% } %>
        require(`inert`)
      ],

      pluginOptions: {<% if(mongo) { %>

        'hapi-devine-mongodb': {
          connectionString: MONGO_URL,
          log,
          path: path.join(__dirname, `schemas`)
        },<% } %>

        'hapi-devine-routes': {
          log,
          path: path.join(__dirname, `routes`)
        },<% if(jwt) { %>

        'hapi-devine-auth': {
          issuer: URL,
          secret: SECRET
        }<% } %>

      }

    }

  }, error => {
    if (error) return console.error(error);
  });

});
