import Image from 'next/image';
import ImgErro from '../../../../public/triangle-exclamation-solid.svg';
import { TYPE_COLORS as Colors } from '../../constants';
import type { PokemonCardProps } from '../../types/components.types';

const PokemonCard = ({ pokemon, onClick, isSelected }: PokemonCardProps) => {
  return (
    <div
      className={`bg-white rounded-3xl p-6 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-all cursor-pointer border-2 ${isSelected ? 'border-red-500' : 'border-transparent'}`}
      onClick={onClick}
    >
      
      <Image
        src={pokemon?.image || ImgErro}
        alt={pokemon?.name || 'Pokemon'}
        className="object-contain mb-4 drop-shadow-lg"
        width={128}
        height={128}
        unoptimized // uso temporário para evitar problemas com o Image Optimizer
        //onError={() => console.log("Erro ao carregar", pokemon.image, pokemon.name)}
      />
      
      <span className="text-[10px] font-bold text-gray-400 mb-1">
        Nº{pokemon.id}
      </span>
      <h3 className="text-xl font-bold text-gray-800 mb-3">{pokemon.name}</h3>
      <div className="flex gap-2">
        {pokemon.types.map((type) => (
          <span
            key={type}
            className={`${Colors[type]} text-[10px] font-bold text-white px-3 py-1 rounded-md uppercase tracking-wider`}
          >
            {type}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PokemonCard;
