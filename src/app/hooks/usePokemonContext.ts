import { useContext } from 'react';
import { PokemonContext } from '../context/pokemon';

export function usePokemonContext() {
    const context = useContext(PokemonContext);

    if(!context) {
        throw new Error("usePokemonContext deve ser usado dentro de PokemonContextProvider");
    }

    return context;
}