import axios from 'axios'
// import bandcampScraper from 'bandcamp-scraper'
/* eslint-disable */
// var bandcamp = require('bandcamp-scraper')
// var artistUrl = 'http://musique.coeurdepirate.com/';
// console.log(bandcamp.search)
// bandcamp.getAlbumUrls(artistUrl, function(error, albumUrls) {
//   if (error) {
//     console.log('error', error);
//   } else {
//     console.log('success', albumUrls);
//   }
// });
// console.log(bandcamp.search)
export
class DCAPIClass {
  constructor () {
    
    // this.bcBase = 'https://dc-nodejs-backend-xdgwdxqavi.now.sh/' old
    // this.bcBase = 'http://localhost:8000/'
    this.bcBase = 'https://dc-nodejs-backend-ftjhiqutmh.now.sh/'
    this.sYtKey = '***REMOVED***'
    this.sScKey = '***REMOVED***'
    this.sVimeoKey = '***REMOVED***'
    this.YTnextPageTokenString = 0
    this.nextPageToken = 0
    this.SCnextPageToken = 0
    this.aQuery = []
  }

  searchInt (sQuery, iPage, aSource, sArtist, hCallback, bRelated, iLimit = 50) {
    if (!iPage) {
      this.SCnextPageToken = ''
      this.nextPageToken = ''
      this.YTnextPageTokenString = ''
    }
    var uid = performance.now()
    this.aQuery[uid] = {
      aAjax: [],
      aResult: [],
      sToken: 0,
      hCallback: hCallback,
      iLimit: iLimit,
      sQuery: sQuery,
      sArtist: sArtist,
      bRelated: bRelated,
      iPage: iPage
    }
    aSource = aSource[0].toLowerCase() === 'all' ? ['mixcloud', 'soundcloud', 'youtube', 'vimeo'] : aSource
    for (var idx in aSource) {
      this.aQuery[uid].aAjax.push(this.search(aSource[idx], uid))
    }
    return axios.all(this.aQuery[uid].aAjax).then(() => {
      this.aQuery[uid].hCallback(this.aQuery[uid].aResult)
      delete this.aQuery[uid]
    })
  }

  search (source, uid) {
    switch (source.toLowerCase()) {
      case 'bandcamp':
        return this.bc(uid)
      case 'mixcloud':
        return this.mc(uid)
      case 'soundcloud':
        return this.sc(uid)
      case 'youtube':
        return this.yt(uid)
      case 'vimeo':
        return this.vim(uid)
      default:
        console.log('!source', source)
        break
    }
  }
  bc (uid) {
    if (this.aQuery[uid].iPage && this.aQuery[uid].sArtist) {
      return
    }
    let url = this.aQuery[uid].sArtist
      ? this.bcBase + `api/v2/getartist/${encodeURIComponent(atob(this.aQuery[uid].sArtist))}/`
      : this.bcBase + `api/v2/albumswithtag/${this.aQuery[uid].sQuery}/${this.aQuery[uid].iPage + 1}`
    return axios.get(url).then((resp) => {
      resp = resp.data
      for (var idx in resp) {
        this.pushResult(
          uid,                                                  // uid:
          resp[idx].artist,                                     // artist:
          btoa(resp[idx].artistID),                             // artistID:
          resp[idx].created,                                    // created:
          '',                                                   // description:
          this.secondstominutes(resp[idx].duration),            // duration:
          'https://dream.tribe.nu/r3/off/?q=' + resp[idx].mp32, // mp3:
          resp[idx].mp32,                                       // mp32:
          resp[idx].poster,                                     // poster:
          resp[idx].poster,                                     // posterLarge:
          'Bandcamp',                                           // source:
          resp[idx].title,                                      // title:
          resp[idx].mp32                                        // trackID:
        )
      }
    })
  }

