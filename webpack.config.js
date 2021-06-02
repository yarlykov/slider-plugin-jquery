const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const PATHS = {
  source: path.resolve(__dirname, './source'),
  dist: path.resolve(__dirname, './dist'),
};

module.exports = {
  context: PATHS.source,
  mode: 'development',
  entry: {
    plugin: ['@babel/polyfill', './app.ts'],
    demo: ['./demo-page/index.ts'],
  },
  output: {
    filename: '[name].js',
    path: PATHS.dist,
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
  },
  devServer: {
    port: 8082,
    index: 'index.html',
    open: true,
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(s[ac]ss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { sourceMap: true },
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-typescript',
            ],
          },
        },
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader',
        options: {
          pretty: true,
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'demo-page/page/demo-page.pug',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
  ],
};
