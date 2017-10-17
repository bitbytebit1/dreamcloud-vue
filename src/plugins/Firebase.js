import firebase from 'firebase'
// http://2ality.com/2014/09/es6-modules-final.html
/* eslint-disable */

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
  constructor() {
    this.UID = ''
    this.playlists = ''
    this.playlistRefs = ''
  }

  init(UID) {
    this.UID = UID
    this.playlists = db.ref('users/' + UID + '/PlaylistsData')
    this.playlistsRefs = db.ref('users/' + UID + '/PlaylistsNames')
    this.playlists.on("value", function(snapshot) {
      var changedPost = snapshot.val();
      console.log('snapshot', changedPost);
    });    
  }
  
  setUpUserAccount(UID) {
    db.ref('users').set(UID)
  }
  createNewPlaylist(name, json){
    //Create new playlist reference with id.
    var nameRef = this.playlistsRefs.push(name)
    //Using ID + name push new song.
    this.playlists.child(nameRef.ref.key).set({'name': name})
    this.playlists.child(nameRef.ref.key + '/songs').push(json)
  }
  addSongToPlaylist (id, json) {
    console.log('adding to playlist')
    this.playlists.child(id + '/songs').push(json)
  }

  getPlaylist(userId, playlistId){
    console.log('getting playlist' , userId, playlistId)
    return db.ref('users/' + userId + '/PlaylistsData/' + playlistId + '/songs')
  }
}
export let DCFB = new DCFB1()
