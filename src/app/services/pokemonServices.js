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
      message: error.response.data.message || 'Erro ao buscar os Pokemons',
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
      message: error.response.data.message || 'Erro ao buscar às fraquezas',
    };
  }
};

export { getPokemons, getPokemoInfo, getWeaknesses };
