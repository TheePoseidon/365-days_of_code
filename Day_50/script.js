document.addEventListener("DOMContentLoaded", function () {
    const smsTableBody = document.getElementById("sms-table-body");
    const filterBtn = document.getElementById("filter-btn");
    const downloadReportBtn = document.getElementById("download-report");
    
    let sampleData = [
        { id: 1, message: "Deposit of 10,000 RWF", type: "deposit", timestamp: "2025-02-18 12:00", status: "Completed" },
        { id: 2, message: "Withdrawal of 5,000 RWF", type: "withdrawal", timestamp: "2025-02-18 13:00", status: "Completed" }
    ];
    
    function renderTable(data) {
        smsTableBody.innerHTML = "";
        data.forEach((item) => {
            let row = `<tr>
                <td>${item.id}</td>
                <td>${item.message}</td>
                <td>${item.type}</td>
                <td>${item.timestamp}</td>
                <td>${item.status}</td>
            </tr>`;
            smsTableBody.innerHTML += row;
        });
    }
    
    filterBtn.addEventListener("click", function () {
        const transactionType = document.getElementById("transaction-type").value;
        let filteredData = sampleData;
        if (transactionType) {
            filteredData = sampleData.filter(item => item.type === transactionType);
        }
        renderTable(filteredData);
    });
    
    downloadReportBtn.addEventListener("click", function () {
        let csvContent = "data:text/csv;charset=utf-8,ID,Message,Type,Timestamp,Status\n";
        sampleData.forEach(item => {
            csvContent += `${item.id},${item.message},${item.type},${item.timestamp},${item.status}\n`;
        });
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "MoMo_Report.csv");
        document.body.appendChild(link);
        link.click();
    });
    
    renderTable(sampleData);
});