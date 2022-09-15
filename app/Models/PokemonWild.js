const gramsToLbs = 0.00220462
const centimetersToInches = 0.393701
const centimetersToFeet = 0.0328084

export class PokemonWild {
  constructor(data) {
    this.id = data.id
    this.types = data.types
    this.displayTypes = data.types.map(t => " " + t.type.name)
    this.name = data.name
    this.img = data.img || data.sprites
    if (typeof this.img === "object") {
      this.img = this.img.front_default !== null ? this.img.front_default : this.img.other["official-artwork"].front_default !== null ? this.img.other["official-artwork"].front_default : "https://thiscatdoesnotexist.com"
    }
    this.weight = data.weight
    this.height = data.height
  }

  get PokemonTemplate() {
    return /*html*/`
    <div class="theme-card mb-3">
      <div class="theme-card-body fs-3">
        <span>${this.name.toUpperCase()}</span>
      </div>
    </div>
    <img src="${this.img}" alt="${this.name}" class="img-fluid" id="wild-pokemon-image">
    <div class="theme-card mt-3">
      <div class="theme-card-body">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <span>Height: ${Math.floor(this.height * 10 * centimetersToFeet) > 0 ? Math.floor(this.height * 10 * centimetersToFeet) + "'" : ""} ${Math.floor(this.height * 10 * centimetersToInches) % 12}"</span>
          <span>Weight: ${(this.weight * 100 * gramsToLbs).toFixed(2)} lbs</span>
        </div>
        <div class="d-flex align-items-center mb-3">
          <span>Types: ${this.displayTypes}</span>
        </div>
        <div class="d-flex justify-content-end">
          <div class="d-flex align-items-center gap-2 selectable theme-button" id="catch-button" onclick="app.pokemonsCaughtController.catchPokemon()">
            <i class="mdi mdi-pokeball"></i>
            <span>Catch</span>
          </div>
          <!--<button class="theme-button" id="catch-button"><i class="mdi mdi-pokeball"></i>  Catch</button>-->
        </div>
      </div>
    </div>
    `
  }
}