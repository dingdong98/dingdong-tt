const { defineConfig } = require("@vue/cli-service");

const path = require("path");
const coverpath = path.resolve(__dirname, "src/styles/cover.less");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = defineConfig({
  configureWebpack: {
    plugins: [new NodePolyfillPlugin()],
  },
  css: {
    loaderOptions: {
      less: {
        // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
        lessOptions: {
          modifyVars: {
            hack: `true; @import '${coverpath}';`,
          },
        },
      },
    },
  },
  // webpack打包时解决index.html请求资源路径问题
  publicPath: "./",
});
