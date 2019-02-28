
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

module.exports = {
  configureWebpack: {
    plugins: [
      new VuetifyLoaderPlugin()
    ]
  },
  lintOnSave: undefined,
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
      runtimeCaching: [
        {
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
        {
          urlPattern: /^https:\/\/cors\.io\/\?https:\/\/www\.saveoffline\.com\/process|^https:\/\/www\.s\d{1,2}\.saveoffline\.com|^https:\/\/www\.saveitoffline\.com\/get\/\?i|^https:\/\/www\.s\d{1,2}\.saveoffline\.com|^https:\/\/www\.saveoffline\.com\/get\/\?i|^https:\/\/api\.soundcloud\.com\/tracks\/.+\/stream|^https:\/\/sndcdn\.com/,
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
  baseUrl: undefined,
  outputDir: undefined,
  assetsDir: undefined,
  runtimeCompiler: undefined,
  productionSourceMap: false,
  parallel: undefined,
  css: undefined,
}