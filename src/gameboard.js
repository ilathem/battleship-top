const Ship = require("./ship");

class Gameboard {
  constructor() {
    this.board = Array.from(Array(10), () => new Array(10));
    this.missedAttacks = [];
  }

  placeShip(startRow, startCol, endRow, endCol, shipId = null) {
    if (startRow !== endRow && startCol !== endCol)
      throw new Error("No diagonal ships");
    let orientation = undefined;
    if (startCol === endCol) orientation = "vertical";
    if (startRow === endRow) orientation = "horizontal";
    const constantCoord = orientation === "horizontal" ? startRow : startCol;
    let length = 0;
    let newShip;
    console.log(`orientation is ${orientation}`);
    if (orientation === "horizontal") {
      const beginningCol = Math.min(startCol, endCol);
      const endingCol = Math.max(startCol, endCol);
      length = endingCol - beginningCol + 1;
      newShip = new Ship(length, shipId);
      for (let i = beginningCol; i <= endingCol; i++) {
        this.board[constantCoord][i] = newShip.id;
      }
    } else if (orientation === "vertical") {
      const beginningRow = Math.min(startRow, endRow);
      const endingRow = Math.max(startRow, endRow);
      length = endingRow - beginningRow + 1;
      newShip = new Ship(length, shipId);
      for (let i = beginningRow; i <= endingRow; i++) {
        this.board[i][constantCoord] = newShip.id;
      }
    }
    console.log(this.board);
    this.ships = { ...this.ships, [newShip.id]: newShip };
    return newShip;
  }

  receiveAttack(x, y) {
    const destination = this.board[x][y];
    if (destination && destination !== "X") {
      this.ships[destination].hit();
      this.board[x][y] = "X";
      console.log(
        `attack (${x}, ${y}): ${destination} hit (length is ${this.ships[destination].length}), total hit count is ${this.ships[destination].hitCount}`,
      );
      return "Hit!";
    }
    this.board[x][y] = "O";
    this.missedAttacks.push([x, y]);
    return "Miss!";
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
