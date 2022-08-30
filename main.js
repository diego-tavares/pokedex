const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');

const pokemonHP = document.querySelector('.pokemon__HP');
const pokemonAttack = document.querySelector('.pokemon__attack');
const pokemonDefense = document.querySelector('.pokemon__defense');
const pokemonSPAttack = document.querySelector('.pokemon__special-attack');
const pokemonSPDefense = document.querySelector('.pokemon__special-defense');
const pokemonSpeed = document.querySelector('.pokemon__speed');

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
        pokemonHP.innerHTML = '';
        pokemonAttack.innerHTML = '';
        pokemonDefense.innerHTML = '';
        pokemonSPAttack.innerHTML = '';
        pokemonSPDefense.innerHTML = '';
        pokemonSpeed.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if (data) {
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id+" - ";
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        pokemonHP.innerHTML = "HP: "+data['stats']['0']['base_stat'];
        pokemonAttack.innerHTML = "Attack: "+data['stats']['1']['base_stat'];
        pokemonDefense.innerHTML = "Defense: "+data['stats']['2']['base_stat'];
        pokemonSPAttack.innerHTML = "Sp. Attack: "+data['stats']['3']['base_stat'];
        pokemonSPDefense.innerHTML = "Sp. Defense: "+data['stats']['4']['base_stat'];
        pokemonSpeed.innerHTML = "Speed: "+data['stats']['5']['base_stat'];

    inputForm.value = '';

    searchPokemon = data.id;

    } else {
        pokemonName.innerHTML = 'Not found :C';
        pokemonNumber.innerHTML = '';
        pokemonImage.style.display = 'none';
        pokemonHP.innerHTML = '';
        pokemonAttack.innerHTML = '';
        pokemonDefense.innerHTML = '';
        pokemonSPAttack.innerHTML = '';
        pokemonSPDefense.innerHTML = '';
        pokemonSpeed.innerHTML = '';
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