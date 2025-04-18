import './styles/App.sass';
import Swal from 'sweetalert2';

import { useState } from 'react';

import {
  getPokemons,
  getPokemonByName,
  getPokemonByType,
} from './services/api.js';

import Card from './components/Card';
import AsideItem from './components/AsideItem';
import Button from './components/Button';
import Input from './components/Input';

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [activePokemon, setActivePokemon] = useState([]);
  const [fetchLimit, setFetchLimit] = useState(10);
  const [searchInput, setSearchInput] = useState('');

  async function loadPokemons(offset = 0, limit = 10) {
    const datas = await getPokemons(offset, limit);
    setPokemonList(datas);
    setActivePokemon(datas[0]);
  }

  async function searchPokemonByName(name) {
    if (!name) {
      Swal.fire({
        icon: 'info',
        title: 'Oops...',
        text: 'O campo está vazio',
        footer: 'Por favor, digite o nome do Pokémon',
      });
    } else {
      const datas = await getPokemonByName(name);

      datas !== 'erro'
        ? setActivePokemon(datas)
        : Swal.fire({
            icon: 'error',
            title: 'Pokemon não encontrado',
            text: 'Por favor, tente novamente',
          });
    }
  }

  async function searchPokemonByType(type) {
    const datas = await getPokemonByType(type);
    setPokemonList(datas);
    setActivePokemon(datas[0]);
  }

  function loadMorePokemons() {
    setFetchLimit((prevLimit) => {
      const updatedLimit = prevLimit + 10;
      loadPokemons(0, updatedLimit);
      return updatedLimit;
    });
  }

  return (
    <main className="main">
      <section>
        {!activePokemon?.id && (
          <Button
            text={'Carregar Pokémons'}
            className={'btn'}
            onClick={() => loadPokemons()}
          />
        )}

        {activePokemon?.id && (
          <>
            <div className='container-pesquisar'>
              <Input setSearchInput={setSearchInput} />
              <Button
                text={'Pesquisar'}
                className={'btn btn-pesquisar'}
                onClick={() => searchPokemonByName(searchInput)}
              />
            </div>

            <Card
              key={activePokemon.id}
              id={activePokemon.id}
              image={activePokemon.sprites}
              nome={activePokemon.name}
              tipo={activePokemon.types[0].type.name}
              habilidades={activePokemon.abilities.map(
                (habilidade) => habilidade.ability.name
              )}
              hp={activePokemon.stats[0].base_stat}
              ataque={activePokemon.stats[1].base_stat}
              defesa={activePokemon.stats[2].base_stat}
              velocidade={activePokemon.stats[5].base_stat}
            />
          </>
        )}
      </section>

      {activePokemon?.id && (
        <aside className="container-aside">
          <div className="container-filterType">
            <label>Filtrar por tipo: </label>
            <select
              onChange={(e) =>
                e.target.value !== 'todos'
                  ? searchPokemonByType(e.target.value)
                  : loadPokemons()
              }
            >
              <option value={'todos'}>Todos</option>
              <option value={'fire'}>Fire</option>
              <option value={'electric'}>Electric</option>
              <option value={'water'}>Water</option>
              <option value={'grass'}>Grass</option>
              <option value={'ghost'}>Ghost</option>
              <option value={'psychic'}>Psychic</option>
              <option value={'poison'}>Poison</option>
              <option value={'ground'}>Ground</option>
              <option value={'rock'}>Rock</option>
              <option value={'fighting'}>Fighting</option>
              <option value={'fairy'}>Fairy</option>
              <option value={'normal'}>Normal</option>
              <option value={'ice'}>Ice</option>
              <option value={'dragon'}>Dragon</option>
              <option value={'dark'}>Dark</option>
            </select>
          </div>

          <ul>
            {pokemonList.map((pokemon) => (
              <AsideItem
                key={pokemon.id}
                image={pokemon.sprites.front_default}
                nome={pokemon.name}
                tipo={pokemon.types[0].type.name}
                onClick={() => {
                  const selected = pokemonList.find((p) => p.id === pokemon.id);
                  setActivePokemon(selected);
                }}
              />
            ))}
          </ul>

          <Button
            text={'More'}
            className={'btn btn-more'}
            onClick={() => loadMorePokemons()}
          />
        </aside>
      )}
    </main>
  );
}

export default App;
