import type { PokemonDetails, EvolutionItem, SpeciesData } from './pokemon.service.types';
import { PokemonType } from '../types';
import { ReactNode } from 'react';

export type PokemonContextType = {
  loadPokemons: (offset?: number) => Promise<PokemonDetails[] | undefined>;
  dataPokemons: PokemonDetails[];
  loadMorePokemons: () => Promise<PokemonDetails[] | undefined>;
  selectedPokemon: PokemonDetails | null;
  setSelectedPokemon: (p: PokemonDetails) => void;
  loadPokemonDetails: (pokemonName: string) => Promise<void>;
  loadingDetails: boolean;
  weaknesses: PokemonType[];
  evolutions: EvolutionItem[];
  species: SpeciesData | null;
  selectPokemonByEvo: (name: string) => Promise<void | undefined>;
  searchPokemon: (pokemonName: string) => Promise<boolean | undefined>;
  filterPokemonByType: (type: string) => Promise<void>;
  clearFilters: () => Promise<void>;
}

export type PokemonContextProviderProps = {
  children: ReactNode;
};

