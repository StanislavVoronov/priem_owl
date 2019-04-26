const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const resolve = require('resolve');
const PnpWebpackPlugin = require('pnp-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const HtmlWebpackRootPlugin = require('html-webpack-root-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const paths = require('./paths');
const useTypeScript = fs.existsSync(paths.appTsConfig);
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;

module.exports = function(webpackEnv) {
	const isEnvProduction = webpackEnv === 'production';

	return {
		entry: paths.appIndexJs,
		mode: 'production',
		output: {
			path: path.join(__dirname, '/build'),
			filename: 'bundle.min.js',
		},
		resolve: {
			modules: ['node_modules'].concat(process.env.NODE_PATH.split(path.delimiter).filter(Boolean)),
			alias: {
				$components: path.resolve(__dirname, '../src/components'),
				$common: path.resolve(__dirname, '../src/common'),
			},
			extensions: paths.moduleFileExtensions.map(ext => `.${ext}`).filter(ext => useTypeScript || !ext.includes('ts')),
			plugins: [PnpWebpackPlugin, new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson])],
		},
		resolveLoader: {
			plugins: [PnpWebpackPlugin.moduleLoader(module)],
		},
		module: {
			strictExportPresence: true,
			rules: [
				{ parser: { requireEnsure: false } },
				{
					test: /\.(ts|tsx)$/,
					loader: 'awesome-typescript-loader',
				},
				{
					oneOf: [
						{
							test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
							loader: require.resolve('url-loader'),
							options: {
								limit: 10000,
								name: 'static/media/[name].[hash:8].[ext]',
							},
						},
						{
							test: /\.(js|mjs|jsx|ts|tsx)$/,
							include: paths.appSrc,
							loader: require.resolve('babel-loader'),
							options: {
								customize: require.resolve('babel-preset-react-app/webpack-overrides'),

								plugins: [
									[
										require.resolve('babel-plugin-named-asset-import'),
										{
											loaderMap: {
												svg: {
													ReactComponent: '@svgr/webpack?-svgo,+ref![path]',
												},
											},
										},
									],
								],
								cacheDirectory: true,
								cacheCompression: isEnvProduction,
								compact: isEnvProduction,
							},
						},
						{
							test: /\.(js|mjs)$/,
							exclude: /@babel(?:\/|\\{1,2})runtime/,
							loader: require.resolve('babel-loader'),
							options: {
								babelrc: false,
								configFile: false,
								compact: false,
								presets: [[require.resolve('babel-preset-react-app/dependencies'), { helpers: true }]],
								cacheDirectory: true,
								cacheCompression: isEnvProduction,

								sourceMaps: false,
							},
						},
						{
							test: cssRegex,
							exclude: cssModuleRegex,
							use: getStyleLoaders({
								importLoaders: 1,
								sourceMap: isEnvProduction && shouldUseSourceMap,
							}),
							sideEffects: true,
						},
						{
							test: cssModuleRegex,
							use: getStyleLoaders({
								importLoaders: 1,
								sourceMap: isEnvProduction && shouldUseSourceMap,
								modules: true,
								getLocalIdent: getCSSModuleLocalIdent,
							}),
						},
						{
							loader: require.resolve('file-loader'),
							exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
							options: {
								name: 'static/media/[name].[hash:8].[ext]',
							},
						},
					],
				},
			],
		},
		plugins: [
			Object.assign(
				{},
				{
					inject: true,
					template: paths.appHtml,
				},
				isEnvProduction
					? {
							minify: {
								removeComments: true,
								collapseWhitespace: true,
								removeRedundantAttributes: true,
								useShortDoctype: true,
								removeEmptyAttributes: true,
								removeStyleLinkTypeAttributes: true,
								keepClosingSlash: true,
								minifyJS: true,
								minifyCSS: true,
								minifyURLs: true,
							},
					  }
					: undefined,
			),
			new HtmlWebpackRootPlugin(),
			isEnvProduction &&
			new MiniCssExtractPlugin({
				filename: 'static/css/[name].[contenthash:8].css',
				chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
			}),
		],
	};
};
