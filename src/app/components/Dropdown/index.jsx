import { useContext } from 'react';

import { PokemonContext } from '../../context/pokemon';

const Dropdown = ({ items, setOpenDropdown }) => {
  const { filterPokemonByType } = useContext(PokemonContext);

  return (
    <div className="absolute top-12 left-0 w-40 bg-white rounded-md shadow-md z-10 py-1">
      <ul className="flex flex-col">
        {items.map((item, index) => (
          <li key={index}>
            <button
              onClick={() => {
                setOpenDropdown(false);
                filterPokemonByType(item.value);
              }}
              className={`block w-full px-4 py-2 text-sm text-primary hover:bg-gray-50 hover:text-base transition-colors cursor-pointer`}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
