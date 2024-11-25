document.querySelector("form").addEventListener("submit", function (e) {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (!username || !password) {
        e.preventDefault();
        alert("Please fill in both username and password fields.");
    }
});

document.getElementById('signup-form').addEventListener('submit', function (e) {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        e.preventDefault();
        alert('Passwords do not match!');
    }
});