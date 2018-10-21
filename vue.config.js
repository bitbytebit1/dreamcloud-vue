
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
          urlPattern: /^https:\/\/www\.saveitoffline\.com\/process|^https:\/\/www\.s\d{1,2}\.saveitoffline\.com|^https:\/\/www\.saveitoffline\.com\/get\/\?i|^https:\/\/api\.soundcloud\.com\/tracks\/.+\/stream/,
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
        {
          urlPattern: /^https:\/\/sndcdn\.com/,
          handler: 'cacheFirst',
          options: {
            cacheName: 'song-cache',
            expiration: {
              maxEntries: 500,
              maxAgeSeconds: 1210000
            },
            cacheableResponse: {
              statuses: [
                0,
                200
              ]
            }
          }
        },
        // Match search API links, store as cache first for 1 hour
        {
          urlPattern: new RegExp(/youtube\/v3\/search|api.mixcloud|api\.soundcloud\.com\/users|api\.soundcloud\.com\/tracks|api.vimeo.com?/),
          handler: 'cacheFirst',
          options: {
            cacheName: 'searchh-cache',
            expiration: {
              maxEntries: 500,
              maxAgeSeconds: 3600
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