const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const isProduction = process.env.NODE_ENV === 'production';
module.exports = {
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  //是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
  parallel: require('os').cpus().length > 1,
  // 所有 webpack-dev-server 的选项都支持
  devServer: {
    port: 8080, // 配置端口
    open: true, // 自动开启浏览器
    compress: true, // 开启压缩
    // 设置让浏览器 overlay 同时显示警告和错误
    overlay: {
      warnings: true,
      errors: true
    },
    // 设置请求代理
    proxy: {
      '/api': {
        target: '<url>',
        ws: true,
        changeOrigin: true
      },
      '/foo': {
        target: '<other_url>'
      }
    }
  },
  chainWebpack: config => {
    // 引入babel-polyfill
    config
      .entry('index')
      .add('babel-polyfill')
      .end();
    // 添加文件路径别名
    // config.resolve.alias.set("@", resolve("src"));
    // if (isProduction) {
    //   // 生产环境注入cdn
    //   config.plugin('html')
    //     .tap(args => {
    //       args[0].cdn = cdn;
    //       return args;
    //     });
    // }
  },
  configureWebpack: config => {
    if (isProduction) {
      // 为生产环境修改配置...
      config.plugins.push(
        //添加代码压缩工具，及设置生产环境自动删除console
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              warnings: false,
              drop_debugger: true,
              drop_console: true,
            },
          },
          sourceMap: false,
          parallel: true,
        })
      );
    } else {
      // 为开发环境修改配置...
    }
  }
}