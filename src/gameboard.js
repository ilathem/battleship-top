const Ship = require('./ship');

class Gameboard {
  constructor() {
    this.board = Array.from(Array(10), () => new Array(10));
  }

  placeShip(startX, startY, endX, endY) {
    if (startX !== endX && startY !== endY)
      throw new Error('No diagonal ships');
    let orientation = undefined;
    if (startY === endY) orientation = 'horizontal';
    if (startX === endX) orientation = 'vertical';
    let constantCoord = orientation === 'horizontal' ? startY : startX;
    if (orientation === 'horizontal') {
      const beginningX = Math.min(startX, endX)
      const endingX = Math.max(startX, endX)
      for (let i = beginningX; i <= endingX; i++) {
        this.board[i][constantCoord] = 'S';
      }
    } else if (orientation === 'vertical') {
      const beginningY = Math.min(startY, endY)
      const endingY = Math.max(startY, endY)
      for (let i = beginningY; i <= endingY; i++) {
        this.board[constantCoord][i] = 'S';
      }
    }
  }
}

module.exports = Gameboard;
