const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackRootPlugin = require('html-webpack-root-plugin');

module.exports = {
	entry: './src/main.tsx',
	mode: 'production',
	resolve: {
		extensions: ['.ts', '.tsx', '.js'],
	},
	output: {
		path: path.join(__dirname, '/build'),
		filename: 'bundle.min.js',
	},
	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/,
				loader: 'awesome-typescript-loader',
			},
			{
				test: /\.(png|jpg|gif)$/,
				loader: 'file-loader',
				options: {
					name: '[name].[ext]',
					outputPath: 'static',
				},
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			hash: true,
			filename: './index.html', //relative to root of the application
		}),
		new HtmlWebpackRootPlugin(),
	],
};
