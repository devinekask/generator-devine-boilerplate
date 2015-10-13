'use strict';

const excludeItem = (arr, flag) =>
  arr.filter(r => r.method.toLowerCase() !== flag.toLowerCase());

const createApi = data => {

  let Model = data.Model;
  let collectionName = Model.collection.collectionName;
  let exclude = data.exclude || [];
  let sort = data.sort || '_id';

  let routes = [

    {
      method: 'POST',
      path: `/api/${collectionName}`,
      handler: (request, reply) => {
        let fb = new Model(request.payload);
        fb.save(err => {
          if(err) throw err;
          reply(fb);
        });
      }
    },

    {
      method: 'GET',
      path: `/api/${collectionName}/{id}`,
      handler: (request, reply) => {
        Model.findOne({_id: request.params.id}, '-__v').exec()
          .then(d => reply(d));
      }
    },

    {
      method: 'GET',
      path: `/api/${collectionName}`,
      handler: (request, reply) => {

        let _sort = request.query.sort || sort;
        let _filter = request.query || {};
        delete _filter.sort;

        Model.find(_filter, '-__v').sort(_sort).exec()
          .then(d => reply({[collectionName]: d}));

      }
    },

    {
      method: 'DELETE',
      path: `/api/${collectionName}/{id}`,
      handler: (request, reply) => {
        Model.findOne({_id: request.params.id}).remove().exec()
          .then(() => reply({id: request.params.id}));
      }
    }

  ];

  if(Array.isArray(exclude)){
    exclude.forEach(flag => {
      routes = excludeItem(routes, flag);
    });
  }else{
    routes = excludeItem(routes, exclude);
  }

  return routes;

};

module.exports.register = (server, options, next) => {

  let path = require('path');
  let fs = require('fs');

  let validateFileName = require('../modules/validateFileName');

  let mongoose = require('mongoose');
  let Schema = mongoose.Schema;

  mongoose.connect(process.env.MONGO_URL);

  fs.readdirSync('./models/mongoose').forEach(file => {

    if(!validateFileName(file)) return;

    let name = path.basename(file, path.extname(file));
    let data = require(`../models/mongoose/${file}`);

    let schema;

    if(data.collection){
      schema = new Schema(data.schema, {collection: data.collection});
    }else{
      schema = new Schema(data.schema);
    }

    data.Model = mongoose.model(name, schema);

    if(data.api){
      createApi(data).forEach(route => server.route(route));
    }

  });

  next();

};

module.exports.register.attributes = {
  name: 'mongoose',
  version: '0.1.0'
};
