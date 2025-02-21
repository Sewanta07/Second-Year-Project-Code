document.getElementById("reset-form").addEventListener("submit", async function(event) {
    event.preventDefault();

    const email = document.getElementById("reset-email").value;

    try {
        const response = await fetch("http://localhost:8000/api/forgot-password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email })
        });

        const data = await response.json();

        if (response.ok) {
            alert("Password reset link sent to your email!");
        } else {
            alert(data.message || "Failed to send reset link.");
        }
    } catch (error) {
        alert("Server error. Please try again later.");
    }
});
