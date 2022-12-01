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
const tonicElement = document.getElementById('tonic');
const unknownElement = document.getElementById('unknown');

var tonic = 0;
var unknown = 0;
var isTonicFlat = false;
var isUnknownFlat = true;

function createChallenge() {
	// TODO: Make random
	tonic = 2;
	unknown = 1;
	isTonicFlat = true;
	isUnknownFlat = false;

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

	console.log(`CHECK: ${step} vs ${expectedStep}`);
	console.log(`CHECK: ${distance} vs ${expectedDistance}`);
	if (step != expectedStep || distance != expectedDistance) {
		// TODO: Show failure
		console.warn('Incorrect');
	} else {
		// TODO: Show success
		console.log('Correct!');
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

document.getElementById('guess').addEventListener('submit', (e) => {
	e.preventDefault();
	checkGuess();
});

createChallenge();

})();
