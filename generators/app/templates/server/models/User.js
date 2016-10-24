const Schema = require(`mongoose`).Schema;

const Roles = require(`../const/Roles`);

const schema = new Schema({

  username: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true,
    bcrypt: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  isActive: {
    type: Boolean,
    default: true
  },

  created: {
    type: Date,
    default: Date.now
  },

  role: {
    type: String,
    default: Roles.USER
  }

});

schema.plugin(require(`mongoose-bcrypt`));

module.exports = schema;
