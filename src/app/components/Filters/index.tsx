import { useState, useContext } from 'react';
import { PokemonContext } from '../../context/pokemon';

const filterButtons = [
  { label: 'Type', icon: 'fa-circle' },
  { icon: 'fa-skull-crossbones', label: 'Weaknesses' },
  { icon: 'fa-bolt', label: 'Ability' },
  { icon: 'fa-arrows-up-down', label: 'Height' },
  { icon: 'fa-weight-hanging', label: 'Weight' },
];

type FiltersProps = {
  from: number;
  to: number;
  total: number;
};

const Filters = ({ from, to, total }: FiltersProps) => {
  const [search, setSearch] = useState('');
  const { searchPokemon } = useContext(PokemonContext);

  const handleSearch = async (name: string) => {
    await searchPokemon(name);
  };

  return (
    <div className="space-y-4 mb-8">
      <div className="relative">
        <input
          type="text"
          placeholder="Discover your Pokémon!"
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSearch(search);
          }}
          className="w-full bg-white rounded-xl py-4 px-6 shadow-sm focus:outline-none text-gray-600 placeholder-gray-300"
        />
        <button 
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center cursor-pointer shadow-md shadow-red-200 hover:bg-red-600 transition-colors"
        onClick={() => handleSearch(search)}
        >
          <div className="w-5 h-5 rounded-full border-2 border-white relative flex items-center justify-center after:contet-[''] after:absolute after:h-0.5 after:w-full after:bg-white"></div>
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-gray-500">
        <div className="flex items-center space-x-2">
          <span>Ascending</span>
          <i className="fa-solid fa-chevron-down text-xs"></i>
        </div>

        <div className="grow"></div>

        <div className="flex items-center space-x-2">
          Showing {from}–{to} of {total} Pokémons
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {filterButtons.map((btn, index) => (
          <button
            key={index}
            className="flex items-center space-x-2 bg-white px-4 py-2 rounded-xl shadow-sm hover:bg-gray-50 transition-colors"
          >
            <i className={`fa-solid ${btn.icon} text-gray-400`}></i>
            <span className="text-gray-600">{btn.label}</span>
            <i className="fa-solid fa-chevron-down text-[10px] text-gray-400"></i>
          </button>
        ))}
        <button className="bg-gray-400 text-white w-10 h-10 rounded-xl flex items-center justify-center shadow-sm">
          <i className="fa-solid fa-rotate-right"></i>
        </button>
      </div>
    </div>
  );
};

export default Filters;
