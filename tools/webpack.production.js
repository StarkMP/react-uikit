const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCSSExtactPlugin = require('mini-css-extract-plugin');
const WebpackCommonConfig = require('./webpack.common');
const path = require('path');

module.exports = {
  ...WebpackCommonConfig,
  target: 'web',
  entry: {
    index: path.resolve(__dirname, '../src/index.tsx'),
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist'),
    assetModuleFilename: 'assets/[contenthash:8].[ext]',
    library: 'boxis-uikit',
    libraryTarget: 'umd',
    globalObject: 'this',
    umdNamedDefine: true,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCSSExtactPlugin({
      filename: '[name].css',
    }),
  ],
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom',
    },
  },
};
