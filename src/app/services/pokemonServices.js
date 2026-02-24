import api from './api';

const getPokemons = async (offset = 0, limit = 9) => {
  try {
    const response = await api.get(`/pokemon?offset=${offset}&limit=${limit}`);

    const detailedPokemons = response.data.results.map(async (pokemon) => {
      const res = await api.get(pokemon.url);
      return res.data;
    });

    return {
      success: true,
      data: await Promise.all(detailedPokemons),
    };
  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.message || 'Erro ao buscar os Pokemons',
    };
  }
};

const getPokemoInfo = async (datas) => {
  const pokemonList = datas.data.map((item) => {
    return {
      id: item.id,
      name: item.name,
      image: item.sprites.front_default,
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
  });

  return pokemonList;
};

const getWeaknesses = async (pokemonName) => {
  try {
    const response = await api.get(`/pokemon/${pokemonName}`);

    const types = response?.data.types.map((t) => t.type.name);

    const allDamageRelations = await Promise.all(
      types.map(async (type) => {
        const resType = await api.get(`/type/${type}`);
        return resType.data;
      })
    );

    const weaknesses =
      allDamageRelations[0].damage_relations.double_damage_from.map(
        (damage_relations) => {
          return damage_relations.name;
        }
      );

    return { success: true, data: weaknesses };
  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.message || 'Erro ao buscar as fraquezas',
    };
  }
};

const getEvolutionNames = (chain) => {
  const names = [];
  let current = chain;

  while (current) {
    names.push(current.species.name);
    current = current.evolves_to[0];
  }

  return names;
};

const getEvolutionImages = async (pokemonName) => {
  try {
    const pokemonResponse = await api.get(`/pokemon/${pokemonName}`);

    const speciesResponse = await api.get(
      pokemonResponse.data.species.url.replace('https://pokeapi.co/api/v2', '')
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

    console.log(evolutions);
    return { success: true, data: evolutions };
  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.message || 'Erro ao buscar as evoluções',
    };
  }
};

export { getPokemons, getPokemoInfo, getWeaknesses, getEvolutionImages };
