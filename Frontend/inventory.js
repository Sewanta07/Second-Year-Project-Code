// Updated inventory.js (Replaces Local Storage with API Calls)
document.addEventListener("DOMContentLoaded", function () {
    fetchInventoryItems();
});

async function fetchInventoryItems() {
    try {
        const response = await fetch("/api/inventory", {
            headers: { "Authorization": `Bearer ${sessionStorage.getItem("token")}` }
        });
        const data = await response.json();
        displayInventoryItems(data.items);
    } catch (error) {
        console.error("Error fetching inventory:", error);
    }
}

function displayInventoryItems(items) {
    let inventoryList = document.getElementById("inventory-list");
    inventoryList.innerHTML = "";
    
    items.forEach(item => {
        let row = `
            <tr>
                <td>${item.name}</td>
                <td>${item.category}</td>
                <td>${item.quantity}</td>
                <td>${item.price}</td>
                <td><img src="/storage/${item.image}" alt="Product Image" width="50"></td>
                <td><button class="delete-btn" onclick="deleteItem(${item.id})">Delete</button></td>
            </tr>
        `;
        inventoryList.innerHTML += row;
    });
}

async function addInventoryItem(event) {
    event.preventDefault();
    const formData = new FormData(document.getElementById("inventory-form"));

    try {
        const response = await fetch("/api/inventory", {
            method: "POST",
            headers: { "Authorization": `Bearer ${sessionStorage.getItem("token")}` },
            body: formData
        });
        
        if (response.ok) {
            alert("Item added successfully!");
            fetchInventoryItems();
        } else {
            alert("Error adding item");
        }
    } catch (error) {
        console.error("Error adding item:", error);
    }
}

document.getElementById("inventory-form").addEventListener("submit", addInventoryItem);

async function deleteItem(id) {
    try {
        const response = await fetch(`/api/inventory/${id}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${sessionStorage.getItem("token")}` }
        });
        
        if (response.ok) {
            alert("Item deleted successfully!");
            fetchInventoryItems();
        } else {
            alert("Error deleting item");
        }
    } catch (error) {
        console.error("Error deleting item:", error);
    }
}
