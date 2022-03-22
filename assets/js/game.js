// stores game status for later
const statusDisplay = document.querySelector(".game--status");
// declares some variables for ease of use later
// pauses game in case of win or draw
let gameActive = true;
// tracks whose turn it is
let currentPlayer = "X";
// initializes board
let gameState = ["", "", "", "", "", "", "", "", ""];
// messages
const winningMessage = () => `${currentPlayer} has won!`;
const drawMessage = () =>
  `Game ended in a draw! Everybody wins <i class="fa-solid fa-heart"></i>`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;
statusDisplay.innerHTML = currentPlayerTurn();

function handleCellPlayed(clickedCell, clickedCellIndex) {
  // updates internal game state and UI to reflect played move
  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.innerHTML = currentPlayer;
}

function handlePlayerChange() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusDisplay.innerHTML = currentPlayerTurn();
}

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleResultValidation() {
  let roundWon = false;
  for (let i = 0; i <= 7; i++) {
    // get one element from the hash to manipulate as a variable
    const winCondition = winningConditions[i];
    // initializes each posiition in the array as a variable to increment
    let a = gameState[winCondition[0]];
    let b = gameState[winCondition[1]];
    let c = gameState[winCondition[2]];
    // no results if there are empty cells, stays on the for loop
    if (a === "" || b === "" || c === "") {
      continue;
    }
    // wins
    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }
  if (roundWon) {
    statusDisplay.innerHTML = winningMessage();
    gameActive = false;
    return;
  }
  // check for draws : no winCondition met, no empty spaces left
  let roundDraw = !gameState.includes("");
  if (roundDraw) {
    statusDisplay.innerHTML = drawMessage();
    gameActive = false;
    return;
  }
  handlePlayerChange();
}

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

function handleRestartGame() {
  gameActive = true;
  currentPlayer = "X";
  gameState = ["", "", "", "", "", "", "", "", ""];
  statusDisplay.innerHTML = currentPlayerTurn();
  document.querySelectorAll(".cell").forEach((cell) => (cell.innerHTML = ""));
}
// add our event listeners to the actual game cells, as well as restart button
document
  .querySelectorAll(".cell")
  .forEach((cell) => cell.addEventListener("click", handleCellClick));
document
  .querySelector(".game--restart")
  .addEventListener("click", handleRestartGame);
