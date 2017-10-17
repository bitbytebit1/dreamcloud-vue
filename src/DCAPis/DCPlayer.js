/* eslint-disable */
import axios from 'axios'
import store from '../vuex'
const DCPlayerPlug = {
  install (Vue, options) {
    var DCPlayer = {
      aPlaylist: [],
      iCurrent: 0,
      eAudio: '',
      init: function () {
        DCPlayer.bindMediaSesssion()
      },
      ePlayer: function () {
        return document.getElementById('dc-audio')
      },
      next: function () {
        // Increment unless end of playlist.
        DCPlayer.iCurrent = (DCPlayer.iCurrent < DCPlayer.aPlaylist.length - 1 ? DCPlayer.iCurrent + 1 : 0)
        DCPlayer.playIndex(DCPlayer.iCurrent)
      },
      pause: function () {
        DCPlayer.eAudio.pause()
      },
      play: function () {
        DCPlayer.eAudio.play()
      },
      previous: function () {
        DCPlayer.iCurrent = (DCPlayer.iCurrent > 0 ? DCPlayer.iCurrent - 1 : 0)
        store.commit('changeIndex', DCPlayer.iCurrent)
        DCPlayer.playIndex(DCPlayer.iCurrent)
      },
      playIndex: function (index) {
        DCPlayer.iCurrent = index
        store.commit('changeIndex', DCPlayer.iCurrent)
        return DCPlayer.play_url(DCPlayer.aPlaylist[index].mp32)
      },
      play_url: function (sURL) {
        return
        return DCPlayer.getAudio(sURL, function (resp) {
          DCPlayer.eAudio.src = resp
          DCPlayer.play()
          // Not sure why but seems we have to rebind after src change?
          DCPlayer.eAudio.addEventListener('ended', DCPlayer.next, false)
          DCPlayer.eAudio.addEventListener('error', DCPlayer.error, false)
        })
      },
      setPlaylist: function (array) {
        DCPlayer.aPlaylist = array
      },
      setNPlay: function (array, index) {
        DCPlayer.setPlaylist(array)
        DCPlayer.iCurrent = index
        DCPlayer.playIndex(index)
      },
      seekBackward: function () {
        DCPlayer.eAudio.currentTime -= 10
      },
      seekForward: function () {
        DCPlayer.eAudio.currentTime += 10
      },
      getAudio: function (url, hCallback) {
        var ax = axios.get('https://www.saveitoffline.com/process/?type=audio&url=' + url)
        ax.then(function (resp) {
          if (('data' in resp) && (resp.data !== 'Error: no_media_found' && resp.data !== 'Error: daily_secondary_api_limit_reached')) {
            for (var i = 0; i < resp.data.urls.length; i++) {
              if (resp.data.urls[i].label.indexOf('audio') > -1 || resp.data.urls[i].label.indexOf('m4a') > -1) {
                hCallback(resp.data.urls[i].id)
                break
              }
            }
          } else {
            hCallback('//dream.tribe.nu/r3/off?q=' + url)
          }
        })
        return ax
      },
      error: function (a) {
        this._error_count = this._error_count || 0
        if (this._error_count < 3) {
          this._error_count++
          console.log('Trying to play again', this._error_count)
          setTimeout(function () {
            DCPlayer.playIndex(DCPlayer.iCurrent).then(function (resp) {
              DCPlayer.eAudio.addEventListener('playing', function () {
                this._error_count = 0
              })
              DCPlayer.eAudio.addEventListener('error', function () {
                if (this._error_count === 4) {
                  this._error_count = 0
                  console.log('too may errors, next song')
                  DCPlayer.next()
                }
              }, false)
            })
          }, 1000)
        } else {

        }
      },
      setMediaSession: function (song) {
        if ('mediaSession' in navigator) {
          navigator.mediaSession.metadata = new MediaMetadata({
            title: song.title,
            artist: song.artist,
            artwork: [
              { src: song.poster, sizes: '96x96', type: 'image/png' },
              { src: song.poster, sizes: '128x128', type: 'image/png' },
              { src: song.poster, sizes: '192x192', type: 'image/png' },
              { src: song.poster, sizes: '256x256', type: 'image/png' },
              { src: song.poster, sizes: '384x384', type: 'image/png' },
              { src: song.poster, sizes: '512x512', type: 'image/png' }
            ]
          })
        }
      },
      bindMediaSesssion: function () {
        if ('mediaSession' in navigator) {
          navigator.mediaSession.setActionHandler('play', DCPlayer.play)
          navigator.mediaSession.setActionHandler('pause', DCPlayer.pause)
          navigator.mediaSession.setActionHandler('seekbackward', DCPlayer.seekBackward)
          navigator.mediaSession.setActionHandler('seekforward', DCPlayer.seekForward)
          navigator.mediaSession.setActionHandler('previoustrack', DCPlayer.previous)
          navigator.mediaSession.setActionHandler('nexttrack', DCPlayer.next)
        }
      }
    }
    DCPlayer.init()
    Object.defineProperty(Vue.prototype, '$DCPlayer', { value: DCPlayer })
  }
}
export default DCPlayerPlug
