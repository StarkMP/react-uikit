const MiniCSSExtactPlugin = require('mini-css-extract-plugin');
const path = require('path');

const isProduction = process.env.node_env === 'production';

const stylesLoader = (isSass) => {
  const loader = {
    use: [
      MiniCSSExtactPlugin.loader,
      'css-loader',
      {
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            plugins: [
              [
                'autoprefixer',
              ],
            ],
          },
        },
      },
    ],
    sideEffects: true,
  };

  return isSass ? { ...loader, use: [...loader.use, 'sass-loader'] } : loader;
};

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx', '.tsx', '.ts', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        exclude: /(node_modules|bower_components)/,
        use: ['babel-loader', 'awesome-typescript-loader'].filter(Boolean),
      },
      {
        test: /\.s[ac]ss$/i,
        ...stylesLoader(true),
      },
      {
        test: /\.css$/i,
        ...stylesLoader(false),
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        include: [path.join(__dirname, '../src/fonts')]
      },
    ],
  },
  devtool: isProduction ? false : 'source-map',
};