const Player = require("./player");

function populateWithPredeterminedCoordinates(player) {
  const shipTemplate = [
    [0, 0, 0, 4, "carrier"],
    [1, 9, 4, 9, "battleship"],
    [1, 0, 1, 2, "destroyer"],
    [6, 5, 8, 5, "submarine"],
    [9, 0, 9, 1, "patrol boat"],
  ];
  for (const ship in shipTemplate) {
    player.board.placeShip(...shipTemplate[ship]);
  }
}

function createTemplateGame() {
  const player1 = new Player("player1");
  const player2 = new Player("player2");
  // populateWithPredeterminedCoordinates(player1);
  // populateWithPredeterminedCoordinates(player2);
  return { player1, player2 };
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function showMiniBoard(htmlParent, board) {
  const htmlTable = [];
  const table = document.createElement("table");
  table.classList.add("miniBoardTable");
  for (let i = 0; i < board.length; i++) {
    const row = document.createElement("tr");
    htmlTable[i] = new Array(board[i].length);
    for (let j = 0; j < board[i].length; j++) {
      const tableData = document.createElement("td");
      tableData.classList.add("miniTd");
      let displayText = (board[i][j] && board[i][j].charAt(0)) || "-";
      // if (["X", "O"].includes(board[i][j]))
      //   displayText = board[i][j];
      // else displayText = "-";
      tableData.innerText = displayText;
      htmlTable[i][j] = tableData;
      row.appendChild(tableData);
    }
    table.appendChild(row);
  }
  htmlParent.appendChild(table);
}

function hideMiniBoard(htmlParent) {
  htmlParent.removeChild(htmlParent.lastChild);
}

function renderGameBoard(
  container,
  opponent,
  triggerNextTurn,
  msg,
  isCpuTurn,
  player,
) {
  // console.log(player.board);
  const peekMyBoardBtn = document.createElement("button");
  peekMyBoardBtn.innerText = "Peek my board";
  peekMyBoardBtn.classList.add("peekBoard");
  peekMyBoardBtn.addEventListener("mousedown", () => {
    showMiniBoard(peekMyBoardBtn, player.board.board);
  });
  peekMyBoardBtn.addEventListener("mouseup", () => {
    hideMiniBoard(peekMyBoardBtn);
  });
  container.appendChild(peekMyBoardBtn);
  const htmlTable = [];
  const table = document.createElement("table");
  for (let i = 0; i < opponent.board.board.length; i++) {
    const row = document.createElement("tr");
    htmlTable[i] = new Array(opponent.board.board[i].length);
    for (let j = 0; j < opponent.board.board[i].length; j++) {
      const tableData = document.createElement("td");
      let displayText = opponent.board.board[i][j] || "-";
      if (["X", "O"].includes(opponent.board.board[i][j]))
        displayText = opponent.board.board[i][j];
      else displayText = "-";
      tableData.innerText = displayText;
      htmlTable[i][j] = tableData;
      tableData.addEventListener("click", () => {
        if (isCpuTurn) return;
        if (["X", "O"].includes(opponent.board.board[i][j])) {
          // console.log('this has already been attacked');
          return;
        }
        // console.log(`attack on ${i}, ${j}`)
        // console.log(player.board.board[i][j] || 'just empty water')
        const result = opponent.board.receiveAttack(i, j);
        // console.log(result);
        tableData.innerText = opponent.board.board[i][j];
        msg.innerText = result;
        setTimeout(triggerNextTurn, 500);
      });
      row.appendChild(tableData);
    }
    table.appendChild(row);
  }
  container.appendChild(table);
  if (isCpuTurn) {
    setTimeout(() => {
      let row = getRandomInt(0, 9);
      let col = getRandomInt(0, 9);
      while (["X", "O"].includes(opponent.board.board[row][col])) {
        row = getRandomInt(0, 9);
        col = getRandomInt(0, 9);
      }
      console.log(`cpu attacking ${row}${col}`);
      const result = opponent.board.receiveAttack(row, col);
      htmlTable[row][col].innerText = opponent.board.board[row][col];
      msg.innerText = result;
      setTimeout(triggerNextTurn, 1000);
    }, 500);
  }
  return htmlTable;
}

const ships = [
  {
    name: "Aircraft Carrier",
    length: 5,
  },
  {
    name: "Battleship",
    length: 4,
  },
  {
    name: "Destroyer",
    length: 4,
  },
  {
    name: "Submarine",
    length: 3,
  },
  {
    name: "Patrol Boat",
    length: 2,
  },
];

function renderShips(player, activeShip, htmlTable, direction) {
  const directionLabel = document.createElement("p");
  directionLabel.innerText = "Direction: ";
  directionLabel.classList.add("directionLabel");
  direction.innerText = "Left to right";
  direction.classList.add("direction");
  const div = document.createElement("div");
  div.classList.add("renderShipsDiv");
  const p = document.createElement("p");
  p.innerText = "Select which ship you would like to place";
  p.classList.add("selectionText");
  const shipsDiv = document.createElement("div");
  shipsDiv.classList.add("shipsToChooseDiv");
  const input = document.createElement("input");
  input.classList.add("shipLocationInput");
  input.type = "number";
  input.placeholder = "Tap or type starting square";
  input.disabled = true;
  const inputDiv = document.createElement("div");
  inputDiv.classList.add("inputDiv");
  const rotateBtn = document.createElement("button");
  rotateBtn.innerText = "Rotate ship";
  rotateBtn.classList.add("rotateBtn");
  rotateBtn.addEventListener("click", () => {
    if (direction.innerText === "Left to right")
      direction.innerText = "Top to bottom";
    else direction.innerText = "Left to right";
  });
  direction.classList.add("direction");
  const shipBtnDivs = [];
  for (let i = 0; i < 5; i++) {
    const shipBtn = document.createElement("div");
    shipBtnDivs.push(shipBtn);
    shipBtn.innerText = ships[i].name;
    shipBtn.classList.add("shipBtn");
    shipsDiv.appendChild(shipBtn);
    shipBtn.addEventListener("click", () => {
      console.log(`setting active ship to ${ships[i].name}`);
      activeShip.innerText = ships[i].name;
      input.disabled = false;
      input.style.border = "2px solid #00B4EA";
      shipBtnDivs.forEach((btn) => (btn.style.border = "2px solid white"));
      shipBtn.style.border = "2px solid #00B4EA";
      rotateBtn.style.border = "2px solid #00B4EA";
    });
  }
  input.addEventListener("keyup", (e) => {
    if (
      e.target.value.toString().length < 2 ||
      e.target.value.toString().length > 2 ||
      e.target.value < 0 ||
      e.target.value > 99 ||
      e.target.value.toString().includes("-") ||
      e.target.value.toString().includes(".")
    )
      return;
    console.log(e.target.value);
    console.log(activeShip);
    const row = Number(e.target.value.toString()[0]);
    const column = Number(e.target.value.toString()[1]);
    const shipData = ships.find((ship) => ship.name === activeShip);
    console.table(row, column, shipData);
    if (direction === "horizontal") {
      for (let i = 0; i < shipData.length; i++) {
        htmlTable[row][column + i].innerText = "0";
      }
    }
  });
  div.appendChild(p);
  div.appendChild(shipsDiv);
  // inputDiv.appendChild(input);
  inputDiv.appendChild(rotateBtn);
  inputDiv.appendChild(directionLabel);
  inputDiv.appendChild(direction);
  div.appendChild(inputDiv);
  return div;
}

function renderPregameBoard(container, player, nextFunc) {
  const direction = document.createElement("p");
  const htmlTable = [];
  let activeShip = document.createElement("p");
  activeShip.style.display = "none";
  container.appendChild(activeShip);
  const table = document.createElement("table");
  for (let i = 0; i < player.board.board.length; i++) {
    const row = document.createElement("tr");
    htmlTable[i] = new Array(player.board.board[i].length);
    for (let j = 0; j < player.board.board[i].length; j++) {
      const tableData = document.createElement("td");
      let displayText = player.board.board[i][j] || `${i}${j}`;
      tableData.innerText = displayText;
      htmlTable[i][j] = tableData;
      tableData.addEventListener("mouseover", () => {
        if (activeShip.innerText === "") return;
        const length =
          ships.find((ship) => ship.name === activeShip.innerText).length || 0;
        // console.log(`mousing over for ${activeShip.innerText}`);
        if (direction.innerText === "Left to right") {
          if (j + length > 10) {
            htmlTable[i][j].classList.add("invalid");
            return;
          }
          if (
            !checkIfSpacesAreClear(i, j, direction.innerText, length, player)
          ) {
            htmlTable[i][j].classList.add("invalid");
            return;
          }
          htmlTable[i][j].classList.add("valid");
          for (let k = j; k < j + length; k++) {
            htmlTable[i][k].classList.add("shipPlacementMouseOver");
          }
        } else if (direction.innerText === "Top to bottom") {
          if (i + length > 10) {
            htmlTable[i][j].classList.add("invalid");
            return;
          }
          if (
            !checkIfSpacesAreClear(i, j, direction.innerText, length, player)
          ) {
            htmlTable[i][j].classList.add("invalid");
            return;
          }
          htmlTable[i][j].classList.add("valid");
          for (let k = i; k < i + length; k++) {
            htmlTable[k][j].classList.add("shipPlacementMouseOver");
          }
        }
      });
      tableData.addEventListener("mouseleave", () => {
        if (activeShip.innerText === "") return;
        const length =
          ships.find((ship) => ship.name === activeShip.innerText).length || 0;
        // console.log(`mousing leave for ${activeShip.innerText}`);
        htmlTable[i][j].classList.remove("invalid");
        htmlTable[i][j].classList.remove("valid");
        if (direction.innerText === "Left to right") {
          if (j + length > 10) {
            return;
          }
          for (let k = j; k < j + length; k++) {
            htmlTable[i][k].classList.remove("shipPlacementMouseOver");
          }
        } else if (direction.innerText === "Top to bottom") {
          if (i + length > 10) {
            return;
          }
          for (let k = i; k < i + length; k++) {
            htmlTable[k][j].classList.remove("shipPlacementMouseOver");
          }
        }
      });
      tableData.addEventListener("mouseup", () => {
        console.log(`selected coordinate (${i}, ${j})`);
        if (!activeShip.innerText) return;
        const length =
          ships.find((ship) => ship.name === activeShip.innerText).length || 0;
        if (direction.innerText === "Left to right") {
          if (j + length > 10) return;
          if (!checkIfSpacesAreClear(i, j, direction.innerText, length, player))
            return;
          let shipAlreadyPlaced = false;
          console.log(player.board.ships);
          if (player.board.ships && player.board.ships[activeShip.innerText])
            shipAlreadyPlaced = true;
          if (shipAlreadyPlaced) return;
          player.board.placeShip(i, j, i, j + length - 1, activeShip.innerText);
          for (let k = j; k < j + length; k++) {
            htmlTable[i][k].classList.add("shipPlacement");
            htmlTable[i][k].innerText = activeShip.innerText.charAt(0);
          }
        }
        if (direction.innerText === "Top to bottom") {
          if (i + length > 10) return;
          if (!checkIfSpacesAreClear(i, j, direction.innerText, length, player))
            return;
          player.board.placeShip(i, j, i + length - 1, j, activeShip.innerText);
          for (let k = i; k < i + length; k++) {
            htmlTable[k][j].classList.add("shipPlacement");
            htmlTable[i][k].innerText = activeShip.innerText.charAt(0);
          }
        }
        if (Object.keys(player.board.ships).length === 5) {
          console.log("all ships have been placed");
          container.innerHTML = "";
          nextFunc();
        }
      });
      row.appendChild(tableData);
    }
    table.appendChild(row);
  }
  container.appendChild(renderShips(player, activeShip, htmlTable, direction));
  container.appendChild(table);
  return htmlTable;
}

function checkIfSpacesAreClear(startRow, startCol, direction, length, player) {
  const board = player.board.board;
  console.log(board);
  if (direction === "Left to right") {
    for (let i = startCol; i < startCol + length; i++) {
      if (board[startRow] && board[startRow][i]) return false;
    }
    return true;
  }
  if (direction === "Top to bottom") {
    for (let i = startRow; i < startRow + length; i++) {
      if (board[startRow] && board[i][startCol]) return false;
    }
    return true;
  }
}

module.exports = {
  createTemplateGame,
  renderGameBoard,
  renderPregameBoard,
  populateWithPredeterminedCoordinates,
};
