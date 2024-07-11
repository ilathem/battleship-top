const Ship = require('./ship');

class Gameboard {
  constructor() {
    this.board = Array.from(Array(10), () => new Array(10));
    this.missedAttacks = [];
  }

  placeShip(startX, startY, endX, endY, shipId = null) {
    if (startX !== endX && startY !== endY)
      throw new Error('No diagonal ships');
    let orientation = undefined;
    if (startY === endY) orientation = 'horizontal';
    if (startX === endX) orientation = 'vertical';
    let constantCoord = orientation === 'horizontal' ? startY : startX;
    let length = 0;
    let newShip;
    if (orientation === 'horizontal') {
      const beginningX = Math.min(startX, endX)
      const endingX = Math.max(startX, endX)
      length = endingX - beginningX + 1;
      newShip = new Ship(length, shipId);
      for (let i = beginningX; i <= endingX; i++) {
        this.board[i][constantCoord] = newShip.id;
      }
    } else if (orientation === 'vertical') {
      const beginningY = Math.min(startY, endY)
      const endingY = Math.max(startY, endY)
      length = endingY - beginningY + 1;
      newShip = new Ship(length, shipId);
      for (let i = beginningY; i <= endingY; i++) {
        this.board[constantCoord][i] = newShip.id;
      }
    }
    this.ships = { ...this.ships, [newShip.id]: newShip }
    // this.ships.push(newShip)
    return newShip;
  }


  receiveAttack(x, y) {
    const destination = this.board[x][y];
    if (destination) {
      this.ships[destination].hit();
      this.board[x][y] = null;
      console.log(`attack (${x}, ${y}): ${destination} hit (length is ${this.ships[destination].length}), total hit count is ${this.ships[destination].hitCount}`);
      return 'Hit!'
    }
    this.missedAttacks.push([x, y]);
    return [x, y];
  }

  allSunk() {
    if (!this.ships) return false;
    // console.log(this.ships)
    for (const shipId in this.ships) {
      // console.log(`${shipId} - ${this.ships[shipId].length}: ${this.ships[shipId].hitCount}`)
      if (!this.ships[shipId].isSunk()) return false;
    }
    return true;
  }
}

module.exports = Gameboard;
