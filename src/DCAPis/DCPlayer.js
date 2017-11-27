/* eslint-disable */
import axios from 'axios'
import store from '../vuex'
export default {
  install (Vue, options) {
    var DCPlayer = {
      aPlaylist: [],
      iCurrent: 0,
      eAudio: '',
      error_count: 0,
      init () {
        DCPlayer.bindMediaSesssion()
      },
      ePlayer () {
        return document.getElementById('dc-audio')
      },
      next () {
        // Increment unless end of playlist.
        DCPlayer.iCurrent = (DCPlayer.iCurrent < DCPlayer.aPlaylist.length - 1 ? DCPlayer.iCurrent + 1 : 0)
        DCPlayer.playIndex(DCPlayer.iCurrent)
      },
      pause () {
        DCPlayer.eAudio.pause()
      },
      play: () => {
        return DCPlayer.eAudio.play()
      },
      previous () {
        DCPlayer.iCurrent = (DCPlayer.iCurrent > 0 ? DCPlayer.iCurrent - 1 : DCPlayer.aPlaylist.length - 1)
        store.commit('changeIndex', DCPlayer.iCurrent)
        DCPlayer.playIndex(DCPlayer.iCurrent)
      },
      playIndex (index) {
        DCPlayer.iCurrent = index
        store.commit('changeIndex', DCPlayer.iCurrent)
        this.setMediaSession(DCPlayer.aPlaylist[index])
        if(DCPlayer.aPlaylist[index].source == 'SoundCloud')
          return DCPlayer.setAudioSrc(DCPlayer.aPlaylist[index].mp3)
        else
          return DCPlayer.play_url(DCPlayer.aPlaylist[index].mp32)
      },
      play_url (sURL) {
        return DCPlayer.getAudio(sURL, DCPlayer.setAudioSrc)
      },
      setAudioSrc (sURL) {
        DCPlayer.eAudio.src = sURL + (DCPlayer.error_count ? '&error=' + DCPlayer.error_count + '-' + DCPlayer.aPlaylist[DCPlayer.iCurrent].trackID : '')
        DCPlayer.eAudio.addEventListener('ended', DCPlayer.next, false)
        // Not sure why but seems we have to rebind after src change?
        var play = DCPlayer.play()
        play.then(() => {
          DCPlayer.error_count = 0
        })
        .catch((error) => {
          DCPlayer.error_count++
          console.log('failed to play', DCPlayer.error_count)
          if (DCPlayer.error_count < 6) {
            DCPlayer.error()
          } else {
            console.log('i gave u 5 chances')
            DCPlayer.error_count = 0
            DCPlayer.next()
          }
        })
        return play
        
        
        // DCPlayer.eAudio.addEventListener('error', DCPlayer.error, false)
      },
      setPlaylist (array) {
        DCPlayer.aPlaylist = array
      },
      setNPlay (array, index) {
        DCPlayer.setPlaylist(array)
        DCPlayer.iCurrent = index
        return DCPlayer.playIndex(index)
      },
      seekBackward () {
        DCPlayer.eAudio.currentTime -= 10
      },
      seekForward () {
        DCPlayer.eAudio.currentTime += 10
      },
      getAudio (url, hCallback) {
        var ax = axios.get('https://www.saveitoffline.com/process/?type=audio&url=' + url)
        ax.then(function (resp) {
          if ('data' in resp && 
          resp.data !== 'Error: no_media_found' && 
          resp.data !== 'Error: daily_secondary_api_limit_reached' && 
          resp.data !== 'Error: miss' &&
          resp.data !== '') {

            for (var i = 0; i < resp.data.urls.length; i++) {
              if (resp.data.urls[i].label.indexOf('m4a') > -1 || resp.data.urls[i].label.indexOf('audio') > -1) {
                hCallback(resp.data.urls[i].id)
                return
              }
            }
            
            // console.log('fallback', resp.data.urls[Math.max(0,resp.data.urls.length - 2)], resp.data.urls)
            hCallback(resp.data.urls[Math.max(0,resp.data.urls.length - 3)].id)
          } else {
            hCallback('//dream.tribe.nu/r3/off?q=' + url)
          }
        }).catch((error) => {
          // console.log('saio process error')
          hCallback('//dream.tribe.nu/r3/off?q=' + url)
        })
        return ax
      },
      error (a) {
        setTimeout(function () {
          DCPlayer.playIndex(DCPlayer.iCurrent)
        }, 2000)
      },
      setMediaSession (song) {
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
      bindMediaSesssion () {
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
