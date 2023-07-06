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
  const board = gameBoard.getBoard();
  const playerOne = Player("Clyde", "X");
  const playerTwo = Player("Computer", "O");

  let activePlayer = playerOne;

  const getActivePlayer = () => activePlayer;

  const switchPlayer = () => {
    activePlayer = activePlayer === playerOne ? playerTwo : playerOne;
  };

  const checkWinner = () => {
    let winner = false;
    //Vertically
    for (let cell = 0; cell < 3; cell++) {
      if (board[cell]) {
        if (board[cell] == board[cell + 3] && board[cell] == board[cell + 6]) {
          winner = true;
          console.log(getActivePlayer().name + " wins!");
        }
      }
    }

    //Horizontally
    for (let cell = 0; cell < 9; cell += 3) {
      if (board[cell]) {
        if (board[cell] == board[cell + 1] && board[cell] == board[cell + 2]) {
          winner = true;
          console.log(getActivePlayer().name + " wins!");
        }
      }
    }

    //Diagonally
    let cell = 0;
    if (board[cell]) {
      if (board[cell] == board[cell + 4] && board[cell] == board[cell + 8]) {
        winner = true;
        console.log(getActivePlayer().name + " wins!");
      }
    }
    cell = 2;
    if (board[cell]) {
      if (board[cell] == board[cell + 2] && board[cell] == board[cell + 4]) {
        winner = true;
        console.log(getActivePlayer().name + " wins!");
      }
    }
  };

  const playRound = (player, index) => {
    gameBoard.addMarker(player.marker, index);

    checkWinner();
    switchPlayer();
  };

  return { getActivePlayer, playRound };
})();

//* DisplayController Module
const displayController = (() => {
  const cells = document.querySelectorAll(".cell");
  const board = gameBoard.getBoard();

  const updateDisplay = () => {
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

          updateDisplay();
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

//TODO: Reset board if board is full and there is still no winner
//TODO: Display who's player's turn to mark
//TODO: Player can enter his/her name
//TODO: Display who wins
//TODO: AI Enemy`
