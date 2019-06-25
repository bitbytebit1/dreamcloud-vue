/* eslint-disable */
import axios from 'axios'
var entities = {
  'amp': '&',
  'apos': '\'',
  '#x27': '\'',
  '#x2F': '/',
  '#39': '\'',
  '#47': '/',
  'lt': '<',
  'gt': '>',
  'nbsp': ' ',
  'quot': '"'
}
export
class DCAPIClass {
  constructor() {
    // this.bcBase = 'https://dc-nodejs-backend-ftjhiqutmh.now.sh/' old
    this.bcBase = 'https://dc-nodejs-backend-ftjhiqutmh.now.sh/'
    // if(process.env.NODE_ENV == 'production'){
    // RESTRICTED
    this.sYtKey = '***REMOVED***'
    // } else {
      // UNRESTRICTED
    this.sYtKey = '***REMOVED***'
    // }
    this.sScKey = '***REMOVED***'
    this.sVimeoKey = '***REMOVED***'
    this.YTnextPageTokenString = 0
    this.YTCommentNext = 0
    this.nextPageToken = 0
    this.SCnextPageToken = 0
    this.aQuery = []
  }

  searchInt(sQuery, iPage, aSource, sArtist, hCallback, bRelated, iLimit = 50, bArtist = false) {
    // if (bRelated && aSource[0].toLowerCase() === 'bandcamp') {
    //   return
    // }
    if (!iPage) {
      this.SCnextPageToken = ''
      this.nextPageToken = ''
      this.YTnextPageTokenString = ''
    }
    var uid = this.genUID()
    // var uid = Date.now() + Math.random()
    // var uid = performance.now() // Caused problems on firefox 
    this.aQuery[uid] = {
      aAjax: [],
      aResult: [],
      sToken: 0,
      hCallback: hCallback,
      iLimit: iLimit,
      sQuery: sQuery,
      sArtist: sArtist,
      bRelated: bRelated,
      bArtist: bArtist,
      iPage: iPage
    }
    aSource = aSource[0].toLowerCase() === 'all' ? ['youtube', 'mixcloud', 'soundcloud', 'vimeo'] : aSource
    for (var idx in aSource) {
      this.aQuery[uid].aAjax.push(this.search(aSource[idx], uid))
    }
    return axios.all(this.aQuery[uid].aAjax).then(() => {
      this.aQuery[uid].hCallback(this.aQuery[uid].aResult)
      delete this.aQuery[uid] // not necessary?
    })
  }

