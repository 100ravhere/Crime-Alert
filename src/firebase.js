import firebase from "firebase/app"
import 'firebase/database';
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/firestore'
const app=firebase.initializeApp({
    apiKey: "AIzaSyAgU4ddWxGWhuIaiCXNX5NbfCm7aLfBBsE",
    authDomain: "crimeweb-fe699.firebaseapp.com",
    projectId: "crimeweb-fe699",
    storageBucket: "crimeweb-fe699.appspot.com",
    messagingSenderId: "987379938153",
    appId: "1:987379938153:web:12b4b9052aeeb8d98843f8"
  });
  
  export const auth = app.auth();
  export const db = firebase.firestore(app);
  const storage = app.storage();
  export  {
    storage, app as default
  }