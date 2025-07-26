const express = require('express');
const path = require('path');
const app = express();
const port = 8080;

// In-memory dictionary to store accounts and scoreboard data
const accounts = { 'h': 'h' }; // username and password "h" are hardcoded in for testing purposes
const scoreboards = {}

// Middleware to parse JSON request bodies
app.use(express.json());

// Serve static files from the 'frontend' directory
app.use(express.static(path.join(__dirname, 'frontend')));

// Redirect a non-endpoint page to the login
app.get('/', (req, res) => {
    res.redirect('/login');
});

// Serve the login page
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'login', 'login.html'));
});

// Serve the create account page
app.get('/create-account', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'create-account', 'create-account.html'));
});

// Serve the main game page
app.get('/game', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'game', 'game.html'));
});

// Endpoint to create a new account
app.post('/api/create-account', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.json({ success: false, message: 'Username and password are required.' });
        return;
    }

    if (accounts[username]) {
        res.json({ success: false, message: 'Username already exists. Please choose another one.' });
        return;
    }

    // Add the new account to the dictionary and add it's scoreboard data
    accounts[username] = password;
    scoreboards[username] = [];
    res.json({ success: true, message: `Account successfully created for ${username}.` });
});

// Endpoint to handle login
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.json({ success: false, message: 'Username and password are required.' });
        return;
    }

    if (!accounts[username]) {
        res.json({ success: false, message: 'Username does not exist.' });
        return;
    }

    if (accounts[username] === password) {
        res.json({ success: true, message: 'Login successful!' });
    } else {
        res.json({ success: false, message: 'Invalid password.' });
        //console.log(accounts)
    }
});

// scoreboard handling
app.post('/api/scoreboard', (req, res) => {
    const { username, guesses, number, win } = req.body;

    if (!username || typeof username !== 'string') {
        return res.status(400).json({ error: 'Invalid username' });
    }

    if (!scoreboards[username]) {
        scoreboards[username] = [];
    }

    // Add game result
    scoreboards[username].push([guesses, number, win]);
    console.log(`Updated scoreboard for ${username}:`, scoreboards[username]); // Debugging log
    res.json({ message: 'Scoreboard updated successfully', scoreboard: scoreboards[username] });
});

// Endpoint to retrieve a user's scoreboard
app.get('/api/scoreboard', (req, res) => {
    const { username } = req.query;

    if (!username || typeof username !== 'string') {
        return res.status(400).json({ error: 'Invalid username' });
    }

    if (!scoreboards[username]) {
        console.log(`No scoreboard found for ${username}`); // Debugging log
        return res.json([]);
    }

    res.json(scoreboards[username]);
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});