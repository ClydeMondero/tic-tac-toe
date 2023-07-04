/*
    TicTacToe
    1. A game board that has 3x3 grid
    2. Two players play their own turns 
    3. First to line up 3 cells wins (horizontally, vertically, diagonally)
*/

//* GameBoard module
const gameBoard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];
  const cells = document.querySelectorAll(".cell");

  //* Inserts the player marker to the index of board
  const playerTurn = () => {
    cells.forEach((cell, index) => {
      cell.addEventListener(
        "click",
        () => {
          board[index] = "X";
          displayBoard();
        },
        { once: true }
      );
    });
  };

  //* Displays the cells of the array to the DOM
  const displayBoard = () => {
    cells.forEach((cell, index) => {
      cell.textContent = board[index];
    });
  };

  return { playerTurn };
})();

gameBoard.playerTurn();
