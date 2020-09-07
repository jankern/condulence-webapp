const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: "./src/js/index.js",
    // -> target addon location as a shortcut fo development if addon gets not reinstalled
    // "../../../assets/addons/{name}/js/addon.{name}": "./src/js/addon.drpl_blog_post",
    "../../../assets/addons/rdpl_blog_post/js/addon.rdpl_blog_post": "./src/js/addon.rdpl_blog_post",
    // -> initial addon location. From there the files is being processed while installation routine
    // '../../../redaxo/src/addons/{name}/assets/js/addon.{name}': './src/js/addon.{name}'
    "../../../redaxo/src/addons/rdpl_blog_post/assets/js/addon.rdpl_blog_post": "./src/js/addon.rdpl_blog_post",
  },
  output: {
    filename: "js/[name].bundle.js",
    // path: path.resolve(__dirname, '../../redaxo-mit-docker-master/html/assets/dist')
    // path to use for separate backend package location
    path: path.resolve(
      __dirname,
      "../../../condulence/html/resources/dist"
    ),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "img/[name].[ext]",
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "font/[name].[ext]",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "./src/index.html" }),
    new webpack.ProvidePlugin({
      jQuery: "jquery",
      $: "jquery",
      jquery: "jquery",
      "window.$": "jquery",
      "window.jQuery": "jquery",
      //"Masonry": "Masonry",
      //"masonry": "Masonry",
      //"Masonry": "masonry",
      //"masonry": "masonry"
    }),
  ],
};