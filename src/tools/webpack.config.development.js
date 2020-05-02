const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const webpackBaseConfig = require('../../build/webpack.config.base');

webpackBaseConfig.plugins.push(
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('development')
  }),
  new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    // both options are optional
    filename: '[name].css',
    chunkFilename: '[id].css',
  }),
  new webpack.HotModuleReplacementPlugin(),
  new HtmlWebpackPlugin({
    title: '分析站',
    chunks: ['page'],
    template: path.resolve(__dirname, './template.html')
  }),
)

module.exports = Object.assign(webpackBaseConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {
    page: [
      'webpack-dev-server/client?http://localhost:8000',
      'webpack/hot/only-dev-server',
      'react-hot-loader/patch',
      path.resolve(__dirname, '../pages/index.js')
    ],
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
    sourceMapFilename: '[name].js.map'
  }
});
