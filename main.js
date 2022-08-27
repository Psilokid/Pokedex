let currentPokemon;

async function GetPokemons() {
    let url = `https://pokeapi.co/api/v2/pokemon/pikachu`;
    let response = await fetch(url);
    currentPokemon = await response.json();

    renderPokemon();

    console.log('API answers', currentPokemon);
}

function renderPokemon() {
    let boxPokemon = document.querySelector('.place_content');
    let pokemonImg = currentPokemon['sprites']['other']['dream_world']['front_default'];

    boxPokemon.innerHTML += /*html*/ `    
    <div class="box_content">
 
        <div class="place_info">
            <h1 class="pokemon_head">${currentPokemon['name']}</h1>
            <h2 class="pokemon_num">#${currentPokemon['id']}</h2>
            <div class="place_characteristics">
                <img class="icon_characteristics" src="./img/leaf.ico">
                <div  class="characteristics">
                    Poison
                </div>
            </div>
        </div>
        <img class="pokemon_img" src="${pokemonImg}" alt="pokemon">
    </div>`
}