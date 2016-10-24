const {User} = require(`mongoose`).models;
const {omit} = require(`lodash`);

const jwt = require(`jsonwebtoken`);

const {URL: issuer, SECRET} = process.env;

module.exports = [

  {
    method: `POST`,
    path: `/api/auth`,
    handler: (req, res) => {

      const {login, password, audience} = req.payload;

      User.findOne({

        $and: [
          {
            $or: [
              {username: login},
              {email: login}
            ]
          },

          {isActive: true}
        ]

      }).then(u => {

        if(!u){
          return res({
            error: `user/password combination incorrect`
          }).code(400);
        }

        u.verifyPassword(password, (err, isValid) => {

          if(!isValid){
            return res({
              error: `user/password combination incorrect`
            }).code(400);
          }

          const user = omit(u.toJSON(), [`__v`, `password`]);
          const {__id: subject} = user;

          const options = {
            expiresIn: `7d`,
            subject,
            issuer
          };

          if(audience){
            options.audience = audience;
          }

          const token = jwt.sign(
            user,
            SECRET,
            options
          );

          return res({token}).code(200);

        });

      });

    }
  }

];
