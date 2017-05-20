const Scopes = require(`../const/Scopes`);
const Joi = require(`joi`);

const schema = {

  username: {
    type: String,
    required: true,
    unique: true,
    validation: Joi.string().alphanum().min(3),
    login: true
  },

  password: {
    type: String,
    required: true,
    validation: Joi.string().min(3),
    projection: false
  },

  email: {
    type: String,
    required: true,
    unique: true,
    validation: Joi.string().email(),
    login: true
  },

  scope: {
    type: String,
    default: Scopes.USER,
    validation: Joi.string().min(3)
  }

};

module.exports = {
  schema,
  auth: true
};
