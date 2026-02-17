'use client'
import { createContext } from 'react';
import { useState } from 'react';
import { getPokemons, getPokemoInfo } from '../services/pokemonServices';

export const PokemonContext = createContext();

export const PokemonContextProvider = ({ children }) => {
  const [fetchLimit, setFetchLimit] = useState(9);
  const [dataPokemons, setDataPokemons] = useState([]);
  const [seletedPokemon, setSelectedPokemon] = useState(null);

  const loadPokemons = async (offset, limit) => {
    const result = await getPokemons(offset, limit);
    const pokemons = await getPokemoInfo(result);

    setDataPokemons(pokemons);
  };

  const loadMorePokemons = () => {
    setFetchLimit((prevLimit) => {
      const updatedLimit = prevLimit + 9;

      loadPokemons(0, updatedLimit);
      return updatedLimit;
    });
  };

  return (
    <PokemonContext.Provider value={{loadPokemons, dataPokemons, loadMorePokemons, seletedPokemon, setSelectedPokemon}}>
      {children}
    </PokemonContext.Provider>
  );
};
