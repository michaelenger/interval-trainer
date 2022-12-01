"use strict";

(function() {

const LETTERS = [
	"A", "B", "C", "D", "E", "F", "G"
];

const tonicElement = document.getElementById("tonic");
const unknownElement = document.getElementById("unknown");

function makeGuess() {
	// TODO: Make random
	const tonic = 2;
	const unknown = 5;
	const isTonicFlat = false;
	const isUnknownFlat = true;

	tonicElement.innerHTML = LETTERS[tonic] + (isTonicFlat ? "&flat;" : "");
	unknownElement.innerHTML = LETTERS[unknown] + (isUnknownFlat ? "&flat;" : "");
}

makeGuess();

})();
