// Create pokemon repository IIFE

let pokemonRepository = (function () {

    // Define API URL and create pokemon list
    let pokemonApiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=10';
    let pokemonList = [];
    let modalContainer = document.querySelector('.modal-container');

    const getAll = () => pokemonList;

    // add pokemon to list
    function add(pokemon) {
        if (typeof (pokemon) === "object") {
            pokemonList.push(pokemon);
        } else {
            console.log("Incorrect pokemon");
        }
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
//        toggleLoadingMessage();
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
    
    // function to build pokedex list structure
    function addListItem(pokemon) {
        //pokemon name and variables
        let pokeName = pokemon.name;
        let pokeList = document.querySelector('ul');
        let listItem = document.createElement('li');
        let button = document.createElement('button');

        // generate entries for pokemon
        button.innerText = pokeName;
        button.classList.add('pokemonListItem');
        button.classList.add('buttonStyle');

        addEventListener(button, pokemon);

        // create structure for lists
        listItem.appendChild(button);
        pokeList.appendChild(listItem);
    }
        
    // display modal for pokemon
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            // clear modal
            modalContainer.innerHTML = '';
            modalContainer.addEventListener('click', (err) => {
                if (err.target === modalContainer) {
                    hideModal();
                }
            });

            // generate new modal
            let modal = document.createElement('div');
            let buttonDiv = document.createElement('div');
            let imageDiv = document.createElement('div');
            let textDiv = document.createElement('div');
            buttonDiv.classList.add('buttonDiv');
            imageDiv.classList.add('imageDiv');
            modal.classList.add('modal');
            
            // create modal content
            let closeButtonElement = document.createElement('button');
            closeButtonElement.classList.add('modalClose');
            closeButtonElement.innerHTML = 'X';
            closeButtonElement.addEventListener('click', () => {
                hideModal();
            })

            let modalElements = document.createElement('div');
            modalElements.classList.add('modalElements');

            let pokemonImage = document.createElement('img');
            pokemonImage.classList.add('modalImage');
            pokemonImage.src = pokemon.imageUrl;

            let pokemonName = document.createElement('h1');
            pokemonName.classList.add('modalElementItem');
            pokemonName.innerHTML = pokemon.name;

            // append content to modal structure
            modalElements.append(pokemonName);
            buttonDiv.append(closeButtonElement);
            imageDiv.append(pokemonImage);
            modal.append(buttonDiv, imageDiv, modalElements);
            modalContainer.append(modal);

            // make visible
            modalContainer.classList.add('is-visible');

            //escape key
            window.addEventListener('keydown', (esc) => {
                if (esc.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
                    hideModal();  
                }
            });
        });
    }
    
    function hideModal() {
        modalContainer.classList.remove('is-visible');
    }
        
    modalContainer.addEventListener('click', (e) => {
          // Since this is also triggered when clicking INSIDE the modal
          // We only want to close if the user clicks directly on the overlay
        let target = e.target;
          if (target === modalContainer) {
            hideModal();
          }
    });

    function addEventListener(button, pokemon) {
        button.addEventListener('click', function() {
            showDetails(pokemon);
        });
    }

      

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