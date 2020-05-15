/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
// const pageConfig = require("./pages.config.js");
const pkg = require("./package.json");
// page title
const name = pkg.name || "gautflc-client";
// dev port
const port = process.env.DEV_PORT || 13000;
const backendApi = process.env.PROXY_PATH || "http://127.0.0.1:20426";
// const pages = pageConfig.getPages;

// tslint:disable-next-line:no-console
// console.log(pages);

module.exports = {
  // pages: pages,
  /* 部署生产环境和开发环境下的URL：可对当前环境进行区分，baseUrl 从 Vue CLI 3.3 起已弃用，要使用publicPath */
  publicPath: "./",
  /* 输出文件目录：在npm run build时，生成文件的目录名称 */
  outputDir: "dist",
  /* 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录 */
  assetsDir: "assets",
  /* 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度 */
  productionSourceMap: false,
  /* 默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存，你可以通过将这个选项设为 false 来关闭文件名哈希。(false的时候就是让原来的文件名不改变) */
  filenameHashing: false,
  /* 代码保存时进行eslint检测 */
  lintOnSave: true,
  // css相关配置
  css: {
    loaderOptions: {},
  },
  // 第三方插件配置
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [path.resolve(__dirname, "src/assets/style/base.less")],
    },
  },
  configureWebpack: {
    name: name,
    // 模块别名
    resolve: {
      alias: {
        model: path.resolve(__dirname, "src/model/"),
        config: path.resolve(__dirname, "src/config/"),
        components: path.resolve(__dirname, "src/components/"),
      },
    },
    // tslint:disable-next-line: object-literal-sort-keys
    plugins: [],
  },
  chainWebpack: config => {
    config.module
      .rule("md-postcss") // 新增规则，规则名自定义
      .test(/mand-mobile.*\.css$/) // 用正则表达式匹配mand-mobile的组件目录下的所有css文件
      .use("css-loader") // css加载器
      .loader("postcss-loader") // css处理器
      .options({ // 这里的内容跟方法一中css.loaderOptions一样
        plugins: [
          require("postcss-pxtorem")({
            rootValue: 30,
            minPixelValue: 2,
            propList: ["*"],
            selectorBlackList: [],
          }),
        ],
      });
  },
  /* webpack-dev-server 相关配置 */
  devServer: {
    disableHostCheck: true,
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true,
    },
    proxy: {
      "/api": {
        target: backendApi,
        changeOrigin: true,
        pathRewrite: {},
      },
    },
  },
};
