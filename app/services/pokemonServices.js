import api from "./api";

const getPokemons = async (offset = 0, limit = 9) => {
  try {
    const response = await api.get(`/pokemon?offset=${offset}&limit=${limit}`);

    const detailedPokemons = response.data.results.map(async (pokemon) => {
      const res = await api.get(pokemon.url);
      return res.data;
    });

    return {
      status: response.status || 200,
      data: await Promise.all(detailedPokemons),
    };
  } catch (error) {
    return {
      status: error.response.status || 500,
      message: error.response.data.message || "Erro ao buscar dados",
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
    };
  });

  return pokemonList;
};

export { getPokemons, getPokemoInfo };
