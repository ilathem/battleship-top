const { createTemplateGame, renderGameBoard } = require("./driver.js");
import './index.css';
const {player1, player2} = createTemplateGame();
const body = document.querySelector('body');
const boardDiv = document.createElement('div');
const msg = document.createElement('p');
msg.classList.add('message');
msg.innerText = 'Player 1 Turn';
boardDiv.classList.add('boardDiv');
body.appendChild(msg);
body.appendChild(boardDiv);
const player1Table = renderGameBoard(boardDiv, player1);
