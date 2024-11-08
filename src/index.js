const {
  createTemplateGame,
  renderGameBoard,
  renderPregameBoard,
  populateWithPredeterminedCoordinates,
} = require("./driver.js");
import "./index.css";
const { player1, player2 } = createTemplateGame();
const body = document.querySelector("body");
const boardDiv = document.createElement("div");
const msg = document.createElement("p");
msg.classList.add("message");
boardDiv.classList.add("boardDiv");
body.appendChild(msg);
body.appendChild(boardDiv);
let isCpuGame = false;
const players = [player1, player2];
let currentPlayerIndex = 0;
let currentBoardIndex = 1;

function showEndGameScreen() {
  boardDiv.innerHTML = "";

  msg.innerText = `Player ${currentPlayerIndex + 1} Wins!\nReload to start a new game`;
}

function triggerNextTurn(firstTurn) {
  console.log(
    `calling triggerNextTurn from player ${currentPlayerIndex}, board ${currentBoardIndex}`,
  );
  console.log(players[currentBoardIndex].board.allSunk());
  if (players[currentBoardIndex].board.allSunk()) {
    console.log(
      `all ships sunk for board ${currentBoardIndex}, player ${currentPlayerIndex} should win`,
    );

    showEndGameScreen();
  } else {
    boardDiv.innerHTML = "";

    if (!firstTurn) {
      currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
      currentBoardIndex = (currentBoardIndex + 1) % players.length;
    }
    msg.innerText = `Player ${currentPlayerIndex + 1} Turn`;
    console.log(
      `triggering board for player ${currentPlayerIndex}, board ${currentBoardIndex}`,
    );
    renderGameBoard(
      boardDiv,
      players[currentBoardIndex],
      triggerNextTurn,
      msg,
      isCpuGame && currentPlayerIndex === 1,
    );
  }
}

function showTitleScreen() {
  msg.innerText = "Battleship";
  const selectionText = document.createElement("p");
  selectionText.classList.add("selectionText");
  selectionText.innerText = "Playing against player or computer?";
  const computerGameBtn = document.createElement("button");
  computerGameBtn.innerText = "Computer";
  computerGameBtn.classList.add("selectionBtn");
  computerGameBtn.addEventListener("mouseup", () => {
    startComputerPreGame();
  });
  const playerGameBtn = document.createElement("button");
  playerGameBtn.innerText = "Player";
  playerGameBtn.classList.add("selectionBtn");
  playerGameBtn.addEventListener("mouseup", () => {
    startPlayerPreGame();
  });
  boardDiv.appendChild(selectionText);
  boardDiv.appendChild(computerGameBtn);
  boardDiv.appendChild(playerGameBtn);
}

function startComputerPreGame() {
  isCpuGame = true;
  boardDiv.innerHTML = "";
  placePlayerShips();
}

function placePlayerShips() {
  msg.innerText = `Player, place your ships...`;
  renderPregameBoard(boardDiv, players[0], placeComputerShips);
}

function placeComputerShips() {
  boardDiv.innerHTML = "";
  populateWithPredeterminedCoordinates(players[1]);
  triggerNextTurn(true);
}

function startPlayerPreGame() {
  boardDiv.innerHTML = "";
  placePlayerOneShips();
}

function placePlayerOneShips() {
  msg.innerText = `Player 1, place your ships...`;
  renderPregameBoard(boardDiv, players[0], placePlayerTwoShips);
}

function placePlayerTwoShips() {
  msg.innerText = "Player 2, place your ships...";
  renderPregameBoard(boardDiv, players[1], () => triggerNextTurn(true));
}

showTitleScreen();
