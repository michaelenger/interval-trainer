'use strict';

(function () {

const LETTERS = [
	'A', 'B', 'C', 'D', 'E', 'F', 'G'
];

const guessStepElement = document.getElementById('guess-step');
const guessVariationElement = document.getElementById('guess-variation');
const tonicElement = document.getElementById('tonic');
const unknownElement = document.getElementById('unknown');

function createChallenge() {
	// TODO: Make random
	const tonic = 2;
	const unknown = 5;
	const isTonicFlat = false;
	const isUnknownFlat = true;

	tonicElement.innerHTML = LETTERS[tonic] + (isTonicFlat ? '&flat;' : '');
	unknownElement.innerHTML = LETTERS[unknown] + (isUnknownFlat ? '&flat;' : '');
}

function checkGuess() {
	const step = guessStepElement.value;
	const variation = guessVariationElement.value;

	console.log(`CHECK: ${variation} ${step}`);

	guessStepElement.value = '';
	guessVariationElement.value = '';
}

document.getElementById('guess').addEventListener('submit', (e) => {
	e.preventDefault();
	checkGuess();
});

createChallenge();

})();
