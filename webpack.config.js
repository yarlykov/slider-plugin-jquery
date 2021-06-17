const path = require('path');
const { merge } = require('webpack-merge');
const styles = require('./webpack/styles')
const pug = require('./webpack/pug')
const typeScript = require('./webpack/typeScript')
const devServer = require('./webpack/devServer');
const devtool = require('./webpack/devtool')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const PATHS = {
  source: path.resolve(__dirname, './source'),
  dist: path.resolve(__dirname, './dist'),
};

const devMode = process.env.NODE_ENV === 'development';

const common = merge([
  {
    context: PATHS.source,
    target: devMode ? "web" : "browserslist",
    entry: {
      plugin: ['./app.ts'],
      demo: ['./demo-page/index.ts'],
    },
    optimization: {
      minimize: false,
    },
    output: {
      filename: '[name].js',
      path: PATHS.dist,
      clean: true,
    },
    resolve: {
      extensions: ['.ts', '.js', '.json'],
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'demo-page/page/demo-page.pug',
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css',
      }),
    ],
  },
  pug(devMode),
  styles(),
  typeScript(),
]);

module.exports = function () {
  if (devMode) {
    return merge([
      common,
      devServer(),
      devtool(),
    ])
  } else {
    return merge([
      common,
    ])
  }
};
