export enum PokemonType {
  FIRE = "fire",
  ELECTRIC = "electric",
  WATER = "water",
  GRASS = "grass",
  GHOST = "ghost",
  PSYCHIC = "psychic",
  POISON = "poison",
  GROUND = "ground",
  ROCK = "rock",
  FIGHTING = "fighting",
  FAIRY = "fairy",
  FLYING = 'flying',
  NORMAL = "normal",
  ICE = "ice",
  DRAGON = "dragon",
  DARK = "dark",
  STEEL = "steel",
  BUG = "bug",
}

export interface Pokemon {
  id: number;
  name: string;
  types: PokemonType[];
  imageUrl: string;
  number: string;
}

export interface Stat {
  label: string;
  value: number;
  color: string;
  shortLabel: string;
}
