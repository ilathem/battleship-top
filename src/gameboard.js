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
      length = Math.abs(startY - endY);
    } else if (orientation === 'vertical') {
      length = Math.abs(startX - endX);
    }
    let constantCoord = orientation === 'horizontal' ? startY : startX;
    if (orientation === 'horizontal') {
      for (let i = startX; i <= endX; i++) {
        this.board[i][constantCoord] = 'S';
      }
    } else if (orientation === 'vertical') {
      for (let i = startY; i <= endY; i++) {
        this.board[constantCoord][i] = 'S';
      }
    }
  }
}

module.exports = Gameboard;
