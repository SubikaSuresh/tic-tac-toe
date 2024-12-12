const playerSelection = document.querySelector('.player-selection');
const gameBoard = document.querySelector('.game-board');
const resultScreen = document.querySelector('.result-screen');
const playerTurn = document.querySelector('.player-turn');
const resultMessage = document.querySelector('.result-message');
const cells = document.querySelectorAll('.cell');
const restartButton = document.querySelector('.restart-button');

let currentPlayer = 'X';
let playerX = 'X';
let playerO = 'O';
let board = Array(9).fill('');

document.getElementById('player-x').addEventListener('click', () => startGame('X'));
document.getElementById('player-o').addEventListener('click', () => startGame('O'));

function startGame(startingPlayer) {
  currentPlayer = startingPlayer;
  playerX = startingPlayer;
  playerO = startingPlayer === 'X' ? 'O' : 'X';
  playerSelection.style.display = 'none';
  gameBoard.style.display = 'block';
  playerTurn.textContent = `${currentPlayer}'s Turn`;
}

cells.forEach((cell, index) => {
  cell.addEventListener('click', () => {
    if (board[index] === '') {
      board[index] = currentPlayer;
      cell.textContent = currentPlayer;
      cell.classList.add('taken');
      if (checkWinner()) {
        endGame(`${currentPlayer} wins! 🎉`);
      } else if (board.every(cell => cell !== '')) {
        endGame("It's a draw! 🤝");
      } else {
        currentPlayer = currentPlayer === playerX ? playerO : playerX;
        playerTurn.textContent = `${currentPlayer}'s Turn`;
      }
    }
  });
});

function checkWinner() {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]             
  ];

  return winningCombinations.some(combination => {
    const [a, b, c] = combination;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

function endGame(message) {
  resultMessage.textContent = message;
  gameBoard.style.display = 'none';
  resultScreen.style.display = 'block';
}


restartButton.addEventListener('click', () => {
  board.fill('');
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('taken');
  });
  resultScreen.style.display = 'none';
  gameBoard.style.display = 'block';
  currentPlayer = playerX;
  playerTurn.textContent = `${currentPlayer}'s Turn`;
});
