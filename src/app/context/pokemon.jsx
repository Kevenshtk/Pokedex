'use client';
import { createContext } from 'react';
import { useState } from 'react';
import {
  getPokemons,
  getPokemoInfo,
  getWeaknesses,
} from '../services/pokemonServices';
import { Toaster, toast } from 'sonner';

export const PokemonContext = createContext();

export const PokemonContextProvider = ({ children }) => {
  const [fetchLimit, setFetchLimit] = useState(9);
  const [dataPokemons, setDataPokemons] = useState([]);
  const [seletedPokemon, setSelectedPokemon] = useState(null);
  const [weaknesses, setWeaknesses] = useState([]);

  const loadPokemons = async (offset, limit) => {
    const result = await getPokemons(offset, limit);
    const pokemons = await getPokemoInfo(result);

    if (result.success) {
      setDataPokemons(pokemons);
      setSelectedPokemon(pokemons[0]);
    } else {
      toast.error(result.message);
    }
  };

  const loadMorePokemons = () => {
    setFetchLimit((prevLimit) => {
      const updatedLimit = prevLimit + 9;

      loadPokemons(0, updatedLimit);
      return updatedLimit;
    });
  };

  const loadWeaknesses = async (pokemonName) => {
    const result = await getWeaknesses(pokemonName);

    if (result.success) {
      setWeaknesses(result.data);
    } else {
      toast.error(result.message);
    }
  };

  return (
    <PokemonContext.Provider
      value={{
        loadPokemons,
        dataPokemons,
        loadMorePokemons,
        seletedPokemon,
        setSelectedPokemon,
        loadWeaknesses,
        weaknesses,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};
