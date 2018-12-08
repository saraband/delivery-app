const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: './src/browser/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './dist',
    hot: true,
    port: 8080,
    historyApiFallback: {
      index: 'index.html'
    }
  },
  resolve: {
    alias: {
      COMPONENTS: path.resolve(__dirname, 'src/browser/components/'),
      CONSTANTS: path.resolve(__dirname, 'src/browser/constants/'),
      LAYOUTS: path.resolve(__dirname, 'src/browser/layouts/'),
      MISC: path.resolve(__dirname, 'src/browser/misc/'),
      ROUTES: path.resolve(__dirname, 'src/browser/routes/'),
      PAGES: path.resolve(__dirname, 'src/browser/pages/'),
      ICONS: path.resolve(__dirname, 'src/browser/icons/'),
      HOCS: path.resolve(__dirname, 'src/browser/hocs/'),
      STORE: path.resolve(__dirname, 'src/browser/store/'),
      HELPERS: path.resolve(__dirname, 'src/browser/helpers/'),
      DIST: path.resolve(__dirname, 'dist/'),
      UTILS: path.resolve(__dirname, 'src/utils/')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};