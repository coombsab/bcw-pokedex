import { Value } from "./Models/Value.js"
import { EventEmitter } from "./Utils/EventEmitter.js"
import { isValidProp } from "./Utils/isValidProp.js"
import { loadState } from "./Utils/Store.js"

class AppState extends EventEmitter {
  /** @type {import('./Models/Pokemon').Pokemon[]} */
  pokedex = []

  /** @type {import('./Models/PokemonWild').PokemonWild | null} */
  wildPokemon = null

  /** @type {import('./Models/PokemonCaught').PokemonCaught[]} */
  caughtPokemon = []

  user = window.prompt("Enter Name")

  startIndex = 0
  endIndex = 11

  pokemonPerPage = 11

  totalPokemon = this.caughtPokemon.length
}

export const appState = new Proxy(new AppState(), {
  get(target, prop) {
    isValidProp(target, prop)
    return target[prop]
  },
  set(target, prop, value) {
    isValidProp(target, prop)
    target[prop] = value
    target.emit(prop, value)
    return true
  }
})
