import axios from 'axios'
/* eslint-disable */
export
class DCAPIClass {
    constructor () {
      this.sYtKey = '***REMOVED***'
      this.sScKey = '***REMOVED***'
      this.sVimeoKey = '***REMOVED***'
      this.bRelated = ''
      this.iResultLimt = 48
      this.sQuery = ''
      this.iPage = ''
      this.aSource = []
      this.sArtist = ''
      this.aCallBack = []
      this.aResults = []
      this.ajaxList = []
      this.YTnextPageTokenString = ''
      this.nextPageToken = ''
    }
    
    uuidv4() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }

    searchInt(sQuery, iPage, aSource, sArtist, hCallback, bRelated, iLimit = 48) {
      var uid = this.uuidv4()
      this.iResultLimt = iLimit
      this.bRelated = bRelated
      this.sQuery = sQuery
      this.iPage = iPage
      this.aSource = aSource[0].toLowerCase() === 'all' ? ['mixcloud', 'soundcloud', 'youtube', 'vimeo'] : aSource
      this.sArtist = sArtist
      this.aCallBack[uid] = hCallback
      this.aResults = []
      this.ajaxList = []
      var self = this
      for (var idx in this.aSource) {
        this.ajaxList.push(this.search(this.aSource[idx]))
      }
      return axios.all(this.ajaxList).then(() => {
        this.aCallBack[uid](this.aResults)
        this.aResults = [] 
      })
    }

    search(source) {
      switch (source.toLowerCase()) {
        case 'mixcloud':
          return this.mc()
        case 'soundcloud':
          return this.sc()
        case 'youtube':
          return this.yt()
        case 'vimeo':
          return this.vim()
        default:
          console.log('!source', source)
          break
      }
    }

    mc() {
      var a
      if (this.sArtist !== '') {
        a = 'https://api.mixcloud.com/' + this.sArtist + '/cloudcasts?limit=12&offset=' + 8 * (this.page > 0 ? this.page : 1)
      } else {
        a = 'https://api.mixcloud.com/search/?type=cloudcast&limit=12&q=' + this.sQuery + '&offset=' + 8 * this.iPage + '&callback=?'
      }
      return axios.get(a).then(function (resp) {
        resp = resp.data.data
        for (var idx in resp) {
          this.pushResult(
            resp[idx].user.name,                                  // artist:
            resp[idx].user.username,                              // artistID:
            this.parseDate(resp[idx].created_time),              // created:
            '',                                                   // description:
            this.secondstominutes(resp[idx].audio_length),       // duration:
            'https://dream.tribe.nu/r3/off/?q=' + resp[idx].url,  // mp3:
            resp[idx].url,                                        // mp32:
            resp[idx].pictures.large,                             // poster:
            resp[idx].pictures.extra_large,                       // posterLarge:
            'MixCloud',                                           // source:
            resp[idx].name,                                       // title:
            ''                                                    // trackID:
          )
        }
      })
    }

    sc() {
      var a
      if (typeof (this.bRelated) !== 'undefined') {
        a = 'https://api.soundcloud.com/tracks/' + this.sArtist + '/related?client_id=' + this.sScKey
      } else if (this.sArtist !== '') {
        a = 'https://api.soundcloud.com/users/' + this.sArtist + '/tracks.json?&limit=12&offset=' + 12 * this.iPage + '&client_id=' + this.sScKey
      } else {
        a = 'https://api.soundcloud.com/tracks.json?q=' + encodeURIComponent(this.sQuery) + '&limit=12&offset=' + 12 * this.iPage + '&client_id=' + this.sScKey
      }
      return axios.get(a).then(function (resp) {
        try {
          var img, img2
          resp = resp.data
          for (var idx in resp) {
            if (!resp[idx].artwork_url) {
              resp[idx].artwork_url = resp[idx].user.avatar_url
            }
            img = resp[idx].artwork_url.replace('i1', 'i2').replace('-large', '-t300x300')
            img2 = resp[idx].artwork_url.replace('-large', '-t500x500')
            this.pushResult(
              resp[idx].user.username,                                       // artist:
              resp[idx].user_id,                                             // artistID:
              this.parseDate(resp[idx].created_at),                         // created:
              resp[idx].description,                                         // description:
              this.secondstominutes(Math.floor(resp[idx].duration / 1E3)),  // duration:
              resp[idx].stream_url + '?client_id=' + this.sScKey,           // mp3:
              resp[idx].permalink_url,                                       // mp32:
              img,                                                           // poster:
              img2,                                                          // posterLarge:
              'SoundCloud',                                                  // source:
              resp[idx].title,                                               // title:
              resp[idx].id                                                   // trackID:
            )
          }
        } catch (e) {
          return
        }
      })
    }

    yt() {
      if (this.iPage === 0) {
        this.YTnextPageTokenString = ''
      } else if (!this.nextPageToken) {
        return this.error()
      } else {
        this.YTnextPageTokenString = '&pageToken=' + this.nextPageToken
      }
      var a
      if (this.bRelated) {
        a = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=' + this.iResultLimt + '&relatedToVideoId=' + this.sArtist + '&type=video&key=' + this.sYtKey
      } else if (this.sArtist === '') {
        a = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=' + this.iResultLimt + '&type=video&q=' + this.sQuery + '&key=' + this.sYtKey + this.YTnextPageTokenString
      } else {
        a = 'https://www.googleapis.com/youtube/v3/search?part=snippet&order=date&maxResults=' + this.iResultLimt + '&type=video&channelId=' + this.sArtist + '&key=' + this.sYtKey + this.YTnextPageTokenString
      }
      return axios.get(a).then((resp) =>   {
        var z = ''
        try {
          this.nextPageToken = resp.data.nextPageToken
          resp = resp.data.items
          for (var idx in resp) {
            z = 'https://www.youtube.com/watch?v=' + resp[idx].id.videoId
            this.pushResult(
              resp[idx].snippet.channelTitle,                  // artist:
              resp[idx].snippet.channelId,                     // artistID:
              this.parseDate(resp[idx].snippet.publishedAt),  // created:
              resp[idx].snippet.description,                   // description:
              '',                                              // duration:
              'https://dream.tribe.nu/r3/off/?q=' + z,         // mp3:
              z,                                               // mp32:
              resp[idx].snippet.thumbnails.high.url,           // poster:
              resp[idx].snippet.thumbnails.high.url,           // posterLarge:
              'YouTube',                                       // source:
              resp[idx].snippet.title,                         // title:
              resp[idx].id.videoId                             // trackID:
            )
          }
        } catch (e) {
          this.YTnextPageToken = ''
          console.log('yt error', e)
          return
        }
      })
    }

    vim() {
      var a
      if (this.sArtist !== 'undefined') {
        a = 'https://api.vimeo.com/videos?page=' + (this.iPage + 1) + '&per_page=12&query=' + this.sQuery + '&sort=relevant&access_token=' + this.sVimeoKey
      } else {
        a = 'https://api.vimeo.com/users/' + this.sArtist + '/videos?page=' + (this.iPage + 1) + '&per_page=12&sort=date&access_token=' + this.sVimeoKey
      }
      return axios.get(a).then(function (resp) {
        resp = resp.data.data
        for (var idx in resp) {
          this.pushResult(
            resp[idx].user.name,                                                  // artist:
            resp[idx].user.uri.replace(/\/users\/(.*?)/ig, 'user'),               // artistID:
            this.parseDate(resp[idx].user.created_time),                         // created:
            resp[idx].description,                                                // description:
            this.secondstominutes(resp[idx].duration),                           // duration:
            'https://dream.tribe.nu/r3/off/?q=' + resp[idx].link,                 // mp3:
            resp[idx].link,                                                       // mp32:
            resp[idx].pictures.sizes[2].link,                                     // poster:
            resp[idx].pictures.sizes[resp[idx].pictures.sizes.length - 1].link,   // posterLarge:
            'vimeo',                                                              // source:
            resp[idx].name,                                                       // title:
            '' // trackID:
          )
        }
      })
    }

    getAudio(url, hCallback) {
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
    }

    getArtistInfo(artistID, source, hCallback) {
      if (source.toLowerCase().indexOf('youtube') > -1) {
        return axios.get('https://www.googleapis.com/youtube/v3/channels?part=snippet&id=' + artistID + '&key=' + this.sYtKey).then(hCallback)
      } else if (source.toLowerCase().indexOf('soundcloud') > -1) {
        return axios.get('https://api.soundcloud.com/users/' + artistID + '?client_id=' + this.sScKey).then(hCallback)
      }
    }

    getSongInfo(trackID, source, hCallback) {
      this.aResults = []
      if (source.toLowerCase().indexOf('youtube') > -1) {
        return axios.get('https://www.googleapis.com/youtube/v3/videos?part=snippet&id=' + trackID + '&key=' + this.sYtKey).then(function (resp) {
          resp = resp.data.items[0]
          this.pushResult(
            resp.snippet.channelTitle,                                                          // artist:
            resp.snippet.channelId,                                                             // artistID:
            this.parseDate(resp.snippet.publishedAt),                                          // created:
            resp.snippet.description,                                                           // description:
            '',                                                                                 // duration:
            'http://dream.tribe.nu/r3/off/?q=' + 'https://www.youtube.com/watch?v=' + resp.id,  // mp3:
            'https://www.youtube.com/watch?v=' + resp.id,                                       // mp32:
            resp.snippet.thumbnails.high.url,                                                   // poster:
            resp.snippet.thumbnails.high.url,                                                   // posterLarge:
            'YouTube',                                                                          // source:
            resp.snippet.title,                                                                 // title:
            resp.id                                                                             // trackID:
          )
          hCallback(this.aResults)
        })
      } else if (source.toLowerCase().indexOf('soundcloud') > -1) {
        return axios.get('http://api.soundcloud.com/tracks/' + trackID + '?client_id=' + this.sScKey).then(function (resp) {
          resp = resp.data
          this.pushResult(
            resp.user.username,                                                     // artist:
            resp.user_id,                                                           // artistID:
            this.parseDate(resp.created_at),                                       // created:
            resp.description,                                                       // description:
            this.secondstominutes(Math.floor(resp.duration / 1E3)),                // duration:
            resp.stream_url + '?client_id=' + this.sScKey,                         // mp3:
            resp.permalink_url,                                                     // mp32:
            resp.artwork_url.replace('i1', 'i2').replace('-large', '-t300x300'),    // poster:
            resp.artwork_url.replace('-large', '-t500x500'),                        // posterLarge:
            'Soundcloud',                                                           // source:
            resp.title,                                                             // title:
            resp.id                                                                 // trackID:
          )
          hCallback(this.aResults)
        })
      }
    }

    pushResult(artist, artistID, created, description, duration, mp3, mp32, poster, posterLarge, source, title, trackID) {
      this.aResults.push({
        artist: artist,
        artistID: artistID,
        created: created,
        description: description,
        duration: duration,
        mp3: mp3,
        mp32: mp32,
        poster: poster,
        posterLarge: posterLarge,
        source: source,
        title: title,
        trackID: trackID
      })
    }

    calcDate(a, b) {
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
    }

    parseDate(str) {
      str = str.match(/^(\d{4})\/?-?(0[1-9]|1[0-2])\/?-?(0[1-9]|[12]\d|3[01])/)
      if (str) {
        str[0] = new Date(+str[1], +str[2] - 1, +str[3])
        if (str[0].getMonth() === +str[2] - 1) {
          return str[0]
        }
      }
      return undefined
    }

    sortDate(a, b) {
      a = new Date(a.created)
      b = new Date(b.created)

      return a > b ? -1 : a < b ? 1 : 0
    }

    str_pad_left(string, pad, length) {
      return ((new Array(length + 1)).join(pad) + string).slice(-length)
    }

    secondstominutes(time) {
      return this.str_pad_left(Math.floor(time / 60), '0', 2) + ':' + this.str_pad_left(time - Math.floor(time / 60) * 60, '0', 2)
    }

    error() {
      this.hCallback([])
    }
}

var DCAPIPlug = {
  install (Vue, options) {
    Object.defineProperty(Vue.prototype, '$DCAPI', { value: new DCAPIClass() })
  }
}
export default DCAPIPlug
