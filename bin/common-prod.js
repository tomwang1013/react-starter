const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  mode: 'production',

  devtool: "source-map",

  optimization: {
    minimizer: [
      new TerserPlugin({
        sourceMap: true,
        // test: /(runtime|vendor)\.js/ // 业务代码不压缩
      }),
      new OptimizeCSSAssetsPlugin({
        assetNameRegExp: /\.css/g // 必须和MiniCssExtractPlugin中的name匹配
      })
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new webpack.HashedModuleIdsPlugin()
  ]
}