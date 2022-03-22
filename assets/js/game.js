/*
We store our game status element here to allow us to more easily 
use it later on 
*/
const statusDisplay = document.querySelector(".game--status");
/*
Here we declare some variables that we will use to track the 
game state throught the game. 
*/
/*
We will use gameActive to pause the game in case of an end scenario
*/
let gameActive = true;
/*
We will store our current player here, so we know whos turn it is.
*/
let currentPlayer = "X";
/*
We will store our current game state here, the form of empty strings in an array
 will allow us to easily track played cells and validate the game state later on
*/
let gameState = ["", "", "", "", "", "", "", "", ""];
/*
Here we have declared some messages we will display to the user during the game.
Since we have some dynamic factors in those messages, namely the current player,
we have declared them as functions, so that the actual message gets created with 
current data every time we need it.
*/
const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;
/*
We set the inital message to let the players know whose turn it is
*/
statusDisplay.innerHTML = currentPlayerTurn();

function handleCellPlayed(clickedCell, clickedCellIndex) {
    // updates internal game state and UI to reflect played move
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

function handlePlayerChange() {}
function handleResultValidation() {}

function handleCellClick(clickedCellEvent) {
  // saves clicked html element in variable for easy use
  const clickedCell = clickedCellEvent.target;
  // selects data-cell-index from clicked cell to see where it is on the grid
  // save cell number with parseInt in new variable because getAttribute returns a string
  const clickedCellIndex = parseInt(
    clickedCell.getAttribute("data-cell-index")
  );
  // check if game is paused or cell has been filled already
  if (gameState[clickedCellIndex] != "" || !gameActive) {
    return;
  }
  // if conditions are met, game proceeds
  handleCellPlayed(clickedCell, clickedCellIndex);
  handleResultValidation();
}

function handleRestartGame() {}
// add our event listeners to the actual game cells, as well as restart button
document
  .querySelectorAll(".cell")
  .forEach((cell) => cell.addEventListener("click", handleCellClick));
document
  .querySelector(".game--restart")
  .addEventListener("click", handleRestartGame);
