const { createTemplateGame } = require("./driver.js");
import './index.css';

// TODO: make a method to render the player gameboard onto the screen

const {player1, player2} = createTemplateGame();

function renderGameBoard(container, player) {
  console.log(player.board);
  const htmlTable = [];
  const table = document.createElement("table");
  for (let i = 0; i < player.board.board.length; i++) {
    const row = document.createElement("tr");
    htmlTable[i] = new Array(player.board.board[i].length);
    for (let j = 0; j < player.board.board[i].length; j++) {
      const tableData = document.createElement("td");
      const displayText = player.board.board[i][j] ?? '_';
      tableData.innerText = displayText;
      htmlTable[i][j] = tableData;
      row.appendChild(tableData);
    }
    table.appendChild(row);
  }
  container.appendChild(table);
  return htmlTable;
}
const body = document.querySelector('body');
const player1Table = renderGameBoard(body, player1);
