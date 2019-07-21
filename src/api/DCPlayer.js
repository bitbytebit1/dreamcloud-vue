/* eslint-disable */
import axios from "axios";
import store from "../vuex";
var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

export default {
  install(Vue) {
    var DCPlayer = {
      // sBase: 'https://dc-mp3-ceewhqzemu.now.sh/api/',
      sBase: 'http://dreamcloud.mynetgear.com/api/',
      // aPlaylist: [],
      // iCurrent: 0,
      eAudio: {src:''},
      // error_count: 0,
      init () {
        DCPlayer.bindMediaSesssion()
      },
      ePlayer () {
        return document.getElementById('dc-audio')
      },
      getAudio (song, hCallback) {
        // let a = 'https://cors.io/?https://www.saveoffline.com/process/?type=audio&url=' + url
        // IF SAFARI OR NOT YOUTUBE
        if (isSafari && song.mp32.indexOf("youtube") > -1) {
          return hCallback(DCPlayer.sBase + "v1/stream/?i=" + song.trackID + '&t=' + song.title)
        } else if (song.mp32.indexOf("youtube") > -1) {
          return hCallback(DCPlayer.sBase + "v2/stream/?i=" + song.trackID + '&t=' + song.title)
        } else {
          return hCallback(DCPlayer.sBase + "v3/stream/?i=" + song.mp32 + '&t=' + song.title)
        }
      },
      next () {
        // Increment unless end of playlist.
        let n = (store.getters.current_index < store.getters.current_playlist.length - 1 ? store.getters.current_index + 1 : 0)
        DCPlayer.playIndex(n)
      },
      pause () {
        if (store.getters.ytUseVideo && store.getters.isYT) {
          if (store.getters.ytIsPlaying) {
            store.getters.ytObject.pauseVideo();
          }
        } else {
          DCPlayer.eAudio.pause();
        }
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
        let n = (store.getters.current_index > 0 ? store.getters.current_index - 1 : store.getters.current_playlist.length - 1)
        // store.commit('changeIndex', store.getters.current_index)
        DCPlayer.playIndex(n)

      },
      playIndex (index) {
        let ret
        // triggers loading animation on dc-audio DCPlayer.eAudio.pause()
        DCPlayer.eAudio.src = ""
        if (store.getters.ytUseVideo && store.getters.isYT) {
          store.commit('changeIndex', index)
          return Promise.resolve()
        } 
        if(store.getters.current_playlist[index].source == 'SoundCloud'){
          ret = DCPlayer.setAudioSrc(store.getters.current_playlist[index].mp3)
        } else {
          ret = DCPlayer.play_url(store.getters.current_playlist[index])
        }
        
        this.setMediaSession(store.getters.current_playlist[index])
        store.commit('ytPause')
        store.commit('changeIndex', index)
        store.commit('dcIsLoading', true)
        return ret
      },
      play_url (sURL) {
        return DCPlayer.getAudio(sURL, DCPlayer.setAudioSrc)
      },
      setAudioSrc(sURL) {
        //append x=error_count if error_count > 0
        // DCPlayer.eAudio.src =
        //   sURL + (DCPlayer.error_count ? "&x=" + DCPlayer.error_count : "");
        DCPlayer.eAudio.src = sURL;
        // console.log(DCPlayer.eAudio)
        DCPlayer.eAudio.load();
        var play = DCPlayer.play()
          .then(() => {
            // If play then reset error_count
            DCPlayer.error_count = 0;
          })
          // Else if the user doesn't choose another track add 1 to error count and try to play again if under 5
          .catch(error => {
            if (error.toString().indexOf("interrupted by a new load request") === -1) {
              // console.log('Unable to play, error: ', error)
              DCPlayer.error_count++;
              if (store.getters.current_playlist[store.getters.current_index].mp32 != sURL) {
                // console.log('gotcha')
                return
              }
              if (DCPlayer.error_count < 6)  {
                DCPlayer.error();
              } else {
                // console.log('Failed to play 5 times, next song!')
                DCPlayer.error_count = 0;
                DCPlayer.next();
              }
            } else {
              // console.log('Error interrupted by a new load request')
            }
          });
        return play;
      },
      setPlaylist(array) {
        store.commit('current_playlist', array)
      },
      setNPlay(array) {
        store.commit('setNPlay', array)
        return DCPlayer.playIndex(array.current);
      },
      seekBackward() {
        if (store.getters.ytUseVideo && store.getters.isYT) {
          store.getters.ytObject.seekTo(store.getters.ytObject.getCurrentTime() - 10,true);
        } else {
          DCPlayer.eAudio.currentTime -= 10;
        }
      },
      seekForward() {
        if (store.getters.ytUseVideo && store.getters.isYT) {
          store.getters.ytObject.seekTo(
            store.getters.ytObject.getCurrentTime() + 10,
            true
          );
        } else {
          DCPlayer.eAudio.currentTime += 10;
        }
      },
      toggleMute() {
        if (store.getters.ytUseVideo && store.getters.isYT) {
          if (this.$store.getters.ytObject.isMuted()) {
            this.$store.getters.ytObject.unMute();
          } else {
            this.$store.getters.ytObject.mute();
          }
        } else {
          this.eAudio.muted = !this.eAudio.muted;
        }
      },
      togglePlay() {
        if (store.getters.ytUseVideo && store.getters.isYT) {
          if (store.getters.ytIsPlaying) {
            store.getters.ytObject.pauseVideo();
          } else {
            store.getters.ytObject.playVideo();
          }
        } else {
          if (DCPlayer.eAudio.paused) {
            DCPlayer.eAudio.play();
          } else {
            DCPlayer.eAudio.pause();
          }
        }
      },
      error (a) {
        setTimeout(function () {
          DCPlayer.playIndex(store.getters.current_index)
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
        let v = 0
        if (store.getters.ytUseVideo && store.getters.isYT) {
          v = store.getters.ytObject.getVolume() + 5
          store.getters.ytObject.setVolume(v)
        } else {
          v = Math.min(1, DCPlayer.eAudio.volume + 0.05)
          DCPlayer.eAudio.volume = v
        }
        return v
      },
      volDown () {
        let v = 0
        if (store.getters.ytUseVideo && store.getters.isYT) {
          v = Math.max(0, store.getters.ytObject.getVolume() - 5)
          store.getters.ytObject.setVolume(v)
        } else {
          v = Math.max(0, DCPlayer.eAudio.volume - 0.05)
          DCPlayer.eAudio.volume = v
        }
        return v
      }
    }
    DCPlayer.init()
    Object.defineProperty(Vue.prototype, '$DCPlayer', { value: DCPlayer })
  }
}
