const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  plugins: [

    // Clean dist/ folder
    new CleanWebpackPlugin(['dist'], {
      exclude: ['images', 'babel.polyfill.min.js'],
      verbose: true
    }),

    // Generating index.html
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './templates/index.html',
      title: 'delivery-app',
      files: {
        js: ['/babel.polyfill.min.js']
      }
    })
  ]
});
