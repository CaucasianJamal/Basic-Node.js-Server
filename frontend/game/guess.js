// Retrieve range and other values from localStorage
const range = JSON.parse(localStorage.getItem('range')) || { min: 1, max: 10 };

// Generate a random secret number within the range
const secretNumber = Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;
let remainingGuesses = 10;
let totalGuesses = 0;
let guesses = []; // Array to store guess history

// DOM Elements
const rangeMessage = document.getElementById('rangeMessage');
const remainingGuessesElem = document.getElementById('remainingGuesses');
const feedback = document.getElementById('feedbackMessage');
const guessInput = document.getElementById('guessInput');
const guessButton = document.getElementById('guessButton');
const historyList = document.getElementById('historyList');

// Update the range message dynamically
rangeMessage.textContent = `Choose a number from ${range.min} to ${range.max}`;
remainingGuessesElem.textContent = `Remaining guesses: ${remainingGuesses}`;

// Add event listener for the guess button
guessButton.addEventListener('click', handleGuess);

function handleGuess() {
    const guess = parseInt(guessInput.value);

    // Validate input
    if (isNaN(guess) || guess < range.min || guess > range.max) {
        feedback.textContent = `Please enter a valid number between ${range.min} and ${range.max}.`;
        feedback.style.color = 'red';
        return;
    }

    // Check for duplicate guesses
    if (guesses.includes(guess)) {
        feedback.textContent = 'You already guessed this number!';
        feedback.style.color = 'orange';
        return;
    }

    // Add guess to the history
    guesses.push(guess);
    updateGuessHistory(guess);

    remainingGuesses--;
    totalGuesses++;

    // Check the guess
    if (guess === secretNumber) {
        feedback.textContent = 'Correct! You win!';
        feedback.style.color = 'green';
        sendGameResult(totalGuesses, secretNumber, true);
        endGame();
    } else if (remainingGuesses === 0) {
        feedback.textContent = `You've used all your guesses. The correct number was ${secretNumber}.`;
        feedback.style.color = 'red';
        sendGameResult(totalGuesses, secretNumber, false);
        endGame();
    } else if (Math.abs(guess - secretNumber) <= 3) {
        feedback.textContent = "You're very close!";
        feedback.style.color = 'orange';
    } else if (guess < secretNumber) {
        feedback.textContent = "Guess higher!";
        feedback.style.color = 'blue';
    } else {
        feedback.textContent = "Guess lower!";
        feedback.style.color = 'blue';
    }

    // Update remaining guesses
    remainingGuessesElem.textContent = `Remaining guesses: ${remainingGuesses}`;
}

// Function to update guess history dynamically
function updateGuessHistory(guess) {
    const listItem = document.createElement('li');
    listItem.textContent = guess;
    historyList.appendChild(listItem);
}

// send all the relevant information of the game to the server so it can be added to the scoreboard dictionary
function sendGameResult(guesses, number, win) {
    const username = localStorage.getItem('username');

    if (!username) {
        console.error('No username found in localStorage.');
        return;
    }

    fetch('/api/scoreboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, guesses, number, win }),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log('Scoreboard updated:', data);
            endGame();
        })
        .catch((error) => {
            console.error('Error updating scoreboard:', error);
        });
}

// End the game and reset
function endGame() {
    // Disable the guess button
    guessButton.disabled = true;

    // Redirect to the main menu after a short delay
    setTimeout(() => {
        window.location.href = 'game.html';
    }, 1500);
}