import axios from 'axios';
import api from './api';
import { PokemonType } from '../types';

import {
  PokemonApiList,
  PokemonApiDetails,
  PokemonApiType,
  PokemonApiEvolutionChainNode,
  PokemonApiSpecies,
  PokemonApiEvolutionChain,
} from '../types/pokemon.api.types';

import {
  ErrorResponse,
  ServiceError,
  PokemonDetails,
  PokemonStats,
  PokemonListResponse,
  PokemonByNameResponse,
  WeaknessResponse,
  EvolutionResponse,
  SpeciesResponse,
} from '../types/pokemon.service.types';

const handleError = (error: unknown, fallback: string): ServiceError => {
  if (axios.isAxiosError<ErrorResponse>(error)) {
    return {
      success: false,
      message: error.response?.data?.message || fallback,
    };
  }

  return {
    success: false,
    message: fallback,
  };
};

const formatPokemon = (
  item: PokemonApiDetails
): PokemonDetails => {
  return {
    id: item.id,
    name: item.name,
    image:
      item?.sprites.front_default ||
      item?.sprites?.other?.['official-artwork']?.front_default ||
      null,
    types: item.types.map((type) => type.type.name as PokemonType),
    abilities: item.abilities.map((ability) => ability.ability.name),
    height: item.height / 10,
    weight: item.weight / 10,
    baseExp: item.base_experience,
    stats: item.stats.reduce<PokemonStats>((acc, stat) => {
      acc[stat.stat.name.replace('-', '_') as keyof PokemonStats] =
        stat.base_stat;
      return acc;
    }, {} as PokemonStats),
    totalStats: item.stats.reduce((acc, cur) => acc + cur.base_stat, 0),
  };
};

const getPokemons = async (
  offset = 0,
  limit = 9
): Promise<PokemonListResponse> => {
  try {
    const response = await api.get<PokemonApiList>(
      `/pokemon?offset=${offset}&limit=${limit}`
    );

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

const getPokemonByName = async (
  name: string
): Promise<PokemonByNameResponse> => {
  try {
    const response = await api.get<PokemonApiDetails>(
      `/pokemon/${name}`
    );

    return {
      success: true,
      data: formatPokemon(response.data),
      raw: response.data,
    };
  } catch (error) {
    return handleError(error, 'Erro ao buscar informações do Pokemon');
  }
};

const getPokemonByType = async (type: string): Promise<PokemonListResponse> => {
  try {
    const response = await api.get<PokemonApiType>(`/type/${type}`);

    const detailedPokemons = await Promise.all(
      response.data.pokemon.map((p) => api.get(p.pokemon.url))
    );

    return {
      success: true,
      data: detailedPokemons.map((pokemon) => formatPokemon(pokemon.data)),
    };
  } catch (error) {
    return handleError(error, 'Erro ao buscar Pokemons por tipo');
  }
};

const getWeaknesses = async (
  pokemon: PokemonApiDetails
): Promise<WeaknessResponse> => {
  try {
    const types = pokemon.types.map((t) => t.type.name);

    const allDamageRelations = await Promise.all(
      types.map((type) =>
        api.get<PokemonApiType>(`/type/${type}`).then((res) => res.data)
      )
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

const getEvolutionNames = (chain: PokemonApiEvolutionChainNode): string[] => {
  const names: string[] = [];

  const traverse = (node: PokemonApiEvolutionChainNode) => {
    names.push(node.species.name);

    node.evolves_to.forEach((evolution: PokemonApiEvolutionChainNode) => {
      traverse(evolution);
    });
  };

  traverse(chain);

  return names;
};

const getEvolutionImages = async (
  pokemon: PokemonApiDetails
): Promise<EvolutionResponse> => {
  try {
    const speciesResponse = await api.get<PokemonApiSpecies>(
      pokemon.species.url.replace('https://pokeapi.co/api/v2', '')
    );

    const evolutionResponse = await api.get<PokemonApiEvolutionChain>(
      speciesResponse.data.evolution_chain.url.replace(
        'https://pokeapi.co/api/v2',
        ''
      )
    );

    const evolutionNames = getEvolutionNames(evolutionResponse.data.chain);

    const evolutions = await Promise.all(
      evolutionNames.map(async (name) => {
        const res = await api.get<PokemonApiDetails>(
          `/pokemon/${name}`
        );

        return {
          name,
          image:
            res.data.sprites.other?.['official-artwork']?.front_default || null,
        };
      })
    );

    return { success: true, data: evolutions };
  } catch (error) {
    return handleError(error, 'Erro ao buscar evoluções');
  }
};

const getPokemonSpecies = async (name: string): Promise<SpeciesResponse> => {
  try {
    const response = await api.get<PokemonApiSpecies>(
      `/pokemon-species/${name}`
    );

    const genus =
      response.data.genera.find((g) => g.language.name === 'en')?.genus ||
      'Unknown Pokemon';

    const entry =
      response.data.flavor_text_entries
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
