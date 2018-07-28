module.exports = {
  pwa: {
    themeColor: '#000000',
    workboxOptions: {
      runtimeCaching: [
        {
          urlPattern: new RegExp(/^https:\/\/fonts\.googleapis\.com\/|^https:\/\/fonts\.gstatic\.com\//),
          handler: 'cacheFirst',
          options: {
            cacheName: 'font-cache',
            // expire after one hour
            expiration: {
              maxEntries: 100,
              maxAgeSeconds: 3600,
            },
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        },
        // songs
        {
          urlPattern: new RegExp(/^http:\/\/www\.saveitoffline\.com\/process|^http:\/\/www\.s\d{1,2}\.saveitoffline\.com|^http:\/\/www\.saveitoffline\.com\/get\/\?i|api\.soundcloud\.com\/tracks\/.+\/stream/),
          handler: 'cacheFirst',
          options: {
            cacheName: 'song-cache',
            // two weeks
            expiration: {
              maxAgeSeconds: 1.21e+6
            },
            // 0 is opaque
            cacheableResponse: {
              statuses: [0, 200, 302]
            }
          }
        },
        // soundcloud images
        {
          urlPattern: new RegExp(/^https:\/\/sndcdn\.com/),
          handler: 'cacheFirst',
          options: {
            cacheName: 'song-cache',
            // two weeks
            expiration: {
              maxEntries: 500,
              maxAgeSeconds: 1.21e+6
            },
            // 0 is opaque
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        }
      ]
    }
  }
}