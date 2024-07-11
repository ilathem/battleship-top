const Player = require('./player');

function populateWithPredeterminedCoordinates(player) {
  const shipTemplate = [
    [0, 0, 0, 4, 'carrier'],
    [1, 9, 4, 9, 'battleship'],
    [1, 0, 1, 2, 'destroyer'],
    [6, 5, 8, 5, 'submarine'],
    [9, 0, 9, 1, 'patrol boat'],
  ]
  for (const ship in shipTemplate) {
    player.board.placeShip(...shipTemplate[ship])
  }
}

function createTemplateGame() {
  const player1 = new Player('real');
  const player2 = new Player('real');
  populateWithPredeterminedCoordinates(player1);
  populateWithPredeterminedCoordinates(player2);
  return { player1, player2 }
}

module.exports = { createTemplateGame } 
