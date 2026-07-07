import { PokemonType } from '../types';
import { PokemonApiDetails } from '../types/pokemon.api.types';

export interface ErrorResponse {
  message?: string;
}

export interface ServiceError {
  success: false;
  message: string;
}

export interface ServiceSuccess<T> {
  success: true;
  data: T;
}

export interface PokemonByNameSuccess extends ServiceSuccess<PokemonDetails> {
  raw: PokemonApiDetails;
}

export type PokemonStats = {
  hp: number;
  attack: number;
  defense: number;
  special_attack: number;
  special_defense: number;
  speed: number;
};

export interface PokemonDetails {
  id: number;
  name: string;
  image: string | null;
  types: PokemonType[];
  abilities: string[];
  height: number;
  weight: number;
  baseExp: number;
  stats: PokemonStats;
  totalStats: number;
}

export interface EvolutionItem {
  name: string;
  image: string | null;
}

interface SpeciesData {
  genus: string;
  entry: string;
}

export type PokemonListResponse = ServiceSuccess<PokemonDetails[]> | ServiceError;
export type PokemonByNameResponse = PokemonByNameSuccess | ServiceError;
export type WeaknessResponse = ServiceSuccess<string[]> | ServiceError;
export type EvolutionResponse = ServiceSuccess<EvolutionItem[]> | ServiceError;
export type SpeciesResponse = ServiceSuccess<SpeciesData> | ServiceError;
