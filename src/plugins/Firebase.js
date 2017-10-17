import firebase from 'firebase'
// http://2ality.com/2014/09/es6-modules-final.html
/* eslint-disable */
var dummy = [{"artistID":"UC4MR4pqJYgk9mfr2iPwub7g","created":"2017-06-13T22:00:00.000Z","description":"https://cultmountain616.bandcamp.com/album/616sons Directed by AboveGround Shouts to Vikki Produced by Trellion & Sumgii.","duration":"","mp3":"https://dream.tribe.nu/r3/off/?q=https://www.youtube.com/watch?v=Rcp7PE44TE4","mp32":"https://www.youtube.com/watch?v=Rcp7PE44TE4","poster":"https://i.ytimg.com/vi/Rcp7PE44TE4/hqdefault.jpg","posterLarge":"https://i.ytimg.com/vi/Rcp7PE44TE4/hqdefault.jpg","source":"YouTube","title":"CULT MOUNTAIN - BRINK","trackID":"Rcp7PE44TE4"},{"artistID":"UC4MR4pqJYgk9mfr2iPwub7g","created":"2017-06-13T22:00:00.000Z","description":"https://cultmountain616.bandcamp.com/album/616sons Directed by AboveGround Shouts to Vikki Produced by Trellion & Sumgii.","duration":"","mp3":"https://dream.tribe.nu/r3/off/?q=https://www.youtube.com/watch?v=Rcp7PE44TE4","mp32":"https://www.youtube.com/watch?v=Rcp7PE44TE4","poster":"https://i.ytimg.com/vi/Rcp7PE44TE4/hqdefault.jpg","posterLarge":"https://i.ytimg.com/vi/Rcp7PE44TE4/hqdefault.jpg","source":"YouTube","title":"CULT MOUNTAIN - BRINK","trackID":"Rcp7PE44TE4"}]
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
  }

  init(UID) {
    this.UID = UID
    this.playlists = db.ref('users/' + UID + '/Playlists')    
  }
  
  setUpUserAccount(UID) {
    db.ref('users').set(UID)
  }
  
  addPlaylist (name, json) {
    this.playlists.update({[name] : dummy})
  }
}
export let DCFB = new DCFB1()
