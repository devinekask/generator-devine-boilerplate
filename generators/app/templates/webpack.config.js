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
        //jsx for React
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel'
      },

      {
        //jsx for React
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'eslint'
      },

      {
        //handlebars
        test: /\.(hbs|handlebars)$/,
        exclude: /node_modules/,
        loader: 'handlebars-loader?helperDirs[]=' + __dirname + '/helpers'
      },

      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css!postcss!sass?outputStyle=expanded')
      }

    ]

  },

  postcss: function(){

    //array with postcss plugins, keep in this order
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
    ),

    //react smaller build
    new webpack.DefinePlugin({
      'process.env': {NODE_ENV: '\'production\''}
    })

  ],

  resolve: {
    extensions: ['', '.json', '.js', '.css', '.jsx', '.hbs', '.handlebars']
  }

};
