import { PokedexController } from "./Controllers/PokedexController.js";
import { PokemonsCaughtController } from "./Controllers/PokemonsCaughtController.js";
import { ValuesController } from "./Controllers/ValuesController.js";

class App {
  pokedexController = new PokedexController()

  pokemonsCaughtController = new PokemonsCaughtController()
}

window["app"] = new App();
