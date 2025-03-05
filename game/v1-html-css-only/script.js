(function(){
    'use strict';
    console.log('Pig Royale Game Initialized');

    // Game data
    const gameData = {
        players: ['Small Blind', 'Big Blind'],
        score: [0, 0],
        roll1: 0,
        roll2: 0,
        rollSum: 0,
        currentPlayer: 0,
        gameEnd: 100
    };

    // DOM elements
    const player1Points = document.querySelector('#player1 .points');
    const player2Points = document.querySelector('#player2 .points');
    const turnIndicator = document.querySelector('#turn');
    const standButton = document.querySelector('#stand');
    const hitButton = document.querySelector('#hit');

    // Initialize the game
    function initGame() {
        // Set initial scores
        player1Points.textContent = gameData.score[0];
        player2Points.textContent = gameData.score[1];
        
        // Randomly decide who goes first
        gameData.currentPlayer = Math.round(Math.random());
        
        // Update turn indicator
        updateTurnIndicator();
        
        // Add event listeners to buttons
        standButton.addEventListener('click', standAction);
        hitButton.addEventListener('click', hitAction);
    }

    // Update the turn indicator text
    function updateTurnIndicator() {
        turnIndicator.textContent = `${gameData.players[gameData.currentPlayer]}'s Turn`;
    }

    // Update player scores display
    function updateScoreDisplay() {
        player1Points.textContent = gameData.score[0];
        player2Points.textContent = gameData.score[1];
    }

    // Stand button action
    function standAction() {
        // Switch to other player
        gameData.currentPlayer = gameData.currentPlayer === 0 ? 1 : 0;
        updateTurnIndicator();
    }

    // Hit button action
    function hitAction() {
        // Roll the dice
        rollDice();
        
        // Update display with roll results
        updateScoreDisplay();
        
        // Check for winning condition
        checkWinningCondition();
    }

    // Roll the dice and determine outcome
    function rollDice() {
        // Generate random numbers for two dice
        gameData.roll1 = Math.floor(Math.random() * 6) + 1;
        gameData.roll2 = Math.floor(Math.random() * 6) + 1;
        gameData.rollSum = gameData.roll1 + gameData.roll2;
        
        console.log(`Player rolled: ${gameData.roll1} and ${gameData.roll2}, sum: ${gameData.rollSum}`);
        
        // Handle snake eyes (two 1's)
        if(gameData.roll1 === 1 && gameData.roll2 === 1) {
            console.log('Snake eyes! Player loses all points');
            gameData.score[gameData.currentPlayer] = 0;
            gameData.currentPlayer = gameData.currentPlayer === 0 ? 1 : 0;
            updateTurnIndicator();
            return;
        }
        
        // Handle rolling a single 1
        if(gameData.roll1 === 1 || gameData.roll2 === 1) {
            console.log('Rolled a 1! Turn switches to other player');
            gameData.currentPlayer = gameData.currentPlayer === 0 ? 1 : 0;
            updateTurnIndicator();
            return;
        }
        
        // If no 1's rolled, add to score
        gameData.score[gameData.currentPlayer] += gameData.rollSum;
    }

    // Check if a player has won
    function checkWinningCondition() {
        if(gameData.score[gameData.currentPlayer] >= gameData.gameEnd) {
            // Display winner
            turnIndicator.textContent = `${gameData.players[gameData.currentPlayer]} wins!`;
            
            // Disable buttons
            hitButton.disabled = true;
            standButton.disabled = true;
            
            // Add new game option
            const newGameBtn = document.createElement('button');
            newGameBtn.textContent = 'New Game';
            newGameBtn.addEventListener('click', resetGame);
            document.querySelector('#buttons').appendChild(newGameBtn);
        }
    }

    // Reset the game
    function resetGame() {
        // Reset scores
        gameData.score = [0, 0];
        
        // Enable buttons
        hitButton.disabled = false;
        standButton.disabled = false;
        
        // Remove new game button if it exists
        const newGameBtn = document.querySelector('#buttons button:nth-child(3)');
        if(newGameBtn) {
            newGameBtn.remove();
        }
        
        // Reset display
        updateScoreDisplay();
        
        // Randomly decide who goes first
        gameData.currentPlayer = Math.round(Math.random());
        updateTurnIndicator();
    }

    // Start the game when the page loads
    window.addEventListener('load', initGame);
})();