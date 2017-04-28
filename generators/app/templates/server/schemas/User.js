const Scopes = require(`../const/Scopes`);
const Joi = require(`joi`);

const schema = {

  username: {
    type: String,
    required: true,
    unique: true,
    validation: Joi.string().alphanum().min(3),
  },

  password: {
    type: String,
    required: true,
    validation: Joi.string().min(3),
    project: false
  },

  email: {
    type: String,
    required: true,
    unique: true,
    validation: Joi.string().email()
  },

  scope: {
    type: String,
    default: Scopes.USER,
    validation: Joi.string().min(3)
  }

};

module.exports = {
  schema,
  plugins: [
    require(`mongoose-bcrypt`)
  ]
};
