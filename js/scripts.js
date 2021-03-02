// Create pokemon repository IIFE

let pokemonRepository = (function () {

    let pokemonList = [
        { name: 'Cloyster', height: 1.5, types: ['ice','water'] }, 
        { name: 'Charizard', height: 1.7, types: ['fire', 'flying'] },
        { name: 'Gengar', height: 1.5, types: ['ghost', 'poison'] },
        { name: 'Electrode', height: 1.2, types: ['electric'] },
        { name: 'Dragonite', height: 2.2, types: ['dragon', 'flying'] },
        { name: 'Exeggutor', height: 2, types: ['psychic', 'grass'] }
    ];

    return {
        getAll: function() {
            return pokemonList;
        },

        add: function(pokemon) {
            pokemonList.push(pokemon);
        }
    };
})();

function addListItem(pokemon) {
    let pokeName = pokemon.name;
    let pokeHeight = pokemon.height;
    let pokemon_list_index = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokeName;
    button.classList.add('pokemon-list-item');
    button.classList.add('button-style');
    listItem.appendChild(button);
    pokemon_list_index.appendChild(listItem);
    button.addEventListener('click', function() {
        showDetails(pokemon);
    })
}
    
function showDetails(pokemon) {
    console.log(pokemon);
}

// Use getAll function to return pokemon list and forEach loop to print pokemon info to index.html

pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
})

