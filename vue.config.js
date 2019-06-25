const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
const path = require('path');

module.exports = {
  chainWebpack: config => {
    config.module
      .rule('eslint')
      .use('eslint-loader')
      .options({
        fix: true,
    });
  },
  configureWebpack: {
    plugins: [
      new VuetifyLoaderPlugin()
    ],
    resolve: {
      extensions: ['.js', '.vue', '.json', '.scss'],
      alias: {
        styles: path.resolve(__dirname, 'src/assets/scss'),
      }
    }
  },
  // chainWebpack: config => {
  //   config.module
  //     .rule("vue")
  //     .use("vue-loader")
  //     .loader("vue-loader")
  //     .tap(options => {
  //       // modify the options...
  //       options.compilerOptions.preserveWhitespace = false;
  //       return options;
  //     });
  // },
  lintOnSave: true,
  devServer: {
    overlay: {
      warnings: true,
      errors: true
    }
  },
  pwa: {
    themeColor: '#000000',
    workboxOptions: {
      importScripts: ['update-available.js'],
      runtimeCaching: [{
                         urlPattern: /^https:\/\/fonts\.googleapis\.com\/|^https:\/\/fonts\.gstatic\.com\//,
                         handler: 'cacheFirst',
                         options: {
                           cacheName: 'font-cache',
                           expiration: {
                             maxEntries: 100
                           },
                           cacheableResponse: {
                             statuses: [
                               0,
                               200
                             ]
                           }
                         }
                       },
                       // http:\/\/84\.157\.227\.137:7000\/api
                       {
                         urlPattern: /^https:\/\/dc-mp3-wwlveeistv\.now\.sh|https:\/\/cors\.io\/\?https:\/\/www\.saveoffline\.com\/process|^https:\/\/www\.s\d{1,2}\.saveoffline\.com|^https:\/\/www\.saveoffline\.com\/get\/\?i|^https:\/\/www\.s\d{1,2}\.saveoffline\.com|^https:\/\/www\.saveoffline\.com\/get\/\?i|^https:\/\/api\.soundcloud\.com\/tracks\/.+\/stream|^https:\/\/sndcdn\.com/,
                         handler: 'cacheFirst',
                         options: {
                           cacheName: 'song-cache',
                           expiration: {
                             maxAgeSeconds: 1210000
                           },
                           cacheableResponse: {
                             statuses: [
                               0,
                               200,
                               302
                             ]
                           }
                         }
                       },
                       // Match search API links, store as cache first for 3 hours
                       {
                         urlPattern: new RegExp(/^https:\/\/www\.googleapis\.com\/youtube\/v3|https:\/\/api\.mixcloud|^https:\/\/api\.soundcloud\.com\/users|^https:\/\/api\.soundcloud\.com\/tracks|^https:\/\/api.vimeo.com?/),
                         handler: 'cacheFirst',
                         options: {
                           cacheName: 'search-cache',
                           expiration: {
                             maxAgeSeconds: 10800
                           },
                           cacheableResponse: {
                             statuses: [
                               0,
                               200
                             ]
                           }
                         }
                       }
      ]
    },
    name: 'dreamcloud'
  },
  // plugins: new VuetifyLoaderPlugin(),
  publicPath: '',
  outputDir: undefined,
  assetsDir: undefined,
  runtimeCompiler: undefined,
  productionSourceMap: false,
  parallel: undefined,
  css: undefined,
}