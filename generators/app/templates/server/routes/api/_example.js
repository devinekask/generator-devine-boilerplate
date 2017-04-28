const Scopes = require(`../../const/Scopes`);

const {API_BASE} = process.env;
const route = `${API_BASE}/test`;

module.exports = [

  {

    method: `GET`,
    path: `${route}`,

    config: {

      auth: {
        strategy: `token`,
        scope: [Scopes.USER]
      }

    },

    handler: (req, res) => {
      return res(`ok`);
    }

  }

];
