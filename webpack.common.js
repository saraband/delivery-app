const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    app: './src/browser/index.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      APP_BASE_URL: process.env.NODE_ENV === 'production'
        ? JSON.stringify('https://hotbox-demo.herokuapp.com')
        : JSON.stringify('http://localhost:3000')
    })
  ],
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
      ROOT: path.resolve(__dirname, './'),
      UTILS: path.resolve(__dirname, 'src/utils/'),
      ASSETS: path.resolve(__dirname, 'assets/')
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
      },
      {
        test: /\.svg$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          path.resolve(__dirname, 'src/loaders/svg-loader.js'),
        ]
      }
    ]
  }
};
