'use client';
import { createContext } from 'react';
import { useState, useCallback } from 'react';
import {
  getPokemons,
  getPokemoInfo,
  getWeaknesses,
  getEvolutionImages,
} from '../services/pokemonServices';
import { toast } from 'sonner';

export const PokemonContext = createContext();

export const PokemonContextProvider = ({ children }) => {
  const [fetchLimit, setFetchLimit] = useState(9);
  const [dataPokemons, setDataPokemons] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [weaknesses, setWeaknesses] = useState([]);
  const [evolutions, setEvolutions] = useState([]);

  const loadPokemons = useCallback(async (offset, limit) => {
    const result = await getPokemons(offset, limit);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    const pokemons = await getPokemoInfo(result);

    setDataPokemons(pokemons);
    setSelectedPokemon(pokemons[0]);
  }, []);

  const loadMorePokemons = async () => {
    const updatedLimit = fetchLimit + 9;
    setFetchLimit(updatedLimit);
    await loadPokemons(0, updatedLimit);
  };

  const loadWeaknesses = async (pokemonName) => {
    const result = await getWeaknesses(pokemonName);

    if (result.success) {
      setWeaknesses(result.data);
    } else {
      toast.error(result.message);
    }
  };

  const loadEvolution = async (pokemonName) => {
    const result = await getEvolutionImages(pokemonName);

    if (result.success) {
      setEvolutions(result.data);
    } else {
      toast.error(result.message);
    }
  };

  const loadPokemonDetails = async (pokemonName) => {
    await Promise.all([
      loadWeaknesses(pokemonName),
      loadEvolution(pokemonName),
    ]);
  };

  return (
    <PokemonContext.Provider
      value={{
        loadPokemons,
        dataPokemons,
        loadMorePokemons,
        selectedPokemon,
        setSelectedPokemon,
        loadPokemonDetails,
        weaknesses,
        evolutions,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};
