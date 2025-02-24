const fetchSummary = async () => {
    try {
        let response = await fetch("http://127.0.0.1:8000/sms/summary");
        let summaryData = await response.json();
        displayCharts(summaryData.summary);
    } catch (error) {
        console.error("Error fetching summary:", error);
    }
};

const displayCharts = (summary) => {
    const labels = summary.map(item => item.transaction_type);
    const values = summary.map(item => item.count);

    // Bar Chart
    new Chart(document.getElementById("barChart"), {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{ label: "Transactions", data: values, backgroundColor: "blue" }]
        }
    });

    // Pie Chart
    new Chart(document.getElementById("pieChart"), {
        type: "pie",
        data: {
            labels: labels,
            datasets: [{ data: values, backgroundColor: ["red", "green", "blue"] }]
        }
    });
};

fetchSummary();
