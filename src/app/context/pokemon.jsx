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
  const [loadingDetails, setLoadingDetails] = useState(false);

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

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    setWeaknesses(result.data);
  }, []);

  const loadEvolution = useCallback(async (pokemonName) => {
    const result = await pokemonServices.getEvo(pokemonName);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    setEvolutions(result.data);
  }, []);

  const loadSpecies = async (name) => {
    const result = await pokemonServices.getSpecies(name);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    setSpecies(result.data);
  };

  const loadPokemonDetails = useCallback(
    async (pokemonName) => {
      setLoadingDetails(true);
      const result = await pokemonServices.getByName(pokemonName);

      if (result.success) {
        await loadSpecies(pokemonName);
        await loadWeaknesses(result.raw);
        await loadEvolution(result.raw);
      }
      setLoadingDetails(false);
    },
    [loadWeaknesses, loadEvolution]
  );

  const searchPokemon = useCallback(
    async (pokemonName) => {
      if (!pokemonName) {
        toast.error('Por favor, insira o nome de um Pokémon.');
        return;
      }

      setLoadingDetails(true);
      const result = await pokemonServices.getByName(pokemonName);

      if (!result.success) {
        toast.error(
          'Pokémon não encontrado, verifique o nome e tente novamente.'
        );
        setLoadingDetails(false);
        return;
      }

      setSelectedPokemon(result.data);
      await loadSpecies(pokemonName);
      await loadWeaknesses(result.raw);
      await loadEvolution(result.raw);
      setLoadingDetails(false);
    },
    [loadWeaknesses, loadEvolution]
  );

  const filterPokemonByType = async (type) => {
    const result = await pokemonServices.getByType(type);

    if (!result.success){
      toast.error(result.message);
      return;
    }

    const pokemons = result.data;

    setDataPokemons([...pokemons]);
  };

  const clearFilters = async () => {
    setDataPokemons([]);
    await loadPokemons();
  };

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
        loadingDetails,
        weaknesses,
        evolutions,
        species,
        selectPokemonByEvo,
        searchPokemon,
        filterPokemonByType,
        clearFilters,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};
