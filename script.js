'use strict';

//Selecting Elements
const finalScore0El = document.querySelector('#score--0');
const finalSore1El = document.querySelector('#score--1');
let currentScore0El = document.querySelector('#current--0');
let currentScore1El = document.querySelector('#current--1');

const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

// Declared this initial vars so we can reassign them anywhere
let currentScore, activePlayer, playing, scores;

// Initial state Function
const init = function () {
  currentScore = 0;

  // To switch player function
  activePlayer = 0;

  // To make a finish game function
  playing = true;

  // To store the final scores after hold
  scores = [0, 0];

  // Hide the dice until start playing
  diceEl.classList.add('hidden');

  document.querySelector('#score--0').textContent = 0;
  document.querySelector('#score--1').textContent = 0;
  document.querySelector('#current--0').textContent = 0;
  document.querySelector('#current--1').textContent = 0;
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
};

init();

// Swith Player Function
const switchPlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Finish Game Function
const finishGame = function () {
  playing = false;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--winner');
};

// ROLL BUTTON CONDITIONS
btnRoll.addEventListener('click', function () {
  if (playing) {
    let random = Math.trunc(Math.random() * 6) + 1;

    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${random}.png`;

    // checking if active player did not get 1 to continue plating or else switch the player
    if (random != 1) {
      currentScore += random;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;

      // checking the active player rolled a number > 100 to finish the game
      if (currentScore >= 10 || currentScore + scores[activePlayer >= 10]) {
        scores[activePlayer] += currentScore;
        document.querySelector(`#score--${activePlayer}`).textContent =
          scores[activePlayer];
        finishGame();
        diceEl.classList.add('hidden');
      }
    } else {
      switchPlayer();
    }
  }
});

// HOLD BUTTON CONDITIONS
btnHold.addEventListener('click', function () {
  // If the player still didn't hit 100 score then we keep playing and holding score and switch players
  // else we finish the game
  if (playing) {
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 10) {
      finishGame();
      diceEl.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
