import { observer } from 'mobx-react'
import store from '../src/store'

import PokemonRow from "./PokemonRow";

function PokemonTable() {
  // START: TEMPLATES
  return (
    <table width="100%">
      <tbody>
        {store.filteredPokemons
          .slice(0, 20)
          .map((pokemon) => (
            <PokemonRow
              key={pokemon.id}
              pokemon={pokemon}
              onClick={(pokemon) => store.setSelectedPokemon(pokemon)}
            />
          ))}
      </tbody>
    </table>
  );
  // END: TEMPLATES

}

export default observer(PokemonTable);