const { resolve, join } = require('path');
const { defineConfig } = require('@vue/cli-service');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const jsonImporter = require('node-sass-json-importer').default;

module.exports = defineConfig({
  publicPath: '/dash',
  css: {
    extract: true,
    loaderOptions: {
      sass: {
        sassOptions: {
          importer: jsonImporter(),
        },
        implementation: require('sass'),
      },
    },
  },
  outputDir: join(__dirname, '../hugo-noahtkeller-theme/static/dash'),
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias: {
        'vue$': resolve(__dirname, 'node_modules/vue'),
        'sass$': resolve(__dirname, 'node_modules/sass'),
      }
    },
    plugins: [new NodePolyfillPlugin()],
  },
  pluginOptions: {
    vuetify: {
      // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
    }
  },
})
