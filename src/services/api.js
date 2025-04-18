async function getPokemons(offset = 0, limit = 10) {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    );
    const data = await response.json();

    const detailedPokemons = await Promise.all(
      data.results.map(async (pokemon) => {
        const res = await fetch(pokemon.url);
        return res.json();
      })
    );

    return detailedPokemons;

  } catch (error) {
    console.error('Erro ao buscar os Pokémons:', error);
  }
}

async function getPokemonByName(name) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);

    if(!response.ok) {
      return "erro";
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Erro ao buscar os Pokémons:', error);
  }
}

async function getPokemonByType(type){
  try{
    const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
    const data = await response.json();

    const detailedPokemons = await Promise.all(
      data.pokemon.map(async (pokemon) => {
        const res = await fetch(pokemon.pokemon.url);
        return res.json();
      })
    );

    return detailedPokemons;

  } catch(error){
    console.error('Erro ao buscar os Pokémons:', error);
  }
}

export { getPokemons, getPokemonByName, getPokemonByType };