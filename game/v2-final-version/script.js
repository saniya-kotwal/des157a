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

	// Audio elements
	const simpleOink = document.querySelector('#simple-oink');
	const mediumOink = document.querySelector('#medium-oink');
	const badOink = document.querySelector('#bad-oink');

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

		// Add initial event listeners for new game
		newGameButton.addEventListener('click', resetGame);
		
		// Make buttons inactive
		removeGameButtonListeners();
	}

	// Add game button event listeners
	function addGameButtonListeners() {
		standButton.addEventListener('click', standAction);
		hitButton.addEventListener('click', hitAction);
	}

	// Remove game button event listeners
	function removeGameButtonListeners() {
		standButton.removeEventListener('click', standAction);
		hitButton.removeEventListener('click', hitAction);
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
		mediumOink.play();
		resetPlayerCards(gameData.currentPlayer);

		// Switch to other player
		gameData.currentPlayer = gameData.currentPlayer === 0 ? 1 : 0;
		updateTurnIndicator();
	}

	// Hit button
	function hitAction() {
		removeGameButtonListeners();
		drawCards();
		updateScoreDisplay();
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

	// Reset cards to back
	function resetPlayerCards(playerIndex) {
		const playerElement = document.querySelector(`#player${playerIndex + 1}`);
		const cardContainers = playerElement.querySelectorAll('.card-container');
		const frontCards = playerElement.querySelectorAll('.card-front');
		
		// Remove flip 
		cardContainers.forEach(container => {
			container.classList.remove('flip');
		});
		
		frontCards.forEach(card => {
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
		const card1Container = playerElement.querySelector('.card1 .card-container');
		const card2Container = playerElement.querySelector('.card2 .card-container');
		const card1Front = playerElement.querySelector('.card1 .card-front');
		const card2Front = playerElement.querySelector('.card2 .card-front');

		// Draw two different cards
		const newCard1 = getRandomCard();
		let newCard2;
		do {
			newCard2 = getRandomCard();
		} while (newCard2.image === newCard1.image);

		// Update card images
		card1Front.src = `images/${newCard1.image}`;
		card2Front.src = `images/${newCard2.image}`;

		// Reset and trigger flip animation
		card1Container.style.transition = 'none';
		card2Container.style.transition = 'none';
		card1Container.style.transform = 'rotateY(0deg)';
		card2Container.style.transform = 'rotateY(0deg)';
		card1Container.classList.remove('flip');
		card2Container.classList.remove('flip');
		
		setTimeout(() => {
			card1Container.style.transition = 'transform 0.6s';
			card2Container.style.transition = 'transform 0.6s';
			card1Container.style.transform = '';
			card2Container.style.transform = '';
			card1Container.classList.add('flip');
			card2Container.classList.add('flip');
		}, 50);

		// Store values and calculate sum
		gameData.card1Value = newCard1.value;
		gameData.card2Value = newCard2.value;
		gameData.cardSum = newCard1.value + newCard2.value;

		console.log(`Player drew: ${gameData.card1Value} and ${gameData.card2Value}, sum: ${gameData.cardSum}`);

		// Handle two Aces (like snake eyes)
		if (gameData.card1Value === 1 && gameData.card2Value === 1) {
			console.log('You drew two Aces. Score resets to 0. Next player\'s turn.');
			badOink.play();
			turnIndicator.textContent = `${gameData.players[gameData.currentPlayer]} drew two Aces! SCORE RESET! TURN OVER!`;
			gameData.score[gameData.currentPlayer] = 0;
			
			setTimeout(() => {
				resetPlayerCards(gameData.currentPlayer);
				gameData.currentPlayer = gameData.currentPlayer === 0 ? 1 : 0;
				updateTurnIndicator();
				addGameButtonListeners();
			}, 1500);
			return;
		}

		// Add current draw to score
		gameData.score[gameData.currentPlayer] += gameData.cardSum;

		// Handle single Ace (like rolling a 1)
		if (gameData.card1Value === 1 || gameData.card2Value === 1) {
			console.log('You drew an Ace. Next player\'s turn.');
			mediumOink.play();
			turnIndicator.textContent = `${gameData.players[gameData.currentPlayer]} drew an Ace! TURN OVER!`;
			
			setTimeout(() => {
				resetPlayerCards(gameData.currentPlayer);
				gameData.currentPlayer = gameData.currentPlayer === 0 ? 1 : 0;
				updateTurnIndicator();
				addGameButtonListeners();
			}, 1500);
			return;
		}

		simpleOink.play();
		addGameButtonListeners();
	}

	// Check if player has won
	function checkWinningCondition() {
		if (gameData.score[gameData.currentPlayer] >= gameData.gameEnd) {
			badOink.play();
			removeGameButtonListeners();
			
			// Display winner overlay
			winnerText.textContent = `${gameData.players[gameData.currentPlayer]} wins with ${gameData.score[gameData.currentPlayer]} points!`;
			winnerOverlay.classList.remove('hidden');
		}
	}

	// Reset game
	function resetGame() {
		mediumOink.play();
		gameData.score = [0, 0];
		resetPlayerCards(0);
		resetPlayerCards(1);
		addGameButtonListeners();
		winnerOverlay.classList.add('hidden');
		updateScoreDisplay();
		gameData.currentPlayer = Math.round(Math.random());
		updateTurnIndicator();
	}

	// Start button 
	function startAction() {
		mediumOink.play();
		overlay.classList.add('hidden');
		addGameButtonListeners();
	}

	// Start the game when page loads
	window.addEventListener('load', () => {
		initGame();
		startButton.addEventListener('click', startAction);
	});
})();