  search(source, uid) {
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
        // console.log('!source', source)
        break
    }
  }

  bc(uid) {
    if (this.aQuery[uid].bRelated) {
      return Promise.resolve()
    }
    if (this.aQuery[uid].iPage && this.aQuery[uid].sArtist) {
      return
    }
    let url = this.aQuery[uid].sArtist ?
      this.bcBase + `api/v2/getartist/${encodeURIComponent(atob(this.aQuery[uid].sArtist))}/` :
      this.bcBase + `api/v2/albumswithtag/${this.aQuery[uid].sQuery}/${this.aQuery[uid].iPage + 1}`
    return axios.get(url).then((resp) => {
      resp = resp.data
      for (var idx in resp) {
        this.pushResult(
          uid, // uid:
          resp[idx].artist, // artist:
          btoa(resp[idx].artistID), // artistID:
          resp[idx].created, // created:
          '', // description:
          this.secondstominutes(resp[idx].duration), // duration:
          'https://dream.tribe.nu/r3/off/?q=' + resp[idx].mp32, // mp3:
          resp[idx].mp32, // mp32:
          resp[idx].poster, // poster:
          resp[idx].poster, // posterLarge:
          'Bandcamp', // source:
          resp[idx].title, // title:
          resp[idx].mp32 // trackID:
        )
      }
    })
  }

  mc(uid) {
    if (this.aQuery[uid].bRelated) {
      return Promise.resolve()
    }
    var a
    if (this.aQuery[uid].sArtist !== '') {
      a = 'https://api.mixcloud.com/' + this.aQuery[uid].sArtist + '/cloudcasts/?limit=' + this.aQuery[uid].iLimit + '&offset=' + this.aQuery[uid].iLimit * (this.aQuery[uid].iPage > 0 ? this.aQuery[uid].iPage : 0)
    } else if (this.aQuery[uid].bArtist) {
      a = 'https://api.mixcloud.com/search/?type=user&limit=' + this.aQuery[uid].iLimit + '&q=' + this.aQuery[uid].sQuery + '&offset=' + this.aQuery[uid].iLimit * this.aQuery[uid].iPage
    } else {
      a = 'https://api.mixcloud.com/search/?type=cloudcast&limit=' + this.aQuery[uid].iLimit + '&q=' + this.aQuery[uid].sQuery + '&offset=' + this.aQuery[uid].iLimit * this.aQuery[uid].iPage
    }
    return axios.get(a).then((resp) => {
      resp = resp.data.data
      for (var idx in resp) {
        if(this.aQuery[uid].bArtist) {
          this.pushResult(
            uid, // uid:
            resp[idx].name, // artist:
            resp[idx].username, // artistID:
            null, // created:
            '', // description:
            'MixCloud channel', // duration:
            '', // mp3:
            '', // mp32:
            resp[idx].pictures.large, // poster:
            resp[idx].pictures.extra_large, // posterLarge:
            'MixCloud', // source:
            resp[idx].name, // title:
            '' // trackID:
          )  
        } else {
          this.pushResult(
            uid, // uid:
            resp[idx].user.name, // artist:
            resp[idx].user.username, // artistID:
            this.parseDate(resp[idx].created_time), // created:
            '', // description:
            this.secondstominutes(resp[idx].audio_length), // duration:
            'https://dream.tribe.nu/r3/off/?q=' + resp[idx].url, // mp3:
            resp[idx].url, // mp32:
            resp[idx].pictures.large, // poster:
            resp[idx].pictures.extra_large, // posterLarge:
            'MixCloud', // source:
            resp[idx].name, // title:
            encodeURIComponent(resp[idx].key) // trackID:
          )
        }
      }
    }).catch((er) => {
      console.log(er)
    })
  }

  sc(uid) {
    var a

    if (this.aQuery[uid].bRelated) {
      // a = 'https://api.soundcloud.com/tracks/' + this.aQuery[uid].sArtist + '/related?linked_partitioning=1&limit=' + this.aQuery[uid].iLimit + 'client_id=' + this.sScKey
      a = 'https://api.soundcloud.com/tracks/' + this.aQuery[uid].sArtist + '/related?linked_partitioning=1&limit=' + this.aQuery[uid].iLimit + '&client_id=' + this.sScKey
    } else if (this.aQuery[uid].bArtist) {
      a = 'https://api.soundcloud.com/users.json?q=' + this.aQuery[uid].sQuery +'&linked_partitioning=1&limit=' + this.aQuery[uid].iLimit + '&client_id=' + this.sScKey
      // https://api.soundcloud.com/users.json?linked_partitioning=1&limit=50&q=joyner%20lucas&client_id=***REMOVED***
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
      return Promise.resolve()
    }
    return new Promise((resolve) => {
      axios.get(a).then((resp) => {
        // console.log(a, resp)
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

          if (this.aQuery[uid].bArtist) {
            this.pushResult(
              uid, // uid:
              resp[idx].username, // artist:
              resp[idx].id, // artistID:
              this.parseDate(resp[idx].last_modified), // created:
              resp[idx].description, // description:
              'SoundCloud channel', // duration:
              resp[idx].stream_url + '?client_id=' + this.sScKey, // mp3:
              resp[idx].permalink_url, // mp32:
              resp[idx].avatar_url.replace('i1', 'i2').replace('-large', '-t300x300'), // poster:
              resp[idx].avatar_url.replace('-large', '-t500x500'), // posterLarge:
              'SoundCloud', // source:
              resp[idx].username // title:
            )
          } else {
            // Replace missing images with user avatar
            if (!resp[idx].artwork_url && resp[idx].user.avatar_url) {
              img = resp[idx].user.avatar_url.replace('i1', 'i2').replace('-large', '-t300x300')
              img2 = resp[idx].user.avatar_url.replace('-large', '-t500x500')  
            } else if (!resp[idx].user.avatar_url && !resp[idx].user.avatar_url) {
              img = img2 = './img/icons/no-image.png'
            } else  {
              img = resp[idx].artwork_url.replace('i1', 'i2').replace('-large', '-t300x300')
              img2 = resp[idx].artwork_url.replace('-large', '-t500x500')  
            }
            this.pushResult(
              uid, // uid:
              resp[idx].user.username, // artist:
              resp[idx].user_id, // artistID:
              this.parseDate(resp[idx].created_at), // created:
              resp[idx].description, // description:
              this.secondstominutes(Math.floor(resp[idx].duration / 1E3)), // duration:
              resp[idx].stream_url + '?client_id=' + this.sScKey, // mp3:
              resp[idx].permalink_url, // mp32:
              img, // poster:
              img2, // posterLarge:
              'SoundCloud', // source:
              resp[idx].title, // title:
              resp[idx].id // trackID:
            )
          }
        }
        if (this.aQuery[uid].aResult.length < this.aQuery[uid].iLimit && this.SCnextPageToken) {
          // console.log('sc error', this.aQuery[uid].aResult.length, 'was looking for', this.aQuery[uid].iLimit)
          this.sc(uid).then(() => {
            this.aQuery[uid].aResult = this.uniqueArray(this.aQuery[uid].aResult)
            resolve()
          }).catch(() => {
            resolve()
          })
        } else {
          this.aQuery[uid].aResult = this.uniqueArray(this.aQuery[uid].aResult)
          // console.log('sc success', this.aQuery[uid].aResult.length, 'was looking for', this.aQuery[uid].iLimit)
          resolve()
        }
      }).catch((er) => {
        console.log(er)
        // reject(err)
        resolve()
      })
    })
  }

  yt(uid) {
    this.YTnextPageTokenString = this.nextPageToken ? '&pageToken=' + this.nextPageToken : ''
    if (!this.YTnextPageTokenString && this.aQuery[uid].iPage > 1) {
      return
    }
    var a
    // related
    if (this.aQuery[uid].bRelated) {
      a = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${this.aQuery[uid].iLimit}&relatedToVideoId=${this.aQuery[uid].sArtist}&type=video&key=${this.sYtKey}`
    // artist
    } else if (this.aQuery[uid].bArtist) {
      a = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${this.aQuery[uid].iLimit}&type=channel&q=${this.aQuery[uid].sQuery}&key=${this.sYtKey}${this.YTnextPageTokenString}`
    // videos and playlists with query
    } else if (!this.aQuery[uid].sArtist.length) {
      a = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${this.aQuery[uid].iLimit}&type=video,playlist&q=${this.aQuery[uid].sQuery}&key=${this.sYtKey}${this.YTnextPageTokenString}`
    // channel
    } else if (this.aQuery[uid].sArtist.length) {
      a = `https://www.googleapis.com/youtube/v3/search?part=snippet&order=date&maxResults=${this.aQuery[uid].iLimit}&type=video&channelId=${this.aQuery[uid].sArtist}&key=${this.sYtKey}${this.YTnextPageTokenString}`
    }
    return new Promise((resolve, reject) => {
      // get videos from search or channel or related
      axios.get(a).then((resp) => {
        var z = ''
        try {
          this.nextPageToken = resp.data.nextPageToken
          resp = resp.data.items
          // IF ARTIST REQUEST
          if (this.aQuery[uid].bArtist) {
            for (var i in resp) {
              this.aQuery[uid].aResult.push({
                // uid: uid,                                                                                         // uid:
                artist: resp[i].snippet.channelTitle, // artist:
                artistID: resp[i].snippet.channelId, // artistID:
                description: resp[i].snippet.description, // description:
                duration: 'YouTube channel', // duration:
                mp32: `https://www.youtube.com/watch?v=${resp[i].id.videoId}`, // mp32:
                poster: resp[i].snippet.thumbnails.medium.url, // poster:
                posterLarge: resp[i].snippet.thumbnails.high.url, // posterLarge:
                source: 'YouTube', // source:
                title: this.decodeHTMLEntities(resp[i].snippet.title), // title:
                // trackID: resp[i].id.playlistId, // trackID:
                // listID: resp[i].id.playlistId,
                uploaded: this.parseDate(resp[i].snippet.publishedAt) // uploaded:
              })
            }
            resolve()
            // ELSE PLAYLIST AND SONGS
          } else {
            // build array x with all videoIds
            var x = []
            for (var idx in resp) {
              x.push(resp[idx].id.videoId)
            }
            // get the duration for all the hits
            if (x.length) {
              axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${x.join(',')}&part=contentDetails&key=${this.sYtKey}`).then((resp2) => {
                var x = []
                for (var i in resp2.data.items) {
                  // set x.videoId to the duration
                  // console.log(resp2.data.items[i])
                  x[resp2.data.items[i].id] = this.timeHMS(resp2.data.items[i].contentDetails.duration)
                }
                for (var i in resp) {
                  // console.log(resp[i])
                  if (this.aQuery[uid].sArtist === '' && resp[i].id.kind === 'youtube#playlist') {
                    // console.log(resp[i])
                    this.aQuery[uid].aResult.push({
                      // uid: uid,                                                                                         // uid:
                      artist: resp[i].snippet.channelTitle, // artist:
                      artistID: resp[i].snippet.channelId, // artistID:
                      description: resp[i].snippet.description, // description:
                      duration: 'Playlist', // duration:
                      mp32: `https://www.youtube.com/watch?v=${resp[i].id.videoId}`, // mp32:
                      poster: resp[i].snippet.thumbnails.medium.url, // poster:
                      posterLarge: resp[i].snippet.thumbnails.high.url, // posterLarge:
                      source: 'YouTube', // source:
                      title: this.decodeHTMLEntities(resp[i].snippet.title), // title:
                      trackID: resp[i].id.playlistId, // trackID:
                      listID: resp[i].id.playlistId,
                      uploaded: this.parseDate(resp[i].snippet.publishedAt) // uploaded:
                    })
                  } else {
                    // console.log(resp[i])
                    this.aQuery[uid].aResult.push({
                      // uid: uid,                                                                                         // uid:
                      artist: resp[i].snippet.channelTitle, // artist:
                      artistID: resp[i].snippet.channelId, // artistID:
                      description: resp[i].snippet.description, // description:
                      duration: x[resp[i].id.videoId], // duration:
                      mp32: `https://www.youtube.com/watch?v=${resp[i].id.videoId}`, // mp32:
                      poster: resp[i].snippet.thumbnails.medium.url, // poster:
                      posterLarge: resp[i].snippet.thumbnails.high.url, // posterLarge:
                      source: 'YouTube', // source:
                      title: this.decodeHTMLEntities(resp[i].snippet.title), // title:
                      trackID: resp[i].id.videoId, // trackID:
                      uploaded: this.parseDate(resp[i].snippet.publishedAt) // uploaded:
                    })
                  }
                }
                // console.log('resolving', resp)
                resolve()
              }).catch((err) => {
                console.log(err)
              })
            }
          }
        } catch (e) {
          this.YTnextPageToken = ''
          console.log('yt error', e)
          return
        }
      })
    })
  }

  vim(uid) {
    if (this.aQuery[uid].bRelated) {
      return Promise.resolve()
    }
    var a
    if (this.aQuery[uid].sArtist !== 'undefined') {
      a = 'https://api.vimeo.com/videos?page=' + (this.aQuery[uid].iPage + 1) + '&per_page=12&query=' + this.aQuery[uid].sQuery + '&sort=relevant&access_token=' + this.sVimeoKey
    } else {
      a = 'https://api.vimeo.com/users/' + this.aQuery[uid].sArtist + '/videos?page=' + (this.aQuery[uid].iPage + 1) + '&per_page=12&sort=date&access_token=' + this.sVimeoKey
    }
    return axios.get(a).then((resp) => {
      resp = resp.data.data
      if (resp.length) {
        for (var idx in resp) {
          this.pushResult(
            uid, // uid:
            resp[idx].user.name, // artist:
            resp[idx].user.uri.replace(/\/users\/(.*?)/ig, 'user'), // artistID:
            this.parseDate(resp[idx].user.created_time), // created:
            resp[idx].description, // description:
            this.secondstominutes(resp[idx].duration), // duration:
            'https://dream.tribe.nu/r3/off/?q=' + resp[idx].link, // mp3:
            resp[idx].link, // mp32:
            resp[idx].pictures.sizes[2].link, // poster:
            resp[idx].pictures.sizes[resp[idx].pictures.sizes.length - 1].link, // posterLarge:
            'vimeo', // source:
            resp[idx].name, // title:
            resp[idx].link // trackID:
          )
        }
      }
    }).catch(false)
  }
  
  decodeHTMLEntities (text) {
    return text.replace(/&([^;]+);/gm, function (match, entity) {
      return entities[entity] || match
    })
  }
  genUID() {
    return Math.random()
  }

  getTrendingSC(source) {
    // 
    return new Promise((resolve, reject) => {
      // NONO CORS.IO BADOPSEC

      axios.get(`https://cors.io/?https://api-v2.soundcloud.com/charts?kind=top&genre=soundcloud%3Agenres%3Aall-music&high_tier_only=false&client_id=${this.sScKey}&limit=50&offset=0`).then((resp) => {
          // console.log(resp)
          let ret = {
            nextPage: '',
            data: resp.data.collection
              // .filter(item => typeof item.snippet.thumbnails !== 'undefined')
              .map((item) => {
                // console.log(item)
                var img, img2
                if (!item.track.artwork_url && item.track.user.avatar_url) {
                  img = item.track.user.avatar_url.replace('i1', 'i2').replace('-large', '-t300x300')
                  img2 = item.track.user.avatar_url.replace('-large', '-t500x500')
                } else if (!item.track.user.avatar_url && !item.track.user.avatar_url) {
                  img = img2 = './img/icons/no-image.png'
                } else {
                  img = item.track.artwork_url.replace('i1', 'i2').replace('-large', '-t300x300')
                  img2 = item.track.artwork_url.replace('-large', '-t500x500')
                }
                return {
                  artist: item.track.user.username, // artist:
                  artistID: item.track.user_id, // artistID:
                  uploaded: this.parseDate(item.track.created_at), // created:
                  description: item.track.description, // description:
                  duration: this.secondstominutes(Math.floor(item.track.duration / 1E3)), // duration:
                  mp3: `https://api.soundcloud.com/tracks/${item.track.id}/stream?client_id=${this.sScKey}`, // mp3:
                  mp32: item.track.permalink_url, // mp32:
                  poster: img, // poster:
                  posterLarge: img2, // posterLarge:
                  source: 'SoundCloud', // source:
                  title: item.track.title, // title:
                  trackID: item.track.id // trackID:
                }
              })
          }
          resolve(ret)
        })
        .catch((error) => {
          // console.log(error)
          reject()
        })
    })
  }

  getTrendingYT(nextPage = '') {
    return new Promise((resolve, reject) => {
      axios.get(`https://www.googleapis.com/youtube/v3/videos?part=contentDetails,snippet&pageToken=${nextPage}&videoCategoryId=10&chart=mostPopular&regionCode=SE&maxResults=50&key=${this.sYtKey}`)
      .then((resp) => {
        // console.log(resp)
        let ret = {
          nextPage: resp.data.nextPageToken,
          data: resp.data.items.map((item) => {
            return {
              artist: item.snippet.channelTitle,
              artistID: item.snippet.channelId,
              description: item.snippet.description,
              duration: this.timeHMS(item.contentDetails.duration),
              mp32: `https://www.youtube.com/watch?v=${item.id}`, // mp32:
              poster: item.snippet.thumbnails.medium.url,
              posterLarge: item.snippet.thumbnails.high.url,
              source: 'YouTube',
              title: this.decodeHTMLEntities(item.snippet.title),
              trackID: item.id,
              uploaded: this.parseDate(item.snippet.publishedAt),
            }
          })
        }
        resolve(ret)
      })
      .catch((error) => {
        // console.log(error)
        reject()
      })
    })

  }

  getChannelPlaylists(artistID, source, maxRes, nextPage, hCallback) {
    var uid = this.genUID()
    if (source.toLowerCase().indexOf('soundcloud') > -1) {
      return axios.get(`https://api.soundcloud.com/users/${artistID}/playlists?client_id=${this.sScKey}`).then((resp) => {
        var img1 = ''
        let ret = {
          data: resp.data.map((item) => {
            if (item.tracks.length > 0 && item.tracks[0].artwork_url) {
              img1 = item.tracks[0].artwork_url.replace('-large', '-t500x500')
            } else if (item.tracks.length > 1 && item.tracks[1].artwork_url) {
              img1 = item.tracks[1].artwork_url.replace('-large', '-t500x500')
            } else if (item.tracks.length > 2 && item.tracks[2].artwork_url) {
              img1 = item.tracks[2].artwork_url.replace('-large', '-t500x500')
            } else if (item.tracks.length > 3 && item.tracks[3].artwork_url) {
              img1 = item.tracks[3].artwork_url.replace('-large', '-t500x500')
            } else if (item.tracks.length > 4 && item.tracks[4].artwork_url) {
              img1 = item.tracks[4].artwork_url.replace('-large', '-t500x500')
            } else if (item.tracks.length > 5 && item.tracks[5].artwork_url) {
              img1 = item.tracks[5].artwork_url.replace('-large', '-t500x500')
            }

            return {
              title: item.title,
              numberOfSongs: item.tracks.length, // track_count PROPER
              img: img1,
              description: item.description,
              listID: item.id,
              uploaded: item.id,
              artist: item.user.username,
              artistID: artistID,
              source: source
            }
          })
        }
        hCallback(ret)
      })
    } else if (source.toLowerCase().indexOf('youtube') > -1) {
      return axios.get(`https://www.googleapis.com/youtube/v3/playlists?part=snippet,contentDetails&pageToken=${nextPage}&channelId=${artistID}&maxResults=${maxRes}&key=${this.sYtKey}`).then((resp) => {
        hCallback({
          nextPage: resp.data.nextPageToken,
          data: resp.data.items.map((item) => {
            return {
              title: this.decodeHTMLEntities(item.snippet.title),
              numberOfSongs: item.contentDetails.itemCount,
              img: item.snippet.hasOwnProperty('high') ? item.snippet.thumbnails.high.url : item.snippet.thumbnails.medium.url,
              description: item.snippet.description,
              listID: item.id,
              uploaded: this.parseDate(item.snippet.publishedAt),
              artist: item.snippet.channelTitle,
              artistID: artistID,
              source: source
            }
          })
        })
      })
    }
  }

  getChannelSubscriptions(artistID, source, maxRes, nextPage, hCallback) {
    if (source.toLowerCase().indexOf('soundcloud') > -1) {
      let url = nextPage || `https://api.soundcloud.com/users/${artistID}/followings?client_id=${this.sScKey}`
      axios.get(url).then((resp) => {
        let ret = {
          nextPage: resp.data.next_href,
          data: resp.data.collection.map((item) => {
            return {
              numberOfSongs: item.track_count,
              img: item.avatar_url.replace('large', 't500x500'),
              description: item.description,
              uploaded: this.parseDate(item.last_modified),
              artist: item.username,
              artistID: item.id,
              source: source
            }
          })
        }
        hCallback(ret)
      }).catch(() => {})
    } else if (source.toLowerCase().indexOf('youtube') > -1) {
      return axios.get(`https://www.googleapis.com/youtube/v3/subscriptions?part=snippet,contentDetails&pageToken=${nextPage}&channelId=${artistID}&maxResults=${maxRes}&key=${this.sYtKey}`).then((resp) => {
        let ret = {
          nextPage: resp.data.nextPageToken,
          data: resp.data.items.map((item) => {
            return {
              numberOfSongs: item.contentDetails.totalItemCount,
              newItemCount: item.contentDetails.newItemCount,
              img: item.snippet.thumbnails.high.url,
              description: item.snippet.description,
              uploaded: this.parseDate(item.snippet.publishedAt),
              artist: this.decodeHTMLEntities(item.snippet.title),
              artistID: item.snippet.resourceId.channelId,
              source: source
            }
          })
        }
        hCallback(ret)
      }).catch(() => {
        // console.log('error getting subs', err)
      })
    }
  }

  getChannelPlaylistItems(listID, source, maxRes, nextPage, hCallback) {
    var uid = this.genUID()
    if (source.toLowerCase().indexOf('soundcloud') > -1) {
      return axios.get(`https://api.soundcloud.com/playlists/${listID}?client_id=${this.sScKey}`).then((resp) => {
        let ret = {
          nextPage: '',
          data: resp.data.tracks
            // .filter(item => typeof item.snippet.thumbnails !== 'undefined')
            .map((item) => {
              var img, img2
              if (item.artwork_url) {
                img = item.artwork_url.replace('i1', 'i2').replace('-large', '-t300x300')
                img2 = item.artwork_url.replace('-large', '-t500x500')
              }
              return {
                artist: item.user.username, // artist:
                artistID: item.user_id, // artistID:
                uploaded: this.parseDate(item.created_at), // created:
                description: item.description, // description:
                duration: this.secondstominutes(Math.floor(item.duration / 1E3)), // duration:
                mp3: item.stream_url + '?client_id=' + this.sScKey, // mp3:
                mp32: item.permalink_url, // mp32:
                poster: img, // poster:
                posterLarge: img2, // posterLarge:
                source: 'SoundCloud', // source:
                title: item.title, // title:
                trackID: item.id // trackID:
              }
            })
        }
        hCallback(ret)
      })
    } else if (source.toLowerCase().indexOf('youtube') > -1) {
      // GET ITEMS
      return axios.get(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${listID}&pageToken=${nextPage}&maxResults=${maxRes}&key=${this.sYtKey}`).then((resp) => {
        var IDs = resp.data.items.map((item) => {
          return item.contentDetails.videoId
        }).join(',')
        // GET DURATION
        axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${IDs}&part=contentDetails&key=${this.sYtKey}`).then((resp2) => {
          var x = []
          // SET DURATION
          for (var i in resp2.data.items) {
            x[resp2.data.items[i].id] = this.timeHMS(resp2.data.items[i].contentDetails.duration)
          }
          // CREATE CALLBACK OBJECT
          let ret = {
            nextPage: resp.data.nextPageToken,
            data: resp.data.items
              // NO THUMNAIL == NOT VAILD YT SONG?
              .filter(item => typeof item.snippet.thumbnails !== 'undefined')
              .map((item) => {
                return {
                  artist: item.snippet.channelTitle, // artist:
                  artistID: item.snippet.channelId, // artistID:
                  uploaded: this.parseDate(item.snippet.publishedAt), // created:
                  description: item.snippet.description, // description:
                  duration: x[item.contentDetails.videoId], // duration:
                  mp3: `https://dream.tribe.nu/r3/off/?q=https://www.youtube.com/watch?v=${item.contentDetails.videoId}`, // mp3:
                  mp32: `https://www.youtube.com/watch?v=${item.contentDetails.videoId}`, // mp32:
                  poster: item.snippet.thumbnails.medium.url, // poster:
                  posterLarge: item.snippet.thumbnails.high.url, // posterLarge:
                  source: 'YouTube', // source:
                  title: this.decodeHTMLEntities(item.snippet.title), // title:
                  trackID: item.contentDetails.videoId // trackID:
                }
              })
          }
          hCallback(ret)
        })
      })
    }
  }

  getArtistInfo(artistID, source, hCallback) {
    if (source.toLowerCase().indexOf('youtube') > -1) {
      return axios.get('https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=' + artistID + '&key=' + this.sYtKey).then(hCallback)
    } else if (source.toLowerCase().indexOf('soundcloud') > -1) {
      return axios.get('https://api.soundcloud.com/users/' + artistID + '?client_id=' + this.sScKey).then(hCallback)
    } else if (source.toLowerCase().indexOf('mixcloud') > -1) {
      return axios.get('https://api.mixcloud.com/' + artistID + '/').then(hCallback)
      // } else if (source.toLowerCase().indexOf('bandcamp') > -1) {
      // return axios.get(this.bcBase + 'api/v2/getartistinfo/' + encodeURIComponent(atob(artistID))).then(hCallback)
    } else {
      return (Promise.resolve(''))
    }
  }

  getSongComments(trackID, source, maxRes, nextPage, hCallback) {
    var uid = this.genUID()
    if (source.toLowerCase().indexOf('youtube') > -1) {
      return axios.get(`https://www.googleapis.com/youtube/v3/comments?part=snippet&pageToken=${nextPage}&maxResults=${maxRes}&parentId=${trackID}&key=${this.sYtKey}`).then((resp) => {
        // console.log(resp.data.items)
        var ret = {
          nextPage: resp.data.nextPageToken,
          data: resp.data.items.map((item) => {
            return {
              artist: item.snippet.authorDisplayName,
              artistID: item.snippet.authorChannelId.value,
              artistIMG: item.snippet.authorProfileImageUrl,
              comment: item.snippet.textDisplay,
              commentCreated: item.snippet.publishedAt,
              totalReplyCount: item.snippet.totalReplyCount,
              commentID: item.id
            }
          }).reverse()
        }
        hCallback(ret)
      })
    } else if (source.toLowerCase().indexOf('soundcloud') > -1) {
      return axios.get('https://api.soundcloud.com/tracks/' + trackID + '/comments?linked_partitioning=1&limit=50&client_id=' + this.sScKey).then((resp) => {
        var ret = {
          nextPage: resp.data.nextPageToken,
          data: resp.data.collection.map((item) => {
            return {
              artist: item.user.username,
              artistID: item.user.id,
              artistIMG: item.user.avatar_url,
              comment: item.body,
              commentCreated: item.created_at
            }
          })
        }
        hCallback(ret)
      })
    }

  }

  getSongCommentsThreads(trackID, iPage, source, maxRes, hCallback) {
    var uid = this.genUID()
    if (source.toLowerCase().indexOf('youtube') > -1) {
      if (iPage && !this.YTCommentNext) {
        return
      }
      var nextPage = this.YTCommentNext && iPage ? '&pageToken=' + this.YTCommentNext : ''
      return axios.get('https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&order=time&textFormat=plainText&maxResults=' + maxRes + '&videoId=' + trackID + '&key=' + this.sYtKey + nextPage).then((resp) => {
        this.YTCommentNext = resp.data.nextPageToken
        var ret = resp.data.items.map((item) => {
          return {
            artist: item.snippet.topLevelComment.snippet.authorDisplayName,
            artistID: item.snippet.topLevelComment.snippet.authorChannelId.value,
            artistIMG: item.snippet.topLevelComment.snippet.authorProfileImageUrl,
            comment: item.snippet.topLevelComment.snippet.textDisplay,
            commentCreated: item.snippet.topLevelComment.snippet.publishedAt,
            totalReplyCount: item.snippet.totalReplyCount,
            commentID: item.id
          }
        })
        hCallback(ret)
      })
    } else if (source.toLowerCase().indexOf('soundcloud') > -1) {
      return axios.get('https://api.soundcloud.com/tracks/' + trackID + '/comments?linked_partitioning=1&limit=50&client_id=' + this.sScKey).then((resp) => {
        var ret = resp.data.collection.map((item) => {
          return {
            artist: item.user.username,
            artistID: item.user.id,
            artistIMG: item.user.avatar_url,
            comment: item.body,
            commentCreated: item.created_at
          }
        })
        hCallback(ret)
      })
    }

  }

  getSongDescription(trackID, source, hCallback) {
    var uid = this.genUID()
    this.aQuery[uid] = {
      aResult: [],
      hCallback: hCallback
    }
    if (source.toLowerCase().indexOf('youtube') > -1) {
      axios.get('https://www.googleapis.com/youtube/v3/videos?part=snippet&id=' + trackID + '&fields=items/snippet/description&key=' + this.sYtKey).then((resp) => {
        hCallback(resp.data)
      }).catch()
    }
  }

  getSongPlays(trackID, source, hCallback) {
    if (source.toLowerCase().indexOf('youtube') > -1) {
      var a = `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${trackID}&key=${this.sYtKey}`
      return axios.get(a).then((resp) => {
        hCallback(resp.data.items[0].statistics.viewCount)
      })
    } else if (source.toLowerCase().indexOf('soundcloud') > -1) {
      var a = `https://api.soundcloud.com/tracks/${trackID}?client_id=${this.sScKey}`
      return axios.get(a).then((resp) => {
        hCallback(resp.data.playback_count)
      })
    } else {
      hCallback(-1)
    }
  }

  getSongInfo(trackID, source, hCallback) {
    var uid = this.genUID()
    this.aQuery[uid] = {
      aResult: [],
      hCallback: hCallback
    }

    if (source.toLowerCase().indexOf('youtube') > -1) {
      return axios.get('https://www.googleapis.com/youtube/v3/videos?part=snippet&id=' + trackID + '&key=' + this.sYtKey).then((resp) => {
        resp = resp.data.items[0]
        this.pushResult(
          uid,
          resp.snippet.channelTitle, // artist:
          resp.snippet.channelId, // artistID:
          this.parseDate(resp.snippet.publishedAt), // created:
          resp.snippet.description, // description:
          '', // duration:
          'http://dream.tribe.nu/r3/off/?q=' + 'https://www.youtube.com/watch?v=' + resp.id, // mp3:
          'https://www.youtube.com/watch?v=' + resp.id, // mp32:
          resp.snippet.thumbnails.high.url, // poster:
          resp.snippet.thumbnails.high.url, // posterLarge:
          'YouTube', // source:
          this.unescapeHtml(resp.snippet.title), // title:
          resp.id // trackID:
        )
        this.aQuery[uid].hCallback(this.aQuery[uid].aResult)
        delete this.aQuery[uid]
      })
    } else if (source.toLowerCase().indexOf('soundcloud') > -1) {
      return axios.get('https://api.soundcloud.com/tracks/' + trackID + '?client_id=' + this.sScKey).then((resp) => {
        resp = resp.data
        // alert(resp.data)
        this.pushResult(
          uid,
          resp.user.username, // artist:
          resp.user_id, // artistID:
          this.parseDate(resp.created_at), // created:
          resp.description, // description:
          this.secondstominutes(Math.floor(resp.duration / 1E3)), // duration:
          resp.stream_url + '?client_id=' + this.sScKey, // mp3:
          resp.permalink_url, // mp32:
          typeof resp.artwork_url === 'string' ? resp.artwork_url.replace('i1', 'i2').replace('-large', '-t300x300') : './img/icons/no-image.png', // poster:
          typeof resp.artwork_url === 'string' ? resp.artwork_url.replace('-large', '-t500x500') : './img/icons/no-image.png', // posterLarge:
          'SoundCloud', // source:
          resp.title, // title:
          resp.id // trackID:
        )
        this.aQuery[uid].hCallback(this.aQuery[uid].aResult)
        delete this.aQuery[uid]
      })
    } else if (source.toLowerCase().indexOf('mixcloud') > -1) {
      return axios.get('https://api.mixcloud.com' + trackID).then((resp) => {
        resp = resp.data
        this.pushResult(
          uid,
          resp.user.name, // artist:
          resp.user.key, // artistID:
          this.parseDate(resp.created_time), // created:
          resp.description, // description:
          this.secondstominutes(resp.audio_length), // duration: ??????????
          resp.url, // mp3:
          resp.url, // mp32:
          resp.pictures.small, // poster:
          resp.pictures.large, // posterLarge:
          'MixCloud', // source:
          resp.name, // title:
          resp.key // trackID:
        )
        this.aQuery[uid].hCallback(this.aQuery[uid].aResult)
        delete this.aQuery[uid]
      })
    }
  }

  guessSongTitle(title, hCallback) {
    axios.get(`https://api.alltomp3.org/v1/guess-track/${title}`).then((resp) => {
      hCallback(resp)
    })
  }

  pushResult(uid, artist, artistID, uploaded, description, duration, mp3, mp32, poster, posterLarge, source, title, trackID) {
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

  calcDate(a, b) {
    if (!a) {
      a = new Date()
    }
    if (!b) {
      b = new Date()
    }
    if (typeof b !== Object) {
      b = new Date(b)
    }

    // console.log(a, b)
    var c = Math.abs(a.getTime() - b.getTime())
    var d = Math.floor(c / 864E5)
    var h = Math.floor(c / 36e5)
    var min = Math.floor(c / 6e4)
    var m = Math.floor(d / 31)
    var w = Math.floor(d / 7)
    var y = Math.floor(m / 12)

    a = y > 0 ? [y, ' year'] : m > 0 ? [m, ' month'] : w > 0 ? [w, ' week'] : d > 0 ? [d, ' day'] : h > 0 ? [h, ' hour'] : [min, ' minute']
    return a[0] + a[1] + (a[0] > 1 ? 's' : '')
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
    a = new Date(a.uploaded)
    b = new Date(b.uploaded)

    return a > b ? -1 : a < b ? 1 : 0
  }

  str_pad_left(string, pad, length) {
    return ((new Array(length + 1)).join(pad) + string).slice(-length)
  }

  uniqueArray(array) {
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

  secondstominutes1(time) {
    return this.str_pad_left(Math.floor(time / 60), '0', 2) + ':' + this.str_pad_left(time - Math.floor(time / 60) * 60, '0', 2)
  }

  error(uid) {
    this.aQuery[uid].hCallback(this.aQuery[uid].aResult)
  }
  secondstominutes(secs) {
    var sec_num = parseInt(secs, 10)
    var hours = Math.floor(sec_num / 3600) % 24
    var minutes = Math.floor(sec_num / 60) % 60
    var seconds = sec_num % 60
    return [hours, minutes, seconds]
      .map(v => v < 10 ? "0" + v : v)
      .filter((v, i) => v !== "00" || i > 0)
      .join(":")
  }
  unescapeHtml(str) {
    var map = {
      amp: '&',
      lt: '<',
      le: '≤',
      gt: '>',
      ge: '≥',
      quot: '"',
      nbsp: ' ',
      '#39': "'"
    }
    return str.replace(/&([^;]+);/g, (m, c) => map[c] || '')
  }
  timeHMS(s) {
    var T = 'date';
    var d = 8.64e7;
    var h = d / 24;
    var m = h / 60;
    var multipliers = {
      date: {
        y: d * 365.25,
        m: d * (365 * 4 + 1) / 48,
        d: d
      },
      time: {
        h: h,
        m: m,
        s: 1000
      }
    };
    var re = /[^a-z]+|[a-z]/gi;

    // Tokenise with match, then process with reduce
    var time = s.toLowerCase().match(/p|t|\d+\.?\d*[ymdhs]/ig).reduce(function (ms, v) {
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
  install(Vue, options) {
    Object.defineProperty(Vue.prototype, '$DCAPI', {
      value: new DCAPIClass()
    })
  }
}