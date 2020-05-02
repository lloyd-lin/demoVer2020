const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpackBaseConfig = require('../../build/webpack.config.base');

webpackBaseConfig.plugins.push(
  new CleanWebpackPlugin(),
  new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('production') }),
  new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    // both options are optional
    filename: '[name].[hash:8].css',
    chunkFilename: '[id].[hash:8].css',
  }),
  new HtmlWebpackPlugin({
    title: '分析站',
    chunks: ['pages'],
    filename: 'index.html',
    template: path.resolve(__dirname, './template.html'),
  }),
);

const minimizer = [
  new TerserPlugin({
    cache: true,
    parallel: true,
    terserOptions: {
      output: {
        comments: false,
      },
    },
  }),
];

if (webpackBaseConfig.optimization) {
  webpackBaseConfig.optimization.minimizer = minimizer;
} else {
  webpackBaseConfig.optimization = { minimizer };
}

module.exports = Object.assign(webpackBaseConfig, {
  mode: 'production',
  entry: {
    pages: [
      path.resolve(__dirname, '../pages/index'),
    ],
  },
  output: {
    publicPath: './',
    path: path.join(__dirname, '../../site'),
    filename: '[name].[hash:8].js',
    chunkFilename: '[name].[hash:8].js',
  },
});
