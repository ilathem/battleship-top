class Ship {
  constructor(length, shipId = null) {
    this.length = length;
    this.hitCount = 0;
    if (shipId) this.id = shipId;
    else this.id = Date.now();
  }

  hit() {
    this.hitCount++;
  }

  isSunk() {
    return this.length === this.hitCount;
  }
}

module.exports = Ship;
