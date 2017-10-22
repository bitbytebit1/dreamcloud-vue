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

export const fb = firebase.initializeApp(config)
export const db = firebase.database()

class DCFB1 {
  constructor () {
    this.UID = ''
    this.playlists = ''
    this.playlistRefs = ''
  }

  init (UID) {
    this.UID = UID
    this.playlists = db.ref('users/' + UID + '/PlaylistsData')
    this.playlistsRefs = db.ref('users/' + UID + '/PlaylistsNames')
    this.subscriptions = db.ref('users/' + UID + '/Subscriptions')
  }

  subscriptionAdd (name, source, id, img) {
    this.subscriptions.update({[id]: {name: name, source: source, id: id, img: img}})
  }

  subscriptionDelete (id) {
    this.subscriptions.child(id).remove()
  }

  createNewPlaylist (name, json) {
    delete json['.key']
    // Create new playlist reference with id.
    var nameRef = this.playlistsRefs.push(name)
    // Using ID + name push new song.
    this.playlists.child(nameRef.ref.key).set({'name': name})
    this.playlists.child(nameRef.ref.key + '/songs').push(json)
  }

  playlistDelete (playlistId) {
    this.playlistsRefs.child(playlistId).remove()
    this.playlists.child(playlistId).remove()
  }

  playlistSongAdd (id, json) {
    delete json['.key']
    this.playlists.child(id + '/songs').push(json)
  }

  playlistGet (userId, playlistId) {
    return db.ref('users/' + userId + '/PlaylistsData/' + playlistId + '/songs')
  }
}
export let DCFB = new DCFB1()
