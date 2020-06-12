let SIMON_COLORS = [
  'red',
  'green',
  'blue',
  'yellow',
];

let SIMON_STATES = {
  FRESH: 'fresh',
  PLAYING_CHALLENGE: 'playing_challenge',
  READY: 'ready',
  FINISHED: 'finished',
};

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
