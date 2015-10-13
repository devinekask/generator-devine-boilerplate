'use strict';

module.exports = {

  api: true,
  sort: 'lastname',
  exclude: ['DELETE', 'POST'],

  schema: {
    firstname: String,
    lastname: String,
    active: {
      type: Boolean,
      default: true
    },
    created: {
      type: Date,
      default: Date.now
    }
  }

};
