const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  entry: './demo/client/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  mode: process.env.NODE_ENV,
  devServer: {
    static: {
      directory: path.join(__dirname, './build'),
      publicPath: '/',
    },
    // port: 3000,
    proxy: {
      '/**': 'http://localhost:3000',
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.png|jpg|gif$/,
        use: ['file-loader'],
      },
      {
        test: /\.svg$/,
        use: [
          { loader: 'babel-loader' },
          {
            loader: 'react-svg-loader',
            options: {
              jsx: true,
            },
          },
        ],
      },
    ],
  },
  resolve: { extensions: ['*', '.js', '.jsx'] },
  plugins: [new HtmlWebpackPlugin({ template: './demo/client/index.html' })],
};

module.exports = config;
