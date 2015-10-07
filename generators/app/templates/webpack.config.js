'use strict';

var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = require('./_config'); //paths config..

module.exports = {

  entry: [
    config.build('js', 'src'), //JavaScript entry point
    config.build('css', 'src') //CSS entry point
  ],

  output: {
    path: config.js.dest.path,
    filename: config.js.dest.file //JavaScript end point
  },

  //quickest, webpack -d -p for production
  devtool: 'eval',

  module: {

    //test: which filetype?,
    //exclude: which folders to exclude

    loaders: [

      {
        test: /\.<% if (react) { %>(<% } %>js<% if (react) { %>|jsx)<% } %>$/,
        exclude: /node_modules/,
        loader: 'babel'
      },

      {
        test: /\.<% if (react) { %>(<% } %>js<% if (react) { %>|jsx)<% } %>$/,
        exclude: /node_modules/,
        loader: 'eslint'
      },<% if (hbs_client) { %>


      {
        test: /\.(hbs|handlebars)$/,
        exclude: /node_modules/,
        loader: 'handlebars',
        query: {
          helperDirs: [
            `${__dirname}/_helpers`<% if (hbs_server) { %>,
            `${__dirname}/templates/helpers`<% } %>
          ]
        }
      },<% } %>

      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css!postcss!sass?outputStyle=expanded')
      }

    ]

  },

  postcss: function(){

    return [

      require('autoprefixer-core')({
        browsers: ['IE >= 9', 'last 2 version'],
        cascade: false
      })

    ];

  },

  //webpack plugins
  plugins: [

    new webpack.optimize.DedupePlugin(),

    //extract CSS into seperate file
    new ExtractTextPlugin(
      config.build('css', 'dest')
    )<% if (react) { %>,

    //react smaller build
    new webpack.DefinePlugin({
      'process.env': {NODE_ENV: '\'production\''}
    })<% } %>

  ],

  resolve: {
    extensions: ['', '.json', '.js', '.css'<% if (react) { %>, '.jsx'<% } %><% if (hbs_client) { %>, '.hbs', '.handlebars'<% } %>]
  }<% if (react) { %>,

  externals: {
    "react": "react"
  }<% } %>

};
