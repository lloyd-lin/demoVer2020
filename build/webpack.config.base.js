/* eslint-disable no-console */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const path = require('path');
const babelConfig = require('./babel.config.base')();

const isDevMode = process.env.NODE_ENV === 'development';

console.log(isDevMode ? 'is' : 'is not ', 'dev mode');

const AUTOPREFIXER_BROWSERS = [
  'Android 2.3',
  'Android >= 4',
  'Chrome >= 35',
  'Firefox >= 31',
  'Explorer >= 9',
  'iOS >= 6',
  'Opera >= 12',
  'Safari >= 7.1',
];

const miniCssExtractPluginLoader = isDevMode
  ? {
    loader: MiniCssExtractPlugin.loader,
    options: {
      hmr: true,
      reloadAll: true,
    },
  }
  : MiniCssExtractPlugin.loader;

const conditionalDeclarationOptions = isDevMode ? undefined : {
  declaration: true,
  declarationDir: './typings',
};

module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /[\\/]node_modules[\\/]/,
        use: [
          {
            loader: 'babel-loader',
            options: babelConfig,
          },
        ],
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: isDevMode,
              compilerOptions: conditionalDeclarationOptions,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          miniCssExtractPluginLoader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                require('postcss-import')({
                  path: [path.resolve(__dirname, '..', 'src'), 'node_modules/'],
                }),
                require('postcss-mixins')(),
                require('postcss-nested')(),
                require('postcss-cssnext')({ browsers: AUTOPREFIXER_BROWSERS }),
              ],
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          miniCssExtractPluginLoader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              data: '$hd: 0.417rem;',
            },
          },
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?.+)?$/,
        loader: 'file-loader?name=[name].[hash:12].[ext]',
      },
      {
        test: /\.(jpe?g|png|gif)(\?.+)?$/,
        loader: 'url-loader',
        options: {
          limit: 20000,
          name: 'static/[name].[hash:12].[ext]',
        },
      },
      {
        test: /\.md$/,
        loader: 'raw-loader',
      },
      {
        test: /\.less$/,
        use: [{
          loader: 'style-loader',
        }, {
          loader: 'css-loader', // translates CSS into CommonJS
        }, {
          loader: 'less-loader', // compiles Less to CSS
         options: {
           lessOptions: { // 如果使用less-loader@5，请移除 lessOptions 这一级直接配置选项。
             modifyVars: {
               'primary-color': 'red',
               'link-color': '#1DA57A',
               'border-radius-base': '2px',
             },
             javascriptEnabled: true,
           },
         },
        }],
      },
    ],
  },
  plugins: [],
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      automaticNameMaxLength: 30,
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
};
