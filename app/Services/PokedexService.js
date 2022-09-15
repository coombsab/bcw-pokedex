import { appState } from "../AppState.js";
import { Pokemon } from "../Models/Pokemon.js";
import { PokemonWild } from "../Models/PokemonWild.js";
import { Pop } from "../Utils/Pop.js";
import { PokemonServer } from "./AxiosService.js";


class PokedexService {

  constructor() {
  }

  async getPokedex() {
    const res = await PokemonServer.get("/api/v2/pokemon", {
      params: {
        limit: 1154
      }
    })
    // console.log(res.data.results)
    appState.pokedex = res.data.results.map(pokemon => new Pokemon(pokemon))
    // console.log(appState.pokedex)
    this.getWildPokemon()
  }

  async getWildPokemon() {
    try {
      let randomPokemon = appState.pokedex[Math.floor(Math.random() * appState.pokedex.length)]
      const res = await PokemonServer.get(randomPokemon.url)
      // console.log(res.data)
      appState.wildPokemon = new PokemonWild(res.data)
      // console.log(appState.wildPokemon.img.front_default)
    } catch (error) {
      console.error("[getWildPokemon]", error)
      Pop.error(error)
    }
  }
}

export const pokedexService = new PokedexService()