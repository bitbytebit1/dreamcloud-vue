/* eslint-disable */
import axios from 'axios'
const DCPlayerPlug = {
  install (Vue, options) {
    var DCPlayer = {
      aPlaylist: [],
      iCurrent: 0,
      ePlayer: function () {
        return document.getElementById('dc-audio')
      },
      setPlaylist: function (array) {
        DCPlayer.aPlaylist = array
      },
      setNPlay: function (array, index) {
        DCPlayer.setPlaylist(array)
        DCPlayer.iCurrent = index
        DCPlayer.play(array[index].mp32)
      },
      play: function (sURL) {
        return DCPlayer.getAudio(sURL, function (resp) {
          DCPlayer.ePlayer().src = resp
          DCPlayer.ePlayer().play()
          // Not sure why but seems we have to rebind after src change?
          DCPlayer.ePlayer().addEventListener('ended', DCPlayer.next, false)
          DCPlayer.ePlayer().addEventListener('error', DCPlayer.error, false)
        })
      },
      getAudio: function (url, hCallback) {
        var ax = axios.get('https://www.saveitoffline.com/process/?type=audio&url=' + url)
        ax.then(function (resp) {
          if (('data' in resp) && (resp.data !== 'Error: no_media_found')) {
            for (var i = 0; i < resp.data.urls.length; i++) {
              if (resp.data.urls[i].label.indexOf('audio') > -1 || resp.data.urls[i].label.indexOf('m4a') > -1) {
                hCallback(resp.data.urls[i].id)
                break
              }
            }
          } else {
            console.log('error??')
          }
        })
        return ax
      },
      error: function (a) {
        // console.log('error', a)
        this._error_count = this._error_count || 0
        if (this._error_count < 5) {
          this._error_count++
          console.log('Trying to play again', this._error_count)
          setTimeout(function () {
            // document.querySelector('#dc-audio').src = ''
            DCPlayer.play(DCPlayer.aPlaylist[DCPlayer.iCurrent].mp32).then(function (resp) {
              document.querySelector('#dc-audio').addEventListener('playing', function (){
                this._error_count = 0;
              })
              document.querySelector('#dc-audio').addEventListener('error', function () {
                if(this._error_count == 4){
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
      next: function () {
        // Increment unless end of playlist.
        DCPlayer.iCurrent = (DCPlayer.iCurrent < DCPlayer.aPlaylist.length ? DCPlayer.iCurrent + 1 : 0)
        DCPlayer.play(DCPlayer.aPlaylist[DCPlayer.iCurrent].mp32)
      }
    }
    Object.defineProperty(Vue.prototype, '$DCPlayer', { value: DCPlayer })
  }
}
export default DCPlayerPlug
