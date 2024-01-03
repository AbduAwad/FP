document.addEventListener('DOMContentLoaded', function () {
    const signUpForm = document.getElementById('signup-form');

    signUpForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const response = await fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: document.getElementById('username').value,
                password: document.getElementById('password').value
            })
        });

        const result = await response.json();

        if (response.status === 200) {
            window.location.href = `/login?signUpSuccess=true`;
        } else {
            const message = result.message || 'An error occurred during signup.';
            window.location.href = `/signup?signUpSuccess=false&message=${encodeURIComponent(message)}`;
        }
    });
});
