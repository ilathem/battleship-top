class Gameboard {
  constructor() {
    this.board = Array.from(Array(10), () => new Array(10));
  }
}

module.exports = Gameboard;