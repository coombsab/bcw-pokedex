import { appState } from "../AppState.js"
import { pokedexService } from "../Services/PokedexService.js"
import { Pop } from "../Utils/Pop.js"
import { setHTML } from "../Utils/Writer.js"

function _drawWildPokemon() {
  if (!appState.wildPokemon) {
    return
  }
  // console.log(appState.wildPokemon.img.front_default)
  setHTML("wild-pokemon", appState.wildPokemon.PokemonTemplate)
  // console.log(appState.wildPokemon.img.front_default)
  // console.log(appState.wildPokemon.img.other["official-artwork"].front_default)

}

export class PokedexController {
  constructor() {
    this.getPokedex()
    appState.on("wildPokemon", _drawWildPokemon)
  }

  async getPokedex() {
    try {
      await pokedexService.getPokedex()
    } catch (error) {
      console.error("[getPokedex]", error)
      Pop.error(error)
    }
  }
}