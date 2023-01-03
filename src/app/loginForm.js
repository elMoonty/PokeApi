import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { auth } from "./firebase.js";
import { showMessage } from "./showMessage.js";


const loginForm = document.querySelector("#login-form")


loginForm.addEventListener('submit', async e => {
    e.preventDefault()

    const email = loginForm["login-email"].value
    const password = loginForm["login-password"].value
    
    try {
        //Enviar usario al servidor firebase mediante funcion signInWithEmailAndPassword
        const credentials = await signInWithEmailAndPassword(auth, email, password)
        console.log(credentials)
       
        //Cerrar el Modal de Inicio de sesión
        const loginModal = document.querySelector('#signinModal')
        const modal = bootstrap.Modal.getInstance(loginModal)
        modal.hide()

        //Despliega Toastify mediante funcion showMessage.
        showMessage("Bienvenido "+ userCredentials.user.email)
    
    } catch (error) {
        
        //Validaciones de inicio con backend
        if(error.code === 'auth/wrong-password'){
            showMessage("Contraseña incorrecta" , "error")
        } else if (error.code === 'auth/user-not-found'){
            showMessage("Usuario no encontrado" , "error")
        }else if (error.code){
            showMessage(error.massage, 'error')
        }
    }
})