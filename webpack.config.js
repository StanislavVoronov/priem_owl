const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackRootPlugin = require('html-webpack-root-plugin');

module.exports = {
	entry: './src/App.tsx',
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
			{
				test: /\.css$/,
				include: path.join(__dirname, 'src'),
				use: [
					'style-loader',
					{
						loader: 'typings-for-css-modules-loader',
						options: {
							modules: true,
							namedExport: true,
						},
					},
				],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			hash: true,
			title: 'МГУТУ им. К.Г. Разумовского (ПКУ)',
			favicon: 'favicon.ico',
			filename: './index.html', //relative to root of the application
		}),
		new HtmlWebpackRootPlugin(),
	],
};
