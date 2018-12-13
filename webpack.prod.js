const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SriPlugin = require('webpack-subresource-integrity');
const path = require('path');

const distPath = path.resolve(__dirname, 'dist');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  output: {
    path: distPath,
    filename: '[name].[contentHash].bundle.js',
    chunkFilename: '[name].[contentHash].bundle.js',
    publicPath: '/',

    // sub resources integrity (see plugin below)
    //crossOriginLoading: 'anonymous'
  },
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
      },
      meta: {
        'robots': 'noindex',
        'viewport': 'minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no'
      },
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      }
    }),

    // Sub-resources integrity
    /*
    new SriPlugin({
      hashFuncNames: ['sha256', 'sha384'],
      enabled: true
    })*/
  ]
});