  mc (uid) {
    var a
    if (this.aQuery[uid].sArtist !== '') {
      a = 'https://api.mixcloud.com/' + this.aQuery[uid].sArtist + '/cloudcasts/?limit=' + this.aQuery[uid].iLimit + '&offset=' + this.aQuery[uid].iLimit * (this.aQuery[uid].iPage > 0 ? this.aQuery[uid].iPage : 0)
    } else {
      a = 'https://api.mixcloud.com/search/?type=cloudcast&limit=' + this.aQuery[uid].iLimit + '&q=' + this.aQuery[uid].sQuery + '&offset=' + this.aQuery[uid].iLimit * this.aQuery[uid].iPage
    }
    return axios.get(a).then((resp) => {
      resp = resp.data.data
      for (var idx in resp) {
        this.pushResult(
          uid,                                                  // uid:
          resp[idx].user.name,                                  // artist:
          resp[idx].user.username,                              // artistID:
          this.parseDate(resp[idx].created_time),               // created:
          '',                                                   // description:
          this.secondstominutes(resp[idx].audio_length),        // duration:
          'https://dream.tribe.nu/r3/off/?q=' + resp[idx].url,  // mp3:
          resp[idx].url,                                        // mp32:
          resp[idx].pictures.large,                             // poster:
          resp[idx].pictures.extra_large,                       // posterLarge:
          'MixCloud',                                           // source:
          resp[idx].name,                                       // title:
          encodeURIComponent(resp[idx].key)                     // trackID:
        )
      }
    })
  }

  sc (uid) {
    var a

    if (this.aQuery[uid].bRelated) {
      // a = 'https://api.soundcloud.com/tracks/' + this.aQuery[uid].sArtist + '/related?linked_partitioning=1&limit=' + this.aQuery[uid].iLimit + 'client_id=' + this.sScKey
      a = 'https://api.soundcloud.com/tracks/' + this.aQuery[uid].sArtist + '/related?linked_partitioning=1&limit=' + this.aQuery[uid].iLimit + '&client_id=' + this.sScKey
    } else if (this.aQuery[uid].sArtist) {
      a = 'https://api.soundcloud.com/users/' + this.aQuery[uid].sArtist + '/tracks.json?linked_partitioning=1&limit=' + this.aQuery[uid].iLimit + '&client_id=' + this.sScKey
    } else {
      a = 'https://api.soundcloud.com/tracks.json?linked_partitioning=1&limit=' + this.aQuery[uid].iLimit + '&q=' + encodeURIComponent(this.aQuery[uid].sQuery) + '&client_id=' + this.sScKey
    }
    if (this.SCnextPageToken) {
      a = this.SCnextPageToken
      // console.log('using sc token', this.SCnextPageToken)
    } else if (!this.SCnextPageToken && this.aQuery[uid].iPage > 0) {
      // console.log('sc no token, DIE', this.SCnextPageToken)
      return
    }
    return new Promise((resolve, reject) => {
      axios.get(a).then((resp) => {
        var img, img2
        if (resp.data.next_href) {
          // console.log('next token', resp.data.next_href)
          this.SCnextPageToken = resp.data.next_href
          this.SCnextPageToken = resp.data.next_href
        } else {
          this.SCnextPageToken = 0
        }

        resp = resp.data.collection
        for (var idx in resp) {
          if (!resp[idx].artwork_url) {
            resp[idx].artwork_url = resp[idx].user.avatar_url
          }
          img = resp[idx].artwork_url.replace('i1', 'i2').replace('-large', '-t300x300')
          img2 = resp[idx].artwork_url.replace('-large', '-t500x500')
          this.pushResult(
              uid,                                                           // uid:
              resp[idx].user.username,                                       // artist:
              resp[idx].user_id,                                             // artistID:
              this.parseDate(resp[idx].created_at),                          // created:
              resp[idx].description,                                         // description:
              this.secondstominutes(Math.floor(resp[idx].duration / 1E3)),   // duration:
              resp[idx].stream_url + '?client_id=' + this.sScKey,            // mp3:
              resp[idx].permalink_url,                                       // mp32:
              img,                                                           // poster:
              img2,                                                          // posterLarge:
              'SoundCloud',                                                  // source:
              resp[idx].title,                                               // title:
              resp[idx].id                                                   // trackID:
            )
        }
        if (this.aQuery[uid].aResult.length < this.aQuery[uid].iLimit && this.SCnextPageToken) {
            // console.log('sc error', this.aQuery[uid].aResult.length, 'was looking for', this.aQuery[uid].iLimit)
          this.sc(uid).then(() => {
            this.aQuery[uid].aResult = this.uniqueArray(this.aQuery[uid].aResult)
            resolve()
          })
        } else {
          this.aQuery[uid].aResult = this.uniqueArray(this.aQuery[uid].aResult)
          // console.log('sc success', this.aQuery[uid].aResult.length, 'was looking for', this.aQuery[uid].iLimit)
          resolve()
        }
      }).catch((err) => {
        reject(err)
      })
    })
  }

