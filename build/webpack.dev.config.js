const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const baseConfig = require('./webpack.base.config');

const devConfig = {
  mode: 'development',
  devtool: 'source-map',
  entry: [
    'react-hot-loader/patch', // 解决hooks警告，问题: https://stackoverflow.com/questions/59595984/simple-reactredux-app-causes-warning-the-final-argument-passed-to-usememo-cha
    './src/client/index.tsx',
  ],
  output: {
    path: path.resolve('./dist/client'),
    filename: '[name].js'
  },
  devServer: {
    hot: true,
    inline: true,
    port: 8088,
    // 代理服务器端域名
    proxy: {
      '/api': 'http://test.corp.kuaishou.com:8082'
    },
    disableHostCheck: true,
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        exclude: /node_modules/, // 非node_modules走css module
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: "[name]__[local]___[hash:base64:5]",
              },	
              sourceMap: false,
              importLoaders: 2,
            },
          },
          'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true
            }
          }
        ]
      },
      {
        test: /\.less$/,
        include: /node_modules/, // antd样式不css module
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './build/template/index.ejs',
      favicon: './build/template/favicon.ico',
      env: process.env.NODE_ENV
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  }
};

module.exports = merge(baseConfig, devConfig);
