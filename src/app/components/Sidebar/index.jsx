import { useContext, useEffect, useMemo } from 'react';
import { PokemonContext } from '../../context/pokemon';
import Image from 'next/image';

import ImgErro from '../../../../public/triangle-exclamation-solid.svg';

import { TYPE_COLORS as Colors } from '../../constants';

const Sidebar = ({ pokemon }) => {
  const {
    loadPokemonDetails,
    loadingDetails,
    weaknesses,
    evolutions,
    selectedPokemon,
    species,
    selectPokemonByEvo
  } = useContext(PokemonContext);

  const POKEMON_STATS = useMemo(
    () => [
      {
        label: 'HP',
        shortLabel: 'HP',
        value: pokemon?.stats.hp,
        color: 'bg-red-500',
      },
      {
        label: 'Attack',
        shortLabel: 'ATK',
        value: pokemon?.stats.attack,
        color: 'bg-orange-500',
      },
      {
        label: 'Defense',
        shortLabel: 'DEF',
        value: pokemon?.stats.defense,
        color: 'bg-yellow-400',
      },
      {
        label: 'Sp. Atk',
        shortLabel: 'SpA',
        value: pokemon?.stats.special_attack,
        color: 'bg-cyan-400',
      },
      {
        label: 'Sp. Def',
        shortLabel: 'SpD',
        value: pokemon?.stats.special_defense,
        color: 'bg-green-400',
      },
      {
        label: 'Speed',
        shortLabel: 'SPD',
        value: pokemon?.stats.speed,
        color: 'bg-pink-400',
      },
      {
        label: 'Total',
        shortLabel: 'TOT',
        value: pokemon?.totalStats,
        color: 'bg-indigo-500',
      },
    ],
    [pokemon]
  );

  const currentIndex = useMemo(() => {
    return evolutions.findIndex((evo) => evo.name === selectedPokemon?.name);
  }, [evolutions, selectedPokemon?.name]);

  const prev = evolutions[currentIndex - 1];
  const next = evolutions[currentIndex + 1];

  useEffect(() => {
    if (!pokemon?.name) return;
    loadPokemonDetails(pokemon?.name);
  }, [pokemon?.name, loadPokemonDetails]);

  return (
    <div className="bg-white rounded-[40px] shadow-lg p-6 md:p-8 h-fit lg:sticky lg:top-6 lg:mr-2 min-h-[400px] flex flex-col">
      {loadingDetails ? (
        <div className="flex-1 flex flex-col items-center justify-center py-20">
          <div className="w-12 h-12 border-4 border-gray-100 border-t-red-500 rounded-full animate-spin mb-4"></div>
          <p className="text-gray-400 font-medium animate-pulse">Loading data...</p>
        </div>
      ) : (
        <>
          <div className="relative flex justify-center mb-8">
            <div className="absolute top-0 right-0 flex flex-col space-y-2">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                <i className="fa-solid fa-mars"></i>
              </div>
              <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-pink-500">
                <i className="fa-solid fa-venus"></i>
              </div>
            </div>
            <Image
              src={pokemon?.image || ImgErro}
              alt={pokemon?.name || 'Pokemon'}
              className="object-contain drop-shadow-2xl -mt-10 z-10"
              width={192}
              height={192}
            />
          </div>

          <div className="text-center mb-6">
            <span className="text-sm font-bold text-gray-400">#{pokemon?.id}</span>
            <h2 className="text-3xl font-extrabold text-gray-800 capitalize">
              {pokemon?.name}
            </h2>
            <p className="text-gray-400 text-sm font-medium">{species?.genus}</p>
          </div>

          <div className="flex justify-center gap-2 mb-6">
            {pokemon?.types.map((type, index) => {
              return (
                <span
                  key={index}
                  className={`${Colors[type]} text-xs font-bold text-white px-6 py-1.5 rounded-lg uppercase`}
                >
                  {type}
                </span>
              );
            })}
          </div>

          <div className="mb-8">
            <h4 className="text-center font-bold text-xs uppercase text-gray-800 mb-3 tracking-widest">
              Pokédex Entry
            </h4>
            <p className="text-center text-sm text-gray-500 leading-relaxed px-4">
              {species?.entry}
            </p>
          </div>

          <div className="mb-8">
            <h4 className="text-center font-bold text-xs uppercase text-gray-800 mb-3 tracking-widest">
              Abilities
            </h4>
            <div className="flex gap-2">
              {pokemon?.abilities.map((ability, index) => {
                return (
                  <div
                    key={index}
                    className="flex-1 bg-gray-50 border border-gray-100 py-2 rounded-xl text-center"
                  >
                    <span className="text-sm font-medium text-gray-600 capitalize">
                      {ability}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 mb-8 text-center">
            <div>
              <h4 className="font-bold text-xs uppercase text-gray-800 mb-2 tracking-widest">
                Height
              </h4>
              <span className="text-lg font-bold text-gray-700">
                {pokemon?.height?.toString().replace('.', ',')}m
              </span>
            </div>
            <div>
              <h4 className="font-bold text-xs uppercase text-gray-800 mb-2 tracking-widest">
                Weight
              </h4>
              <span className="text-lg font-bold text-gray-700">
                {pokemon?.weight?.toString().replace('.', ',')}kg
              </span>
            </div>
            <div>
              <h4 className="font-bold text-xs uppercase text-gray-800 mb-2 tracking-widest">
                Weaknesses
              </h4>
              <div className="flex justify-center gap-1">
                {weaknesses.map((weakness, index) => (
                  <div
                    key={index}
                    className={`w-5 h-5 rounded-full ${Colors[weakness]} border-white`}
                  ></div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-bold text-xs uppercase text-gray-800 mb-2 tracking-widest">
                Base Exp
              </h4>
              <span className="text-lg font-bold text-gray-700">
                {pokemon?.baseExp}
              </span>
            </div>
          </div>

          <div className="mb-8">
            <h4 className="text-center font-bold text-xs uppercase text-gray-800 mb-4 tracking-widest">
              Stats
            </h4>
            <div className="flex justify-between items-end gap-1 px-2">
              {POKEMON_STATS.map((stat, idx) => (
                <div key={idx} className="flex flex-col items-center flex-1">
                  <div className="w-full h-24 bg-gray-100 rounded-full relative mb-2 overflow-hidden flex flex-col justify-end">
                    <div
                      className={`w-full ${stat.color} rounded-full`}
                      style={{
                        height: `${(stat.value / (stat.label === 'Total' ? 700 : 150)) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <span className="text-[9px] font-bold text-gray-400 mb-1">
                    {stat.shortLabel}
                  </span>
                  <span className="text-[10px] font-bold text-gray-700">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h4 className="text-center font-bold text-xs uppercase text-gray-800 mb-4 tracking-widest">
              Evolution
            </h4>
            <div className="flex items-center justify-center flex-wrap space-x-4">
              {evolutions.map((evolution, index) => {
                return (
                  <div key={index} className="flex items-center gap-3">
                    <Image
                      src={evolution.image}
                      alt={evolution.name}
                      className={`${selectedPokemon?.name === evolution.name ? '' : 'grayscale opacity-50'}`}
                      width={40}
                      height={40}
                    />

                    {evolutions.length - 1 !== index && (
                      <i className="fa-solid fa-chevron-right text-[10px] text-gray-300"></i>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 pt-4 border-t border-gray-100">
            <button className="flex items-center space-x-2 text-gray-400 hover:text-gray-600 transition-colors">
              {prev && (
                <>
                  <i className="fa-solid fa-chevron-left text-xs"></i>
                  <span className="text-xs font-bold cursor-pointer" onClick={() => selectPokemonByEvo(prev.name)}>
                    {prev.name}
                  </span>
                </>
              )}
            </button>
            <button className="flex items-center space-x-2 text-gray-400 hover:text-gray-600 transition-colors">
              {next && (
                <>
                  <span className="text-xs font-bold cursor-pointer" onClick={() => selectPokemonByEvo(next.name)}>
                    {next.name}
                  </span>
                  <i className="fa-solid fa-chevron-right text-xs"></i>
                </>
              )}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
