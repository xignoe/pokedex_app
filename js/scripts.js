// Commented out the IIFE wrapping because the index.html does not display anything otherwise, please advise.
//(function () { 
    let pokemonList = [
        { name: 'Cloyster', height: 1.5, types: ['ice','water'] }, 
        { name: 'Charizard', height: 1.7, types: ['fire', 'flying'] },
        { name: 'Gengar', height: 1.5, types: ['ghost', 'poison'] },
        { name: 'Electrode', height: 1.2, types: ['electric'] },
        { name: 'Dragonite', height: 2.2, types: ['dragon', 'flying'] },
        { name: 'Exeggutor', height: 2, types: ['psychic', 'grass'] }
    ];
//})();

let pokemonRepository = (function () {
    return {
        getAll: function() {
            return pokemonList;
        },

        add: function(pokemon) {
            pokemonList.push(pokemon);
        }
    };
})();

(function () {

    pokemonList.forEach(function(pokemon){
        let pokeName = pokemon.name;
        let pokeHeight = pokemon.height;

        if (pokeHeight >= 2.2) {
            console.log("Wow that's big!");
            document.write('<p>' + pokeName + ' (height: ' + pokeHeight + ') - Wow that is big!' + '</p>');
        } else {
            document.write('<p>' + pokeName + ' (height: ' + pokeHeight + ')');
        }
    
    })

})();

