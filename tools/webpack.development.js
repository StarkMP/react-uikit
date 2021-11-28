const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtactPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WebpackCommonConfig = require('./webpack.common');
const path = require('path');

module.exports = {
  ...WebpackCommonConfig,
  context: path.resolve(__dirname, '../src'),
  entry: {
    bundle: './App.tsx',
  },
  output: {
    filename: '[name].[contenthash:8].js',
    path: path.resolve(__dirname, '../dist'),
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
    }),
    new CleanWebpackPlugin(),
    new MiniCSSExtactPlugin({
      filename: '[name].[contenthash:8].css',
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, '../dist'),
    compress: true,
    port: 3030,
    watchContentBase: true,
    progress: true,
  },
};
