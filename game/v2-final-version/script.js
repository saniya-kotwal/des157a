(function () {
	'use strict';
	console.log('reading js');

	// Game data
	const gameData = {
		players: ['Small Blind', 'Big Blind'],
		score: [0, 0],
		card1Value: 0,
		card2Value: 0,
		cardSum: 0,
		currentPlayer: 0,
		gameEnd: 30
	};

	// Card data
	const cards = [
		'blue_A', 'blue_2', 'blue_3', 'blue_4', 'blue_5',
		'red_A', 'red_2', 'red_3', 'red_4', 'red_5', 'red_6'
	];

	// DOM elements
	const player1Points = document.querySelector('#player1 .points');
	const player2Points = document.querySelector('#player2 .points');
	const turnIndicator = document.querySelector('#turn');
	const standButton = document.querySelector('#stand');
	const hitButton = document.querySelector('#hit');
	const overlay = document.querySelector('#overlay');
	const startButton = document.querySelector('#startGame');
	const winnerOverlay = document.querySelector('#winnerOverlay');
	const winnerText = document.querySelector('#winnerText');
	const newGameButton = document.querySelector('#newGame');

	// Initialize game
	function initGame() {
		// Set initial scores
		player1Points.textContent = gameData.score[0];
		player2Points.textContent = gameData.score[1];

		// Reset all cards to back
		resetPlayerCards(0);
		resetPlayerCards(1);

		// Randomly decide who goes first
		gameData.currentPlayer = Math.round(Math.random());

		// Update turn indicator
		updateTurnIndicator();

		// Buttons
		standButton.addEventListener('click', standAction);
		hitButton.addEventListener('click', hitAction);
		newGameButton.addEventListener('click', resetGame);

		// Initially disable game buttons until start
		hitButton.disabled = true;
		standButton.disabled = true;
	}

	// Update turn  
	function updateTurnIndicator() {
		turnIndicator.textContent = `${gameData.players[gameData.currentPlayer]}'s Turn`;
	}

	// Update player scores 
	function updateScoreDisplay() {
		player1Points.textContent = gameData.score[0];
		player2Points.textContent = gameData.score[1];
	}

	// Stand button 
	function standAction() {
		// Reset current player's cards to back
		resetPlayerCards(gameData.currentPlayer);

		// Switch to other player
		gameData.currentPlayer = gameData.currentPlayer === 0 ? 1 : 0;
		updateTurnIndicator();
	}

	// Hit button
	function hitAction() {
		// Draw cards and determine outcome
		drawCards();

		// Update display with new score
		updateScoreDisplay();

		// Check for winning condition
		checkWinningCondition();
	}

	// Get card value
	function getCardValue(cardName) {
		const value = cardName.split('_')[1];
		return value === 'A' ? 1 : parseInt(value);
	}

	// Get random card
	function getRandomCard() {
		const randomIndex = Math.floor(Math.random() * cards.length);
		const cardName = cards[randomIndex];
		return {
			image: `${cardName}.png`,
			value: getCardValue(cardName)
		};
	}

	// Reset cards to back for a specific player
	function resetPlayerCards(playerIndex) {
		const playerElement = document.querySelector(`#player${playerIndex + 1}`);
		const cards = playerElement.querySelectorAll('.cards img');
		cards.forEach(card => {
			card.src = 'images/back.png';
		});
	}

	// Draw cards and determine outcome 
	function drawCards() {
		// Reset other player's cards
		const otherPlayer = gameData.currentPlayer === 0 ? 1 : 0;
		resetPlayerCards(otherPlayer);

		// Get player's card elements
		const playerElement = document.querySelector(`#player${gameData.currentPlayer + 1}`);
		const card1 = playerElement.querySelector('.card1 img');
		const card2 = playerElement.querySelector('.card2 img');

		// Draw two different cards
		const newCard1 = getRandomCard();
		let newCard2;
		do {
			newCard2 = getRandomCard();
		} while (newCard2.image === newCard1.image);

		// Update card images
		card1.src = `images/${newCard1.image}`;
		card2.src = `images/${newCard2.image}`;

		// Store values and calculate sum
		gameData.card1Value = newCard1.value;
		gameData.card2Value = newCard2.value;
		gameData.cardSum = newCard1.value + newCard2.value;

		console.log(`Player drew: ${gameData.card1Value} and ${gameData.card2Value}, sum: ${gameData.cardSum}`);

		// Handle two Aces (like snake eyes)
		if (gameData.card1Value === 1 && gameData.card2Value === 1) {
			console.log('Drew two Aces! Score reset to 0');
			gameData.score[gameData.currentPlayer] = 0;
			setTimeout(() => {
				resetPlayerCards(gameData.currentPlayer);
				gameData.currentPlayer = gameData.currentPlayer === 0 ? 1 : 0;
				updateTurnIndicator();
			}, 1500);
			return;
		}

		// Add current draw to score
		gameData.score[gameData.currentPlayer] += gameData.cardSum;

		// Handle single Ace (like rolling a 1)
		if (gameData.card1Value === 1 || gameData.card2Value === 1) {
			console.log('Drew an Ace! Turn switches to other player');
			setTimeout(() => {
				resetPlayerCards(gameData.currentPlayer);
				gameData.currentPlayer = gameData.currentPlayer === 0 ? 1 : 0;
				updateTurnIndicator();
			}, 1500);
			return;
		}
	}

	// Check if player has won
	function checkWinningCondition() {
		if (gameData.score[gameData.currentPlayer] >= gameData.gameEnd) {
			// Display winner overlay
			winnerText.textContent = `${gameData.players[gameData.currentPlayer]} wins with ${gameData.score[gameData.currentPlayer]} points!`;
			winnerOverlay.style.display = 'flex';

			// Disable buttons
			hitButton.disabled = true;
			standButton.disabled = true;
		}
	}

	// Reset game
	function resetGame() {
		// Reset scores
		gameData.score = [0, 0];

		// Reset all cards to back
		resetPlayerCards(0);
		resetPlayerCards(1);

		// Enable buttons
		hitButton.disabled = false;
		standButton.disabled = false;

		// Hide winner overlay
		winnerOverlay.style.display = 'none';

		// Reset display
		updateScoreDisplay();

		// Randomly decide who goes first
		gameData.currentPlayer = Math.round(Math.random());
		updateTurnIndicator();
	}

	// Start button 
	function startAction() {
		overlay.style.display = 'none';
		hitButton.disabled = false;
		standButton.disabled = false;
	}

	// Start the game when page loads
	window.addEventListener('load', () => {
		initGame();
		startButton.addEventListener('click', startAction);
	});
})();