const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common, {
	mode: 'development',
	devtool: 'inline-source-map',
	devServer: {
		contentBase: './dist',
		hot: true,
		port: 8080,
		historyApiFallback: {
			index: '_index.html'
		}
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	]
});
