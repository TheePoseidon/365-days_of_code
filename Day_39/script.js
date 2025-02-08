async function fetchTransactions() {
    try {
        const response = await fetch("http://localhost:5000/transactions");
        const data = await response.json();
        
        const tableBody = document.getElementById("transactions-body");
        tableBody.innerHTML = "";  // Clear previous data

        data.forEach((tx) => {
            const row = `<tr>
                <td>${tx.id}</td>
                <td>${tx.sender}</td>
                <td>${tx.message}</td>
                <td>${tx.category}</td>
                <td>${tx.timestamp}</td>
            </tr>`;
            tableBody.innerHTML += row;
        });

        generateChart(data);
    } catch (error) {
        console.error("Error fetching transactions:", error);
    }
}

function filterTransactions() {
    const input = document.getElementById("search").value.toLowerCase();
    const rows = document.querySelectorAll("#transactions-table tbody tr");

    rows.forEach((row) => {
        row.style.display = row.innerText.toLowerCase().includes(input) ? "" : "none";
    });
}

function generateChart(data) {
    const ctx = document.getElementById("transactionChart").getContext("2d");
    
    const categories = {};
    data.forEach(tx => {
        categories[tx.category] = (categories[tx.category] || 0) + 1;
    });

    new Chart(ctx, {
        type: "bar",
        data: {
            labels: Object.keys(categories),
            datasets: [{
                label: "Transaction Count",
                data: Object.values(categories),
                backgroundColor: "blue"
            }]
        }
    });
}

fetchTransactions();
