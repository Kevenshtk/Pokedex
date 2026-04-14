'use client';
import { createContext } from 'react';
import { useState, useCallback } from 'react';
import pokemonServices from '../services/pokemonServices';

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
    const result = await pokemonServices.get(offset, pageSize);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    const pokemons = result.data;

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
    const result = await pokemonServices.getWeakness(pokemonName);

    setWeaknesses(result.data);
  }, []);

  const loadEvolution = useCallback(async (pokemonName) => {
    const result = await pokemonServices.getEvo(pokemonName);

    setEvolutions(result.data);
  }, []);

  const loadSpecies = async (name) => {
    const result = await pokemonServices.getSpecies(name);

    if (result.success) {
      setSpecies(result.data);
    } else {
      toast.error(result.message);
    }
  };

  const loadPokemonDetails = useCallback(
    async (pokemonName) => {
      const result = await pokemonServices.getByName(pokemonName);

      if (result.success) {
        await loadSpecies(pokemonName);
        loadWeaknesses(result.raw);
        loadEvolution(result.raw);
      }
    },
    [loadWeaknesses, loadEvolution]
  );

  const selectPokemonByEvo = async (nome) => {
    const result = await pokemonServices.getByName(nome);

    setSelectedPokemon(result.data);
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
        species,
        selectPokemonByEvo,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};
