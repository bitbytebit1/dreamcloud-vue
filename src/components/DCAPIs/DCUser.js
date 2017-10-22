/* eslint-disable */
import axios from 'axios'
const DCUserPlug = {
  install (Vue, options) {
    var DCUser = {
      getUserPlaylist: function (sUser, sPlaylist, hCallback) {
        return axios.get('http://dream.tribe.nu/r3/php/playlist.php?q=' + sPlaylist + '&user='+ sUser).then(hCallback)
      },
      getUserIndex: function (sUser, hCallback) {
        return axios.get('http://dream.tribe.nu/r3/php/user-playlist-index.php?user=' + sUser).then(hCallback)
      }
    }
    Object.defineProperty(Vue.prototype, '$DCUser', { value: DCUser })
  }
}
export default DCUserPlug
