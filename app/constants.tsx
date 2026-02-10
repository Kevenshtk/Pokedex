import { PokemonType, Stat } from './types';

export const TYPE_COLORS: Record<PokemonType, string> = {
  [PokemonType.GRASS]: 'bg-green-400',
  [PokemonType.WATER]: 'bg-blue-400',
  [PokemonType.FIRE]: 'bg-red-500',
  [PokemonType.GROUND]: 'bg-amber-600',
  [PokemonType.STEEL]: 'bg-slate-400',
  [PokemonType.FIGHTING]: 'bg-red-600',
  [PokemonType.NORMAL]: 'bg-indigo-300',
  [PokemonType.POISON]: 'bg-purple-500',
  [PokemonType.ELECTRIC]: 'bg-yellow-400',
  [PokemonType.DRAGON]: 'bg-orange-500',
  [PokemonType.PSYCHIC]: 'bg-pink-400',
  [PokemonType.ICE]: 'bg-cyan-400',
  [PokemonType.ROCK]: 'bg-gray-500',
  [PokemonType.GHOST]: 'bg-indigo-500',
  [PokemonType.DARK]: 'bg-gray-800',
  [PokemonType.FAIRY]: 'bg-pink-300',
  [PokemonType.FLYING]: 'bg-indigo-400',
  [PokemonType.BUG]: 'bg-green-500',
};

export const EMPOLEON_STATS: Stat[] = [
  { label: 'HP', shortLabel: 'HP', value: 84, color: 'bg-red-500' },
  { label: 'Attack', shortLabel: 'ATK', value: 86, color: 'bg-orange-500' },
  { label: 'Defense', shortLabel: 'DEF', value: 88, color: 'bg-yellow-400' },
  { label: 'Sp. Atk', shortLabel: 'SpA', value: 111, color: 'bg-cyan-400' },
  { label: 'Sp. Def', shortLabel: 'SpD', value: 101, color: 'bg-green-400' },
  { label: 'Speed', shortLabel: 'SPD', value: 60, color: 'bg-pink-400' },
  { label: 'Total', shortLabel: 'TOT', value: 530, color: 'bg-indigo-500' },
];
