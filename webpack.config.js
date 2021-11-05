/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const { merge } = require('webpack-merge');
const styles = require('./webpack/styles');
const pug = require('./webpack/pug');
const typeScript = require('./webpack/typeScript');
const devServer = require('./webpack/devServer');
const devtool = require('./webpack/devtool');
const optimization = require('./webpack/optimization');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const devMode = process.env.NODE_ENV === 'development';

const common = merge([
  {
    target: devMode ? 'web' : 'browserslist',
    entry: {
      plugin: ['./source/app.ts'],
      demo: ['./demo-page/index.ts'],
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, './dist'),
      clean: true,
    },
    resolve: {
      extensions: ['.ts', '.js', '.json'],
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './demo-page/page/demo-page.pug',
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css',
      }),
      new CopyPlugin({
        patterns: [{ from: path.resolve(__dirname, './demo-page/favicon/'), to: 'favicon/' }],
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
      optimization(),
    ])
  }
};
