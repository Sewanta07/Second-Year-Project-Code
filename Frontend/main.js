document.addEventListener("DOMContentLoaded", function () {
    let inventoryData = []; // Global inventory array
    let stockChart, categoryChart;

    // Fetch initial inventory data from backend
    fetchInventoryData();

    function fetchInventoryData() {
        fetch('/api/inventory') // Replace with actual API endpoint
            .then(response => response.json())
            .then(data => {
                inventoryData = data.items; // Store data globally
                updateDashboard(data);
                renderCharts();
            })
            .catch(error => console.error("Error fetching data:", error));
    }

    // Function to update dashboard numbers
    function updateDashboard(data) {
        document.getElementById("total-items").textContent = data.totalItems;
        document.getElementById("low-stock").textContent = data.lowStock;
        document.getElementById("out-of-stock").textContent = data.outOfStock;
        document.getElementById("recent-sales").textContent = data.recentSales;
    }

    // Function to Download Dashboard Data as CSV
    function downloadDashboardData() {
        const data = [
            ["Category", "Count"],
            ["Total Items", document.getElementById("total-items").textContent],
            ["Low Stock", document.getElementById("low-stock").textContent],
            ["Out of Stock", document.getElementById("out-of-stock").textContent],
            ["Recent Sales", document.getElementById("recent-sales").textContent]
        ];

        let csvContent = "data:text/csv;charset=utf-8," + data.map(row => row.join(",")).join("\n");
        let encodedUri = encodeURI(csvContent);
        let link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "dashboard_data.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    // Attach Download Function to Button
    document.getElementById("download-data").addEventListener("click", downloadDashboardData);

    // Function to Render Charts
    function renderCharts() {
        const stockChartCtx = document.getElementById("stock-chart").getContext("2d");
        const categoryChartCtx = document.getElementById("category-chart").getContext("2d");

        // Stock Level Data
        const stockLabels = inventoryData.map(item => item.name);
        const stockData = inventoryData.map(item => item.stock);

        // Category Distribution Data
        const categoryData = {};
        inventoryData.forEach(item => {
            if (!categoryData[item.category]) {
                categoryData[item.category] = 0;
            }
            categoryData[item.category] += item.stock;
        });

        const categoryLabels = Object.keys(categoryData);
        const categoryStockData = Object.values(categoryData);

        // Destroy existing charts if they exist (to refresh data)
        if (stockChart) stockChart.destroy();
        if (categoryChart) categoryChart.destroy();

        // Create new Stock Chart
        stockChart = new Chart(stockChartCtx, {
            type: 'bar',
            data: {
                labels: stockLabels,
                datasets: [{
                    label: "Stock Level",
                    data: stockData,
                    backgroundColor: "#1A2942"
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });

        // Create new Category Chart
        categoryChart = new Chart(categoryChartCtx, {
            type: 'pie',
            data: {
                labels: categoryLabels,
                datasets: [{
                    data: categoryStockData,
                    backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }
});
