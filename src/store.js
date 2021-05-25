import {
  // makeAutoObservable,
  makeObservable,
  observable,
  computed
} from 'mobx'

// START: STORE CLASS --- ---
class Store {
  // START: STATES ---
  pokemons = require('./pokemon.json')
  filter = ""
  selectedPokemon = null
  // END: STATES ---


  // START: METHODS ---
  // START: CONSTRUCTORS
  constructor() {
    // makeAutoObservable(this)

    makeObservable(this, {
      pokemons: observable,
      filter: observable,
      selectedPokemon: observable,
      filteredPokemons: computed
    })
  }
  // END: CONSTRUCTORS

  // START: GETTERS
  get filteredPokemons() {
    return this.pokemons
      .filter(({ name: { english } }) =>
        english.toLocaleLowerCase().includes(this.filter.toLocaleLowerCase())
      )
  }
  // END: GETTERS


  // START: SETTERS
  setPokemons(pokemons) {
    this.pokemons = pokemons
  }
  setFilter(filter) {
    this.filter = filter
  }
  setSelectedPokemon(selectedPokemon) {
    this.selectedPokemon = selectedPokemon;
  }
  // END: SETTERS
  // END: METHODS ---
}
// END: STORE CLASS --- ---


// INSTANTIATE STORE OBJECT
const store = new Store()

// FETCH POKEMONS DATA
// if (typeof window !== 'undefined') {
//   fetch("/pokemon.json")
//     .then((resp) => resp.json())
//     .then((pokemons) => store.setPokemons(pokemons))
// }

// EXPORT STORE
export default store