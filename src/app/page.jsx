'use client';

import { useContext, useEffect, useState, useRef } from 'react';

import { PokemonContext } from './context/pokemon';
import usePagination from './hooks/usePagination';

import { FaAngleLeft, FaAngleRight, FaArrowUp } from 'react-icons/fa';

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

  const {
    page,
    next,
    back,
    hasPrev,
    from,
    to,
    total,
    currentPage,
    totalPages,
  } = usePagination(dataPokemons, 9);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const cardsContainerRef = useRef(null);

  const scrollToTop = () => {
    if (cardsContainerRef.current) {
      cardsContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNext = async () => {
    if (currentPage >= totalPages - 1) {
      await loadMorePokemons();
    }

    next();
  };

  useEffect(() => {
    loadPokemons();
  }, [loadPokemons]);

  return (
    <div className="min-h-screen lg:h-screen p-4 md:p-8 relative overflow-x-hidden lg:overflow-hidden flex flex-col">
      <div className="absolute top-0 -left-40 w-96 bg-white rounded-full opacity-40 -z-10 blur-3xl"></div>
      <div className="absolute bottom-0 -right-40 w-80 h-80 bg-red-100 rounded-full opacity-20 -z-10 blur-3xl"></div>
      <div className="max-w-7xl mx-auto w-full h-full flex flex-col overflow-hidden">
        <Navbar />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 flex-1 overflow-hidden min-h-0 pb-4">
          <div className="lg:col-span-8 flex flex-col h-full overflow-hidden min-h-0">
            <Filters from={from} to={to} total={total} onSearch={() => setIsModalOpen(true)} />

            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 flex-1 overflow-hidden mt-4 min-h-0 relative">
              <div className="flex md:hidden justify-between w-full mb-2">
                <button
                  className="bg-red-500 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-2 px-6 rounded-xl shadow-md shadow-gray-300 transition-all cursor-pointer shrink-0 flex items-center justify-center"
                  onClick={() => back()}
                  disabled={!hasPrev}
                >
                  <FaAngleLeft />
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-2 px-6 rounded-xl shadow-md shadow-gray-300 transition-all cursor-pointer shrink-0 flex items-center justify-center"
                  onClick={() => handleNext()}
                >
                  <FaAngleRight />
                </button>
              </div>

              <button
                className="hidden md:block bg-red-500 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-4 xl:px-6 rounded-2xl shadow-lg shadow-gray-300 transition-all cursor-pointer shrink-0"
                onClick={() => back()}
                disabled={!hasPrev}
              >
                <FaAngleLeft />
              </button>

              <div 
                ref={cardsContainerRef}
                className="flex-1 overflow-y-auto w-full h-full pr-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full [-webkit-mask-image:linear-gradient(to_bottom,transparent,black_32px,black_calc(100%_-_32px),transparent)] [mask-image:linear-gradient(to_bottom,transparent,black_32px,black_calc(100%_-_32px),transparent)]"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 py-8">
                  {page.length === 0 ? (
                    <div className="col-span-full flex justify-center py-12">
                      <div className="w-12 h-12 border-4 border-gray-200 border-t-red-500 rounded-full animate-spin"></div>
                    </div>
                  ) : (
                    page.map((pokemon) => (
                      <PokemonCard
                        key={pokemon.id}
                        pokemon={pokemon}
                        isSelected={pokemon.id === selectedPokemon?.id}
                        onClick={() => {
                          setSelectedPokemon(pokemon);
                          setIsModalOpen(true);
                        }}
                      />
                    ))
                  )}
                </div>
              </div>

              <button
                className="hidden md:block bg-red-500 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-4 xl:px-6 rounded-2xl shadow-lg shadow-gray-300 transition-all cursor-pointer shrink-0"
                onClick={() => handleNext()}
              >
                <FaAngleRight />
              </button>
            </div>
          </div>

          <div 
            className={`lg:col-span-4 lg:mt-0 h-full lg:overflow-y-auto lg:[&::-webkit-scrollbar]:w-2 lg:[&::-webkit-scrollbar-track]:bg-transparent lg:[&::-webkit-scrollbar-thumb]:bg-gray-300 lg:[&::-webkit-scrollbar-thumb]:rounded-full lg:pb-8 lg:[-webkit-mask-image:linear-gradient(to_bottom,transparent,black_32px,black_calc(100%_-_32px),transparent)] lg:[mask-image:linear-gradient(to_bottom,transparent,black_32px,black_calc(100%_-_32px),transparent)] ${isModalOpen ? 'fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 mt-0 lg:static lg:inset-auto lg:z-0 lg:bg-transparent lg:p-0 lg:block' : 'hidden lg:block'}`}
            onClick={() => setIsModalOpen(false)}
          >
            <div 
              className="relative w-full max-w-md lg:max-w-none max-h-full overflow-y-auto lg:overflow-visible lg:h-full [&::-webkit-scrollbar]:hidden lg:[&::-webkit-scrollbar]:block"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="lg:hidden absolute top-6 left-6 z-50 w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full text-gray-500 hover:bg-gray-200"
                onClick={() => setIsModalOpen(false)}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
              <SideBar pokemon={selectedPokemon} />
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={scrollToTop}
        className="lg:hidden fixed bottom-6 right-6 z-40 bg-red-500 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg shadow-gray-300 hover:bg-red-600 transition-all cursor-pointer"
      >
        <FaArrowUp />
      </button>
    </div>
  );
}
