let range = { min: 1, max: 10 };

document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    const gameContent = document.getElementById('gameContent');

    // Simulate the loading screen delay
    setTimeout(() => {
        loadingScreen.classList.add('hidden'); // Hide the loading screen
        gameContent.classList.remove('hidden'); // Show the game content
    }, 1500);

    const username = localStorage.getItem('username'); // grab the username form local storage to be used later in scoreboard handling

    if (!username) {
        console.error('No username found in localStorage.');
        document.getElementById('scoreboardContent').textContent = 'Please log in to see the scoreboard.';
        return;
    }

    // Fetch the scoreboard
    fetch(`/api/scoreboard?username=${username}`)
        .then((response) => response.json())
        .then((data) => {
            console.log('Fetched scoreboard:', data);
            displayScoreboard(data);
        })
        .catch((error) => {
            console.error('Error fetching scoreboard:', error);
        });

    // Start button logic
    document.getElementById('startButton').addEventListener('click', () => {
        const difficulty = document.getElementById('difficulty').value;
        if (difficulty === 'easy') range = { min: 1, max: 10 };
        if (difficulty === 'medium') range = { min: 1, max: 100 };
        if (difficulty === 'hard') range = { min: 1, max: 1000 };

        localStorage.setItem('range', JSON.stringify(range));

        // Navigate to the guess.html game page
        window.location.href = 'guess.html';
    });
});

// Display the scoreboard
function displayScoreboard(scoreboard) {
    var wins = 0;
    var losses = 0;

    const scoreboardContent = document.getElementById('scoreboardContent');
    scoreboardContent.innerHTML = '';

    if (scoreboard.length === 0) {
        scoreboardContent.textContent = 'No games played yet.';
        return;
    }

    // iterate through he scoreboard arrays
    scoreboard.forEach((game, index) => {
        const gameElement = document.createElement('p'); // greate a new p tag for each game instance
        gameElement.textContent = `Game ${index + 1}: Guesses - ${game[0]}, Number - ${game[1]}, ${game[2] ? 'Win' : 'Loss'}`;
        scoreboardContent.appendChild(gameElement);
        game[2] ? wins++ : losses++;
    });

    let ratio = Math.floor((wins / (wins + losses))*100);
    let bar = document.getElementById('winBar');
    bar.style.width = ratio + "%";
}