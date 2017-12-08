import firebase from 'firebase'
// http://2ality.com/2014/09/es6-modules-final.html
// https://www.firebase.com/docs/web/guide/saving-data.html
// https://github.com/vuejs/vuefire/issues/18
// /* eslint-disable */
var config = {
  apiKey: 'AIzaSyDSaKaRsDvmOicthSOJGvSF4iQC2ZprwFw',
  authDomain: 'dreamcloud-3f276.firebaseapp.com',
  databaseURL: 'https://dreamcloud-3f276.firebaseio.com',
  projectId: 'dreamcloud-3f276',
  storageBucket: 'dreamcloud-3f276.appspot.com',
  messagingSenderId: '137974869044'
}

class DCFB {
  constructor () {
    this.playlists = ''
    this.playlistRefs = ''
    this.fb = firebase.initializeApp(config)
    this.fbb = firebase
    this.GoogleAuth = firebase.auth.GoogleAuthProvider
    this.db = firebase.database()
    this.UID = this.fb.auth.currentUser
  }

  init (UID) {
    this.UID = UID
    this.settings = this.db.ref('users/' + UID + '/Settings')
    this.playlists = this.db.ref('users/' + UID + '/PlaylistsData')
    this.playlistsRefs = this.db.ref('users/' + UID + '/PlaylistsNames')
    this.subscriptions = this.db.ref('users/' + UID + '/Subscriptions')
  }

  setting (name) {
    return this.settings.child(name)
  }

  settingChange (name, value) {
    this.settings.child(name).set(value)
  }

  subscriptionAdd (name, source, id, img) {
    this.subscriptions.update({[id]: {name: name, name_lower: name.toLowerCase(), source: source, id: id, img: img}})
  }

  subscriptionDelete (id) {
    this.subscriptions.child(id).remove()
  }

  createNewPlaylist (name, json) {
    // Create new playlist reference with id.
    var nameRef = this.playlistsRefs.push({'name': name, name_lower: name.toLowerCase()})
    // Using ID + name push new song.
    this.playlists.child(nameRef.ref.key).set({'name': name, name_lower: name.toLowerCase()})

    this.playlistSongAdd(nameRef.ref.key, json)
  }

  playlistDelete (playlistId) {
    this.playlistsRefs.child(playlistId).remove()
    this.playlists.child(playlistId).remove()
  }

  playlistSongAdd (id, json) {
    let pusha = (js) => {
      var songRef = this.playlists.child(id + '/songs').push()
      js.key = songRef.key
      delete js['.key']
      js.uploaded = js.uploaded.toString()
      songRef.set(js)
    }
    if (json.length > 1) {
      for (var [key, value] of Object.entries(json)) {
        pusha(value, key)
      }
    } else {
      json = Array.isArray(json) ? json[0] : json
      pusha(json)
    }
  }
  playlistSongDelete (playlistId, songId) {
    this.playlists.child(playlistId + '/songs/' + songId).remove()
  }

  playlistGet (userId, playlistId) {
    return this.db.ref('users/' + userId + '/PlaylistsData/' + playlistId + '/songs')
  }
}

export default {
  install (Vue, options) {
    Object.defineProperty(Vue.prototype, '$DCFB', { value: new DCFB() })
  }
}
