import { appState } from "../AppState.js"
import { PokemonCaught } from "../Models/PokemonCaught.js"
import { pokemonsCaughtService } from "../Services/PokemonsCaughtService.js"
import { Pop } from "../Utils/Pop.js"
import { setHTML, setText } from "../Utils/Writer.js"

function _drawCaughtPokemon() {
  let template = ""
  // appState.caughtPokemon.forEach(pokemon => template += pokemon.PokemonListTemplate)
  const page = appState.caughtPokemon.slice(0, appState.caughtPokemon.length)
  // console.log("appState", appState.caughtPokemon)
  // console.log("page", page)
  page.splice(appState.startIndex, appState.pokemonPerPage).forEach(pokemon => template += pokemon.PokemonListTemplate)
  setHTML("pokemon-list", template)
}

function _drawTotalPokemon() {
  setText("total-pokemon", appState.totalPokemon)
}

export class PokemonsCaughtController {
  constructor() {
    _drawTotalPokemon()
    appState.on("caughtPokemon", _drawCaughtPokemon)
    appState.on("totalPokemon", _drawTotalPokemon)
    this.getCaughtPokemon()
  }

  async catchPokemon() {
    try {
      await pokemonsCaughtService.catchPokemon()
    } catch (error) {
      console.error("[catchPokemon]", error)
      Pop.error(error)
    }
  }

  async getCaughtPokemon() {
    try {
      await pokemonsCaughtService.getCaughtPokemon()
    } catch (error) {
      console.error("[getCaughtPokemon]", error)
      Pop.error(error)
    }
  }

  async releasePokemon(pokemonId) {
    try {
      const targetPokemon = appState.caughtPokemon.find(pokemon => pokemon.id === pokemonId)
      if (!targetPokemon) {
        throw new Error("Pokemon ID invalid")
      }
      const yes = await Pop.confirm(`Release ${targetPokemon.nickName ? targetPokemon.nickName : targetPokemon.name }`)
      if (!yes) {
        return
      }
      await pokemonsCaughtService.releasePokemon(pokemonId)
    } catch (error) {
      console.error("[releasePokemon]", error)
      Pop.error(error)
    }
  }

  async renamePokemon(pokemonId) {
    try {
      const newNickname = await window.prompt("Enter new nickname")
      await pokemonsCaughtService.renamePokemon(newNickname, pokemonId)
    } catch (error) {
      console.error("[handlePokemonClick]", error)
      Pop.error(error)
    }
  }

  getNextPage() {
    pokemonsCaughtService.getNextPage()
    _drawCaughtPokemon()
  }

  getPreviousPage() {
    pokemonsCaughtService.getPreviousPage()
    _drawCaughtPokemon()
  }
}