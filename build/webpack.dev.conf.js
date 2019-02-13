/*
* 合并基础的webpack配置
使用styleLoaders
配置Source Maps
配置webpack插件
* */
'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
//生成html文件并自动注入依赖文件的插件， script & link
const HtmlWebpackPlugin = require('html-webpack-plugin')
//一个输出webpack警告，错误的插件
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
//添加热重载相关的代码到entry chunks 这个可能在新版本去掉了 ,待验证


const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  //使用styleLoaders处理样式文件
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  /*
  * 以上配置告知 webpack-dev-server，在 localhost:8080 下建立服务，将 dist 目录下的文件，作为可访问文件。

  * */
  devServer: {

    /*
    * 在 dev-server 的两种不同模式之间切换。默认情况下，应用程序启用内联模式(inline mode)。
    * 这意味着一段处理实时重载的脚本被插入到你的包(bundle)中，并且构建消息将会出现在浏览器控制台。
      也可以使用 iframe 模式，它在通知栏下面使用 <iframe> 标签，包含了关于构建的消息。切换到 iframe 模式：
       inline: false
    *
    *
    *
    * */


    /*
    * 当使用内联模式(inline mode)时，会在开发工具(DevTools)的控制台(console)显示消息，
    * 例如：在重新加载之前，在一个错误之前，或者模块热替换(Hot Module Replacement)启用
    * 时。这可能显得很繁琐。
    *
    * */

    clientLogLevel: 'warning',
    /*
    * 如果为 true ，页面出错不会弹出 404 页面。
    * 从代码可以看出 url 匹配正则，匹配成功就到某个页面。
    * 并不建议将路由写在这，一般 historyApiFallback: true 就行了。
    * verbose：如果 true ，则激活日志记录。
    * disableDotRule： 禁止 url 带小数点 . 。
    * 当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html。通过传入以下启用：
    * 通过传入一个对象，比如使用 rewrites 这个选项，此行为可进一步地控制：
    *  rewrites: [
        { from: /^\/$/, to: '/views/landing.html' },
        { from: /^\/subpage/, to: '/views/subpage.html' },
        { from: /./, to: '/views/404.html' }
      ]
      当路径中使用点(dot)（常见于 Angular），你可能需要使用 disableDotRule：
    * */
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    /*
    * 热模块更新作用。即修改或模块后，保存会自动更新，页面不用刷新呈现最新的效果。
      这不是和 webpack.HotModuleReplacementPlugin （HMR） 这个插件不是一样
      功能吗？是的，不过请注意了，HMR 这个插件是真正实现热模块更新的。而 devServer
      里配置了 hot: true , webpack会自动添加 HMR 插件。所以模块热更新最终还是 HMR
      这个插件起的作用。

      注意，必须有 webpack.HotModuleReplacementPlugin 才能完全启用 HMR。如果
       webpack 或 webpack-dev-server 是通过 --hot 选项启动的，那么这个插件会
       被自动添加，所以你可能不需要把它添加到 webpack.config.js 中。关于更多信
       息，请查看 HMR 概念 页面。
    * */
    hot: true,
    /*
    * 你要提供哪里的内容给虚拟服务器用。这里最好填 绝对路径。
    * contentBase: path.join(__dirname, "public")
    * contentBase: [path.join(__dirname, "public"), path.join(__dirname, "assets")]
    * 默认情况下，它将使用您当前的工作目录来提供内容。
    * */
    /*
    * 告诉服务器从哪个目录中提供内容。只有在你想要提供静态文件时才需要。
    * devServer.publicPath 将用于确定应该从哪里提供 bundle，并且此选项优先。
    * 默认情况下，将使用当前工作目录作为提供内容的目录，但是你可以修改为其他目录：
    * 注意，推荐使用绝对路径。
      但是也可以从多个目录提供内容：
       contentBase: [path.join(__dirname, 'public'), path.join(__dirname, 'assets')]
    *
    * */
    contentBase: false, // since we use CopyWebpackPlugin.
    //如果为 true ，开启虚拟服务器时，为你的代码进行压缩。加快开发流程和优化的作用。一切服务都启用 gzip 压缩：
    compress: true,
    //写主机名的。默认 localhost
    host: HOST || config.dev.host,
    //端口号。默认 8080
    port: PORT || config.dev.port,
    // true，则自动打开浏览器。
    /*
    * 指定打开浏览器时的导航页面。
    * openPage: '/different/page'
    * */
    open: config.dev.autoOpenBrowser,
    /*
    * 如果为 true ，在浏览器上全屏显示编译的errors或warnings。默认 false （关闭）
    * 如果你只想看 error ，不想看 warning。
    * overlay：{
        errors：true，
        warnings：false
       }
    *
    * */
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,

    /*
    * 配置了 publicPath后， url = '主机名' + 'publicPath配置的' +
     '原来的url.path'。这个其实与 output.publicPath 用法大同小异。
      output.publicPath 是作用于 js, css, img 。而 devServer.publicPath 则作用于请求路径上的。
    * // 原本路径 --> 变换后的路径
    * http://localhost:8080/app.js --> http://localhost:8080/assets/app.js
    * 路径下的打包文件可在浏览器中访问。
    * 假设服务器运行在 http://localhost:8080 并且 output.filename 被设置为 bundle.js。
    * 默认 publicPath 是 "/"，所以你的包(bundle)可以通过 http://localhost:8080/bundle.js 访问。
      可以修改 publicPath，将 bundle 放在一个目录：
    * */
    publicPath: config.dev.assetsPublicPath,
    // 当您有一个单独的API后端开发服务器，并且想要在同一个域上发送API请求时，则代理这些 url 。看例子好理解
   /*  如果你有单独的后端开发服务器 API，并且希望在同域名下发送 API 请求 ，那么代理某些 URL 会很有用。
       dev-server 使用了非常强大的 http-proxy-middleware 包。更多高级用法，请查阅其 文档。
       在 localhost:3000 上有后端服务的话，你可以这样启用代理：
   *  proxy: {
      '/api': 'http://localhost:3000'
      }

      请求到 /api/users 现在会被代理到请求 http://localhost:3000/api/users。
   *
   *
   * */
    proxy: config.dev.proxyTable,
    //true，则终端输出的只有初始启动信息。 webpack 的警告和错误是不输出到终端的。
    quiet: true, // necessary for FriendlyErrorsPlugin
    // 一组自定义的监听模式，用来监听文件是否被改动过。
    /*
    *
    * watchOptions: {
        aggregateTimeout: 300,
        poll: 1000，
        ignored: /node_modules/
      }

      aggregateTimeout：一旦第一个文件改变，在重建之前添加一个延迟。填以毫秒为单位的数字。
      ignored：观察许多文件系统会导致大量的CPU或内存使用量。可以排除一个巨大的文件夹。
      poll：填以毫秒为单位的数字。每隔（你设定的）多少时间查一下有没有文件改动过。不想启用也可以填false。
      webpack 使用文件系统(file system)获取文件改动的通知。在某些情况下，不会正常工作。例如，当使用
       Network File System (NFS) 时。Vagrant 也有很多问题。在这些情况下，请使用轮询：

       当第一个文件更改，会在重新构建前增加延迟。这个选项允许 webpack
       将这段时间内进行的任何其他更改都聚合到一次重新构建里。以毫秒为单位：
    *
    * */
    watchOptions: {
      poll: config.dev.poll,//不开启轮询
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    //在编译出现错误时，使用 NoEmitOnErrorsPlugin 来跳过输出阶段。这样可以确保输出资源不会包含错误。
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    //在编译出现错误时，使用 NoEmitOnErrorsPlugin 来跳过输出阶段。这样可以确保输出资源不会包含错误。
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
