let pokemonList = [
    { name: 'Cloyster', height: 1.5, types: ['ice','water'] }, 
    { name: 'Charizard', height: 1.7, types: ['fire', 'flying'] },
    { name: 'Gengar', height: 1.5, types: ['ghost', 'poison'] },
    { name: 'Electrode', height: 1.2, types: ['electric'] },
    { name: 'Dragonite', height: 2.2, types: ['dragon', 'flying'] },
    { name: 'Exeggutor', height: 2, types: ['psychic', 'grass'] }
];

console.log("test");

for (let i = 0; i < pokemonList.length; i++) {
    if (pokemonList[i].height >= 2.2) {
        console.log("Wow that's big!");
        document.write('<p>' + pokemonList[i].name + ' (height: ' + pokemonList[i].height + ') - Wow that is big!' + '</p>');
    } else {
        document.write('<p>' + pokemonList[i].name + ' (height: ' + pokemonList[i].height + ')');
    }


}