import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyAslYB7dyxhhbk9DB9oJu_F67RZVXGjnbQ",
  authDomain: "whatsapp-2-cbac0.firebaseapp.com",
  projectId: "whatsapp-2-cbac0",
  storageBucket: "whatsapp-2-cbac0.appspot.com",
  messagingSenderId: "1067230295150",
  appId: "1:1067230295150:web:01738f393b810d55f3e27f"
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider(); 


export {db, auth, provider};