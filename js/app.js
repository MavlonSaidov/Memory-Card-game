const flippers = document.querySelectorAll(".flipper");
const flipContainers = document.querySelectorAll(".flip-container");

function shuffle() {
	flipContainers.forEach(flipContainer => {
		flipContainer.style.order = Math.floor(Math.random() * 16);
	})
}

window.addEventListener('DOMContentLoaded', shuffle);

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;


function flipCard() {
	if (lockBoard) return;
	if (this === firstCard) return;

	this.classList.add("flip");

	if (!hasFlippedCard) {
		//first click
		hasFlippedCard = true;
		firstCard = this;

		return;
	}

	//second click 
	secondCard = this;

	checkForMatch();

}

function checkForMatch() {
	let isMatch = firstCard.dataset.id === secondCard.dataset.id;
	isMatch ? disableCards() : unflipCards();
}

function disableCards() {
	firstCard.removeEventListener("click", flipCard);
	secondCard.removeEventListener("click", flipCard);
	resetBoard();
}

function unflipCards() {
	lockBoard = true;
	setTimeout(() => {
		firstCard.classList.remove("flip");
		secondCard.classList.remove("flip");

		resetBoard();

	}, 1500);
}

function resetBoard() {
	hasFlippedCard = false;
	lockBoard = false;
	firstCard = null;
	secondCard = null;
}

// (function shuffle() {
// 	flippers.forEach(flipper => {
// 		let randomPos = Math.ceil(Math.random() * 16);
// 		flipper.style.order = randomPos;
// 	});
// })();

flippers.forEach(flipper => flipper.addEventListener('click', flipCard));

