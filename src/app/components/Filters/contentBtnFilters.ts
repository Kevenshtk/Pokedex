type DropdownItem = {
    label: string;
    value: string;
}

type ContentBtn = {
    icon: string;
    label: string;
    itensDropdown?: DropdownItem[];
}

const contentBtn: ContentBtn[] = [
  {
    icon: 'fa-circle',
    label: 'Type',
    itensDropdown: [
      { label: 'Grass', value: 'grass' },
      { label: 'Fire', value: 'fire' },
      { label: 'Water', value: 'water' },
      { label: 'Electric', value: 'electric' },
      { label: 'Psychic', value: 'psychic' },
      { label: 'Normal', value: 'normal' },
      { label: 'Flying', value: 'flying' },
      { label: 'Poison', value: 'poison' },
      { label: 'Ground', value: 'ground' },
      { label: 'Rock', value: 'rock' },
      { label: 'Ghost', value: 'ghost' },
      { label: 'Ice', value: 'ice' },
      { label: 'Dragon', value: 'dragon' },
      { label: 'Dark', value: 'dark' },
      { label: 'Fairy', value: 'fairy' },
      { label: 'Fighting', value: 'fighting' },
      { label: 'Bug', value: 'bug' },
      { label: 'Steel', value: 'steel' },
    ],
  },
  {
    icon: 'fa-skull-crossbones',
    label: 'Weaknesses',
  },
  {
    icon: 'fa-bolt',
    label: 'Ability',
  },
  {
    icon: 'fa-arrows-up-down',
    label: 'Height',
  },
  {
    icon: 'fa-weight-hanging',
    label: 'Weight',
  },
];


export { contentBtn };
