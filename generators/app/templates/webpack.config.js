const path = require(`path`);

const webpack = require(`webpack`);<% if (!node) { %>
const {HotModuleReplacementPlugin} = webpack;<% } %>
const {UglifyJsPlugin} = webpack.optimize;

const CopyWebpackPlugin = require(`copy-webpack-plugin`);
const ExtractTextWebpackPlugin = require(`extract-text-webpack-plugin`);
const configHtmls = require(`webpack-config-htmls`)();

const {getIfUtils, removeEmpty} = require(`webpack-config-utils`);
const {ifProduction<% if (!node) { %>, ifDevelopment<% } %>} = getIfUtils(process.env.NODE_ENV);

const extractCSS = new ExtractTextWebpackPlugin(`css/style.css`);

// change for production build on different server path
const publicPath = `/`;<% if (!node) { %>

const port = 3000;<% } %>

const copy = new CopyWebpackPlugin([{
  from: `./src/assets`,
  to: `assets`
}], {
  ignore: [
    `.DS_Store`
  ]
});

const config = {

  entry: removeEmpty([
    `./src/css/style.css`,
    `./src/js/script.js`,<% if (!node) { %>
    ifDevelopment(...configHtmls.entry)<% } %>
  ]),

  resolve: {
    extensions: [
      `.js`,
      `.jsx`,
      `.css`
    ]
  },

  output: {
    path: path.join(__dirname, <% if (node) { %>`server`, `public`<% } else { %>`dist`<% } %>),
    filename: `js/[name].[hash].js`,
    publicPath
  },

  devtool: `source-map`,<% if (!node) { %>

  devServer: {

    contentBase: `./src`,
    historyApiFallback: true, // react-router
    hot: true,

    overlay: {
      errors: true,
      warnings: true
    },

    port

  },<% } %>

  module: {

    rules: removeEmpty([

      <% if (!node) { %>ifDevelopment(<% } %>{
        test: /\.css$/,
        <% if (node) { %>loader<% } else { %>use<% } %>: <% if (node) { %>extractCSS.extract(<% } %>[
          <% if (!node) { %>`style-loader`,
          <% } %>{
            loader: `css-loader`,
            options: {
              importLoaders: 1
            }
          },
          {
            loader: `postcss-loader`
          }
        ]<% if (node) { %>)<% } %>
      }<% if (!node) { %>)<% } %>,<% if (!node) { %>

      ifProduction({
        test: /\.css$/,
        loader: extractCSS.extract([
          {
            loader: `css-loader`,
            options: {
              importLoaders: 1
            }
          },
          {
            loader: `postcss-loader`
          }
        ])
      }),<% } %>

      {
        test: /\.html$/,
        loader: `html-loader`,
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
            loader: `babel-loader`
          },
          {
            loader: `eslint-loader`,
            options: {
              fix: true
            }
          }
        ]
      },

      {
        test: /\.(svg|png|jpe?g|gif|webp)$/,
        loader: `url-loader`,
        options: {
          limit: 1000, // inline if < 1 kb
          context: `./src`,
          name: `[path][name].[ext]`
        }
      },

      {
        test: /\.(mp3|mp4|wav)$/,
        loader: `file-loader`,
        options: {
          context: `./src`,
          name: `[path][name].[ext]`
        }
      },

      ifProduction({
        test: /\.(svg|png|jpe?g|gif)$/,
        loader: `image-webpack-loader`,
        enforce: `pre`,
        options: {
          bypassOnDebug: true
        }
      })

    ])

  },

  plugins: removeEmpty([

    ...configHtmls.plugins,<% if (!node) { %>

    ifDevelopment(new HotModuleReplacementPlugin()),

    <% } %>

    <% if (!node) { %>ifProduction(<% } %>copy<% if (!node) { %>)<% } %>,
    <% if (!node) { %>ifProduction(<% } %>extractCSS<% if (!node) { %>)<% } %>,

    ifProduction(
      new UglifyJsPlugin({
        sourceMap: true,
        comments: false
      })
    )

  ])

};

module.exports = config;
