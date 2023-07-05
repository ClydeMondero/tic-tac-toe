/*
    TicTacToe
    1. A game board that has 3x3 grid
    2. Two players play their own turns 
    3. First to line up 3 cells wins (horizontally, vertically, diagonally)
*/

//* GameBoard Module
const gameBoard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];

  const getBoard = () => board; //returns the board array

  const addMarker = (marker, index) => (board[index] = marker); //adds the marker to the array

  return { getBoard, addMarker };
})();

//* Player Factory
const Player = (name, marker) => {
  return { name, marker };
};

const gameController = (() => {
  const playerOne = Player("Clyde", "X");
  const playerTwo = Player("Computer", "O");

  let activePlayer = playerOne;

  const getActivePlayer = () => activePlayer;

  const switchPlayer = () => {
    activePlayer = activePlayer === playerOne ? playerTwo : playerOne;
  };

  const playRound = (player, index) => {
    gameBoard.addMarker(player.marker, index);
    switchPlayer();
  };

  return { getActivePlayer, playRound };
})();

//* DisplayController Module
const displayController = (() => {
  const cells = document.querySelectorAll(".cell");
  const board = gameBoard.getBoard();

  const updateBoard = () => {
    cells.forEach((cell, index) => {
      cell.textContent = board[index];
    });
  };

  const clickHandler = () => {
    cells.forEach((cell, index) => {
      cell.addEventListener(
        "click",
        () => {
          gameController.playRound(gameController.getActivePlayer(), index);

          updateBoard();
        },
        { once: true }
      );
    });
  };

  return { clickHandler };
})();

function game() {
  displayController.clickHandler();
}

game();
