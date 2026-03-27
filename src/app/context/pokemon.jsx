'use client';
import { createContext } from 'react';
import { useState, useCallback } from 'react';
import {
  getPokemons,
  getPokemoInfo,
  getWeaknesses,
  getEvolutionImages,
  getPokemonSpecies,
} from '../services/pokemonServices';
import { toast } from 'sonner';

export const PokemonContext = createContext();

export const PokemonContextProvider = ({ children }) => {
  const [dataPokemons, setDataPokemons] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [weaknesses, setWeaknesses] = useState([]);
  const [evolutions, setEvolutions] = useState([]);
  const [species, setSpecies] = useState(null);

  const pageSize = 36;

  const loadPokemons = useCallback(async (offset = 0) => {
    const result = await getPokemons(offset, pageSize);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    const pokemons = await getPokemoInfo(result);

    setDataPokemons((prev) => [...prev, ...pokemons]);

    if (offset === 0 && pokemons.length > 0) {
      setSelectedPokemon(pokemons[0]);
    }

    return pokemons;
  }, []);

  const loadMorePokemons = async () => {
    const newOffset = dataPokemons.length;
    return await loadPokemons(newOffset);
  };

  const loadWeaknesses = useCallback(async (pokemonName) => {
    const result = await getWeaknesses(pokemonName);

    if (result.success) {
      setWeaknesses(result.data);
    } else {
      toast.error(result.message);
    }
  }, []);

  const loadEvolution = useCallback(async (pokemonName) => {
    const result = await getEvolutionImages(pokemonName);

    if (result.success) {
      setEvolutions(result.data);
    } else {
      toast.error(result.message);
    }
  }, []);

  const loadSpecies = async (name) => {
    const result = await getPokemonSpecies(name);

    if (result.success) {
      setSpecies(result.data);
    } else {
      toast.error(result.message);
    }
  };

  const loadPokemonDetails = useCallback(
    async (pokemonName) => {
      await Promise.all([
        loadSpecies(pokemonName),
        loadWeaknesses(pokemonName),
        loadEvolution(pokemonName),
      ]);
    },
    [loadWeaknesses, loadEvolution]
  );

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
        species,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};
