const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

const config = {
  target: ['web', 'es5'],
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'game.js',
  },
  devServer: {
    open: true,
    host: 'localhost',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    new CopyPlugin({
      patterns: [{ from: 'src/assets/sprites', to: 'sprites' }],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|ts)$/i,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            targets: {
              edge: '17',
              firefox: '60',
              chrome: '67',
              safari: '11.1',
              ie: '11',
            },
          },
        },
        exclude: ['/node_modules/'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts'],
    roots: [path.resolve('./src')],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = 'production';
  } else {
    config.mode = 'development';
  }

  return config;
};
