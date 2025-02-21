document.addEventListener("DOMContentLoaded", function () {
    // Fetch user data from backend
    fetch('/api/user', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${sessionStorage.getItem("token")}` }
    })
    .then(response => response.json())
    .then(data => {
        if (data.user) {
            document.getElementById("user-name").textContent = data.user.name;
            document.getElementById("user-email").textContent = data.user.email;
            document.getElementById("user-role").textContent = data.user.role;
            document.getElementById("user-phone").value = data.user.phone || "";
            document.getElementById("user-address").value = data.user.address || "";
            document.getElementById("user-photo").src = data.user.photo || "Images/default-user.png";
        } else {
            alert("Error fetching profile. Please log in again.");
            window.location.href = "login.html";
        }
    })
    .catch(error => console.error("Error fetching user data:", error));

    // Profile Picture Upload
    document.getElementById("profile-pic-upload").addEventListener("change", function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById("user-photo").src = e.target.result;
            };
            reader.readAsDataURL(file);

            // Prepare file for upload to backend
            const formData = new FormData();
            formData.append("profilePic", file);

            fetch('/api/upload-profile-pic', {
                method: "POST",
                headers: { 'Authorization': `Bearer ${sessionStorage.getItem("token")}` },
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert("Profile picture updated successfully!");
                } else {
                    alert("Error updating profile picture.");
                }
            })
            .catch(error => console.error("Error uploading profile picture:", error));
        }
    });

    // Save Profile Changes
    document.getElementById("save-profile").addEventListener("click", function() {
        const updatedPhone = document.getElementById("user-phone").value.trim();
        const updatedAddress = document.getElementById("user-address").value.trim();

        fetch('/api/update-profile', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`
            },
            body: JSON.stringify({ phone: updatedPhone, address: updatedAddress })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Profile updated successfully!");
            } else {
                alert("Error updating profile.");
            }
        })
        .catch(error => console.error("Error updating profile:", error));
    });
});
