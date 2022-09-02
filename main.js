let url = `https://pokeapi.co/api/v2/pokemon/`;
let allPokemon = [];
let likedPokemons = [];
let stats = [];
let placePokemon = document.querySelector('.place_content');
let currentSelection;



async function GetPokemons() {
    placePokemon.innerHTML = "";
    for (let i = 0; i < 15; i++) {
        const pokemonUrl = url + (i + 1);

        let response = await fetch(pokemonUrl);
        let currentPokemon = await response.json();
        allPokemon.push(currentPokemon);


        renderPokemon(i);
        renderTypes(i);
    }

}

function renderFeed() {
    document.getElementById('navInput').value = "";
    placePokemon.innerHTML = "";
    currentSelection = allPokemon;
    for (let i = 0; i < currentSelection.length; i++) {
        renderPokemon(i);
        renderTypes(i);
    }
}


function renderPokemon(i) {
    currentSelection = allPokemon;
    placePokemon.innerHTML += generatePokemons(i);

}


function renderTypes(i) {
    let placeCharacteristics = document.getElementById('place_characteristics' + i);
    placeCharacteristics.innerHTML = "";

    for (let j = 0; j < currentSelection[i]['types'].length; j++) {
        let type = currentSelection[i]['types'][j];

        placeCharacteristics.innerHTML += generateTypes(i, type);
    }
}

function renderTypesOp(i) {

    for (let j = 0; j < currentSelection[i]['types'].length; j++) {
        let type = currentSelection[i]['types'][j];

        document.getElementById('headingCharacteristics').innerHTML += generateTypesOp(type);
    }
}

function cmToMeter() {
    let centimeter = document.getElementById('length').textContent;
    centimeter = parseFloat(centimeter);
    let meter = centimeter / 10;

    document.getElementById("length").innerHTML = `${meter} Meter`;

}

function abilityBar(i) {
    let box_bar = document.getElementById('placeStatsNum');
    stats = [];
    for (let j = 0; j < currentSelection[i]['stats'].length; j++) {
        let stat = currentSelection[i]['stats'][j]['base_stat'];
        stats.push(stat);

        box_bar.innerHTML += generateBar(j, stat);

        styleBar(j, stat);
    }
}

function styleBar(j, stat) {
    document.getElementById('bar' + j).style.width = `${stat - 10}%`;

    if (stats[j] >= 50) {
        document.getElementById('bar' + j).style.backgroundColor = "#115411";
    } else {
        document.getElementById('bar' + j).style.backgroundColor = "#861010 ";
    }
}

function nextPokemon(i) {
    let x = i == currentSelection.length - 1 ? currentSelection[0]['name'] : currentSelection[i + 1]['name'];
    return x;
}

function prevPokemon(i) {
    if (i == 1) {
        return currentSelection[0]['name'];

    } else if (i == 0) {
        return currentSelection[currentSelection.length - 1]['name']

    } else {
        return currentSelection[i - 1]['name'];
    }

}

function switchNext(i) {
    let x = i == currentSelection.length - 1 ? openPokemon(0) : openPokemon(i + 1);
}

function switchPrev(i) {
    if (i == 1) {
        openPokemon(0);

    } else if (i == 0) {
        openPokemon(currentSelection.length - 1);

    } else {
        openPokemon(i - 1);
    }
}

function filterPokemons() {
    let search = document.getElementById('navInput').value;
    search = search.toLowerCase();
    placePokemon.innerHTML = "";

    for (let i = 0; i < currentSelection.length; i++) {
        const Pokemon = currentSelection[i];
        if (Pokemon['name'].toLowerCase().includes(search)) {
            currentSelection === likedPokemons ? generateFavoritePokemons(i) : renderPokemon(i);
            renderTypes(i);
        }
    }

}

function likePokemon(i) {
    let heart = document.getElementById('heart');
    let currentPokemon = currentSelection[i];
    if (heart.classList.contains('far')) {
        heart.classList.remove('far');
        heart.classList.add('fas');
        deleteDuplicates(currentPokemon);
    } else {
        heart.classList.add('far');
        heart.classList.remove('fas');
        likedPokemons.splice(currentPokemon, 1);
    }
    saveLike();
}

function addLikeSymbol(i) {
    let heart = document.getElementById('heart');
    const filteredPokemons = likedPokemons.filter((pokemon) => {
        if (pokemon.name == currentSelection[i].name) {
            heart.classList.remove('far');
            heart.classList.add('fas');
        }
    })

}

function deleteDuplicates(currentPokemon) {
    const filteredPokemons = likedPokemons.filter((pokemon) => {
        return pokemon.name !== currentPokemon.name
    })

    likedPokemons = [...filteredPokemons, currentPokemon]
}



function renderfavoritePokemons() {
    loadLike();
    document.getElementById('navInput').value = "";
    placePokemon.innerHTML = "";
    currentSelection = likedPokemons;
    for (let i = 0; i < currentSelection.length; i++) {
        generateFavoritePokemons(i);
        renderTypes(i);
    }

}



function calculateId(i) {
    let id = currentSelection[i]['id'];
    if (i < 10) {
        return `#00${id}`
    } else if (i < 100) {
        return `#0${id}`
    } else {
        return `#${id}`
    }
}

