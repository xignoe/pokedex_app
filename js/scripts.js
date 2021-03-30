// Create pokemon repository IIFE
let pokemonRepository = (function(){

    // Define API URL and create pokemon list
    let pokemonList = [];
    let pokemonApiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    let searchInput = document.querySelector('#search-bar');
  
    const getAll = () => pokemonList;
  
    // add pokemon to list
    function add(pokemon) {
        if (typeof (pokemon) === "object") {
            pokemonList.push(pokemon);
        } else {
            console.log("Incorrect pokemon");
        }
    }
    
    // function to build pokedex list structure
    function addListItem(pokemon) {
        //pokemon name and variables
        let container = document.querySelector('.list-group');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        let pokeName = pokemon.name;

        listItem.classList.add('list-group-item');
        listItem.classList.add('list-group-item-action');

        // generate entries for pokemon
        button.innerText = pokeName;
        button.classList.add('btn');
        button.classList.add('btn-block');
        button.setAttribute('data-target', '#pokemonModal');
        button.setAttribute('data-toggle', 'modal');

        // create structure for lists
        listItem.appendChild(button);
        container.appendChild(listItem);
        button.addEventListener('click', function(){
        showDetails(pokemon);
      });
    }

    // fetch from pokemon API URL
    function loadList() {
        return fetch(pokemonApiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (pokemonItem) {
                let pokemon = {
                    detailsUrl: pokemonItem.url,
                    name: pokemonItem.name
                };
                add(pokemon);
            });
    }).catch(function (err) {
        console.error(err);
        })
    }

    // function to load pokemon details
    function loadDetails(pokemon) {
        let url = pokemon.detailsUrl;

        return fetch(url).then((response) => {
            return response.json();
        }).then(function (details) { 
            pokemon.types = details.types;
            pokemon.height = details.height;
            pokemon.imageUrl = details.sprites.front_default;
        }).catch(function (err) {
            console.error(err);
        });
    }


  
    // function log pokemon details to the console
    function showDetails(pokemon) {
  
        loadDetails(pokemon).then(function () {
        let modalTitle = $('.modal-title');
        let modalBody = $('.modal-body');
        modalTitle.empty();
        modalBody.empty();
    
        let pokeName = $('<h1>' + pokemon.name + '</h1>');
        let pokeImage = $('<img class="modal-img" style="width:40%">');
        pokeImage.attr('src', pokemon.imageUrl);
        let pokeHeight = $('<p>' + 'Height: ' + pokemon.height + '</p>');
    
        modalTitle.append(pokeName);
        modalBody.append(pokeImage);
        modalBody.append(pokeHeight);
        });
    }

    // create search input functionality
    searchInput.addEventListener('input', function(){
        let pokeList = document.querySelectorAll('.list-group-item');
        let filter = searchInput.value.toUpperCase();
  
        pokeList.forEach(function(pokemon){
              console.log(pokemon.innerText);

              if(pokemon.innerText.toUpperCase().indexOf(filter) > -1){
                  pokemon.style.display = '';
              } else {
                  pokemon.style.display = 'none';
              }
          })
      });
  
    return {
        getAll,
        addEventListener,
        addListItem,
        showDetails,
        loadList,
        loadDetails,
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




