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
    let length = undefined;
    if (orientation === 'horizontal') {
      length = Math.abs(startX - endX) + 1;
      if (startX === 0 || endX === 0) length--;
    } else if (orientation === 'vertical') {
      length = Math.abs(startY - endY) + 1;
      if (startY === 0 || endY === 0) length--;
    }
    let constantCoord = orientation === 'horizontal' ? startY : startX;
    if (orientation === 'horizontal') {
      const beginningX = Math.min(startX, endX)
      for (let i = beginningX; i <= beginningX + length; i++) {
        this.board[i][constantCoord] = 'S';
      }
    } else if (orientation === 'vertical') {
      const beginningY = Math.min(startY, endY)
      for (let i = beginningY; i <= beginningY + length; i++) {
        this.board[constantCoord][i] = 'S';
      }
    }
  }
}

module.exports = Gameboard;
