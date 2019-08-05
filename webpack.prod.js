const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

module.exports = merge(common, {
  mode: 'production',
  entry: {
    vendor: [
      'react',
      'react-dom',
      'redux',
      'react-router-dom',
      'react-redux',
      'redux-actions',
      'axios'
    ],
  },
  plugins: [
    // new webpack.optimize.CommonsChunkPlugin({
    //   names: ['vendor'],
    //   minChunks: Infinity,
    //   filename: 'common.bundle.[chunkhash].js',
    // }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   names: ['manifest'],
    //   filename: 'manifest.bundle.[chunkhash].js',
    // }),
    new webpack.optimize.RuntimeChunkPlugin({
      name: 'manifest'
    }),
    new MiniCssExtractPlugin({ filename: '[name].[contenthash].css', allChunks: false }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'initial',
      cacheGroups: { // 这里开始设置缓存的 chunks
        default: {
          chunks: 'initial', // 必须三选一： "initial" | "all" | "async"(默认就是异步)
          minSize: 0, // 最小尺寸，默认0,
          minChunks: 2, // 最小 chunk ，默认1
          maxInitialRequests: 5, // 最大初始化请求书，默认1
        },
        vendor: {
          chunks: 'initial', // 必须三选一： "initial" | "all" | "async"(默认就是异步)
          names: ['vendor'], // 要缓存的 分隔出来的 chunk 名称
          priority: 10, // 缓存组优先级
          enforce: true,
          filename: 'common.bundle.[chunkhash].js',
        }
      }
    },
    runtimeChunk: true
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, 'css-loader?modules'],
      }, {
        test: /\.css$/,
        include: /node_modules/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader?modules', 'less-loader']
      },
    ],
  }
});
