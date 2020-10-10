import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyCHgnnzd8nu-A0T5y1E9FgB1zSrHKTX2v8",
    authDomain: "imessage-clone-yt-fa02b.firebaseapp.com",
    databaseURL: "https://imessage-clone-yt-fa02b.firebaseio.com",
    projectId: "imessage-clone-yt-fa02b",
    storageBucket: "imessage-clone-yt-fa02b.appspot.com",
    messagingSenderId: "922204195711",
    appId: "1:922204195711:web:1832a0e19b828008ac284a",
    measurementId: "G-G3BXFH1T27"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider =  new firebase.auth.GoogleAuthProvider();

  export {auth, provider};
  export default db; 


