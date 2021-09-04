const pokemonList = document.getElementById('pokemon');
const pokemonDetailsContent = document.querySelector('.pokemon-details-content');
const cartoonCloseBtn = document.getElementById('cartoon-close-btn');
const url = 'https://pokeapi.co/api/v2/pokemon';

// event listeners
pokemonList.addEventListener('click', getpokemoncartoon);
cartoonCloseBtn.addEventListener('click', () => {
    pokemonDetailsContent.parentElement.classList.remove('showcartoon');
});
let i = 0;
getpokemonList();
// get pokemon list that matches with the ingredients
function getpokemonList(){

    fetch(url)
    .then(response => response.json())
    .then(obj => {
        let html = "";
        if(obj.results){
            obj.results.forEach(result => {
                let imgurl = result.url ;
                fetch(imgurl).then(function (response){
                    return response.json();
                }).then(function (imgdata){
                    // console.log("name = " + result.name + ", Img = " + imgdata.sprites.other.dream_world.front_default);
                    html += `
                    <div class = "pokemon-item" data-link = "${result.url}">
                        <div class = "pokemon-img">
                            <img src = "${imgdata.sprites.other.dream_world.front_default}" alt = "food">
                        </div>
                        <div class = "pokemon-name">
                            <h3>${result.name}</h3>
                            <a href = "#" class = "cartoon-btn" id="${i}">Get Details</a>
                        </div>
                    </div>
                `;
                i++;
                    pokemonList.innerHTML = html;

                })

                
            });
            pokemonList.classList.remove('notFound');
        } else{
            html = "Sorry, we didn't find any pokemon!";
            pokemonList.classList.add('notFound');
        }

    });
}


// get cartoon of the pokemon
function getpokemoncartoon(e){
    e.preventDefault();
    if(e.target.classList.contains('cartoon-btn')){
        let pokemonItem = e.target.parentElement.parentElement;
        // console.log(pokemonItem.dataset.link);
        fetch(pokemonItem.dataset.link).then(function (response){
            return response.json();
           }).then(function (obj){
               console.log( obj)
               pokemoncartoonModal(obj)
           })

    }
}

// create a modal
function pokemoncartoonModal(pokemon){
    console.log(pokemon);
    let html = `
        <h2 class = "cartoon-title">${pokemon.name}</h2>
        
        <p class = "cartoon-category">HP ${Math.floor((Math.random() * pokemon.stats[0].base_stat) + 1)}/${pokemon.stats[0].base_stat}</p>
        <p class = "cartoon-category">XP ${pokemon.base_experience}  </p>
        <br/>
        <p class = "cartoon-category">Weight : ${pokemon.weight}kg</p>
        <p class = "cartoon-category">Height : 0.${pokemon.height}m</p>

        <div class = "cartoon-pokemon-img">
            <img src = "${pokemon.sprites.other.dream_world.front_default}" alt = "">
        </div>      
    `;
    pokemonDetailsContent.innerHTML = html;
    pokemonDetailsContent.parentElement.classList.add('showcartoon');
}