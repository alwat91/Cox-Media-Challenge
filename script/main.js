// Basic organization based on an assignment in General Assembly's Web Development Immersive course

const GameEngine = {
  board: Array(9).fill(null),
  currentPlayer: "X",
  gameOver: false,
  resetGame: function() {
    this.board = Array(9).fill(null)
    this.currentPlayer = "X",
      this.gameOver = false;
  },
  toggleCurrentPlayer: function() {
    if (this.currentPlayer == "X") {
      this.currentPlayer = "O";
      this.aiMove();
    } else {
      this.currentPlayer = "X";
    }
  },
  isValidMove: function(position) {
    // A move is valid if the game is not over, the position is in the board, and the position is not occupied
    if (this.gameOver == false) {
      if (this.board.length > position) {
        if (this.board[position] == null) {
          return true;
        }
        return false;
      }
      return false;
    }
    return false;
  },
  checkForVictory: function() {
    // Check for column victory
    for (var i = 0; i < 3; i++) {
      if (this.currentPlayer == this.board[i] && this.currentPlayer == this.board[i + 3] && this.currentPlayer == this.board[i + 6]) {
        return true;
      }
    }
    // Check for row victory
    for (var i = 0; i < 3; i += 3) {
      if (this.currentPlayer == this.board[i] && this.currentPlayer == this.board[i + 1] && this.currentPlayer == this.board[i + 2]) {
        return true;
      }
    }
    // Check for diagonal victory
    if (this.currentPlayer == this.board[0] && this.currentPlayer == this.board[4] && this.currentPlayer == this.board[8]) {
      return true;
    }
    if (this.currentPlayer == this.board[2] && this.currentPlayer == this.board[4] && this.currentPlayer == this.board[6]) {
      return true;
    }
    return false;
  },
  makeMove: function(position) {
    if (this.isValidMove(position)) {
      this.board[position] = this.currentPlayer;
      if (this.checkForVictory()) {
        this.gameOver = true;
      } else {
        this.toggleCurrentPlayer();
      }
      return true;
    }
    ViewEngine.flashMessage("Invalid move, please try again.")
    return false;
  },
  aiMove: function() {
    console.log("Hello");
  }
};

const ViewEngine = {
  refreshBoardView: function(boardState) {
    var space = document.getElementById("board").firstElementChild;

    for (var i = 0; i < boardState.length; i++) {
      space.innerHTML = boardState[i];
      space = space.nextElementSibling;
    }

    var playerDisplay = document.getElementById("current-player");
    playerDisplay.innerHTML = GameEngine.currentPlayer
  },
  flashMessage: function(msg) {
    var messageBox = document.getElementById("message-box");
    messageBox.innerHTML = msg;
  },
  clearFlash: function() {
    var messageBox = document.getElementById("message-box");
    messageBox.innerHTML = "";
  }
};

const GameController = {
  onClickNewGame: function(event) {
    GameEngine.resetGame();
    ViewEngine.refreshBoardView(GameEngine.board)
    console.log("New game");
  },
  onClickBoardSpace: function(event) {
    var pos = event.path[0].getAttribute("data-position");
    var move = GameEngine.makeMove(pos);
    if (GameEngine.gameOver == true) {
      ViewEngine.flashMessage(`${GameEngine.currentPlayer} has won the game!`)
    }
    ViewEngine.refreshBoardView(GameEngine.board)
  }
};


window.onload = function() {
  // New game click listener
  var button = document.getElementById("new-game");
  button.onclick = GameController.onClickNewGame;
  // Click listeners for spaces
  var space = document.getElementById("board").firstElementChild;
  for (var i = 0; i < 9; i++) {
    space.onclick = GameController.onClickBoardSpace;
    space = space.nextElementSibling;
  }
}
