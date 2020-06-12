/*
Nouns:
  - The game
  - Buttons
  - Colors
  - Player(s)
  - Challenge
  - Move

Verbs:

- Player starts a game
- Player presses a button
- Player
- Game begins
- Game ends
*/

/*
Player hits start button

Game presents player with a challenge, consisting of a sequence
of colors.

Player attempts challenge by trying to press the appropriate colored buttons
in same order as presented.

If player makes a wrong move, the game is over.

If player presses every button in same order as challenge, game presents
player with new challenge that is identical to the previous challenge
but with one additional random color added.

Game continues until player makes a wrong move.

Once player loses, they're told the longest challenge they completed
and the game resets.
*/

/*
Main ideas:

- Game is in one of THREE states:

  1. FRESH (ready to play)
  2. RUNNING
  3. FINISHED

  Do we need both FRESH and FINISHED? We'll see.

- A game is a sequence of challenges
- A challenge is a sequence of steps
*/

let rs = require('readline-sync');

let SIMON_COLORS = [
  'red',
  'green',
  'blue',
  'yellow',
];

function newSimon() {
  return {
    state: 'fresh',
    challenge: [],
    step: 0,
  };
}

function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function simonIsFinished(simon) {
  return simon.state === 'finished';
}

function simonIsChallengeComplete(simon) {
  return simon.step === simon.challenge.length;
}

function simonIsMoveCorrect(simon, move) {
  return simon.challenge[simon.step] === move;
}

function simonMakeMove(simon, move) {
  if (simonIsMoveCorrect(simon, move)) {
    simon.step += 1;

    if (simonIsChallengeComplete(simon)) {
      let newColor = getRandomElement(SIMON_COLORS);

      simon.step = 0;
      simon.challenge.push(newColor);
    }
  } else {
    simon.state = 'finished';
  }
}

function simonStart(simon) {
  simon.challenge = [getRandomElement(SIMON_COLORS)];
}

function simonIsChallengeFresh(simon) {
  return simon.step === 0;
}

function simonGetScore(simon) {
  return simon.challenge.length - 1;
}

let simon = newSimon();

// The player presses the 'Start' button
simonStart(simon);

while (!simonIsFinished(simon)) {
  if (simonIsChallengeFresh(simon)) {
    console.log(simon.challenge);
  }
  let playerMove = rs.question('Color? ');

  simonMakeMove(simon, playerMove);
}

let score = simonGetScore(simon);

console.log(`Bzzt! Your longest successful challenge was ${score}`);
