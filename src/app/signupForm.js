import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { auth } from './firebase.js';
import { showMessage } from './showMessage.js';
// Obtenemos una referencia al formulario de registro utilizando su ID
const signupForm = document.querySelector("#signup-form");

// Obtenemos mediante el submit los datos del formulario
signupForm.addEventListener('submit', async(e) => {
    e.preventDefault()
    const email = signupForm['signup-email'].value
    const password = signupForm['signup-password'].value

    console.log(email,password)

    try {
        //Enviar usario al servidor firebase mediante funcion createUserWithEmailAndPassword
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
        console.log(userCredentials)
       
        //Cerrar el Modal de Registro
        const signupModal = document.querySelector('#signupModal')
        const modal = bootstrap.Modal.getInstance(signupModal)
        modal.hide()

        //Despliega Toastify mediante funcion showMessage.
        showMessage("Registrado satisfactoriamente")
        showMessage("Bienvenido "+ userCredentials.user.email)
    
    } catch (error) {
        
        //Validaciones de registro con backend
        if(error.code === 'auth/email-already-in-use'){
            showMessage("Este email ya está en uso" , "error")
        } else if (error.code === 'auth/invalid-email'){
            showMessage("Email invalido, intentelo nuevamente" , "error")
        }else if (error.code === 'auth/weak-password'){
            showMessage("La contraseña es muy debil, debe tener al menos 6 caracteres","error")
        }else if (error.code){
            showMessage("Hubo un error, intentalo nuevamente")
        }
    }
});

