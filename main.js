const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');

const inputForm = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrevious= document.querySelector('.button-previous');
const buttonNext = document.querySelector('.button-next');

let searchPokemon = 1;



const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
    }
}

const renderPokemon = async (pokemon) => {
    
    pokemonName.innerHTML = 'Buscando...';
    pokemonNumber.innerHTML = '';
    pokemonImage.style.display = 'block';
    const data = await fetchPokemon(pokemon);

    if (data) {
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id+" - ";
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    
    inputForm.value = '';
    searchPokemon = data.id;
    } else {
        pokemonName.innerHTML = 'Não existe :C';
        pokemonNumber.innerHTML = '';
        pokemonImage.style.display = 'none';
    }
}

inputForm.addEventListener('submit', (inputEvent) => {
    inputEvent.preventDefault();
    renderPokemon(input.value.toLowerCase());
  });

  renderPokemon(searchPokemon);

  buttonPrevious.addEventListener('click', (inputEvent) => {
    if (searchPokemon<2) {
        searchPokemon = 1
    } else {
    searchPokemon -=1
    renderPokemon(searchPokemon);
    }
  });

  buttonNext.addEventListener('click', (inputEvent) => {
    searchPokemon +=1
    renderPokemon(searchPokemon);
  });