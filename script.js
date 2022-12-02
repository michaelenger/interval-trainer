'use strict';

(function () {

const NOTES = [
	'A', 'B', 'C', 'D', 'E', 'F', 'G'
];
const NOTE_DISTANCES = [
	2, 1, 2, 2, 1, 2, 2
];
const STEP_DISTANCES = {
	'dim2': 0,
	'min2': 1,
	'maj2': 2,
	'aug2': 3,

	'dim3': 2,
	'min3': 3,
	'maj3': 4,
	'aug3': 5,

	'dim4': 4,
	'perf4': 5,
	'aug4': 6,

	'dim5': 6,
	'perf5': 7,
	'aug5': 8,

	'dim6': 7,
	'min6': 8,
	'maj6': 9,
	'aug6': 10,

	'dim7': 9,
	'min7': 10,
	'maj7': 11,
	'aug7': 12,
};

const guessStepElement = document.getElementById('guess-step');
const guessVariationElement = document.getElementById('guess-variation');
const resultElement = document.getElementById('result');
const resultTextElement = document.getElementById('result-text');
const tonicElement = document.getElementById('tonic');
const unknownElement = document.getElementById('unknown');

var tonic = 0;
var unknown = 0;
var isTonicFlat = false;
var isUnknownFlat = true;

function createChallenge() {
	tonic = unknown = randomNumber(NOTES.length);
	while (tonic === unknown) {
		unknown = randomNumber(NOTES.length);
	}

	isTonicFlat = randomNumber(2) === 1;
	isUnknownFlat = randomNumber(2) === 1;

	tonicElement.innerHTML = NOTES[tonic] + (isTonicFlat ? '&flat;' : '');
	unknownElement.innerHTML = NOTES[unknown] + (isUnknownFlat ? '&flat;' : '');
}

function checkGuess() {
	const step = guessStepElement.value;
	const variation = guessVariationElement.value;

	if (step === '' || variation == '')
		return; // assume it was a mistake

	const expectedStep = unknown - tonic + 1 + (unknown < tonic ? NOTES.length : 0);

	const expectedDistance = determineNoteDistance(tonic, isTonicFlat, unknown, isUnknownFlat);
	const distance = determineStepDistance(step, variation);

	console.log(`STEP: ${step} vs ${expectedStep}`);
	console.log(`DISTANCE: ${distance} vs ${expectedDistance}`);

	if (step != expectedStep || distance != expectedDistance) {
		resultElement.classList.add('incorrect');
		resultTextElement.innerHTML = 'Incorrect';
	} else {
		resultElement.classList.add('correct');
		resultTextElement.innerHTML = 'Correct';
	}
}

function determineNoteDistance(first, isFirstFlat, second, isSecondFlat) {
	var distance = 0;

	if (isFirstFlat)
		distance += 1;

	while (first != second) {
		distance += NOTE_DISTANCES[first];
		first += 1;
		if (first === NOTES.length) {
			first = 0;
		}
	}

	if (isSecondFlat)
		distance -= 1;

	return distance;
}

function determineStepDistance(step, variation) {
	const key = `${variation}${step}`;

	if (key in STEP_DISTANCES)
		return STEP_DISTANCES[key];

	return -1;
}

function randomNumber(max) {
	return Math.floor(Math.random() * max);
}

function resetResult() {
	resultElement.classList.remove('correct');
	resultElement.classList.remove('incorrect');
	resultTextElement.innerHTML = '';
}

document.getElementById('guess-check').addEventListener('click', (e) => {
	e.preventDefault();
	resetResult();
	checkGuess();
});
document.getElementById('guess-next').addEventListener('click', (e) => {
	e.preventDefault();
	resetResult();
	createChallenge();
});

createChallenge();

})();