  yt (uid) {
    this.YTnextPageTokenString = this.nextPageToken ? '&pageToken=' + this.nextPageToken : ''
    if (!this.YTnextPageTokenString && this.aQuery[uid].iPage > 1) {
      return
    }
    var a
    if (this.aQuery[uid].bRelated) {
      a = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${this.aQuery[uid].iLimit}&relatedToVideoId=${this.aQuery[uid].sArtist}&type=video&key=${this.sYtKey}`
    } else if (this.aQuery[uid].sArtist === '') {
      a = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${this.aQuery[uid].iLimit}&type=video&q=${this.aQuery[uid].sQuery}&key=${this.sYtKey}${this.YTnextPageTokenString}`
    } else {
      a = `https://www.googleapis.com/youtube/v3/search?part=snippet&order=date&maxResults=${this.aQuery[uid].iLimit}&type=video&channelId=${this.aQuery[uid].sArtist}&key=${this.sYtKey}${this.YTnextPageTokenString}`
    }
    return new Promise((resolve, reject) => {
        // get videos from search or channel or related
        axios.get(a).then((resp) => {
        var z = ''
        try {
          this.nextPageToken = resp.data.nextPageToken
          resp = resp.data.items
          var x = []
          for (var idx in resp) {
            x.push(resp[idx].id.videoId)
          }
          if (x.length) {
            axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${x.join(',')}&part=contentDetails&key=${this.sYtKey}`).then((resp2) =>{
              var x = []
              for (var i in resp2.data.items) {
                x[resp2.data.items[i].id] = this.timeHMS(resp2.data.items[i].contentDetails.duration)
              }
              for (var i in resp) {
                this.pushResult(
                  uid,                                                                                      // uid:
                  resp[i].snippet.channelTitle,                                                             // artist:
                  resp[i].snippet.channelId,                                                                     // artistID:
                  this.parseDate(resp[i].snippet.publishedAt),                                              // created:
                  resp[i].snippet.description,                                                              // description:
                  x[resp[i].id.videoId],                                                                    // duration:
                  `https://dream.tribe.nu/r3/off/?q=https://www.youtube.com/watch?v=${resp[i].id.videoId}`, // mp3:
                  `https://www.youtube.com/watch?v=${resp[i].id.videoId}`,                                       // mp32:
                  resp[i].snippet.thumbnails.medium.url,                                                    // poster:
                  resp[i].snippet.thumbnails.high.url,                                                      // posterLarge:
                  'YouTube',                                                                                // source:
                  resp[i].snippet.title,                                                                    // title:
                  resp[i].id.videoId                                                                        // trackID:
                )
              }
              // console.log('resolving', resp)
              resolve()
            })
          }
        } catch (e) {
          this.YTnextPageToken = ''
          // console.log('yt error', e)
          return
        }
      })
    })
  }

  vim (uid) {
    var a
    if (this.aQuery[uid].sArtist !== 'undefined') {
      a = 'https://api.vimeo.com/videos?page=' + (this.aQuery[uid].iPage + 1) + '&per_page=12&query=' + this.aQuery[uid].sQuery + '&sort=relevant&access_token=' + this.sVimeoKey
    } else {
      a = 'https://api.vimeo.com/users/' + this.aQuery[uid].sArtist + '/videos?page=' + (this.aQuery[uid].iPage + 1) + '&per_page=12&sort=date&access_token=' + this.sVimeoKey
    }

    return axios.get(a).then((resp) => {
      resp = resp.data.data
      for (var idx in resp) {
        this.pushResult(
          uid,                                                                  // uid:
          resp[idx].user.name,                                                  // artist:
          resp[idx].user.uri.replace(/\/users\/(.*?)/ig, 'user'),               // artistID:
          this.parseDate(resp[idx].user.created_time),                          // created:
          resp[idx].description,                                                // description:
          this.secondstominutes(resp[idx].duration),                            // duration:
          'https://dream.tribe.nu/r3/off/?q=' + resp[idx].link,                 // mp3:
          resp[idx].link,                                                       // mp32:
          resp[idx].pictures.sizes[2].link,                                     // poster:
          resp[idx].pictures.sizes[resp[idx].pictures.sizes.length - 1].link,   // posterLarge:
          'vimeo',                                                              // source:
          resp[idx].name,                                                       // title:
          resp[idx].link                                                        // trackID:
        )
      }
    })
  }

  getAudio (url, hCallback) {
    var ax = axios.get('https://www.saveitoffline.com/process/?type=audio&url=' + url)
    ax.then((resp) => {
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

  getArtistInfo (artistID, source, hCallback) {
    if (source.toLowerCase().indexOf('youtube') > -1) {
      return axios.get('https://www.googleapis.com/youtube/v3/channels?part=snippet&id=' + artistID + '&key=' + this.sYtKey).then(hCallback)
    } else if (source.toLowerCase().indexOf('soundcloud') > -1) {
      return axios.get('https://api.soundcloud.com/users/' + artistID + '?client_id=' + this.sScKey).then(hCallback)
    } else if (source.toLowerCase().indexOf('mixcloud') > -1) {
      return axios.get('https://api.mixcloud.com/' + artistID + '/').then(hCallback)
    } else if (source.toLowerCase().indexOf('bandcamp') > -1) {
      return axios.get(this.bcBase + 'api/v2/getartistinfo/' + encodeURIComponent(atob(artistID))).then(hCallback)
    } else {
      return (Promise.resolve(''))
    }
  }
  getSongDescription (trackID, source, hCallback) {
    var uid = Date.now()
    this.aQuery[uid] = {aResult: [], hCallback: hCallback}
    return axios.get('https://www.googleapis.com/youtube/v3/videos?part=snippet&id=' + trackID + '&fields=items/snippet/description&key=' + this.sYtKey).then((resp) => {
      hCallback(resp.data)
    })
  }
  //
  getSongInfo (trackID, source, hCallback) {
    var uid = Date.now()
    this.aQuery[uid] = {aResult: [], hCallback: hCallback}

    if (source.toLowerCase().indexOf('youtube') > -1) {
      return axios.get('https://www.googleapis.com/youtube/v3/videos?part=snippet&id=' + trackID + '&key=' + this.sYtKey).then((resp) => {
        resp = resp.data.items[0]
        this.pushResult(
          uid,
          resp.snippet.channelTitle,                                                          // artist:
          resp.snippet.channelId,                                                             // artistID:
          this.parseDate(resp.snippet.publishedAt),                                           // created:
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
        this.aQuery[uid].hCallback(this.aQuery[uid].aResult)
        delete this.aQuery[uid]
      })
    } else if (source.toLowerCase().indexOf('soundcloud') > -1) {
      return axios.get('https://api.soundcloud.com/tracks/' + trackID + '?client_id=' + this.sScKey).then((resp) => {
        resp = resp.data
        // alert(resp.data)
        // console.log(resp)
        this.pushResult(
          uid,
          resp.user.username,                                                     // artist:
          resp.user_id,                                                           // artistID:
          this.parseDate(resp.created_at),                                        // created:
          resp.description,                                                       // description:
          this.secondstominutes(Math.floor(resp.duration / 1E3)),                 // duration:
          resp.stream_url + '?client_id=' + this.sScKey,                          // mp3:
          resp.permalink_url,                                                     // mp32:
          resp.artwork_url.replace('i1', 'i2').replace('-large', '-t300x300'),    // poster:
          resp.artwork_url.replace('-large', '-t500x500'),                        // posterLarge:
          'SoundCloud',                                                           // source:
          resp.title,                                                             // title:
          resp.id                                                                 // trackID:
        )
        this.aQuery[uid].hCallback(this.aQuery[uid].aResult)
        delete this.aQuery[uid]
      })
    } else if (source.toLowerCase().indexOf('mixcloud') > -1) {
      return axios.get('https://api.mixcloud.com' + trackID).then((resp) => {
        resp = resp.data
        this.pushResult(
          uid,
          resp.user.name,                                                         // artist:
          resp.user.key,                                                          // artistID:
          this.parseDate(resp.created_time),                                      // created:
          resp.description,                                                       // description:
          this.secondstominutes(resp.audio_length),                               // duration: ??????????
          resp.url,                                                               // mp3:
          resp.url,                                                               // mp32:
          resp.pictures.small,                                                    // poster:
          resp.pictures.large,                                                    // posterLarge:
          'MixCloud',                                                             // source:
          resp.name,                                                              // title:
          resp.key                                                                // trackID:
        )
        this.aQuery[uid].hCallback(this.aQuery[uid].aResult)
        delete this.aQuery[uid]
      })
    }
  }

  pushResult (uid, artist, artistID, uploaded, description, duration, mp3, mp32, poster, posterLarge, source, title, trackID) {
    this.aQuery[uid].aResult.push({
      artist: artist,
      artistID: artistID,
      description: description,
      duration: duration,
      mp3: mp3,
      mp32: mp32,
      poster: poster,
      posterLarge: posterLarge,
      source: source,
      title: title,
      uploaded: uploaded,
      trackID: trackID
    })
  }

  calcDate (a, b) {
    if (!a) {
      a = new Date()
    }
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
      return '1 day'
    }
    a = (y > 0 ? [y, ' year'] : (m > 0 ? [m, ' month'] : (w > 0 ? [w, ' week'] : [d, ' day'])))
    return a[0] + a[1] + (a[0] > 1 ? 's' : '')
  }

  parseDate (str) {
    str = str.match(/^(\d{4})\/?-?(0[1-9]|1[0-2])\/?-?(0[1-9]|[12]\d|3[01])/)
    if (str) {
      str[0] = new Date(+str[1], +str[2] - 1, +str[3])
      if (str[0].getMonth() === +str[2] - 1) {
        return str[0]
      }
    }
    return undefined
  }

  sortDate (a, b) {
    a = new Date(a.uploaded)
    b = new Date(b.uploaded)

    return a > b ? -1 : a < b ? 1 : 0
  }

  str_pad_left (string, pad, length) {
    return ((new Array(length + 1)).join(pad) + string).slice(-length)
  }

  uniqueArray (array) {
    var a = array.concat()
    for (var i = 0; i < a.length; i++) {
      for (var j = i + 1; j < a.length; j++) {
        if (a[i].mp32 === a[j].mp32) {
          a.splice(j--, 1)
        }
      }
    }
    return a
  }

  secondstominutes1 (time) {
    return this.str_pad_left(Math.floor(time / 60), '0', 2) + ':' + this.str_pad_left(time - Math.floor(time / 60) * 60, '0', 2)
  }

  error (uid) {
    this.aQuery[uid].hCallback(this.aQuery[uid].aResult)
  }
  secondstominutes (secs) {
    var sec_num = parseInt(secs, 10)
    var hours   = Math.floor(sec_num / 3600) % 24
    var minutes = Math.floor(sec_num / 60) % 60
    var seconds = sec_num % 60
    return [hours,minutes,seconds]
        .map(v => v < 10 ? "0" + v : v)
        .filter((v,i) => v !== "00" || i > 0)
        .join(":")
  }

  timeHMS(s) {
    var T = 'date';
    var d = 8.64e7;
    var h = d/24;
    var m = h/60;
    var multipliers = {date: {y:d*365.25, m:d*(365*4+1)/48, d:d},
                       time: {h:h, m:m, s:1000}};
    var re = /[^a-z]+|[a-z]/gi;

    // Tokenise with match, then process with reduce
    var time = s.toLowerCase().match(/p|t|\d+\.?\d*[ymdhs]/ig).reduce(function(ms, v) {
      if (v == 'p') return ms;
      if (v == 't') {
        T = 'time';
        return ms;
      }
      var b = v.match(re);
      return ms + b[0] * multipliers[T][b[1]];
    }, 0);

    // Converting ms to h:mm:ss should be a separate function
    return this.secondstominutes(time / 1000)
    // return ((time/h|0) > 0 ? (time/h|0) + ":":"") + ('0' + ((time%h / m) |0)).slice(-2) + ':' + ('0' + (time%m/1000).toFixed(3)).slice(-6).slice(0,-4);
  }

}

export default {
  install (Vue, options) {
    Object.defineProperty(Vue.prototype, '$DCAPI', { value: new DCAPIClass() })
  }
}
