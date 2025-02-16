const API_URL = "http://127.0.0.1:5000/transactions";
let transactions = [];
let currentPage = 1;
const rowsPerPage = 10;


async function fetchTransactions(category = "", search = "", page = 1) {

    try {
        let url = `${API_URL}?page=${page}&limit=${rowsPerPage}`;

        if (category) url += `&category=${encodeURIComponent(category)}`;
        if (search) url += `&search=${encodeURIComponent(search)}`;

        const response = await fetch(url);
        transactions = await response.json();

        displayTransactions();
        updatePaginationButtons();
        generateCharts();
    } catch (error) {
        console.error("Error fetching transactions:", error);
    }
}


function displayTransactions() {
    const tableBody = document.getElementById("transactions-body");
    tableBody.innerHTML = "";

    transactions.forEach((tx) => {
        const row = `<tr>
            <td>${tx.id}</td>
            <td>${tx.sender}</td>
            <td>${tx.message}</td>
            <td>${tx.amount}</td>
            <td>${tx.category}</td>
            <td>${tx.timestamp}</td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}

function generateCharts() {
    const categories = {};
    const monthlyTotals = {};

    transactions.forEach(tx => {

        categories[tx.category] = (categories[tx.category] || 0) + 1;


        const month = tx.timestamp.substring(0, 7);
        monthlyTotals[month] = (monthlyTotals[month] || 0) + 1;
    });

    new Chart(document.getElementById("barChart").getContext("2d"), {
        type: "bar",
        data: {
            labels: Object.keys(categories),
            datasets: [{
                label: "Transactions per Category",
                data: Object.values(categories),
                backgroundColor: "blue"
            }]
        }
    });

    new Chart(document.getElementById("pieChart").getContext("2d"), {
        type: "pie",
        data: {
            labels: Object.keys(categories),
            datasets: [{
                data: Object.values(categories),
                backgroundColor: ["red", "green", "blue", "purple", "orange"]
            }]
        }
    });

    new Chart(document.getElementById("lineChart").getContext("2d"), {
        type: "line",
        data: {
            labels: Object.keys(monthlyTotals),
            datasets: [{
                label: "Transactions Over Time",
                data: Object.values(monthlyTotals),
                borderColor: "blue",
                fill: false
            }]
        }
    });
}

function nextPage() {
    currentPage++;
    fetchTransactions(getSelectedCategory(), getSearchTerm(), currentPage);
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        fetchTransactions(getSelectedCategory(), getSearchTerm(), currentPage);
    }
}

function updatePaginationButtons() {
    document.getElementById("page-info").innerText = `Page ${currentPage}`;
}


function getSelectedCategory() {
    return document.getElementById("filter-category").value;
}


function getSearchTerm() {
    return document.getElementById("search").value;
}


function filterByCategory() {
    currentPage = 1;
    fetchTransactions(getSelectedCategory(), getSearchTerm(), currentPage);
}


function searchTransactions() {
    currentPage = 1;
    fetchTransactions(getSelectedCategory(), getSearchTerm(), currentPage);
}


fetchTransactions();

