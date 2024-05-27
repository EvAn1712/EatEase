import { getApps, initializeApp } from "firebase/app"; 
const firebaseConfig = {
    apiKey: "AIzaSyDYvt8Z76QdcJj_C9hPygGxA4qXMI3r-P4",
    authDomain: "eatease-87ab6.firebaseapp.com",
    databaseURL: "https://eatease-87ab6-default-rtdb.firebaseio.com",
    projectId: "eatease-87ab6",
    storageBucket: "eatease-87ab6.appspot.com",
    messagingSenderId: "1035541485789",
    appId: "1:1035541485789:web:71ea767147803a4f812334",
    measurementId: "G-JFHF1PN1L4"
  };
  
  let firebase_app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  export default firebase_app;