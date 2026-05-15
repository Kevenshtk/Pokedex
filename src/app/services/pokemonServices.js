import api from './api';

const handleError = (error, fallback) => {
  return {
    success: false,
    message: error?.response?.data?.message || fallback,
  };
};

const getPokemons = async (offset = 0, limit = 9) => {
  try {
    const response = await api.get(`/pokemon?offset=${offset}&limit=${limit}`);

    const detailedPokemons = await Promise.all(
      response.data.results.map((pokemon) => api.get(pokemon.url))
    );

    return {
      success: true,
      data: detailedPokemons.map((pokemon) => formatPokemon(pokemon.data)),
    };
  } catch (error) {
    return handleError(error, 'Erro ao buscar os Pokemons');
  }
};

const getPokemonByName = async (name) => {
  try {
    const response = await api.get(`/pokemon/${name}`);

    return {
      success: true,
      data: formatPokemon(response.data),
      raw: response.data,
    };
  } catch (error) {
    return handleError(error, 'Erro ao buscar informações do Pokemon');
  }
};

const getPokemonByType = async (type) => {
  try {
    const response = await api.get(`/type/${type}`);

    const detailedPokemons = await Promise.all(
      response.data.pokemon.map((p) => api.get(p.pokemon.url))
    );

    return{
      success: true,
      data: detailedPokemons.map((pokemon) => formatPokemon(pokemon.data)),
    }

  } catch(error){
    return handleError(error, 'Erro ao buscar Pokemons por tipo');
  }
}

const formatPokemon = (item) => {
  return {
    id: item.id,
    name: item.name,
    image:
      item?.sprites.front_default ||
      item?.sprites?.other?.['official-artwork']?.front_default,
    types: item.types.map((type) => type.type.name),
    abilities: item.abilities.map((ability) => ability.ability.name),
    height: item.height / 10,
    weight: item.weight / 10,
    baseExp: item.base_experience,
    stats: item.stats.reduce((acc, stat) => {
      acc[stat.stat.name.replace('-', '_')] = stat.base_stat;
      return acc;
    }, {}),
    totalStats: item.stats.reduce((acc, cur) => acc + cur.base_stat, 0),
  };
};

const getWeaknesses = async (pokemon) => {
  try {
    const types = pokemon.types.map((t) => t.type.name);

    const allDamageRelations = await Promise.all(
      types.map((type) => api.get(`/type/${type}`).then((res) => res.data))
    );

    const weaknesses =
      allDamageRelations[0].damage_relations.double_damage_from.map(
        (damage_relations) => {
          return damage_relations.name;
        }
      );

    return { success: true, data: weaknesses };
  } catch (error) {
    return handleError(error, 'Erro ao buscar fraquezas');
  }
};

const getEvolutionNames = (chain) => {
  if (!chain) {
    throw new Error('Invalid evolution chain');
  }

  const names = [];

  const traverse = (node) => {
    names.push(node.species.name);

    node.evolves_to.forEach((evolution) => {
      traverse(evolution);
    });
  };

  traverse(chain);

  return names;
};

const getEvolutionImages = async (pokemon) => {
  try {
    const speciesResponse = await api.get(
      pokemon.species.url.replace('https://pokeapi.co/api/v2', '')
    );

    const evolutionResponse = await api.get(
      speciesResponse.data.evolution_chain.url.replace(
        'https://pokeapi.co/api/v2',
        ''
      )
    );

    const evolutionNames = getEvolutionNames(evolutionResponse.data.chain);

    const evolutions = await Promise.all(
      evolutionNames.map(async (name) => {
        const res = await api.get(`/pokemon/${name}`);

        return {
          name,
          image: res.data.sprites.other['official-artwork'].front_default,
        };
      })
    );

    return { success: true, data: evolutions };
  } catch (error) {
    return handleError(error, 'Erro ao buscar evoluções');
  }
};

const getPokemonSpecies = async (name) => {
  try {
    const res = await api.get(`/pokemon-species/${name}`);

    const genus =
      res.data.genera.find((g) => g.language.name === 'en')?.genus ||
      'Unknown Pokemon';

    const entry =
      res.data.flavor_text_entries
        .find((f) => f.language.name === 'en')
        ?.flavor_text.replace(/\f/g, ' ') || 'No description available.';

    return {
      success: true,
      data: { genus, entry },
    };
  } catch (error) {
    return handleError(error, 'Erro ao buscar species');
  }
};

const pokemonServices = {
  get: getPokemons,
  getByName: getPokemonByName,
  getByType: getPokemonByType,
  getWeakness: getWeaknesses,
  getEvo: getEvolutionImages,
  getSpecies: getPokemonSpecies,
};

export default pokemonServices;
