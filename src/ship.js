class Ship {
  constructor(length) {
    this.length = length;
    this.hitCount = 0;
    this.id = Date.now();
  }

  hit() {
    this.hitCount++;
  }

  isSunk() {
    return this.length === this.hitCount;
  }
}

module.exports = Ship;
