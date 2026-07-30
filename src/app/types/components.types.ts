import type { Dispatch, SetStateAction } from 'react';
import type { PokemonDetails } from '../types/pokemon.service.types';

type DropdownItem = {
  label: string;
  value: string;
};

export type ContentBtn = {
  icon: string;
  label: string;
  itensDropdown?: DropdownItem[];
};

export type DropdownProps = {
  items: DropdownItem[];
  setOpenDropdown: Dispatch<SetStateAction<boolean>>;
};

export type FiltersProps = {
  from: number;
  to: number;
  total: number;
  onSearch?: () => void;
};

export type PokemonCardProps = {
  pokemon: PokemonDetails;
  onClick: () => void;
  isSelected: boolean;
};

export type SidebarProps = {
  pokemon: PokemonDetails;
};
