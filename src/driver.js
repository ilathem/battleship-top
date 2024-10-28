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
  // populateWithPredeterminedCoordinates(player1);
  // populateWithPredeterminedCoordinates(player2);
  return { player1, player2 }
}


function renderGameBoard(container, player, triggerNextTurn, msg) {
  // console.log(player.board);
  const htmlTable = [];
  const table = document.createElement("table");
  for (let i = 0; i < player.board.board.length; i++) {
    const row = document.createElement("tr");
    htmlTable[i] = new Array(player.board.board[i].length);
    for (let j = 0; j < player.board.board[i].length; j++) {
      const tableData = document.createElement("td");
      let displayText = player.board.board[i][j] || '-';
      // if (['X', 'O'].includes(player.board.board[i][j])) displayText = player.board.board[i][j];
      // else displayText = '-'
      tableData.innerText = displayText;
      htmlTable[i][j] = tableData;
      tableData.addEventListener('click', () => {
        if (['X', 'O'].includes(player.board.board[i][j])) {
          // console.log('this has already been attacked');
          return;
        }
        // console.log(`attack on ${i}, ${j}`)
        // console.log(player.board.board[i][j] || 'just empty water')
        const result = player.board.receiveAttack(i, j);
        // console.log(result);
        tableData.innerText = player.board.board[i][j];
        msg.innerText = result;
        setTimeout(triggerNextTurn, 100)
      })
      row.appendChild(tableData);
    }
    table.appendChild(row);
  }
  container.appendChild(table);
  return htmlTable;
}

function renderShips(player, activeShip) {
  const div = document.createElement('div');
  div.classList.add('renderShipsDiv');
  const p = document.createElement('p');
  p.innerText = 'Select which ship you would like to place';
  const shipsDiv = document.createElement('div');
  shipsDiv.classList.add('shipsToChooseDiv');
  const input = document.createElement('input');
  input.classList.add('shipLocationInput');
  input.type = 'number';
  input.placeholder = 'Tap or type starting square';
  input.disabled = true;
  const ships = [
    {
      name: 'Aircraft Carrier',
      length: 5,
    },
    {
      name: 'Battleship',
      length: 4,
    },
    {
      name: 'Destroyer',
      length: 4,
    },
    {
      name: 'Submarine',
      length: 3,
    },
    {
      name: 'Patrol Boat',
      length: 2,
    }
  ];
  const shipBtnDivs = [];
  for (let i = 0; i < 5; i++) {
    const shipBtn = document.createElement('div');
    shipBtnDivs.push(shipBtn);
    shipBtn.innerText = ships[i].name;
    shipBtn.classList.add('shipBtn');
    shipsDiv.appendChild(shipBtn);
    shipBtn.addEventListener('click', () => {
      activeShip = ships[i].name;
      input.disabled = false;
      input.style.border = '2px solid #00B4EA';
      shipBtnDivs.forEach(btn => btn.style.border = '2px solid white')
      shipBtn.style.border = '2px solid #00B4EA';
    })
  }
  div.appendChild(p);
  div.appendChild(shipsDiv);
  div.appendChild(input);
  return div;
}

function renderPregameBoard(container, player) {
  const htmlTable = [];
  let activeShip = null;
  const table = document.createElement("table");
  for (let i = 0; i < player.board.board.length; i++) {
    const row = document.createElement("tr");
    htmlTable[i] = new Array(player.board.board[i].length);
    for (let j = 0; j < player.board.board[i].length; j++) {
      const tableData = document.createElement("td");
      let displayText = player.board.board[i][j] || `${i}${j}`;
      tableData.innerText = displayText;
      htmlTable[i][j] = tableData;
      tableData.addEventListener('mouseup', () => {
        console.log(`selected coordinate (${i}, ${j})`)
      })
      row.appendChild(tableData);
    }
    table.appendChild(row);
  }
  container.appendChild(renderShips(player, activeShip));
  container.appendChild(table);
  return htmlTable;
}

module.exports = { createTemplateGame, renderGameBoard, renderPregameBoard } 
