let url = `https://pokeapi.co/api/v2/pokemon/`;
let allPokemon = [];
let currentPokemon;

async function GetPokemons() {
    for (let i = 0; i < 15; i++) {
        const pokemonUrl = url + (i + 1);

        let response = await fetch(pokemonUrl);
        currentPokemon = await response.json();
        allPokemon.push(currentPokemon);
        renderPokemon(i);
        renderTypes(i);
    }



    console.log('API answers', currentPokemon);
}

function renderPokemon(i) {
    let boxPokemon = document.querySelector('.place_content');
    let pokemonImg = currentPokemon['sprites']['other']['dream_world']['front_default'];

    boxPokemon.innerHTML += /*html*/ `    
        <div class="box_content">
            <div class="place_info">
                <h1 class="pokemon_head">${currentPokemon['name']}</h1>
                <h2 class="pokemon_num">#${currentPokemon['id']}</h2>
                <div id="place_characteristics${i}" class="place_characteristics">

                </div>
            </div>
            <img class="pokemon_img" src="${pokemonImg}" alt="pokemon">
        </div>`

}


function renderTypes(i) {
    for (let j = 0; j < currentPokemon['types'].length; j++) {
        const type = currentPokemon['types'][j];

        document.getElementById('place_characteristics' + i).innerHTML += `
            <div class="box_characteristics">
                <div class="box_icon">
                    <img class="icon_characteristics" src="icons/${type['type']['name']}.png">
                </div>
                <p  class="characteristics">
                    ${type['type']['name']}
                </p>
             </div>`

    }
}