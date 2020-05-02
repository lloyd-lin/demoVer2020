const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./tools/webpack.config.development');

new WebpackDevServer(webpack(webpackConfig), {
  publicPath: '/',
  hot: true,
  historyApiFallback: true,
  stats: { colors: true },
}).listen(3000, '0.0.0.0', error => {
  if (error) {
    throw error;
  }
});
