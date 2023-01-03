import {signOut} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import {auth} from './firebase.js'


const logout = document.querySelector('#logout')

logout.addEventListener('click', () => {
    signOut(auth)
    console.log("user signed out")
})

