import { appState } from "../AppState.js"
import { PokemonCaught } from "../Models/PokemonCaught.js"
import { SandboxServer } from "./AxiosService.js"
import { pokedexService } from "./PokedexService.js"

class PokemonsCaughtService{
  async releasePokemon(pokemonId) {
    await SandboxServer.delete(`api/${appState.user}/pokemon/${pokemonId}`)
    appState.caughtPokemon = appState.caughtPokemon.filter(pokemon => pokemon.id !== pokemonId)
    appState.totalPokemon--
  }

  async renamePokemon(nickName, pokemonId) {
    let updatedPokemon = appState.caughtPokemon.find(pokemon => pokemon.id === pokemonId)
    if (!updatedPokemon) {
      throw new Error("Invalid Pokemon ID")
    }
    updatedPokemon.nickName = nickName
    const res = SandboxServer.put(`api/${appState.user}/pokemon/${pokemonId}`, updatedPokemon)
    appState.emit("caughtPokemon")
  }

  getNextPage() {
    if (appState.startIndex < appState.caughtPokemon.length - appState.pokemonPerPage) {
      appState.startIndex += appState.pokemonPerPage
    }
    
  }
  getPreviousPage() {
    if (appState.startIndex - appState.pokemonPerPage < 0) {
      appState.startIndex = 0
    } else {
      appState.startIndex -= appState.pokemonPerPage
    }

  }
  constructor() {
    
  }
  async catchPokemon() {
    let newPokemon = new PokemonCaught(appState.wildPokemon)
    const nickname = await window.prompt(`Enter a nickname for ${newPokemon.name}`)
    if (nickname != "") {
      newPokemon.nickName = nickname
    }
    // console.log(newPokemon)
    const res = await SandboxServer.post(`api/${appState.user}/pokemon`, newPokemon)
    // console.log(res.data)
    newPokemon = new PokemonCaught(res.data)
    appState.caughtPokemon = [newPokemon, ...appState.caughtPokemon]
    appState.totalPokemon++
    pokedexService.getWildPokemon()
  }
  async getCaughtPokemon() {
    const res = await SandboxServer.get(`api/${appState.user}/pokemon`)
    // console.log("pokemon from sandbox", res.data)
    appState.caughtPokemon = res.data.map(d => new PokemonCaught(d))
    // console.log("sandbox pokemone copied to caughtPokemon array", appState.caughtPokemon)
    appState.totalPokemon = appState.caughtPokemon.length
  }
}

export const pokemonsCaughtService = new PokemonsCaughtService()