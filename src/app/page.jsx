'use client';

import { useContext, useEffect } from 'react';

import { PokemonContext } from './context/pokemon';
import usePagination from './hooks/usePagination';

import Navbar from './components/Navbar';
import Filters from './components/Filters';
import PokemonCard from './components/PokemonCard';
import SideBar from './components/Sidebar';

export default function Home() {
  const {
    loadPokemons,
    dataPokemons,
    loadMorePokemons,
    selectedPokemon,
    setSelectedPokemon,
  } = useContext(PokemonContext);

  const { page, next, back, hasPrev, from, to, total, currentPage, totalPages} = usePagination(dataPokemons, 9);

  const handleNext = async () => {
    if (currentPage >= totalPages - 1) {
      await loadMorePokemons()
    }

    next();
  };

  useEffect(() => {
    loadPokemons();
  }, [loadPokemons]);

  return (
    <div className="min-h-screen p-4 md:p-8 relative overflow-x-hidden">
      <div className="absolute top-0 -left-40 w-96 bg-white rounded-full opacity-40 -z-10 blur-3xl"></div>
      <div className="absolute bottom-0 -right-40 w-80 h-80 bg-red-100 rounded-full opacity-20 -z-10 blur-3xl"></div>
      <div className="max-w-7xl mx-auto">
        <Navbar />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8">
            <Filters from={from} to={to} total={total} />

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {page.map((pokemon) => (
                <PokemonCard
                  key={pokemon.id}
                  pokemon={pokemon}
                  isSelected={pokemon.id === selectedPokemon?.id}
                  onClick={() => setSelectedPokemon(pokemon)}
                />
              ))}
            </div>

            <div className="mt-12 flex justify-around md:justify-start md:gap-2">
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-10 rounded-2xl shadow-lg shadow-red-200 transition-all cursor-pointer"
                onClick={() => back()}
                disabled={!hasPrev}
              >
                back
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-10 rounded-2xl shadow-lg shadow-red-200 transition-all cursor-pointer"
                onClick={() => handleNext()}
              >
                next
              </button>
            </div>
          </div>

          <div className="lg:col-span-4 mt-20 lg:mt-0">
            <SideBar pokemon={selectedPokemon} />
          </div>
        </div>
      </div>
    </div>
  );
}
