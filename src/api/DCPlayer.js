/* eslint-disable */
import axios from 'axios'
import store from '../vuex'
export default {
  install (Vue) {
    var DCPlayer = {
      aPlaylist: [],
      iCurrent: 0,
      eAudio: {src:''},
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
        // store.commit('changeIndex', DCPlayer.iCurrent)
        DCPlayer.playIndex(DCPlayer.iCurrent)
      },
      pause () {
        // if (DCPlayer.eAudio.hasOwnProperty('pause')) {  
        DCPlayer.eAudio.pause()
        // }
        // else {
        //   console.log('not pausing')
        // }
      },
      stop () {
        DCPlayer.eAudio.src = ""
      },
      play () {
        return DCPlayer.eAudio.play()
      },
      previous () {
        DCPlayer.iCurrent = (DCPlayer.iCurrent > 0 ? DCPlayer.iCurrent - 1 : DCPlayer.aPlaylist.length - 1)
        // store.commit('changeIndex', DCPlayer.iCurrent)
        DCPlayer.playIndex(DCPlayer.iCurrent)
      },
      playIndex (index) {
        DCPlayer.iCurrent = index
        store.commit('changeIndex', DCPlayer.iCurrent)
        this.setMediaSession(DCPlayer.aPlaylist[index])
        if (store.getters.ytUseVideo && store.getters.isYT) {
          // console.log('playing video')
          DCPlayer.stop()
          return 
        } else {
          // console.log('playing audio')
          store.commit('ytStopVideo')
        }
        if(DCPlayer.aPlaylist[index].source == 'SoundCloud')
          return DCPlayer.setAudioSrc(DCPlayer.aPlaylist[index].mp3)
        else
          return DCPlayer.play_url(DCPlayer.aPlaylist[index].mp32)
      },
      play_url (sURL) {
        return DCPlayer.getAudio(sURL, DCPlayer.setAudioSrc)
      },
      setAudioSrc (sURL) {
        //append x=error_count if error_count > 0
        DCPlayer.eAudio.src = sURL + (DCPlayer.error_count ? '&x=' + DCPlayer.error_count : '')
        // DCPlayer.eAudio.load()
        var play = DCPlayer.play().then(() => {
          // If play then reset error_count
          DCPlayer.error_count = 0
        })
        // Else if the user doesn't choose another track add 1 to error count and try to play again if under 5
        .catch(error => {
          if(error.toString().indexOf('interrupted by a new load request') === -1){
            DCPlayer.error_count++
            if (DCPlayer.error_count < 6) {
              DCPlayer.error()
            } else {
              // console.log('Failed to play 5 times, next song!')
              DCPlayer.error_count = 0
              DCPlayer.next()
            }
          }
        })
        return play
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
        if (store.getters.ytUseVideo && store.getters.isYT) {
          store.getters.ytObject.seekTo(store.getters.ytObject.getCurrentTime() - 10, true)
        } else {
          DCPlayer.eAudio.currentTime -= 10
        }
      },
      seekForward () {
        if (store.getters.ytUseVideo && store.getters.isYT) {
          store.getters.ytObject.seekTo(store.getters.ytObject.getCurrentTime() + 10, true)
        } else {
          DCPlayer.eAudio.currentTime += 10
        }
      },
      toggleMute () {
        if (store.getters.ytUseVideo && store.getters.isYT) {
          if (this.$store.getters.ytObject.isMuted()) {
            this.$store.getters.ytObject.unMute()
          } else {
            this.$store.getters.ytObject.mute()
          }
        } else {
          this.eAudio.muted = !this.eAudio.muted
        }
      },
      togglePlay () {
        if (store.getters.ytUseVideo && store.getters.isYT) {
          if (store.getters.ytIsPlaying) {
            store.getters.ytObject.pauseVideo()
          } else {
            store.getters.ytObject.playVideo()
          }
        } else {
          if (DCPlayer.eAudio.paused) {
            DCPlayer.eAudio.play()
          } else {
            DCPlayer.eAudio.pause()
          }
        }
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
          this.bindMediaSesssion()
        }
      },
      bindMediaSesssion () {
        if ('mediaSession' in navigator) {
          navigator.mediaSession.setActionHandler('play', () => DCPlayer.play())
          navigator.mediaSession.setActionHandler('pause', () => DCPlayer.pause())
          navigator.mediaSession.setActionHandler('seekbackward', () => DCPlayer.seekBackward())
          navigator.mediaSession.setActionHandler('seekforward', () => DCPlayer.seekForward())
          navigator.mediaSession.setActionHandler('previoustrack', () => DCPlayer.previous())
          navigator.mediaSession.setActionHandler('nexttrack', () => DCPlayer.next())
        }
      },
      volUp () {
        if (store.getters.ytUseVideo && store.getters.isYT) {
          store.getters.ytObject.setVolume(store.getters.ytObject.getVolume() + 5)
        } else {
          DCPlayer.eAudio.volume = Math.min(1, DCPlayer.eAudio.volume + 0.05)
        }
      },
      volDown () {
        if (store.getters.ytUseVideo && store.getters.isYT) {
          store.getters.ytObject.setVolume(store.getters.ytObject.getVolume() - 5)
        } else {
          DCPlayer.eAudio.volume = Math.max(0, DCPlayer.eAudio.volume - 0.05)
        }
      }
    }
    DCPlayer.init()
    Object.defineProperty(Vue.prototype, '$DCPlayer', { value: DCPlayer })
  }
}
