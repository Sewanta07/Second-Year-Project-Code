document.addEventListener("DOMContentLoaded", function () {
    const pageHeader = document.querySelector(".page-header");
    const pageName = window.location.pathname.split("/").pop().replace(".html", "");
    
    // Set page name dynamically
    if (pageHeader) {
        switch (pageName) {
            case "main":
                pageHeader.textContent = "Dashboard";
                break;
            case "profile":
                pageHeader.textContent = "Profile";
                break;
            case "inventory":
                pageHeader.textContent = "Inventory";
                break;
            case "Aboutus":
                pageHeader.textContent = "About Us";
                break;
            default:
                pageHeader.textContent = "Inventory Management System";
        }
    }
});
