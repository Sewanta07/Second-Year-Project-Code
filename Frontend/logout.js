function logout() {
    fetch('/api/logout', {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${sessionStorage.getItem("token")}`
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Clear session storage
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("user");
            
            alert("Logged out successfully!");
            window.location.href = "login.html"; // Redirect to login page
        } else {
            alert("Logout failed. Please try again.");
        }
    })
    .catch(error => console.error("Error during logout:", error));
}