function saveLike() {
    let favoritePokemons = JSON.stringify(likedPokemons);

    localStorage.setItem('favoritePokemons', favoritePokemons);

}

function loadLike() {
    let getfavoritePokemons = localStorage.getItem('favoritePokemons')

    likedPokemons = JSON.parse(getfavoritePokemons);
}

function backToOverview() {
    let containerOpenPokemon = document.getElementById('containerOpenPokemon');

    containerOpenPokemon.innerHTML = "";


}

function openPokemon(i) {
    let containerOpenPokemon = document.getElementById('containerOpenPokemon');

    containerOpenPokemon.innerHTML = generateOpenPokemon(i);

    addLikeSymbol(i);
    renderTypesOp(i);
    cmToMeter();
    abilityBar(i);
}

function generateOpenPokemon(i) {
    return `
       <div id="PlaceOpenedPokemon" class="place_opened_pokemon">
            <div class="place_id">
                <p class="id">${calculateId(i)}</p> 
            </div>
            <div class="navbar_op">
                <button onclick="backToOverview()" class="btn_back">
                  <img class="img_back" src="./icons/back.png" />
                  <p class="d-none_btnback_des" id="btnBack">Back to Overview</p>
                  <p class="d-none_btnback_res" id="btnBack"</p>
               </button>
                <div class="box_switch_op">
                    <button  onclick="switchPrev(${i})" class="switch_outside">${prevPokemon(i)}</button>
                    <button class="switch_mid">${currentSelection[i]['name']}</button>
                    <button  onclick="switchNext(${i})" class="switch_outside">${nextPokemon(i)}</button>
                </div>
                <button onclick="likePokemon(${i})" class="place_heart_op">
                  <span class="icon_heart"
                     ><i id="heart" class="fa-thin far fa-heart"></i
                  ></span>
               </button>
            </div>
            <div class="main_content_op">
                <div class="place_main_op">
                    <div class="box_main_op">
                        <div class="place_main_head_op">
                            <img class="main_icon_op" src="icons/${currentSelection[i]['types'][0]['type']['name']}.png" />
                            <div class="main_heading_op">
                                <div id="headingCharacteristics" class="heading_characteristics">
                                  
                                </div>
                                <h1 class="heading_op">${currentSelection[i]['name']}</h1>
                            </div>
                        </div>
                        <div class="place_about_op">
                            <div class="box_about_op">
                                <p>Height</p>
                                <p id="length">${currentSelection[i]['height']} Meter</p>
                            </div>
                            <div class="box_about_op">
                                <p>Weight</p>
                                <p >${currentSelection[i]['weight']} Kg</p>
                            </div>
                            <div class="box_about_op">
                                <p>Abilities</p>
                                <p>${currentSelection[i]['abilities'][0]['ability']['name']}</p>
                            </div>
                        </div>
                    </div>
                    <div class="box_main_img_op">
                        <img class="main_img_op" src="${currentSelection[i]['sprites']['other']['dream_world']['front_default']}" />
                    </div>
                </div>
            </div>
            <div class="place_info_op">
                <div class="box_info_op">
                    <h2 class="d-none_stats">Stats</h2>
                    <div class="box_stats_name">
                        <div>Hp</div>
                        <div>Attack</div>
                        <div>Defense</div>
                        <div>Special Attack</div>
                        <div>Special Defense</div>
                        <div>Speed</div>
                    </div>
                    <div id="placeStatsNum" class="place_stats_num">
                       
                    </div>
                </div>
            </div>
        </div>`
}

function generatePokemons(i) {

    return `    
    <div onclick="openPokemon(${i})" class="box_content">
        <div class="place_info">
            <h1 class="pokemon_head">${currentSelection[i]['name']}</h1>
            <h2 class="pokemon_num">${calculateId(i)}</h2>
            <div id="place_characteristics${i}" class="place_characteristics">

            </div>
        </div>
        <img class="pokemon_img" src="${currentSelection[i]['sprites']['other']['dream_world']['front_default']}" alt="pokemon">
    </div>`
}

function generateTypes(i, type) {
    return `
            <div class="box_characteristics">
                <div class="box_icon">
                    <img class="icon_characteristics" src="icons/${type['type']['name']}.png">
                </div>
                <p  class="characteristics">
                    ${type['type']['name']}
                </p>
             </div>`
}

function generateTypesOp(type) {
    return ` 
    <p class="characteristics_op">${type['type']['name']}</p>`
}

function generateBar(j, stat) {
    return `
            <div class="box_num_bar">
                <div class="box_bar">
                    <div id="bar${j}" class="bar"></div>
                </div>
                <p>${stat}</p>
            </div>`
}

function generateFavoritePokemons(i) {
    placePokemon.innerHTML += `
    <div onclick="openPokemon(${i})" class="box_content">
       <div class="place_info">
           <h1 class="pokemon_head">${currentSelection[i]['name']}</h1>
           <h2 class="pokemon_num">${calculateId(i)}</h2>
           <div id="place_characteristics${i}" class="place_characteristics">
           
           </div>
       </div>
       <img class="pokemon_img" src="${currentSelection[i]['sprites']['other']['dream_world']['front_default']}" alt="pokemon">
   </div>`
}