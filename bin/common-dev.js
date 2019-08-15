const utils = require('./utils');

module.exports = {
  mode: 'development',

  devtool: 'eval-source-map',

  output: {
    // 解决soucemap中多个vue文件的问题：https://github.com/vuejs/vue-cli/issues/2978
    devtoolModuleFilenameTemplate: info => {
      return info.resourcePath.match(/^\.\/\S*?\.vue$/)
        ? `webpack-generated:///${ info.resourcePath }?${ info.hash }`
        : `webpack-yourCode:///${ info.resourcePath }`;
    },

    devtoolFallbackModuleFilenameTemplate: 'webpack:///[resource-path]?[hash]'
  },

  devServer: {
    stats: 'errors-only',
    publicPath: '/',
    host: utils.localIp(),
    port: process.env.PORT || 8000,
    proxy: {
      // PC自定义按钮调试
      '**/customCtrlResources/**': {
        target: 'http://127.0.0.1:8001',
        pathRewrite: { '/seeyon/apps_res/cap/customCtrlResources': '' }
      },

      '/formCustomFuncList.html': {
        target: 'http://127.0.0.1:8002',
      },

      '/formCustomFunctionAuditDlg.html': {
        target: 'http://127.0.0.1:8002',
      },

      // ajax转发到169或其他服务器：登录后将session id复制过来
      '/seeyon': {
        // target: 'http://10.6.4.23:8080',
        target: 'http://192.168.225.70:88',
        // target: 'http://10.6.3.56:8080',
        // target: 'http://192.168.225.90:8093',
        headers: {
          Cookie: 'JSESSIONID=' + 'E7F473D6835C4031F415B8AFD84651D6' + ';'
        }
      }
    }
  }
}