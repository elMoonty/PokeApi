
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
  import {getAuth} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries
  
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyC9O5En6QTTnKs4ynQXvL0CYkvb1gj013Y",
    authDomain: "pokeapi-jeffmontoya.firebaseapp.com",
    projectId: "pokeapi-jeffmontoya",
    storageBucket: "pokeapi-jeffmontoya.appspot.com",
    messagingSenderId: "727527516539",
    appId: "1:727527516539:web:8307ac0c6ba699f5ab35de"
  };

  // Initialize Firebase
  export const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);