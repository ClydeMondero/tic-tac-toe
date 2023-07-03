/*
    TicTacToe
    1. A game board that has 3x3 grid
    2. Two players play their own turns 
    3. First to line up 3 cells wins (horizontally, vertically, diagonally)
*/

//* GameBoard module
const gameBoard = (() => {
  let board = [
    ["X", "X", "O"],
    ["O", "O", "X"],
    ["X", "O", "X"],
  ];

  //* Displays the cells of the array to the DOM
  const displayBoard = () => {
    const boardContainer = document.querySelector(".gameboard-container");

    for (let row of board) {
      for (let column of row) {
        const cell = document.createElement("div");
        cell.textContent = column;

        boardContainer.appendChild(cell);
      }
    }
  };

  return { displayBoard };
})();

//* Controls the display of `UI
const displayController = (() => {
  gameBoard.displayBoard();
})();

displayController();
