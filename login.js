$(document).ready(function () {
    // Check if user is logged in
    if (localStorage.getItem('loggedInUser')) {
        window.location.href = 'index.html'; // Redirect to home page if logged in
    }

    // Handle login form submission
    $('#login-form').on('submit', function (e) {
        e.preventDefault();
        const username = $('#username').val();
        const password = $('#password').val();

        // Example hardcoded credentials (you can modify this logic)
        const validUsername = 'user123';
        const validPassword = 'password123';

        if (username === validUsername && password === validPassword) {
            localStorage.setItem('loggedInUser', username); // Store the username in localStorage
            window.location.href = 'index.html'; // Redirect to home page
            $('#login-btn').addClass('d-none');
        } else {
            $('#error-message').text('Invalid username or password.'); // Show error message
        }
    });
});

