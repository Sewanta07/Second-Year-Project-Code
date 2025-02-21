document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.getElementById("auth-form");

    if (!signupForm) {
        console.error("Signup form not found!");
        return;
    }

    signupForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form submission from refreshing the page

        const name = document.getElementById("signup-name").value.trim();
        const email = document.getElementById("signup-email").value.trim();
        const password = document.getElementById("signup-password").value.trim();

        if (!name || !email || !password) {
            alert("All fields are required!");
            return;
        }

        // Simulating successful signup (Replace this with backend later)
        alert("Account created successfully! Redirecting to login page...");
        window.location.href = "login.html"; // Redirect manually
    });
});
