// changed some loader syntax after reading
// https://webpack.js.org/how-to/upgrade-from-webpack-1/

const path = require(`path`);

const webpack = require(`webpack`);
const {UglifyJsPlugin} = webpack.optimize;

const CopyWebpackPlugin = require(`copy-webpack-plugin`);
const ExtractTextWebpackPlugin = require(`extract-text-webpack-plugin`);
const configHtmls = require(`webpack-config-htmls`)();

const extractCSS = new ExtractTextWebpackPlugin(`css/style.css`);

// change for production build on different server path
const publicPath = `/`;

// hard copy assets folder for:
// - srcset images (not loaded through html-loader )
// - json files (through fetch)
// - fonts via WebFontLoader

const copy = new CopyWebpackPlugin([{
  from: `./src/assets`,
  to: `assets`
}], {
  ignore: [ `.DS_Store` ]
});

const config = {

  // no HTML entry points for production build (bundled in JavaScript)
  entry: [
    `./src/css/style.css`,
    `./src/js/script.js`
  ],

  resolve: {
    // import files without extension import ... from './Test'
    extensions: [`.js`, `.jsx`, `.css`]
  },

  output: {
    path: path.join(__dirname, `server`, `public`),
    filename: `js/[name].[hash].js`,
    publicPath
  },

  devtool: `sourcemap`,

  module: {

    rules: [
      {
        test: /\.css$/,
        loader: extractCSS.extract([
          {
            loader: `css`,
            options: {
              importLoaders: 1
            }
          },
          {
            loader: `postcss`
          }
        ])
      },
      {
        test: /\.html$/,
        loader: `html`,
        options: {
          attrs: [
            `audio:src`,
            `img:src`,
            `video:src`,
            `source:srcset`
          ] // read src from video, img & audio tag
        }
      },
      {
        test: /\.(jsx?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: `babel`
          },
          {
            loader: `eslint`,
            options: {
              fix: true
            }
          }
        ]
      },
      {
        test: /\.(svg|png|jpe?g|gif|webp)$/,
        loader: `url`,
        options: {
          limit: 1000, // inline if < 1 kb
          context: `./src`,
          name: `[path][name].[ext]`
        }
      },
      {
        test: /\.(mp3|mp4)$/,
        loader: `file`,
        options: {
          context: `./src`,
          name: `[path][name].[ext]`
        }
      }
    ]

  },

  plugins: [
    extractCSS,
    copy
  ]

};

if(process.env.NODE_ENV === `production`){

  //image optimizing
  config.module.rules.push({
    test: /\.(svg|png|jpe?g|gif)$/,
    loader: `image-webpack`,
    enforce: `pre`
  });

  config.plugins = [
    ...config.plugins,
    new UglifyJsPlugin({
      sourceMap: true, // false returns errors.. -p + plugin conflict
      comments: false
    })
  ];

}

config.plugins = [...config.plugins, ...configHtmls.plugins];

module.exports = config;
