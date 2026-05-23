export interface PokemonListItem {
  name: string;
  url: string;
}

interface PokemonTypeItem {
  pokemon: PokemonListItem;
}

interface DamageRelations {
  double_damage_from: {
    name: string;
  }[];
}

export interface PokemonApiSpecies {
  evolution_chain: {
    url: string;
  };

  flavor_text_entries: {
    flavor_text: string;
    language: {
      name: string;
    }
  }[];

  genera:{
    genus: string;
    language: {
      name: string;
    }
  }[];
}

export interface PokemonApiEvolutionChainNode  {
  species: {
    name: string;
  }
  evolves_to: PokemonApiEvolutionChainNode [];
}

export interface PokemonApiEvolutionChain {
  chain: PokemonApiEvolutionChainNode;
}

export interface PokemonApiType {
  pokemon: PokemonTypeItem[];
  damage_relations: DamageRelations;
}

export interface PokemonApiList{
  results: PokemonListItem[];
}

export interface PokemonApiDetails {
  id: number;
  name: string;
  sprites: {
    front_default: string | null;
    other?: {
      ['official-artwork']?: {
        front_default: string | null;
      };
    };
  };

  types: {
    type: {
      name: string;
    }
  }[];

  abilities: {
    ability: {
      name: string;
    }
  }[];

  height: number;
  weight: number;
  base_experience: number;

  stats: {
    base_stat: number;
    stat: {
      name: string;
    }
  }[];

  species: PokemonListItem;
}
