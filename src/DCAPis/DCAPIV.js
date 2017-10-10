import axios from 'axios'
/* eslint-disable1 */
const DCAPIPlug = {
  install (Vue, options) {
    var DCAPI = {
      sYtKey: '***REMOVED***',
      sScKey: '***REMOVED***',
      sVimeoKey: '***REMOVED***',
      bRelated: '',
      iResultLimt: 50,
      sQuery: '',
      iPage: '',
      aSource: [],
      sArtist: '',
      hCallback: '',
      aResults: [],
      ajaxList: [],
      YTnextPageTokenString: '',
      nextPageToken: '',
      //  If bRelated then sArtist should be set to trackID, only works for yt n sc.
      searchInt: function (sQuery, iPage, aSource, sArtist, hCallback, bRelated) {
        DCAPI.bRelated = bRelated
        DCAPI.sQuery = sQuery
        DCAPI.iPage = iPage
        DCAPI.aSource = aSource[0] === 'all' ? ['mixcloud', 'soundcloud', 'youtube', 'vimeo'] : aSource
        DCAPI.sArtist = sArtist
        DCAPI.hCallback = hCallback
        DCAPI.aResults = []
        DCAPI.ajaxList = []
        for (var idx in DCAPI.aSource) {
          DCAPI.ajaxList.push(DCAPI.search(DCAPI.aSource[idx]))
        }
        axios.all(DCAPI.ajaxList).then(function () {
          DCAPI.hCallback(DCAPI.aResults)
          DCAPI.aResults = []
        })
      },
      search: function (source) {
        switch (source.toLowerCase()) {
          case 'mixcloud':
            return DCAPI.mc()
          case 'soundcloud':
            return DCAPI.sc()
          case 'youtube':
            return DCAPI.yt()
          case 'vimeo':
            return DCAPI.vim()
          default:
            console.log('!source', source)
            break
        }
      },
      mc: function () {
        var a
        if (DCAPI.sArtist !== '') {
          a = 'https://api.mixcloud.com/' + DCAPI.sArtist + '/cloudcasts?limit=12&offset=' + 8 * DCAPI.page + '&callback=?'
        } else {
          a = 'https://api.mixcloud.com/search/?type=cloudcast&limit=12&q=' + DCAPI.sQuery + '&offset=' + 8 * DCAPI.iPage + '&callback=?'
        }
        return axios.get(a).then(function (resp) {
          for (var idx in resp.data.data) {
            DCAPI.pushResult(
              resp.data.data[idx].user.name, // artist:
              resp.data.data[idx].user.username, // artistID:
              DCAPI.parseDate(resp.data.data[idx].created_time), // created:
              '', // description:
              DCAPI.secondstominutes(resp.data.data[idx].audio_length), // duration:
              'https://dream.tribe.nu/r3/off/?q=' + resp.data.data[idx].url, // mp3:
              resp.data.data[idx].url, // mp32:
              resp.data.data[idx].pictures.large, // poster:
              resp.data.data[idx].pictures.extra_large, // posterLarge:
              'MixCloud', // source:
              resp.data.data[idx].name, // title:
              '' // trackID:
            )
          }
        })
      },
      sc: function () {
        var a
        if (typeof (related) !== 'undefined') {
          a = 'https://api.soundcloud.com/tracks/' + DCAPI.sArtist + '/related?client_id=' + DCAPI.sScKey
        } else if (DCAPI.sArtist !== '') {
          a = 'https://api.soundcloud.com/users/' + DCAPI.sArtist + '/tracks.json?&limit=12&offset=' + 12 * DCAPI.iPage + '&client_id=' + DCAPI.sScKey
        } else {
          a = 'https://api.soundcloud.com/tracks.json?q=' + encodeURIComponent(DCAPI.sQuery) + '&limit=12&offset=' + 12 * DCAPI.iPage + '&client_id=' + DCAPI.sScKey
        }
        return axios.get(a).then(function (resp) {
          try {
            var img, img2
            for (var idx in resp.data) {
              if (!resp.data[idx].artwork_url) {
                resp.data[idx].artwork_url = resp.data[idx].user.avatar_url
              }
              img = resp.data[idx].artwork_url.replace('i1', 'i2').replace('-large', '-t300x300')
              img2 = resp.data[idx].artwork_url.replace('-large', '-t500x500')
              DCAPI.pushResult(
                resp.data[idx].user.username, // artist:
                resp.data[idx].user_id, // artistID:
                DCAPI.parseDate(resp.data[idx].created_at), // created:
                resp.data[idx].description, // description:
                DCAPI.secondstominutes(Math.floor(resp.data[idx].duration / 1E3)), // duration:
                resp.data[idx].stream_url + '?client_id=' + DCAPI.sScKey, // mp3:
                resp.data[idx].permalink_url, // mp32:
                img, // poster:
                img2, // posterLarge:
                'SoundCloud', // source:
                resp.data[idx].title, // title:
                resp.data[idx].id // trackID:
              )
            }
          } catch (e) {
            return
          }
        })
      },
      yt: function () {
        if (DCAPI.iPage === 0) {
          DCAPI.YTnextPageTokenString = ''
        } else {
          DCAPI.YTnextPageTokenString = '&pageToken=' + DCAPI.nextPageToken
        }
        var a
        if (DCAPI.bRelated) {
          a = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=' + DCAPI.iResultLimt + '&relatedToVideoId=' + DCAPI.sArtist + '&type=video&key=' + DCAPI.sYtKey
        } else if (DCAPI.sArtist === '') {
          a = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=' + DCAPI.iResultLimt + '&type=video&q=' + DCAPI.sQuery + '&key=' + DCAPI.sYtKey + DCAPI.YTnextPageTokenString
        } else {
          a = 'https://www.googleapis.com/youtube/v3/search?part=snippet&order=date&maxResults=' + DCAPI.iResultLimt + '&type=video&channelId=' + DCAPI.sArtist + '&key=' + DCAPI.sYtKey + DCAPI.YTnextPageTokenString
        }
        return axios.get(a).then(function (resp) {
          var z = ''
          try {
            for (var idx in resp.data.items) {
              z = 'https://www.youtube.com/watch?v=' + resp.data.items[idx].id.videoId
              DCAPI.pushResult(
                resp.data.items[idx].snippet.channelTitle, // artist:
                resp.data.items[idx].snippet.channelId, // artistID:
                DCAPI.parseDate(resp.data.items[idx].snippet.publishedAt), // created:
                resp.data.items[idx].snippet.description, // description:
                '', // duration:
                'https://dream.tribe.nu/r3/off/?q=' + z, // mp3:
                z, // mp32:
                resp.data.items[idx].snippet.thumbnails.high.url, // poster:
                resp.data.items[idx].snippet.thumbnails.high.url, // posterLarge:
                'YouTube', // source:
                resp.data.items[idx].snippet.title, // title:
                resp.data.items[idx].id.videoId // trackID:
              )
            }
            DCAPI.nextPageToken = resp.data.nextPageToken
          } catch (e) {
            DCAPI.YTnextPageToken = ''
            console.log('yt error', e)
            return
          }
        })
      },
      vim: function () {
        var a
        if (DCAPI.sArtist !== 'undefined') {
          a = 'https://api.vimeo.com/videos?page=' + (DCAPI.iPage + 1) + '&per_page=12&query=' + DCAPI.sQuery + '&sort=relevant&access_token=' + DCAPI.sVimeoKey
        } else {
          a = 'https://api.vimeo.com/users/' + DCAPI.sArtist + '/videos?page=' + (DCAPI.iPage + 1) + '&per_page=12&sort=date&access_token=' + DCAPI.sVimeoKey
        }
        return axios.get(a).then(function (resp) {
          for (var idx in resp.data.data) {
            DCAPI.pushResult(
              resp.data.data[idx].user.name, // artist:
              resp.data.data[idx].user.uri.replace(/\/users\/(.*?)/ig, 'user'), // artistID:
              DCAPI.parseDate(resp.data.data[idx].user.created_time), // created:
              resp.data.data[idx].description, // description:
              DCAPI.secondstominutes(resp.data.data[idx].duration), // duration:
              'https://dream.tribe.nu/r3/off/?q=' + resp.data.data[idx].link, // mp3:
              resp.data.data[idx].link, // mp32:
              resp.data.data[idx].pictures.sizes[2].link, // poster:
              resp.data.data[idx].pictures.sizes[resp.data.data[idx].pictures.sizes.length - 1].link, // posterLarge:
              'vimeo', // source:
              resp.data.data[idx].name, // title:
              '' // trackID:
            )
          }
        })
      },
      getAudio: function (url, hCallback) {
        var ax = axios.get('https://www.saveitoffline.com/process/?type=audio&url=' + url)
        ax.then(function (resp) {
          if (('data' in resp) && (resp.data !== 'Error: no_media_found')) {
            for (var i = 0; i < resp.data.urls.length; i++) {
              if (resp.data.urls[i].label.indexOf('audio') > -1) {
                hCallback(resp.data.urls[i].id)
                break
              }
            }
          }
        })
        return ax
      },
      getArtistInfo: function (artistID, source, hCallback) {
        if (source.toLowerCase().indexOf('youtube') > -1) {
          return axios.get('https://www.googleapis.com/youtube/v3/channels?part=snippet&id=' + artistID + '&key=' + DCAPI.sYtKey).then(hCallback)
        } else if (source.toLowerCase().indexOf('soundcloud') > -1) {
          return axios.get('https://api.soundcloud.com/users/' + artistID + '?client_id=' + DCAPI.sScKey).then(hCallback)
        }
      },
      getSongInfo: function (trackID, source, hCallback) {
        DCAPI.aResults = []
        if (source.toLowerCase().indexOf('youtube') > -1) {
          return axios.get('https://www.googleapis.com/youtube/v3/videos?part=snippet&id=' + trackID + '&key=' + DCAPI.sYtKey).then(function (resp) {
            resp = resp.data.items[0]
            DCAPI.pushResult(
                resp.snippet.channelTitle, // artist:
                resp.snippet.channelId, // artistID:
                DCAPI.parseDate(resp.snippet.publishedAt), // created:
                resp.snippet.description, // description:
                '', // duration:
                'http://dream.tribe.nu/r3/off/?q=' + 'https://www.youtube.com/watch?v=' + resp.id, // mp3:
                'https://www.youtube.com/watch?v=' + resp.id, // mp32:
                resp.snippet.thumbnails.high.url, // poster:
                resp.snippet.thumbnails.high.url, // posterLarge:
                'YouTube', // source:
                resp.snippet.title, // title:
                resp.id // trackID:
            )
            hCallback(DCAPI.aResults)
          })
        } else if (source.toLowerCase().indexOf('soundcloud') > -1) {
          return axios.get('http://api.soundcloud.com/tracks/' + trackID + '?client_id=' + DCAPI.sScKey).then(function (resp) {
            resp = resp.data
            DCAPI.pushResult(
                resp.user.username, // artist:
                resp.user_id, // artistID:
                DCAPI.parseDate(resp.created_at), // created:
                resp.description, // description:
                DCAPI.secondstominutes(Math.floor(resp.duration / 1E3)), // duration:
                resp.stream_url + '?client_id=' + DCAPI.sScKey, // mp3:
                resp.permalink_url, // mp32:
                resp.artwork_url.replace('i1', 'i2').replace('-large', '-t300x300'),
                resp.artwork_url.replace('-large', '-t500x500'),
                'Soundcloud', // source:
                resp.title, // title:
                resp.id // trackID:
            )
            hCallback(DCAPI.aResults)
          })
        }
      },
      pushResult: function (artist, artistID, created, description, duration, mp3, mp32, poster, posterLarge, source, title, trackID) {
        DCAPI.aResults.push({
          artist: artist,
          artistID: artistID,
          created: created,
          description: created,
          mp3: mp3,
          mp32: mp32,
          poster: poster,
          posterLarge: posterLarge,
          source: source,
          title: title,
          trackID: trackID
        })
      },
      calcDate: function (a, b) {
        if (typeof b !== Object) {
          b = new Date(b)
        }

        var c = Math.floor(a.getTime() - b.getTime())
        var d = Math.floor(c / 864E5)
        var m = Math.floor(d / 31)
        var w = Math.floor(d / 7)
        var y = Math.floor(m / 12)
        if (!d) {
          return 'Today'
        }
        if (d === 1) {
          return 'Yesterday'
        }
        a = (y > 0 ? [y, ' year'] : (m > 0 ? [m, ' month'] : (w > 0 ? [w, ' week'] : [d, ' day'])))
        return a[0] + a[1] + (a[0] > 1 ? 's ago' : ' ago')
      },
      parseDate: function (str) {
        str = str.match(/^(\d{4})\/?-?(0[1-9]|1[0-2])\/?-?(0[1-9]|[12]\d|3[01])/)
        if (str) {
          str[0] = new Date(+str[1], +str[2] - 1, +str[3])
          if (str[0].getMonth() === +str[2] - 1) {
            return str[0]
          }
        }
        return undefined
      },
      sortDate: function (a, b) {
        a = new Date(a.created)
        b = new Date(b.created)

        return a > b ? -1 : a < b ? 1 : 0
      },
      str_pad_left: function (string, pad, length) {
        return ((new Array(length + 1)).join(pad) + string).slice(-length)
      },
      secondstominutes: function (time) {
        return DCAPI.str_pad_left(Math.floor(time / 60), '0', 2) + ':' + DCAPI.str_pad_left(time - Math.floor(time / 60) * 60, '0', 2)
      }
    }
    Object.defineProperty(Vue.prototype, '$DCAPI', { value: DCAPI })
  }
}
export default DCAPIPlug
