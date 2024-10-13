const { createTemplateGame, renderGameBoard } = require("./driver.js");
import './index.css';
const { player1, player2 } = createTemplateGame();
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
let currentPlayerIndex = 0;
let currentBoardIndex = 1;

function showEndGameScreen() {
    boardDiv.innerHTML = '';

    msg.innerText = `Player ${currentPlayerIndex + 1} Wins!`
}

function triggerNextTurn(firstTurn) {
    console.log(`calling triggerNextTurn from player ${currentPlayerIndex}, board ${currentBoardIndex}`)
    console.log(players[currentBoardIndex].board.allSunk())
    if (players[currentBoardIndex].board.allSunk()) {
        console.log(`all ships sunk for board ${currentBoardIndex}, player ${currentPlayerIndex} should win`)

        showEndGameScreen();

    } else {
        boardDiv.innerHTML = '';

        if (!firstTurn) {
            currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
            currentBoardIndex = (currentBoardIndex + 1) % players.length;
        }

        msg.innerText = `Player ${currentPlayerIndex + 1} Turn`;

        console.log(`triggering board for player ${currentPlayerIndex}, board ${currentBoardIndex}`)
        renderGameBoard(boardDiv, players[currentBoardIndex], triggerNextTurn, msg)
    }

}
triggerNextTurn(true)