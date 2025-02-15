const API_URL = "http://127.0.0.1:5000/transactions";
let transactions = [];
let currentPage = 1;
const rowsPerPage = 10;

// Fetch transactions from API
async function fetchTransactions(category = "", search = "", page = 1) {
    try {
        let url = `${API_URL}?page=${page}&limit=${rowsPerPage}`;
        
        if (category) url += `&category=${encodeURIComponent(category)}`;
        if (search) url += `&search=${encodeURIComponent(search)}`;

        const response = await fetch(url);
        transactions = await response.json();
        
        displayTransactions();
        updatePaginationButtons();
    } catch (error) {
        console.error("Error fetching transactions:", error);
    }
}

// Display transactions in the table
function displayTransactions() {
    const tableBody = document.getElementById("transactions-body");
    tableBody.innerHTML = "";  // Clear previous data

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

// Handle pagination
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

// Get selected category from dropdown
function getSelectedCategory() {
    return document.getElementById("filter-category").value;
}

// Get search input value
function getSearchTerm() {
    return document.getElementById("search").value;
}

// Apply category filter
function filterByCategory() {
    currentPage = 1;
    fetchTransactions(getSelectedCategory(), getSearchTerm(), currentPage);
}

// Apply search filter
function searchTransactions() {
    currentPage = 1;
    fetchTransactions(getSelectedCategory(), getSearchTerm(), currentPage);
}

// Initial data fetch
fetchTransactions();

