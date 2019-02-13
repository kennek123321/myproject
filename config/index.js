'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  //开发时使用的配置
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-


    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },
  //打包时使用的配置
  build: {
    //输入的index.html的路径
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),
    //输出的目标文件夹路径
    assetsRoot: path.resolve(__dirname, '../dist'), //build后 自动构建的根目录 被webpack编译处理过的资源文件都会在这个build.assetsRoot目录下
    //输出的子文件夹路径
    assetsSubDirectory: 'static', //build 静态资源存放的位置 ,相对于 assetsRoot来说的比如 图片,js,css等
    //发布路径
    assetsPublicPath: '/',//这个是通过http服务器运行的url路径。在大多数情况下，这个是根目录(/)。如果你的后台框架对静态资源url前缀要求，你仅需要改变这个参数。在内部，这个是被webpack当做output.publicPath来处理的。

    /**
     * Source Maps
     */
    //是否使用SourceMap
    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    // 是否开启Gzip
    productionGzip: false,
    //Gzip的压缩文件类型
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
