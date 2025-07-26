document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const username = document.getElementById('username').value; // get the username input
            const password = document.getElementById('password').value; // get the password input
            const messageDiv = document.getElementById('loginMessage');

            try {
                const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password })
                });

                const result = await response.json();
                messageDiv.textContent = result.message; //display the login message
                messageDiv.style.color = result.success ? 'green' : 'red'; // change the color of the message displayed depending on the login success

                if(result.success){
                    // Store the username in localStorage
                    localStorage.setItem('username', username)
                    setTimeout(() => {
                        window.location.href = '../game/game.html'; // Redirect to the main menu after a short delay
                    }, 1000);
                }
            } catch (error) {
                messageDiv.textContent = 'An error occurred while logging in.';
                messageDiv.style.color = 'red';
            } // an error shouldnt happen, but just in case i added a try-catch
        });
    }
});
