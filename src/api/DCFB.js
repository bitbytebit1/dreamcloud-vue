
var firebase = require('firebase/app')
require('firebase/auth')
require('firebase/database')

// import store from '../vuex'

// http://2ality.com/2014/09/es6-modules-final.html
// https://www.firebase.com/docs/web/guide/saving-data.html
// https://github.com/vuejs/vuefire/issues/18
var config = {
  apiKey: 'AIzaSyDSaKaRsDvmOicthSOJGvSF4iQC2ZprwFw',
  authDomain: 'dreamcloud-3f276.firebaseapp.com',
  databaseURL: 'https://dreamcloud-3f276.firebaseio.com',
  projectId: 'dreamcloud-3f276',
  storageBucket: 'dreamcloud-3f276.appspot.com',
  messagingSenderId: '137974869044'
}
// window.addEventListener('beforeunload', (event) => {
//   // Cancel the event as stated by the standard.
//   event.preventDefault();
//   console.log('wasd')
//   // Chrome requires returnValue to be set.
//   event.returnValue = 'wasssd';
// })
  
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
    this.fbhistory = this.db.ref('users/' + UID + '/History')

    if (window.localStorage) {

      // if not same user clear LS
      if(this.getLoc('dcu') !== UID) {
        this.setLoc('playlist', null)
        this.setLoc('playlistrefs', null)
        this.setLoc('subscriptions', null)
        this.setLoc('settings', null)
      }
      //set current UID
      this.setLoc('dcu', UID)

      // Get settings
      this.settings.on('value', (snap) => {
        if (snap.val() !== null) {
          this.setLoc('settings', JSON.stringify(snap.val()))
        } 
      })

      // Get playlistsRefs
      this.playlistsRefs.on('value', (snap) => {
        if (snap.val() !== null) {
          this.setLoc('playlistsRefs', JSON.stringify(snap.val()))
        }
      })

      // Get playlists
      this.playlists.on('value', (snap) => {
        if (snap.val() !== null) {
          this.setLoc('playlists', JSON.stringify(snap.val()))
        }

      })

      // Get subscriptions
      this.subscriptions.on('value', (snap) => {
        if (snap.val() !== null) {
          this.setLoc('subscriptions', JSON.stringify(snap.val()))
        }
      })

      // var connectedRef = firebase.database().ref(".info/connected")
      // connectedRef.on("value", (snap) => {
      if (!window.navigator.onLine) {
        // alert("not connected");
        let a = JSON.parse(this.getLoc('playlists'))
        let b = JSON.parse(this.getLoc('playlistsRefs'))
        let c = JSON.parse(this.getLoc('subscriptions'))
        let d = JSON.parse(this.getLoc('settings'))
        // store.commit('subscriptions', a)

        a && this.playlists.update(a)
        b && this.playlistsRefs.update(b)
        c && this.subscriptions.update(c)
        d && this.settings.update(d)
      }
      // })
    }
  }

  setLoc (a, b) {
    return window.localStorage.setItem(a, b)
  }

  getLoc (a) {
    return window.localStorage.getItem(a)
  }

  setting (name) {
    return this.settings.child(name)
  }

  settingChange (name, value) {
    this.settings.child(name).set(value)
  }

  subscriptionGet (userId) {
    return this.db.ref('users/' + userId + '/Subscriptions/')
  }

  subscriptionAdd (name, source, id, img) {
    this.subscriptions.update({[id]: {name: name, name_lower: name.toLowerCase(), source: source, id: id, img: img}})
  }

  subscriptionDelete (id) {
    this.subscriptions.child(id).remove()
  }

  // key allows old reference
  createNewPlaylist (name, json, key = false) {
    // Create new playlist reference with id.
    let nameRef
    if (key) {
      this.playlistsRefs.child(key).set({'name': name, name_lower: name.toLowerCase()})
      nameRef = key
    } else {
      nameRef = this.playlistsRefs.push({'name': name, name_lower: name.toLowerCase()}).ref.key
    }
    // Using ID + name push new song.
    this.playlists.child(nameRef).set({'name': name, name_lower: name.toLowerCase()})

    this.playlistSongAdd(nameRef, json)
  }

  playlistDelete (playlistId) {
    this.playlistsRefs.child(playlistId).remove()
    this.playlists.child(playlistId).remove()
  }
  historyPush (json) {
    // create new reference
    var songRef = this.fbhistory.push()
    // save song reference in json.key
    json.key = songRef.key
    // remove from json['.key'] bc we have to due to vue-fire
    delete json['.key']
    // format date to string
    json.uploaded = json.uploaded.toString()
    // update fb
    songRef.set(json)
  }

  historyClear () {
    this.fbhistory.remove()
  }

  playlistSongAdd (id, json) {
    let pusha = (js) => {
      // create new reference
      var songRef = this.playlists.child(id + '/songs').push()
      // save song reference in json.key
      js.key = songRef.key
      // remove from json['.key'] bc we have to
      delete js['.key']
      // format date to string
      js.uploaded = js.uploaded.toString()
      // update fb
      songRef.set(js)
    }
    if (json.length > 1) {
      for (var [key, value] of Object.entries(json)) {
        pusha(Object.assign({}, value), key)
      }
    } else {
      pusha(Object.assign({}, Array.isArray(json) ? json[0] : json))
    }
  }

  playlistSongDelete (playlistId, songId) {
    this.playlists.child(playlistId + '/songs/' + songId).remove()
  }

  playlistGet (userId, playlistId) {
    return this.db.ref('users/' + userId + '/PlaylistsData/' + playlistId + '/songs')
  }

  playlistGetAll (userId) {
    return this.db.ref('users/' + userId + '/PlaylistsData')
  }
}

export default {
  install (Vue) {
    Object.defineProperty(Vue.prototype, '$DCFB', { value: new DCFB() })
  }
}
