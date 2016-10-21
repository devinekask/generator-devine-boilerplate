const path = require(`path`);
const pluginHandler = require(`./lib/pluginHandler`);

require(`dotenv`).load();

const Server = require(`hapi`).Server;

const port = process.env.PORT || 3000;

const server = new Server({
  connections: {
    routes: {
      files: {
        relativeTo: path.join(__dirname, `public`)
      }
    }
  }
});

server.connection({port});

server.register(require(`inert`), pluginHandler);

server.register(require(`./routes/`), pluginHandler);
server.register(require(`./plugins/`), pluginHandler);

server.start(err => {
  if(err) console.error(err);
  console.log(`Server running at: http://localhost:${port}`);
});
