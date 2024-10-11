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

function renderGameBoard(container, player, triggerNextTurn, msg) {
  console.log(player.board);
  const htmlTable = [];
  const table = document.createElement("table");
  for (let i = 0; i < player.board.board.length; i++) {
    const row = document.createElement("tr");
    htmlTable[i] = new Array(player.board.board[i].length);
    for (let j = 0; j < player.board.board[i].length; j++) {
      const tableData = document.createElement("td");
      let displayText = player.board.board[i][j] || '-';
      if (['X', 'O'].includes(player.board.board[i][j])) displayText = player.board.board[i][j];
      else displayText = '-'
      tableData.innerText = displayText;
      htmlTable[i][j] = tableData;
      tableData.addEventListener('click', () => {
        if (['X', 'O'].includes(player.board.board[i][j])) {
          console.log('this has already been attacked');
          return;
        }
        console.log(`attack on ${i}, ${j}`)
        console.log(player.board.board[i][j] || 'just empty water')
        const result = player.board.receiveAttack(i, j);
        console.log(result);
        tableData.innerText = player.board.board[i][j];
        msg.innerText = result;
        setTimeout(triggerNextTurn, 3000)
      })
      row.appendChild(tableData);
    }
    table.appendChild(row);
  }
  container.appendChild(table);
  return htmlTable;
}

module.exports = { createTemplateGame, renderGameBoard } 
