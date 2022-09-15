export class Pokemon {
  constructor(data) {
    this.name = data.name
    this.url = data.url
  }

  get ListTemplate() {
    return /*html*/`
      <div class="pokemon">
        <i class="mdi mdi-pokeball"></i>
        <span>${this.name}</span>
      </div>
    `
  }
}