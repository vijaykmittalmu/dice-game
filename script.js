'use strict';

// elements
const player0El = document.querySelector('.player--0');
const score0El = document.querySelector('#score--0');
const current0El = document.querySelector('#current--0');

const player1El = document.querySelector('.player--1');
const score1El = document.querySelector('#score--1');
const current1El = document.querySelector('#current--1');

const dice = document.querySelector('.dice');
const newGameBtn = document.querySelector('.btn--new');
const rollDiceBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');

let currentscore = 0;
let playing = true;
let activePlayer = 0;
let holdScore = 0;

const switchPlayer = function () {
  dice.setAttribute('src', `dice-1.png`);
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--active');
  currentscore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');
};

const rollDiceHandler = function () {
  let randomDice = Math.trunc(Math.random() * 6) + 1;
  if (playing) {
    dice.classList.remove('hidden');
    if (randomDice !== 1) {
      dice.setAttribute('src', `dice-${randomDice}.png`);
      currentscore += randomDice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentscore;
    } else {
      switchPlayer();
    }
  }
};

const holdScoreHandler = function () {
  let latestHoldScore = 0;
  let activePlayerElement = document.getElementById(`score--${activePlayer}`);
  latestHoldScore = Number(activePlayerElement.textContent);
  activePlayerElement.textContent = latestHoldScore + currentscore;

  if (activePlayerElement.textContent >= 100) {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');

    rollDiceBtn.setAttribute('disabled', true);
    rollDiceBtn.classList.add('disableButton');
    holdBtn.setAttribute('disabled', true);
    holdBtn.classList.add('disableButton');
    dice.classList.add('hidden');
  }
  switchPlayer();
};

function init() {
  dice.classList.add('hidden');
  currentscore = 0;
  activePlayer = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  if (player0El.classList.contains('player--winner')) {
    player0El.classList.remove('player--winner');
  }
  if (player1El.classList.contains('player--winner')) {
    player1El.classList.remove('player--winner');
  }
  if (player1El.classList.contains('player--active')) {
    player1El.classList.remove('player--active');
  }
  player0El.classList.add('player--active');
  rollDiceBtn.removeAttribute('disabled');
  rollDiceBtn.classList.remove('disableButton');
  holdBtn.removeAttribute('disabled');
  holdBtn.classList.remove('disableButton');
}

// event listener
rollDiceBtn.addEventListener('click', rollDiceHandler);
holdBtn.addEventListener('click', holdScoreHandler);
newGameBtn.addEventListener('click', init);

init();
