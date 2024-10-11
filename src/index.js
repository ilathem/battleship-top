const { createTemplateGame, renderGameBoard } = require("./driver.js");
import './index.css';
const {player1, player2} = createTemplateGame();
const body = document.querySelector('body');
const boardDiv = document.createElement('div');
const msg = document.createElement('p');
msg.classList.add('message');
let sampleArray = ['a', 'b', 'c']
let sampleIndex = 0;
msg.addEventListener('click', () => {
    sampleIndex = (sampleIndex + 1) % sampleArray.length;
    console.log(sampleIndex)
})
boardDiv.classList.add('boardDiv');
body.appendChild(msg);
body.appendChild(boardDiv);
const players = [player1, player2];
let currentPlayerIndex = -1;
function triggerNextTurn() {
    console.log('triggering turn')
    boardDiv.innerHTML = '';
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
    msg.innerText = `Player ${currentPlayerIndex + 1} Turn`;
    if (players[currentPlayerIndex].board.allSunk()) {
        showEndGameScreen();
    } else {
        console.log(`current player is ${currentPlayerIndex}`)
        renderGameBoard(boardDiv, players[currentPlayerIndex], triggerNextTurn, msg)
    }   
}
triggerNextTurn()