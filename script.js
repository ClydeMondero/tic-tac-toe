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

  const resetBoard = () => {
    for (let i = 0; i < board.length; i++) {
      board[i] = "";
    }
  };

  const isFull = () => {
    let full = true;
    board.forEach((cell) => {
      if (cell == "") {
        full = false;
      }
    });

    return full;
  };

  return { getBoard, addMarker, resetBoard, isFull };
})();

//* Player Factory
const Player = (name, marker) => {
  return { name, marker };
};

const gameController = (() => {
  const board = gameBoard.getBoard();
  const playerOne = Player("Player 1", "X");
  const playerTwo = Player("Players 2", "O");

  let activePlayer = playerOne;

  const resetActivePlayer = () => (activePlayer = playerOne);

  const getActivePlayer = () => activePlayer;

  const switchPlayer = () => {
    activePlayer = activePlayer === playerOne ? playerTwo : playerOne;
  };

  const checkWinner = () => {
    let winner = "";

    if (!gameBoard.isFull()) {
      //Vertically
      for (let cell = 0; cell < 3; cell++) {
        if (board[cell]) {
          if (
            board[cell] == board[cell + 3] &&
            board[cell] == board[cell + 6]
          ) {
            winner = board[cell];
          }
        }
      }

      //Horizontally
      for (let cell = 0; cell < 9; cell += 3) {
        if (board[cell]) {
          if (
            board[cell] == board[cell + 1] &&
            board[cell] == board[cell + 2]
          ) {
            winner = board[cell];
          }
        }
      }

      //Diagonally
      let cell = 0;
      if (board[cell]) {
        if (board[cell] == board[cell + 4] && board[cell] == board[cell + 8]) {
          winner = board[cell];
        }
      }
      cell = 2;
      if (board[cell]) {
        if (board[cell] == board[cell + 2] && board[cell] == board[cell + 4]) {
          winner = board[cell];
        }
      }
    }else{
        if(winner == ""){
            winner = "Draw";
        }
    }

    return winner;
  };

  const updateInformation = () => {
    let info = "";

    let winner = checkWinner();

    if (winner == "X") {
      info = "Player 1 wins!";
    } else if (winner == "O") {
      info = "Player 2 wins!";
    } else if (winner == "Draw") {
      info = "Draw!";
    } else {
      info = getActivePlayer().marker + "'s turn";
    }

    return info;
  };

  const playRound = (player, index) => {
    gameBoard.addMarker(player.marker, index);

    switchPlayer();
  };

  return { getActivePlayer, playRound, updateInformation, resetActivePlayer };
})();

//* DisplayController Module
const displayController = (() => {
  const cells = document.querySelectorAll(".cell");
  const board = gameBoard.getBoard();
  const info = document.querySelector(".information");

  const updateDisplay = () => {
    cells.forEach((cell) => {
      cell.style.pointerEvents = "auto";
    });

    cells.forEach((cell, index) => {
      if (board[index] == "X") {
        cell.style.color = "blue";
      } else if (board[index] == "O") {
        cell.style.color = "red";
      }

      cell.textContent = board[index];
    });

    setTimeout(() => {
      if (info.textContent[0] == "X") {
        info.style.color = "blue";
      } else if (info.textContent[0] == "O") {
        info.style.color = "red";
      } else {
        info.style.color = "black";

        cells.forEach((cell) => {
          cell.style.pointerEvents = "none";
        });

        setTimeout(resetGame, 3000);
      }
    }, 0);

    info.textContent = gameController.updateInformation();
  };

  const cellClickHandler = () => {
    cells.forEach((cell, index) => {
      cell.addEventListener("click", () => {
        if (cell.textContent == "") {
          gameController.playRound(gameController.getActivePlayer(), index);

          updateDisplay();
        }
      });
    });
  };

  const resetGame = () => {
    gameController.resetActivePlayer();
    gameBoard.resetBoard();
    updateDisplay();
  };

  const resetBtn = document.querySelector(".reset");

  resetBtn.addEventListener("click", resetGame, { once: true });

  return { cellClickHandler };
})();

function game() {
  displayController.cellClickHandler();
}

game();
