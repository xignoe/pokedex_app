// Create pokemon repository IIFE

let pokemonRepository = (function () {

    let pokemonApiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=10';

    let pokemonList = [];

    function add(pokemon) {
        if ("name" in pokemon && typeof pokemon === "object" && "detailsUrl" in pokemon) {
            pokemonList.push(pokemon);
        } else {
            console.log("Incorrect pokemon");
        }
    }

    function loadList() {
        return fetch(pokemonApiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (pokemonObject) {
                let pokemon = {
                    detailsUrl: pokemonObject.url,
                    name: pokemonObject.name
                };
                add(pokemon);
            });
    }).catch(function (err) {
        console.error(err);
        })
    }

    function loadDetails(pokemonObject) {
        let url = pokemonObject.detailsUrl;
        return fetch(url).then((response) => {
            return response.json();
        }).then(function (details) { 
            pokemonObject.types = details.types;
            pokemonObject.height = details.height;
            pokemonObject.imageUrl = details.sprites.front_default;
        }).catch(function (err) {
            console.error(err);
        });
    }
    
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
        loadDetails(pokemon).then(function () {
            console.log(pokemon);
        });
    }
    
    const getAll = () => pokemonList;

    return {
        getAll,
        loadList,
        showDetails,
        add,
        addListItem,
    };
    

})();


// Use getAll function to return pokemon list and forEach loop to print pokemon info to index.html
pokemonRepository.loadList().then(()=>{
    pokemonRepository.getAll().forEach((pokemon)=> {
        pokemonRepository.addListItem(pokemon);
    })
});
