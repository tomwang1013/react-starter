// NOTE: 有devServer的配置必须放在数组的第一个位置
// 否则webpack-dev-server无法正常工作
module.exports = process.env.NODE_ENV === 'production'
  ? require('./bin/webpack-prod')
  : require('./bin/webpack-dev');
