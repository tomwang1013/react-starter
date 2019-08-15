const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const utils = require('./utils');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const nowStr = new Date().toLocaleString().replace(/(-\d{1,2})|[ :]/g, i => {
  if (i.length === 1) return '';
  if (i.length === 2) return '0' + i[1];
  return i.slice(1);
});

const extractScss = new MiniCssExtractPlugin({
  filename: process.env.NODE_ENV === 'production' ?
    'css/[name].css?[contenthash:7]-' + nowStr :
    'css/[name].css',
});

const scssExtractLoader = [
  process.env.NODE_ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
  'css-loader',
  'resolve-url-loader',
  {
    loader: 'sass-loader',
    options: {
      sourceMap: true,
      sourceMapContents: false
    }
  }
];

module.exports = {
  name: 'Application',
  context: utils.projectCtx,
  output: {
    path: utils.releaseCtx,
    publicPath: './',

    // https://github.com/webpack/webpack/issues/6604
    // runtimeChunk会使得filename被chunkFileName覆盖
    filename: process.env.NODE_ENV === 'production' ?
      ('js/[name].js?[chunkhash:7]-' + nowStr) :
      'js/[name].js'
    // chunkFilename: '[name].bundle.js'
  },

  entry: {
    'index': './src/index.js'
  },

  resolve: {
    modules: [utils.sourceCtx, 'node_modules'],
    extensions: ['.js', '.jsx'],
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  },

  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: scssExtractLoader
      },

      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        
        // react-hot-loader用到了promise，需要转一下
        // https://github.com/webpack/webpack/issues/2031
        exclude: file => /node_modules/.test(file) && !/react-hot-loader/.test(file)
      },

      {
        test: /\.(svg|woff|otf|woff2|ttf|eot|png|jpg|gif|jpeg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: '[path]/[name].[ext]?[hash:7]'
          }
        }
      }
    ]
  },

  optimization: {
    splitChunks: {
      minChunks: 2,
      chunks: 'all',
      cacheGroups: {
        default: false,
        venders: false,
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor'
        }
      }
    },
    runtimeChunk: {
      name: 'runtime'
    }
  },

  plugins: [
    extractScss,
    new HtmlWebpackPlugin({
      template: path.resolve(utils.sourceCtx,  'index.html'),
      chunks: ['runtime', 'vendor', 'index'],
      minify: false,
      filename: 'index.html'
    })
  ]
};
