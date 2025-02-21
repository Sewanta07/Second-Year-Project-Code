document.addEventListener("DOMContentLoaded", function () {
    const authForm = document.getElementById("auth-form");
    const signupForm = document.getElementById("signup-form");
    const toggleFormLink = document.getElementById("toggle-form");
    const toggleLoginLink = document.getElementById("toggle-login");
    let isSignup = false;

    // Toggle Password Visibility
    window.togglePassword = function (inputId) {
        const passwordField = document.getElementById(inputId);
        passwordField.type = passwordField.type === "password" ? "text" : "password";
    };

    // Toggle Between Login and Signup Forms
    toggleFormLink.addEventListener("click", function (event) {
        event.preventDefault();
        authForm.style.display = "none";
        signupForm.style.display = "block";
    });

    toggleLoginLink.addEventListener("click", function (event) {
        event.preventDefault();
        signupForm.style.display = "none";
        authForm.style.display = "block";
    });

    // Handle Login
    authForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const email = document.getElementById("login-email").value.trim();
        const password = document.getElementById("login-password").value.trim();

        fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        }).then(response => response.json())
          .then(data => {
              if (data.success) {
                  sessionStorage.setItem("user", JSON.stringify(data.user));
                  alert("Login successful!");
                  window.location.href = "main.html";
              } else {
                  alert("Invalid credentials. Please try again.");
              }
          })
          .catch(error => console.error("Error during login:", error));
    });

    // Handle Signup
    signupForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const name = document.getElementById("signup-name").value.trim();
        const email = document.getElementById("signup-email").value.trim();
        const password = document.getElementById("signup-password").value.trim();

        if (!name || !email || !password) {
            alert("All fields are required!");
            return;
        }

        fetch('/api/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        }).then(response => response.json())
          .then(data => {
              if (data.success) {
                  alert("Account created successfully! Please log in.");
                  signupForm.style.display = "none";
                  authForm.style.display = "block";
              } else {
                  alert("Signup failed: " + data.message);
              }
          })
          .catch(error => console.error("Error during signup:", error));
    });
});