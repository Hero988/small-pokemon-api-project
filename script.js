const pokemon = document.querySelector(".pokemon");
const submitButton = document.querySelector(".submitButton")
const Error = document.querySelector(".Invalid")
let PictureOfPokemon = document.querySelector(".PictureOfPokemon")
let abilitiesOfPokemon = document.querySelector(".ability")
let abilitiesText = document.querySelector(".abilityText")

const getPokemonName = () => {
       const pokemonNameOriginal = pokemon.value
       const pokemonNameIString = String(pokemonNameOriginal);
       const pokemonNameIStringLowerCase = pokemonNameIString.toLowerCase();
       if(pokemonNameOriginal === '')
       {
        Error.textContent = 'Please Enter Correct Pokemon Name';
       } else {
        Error.textContent = '';
       }
       return pokemonNameIStringLowerCase   
} 
async function getPokemonAPI() {
    try {
        getPokemonName()
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${getPokemonName()}`)
        const data = await response.json();
        pokemon.value = '';
        return data;
        Error.textContent = '';
    } catch (err) {
        Error.textContent = 'Please Enter Correct Pokemon Name';
        if(PictureOfPokemon || abilitiesOfPokemon||abilitiesText) {
         PictureOfPokemon.src = '';
         abilitiesOfPokemon.textContent = '';
         abilitiesText.textContent = '';
        }
    }
}
async function pokemonsAbility() {
    const resp = await getPokemonAPI();
    const pokemonAbility = resp.abilities[0].ability.name
    abilitiesOfPokemon.textContent = pokemonAbility
    abilitiesText.textContent = 'Ability:'
    console.log(pokemonAbility);
}
async function pokemonsSprite() {
    const resp = await getPokemonAPI();
    const pokemonSpriteURL = resp.sprites.front_default
    PictureOfPokemon.src = pokemonSpriteURL;
    console.log(pokemonSpriteURL);
}

submitButton.addEventListener("click", getPokemonAPI, getPokemonName)
submitButton.addEventListener("click", pokemonsSprite)
submitButton.addEventListener("click", pokemonsAbility)