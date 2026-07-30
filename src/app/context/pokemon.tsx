'use client';
import { createContext } from 'react';
import { useState, useCallback } from 'react';
import pokemonServices from '../services/pokemonServices';

import type {
  PokemonContextType,
  PokemonContextProviderProps,
} from '../types/context.types';
import {
  PokemonDetails,
  EvolutionItem,
  SpeciesData,
} from '../types/pokemon.service.types';
import { PokemonApiDetails } from '../types/pokemon.api.types';

import { toast } from 'sonner';

export const PokemonContext = createContext<PokemonContextType | undefined>(
  undefined
);

export const PokemonContextProvider = ({
  children,
}: PokemonContextProviderProps) => {
  const [dataPokemons, setDataPokemons] = useState<PokemonDetails[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonDetails | null>(
    null
  );
  const [weaknesses, setWeaknesses] = useState<string[]>([]);
  const [evolutions, setEvolutions] = useState<EvolutionItem[]>([]);
  const [species, setSpecies] = useState<SpeciesData | null>(null);
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

  const loadWeaknesses = useCallback(async (pokemon: PokemonApiDetails) => {
    const result = await pokemonServices.getWeakness(pokemon);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    setWeaknesses(result.data);
  }, []);

  const loadEvolution = useCallback(async (pokemon: PokemonApiDetails) => {
    const result = await pokemonServices.getEvo(pokemon);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    setEvolutions(result.data);
  }, []);

  const loadSpecies = async (name: string) => {
    const result = await pokemonServices.getSpecies(name);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    setSpecies(result.data);
  };

  const loadPokemonDetails = useCallback(
    async (pokemonName: string) => {
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
    async (pokemonName: string) => {
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
        return false;
      }

      setSelectedPokemon(result.data);
      await loadSpecies(pokemonName);
      await loadWeaknesses(result.raw);
      await loadEvolution(result.raw);
      setLoadingDetails(false);
      return true;
    },
    [loadWeaknesses, loadEvolution]
  );

  const filterPokemonByType = async (type: string) => {
    const result = await pokemonServices.getByType(type);

    if (!result.success) {
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

  const selectPokemonByEvo = async (name: string) => {
    const result = await pokemonServices.getByName(name);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

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
