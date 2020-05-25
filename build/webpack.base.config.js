const path = require('path');

module.exports = {
  entry: {
    index: './src/client/index.tsx'
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            // 缓存上次编译结果，避免每次重新编译，减少打包时间
            cacheDirectory: true
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.png$/,
        use: 'url-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpe?g|ico|pdf)$/,
        loader: 'url-loader',
        options: {
            limit: 40000,
            name: 'static/[name].[hash].[ext]',
        },
      },
      {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url-loader',
          options: {
              limit: 10000,
              minetype: 'image/svg+xml',
              name: 'static/[name].[hash].[ext]',
          },
      },
      {
          test: /\.(gif|eot|ttf|otf|woff2?)$/,
          loader: 'file-loader',
          options: {
              name: 'static/[name].[hash:8].[ext]',
          },
      },
    ]
  },
  resolve: {
    extensions: ['.tsx', '.js', '.ts'],
    alias: {
      '@': path.resolve(__dirname + '../src/client'),
    }
  },
  externals: {
    lodash: '_',
  }
};
