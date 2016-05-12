'use strict';

let webpack = require('webpack');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let path = require('path');

let config = require('./_config'); //paths config..

let NODE_ENV = '\'development\'';

process.argv.forEach(arg => {
  if(arg === '-p' || arg === '-d'){
    NODE_ENV = '\'production\'';
  }
});

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
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          babelrc: path.join(__dirname, '.babelrc')
        }
      },

      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'eslint'
      },

      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css!postcss!sass?outputStyle=expanded')
      }

    ]

  },

  postcss: function(){

    return [

      require('postcss-will-change'),
      require('postcss-cssnext')({
        browsers: ['IE >= 10', 'last 2 version'],
        features: {
          autoprefixer: {
            cascade: false
          }
        }
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
      'process.env': {NODE_ENV: NODE_ENV}
    })

  ],

  eslint: {
    configFile: path.join(__dirname, '.eslintrc'),
    ignorePath: path.join(__dirname, '.eslintignore'),
    formatter: require('eslint-formatter-pretty'),
    fix: true
  },

  resolve: {
    extensions: ['', '.json', '.js', '.css', '.jsx'],
    fallback: path.join(__dirname, 'node_modules')
  },

  resolveLoader: {
    fallback: path.join(__dirname, 'node_modules')
  }

};
