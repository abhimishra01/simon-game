const tiles = ['red', 'green', 'blue', 'yellow'];
const gameSequence = [];
let playerSequence = [];
let gameStarted = false;
let score = 0;

const sounds = {
  red: new Audio('../assets/red.mp3'),
  green: new Audio('../assets/green.mp3'),
  blue: new Audio('../assets/blue.mp3'),
  yellow: new Audio('../assets/yellow.mp3'),
  over: new Audio('../assets/gameover.mp3'),
};
const startBtn = document.getElementById('startBtn');
const scoreDisplay = document.getElementById('scoreDisplay');
const gameTiles = document.querySelectorAll('.tile');
const modal = document.getElementById('gameOverModal');
const finalScore = document.getElementById('finalScore');
const playAgainBtn = document.getElementById('playAgainBtn');

modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
    startBtn.disabled = false;
    startBtn.textContent = 'Start Game';
  }
});

startBtn.addEventListener('click', startGame);
playAgainBtn.addEventListener('click', () => {
  modal.style.display = 'none';
  startGame();
});

gameTiles.forEach((tile) => {
  tile.addEventListener('click', () => {
    if (gameStarted) {
      const color = tile.getAttribute('data-tile');
      playTile(color);
      checkPlayerInput(color);
    }
  });
});

function startGame() {
  gameSequence.length = 0;
  playerSequence.length = 0;
  score = 0;
  gameStarted = true;
  scoreDisplay.textContent = score;
  startBtn.textContent = 'Game In Progress';
  startBtn.disabled = true;
  nextRound();
}

function nextRound() {
  const randomTile = tiles[Math.floor(Math.random() * tiles.length)];
  gameSequence.push(randomTile);

  setTimeout(() => {
    playTile(randomTile);
  }, 1000);
}

function playTile(color) {
  const tile = document.querySelector(`[data-tile="${color}"]`);
  tile.classList.add('highlight');
  playSound(color);

  setTimeout(() => {
    tile.classList.remove('highlight');
  }, 300);
}

function playSound(color) {
  sounds[color].currentTime = 0;
  sounds[color]
    .play()
    .catch((error) => console.log('Audio play failed:', error));
}

function checkPlayerInput(color) {
  playerSequence.push(color);
  const currentIndex = playerSequence.length - 1;

  if (playerSequence[currentIndex] !== gameSequence[currentIndex]) {
    endGame();
    return;
  }

  if (playerSequence.length === gameSequence.length) {
    score++;
    scoreDisplay.textContent = score;
    playerSequence = [];
    setTimeout(nextRound, 1000);
  }
}

function endGame() {
  playSound('over');
  gameStarted = false;
  startBtn.disabled = false;
  startBtn.textContent = 'Start Game';
  finalScore.textContent = score;
  modal.style.display = 'flex';
}
