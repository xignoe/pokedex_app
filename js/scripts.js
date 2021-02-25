let pokemonList = [
    { name: 'Cloyster', height: 1.5, types: ['ice','water'] }, 
    { name: 'Charizard', height: 1.7, types: ['fire', 'flying'] },
    { name: 'Gengar', height: 1.5, types: ['ghost', 'poison'] },
    { name: 'Electrode', height: 1.2, types: ['electric'] },
    { name: 'Dragonite', height: 2.2, types: ['dragon', 'flying'] },
    { name: 'Exeggutor', height: 2, types: ['psychic', 'grass'] }
];

console.log("test");

pokemonList.forEach(function(pokemon){
    if (pokemon.height >= 2.2) {
        console.log("Wow that's big!");
        document.write('<p>' + pokemon.name + ' (height: ' + pokemon.height + ') - Wow that is big!' + '</p>');
    } else {
        document.write('<p>' + pokemon.name + ' (height: ' + pokemon.height + ')');
    }

})