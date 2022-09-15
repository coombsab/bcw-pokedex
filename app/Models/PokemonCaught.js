import { PokemonWild } from "./PokemonWild.js";

export class PokemonCaught extends PokemonWild {
  constructor(data) {
    super(data)
    this.nickName = data.nickName
  }

  get PokemonListTemplate() {
    return /*html*/`
      <div class="d-flex justify-content-between align-items-center pokemon-card">
        <div class="gap-1">
          <i class="mdi mdi-pokeball"></i>
          <span>${this.nickName ? this.nickName : this.name}</span>
        </div>
        <div class="d-flex gap-2 justify-content-end align-items-center icons on-hover">
          <div>
            <i class="mdi mdi-human-edit selectable edit-icon" onclick="app.pokemonsCaughtController.renamePokemon('${this.id}')"></i>
          </div>
          <div>
            <i class="mdi mdi-delete selectable delete-icon" onclick="app.pokemonsCaughtController.releasePokemon('${this.id}')"></i>
          </div>
        </div>
      </div>
    `
  }
}