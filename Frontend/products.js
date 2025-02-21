document.addEventListener("DOMContentLoaded", function () {
    let productGallery = document.getElementById("product-gallery");
    let inventoryData = JSON.parse(localStorage.getItem("inventoryItems")) || [];
    let salesReport = JSON.parse(localStorage.getItem("salesReport")) || [];

    function updateProductDisplay() {
        productGallery.innerHTML = "";

        inventoryData.forEach(item => {
            if (item.quantity > 0) { // Only show products with stock
                let productCard = document.createElement("div");
                productCard.classList.add("product-card");

                productCard.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <h3>${item.name}</h3>
                    <p><b>Category:</b> ${item.category}</p>
                    <p><b>Price:</b> $${item.price}</p>
                    <p><b>Stock:</b> <span id="stock-${item.id}">${item.quantity}</span></p>
                    <div class="product-actions">
                        <button class="btn sell-btn" onclick="sellProduct(${item.id})">Sell</button>
                    </div>
                `;

                productGallery.appendChild(productCard);
            }
        });

        localStorage.setItem("inventoryItems", JSON.stringify(inventoryData));
        localStorage.setItem("salesReport", JSON.stringify(salesReport));
    }

    // Function to Sell Product and Send Data to Dashboard
    window.sellProduct = function (id) {
        let item = inventoryData.find(i => i.id === id);
        if (item) {
            let sellAmount = prompt(`Enter quantity to sell for ${item.name}:`, 1);
            if (sellAmount && !isNaN(sellAmount) && sellAmount > 0 && sellAmount <= item.quantity) {
                item.quantity -= parseInt(sellAmount);

                // Track Sales in Report for Dashboard
                let saleEntry = {
                    name: item.name,
                    category: item.category,
                    price: item.price,
                    quantitySold: parseInt(sellAmount),
                    date: new Date().toLocaleDateString()
                };

                salesReport.push(saleEntry);

                // Store Sales Report in Local Storage (for Dashboard)
                localStorage.setItem("salesReport", JSON.stringify(salesReport));

                // Remove if Stock is 0
                if (item.quantity === 0) {
                    inventoryData = inventoryData.filter(i => i.id !== id);
                }

                updateProductDisplay();
            } else {
                alert("Invalid quantity!");
            }
        }
    };

    updateProductDisplay();
});
