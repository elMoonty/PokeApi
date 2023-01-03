//Este metodo que importo, funciona para identificar si el usuario está logueado o no.
import {onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import {app, auth} from './app/firebase.js'
import {loginCheck} from './app/loginCheck.js'
import './app/signupForm.js'
import './app/logout.js'
import './app/loginForm.js'
import { showMessage } from "./app/showMessage.js";

let currentUser = null;

onAuthStateChanged(auth, async (user) => {
    console.log(user);
    loginCheck(user);
    currentUser = user;
})

const principalContainer = document.querySelector('.principal-container')


//En esta función me conecto a la Api mediante la función fetch y esta me devuelve un JSON
function traerPokemon(id){
	fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
	.then(res => res.json())
	.then(data => crearPokemon(data))
}

//Esta función sirve para traer la cantidad de pokemons que necesito
function traerPokemons(number){
	for( let i = 1; i <= number; i++){
		traerPokemon(i)
	}
}

//Esta función sirve para crear la tarjeta del pokemon
function crearPokemon(pokemon){
	//creo un Div que será la tarjeta del pokemon
	const card = document.createElement('div');
	card.classList.add('pokemon-card')

	//aqui creo un h3 donde le enviare la propiedad nombre del pokemon
	const name = document.createElement('h3');
	name.classList.add('name')
	name.textContent = pokemon.name

	//añado nombre el nombre a la tarjeta
	card.appendChild(name)

	//envio la tarjeta al contendor principal
	principalContainer.appendChild(card)

    
    card.addEventListener('click', function() {
        if (currentUser === null){
            showMessage("Debe Iniciar sesión para poder ver las habilidades","Error")
        } else {
            openAbilitiesPage(pokemon);
        }
    });
}

//Esta función sirve para abrir la pagina de Habilidades
async function openAbilitiesPage(pokemon) {
	// Abrimos una pestaña en blanco
    
	var newWindow = window.open('', '_blank');
  
	// Obtenemos la información del pokemon y sus habilidades a través de la PokeAPI
	var response = await fetch('https://pokeapi.co/api/v2/pokemon/' + pokemon.id);
	var pokemonData = await response.json();
	var abilities = pokemonData.abilities;
	var imageUrl = pokemonData.sprites.front_default; // URL de la imagen del pokemon
  
	// Creamos un elemento h1 y le asignamos el nombre del pokemon
	var h1 = newWindow.document.createElement('h1');
	h1.textContent = pokemon.name;
  
	// Creamos un elemento img y le asignamos la URL de la imagen del pokemon
	var img = newWindow.document.createElement('img');
	img.src = imageUrl;
  
	// Creamos un elemento ul para las habilidades
	var ul = newWindow.document.createElement('ul');
  
	// Creamos un elemento li para cada habilidad y la agregamos al ul
	abilities.forEach(function(ability) {
	  var li = newWindow.document.createElement('li');
	  li.textContent = ability.ability.name;
	  ul.appendChild(li);
	});
  
	// Agregamos el h1, el img y el ul al body del documento de la nueva pestaña
	newWindow.document.body.appendChild(h1);
	newWindow.document.body.appendChild(img);
	newWindow.document.body.appendChild(ul);
  }

//Traigo los primeros 90 pokemons
traerPokemons(90);
