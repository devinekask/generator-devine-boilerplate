<% if(jwt) { %>const {User} = require(`mongoose`).models;
const {omit} = require(`lodash`);

<% } %>module.exports = [

  {
    method: `GET`,
    path: `/api/project`,
    handler: (req, res) => {
      return res({
        name: `<%= name %>`
      }).code(200);
    }
  }<% if(jwt) { %>,

  {
    method: `POST`,
    path: `/api/users`,
    handler: (req, res) => {

      const user = new User(req.payload);

      user.save()
        .then(u => {
          const user = omit(u.toJSON(), [`__v`, `password`]);
          return res(user).code(200);
        })
        .catch(err => {
          return res({
            error: `error while saving user`
          }).code(400);
        });

    }
  }<% } %>

];
