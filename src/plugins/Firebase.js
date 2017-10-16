import firebase from 'firebase'

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
