document.addEventListener('DOMContentLoaded', () => {
    const createAccountForm = document.getElementById('createAccountForm');
    if (createAccountForm) {
        createAccountForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // variable creation
            const username = document.getElementById('newUsername').value;
            const password = document.getElementById('newPassword').value;
            const messageDiv = document.getElementById('createAccountMessage');

            try {
                const response = await fetch('/api/create-account', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password })
                });

                // fetch the server response
                const result = await response.json();
                
                // css handling
                messageDiv.textContent = result.message;
                messageDiv.style.color = result.success ? 'green' : 'red';
            } catch (error) {
                messageDiv.textContent = 'An error occurred while creating an account.';
                messageDiv.style.color = 'red';
            } // an error is unlikely but this is to prevent crashes
        });
    }
});
