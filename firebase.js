import firebase from "firebase";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD0yF5WoW1XoZwbs-R3AS3XRzCZbpJNdC0",
  authDomain: "clone-8ade1.firebaseapp.com",
  projectId: "clone-8ade1",
  storageBucket: "clone-8ade1.appspot.com",
  messagingSenderId: "1001012800308",
  appId: "1:1001012800308:web:9672696b937a057bd7d361",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();

export default db;
